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
        blurb: "Earthquake, Supercharged Slam, or Boneshatter. Armour and a rare mace.",
        guideId: "titan-earthquake",
        primary: true,
      },
      {
        id: "warbringer",
        name: "Warbringer",
        blurb: "Totems, Earthshatter, or Rolling Slam. Armour first, then the mace.",
        guideId: "warbringer-earthquake",
        primary: false,
      },
      {
        id: "smith-of-kitava",
        name: "Smith of Kitava",
        blurb: "Perfect Strike, Molten Blast, or a manifested weapon. A normal chest with life.",
        guideId: "smith-perfect-strike",
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
        blurb: "Galvanic Shards, Permafrost Bolts, or Armour Piercing Rounds.",
        guideId: "witchhunter-galvanic-shards",
        primary: true,
      },
      {
        id: "tactician",
        name: "Tactician",
        blurb: "Artillery, grenades, or gas and oil. A rare crossbow is enough.",
        guideId: "tactician-galvanic",
        primary: false,
      },
      {
        id: "gemling-legionnaire",
        name: "Gemling Legionnaire",
        blurb: "Shards, Plasma Blast, or Rapid Shot. Gem level is the upgrade.",
        guideId: "gemling-galvanic",
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
        blurb: "Lightning Arrow, Rain of Arrows, or Gas Arrow. A rare bow with damage.",
        guideId: "deadeye-lightning-arrow",
        primary: true,
      },
      {
        id: "pathfinder",
        name: "Pathfinder",
        blurb: "Poisonburst, Acidic Concoction, or Explosive Concoction. Flasks over uniques.",
        guideId: "pathfinder-poisonburst",
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
        blurb: "Lightning Spear, Storm Lance, or Twister. Damage on a rare spear.",
        guideId: "amazon-lightning-spear",
        primary: true,
      },
      {
        id: "spirit-walker",
        name: "Spirit Walker",
        blurb: "An empowered spear, a stag stampede, or a spirit bear.",
        guideId: "spirit-walker-primal-spear",
        primary: false,
      },
      {
        id: "ritualist",
        name: "Ritualist",
        blurb: "Rake, Spearfield, or Explosive Spear. Charms you already found.",
        guideId: "ritualist-rake",
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
        blurb: "Ice Strike, Falling Thunder, or Storm Wave. A rare quarterstaff.",
        guideId: "invoker-ice-strike",
        primary: true,
      },
      {
        id: "martial-artist",
        name: "Martial Artist",
        blurb: "Tempest Flurry, Whirling Assault, or Hollow Form.",
        guideId: "martial-artist-tempest-flurry",
        primary: false,
      },
      {
        id: "acolyte-of-chayula",
        name: "Acolyte of Chayula",
        blurb: "Breach with thunder, a darkness bell, or ice. Chaos resist if you find it.",
        guideId: "acolyte-falling-thunder",
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
        blurb: "Snipers, arsonists, or Demon Form. Spirit on a rare wand.",
        guideId: "infernalist-skeletal-sniper",
        primary: true,
      },
      {
        id: "blood-mage",
        name: "Blood Mage",
        blurb: "Bonestorm, Detonate Dead, or Essence Drain. Life on every piece.",
        guideId: "blood-mage-bonestorm",
        primary: false,
      },
      {
        id: "lich",
        name: "Lich",
        blurb: "Essence Drain, Detonate Dead, or Dark Effigy. Energy shield on the body.",
        guideId: "lich-essence-drain",
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
        blurb: "Spark, Arc, or Ball Lightning. Cast speed on a rare wand.",
        guideId: "stormweaver-spark",
        primary: true,
      },
      {
        id: "chronomancer",
        name: "Chronomancer",
        blurb: "Comet, Frostbolt, or Frost Wall. Save the time stop for the boss.",
        guideId: "chronomancer-comet",
        primary: false,
      },
      {
        id: "disciple-of-varashta",
        name: "Disciple of Varashta",
        blurb: "Ruzhan, Navira, or Kelari. One djinn, one spell, a rare wand.",
        guideId: "disciple-ruzhan",
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
        blurb: "Volcano, Thunderstorm, or Maul. A rare staff and a life talisman.",
        guideId: "shaman-volcano",
        primary: true,
      },
      {
        id: "oracle",
        name: "Oracle",
        blurb: "A fated volcano, storm, or maul. Cast the skill the vision shows.",
        guideId: "oracle-volcano",
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
