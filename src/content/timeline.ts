import type { BuildSpec } from "@/content/buildSpecs";
import { armourAt, armourText, baseAt, isCaster, shops, weaponStats, weaponText } from "@/content/shopping";
import { statsForLevel } from "@/content/statLines";
import { stepImage } from "@/content/zoneArt";
import { skillAt } from "@/content/earlySkill";
import { mainSkillReadyAt, requiredLevel } from "@/content/gemFacts";
import { pointsForBand } from "@/content/passivePlan";
import type { Loadout, StepCheck, TimelineStep } from "@/lib/types";

const STOPS = [1, 4, 8, 12, 16, 22, 28, 33, 38, 44, 52, 58, 66, 78];
const SUPPORT_STOPS = [12, 22, 28, 38, 44, 52];

function sentence(text: string) {
  const cut = text.split(/(?<=\.)\s/)[0]?.trim() ?? text.trim();
  const words = cut.split(/\s+/);
  return words.length <= 22 ? cut : `${words.slice(0, 22).join(" ")}.`;
}

function actFor(level: number) {
  if (level <= 14) return "Act 1";
  if (level <= 29) return "Act 2";
  if (level <= 42) return "Act 3";
  if (level <= 52) return "Act 4";
  if (level <= 60) return "Interludes";
  return "Maps";
}

function titleFor(level: number) {
  return `Level ${level} · ${actFor(level)}`;
}

function check(text: string, act: string, zone: string, quest: string, gear = false, stats?: string[]): StepCheck {
  return { text, act, zone, quest, gear, stats, image: stepImage(zone, quest) };
}

function mainSupports(spec: BuildSpec, loadout: Loadout) {
  const skill = loadout.groups.flatMap((group) => group.skills).find((row) => row.name === spec.skill);
  return skill?.supports ?? [];
}

function gearCheck(spec: BuildSpec, level: number) {
  const shop = shops(level).armour;
  const attack = spec.skill === "Maul";
  if (level === 4) {
    const bodyNow = armourAt("body", spec.defence, 4);
    const bodyWas = armourAt("body", spec.defence, 1);
    const bootsNow = armourAt("boots", spec.defence, 4);
    const bootsWas = armourAt("boots", spec.defence, 1);
    const weaponNow = baseAt(spec.weaponNoun, 4);
    const weaponWas = baseAt(spec.weaponNoun, 1);
    const fresh = weaponStats(spec.weaponNoun, 4).filter((line) => !weaponStats(spec.weaponNoun, 1).includes(line));
    const changed = [
      weaponNow.name === weaponWas.name ? "" : weaponNow.name,
      bodyNow.name === bodyWas.name ? "" : bodyNow.name,
      bootsNow.name === bootsWas.name ? "" : bootsNow.name,
    ].filter(Boolean);
    const text = changed.length ? `New: ${changed.join(", ")}.` : `Keep ${weaponWas.name}.`;
    return check(text, actFor(level), shop.where, `Buy from ${shop.who}`, fresh.length > 0, fresh.length ? fresh : undefined);
  }
  if (level === 1) {
    return check(armourText(spec.defence, level, isCaster(spec)), actFor(level), shop.where, `Buy from ${shop.who}`, true, statsForLevel(spec, level));
  }
  const row = shops(level);
  const weaponShop = spec.weaponNoun === "wand" || spec.weaponNoun === "staff" || spec.weaponNoun === "sceptre" ? row.caster : row.armour;
  const weapon = baseAt(attack && spec.weaponNoun === "staff" ? "quarterstaff" : spec.weaponNoun, level);
  const boots = armourAt("boots", spec.defence, level);
  const body = armourAt("body", spec.defence, level);
  const text = `${weaponShop.who} in ${weaponShop.where}: ${weapon.name}. ${row.armour.who} in ${row.armour.where}: ${boots.name}, ${body.name}.`;
  return check(text, actFor(level), shop.where, `Buy from ${shop.who}`, true, weaponStats(spec.weaponNoun, level));
}

function passiveLine(spec: BuildSpec, level: number) {
  const plan = pointsForBand(spec, Math.max(1, level - 3), level);
  const point = plan.points[0];
  const text = point ? `Next: ${sentence(point)}` : "Next node on the highlighted path.";
  return check(text, actFor(level), "Passive tree", "Spend the passive point");
}

function snap(level: number) {
  return STOPS.find((stop) => stop >= level) ?? level;
}

