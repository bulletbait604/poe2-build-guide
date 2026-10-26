// Fails when a composed guide still tells the player to shop in vague language.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { buildSpecs } from "../src/content/buildSpecs";
import { extraSpecs } from "../src/content/extraSpecs";
import { composeGuide } from "../src/content/composeGuide";
import { instructsUse, pressLine } from "../src/content/earlySkill";
import { mainSkillReadyAt } from "../src/content/gemFacts";
import { loadoutFor } from "../src/content/loadouts";
import { statsForLevel } from "../src/content/statLines";
import { weaponStats } from "../src/content/shopping";

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

function weaponFamily(noun: string) {
  const text = noun.toLowerCase();
  if (text.includes("crossbow")) return "crossbow";
  if (text.includes("quarter")) return "quarterstaff";
  if (text.includes("bow")) return "bow";
  if (text.includes("spear")) return "spear";
  if (text.includes("sceptre")) return "sceptre";
  if (text.includes("wand")) return "wand";
  if (text.includes("staff")) return "staff";
  if (text.includes("mace")) return "mace";
  return text;
}

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

  const loadout = loadoutFor(spec);
  const ready = mainSkillReadyAt(spec.skill, loadout.overview, loadout.leveling);
  for (let level = 1; level < ready; level += 1) {
    if (instructsUse(pressLine(spec, loadout, level), spec.skill)) {
      failures.push(`${spec.id} level ${level} tells you to use ${spec.skill}, which joins at level ${ready}`);
    }
  }
  for (const step of guide.timeline) {
    if (step.level >= ready) continue;
    for (const check of step.checks) {
      if (instructsUse(check.text, spec.skill)) {
        failures.push(`${spec.id} timeline ${step.level} uses ${spec.skill} before level ${ready}`);
      }
    }
  }
  for (const phase of guide.phases) {
    if (phase.levelMax >= ready) continue;
    for (const step of phase.steps) {
      const text = `${step.detail} ${step.reward}`;
      if (instructsUse(text, spec.skill)) failures.push(`${spec.id} ${phase.title} “${step.title}” uses ${spec.skill} before level ${ready}`);
    }
  }
  if (spec.skill === "Skeletal Sniper" && instructsUse(pressLine(spec, loadout, 1), spec.skill)) {
    failures.push(`${spec.id} Riverbank tells you to use Skeletal Sniper`);
  }

  const family = weaponFamily(spec.weaponNoun);
  const weaponCard = guide.gearCards.find((card) => /^(?:bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff)$/i.test(card.slot));
  if (family === "crossbow") {
    if (guide.gearCards.some((card) => card.slot === "Quiver" || card.slot === "Bow")) {
      failures.push(`${spec.id} is a crossbow guide with a bow or quiver card`);
    }
    if (!weaponCard || !/Crossbow/.test(weaponCard.base) || /Crude Bow|Heavy Bow|Shortbow/.test(weaponCard.base)) {
      failures.push(`${spec.id} crossbow card does not list a crossbow base`);
    }
  }
  if (family === "bow") {
    if (!weaponCard || !/Bow/.test(weaponCard.base) || /Crossbow|Hardwood Spear|Sceptre/.test(weaponCard.base)) {
      failures.push(`${spec.id} bow card does not list a bow base`);
    }
  }
  if (family === "spear") {
    if (!weaponCard || !/Spear/.test(weaponCard.base) || /Crude Bow|Heavy Bow|Sceptre|Crossbow/.test(weaponCard.base)) {
      failures.push(`${spec.id} spear card does not list a spear base`);
    }
  }
  if (family === "sceptre") {
    if (!weaponCard || !/Sceptre/.test(weaponCard.base) || /Spear|Hardwood/.test(weaponCard.base)) {
      failures.push(`${spec.id} sceptre card does not list a sceptre base`);
    }
  }
  if (weaponCard && /From item level (?:8|18)|Ideal at item level (?:75|82)/.test(weaponCard.how)) {
    failures.push(`${spec.id} level 1 weapon card lists a higher item-level roll`);
  }
  const route = [loadout.overview, ...loadout.ascendancy, ...loadout.leveling.map((row) => row.text)].join("\n");
  if (spec.ascendancyId !== "witchhunter" && /Sorcery Ward/.test(route)) failures.push(`${spec.id} names Sorcery Ward`);
  if (spec.ascendancyId !== "amazon" && /Amazon node|first Amazon/.test(route)) failures.push(`${spec.id} names an Amazon node`);
  if (spec.ascendancyId !== "deadeye" && /Point Blank|Gathering Winds/.test(route)) failures.push(`${spec.id} names a Deadeye node`);
  if (spec.id === "invoker-tempest-bell" && /Hollow Form/.test(route)) failures.push(`${spec.id} names Hollow Form`);
  if (spec.ascendancyId !== "warbringer" && /Warbringer only/.test(route)) failures.push(`${spec.id} has a Warbringer-only note`);

  const rendered = JSON.stringify(guide);
  const vowel = rendered.match(/\ba [AaEeIiOoUu][A-Za-z]+/g) ?? [];
  for (const hit of vowel) {
    if (/^a (?:and|extra|area|early|endgame|act|attack|armour|evasion|energy|elemental|ice|oil|orb|open|optional|uncut|azure|amber|ashen|iron|explosive|essence|una)\b/i.test(hit)) {
      failures.push(`${spec.id} uses “${hit}”`);
    }
  }
  const plural = rendered.match(/\ba (?:[A-Za-z]+ )?(?:Boots|Sandals|Greaves|Bracers|Gloves|Gauntlets|Mitts)\b/g) ?? [];
  for (const hit of plural) failures.push(`${spec.id} uses “${hit}”`);
}

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith(".ts")) scan(path, readFileSync(path, "utf8"));
  }
}

