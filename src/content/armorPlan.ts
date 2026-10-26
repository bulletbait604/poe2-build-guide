import type { ArmorLine } from "@/lib/types";
import { weaponText } from "@/content/shopping";
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
  const weapon = weaponText(input.weaponNoun, to);
  const rows = lines([["Weapon", weapon], ...statsForLevel(input, to).map((lookFor) => ["Gear", lookFor] as [string, string])]);
  if (to >= 60) rows.push({ slot: "Jewelry", lookFor: "75% fire, 75% cold, and 75% lightning" });
  return rows;
}
