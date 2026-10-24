export type AscendancyInfo = {
  id: string;
  name: string;
  blurb: string;
  guideId: string;
  primary: boolean;
};

export type GameClass = {
  id: string;
  name: string;
  attribute: string;
  weapon: string;
  portrait: string;
  tagline: string;
  ascendancies: AscendancyInfo[];
};

export const classes: GameClass[] = [
  {
    id: "warrior",
    name: "Warrior",
    attribute: "Strength",
    weapon: "Mace and shield",
    portrait: "/portraits/warrior.jpg",
    tagline: "Stand in front of the pack and break it.",
    ascendancies: [
      {
        id: "titan",
        name: "Titan",
        blurb: "Big hits and stun. The written route is Earthquake.",
        guideId: "titan-earthquake",
        primary: true,
      },
      {
        id: "warbringer",
        name: "Warbringer",
        blurb: "Same mace route. Shout and drop a totem before you slam.",
        guideId: "titan-earthquake",
        primary: false,
      },
      {
        id: "smith-of-kitava",
        name: "Smith of Kitava",
        blurb: "Same mace route. Fire resistance becomes the armour.",
        guideId: "titan-earthquake",
        primary: false,
      },
    ],
  },
  {
    id: "mercenary",
    name: "Mercenary",
    attribute: "Strength and Dexterity",
    weapon: "Crossbow",
    portrait: "/portraits/mercenary.jpg",
    tagline: "Shoot, reload, and keep a grenade for the pile.",
    ascendancies: [
      {
        id: "witchhunter",
        name: "Witchhunter",
        blurb: "The written route is Galvanic Shards.",
        guideId: "witchhunter-galvanic-shards",
        primary: true,
      },
      {
        id: "tactician",
        name: "Tactician",
        blurb: "Same crossbow route. Plant a banner, then shoot.",
        guideId: "witchhunter-galvanic-shards",
        primary: false,
      },
      {
        id: "gemling-legionnaire",
        name: "Gemling Legionnaire",
        blurb: "Same crossbow route. Gem levels are the upgrade.",
        guideId: "witchhunter-galvanic-shards",
        primary: false,
      },
    ],
  },
  {
    id: "ranger",
    name: "Ranger",
    attribute: "Dexterity",
    weapon: "Bow and quiver",
    portrait: "/portraits/ranger.jpg",
    tagline: "Drop a rod, then fill the pack with arrows.",
    ascendancies: [
      {
        id: "deadeye",
        name: "Deadeye",
        blurb: "The written route is Lightning Arrow.",
        guideId: "deadeye-lightning-arrow",
        primary: true,
      },
      {
        id: "pathfinder",
        name: "Pathfinder",
        blurb: "Same bow route. Poison and flasks instead of extra arrows.",
        guideId: "deadeye-lightning-arrow",
        primary: false,
      },
    ],
  },
  {
    id: "huntress",
    name: "Huntress",
    attribute: "Dexterity",
    weapon: "Spear and buckler",
    portrait: "/portraits/huntress.jpg",
    tagline: "Throw the spear, then step through what is left.",
    ascendancies: [
      {
        id: "amazon",
        name: "Amazon",
        blurb: "The written route is Lightning Spear.",
        guideId: "amazon-lightning-spear",
        primary: true,
      },
      {
        id: "spirit-walker",
        name: "Spirit Walker",
        blurb: "Same spear route. Spirit and a second weapon set.",
        guideId: "amazon-lightning-spear",
        primary: false,
      },
      {
        id: "ritualist",
        name: "Ritualist",
        blurb: "Same spear route. One offering, used for a whole act.",
        guideId: "amazon-lightning-spear",
        primary: false,
      },
    ],
  },
  {
    id: "monk",
    name: "Monk",
    attribute: "Dexterity and Intelligence",
    weapon: "Quarterstaff",
    portrait: "/portraits/monk.jpg",
    tagline: "Bell on the ground. Ice on the swing.",
    ascendancies: [
      {
        id: "invoker",
        name: "Invoker",
        blurb: "The written route is Ice Strike.",
        guideId: "invoker-ice-strike",
        primary: true,
      },
      {
        id: "martial-artist",
        name: "Martial Artist",
        blurb: "Same staff route. The combo matters more than the element.",
        guideId: "invoker-ice-strike",
        primary: false,
      },
      {
        id: "acolyte-of-chayula",
        name: "Acolyte of Chayula",
        blurb: "Same staff route until the trial, then chaos.",
        guideId: "invoker-ice-strike",
        primary: false,
      },
    ],
  },
  {
    id: "witch",
    name: "Witch",
    attribute: "Intelligence",
    weapon: "Wand and sceptre",
    portrait: "/portraits/witch.jpg",
    tagline: "Raise the dead, then walk behind them.",
    ascendancies: [
      {
        id: "infernalist",
        name: "Infernalist",
        blurb: "The written route is Skeletal Sniper.",
        guideId: "infernalist-skeletal-sniper",
        primary: true,
      },
      {
        id: "blood-mage",
        name: "Blood Mage",
        blurb: "Same minion route. Life is the cost, so the flask stays ready.",
        guideId: "infernalist-skeletal-sniper",
        primary: false,
      },
      {
        id: "lich",
        name: "Lich",
        blurb: "Same early minions. Energy shield replaces the life chest.",
        guideId: "infernalist-skeletal-sniper",
        primary: false,
      },
    ],
  },
  {
    id: "sorceress",
    name: "Sorceress",
    attribute: "Intelligence",
    weapon: "Staff",
    portrait: "/portraits/sorceress.jpg",
    tagline: "Spark fills the room. You only have to move.",
    ascendancies: [
      {
        id: "stormweaver",
        name: "Stormweaver",
        blurb: "The written route is Spark.",
        guideId: "stormweaver-spark",
        primary: true,
      },
      {
        id: "chronomancer",
        name: "Chronomancer",
        blurb: "Same Spark route. Spend the time stop on the boss wind-up.",
        guideId: "stormweaver-spark",
        primary: false,
      },
      {
        id: "disciple-of-varashta",
        name: "Disciple of Varashta",
        blurb: "Same Spark route through the campaign. Read the nodes before you click.",
        guideId: "stormweaver-spark",
        primary: false,
      },
    ],
  },
  {
    id: "druid",
    name: "Druid",
    attribute: "Strength and Intelligence",
    weapon: "Staff and talisman",
    portrait: "/portraits/druid.jpg",
    tagline: "Plant a volcano. Slam it. Walk away.",
    ascendancies: [
      {
        id: "shaman",
        name: "Shaman",
        blurb: "The written route is Volcano.",
        guideId: "shaman-volcano",
        primary: true,
      },
      {
        id: "oracle",
        name: "Oracle",
        blurb: "Same Volcano route. Cast it again when your future self does.",
        guideId: "shaman-volcano",
        primary: false,
      },
    ],
  },
];

export function getClass(id: string) {
  return classes.find((entry) => entry.id === id) ?? null;
}

export function getAscendancy(classId: string, ascendancyId: string) {
  const gameClass = getClass(classId);
  return gameClass?.ascendancies.find((entry) => entry.id === ascendancyId) ?? null;
}

function matchKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function matchLadderClass(raw: string) {
  const wanted = matchKey(raw);
  if (!wanted) return null;

  for (const gameClass of classes) {
    for (const ascendancy of gameClass.ascendancies) {
      if (matchKey(ascendancy.id) === wanted || matchKey(ascendancy.name) === wanted) {
        return {
          classId: gameClass.id,
          ascendancyId: ascendancy.id,
          guideId: ascendancy.guideId,
        };
      }
    }
  }

  for (const gameClass of classes) {
    if (matchKey(gameClass.id) === wanted || matchKey(gameClass.name) === wanted) {
      const primary = gameClass.ascendancies.find((entry) => entry.primary);
      return {
        classId: gameClass.id,
        ascendancyId: null,
        guideId: primary?.guideId ?? null,
      };
    }
  }

  return null;
}
