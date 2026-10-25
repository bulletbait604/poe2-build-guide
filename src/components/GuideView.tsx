"use client";

import { GearBoard } from "@/components/GearBoard";
import { GemLinks } from "@/components/GemLinks";
import { ItemChip } from "@/components/ItemChip";
import { TreeMap } from "@/components/TreeMap";
import type { GameClass } from "@/content/classes";
import type { Guide, GuideChapter } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function chapterForLevel(level: number): GuideChapter | "levels" {
  if (level >= 60) return "endgame";
  if (level >= 52) return "interludes";
  return "acts";
}

const walkOrder = [
  "act-1",
  "act-2",
  "act-3",
  "act-4",
  "interlude-barya",
  "interlude-doryani",
  "interlude-holten",
  "endgame",
];

const tabs = ["Overview", "Leveling", "Skills", "Gear", "Passive", "Play"] as const;
type Tab = (typeof tabs)[number];

function bandsFor(id: string, bands: Guide["levelBands"]) {
  if (id === "act-1") return bands.filter((band) => band.to <= 14);
  if (id === "act-2") return bands.filter((band) => band.from >= 15 && band.to <= 29);
  if (id === "act-3") return bands.filter((band) => band.from >= 30 && band.to <= 39);
  if (id === "act-4") return bands.filter((band) => band.from >= 40 && band.to <= 49);
  if (id === "interlude-barya") return bands.filter((band) => band.from >= 50 && band.to <= 54);
  if (id === "interlude-doryani") return bands.filter((band) => band.from >= 55 && band.to <= 59);
  if (id === "endgame") return bands.filter((band) => band.from >= 60);
  return [];
}

