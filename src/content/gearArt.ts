// Base-item art from the public poe2db CDN, which serves the game's 2D item images.
// These are the pictures for a slot, not uniques to buy. The tooltip is the stat plan.
// Checked 2026-10-25 against https://poe2db.tw item pages and direct image responses.

const root = "https://cdn.poe2db.tw/image/Art/2DItems";

const sets = {
  str: {
    Helmet: `${root}/Armours/Helmets/Basetypes/HelmetStr01.webp`,
    Body: `${root}/Armours/BodyArmours/Basetypes/BodyStr02.webp`,
    Gloves: `${root}/Armours/Gloves/Basetypes/GlovesStr01.webp`,
    Boots: `${root}/Armours/Boots/Basetypes/BootsStr01.webp`,
    Amulet: `${root}/Amulets/Basetypes/AmberAmulet.webp`,
    Ring: `${root}/Rings/Basetypes/IronRing.webp`,
    Belt: `${root}/Belts/Basetypes/Belt09.webp`,
  },
  dex: {
    Helmet: `${root}/Armours/Helmets/Basetypes/HelmetDex01.webp`,
    Body: `${root}/Armours/BodyArmours/Basetypes/BodyDex01.webp`,
    Gloves: `${root}/Armours/Gloves/Basetypes/GlovesDex01.webp`,
    Boots: `${root}/Armours/Boots/Basetypes/BootsDex01.webp`,
    Amulet: `${root}/Amulets/Basetypes/JadeAmulet.webp`,
    Ring: `${root}/Rings/Basetypes/GoldRing.webp`,
    Belt: `${root}/Belts/Basetypes/Belt01.webp`,
  },
  int: {
    Helmet: `${root}/Armours/Helmets/Basetypes/HelmetInt01.webp`,
    Body: `${root}/Armours/BodyArmours/Basetypes/BodyInt01.webp`,
    Gloves: `${root}/Armours/Gloves/Basetypes/GlovesInt01.webp`,
    Boots: `${root}/Armours/Boots/Basetypes/BootsInt01.webp`,
    Amulet: `${root}/Amulets/Basetypes/LapisAmulet.webp`,
    Ring: `${root}/Rings/Basetypes/LazuliRing.webp`,
    Belt: `${root}/Belts/Basetypes/Belt02.webp`,
  },
  strdex: {
    Helmet: `${root}/Armours/Helmets/Basetypes/HelmetStrDex01.webp`,
    Body: `${root}/Armours/BodyArmours/Basetypes/BodyStrDex01.webp`,
    Gloves: `${root}/Armours/Gloves/Basetypes/GlovesStrDex01.webp`,
    Boots: `${root}/Armours/Boots/Basetypes/BootsStrDex01.webp`,
    Amulet: `${root}/Amulets/Basetypes/GoldAmulet.webp`,
    Ring: `${root}/Rings/Basetypes/GoldRing.webp`,
    Belt: `${root}/Belts/Basetypes/Belt03.webp`,
  },
  dexint: {
    Helmet: `${root}/Armours/Helmets/Basetypes/HelmetDexInt01.webp`,
    Body: `${root}/Armours/BodyArmours/Basetypes/BodyDexInt01.webp`,
    Gloves: `${root}/Armours/Gloves/Basetypes/GlovesDexInt01.webp`,
    Boots: `${root}/Armours/Boots/Basetypes/BootsDexInt01.webp`,
    Amulet: `${root}/Amulets/Basetypes/LunarAmulet.webp`,
    Ring: `${root}/Rings/Basetypes/LazuliRing.webp`,
    Belt: `${root}/Belts/Basetypes/Belt02.webp`,
  },
} as const;

type SetName = keyof typeof sets;
type Piece = keyof (typeof sets)["str"];

const weapons: Record<string, string> = {
  bow: `${root}/Weapons/TwoHandWeapons/Bows/Basetypes/Bow02.webp`,
  spear: `${root}/Weapons/OneHandWeapons/OneHandSpears/1HSpear01.webp`,
  mace: `${root}/Weapons/TwoHandWeapons/TwoHandMaces/Basetypes/2HMace02.webp`,
  "mace and shield": `${root}/Weapons/TwoHandWeapons/TwoHandMaces/Basetypes/2HMace02.webp`,
  crossbow: `${root}/Weapons/TwoHandWeapons/Crossbows/2HCrossbow01.webp`,
  quarterstaff: `${root}/Weapons/TwoHandWeapons/WarStaves/Warstaff01.webp`,
  wand: `${root}/Weapons/OneHandWeapons/Wands/Basetypes/Wand01.webp`,
  staff: `${root}/Weapons/TwoHandWeapons/Staves/Basetypes/Staff01.webp`,
  sceptre: `${root}/Weapons/OneHandWeapons/Scepters/Basetypes/Sceptre01.webp`,
};

function family(defence: string): SetName {
  const text = defence.toLowerCase();
  if (text.includes("evasion") && text.includes("energy")) return "dexint";
  if (text.includes("armour") && text.includes("evasion")) return "strdex";
  if (text.includes("energy")) return "int";
  if (text.includes("evasion")) return "dex";
  return "str";
}

export function gearIcon(slot: string, weaponNoun: string, defence: string) {
  if (/jewel/i.test(slot)) return `${root}/Jewels/RubyJewel.webp`;
  if (slot === "Weapon") return weapons[weaponNoun] ?? weapons.mace;
  const piece = (slot === "Jewelry" ? "Ring" : slot) as Piece;
  return sets[family(defence)][piece] ?? sets.str.Body;
}
