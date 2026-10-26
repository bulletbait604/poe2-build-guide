import type { BuildSpec } from "@/content/buildSpecs";
import { slotStage, type ShopSpec } from "@/content/shopping";
import type { GearStage, GemGroup, GuideLink, LinkedGem, Loadout } from "@/lib/types";

const TIER = "https://maxroll.gg/poe2/tierlists/league-starter-build-tier-list";
const ASC_TIER = "https://maxroll.gg/poe2/tierlists/league-starter-ascendancy-tier-list";
const NINJA = "https://poe.ninja/poe2/builds";
const INDEX = "https://maxroll.gg/poe2/build-guides";
const FUBGUN = "https://mobalytics.gg/poe-2/builds/ice-shot-deadeye";

const guide = (slug: string, label: string): GuideLink => ({
  label,
  url: `https://maxroll.gg/poe2/build-guides/${slug}`,
});

const commonSources: GuideLink[] = [
  { label: "Maxroll league-starter tier list", url: TIER },
  { label: "Maxroll ascendancy tier list", url: ASC_TIER },
  { label: "poe.ninja builds", url: NINJA },
  { label: "Maxroll build index", url: INDEX },
];

function gem(name: string, supports: string[] = []): LinkedGem {
  return { name, supports };
}

function group(label: string, detail: string, skills: LinkedGem[]): GemGroup {
  return { label, detail, skills };
}

const cap = "75% fire, 75% cold, and 75% lightning.";
const chaos = "Chaos resistance 30–50% in maps. 75% chaos is not the target.";

function slots(rows: Array<[string, string, string, string]>): GearStage[] {
  return rows.map(([slot, early, late, maps]) => ({ slot, early, late, maps }));
}

function row(slot: string, spec: ShopSpec, extra = ""): [string, string, string, string] {
  const [early, late, maps] = slotStage(slot, spec);
  return [slot, early, late, extra ? `${maps}\n${extra}` : maps];
}

const bowSpec: ShopSpec = { weaponNoun: "bow", defence: "evasion", speed: "attack speed" };
const spearSpec: ShopSpec = { weaponNoun: "spear", defence: "evasion", speed: "attack speed" };
const crossbowSpec: ShopSpec = { weaponNoun: "crossbow", defence: "armour and evasion", speed: "attack speed" };

function bowGear(extra: string, mapsExtra: string, more: Array<[string, string, string, string]> = []): GearStage[] {
  return slots([
    row("Bow", bowSpec, mapsExtra ? `${extra} ${mapsExtra}` : extra),
    row("Quiver", bowSpec),
    row("Body", bowSpec),
    row("Helmet", bowSpec),
    row("Gloves", bowSpec),
    row("Boots", bowSpec),
    row("Amulet", bowSpec, "Spirit on the amulet is +(30-33) while leveling and +(47-50) in maps. Quivers stay at +1 to Level of all Projectile Skills."),
    row("Rings", bowSpec, `${cap} ${chaos}`),
    row("Belt", bowSpec),
    ...more,
  ]);
}

function spearGear(): GearStage[] {
  return slots([
    row("Spear", spearSpec, "Mirage Archer reserves 60 spirit when that gem is on the bar."),
    row("Body", spearSpec),
    row("Helmet", spearSpec),
    row("Gloves", spearSpec),
    row("Boots", spearSpec),
    row("Amulet", spearSpec),
    row("Rings", spearSpec, `${cap} ${chaos}`),
    row("Belt", spearSpec),
  ]);
}

function crossbowGear(note: string): GearStage[] {
  return slots([
    row("Crossbow", crossbowSpec, note),
    row("Body", crossbowSpec),
    row("Helmet", crossbowSpec),
    row("Gloves", crossbowSpec),
    row("Boots", crossbowSpec),
    row("Amulet", crossbowSpec),
    row("Rings", crossbowSpec, `${cap} ${chaos}`),
    row("Belt", crossbowSpec),
  ]);
}

function armourGear(weapon: string, weaponMaps: string): GearStage[] {
  const spec: ShopSpec = { weaponNoun: weapon, defence: "armour", speed: "attack speed" };
  return slots([
    row("Weapon", spec, weaponMaps),
    row("Shield", spec),
    row("Body", spec),
    row("Helmet", spec),
    row("Gloves", spec),
    row("Boots", spec),
    row("Amulet", spec),
    row("Rings", spec, `${cap} ${chaos}`),
    row("Belt", spec),
  ]);
}

function esGear(weapon: string, weaponMaps: string): GearStage[] {
  const noun = weapon.includes("sceptre") ? "sceptre" : weapon.includes("wand") ? "wand" : weapon;
  const spec: ShopSpec = {
    weaponNoun: noun,
    defence: "energy shield",
    speed: noun === "quarterstaff" ? "attack speed" : "cast speed",
  };
  return slots([
    row("Weapon", spec, weaponMaps),
    row("Body", spec, "Chaos Inoculation waits until this build's own note says the energy shield can take a hit."),
    row("Helmet", spec),
    row("Gloves", spec),
    row("Boots", spec),
    row("Amulet", spec),
    row("Rings", spec, `${cap} ${chaos}`),
    row("Belt", spec),
  ]);
}

function loadout(parts: Loadout): Loadout {
  return parts;
}

const arrowSupports = ["Rapid Attacks II", "Elemental Armament I", "Lightning Attunement", "Innervate", "Execute I", "Deliberation"];
const tornadoSupports = ["Rapid Attacks II", "Elemental Armament I", "Lightning Attunement", "Innervate", "Execute I"];

function lightningArrow(): Loadout {
  return loadout({
    overview:
      "Shoot Lightning Rod into the pack, then Lightning Arrow into the rod. Tornado Shot sits in the pack so later arrows split. Barrage is the burst. Chaos Inoculation waits until the energy shield is actually large.",
    numbers: [
      cap,
      chaos,
      "Herald of Thunder and Wind Dancer each reserve 30 spirit. Turn them on only when that spirit is free.",
      "Skip Chaos Inoculation until the energy shield is high.",
      "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment.",
    ],
    ascendancy: ["Gathering Winds", "Point Blank", "Endless Munitions", "Mirage Deadeye"],
    groups: [
      group(
        "Main attacks",
        "Lightning Arrow takes the attack supports the 0.5.5 gem page allows. Mirage Deadeye does not accept that row, so it stays a button on its own. Barrage only accepts Deliberation from that list.",
        [gem("Lightning Arrow", arrowSupports), gem("Mirage Deadeye"), gem("Barrage", ["Deliberation"])],
      ),
      group(
        "Single target",
        "Lightning Rod takes the same attack supports. Tornado Shot does not accept Deliberation, so that one support stays off it.",
        [gem("Lightning Rod", arrowSupports), gem("Tornado Shot", tornadoSupports)],
      ),
      group("Mark", "Voltaic Mark takes the mark supports the gem page allows. Magnified Area is not one of them.", [
        gem("Voltaic Mark", ["Mark of Siphoning", "Prolonged Duration I"]),
      ]),
      group("Spirit", "Turn these on. They are not linked into the arrow.", [
        gem("Wind Dancer"),
        gem("Ghost Dance"),
        gem("Herald of Thunder"),
        gem("Rhoa Mount"),
      ]),
    ],
    rotation: [
      "Tornado Shot into the pack.",
      "Voltaic Mark on the rare or the boss.",
      "Stack Lightning Rods on that target.",
      "Barrage.",
      "Lightning Arrow into the rods.",
    ],
    leveling: [
      { levels: "1–14", text: "Lightning Arrow as soon as it drops. Freezing Salvo covers bosses until the rod is in the bar. Buy Rawhide Boots from Renly in Clearfell Encampment with 10% increased Movement Speed." },
      { levels: "15–30", text: "Lightning Rod in the pack, then Lightning Arrow. Take Gathering Winds at the first trial and use it for a whole zone." },
      { levels: "31–50", text: "Add Tornado Shot and Barrage. Socket Rapid Attacks II first, then one more support from the row at a time." },
      { levels: "Maps", text: "The full panel above. Chaos Inoculation only after the energy shield is high and the resistances are already at 75%." },
    ],
    gear: bowGear(
      "Added lightning is a bonus. Keep the physical damage rolls.",
      "A Greater Iron Rune in a weapon socket adds 18% increased Physical Damage.",
    ),
    sources: [guide("lightning-arrow-deadeye", "Maxroll Lightning Arrow Deadeye"), ...commonSources],
  });
}

