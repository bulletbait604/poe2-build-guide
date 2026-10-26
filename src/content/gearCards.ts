import type { BuildSpec } from "@/content/buildSpecs";
import { gearIcon } from "@/content/gearArt";
import { baseLabel, howToBuy, weaponText } from "@/content/shopping";
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
// IncreasedLife is not one ladder for every slot. Boots and gloves stop at +(120-149) item level 60.
// Rings stop at +(100-119) item level 54. Helmets and belts stop at +(150-174) item level 65.
// Shields stop at +(175-189) item level 70. Only body armour reaches +(200-214) at item level 80.
// Flat energy shield on boots and gloves stops at +(48-60) item level 54. Helmets stop at +(61-73) item level 60.
// Only a body reaches +(91-96) at item level 79. (27-42)% and (101-110)% increased Energy Shield are body DefencesPercent mods.
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
  if (caster(spec) && spec.skill !== "Maul") return "Spell";
  if (spec.skill === "Rake" || spec.skill === "Whirling Slash" || spec.skill === "Maul" || spec.skill === "Spear Stab") return "Melee";
  if (!attacker(spec)) return "Minion";
  if (spec.weaponNoun === "bow" || spec.weaponNoun === "spear" || spec.weaponNoun === "crossbow") return "Projectile";
  return "Melee";
}

function baseName(slot: string, spec: BuildSpec) {
  return baseLabel(slot, spec);
}

