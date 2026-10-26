import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { guides } from "../src/content/guides/index";
import gemArt from "../src/content/gemArt.json";
import itemIcons from "../src/content/item-icons.json";
import catalog from "../src/content/gemCatalog.json";
import { ascendancyIcons, classIcons } from "../src/content/ascendancyArt";

const root = new URL("../", import.meta.url);
const failures: string[] = [];
const read = (path: string) => readFileSync(new URL(path, root), "utf8");

if (guides.length !== 118) failures.push(`expected 118 guides, found ${guides.length}`);

const banned: Array<[RegExp, string]> = [
  [/gem\("Predator's Mark"\)/, "Predator's Mark is not a socketable gem"],
  [/\+50 spirit/i, "+50 spirit is not a spirit tier"],
  [/greater rune/i, "Blind Beast does not reward a greater rune"],
  [/October 19, 2026/, "the ascendancy tier list was updated September 19, 2026"],
  [/5,000 energy shield/, "5,000 energy shield is not on the cited pages"],
  [/\+95 spirit/, "+95 spirit is not a mod"],
  [/spirit is 120/, "Mirage Archer reserves 60 spirit"],
  [/Changeling Talisman in Act 1/, "the Act 1 talisman is Amor Mandragora"],
  [/Blasphemy and Repulsion/, "Repulsion is not a legal support on Blasphemy"],
  [/more spirit than your rare/, "Vis Mortis does not grant spirit"],
  [/until Akoyan/, "Akoyan is not the verified hold point for Seaglass Spear"],
  [/An aura/i, "Wind Dancer, Ghost Dance, and the heralds are persistent spirit gems"],
  [/30–40%/, "30–40% mashes two resistance tiers"],
  [/15–20%/, "15–20% mashes two resistance tiers"],
];

for (const path of [
  "src/content/loadouts.ts",
  "src/content/buildSpecs.ts",
  "src/content/extraSpecs.ts",
  "src/content/campaign.ts",
  "src/content/gems.ts",
  "src/content/gearCards.ts",
  "src/content/classes.ts",
]) {
  const text = read(path);
  for (const [pattern, message] of banned) {
    if (pattern.test(text)) failures.push(`${path}: ${message}`);
  }
}

const uniques: Record<string, { level: number; slot: string }> = {
  "Amor Mandragora": { level: 1, slot: "Talisman" },
  Blackbraid: { level: 4, slot: "Body" },
  Blackgleam: { level: 8, slot: "Quiver" },
  "Bones of Ullr": { level: 16, slot: "Boots" },
  "Brynhand's Mark": { level: 1, slot: "Mace" },
  "Carnage Heart": { level: 8, slot: "Amulet" },
  Chainsting: { level: 10, slot: "Spear" },
  "Changeling Talisman": { level: 38, slot: "Talisman" },
  "Dream Fragments": { level: 12, slot: "Ring" },
  Drillneck: { level: 55, slot: "Quiver" },
  Dunkelhalt: { level: 1, slot: "Buckler" },
  "Eye of Chayula": { level: 35, slot: "Amulet" },
  Foxshade: { level: 4, slot: "Body" },
  Ghostmarch: { level: 16, slot: "Boots" },
  Ghostwrithe: { level: 1, slot: "Body" },
  Goldrim: { level: 10, slot: "Helmet" },
  "Horns of Bynden": { level: 1, slot: "Helmet" },
  "Hrimnor's Hymn": { level: 4, slot: "Mace" },
  Lifesprig: { level: 2, slot: "Wand" },
  "Marohi Erqi": { level: 60, slot: "Mace" },
  Matsya: { level: 20, slot: "Quarterstaff" },
  "Mist Whisper": { level: 1, slot: "Crossbow" },
  Necromantle: { level: 16, slot: "Body" },
  "Pillar of the Caged God": { level: 4, slot: "Quarterstaff" },
  "Queen of the Forest": { level: 51, slot: "Body" },
  "Quill Rain": { level: 5, slot: "Bow" },
  "Rampart Raptor": { level: 4, slot: "Crossbow" },
  "Saitha's Spear": { level: 33, slot: "Spear" },
  Skysliver: { level: 16, slot: "Spear" },
  "Splinter of Lorrata": { level: 1, slot: "Spear" },
  "Surefooted Sigil": { level: 8, slot: "Amulet" },
  "The Blood Thorn": { level: 1, slot: "Quarterstaff" },
  "The Dark Defiler": { level: 1, slot: "Sceptre" },
  "The Last Lament": { level: 77, slot: "Crossbow" },
  "The Raven's Flock": { level: 65, slot: "Staff" },
  "The Searing Touch": { level: 16, slot: "Staff" },
  "Threaded Light": { level: 6, slot: "Focus" },
  Trampletoe: { level: 27, slot: "Boots" },
  Trephina: { level: 11, slot: "Mace" },
  "Vis Mortis": { level: 58, slot: "Body" },
  Wanderlust: { level: 11, slot: "Boots" },
  Widowhail: { level: 1, slot: "Bow" },
};

