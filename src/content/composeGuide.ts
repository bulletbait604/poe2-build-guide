import { armorForBand } from "@/content/armorPlan";
import type { BuildSpec } from "@/content/buildSpecs";
import { pointsForBand } from "@/content/passivePlan";
import type { Guide, GuidePhase, LevelBand } from "@/lib/types";

const TREE = "https://poe2ref.com/passive-tree";

const LINKS = [
  { label: "Passive tree", url: TREE },
  { label: "Official tree", url: "https://pathofexile2.com/passive-skill-tree" },
  { label: "poe.ninja builds", url: "https://poe.ninja/poe2/builds" },
  { label: "Maxroll guides", url: "https://maxroll.gg/poe2/build-guides" },
  { label: "Mobalytics builds", url: "https://mobalytics.gg/poe-2/builds" },
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

function buildBands(spec: BuildSpec): LevelBand[] {
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
      gem: gemLine(spec, to),
      ignore: ignoreLine(spec, to),
      pointsIntro: plan.intro,
      points: plan.points,
      questPoints: plan.quests,
    };
  });
}

function gemLine(spec: BuildSpec, to: number) {
  if (to <= 4) return `Put ${spec.skill} on the bar as soon as the gem drops. ${spec.helper} waits for a second skill gem.`;
  if (to <= 14) return `${spec.skill} stays the main skill. Add ${spec.helper} and use it the way the pack step describes.`;
  if (to <= 24) {
    return `${spec.ascendancyPick} Socket ${spec.support} only if the gem says it supports ${spec.skill}.`;
  }
  if (to <= 44) return `Keep ${spec.skill} and ${spec.helper}. A higher-level gem beats a new skill name.`;
  if (to <= 59) return `${spec.skill} clears. ${spec.helper} is for packs and bosses, not a new combo.`;
  return `${spec.skill} is still the skill. Add one support at a time. A new gem is a different build.`;
}

function ignoreLine(spec: BuildSpec, to: number) {
  if (to <= 9) return "Do not buy a unique to fill a slot. A dropped rare with life is the upgrade.";
  if (to <= 19) return "Do not refund a point you just placed. The list above is the order.";
  if (to <= 29) return "Do not take a second ascendancy node until the first one has been in use for a whole zone.";
  if (to <= 44) return "Do not path across the tree for one notable, and do not start a second build in the other weapon set.";
  if (to <= 59) return "Do not skip an interlude reward. The points and the spirit are permanent.";
  return `Do not buy a unique that costs more than the rare you already have. ${spec.focus}`;
}

function phase(
  id: string,
  chapter: GuidePhase["chapter"],
  title: string,
  levelRange: string,
  levelMin: number,
  levelMax: number,
  steps: GuidePhase["steps"],
): GuidePhase {
  return { id, chapter, title, levelRange, levelMin, levelMax, steps };
}

