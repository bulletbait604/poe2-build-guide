import type { BuildSpec } from "@/content/buildSpecs";
import { gearIcon } from "@/content/gearArt";
import type { GearAffix, GearCard, GearStage, GearTotal } from "@/lib/types";

// Rare affix tiers read from poe2db on 2026-10-25 (patch 0.5.x data on the item pages):
// https://poe2db.tw/us/Boots_dex
// https://poe2db.tw/us/Body_Armours_dex
// https://poe2db.tw/us/Body_Armours_int
// https://poe2db.tw/us/Gloves_dex
// https://poe2db.tw/us/Amulets
// https://poe2db.tw/us/Belts
// https://poe2db.tw/us/Rings
// https://poe2db.tw/us/Bows
// Movement speed on boots is a prefix with fixed values, not a range:
// 10% item level 1 (Runner's), 15% at 16 (Sprinter's), 20% at 33 (Stallion's),
// 25% at 46 (Gazelle's), 30% at 65 (Cheetah's), 35% at 82 (Hellion's).
// Life prefixes Hale through Prime are shared by boots, body, gloves, rings, amulets, and belts.
// Spirit prefixes Lady's through Queen's are on body armour and amulets.
// Resistance suffixes of the Whelpling through of Tzteosh use the same item levels on those pages.

const LIFE_LEVELING = "+(20–69) to maximum Life (Healthy at item level 6, up to Stout at 33)";
const LIFE_EARLY = "+(100–174) to maximum Life (Virile at item level 54, up to Fecund at 65)";
const LIFE_END = "+(175–214) to maximum Life (Vigorous at item level 70, up to Prime at 80)";

const RES_LEVELING = "+(11–25)% to one element (item level 12–36). Split fire, cold, and lightning across pieces.";
const RES_EARLY = "+(26–35)% to the element you are short (item level 48–60)";
const RES_END = "+(36–45)% to the element you are short (item level 71–82)";

const CHAOS_EARLY = "+(16–19)% to Chaos Resistance (item level 56). Two pieces, not one, to reach 30%.";
const CHAOS_END = "+(20–27)% to Chaos Resistance (item level 68–81). Stop once total chaos is 30–50%.";

function affix(
  name: string,
  kind: GearAffix["kind"],
  rank: GearAffix["rank"],
  leveling: string,
  earlyMaps: string,
  endgame: string,
): GearAffix {
  return { name, kind, rank, leveling, earlyMaps, endgame };
}

function family(defence: string) {
  const text = defence.toLowerCase();
  if (text.includes("energy")) return "es";
  if (text.includes("evasion")) return "evasion";
  return "armour";
}

function caster(spec: BuildSpec) {
  return spec.speed.toLowerCase().includes("cast");
}

function attacker(spec: BuildSpec) {
  return spec.speed.toLowerCase().includes("attack");
}

function wantsSpirit(gear: GearStage[]) {
  return gear.some((row) => /spirit/i.test(`${row.early} ${row.late} ${row.maps}`));
}

function baseName(slot: string, spec: BuildSpec) {
  const noun = spec.weaponNoun;
  const defence = family(spec.defence);
  const defenceName =
    defence === "es" ? "Energy shield (int)" : defence === "evasion" ? "Evasion (dex)" : "Armour (str)";
  if (/quiver/i.test(slot)) return "A broadhead quiver";
  if (/shield/i.test(slot)) return "A strength shield";
  if (/bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff/i.test(slot)) {
    if (noun === "crossbow") return "A crossbow. A level 16 Varnished Crossbow is the usual Act 1–2 step.";
    if (noun === "spear") return "A spear. A level 51 Seaglass Spear is the hold until Akoyan when this route says so.";
    if (noun === "bow") return "A bow with the higher tooltip damage";
    return `A ${noun} with the higher tooltip damage`;
  }
  if (/body/i.test(slot)) return `${defenceName} body armour`;
  if (/helm/i.test(slot)) return `${defenceName} helmet`;
  if (/glove/i.test(slot)) return `${defenceName} gloves`;
  if (/boot/i.test(slot)) return `${defenceName} boots`;
  if (/amulet/i.test(slot)) return defence === "es" ? "A lapis amulet" : defence === "evasion" ? "A jade amulet" : "An amber amulet";
  if (/ring/i.test(slot)) return attacker(spec) ? "Two rare rings. Iron Rings until a rare beats the damage." : "Two rare rings";
  if (/belt/i.test(slot)) return "A rare belt";
  return slot;
}

