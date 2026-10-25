import type { BuildSpec } from "@/content/buildSpecs";

export type PointPlan = {
  intro: string;
  points: string[];
  quests: string[];
};

const MORE = "The next small node on the branch you already started. Do not open a second path.";

function styleOf(spec: BuildSpec): "minion" | "spell" | "attack" {
  const text = `${spec.skill} ${spec.helper} ${spec.damage} ${spec.summary}`.toLowerCase();
  if (text.includes("minion") || text.includes("skeletal")) return "minion";
  if (spec.weaponNoun === "wand" || spec.weaponNoun === "sceptre") return "spell";
  if (spec.weaponNoun === "staff" && /spell|chaos|fire|lightning|cold/.test(spec.damage) && !/attack/.test(spec.speed)) {
    return "spell";
  }
  if (/cast speed/.test(spec.speed)) return "spell";
  return "attack";
}

function line(nodes: string[]) {
  const out: string[] = [];
  for (const node of nodes) out.push(node);
  while (out.length < 64) out.push(MORE);
  return out;
}

const ranger = line([
  "The small Evasion node touching the Ranger start.",
  "The next small Evasion node on that same line.",
  "The small Projectile Damage node on the other branch touching the start.",
  "The next small Projectile Damage node on that line.",
  "The small node directly in front of Blur.",
  "Blur.",
  "The small node in front of Catlike Agility.",
  "Catlike Agility.",
  "The small node in front of Escape Velocity.",
  "Escape Velocity.",
  "The small node in front of Freedom of Movement.",
  "Freedom of Movement.",
  "The small node in front of Blinding Strike.",
  "Blinding Strike.",
  "The small node in front of Concussive Attack.",
  "Concussive Attack.",
  "A small node on the path to Chakra of Life. It is the life notable beside the Ranger start.",
  "Chakra of Life.",
  "The small node in front of Honed Instincts.",
  "Honed Instincts.",
  "The small node in front of Agile Succession.",
  "Agile Succession.",
  "A small Projectile Damage node still touching this cluster.",
  "Another small Evasion node touching this cluster.",
  "Critical Exploit, only if it is the next connected node. Otherwise another small Projectile Damage node.",
]);

const mercenary = line([
  "The small Projectile Damage node touching the Mercenary start.",
  "The next small Projectile Damage node on that line.",
  "The small Armour and Evasion node on the other branch touching the start.",
  "The next small node on that Armour and Evasion branch.",
  "The small node in front of Goring. Goring is the life notable beside this start.",
  "Goring.",
  "The small node in front of Polished Iron.",
  "Polished Iron.",
  "The small node in front of Relentless.",
  "Relentless.",
  "The small node in front of Blur.",
  "Blur.",
  "The small node in front of Catlike Agility.",
  "Catlike Agility.",
  "The small node in front of Crushing Verdict.",
  "Crushing Verdict.",
  "The small node in front of Mass Hysteria.",
  "Mass Hysteria.",
  "The small node in front of Blurred Motion.",
  "Blurred Motion.",
  "A small Projectile Damage node still in this cluster.",
  "A small Armour node touching what you already took.",
  "Vulgar Methods, only if it is the next connected node.",
]);

const warrior = line([
  "The small Melee Damage node touching the Warrior start.",
  "The next small Melee Damage node on that same line.",
  "The small Armour node on the other branch touching the start.",
  "The next small Armour node beside it.",
  "The small node in front of the first Melee Damage notable on that line.",
  "That Melee Damage notable.",
  "A small node on the path to Goring. Goring is the life notable beside the Warrior start.",
  "The next small node toward Goring. Stay in this area.",
  "Goring.",
  "The small node in front of Polished Iron.",
  "Polished Iron.",
  "The small node between Polished Iron and Relentless.",
  "Relentless.",
  "The small node in front of Sturdy Metal.",
  "Sturdy Metal.",
  "A small life node beside the armour you just took.",
  "The small node in front of Relentless Vindicator.",
  "Relentless Vindicator.",
  "The small node in front of Resilient Soul.",
  "Resilient Soul.",
  "The small node in front of Crushing Verdict.",
  "Crushing Verdict.",
  "The small node in front of Nimble Strength.",
  "Nimble Strength.",
  "The small node in front of Barbaric Strength.",
  "Barbaric Strength.",
  "A small Melee Damage node still in this cluster.",
  "Limitless Pursuit, once it is connected. It is movement speed.",
]);

