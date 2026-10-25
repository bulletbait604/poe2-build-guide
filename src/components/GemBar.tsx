"use client";

import { gemInfo } from "@/content/gems";
import Image from "next/image";
import { useState } from "react";

const GEMS = [
  { key: "skill", label: "Main skill" },
  { key: "helper", label: "Second skill" },
  { key: "support", label: "Support" },
] as const;

function gemColor(damage: string) {
  const text = damage.toLowerCase();
  if (text.includes("fire")) return "#e07a3d";
  if (text.includes("cold")) return "#8fd4e8";
  if (text.includes("lightning")) return "#f2e27a";
  if (text.includes("chaos")) return "#b07ad4";
  if (text.includes("minion")) return "#d7c4a3";
  return "#e4c48a";
}

export function GemBar({
  skill,
  helper,
  support,
  damage,
  when,
}: {
  skill: string;
  helper: string;
  support: string;
  damage: string;
  when: string;
}) {
  const color = gemColor(damage);
  const gems = {
    skill: gemInfo(skill, "skill"),
    helper: gemInfo(helper, "helper"),
    support: gemInfo(support, "support"),
  };
  const [open, setOpen] = useState<string | null>(null);
  const activeKey = (open ?? "skill") as keyof typeof gems;
  const active = gems[activeKey];

  return (
    <div className="mt-6">
      <p className="text-xs tracking-[0.16em] text-gold uppercase">Skills</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {GEMS.map((gem) => {
          const info = gems[gem.key];
          const short = info.name.length <= 22 ? info.name : gem.label;
          const shown = open === gem.key;
          return (
            <button
              key={gem.key}
              type="button"
              className="group relative w-28 text-center"
              aria-expanded={shown}
              onClick={() => setOpen(shown ? null : gem.key)}
              onMouseEnter={() => setOpen(gem.key)}
              onFocus={() => setOpen(gem.key)}
            >
              <span
                className="relative mx-auto block h-20 w-20 border bg-black"
                style={{ borderColor: color }}
              >
                {info.icon ? (
                  <Image src={info.icon} alt="" fill className="object-contain p-1.5" sizes="80px" />
                ) : (
                  <svg viewBox="0 0 80 96" className="h-full w-full" aria-hidden>
                    <polygon points="40,4 72,22 72,74 40,92 8,74 8,22" fill="#140f0c" stroke={color} strokeWidth="3" />
                    <polygon points="40,16 60,28 60,68 40,80 20,68 20,28" fill={color} opacity="0.85" />
                  </svg>
                )}
              </span>
              <span className="mt-1 block text-xs tracking-[0.14em] text-muted uppercase">{gem.label}</span>
              <span className="block font-display text-sm text-parchment">{short}</span>
              <span className="pointer-events-none absolute top-full left-1/2 z-20 mt-1 hidden w-56 -translate-x-1/2 border border-gold bg-ink p-3 text-left text-sm leading-6 text-parchment group-hover:block">
                <span className="block text-xs tracking-[0.14em] text-gold uppercase">{when}</span>
                <span className="mt-1 block">{info.tip}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 border border-line bg-ink/40 p-3 text-sm leading-6 sm:hidden">
        <p className="text-xs tracking-[0.14em] text-gold uppercase">{when}</p>
        <p className="mt-1">
          <span className="text-parchment">{active.name}. </span>
          {active.tip}
        </p>
      </div>
    </div>
  );
}