function whyFor(slot: string, spec: BuildSpec, row: GearStage | undefined) {
  if (row?.maps) return row.maps;
  if (/boot/i.test(slot)) return "Movement speed is a boot prefix. A pair with 0% is not an upgrade.";
  if (/ring|amulet|belt/i.test(slot)) return "This is where the resistance cap is finished.";
  return `${spec.defence} and life live on this piece. ${spec.weaponStat}`;
}

function iconFor(slot: string, spec: BuildSpec) {
  if (/quiver/i.test(slot)) return "https://cdn.poe2db.tw/image/Art/2DItems/Quivers/Basetypes/QuiverBroadhead.webp";
  if (/shield/i.test(slot)) return "https://cdn.poe2db.tw/image/Art/2DItems/Offhand/Shields/Crest01.webp";
  const mapped = /ring/i.test(slot)
    ? "Ring"
    : /bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff/i.test(slot)
      ? "Weapon"
      : slot;
  return gearIcon(mapped, spec.weaponNoun, spec.defence);
}

export function cardIcon(slot: string, spec: Pick<BuildSpec, "weaponNoun" | "defence">) {
  return iconFor(slot, spec as BuildSpec);
}

function defenceAffixes(spec: BuildSpec, lifeRank: GearAffix["rank"]): GearAffix[] {
  const kind = family(spec.defence);
  const defenceName = kind === "es" ? "% increased Energy Shield" : kind === "evasion" ? "% increased Evasion Rating" : "% increased Armour";
  const defenceValues =
    kind === "armour"
      ? {
          leveling: "(27–55)% at item level 16–33. Evasion and energy shield bodies use this band; shop armour in the same band.",
          earlyMaps: "(80–100)% at item level 60–65",
          endgame: "(101–110)% at item level 75",
        }
      : {
          leveling: "(27–55)% at item level 16–33",
          earlyMaps: "(80–100)% at item level 60–65",
          endgame: "(101–110)% at item level 75",
        };
  const flat =
    kind === "es"
      ? affix(
          "+ to maximum Energy Shield",
          "Prefix",
          "Must",
          "+(25–41) (Glittering at item level 16, Radiating at 33)",
          "+(61–80) (Dazzling at item level 60, Scintillating at 65)",
          "+(81–96) (Incandescent at item level 70, Resplendent at 79)",
        )
      : null;
  return [
    affix(defenceName, "Prefix", "Must", defenceValues.leveling, defenceValues.earlyMaps, defenceValues.endgame),
    ...(flat ? [flat] : []),
    affix("+ to maximum Life", "Prefix", lifeRank, LIFE_LEVELING, LIFE_EARLY, LIFE_END),
  ];
}

function resistAffix(rank: GearAffix["rank"]): GearAffix {
  return affix("% to Fire, Cold, or Lightning Resistance", "Suffix", rank, RES_LEVELING, RES_EARLY, RES_END);
}

function spiritAffix(rank: GearAffix["rank"]): GearAffix {
  return affix(
    "+ to Spirit",
    "Prefix",
    rank,
    "+(30–42) (Lady's at item level 16, up to Viscountess' at 33)",
    "+(47–56) (Countess' at item level 54, up to Princess' at 65)",
    "+(57–61) (Queen's at item level 78)",
  );
}

function speedAffix(spec: BuildSpec, onWeapon: boolean): GearAffix {
  if (caster(spec)) {
    return affix(
      "% increased Cast Speed",
      "Suffix",
      "Must",
      "(9–15)% on an amulet (item level 1–18)",
      "(19–24)% (item level 51–60)",
      "(25–28)% (Prestidigitation, item level 66, on amulets)",
    );
  }
  if (onWeapon) {
    return affix(
      "% increased Attack Speed",
      "Suffix",
      "Must",
      "(5–13)% on a bow (item level 1–22)",
      "(14–16)% (of Renown, item level 30 on bows)",
      "(17–19)% (of Acclaim, item level 37 on bows)",
    );
  }
  return affix(
    "% increased Attack Speed",
    "Suffix",
    attacker(spec) ? "Must" : "Nice",
    "(5–10)% on gloves (item level 1–22)",
    "(11–13)% (of Mastery, item level 37 on gloves)",
    "(14–16)% (of Renown, item level 60 on gloves)",
  );
}