const monk = line([
  "The small Evasion and Energy Shield node touching the Monk start.",
  "The next small node on that line.",
  "The small Skill Speed node on the other branch touching the start.",
  "The next small Skill Speed node.",
  "The small node in front of Step Like Mist.",
  "Step Like Mist.",
  "The small node in front of Mindful Awareness.",
  "Mindful Awareness.",
  "The small node in front of Flow Like Water.",
  "Flow Like Water.",
  "The small node in front of Pure Energy.",
  "Pure Energy.",
  "The small node in front of Dampening Shield.",
  "Dampening Shield.",
  "The small node in front of Concussive Attack.",
  "Concussive Attack.",
  "The small node in front of Blinding Strike.",
  "Blinding Strike.",
  "The small node in front of Honed Instincts.",
  "Honed Instincts.",
  "The small node in front of Agile Succession.",
  "Agile Succession.",
  "A small node toward Chakra of Life, if it touches this cluster.",
  "Chakra of Life, once it is connected.",
  "Careful Assassin, only if it is the next node.",
  "Throatseeker, only if it is the next node.",
]);

const witchSpell = line([
  "The small Spell Damage node touching the Witch start. Sorceress uses this same start.",
  "The next small Spell Damage node on that line.",
  "The small Energy Shield node on the other branch touching the start.",
  "The next small Energy Shield node.",
  "The small node in front of Raw Power.",
  "Raw Power.",
  "The small node in front of Potent Incantation.",
  "Potent Incantation.",
  "The small node in front of Pure Energy.",
  "Pure Energy.",
  "The small node in front of Dampening Shield.",
  "Dampening Shield.",
  "The small node in front of Melding.",
  "Melding.",
  "The small node in front of Insightfulness.",
  "Insightfulness.",
  "The small node in front of Spiral into Mania.",
  "Spiral into Mania.",
  "The small node in front of Practiced Signs.",
  "Practiced Signs.",
  "Another small Spell Damage node in this cluster.",
  "Another small Energy Shield node in this cluster.",
  "There is no life notable beside this start. Take a small Energy Shield node instead of walking across the tree for life.",
]);

const witchMinion = line([
  "The small Minion Damage node closest to the Witch start.",
  "The next small Minion Damage node on that line.",
  "The small Energy Shield node on the branch touching the start.",
  "The next small Energy Shield node.",
  "The small node in front of Comradery.",
  "Comradery.",
  "The small node in front of Deadly Swarm.",
  "Deadly Swarm.",
  "The small node in front of Pure Energy.",
  "Pure Energy.",
  "The small node in front of Dampening Shield.",
  "Dampening Shield.",
  "Another small Minion Damage node beside Comradery.",
  "Another small Energy Shield node in this cluster.",
  "Melding, if it is the next connected node.",
  "Insightfulness, if it is the next connected node.",
]);

const witchAttack = line([
  "The small Attack Damage node closest to the Witch start.",
  "The next small Attack Damage node on that line.",
  "A small Energy Shield node touching the start, so you are not only damage.",
  "The next small node on that defence line.",
  "The small node in front of Concussive Attack.",
  "Concussive Attack.",
  "The small node in front of Blinding Strike, if it connects from here.",
  "Blinding Strike if it connected. Otherwise another small Attack Damage node.",
  "The small node in front of Flow Like Water.",
  "Flow Like Water.",
  "Another small Attack Damage node in this cluster.",
  "Do not cross the tree for a life notable. On Witch, life is on your gear.",
]);

const druidSpell = line([
  "The small Spell Damage node touching the Druid start.",
  "The next small Spell Damage node on that line.",
  "The small Armour and Energy Shield node on the other branch touching the start.",
  "The next small node on that defence branch.",
  "The small node in front of Lasting Incantations.",
  "Lasting Incantations.",
  "The small node in front of Relentless Vindicator.",
  "Relentless Vindicator.",
  "The small node in front of Heavy Buffer.",
  "Heavy Buffer.",
  "The small node in front of Spiral into Mania.",
  "Spiral into Mania.",
  "The small node in front of Hastening Barrier.",
  "Hastening Barrier.",
  "A small node on the path to Behemoth. Behemoth is the life notable near the Druid.",
  "Behemoth.",
  "The small node in front of Full Recovery.",
  "Full Recovery.",
  "The small node in front of Devoted Protector.",
  "Devoted Protector.",
  "The small node in front of Resilient Soul.",
  "Resilient Soul.",
]);

