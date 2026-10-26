import type { BuildSpec } from "@/content/buildSpecs";
import { gearLineForLevel } from "@/content/gearCards";
import { stepImage } from "@/content/zoneArt";
import { mainSkillReadyAt, requiredLevel } from "@/content/gemFacts";
import { pointsForBand } from "@/content/passivePlan";
import type { Loadout, StepCheck, TimelineStep } from "@/lib/types";

const STOPS = [1, 4, 8, 12, 16, 22, 28, 33, 38, 44, 52, 58, 66, 78];
const SUPPORT_STOPS = [12, 22, 28, 38, 44, 52];

function sentence(text: string) {
  const cut = text.split(/(?<=\.)\s/)[0]?.trim() ?? text.trim();
  return cut.length > 220 ? `${cut.slice(0, 217)}…` : cut;
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

function check(text: string, act: string, zone: string, quest: string, gear = false): StepCheck {
  return { text, act, zone, quest, gear, image: stepImage(zone, quest) };
}

function mainSupports(spec: BuildSpec, loadout: Loadout) {
  const skill = loadout.groups.flatMap((group) => group.skills).find((row) => row.name === spec.skill);
  return skill?.supports ?? [];
}

function gearCheck(spec: BuildSpec, level: number) {
  return check(gearLineForLevel(spec, level), actFor(level), "Town vendor or the trade site", "Gear check", true);
}

function passiveLine(spec: BuildSpec, level: number) {
  const plan = pointsForBand(spec, Math.max(1, level - 3), level);
  const point = plan.points[0];
  const text = point
    ? `Next passive on the class path: ${sentence(point)}`
    : "Spend the new point on the highlighted path. Do not path across the tree.";
  return check(text, actFor(level), "Passive tree", "Spend the passive point");
}

function snap(level: number) {
  return STOPS.find((stop) => stop >= level) ?? level;
}

function checksFor(level: number, spec: BuildSpec, loadout: Loadout, readyAt: number) {
  const node = loadout.ascendancy[0] ?? spec.ascendancyPick;
  const second = loadout.ascendancy[1];
  const checks: StepCheck[] = [];
  const skillLevel = requiredLevel(spec.skill);
  const helperLevel = requiredLevel(spec.helper);

  if (level === 1) {
    checks.push(
      check(
        `Buy the ${spec.weaponNoun} with the highest damage number from the first vendor in Clearfell Encampment. Item level 1 is fine.`,
        "Act 1",
        "Clearfell Encampment",
        "Buy a weapon",
        true,
      ),
    );
    if (readyAt <= 1) {
      checks.push(check(`Socket ${spec.skill}. That is the main button.`, "Act 1", "Your skill panel", "Socket the main skill"));
    } else {
      const early = sentence(loadout.leveling[0]?.text ?? "Use the weapon's basic attack and any gem the vendor offers at level 1.");
      const requiredNote = skillLevel === readyAt ? "" : ` The gem's required level is ${skillLevel}.`;
      checks.push(
        check(
          `Do not socket ${spec.skill} yet. It joins this route at level ${readyAt}.${requiredNote} Until then: ${early}`,
          "Act 1",
          "Your skill panel",
          "Wait on the main skill",
        ),
      );
    }
    checks.push(gearCheck(spec, level));
  } else if (level === 4) {
    if (helperLevel <= 4) {
      checks.push(
        check(
          `Add ${spec.helper} when you get a second skill gem. It is the second button, not a replacement.`,
          "Act 1",
          "Your skill panel",
          "Socket the second skill",
        ),
      );
    } else {
      checks.push(
        check(
          `Wait on ${spec.helper}. Its required level is ${helperLevel}.`,
          "Act 1",
          "Your skill panel",
          "Wait on the second skill",
        ),
      );
    }
    checks.push(gearCheck(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 8) {
    checks.push(
      check(
        "The Crowbell is in the Hunting Grounds. Kill him. The reward is a Book of Specialisation: +2 weapon-set passive points. Those points only apply while that weapon set is active. They are not the point you get for leveling up.",
        "Act 1",
        "Hunting Grounds",
        "Kill The Crowbell",
      ),
    );
    checks.push(
      check(
        "Freythorn is the side zone. Quest log: Ominous Altars. Finish the rituals and kill the King in the Mists. The reward is +30 spirit. Spirit pays for auras and minions. It is not mana. Finn's turn-in is an Uncut Support Gem, not the spirit.",
        "Act 1",
        "Freythorn",
        "Ominous Altars",
      ),
    );
    checks.push(passiveLine(spec, level));
  } else if (level === 12) {
    checks.push(
      check(
        "Quest log: The Lost Lute. The lute is in Una's house in Ogham Farmlands, the round open-roof building, in a crate at the back. Return it to Una in Clearfell Encampment. Reward: a Book of Specialisation, +2 weapon-set passive points. Count Geonor does not grant these points.",
        "Act 1",
        "Ogham Farmlands",
        "The Lost Lute",
      ),
    );
    checks.push(
      check(
        "Ogham Manor, first floor: read the Psalm of Madness and kill Candlemass, the Living Rite. Use Candlemass' Essence for +20 maximum life. Last floor, quest log The Mad Wolf of Ogham: kill Count Geonor, then speak to the Hooded One. He sails you to the Vastiri Outskirts.",
        "Act 1",
        "Ogham Manor",
        "The Mad Wolf of Ogham",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 16) {
    checks.push(
      check(
        "Traitor's Passage. Quest log: Ascent to Power. Kill Balbala, the Traitor, and take the Djinn Barya. That coin opens the Trial of the Sekhemas. It is not a gem.",
        "Act 2",
        "Traitor's Passage",
        "Ascent to Power",
      ),
    );
    checks.push(
      check(
        `Clear the Trial of the Sekhemas once. Use the Altar of Ascendancy. That is your first 2 ascendancy points. Ascendancy points are not passive-tree points. On the ascendancy panel, take ${sentence(node)}`,
        "Act 2",
        "Trial of the Sekhemas",
        "Ascent to Power",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 22) {
    checks.push(
      check(
        "Keth. Kill Kabala, the Constrictor Queen, for +2 weapon-set points. Kill hyenas until the Kabala Clan Relic drops. The relic is the key for the Valley of the Titans, not a bonus by itself.",
        "Act 2",
        "Keth",
        "Kill Kabala, the Constrictor Queen",
      ),
    );
    checks.push(passiveLine(spec, level));
    checks.push(gearCheck(spec, level));
  } else if (level === 28) {
    checks.push(
      check(
        "Deshar. Quest log: Tradition's Toll. Take the Final Letter to Shambrin on the Ardura Caravan for +2 weapon-set points. Then the Spires of Deshar: click the Sisters of Garukhan shrine for +10% lightning resistance. No kill. Finish on the Dreadnought by killing Jamanra, the Abomination.",
        "Act 2",
        "Deshar",
        "Tradition's Toll",
      ),
    );
    checks.push(gearCheck(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 33) {
    checks.push(
      check(
        "The Trial of Chaos is in the Chimeral Wetlands. Run it once for the next 2 ascendancy points.",
        "Act 3",
        "Chimeral Wetlands",
        "Trial of Chaos",
      ),
    );
    checks.push(
      second
        ? check(`On the ascendancy panel, take ${sentence(second)}`, "Act 3", "Ascendancy panel", "Spend the ascendancy points")
        : check(
            "Use the new ascendancy node for a whole zone before you take another.",
            "Act 3",
            "Ascendancy panel",
            "Spend the ascendancy points",
          ),
    );
    checks.push(
      check(
        "Jungle Ruins: Mighty Silverfist is +2 weapon-set points if you skipped him. Jiquani's Machinarium: kill Blackjaw, the Remnant, for +10% fire resistance. Open him with a Small Soul Core at the Stone Altar.",
        "Act 3",
        "Jiquani's Machinarium",
        "Kill Blackjaw, the Remnant",
      ),
    );
  } else if (level === 38) {
    checks.push(
      check(
        "The Azak Bog. Quest log: Tribal Vengeance. Kill Ignagduk, the Bog Witch, and turn the quest in to Servi in Ziggurat Encampment. That is +30 spirit.",
        "Act 3",
        "The Azak Bog",
        "Tribal Vengeance",
      ),
    );
    checks.push(gearCheck(spec, level));
    checks.push(passiveLine(spec, level));
  } else if (level === 44) {
    checks.push(
      check(
        "Quest log: Trial of the Ancestors. In the Halls of the Dead, Ngamahu is +5 strength or +5% fire resistance, Tasalio is +5 intelligence or +5% cold resistance, and Tawhoa is +5 dexterity or +5% lightning resistance. Take the resistance you are lowest on. Then kill Yama the White and speak to Hinekora for +2 weapon-set points. The Silent Hall, on the way, is +5% maximum mana.",
        "Act 4",
        "Halls of the Dead",
        "Trial of the Ancestors",
      ),
    );
    checks.push(gearCheck(spec, level));
    checks.push(
      check(
        "Boots stay at 20–25% increased Movement Speed. Do not trade the speed for a small life roll.",
        "Act 4",
        "Town vendor or the trade site",
        "Gear check",
        true,
      ),
    );
  } else if (level === 52) {
    checks.push(
      check(
        "Do the Stolen Barya interlude first. Resistances drop when you enter. Recap fire, cold, and lightning toward 75% before you zone in.",
        "Interlude: The Stolen Barya",
        "The Khari Crossing",
        "Clearing the Way",
        true,
      ),
    );
    checks.push(
      check(
        "Quest log: Clearing the Way. Kill Akthi, the Final Sting, and Anundr, the Sandworm, in the Khari Crossing, then take the Book of Specialisation from Risu in the Khari Bazaar. That is +2 weapon-set points. The Skullmaw Stairway is the Molten Shrine: use the Molten One's Gift for +5% maximum life.",
        "Interlude: The Stolen Barya",
        "The Khari Crossing",
        "Clearing the Way",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 58) {
    checks.push(
      check(
        "Doryani's Contingency, Kriar Village: kill Lythara, the Wayward Spear, for +40 spirit. With the King in the Mists and Ignagduk, that is 100 spirit from the campaign.",
        "Interlude: Doryani's Contingency",
        "Kriar Village",
        "Slay Lythara, the Wayward Spear",
      ),
    );
    checks.push(
      check(
        "Holten is last. Kill Oswin, the Dread Warden, in Wolvenhold for +2 weapon-set points. Then speak to the Hooded One in Kingsmarch. Quest log: Siege of Oriath. That is the last +2. You should have 24.",
        "Interlude: Kingsmarch",
        "Kingsmarch",
        "Siege of Oriath",
      ),
    );
    checks.push(gearCheck(spec, level));
  } else if (level === 66) {
    checks.push(
      check(
        "White maps. Fire, cold, and lightning resistance should each read 75% before you push tier.",
        "Maps",
        "Your map device",
        "Gear check",
        true,
      ),
    );
    checks.push(
      check(
        "Chaos resistance of 30–50% is enough. Do not chase 75% chaos.",
        "Maps",
        "Town or the trade site",
        "Gear check",
        true,
      ),
    );
    checks.push(passiveLine(spec, level));
  } else if (level === 78) {
    checks.push(
      check(
        "A rare with +(120–214) life and the right defence still beats a unique that has neither.",
        "Maps",
        "Town or the trade site",
        "Gear check",
        true,
      ),
    );
    checks.push(gearCheck(spec, level));
    checks.push(
      check(
        "Add one support at a time. A new skill name is a different build.",
        "Maps",
        "Your skill panel",
        "Socket supports",
      ),
    );
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

function withNumbers(text: string, level: number) {
  if (/\d/.test(text)) return text;
  if (!/boot|resist|life|energy shield|movement|weapon|armour|armor|spirit/i.test(text)) return text;
  return `${text} Gear target at this level: ${gearLineForLevel({ defence: "" }, level)}`;
}

function extras(loadout: Loadout): TimelineStep[] {
  const steps: TimelineStep[] = [];
  for (const row of loadout.leveling) {
    const level = levelFromRow(row);
    if (level === null || level < 2 || level > 95 || STOPS.includes(level)) continue;
    const text = withNumbers(sentence(row.text), level);
    const gear = /boot|resist|life|movement|weapon|spirit|energy shield/i.test(text);
    steps.push({
      level,
      title: titleFor(level),
      checks: [check(text, actFor(level), "This build's route", "Build route", gear)],
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
      if (!checks.some((row) => row.text === line.text) && checks.length < 5) checks.push(line);
    }
    existing.checks = checks;
  }
  if (readyAt > 1) {
    const line = check(
      `Socket ${spec.skill} now. It is the main button from here.`,
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
      `Link ${support} into ${spec.skill}. This is support ${index + 1}. Its required level is ${requiredLevel(support)}.`,
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
