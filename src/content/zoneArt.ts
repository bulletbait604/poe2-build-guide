// Zone runes taken from the area pages on poe2db (2026-10-26).
// A guessed filename is left out. Kill steps with no rune use the rare-monster
// marker. Everything else uses the waypoint. Neither marker is a portrait of a named boss.

const RARE = "https://cdn.poe2db.tw/image/Art/2DArt/minimap/player/RareMonsterAlive.webp";
const WAYPOINT = "https://cdn.poe2db.tw/image/worldmap/waypoint24.webp";

const RUNES: Array<[string, string]> = [
  ["Hunting Grounds", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act1/WorldMapHuntingGroundsRune.webp"],
  ["Ogham Farmlands", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act1/WorldMapFarmlandRune.webp"],
  ["Keth", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act2/WorldMapHandRune2.webp"],
  ["Bone Pits", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act2/WorldMapHeadRune.webp"],
  ["Valley of the Titans", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act2/WorldMapEssence.webp"],
  ["Deshar", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act2/WorldMapHandRune1.webp"],
  ["Jungle Ruins", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act3/WorldMapOrokRunstone.webp"],
  ["Venom Crypts", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act3/WorldMapServiRunstone.webp"],
  ["Azak Bog", "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/Act3/WorldMapCarverRunstone.webp"],
];

export function stepImage(zone: string, quest: string) {
  const place = `${zone} ${quest}`;
  for (const [name, url] of RUNES) {
    if (zone.includes(name)) return url;
  }
  if (/\b(kill|boss|defeat|slay)\b/i.test(place)) return RARE;
  return WAYPOINT;
}
