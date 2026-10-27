"use client";

import { GearCards } from "@/components/GearCards";
import { GemLinks } from "@/components/GemLinks";
import { ItemChip } from "@/components/ItemChip";
import { StatList } from "@/components/StatList";
import { TreeMap } from "@/components/TreeMap";
import { ascendancyIcon, classIcon } from "@/content/ascendancyArt";
import type { GameClass } from "@/content/classes";
import type { Guide, GuideChapter, TimelineStep } from "@/lib/types";
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

const tabs = ["Now", "Leveling", "Skills", "Gear", "Tree", "Play"] as const;
type Tab = (typeof tabs)[number];

function StepCard({
  step,
  active,
  done,
  onToggle,
  guideId,
}: {
  step: TimelineStep;
  active: boolean;
  done: Record<string, boolean>;
  onToggle: (key: string) => void;
  guideId: string;
}) {
  return (
    <article id={`step-${step.level}`} className={`border p-4 ${active ? "border-gold bg-panel" : "border-line bg-[#14110e]"}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl text-parchment">{step.title}</h3>
        {active ? <span className="text-xs tracking-[0.16em] text-ember uppercase">Do this now</span> : null}
      </div>
      <ul className="mt-3 space-y-2">
        {step.checks.map((check, index) => {
          const key = `${guideId}:${step.level}:${index}`;
          const checked = Boolean(done[key]);
          return (
            <li key={key}>
              <label className="flex items-start gap-3 text-sm leading-6">
                <input
                  type="checkbox"
                  className="mt-1 accent-gold"
                  checked={checked}
                  onChange={() => onToggle(key)}
                />
                <span className={`flex items-start gap-2 ${checked ? "text-muted line-through" : "text-parchment"}`}>
                  {check.image ? (
                    <span className="relative mt-0.5 h-8 w-8 shrink-0 border border-line bg-black">
                      <Image src={check.image} alt="" fill className="object-contain p-0.5" sizes="32px" />
                    </span>
                  ) : null}
                  <span>
                    <span className="block text-xs tracking-[0.12em] text-gold uppercase">
                      {check.act} · {check.zone} · {check.quest}
                    </span>
                    <span className="block whitespace-pre-line">{check.text}</span>
                  </span>
                </span>
              </label>
              {check.stats?.length ? (
                <div data-gear-section="check" className="pl-7">
                  <StatList lines={check.stats} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function GuideView({
  guide,
  gameClass,
  initialLevel,
  initialTab = "Now",
}: {
  guide: Guide;
  gameClass: GameClass;
  initialLevel: number;
  initialTab?: Tab;
}) {
  const [level, setLevel] = useState(initialLevel);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const raw = localStorage.getItem("poe2-guide-progress");
    if (initialLevel !== 1 || !raw) return;
    try {
      const saved = JSON.parse(raw) as { guideId?: string; level?: number };
      if (saved.guideId === guide.id && typeof saved.level === "number") setLevel(saved.level);
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

  useEffect(() => {
    const raw = localStorage.getItem(`poe2-checks:${guide.id}`);
    if (!raw) {
      setDone({});
      return;
    }
    try {
      setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      setDone({});
    }
  }, [guide.id]);

  function toggle(key: string) {
    setDone((current) => {
      const next = { ...current, [key]: !current[key] };
      localStorage.setItem(`poe2-checks:${guide.id}`, JSON.stringify(next));
      return next;
    });
  }

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
  const currentIndex = guide.timeline.reduce((found, step, index) => (step.level <= level ? index : found), 0);
  const current = guide.timeline[currentIndex];
  const upcoming = guide.timeline[currentIndex + 1];
  const ascendancyName = gameClass.ascendancies.find((row) => row.id === guide.ascendancyId)?.name ?? "";
  const portrait = classIcon(gameClass.name);
  const ascendancyArt = ascendancyIcon(ascendancyName);

  function priceFor(name: string) {
    return prices[name.toLowerCase()] ?? null;
  }

  return (
    <article className="text-[15px] leading-6">
      <header className="grid gap-4 border border-line bg-black sm:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative h-40 sm:h-full sm:min-h-44">
          <Image src={gameClass.portrait} alt="" fill priority className="object-cover object-top" sizes="180px" />
        </div>
        <div className="flex flex-col justify-center px-4 py-4 sm:px-6">
          <Link href={`/class/${gameClass.id}/${guide.ascendancyId}`} className="text-sm text-muted hover:text-gold">
            {gameClass.name}
          </Link>
          <p className="mt-1 text-xs tracking-[0.18em] text-gold uppercase">
            Patch {guide.patch} · {guide.updated}
          </p>
          <div className="mt-2 flex items-center gap-3">
            {portrait ? (
              <span className="relative h-10 w-10 shrink-0 border border-gold/40 bg-black">
                <Image src={portrait} alt="" fill className="object-contain p-1" sizes="40px" />
              </span>
            ) : null}
            {ascendancyArt ? (
              <span className="relative h-10 w-10 shrink-0 border border-gold/40 bg-black">
                <Image src={ascendancyArt} alt="" fill className="object-contain p-1" sizes="40px" />
              </span>
            ) : null}
            <h1 className="font-display text-4xl text-parchment">{guide.name}</h1>
          </div>
          <p className="mt-2 max-w-2xl text-muted">{guide.summary}</p>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap items-end gap-4 border border-line bg-panel p-3">
        <label className="text-sm">
          <span className="block text-muted">Your level</span>
          <input
            className="mt-1 w-20 border border-line bg-ink px-2 py-1 text-parchment"
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
        <label className="min-w-40 flex-1 text-sm">
          <span className="block text-muted">Drag to where you are</span>
          <input
            className="mt-3 w-full accent-gold"
            type="range"
            min={1}
            max={100}
            value={level}
            onChange={(event) => setLevel(Number(event.target.value))}
          />
        </label>
        <p className="text-sm text-gold">Level {level}. {current?.title}.</p>
      </div>

      <div id="guide-tabs" className="sticky top-0 z-40 mt-3 flex flex-wrap gap-1 bg-ink/95 py-2 backdrop-blur">
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTab(name)}
            className={`border px-3 py-2 text-sm ${tab === name ? "border-gold bg-gold text-ink" : "border-line text-parchment hover:border-gold"}`}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === "Now" && current ? (
        <section id="now" className="mt-2 space-y-4">
          <StepCard step={current} active done={done} onToggle={toggle} guideId={guide.id} />
          {upcoming ? (
            <div>
              <p className="mb-2 text-xs tracking-[0.16em] text-gold uppercase">Coming up</p>
              <StepCard step={upcoming} active={false} done={done} onToggle={toggle} guideId={guide.id} />
            </div>
          ) : null}
        </section>
      ) : null}

      {tab === "Leveling" ? (
        <section id="leveling" className="mt-2">
          <div className="mt-4 space-y-3 border-l border-gold/40 pl-4">
            {guide.timeline.map((step, index) => (
              <StepCard
                key={step.level}
                step={step}
                active={index === currentIndex}
                done={done}
                onToggle={toggle}
                guideId={guide.id}
              />
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <h2 className="font-display text-2xl">Quest rewards, act by act</h2>
            {phases.map((phase) => (
              <details key={phase.id} id={phase.id} className="border border-line bg-[#14110e] p-3" open={level >= phase.levelMin && level <= phase.levelMax}>
                <summary className="cursor-pointer font-display text-xl text-parchment">
                  {phase.title} <span className="text-sm text-muted">{phase.levelRange}</span>
                </summary>
                <ol className="mt-3 space-y-3">
                  {phase.steps.map((step, index) => (
                    <li key={step.title}>
                      <div className="flex items-start gap-2">
                        {step.image ? (
                          <span className="relative mt-0.5 h-8 w-8 shrink-0 border border-line bg-black">
                            <Image src={step.image} alt="" fill className="object-contain p-0.5" sizes="32px" />
                          </span>
                        ) : null}
                        <div>
                          <p className="text-parchment">
                            {index + 1}. {step.title}
                          </p>
                          <p className="mt-1 text-xs tracking-[0.12em] text-gold uppercase">
                            {step.act} · {step.zone} · {step.quest}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-parchment">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "Skills" ? (
        <section id="skills" className="mt-2">
          <GemLinks groups={guide.loadout.groups} damage={guide.damage} />
        </section>
      ) : null}

      {tab === "Gear" ? (
        <section id="gear" className="mt-2">
          <div className="mt-4">
            <GearCards cards={guide.gearCards} totals={guide.gearTotals} level={level} />
          </div>
        </section>
      ) : null}

      {tab === "Tree" ? (
        <section id="passive" className="mt-2">
          <div className="mb-4 border border-gold bg-panel p-4">
            <p className="text-xs tracking-[0.16em] text-gold uppercase">campaign path</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              {activeBand.points.slice(0, 4).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
          </div>
          <TreeMap routeKey={guide.treeKey} owned={owned} />
        </section>
      ) : null}

      {tab === "Play" ? (
        <section id="play" className="mt-2 max-w-3xl">
          <h2 className="font-display text-2xl">Press the buttons in this order</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            {guide.loadout.rotation.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2 className="mt-8 font-display text-2xl">Ascendancy</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            {guide.loadout.ascendancy.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-display text-2xl">Uniques</h2>
        <p className="mt-2 max-w-3xl text-muted">Wear it if it beats your rare.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {guide.uniques.map((piece) => (
            <div key={piece.name} className="flex gap-3 border border-line p-3">
              <ItemChip name={piece.name} slot={piece.slot} icon={piece.icon} price={priceFor(piece.name)} />
              <div>
                <p className="text-xs tracking-[0.16em] text-gold uppercase">From level {piece.level}</p>
                <p className="mt-1">{piece.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border border-line p-4">
        <h2 className="font-display text-xl">Sources</h2>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm">
          {guide.links.map((link) => (
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
