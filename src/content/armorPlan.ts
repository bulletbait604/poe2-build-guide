import type { ArmorLine } from "@/lib/types";
import { statsForLevel } from "@/content/statLines";

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
  const weapon =
    to < 16
      ? `The ${input.weaponNoun} with the highest damage from the vendor. Replace it when it is more than 5 levels behind.`
      : `A ${input.weaponNoun} within 5 levels of the zone. A white weapon that hits harder beats a unique you are waiting on.`;
  const rows = lines([["Weapon", weapon], ...statsForLevel(input, to).map((lookFor) => ["Gear", lookFor] as [string, string])]);
  if (to >= 60) rows.push({ slot: "Jewelry", lookFor: "75% fire, 75% cold, and 75% lightning" });
  return rows;
}
