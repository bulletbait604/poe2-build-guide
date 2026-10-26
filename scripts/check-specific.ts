// Fails when a composed guide still tells the player to shop in vague language.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { buildSpecs } from "../src/content/buildSpecs";
import { extraSpecs } from "../src/content/extraSpecs";
import { composeGuide } from "../src/content/composeGuide";

const banned: Array<[RegExp, string]> = [
  [/highest damage/i, "highest damage"],
  [/highest dps/i, "highest dps"],
  [/highest life/i, "highest life"],
  [/highest evasion/i, "highest evasion"],
  [/highest energy shield/i, "highest energy shield"],
  [/highest movement/i, "highest movement"],
  [/highest physical/i, "highest physical"],
  [/highest elemental/i, "highest elemental"],
  [/higher tooltip/i, "higher tooltip"],
  [/tooltip damage/i, "tooltip damage"],
  [/better weapon/i, "better weapon"],
  [/better bow/i, "better bow"],
  [/some resistance/i, "some resistance"],
  [/some life/i, "some life"],
  [/upgrade gear/i, "upgrade gear"],
  [/upgrade your/i, "upgrade your"],
  [/hits harder/i, "hits harder"],
  [/five levels/i, "five levels"],
  [/within 5 levels/i, "within 5 levels"],
  [/more than 5 levels/i, "more than 5 levels"],
  [/first vendor/i, "first vendor"],
  [/act 1 vendor/i, "Act 1 vendor"],
  [/white weapon that/i, "white weapon that"],
  [/white bow that/i, "white bow that"],
  [/whenever the tooltip/i, "whenever the tooltip"],
  [/about the level of the zone/i, "about the level of the zone"],
  [/next spear base/i, "next spear base"],
  [/stronger spear/i, "stronger spear"],
  [/stronger rare/i, "stronger rare"],
  [/is the upgrade/i, "is the upgrade"],
  [/is an upgrade/i, "is an upgrade"],
  [/whichever (resistance|element|gem)/i, "whichever resistance, element, or gem"],
  [/any life or energy shield/i, "any life or energy shield"],
  [/check the vendor/i, "check the vendor"],
  [/packs slow down/i, "packs slow down"],
  [/town vendor/i, "town vendor"],
  [/shop these rolls/i, "shop these rolls"],
  [/from the vendor/i, "from the vendor"],
  [/pick up a better/i, "pick up a better"],
];

const failures: string[] = [];
const specs = [...buildSpecs, ...extraSpecs];

function scan(label: string, text: string) {
  for (const [pattern, name] of banned) {
    if (pattern.test(text)) failures.push(`${label} still says “${name}”`);
  }
}

for (const spec of specs) {
  const guide = composeGuide(spec);
  scan(spec.id, JSON.stringify(guide));
  const opening = guide.timeline.find((step) => step.level === 1)?.checks[0];
  if (!opening) {
    failures.push(`${spec.id} has no level 1 check`);
    continue;
  }
  if (!/Renly|Una/.test(opening.text)) failures.push(`${spec.id} level 1 does not name Renly or Una`);
  if (!/Acceptable/.test(opening.text)) failures.push(`${spec.id} level 1 does not list an acceptable roll`);
  if (!/Orb of Transmutation/.test(opening.text)) failures.push(`${spec.id} level 1 does not say what to do when the shop is empty`);
  if (!opening.stats || opening.stats.length < 3) failures.push(`${spec.id} level 1 weapon check has no stat list`);
}

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith(".ts")) scan(path, readFileSync(path, "utf8"));
  }
}

walk(new URL("../src/content", import.meta.url).pathname);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`specific shopping text passed for ${specs.length} guides`);
