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

export function armorForBand(input: ArmorInput, to: number): ArmorLine[] {
  const weapon = `${input.weaponStat} A white ${input.weaponNoun} that hits harder beats a unique you are waiting on.`;

  if (to <= 4) {
    return lines([
      ["Weapon", `The ${input.weaponNoun} with the highest damage from the first vendor. ${weapon}`],
      ["Body", `Any life. ${input.defence} is a bonus. An empty chest is the thing to fix.`],
      ["Helmet", "Life, or one resistance. Skip a helmet that has neither."],
      ["Gloves", "Life, or leave the slot. Speed does not matter yet."],
      ["Boots", "Movement speed if a pair has it. Otherwise any life."],
      ["Jewelry", "One resistance on a ring or the amulet. Do not shop a full set."],
    ]);
  }

  if (to <= 9) {
    return lines([
      ["Weapon", `Keep the ${input.weaponNoun} if it still kills. Replace it only for a clear damage jump. ${weapon}`],
      ["Body", `Life, then ${input.defence}.`],
      ["Helmet", "Life or a resistance."],
      ["Gloves", `Life. ${input.speed} only if the pair already has life.`],
      ["Boots", "Movement speed. Life on the same pair if you can find both."],
      ["Jewelry", "A second resistance, on a different piece from the first."],
    ]);
  }

  if (to <= 14) {
    return lines([
      ["Weapon", `One vendor check. A ${input.weaponNoun} that is obviously stronger replaces the old one. ${weapon}`],
      ["Body", `Life is the first number, then ${input.defence}.`],
      ["Helmet", "Life and one resistance."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed and life."],
      ["Jewelry", "About 20% of each element is enough. Attributes only if a gem is red."],
    ]);
  }

  if (to <= 19) {
    return lines([
      ["Weapon", `If the ${input.weaponNoun} is about five levels old, replace it before the trial. ${weapon}`],
      ["Body", `A higher life roll. Keep ${input.defence} on the chest.`],
      ["Helmet", "Life and a resistance. Replace a helmet that has neither."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed, life, and any resistance."],
      ["Jewelry", "A different resistance on each piece. Aim near 30% of each element."],
    ]);
  }

  if (to <= 24) {
    return lines([
      ["Weapon", `Ascending does not replace the ${input.weaponNoun}. If packs feel slow, the weapon is the problem. ${weapon}`],
      ["Body", `Life, then ${input.defence}.`],
      ["Helmet", `Life, ${input.defence}, and a resistance.`],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed and life. Do not drop movement speed for a small life roll."],
      ["Jewelry", "Raise whichever resistance is lowest."],
    ]);
  }

  if (to <= 29) {
    return lines([
      ["Weapon", `One more damage check before the act boss. ${weapon}`],
      ["Body", `The highest life you have, with ${input.defence}.`],
      ["Helmet", "Life and a resistance. Energy shield, armour, or evasion on top is welcome."],
      ["Gloves", `Life and ${input.speed}. A damage roll is extra, not required.`],
      ["Boots", "Movement speed, life, and one resistance."],
      ["Jewelry", "Near 40% of each element. Life on the belt or amulet if resists are already fine."],
    ]);
  }

  if (to <= 34) {
    return lines([
      ["Weapon", `Act 3 is where an old ${input.weaponNoun} shows. ${weapon}`],
      ["Body", `${input.defence} and life on the chest. This is the piece that keeps you up.`],
      ["Helmet", `Life and ${input.defence}.`],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed and life."],
      ["Jewelry", `Get ${input.defence} on three pieces in total, not one fancy slot.`],
    ]);
  }

  if (to <= 39) {
    return lines([
      ["Weapon", `Still judged by damage, not by the name. ${weapon}`],
      ["Body", `More life. ${input.defence} stays.`],
      ["Helmet", "Life, a resistance, and some defence. Replace a helmet with none of those."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "If the boots have no movement speed, replace them."],
      ["Jewelry", "The lowest resistance moves up. Do not craft. A better drop is the upgrade."],
    ]);
  }

  if (to <= 44) {
    return lines([
      ["Weapon", `Weapon check before the islands. ${weapon}`],
      ["Body", `Life and ${input.defence}.`],
      ["Helmet", "Life and a resistance."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed, life, and a resistance."],
      ["Jewelry", "Each element over 40% if you can. Chaos resistance is a bonus."],
    ]);
  }

  if (to <= 49) {
    return lines([
      ["Weapon", `Visit town once per island and replace a tired ${input.weaponNoun}. ${weapon}`],
      ["Body", `Life first. ${input.defence} second.`],
      ["Helmet", "Life and a resistance."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed and life."],
      ["Jewelry", "Top up the resistance that the last island punished."],
    ]);
  }

  if (to <= 54) {
    return lines([
      ["Weapon", `Do not enter an interlude on an Act 2 ${input.weaponNoun}. ${weapon}`],
      ["Body", `Life and ${input.defence}, because resistances are about to fall.`],
      ["Helmet", "Life and as much resistance as the piece has."],
      ["Gloves", `Life. ${input.speed} still matters.`],
      ["Boots", "Movement speed, life, and a resistance."],
      ["Jewelry", "Push each elemental resistance as high as you can before the drop."],
    ]);
  }

  if (to <= 59) {
    return lines([
      ["Weapon", `Damage first if you are dying slowly. Life first if you are dying in one hit. ${weapon}`],
      ["Body", `Life on the chest. ${input.defence} on it.`],
      ["Helmet", "Life and a resistance. Recap whatever fell under the cap."],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed stays. Add life if the pair is short."],
      ["Jewelry", "Fix the lowest resistance, then the next. A charm for the ailment that killed you is enough."],
    ]);
  }

  if (to <= 65) {
    return lines([
      ["Weapon", `White maps. The ${input.weaponNoun} is still the first upgrade. ${weapon}`],
      ["Body", `Life and ${input.defence} on the chest.`],
      ["Helmet", `Life, ${input.defence}, and a resistance.`],
      ["Gloves", `Life and ${input.speed}.`],
      ["Boots", "Movement speed, life, and a resistance."],
      ["Jewelry", "Resistances toward the cap, then life."],
    ]);
  }

  return lines([
    ["Weapon", `The biggest damage upgrade you can equip. ${weapon}`],
    ["Body", `Life and ${input.defence}. A unique body is optional and listed below.`],
    ["Helmet", `Life, ${input.defence}, and a resistance you still need.`],
    ["Gloves", `Life, ${input.speed}, and then ${input.damage}.`],
    ["Boots", "Movement speed, life, and a resistance. Do not give up movement speed."],
    ["Jewelry", `Resistances at the cap, then life, then ${input.damage}.`],
  ]);
}
