import type { ArmorLine } from "@/lib/types";

export type ArmorInput = {
  weaponNoun: string;
  weaponStat: string;
  defence: string;
  speed: string;
  damage: string;
};

function lines(entries: Array<[string, string]>): ArmorLine[] {
  return entries.map(([slot, lookFor]) => ({ slot, lookFor }));
}

function resist(to: number) {
  if (to <= 9) return "One resistance, any amount, on a ring or the amulet.";
  if (to <= 14) return "About 20% fire, 20% cold, and 20% lightning, split across the rings so each ring covers a different element.";
  if (to <= 29) return "30–40% fire, 30–40% cold, and 30–40% lightning. Raise whichever element is lowest.";
  if (to <= 49) return "Each of fire, cold, and lightning over 40%. Chaos resistance is a bonus, not a number you chase to 75%.";
  if (to <= 59) return "Push fire, cold, and lightning toward 75% before the interlude penalty. Recap whatever falls.";
  return "75% fire, 75% cold, and 75% lightning. Chaos resistance of 30–50% is the maps target. 75% chaos is not required.";
}

function boots(to: number) {
  if (to <= 4) {
    return "Movement speed if a pair has it. Otherwise any life. Buy movement speed from the Act 1 vendor as soon as a pair is listed.";
  }
  return "Movement speed is mandatory. A pair with 0% movement speed is not an upgrade. Add life, then one resistance, on those same boots.";
}

export function armorForBand(input: ArmorInput, to: number): ArmorLine[] {
  const weapon = `${input.weaponStat} A white ${input.weaponNoun} that hits harder beats a unique you are waiting on.`;
  const jewels = resist(to);
  const bootLine = boots(to);

  if (to <= 4) {
    return lines([
      ["Weapon", `The ${input.weaponNoun} with the highest damage from the first vendor. ${weapon}`],
      ["Body", `Any life. ${input.defence} is a bonus. An empty chest is the thing to fix.`],
      ["Helmet", "Life, or one resistance. Skip a helmet that has neither."],
      ["Gloves", "Life, or leave the slot. Speed does not matter yet."],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 9) {
    return lines([
      ["Weapon", `Keep the ${input.weaponNoun} if it still kills. Replace it only for a clear damage jump. ${weapon}`],
      ["Body", `Life, then ${input.defence}.`],
      ["Helmet", "Life or a resistance."],
      ["Gloves", `Life. ${input.speed} only if the pair already has life.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 14) {
    return lines([
      ["Weapon", `One vendor check. A ${input.weaponNoun} that is obviously stronger replaces the old one. ${weapon}`],
      ["Body", `Life is the first number, then ${input.defence}.`],
      ["Helmet", "Life and one resistance."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 19) {
    return lines([
      ["Weapon", `If the ${input.weaponNoun} is about five levels old, replace it before the trial. ${weapon}`],
      ["Body", `A higher life roll. Keep ${input.defence} on the chest.`],
      ["Helmet", "Life and a resistance. Replace a helmet that has neither."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 24) {
    return lines([
      ["Weapon", `Ascending does not replace the ${input.weaponNoun}. If packs feel slow, the weapon is the problem. ${weapon}`],
      ["Body", `Life, then ${input.defence}.`],
      ["Helmet", `Life, ${input.defence}, and a resistance.`],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 29) {
    return lines([
      ["Weapon", `One more damage check before the act boss. ${weapon}`],
      ["Body", `The highest life you have, with ${input.defence}.`],
      ["Helmet", "Life and a resistance. Energy shield, armour, or evasion on top is welcome."],
      ["Gloves", `Life and ${input.speed}. A damage roll is extra, not required.`],
      ["Boots", bootLine],
      ["Jewelry", `${jewels} Life on the belt or amulet once the resistances are in that range.`],
    ]);
  }

  if (to <= 34) {
    return lines([
      ["Weapon", `Act 3 is where an old ${input.weaponNoun} shows. ${weapon}`],
      ["Body", `${input.defence} and life on the chest. This is the piece that keeps you up.`],
      ["Helmet", `Life and ${input.defence}.`],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", `${jewels} Get ${input.defence} on three pieces in total, not one fancy slot.`],
    ]);
  }

  if (to <= 39) {
    return lines([
      ["Weapon", `Still judged by damage, not by the name. ${weapon}`],
      ["Body", `More life. ${input.defence} stays.`],
      ["Helmet", "Life, a resistance, and some defence. Replace a helmet with none of those."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 44) {
    return lines([
      ["Weapon", `Weapon check before the islands. ${weapon}`],
      ["Body", `Life and ${input.defence}.`],
      ["Helmet", "Life and a resistance."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 49) {
    return lines([
      ["Weapon", `Visit town once per island and replace a tired ${input.weaponNoun}. ${weapon}`],
      ["Body", `Life first. ${input.defence} second.`],
      ["Helmet", "Life and a resistance."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 54) {
    return lines([
      ["Weapon", `Do not enter an interlude on an Act 2 ${input.weaponNoun}. ${weapon}`],
      ["Body", `Life and ${input.defence}, because resistances are about to fall.`],
      ["Helmet", "Life and as much resistance as the piece has."],
      ["Gloves", `Life. ${input.speed} still matters.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  if (to <= 59) {
    return lines([
      ["Weapon", `Damage first if you are dying slowly. Life first if you are dying in one hit. ${weapon}`],
      ["Body", `Life on the chest. ${input.defence} on it.`],
      ["Helmet", "Life and a resistance. Recap whatever fell under the cap."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", `${jewels} A charm for the ailment that killed you is enough.`],
    ]);
  }

  if (to <= 65) {
    return lines([
      ["Weapon", `White maps. The ${input.weaponNoun} is still the first upgrade. ${weapon}`],
      ["Body", `Life and ${input.defence} on the chest.`],
      ["Helmet", `Life, ${input.defence}, and a resistance.`],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", bootLine],
      ["Jewelry", jewels],
    ]);
  }

  return lines([
    ["Weapon", `The biggest damage upgrade you can equip. ${weapon}`],
    ["Body", `Life and ${input.defence}. A unique body is optional and listed below.`],
    ["Helmet", `Life, ${input.defence}, and a resistance you still need.`],
    ["Gloves", `Life, ${input.speed}, and then ${input.damage}.`],
    ["Boots", bootLine],
    ["Jewelry", `${jewels} Then life, then ${input.damage}.`],
  ]);
}
