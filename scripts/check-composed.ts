import { mkdirSync, writeFileSync } from "node:fs";
import { buildSpecs } from "../src/content/buildSpecs";
import { extraSpecs } from "../src/content/extraSpecs";
import { composeGuide } from "../src/content/composeGuide";
import { gemFact } from "../src/content/gemFacts";
import supports from "../src/content/gemSupports.json";

const allowed = supports as Record<string, string[]>;
const specs = [...buildSpecs, ...extraSpecs];
const failures: string[] = [];
const weaponSlots = ["Weapon", "Bow", "Spear", "Crossbow", "Staff", "Wand", "Quarterstaff", "Mace", "Sceptre"];

for (const spec of specs) {
  const guide = composeGuide(spec);
  if (!guide.loadout.groups.length) failures.push(`${spec.id} skills tab has no gem groups`);
  if (!guide.loadout.rotation.length) failures.push(`${spec.id} play tab has no rotation`);
  if (!guide.loadout.ascendancy.length) failures.push(`${spec.id} play tab has no ascendancy`);
  if (!guide.loadout.numbers.length) failures.push(`${spec.id} gear tab has no numbers`);
  if (!guide.timeline.length || guide.timeline.some((step) => step.checks.length === 0)) {
    failures.push(`${spec.id} leveling timeline has an empty card`);
  }
  const slots = guide.loadout.gear.map((row) => row.slot);
  if (slots.length < 6) failures.push(`${spec.id} gear tab is missing slots (${slots.join(", ")})`);
  if (!slots.includes("Boots")) failures.push(`${spec.id} gear tab is missing boots`);
  if (!slots.some((slot) => weaponSlots.some((name) => slot.toLowerCase().includes(name.toLowerCase())))) {
    failures.push(`${spec.id} gear tab is missing a weapon slot`);
  }
  for (const row of guide.loadout.gear) {
    for (const stage of [row.early, row.late, row.maps]) {
      if (!stage.trim()) failures.push(`${spec.id} ${row.slot} has an empty gear stage`);
    }
  }

  const ready = guide.timeline.find((step) => step.checks.some((check) => check.startsWith(`Socket ${spec.skill} now`)));
  const levelOne = guide.timeline.find((step) => step.level === 1);
  const opening = levelOne?.checks.join(" ") ?? "";
  if (ready && ready.level > 1 && !opening.includes(`Do not socket ${spec.skill} yet`)) {
    failures.push(`${spec.id} level 1 still tells you to socket ${spec.skill}`);
  }
  if (!ready && !opening.includes(`Socket ${spec.skill}.`)) {
    failures.push(`${spec.id} level 1 does not name ${spec.skill}`);
  }

  for (const group of guide.loadout.groups) {
    if (!group.skills.length) failures.push(`${spec.id} group ${group.label} is empty`);
    if (!group.detail.trim()) failures.push(`${spec.id} group ${group.label} has no explanation`);
    const seen = new Set<string>();
    for (const skill of group.skills) {
      if (seen.has(skill.name)) failures.push(`${spec.id} lists ${skill.name} twice in ${group.label}`);
      seen.add(skill.name);
      const fact = gemFact(skill.name);
      if (!fact) failures.push(`${spec.id} uses unknown gem ${skill.name}`);
      else if ((fact.kind === "support" || fact.kind === "lineage") && skill.supports.length) {
        failures.push(`${spec.id} links supports into ${skill.name}, which is a ${fact.kind}`);
      }
      if (fact && (fact.kind === "skill" || fact.kind === "spirit") && skill.supports.length) {
        const legal = new Set(allowed[skill.name] ?? []);
        if (!legal.size) failures.push(`${spec.id} has no support list for ${skill.name}`);
        for (const support of skill.supports) {
          if (!gemFact(support)) failures.push(`${spec.id} uses unknown support ${support} on ${skill.name}`);
          else if (!legal.has(support)) failures.push(`${spec.id} links ${support} into ${skill.name}, and the gem page does not allow it`);
        }
      }
    }
  }
}

const ice = composeGuide(specs.find((spec) => spec.id === "deadeye-ice-shot")!);
if (!ice.timeline.some((step) => step.level === 31 && step.checks.some((check) => check.includes("Ice Shot")))) {
  failures.push("Ice Shot does not join at level 31");
}
const fire = composeGuide(specs.find((spec) => spec.id === "tactician-supporting-fire")!);
if (!fire.timeline.some((step) => step.level === 36)) failures.push("Supporting Fire respec is not at level 36");
const volley = composeGuide(specs.find((spec) => spec.id === "deadeye-spiral-volley")!);
if (!volley.timeline.some((step) => step.level === 54)) failures.push("Spiral Volley swap is not at level 54");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`composed guide checks passed (${specs.length} builds)`);