function iceShot(spec: BuildSpec): Loadout {
  const deadeye = spec.ascendancyId === "deadeye";
  return loadout({
    overview: deadeye
      ? "Ice Shot is the clear, and it comes online at level 31. Before that, Escape Shot and Freezing Salvo freeze the pack. Snipe is only for a frozen boss. Put Ice Shot on weapon set I and Snipe on weapon set II."
      : "The Amazon Ice Shot page is the same cold bow: freeze, then Snipe the frozen boss, Ice Shot for the pack once the gem is level 31. The Deadeye page is where the button order is written out.",
    numbers: [
      cap,
      chaos,
      "Amulet: +levels to projectile skills, and at least 30 spirit.",
      "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment.",
    ],
    ascendancy: deadeye
      ? ["Point Blank", "Endless Munitions", "Gathering Winds", "Mirage Deadeye"]
      : [spec.ascendancyPick, "Then Penetrate or Elemental Surge. Use the first node for a whole zone before the second."],
    groups: [
      group("Clear", "Ice Shot is the main arrow from level 31. The Ice Shot page does not print a full support row under it, so this row stays the skill plus the cold-attack supports other cold pages do name: Ice Bite and Elemental Armament.", [
        gem("Ice Shot", ["Ice Bite I", "Elemental Armament I", "Rapid Attacks II"]),
      ]),
      group("Boss", "Snipe only while the boss is frozen. Barrage spends the frenzy charges Combat Frenzy built.", [
        gem("Snipe"),
        gem("Barrage"),
        gem("Freezing Salvo"),
        gem("Stormcaller Arrow"),
      ]),
      group("Utility", "Ice-Tipped Arrows stays on the bar. Blind is not a legal support for it on the 0.5.5 gem page, so it is not linked.", [
        gem("Ice-Tipped Arrows"),
        gem("Escape Shot"),
        gem("Tornado Shot"),
        gem("Frost Bomb"),
        gem("Freezing Mark"),
      ]),
      group("Spirit", "Auras from the Ice Shot page. Combat Frenzy feeds Barrage.", [
        gem("Herald of Ice"),
        gem("Wind Dancer"),
        gem("Combat Frenzy"),
        gem("Rhoa Mount"),
      ]),
    ],
    rotation: [
      "While clearing, Ice Shot the pack and keep walking. Escape Shot if something is on you. Aim it behind you to leap forward.",
      "On a boss, Tornado Shot between you and the boss.",
      "Freezing Mark, then Ice-Tipped Arrows.",
      "Ice Shot or Freezing Salvo until the boss freezes.",
      "Barrage, then Snipe. Snipe only on the freeze. The character glows when the timing is right.",
    ],
    leveling: [
      { levels: "1–13", text: "Bow Shot costs no mana and is the early clear. Frost Bomb for exposure. Escape Shot to freeze and make distance. Lightning Arrow finishes a pack. Stormcaller Arrow is the single-target shot until Snipe." },
      { levels: "14–30", text: "Add Freezing Salvo. Escape Shot plus Freezing Salvo on bosses. When the boss freezes, Snipe. Ice-Tipped Arrows on cooldown." },
      { levels: "31+", text: "Ice Shot joins the bar and takes the clear. Keep Snipe for frozen bosses. Quality on Ice Shot as soon as you can cut it." },
      { levels: "Maps", text: "Two bows and two quivers. Clear set: extra arrows and a Cadiro's Gambit, only after the bow already kills the pack. Boss set: flat damage, critical chance, gem levels. Attack speed and extra arrows do nothing on that second set." },
    ],
    gear: bowGear(
      "Cold damage on the bow is a bonus. Keep the physical damage rolls.",
      "A Greater Iron Rune in a weapon socket adds 18% increased Physical Damage. Clear bow: extra arrows after the physical rolls. Boss bow: flat damage, critical chance, and +4 to Level of all Projectile Skills.",
      [["Jewel", "Skip jewels until maps.", "Life or a resistance if one drops.", "One sapphire jewel with mana on kill. Rarity on gear to at least 100%."]],
    ),
    sources: [
      guide("ice-shot-deadeye-build-guide", "Maxroll Ice Shot Deadeye"),
      guide("ice-shot-amazon-build-guide", "Maxroll Ice Shot Amazon"),
      { label: "Mobalytics Fubgun Ice Shot Deadeye", url: FUBGUN },
      ...commonSources,
    ],
  });
}

function lightningSpear(): Loadout {
  return loadout({
    overview:
      "Lightning Spear clears. Storm Lance is the stake you throw or shoot into. Explosive Spear is the Act 1 button. Sniper's Mark goes on the rare. Mirage Archer reserves 60 spirit.",
    numbers: [
      cap,
      chaos,
      "Campaign spirit is 100. Mirage Archer reserves 60 spirit.",
      "Seaglass Spear requires level 51.",
      "Iron Rings in Act 1.",
      "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment.",
    ],
    ascendancy: [
      "Take the first Amazon node that adds a projectile or a frenzy tool, and use Lightning Spear for a whole zone before the next node.",
      "Lineage supports on the spear, when you own them: Garukhan's Resolve, Rakiata's Flow, Rigwald's Ferocity.",
    ],
    groups: [
      group(
        "Spear",
        "The Lightning Spear page says Lightning Spear and Storm Lance are linked to Lightning Attunement. The same gem panel also names these attack supports.",
        [
          gem("Lightning Spear", ["Lightning Attunement", "Rapid Attacks I", "Elemental Armament I", "Deliberation", "Multishot I"]),
          gem("Storm Lance", ["Lightning Attunement", "Rapid Attacks I", "Elemental Armament I", "Deliberation", "Multishot I"]),
        ],
      ),
      group("Grenade spear", "Explosive Spear uses the grenade supports named on that page.", [
        gem("Explosive Spear", ["Overabundance I", "Short Fuse I"]),
      ]),
      group("Mark and spirit", "Sniper's Mark takes Mark of Siphoning. Herald of Thunder takes Oisín's Oath once you have that lineage gem.", [
        gem("Sniper's Mark", ["Mark of Siphoning"]),
        gem("Herald of Thunder", ["Oisín's Oath", "Precision I"]),
        gem("Wind Dancer"),
        gem("Ghost Dance"),
        gem("Mirage Archer"),
      ]),
    ],
    rotation: [
      "Levels 1–5: Explosive Spear, Contagion, and Frost Bomb.",
      "From level 5: Lightning Spear. Parry or Disengage to build the frenzy the spear wants.",
      "From level 15: Sniper's Mark on the rare, Storm Lance in the pack, Lightning Spear into the lance.",
      "Maps: mark, lance, spear. Turn on Mirage Archer. It reserves 60 spirit. Eternal Rage can sit on a sceptre with Purity of Lightning, or you swap that spirit to Ghost Dance and Elemental Conflux.",
    ],
    leveling: [
      { levels: "1–4", text: "Explosive Spear into the pack. Contagion if it spreads. Frost Bomb on the boss." },
      { levels: "5–14", text: "Lightning Spear becomes the clear. Parry or Disengage for frenzy. Iron Rings. Movement-speed boots." },
      { levels: "15–50", text: "Sniper's Mark and Storm Lance. Seaglass Spear requires level 51." },
      { levels: "Maps", text: "Add the support row one gem at a time. Mirage Archer reserves 60 spirit." },
    ],
    gear: spearGear(),
    sources: [guide("lightning-spear-amazon", "Maxroll Lightning Spear Amazon"), ...commonSources],
  });
}

const twisterPanel = [
  "Blind II",
  "Magnified Area II",
  "Rage III",
  "Charge Profusion II",
  "Rapid Casting II",
  "Cooldown Recovery II",
  "Prolonged Duration II",
  "Retreat II",
  "Armour Break III",
  "Efficiency II",
];

function twister(spec: BuildSpec): Loadout {
  return loadout({
    overview:
      "Whirling Slash moves you and starts the twister. Twister plus Barrage is the clear. Ice-Tipped Arrows has to sit on weapon set II, or it does not convert Twister. No unique is required. Black Insignia is the cheap early piece. Hyrri's Ire is an endgame body, not a starter.",
    numbers: [
      cap,
      chaos,
      "Attributes enough to socket the gems. Put the rest into strength for life.",
      "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment.",
    ],
    ascendancy:
      spec.ascendancyId === "gemling-legionnaire"
        ? ["Take the Gemling node that raises the skill you are actually using. One node, then a whole zone, then the next."]
        : [spec.ascendancyPick],
    groups: [
      group("Weapon set I", "Move with Whirling Slash. Twister and Barrage are the damage. War Banner is the Dance with Death speed buff on this set.", [
        gem("Whirling Slash", ["Rapid Attacks III"]),
        gem("Twister", ["Elemental Armament II", "Ice Bite II", "Concentrated Area", "Projectile Acceleration III", "Rakiata's Flow"]),
        gem("Barrage", ["Deliberation"]),
        gem("War Banner"),
      ]),
      group("Weapon set II", "Ice-Tipped Arrows on set II. On set I it does not convert Twister.", [
        gem("Ice-Tipped Arrows"),
        gem("Spear Throw"),
        gem("Spear Stab"),
      ]),
      group("Mark and spirit", "Sniper's Mark uses the mark supports that showed on the Gemling panel.", [
        gem("Sniper's Mark", ["Eternal Mark", "Mark of Siphoning II"]),
        gem("Wind Dancer", ["Vitality I", "Precision I"]),
        gem("Purity of Ice"),
      ]),
      group(
        "Also on the Gemling panel",
        "These names are on the Gemling Twister engraving panel. The page does not label which skill each one is socketed in, so they are listed here instead of pinned to the wrong gem.",
        twisterPanel.map((name) => gem(name)),
      ),
    ],
    rotation: [
      "Whirling Slash to move into the pack.",
      "Twister through the pack, then Barrage.",
      "Ice-Tipped Arrows on weapon set II before the fight if you want the cold convert.",
      "Sniper's Mark on the rare, then the same two buttons.",
    ],
    leveling: [
      { levels: "1–14", text: "Whirling Slash and the first spear throw. Movement-speed boots." },
      { levels: "15–40", text: "Twister as soon as it drops. Barrage when you have the spirit or the socket." },
      { levels: "Maps", text: "Black Insignia if it is cheap. Hyrri's Ire only when a rare body has less evasion and life." },
    ],
    gear: spearGear(),
    sources: [
      guide("gemling-legionnaire-twister-build-guide", "Maxroll Gemling Twister"),
      guide("spirit-walker-twisters", "Maxroll Spirit Walker Twisters"),
      guide("twister-deadeye-build-guide", "Maxroll Twister Deadeye"),
      ...commonSources,
    ],
  });
}

