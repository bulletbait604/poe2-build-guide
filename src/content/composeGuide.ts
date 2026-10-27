import { armorForBand } from "@/content/armorPlan";
import type { BuildSpec } from "@/content/buildSpecs";
import { storyPhases } from "@/content/campaign";
import { gearCardsFor, gearTotalsFor } from "@/content/gearCards";
import { iconFor } from "@/lib/items";
import { mainSkillReadyAt } from "@/content/gemFacts";
import { loadoutFor } from "@/content/loadouts";
import { pointsForBand, routeKeyFor } from "@/content/passivePlan";
import { timelineFor } from "@/content/timeline";
import type { Guide, LevelBand, Loadout } from "@/lib/types";

const TREE = "https://poe2ref.com/passive-tree";

const LINKS = [
  { label: "Passive tree", url: TREE },
  { label: "Official tree", url: "https://pathofexile2.com/passive-skill-tree" },
  { label: "poe.ninja builds", url: "https://poe.ninja/poe2/builds" },
  { label: "Maxroll guides", url: "https://maxroll.gg/poe2/build-guides" },
  { label: "Mobalytics builds", url: "https://mobalytics.gg/poe-2/builds" },
  { label: "Campaign rewards", url: "https://maxroll.gg/poe2/getting-started/permanent-stats-from-campaign" },
  { label: "Campaign walkthrough", url: "https://maxroll.gg/poe2/getting-started/path-of-exile-2-campaign-guide" },
  { label: "0.5 checklist", url: "https://mobalytics.gg/poe-2/guides/0-5-campaign-checklist-stats-rewards-skillpoints-and-more" },
  { label: "poe2db quests", url: "https://poe2db.tw/us/Quest" },
  { label: "poe2db The Lost Lute", url: "https://poe2db.tw/us/The_Lost_Lute" },
  { label: "poe2db boots", url: "https://poe2db.tw/us/Boots_dex" },
  { label: "League-starter tier list", url: "https://maxroll.gg/poe2/tierlists/league-starter-build-tier-list" },
  { label: "Ascendancy tier list", url: "https://maxroll.gg/poe2/tierlists/league-starter-ascendancy-tier-list" },
];

const RANGES: Array<[number, number, string]> = [
  [1, 4, "Levels 1–4"],
  [5, 9, "Levels 5–9"],
  [10, 14, "Levels 10–14"],
  [15, 19, "Levels 15–19"],
  [20, 24, "Levels 20–24"],
  [25, 29, "Levels 25–29"],
  [30, 34, "Levels 30–34"],
  [35, 39, "Levels 35–39"],
  [40, 44, "Levels 40–44"],
  [45, 49, "Levels 45–49"],
  [50, 54, "Levels 50–54"],
  [55, 59, "Levels 55–59"],
  [60, 65, "Early maps"],
  [66, 100, "Late maps"],
];

function buildBands(spec: BuildSpec, loadout: Loadout): LevelBand[] {
  return RANGES.map(([from, to, title]) => {
    const armor = armorForBand(spec, to);
    const equip = armor.map((line) => `${line.slot}: ${line.lookFor}`).join(" ");
    const plan = pointsForBand(spec, from, to);
    return {
      from,
      to,
      title,
      equip,
      armor,
      gem: gemLine(spec, to, loadout),
      ignore: ignoreLine(spec, to),
      pointsIntro: plan.intro,
      points: plan.points,
      questPoints: plan.quests,
    };
  });
}

function gemLine(spec: BuildSpec, to: number, loadout: Loadout) {
  const readyAt = mainSkillReadyAt(spec.skill, loadout.overview, loadout.leveling);
  if (to < readyAt) return `Wait on ${spec.skill}. Use ${spec.helper}.`;
  return spec.skill;
}

function ignoreLine(spec: BuildSpec, to: number) {
  if (to < 61) return `Buy the ${spec.weaponNoun} base on the card.`;
  return `Trade site: ${spec.weaponNoun}.`;
}

export function composeGuide(spec: BuildSpec): Guide {
  const loadout = loadoutFor(spec);
  const seen = new Set<string>();
  const links = [];
  for (const link of [...loadout.sources, ...LINKS]) {
    if (seen.has(link.url)) continue;
    seen.add(link.url);
    links.push(link);
  }
  return {
    id: spec.id,
    patch: "0.5.5",
    updated: "2026-10-25",
    classId: spec.classId,
    ascendancyId: spec.ascendancyId,
    name: spec.name,
    skill: spec.skill,
    helper: spec.helper,
    support: spec.support,
    damage: spec.damage,
    summary: spec.summary,
    fantasy: spec.fantasy,
    links,
    treeUrl: TREE,
    treeKey: routeKeyFor(spec),
    weaponNoun: spec.weaponNoun,
    defence: spec.defence,
    uniques: spec.uniques.map((piece) => ({ ...piece, icon: iconFor(piece.name) })),
    levelBands: buildBands(spec, loadout),
    phases: storyPhases(spec),
    loadout,
    timeline: timelineFor(spec, loadout),
    gearCards: gearCardsFor(spec, loadout.gear),
    gearTotals: gearTotalsFor(spec, loadout.gear),
  };
}