function checksFor(level: number, spec: BuildSpec, loadout: Loadout, readyAt: number) {
  const node = loadout.ascendancy[0] ?? spec.ascendancyPick;
  const second = loadout.ascendancy[1];
  const checks: StepCheck[] = [];
  const helperLevel = requiredLevel(spec.helper);

  if (level === 1) {
    checks.push(
      check(
        weaponText(spec.weaponNoun, 1, spec.skill === "Maul"),
        "Act 1",
        shops(1)[spec.weaponNoun === "wand" || spec.weaponNoun === "staff" || spec.weaponNoun === "sceptre" ? "caster" : "armour"].where,
        `Buy a ${spec.weaponNoun}`,
        true,
        weaponStats(spec.weaponNoun, 1),
      ),
    );
    const hollow = /Hollow Palm/i.test(`${loadout.overview} ${loadout.leveling.map((row) => row.text).join(" ")}`);
    if (hollow) {
      checks[0] = check(
        `Hollow Palm: both hands empty until level 21. ${checks[0].text}`,
        "Act 1",
        checks[0].zone,
        checks[0].quest,
        true,
        checks[0].stats,
      );
    }
    const button = skillAt(spec, loadout, 1);
    if (readyAt <= 1 && spec.skill !== "Skeletal Sniper") {
      checks.push(check(`Socket ${spec.skill}. Left mouse button.`, "Act 1", "Your skill panel", "Socket the main skill"));
    } else if (spec.skill === "Skeletal Sniper") {
      checks.push(check(`Wait on Skeletal Sniper. Use ${button}.`, "Act 1", "Your skill panel", "Wait on the main skill"));
    } else {
      checks.push(check(`Wait on ${spec.skill}. Use ${button}.`, "Act 1", "Your skill panel", "Wait on the main skill"));
    }
    checks.push(gearCheck(spec, level));
  } else if (level === 4) {
    checks.push(
      check(
        helperLevel <= 4 ? `Add ${spec.helper}. Right mouse button.` : `Wait on ${spec.helper}.`,
        "Act 1",
        "Your skill panel",
        helperLevel <= 4 ? "Socket the second skill" : "Wait on the second skill",
      ),
    );
    checks.push(gearCheck(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 8) {
    checks.push(check("Kill The Crowbell in the Hunting Grounds. +2 weapon-set passive points.", "Act 1", "Hunting Grounds", "Kill The Crowbell"));
    // Spirit pays for auras and minions. It is not mana.
    checks.push(check("Freythorn: kill the King in the Mists. +30 spirit.", "Act 1", "Freythorn", "Ominous Altars"));
    checks.push(passiveLine(spec, level));
  } else if (level === 12) {
    checks.push(
      check(
        "The Lost Lute is in Ogham Farmlands. Return it to Una in Clearfell Encampment. +2 weapon-set points.",
        "Act 1",
        "Ogham Farmlands",
        "The Lost Lute",
      ),
    );
    checks.push(
      check(
        "Ogham Manor: use Candlemass' Essence (+20 life), then kill Count Geonor.",
        "Act 1",
        "Ogham Manor",
        "The Mad Wolf of Ogham",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 16) {
    checks.push(check("Traitor's Passage: kill Balbala and take the Djinn Barya.", "Act 2", "Traitor's Passage", "Ascent to Power"));
    checks.push(
      check(
        `Trial of the Sekhemas. Take ${sentence(node)}`,
        "Act 2",
        "Trial of the Sekhemas",
        "Ascent to Power",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 22) {
    checks.push(check("Keth: kill Kabala. +2 weapon-set points. Keep the Kabala Clan Relic.", "Act 2", "Keth", "Kill Kabala, the Constrictor Queen"));
    checks.push(passiveLine(spec, level));
    checks.push(gearCheck(spec, level));
  } else if (level === 28) {
    checks.push(
      check(
        "Deshar: Final Letter to Shambrin. +2 weapon-set points. Sisters of Garukhan: +10% lightning resistance. Then Jamanra on the Dreadnought.",
        "Act 2",
        "Deshar",
        "Tradition's Toll",
      ),
    );
    checks.push(gearCheck(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 33) {
    checks.push(check("Trial of Chaos in the Chimeral Wetlands. +2 ascendancy points.", "Act 3", "Chimeral Wetlands", "Trial of Chaos"));
    checks.push(
      second
        ? check(`Take ${sentence(second)}`, "Act 3", "Ascendancy panel", "Spend the ascendancy points")
        : check("Use the new ascendancy node for one zone.", "Act 3", "Ascendancy panel", "Spend the ascendancy points"),
    );
    checks.push(
      check(
        "Blackjaw in Jiquani's Machinarium: +10% fire resistance. Mighty Silverfist: +2 weapon-set points.",
        "Act 3",
        "Jiquani's Machinarium",
        "Kill Blackjaw, the Remnant",
      ),
    );
  } else if (level === 38) {
    checks.push(check("Azak Bog: kill Ignagduk and turn in to Servi. +30 spirit.", "Act 3", "The Azak Bog", "Tribal Vengeance"));
    checks.push(gearCheck(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 44) {
    checks.push(
      check(
        "Halls of the Dead: take the resistance you are lowest on. Hinekora: +2 weapon-set points.",
        "Act 4",
        "Halls of the Dead",
        "Trial of the Ancestors",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 52) {
    checks.push(
      check(
        "Stolen Barya first. Cap resistances, then enter.",
        "Interlude: The Stolen Barya",
        "The Khari Crossing",
        "Clearing the Way",
        true,
        ["75% Fire Resistance", "75% Cold Resistance", "75% Lightning Resistance"],
      ),
    );
    checks.push(
      check(
        "Khari Crossing: kill Akthi and Anundr. Risu gives +2 weapon-set points. Molten Shrine: +5% life.",
        "Interlude: The Stolen Barya",
        "The Khari Crossing",
        "Clearing the Way",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 58) {
    checks.push(check("Kriar Village: kill Lythara. +40 spirit.", "Interlude: Doryani's Contingency", "Kriar Village", "Slay Lythara, the Wayward Spear"));
    checks.push(
      check(
        "Wolvenhold: kill Oswin. +2 weapon-set points. Then the Hooded One in Kingsmarch.",
        "Interlude: Kingsmarch",
        "Kingsmarch",
        "Siege of Oriath",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 66) {
    checks.push(
      check("Cap each element before the next map tier.", "Maps", "Your map device", "Gear check", true, [
        "75% Fire Resistance",
        "75% Cold Resistance",
        "75% Lightning Resistance",
      ]),
    );
    checks.push(
      check("Chaos resistance: 30% to 50%.", "Maps", "Town or the trade site", "Gear check", true, [
        "30% Chaos Resistance",
        "50% Chaos Resistance",
        "+20-23% Chaos Resistance",
      ]),
    );
    checks.push(passiveLine(spec, level));
  } else if (level === 78) {
    checks.push(check("Buy the endgame rolls below.", "Maps", "Town or the trade site", "Gear check", true, statsForLevel(spec, level)));
    checks.push(gearCheck(spec, level));
    checks.push(check("Add one support at a time.", "Maps", "Your skill panel", "Socket supports"));
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

function extras(spec: BuildSpec, loadout: Loadout): TimelineStep[] {
  const steps: TimelineStep[] = [];
  for (const row of loadout.leveling) {
    const level = levelFromRow(row);
    if (level === null || level < 2 || level > 95 || STOPS.includes(level)) continue;
    const text = sentence(row.text);
    const gear = /boot|resist|life|movement|weapon|spirit|energy shield/i.test(text);
    steps.push({
      level,
      title: titleFor(level),
      checks: [
        check(
          text,
          actFor(level),
          "This build's route",
          "Build route",
          gear,
          gear ? statsForLevel(spec, level) : undefined,
        ),
      ],
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
  for (const step of [...base, ...extras(spec, loadout)]) {
    const existing = merged.get(step.level);
    if (!existing) {
      merged.set(step.level, step);
      continue;
    }
    const checks = [...existing.checks];
    for (const line of step.checks) {
      if (!checks.some((row) => row.text === line.text) && checks.length < 5) checks.push(line);
    }
    existing.checks = checks;
  }
  if (readyAt > 1) {
    const line = check(
      `Socket ${spec.skill} now. Left mouse button.`,
      actFor(readyAt),
      "Your skill panel",
      "Socket the main skill",
    );
    const step = merged.get(readyAt);
    if (!step) {
      merged.set(readyAt, { level: readyAt, title: titleFor(readyAt), checks: [line] });
    } else if (!step.checks.some((row) => row.text.startsWith(`Socket ${spec.skill}`))) {
      step.checks.unshift(line);
    }
  }
  for (const [index, support] of supports.entries()) {
    const level = supportReadyAt(index, support, readyAt);
    const step = merged.get(level);
    const line = check(
      `Link ${support} into ${spec.skill}.`,
      actFor(level),
      "Your skill panel",
      "Socket supports",
    );
    if (!step) {
      merged.set(level, { level, title: titleFor(level), checks: [line] });
      continue;
    }
    if (!step.checks.some((row) => row.text.startsWith(`Link ${support} into`)) && step.checks.length < 6) {
      step.checks.push(line);
    }
  }
  return [...merged.values()].sort((a, b) => a.level - b.level);
}
