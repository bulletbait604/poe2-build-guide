import type { BuildSpec } from "@/content/buildSpecs";
import { gearIcon } from "@/content/gearArt";
import type { GearCard, GearStage, GearTotal } from "@/lib/types";

// Rare affix tiers read from poe2db on 2026-10-25 (patch 0.5.x data on the item pages):
// https://poe2db.tw/us/Boots_dex
// https://poe2db.tw/us/Body_Armours_dex
// https://poe2db.tw/us/Body_Armours_int
// https://poe2db.tw/us/Gloves_dex
// https://poe2db.tw/us/Amulets
// https://poe2db.tw/us/Belts
// https://poe2db.tw/us/Rings
// https://poe2db.tw/us/Bows
// Movement speed on boots is a prefix with fixed values, not a range:
// 10% item level 1 (Runner's), 15% at 16 (Sprinter's), 20% at 33 (Stallion's),
// 25% at 46 (Gazelle's), 30% at 65 (Cheetah's), 35% at 82 (Hellion's).
// Life prefixes Hale through Prime are shared by boots, body, gloves, rings, amulets, and belts.
// Spirit prefixes Lady's through Queen's are on body armour and amulets.
// Resistance suffixes of the Whelpling through of Tzteosh use the same item levels on those pages.

const RES_LEVELING = "11-20% Fire, Cold, or Lightning Resistance";
const RES_END = "36-45% Fire, Cold, or Lightning Resistance";

function family(defence: string) {
  const text = defence.toLowerCase();
  if (text.includes("energy")) return "es";
  if (text.includes("evasion")) return "evasion";
  return "armour";
}

function caster(spec: BuildSpec) {
  return spec.speed.toLowerCase().includes("cast");
}

function attacker(spec: BuildSpec) {
  return spec.speed.toLowerCase().includes("attack");
}

function wantsSpirit(gear: GearStage[]) {
  return gear.some((row) => /spirit/i.test(`${row.early} ${row.late} ${row.maps}`));
}

function attribute(spec: BuildSpec) {
  const text = spec.defence.toLowerCase();
  const names = [
    text.includes("armour") ? "Strength" : "",
    text.includes("evasion") ? "Dexterity" : "",
    text.includes("energy") ? "Intelligence" : "",
  ].filter(Boolean);
  return names.join(" or ") || "Strength";
}

function skillWord(spec: BuildSpec) {
  if (caster(spec)) return "Spell";
  if (!attacker(spec)) return "Minion";
  if (spec.weaponNoun === "bow" || spec.weaponNoun === "spear" || spec.weaponNoun === "crossbow") return "Projectile";
  return "Melee";
}

function defenceStat(spec: BuildSpec) {
  const text = spec.defence.toLowerCase();
  const parts = [
    text.includes("armour") ? "Armour" : "",
    text.includes("evasion") ? "Evasion" : "",
    text.includes("energy") ? "Energy Shield" : "",
  ].filter(Boolean);
  return `increased ${parts.join(" and ") || "Armour"}`;
}

function baseName(slot: string, spec: BuildSpec) {
  const noun = spec.weaponNoun;
  const defence = family(spec.defence);
  const defenceName =
    defence === "es" ? "Energy shield (int)" : defence === "evasion" ? "Evasion (dex)" : "Armour (str)";
  if (/quiver/i.test(slot)) return "A broadhead quiver";
  if (/shield/i.test(slot)) return "A strength shield";
  if (/bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff/i.test(slot)) {
    if (noun === "crossbow") return "A crossbow. A level 16 Varnished Crossbow is the usual Act 1–2 step.";
    if (noun === "spear") return "A spear. A level 51 Seaglass Spear is the hold until Akoyan when this route says so.";
    if (noun === "bow") return "A bow with the higher tooltip damage";
    return `A ${noun} with the higher tooltip damage`;
  }
  if (/body/i.test(slot)) return `${defenceName} body armour`;
  if (/helm/i.test(slot)) return `${defenceName} helmet`;
  if (/glove/i.test(slot)) return `${defenceName} gloves`;
  if (/boot/i.test(slot)) return `${defenceName} boots`;
  if (/amulet/i.test(slot)) return defence === "es" ? "A lapis amulet" : defence === "evasion" ? "A jade amulet" : "An amber amulet";
  if (/ring/i.test(slot)) return attacker(spec) ? "Two rare rings. Iron Rings until a rare beats the damage." : "Two rare rings";
  if (/belt/i.test(slot)) return "A rare belt";
  return slot;
}

