"use client";

import { ItemChip } from "@/components/ItemChip";
import type { GameClass } from "@/content/classes";
import type { Guide, GuideChapter } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const chapters: Array<{ id: GuideChapter | "levels"; label: string }> = [
  { id: "acts", label: "Acts" },
  { id: "interludes", label: "Interludes" },
  { id: "endgame", label: "Endgame" },
  { id: "levels", label: "Every 5 levels" },
];

function chapterForLevel(level: number): GuideChapter | "levels" {
  if (level >= 60) return "endgame";
  if (level >= 52) return "interludes";
  return "acts";
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
  const [chapter, setChapter] = useState<GuideChapter | "levels">(chapterForLevel(initialLevel));
  const [prices, setPrices] = useState<Record<string, string>>({});

  useEffect(() => {
    const raw = localStorage.getItem("poe2-guide-progress");
    if (initialLevel !== 1 || !raw) return;
    try {
      const saved = JSON.parse(raw) as { guideId?: string; level?: number; chapter?: GuideChapter | "levels" };
      if (saved.guideId === guide.id && typeof saved.level === "number") {
        setLevel(saved.level);
        if (saved.chapter) setChapter(saved.chapter);
      }
    } catch {
      localStorage.removeItem("poe2-guide-progress");
    }
  }, [guide.id, initialLevel]);

  useEffect(() => {
    localStorage.setItem(
      "poe2-guide-progress",
      JSON.stringify({ guideId: guide.id, level, chapter }),
    );
  }, [guide.id, level, chapter]);

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
  const phases = guide.phases.filter((phase) => chapter !== "levels" && phase.chapter === chapter);

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
          You are on {activeBand.title}. {guide.skill} is still the skill.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {chapters.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setChapter(entry.id)}
            className={`border px-4 py-2 text-sm ${chapter === entry.id ? "border-gold bg-gold text-ink" : "border-line text-parchment hover:border-gold"}`}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {chapter === "levels" ? (
        <div className="mt-6 space-y-4">
          {guide.levelBands.map((band) => {
            const here = band.from === activeBand.from;
            return (
              <section key={band.title} className={`border p-4 ${here ? "border-gold bg-panel" : "border-line"}`}>
                <h2 className="font-display text-2xl">
                  {band.title}
                  {here ? <span className="ml-3 text-sm tracking-[0.14em] text-ember uppercase">You are here</span> : null}
                </h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs tracking-[0.16em] text-gold uppercase">Gem</dt>
                    <dd className="mt-1 leading-6">{band.gem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-[0.16em] text-gold uppercase">Leave this for later</dt>
                    <dd className="mt-1 leading-6">{band.ignore}</dd>
                  </div>
                </dl>
                <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                  {band.armor.map((line) => (
                    <div key={line.slot}>
                      <dt className="text-xs tracking-[0.16em] text-gold uppercase">{line.slot}</dt>
                      <dd className="mt-1 leading-6">{line.lookFor}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 space-y-5">
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
            return (
              <section key={phase.id} className={`border p-4 ${here ? "border-gold bg-panel" : "border-line"}`}>
                <h2 className="font-display text-2xl">
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
              </section>
            );
          })}
        </div>
      )}

      <section className="mt-10 border border-line bg-panel p-4">
        <h2 className="font-display text-3xl">Armour at level {level}</h2>
        <p className="mt-2 leading-7 text-muted">
          Wear rares and vendor gear with these stats. Leave a slot empty rather than buying a unique to fill it.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {activeBand.armor.map((line) => (
            <div key={line.slot} className="border border-line p-3">
              <dt className="text-xs tracking-[0.16em] text-gold uppercase">{line.slot}</dt>
              <dd className="mt-1 leading-6">{line.lookFor}</dd>
            </div>
          ))}
        </dl>
      </section>

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
          Open the official passive tree and take life plus damage next to your start. The other links are other
          people&apos;s guides, for when you want the long version.
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