function whyFor(slot: string, spec: BuildSpec, row: GearStage | undefined) {
  if (row?.maps) return row.maps;
  if (/boot/i.test(slot)) return "Boots need increased Movement Speed. A pair at 0% stays in town.";
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
  const gemEnd = `+3 to Level of all ${word} Skills`;
  const lifeLeveling = es ? "+10-17 maximum Energy Shield" : "+10-19 maximum Life";

  if (/boot/i.test(slot)) {
    return {
      leveling: [
        "10% increased Movement Speed",
        es ? "+10-17 maximum Energy Shield" : "+10-19 maximum Life",
        "+6-10% Fire Resistance",
        "+6-10% Cold Resistance",
        "+6-10% Lightning Resistance",
      ],
      endgame: [
        "35% increased Movement Speed",
        es ? "+48-60 maximum Energy Shield" : "+120-149 maximum Life",
        "+36-40% Fire Resistance",
        "+36-40% Cold Resistance",
        "+36-40% Lightning Resistance",
      ],
      skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item.",
    };
  }
  if (/body/i.test(slot)) {
    return {
      leveling: [lifeLeveling, "+6-10% Fire Resistance", "+6-10% Cold Resistance"],
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
      leveling: [lifeLeveling, "+6-10% Fire Resistance", "+6-10% Cold Resistance"],
      endgame: [es ? "+61-73 maximum Energy Shield" : "+150-174 maximum Life", "+36-40% Fire Resistance", "+36-40% Cold Resistance"],
      skip: "Skip stun threshold.",
    };
  }
  if (/glove/i.test(slot)) {
    if (attacker(spec)) {
      return {
        leveling: ["(5-7)% increased Attack Speed", es ? "+10-17 maximum Energy Shield" : "+10-19 maximum Life", "+6-10% Fire Resistance"],
        endgame: ["(14-16)% increased Attack Speed", es ? "+48-60 maximum Energy Shield" : "+120-149 maximum Life", "+36-40% Fire Resistance"],
        skip: "Skip item rarity.",
      };
    }
    return {
      leveling: ["+6-10% Fire Resistance", es ? "+10-17 maximum Energy Shield" : "+10-19 maximum Life", `+5-8 ${attr}`],
      endgame: ["+36-40% Fire Resistance", es ? "+48-60 maximum Energy Shield" : "+120-149 maximum Life", `+31-33 ${attr}`],
      skip: "Skip item rarity. Cast speed is an amulet roll.",
    };
  }
  if (/ring/i.test(slot)) {
    return {
      leveling: ["+6-10% Fire Resistance", "+10-19 maximum Life", `+5-8 ${attr}`],
      endgame: ["+36-40% Fire Resistance", "+20-23% Chaos Resistance", "+100-119 maximum Life"],
      skip: "Skip a second life roll while a resistance is still missing.",
    };
  }
  if (/amulet/i.test(slot)) {
    if (caster(spec)) {
      return {
        leveling: ["(9-12)% increased Cast Speed", "+6-10% Fire Resistance", `+5-8 ${attr}`],
        endgame: [gemEnd, "(25-28)% increased Cast Speed", spirit ? "+47-50 Spirit" : "+36-40% Fire Resistance"],
        skip: "Skip item rarity.",
      };
    }
    return {
      leveling: ["+6-10% Fire Resistance", "+10-19 maximum Life", `+5-8 ${attr}`],
      endgame: [gemEnd, spirit ? "+47-50 Spirit" : "+36-40% Fire Resistance", `+28-30 ${attr}`],
      skip: "Skip item rarity.",
    };
  }
  if (/belt/i.test(slot)) {
    return {
      leveling: ["+10-19 maximum Life", "+6-10% Fire Resistance", `+5-8 ${attr}`],
      endgame: [es ? "+36-40% Fire Resistance" : "+150-174 maximum Life", es ? "+150-174 maximum Life" : "+36-40% Fire Resistance", `+28-30 ${attr}`],
      skip: "Skip flat armour on the belt.",
    };
  }
  if (/quiver/i.test(slot)) {
    return {
      leveling: ["(5-7)% increased Attack Speed", "Adds (1-2) to 3 Physical Damage to Attacks", "+5-8 Dexterity"],
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
      leveling: ["+10-19 maximum Life", "+6-10% Fire Resistance", "+6-10% Cold Resistance"],
      endgame: ["+175-189 maximum Life", "+36-40% Fire Resistance", "+36-40% Cold Resistance"],
      skip: "Skip block chance.",
    };
  }
  const noun = spec.weaponNoun;
  const bow = noun === "bow" || /^bow$/i.test(slot);
  if (bow) {
    return {
      leveling: ["(40-49)% increased Physical Damage", "(5-7)% increased Attack Speed", "Adds (1-2) to (4-5) Physical Damage"],
      endgame: ["(170-179)% increased Physical Damage", "(155-169)% increased Physical Damage", "+4 to Level of all Projectile Skills"],
      skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item. Also skip an Artillery Bow. That base has 50% reduced Projectile Range.",
    };
  }
  if (noun === "crossbow" || /crossbow/i.test(slot)) {
    return {
      leveling: ["(40-49)% increased Physical Damage", "(5-7)% increased Attack Speed", "Adds (2-3) to (5-7) Physical Damage"],
      endgame: ["(170-179)% increased Physical Damage", "(155-169)% increased Physical Damage", "+5 to Level of all Projectile Skills"],
      skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item.",
    };
  }
  if (noun === "quarterstaff" || /quarterstaff/i.test(slot)) {
    return {
      leveling: ["(40-49)% increased Physical Damage", "(5-7)% increased Attack Speed", "Adds (2-3) to (5-7) Physical Damage"],
      endgame: ["(170-179)% increased Physical Damage", "(155-169)% increased Physical Damage", "+5 to Level of all Melee Skills"],
      skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item.",
    };
  }
  if (noun === "spear" || /spear/i.test(slot)) {
    return {
      leveling: ["(40-49)% increased Physical Damage", "(5-7)% increased Attack Speed", "Adds (1-2) to (4-5) Physical Damage"],
      endgame: ["(170-179)% increased Physical Damage", "(155-169)% increased Physical Damage", spec.skill === "Rake" || spec.skill === "Whirling Slash" ? "+4 to Level of all Melee Skills" : "+4 to Level of all Projectile Skills"],
      skip: spec.skill === "Rake"
        ? "Rake is a melee Strike (poe2db: Attack, AoE, Melee, Strike, Physical). From item level 18 the gem roll is +1 to Level of all Melee Skills, not Projectile. Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item."
        : "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item.",
    };
  }
  if (noun === "wand" || /wand/i.test(slot)) {
    return {
      leveling: ["(25-34)% increased Spell Damage", "(9-12)% increased Cast Speed", "+5-8 Intelligence"],
      endgame: ["+4 to Level of all Spell Skills", "(33-35)% increased Cast Speed", "+28-30 Intelligence"],
      skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item. +1 to Level of all Spell Skills needs item level 5.",
    };
  }
  if (noun === "staff" || /^staff$/i.test(slot)) {
    return {
      leveling: spec.skill === "Maul"
        ? ["(40-49)% increased Physical Damage", "(5-7)% increased Attack Speed", "Adds (2-3) to (5-7) Physical Damage"]
        : ["(50-68)% increased Spell Damage", "(14-19)% increased Cast Speed", "+5-8 Intelligence"],
      endgame: spec.skill === "Maul"
        ? ["(170-179)% increased Physical Damage", "(155-169)% increased Physical Damage", "+5 to Level of all Melee Skills"]
        : ["+(5-6) to Level of all Spell Skills", "(50-52)% increased Cast Speed", "+28-30 Intelligence"],
      skip: spec.skill === "Maul"
        ? "Maul is a Bear-form melee Strike and needs Talismans. Skip spell damage and +to spell skills. Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item."
        : "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item. +(5-6) to Level of all Spell Skills needs item level 78.",
    };
  }
  if (noun === "sceptre" || /sceptre/i.test(slot)) {
    return {
      leveling: ["Allies in your Presence deal (25-34)% increased Damage", "+5-8 Intelligence", "Allies in your Presence deal (1-2) to (3-4) added Attack Physical Damage"],
      endgame: ["+4 to Level of all Minion Skills", "Allies in your Presence have (14-16)% increased Attack Speed", "+28-30 Intelligence"],
      skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item. Allies in your Presence have (5-7)% increased Attack Speed needs item level 5. Presence is the area around your character.",
    };
  }
  return {
    leveling: ["(40-49)% increased Physical Damage", "(5-7)% increased Attack Speed", "Adds (1-2) to (4-5) Physical Damage"],
    endgame: ["(170-179)% increased Physical Damage", "(155-169)% increased Physical Damage", "+4 to Level of all Melee Skills"],
    skip: "Skip these rolls: increased Rarity of Items found, Critical Hit Chance. Don't spend currency on a unique; wear one only if it drops and beats your current item. Use a one-hand mace plus a shield, or a two-hand mace with the shield slot empty. Do not equip both.",
  };
}

