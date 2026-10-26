#!/usr/bin/env python3
"""Cross-check guide names, gem tiers, supports, uniques, images, and source URLs against poe2db and the cited build pages.

Reads the HTML already saved in /tmp/audit for gem indexes, then fetches the remaining pages.
Writes /tmp/audit/report.json. This script needs network access. The offline test uses the snapshot it can refresh.
"""

from __future__ import annotations

import json
import re
import ssl
import urllib.error
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIT = Path("/tmp/audit")
FACTS = json.loads((AUDIT / "facts.json").read_text())
OUT = AUDIT / "report.json"
UA = {"User-Agent": "Mozilla/5.0 (compatible; poe2-guide-audit/1.0)"}
CTX = ssl.create_default_context()


def fetch(url: str, method: str = "GET", timeout: int = 45) -> tuple[int, str, bytes]:
    req = urllib.request.Request(url, headers=UA, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX) as response:
            body = b"" if method == "HEAD" else response.read()
            return response.status, response.geturl(), body
    except urllib.error.HTTPError as error:
        body = error.read() if method != "HEAD" else b""
        return error.code, url, body
    except Exception as error:  # noqa: BLE001 - report every transport failure
        return 0, url, str(error).encode()


def display_name_map() -> dict[str, dict]:
    pages = {
        "skill": (AUDIT / "skill_gems.html", 25120, 778624),
        "support": (AUDIT / "support.html", 25751, 714631),
        "spirit": (AUDIT / "spirit.html", 25117, 117652),
    }
    found: dict[str, dict] = {}
    for kind, (path, start, end) in pages.items():
        html = path.read_text(errors="replace")[start:end]
        tiers: dict[str, set[int]] = defaultdict(set)
        slugs: dict[str, str] = {}
        for match in re.finditer(r'href="/us/([^"#]+)"[^>]*>([^<]{2,80})</a>\s*\((\d+)\)', html):
            slug, name, level = match.group(1), unescape(match.group(2)).strip(), int(match.group(3))
            if not name or not name[0].isupper():
                continue
            tiers[name].add(level)
            slugs[name] = slug
        for name, levels in tiers.items():
            row = found.setdefault(name, {"slugs": {}, "tiers": {}})
            row["slugs"][kind] = slugs[name]
            row["tiers"][kind] = sorted(levels)
    lineage = (AUDIT / "lineage.html").read_text(errors="replace")
    for match in re.finditer(r'href="/us/([^"#]+)"[^>]*>([^<]{2,80})</a>', lineage):
        slug, name = match.group(1), unescape(match.group(2)).strip()
        if not name or not name[0].isupper() or " " not in name and "'" not in name:
            continue
        row = found.setdefault(name, {"slugs": {}, "tiers": {}})
        row["slugs"].setdefault("lineage", slug)
    return found


def slug_for(name: str, gems: dict[str, dict]) -> str | None:
    row = gems.get(name)
    if not row:
        return None
    slugs = row["slugs"]
    return slugs.get("skill") or slugs.get("spirit") or slugs.get("support") or slugs.get("lineage")


def supported_names(html: str) -> list[str] | None:
    # The nav link "Supported By /" appears before the real tab. Read the tab.
    start = html.find('id="SupportedBy"')
    if start < 0:
        start = html.find(">Supported By<")
    if start < 0:
        return None
    end = html.find("Microtransactions", start)
    chunk = html[start : end if end > start else start + 400000]
    names = []
    for match in re.finditer(r'href="/us/[^"]+"[^>]*>([^<]+)</a>', chunk):
        name = unescape(match.group(1)).strip()
        if name and name[0].isupper() and name not in names:
            names.append(name)
    return names


def title_of(body: bytes) -> str:
    match = re.search(br"<title>([^<]+)", body)
    return unescape(match.group(1).decode(errors="replace")).strip() if match else ""


