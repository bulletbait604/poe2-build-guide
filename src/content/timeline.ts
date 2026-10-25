import type { BuildSpec } from "@/content/buildSpecs";
import { armorForBand } from "@/content/armorPlan";
import { mainSkillReadyAt, requiredLevel } from "@/content/gemFacts";
import { pointsForBand } from "@/content/passivePlan";
import type { Loadout, TimelineStep } from "@/lib/types";

const STOPS = [1, 4, 8, 12, 16, 22, 28, 33, 38, 44, 52, 58, 66, 78];
const SUPPORT_STOPS = [12, 22, 28, 38, 44, 52];

function sentence(text: string) {
  const cut = text.split(/(?<=\.)\s/)[0]?.trim() ?? text.trim();
  return cut.length > 200 ? `${cut.slice(0, 197)}…` : cut;
}

function titleFor(level: number) {
  if (level <= 14) return `Level ${level} · Act 1`;
  if (level <= 29) return `Level ${level} · Act 2`;
  if (level <= 42) return `Level ${level} · Act 3`;
  if (level <= 52) return `Level ${level} · Act 4`;
  if (level <= 60) return `Level ${level} · Interludes`;
  return `Level ${level} · Maps`;
}

function mainSupports(spec: BuildSpec, loadout: Loadout) {
  const skill = loadout.groups.flatMap((group) => group.skills).find((row) => row.name === spec.skill);
  return skill?.supports ?? [];
}

function gearLine(spec: BuildSpec, level: number) {
  const lines = armorForBand(spec, level);
  const boots = lines.find((line) => line.slot === "Boots");
  const jewelry = lines.find((line) => line.slot === "Jewelry");
  if (level < 12 && boots) return sentence(boots.lookFor);
  if (jewelry) return sentence(jewelry.lookFor);
  return boots ? sentence(boots.lookFor) : "Replace a piece that has no life.";
}

function passiveLine(spec: BuildSpec, level: number) {
  const plan = pointsForBand(spec, Math.max(1, level - 3), level);
  const point = plan.points[0];
  return point
    ? `Next passive on the class path: ${sentence(point)}`
    : "Spend the new point on the highlighted path. Do not path across the tree.";
}

function snap(level: number) {
  return STOPS.find((stop) => stop >= level) ?? level;
}

