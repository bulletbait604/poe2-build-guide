// Item tiers read from poe2db on 2026-10-26. Each line is one real mod, value first.
// Movement speed is a fixed number, not a range. Life, resistance, spirit, and attributes
// use one tier's own roll, not two tiers glued together.
// https://poe2db.tw/us/Boots_dex
// https://poe2db.tw/us/Boots_int
// https://poe2db.tw/us/Body_Armours_int
// https://poe2db.tw/us/Amulets
// https://poe2db.tw/us/Bows
// https://poe2db.tw/us/Gloves_dex
// https://poe2db.tw/us/Quivers

export function attributeName(defence: string) {
  const text = defence.toLowerCase();
  if (text.includes("intelligence")) return "Intelligence";
  if (text.includes("energy") && !text.includes("armour") && !text.includes("evasion")) return "Intelligence";
  if (text.includes("evasion") && text.includes("energy")) return "Intelligence";
  if (text.includes("evasion")) return "Dexterity";
  return "Strength";
}

function wantsEnergy(defence: string) {
  const text = defence.toLowerCase();
  if (text.includes("life")) return false;
  return text.includes("energy");
}

function tierAt(level: number, rows: Array<[number, string]>) {
  let chosen = rows[0][1];
  for (const [ilvl, value] of rows) {
    if (level >= ilvl) chosen = value;
  }
  return chosen;
}

export type AffixSlot = "body" | "helmet" | "gloves" | "boots" | "belt" | "ring" | "amulet" | "shield" | "shared";

// Highest IncreasedLife item level that still exists on that slot. Body is the only slot that reaches 80.
const LIFE_CAP: Record<AffixSlot, number> = {
  body: 80,
  shield: 70,
  helmet: 65,
  belt: 65,
  boots: 60,
  gloves: 60,
  amulet: 60,
  ring: 54,
  shared: 54,
};

// Highest BaseLocalDefences energy shield item level on a pure intelligence piece. Boots and gloves stop at 54.
// Amulets do not use this ladder. Their IncreasedEnergyShield prefix is AMULET_ES below.
const ENERGY_CAP: Record<AffixSlot, number> = {
  body: 79,
  helmet: 60,
  boots: 54,
  gloves: 54,
  belt: 54,
  ring: 54,
  amulet: 54,
  shield: 54,
  shared: 54,
};

// poe2db IncreasedLife, shared by strength, dexterity, and intelligence bodies and boots.
const LIFE: Array<[number, string]> = [
  [1, "+10-19 maximum Life"],
  [6, "+20-29 maximum Life"],
  [16, "+30-39 maximum Life"],
  [24, "+40-59 maximum Life"],
  [33, "+60-69 maximum Life"],
  [38, "+70-84 maximum Life"],
  [46, "+85-99 maximum Life"],
  [54, "+100-119 maximum Life"],
  [60, "+120-149 maximum Life"],
  [65, "+150-174 maximum Life"],
  [70, "+175-189 maximum Life"],
  [75, "+190-199 maximum Life"],
  [80, "+200-214 maximum Life"],
];

// poe2db BaseLocalDefences on intelligence bodies and boots.
const ENERGY: Array<[number, string]> = [
  [1, "+10-17 maximum Energy Shield"],
  [8, "+18-24 maximum Energy Shield"],
  [16, "+25-30 maximum Energy Shield"],
  [25, "+31-35 maximum Energy Shield"],
  [33, "+36-41 maximum Energy Shield"],
  [46, "+42-47 maximum Energy Shield"],
  [54, "+48-60 maximum Energy Shield"],
  [60, "+61-73 maximum Energy Shield"],
  [65, "+74-80 maximum Energy Shield"],
  [70, "+81-90 maximum Energy Shield"],
  [79, "+91-96 maximum Energy Shield"],
];

// poe2db resistance suffixes. The roll text matches. The item level does not.
// Fire steps at 12, 24, 36, 48. Cold steps at 14, 26, 38, 50. Lightning steps at 13, 25, 37, 49.
// From item level 60 the three suffixes share 31-35, then 36-40 at 71 and 41-45 at 82.
const FIRE: Array<[number, string]> = [
  [1, "6-10"],
  [12, "11-15"],
  [24, "16-20"],
  [36, "21-25"],
  [48, "26-30"],
  [60, "31-35"],
  [71, "36-40"],
  [82, "41-45"],
];

const COLD: Array<[number, string]> = [
  [1, "6-10"],
  [14, "11-15"],
  [26, "16-20"],
  [38, "21-25"],
  [50, "26-30"],
  [60, "31-35"],
  [71, "36-40"],
  [82, "41-45"],
];

const LIGHTNING: Array<[number, string]> = [
  [1, "6-10"],
  [13, "11-15"],
  [25, "16-20"],
  [37, "21-25"],
  [49, "26-30"],
  [60, "31-35"],
  [71, "36-40"],
  [82, "41-45"],
];

const MOVE: Array<[number, string]> = [
  [1, "10% increased Movement Speed"],
  [16, "15% increased Movement Speed"],
  [33, "20% increased Movement Speed"],
  [46, "25% increased Movement Speed"],
  [65, "30% increased Movement Speed"],
  [82, "35% increased Movement Speed"],
];