function whyFor(slot: string, spec: BuildSpec, row: GearStage | undefined) {
  if (row?.maps) return row.maps;
  if (/boot/i.test(slot)) return "Movement speed is a boot prefix. A pair with 0% is not an upgrade.";
  if (/ring|amulet|belt/i.test(slot)) return "This is where the resistance cap is finished.";
  return `${spec.defence} and life live on this piece. ${spec.weaponStat}`;
}

function iconFor(slot: string, spec: BuildSpec) {
  if (/jewel/i.test(slot)) return "https://cdn.poe2db.tw/image/Art/2DItems/Jewels/RubyJewel.webp";
  if (/quiver/i.test(slot)) return "https://cdn.poe2db.tw/image/Art/2DItems/Quivers/Basetypes/QuiverBroadhead.webp";
  if (/shield/i.test(slot)) return "https://cdn.poe2db.tw/image/Art/2DItems/Offhand/Shields/Crest01.webp";
  const mapped = /ring/i.test(slot)
    ? "Ring"
    : /bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff/i.test(slot)
      ? "Weapon"
      : slot;
  return gearIcon(mapped, spec.weaponNoun, spec.defence);
}

export function cardIcon(slot: string, spec: Pick<BuildSpec, "weaponNoun" | "defence">) {
  return iconFor(slot, spec as BuildSpec);
}


type StatList = { leveling: string[]; endgame: string[]; skip: string };