function affixesFor(slot: string, spec: BuildSpec, gear: GearStage[]): GearAffix[] {
  const spirit = wantsSpirit(gear);
  const es = family(spec.defence) === "es";
  if (/boot/i.test(slot)) {
    return [
      affix(
        "% increased Movement Speed",
        "Prefix",
        "Must",
        "10–15% (Runner's at item level 1, Sprinter's at 16)",
        "25–30% (Gazelle's at item level 46, Cheetah's at 65)",
        "30–35% (Cheetah's at item level 65, Hellion's at 82)",
      ),
      affix("+ to maximum Life", "Prefix", es ? "Nice" : "Must", "+(10–39) (item level 1–16)", "+(85–119) (item level 46–54)", "+(120–149) (Athlete's, item level 60)"),
      resistAffix("Nice"),
      affix("Life Regeneration per second", "Suffix", "Ignore", "1–4 (item level 1–11). Rank it below speed.", "9–18 (item level 35–47). Rank it below speed.", "18–23 (item level 58). It does not replace life or the 30% speed."),
    ];
  }
  if (/body|helm/i.test(slot)) {
    return [
      ...defenceAffixes(spec, es ? "Nice" : "Must"),
      spiritAffix(/body/i.test(slot) && spirit ? "Must" : "Nice"),
      resistAffix("Nice"),
      affix("Stun Threshold", "Suffix", "Ignore", "+(6–49) at item level 1–15. Take 0 of this over life.", "+(125–206) at item level 45–54. Still 0 priority.", "0. A stun-threshold suffix does not help the 75% cap."),
    ];
  }
  if (/glove/i.test(slot)) {
    const speed = speedAffix(spec, false);
    return [
      affix("+ to maximum Life", "Prefix", es ? "Nice" : "Must", LIFE_LEVELING, "+(70–119) (item level 38–54)", LIFE_EARLY),
      speed,
      resistAffix(speed.rank === "Must" || !es ? "Nice" : "Must"),
      affix("% increased Rarity of Items found", "Suffix", "Ignore", "0% while leveling. The (6–10)% tier at item level 3 is a trap.", "0% in early maps. (15–18)% at item level 40 is still optional.", "0% until life and speed are done. Then (15–18)% is optional."),
    ];
  }
  if (/ring/i.test(slot)) {
    return [
      resistAffix("Must"),
      affix("% to Chaos Resistance", "Suffix", "Nice", "Skip it. +(4–11)% exists from item level 16 and will not cap you.", CHAOS_EARLY, CHAOS_END),
      affix("+ to maximum Life", "Prefix", "Nice", "+(20–69). Rings stop climbing earlier than a body.", "+(85–119) (Rotund to Virile, item level 46–54)", "+(100–119). A ring does not roll the body's 175+ life."),
      affix("+ to Strength, Dexterity, or Intelligence", "Suffix", "Nice", "+(9–16) so a gem is not red (item level 11–22 on boots; the same idea on a ring)", "+(21–27) (item level 44–55)", "+(28–33) (item level 66–74 on boots)"),
    ];
  }
  if (/amulet/i.test(slot)) {
    const skill = caster(spec) ? "Spell" : attacker(spec) ? "Projectile" : "Minion";
    return [
      affix(
        `+ to Level of all ${skill} Skills`,
        "Suffix",
        "Must",
        "+1 (item level 5–10 on amulets; bows get +1 projectile skills at item level 18)",
        "+2 (item level 41 on amulets; bows get +2 at item level 36)",
        "+3 (item level 75 on amulets; bows get +3 at 55 and +4 at 81)",
      ),
      spiritAffix(spirit ? "Must" : "Nice"),
      resistAffix("Nice"),
      affix("% increased Rarity of Items found", "Prefix", "Ignore", "0% at item level 10. (8–11)% is the tier to skip.", "0% at item level 47. (16–19)% waits.", "0% until gem levels, spirit, and the 75% cap are done."),
    ];
  }
  if (/belt/i.test(slot)) {
    return [
      affix("+ to maximum Life", "Prefix", es ? "Nice" : "Must", LIFE_LEVELING, LIFE_EARLY, "+(120–174). Belts on the belt page were checked through Fecund, not the body's Prime."),
      resistAffix("Must"),
      affix("+ to Armour", "Prefix", "Ignore", "0 armour if it replaces life. The tier is +(12–68) at item level 1–16.", "0 armour if it replaces life. The tier is +(141–225) at item level 46–54.", "0 armour on the belt. Life and 1 resistance win."),
    ];
  }
  if (/quiver/i.test(slot)) {
    return [
      affix("Added damage", "Prefix", "Must", "Any added damage on an item level 16+ quiver", "Item level 60+ with added damage", "Item level 75+ with added damage"),
      affix("+ to Level of all Projectile Skills", "Suffix", "Nice", "+1 if the quiver has it", "+2", "+3. The bow page lists +4 at item level 81 on the bow itself."),
      affix("+ to maximum Life", "Prefix", "Nice", "+(30–69)", "+(85–119)", "+(100–119). Do not drop added damage for a small life roll."),
      affix("Extra arrows", "Suffix", "Nice", "0 extra arrows until the bow already clears", "1 extra arrow if the damage is already there", "1 extra arrow on the clear quiver. The boss quiver wants 0 extra arrows and gem levels instead."),
    ];
  }
  if (/jewel/i.test(slot)) {
    return [
      affix(
        "+ to maximum Life or one resistance",
        "Prefix",
        "Must",
        "0 jewels until maps",
        "1 jewel with a life prefix or 1 resistance suffix",
        "1 jewel. A sapphire with mana on kill only if this build's note asks for it.",
      ),
      affix(
        "% increased Rarity of Items found",
        "Suffix",
        "Ignore",
        "0% on jewels while leveling",
        "0% on jewels in early maps",
        "0% on the jewel. A 100% rarity total, when a build asks for it, is a gear total, not this socket.",
      ),
    ];
  }
  if (/shield/i.test(slot)) {
    return [
      affix("+ to maximum Life", "Prefix", "Must", LIFE_LEVELING, LIFE_EARLY, LIFE_END),
      affix(
        "% increased Armour",
        "Prefix",
        "Nice",
        "Shop the same band as a body: (27–55)% at item level 16–33",
        "(80–100)% at item level 60–65",
        "(101–110)% at item level 75",
      ),
      resistAffix("Nice"),
      affix("Block chance", "Suffix", "Ignore", "0 block required. Any block is a bonus.", "0 block required. Do not trade life away for it.", "0 block required. Life stays the target."),
    ];
  }
  const skill = caster(spec) ? "Spell" : attacker(spec) ? "Projectile" : "Minion";
  return [
    affix(
      "Tooltip damage",
      "Prefix",
      "Must",
      "Replace it when it is more than 5 levels behind the zone",
      "Within 5 levels of the zone, with added damage in this build's element",
      "Item level 75+ and the highest damage you can equip. A white weapon that hits harder beats a unique.",
    ),
    affix(
      `+ to Level of all ${skill} Skills`,
      "Suffix",
      "Must",
      "+1. On bows that suffix is item level 18.",
      "+2. On bows that suffix is item level 36.",
      "+3 or +4. On bows, +3 is item level 55 and +4 is item level 81.",
    ),
    speedAffix(spec, true),
    affix("% increased Rarity of Items found", "Suffix", "Ignore", "0% on the weapon while leveling", "0% on the weapon in early maps", "0% on the weapon. Damage and gem levels come first."),
  ];
}

