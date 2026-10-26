import type { BuildSpec } from "@/content/buildSpecs";
import { gearIcon } from "@/content/gearArt";
import { attributeName, statsForLevel } from "@/content/statLines";
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

function skillWord(spec: BuildSpec) {
  if (caster(spec)) return "Spell";
  if (!attacker(spec)) return "Minion";
  if (spec.weaponNoun === "bow" || spec.weaponNoun === "spear" || spec.weaponNoun === "crossbow") return "Projectile";
  return "Melee";
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
    if (noun === "spear") return "A spear. Seaglass Spear requires level 51.";
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


type StatLines = { leveling: string[]; endgame: string[]; skip: string };

function listsFor(slot: string, spec: BuildSpec, gear: GearStage[]): StatLines {
  const spirit = wantsSpirit(gear);
  const es = family(spec.defence) === "es";
  const attr = attributeName(spec.defence);
  const word = skillWord(spec);
  const gemLeveling = `+1 to Level of all ${word} Skills`;
  const gemEnd = `+3 to Level of all ${word} Skills`;
  const lifeLeveling = es ? "+25-30 maximum Energy Shield" : "+40-59 maximum Life";

  if (/boot/i.test(slot)) {
    return {
      leveling: [
        "15% increased Movement Speed",
        es ? "+25-30 maximum Energy Shield" : "+30-39 maximum Life",
        "+11-15% Fire Resistance",
        "+11-15% Cold Resistance",
        "+11-15% Lightning Resistance",
      ],
      endgame: [
        "30% increased Movement Speed",
        es ? "+48-60 maximum Energy Shield" : "+120-149 maximum Life",
        "+36-40% Fire Resistance",
        "+36-40% Cold Resistance",
        "+36-40% Lightning Resistance",
      ],
      skip: "Skip life regeneration and stun threshold.",
    };
  }
  if (/body/i.test(slot)) {
    return {
      leveling: [
        lifeLeveling,
        es ? "(27-42)% increased Energy Shield" : "+11-15% Fire Resistance",
        spirit ? "+30-33 Spirit" : es ? "+11-15% Fire Resistance" : "+11-15% Cold Resistance",
      ],
      endgame: [
        es ? "+91-96 maximum Energy Shield" : "+200-214 maximum Life",
        es ? "(101-110)% increased Energy Shield" : "+36-40% Fire Resistance",
        spirit ? "+57-61 Spirit" : "+36-40% Cold Resistance",
      ],
      skip: "Skip stun threshold.",
    };
  }
  if (/helm/i.test(slot)) {
    return {
      leveling: [lifeLeveling, "+11-15% Fire Resistance", "+11-15% Cold Resistance"],
      endgame: [es ? "+61-73 maximum Energy Shield" : "+100-119 maximum Life", "+36-40% Fire Resistance", "+36-40% Cold Resistance"],
      skip: "Skip stun threshold.",
    };
  }
  if (/glove/i.test(slot)) {
    if (attacker(spec)) {
      return {
        leveling: ["(5-7)% increased Attack Speed", "+40-59 maximum Life", "+11-15% Fire Resistance"],
        endgame: ["(14-16)% increased Attack Speed", "+100-119 maximum Life", "+36-40% Fire Resistance"],
        skip: "Skip item rarity.",
      };
    }
    return {
      leveling: ["+11-15% Fire Resistance", "+40-59 maximum Life", `+5-8 ${attr}`],
      endgame: ["+36-40% Fire Resistance", "+100-119 maximum Life", `+28-30 ${attr}`],
      skip: "Skip item rarity. Cast speed is an amulet roll.",
    };
  }
  if (/ring/i.test(slot)) {
    return {
      leveling: ["+11-15% Fire Resistance", "+40-59 maximum Life", `+9-12 ${attr}`],
      endgame: ["+36-40% Fire Resistance", "+20-23% Chaos Resistance", "+100-119 maximum Life"],
      skip: "Skip a second life roll while a resistance is still missing.",
    };
  }
  if (/amulet/i.test(slot)) {
    if (caster(spec)) {
      return {
        leveling: [gemLeveling, "(9-12)% increased Cast Speed", spirit ? "+30-33 Spirit" : "+11-15% Fire Resistance"],
        endgame: [gemEnd, "(25-28)% increased Cast Speed", spirit ? "+47-50 Spirit" : "+36-40% Fire Resistance"],
        skip: "Skip item rarity.",
      };
    }
    return {
      leveling: [gemLeveling, spirit ? "+30-33 Spirit" : "+11-15% Fire Resistance", `+5-8 ${attr}`],
      endgame: [gemEnd, spirit ? "+47-50 Spirit" : "+36-40% Fire Resistance", `+28-30 ${attr}`],
      skip: "Skip item rarity.",
    };
  }
  if (/belt/i.test(slot)) {
    return {
      leveling: [es ? "+11-15% Fire Resistance" : "+40-59 maximum Life", es ? "+40-59 maximum Life" : "+11-15% Fire Resistance", `+5-8 ${attr}`],
      endgame: [es ? "+36-40% Fire Resistance" : "+150-174 maximum Life", es ? "+150-174 maximum Life" : "+36-40% Fire Resistance", `+28-30 ${attr}`],
      skip: "Skip flat armour on the belt.",
    };
  }
  if (/quiver/i.test(slot)) {
    return {
      leveling: ["+1 to Level of all Projectile Skills", "(5-7)% increased Attack Speed", "(8-10)% increased Attack Speed"],
      endgame: ["+1 to Level of all Projectile Skills", "(14-16)% increased Attack Speed", "(11-13)% increased Attack Speed"],
      skip: "A quiver rolls +1 to Level of all Projectile Skills. It does not roll +2 or +3.",
    };
  }
  if (/jewel/i.test(slot)) {
    return {
      leveling: ["(1-2)% increased Strength", "(1-2)% increased Dexterity", "(1-2)% increased Intelligence"],
      endgame: ["(1-2)% increased Strength", "(1-2)% increased Dexterity", "(1-2)% increased Intelligence"],
      skip: "Skip item rarity on the jewel.",
    };
  }
  if (/shield/i.test(slot)) {
    return {
      leveling: ["+40-59 maximum Life", "+11-15% Fire Resistance", "+11-15% Cold Resistance"],
      endgame: ["+175-189 maximum Life", "+36-40% Fire Resistance", "+36-40% Cold Resistance"],
      skip: "Skip block chance.",
    };
  }
  const noun = spec.weaponNoun;
  const bow = noun === "bow" || /^bow$/i.test(slot);
  if (bow) {
    return {
      leveling: ["+1 to Level of all Projectile Skills", "(5-7)% increased Attack Speed", "(4-6) to (7-11) added Physical Damage"],
      endgame: ["+4 to Level of all Projectile Skills", "(17-19)% increased Attack Speed", "(26-39) to (44-66) added Physical Damage"],
      skip: "Skip item rarity. A white bow that hits harder still wins.",
    };
  }
  if (noun === "crossbow" || /crossbow/i.test(slot)) {
    return {
      leveling: ["+2 to Level of all Projectile Skills", "(5-7)% increased Attack Speed", "(5-8) to (10-15) added Physical Damage"],
      endgame: ["+5 to Level of all Projectile Skills", "(17-19)% increased Attack Speed", "(37-55) to (63-94) added Physical Damage"],
      skip: "Skip item rarity. A white crossbow that hits harder still wins.",
    };
  }
  if (noun === "quarterstaff" || /quarterstaff/i.test(slot)) {
    return {
      leveling: ["+2 to Level of all Melee Skills", "(5-7)% increased Attack Speed", "(5-8) to (10-15) added Physical Damage"],
      endgame: ["+5 to Level of all Melee Skills", "(26-28)% increased Attack Speed", "(37-55) to (63-94) added Physical Damage"],
      skip: "Skip item rarity. A white quarterstaff that hits harder still wins.",
    };
  }
  if (noun === "spear" || /spear/i.test(slot)) {
    return {
      leveling: ["+1 to Level of all Projectile Skills", "(5-7)% increased Attack Speed", "(4-6) to (7-11) added Physical Damage"],
      endgame: ["+4 to Level of all Projectile Skills", "(26-28)% increased Attack Speed", "(26-39) to (44-66) added Physical Damage"],
      skip: "Skip item rarity. A white spear that hits harder still wins.",
    };
  }
  if (noun === "wand" || /wand/i.test(slot)) {
    return {
      leveling: ["+1 to Level of all Spell Skills", "(9-12)% increased Cast Speed", "+5-8 Intelligence"],
      endgame: ["+4 to Level of all Spell Skills", "(33-35)% increased Cast Speed", "+28-30 Intelligence"],
      skip: "Skip item rarity. A white wand with a higher spell roll still wins.",
    };
  }
  if (noun === "staff" || /^staff$/i.test(slot)) {
    return {
      leveling: ["+2 to Level of all Spell Skills", "(14-19)% increased Cast Speed", "+5-8 Intelligence"],
      endgame: ["(5-6) to Level of all Spell Skills", "(50-52)% increased Cast Speed", "+28-30 Intelligence"],
      skip: "Skip item rarity. A white staff with a higher spell roll still wins.",
    };
  }
  if (noun === "sceptre" || /sceptre/i.test(slot)) {
    return {
      leveling: ["+1 to Level of all Minion Skills", "(5-7)% increased Attack Speed for allies in your Presence", "+5-8 Intelligence"],
      endgame: ["+4 to Level of all Minion Skills", "(14-16)% increased Attack Speed for allies in your Presence", "+28-30 Intelligence"],
      skip: "Skip item rarity.",
    };
  }
  return {
    leveling: ["(4-6) to (7-11) added Physical Damage", "(40-49)% increased Physical Damage", "+5-8 Strength"],
    endgame: ["(26-39) to (44-66) added Physical Damage", "(155-169)% increased Physical Damage", "+28-30 Strength"],
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
    return "Buy movement speed from the Act 1 vendor, or use a Transmutation then an Augmentation on a normal pair. In maps, buy the rare. Trade filter: Boots, a movement speed prefix, and a life prefix.";
  }
  if (/body/i.test(slot)) {
    return "Vendor a life chest during the acts. In maps, buy it. Trade filter: Body Armour, maximum Life or energy shield, and the defence this build wears. A Greater Iron Rune adds 18% armour, evasion, and energy shield if the chest has a socket.";
  }
  if (/ring/i.test(slot)) {
    return "One element per ring. Trade filter: Ring, one elemental resistance, then chaos resistance on a second search once fire, cold, and lightning are at 75%.";
  }
  if (/amulet/i.test(slot)) {
    return "Trade filter: Amulet, + to Level of skills, then Spirit if a spirit gem is still grey. Campaign amulets can come from the vendor.";
  }
  if (/belt/i.test(slot)) {
    return "Trade filter: Belt, maximum Life, and one resistance. An attribute suffix only if a gem is still red.";
  }
  if (/glove/i.test(slot)) {
    return attacker(spec)
      ? "Trade filter: Gloves, increased Attack Speed, and maximum Life."
      : "Trade filter: Gloves, one elemental resistance, and maximum Life.";
  }
  if (/quiver/i.test(slot)) {
    return "Trade filter: Quiver, +1 to Level of all Projectile Skills, then attack speed.";
  }
  if (/shield/i.test(slot)) {
    return "Trade filter: Shield, maximum Life, then one resistance. Do not buy a unique shield to fill the slot.";
  }
  return `Vendor a ${trade} whenever the tooltip damage jumps. Do not wait on a unique.`;
}

export function gearTotalsFor(spec: BuildSpec, gear: GearStage[]): GearTotal[] {
  const leveling = [...statsForLevel(spec, 22)];
  const endgame = [...statsForLevel(spec, 78)];
  if (wantsSpirit(gear)) {
    leveling.push("+30-33 Spirit");
    endgame.push("+57-61 Spirit");
  }
  const count = Math.max(leveling.length, endgame.length);
  return Array.from({ length: count }, (_, index) => ({
    label: leveling[index] ?? endgame[index] ?? `stat-${index}`,
    leveling: leveling[index] ?? "",
    earlyMaps: index === 0 ? "75% fire, 75% cold, and 75% lightning" : "",
    endgame: endgame[index] ?? "",
  }));
}
