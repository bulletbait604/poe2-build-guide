import catalog from "@/content/gemCatalog.json";
import type { LevelStep } from "@/lib/types";

export type GemKind = "skill" | "support" | "spirit" | "lineage";

type GemFact = {
  level: number | null;
  kind: GemKind;
};

const facts = catalog as Record<string, GemFact>;

export function gemFact(name: string): GemFact | undefined {
  return facts[name];
}

export function requiredLevel(name: string): number {
  const level = facts[name]?.level;
  return typeof level === "number" ? level : 1;
}

function levelFrom(row: LevelStep): number | null {
  const inText = row.text.match(/\blevel (\d+)\b/i);
  if (inText) return Number(inText[1]);
  const single = row.levels.match(/^(\d+)\+?$/);
  if (single) return Number(single[1]);
  const range = row.levels.match(/^(\d+)\s*[–-]/);
  if (range) return Number(range[1]);
  return null;
}

function mentions(skill: string, text: string) {
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

/**
 * The level this route actually puts the main skill on the bar.
 * Gem required level is the floor. A later swap in the leveling notes wins.
 */
export function mainSkillReadyAt(skill: string, overview: string, leveling: LevelStep[]): number {
  const required = requiredLevel(skill);
  const swap = /joins|respec|swap|becomes the|takes the clear|comes online/i;
  let positive: number | null = null;
  for (const row of leveling) {
    if (!mentions(skill, row.text)) continue;
    if (/do not|not force|before level/i.test(row.text)) continue;
    const level = levelFrom(row);
    if (level === null) continue;
    if (swap.test(row.text)) return Math.max(required, level);
    if (positive === null) positive = level;
  }
  if (positive !== null) return Math.max(required, positive);
  const sentence = overview.split(/(?<=\.)\s/).find((part) => mentions(skill, part) && /level \d+/i.test(part));
  const fromOverview = sentence?.match(/level (\d+)/i);
  if (fromOverview && swap.test(sentence ?? "")) return Math.max(required, Number(fromOverview[1]));
  return required;
}
