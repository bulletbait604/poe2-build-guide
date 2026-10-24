import type { BuildSpec } from "@/content/buildSpecs";
import type { GearPiece, Guide, GuidePhase, ItemRef, LevelBand } from "@/lib/types";

const LINKS = [
  { label: "Passive tree", url: "https://pathofexile2.com/passive-skill-tree" },
  { label: "poe.ninja builds", url: "https://poe.ninja/poe2/builds" },
  { label: "Maxroll guides", url: "https://maxroll.gg/poe2/build-guides" },
  { label: "Mobalytics builds", url: "https://mobalytics.gg/poe-2/builds" },
];

function pickPiece(pieces: GearPiece[], level: number) {
  const order: GearPiece["priority"][] =
    level >= 66 ? ["endgame", "soon", "first"] : level >= 20 ? ["soon", "first"] : ["first"];
  for (const priority of order) {
    const found = pieces
      .filter((piece) => piece.priority === priority && piece.level <= level)
      .sort((left, right) => right.level - left.level)[0];
    if (found) return found;
  }
  return undefined;
}

function pictures(spec: BuildSpec, level: number): ItemRef[] {
  const wearable = spec.gear.filter(
    (piece) => piece.level <= level && (level >= 60 || piece.priority !== "endgame"),
  );
  const weapon = pickPiece(
    wearable.filter((piece) => piece.slot === "Weapon"),
    level,
  );
  const rest = wearable.filter((piece) => piece !== weapon);
  const accent = pickPiece(rest, level);
  const filler = rest.find((piece) => piece !== accent);
  const chosen = [weapon, accent, filler].filter((piece): piece is GearPiece => Boolean(piece));
  const unique = new Map<string, ItemRef>();
  for (const piece of chosen) {
    unique.set(piece.name, { name: piece.name, slot: piece.slot });
  }
  return [...unique.values()];
}

function band(
  spec: BuildSpec,
  from: number,
  to: number,
  title: string,
  equip: string,
  gem: string,
  ignore: string,
): LevelBand {
  return { from, to, title, equip, gem, ignore, items: pictures(spec, to) };
}

