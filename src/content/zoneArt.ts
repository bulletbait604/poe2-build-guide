// Pictures that load from the poe2db CDN in a browser, checked 2026-10-26.
// The act world-map runes return 403, so a step uses a trial button when that
// trial is named, the rare-monster marker on a kill, and the waypoint otherwise.
// The marker is not a portrait of a named boss.

const RARE = "https://cdn.poe2db.tw/image/Art/2DArt/minimap/player/RareMonsterAlive.webp";
const WAYPOINT = "https://cdn.poe2db.tw/image/worldmap/waypoint24.webp";
const SANCTUM = "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/MapButtonSanctum.webp";
const CHAOS = "https://cdn.poe2db.tw/image/Art/2DArt/UIImages/InGame/WorldMap/MapButtonUltimatum.webp";

export function stepImage(zone: string, quest: string) {
  const place = `${zone} ${quest}`;
  if (/sekhema|sanctum/i.test(place)) return SANCTUM;
  if (/chaos|ultimatum/i.test(place)) return CHAOS;
  if (/\b(kill|boss|defeat|slay)\b/i.test(place)) return RARE;
  return WAYPOINT;
}