function shieldWall(): Loadout {
  return loadout({
    overview:
      "Shield Wall is the clear and the cover. Shockwave Totem slams beside you. Herald of Ash picks up overkill. Lineage gems Ahn's Citadel and Kaom's Madness turn the walls into branching fissures later. They are not required to start.",
    numbers: [cap, chaos, "Life and armour on the shield and the chest. The mace is physical damage.", "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment."],
    ascendancy: [
      "Take the armour-break or block node after Shield Wall is already the button you press.",
      "Warbringer only: Warcaller's Bellow is an ascendancy notable, not a gem. It makes warcries explode corpses.",
    ],
    groups: [
      group("Wall", "The Shield Wall page links these supports to Shield Wall.", [
        gem("Shield Wall", ["Rapid Attacks II", "Fire Attunement", "Brutality II"]),
      ]),
      group("Totem", "Shockwave Totem takes Urgent Totems. Rapid Attacks is not a legal support on that totem.", [
        gem("Shockwave Totem", ["Urgent Totems I"]),
        gem("Boneshatter"),
      ]),
      group("Buffs", "Herald of Ash is the aura. Ahn's Citadel and Kaom's Madness are lineage supports, not buttons. Warcaller's Bellow is a Warbringer ascendancy notable, so it is not socketed here.", [
        gem("Herald of Ash"),
        gem("Ahn's Citadel"),
        gem("Kaom's Madness"),
      ]),
    ],
    rotation: [
      "Drop Shockwave Totem.",
      "Shield Wall across the pack.",
      "Boneshatter anything that is stunned.",
      "Step back. Replace the totem when it dies. Do not hold the wall in a slam.",
    ],
    leveling: [
      { levels: "1–14", text: "Socket the slam or Shield Wall, the gem you were given. Buy Rough Greaves from Renly in Clearfell Encampment with 10% increased Movement Speed." },
      { levels: "15+", text: "Shield Wall plus the totem. Add the supports in the order listed." },
      { levels: "Maps", text: "Ahn's Citadel and Kaom's Madness if you own them. A rare mace still beats a unique that hits for less." },
    ],
    gear: armourGear("mace", "Life and armour on the Splintered Tower Shield, then on the body."),
    sources: [guide("shield-wall-warbringer-build-guide", "Maxroll Shield Wall Warbringer"), ...commonSources],
  });
}

const grenadeSupports = ["Multishot I", "Elemental Armament I", "Magnified Area I", "Rapid Attacks I", "Fire Attunement", "Deliberation", "Short Fuse II"];

function grenades(): Loadout {
  return loadout({
    overview:
      "Throw a grenade and leave. Oil Grenade, Explosive Grenade, Cluster, Gas, and Flash are all on the bar. If Explosive Grenade is on cooldown, throw a different grenade. Grenades work from level 1.",
    numbers: [cap, chaos, "Fire resistance on the jewellery, because you are standing near the blast.", "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment. You reload while you walk."],
    ascendancy: ["Sorcery Ward first, so a bad grenade does not end the zone."],
    groups: [
      group(
        "Grenades",
        "The Oil Grenade Witchhunter panel names these supports. They are the grenade row. Short Fuse and Fire Attunement are the ones that change the explosion.",
        [
          gem("Oil Grenade", grenadeSupports),
          gem("Explosive Grenade", grenadeSupports),
          gem("Cluster Grenade", ["Short Fuse II", "Magnified Area I", "Fire Attunement"]),
          gem("Gas Grenade", ["Short Fuse II", "Fire Attunement"]),
          gem("Flash Grenade"),
        ],
      ),
      group("Spirit", "Herald of Ash for overkill. Wind Dancer while you walk out.", [gem("Herald of Ash"), gem("Wind Dancer")]),
    ],
    rotation: [
      "Oil the ground, or throw Explosive Grenade into the pack.",
      "If Explosive Grenade is on cooldown, throw Cluster, Gas, or Flash.",
      "Step away before it lands. Do not stand in the oil.",
    ],
    leveling: [
      { levels: "1–14", text: "Grenades from level 1. A crossbow with damage. Movement-speed boots." },
      { levels: "15+", text: "Add the second and third grenade. Socket Short Fuse, then Fire Attunement, then the rest one at a time." },
      { levels: "Maps", text: "The full row. A rare crossbow with added damage still matters, because grenades use it." },
    ],
    gear: crossbowGear("Added fire or physical damage, then reload speed."),
    sources: [guide("oil-grenade-witchhunter-build-guide", "Maxroll Oil Grenade Witchhunter"), ...commonSources],
  });
}

function permafrost(): Loadout {
  return loadout({
    overview: "Permafrost Bolts freeze the pack. Fragmentation Rounds explode the frozen ones. Grenades are for rares. Freezing Mark opens a boss.",
    numbers: [cap, chaos, "Movement speed on boots so you are not reloading in place."],
    ascendancy: ["Sorcery Ward or the culling node. One of them, for a whole zone, then the other."],
    groups: [
      group("Bolts", "Permafrost Bolts keeps Ice Bite and Elemental Armament. Fragmentation Rounds only keeps Close Combat. Concentrated Area, Multishot, and Magnified Area are not legal supports on that gem.", [
        gem("Permafrost Bolts", ["Ice Bite I", "Elemental Armament I"]),
        gem("Fragmentation Rounds", ["Close Combat II"]),
      ]),
      group("Setup", "Grenade, mark, and the two heralds.", [
        gem("Explosive Grenade"),
        gem("Freezing Mark"),
        gem("Herald of Ice"),
        gem("Herald of Ash"),
        gem("Wind Dancer"),
        gem("Swift Affliction I"),
      ]),
    ],
    rotation: [
      "Permafrost Bolts until the pack or the rare is frozen.",
      "Fragmentation Rounds into the frozen enemies.",
      "Explosive Grenade on a rare that did not freeze.",
      "On a boss: Freezing Mark, freeze with Permafrost Bolts, then Fragmentation Rounds.",
    ],
    leveling: [
      { levels: "1–20", text: "Permafrost Bolts as the clear. A grenade for anything that does not freeze." },
      { levels: "21+", text: "Fragmentation Rounds on frozen targets. Add the supports in the order written above." },
      { levels: "Maps", text: "Both heralds. Wind Dancer. Keep the crossbow's damage current." },
    ],
    gear: crossbowGear("Cold or physical damage, then reload."),
    sources: [guide("permafrost-bolt-witchhunter-build-guide", "Maxroll Permafrost Bolt Witchhunter"), ...commonSources],
  });
}

function supportingFire(): Loadout {
  return loadout({
    overview:
      "Level as a crossbow: Permafrost Bolts, then Fragmentation Rounds on frozen enemies. Supporting Fire arrives in Act 2 and becomes the build at level 36. That respec is about 21,700 gold. Save the gold. Supporting Fire linked with Fire Attunement ignites the Gas Arrow from the Skeletal Sniper command.",
    numbers: [
      cap,
      chaos,
      "Respec at level 36 costs about 21,700 gold.",
      "A level 16 Varnished Crossbow while you are still on bolts.",
      "One of each minion, unless a note below says otherwise.",
      "Uul-Netol's Embrace is a support gem, if you use it.",
    ],
    ascendancy: ["Take the Tactician node that buffs the attack you are using. After the swap, that attack is Supporting Fire."],
    groups: [
      group("Before level 36", "This is the campaign crossbow. Freeze, then fragment.", [
        gem("Permafrost Bolts", ["Ice Bite I", "Elemental Armament I"]),
        gem("Fragmentation Rounds"),
        gem("Frost Bomb"),
        gem("Freezing Mark"),
        gem("Herald of Ice"),
      ]),
      group("After level 36", "Supporting Fire with Fire Attunement ignites the sniper's Gas Arrow. Muster wants minions on the bar. Their damage is not the point, except the sniper early.", [
        gem("Supporting Fire", ["Fire Attunement"]),
        gem("Skeletal Sniper"),
        gem("Skeletal Arsonist", ["Brutus' Brain"]),
        gem("Skeletal Storm Mage"),
        gem("Wolf Pack", ["Infernal Legion I", "Amanamu's Tithe"]),
        gem("Skeletal Brute"),
      ]),
      group("Boss debuffs", "Keep these up for the whole fight. Pounce replaces Frost Bomb and Elemental Weakness in red maps.", [
        gem("Elemental Weakness"),
        gem("Frost Bomb"),
        gem("Her Declaration"),
        gem("Uul-Netol's Embrace"),
      ]),
    ],
    rotation: [
      "Before 36: Permafrost Bolts, Fragmentation Rounds on frozen rares, Frost Bomb, Freezing Mark on bosses.",
      "After 36: Supporting Fire every time it comes off cooldown. It clears packs by itself.",
      "Skeletal Sniper command on a tanky rare. The gas cloud ignites because of Fire Attunement.",
      "Boss: Elemental Weakness and Frost Bomb, Supporting Fire up, then the sniper command.",
    ],
    leveling: [
      { levels: "1–15", text: "Permafrost Bolts and a level 16 Varnished Crossbow. Movement-speed boots. Life and resistances." },
      { levels: "16–35", text: "Supporting Fire can be used as a bonus in Act 2, while you are still on the crossbow. Keep saving gold." },
      { levels: "36", text: "Respec into Supporting Fire. About 21,700 gold. One of each minion." },
      { levels: "Maps", text: "Skeletal Arsonist stays low level, from a level 5 or level 7 uncut, once Brutus' Brain is in. Her Declaration lets you swap the Brute for a Reaver." },
    ],
    gear: crossbowGear("After level 36 the crossbow matters less than the minion levels and your resistances. Before that, added damage and reload."),
    sources: [guide("supporting-fire-tactician-build-guide", "Maxroll Supporting Fire Tactician"), ...commonSources],
  });
}

