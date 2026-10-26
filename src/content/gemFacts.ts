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

/** poe2db Uncut Skill Gem tier. This is not the level the route puts the skill on the bar. */
export function gemTier(name: string): number | null {
  // The catalog number is not an Uncut Skill Gem tier. The gem reserves spirit instead.
  if (name === "Skeletal Sniper") return null;
  const level = facts[name]?.level;
  return typeof level === "number" ? level : null;
}

/** Tier N is treated as usable from character level N. A route may switch later than this. */
export function requiredLevel(name: string): number {
  return gemTier(name) ?? 1;
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
 * joinsAtLevel: when this route puts the main skill on the bar.
 * gemTier is only the floor. A later swap in the leveling notes wins.
 */
export function mainSkillReadyAt(skill: string, overview: string, leveling: LevelStep[]): number {
  // Persistent minion. poe2db does not list an Uncut Skill Gem Tier. A joins-at level would add a false "socket now" card.
  if (skill === "Skeletal Sniper") return 1;
  const required = requiredLevel(skill);
  const swap = /joins|respec|swap|becomes the|takes the clear|comes online|switches at/i;
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

export function joinsAtLevel(skill: string, overview: string, leveling: LevelStep[]) {
  return mainSkillReadyAt(skill, overview, leveling);
}
