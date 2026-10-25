import { readFileSync } from "node:fs";

const campaign = readFileSync(new URL("../src/content/campaign.ts", import.meta.url), "utf8");
const gems = JSON.parse(readFileSync(new URL("../src/content/gemArt.json", import.meta.url), "utf8"));
const tree = JSON.parse(readFileSync(new URL("../src/content/treeRoutes.json", import.meta.url), "utf8"));
const armor = readFileSync(new URL("../src/content/armorPlan.ts", import.meta.url), "utf8");
const loadouts = readFileSync(new URL("../src/content/loadouts.ts", import.meta.url), "utf8");
const timeline = readFileSync(new URL("../src/content/timeline.ts", import.meta.url), "utf8");
const guideView = readFileSync(new URL("../src/components/GuideView.tsx", import.meta.url), "utf8");
const specs = [
  readFileSync(new URL("../src/content/buildSpecs.ts", import.meta.url), "utf8"),
  readFileSync(new URL("../src/content/extraSpecs.ts", import.meta.url), "utf8"),
].join("\n");

const required = [
  "Balbala, the Traitor",
  "Great White One",
  "Hinekora",
  "Beira of the Rotten Pack",
  "The Crowbell",
  "Kabala, the Constrictor Queen",
  "Sisters of Garukhan",
  "Mighty Silverfist",
  "Ignagduk, the Bog Witch",
  "Blackjaw, the Remnant",
  "Omniphobia, Fear Manifest",
  "Lythara, the Wayward Spear",
  "Oswin, the Dread Warden",
  "Hooded One",
  "25% increased stun threshold",
  "experience pillar",
  "https://maxroll.gg/poe2/getting-started/permanent-stats-from-campaign",
  "https://maxroll.gg/poe2/getting-started/path-of-exile-2-campaign-guide",
  "https://mobalytics.gg/poe-2/guides/0-5-campaign-checklist-stats-rewards-skillpoints-and-more",
];

const forbidden = ["Basala", "Heart of Keth", "medicine circle", "Navali"];

const failures = [];

for (const phrase of required) {
  if (!campaign.includes(phrase)) failures.push(`campaign is missing ${phrase}`);
}
for (const phrase of forbidden) {
  if (campaign.includes(phrase)) failures.push(`campaign still mentions ${phrase}`);
}
if (!campaign.includes("greater rune")) failures.push("Blind Beast should be described as a greater rune");
if (campaign.includes("Blind Beast") && /Blind Beast[^.]*skill points/i.test(campaign)) {
  failures.push("Blind Beast must not be listed as skill points");
}

for (const name of ["Ice Shot", "Martial Tempo"]) {
  const icon = gems[name]?.icon ?? "";
  if (!icon.startsWith("https://cdn.poe2db.tw/image/")) failures.push(`${name} is missing a gem icon`);
}

const classNames = new Set(["RANGER", "MERCENARY", "WARRIOR", "MONK", "WITCH", "DRUID", "DUELIST", "MARAUDER", "TEMPLAR", "SIX"]);
for (const [key, route] of Object.entries(tree.routes)) {
  if (!Array.isArray(route.nodes) || route.nodes.length < 9) {
    failures.push(`${key} route is shorter than 9 nodes`);
    continue;
  }
  for (const node of [route.start, ...route.nodes, ...route.forks]) {
    if (typeof node.x !== "number" || typeof node.y !== "number") failures.push(`${key} node ${node.name} has no position`);
    if (classNames.has(node.name)) failures.push(`${key} walks through class start ${node.name}`);
  }
}

const notables = (key) => tree.routes[key].nodes.filter((node) => node.notable).map((node) => node.name);
if (!notables("ranger").includes("Blur") || !notables("ranger").includes("Clean Shot")) {
  failures.push("ranger route is missing Blur or Clean Shot");
}
if (!notables("warrior").includes("Brutal")) failures.push("warrior route is missing Brutal");
if (!notables("monk").includes("Flow Like Water")) failures.push("monk route is missing Flow Like Water");
if (tree.patch !== "0.5.5") failures.push("tree patch is not 0.5.5");
if (!String(tree.source).includes("grindinggear/poe2-skilltree-export")) failures.push("tree source is not the official export");

if (!armor.includes("75% fire, 75% cold, and 75% lightning")) failures.push("armor plan is missing the 75% cap");
if (!loadouts.includes("Rapid Attacks II")) failures.push("loadouts are missing Rapid Attacks II");
if (!loadouts.includes("lightning-arrow-deadeye")) failures.push("loadouts are missing the Lightning Arrow source");
if (!loadouts.includes("https://mobalytics.gg/poe-2/builds/ice-shot-deadeye")) {
  failures.push("loadouts are missing the Mobalytics Ice Shot source");
}
if (!loadouts.includes("https://poe.ninja/poe2/builds")) failures.push("loadouts are missing poe.ninja");
if (!timeline.includes("Trial of the Sekhemas")) failures.push("timeline is missing the first ascendancy trial");
if (!timeline.includes("Trial of Chaos")) failures.push("timeline is missing the Trial of Chaos");
if (!timeline.includes("Balbala")) failures.push("timeline is missing Balbala");
if (!guideView.includes("Do this now")) failures.push("guide view is missing the current-step marker");

const counts = new Map();
for (const match of specs.matchAll(/ascendancyId: "([^"]+)"/g)) {
  counts.set(match[1], (counts.get(match[1]) ?? 0) + 1);
}
if (counts.size < 22) failures.push(`expected 22 ascendancies, found ${counts.size}`);
for (const [id, count] of counts) {
  if (count < 5) failures.push(`${id} has ${count} builds, expected at least 5`);
}
const ids = [...specs.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
const dupes = ids.filter((id, index) => ids.indexOf(id) !== index);
if (dupes.length) failures.push(`duplicate build ids: ${dupes.join(", ")}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`guide checks passed (${Object.keys(tree.routes).length} routes, ${Object.keys(gems).length} gem icons)`);
