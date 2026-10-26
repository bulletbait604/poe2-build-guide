import { writeFileSync } from "node:fs";
import { guides } from "../src/content/guides/index";
import { gemFact } from "../src/content/gemFacts";

const images = new Set<string>();
const sources = new Map<string, string>();
const uniques = new Map<string, { name: string; slot: string; level: number; note: string; icon?: string }>();
const supports: { guide: string; skill: string; supports: string[] }[] = [];
const ascendancy: { guide: string; line: string }[] = [];
const prose: { guide: string; where: string; text: string }[] = [];
const gems = new Set<string>();
const statLines = new Set<string>();
const quests: { act: string; zone: string; quest: string; npc: string; reward: string; detail: string }[] = [];

function addImage(url: string | null | undefined) {
  if (url && url.startsWith("http")) images.add(url);
}

function walk(value: unknown, guide: string, where: string) {
  if (!value) return;
  if (typeof value === "string") {
    if (/https?:\/\//.test(value)) {
      for (const match of value.match(/https?:\/\/[^\s)"']+/g) ?? []) addImage(match);
    }
    if (/\d/.test(value) && value.length < 500) prose.push({ guide, where, text: value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, guide, `${where}[${index}]`));
    return;
  }
  if (typeof value === "object") {
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      walk(item, guide, `${where}.${key}`);
    }
  }
}

for (const guide of guides) {
  gems.add(guide.skill);
  gems.add(guide.helper);
  if (guide.support) gems.add(guide.support);
  for (const source of guide.links ?? []) sources.set(source.url, source.label);
  for (const unique of guide.uniques ?? []) {
    uniques.set(`${unique.name}|${unique.slot}|${unique.level}`, {
      name: unique.name,
      slot: unique.slot,
      level: unique.level,
      note: unique.note,
      icon: unique.icon ?? undefined,
    });
    addImage(unique.icon ?? undefined);
  }
  for (const group of guide.loadout.groups ?? []) {
    for (const skill of group.skills ?? []) {
      gems.add(skill.name);
      for (const support of skill.supports ?? []) gems.add(support);
      if (skill.supports?.length) supports.push({ guide: guide.id, skill: skill.name, supports: skill.supports });
    }
  }
  for (const line of guide.loadout.ascendancy ?? []) ascendancy.push({ guide: guide.id, line });
  for (const phase of guide.phases ?? []) {
    for (const step of phase.steps ?? []) {
      addImage(step.image);
      if (quests.length < 80) {
        quests.push({
          act: step.act,
          zone: step.zone,
          quest: step.quest,
          npc: step.npc,
          reward: step.reward,
          detail: step.detail,
        });
      }
    }
  }
  for (const card of guide.gearCards ?? []) {
    addImage(card.icon);
    for (const line of [...card.leveling, ...card.endgame]) statLines.add(line);
  }
  for (const total of guide.gearTotals ?? []) {
    if (total.leveling) statLines.add(total.leveling);
    if (total.endgame) statLines.add(total.endgame);
  }
  for (const step of guide.timeline ?? []) {
    for (const check of step.checks) {
      addImage(check.image);
      for (const line of check.stats ?? []) statLines.add(line);
    }
  }
  walk(guide.summary, guide.id, "summary");
  walk(guide.loadout, guide.id, "loadout");
  walk(guide.phases, guide.id, "phases");
  walk(guide.levelBands, guide.id, "bands");
}

const catalogMiss = [...gems].filter((name) => !gemFact(name)).sort();

const payload = {
  guideCount: guides.length,
  images: [...images].sort(),
  sources: [...sources.entries()].map(([url, label]) => ({ url, label })).sort((a, b) => a.url.localeCompare(b.url)),
  uniques: [...uniques.values()].sort((a, b) => a.name.localeCompare(b.name)),
  supports,
  ascendancy,
  gems: [...gems].sort(),
  catalogMiss,
  prose,
  statLines: [...statLines].sort(),
  quests,
};

writeFileSync("/tmp/audit/facts.json", JSON.stringify(payload, null, 2));
console.log(
  JSON.stringify(
    {
      guides: payload.guideCount,
      images: payload.images.length,
      sources: payload.sources.length,
      uniques: payload.uniques.length,
      supportRows: payload.supports.length,
      ascendancy: payload.ascendancy.length,
      gems: payload.gems.length,
      catalogMiss: payload.catalogMiss,
      prose: payload.prose.length,
      statLines: payload.statLines.length,
      quests: payload.quests.length,
    },
    null,
    2,
  ),
);