const audit = `# Guide audit

Patch 0.5.5 gem names, required levels, and support compatibility were checked against the poe2db skill, support, spirit, and lineage lists, plus each skill's Supported By table.

| Build | Tab | Item | Issue | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| All 118 | Now, Leveling | Level 1 says to socket the endgame skill | wrong | The checklist ignored gem required levels and each route's own leveling notes. Ice Shot is required level 9 and this route waits until 31. [Skill Gems](https://poe2db.tw/us/Skill_Gems) | Level 1 names the early buttons. The main skill is added on the level the route actually swaps. |
| All 118 | Now | Weapon-set points, spirit, Djinn Barya, ascendancy points | confusing | The cards used the terms with no definition. [Permanent stats](https://maxroll.gg/poe2/getting-started/permanent-stats-from-campaign) | First use explains each one, and the Now tab keeps a one-line glossary. |
| All 118 | Tree | Passive list read like the build's planner tree | confusing | Routes are a connected walk from the class start on the official export, with filler lines after the notables run out. [Official tree export](https://github.com/grindinggear/poe2-skilltree-export) | The tab says it is the campaign path, not a copied planner. Filler lines say "the next connected node". |
| All 118 | Gear | Slot cards stopped at the first sentence | missing | Targets such as the 75% cap often sat in the second sentence. | The card shows the full Acts 1–2, Acts 3–4, and Maps text. |
| All 118 | Leveling | Quest list repeated the cards | confusing | The same fights appeared as a second plan. | The list is labeled as the same rewards, written as the walk. |
| All 118 | Skills | "Use this button by itself" | confusing | Empty rows hid whether the gem was a skill, a support, or a missing link. | A skill with no supports says to add one only when the gem allows it. A support says it is not a button. |
| Many | Skills | Martial Tempo, Arcane Tempo, Concentrated Effect, Chain, Clarity, Vitality, Precision | wrong | Those names are not in the 0.5.5 gem list. The live names are Rapid Attacks, Rapid Casting, Concentrated Area, Chain I, Clarity I, Vitality I, and Precision I. [Support Gems](https://poe2db.tw/us/Support_Gems) | Renamed, and the reservation gems are linked into a host that accepts them. |
| Many | Skills | Flames of Chayula, Ice Storm, Storm Blast Bolts, Poisonburst, Kelari, Ruzhan | wrong | The gem list uses Hand of Chayula, Icestorm, Stormblast Bolts, Poisonburst Arrow, Kelari, the Tainted Sands, and Ruzhan, the Blazing Sword. | Specs and sockets use the current names. |
| oracle-tornado | Skills | Shield Throw | wrong | No Shield Throw page exists on poe2db. Raise Shield does. | The second button is Raise Shield, and the text says Shield Throw is not in this patch. |
| oracle-entangle | Skills | Blood Transfusion | wrong | The poe2db page is a passive notable (anoint), not a gem. [Blood Transfusion](https://poe2db.tw/us/Blood_Transfusion) | Removed from the sockets. The note says to anoint it. |
| warbringer-shield-wall | Skills | Warcaller's Bellow | wrong | It is a Warbringer ascendancy notable, not a gem. [Warcaller's Bellow](https://poe2db.tw/us/Warcallers_Bellow) | Removed from the sockets and listed on the ascendancy panel. |
| deadeye-lightning-arrow | Skills | One support row on Lightning Arrow, Barrage, Mirage Deadeye, and Tornado Shot | wrong | Barrage accepts only Deliberation from that row. Mirage Deadeye accepts none of it. Tornado Shot does not accept Deliberation. Primal Armament is not legal on Lightning Arrow. [Lightning Arrow](https://poe2db.tw/us/Lightning_Arrow) | Each skill keeps only the supports its gem page lists. |
| deadeye-ice-shot | Skills | Blind II on Ice-Tipped Arrows | wrong | Blind is not in that gem's Supported By table. [Ice-Tipped Arrows](https://poe2db.tw/us/Ice-Tipped_Arrows) | Blind is not linked. |
| tactician-supporting-fire and permafrost | Skills | Concentrated Area, Multishot, Magnified Area on Fragmentation Rounds; Vorana's Siege on Supporting Fire; Tecrod's Revenge on the sniper | wrong | Those supports are absent from the 0.5.5 Supported By tables. | Removed. Close Combat II stays on Fragmentation Rounds. Fire Attunement stays on Supporting Fire. |
| witch minion routes | Skills | Elemental Army and Wildshards on Skeletal Sniper; Spell Echo, Long Fuse, and Upwelling on Volcano | wrong | The sniper page does not list those supports. The storm mage still accepts Elemental Army. | Sniper keeps Meat Shield and Pierce. Volcano keeps Rapid Casting and Overabundance. |
| oracle-grim-pillars | Skills | Branching Fissures, Burgeon, Living Lightning, and Spell Cascade | wrong | Grim Pillars and Volcano do not list them. [Grim Pillars](https://poe2db.tw/us/Grim_Pillars) | Kept Rapid Casting, Lightning Attunement, Magnified Area, and Concentrated Area. |
| frostbolt and spark cast-on-crit routes | Skills | Cast on Critical and Spell Cascade linked as supports | wrong | Cast on Critical is a meta gem (required level 14). Spell Cascade is not legal on Frostbolt. It is legal on Comet. [Cast on Critical](https://poe2db.tw/us/Cast_on_Critical) | Frostbolt and Comet, or Spark and Comet, are socketed into the meta gem. |
| martial-artist-hollow-form | Skills | Cooldown Recovery on Hollow Form | wrong | The Hollow Form gem does not list it. Hollow Focus does. | Removed from Hollow Form. The stat stays on gear. Cooldown Recovery stays on Hollow Focus. |
| martial-artist-oil-barrage | Skills | Blasphemy support row | wrong | Repulsion, Living Lightning, Culmination, and Ailith's Chimes are not legal on Blasphemy. | Blasphemy is the curse button, with no illegal supports. |
| tactician-ballista | Skills | Rapid Attacks II | wrong | Artillery Ballista does not accept it. Urgent Totems I does. | The support is Urgent Totems I. |
| gemling and spear routes | Skills | Fist of War on Whirling Slash, Rapid Attacks on Barrage, Magnified Area on Shield Wall and Voltaic Mark, Rapid Attacks on Shockwave Totem | wrong | Each gem's Supported By table omits that support. | Removed. The supports those gems do accept stay. |
`;

mkdirSync("/opt/cursor/artifacts", { recursive: true });
writeFileSync("/opt/cursor/artifacts/guide-audit.md", audit);