export function gearCardsFor(spec: BuildSpec, gear: GearStage[]): GearCard[] {
  return gear.map((row) => {
    const lists = listsFor(row.slot, spec, gear);
    return {
      slot: row.slot,
      base: baseName(row.slot, spec),
      why: whyFor(row.slot, spec, row),
      note: spec.skill === "Maul" && /weapon|staff/i.test(row.slot) ? weaponText("quarterstaff", 1, true) : row.early,
      icon: iconFor(row.slot, spec),
      leveling: lists.leveling,
      endgame: lists.endgame,
      skip: lists.skip,
      how: howFor(row.slot, spec),
    };
  });
}

function howFor(slot: string, spec: BuildSpec) {
  if (spec.skill === "Maul" && /weapon|staff/i.test(slot)) return weaponText("quarterstaff", 1, true);
  return howToBuy(slot, spec);
}

export function gearTotalsFor(spec: BuildSpec, gear: GearStage[]): GearTotal[] {
  const leveling = [...statsForLevel(spec, 1)];
  const endgame = [...statsForLevel(spec, 82)];
  if (wantsSpirit(gear)) endgame.push("+57-61 Spirit");
  const count = Math.max(leveling.length, endgame.length);
  return Array.from({ length: count }, (_, index) => ({
    label: leveling[index] ?? endgame[index] ?? `stat-${index}`,
    leveling: leveling[index] ?? "",
    earlyMaps: index === 0 ? "75% fire, 75% cold, and 75% lightning" : "",
    endgame: endgame[index] ?? "",
  }));
}
