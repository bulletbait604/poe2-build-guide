import type { ArmorLine } from "@/lib/types";
import { gearLineForLevel } from "@/content/gearCards";

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
  const gear = gearLineForLevel(input, to);
  const weapon =
    to < 16
      ? `The ${input.weaponNoun} with the highest damage from the vendor. Replace it when it is more than 5 levels behind. ${input.weaponStat}`
      : `A ${input.weaponNoun} within 5 levels of the zone. ${input.weaponStat} A white weapon that hits harder beats a unique you are waiting on.`;
  const defence = input.defence;
  const speed = input.speed;

  if (to <= 14) {
    return lines([
      ["Weapon", weapon],
      ["Body", `+(20–39) to maximum Life, then ${defence}. An empty chest is the first fix.`],
      ["Helmet", "+(10–29) to maximum Life, or one resistance of +(6–15)%."],
      ["Gloves", `+(10–29) life. ${speed} only after the life is there: (5–7)% at item level 1.`],
      ["Boots", "10% increased Movement Speed (Runner's, item level 1). Then +(10–29) to maximum Life."],
      ["Jewelry", gear],
    ]);
  }

  if (to <= 29) {
    return lines([
      ["Weapon", weapon],
      ["Body", `+(40–69) to maximum Life, then ${defence}.`],
      ["Helmet", "Life +(30–59) and one resistance of +(16–25)%."],
      ["Gloves", `Life +(30–59) and ${speed} of (8–13)%.`],
      ["Boots", "15% increased Movement Speed (Sprinter's, item level 16), then +(30–59) life and one resistance."],
      ["Jewelry", "30–40% fire, 30–40% cold, and 30–40% lightning. A suffix of +(16–25)% is item level 24–38."],
    ]);
  }

  if (to <= 49) {
    return lines([
      ["Weapon", weapon],
      ["Body", `+(70–119) life and ${defence}.`],
      ["Helmet", "Life +(60–99) and a resistance of +(21–30)%."],
      ["Gloves", `Life +(60–84) and ${speed} of (11–13)% (item level 37 on gloves).`],
      ["Boots", "20–25% increased Movement Speed (item level 33–46). Keep life on the same pair."],
      ["Jewelry", "Each of fire, cold, and lightning over 40%. Chaos resistance is a bonus, not a number you chase to 75%."],
    ]);
  }

  if (to <= 59) {
    return lines([
      ["Weapon", weapon],
      ["Body", `+(100–149) life and ${defence}, because resistances are about to fall.`],
      ["Helmet", "Life and whichever element fell."],
      ["Gloves", `Life and ${speed}.`],
      ["Boots", "25–30% increased Movement Speed. Do not drop to 0% to gain a small life roll."],
      ["Jewelry", "Push fire, cold, and lightning toward 75% before the interlude penalty. Recap whatever falls."],
    ]);
  }

  return lines([
    ["Weapon", weapon],
    ["Body", `+(120–214) life and ${defence}. A unique body is optional.`],
    ["Helmet", `Life, ${defence}, and a resistance you still need for the cap.`],
    ["Gloves", `Life, ${speed} of (14–16)% on gloves or higher on the weapon, then ${input.damage}.`],
    ["Boots", "30–35% increased Movement Speed (Cheetah's at item level 65, or Hellion's 35% at item level 82)."],
    ["Jewelry", `${gear} 75% fire, 75% cold, and 75% lightning. Chaos resistance of 30–50% is the maps target. 75% chaos is not required.`],
  ]);
}
