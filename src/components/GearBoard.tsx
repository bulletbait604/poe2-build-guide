"use client";

import { gearIcon } from "@/content/gearArt";
import type { ArmorLine } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

const ORDER = ["Weapon", "Helmet", "Body", "Gloves", "Boots", "Amulet", "Ring", "Belt"] as const;

type Piece = {
  slot: string;
  label: string;
  lookFor: string;
  icon: string;
};

function piecesFor(lines: ArmorLine[], weaponNoun: string, defence: string): Piece[] {
  const bySlot = new Map(lines.map((line) => [line.slot, line]));
  const jewelry = bySlot.get("Jewelry");
  const pieces: Piece[] = [];
  for (const slot of ORDER) {
    if (slot === "Amulet" || slot === "Ring" || slot === "Belt") {
      if (!jewelry) continue;
      pieces.push({
        slot,
        label: slot,
        lookFor: jewelry.lookFor,
        icon: gearIcon(slot, weaponNoun, defence),
      });
      continue;
    }
    const line = bySlot.get(slot);
    if (!line) continue;
    pieces.push({
      slot,
      label: slot,
      lookFor: line.lookFor,
      icon: gearIcon(slot, weaponNoun, defence),
    });
  }
  return pieces;
}

export function GearBoard({
  lines,
  weaponNoun,
  defence,
}: {
  lines: ArmorLine[];
  weaponNoun: string;
  defence: string;
}) {
  const pieces = piecesFor(lines, weaponNoun, defence);
  const [open, setOpen] = useState<string | null>(null);
  const active = pieces.find((piece) => piece.slot === open) ?? null;

  return (
    <div className="mt-3">
      <p className="text-xs tracking-[0.16em] text-gold uppercase">Gear for this level</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {pieces.map((piece) => {
          const shown = open === piece.slot;
          return (
            <button
              key={piece.slot}
              type="button"
              className={`group relative border bg-ink/70 p-2 text-left ${shown ? "border-gold" : "border-gold/40"} hover:border-gold`}
              aria-expanded={shown}
              onClick={() => setOpen(shown ? null : piece.slot)}
              onMouseEnter={() => setOpen(piece.slot)}
              onFocus={() => setOpen(piece.slot)}
            >
              <span className="relative mx-auto block h-16 w-16 border border-gold/40 bg-black">
                <Image src={piece.icon} alt="" fill className="object-contain p-1" sizes="64px" />
              </span>
              <span className="mt-2 block text-center font-display text-xs tracking-wide text-parchment uppercase">
                {piece.label}
              </span>
              <span className="pointer-events-none absolute top-full left-0 z-20 mt-1 hidden w-64 border border-gold bg-ink p-3 text-sm leading-6 text-parchment shadow-lg group-hover:block">
                {piece.lookFor}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 border border-line bg-ink/40 p-3 text-sm leading-6 sm:hidden">
        {active ? (
          <>
            <span className="text-gold">{active.label}. </span>
            {active.lookFor}
          </>
        ) : (
          <span className="text-muted">Tap a piece to see the stats to look for.</span>
        )}
      </div>
    </div>
  );
}