function entangle(): Loadout {
  return loadout({
    overview:
      "Entangle roots the pack. You cast it, then the damage skill. Entwined Realities is what lets an Oracle take notables that sit next to keystones. The support row below is the one the Entangle page prints on Entangle.",
    numbers: [cap, chaos, "Enough mana regeneration that Entangle is not a flask. Clarity I, linked into Archmage, is the support that does that."],
    ascendancy: ["Entwined Realities, so the notables beside keystones are in range.", "Then the damage node you are already using. One at a time."],
    groups: [
      group("Entangle", "These are the supports the Entangle Oracle page puts on Entangle.", [
        gem("Entangle", ["Accelerated Growth II", "Branching Fissures II", "Rapid Casting II", "Prolonged Duration II", "Living Lightning II", "Considered Casting"]),
      ]),
      group("Curse and spirit", "Temporal Chains is the curse. Archmage is the spirit gem. Clarity I and Vitality I link into Archmage. They are supports, not buttons.", [
        gem("Temporal Chains"),
        gem("Archmage", ["Clarity I", "Vitality I"]),
        gem("Harmonic Remnants II"),
        gem("Remnant Potency I"),
      ]),
      group("Lineage", "Later supports, not campaign requirements. Blood Transfusion is a passive notable you anoint. It is not a gem, so it is not socketed.", [
        gem("Atalui's Bloodletting"),
        gem("Rakiata's Flow"),
      ]),
    ],
    rotation: [
      "Temporal Chains on the pack.",
      "Entangle.",
      "The damage spell or the fissure while they are rooted.",
      "Refresh Entangle when the root ends. Do not stand in the pack to cast it.",
    ],
    leveling: [
      { levels: "1–20", text: "Entangle as soon as it exists, plus whatever cold or chaos spell you already have. Life and armour." },
      { levels: "21+", text: "Add the support row from the top: Accelerated Growth, then Branching Fissures, then the rest." },
      { levels: "Maps", text: "Archmage when your mana pool can pay for it. Lineage gems when you own them." },
    ],
    gear: esGear("staff", "Spell damage or +gem levels. Cast speed second."),
    sources: [guide("entangle-oracle-build-guide", "Maxroll Entangle Oracle"), ...commonSources],
  });
}

function grimPillars(): Loadout {
  return loadout({
    overview:
      "Spell Totem casts Grim Pillars. Early Act 1 is Volcano, Frost Bomb, Contagion, and Essence Drain. Spell Cascade is not a legal support on Volcano, so it is not linked. Entangle comes next. The totems are the build after that.",
    numbers: [cap, chaos, "+levels to spell skills on the weapon or amulet."],
    ascendancy: ["Entwined Realities or the totem node the trial offers first. Use the totem for a zone before a second node."],
    groups: [
      group(
        "Totem",
        "Grim Pillars keeps the supports the 0.5.5 gem page allows: Rapid Casting, Lightning Attunement, Magnified Area, and Concentrated Area. Branching Fissures, Burgeon, and Living Lightning are not legal on this gem.",
        [gem("Grim Pillars", ["Rapid Casting I", "Lightning Attunement", "Magnified Area I", "Concentrated Area"]), gem("Spell Totem")],
      ),
      group("Act 1", "Use these before the totem gem exists.", [
        gem("Volcano"),
        gem("Frost Bomb"),
        gem("Contagion"),
        gem("Essence Drain"),
        gem("Entangle"),
      ]),
      group("Spirit", "Clarity I regenerates mana. It is a support, not a button. Link it into a persistent skill the gem says it supports. Grim Pillars itself does not accept it.", [gem("Clarity I")]),
    ],
    rotation: [
      "Drop Spell Totem so Grim Pillars starts.",
      "Entangle a pack that is walking out of the pillars.",
      "On a boss, Frost Bomb, then a fresh totem, then stay at the edge.",
      "Replace a dead totem before you cast anything else.",
    ],
    leveling: [
      { levels: "1–14", text: "Volcano, Frost Bomb, Contagion, and Essence Drain. Do not link Spell Cascade to Volcano." },
      { levels: "15–30", text: "Entangle, then Spell Totem and Grim Pillars as soon as both gems exist." },
      { levels: "Maps", text: "The support row, one gem at a time, in the order listed." },
    ],
    gear: esGear("staff", "+levels to spells, then spell damage. The totem uses your gem, so gem level is the weapon stat."),
    sources: [guide("grim-pillars-spell-totem-oracle-build-guide", "Maxroll Grim Pillars Oracle"), ...commonSources],
  });
}

function minions(spec: BuildSpec, page: GuideLink): Loadout {
  return loadout({
    overview: `${spec.name} summons, then commands. The socket row below is the one printed on the Disciple of Varashta minion guide. ${page.label} is this ascendancy's own page. +levels to minion skills on the gear is the stat that matters.`,
    numbers: [cap, chaos, "+levels to minion skills on the weapon, the amulet, or both.", "Spirit enough to keep the minions you actually use."],
    ascendancy: [spec.ascendancyPick, "One minion node. Use the command skill for a zone before you take another."],
    groups: [
      group("Minions", "Meat Shield on both skeletons. Elemental Army stays on the storm mage, which accepts it. The sniper does not, so it keeps Meat Shield and Pierce instead.", [
        gem("Skeletal Sniper", ["Meat Shield II", "Pierce III"]),
        gem("Skeletal Storm Mage", ["Meat Shield II", "Elemental Army"]),
      ]),
      group("Commands and djinn", "Volcano is how the Disciple page summons during the campaign. The djinn are one at a time.", [
        gem("Volcano", ["Rapid Casting II", "Overabundance II"]),
        gem("Kelari, the Tainted Sands"),
        gem("Ruzhan, the Blazing Sword"),
      ]),
      group("Marks", "Elemental Weakness and Freezing Mark, with the duration and cost supports from that panel.", [
        gem("Elemental Weakness", ["Prolonged Duration II", "Efficiency II"]),
        gem("Freezing Mark"),
        gem("Frost Bomb"),
      ]),
      group("Spirit", "Vitality I is a support, not a button. None of the minion skills on this bar accept it. Link it only into a persistent skill whose gem text says it supports that skill.", [gem("Vitality I")]),
    ],
    rotation: [
      "Summon. On the Disciple route that summon is Volcano, then the minion command.",
      "Command the sniper into the pack.",
      "Elemental Weakness on a rare. Freezing Mark on a boss.",
      "Refresh a dead minion before you start a new pack.",
    ],
    leveling: [
      { levels: "1–14", text: "Volcano and the first minion you are offered. Buy a Rattling Sceptre from Una in Clearfell Encampment and keep +1 to Level of all Minion Skills." },
      { levels: "15+", text: "Skeletal Sniper and the command. One support at a time, Meat Shield first." },
      { levels: "Maps", text: "The full rows. A higher minion level beats a new unique." },
    ],
    gear: esGear("wand or sceptre", "+levels to minion skills. Spell damage is second."),
    sources: [guide("disciple-of-varashta-minion-build-guide", "Maxroll Disciple of Varashta minions"), page, ...commonSources],
  });
}

function coc(spec: BuildSpec, page: GuideLink): Loadout {
  return loadout({
    overview:
      "Frostbolt freezes. Cast on Critical drops Comet when Frostbolt crits. Detonate the ice crystals. Chaos Inoculation is the defence on this page, after the energy shield is high. The same build is written for Disciple of Varashta, Oracle, and Stormweaver.",
    numbers: [cap, chaos, "Critical chance on the weapon so Cast on Critical actually fires.", "Energy shield high enough that CI does not leave you at one hit."],
    ascendancy: [spec.ascendancyPick],
    groups: [
      group("Trigger", "Cast on Critical is a meta gem, required level 14. This route uses it from level 31. Socket Frostbolt and Comet into it. It is not a support you link onto Frostbolt. Spell Cascade is not legal on Frostbolt. Overabundance is not legal on Comet.", [
        gem("Cast on Critical"),
        gem("Frostbolt", ["Rapid Casting I", "Ice Bite I"]),
        gem("Comet", ["Magnified Area I", "Spell Cascade"]),
      ]),
      group("Also on the bar", "The page names these as their own buttons.", [
        gem("Frost Wall"),
        gem("Cast on Elemental Ailment"),
        gem("Ice Nova"),
        gem("Frost Darts"),
        gem("Frost Bomb"),
        gem("Arctic Armour"),
        gem("Elemental Weakness"),
      ]),
    ],
    rotation: [
      "Frost Bomb and Elemental Weakness on the boss.",
      "Frostbolt. Comets fall when it crits.",
      "Detonate the ice crystals.",
      "Frost Wall if a slam is coming. Arctic Armour stays on.",
    ],
    leveling: [
      { levels: "1–30", text: "Frostbolt and Frost Bomb. Comet by hand on bosses until Cast on Critical exists." },
      { levels: "31+", text: "Socket Frostbolt and Comet into Cast on Critical. Cast on Critical is the meta gem, not a support." },
      { levels: "Maps", text: "CI when the shield can carry you. Add the remaining supports one at a time." },
    ],
    gear: esGear("wand", "Cold damage, critical chance, and +levels to cold spells."),
    sources: [page, guide("frostbolt-cast-on-crit-comet-disciple-of-varashta-build-guide", "Maxroll Frostbolt CoC Disciple"), ...commonSources],
  });
}