function howFor(slot: string, spec: BuildSpec) {
  const trade = spec.weaponNoun;
  if (/boot/i.test(slot)) {
    return "While leveling, buy 10% movement speed from the Act 1 vendor, or use a Transmutation then an Augmentation on a normal pair. In maps, buy the rare. Trade filter: Boots, item level 65+, 30% increased Movement Speed, and a life prefix.";
  }
  if (/body/i.test(slot)) {
    return "Vendor a life chest during the acts. In maps, buy it. Trade filter: Body Armour, item level 60+, maximum Life, and the defence this build wears. A Greater Iron Rune adds 18% armour, evasion, and energy shield if the chest has a socket.";
  }
  if (/ring/i.test(slot)) {
    return "One element per ring. Trade filter: Ring, item level 60+, a single elemental resistance, then add chaos resistance on a second search once fire, cold, and lightning are at 75%.";
  }
  if (/amulet/i.test(slot)) {
    return "Trade filter: Amulet, + to Level of skills, then Spirit if an aura is still grey. Campaign amulets can come from the vendor.";
  }
  if (/belt/i.test(slot)) {
    return "Trade filter: Belt, maximum Life, and one resistance. A strength suffix only if a gem is red.";
  }
  if (/glove/i.test(slot)) {
    return caster(spec)
      ? "Trade filter: Gloves, item level 51+, increased Cast Speed, and a life or energy shield prefix."
      : "Trade filter: Gloves, item level 37+, increased Attack Speed, and maximum Life.";
  }
  if (/quiver/i.test(slot)) {
    return "Trade filter: Quiver, item level 60+, added physical or elemental damage. Extra arrows are the second filter, after the bow hits hard.";
  }
  if (/shield/i.test(slot)) {
    return "Trade filter: Shield, maximum Life, then armour. Do not buy a unique shield to fill the slot.";
  }
  return `Vendor a ${trade} whenever the tooltip damage jumps. Trade filter: ${trade}, item level close to yours, plus gem levels or attack speed. Do not wait on a unique.`;
}

