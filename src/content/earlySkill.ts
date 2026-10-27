import type { BuildSpec } from "@/content/buildSpecs";
import { gemTier, joinsAtLevel, requiredLevel } from "@/content/gemFacts";
import catalog from "@/content/gemCatalog.json";
import type { LevelStep, Loadout } from "@/lib/types";

type GemRow = { level: number | null; kind: string };
const gems = catalog as Record<string, GemRow>;
const skillNames = Object.keys(gems).filter((name) => gems[name]?.kind === "skill");

function escapeName(name: string) {
  return name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function starterFor(noun: string) {
  const text = noun.toLowerCase();
  if (text.includes("crossbow")) return "Permafrost Bolts";
  if (text.includes("quarter")) return "Quarterstaff Strike";
  if (text.includes("bow")) return "Bow Shot";
  if (text.includes("spear")) return "Spear Stab";
  if (text.includes("mace")) return "Rolling Slam";
  if (text.includes("sceptre")) return "Skeletal Warrior";
  return "Spark";
}

function bandStart(row: LevelStep) {
  const inText = row.text.match(/\blevel (\d+)\b/i);
  if (inText && /until level|from level|switches at level/i.test(row.text)) return Number(inText[1]);
  const range = row.levels.match(/^(\d+)/);
  return range ? Number(range[1]) : 1;
}

function firstAvailable(text: string, level: number, except: string) {
  let found: { index: number; name: string } | null = null;
  for (const name of skillNames) {
    if (name === except) continue;
    const tier = gemTier(name) ?? requiredLevel(name);
    if (tier > level) continue;
    const index = text.search(new RegExp(`\\b${escapeName(name)}\\b`));
    if (index < 0) continue;
    if (!found || index < found.index) found = { index, name };
  }
  return found?.name ?? null;
}

export function skillAt(spec: BuildSpec, loadout: Loadout, level: number) {
  const ready = joinsAtLevel(spec.skill, loadout.overview, loadout.leveling);
  if (level >= ready) return spec.skill;
  const rows = loadout.leveling.filter((row) => bandStart(row) <= level);
  for (const row of [...rows].reverse()) {
    const named = firstAvailable(row.text, level, spec.skill);
    if (named) return named;
  }
  return starterFor(spec.weaponNoun);
}

// Supporting Fire and Maul have no Uncut Skill Gem Tier on poe2db. Supporting Fire comes from Tactician's Unleash Hell!.
// Maul requires a Talisman and gem level 1 requires level 1. Skeletal Sniper is a persistent minion with a spirit reservation and no Uncut tier.
// Those facts stay here. The lines below only name the button.

/** Level 1 button for a minion guide. Each route names its own skill. Skeletal Sniper is not that button. */
export function minionOpener(spec: BuildSpec) {
  if (spec.id === "disciple-minions") return "Volcano";
  if (spec.id === "spirit-walker-minions") return "Spear Stab";
  if (spec.id === "acolyte-minions") return "Skeletal Warrior";
  return "Unearth";
}

export function pressLine(spec: BuildSpec, loadout: Loadout, level: number) {
  const ready = joinsAtLevel(spec.skill, loadout.overview, loadout.leveling);
  const now = skillAt(spec, loadout, level);
  const hollow = /Hollow Palm/i.test(`${loadout.overview} ${loadout.leveling.map((row) => row.text).join(" ")}`);
  const hands = hollow && level < 21 ? " Hands empty until 21." : "";
  if (spec.skill === "Skeletal Sniper" && level < 30) {
    return `Use ${minionOpener(spec)}. Wait on Skeletal Sniper.${hands}`;
  }
  if (level >= ready) return `Use ${spec.skill}.${hands}`;
  return `Use ${now}. Wait on ${spec.skill}.${hands}`;
}

/**
 * True when a sentence tells the player to use the skill at this moment.
 * A sentence that only names the later swap does not count.
 */
export function instructsUse(text: string, skill: string) {
  const skillPattern = escapeName(skill);
  const tell = new RegExp(
    `\\b(?:use|socket|put|press|link)\\s+(?:the\\s+)?${skillPattern}\\b|\\b${skillPattern}\\s+(?:the|through|into|while|every|on|down)\\b`,
    "i",
  );
  const hold = /do not|don't|wait on|not yet|until level|tier \d+ gem|usable from level|switches at level|joins at level|comes online at level/i;
  return text.split(/(?<=[.!?])\s+|\n/).some((sentence) => tell.test(sentence) && !hold.test(sentence));
}
