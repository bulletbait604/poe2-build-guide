"use client";

import type { ArmorLine } from "@/lib/types";

const ORDER = ["Helmet", "Weapon", "Body", "Gloves", "Boots", "Jewelry"] as const;

function slotArt(slot: string) {
  if (slot === "Helmet") {
    return (
      <path d="M16 28c0-8 4-16 16-16s16 8 16 16v6H16v-6zm6 6h20l-2 8H24l-2-8z" />
    );
  }
  if (slot === "Body") {
    return <path d="M18 12h28l6 10-8 30H20L12 22l6-10zm8 8h12l2 22H24l2-22z" />;
  }
  if (slot === "Gloves") {
    return <path d="M14 20h8v22h-6l-4-8 2-14zm10-4h6v26h-6V16zm8 2h6v24h-6V18zm8 4h6v18h-8l2-18z" />;
  }
  if (slot === "Boots") {
    return <path d="M18 12h10v18l10 8v8H16v-8l6-6V12zm18 0h10v20l-4 6v8H28v-6l8-8V12z" />;
  }
  if (slot === "Weapon") {
    return <path d="M30 6h4v28h8v4H22v-4h8V6z" />;
  }
  return <path d="M32 14a10 10 0 1 0 .1 0zM32 20a4 4 0 1 1-.1 0z" />;
}

export function GearBoard({ lines }: { lines: ArmorLine[] }) {
  const bySlot = new Map(lines.map((line) => [line.slot, line]));
  const pieces = ORDER.map((slot) => bySlot.get(slot)).filter((line): line is ArmorLine => Boolean(line));

  return (
    <div className="mt-3">
      <p className="text-xs tracking-[0.16em] text-gold uppercase">Gear for this level</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {pieces.map((piece) => (
          <div key={piece.slot} className="group relative">
            <div className="flex items-center gap-3 border border-gold/40 bg-ink/70 p-2 hover:border-gold">
              <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 bg-black/60 text-gold" aria-hidden>
                <rect x="2" y="2" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
                <g fill="currentColor" opacity="0.9">
                  {slotArt(piece.slot)}
                </g>
              </svg>
              <span className="font-display text-sm tracking-wide text-parchment uppercase">{piece.slot}</span>
            </div>
            <div className="pointer-events-none absolute top-full left-0 z-20 mt-1 hidden w-64 border border-gold bg-ink p-3 text-sm leading-6 text-parchment shadow-lg group-hover:block group-focus-within:block">
              {piece.lookFor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