function arc(): Loadout {
  return loadout({
    overview:
      "Get a cold infusion, cast Flame Wall, cast Orb of Storms twice, then Arc. Arc can consume a Lightning Infusion to deal more damage and chain further. Frost Bomb wants Long Fuse and Prolonged Duration.",
    numbers: [
      cap,
      chaos,
      "Arc can consume a Lightning Infusion to deal more damage and chain further.",
    ],
    ascendancy: ["Shaper of Storms", "Constant Gale", "Strike Twice"],
    groups: [
      group("Spells", "Arc is the clear. Orb of Storms is the orb you cast twice. Flame Wall is the infusion setup.", [
        gem("Arc", ["Rapid Casting I"]),
        gem("Orb of Storms"),
        gem("Flame Wall"),
        gem("Frost Bomb", ["Long Fuse II", "Prolonged Duration II"]),
        gem("Elemental Weakness"),
      ]),
      group("Spirit", "Archmage when the mana pool can pay for it.", [gem("Archmage")]),
    ],
    rotation: [
      "Pick up a cold infusion.",
      "Flame Wall.",
      "Orb of Storms, then Orb of Storms again.",
      "Arc through the pack.",
      "Frost Bomb on a boss, and keep it down.",
    ],
    leveling: [
      { levels: "1–14", text: "Arc or Spark, plus Frost Bomb. Movement-speed boots. +16-20% to one resistance on each ring." },
      { levels: "15+", text: "The four-step order above. Long Fuse and Prolonged Duration on Frost Bomb." },
      { levels: "Maps", text: "Shaper of Storms first if you do not already have it. Archmage last." },
    ],
    gear: esGear("wand", "Lightning damage, cast speed, and +levels to lightning spells."),
    sources: [guide("arc-stormweaver-build-guide", "Maxroll Arc Stormweaver"), ...commonSources],
  });
}

function essenceDrain(spec: BuildSpec): Loadout {
  const drainFirst = spec.skill === "Essence Drain";
  return loadout({
    overview:
      "Contagion spreads. Essence Drain is the chaos projectile that rides that spread. The Lich page names Chain, Zenith, and Execute on the chaos hit. Temporal Chains and Flame Wall are on the bar. Skeletal Snipers and a Gas Arrow command are the minion buttons on that same page.",
    numbers: [cap, chaos, "Energy shield on the body and the helmet. A little life still helps while you are not on CI."],
    ascendancy: [spec.ascendancyPick],
    groups: [
      group("Chaos", "Cast Contagion first. Essence Drain second. Chain I, Zenith II, and Execute III are the supports that gem accepts.", [
        gem(drainFirst ? "Essence Drain" : "Contagion", drainFirst ? ["Chain I", "Zenith II", "Execute III"] : []),
        gem(drainFirst ? "Contagion" : "Essence Drain", drainFirst ? [] : ["Chain I", "Zenith II", "Execute III"]),
        gem("Temporal Chains"),
        gem("Flame Wall"),
      ]),
      group("Minion command", "The Lich page also keeps a sniper and a Gas Arrow command.", [gem("Skeletal Sniper"), gem("Gas Arrow")]),
    ],
    rotation: [
      "Contagion on the pack.",
      "Essence Drain so the damage spreads.",
      "Step behind cover. Recast only if the pack is not dying.",
      "On a boss, Temporal Chains, then keep the drain on the boss.",
    ],
    leveling: [
      { levels: "1–12", text: "Contagion and Essence Drain from the first town. Energy shield on the chest." },
      { levels: "13+", text: "Chain I on Essence Drain first, then Zenith II, then Execute III." },
      { levels: "Maps", text: "Temporal Chains and the sniper. Do not add a third damage spell." },
    ],
    gear: esGear("wand", "Chaos damage or +levels to chaos spells."),
    sources: [guide("essence-drain-lich-build-guide", "Maxroll Essence Drain Lich"), ...commonSources],
  });
}

function whirling(): Loadout {
  return loadout({
    overview:
      "Whirling Assault covers the screen. Herald of Ash adds clear. Tempest Bell and Storm Wave are the extra hits. Hollow Palm is the early weapon. Swap off it when a real staff is better. Lineage gems come later.",
    numbers: [cap, chaos, "Life and evasion or armour. You are in the pack.", "Cooldown recovery if you are also dropping bells."],
    ascendancy: ["The first Martial Artist node that buffs the assault. Use it for a zone before a second node."],
    groups: [
      group("Attacks", "Whirling Assault is the walk. Storm Wave and the bell are the extras the page names.", [
        gem("Whirling Assault", ["Rapid Attacks II"]),
        gem("Storm Wave"),
        gem("Tempest Bell"),
        gem("Freezing Mark"),
      ]),
      group("Spirit", "Wind Dancer, Ghost Dance, Blind, and Life Leech are the defensive row on that page.", [
        gem("Herald of Ash"),
        gem("Wind Dancer"),
        gem("Ghost Dance"),
        gem("Blind II"),
        gem("Life Leech III"),
      ]),
      group("Lineage", "Atalui's Bloodletting, Garukhan's Resolve, and Rakiata's Flow when you own them.", [
        gem("Atalui's Bloodletting"),
        gem("Garukhan's Resolve"),
        gem("Rakiata's Flow"),
      ]),
    ],
    rotation: [
      "Walk Whirling Assault through the pack.",
      "Drop Tempest Bell and hit it if a rare is standing in it.",
      "Freezing Mark on a boss, then the assault.",
      "Herald of Ash stays on.",
    ],
    leveling: [
      { levels: "1–20", text: "Hollow Palm, then Whirling Assault. Life on the chest." },
      { levels: "21+", text: "Herald of Ash, the bell, Storm Wave. Swap the palm for a staff when the staff's damage is higher." },
      { levels: "Maps", text: "The lineage gems. Ghost Dance if you have the spirit." },
    ],
    gear: armourGear("quarterstaff", "Attack speed and physical or elemental damage. Hollow Palm only while it still kills faster than a staff."),
    sources: [guide("whirling-assault-martial-artist-build-guide", "Maxroll Whirling Assault"), ...commonSources],
  });
}

function hollowForm(): Loadout {
  return loadout({
    overview:
      "Tap Hollow Form. The copies finish Whirling Assault. Ice Strike hits the Tempest Bell. Chaos Inoculation is a later swap, after the energy shield is high. Hollow Form Whirling Assault is an S-tier Martial Artist build on the October 5, 2026 league-starter list.",
    numbers: [cap, chaos, "CI only after the energy shield can take a hit.", "Cooldown recovery so Hollow Form is up often."],
    ascendancy: ["The Hollow Form node first. Then a damage node, after the form is the button you actually press."],
    groups: [
      group("Form", "Hollow Form does not accept Cooldown Recovery on the 0.5.5 gem page. Get that stat on gear. The cold-attack supports stay on the hits.", [
        gem("Hollow Form"),
        gem("Whirling Assault", ["Concentrated Area", "Rage I", "Ice Bite I", "Elemental Armament I", "Magnified Area I"]),
        gem("Ice Strike", ["Ice Bite I", "Elemental Armament I"]),
        gem("Tempest Bell"),
      ]),
      group("Spirit and mark", "Herald of Ice, Ghost Dance, and Freezing Mark.", [
        gem("Herald of Ice"),
        gem("Ghost Dance"),
        gem("Freezing Mark"),
      ]),
    ],
    rotation: [
      "Tap Hollow Form.",
      "Let the copies finish Whirling Assault through the pack.",
      "Drop Tempest Bell and Ice Strike the bell.",
      "Freezing Mark on a boss before the form.",
    ],
    leveling: [
      { levels: "1–20", text: "Ice Strike and the bell. Life and a resistance on every piece." },
      { levels: "21+", text: "Hollow Form and Whirling Assault. Cooldown recovery comes from gear, not from a support on the form." },
      { levels: "Maps", text: "CI when the shield is ready. Ghost Dance with it." },
    ],
    gear: esGear("quarterstaff", "Cold damage and attack speed. Energy shield on the body once you are near CI."),
    sources: [guide("hollow-form-whirling-assault-martial-artist-build-guide", "Maxroll Hollow Form Whirling Assault"), ...commonSources],
  });
}

function oilBarrage(): Loadout {
  return loadout({
    overview:
      "Oil Barrage spends power charges and fires chaining, forking, nova projectiles across the screen. Early clear is Frozen Locus detonated by the large spike of Glacial Cascade. Herald of Ice at level 10. Hollow Focus spawns bells. Cooldown recovery is mandatory on that bell, because it is how often the bell appears. A body with +(47-50) to Spirit is what the mapping Blasphemy setup asks for.",
    numbers: [
      cap,
      chaos,
      "Cooldown recovery on gear. Hollow Focus bells spawn faster with it.",
      "Body armour with +(47-50) to Spirit for the mapping Blasphemy setup.",
      "Amor Mandragora in Act 1. Changeling Talisman is the level 38 craft made from it.",
    ],
    ascendancy: ["The Martial Artist node that feeds charges or the barrage. One node, then a zone on Oil Barrage, then the next."],
    groups: [
      group("Early", "Glacial Cascade's large spike is the detonation. Place Frozen Locus and hit it from range with that spike.", [
        gem("Glacial Cascade"),
        gem("Frozen Locus"),
        gem("Herald of Ice"),
        gem("Frost Bomb"),
      ]),
      group("Barrage", "Oil Barrage is the mapper and the single-target hit. Devour builds charges off bells and corpses. Rend is the extra damage.", [
        gem("Oil Barrage"),
        gem("Devour"),
        gem("Rend"),
        gem("Hollow Focus", ["Cooldown Recovery I"]),
        gem("Whirling Assault"),
        gem("Tempest Bell"),
      ]),
      group("Charges and marks", "Blasphemy is the curse. It reserves spirit. Repulsion, Living Lightning, Culmination, and Ailith's Chimes are not legal supports on it. Freezing Mark is the mark.", [
        gem("Blasphemy"),
        gem("Freezing Mark"),
        gem("Hand of Chayula"),
        gem("Refutation"),
      ]),
    ],
    rotation: [
      "Early: place Frozen Locus, detonate it with the large spike at the end of Glacial Cascade.",
      "Frost Bomb as a boss spawns.",
      "Maps: Hollow Focus bell, Devour for a power charge, Oil Barrage.",
      "Whirling Assault to plant a Tempest Bell when you want more chains.",
      "Hand of Chayula or Refutation on a boss, then the barrage.",
    ],
    leveling: [
      { levels: "1–9", text: "Glacial Cascade and Frozen Locus. Amor Mandragora. The large spike has to be what hits the locus." },
      { levels: "10–30", text: "Herald of Ice. Freezing Mark on bosses." },
      { levels: "31+", text: "Oil Barrage, Hollow Focus, Devour. Cooldown recovery on the focus." },
      { levels: "Maps", text: "Optional Blasphemy setup. It costs a gem socket and wants +(47-50) to Spirit on the body. Repulsion is not a legal support on Blasphemy." },
    ],
    gear: armourGear("quarterstaff", "Critical chance or power charge on hit once Oil Barrage is the skill. Cooldown recovery on a suffix."),
    sources: [guide("oil-barrage-martial-artist-build-guide", "Maxroll Oil Barrage"), ...commonSources],
  });
}

