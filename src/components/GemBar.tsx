"use client";

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
  const names = {
    skill,
    helper,
    support: support.length <= 22 ? support : "Support",
  };
  const notes = {
    skill: `Socket ${skill} as soon as the gem is offered. It stays the main skill.`,
    helper: `${helper} is the second button. Add it when you have a second skill gem.`,
    support: `Socket ${support} only when the gem says it supports ${skill}.`,
  };
  const color = gemColor(damage);

  return (
    <div className="mt-6">
      <p className="text-xs tracking-[0.16em] text-gold uppercase">Skills</p>
      <div className="mt-3 flex flex-wrap gap-4">
        {GEMS.map((gem) => (
          <div key={gem.key} className="group relative w-28 text-center">
            <svg viewBox="0 0 80 96" className="mx-auto h-24 w-20" role="img" aria-label={names[gem.key]}>
              <polygon points="40,4 72,22 72,74 40,92 8,74 8,22" fill="#140f0c" stroke={color} strokeWidth="3" />
              <polygon points="40,16 60,28 60,68 40,80 20,68 20,28" fill={color} opacity="0.85" />
              <polygon points="40,16 60,28 40,40 20,28" fill="#fff" opacity="0.35" />
            </svg>
            <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">{gem.label}</p>
            <p className="font-display text-sm text-parchment">{names[gem.key]}</p>
            <div className="pointer-events-none absolute top-full left-1/2 z-20 mt-1 hidden w-56 -translate-x-1/2 border border-gold bg-ink p-3 text-left text-sm leading-6 text-parchment group-hover:block group-focus-within:block">
              <p className="text-xs tracking-[0.14em] text-gold uppercase">{when}</p>
              <p className="mt-1">{notes[gem.key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