function listsFor(slot: string, spec: BuildSpec, gear: GearStage[]): StatList {
  const spirit = wantsSpirit(gear);
  const es = family(spec.defence) === "es";
  const attr = attribute(spec);
  const attrLeveling = `9-16 ${attr}`;
  const attrEnd = `28-33 ${attr}`;
  const word = skillWord(spec);
  const gemLeveling = `+1 to Level of all ${word} Skills`;
  const gemEnd = `+3 to Level of all ${word} Skills`;
  const defenceLeveling = `27-55% ${defenceStat(spec)}`;
  const defenceEnd = `101-110% ${defenceStat(spec)}`;
  const lifeLeveling = es ? "+25-41 maximum Energy Shield" : "+30-69 maximum Life";
  const lifeEnd = es ? "+81-96 maximum Energy Shield" : "+175-214 maximum Life";

  if (/boot/i.test(slot)) {
    return {
      leveling: ["10-15% increased Movement Speed", "+10-39 maximum Life", RES_LEVELING],
      endgame: ["30-35% increased Movement Speed", "+120-149 maximum Life", RES_END],
      skip: "Skip life regeneration and stun threshold.",
    };
  }
  if (/body|helm/i.test(slot)) {
    const spiritHere = /body/i.test(slot) && spirit;
    return {
      leveling: [lifeLeveling, defenceLeveling, spiritHere ? "+30-42 Spirit" : RES_LEVELING],
      endgame: [lifeEnd, defenceEnd, spiritHere ? "+57-61 Spirit" : RES_END],
      skip: "Skip stun threshold.",
    };
  }
  if (/glove/i.test(slot)) {
    if (attacker(spec)) {
      return {
        leveling: ["5-10% increased Attack Speed", "+20-69 maximum Life", RES_LEVELING],
        endgame: ["14-16% increased Attack Speed", "+100-174 maximum Life", RES_END],
        skip: "Skip item rarity.",
      };
    }
    return {
      leveling: [RES_LEVELING, "+20-69 maximum Life", attrLeveling],
      endgame: [RES_END, "+100-174 maximum Life", attrEnd],
      skip: "Skip item rarity. Cast speed is an amulet roll.",
    };
  }
  if (/ring/i.test(slot)) {
    return {
      leveling: [RES_LEVELING, "+20-69 maximum Life", attrLeveling],
      endgame: [RES_END, "20-27% Chaos Resistance", "+100-119 maximum Life"],
      skip: "Skip a second life roll while a resistance is still missing.",
    };
  }
  if (/amulet/i.test(slot)) {
    if (caster(spec)) {
      return {
        leveling: [gemLeveling, "9-15% increased Cast Speed", spirit ? "+30-42 Spirit" : RES_LEVELING],
        endgame: [gemEnd, "25-28% increased Cast Speed", spirit ? "+57-61 Spirit" : RES_END],
        skip: "Skip item rarity.",
      };
    }
    return {
      leveling: [gemLeveling, spirit ? "+30-42 Spirit" : RES_LEVELING, attrLeveling],
      endgame: [gemEnd, spirit ? "+57-61 Spirit" : RES_END, attrEnd],
      skip: "Skip item rarity.",
    };
  }
  if (/belt/i.test(slot)) {
    return {
      leveling: [es ? RES_LEVELING : "+20-69 maximum Life", es ? "+20-69 maximum Life" : RES_LEVELING, attrLeveling],
      endgame: [es ? RES_END : "+120-174 maximum Life", es ? "+120-174 maximum Life" : RES_END, attrEnd],
      skip: "Skip flat armour on the belt.",
    };
  }
  if (/quiver/i.test(slot)) {
    return {
      leveling: ["+1 to Level of all Projectile Skills", "+30-69 maximum Life", RES_LEVELING],
      endgame: ["+3 to Level of all Projectile Skills", "+100-119 maximum Life", RES_END],
      skip: "Skip extra arrows on the boss quiver. One extra arrow is for the clear quiver.",
    };
  }
  if (/jewel/i.test(slot)) {
    return {
      leveling: ["0 jewels until maps", "1 maximum Life prefix once you are in maps", "1 resistance suffix if the life prefix is missing"],
      endgame: ["1 jewel in the socket", "1 maximum Life prefix", "1 resistance suffix if life is already on the other jewels"],
      skip: "Skip item rarity on the jewel.",
    };
  }
  if (/shield/i.test(slot)) {
    return {
      leveling: ["+20-69 maximum Life", "27-55% increased Armour", RES_LEVELING],
      endgame: ["+175-214 maximum Life", "101-110% increased Armour", RES_END],
      skip: "Skip block chance.",
    };
  }
  const bow = spec.weaponNoun === "bow" || /^bow$/i.test(slot);
  if (bow) {
    return {
      leveling: ["+1 to Level of all Projectile Skills", "5-13% increased Attack Speed", "Within 5 levels of the zone"],
      endgame: ["+4 to Level of all Projectile Skills", "17-19% increased Attack Speed", "Item level 75 or higher"],
      skip: "Skip item rarity. A white bow that hits harder still wins.",
    };
  }
  return {
    leveling: [gemLeveling, "Within 5 levels of the zone", attrLeveling],
    endgame: [gemEnd, "Item level 75 or higher", attrEnd],
    skip: "Skip item rarity. A white weapon that hits harder still wins.",
  };
}

export function gearCardsFor(spec: BuildSpec, gear: GearStage[]): GearCard[] {
  return gear.map((row) => {
    const lists = listsFor(row.slot, spec, gear);
    return {
      slot: row.slot,
      base: baseName(row.slot, spec),
      why: whyFor(row.slot, spec, row),
      note: row.early,
      icon: iconFor(row.slot, spec),
      leveling: lists.leveling,
      endgame: lists.endgame,
      skip: lists.skip,
      how: howFor(row.slot, spec),
    };
  });
}