def main() -> None:
    gems = display_name_map()
    catalog = json.loads((ROOT / "src/content/gemCatalog.json").read_text())
    socket_gems = set()
    for row in FACTS["supports"]:
        socket_gems.add(row["skill"])
        socket_gems.update(row["supports"])
    for guide_gems in []:
        socket_gems.update(guide_gems)

    # Real socketed names are the support rows plus skills that appear as group gems.
    # facts["gems"] also includes the free-text support field. Ignore those sentences.
    used = {name for name in FACTS["gems"] if gem_like(name)}
    tier_mismatches = []
    missing = []
    kind_mismatches = []
    for name in sorted(used):
        row = gems.get(name)
        fact = catalog.get(name)
        if row is None:
            missing.append({"name": name, "catalog": fact})
            continue
        tiers = row["tiers"]
        kinds = [kind for kind in ("lineage", "spirit", "support", "skill") if kind in row["slugs"]]
        page_tier = None
        for kind in ("spirit", "skill", "support", "lineage"):
            values = tiers.get(kind) or []
            if len(values) == 1:
                page_tier = values[0]
                break
            if len(values) > 1:
                page_tier = max(values)
                break
        if fact and page_tier is not None and fact.get("level") not in (None, page_tier):
            tier_mismatches.append(
                {"name": name, "catalog": fact.get("level"), "page": page_tier, "tiers": tiers, "kinds": kinds}
            )
        if fact and fact.get("kind") == "skill" and "spirit" in kinds and "support" not in kinds:
            kind_mismatches.append({"name": name, "catalog": "skill", "page": "spirit"})
        if fact and fact.get("kind") not in kinds and not (
            fact.get("kind") == "lineage" and ("lineage" in kinds or "support" in kinds)
        ):
            if not (fact.get("kind") == "skill" and "spirit" in kinds):
                kind_mismatches.append({"name": name, "catalog": fact.get("kind"), "page": kinds})

    hosts = sorted({row["skill"] for row in FACTS["supports"]})
    host_urls = {}
    for name in hosts:
        slug = slug_for(name, gems)
        if slug:
            host_urls[name] = f"https://poe2db.tw/us/{slug}"

    unique_urls = {}
    for unique in FACTS["uniques"]:
        name = unique["name"]
        slug = re.sub(r"[^A-Za-z0-9]+", "_", name.replace("'", "")).strip("_")
        unique_urls[name] = f"https://poe2db.tw/us/{slug}"

    quest_slugs = [
        "The_Lost_Lute",
        "Ominous_Altars",
        "The_Mad_Wolf_of_Ogham",
        "Earning_Passage",
        "Ascent_to_Power",
        "A_Theft_of_Ivory",
        "Ancient_Vows",
        "A_Crown_of_Stone",
        "Traditions_Toll",
        "The_Slithering_Dead",
        "Tribal_Vengeance",
        "Treasures_of_Utzaal",
        "The_Search",
        "The_Blind_Beast",
        "Tribal_Medicine",
        "Abandoned_Prison",
        "Trial_of_the_Ancestors",
        "Dark_Mists",
        "Clearing_the_Way",
        "Howling_Winds",
        "Siege_of_Oriath",
        "Reaching_Clearfell",
        "Treacherous_Ground",
        "Secrets_in_the_Dark",
        "Sorrow_Among_Stones",
        "The_Trail_of_Corruption",
    ]
    mod_slugs = [
        "Boots_dex",
        "Boots_str",
        "Boots_int",
        "Boots_str_dex",
        "Boots_str_int",
        "Boots_dex_int",
        "Body_Armours_str",
        "Body_Armours_dex",
        "Body_Armours_int",
        "Body_Armours_str_dex",
        "Body_Armours_str_int",
        "Body_Armours_dex_int",
        "Helmets_str",
        "Helmets_dex",
        "Helmets_int",
        "Gloves_str",
        "Gloves_dex",
        "Gloves_int",
        "Gloves_str_dex",
        "Gloves_dex_int",
        "Helmets_str_dex",
        "Helmets_dex_int",
        "Helmets_str_int",
        "Rings",
        "Amulets",
        "Belts",
        "Quivers",
        "Shields_str",
        "Bows",
        "Wands",
        "Staves",
        "Spears",
        "Crossbows",
        "Quarterstaves",
        "Sceptres",
        "One_Hand_Maces",
        "Ruby",
        "Jewels",
    ]
    ascendancies = [
        "Deadeye",
        "Pathfinder",
        "Amazon",
        "Spirit_Walker",
        "Ritualist",
        "Titan",
        "Warbringer",
        "Smith_of_Kitava",
        "Witchhunter",
        "Tactician",
        "Gemling_Legionnaire",
        "Invoker",
        "Martial_Artist",
        "Acolyte_of_Chayula",
        "Infernalist",
        "Blood_Mage",
        "Lich",
        "Stormweaver",
        "Chronomancer",
        "Disciple_of_Varashta",
        "Shaman",
        "Oracle",
    ]

    jobs: list[tuple[str, str, str]] = []
    for name, url in host_urls.items():
        jobs.append(("gem", name, url))
    for name, url in unique_urls.items():
        jobs.append(("unique", name, url))
    for slug in quest_slugs:
        jobs.append(("quest", slug, f"https://poe2db.tw/us/{slug}"))
    for slug in mod_slugs:
        jobs.append(("mod", slug, f"https://poe2db.tw/us/{slug}"))
    for slug in ascendancies:
        jobs.append(("ascendancy", slug, f"https://poe2db.tw/us/{slug}"))
    for source in FACTS["sources"]:
        jobs.append(("source", source["label"], source["url"]))
    for url in FACTS["images"]:
        jobs.append(("image", url, url))

    results: dict[str, list] = defaultdict(list)

    def run(job: tuple[str, str, str]):
        kind, key, url = job
        method = "HEAD" if kind == "image" else "GET"
        status, final, body = fetch(url, method)
        if kind == "image" and status in (0, 403, 405):
            status, final, body = fetch(url, "GET")
            body = body[:200]
        return kind, key, url, status, final, body

    with ThreadPoolExecutor(max_workers=12) as pool:
        futures = [pool.submit(run, job) for job in jobs]
        done = 0
        for future in as_completed(futures):
            kind, key, url, status, final, body = future.result()
            done += 1
            if done % 40 == 0:
                print(f"fetched {done}/{len(jobs)}", flush=True)
            if kind == "gem":
                html = body.decode(errors="replace")
                names = supported_names(html) if status == 200 else None
                results["gems"].append({"name": key, "url": url, "status": status, "supports": names, "title": title_of(body)})
            elif kind == "unique":
                html = body.decode(errors="replace")
                results["uniques"].append(
                    {
                        "name": key,
                        "url": url,
                        "status": status,
                        "title": title_of(body),
                        "requires": requirement_text(html) if status == 200 else "",
                    }
                )
            elif kind == "quest":
                html = body.decode(errors="replace")
                results["quests"].append(
                    {"slug": key, "status": status, "title": title_of(body), "excerpt": quest_excerpt(html) if status == 200 else ""}
                )
            elif kind == "mod":
                text = re.sub(r"<[^>]+>", " ", body.decode(errors="replace"))
                text = re.sub(r"\s+", " ", unescape(text))
                results["mods"].append({"slug": key, "status": status, "title": title_of(body), "text": text if status == 200 else ""})
            elif kind == "ascendancy":
                text = re.sub(r"<[^>]+>", " ", body.decode(errors="replace"))
                text = re.sub(r"\s+", " ", unescape(text))
                results["ascendancies"].append({"slug": key, "status": status, "title": title_of(body), "text": text if status == 200 else ""})
            elif kind == "source":
                results["sources"].append(
                    {"label": key, "url": url, "status": status, "final": final, "title": title_of(body)}
                )
            else:
                results["images"].append({"url": url, "status": status, "final": final})

    illegal = []
    for row in FACTS["supports"]:
        page = next((item for item in results["gems"] if item["name"] == row["skill"]), None)
        if page is None:
            illegal.append({**row, "problem": "no poe2db slug"})
            continue
        if page["status"] != 200 or page["supports"] is None:
            illegal.append({**row, "problem": f"page {page['status']}"})
            continue
        allowed = set(page["supports"])
        bad = [support for support in row["supports"] if support not in allowed]
        if bad:
            illegal.append({"guide": row["guide"], "skill": row["skill"], "illegal": bad})

    stat_hits = []
    # Character-sheet goals. They are not a single item mod, so the modifier pages do not contain them.
    sheet_targets = {"50% Chaos Resistance"}
    mod_text = {row["slug"]: row.get("text", "") for row in results["mods"] if row["status"] == 200}
    for line in FACTS["statLines"]:
        if not re.search(r"\d", line) or line in sheet_targets:
            continue
        def flatten(text: str) -> str:
            text = text.replace("–", "-").replace("—", "-")
            text = re.sub(r"\s*-\s*", "-", text)
            text = text.replace("(", "").replace(")", "")
            text = text.replace(" to ", " ")
            # poe2db prints "6 — 10) % to Fire Resistance". Guide lines print "+6-10% Fire Resistance".
            text = re.sub(r"\s+%", "%", text)
            return re.sub(r"\s+", " ", text)

        compact = flatten(line)
        found = [slug for slug, text in mod_text.items() if compact in flatten(text)]
        if not found:
            stat_hits.append({"line": line, "foundOn": []})

    report = {
        "usedGems": len(used),
        "missingGems": missing,
        "tierMismatches": tier_mismatches,
        "kindMismatches": kind_mismatches,
        "illegalSupports": illegal,
        "uniqueStatuses": [
            {"name": row["name"], "status": row["status"], "title": row["title"], "requires": row["requires"], "url": row["url"]}
            for row in results["uniques"]
        ],
        "questExcerpts": results["quests"],
        "statLinesMissing": stat_hits,
        "modStatuses": [{"slug": row["slug"], "status": row["status"], "title": row["title"]} for row in results["mods"]],
        "ascendancyStatuses": [{"slug": row["slug"], "status": row["status"], "title": row["title"]} for row in results["ascendancies"]],
        "sources": results["sources"],
        "images": results["images"],
        "hostCount": len(host_urls),
        "jobCount": len(jobs),
    }
    # Keep mod and ascendancy text beside the report for hand review, but not inside the summary file.
    (AUDIT / "mod-text.json").write_text(json.dumps({row["slug"]: row.get("text", "")[:200000] for row in results["mods"]}))
    (AUDIT / "ascendancy-text.json").write_text(
        json.dumps({row["slug"]: row.get("text", "")[:200000] for row in results["ascendancies"]})
    )
    OUT.write_text(json.dumps(report, indent=2))
    print(
        json.dumps(
            {
                "jobs": len(jobs),
                "missingGems": len(missing),
                "tierMismatches": len(tier_mismatches),
                "kindMismatches": len(kind_mismatches),
                "illegalSupports": len(illegal),
                "statLinesMissing": len(stat_hits),
                "uniqueNot200": sum(1 for row in results["uniques"] if row["status"] != 200),
                "sourceNot200": sum(1 for row in results["sources"] if row["status"] != 200),
                "imageNot200": sum(1 for row in results["images"] if row["status"] != 200),
                "modNot200": sum(1 for row in results["mods"] if row["status"] != 200),
            },
            indent=2,
        )
    )


def gem_like(name: str) -> bool:
    return not name.startswith("a support") and not name.startswith("one fire")


def requirement_text(html: str) -> str:
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", unescape(text))
    match = re.search(r"Requires:? (?:Level )?\d+[^.]{0,80}", text)
    level = re.search(r"Level: \(\d+[^\)]{0,20}\)", text)
    parts = []
    if match:
        parts.append(match.group(0)[:120])
    if level:
        parts.append(level.group(0)[:80])
    return " | ".join(parts)


def quest_excerpt(html: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", html)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text)
    text = re.sub(r"<[^>]+>", "\n", text)
    lines = [re.sub(r"\s+", " ", unescape(line)).strip() for line in text.splitlines()]
    keep = []
    for line in lines:
        if not line or len(line) < 8 or len(line) > 240:
            continue
        if re.search(r"spirit|resistance|passive|Book of|charm|rune|life|mana|flask|point|reward|Reward|Quest", line, re.I):
            keep.append(line)
        if len(keep) > 40:
            break
    return "\n".join(keep[:40])


if __name__ == "__main__":
    main()