function buildPhases(spec: BuildSpec): GuidePhase[] {
  return [
    phase("act-1", "acts", "Act 1", "Levels 1–14", 1, 14, [
      {
        title: "Leave town with one skill",
        detail: `Take the ${spec.weaponNoun} with the highest damage. ${spec.weaponStat} Put ${spec.skill} on it before you walk out. A unique is not required.`,
      },
      { title: "Clearfell and the Grelwood", detail: spec.pack },
      {
        title: "The first passive points",
        detail:
          "Level 2 is the first passive point, then one point every level. The upgrade card under this act lists those points in order. A quest reward is a weapon-set point, not a replacement for them.",
      },
      {
        title: "Pick up gems, leave the rest",
        detail: "Take every uncut skill gem and uncut support gem. Sell a blue item that is not an upgrade. Life on the body matters more than a famous name.",
      },
      {
        title: "Count Geonor",
        detail: `${spec.boss} Drink the life flask when you are hit, not when it is empty.`,
      },
      { title: "This act, for this build", detail: spec.focus },
    ]),
    phase("act-2", "acts", "Act 2", "Levels 14–29", 14, 29, [
      {
        title: "The Vastiri Desert",
        detail: `If one hit takes half your life, fix ${spec.defence} and the lowest resistance before you push on. Then go back to ${spec.skill}.`,
      },
      {
        title: "The caravan vendor",
        detail: `Replace the ${spec.weaponNoun} if it is more than a few levels behind. ${spec.weaponStat}`,
      },
      { title: "The first trial", detail: spec.ascendancyPick },
      { title: "Jamanra", detail: spec.boss },
      {
        title: "This act, for this build",
        detail: `The ${spec.weaponNoun} is the upgrade. ${spec.focus}`,
      },
    ]),
    phase("act-3", "acts", "Act 3", "Levels 30–42", 30, 42, [
      { title: "Sandswept Marsh to the jungle", detail: spec.pack },
      {
        title: "The support gem",
        detail: `If ${spec.support} says it supports ${spec.skill}, socket it now. If it does not, use a support that does and leave the rest in the stash.`,
      },
      {
        title: "Doryani",
        detail: `${spec.boss} Raise the resistance that is lowest before you open the door.`,
      },
      {
        title: "This act, for this build",
        detail: `Put ${spec.defence} on the body, the helmet, and one other piece.`,
      },
    ]),
    phase("act-4", "acts", "Act 4", "Levels 42–52", 42, 52, [
      {
        title: "Kingsmarch",
        detail: `Sell, identify the pile, and replace the ${spec.weaponNoun} if the town has a stronger one. Then leave.`,
      },
      {
        title: "One island, then town",
        detail: `Finish the island in front of you. Do not sail to a second island on a half-empty flask. ${spec.pack}`,
      },
      { title: "Tavakai", detail: spec.boss },
      {
        title: "Stop before maps",
        detail: "The Atlas is not open yet. Finish the three interludes first. Their rewards are permanent.",
      },
      {
        title: "This act, for this build",
        detail: `Same ${spec.skill}. Check the ${spec.weaponNoun} in town between islands.`,
      },
    ]),
    phase("interlude-1", "interludes", "Interlude I · The Curse of Holten", "Levels 52–54", 52, 54, [
      {
        title: "Resistances just dropped",
        detail: "Check the character sheet before the first rare. Raise whatever fell, starting with the lowest.",
      },
      { title: "Stones of Serle, then Holten", detail: spec.pack },
      {
        title: "Oswin, the Dread Warden",
        detail: `${spec.boss} Take the weapon-set passive points. Spend them on damage for ${spec.skill}.`,
      },
      {
        title: "This interlude, for this build",
        detail: `The resistance drop is the danger. Fix the lowest resist, then use ${spec.skill}.`,
      },
    ]),
    phase("interlude-2", "interludes", "Interlude II · The Stolen Barya", "Levels 54–56", 54, 56, [
      {
        title: "Khari Crossing",
        detail: "Take the weapon-set points here too. Same rule: damage for the skill you are using.",
      },
      {
        title: "Life, then a boon",
        detail: "Take the maximum-life reward in the Molten Shrine. At the pillar in Qimah, pick resistance or movement speed. You can change the boon later, so pick one and leave.",
      },
      { title: "Azmadi", detail: spec.boss },
      {
        title: "This interlude, for this build",
        detail: `Take the life reward. ${spec.defence} on your gear does not replace life on the chest.`,
      },
    ]),
    phase("interlude-3", "interludes", "Interlude III · Doryani's Contingency", "Levels 55–60", 55, 60, [
      {
        title: "Spirit in Kriar Village",
        detail: `Take the spirit. Even a build that does not reserve it for ${spec.skill} yet wants the number.`,
      },
      { title: "The climb", detail: spec.pack },
      {
        title: "Zolin and Zelina",
        detail: `${spec.boss} When both interludes and this one are done, the Atlas opens.`,
      },
      {
        title: "This interlude, for this build",
        detail: spec.focus,
      },
    ]),
    phase("endgame", "endgame", "Endgame", "Maps", 60, 100, [
      {
        title: "White maps",
        detail: `Run white maps until ${spec.skill} clears the packs without you stopping. Then raise the map tier.`,
      },
      {
        title: "Upgrade order",
        detail: `Weapon damage, then life on the armour, then resistances to the cap. The defence to look for is ${spec.defence}.`,
      },
      {
        title: "Uniques stay optional",
        detail: "A unique in the list below is a suggestion. Wear it when it drops and the stats beat your rare. Do not stop mapping to buy one.",
      },
      { title: "Bosses", detail: spec.boss },
      { title: "This build, in maps", detail: spec.focus },
    ]),
  ];
}

export function composeGuide(spec: BuildSpec): Guide {
  return {
    id: spec.id,
    patch: "0.5.5",
    updated: "2026-10-24",
    classId: spec.classId,
    ascendancyId: spec.ascendancyId,
    name: spec.name,
    skill: spec.skill,
    helper: spec.helper,
    summary: spec.summary,
    fantasy: spec.fantasy,
    links: LINKS,
    treeUrl: TREE,
    uniques: spec.uniques,
    levelBands: buildBands(spec),
    phases: buildPhases(spec),
  };
}
