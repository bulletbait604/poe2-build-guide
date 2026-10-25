"use client";

import { ItemChip } from "@/components/ItemChip";
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

const walkOrder = ["act-1", "act-2", "act-3", "act-4", "interlude-1", "interlude-2", "interlude-3", "endgame"];

function bandsFor(id: string, bands: Guide["levelBands"]) {
  if (id === "act-1") return bands.filter((band) => band.to <= 14);
  if (id === "act-2") return bands.filter((band) => band.from >= 15 && band.to <= 29);
  if (id === "act-3") return bands.filter((band) => band.from >= 30 && band.to <= 39);
  if (id === "act-4") return bands.filter((band) => band.from >= 40 && band.to <= 49);
  if (id === "interlude-3") return bands.filter((band) => band.from >= 50 && band.to <= 59);
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
  const phases = walkOrder
    .map((id) => guide.phases.find((phase) => phase.id === id))
    .filter((phase): phase is Guide["phases"][number] => Boolean(phase));

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

      <p className="max-w-3xl text-lg leading-8 text-muted">{guide.summary}</p>

      <div className="mt-8 flex flex-wrap items-end gap-6 border border-line bg-panel p-4">
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
        <p className="text-sm text-gold">
          You are on {activeBand.title}. Follow the highlighted chapter, then the upgrade card for this level.
        </p>
      </div>

      <nav className="mt-4 flex flex-wrap gap-2">
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
                        <div className="mt-3 border border-line bg-ink/40 p-3">
                          <p className="text-xs tracking-[0.16em] text-gold uppercase">Passive points</p>
                          <p className="mt-2 leading-6">{band.pointsIntro}</p>
                          <ol className="mt-2 list-decimal space-y-1 pl-5 leading-6">
                            {band.points.map((point, index) => (
                              <li key={`${band.title}-${index}`}>{point}</li>
                            ))}
                          </ol>
                          {band.questPoints.length > 0 ? (
                            <div className="mt-3 space-y-2 border-t border-line pt-3">
                              <p className="text-xs tracking-[0.16em] text-gold uppercase">Quest points</p>
                              {band.questPoints.map((quest) => (
                                <p key={quest} className="leading-6">
                                  {quest}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>
                        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                          {band.armor.map((line) => (
                            <div key={line.slot}>
                              <dt className="text-xs tracking-[0.16em] text-gold uppercase">{line.slot}</dt>
                              <dd className="mt-1 leading-6 text-muted">{line.lookFor}</dd>
                            </div>
                          ))}
                        </dl>
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
        <h2 className="font-display text-2xl">Tree and longer write-ups</h2>
        <p className="mt-2 leading-7 text-muted">
          The upgrade cards already say which node each point goes into. Open the tree to find that name beside your
          class start. One level point arrives at level 2 and then every level. Quest rewards are weapon-set points.
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
