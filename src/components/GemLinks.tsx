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

function Socket({
  name,
  role,
  color,
  large,
  index,
  onOpen,
}: {
  name: string;
  role: "skill" | "helper" | "support";
  color: string;
  large?: boolean;
  index?: number;
  onOpen: (name: string) => void;
}) {
  const info = gemInfo(name, role);
  const size = large ? "h-20 w-20" : "h-14 w-14";
  return (
    <button
      type="button"
      className="group relative w-24 shrink-0 text-center hover:z-30"
      onClick={() => onOpen(name)}
      onMouseEnter={() => onOpen(name)}
    >
      {index ? <span className="mb-1 block font-display text-xs text-gold">{index}</span> : <span className="mb-1 block h-4" />}
      <span className={`relative mx-auto block border bg-black ${size}`} style={{ borderColor: color }}>
        {info.icon ? (
          <Image src={info.icon} alt="" fill className="object-contain p-1" sizes="80px" />
        ) : (
          <svg viewBox="0 0 80 96" className="h-full w-full" aria-hidden>
            <polygon points="40,4 72,22 72,74 40,92 8,74 8,22" fill="#140f0c" stroke={color} strokeWidth="3" />
            <polygon points="40,16 60,28 60,68 40,80 20,68 20,28" fill={color} opacity="0.85" />
          </svg>
        )}
      </span>
      <span className={`mt-1 block leading-4 ${large ? "font-display text-sm text-parchment" : "text-xs text-muted"}`}>{name}</span>
      <span className="pointer-events-none absolute top-full left-1/2 z-20 mt-1 hidden w-52 -translate-x-1/2 border border-gold bg-ink p-3 text-left text-sm leading-6 text-parchment group-hover:block">
        {info.tip}
      </span>
    </button>
  );
}

export function GemLinks({ groups, damage }: { groups: GemGroup[]; damage: string }) {
  const color = colorFor(damage);
  const [open, setOpen] = useState<string | null>(groups[0]?.skills[0]?.name ?? null);
  const active = open ? gemInfo(open, "skill") : null;

  return (
    <div className="space-y-5" id="gem-links">
      {groups.map((group) => (
        <section key={group.label} className="border border-line bg-[#14110e] p-4">
          <h3 className="font-display text-xl text-parchment">{group.label}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted">{group.detail}</p>
          <div className="mt-4 space-y-3">
            {group.skills.map((skill) => (
              <div key={`${group.label}-${skill.name}`} className="border border-line/80 bg-black/50 p-3">
                <div className="flex flex-wrap items-end gap-2">
                  <Socket name={skill.name} role="skill" color={color} large onOpen={setOpen} />
                  {skill.supports.length > 0 ? (
                    <div className="flex flex-wrap items-end gap-2 border-t border-gold/40 pt-2 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3">
                      {skill.supports.map((support, index) => (
                        <Socket
                          key={`${skill.name}-${support}`}
                          name={support}
                          role="support"
                          color={color}
                          index={index + 1}
                          onOpen={setOpen}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="mb-6 text-sm text-muted">Use this button by itself.</p>
                  )}
                </div>
                {skill.supports.length > 0 ? (
                  <p className="mt-2 text-xs leading-5 text-muted">
                    Add these in order. Support 1 first. Stop when you run out of sockets. The last number is the one you drop.
                  </p>
                ) : null}
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
    </div>
  );
}