const druidAttack = line([
  "The small Attack Damage node touching the Druid start.",
  "The next small Attack Damage node on that line.",
  "The small Armour node on the other branch touching the start.",
  "The next small Armour node beside it.",
  "The small node in front of Crushing Verdict.",
  "Crushing Verdict.",
  "A small node on the path to Behemoth.",
  "Behemoth. It is the life notable near the Druid.",
  "The small node in front of Devoted Protector.",
  "Devoted Protector.",
  "The small node in front of Resilient Soul.",
  "Resilient Soul.",
  "The small node in front of Barbaric Strength.",
  "Barbaric Strength.",
  "The small node in front of Blurred Motion.",
  "Blurred Motion.",
  "Another small Attack Damage node in this cluster.",
  "Another small Armour node in this cluster.",
]);

function spendsFor(spec: BuildSpec) {
  const style = styleOf(spec);
  if (spec.classId === "ranger" || spec.classId === "huntress") return ranger;
  if (spec.classId === "mercenary") return mercenary;
  if (spec.classId === "warrior") return warrior;
  if (spec.classId === "monk") return monk;
  if (spec.classId === "druid") return style === "attack" ? druidAttack : druidSpell;
  if (style === "minion") return witchMinion;
  if (style === "attack") return witchAttack;
  return witchSpell;
}

function questsFor(from: number, to: number, spec: BuildSpec) {
  if (to === 14) {
    return [
      "The Crowbell in the Hunting Grounds is 2 weapon-set points. Returning Una's lute in Ogham is 2 more. Spend all four on the same branch as the points above, on weapon set 1.",
    ];
  }
  if (to === 19) {
    return [
      `The first trial gives 2 ascendancy points. Those are not tree points. ${spec.ascendancyPick}`,
    ];
  }
  if (to === 29) {
    return [
      "Kabala in Keth is 2 weapon-set points. The Final Letter to Shambrin in Deshar is 2 more. Same branch, weapon set 1.",
    ];
  }
  if (to === 39) {
    return [
      "Mighty Silverfist is 2 weapon-set points. Sacrificing the Sacrificial Heart is 2 more. Same branch.",
    ];
  }
  if (to === 49) {
    return [
      "Dark Mists at Journey's End is 2 weapon-set points. Yama the White, in the Trial of the Ancestors, is 2 more.",
    ];
  }
  if (to === 59) {
    return [
      "Oswin, Akthi and Anundr, the Abominable Yeti, and finishing the interludes are 2 weapon-set points each. Damage for this skill, on the branch you already have.",
    ];
  }
  if (from === 60) {
    return [
      "Later trials give 2 ascendancy points each, up to 8 total. Spend them on the same ascendancy choice.",
    ];
  }
  return [];
}

export function pointsForBand(spec: BuildSpec, from: number, to: number): PointPlan {
  if (from >= 66) {
    return {
      intro: `By level 65 you have already placed 64 level points. From 66 to 100 you get one more each level.`,
      points: [
        "Each new point is the next small node on the branch you already started.",
        "Take a notable only when it is the very next node and it gives damage, life, energy shield, armour, or evasion for this build.",
        "Do not refund the campaign path to chase a node on the far side of the tree.",
      ],
      quests: [],
    };
  }

  const spends = spendsFor(spec);
  const firstLevel = Math.max(from, 2);
  const lastLevel = Math.min(to, 65);
  const start = firstLevel - 2;
  const count = lastLevel - firstLevel + 1;
  const intro =
    count === 1
      ? `Level ${firstLevel} gives 1 point. You then have ${firstLevel - 1} level points.`
      : `Levels ${firstLevel}–${lastLevel} give ${count} points, one each level. At level ${lastLevel} you have ${lastLevel - 1} level points.`;

  return {
    intro,
    points: spends.slice(start, start + count),
    quests: questsFor(from, to, spec),
  };
}