walk(new URL("../src/content", import.meta.url).pathname);

const level12 = statsForLevel({ defence: "evasion" }, 12);
if (!level12.includes("+11-15% Fire Resistance") || !level12.includes("+6-10% Cold Resistance") || !level12.includes("+6-10% Lightning Resistance")) {
  failures.push(`level 12 resistances are ${level12.join(", ")}`);
}
const level52 = statsForLevel({ defence: "armour" }, 52);
if (!level52.includes("+85-99 maximum Life") || !level52.includes("+21-24 Strength")) {
  failures.push(`level 52 band is ${level52.join(", ")}`);
}
const level78 = statsForLevel({ defence: "armour" }, 78);
if (level78.includes("+200-214 maximum Life") || !level78.includes("+100-119 maximum Life")) {
  failures.push(`shared level 78 life is ${level78.join(", ")}`);
}
const bow1 = weaponStats("bow", 1).join(" ");
const mace1 = weaponStats("mace", 1).join(" ");
if (!bow1.includes("Adds (1-2) to (4-5) Physical Damage") || bow1.includes("Adds (4-6) to (7-11)")) {
  failures.push(`level 1 bow rolls are ${bow1}`);
}
if (!mace1.includes("Adds (2-3) to (5-7) Physical Damage") || mace1.includes("Adds (5-8) to (10-15)")) {
  failures.push(`level 1 mace rolls are ${mace1}`);
}

const nodeFor: Record<string, string> = {
  "tactician-grenades": "Unleash Hell!",
  "gemling-grenades": "Advanced Thaumaturgy",
  "ritualist-rake": "Corrupted Lifeforce",
  "ritualist-blood-hunt": "Corrupted Lifeforce",
  "spirit-walker-lightning-spear": "Primal Bounty",
  "ritualist-lightning-spear": "Intricate Sigils",
  "amazon-glacial-lance": "Penetrate",
  "invoker-tempest-bell": "I am the Blizzard",
  "titan-shield-wall": "Crushing Impacts",
};
for (const spec of specs) {
  const expected = nodeFor[spec.id];
  if (!expected) continue;
  const loadout = loadoutFor(spec);
  const route = [spec.ascendancyPick, loadout.overview, ...loadout.ascendancy, ...loadout.leveling.map((row) => row.text)].join("\n");
  if (!route.includes(expected)) failures.push(`${spec.id} does not name ${expected}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`specific shopping text passed for ${specs.length} guides`);