function spiralVolley(spec: BuildSpec): Loadout {
  return loadout({
    overview:
      "Level with Lightning Arrow and Lightning Rod. At level 54, with Resonance allocated, swap the clear to Spiral Volley. The page says the build does not work without Resonance and without the supports in Spiral Volley. Snipe linked to Perfected Endurance is the button when you have no frenzy charges. The bow needs physical damage, because only physical damage breaks armour.",
    numbers: [
      cap,
      chaos,
      "Do not swap to Spiral Volley before level 54 and Resonance.",
      "Physical damage on the bow so Armour Break can break armour.",
      "A life flask with instant recovery, or a belt with that implicit, if sprint knocks you down.",
    ],
    ascendancy:
      spec.ascendancyId === "deadeye"
        ? ["Gathering Winds", "Point Blank", "Endless Munitions"]
        : [spec.ascendancyPick, "Pathfinder poison cap is the reason to play the poison version. The charge rules below are from the Deadeye Spiral Volley page."],
    groups: [
      group("Until 54", "Lightning Arrow and Lightning Rod, the same idea as the lightning bow: rods, then the arrow.", [
        gem("Lightning Arrow", ["Rapid Attacks II", "Lightning Attunement"]),
        gem("Lightning Rod"),
        gem("Freezing Salvo"),
      ]),
      group("From 54", "Snipe is linked to Perfected Endurance. Armour Break and Enduring Impact are how the page says the frenzy charges come back, through Resonance.", [
        gem("Spiral Volley", ["Armour Break III", "Enduring Impact II"]),
        gem("Snipe", ["Perfected Endurance"]),
      ]),
      group("Spirit", "Herald of Thunder, Wind Dancer, and a Tame Beast companion with a Haste aura. Ghost Dance only after the endgame energy-shield swap. Charge Regulation with Charge Profusion.", [
        gem("Herald of Thunder"),
        gem("Wind Dancer"),
        gem("Tame Beast"),
        gem("Charge Regulation"),
        gem("Charge Profusion II"),
        gem("Ghost Dance"),
      ]),
    ],
    rotation: [
      "Before 54: Lightning Rods, then Lightning Arrow. A few rods if the damage is low. Up to 10 rods on a boss.",
      "Snipe with Perfected Endurance when you have no frenzy charges.",
      "Spiral Volley only when several monsters are there, so the spent frenzy charge can come back.",
      "Armour Break can grant the charge through Resonance. Enduring Impact can grant one when you heavy-stun.",
      "Once the bow is strong, Spiral Volley itself stuns white monsters and you need Snipe less.",
    ],
    leveling: [
      { levels: "1–53", text: "Play Lightning Arrow. Do not force Spiral Volley early." },
      { levels: "54", text: "Allocate Resonance. Socket the supports. Swap the clear to Spiral Volley." },
      { levels: "Maps", text: "Tame Beast with Haste. Ghost Dance after the energy-shield gear exists." },
    ],
    gear: bowGear(
      "Keep a physical damage roll for armour break.",
      "Physical damage plus one elemental damage roll. Extra arrows help Lightning Arrow, then the volley.",
    ),
    sources: [
      guide("spiral-volley-deadeye-build-guide", "Maxroll Spiral Volley Deadeye"),
      guide("spiral-volley-poison-pathfinder", "Maxroll Spiral Volley Poison Pathfinder"),
      ...commonSources,
    ],
  });
}

function poisonburst(): Loadout {
  return loadout({
    overview:
      "Poisonburst Arrow is the hit. Gas Arrow is the cloud. Vine Arrow and Herald of Plague spread it. Pathfinder doubles the poison limit and the sprint does not heavy-stun you, which is why this is the move-speed bow. The Pathfinder page names the skills below. It does not print a support-by-support row, so no extra supports are invented here.",
    numbers: [
      cap,
      chaos,
      "Poison limit is the Pathfinder stat. Do not build a second poison skill that ignores it.",
      "Attack speed and poison duration on the tree, plus attack damage.",
    ],
    ascendancy: ["The poison node first. Then the flask or movement node. The poison has to be on the bar before the second node matters."],
    groups: [
      group("Poison", "The skills the Poisonburst Pathfinder page names.", [
        gem("Poisonburst Arrow"),
        gem("Gas Arrow"),
        gem("Vine Arrow"),
        gem("Herald of Plague"),
        gem("Bursting Plague"),
        gem("Temporal Chains"),
      ]),
      group("Early and defence", "Lightning Arrow and Lightning Rod early. Frost Bomb, Ghost Dance, and Wind Dancer are also on that page.", [
        gem("Lightning Arrow"),
        gem("Lightning Rod"),
        gem("Frost Bomb"),
        gem("Ghost Dance"),
        gem("Wind Dancer"),
      ]),
    ],
    rotation: [
      "Gas Arrow into the pack.",
      "Poisonburst Arrow through the cloud.",
      "Walk. Kills proliferate and explode. Do not stand and shoot a single target unless it is a rare.",
      "Temporal Chains on a boss, then the same two arrows. Vine Arrow if the boss walks out.",
    ],
    leveling: [
      { levels: "1–14", text: "Lightning Arrow and Lightning Rod until Poisonburst is the stronger clear." },
      { levels: "15+", text: "Poisonburst, Gas Arrow, Herald of Plague. Movement-speed boots." },
      { levels: "Maps", text: "Vine Arrow and Bursting Plague. The tree wants attack damage, poison duration, and bow attack speed." },
    ],
    gear: bowGear(
      "Physical or chaos damage, then attack speed. Poison duration is a bonus suffix.",
      "Poison duration and attack speed. A unique with neither of those rolls stays in the stash.",
    ),
    sources: [guide("poisonburst-arrow-pathfinder", "Maxroll Poisonburst Pathfinder"), ...commonSources],
  });
}

function boneshatter(): Loadout {
  return loadout({
    overview: "Leap Slam primes a stun. Boneshatter spends it. The hammer follow-up is the third hit. The Boneshatter page describes that order and does not print a support row, so the supports stay empty rather than guessed.",
    numbers: [cap, chaos, "Armour and life. Stun is the defence and the damage setup.", "Movement speed on boots so Leap Slam is not your only movement."],
    ascendancy: ["A Titan stun or armour node after Boneshatter is already stunning a rare."],
    groups: [
      group("Hits", "Leap Slam, then Boneshatter, then the hammer follow-up.", [
        gem("Leap Slam"),
        gem("Boneshatter", ["Rapid Attacks II"]),
        gem("Rolling Slam"),
      ]),
    ],
    rotation: ["Leap Slam onto the pack.", "Boneshatter the stunned enemy.", "The hammer follow-up.", "Step out. Do not Boneshatter a target that is not stunned."],
    leveling: [
      { levels: "1–14", text: "Rolling Slam or Leap Slam. Armour on the chest." },
      { levels: "15+", text: "Boneshatter on stunned rares. Rapid Attacks II in it when the gem says it supports the attack." },
      { levels: "Maps", text: "A higher physical mace. Life on every armour piece." },
    ],
    gear: armourGear("mace", "Physical damage and stun. Attack speed second."),
    sources: [guide("boneshatter-titan-leveling-guide", "Maxroll Boneshatter Titan"), ...commonSources],
  });
}

function rake(): Loadout {
  return loadout({
    overview: "Rake from Act 1. Dash in, apply the bleed, dash out. Herald of Blood explodes the kill. Blood Hunt is the follow-up on an enemy that is already bleeding. The bleed page does not print a full support row.",
    numbers: [cap, chaos, "Physical damage on the spear. Bleed needs a hit that is physical.", "Movement speed on boots. The build is the dash."],
    ascendancy: ["An Amazon node that helps the spear or the bleed, after Rake is already the clear."],
    groups: [
      group("Bleed", "Rake, then Blood Hunt, with Herald of Blood.", [
        gem("Rake", ["Rapid Attacks II"]),
        gem("Blood Hunt"),
        gem("Herald of Blood"),
      ]),
    ],
    rotation: ["Dash in with Rake.", "Blood Hunt on the bleeding rare.", "Dash out. Herald of Blood does the explosion.", "Do not stand in the pack after the bleed is on."],
    leveling: [
      { levels: "1–14", text: "Rake as soon as it drops. A spear with physical damage." },
      { levels: "15+", text: "Herald of Blood and Blood Hunt." },
      { levels: "Maps", text: "A faster spear if the dash feels slow. Life and evasion on the chest." },
    ],
    gear: spearGear(),
    sources: [guide("bleed-rake-amazon-build-guide", "Maxroll Bleed Rake Amazon"), ...commonSources],
  });
}