// poe2db IncreasedEnergyShield on amulets. This is not the body BaseLocalDefences ladder.
// https://poe2db.tw/us/Amulets
const AMULET_ES: Array<[number, string]> = [
  [1, "+8-14 maximum Energy Shield"],
  [11, "+15-20 maximum Energy Shield"],
  [16, "+21-24 maximum Energy Shield"],
  [25, "+25-33 maximum Energy Shield"],
  [33, "+34-41 maximum Energy Shield"],
  [46, "+42-51 maximum Energy Shield"],
  [54, "+52-61 maximum Energy Shield"],
  [65, "+62-70 maximum Energy Shield"],
  [70, "+71-79 maximum Energy Shield"],
  [80, "+80-89 maximum Energy Shield"],
];

// Combined BaseLocalDefences on dexterity/intelligence (evasion and energy shield) pieces.
// https://poe2db.tw/us/Body_Armours_dex_int
// Body reaches item level 75. Helmets stop at 54. Gloves and boots stop at 46.
// Armour/evasion pieces have no energy shield on this mod. Armour/energy shield bodies use a
// parallel ladder that tops at +(150-170) to Armour+(43-48) to maximum Energy Shield, item level 75.
// No current guide shops armour and energy shield, so that ladder stays off the cards.
const HYBRID_EV_ES: Array<[number, string]> = [
  [1, "+(6-10) to Evasion Rating +(5-8) to maximum Energy Shield"],
  [16, "+(11-41) to Evasion Rating +(9-15) to maximum Energy Shield"],
  [33, "+(42-64) to Evasion Rating +(16-21) to maximum Energy Shield"],
  [46, "+(65-78) to Evasion Rating +(22-25) to maximum Energy Shield"],
  [54, "+(79-94) to Evasion Rating +(26-29) to maximum Energy Shield"],
  [60, "+(95-119) to Evasion Rating +(30-36) to maximum Energy Shield"],
  [65, "+(120-141) to Evasion Rating +(37-42) to maximum Energy Shield"],
  [75, "+(142-161) to Evasion Rating +(43-48) to maximum Energy Shield"],
];

const HYBRID_EV_ES_CAP: Record<AffixSlot, number> = {
  body: 75,
  helmet: 54,
  gloves: 46,
  boots: 46,
  belt: 46,
  ring: 46,
  amulet: 46,
  shield: 46,
  shared: 46,
};

// Boots_dex Dexterity ladder. +25-27 needs item level 55. +13-16 needs 22. +21-24 needs 44.
// Belts are Strength only and continue to +34-36 at item level 81.
// Gloves roll +34-36 Dexterity at item level 81. Strength and Intelligence on gloves stop at +31-33.
// Shared lists stay on this boot ladder so a boot line does not print a belt-only tier.
const ATTR: Array<[number, string]> = [
  [1, "5-8"],
  [11, "9-12"],
  [22, "13-16"],
  [33, "17-20"],
  [44, "21-24"],
  [55, "25-27"],
  [66, "28-30"],
  [74, "31-33"],
];

export function lifeAt(level: number, slot: AffixSlot = "shared") {
  return tierAt(Math.min(level, LIFE_CAP[slot]), LIFE);
}

export function energyAt(level: number, slot: AffixSlot = "shared") {
  return tierAt(Math.min(level, ENERGY_CAP[slot]), ENERGY);
}

export function amuletEnergyAt(level: number) {
  return tierAt(level, AMULET_ES);
}

export function hybridEvasionEnergyAt(level: number, slot: AffixSlot = "body") {
  return tierAt(Math.min(level, HYBRID_EV_ES_CAP[slot]), HYBRID_EV_ES);
}

export const BELT_ATTRIBUTE_TOP = "+34-36 Strength";
export const GLOVE_ATTRIBUTE_TOP = "+34-36 Dexterity";

export function resistAt(level: number) {
  return {
    fire: tierAt(level, FIRE),
    cold: tierAt(level, COLD),
    lightning: tierAt(level, LIGHTNING),
  };
}

export function statsForLevel(input: { defence: string }, level: number): string[] {
  const attr = attributeName(input.defence);
  const energy = wantsEnergy(input.defence);
  const resist = resistAt(level);
  // Shared lists stop at the ring life cap and the boot energy-shield cap.
  // +(200-214) life is body armour only. +(91-96) energy shield is body armour only.
  return [
    tierAt(level, MOVE),
    energy ? energyAt(level, "shared") : lifeAt(level, "shared"),
    `+${resist.fire}% Fire Resistance`,
    `+${resist.cold}% Cold Resistance`,
    `+${resist.lightning}% Lightning Resistance`,
    `+${tierAt(level, ATTR)} ${attr}`,
  ];
}

export function proseToStats(text: string): string[] {
  const clean = text.replace(/[–—]/g, "-").replace(/\([^)]*\)/g, "");
  const bits = clean.split(/(?<=\.)\s+|;\s+|\s+and\s+/i);
  const lines: string[] = [];
  for (let bit of bits) {
    bit = bit.replace(/^(boots|body|helmet|gloves|rings|jewelry|weapon|belt|amulet|quiver|shield):\s*/i, "").trim();
    bit = bit.replace(/\s+/g, " ").replace(/\.$/, "").trim();
    bit = bit.replace(/^\+\(([^)]+)\)\s+to\s+/i, "+$1 ");
    bit = bit.replace(/\+\(([^)]+)\)/g, "+$1");
    if (bit && !lines.includes(bit)) lines.push(bit);
  }
  return lines;
}
