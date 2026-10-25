import { armorForBand } from "@/content/armorPlan";
import type { BuildSpec } from "@/content/buildSpecs";
import { storyPhases } from "@/content/campaign";
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
  const main = loadout.groups.flatMap((group) => group.skills).find((skill) => skill.name === spec.skill);
  const supports = main?.supports ?? [];
  const first = supports[0];
  if (to <= 4) return `Put ${spec.skill} on the bar as soon as the gem drops. ${spec.helper} is the second button.`;
  if (!first) return `${spec.skill} stays the main skill. ${spec.helper} is the second button. The skill tab lists every gem this route names.`;
  if (to <= 14) return `${spec.skill} stays the main skill. First support: ${first}.`;
  return `Link ${supports.join(", ")} into ${spec.skill}. Add one of those supports at a time. The skill tab is the full layout.`;
}

function ignoreLine(spec: BuildSpec, to: number) {
  if (to <= 9) return "Do not buy a unique to fill a slot. A dropped rare with life is the upgrade.";
  if (to <= 19) return "Do not refund a point you just placed. The list above is the order.";
  if (to <= 29) return "Do not take a second ascendancy node until the first one has been in use for a whole zone.";
  if (to <= 44) return "Do not path across the tree for one notable, and do not start a second build in the other weapon set.";
  if (to <= 59) return "Do not skip an interlude reward. The points and the spirit are permanent.";
  return `Do not buy a unique that costs more than the rare you already have. ${spec.focus}`;
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
    uniques: spec.uniques,
    levelBands: buildBands(spec, loadout),
    phases: storyPhases(spec),
    loadout,
    timeline: timelineFor(spec, loadout),
  };
}