function walkingCalamity(): Loadout {
  return loadout({
    overview:
      "Walking Calamity builds glory from rage, at maximum rage, and drops meteors while you walk. Herald of Ice, Volcano, Shockwave Totem, Entangle, and Frost Bomb are the other buttons on that page. It is the balanced Shaman: tank, clear, and single target, not a one-button mapper.",
    numbers: [cap, chaos, "Rage on the tree or the weapon so you actually sit at maximum rage.", "Life and armour. You walk through the meteors."],
    ascendancy: ["Take Maximum Rage. It is on the Shaman panel."],
    groups: [
      group("Calamity", "The skills the Walking Calamity page names.", [
        gem("Walking Calamity"),
        gem("Herald of Ice"),
        gem("Volcano"),
        gem("Shockwave Totem", ["Urgent Totems I"]),
        gem("Entangle"),
        gem("Frost Bomb"),
        gem("Garukhan's Resolve"),
      ]),
    ],
    rotation: [
      "Reach maximum rage.",
      "Walk. Meteors fall.",
      "Volcano and Shockwave Totem on a rare that the meteors are not killing.",
      "Entangle anything that walks out. Frost Bomb on a boss.",
    ],
    leveling: [
      { levels: "1–20", text: "Volcano and Entangle until Walking Calamity exists. Armour and life." },
      { levels: "21+", text: "Walking Calamity. Stay at max rage. Herald of Ice." },
      { levels: "Maps", text: "The totem and Garukhan's Resolve. Do not drop the life rolls for damage." },
    ],
    gear: armourGear("staff", "Physical damage and a rage roll if the staff has one. Life on the armour."),
    sources: [guide("walking-calamity-shaman-build-guide", "Maxroll Walking Calamity Shaman"), ...commonSources],
  });
}

function glacialLance(): Loadout {
  return loadout({
    overview:
      "Glacial Lance is the cold spear or bow clear on the Deadeye and Amazon pages. Freeze the pack, then the lance. Snipe or a second throw on a frozen boss. Cold-attack supports here are Ice Bite and Elemental Armament, which the Permafrost and Hollow Form pages name on cold hits. The Glacial Lance page is the route.",
    numbers: [cap, chaos, "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment.", "Cold or physical damage on the weapon."],
    ascendancy:
      ["Point Blank or the extra projectile, then Gathering Winds. One node for a zone before the next."],
    groups: [
      group("Lance", "Glacial Lance with the cold-attack supports those other cold pages print.", [
        gem("Glacial Lance", ["Ice Bite I", "Elemental Armament I", "Rapid Attacks II"]),
        gem("Snipe"),
        gem("Herald of Ice"),
        gem("Freezing Mark"),
        gem("Escape Shot"),
      ]),
    ],
    rotation: ["Glacial Lance through the pack.", "Freezing Mark on a boss.", "Snipe or a second lance once it is frozen.", "Escape Shot if the boss closes."],
    leveling: [
      { levels: "1–14", text: "The first cold projectile you have, plus Escape Shot. Movement-speed boots." },
      { levels: "15+", text: "Glacial Lance. Herald of Ice. Ice Bite in the lance." },
      { levels: "Maps", text: "The same 75% resistance rule as the other cold bows." },
    ],
    gear: spearGear(),
    sources: [guide("glacial-lance-deadeye", "Maxroll Glacial Lance Deadeye"), ...commonSources],
  });
}

function generic(spec: BuildSpec): Loadout {
  const support = spec.support.startsWith("a support") || spec.support.startsWith("one ") ? [] : [spec.support];
  const defence = spec.defence.includes("energy")
    ? esGear(spec.weaponNoun, spec.weaponStat)
    : spec.weaponNoun.includes("bow")
      ? bowGear(spec.weaponStat, spec.weaponStat)
      : spec.weaponNoun.includes("crossbow")
        ? crossbowGear(spec.weaponStat)
        : spec.weaponNoun.includes("spear")
          ? spearGear()
          : armourGear(spec.weaponNoun, spec.weaponStat);
  return loadout({
    overview: `${spec.summary} The October 5, 2026 league-starter list does not print a separate support row for this exact pairing, so the skill tab shows the gems this route actually names and nothing invented beside them.`,
    numbers: [cap, chaos, "10% increased Movement Speed on the level 1 boots from Renly in Clearfell Encampment.", "Life on the body before a damage unique."],
    ascendancy: [spec.ascendancyPick],
    groups: [
      group("Main", `${spec.skill} is the button. ${spec.helper} is the second button.`, [
        gem(spec.skill, support),
        gem(spec.helper),
      ]),
    ],
    rotation: [spec.pack, spec.boss],
    leveling: [
      { levels: "1–14", text: `Put ${spec.skill} on the bar as soon as it drops. ${spec.helper} waits for a second skill gem. Buy boots from Renly in Clearfell Encampment with 10% increased Movement Speed. The level 1 base is Rawhide Boots, Rough Greaves, or Straw Sandals, matching the defence on the gear card.` },
      { levels: "15–40", text: spec.ascendancyPick },
      { levels: "41+", text: spec.focus },
    ],
    gear: defence,
    sources: commonSources,
  });
}

