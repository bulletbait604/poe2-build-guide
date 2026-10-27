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

function switchReason(skill: string, leveling: LevelStep[], readyAt: number) {
  const row = leveling.find((entry) => new RegExp(`\\b${escapeName(skill)}\\b`).test(entry.text));
  if (!row) return "that is when this route's leveling notes put it on the bar";
  const sentence =
    row.text.split(/(?<=\.)\s/).find((part) => new RegExp(`level ${readyAt}\\b`).test(part)) ?? row.text.split(/(?<=\.)\s/)[0];
  const cleaned = sentence.replace(/\.$/, "").trim();
  if (/as soon as it drops|put it on the bar/i.test(cleaned)) {
    return "that is when this route's leveling notes put it on the bar";
  }
  return cleaned;
}

const SOCKET_HELP =
  "Skill gems come from an Uncut Skill Gem. Open the Skills panel, choose the gem, and assign it to the left mouse button.";

/** Level 1 button for a minion guide. Each route names its own skill. Skeletal Sniper is not that button. */
export function minionOpener(spec: BuildSpec) {
  if (spec.id === "disciple-minions") return "Volcano";
  if (spec.id === "spirit-walker-minions") return "Spear Stab";
  if (spec.id === "acolyte-minions") return "Skeletal Warrior";
  return "Unearth";
}

export function pressLine(spec: BuildSpec, loadout: Loadout, level: number) {
  const ready = joinsAtLevel(spec.skill, loadout.overview, loadout.leveling);
  const tier = gemTier(spec.skill) ?? requiredLevel(spec.skill);
  const now = skillAt(spec, loadout, level);
  const hollow = /Hollow Palm/i.test(`${loadout.overview} ${loadout.leveling.map((row) => row.text).join(" ")}`);
  const hands = hollow && level < 21 ? " Both hand slots stay empty until level 21. Hollow Palm Technique turns off if a weapon is equipped." : "";
  if (spec.skill === "Supporting Fire") {
    const grant =
      "Supporting Fire is not an Uncut Skill Gem. poe2db lists no Uncut Skill Gem Tier for it. Tactician's Unleash Hell! grants it.";
    if (level < ready) {
      return `Use ${now} on the left mouse button. ${grant} This route switches at level ${ready}. ${SOCKET_HELP}${hands}`;
    }
    return `Use Supporting Fire on the left mouse button. ${grant} ${SOCKET_HELP}${hands}`;
  }
  if (spec.skill === "Maul") {
    const grant =
      "Maul is not an Uncut Skill Gem. poe2db lists no Uncut Skill Gem Tier. It requires a Talisman. Gem level 1 requires level 1.";
    if (level < ready) {
      return `Use ${now} on the left mouse button. ${grant} This route switches at level ${ready}. ${SOCKET_HELP}${hands}`;
    }
    return `Use Maul on the left mouse button. ${grant} ${SOCKET_HELP}${hands}`;
  }
  if (spec.skill === "Skeletal Sniper") {
    const opener = minionOpener(spec);
    const reservation =
      "Skeletal Sniper is a persistent minion. poe2db does not list an Uncut Skill Gem Tier for it. The gem prints a spirit reservation. Socket it when the character sheet spirit can pay that reservation.";
    if (level < 30) {
      return `Use ${opener} on the left mouse button. Wait on Skeletal Sniper. ${reservation} ${SOCKET_HELP}${hands}`;
    }
    return `Use Skeletal Sniper on the left mouse button if the character sheet spirit can pay the reservation printed on the gem. ${reservation} ${SOCKET_HELP}${hands}`;
  }
  if (level >= ready) {
    return `Use ${spec.skill} on the left mouse button. ${SOCKET_HELP}${hands}`;
  }
  const reason = switchReason(spec.skill, loadout.leveling, ready);
  const tierLine =
    ready === tier
      ? `${spec.skill} is a Tier ${tier} gem: usable from level ${tier}.`
      : `${spec.skill} is a Tier ${tier} gem: usable from level ${tier}; this route switches at level ${ready} because ${reason}.`;
  return `Use ${now} on the left mouse button. ${tierLine} ${SOCKET_HELP}${hands}`;
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
