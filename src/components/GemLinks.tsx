"use client";

import { gemInfo } from "@/content/gems";
import type { GemGroup } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";

function colorFor(damage: string) {
  const text = damage.toLowerCase();
  if (text.includes("fire")) return "#e07a3d";
  if (text.includes("cold")) return "#8fd4e8";
  if (text.includes("lightning")) return "#f2e27a";
  if (text.includes("chaos")) return "#b07ad4";
  if (text.includes("minion")) return "#d7c4a3";
  return "#e4c48a";
}

function GemFace({ name, role, color }: { name: string; role: "skill" | "helper" | "support"; color: string }) {
  const info = gemInfo(name, role);
  return (
    <span className="relative block h-14 w-14 border bg-black sm:h-16 sm:w-16" style={{ borderColor: color }}>
      {info.icon ? (
        <Image src={info.icon} alt="" fill className="object-contain p-1" sizes="64px" />
      ) : (
        <svg viewBox="0 0 80 96" className="h-full w-full" aria-hidden>
          <polygon points="40,4 72,22 72,74 40,92 8,74 8,22" fill="#140f0c" stroke={color} strokeWidth="3" />
          <polygon points="40,16 60,28 60,68 40,80 20,68 20,28" fill={color} opacity="0.85" />
        </svg>
      )}
    </span>
  );
}

export function GemLinks({ groups, damage }: { groups: GemGroup[]; damage: string }) {
  const color = colorFor(damage);
  const [open, setOpen] = useState<string | null>(groups[0]?.skills[0]?.name ?? null);
  const active = open ? gemInfo(open, "skill") : null;

  return (
    <div className="space-y-6" id="gem-links">
      {groups.map((group) => (
        <section key={group.label} className="border border-line bg-panel p-4">
          <h3 className="font-display text-2xl text-parchment">{group.label}</h3>
          <p className="mt-2 max-w-3xl leading-7 text-muted">{group.detail}</p>
          <div className="mt-4 space-y-4">
            {group.skills.map((skill) => (
              <div key={`${group.label}-${skill.name}`} className="border border-line bg-ink/40 p-3">
                <div className="flex gap-3 overflow-x-auto pb-1">
                  <button
                    type="button"
                    className="group relative w-28 shrink-0 text-center hover:z-30"
                    onClick={() => setOpen(skill.name)}
                    onMouseEnter={() => setOpen(skill.name)}
                  >
                    <GemFace name={skill.name} role="skill" color={color} />
                    <span className="mt-1 block font-display text-sm text-parchment">{skill.name}</span>
                    <span className="pointer-events-none absolute top-full left-0 z-20 mt-1 hidden w-56 border border-gold bg-ink p-3 text-left text-sm leading-6 text-parchment group-hover:block">
                      {gemInfo(skill.name, "skill").tip}
                    </span>
                  </button>
                  {skill.supports.length > 0 ? (
                    <div className="flex min-w-0 flex-1 items-start gap-2 border-l border-gold/50 pl-3">
                      {skill.supports.map((support) => (
                        <button
                          key={`${skill.name}-${support}`}
                          type="button"
                          className="group relative w-24 shrink-0 text-center hover:z-30"
                          onClick={() => setOpen(support)}
                          onMouseEnter={() => setOpen(support)}
                        >
                          <GemFace name={support} role="support" color={color} />
                          <span className="mt-1 block text-xs leading-4 text-muted">{support}</span>
                          <span className="pointer-events-none absolute top-full left-1/2 z-20 mt-1 hidden w-52 -translate-x-1/2 border border-gold bg-ink p-3 text-left text-sm leading-6 text-parchment group-hover:block">
                            {gemInfo(support, "support").tip}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="self-center text-sm text-muted">No support is printed for this gem.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      {active ? (
        <div className="border border-gold bg-ink p-3 text-sm leading-6 sm:hidden">
          <p className="text-xs tracking-[0.14em] text-gold uppercase">{active.name}</p>
          <p className="mt-1">{active.tip}</p>
        </div>
      ) : null}
      <p className="text-sm text-muted">Tap a gem on a phone to pin the note. On a wider screen, hover the icon.</p>
    </div>
  );
}