export function GuideView({
  guide,
  gameClass,
  initialLevel,
}: {
  guide: Guide;
  gameClass: GameClass;
  initialLevel: number;
}) {
  const [level, setLevel] = useState(initialLevel);
  const [tab, setTab] = useState<Tab>("Overview");
  const [prices, setPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    const raw = localStorage.getItem("poe2-guide-progress");
    if (initialLevel !== 1 || !raw) return;
    try {
      const saved = JSON.parse(raw) as { guideId?: string; level?: number };
      if (saved.guideId === guide.id && typeof saved.level === "number") {
        setLevel(saved.level);
      }
    } catch {
      localStorage.removeItem("poe2-guide-progress");
    }
  }, [guide.id, initialLevel]);

  useEffect(() => {
    localStorage.setItem(
      "poe2-guide-progress",
      JSON.stringify({ guideId: guide.id, level, chapter: chapterForLevel(level) }),
    );
  }, [guide.id, level]);

  const names = useMemo(() => guide.uniques.map((piece) => piece.name), [guide]);

  useEffect(() => {
    const query = names.map((name) => encodeURIComponent(name)).join(",");
    fetch(`/api/economy?names=${query}`)
      .then((response) => response.json())
      .then((body) => {
        const next: Record<string, string> = {};
        for (const item of body.items ?? []) {
          if (typeof item.price === "number") {
            next[item.name.toLowerCase()] = `${item.price < 1 ? item.price.toFixed(3) : item.price.toFixed(1)} divine`;
          }
        }
        setPrices(next);
      })
      .catch(() => setPrices({}));
  }, [names]);

  const activeBand = guide.levelBands.find((band) => level >= band.from && level <= band.to) ?? guide.levelBands[0];
  const owned = Math.max(0, Math.min(64, level - 1));
  const phases = walkOrder
    .map((id) => guide.phases.find((phase) => phase.id === id))
    .filter((phase): phase is Guide["phases"][number] => Boolean(phase));
  const loadout = guide.loadout;

  function priceFor(name: string) {
    return prices[name.toLowerCase()] ?? null;
  }

  return (
    <article>
      <div className="relative mb-8 min-h-[420px] overflow-hidden border border-line bg-black">
        <Image
          src={gameClass.portrait}
          alt={gameClass.name}
          fill
          priority
          className="object-contain object-left"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/55 to-black" />
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-6 sm:ml-auto sm:w-1/2 sm:justify-center">
          <Link href={`/class/${gameClass.id}/${guide.ascendancyId}`} className="text-sm text-muted hover:text-gold">
            {gameClass.name}
          </Link>
          <p className="mt-3 font-display text-xs tracking-[0.22em] text-gold uppercase">
            Patch {guide.patch} · {guide.updated}
          </p>
          <h1 className="mt-2 font-display text-4xl text-parchment sm:text-5xl">{guide.name}</h1>
          <p className="mt-3 leading-7 text-parchment/90">{guide.fantasy}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-6 border border-line bg-panel p-4">
        <label className="text-sm">
          <span className="block text-muted">Your level</span>
          <input
            className="mt-1 w-24 border border-line bg-ink px-2 py-1 text-parchment"
            type="number"
            min={1}
            max={100}
            value={level}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (Number.isFinite(next)) setLevel(Math.min(100, Math.max(1, next)));
            }}
          />
        </label>
        <label className="min-w-48 flex-1 text-sm">
          <span className="block text-muted">Drag to the level you are</span>
          <input
            className="mt-3 w-full accent-gold"
            type="range"
            min={1}
            max={90}
            value={Math.min(level, 90)}
            onChange={(event) => setLevel(Number(event.target.value))}
          />
        </label>
        <p className="text-sm text-gold">You are on {activeBand.title}.</p>
      </div>

      <div id="guide-tabs" className="mt-4 flex flex-wrap gap-2">
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTab(name)}
            className={`border px-3 py-2 text-sm ${tab === name ? "border-gold text-gold" : "border-line text-parchment hover:border-gold"}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === "Overview" ? (
        <section id="overview" className="mt-6 max-w-3xl">
          <p className="text-lg leading-8 text-parchment">{loadout.overview}</p>
          <h2 className="mt-8 font-display text-3xl">Numbers</h2>
          <ul className="mt-3 space-y-2">
            {loadout.numbers.map((line) => (
              <li key={line} className="border border-line bg-panel px-3 py-2 leading-7">
                {line}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-3xl">Ascendancy order</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
            {loadout.ascendancy.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2 className="mt-8 font-display text-3xl">First buttons</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
            {loadout.rotation.slice(0, 4).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-6 text-muted">
            Skills, gear, the passive path, and the full rotation are the other tabs. The wording here is original.
            The links at the bottom are the pages the layout follows.
          </p>
        </section>
      ) : null}

      {tab === "Skills" ? (
        <section id="skills" className="mt-6">
          <p className="max-w-3xl leading-7 text-muted">
            Each row is one skill. The icons to the right are the supports linked into it. A gem with no supports is
            still on the bar. It is listed because the source page names it, and that page does not print a support
            under it.
          </p>
          <div className="mt-4">
            <GemLinks groups={loadout.groups} damage={guide.damage} />
          </div>
        </section>
      ) : null}

      {tab === "Gear" ? (
        <section id="gear" className="mt-6">
          <p className="max-w-3xl leading-7 text-muted">
            Three stages. Early is Acts 1–2. Late is Acts 3–4 and the interludes. Maps are the cap. The paper doll
            under the table is the piece list for the level you set above.
          </p>
          <div className="mt-4 hidden overflow-x-auto border border-line sm:block">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="bg-panel text-gold">
                <tr>
                  <th className="p-3 font-display text-base">Slot</th>
                  <th className="p-3 font-display text-base">Acts 1–2</th>
                  <th className="p-3 font-display text-base">Acts 3–4</th>
                  <th className="p-3 font-display text-base">Maps</th>
                </tr>
              </thead>
              <tbody>
                {loadout.gear.map((row) => (
                  <tr key={row.slot} className="border-t border-line align-top">
                    <th className="p-3 font-display text-base text-parchment">{row.slot}</th>
                    <td className="p-3 leading-6">{row.early}</td>
                    <td className="p-3 leading-6">{row.late}</td>
                    <td className="p-3 leading-6">{row.maps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-3 sm:hidden">
            {loadout.gear.map((row) => (
              <div key={row.slot} className="border border-line p-3">
                <h3 className="font-display text-xl">{row.slot}</h3>
                <p className="mt-2 text-xs tracking-[0.14em] text-gold uppercase">Acts 1–2</p>
                <p className="mt-1 leading-6">{row.early}</p>
                <p className="mt-2 text-xs tracking-[0.14em] text-gold uppercase">Acts 3–4</p>
                <p className="mt-1 leading-6">{row.late}</p>
                <p className="mt-2 text-xs tracking-[0.14em] text-gold uppercase">Maps</p>
                <p className="mt-1 leading-6">{row.maps}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-8 font-display text-3xl">At level {level}</h2>
          <p className="mt-2 leading-7">{activeBand.gem}</p>
          <GearBoard lines={activeBand.armor} weaponNoun={guide.weaponNoun} defence={guide.defence} />
        </section>
      ) : null}

      {tab === "Passive" ? (
        <section id="passive" className="mt-6">
          <TreeMap routeKey={guide.treeKey} owned={owned} />
          <div className="mt-4 border border-line bg-ink/40 p-3">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">Points for {activeBand.title}</p>
            <p className="mt-2 leading-6">{activeBand.pointsIntro}</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 leading-6">
              {activeBand.points.map((point, index) => (
                <li key={`${activeBand.title}-${index}`}>{point}</li>
              ))}
            </ol>
            {activeBand.questPoints.length > 0 ? (
              <div className="mt-3 space-y-2 border-t border-line pt-3">
                <p className="text-xs tracking-[0.16em] text-gold uppercase">Quest points</p>
                {activeBand.questPoints.map((quest) => (
                  <p key={quest} className="leading-6">
                    {quest}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {tab === "Play" ? (
        <section id="play" className="mt-6 max-w-3xl">
          <h2 className="font-display text-3xl">How it runs</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
            {loadout.rotation.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {tab === "Leveling" ? (
        <section id="leveling" className="mt-6">
          <h2 className="font-display text-3xl">Level by level</h2>
          <div className="mt-4 space-y-3">
            {loadout.leveling.map((step) => (
              <div key={step.levels} className="border border-line p-3">
                <p className="font-display text-xl text-gold">{step.levels}</p>
                <p className="mt-2 leading-7">{step.text}</p>
              </div>
            ))}
          </div>
          <nav className="mt-6 flex flex-wrap gap-2">
            {phases.map((phase) => (
              <a key={phase.id} href={`#${phase.id}`} className="border border-line px-3 py-2 text-sm text-parchment hover:border-gold">
                {phase.title.replace(/ ·.*/, "")}
              </a>
            ))}
          </nav>
          <div className="mt-6 space-y-8">
            {phases.map((phase) => {
              const here =
                level >= phase.levelMin &&
                level <= phase.levelMax &&
                !phases.some(
                  (other) =>
                    other.levelMin > phase.levelMin &&
                    level >= other.levelMin &&
                    level <= other.levelMax,
                );
              const upgrades = bandsFor(phase.id, guide.levelBands);
              return (
                <section key={phase.id} id={phase.id} className={`border p-4 ${here ? "border-gold bg-panel" : "border-line"}`}>
                  <h2 className="font-display text-3xl">
                    {phase.title}
                    <span className="ml-3 text-sm text-muted">{phase.levelRange}</span>
                    {here ? <span className="ml-3 text-sm tracking-[0.14em] text-ember uppercase">You are here</span> : null}
                  </h2>
                  <ol className="mt-4 space-y-4">
                    {phase.steps.map((step, index) => (
                      <li key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                        <span className="font-display text-gold">{index + 1}</span>
                        <div>
                          <h3 className="text-lg text-parchment">{step.title}</h3>
                          <p className="mt-1 leading-7 text-muted">{step.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {upgrades.length > 0 ? (
                    <div className="mt-6 space-y-3">
                      <h3 className="font-display text-xl text-gold">Upgrades every 5 levels</h3>
                      {upgrades.map((band) => {
                        const current = band.from === activeBand.from;
                        return (
                          <div key={band.title} className={`border p-3 ${current ? "border-gold" : "border-line"}`}>
                            <p className="font-display text-lg">
                              {band.title}
                              {current ? <span className="ml-3 text-sm tracking-[0.14em] text-ember uppercase">Do this now</span> : null}
                            </p>
                            <p className="mt-2 leading-6">{band.gem}</p>
                            <GearBoard lines={band.armor} weaponNoun={guide.weaponNoun} defence={guide.defence} />
                            <p className="mt-3 text-sm leading-6 text-muted">{band.ignore}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-display text-3xl">Unique suggestions</h2>
        <p className="mt-2 max-w-3xl leading-7 text-muted">
          These are optional. A rare with the stats above is the plan. Wear a unique when it drops and beats that rare.
          Do not buy one to start the build.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {guide.uniques.map((piece) => (
            <div key={piece.name} className="flex gap-4 border border-line p-3">
              <ItemChip name={piece.name} slot={piece.slot} icon={piece.icon} price={priceFor(piece.name)} />
              <div>
                <p className="text-xs tracking-[0.16em] text-gold uppercase">From level {piece.level}</p>
                <p className="mt-2 leading-6">{piece.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 border border-line p-4">
        <h2 className="font-display text-2xl">Sources</h2>
        <p className="mt-2 leading-7 text-muted">
          Maxroll is the long-form guide, with a skill panel, a gear table, and a rotation. Mobalytics is the second
          written source, used where it prints equipment numbers. poe.ninja is the public ladder, for what people are
          actually playing. The sentences on this page are not copied from those sites.
        </p>
        <ul className="mt-3 flex flex-wrap gap-4 text-sm">
          <li>
            <a className="text-gold hover:underline" href={guide.treeUrl} target="_blank" rel="noreferrer">
              Passive tree
            </a>
          </li>
          {guide.links
            .filter((link) => link.url !== guide.treeUrl)
            .map((link) => (
              <li key={link.url}>
                <a className="text-gold hover:underline" href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
}