function howFor(slot: string, spec: BuildSpec) {
  const trade = spec.weaponNoun;
  if (/boot/i.test(slot)) {
    return "While leveling, buy 10% movement speed from the Act 1 vendor, or use a Transmutation then an Augmentation on a normal pair. In maps, buy the rare. Trade filter: Boots, item level 65+, 30% increased Movement Speed, and a life prefix.";
  }
  if (/body/i.test(slot)) {
    return "Vendor a life chest during the acts. In maps, buy it. Trade filter: Body Armour, item level 60+, maximum Life, and the defence this build wears. A Greater Iron Rune adds 18% armour, evasion, and energy shield if the chest has a socket.";
  }
  if (/ring/i.test(slot)) {
    return "One element per ring. Trade filter: Ring, item level 60+, a single elemental resistance, then add chaos resistance on a second search once fire, cold, and lightning are at 75%.";
  }
  if (/amulet/i.test(slot)) {
    return "Trade filter: Amulet, + to Level of skills, then Spirit if an aura is still grey. Campaign amulets can come from the vendor.";
  }
  if (/belt/i.test(slot)) {
    return "Trade filter: Belt, maximum Life, and one resistance. A strength suffix only if a gem is red.";
  }
  if (/glove/i.test(slot)) {
    return attacker(spec)
      ? "Trade filter: Gloves, item level 37+, increased Attack Speed, and maximum Life."
      : "Trade filter: Gloves, one elemental resistance, and maximum Life.";
  }
  if (/quiver/i.test(slot)) {
    return "Trade filter: Quiver, item level 60+, added physical or elemental damage. Extra arrows are the second filter, after the bow hits hard.";
  }
  if (/shield/i.test(slot)) {
    return "Trade filter: Shield, maximum Life, then armour. Do not buy a unique shield to fill the slot.";
  }
  return `Vendor a ${trade} whenever the tooltip damage jumps. Trade filter: ${trade}, item level close to yours, plus gem levels or attack speed. Do not wait on a unique.`;
}

export function gearTotalsFor(spec: BuildSpec, gear: GearStage[]): GearTotal[] {
  const es = family(spec.defence) === "es";
  const spirit = wantsSpirit(gear);
  return [
    {
      label: "Fire, cold, lightning",
      leveling: "20% of each by level 14, then 30-40% of each by level 29",
      earlyMaps: "75% fire, 75% cold, and 75% lightning",
      endgame: "75% fire, 75% cold, and 75% lightning",
    },
    {
      label: "Chaos resistance",
      leveling: "0% is fine in the acts. A campaign suffix is 4-15%",
      earlyMaps: "30% from two suffixes",
      endgame: "30-50%",
    },
    {
      label: es ? "Energy shield" : "Life",
      leveling: es ? "+25-41 maximum Energy Shield on the body" : "+30-69 maximum Life on the body",
      earlyMaps: es ? "+61-80 maximum Energy Shield and 80-100% increased Energy Shield" : "+120-174 maximum Life on the body",
      endgame: es ? "+81-96 maximum Energy Shield and 101-110% increased Energy Shield" : "+175-214 maximum Life on the body",
    },
    {
      label: "Spirit",
      leveling: "100 from the campaign, plus +30-42 on a body or amulet",
      earlyMaps: "100 from the campaign, plus +47-56 on a piece that rolls it",
      endgame: spirit ? "100 from the campaign, plus +57-61 on the piece this build uses" : "100 from the campaign",
    },
    {
      label: "Movement speed",
      leveling: "10-15% on boots",
      earlyMaps: "25-30% on boots",
      endgame: "30-35% on boots",
    },
    {
      label: "Attributes",
      leveling: "9-16 of the attribute a gem is asking for",
      earlyMaps: "21-27 so every gem stays socketed",
      endgame: "28-33 when a gem still asks for more",
    },
  ];
}

export function gearLineForLevel(_spec: { defence: string }, level: number) {
  if (level < 16) {
    return "Boots: 10% increased Movement Speed (Runner's, item level 1) and +(10–29) to maximum Life. Body: +(20–39) to maximum Life. Rings: about 20% fire, 20% cold, and 20% lightning from suffixes of +(6–15)%.";
  }
  if (level < 30) {
    return "Boots: 15% increased Movement Speed (Sprinter's, item level 16) and +(30–59) life. Body: +(40–69) life. Each element 30–40%, from suffixes of +(16–25)%.";
  }
  if (level < 52) {
    return "Boots: 20–25% increased Movement Speed (item level 33–46). Body life +(70–119). Each element over 40%, toward 75%.";
  }
  if (level < 66) {
    return "Before an interlude, fire, cold, and lightning should each be close to 75%. Boots: 25–30% movement speed. Chaos resistance of 30% is enough if a suffix is already there.";
  }
  return "75% fire, 75% cold, and 75% lightning. Chaos resistance 30–50%. Boots: 30–35% increased Movement Speed (item level 65–82).";
}