function checksFor(level: number, spec: BuildSpec, loadout: Loadout, readyAt: number) {
  const node = loadout.ascendancy[0] ?? spec.ascendancyPick;
  const second = loadout.ascendancy[1];
  const checks: string[] = [];
  const skillLevel = requiredLevel(spec.skill);
  const helperLevel = requiredLevel(spec.helper);

  if (level === 1) {
    checks.push(`Buy the ${spec.weaponNoun} with the highest damage number from the first vendor.`);
    if (readyAt <= 1) {
      checks.push(`Socket ${spec.skill}. That is the main button.`);
    } else {
      const early = sentence(loadout.leveling[0]?.text ?? "Use the weapon's basic attack and any gem the vendor offers at level 1.");
      const requiredNote = skillLevel === readyAt ? "" : ` The gem's required level is ${skillLevel}.`;
      checks.push(`Do not socket ${spec.skill} yet. It joins this route at level ${readyAt}.${requiredNote} Until then: ${early}`);
    }
    checks.push("If the vendor sells boots with movement speed, buy them.");
  } else if (level === 4) {
    if (helperLevel <= 4) {
      checks.push(`Add ${spec.helper} when you get a second skill gem. It is the second button, not a replacement.`);
    } else {
      checks.push(`Wait on ${spec.helper}. Its required level is ${helperLevel}.`);
    }
    checks.push("Life on the body armour. An empty chest is the first thing to fix.");
    checks.push(gearLine(spec, level));
  } else if (level === 8) {
    checks.push(
      "Kill the Crowbell in the Hunting Grounds. The reward is +2 weapon-set passive points. Those points only apply while that weapon set is active. They are not the point you get for leveling up.",
    );
    checks.push(
      "If Freythorn is open, finish the rituals and kill the King in the Mists. The reward is +30 spirit. Spirit pays for auras and minions. It is not mana.",
    );
    checks.push(passiveLine(spec, level));
  } else if (level === 12) {
    checks.push("Return Una's lute for +2 weapon-set points, then kill Count Geonor and sail.");
    checks.push(gearLine(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 16) {
    checks.push("Kill Balbala, the Traitor, and take the Djinn Barya. That coin opens the Trial of the Sekhemas. It is not a gem.");
    checks.push(
      `Clear the Trial of the Sekhemas once. That is your first 2 ascendancy points. Ascendancy points are not passive-tree points. On the ascendancy panel, take ${sentence(node)}`,
    );
    checks.push(gearLine(spec, level));
  } else if (level === 22) {
    checks.push("Kill Kabala, the Constrictor Queen, for +2 weapon-set points. Bring the relic to the Valley of the Titans.");
    checks.push(passiveLine(spec, level));
    checks.push(gearLine(spec, level));
  } else if (level === 28) {
    checks.push("Finish Act 2. Check the weapon before the Act 3 zones. A weapon about five levels old is the problem if packs feel slow.");
    checks.push(gearLine(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 33) {
    checks.push("The Trial of Chaos is in the Chimeral Wetlands. Run it once for the next 2 ascendancy points.");
    checks.push(second ? `On the ascendancy panel, take ${sentence(second)}` : "Use the new ascendancy node for a whole zone before you take another.");
    checks.push("Kill Blackjaw for +10% fire resistance. Kill Mighty Silverfist if you have not, for +2 weapon-set points.");
  } else if (level === 38) {
    checks.push("Kill Ignagduk, the Bog Witch, and turn the quest in. That is +30 spirit.");
    checks.push(gearLine(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 44) {
    checks.push("In the Halls of the Dead, take the resistance you are lowest on. Then speak to Hinekora for +2 weapon-set points.");
    checks.push(gearLine(spec, level));
    checks.push("Movement speed stays on the boots. Do not trade it for a small life roll.");
  } else if (level === 52) {
    checks.push("Do the Stolen Barya interlude first. Resistances drop when you enter. Recap the lowest one before you zone in.");
    checks.push("Kill Akthi and Anundr, then speak to Risu, for +2 weapon-set points. The Molten Shrine is +5% maximum life.");
    checks.push(gearLine(spec, level));
  } else if (level === 58) {
    checks.push("Doryani's Contingency: kill Lythara for +40 spirit. With the earlier rewards, that is 100 spirit from the campaign.");
    checks.push("Holten is last. Then speak to the Hooded One in Kingsmarch for the last +2 weapon-set points. You should have 24.");
    checks.push(gearLine(spec, level));
  } else if (level === 66) {
    checks.push("White maps. Fire, cold, and lightning resistance should each read 75% before you push tier.");
    checks.push("Chaos resistance of 30–50% is enough. Do not chase 75% chaos.");
    checks.push(passiveLine(spec, level));
  } else if (level === 78) {
    checks.push("A rare with life and the right defence still beats a unique that has neither.");
    checks.push(gearLine(spec, level));
    checks.push("Add one support at a time. A new skill name is a different build.");
  }

  return checks;
}

function supportReadyAt(index: number, name: string, skillReadyAt: number) {
  const drip = SUPPORT_STOPS[index] ?? 58;
  return snap(Math.max(drip, requiredLevel(name), skillReadyAt));
}

function levelFromRow(row: Loadout["leveling"][number]) {
  const inText = row.text.match(/\blevel (\d+)\b/i);
  if (inText) return Number(inText[1]);
  const single = row.levels.match(/^(\d+)\+?$/);
  if (single) return Number(single[1]);
  return null;
}

function extras(loadout: Loadout): TimelineStep[] {
  const steps: TimelineStep[] = [];
  for (const row of loadout.leveling) {
    const level = levelFromRow(row);
    if (level === null || level < 2 || level > 95 || STOPS.includes(level)) continue;
    steps.push({
      level,
      title: titleFor(level),
      checks: [sentence(row.text)],
    });
  }
  return steps;
}

export function timelineFor(spec: BuildSpec, loadout: Loadout): TimelineStep[] {
  const supports = mainSupports(spec, loadout);
  const readyAt = mainSkillReadyAt(spec.skill, loadout.overview, loadout.leveling);
  const base = STOPS.map((level) => ({
    level,
    title: titleFor(level),
    checks: checksFor(level, spec, loadout, readyAt),
  }));
  const merged = new Map<number, TimelineStep>();
  for (const step of [...base, ...extras(loadout)]) {
    const existing = merged.get(step.level);
    if (!existing) {
      merged.set(step.level, step);
      continue;
    }
    const checks = [...existing.checks];
    for (const line of step.checks) {
      if (!checks.includes(line) && checks.length < 5) checks.push(line);
    }
    existing.checks = checks;
  }
  if (readyAt > 1) {
    const line = `Socket ${spec.skill} now. It is the main button from here.`;
    const step = merged.get(readyAt);
    if (!step) {
      merged.set(readyAt, { level: readyAt, title: titleFor(readyAt), checks: [line] });
    } else if (!step.checks.some((check) => check.startsWith(`Socket ${spec.skill}`))) {
      step.checks.unshift(line);
    }
  }
  for (const [index, support] of supports.entries()) {
    const level = supportReadyAt(index, support, readyAt);
    const step = merged.get(level);
    const line = `Link ${support} into ${spec.skill}. This is support ${index + 1}. Its required level is ${requiredLevel(support)}.`;
    if (!step) {
      merged.set(level, { level, title: titleFor(level), checks: [line] });
      continue;
    }
    if (!step.checks.some((check) => check.startsWith(`Link ${support} into`)) && step.checks.length < 5) {
      step.checks.push(line);
    }
  }
  return [...merged.values()].sort((a, b) => a.level - b.level);
}