const byId: Record<string, (spec: BuildSpec) => Loadout> = {
  "deadeye-lightning-arrow": lightningArrow,
  "deadeye-ice-shot": iceShot,
  "amazon-ice-shot": iceShot,
  "deadeye-spiral-volley": spiralVolley,
  "pathfinder-spiral-volley": spiralVolley,
  "amazon-lightning-spear": lightningSpear,
  "spirit-walker-lightning-spear": lightningSpear,
  "ritualist-lightning-spear": lightningSpear,
  "gemling-twister": twister,
  "spirit-walker-twister": twister,
  "amazon-twister": twister,
  "deadeye-twister": twister,
  "warbringer-shield-wall": shieldWall,
  "titan-shield-wall": shieldWall,
  "witchhunter-grenades": grenades,
  "witchhunter-oil-grenade": grenades,
  "tactician-grenades": grenades,
  "gemling-grenades": grenades,
  "witchhunter-permafrost": permafrost,
  "tactician-supporting-fire": supportingFire,
  "oracle-entangle": entangle,
  "oracle-grim-pillars": grimPillars,
  "stormweaver-arc": arc,
  "lich-plants": essenceDrain,
  "oracle-plants": essenceDrain,
  "blood-mage-essence-drain": essenceDrain,
  "martial-artist-whirling": whirling,
  "martial-artist-hollow-form": hollowForm,
  "martial-artist-oil-barrage": oilBarrage,
  "pathfinder-poisonburst": poisonburst,
  "acolyte-poisonburst": poisonburst,
  "titan-boneshatter": boneshatter,
  "amazon-rake": rake,
  "ritualist-rake": rake,
  "ritualist-blood-hunt": rake,
  "shaman-walking-calamity": walkingCalamity,
  "deadeye-glacial-lance": glacialLance,
  "amazon-glacial-lance": glacialLance,
  "disciple-minions": (spec) => minions(spec, guide("disciple-of-varashta-minion-build-guide", "Maxroll Disciple minions")),
  "spirit-walker-minions": (spec) => minions(spec, guide("minion-army-spirit-walker-build-guide", "Maxroll Spirit Walker minion army")),
  "acolyte-minions": (spec) => minions(spec, guide("minion-army-acolyte-of-chayula-build-guide", "Maxroll Acolyte minion army")),
  "infernalist-minions": (spec) => minions(spec, guide("minion-army-infernalist-build-guide", "Maxroll Infernalist minion army")),
  "lich-infernal-legion": (spec) =>
    loadout({
      ...minions(spec, guide("infernal-legion-lich-build-guide", "Maxroll Infernal Legion Lich")),
      overview:
        "Infernal Legion Lich is a B-tier build on the October 5, 2026 tier list. Infernal Legion goes on a minion you expect to die. The command pattern and the other sockets are the minion row from the Disciple page, which prints them in full. Read the lich page for the ascendancy node.",
      groups: [
        group("Minions", "Infernal Legion on the minion that is allowed to burn. Meat Shield stays on the sniper. Elemental Army is not a legal support on that gem.", [
          gem("Skeletal Sniper", ["Infernal Legion I", "Meat Shield II"]),
          gem("Skeletal Arsonist", ["Brutus' Brain"]),
        ]),
        ...minions(spec, guide("infernal-legion-lich-build-guide", "Maxroll Infernal Legion Lich")).groups.slice(1),
      ],
    }),
  "disciple-frostbolt-coc": (spec) => coc(spec, guide("frostbolt-cast-on-crit-comet-disciple-of-varashta-build-guide", "Maxroll Frostbolt CoC Disciple")),
  "oracle-frostbolt-coc": (spec) => coc(spec, guide("frostbolt-cast-on-crit-comet-oracle", "Maxroll Frostbolt CoC Oracle")),
  "stormweaver-frostbolt-coc": (spec) =>
    coc(spec, guide("frostbolt-cast-on-crit-comet-stormweaver-endgame-build-guide", "Maxroll Frostbolt CoC Stormweaver")),
  "shaman-demon-calamity": (spec) =>
    loadout({
      ...walkingCalamity(),
      overview:
        "Demon Calamity is the bear-side Shaman page: you are in the form, and the calamity does the ranged part. Maul and Furious Slam are the melee buttons. The meteor and totem list is the Walking Calamity page, which is the other Shaman starter.",
      groups: [
        group("Bear", "Maul and Furious Slam while the form is up.", [gem("Maul", ["Rapid Attacks II"]), gem("Furious Slam"), gem("Walking Calamity"), gem("Herald of Ice")]),
        ...walkingCalamity().groups,
      ],
      sources: [guide("demon-calamity-bear-shaman-build-guide", "Maxroll Demon Calamity Bear"), ...commonSources],
      ascendancy: [spec.ascendancyPick],
    }),
  "gemling-spark-comet": (spec) => {
    const base = coc(spec, guide("spark-comet-gemling-legionnaire-build-guide", "Maxroll Spark Comet Gemling"));
    return {
      ...base,
      overview:
        "Spark fills the room. Comet falls when the cast crits. The trigger supports are the ones printed on the Disciple Frostbolt Cast on Critical page, which is the page that lists them. The Gemling page is this ascendancy's route.",
      groups: [
        group("Trigger", "Cast on Critical is the meta gem. Socket Spark and Comet into it. Rapid Casting I stays on Spark. Spell Cascade is legal on Comet, not on Spark.", [
          gem("Cast on Critical"),
          gem("Spark", ["Rapid Casting I"]),
          gem("Comet", ["Magnified Area I", "Spell Cascade"]),
        ]),
        ...base.groups.slice(1),
      ],
    };
  },
  "warbringer-shockwave": () =>
    loadout({
      ...shieldWall(),
      overview:
        "Shockwave Totem is the slam, with Urgent Totems and Rapid Attacks, which is the totem row on the Shield Wall page. Shield Wall is the cover. This is the totem-first Warbringer, using that printed link.",
      ascendancy: ["Ancestral or armour-break node, after the totem is already down in every pack."],
    }),
  "smith-earthquake": (spec) =>
    loadout({
      ...boneshatter(),
      overview:
        "The October 5, 2026 tier list does not print a Smith of Kitava starter. Earthquake is the slam: drop it, walk off the burst. Keep a normal body with life and armour if you took a Smith body node. A unique chest turns that node off.",
      groups: [group("Slam", "Earthquake, then a strike to finish.", [gem("Earthquake", ["Rapid Attacks II"]), gem("Perfect Strike")])],
      sources: commonSources,
      ascendancy: [spec.ascendancyPick],
    }),
  "invoker-tempest-bell": () =>
    loadout({
      ...hollowForm(),
      overview:
        "The October 5, 2026 list's Invoker starter is Ice Strike, which is already a route on this ascendancy. This fifth route is the bell: drop Tempest Bell, Ice Strike the bell, the wave covers the pack. The support names are the cold-attack supports the Hollow Form page prints on Ice Strike.",
      groups: [
        group("Bell", "Ice Strike uses Ice Bite and Elemental Armament.", [
          gem("Tempest Bell"),
          gem("Ice Strike", ["Ice Bite I", "Elemental Armament I", "Rapid Attacks II"]),
          gem("Freezing Mark"),
          gem("Herald of Ice"),
        ]),
      ],
      sources: [guide("hollow-form-whirling-assault-martial-artist-build-guide", "Maxroll Hollow Form, for the bell and Ice Strike links"), ...commonSources],
    }),
  "blood-mage-dark-effigy": (spec) =>
    loadout({
      ...essenceDrain(spec),
      overview:
        "The Maxroll index does not publish a fifth Blood Mage starter. Dark Effigy is the totem the chaos pages drop on cursed enemies. Contagion, then Essence Drain, then the totem. Chain, Zenith, and Execute are the Essence Drain Lich supports.",
      groups: [
        ...essenceDrain(spec).groups,
        group("Totem", "Drop Dark Effigy after the curse is on the pack.", [gem("Dark Effigy")]),
      ],
    }),
  "chronomancer-arctic-armour": (spec) =>
    loadout({
      overview:
        "Chronomancer is in D tier on the September 19, 2026 ascendancy tier list and has no league-starter page of its own. Arctic Armour is the guard. Frostbolt clears. Comet is the boss hit. Time Freeze is for a boss wind-up, not a white pack. Temporal Rift is the undo after you already took the hit.",
      numbers: [cap, chaos, "Energy shield and life, because Temporal Rift gives back what you had a moment ago."],
      ascendancy: ["Time Freeze, and spend it on bosses.", "Temporal Rift second, for a mistake you already made."],
      groups: [
        group("Cold", "Frostbolt with Rapid Casting I. Comet on the boss. Arctic Armour stays on.", [
          gem("Frostbolt", ["Rapid Casting I"]),
          gem("Comet"),
          gem("Arctic Armour"),
          gem("Frost Bomb"),
        ]),
      ],
      rotation: [spec.pack, "Time Freeze on a boss wind-up, then Comet.", "Temporal Rift if you already took the hit."],
      leveling: [
        { levels: "1–20", text: "Frostbolt and Frost Bomb. Movement-speed boots." },
        { levels: "21+", text: "Comet on bosses. Arctic Armour. Time Freeze only on the wind-up." },
        { levels: "Maps", text: "The 75% caps. Do not comet every doorway." },
      ],
      gear: esGear("wand", "Cold damage and cast speed."),
      sources: commonSources,
    }),
  "pathfinder-cold-spark": (spec) =>
    loadout({
      overview:
        "Cold Spark is the Pathfinder caster on the October 5, 2026 starter list, next to Poisonburst and Spiral Volley Poison. Spark fills the room. You cast and walk. Pathfinder's poison tools are why it is on this class. The Cold Spark page is the route. This bar does not borrow another build's support row.",
      numbers: [cap, chaos, "Cast speed on the wand. Movement speed on the boots."],
      ascendancy: [spec.ascendancyPick],
      groups: [
        group("Spark", "Spark, Frost Bomb, and Orb of Storms. Rapid Casting I in Spark.", [
          gem("Spark", ["Rapid Casting I"]),
          gem("Frost Bomb"),
          gem("Orb of Storms"),
          gem("Flame Wall"),
        ]),
      ],
      rotation: ["Spark and walk. You do not aim each spark.", "Frost Bomb on a rare.", "Orb of Storms, then Spark through it."],
      leveling: [
        { levels: "1–14", text: "Spark from the first gem. Movement-speed boots." },
        { levels: "15+", text: "Frost Bomb and Orb of Storms. Take the Pathfinder node and use Spark for a zone." },
        { levels: "Maps", text: "A faster wand. Resistances at 75%." },
      ],
      gear: esGear("wand", "Cold or lightning damage and cast speed."),
      sources: [guide("cold-spark-pathfinder-build-guide", "Maxroll Cold Spark Pathfinder"), ...commonSources],
    }),
  "martial-artist-storm-wave": () =>
    loadout({
      overview:
        "Hollow Focus Storm Wave is an A-tier Martial Artist starter on the October 5, 2026 list. Storm Wave is the clear. Tempest Bell is the extra hit. Hollow Focus spawns the bell on its own later. Cooldown recovery makes the bells appear faster, which is the same rule the Oil Barrage page prints.",
      numbers: [cap, chaos, "Cooldown recovery if Hollow Focus is on the bar."],
      ascendancy: ["The wave or bell node first. Use Storm Wave for a zone before a second node."],
      groups: [
        group("Wave", "Storm Wave, the bell, and Hollow Focus.", [
          gem("Storm Wave", ["Rapid Attacks II"]),
          gem("Tempest Bell"),
          gem("Hollow Focus", ["Cooldown Recovery I"]),
          gem("Herald of Ice"),
        ]),
      ],
      rotation: ["Storm Wave down the pack.", "Hit the bell if one is down.", "Hollow Focus when you have it, so the next bell appears on its own."],
      leveling: [
        { levels: "1–20", text: "Storm Wave. Life on the chest. Movement-speed boots." },
        { levels: "21+", text: "Tempest Bell. Hollow Focus. Cooldown recovery." },
        { levels: "Maps", text: "Herald of Ice. Resistances at 75%." },
      ],
      gear: armourGear("quarterstaff", "Attack speed and cold or physical damage."),
      sources: [guide("hollow-focus-storm-wave-martial-artist-build-guide", "Maxroll Hollow Focus Storm Wave"), ...commonSources],
    }),
  "lich-minions": (spec) => minions(spec, guide("minion-army-lich-build-guide", "Maxroll Lich minion army")),
  "infernalist-skeletal-sniper": (spec) =>
    loadout({
      ...minions(spec, guide("skeletal-sniper-infernalist-build-guide", "Maxroll Skeletal Sniper Infernalist")),
      overview:
        "Skeletal Sniper is the command. During the campaign, Volcano summons Raging Spirits. Curse, then the command. The support names on the sniper are the minion supports from the Disciple minion page. The Infernalist page is the ascendancy.",
    }),
};

const bySkill: Record<string, (spec: BuildSpec) => Loadout> = {
  "Lightning Arrow": lightningArrow,
  "Ice Shot": iceShot,
  "Lightning Spear": lightningSpear,
  Twister: twister,
  "Shield Wall": shieldWall,
  "Oil Grenade": grenades,
  "Explosive Grenade": grenades,
  "Permafrost Bolts": permafrost,
  "Supporting Fire": supportingFire,
  Entangle: entangle,
  "Grim Pillars": grimPillars,
  Arc: arc,
  "Essence Drain": essenceDrain,
  Contagion: essenceDrain,
  "Whirling Assault": whirling,
  "Hollow Form": hollowForm,
  "Oil Barrage": oilBarrage,
  "Spiral Volley": spiralVolley,
  "Poisonburst Arrow": poisonburst,
  Boneshatter: boneshatter,
  Rake: rake,
  "Walking Calamity": walkingCalamity,
  "Glacial Lance": glacialLance,
};

export function loadoutFor(spec: BuildSpec): Loadout {
  const id = byId[spec.id];
  if (id) return id(spec);
  const skill = bySkill[spec.skill];
  if (skill) return skill(spec);
  return generic(spec);
}