function buildBands(spec: BuildSpec): LevelBand[] {
  return [
    band(
      spec,
      1,
      4,
      "Levels 1–4",
      `Use the ${spec.weaponNoun} with the highest damage from the first vendor. ${spec.shop}`,
      `Put ${spec.skill} on it as soon as the gem drops. Leave ${spec.helper} until you have a second skill gem.`,
      `Do not sort the stash. ${spec.defence} on the chest is enough. A support gem is not.`,
    ),
    band(
      spec,
      5,
      9,
      "Levels 5–9",
      "Wear any piece in the leveling list that you now meet the level for. If a plain weapon still kills faster, keep the plain weapon.",
      `Add ${spec.helper}. ${spec.pack}`,
      "Do not buy a third skill. Two gems are the whole build.",
    ),
    band(
      spec,
      10,
      14,
      "Levels 10–14",
      `Check the vendor once. Replace the ${spec.weaponNoun} only when the new one is an obvious damage jump. Keep movement speed on the boots.`,
      `${spec.skill} stays the main skill. ${spec.helper} stays on the bar.`,
      "Do not respec. On the passive tree, take life and damage next to where you started.",
    ),
    band(
      spec,
      15,
      19,
      "Levels 15–19",
      "The Act 2 vendors are a weapon check. A weapon that is five levels old is ready to be replaced.",
      `Look for ${spec.support}. Socket it only if the gem says it supports ${spec.skill}.`,
      "Do not enter the trial in gear that dies to normal monsters.",
    ),
    band(
      spec,
      20,
      24,
      "Levels 20–24",
      `Ascending does not replace the ${spec.weaponNoun}. If packs feel slow, the weapon is the problem.`,
      spec.ascendancyPick,
      "Do not take a second ascendancy node until the first one has been in use for a whole zone.",
    ),
    band(
      spec,
      25,
      29,
      "Levels 25–29",
      "Before the act boss, raise the resistance that is lowest. Life on the chest matters more than a damage ring.",
      `Keep the same gems. A higher-level ${spec.skill} beats a new skill name.`,
      "Do not carry a unique you cannot equip yet.",
    ),
    band(
      spec,
      30,
      34,
      "Levels 30–34",
      `Act 3 hits harder. Get ${spec.defence} on three pieces, not one.`,
      `${spec.skill} and ${spec.helper} are still the bar. If the support is in, stop adding gems.`,
      "Do not path across the passive tree for one notable.",
    ),
    band(
      spec,
      35,
      39,
      "Levels 35–39",
      "Replace boots that have no movement speed. Replace a helmet that has no life and no resistance.",
      `Read ${spec.skill} again. If a socketed support does not match its tags, take that support out.`,
      "Do not craft. A better dropped item is the upgrade.",
    ),
    band(
      spec,
      40,
      44,
      "Levels 40–44",
      `One more weapon check before Act 4. ${spec.shop}`,
      "Keep the same bar. Level the gems you have.",
      "Do not start a second build in the other weapon set.",
    ),
    band(
      spec,
      45,
      49,
      "Levels 45–49",
      `The islands are long. Visit town once per island and replace the ${spec.weaponNoun} if it is behind.`,
      spec.boss,
      "Do not open every side chest. The act boss is the goal.",
    ),
    band(
      spec,
      50,
      54,
      "Levels 50–54",
      "Before the interludes, raise any resistance that is under 40%. Those numbers are about to fall.",
      `Put weapon-set passive points into damage for ${spec.skill}, not into a new branch.`,
      "Do not enter an interlude on a weapon from Act 2.",
    ),
    band(
      spec,
      55,
      59,
      "Levels 55–59",
      "Interlude rule: life, then resistances, then damage, until you stop dying.",
      `${spec.skill} clears. ${spec.helper} is for packs and bosses, not a new combo.`,
      "Do not skip an interlude reward. The points and the spirit are permanent.",
    ),
    band(
      spec,
      60,
      65,
      "Early maps",
      "White maps only. Wear an endgame unique only when you meet its level and it kills faster than what you have.",
      "Add one support at a time. If clear speed drops, take it off.",
      "Do not run rare maps yet, and do not buy a unique that costs more than you have.",
    ),
    band(
      spec,
      66,
      100,
      "Late maps",
      `Weapon first, then the piece with the most life, then resistances to the cap. The defence is ${spec.defence}.`,
      `${spec.skill} is still the skill. A new gem is a different build.`,
      "Do not follow a second guide at the same time. Finish the upgrades on this page first.",
    ),
  ];
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
  const earlyGear = pictures(spec, 12);
  const mapGear = pictures(spec, 70);
  return [
    phase("act-1", "acts", "Act 1", "Levels 1–14", 1, 14, [
      {
        title: "Leave town with one skill",
        detail: `Buy the ${spec.weaponNoun} with the highest damage. ${spec.shop} Put ${spec.skill} on it before you walk out.`,
        items: earlyGear,
      },
      {
        title: "Clearfell and the Grelwood",
        detail: spec.pack,
      },
      {
        title: "Pick up gems, leave the rest",
        detail: "Take every uncut skill gem and uncut support gem. Sell the blue items that are not an upgrade. The stash is not the goal.",
      },
      {
        title: "Count Geonor",
        detail: `${spec.boss} Drink the life flask when you are hit, not when it is empty.`,
      },
      {
        title: "This act, for this build",
        detail: spec.tips.act1,
      },
    ]),
    phase("act-2", "acts", "Act 2", "Levels 14–29", 14, 29, [
      {
        title: "The Vastiri Desert",
        detail: `If one hit takes half your life, fix ${spec.defence} and the lowest resistance before you push on. Then go back to ${spec.skill}.`,
      },
      {
        title: "The caravan vendor",
        detail: `Replace the ${spec.weaponNoun} if it is more than a few levels behind. ${spec.shop}`,
      },
      {
        title: "The first trial",
        detail: spec.ascendancyPick,
      },
      {
        title: "Jamanra",
        detail: spec.boss,
      },
      {
        title: "This act, for this build",
        detail: spec.tips.act2,
      },
    ]),
    phase("act-3", "acts", "Act 3", "Levels 30–42", 30, 42, [
      {
        title: "Sandswept Marsh to the jungle",
        detail: spec.pack,
      },
      {
        title: "The support gem",
        detail: `If ${spec.support} says it supports ${spec.skill}, socket it now. If it does not, use a support that does and leave the rest in the stash.`,
      },
      {
        title: "Doryani",
        detail: `${spec.boss} Cap the resistance that is lowest before you open the door.`,
      },
      {
        title: "This act, for this build",
        detail: spec.tips.act3,
      },
    ]),
    phase("act-4", "acts", "Act 4", "Levels 42–52", 42, 52, [
      {
        title: "Kingsmarch",
        detail: "Sell, identify the pile, and buy a weapon update if the town has one. Then leave. The islands can be done in any order.",
      },
      {
        title: "One island, then town",
        detail: `Finish the island in front of you. Do not sail to a second island on a half-empty flask. ${spec.pack}`,
      },
      {
        title: "Tavakai",
        detail: spec.boss,
      },
      {
        title: "Stop before maps",
        detail: "The Atlas is not open yet. Finish the three interludes first. Their rewards are permanent.",
      },
      {
        title: "This act, for this build",
        detail: spec.tips.act4,
      },
    ]),
    phase("interlude-1", "interludes", "Interlude I · The Curse of Holten", "Levels 52–54", 52, 54, [
      {
        title: "Resistances just dropped",
        detail: "Check the character sheet before the first rare. Raise whatever fell under the cap, starting with the lowest.",
      },
      {
        title: "Stones of Serle, then Holten",
        detail: spec.pack,
      },
      {
        title: "Oswin, the Dread Warden",
        detail: `${spec.boss} Take the weapon-set passive points. Spend them on damage for ${spec.skill}.`,
      },
      {
        title: "This interlude, for this build",
        detail: spec.tips.interlude1,
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
      {
        title: "Azmadi",
        detail: spec.boss,
      },
      {
        title: "This interlude, for this build",
        detail: spec.tips.interlude2,
      },
    ]),
    phase("interlude-3", "interludes", "Interlude III · Doryani's Contingency", "Levels 55–60", 55, 60, [
      {
        title: "Spirit in Kriar Village",
        detail: "Take the spirit. Even a build that does not reserve it yet wants the number.",
      },
      {
        title: "The climb",
        detail: spec.pack,
      },
      {
        title: "Zolin and Zelina",
        detail: `${spec.boss} When both interludes and this one are done, the Atlas opens.`,
      },
      {
        title: "This interlude, for this build",
        detail: spec.tips.interlude3,
      },
    ]),
    phase("endgame", "endgame", "Endgame", "Maps", 60, 100, [
      {
        title: "White maps",
        detail: `Run white maps until ${spec.skill} clears the packs without you stopping. Then, and only then, raise the map tier.`,
        items: mapGear,
      },
      {
        title: "Upgrade order",
        detail: `Weapon, then life, then resistances to the cap. The defence to look for is ${spec.defence}.`,
      },
      {
        title: "One change at a time",
        detail: "Add a single support or a single unique, run two maps, and keep it only if the maps got easier.",
      },
      {
        title: "Bosses",
        detail: spec.boss,
      },
      {
        title: "This build, in maps",
        detail: spec.tips.endgame,
      },
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
    treeUrl: "https://pathofexile2.com/passive-skill-tree",
    gear: spec.gear,
    levelBands: buildBands(spec),
    phases: buildPhases(spec),
    variants: spec.variants,
  };
}
