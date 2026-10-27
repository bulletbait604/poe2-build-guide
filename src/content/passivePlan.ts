import type { BuildSpec } from "@/content/buildSpecs";
import { getRoute, type TreeNode } from "@/content/treeRoute";

export type PointPlan = {
  intro: string;
  points: string[];
  quests: string[];
};

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

export function routeKeyFor(spec: BuildSpec) {
  const style = styleOf(spec);
  if (spec.classId === "ranger" || spec.classId === "huntress") return "ranger";
  if (spec.classId === "mercenary") return "mercenary";
  if (spec.classId === "warrior") return "warrior";
  if (spec.classId === "monk") return "monk";
  if (spec.classId === "druid") return style === "attack" ? "druidAttack" : "druidSpell";
  if (style === "minion") return "witchMinion";
  if (style === "attack") return "witchAttack";
  return "witchSpell";
}

function describe(node: TreeNode) {
  return node.stat ? `${node.name}. ${node.stat}` : node.name;
}

function spendsFor(spec: BuildSpec) {
  const route = getRoute(routeKeyFor(spec));
  const out = route.nodes.map(describe);
  const last = route.nodes[route.nodes.length - 1]?.name ?? "the last node";
  const follow = [
    `Take the next node connected to ${last} when it gives damage, life, energy shield, armour, or evasion.`,
    `If the only node touching ${last} is an attribute, take it and keep walking this branch. Do not cross to another class start.`,
    `Take the next notable on this branch when it matches ${spec.damage}.`,
    `Quest weapon-set points go on weapon set 1, on this same branch.`,
  ];
  let extra = 0;
  while (out.length < 64) {
    out.push(follow[extra % follow.length]);
    extra += 1;
  }
  return out;
}

function questsFor(from: number, to: number, spec: BuildSpec) {
  if (to === 14) {
    return [
      "The Crowbell in the Hunting Grounds is 2 weapon-set points. Returning Una's lute in Ogham is 2 more. Spend all four on the same branch as the points above, on weapon set 1.",
    ];
  }
  if (to === 19) {
    return [
      `The Trial of the Sekhemas gives 2 ascendancy points. Those are not tree points. ${spec.ascendancyPick}`,
    ];
  }
  if (to === 29) {
    return [
      "Kabala, the Constrictor Queen, in Keth is 2 weapon-set points. The Final Letter to Shambrin in Deshar is 2 more. Same branch, weapon set 1.",
    ];
  }
  if (to === 39) {
    return [
      "Mighty Silverfist is 2 weapon-set points. Sacrificing the Sacrificial Heart in Aggorat is 2 more. Same branch.",
    ];
  }
  if (to === 49) {
    return [
      "Omniphobia, Fear Manifest, after Dark Mists at Journey's End, is 2 weapon-set points. Yama the White, then Hinekora, is 2 more. The shark fin on Whakapanu is a defence lesson, not a point. The Halls of the Dead choices are attributes or resistances, and they cannot be changed.",
    ];
  }
  if (to === 59) {
    return [
      "Do the Stolen Barya first: Akthi and Anundr, then Risu, are 2 weapon-set points. The Molten Shrine is 5% maximum life. The Qimah pillar is a swappable bonus, and the experience pillar is the one to leave. Then Lythara in Kriar Village for 40 spirit, and the Yeti for 2 points. Holten last: Oswin is 2 points. The Hooded One in Kingsmarch, after all three, is the last 2.",
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
      intro: "Stay on the same branch.",
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
  const intro = "Next points, in order.";

  return {
    intro,
    points: spends.slice(start, start + count),
    quests: questsFor(from, to, spec),
  };
}
