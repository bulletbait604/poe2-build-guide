// Official class and ascendancy icons from the poe2db ascendancy index, 2026-10-26.
// https://poe2db.tw/us/Ascendancy_class

const root = "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/Common";

export const classIcons: Record<string, string> = {
  Ranger: `${root}/IconDexFour.webp`,
  Huntress: `${root}/IconDexFourb.webp`,
  Monk: `${root}/IconDexIntFourb.webp`,
  Witch: `${root}/IconIntFour.webp`,
  Sorceress: `${root}/IconIntFourb.webp`,
  Warrior: `${root}/IconStrFourb.webp`,
  Mercenary: `${root}/IconStrDexFourb.webp`,
  Druid: `${root}/IconStrIntFourb.webp`,
};

export const ascendancyIcons: Record<string, string> = {
  Deadeye: `${root}/IconDexFour_Ranger1.webp`,
  Pathfinder: `${root}/IconDexFour_Ranger3.webp`,
  Amazon: `${root}/IconDexFourb_Huntress1.webp`,
  "Spirit Walker": `${root}/IconDexFourb_Huntress2.webp`,
  Ritualist: `${root}/IconDexFourb_Huntress3.webp`,
  "Martial Artist": `${root}/IconDexIntFourb_Monk1.webp`,
  Invoker: `${root}/IconDexIntFourb_Monk2.webp`,
  "Acolyte of Chayula": `${root}/IconDexIntFourb_Monk3.webp`,
  Infernalist: `${root}/IconIntFour_Witch1.webp`,
  "Blood Mage": `${root}/IconIntFour_Witch2.webp`,
  Lich: `${root}/IconIntFour_Witch3.webp`,
  Stormweaver: `${root}/IconIntFourb_Sorceress1.webp`,
  Chronomancer: `${root}/IconIntFourb_Sorceress2.webp`,
  "Disciple of Varashta": `${root}/IconIntFourb_Sorceress3.webp`,
  Titan: `${root}/IconStrFourb_Warrior1.webp`,
  Warbringer: `${root}/IconStrFourb_Warrior2.webp`,
  "Smith of Kitava": `${root}/IconStrFourb_Warrior3.webp`,
  Tactician: `${root}/IconStrDexFourb_Mercenary1.webp`,
  Witchhunter: `${root}/IconStrDexFourb_Mercenary2.webp`,
  "Gemling Legionnaire": `${root}/IconStrDexFourb_Mercenary3.webp`,
  Oracle: `${root}/IconStrIntFourb_Druid1.webp`,
  Shaman: `${root}/IconStrIntFourb_Druid2.webp`,
};

export function classIcon(name: string) {
  return classIcons[name] ?? null;
}

export function ascendancyIcon(name: string) {
  return ascendancyIcons[name] ?? null;
}
