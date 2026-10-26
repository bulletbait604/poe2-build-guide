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
  if (text.includes("energy") && !text.includes("armour") && !text.includes("evasion")) return "Intelligence";
  if (text.includes("evasion") && text.includes("energy")) return "Intelligence";
  if (text.includes("evasion")) return "Dexterity";
  return "Strength";
}

function wantsEnergy(defence: string) {
  return defence.toLowerCase().includes("energy");
}

export function statsForLevel(input: { defence: string }, level: number): string[] {
  const attr = attributeName(input.defence);
  const energy = wantsEnergy(input.defence);
  if (level < 16) {
    return [
      "10% increased Movement Speed",
      energy ? "+10-17 maximum Energy Shield" : "+10-19 maximum Life",
      "+6-10% Fire Resistance",
      "+6-10% Cold Resistance",
      "+6-10% Lightning Resistance",
      `+5-8 ${attr}`,
    ];
  }
  if (level < 33) {
    return [
      "15% increased Movement Speed",
      energy ? "+25-30 maximum Energy Shield" : "+30-39 maximum Life",
      "+11-15% Fire Resistance",
      "+11-15% Cold Resistance",
      "+11-15% Lightning Resistance",
      `+9-12 ${attr}`,
    ];
  }
  if (level < 52) {
    return [
      "20% increased Movement Speed",
      energy ? "+36-41 maximum Energy Shield" : "+60-69 maximum Life",
      "+16-20% Fire Resistance",
      "+16-20% Cold Resistance",
      "+16-20% Lightning Resistance",
      `+17-20 ${attr}`,
    ];
  }
  if (level < 66) {
    return [
      "25% increased Movement Speed",
      energy ? "+61-73 maximum Energy Shield" : "+100-119 maximum Life",
      "+26-30% Fire Resistance",
      "+26-30% Cold Resistance",
      "+26-30% Lightning Resistance",
      `+25-27 ${attr}`,
    ];
  }
  const lines = [
    "30% increased Movement Speed",
    energy ? "+91-96 maximum Energy Shield" : "+200-214 maximum Life",
    "+36-40% Fire Resistance",
    "+36-40% Cold Resistance",
    "+36-40% Lightning Resistance",
    "+20-23% Chaos Resistance",
    `+28-30 ${attr}`,
  ];
  if (energy) lines.splice(2, 0, "(101-110)% increased Energy Shield");
  return lines;
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
