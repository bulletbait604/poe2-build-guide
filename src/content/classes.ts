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
        blurb: "Rolling Slam, Earthquake, Shield Wall, or Supercharged Slam. Armour and a rare mace.",
        guideId: "titan-slams",
        primary: true,
      },
      {
        id: "warbringer",
        name: "Warbringer",
        blurb: "Ancestral totems, Shield Wall, Earthquake, or Earthshatter. Armour first.",
        guideId: "warbringer-totems",
        primary: false,
      },
      {
        id: "smith-of-kitava",
        name: "Smith of Kitava",
        blurb: "Perfect Strike, Molten Blast, Volcanic Fissure, or Supercharged Slam. A normal chest with life.",
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
        blurb: "Galvanic Shards, grenades, Permafrost Bolts, or High Velocity Rounds.",
        guideId: "witchhunter-galvanic-shards",
        primary: true,
      },
      {
        id: "tactician",
        name: "Tactician",
        blurb: "Storm Blast, grenades, an Artillery Ballista, or Fragmentation Rounds.",
        guideId: "tactician-stormblast",
        primary: false,
      },
      {
        id: "gemling-legionnaire",
        name: "Gemling Legionnaire",
        blurb: "Twister, oil grenades, Perfect Strike, or Earthshatter. Gem quality is the upgrade.",
        guideId: "gemling-twister",
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
        blurb: "Ice Shot, Lightning Arrow, exploding Gas Arrow, or Twister. A rare weapon with damage.",
        guideId: "deadeye-ice-shot",
        primary: true,
      },
      {
        id: "pathfinder",
        name: "Pathfinder",
        blurb: "Poisonburst, Acidic Concoction, Explosive Concoction, or High Velocity Rounds.",
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
        blurb: "Lightning Spear, Twister, Rake, or Glacial Lance. Damage on a rare spear.",
        guideId: "amazon-lightning-spear",
        primary: true,
      },
      {
        id: "spirit-walker",
        name: "Spirit Walker",
        blurb: "Twister, a companion after Act 3, Lightning Spear, or Explosive Spear.",
        guideId: "spirit-walker-twister",
        primary: false,
      },
      {
        id: "ritualist",
        name: "Ritualist",
        blurb: "Rake, Spearfield, Explosive Spear, or Lightning Spear. Charms you already found.",
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
        blurb: "Ice Strike and the bell, Falling Thunder, Storm Wave, or Tempest Flurry.",
        guideId: "invoker-ice-strike",
        primary: true,
      },
      {
        id: "martial-artist",
        name: "Martial Artist",
        blurb: "Whirling Assault, Falling Thunder, Shattering Palm, or Volcanic Fissure.",
        guideId: "martial-artist-whirling",
        primary: false,
      },
      {
        id: "acolyte-of-chayula",
        name: "Acolyte of Chayula",
        blurb: "Falling Thunder, Ice Strike, Flicker, or Hand of Chayula.",
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
        blurb: "Skeletal Snipers, Spark into Comet, Bonestorm, or Demon Form. Leave Demon Form before it drains you.",
        guideId: "infernalist-skeletal-sniper",
        primary: true,
      },
      {
        id: "blood-mage",
        name: "Blood Mage",
        blurb: "Essence Drain, Bonestorm, a bleeding Rain of Arrows, or Detonate Dead. Life on every piece.",
        guideId: "blood-mage-essence-drain",
        primary: false,
      },
      {
        id: "lich",
        name: "Lich",
        blurb: "Skeletal Snipers, Contagion and Essence Drain, Bonestorm, or Dark Effigy. Energy shield on the body.",
        guideId: "lich-plants",
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
        blurb: "Spark, Arc, Fireball, or Ball Lightning. Cast speed on a rare wand.",
        guideId: "stormweaver-spark",
        primary: true,
      },
      {
        id: "chronomancer",
        name: "Chronomancer",
        blurb: "Comet, Frost Wall, Ice Nova, or Frost Bomb. Save the time stop for the boss.",
        guideId: "chronomancer-comet",
        primary: false,
      },
      {
        id: "disciple-of-varashta",
        name: "Disciple of Varashta",
        blurb: "Navira, Ruzhan, Kelari, or Icestorm. One djinn at a time.",
        guideId: "disciple-navira",
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
        blurb: "Bear Maul, Volcano, Walking Calamity, or Thunderstorm. Armour and life.",
        guideId: "shaman-bear",
        primary: true,
      },
      {
        id: "oracle",
        name: "Oracle",
        blurb: "Plants, the wolf, Bone Cage, or Tornado. Follow the vision.",
        guideId: "oracle-plants",
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