const specText = `${read("src/content/buildSpecs.ts")}\n${read("src/content/extraSpecs.ts")}`;
const usedUniques = new Set<string>();
for (const match of specText.matchAll(/u\("((?:\\.|[^"\\])*)", "([^"]+)", (\d+)/g)) {
  const name = match[1].replace(/\\"/g, '"');
  const slot = match[2];
  const level = Number(match[3]);
  usedUniques.add(name);
  const row = uniques[name];
  if (!row) {
    failures.push(`unique ${name} has no poe2db required level on record`);
    continue;
  }
  if (level !== row.level) failures.push(`${name} is listed at level ${level}; poe2db required level is ${row.level}`);
  if (slot !== row.slot) failures.push(`${name} is in slot ${slot}; poe2db base is ${row.slot}`);
}
if (usedUniques.size < 40) failures.push(`only ${usedUniques.size} unique names were parsed`);

const affixes = new Set(
  String.raw`
(1-2)% increased Dexterity
(1-2)% increased Intelligence
(1-2)% increased Strength
(101-110)% increased Energy Shield
(11-13)% increased Attack Speed
(14-16)% increased Attack Speed
(14-16)% increased Attack Speed for allies in your Presence
(14-19)% increased Cast Speed
(155-169)% increased Physical Damage
(17-19)% increased Attack Speed
(20-22)% increased Attack Speed
(23-25)% increased Attack Speed
(209-238)% increased Spell Damage
(25-28)% increased Cast Speed
(26-28)% increased Attack Speed
(26-39) to (44-66) added Physical Damage
(27-42)% increased Energy Shield
(33-35)% increased Cast Speed
(37-55) to (63-94) added Physical Damage
(4-6) to (7-11) added Physical Damage
(40-49)% increased Physical Damage
(50-64)% increased Physical Damage
(50-68)% increased Spell Damage
(25-34)% increased Spell Damage
(35-44)% increased Spell Damage
(45-54)% increased Spell Damage
(55-64)% increased Spell Damage
(65-74)% increased Spell Damage
(65-84)% increased Physical Damage
(69-88)% increased Spell Damage
(75-89)% increased Spell Damage
(85-109)% increased Physical Damage
(89-108)% increased Spell Damage
(90-104)% increased Spell Damage
(109-128)% increased Spell Damage
(110-134)% increased Physical Damage
(129-148)% increased Spell Damage
(135-154)% increased Physical Damage
(149-188)% increased Spell Damage
(170-179)% increased Physical Damage
(189-208)% increased Spell Damage
(13-16)% increased Cast Speed
(17-20)% increased Cast Speed
(20-25)% increased Cast Speed
(21-24)% increased Cast Speed
(26-31)% increased Cast Speed
(29-32)% increased Cast Speed
(32-37)% increased Cast Speed
(38-43)% increased Cast Speed
(44-49)% increased Cast Speed
+(5-6) to Level of all Spell Skills
(5-6) to Level of all Spell Skills
(5-7)% increased Attack Speed
(5-7)% increased Attack Speed for allies in your Presence
(5-8) to (10-15) added Physical Damage
(50-52)% increased Cast Speed
(8-10)% increased Attack Speed
(9-12)% increased Cast Speed
+1 to Level of all Melee Skills
+1 to Level of all Minion Skills
+2 to Level of all Minion Skills
+1 to Level of all Projectile Skills
+1 to Level of all Spell Skills
+10-17 maximum Energy Shield
+10-19 maximum Life
+18-24 maximum Energy Shield
+20-29 maximum Life
+21-25% Cold Resistance
+21-25% Fire Resistance
+21-25% Lightning Resistance
+31-35 maximum Energy Shield
+31-35% Cold Resistance
+31-35% Fire Resistance
+31-35% Lightning Resistance
+41-45% Cold Resistance
+41-45% Fire Resistance
+41-45% Lightning Resistance
+42-47 maximum Energy Shield
+70-84 maximum Life
+74-80 maximum Energy Shield
+81-90 maximum Energy Shield
+85-99 maximum Life
+190-199 maximum Life
35% increased Movement Speed
+100-119 maximum Life
+11-15% Cold Resistance
+11-15% Fire Resistance
+11-15% Lightning Resistance
+120-149 maximum Life
+150-174 maximum Life
+16-20% Cold Resistance
+16-20% Fire Resistance
+16-20% Lightning Resistance
+13-16 Dexterity
+13-16 Intelligence
+13-16 Strength
+17-20 Dexterity
+17-20 Intelligence
+17-20 Strength
+21-24 Dexterity
+21-24 Intelligence
+21-24 Strength
+31-33 Dexterity
+31-33 Intelligence
+31-33 Strength
+4 to Level of all Melee Skills
+175-189 maximum Life
+2 to Level of all Melee Skills
+2 to Level of all Projectile Skills
+2 to Level of all Spell Skills
+20-23% Chaos Resistance
+200-214 maximum Life
+25-27 Dexterity
+25-27 Intelligence
+25-27 Strength
+25-30 maximum Energy Shield
+26-30% Cold Resistance
+26-30% Fire Resistance
+26-30% Lightning Resistance
+28-30 Dexterity
+28-30 Intelligence
+28-30 Strength
+3 to Level of all Melee Skills
+3 to Level of all Minion Skills
+3 to Level of all Projectile Skills
+3 to Level of all Spell Skills
+30-33 Spirit
+30-39 maximum Life
+36-40% Cold Resistance
+36-40% Fire Resistance
+36-40% Lightning Resistance
+36-41 maximum Energy Shield
+4 to Level of all Minion Skills
+4 to Level of all Projectile Skills
+4 to Level of all Spell Skills
+40-59 maximum Life
+47-50 Spirit
+48-60 maximum Energy Shield
+5 to Level of all Melee Skills
+5 to Level of all Projectile Skills
+5-8 Dexterity
+5-8 Intelligence
+5-8 Strength
+57-61 Spirit
+6-10% Cold Resistance
+6-10% Fire Resistance
+6-10% Lightning Resistance
+60-69 maximum Life
+61-73 maximum Energy Shield
+9-12 Dexterity
+9-12 Intelligence
+9-12 Strength
+91-96 maximum Energy Shield
10% increased Movement Speed
15% increased Movement Speed
20% increased Movement Speed
25% increased Movement Speed
30% Chaos Resistance
30% increased Movement Speed
50% Chaos Resistance
75% Cold Resistance
75% Fire Resistance
75% Lightning Resistance
`
    .trim()
    .split("\n"),
);

let statCount = 0;
for (const guide of guides) {
  const lines = [
    ...guide.gearCards.flatMap((card) => [...card.leveling, ...card.endgame]),
    ...guide.timeline.flatMap((step) => step.checks.flatMap((check) => check.stats ?? [])),
    ...guide.phases.flatMap((phase) =>
      phase.steps.flatMap((step) => (Array.isArray(step.gear) ? step.gear : step.gear ? [step.gear] : [])),
    ),
  ];
  for (const line of lines) {
    if (!/^(?:\+)?(?:\()?\d/.test(line)) continue;
    statCount += 1;
    if (!affixes.has(line)) failures.push(`${guide.id} uses an unverified stat line: ${line}`);
  }
}

const gemCatalog = catalog as Record<string, { level: number | null; kind: string }>;
const gemLocks: Record<string, { level: number; kind: string }> = {
  "Herald of Ash": { level: 4, kind: "spirit" },
  "Herald of Thunder": { level: 4, kind: "spirit" },
  "Herald of Ice": { level: 4, kind: "spirit" },
  "Withering Presence": { level: 4, kind: "spirit" },
  Blink: { level: 8, kind: "spirit" },
  "Wind Dancer": { level: 4, kind: "spirit" },
  "Ghost Dance": { level: 4, kind: "spirit" },
  "Mirage Archer": { level: 8, kind: "spirit" },
  Blasphemy: { level: 8, kind: "spirit" },
  "Freezing Mark": { level: 7, kind: "skill" },
};
for (const [name, expected] of Object.entries(gemLocks)) {
  const row = gemCatalog[name];
  if (!row) failures.push(`catalog is missing ${name}`);
  else if (row.level !== expected.level || row.kind !== expected.kind) {
    failures.push(`${name} is ${row.kind} tier ${row.level}; poe2db is ${expected.kind} tier ${expected.level}`);
  }
}
if ("Predator's Mark" in gemCatalog) failures.push("Predator's Mark is still in the gem catalog");
if ("[DNT] Crushing Earth" in gemCatalog) failures.push("internal Crushing Earth gem is still in the catalog");

const tree = read("src/content/treeRoutes.json");
for (const phrase of [
  "3% reduced Movement Speed Penalty from using Skills while moving",
  "3% increased Movement Speed while you have Energy Shield",
  "Gain additional Stun Threshold equal to 12% of maximum Energy Shield",
  "10% faster start of Energy Shield Recharge",
  "4% increased Movement Speed",
]) {
  if (!tree.includes(phrase)) failures.push(`passive tree is missing verified text: ${phrase}`);
}

const images = new Set<string>();
const add = (url: unknown) => {
  if (typeof url === "string" && /^https:\/\/.+\.(?:png|webp|jpg|jpeg)(?:\?|$)/i.test(url)) images.add(url);
};
for (const row of Object.values(gemArt as Record<string, { icon?: string }>)) add(row.icon);
for (const row of Object.values(itemIcons as Record<string, { icon?: string }>)) add(row.icon);
for (const url of Object.values(classIcons)) add(url);
for (const url of Object.values(ascendancyIcons)) add(url);
for (const guide of guides) {
  for (const card of guide.gearCards) add(card.icon);
  for (const unique of guide.uniques) add(unique.icon);
  for (const phase of guide.phases) for (const step of phase.steps) add(step.image);
}

const snapshotPath = new URL("scripts/verified-images.json", root);
async function imageStatuses() {
  if (process.env.REFRESH_IMAGES === "1") {
    const urls = [...images];
    const statuses: Record<string, number> = {};
    let cursor = 0;
    async function worker() {
      while (cursor < urls.length) {
        const url = urls[cursor];
        cursor += 1;
        try {
          let response = await fetch(url, { method: "HEAD" });
          if (response.status === 403 || response.status === 405) response = await fetch(url, { method: "GET" });
          statuses[url] = response.status;
        } catch {
          statuses[url] = 0;
        }
      }
    }
    await Promise.all(Array.from({ length: 12 }, () => worker()));
    writeFileSync(snapshotPath, `${JSON.stringify(statuses, null, 2)}\n`);
    console.log(`refreshed ${urls.length} image statuses`);
  }
  return existsSync(snapshotPath) ? (JSON.parse(readFileSync(snapshotPath, "utf8")) as Record<string, number>) : {};
}

void imageStatuses().then((snapshot) => {
let imageOk = 0;
for (const url of images) {
  const status = snapshot[url];
  if (status !== 200) failures.push(`image ${status ?? "missing"} ${url}`);
  else imageOk += 1;
}

for (const path of [
  "public/portraits/warrior.jpg",
  "public/portraits/witch.jpg",
  "public/portraits/druid.jpg",
  "public/portraits/huntress.jpg",
  "public/portraits/mercenary.jpg",
  "public/portraits/monk.jpg",
  "public/portraits/ranger.jpg",
  "public/portraits/sorceress.jpg",
]) {
  if (!existsSync(new URL(path, root))) failures.push(`missing local image ${path}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `verified ${guides.length} guides, ${usedUniques.size} unique names, ${statCount} stat lines, ${Object.keys(gemCatalog).length} catalog gems, ${imageOk} images`,
);
});
