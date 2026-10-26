"use client";

import { StatList } from "@/components/StatList";
import type { GearCard, GearTotal } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

function pick(cards: GearCard[], used: Set<string>, pattern: RegExp) {
  const card = cards.find((row) => !used.has(row.slot) && pattern.test(row.slot));
  if (card) used.add(card.slot);
  return card ?? null;
}

function dollSlots(cards: GearCard[]) {
  const used = new Set<string>();
  const weapon = pick(cards, used, /^(bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff)$/i);
  const offhand = pick(cards, used, /quiver|shield/i);
  const grid = [
    weapon,
    pick(cards, used, /helm/i),
    offhand,
    pick(cards, used, /glove/i),
    pick(cards, used, /body/i),
    pick(cards, used, /amulet/i),
    pick(cards, used, /ring/i),
    pick(cards, used, /boot/i),
    pick(cards, used, /belt/i),
  ];
  const extra = cards.filter((row) => !used.has(row.slot));
  return { grid, extra };
}

function Lines({ title, lines, active }: { title: string; lines: string[]; active: boolean }) {
  return (
    <div className={active ? "border border-gold bg-panel p-3" : "border border-line p-3"} data-gear-section={title}>
      <p className="text-xs tracking-[0.16em] text-gold uppercase">{active ? `${title} · now` : title}</p>
      <StatList lines={lines} />
    </div>
  );
}

function SlotButton({
  card,
  selected,
  level,
  onOpen,
}: {
  card: GearCard;
  selected: boolean;
  level: number;
  onOpen: (slot: string) => void;
}) {
  const lines = level < 60 ? card.leveling : card.endgame;
  return (
    <div data-gear-section={card.slot} className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(card.slot)}
        className={`flex w-full flex-col items-center gap-1 border bg-black p-1 ${selected ? "border-gold" : "border-line hover:border-gold"}`}
      >
        <span className="relative h-14 w-14 sm:h-16 sm:w-16">
          <Image src={card.icon} alt="" fill className="object-contain" sizes="64px" />
        </span>
        <span className="w-full truncate text-center text-[10px] tracking-[0.12em] text-parchment uppercase">{card.slot}</span>
      </button>
      <StatList lines={lines} />
    </div>
  );
}

export function GearCards({ cards, totals, level }: { cards: GearCard[]; totals: GearTotal[]; level: number }) {
  const [open, setOpen] = useState(cards[0]?.slot ?? "");
  const selected = cards.find((card) => card.slot === open) ?? cards[0];
  const { grid, extra } = dollSlots(cards);
  const levelingNow = level < 60;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className={levelingNow ? "border border-gold bg-panel p-3" : "border border-line p-3"} data-gear-section="totals-leveling">
          <p className="text-xs tracking-[0.16em] text-gold uppercase">{levelingNow ? "Leveling · now" : "Leveling"}</p>
          <StatList lines={totals.map((row) => row.leveling).filter(Boolean)} />
        </div>
        <div className={levelingNow ? "border border-line p-3" : "border border-gold bg-panel p-3"} data-gear-section="totals-endgame">
          <p className="text-xs tracking-[0.16em] text-gold uppercase">{levelingNow ? "Endgame" : "Endgame · now"}</p>
          <StatList lines={totals.map((row) => row.endgame).filter(Boolean)} />
        </div>
      </div>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[292px_minmax(0,1fr)]">
        <div>
          <div className="grid grid-cols-3 gap-2">
            {grid.map((card, index) =>
              card ? (
                <SlotButton key={card.slot} card={card} selected={selected?.slot === card.slot} level={level} onOpen={setOpen} />
              ) : (
                <span key={`empty-${index}`} className="min-h-[76px] border border-dashed border-line/60 bg-black/30" />
              ),
            )}
          </div>
          {extra.length ? (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {extra.map((card) => (
                <SlotButton key={card.slot} card={card} selected={selected?.slot === card.slot} level={level} onOpen={setOpen} />
              ))}
            </div>
          ) : null}
        </div>

        {selected ? (
          <article className="border border-line bg-[#14110e] p-3">
            <div className="flex gap-3">
              <span className="relative h-16 w-16 shrink-0 border border-gold/40 bg-black">
                <Image src={selected.icon} alt="" fill className="object-contain p-1" sizes="64px" />
              </span>
              <div>
                <h3 className="font-display text-2xl text-parchment">{selected.slot}</h3>
                <p className="text-parchment">{selected.base}</p>
              </div>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Lines title="Leveling" lines={selected.leveling} active={levelingNow} />
              <Lines title="Endgame" lines={selected.endgame} active={!levelingNow} />
            </div>
            <p className="mt-3 text-sm text-muted">
              <span className="text-gold">Skip. </span>
              {selected.skip}
            </p>
            <p className="mt-2 text-sm text-parchment">
              <span className="text-gold">How to get it. </span>
              {selected.how}
            </p>
          </article>
        ) : null}
      </div>
    </div>
  );
}