export function gearCardsFor(spec: BuildSpec, gear: GearStage[]): GearCard[] {
  const spirit = wantsSpirit(gear);
  return gear.map((row) => ({
    slot: row.slot,
    base: baseName(row.slot, spec),
    why: whyFor(row.slot, spec, row),
    note: row.early,
    affixes: affixesFor(row.slot, spec, spirit ? gear : gear),
    how: howFor(row.slot, spec),
  }));
}

export function gearTotalsFor(spec: BuildSpec, gear: GearStage[]): GearTotal[] {
  const es = family(spec.defence) === "es";
  const spirit = wantsSpirit(gear);
  return [
    {
      label: "Fire, cold, lightning",
      leveling: "About 20% of each by level 14, then 30–40% of each by level 29, then over 40% before the interludes.",
      earlyMaps: "75% fire, 75% cold, and 75% lightning before you raise the tier.",
      endgame: "75% / 75% / 75%. Recap whatever a new piece knocks under the cap.",
    },
    {
      label: "Chaos resistance",
      leveling: "Ignore it. A campaign suffix is +(4–15)%.",
      earlyMaps: "30% is enough to start. That is two suffixes, not one.",
      endgame: "30–50%. 75% chaos is not the target.",
    },
    {
      label: es ? "Energy shield" : "Life",
      leveling: es ? "Flat energy shield +(25–41) on the body, plus a % prefix." : "Body life +(30–69). Other slots add less.",
      earlyMaps: es ? "Flat +(61–80) and a % prefix of (80–100)%." : "Body life +(120–174).",
      endgame: es
        ? "Flat +(81–96) and (101–110)% increased Energy Shield. Chaos Inoculation only when this build's own note says the shield is high enough."
        : "Body life +(175–214), then life on the helmet and belt.",
    },
    {
      label: "Spirit",
      leveling: "Campaign: +30 from the King in the Mists. Gear can add +(30–42) on body or amulet from item level 16.",
      earlyMaps: "Campaign total is 100 after Lythara (+30, +30, +40). Gear adds +(47–56) per piece that rolls it.",
      endgame: spirit
        ? "Keep the campaign 100, then the gear spirit this build's note asks for. Queen's is +(57–61) at item level 78."
        : "100 from the campaign is the whole requirement unless an aura is grey. Then add one spirit prefix.",
    },
    {
      label: "Movement speed",
      leveling: "10–15% on boots. 0% does not count.",
      earlyMaps: "25–30% on boots.",
      endgame: "30–35% on boots. Do not trade it for a small life roll.",
    },
    {
      label: "Attributes",
      leveling: "+(9–20) of the attribute a red gem is asking for.",
      earlyMaps: "Gems stay white. +(21–27) covers a late requirement.",
      endgame: "Still only enough that no gem is red. +(28–33) is the high suffix, not a goal by itself.",
    },
  ];
}

export function gearLineForLevel(_spec: { defence: string }, level: number) {
  if (level < 16) {
    return "Boots: 10% increased Movement Speed (Runner's, item level 1) and +(10–29) to maximum Life. Body: +(20–39) to maximum Life. Rings: about 20% fire, 20% cold, and 20% lightning from suffixes of +(6–15)%.";
  }
  if (level < 30) {
    return "Boots: 15% increased Movement Speed (Sprinter's, item level 16) and +(30–59) life. Body: +(40–69) life. Each element 30–40%, from suffixes of +(16–25)%.";
  }
  if (level < 52) {
    return "Boots: 20–25% increased Movement Speed (item level 33–46). Body life +(70–119). Each element over 40%, toward 75%.";
  }
  if (level < 66) {
    return "Before an interlude, fire, cold, and lightning should each be close to 75%. Boots: 25–30% movement speed. Chaos resistance of 30% is enough if a suffix is already there.";
  }
  return "75% fire, 75% cold, and 75% lightning. Chaos resistance 30–50%. Boots: 30–35% increased Movement Speed (item level 65–82).";
}
