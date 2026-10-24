import type { GearPiece, GuideVariant } from "@/lib/types";

export type BuildSpec = {
  id: string;
  classId: string;
  ascendancyId: string;
  name: string;
  skill: string;
  helper: string;
  support: string;
  weaponNoun: string;
  defence: string;
  summary: string;
  fantasy: string;
  pack: string;
  boss: string;
  shop: string;
  ascendancyPick: string;
  gear: GearPiece[];
  variants: GuideVariant[];
  tips: {
    act1: string;
    act2: string;
    act3: string;
    act4: string;
    interlude1: string;
    interlude2: string;
    interlude3: string;
    endgame: string;
  };
};

const gear = (
  slot: string,
  name: string,
  why: string,
  priority: GearPiece["priority"],
  level: number,
): GearPiece => ({ slot, name, why, priority, level });

export const buildSpecs: BuildSpec[] = [
  {
    id: "deadeye-lightning-arrow",
    classId: "ranger",
    ascendancyId: "deadeye",
    name: "Lightning Arrow",
    skill: "Lightning Arrow",
    helper: "Lightning Rod",
    support: "Martial Tempo",
    weaponNoun: "bow",
    defence: "evasion and life",
    summary: "Drop Lightning Rod in the pack, then shoot the rod. Deadeye adds arrows. You spend the campaign making the bow hit harder, not learning new skills.",
    fantasy: "A ranger who clears a screen by shooting one spot on the ground.",
    pack: "Drop Lightning Rod in the middle of the pack, then shoot the rod. The arrows burst off it. If the rod is not down, you are doing extra work.",
    boss: "Keep Lightning Rod under the boss and shoot the rod. Move when the boss swings. Do not stand still to finish a shot.",
    shop: "A worse-looking bow that hits harder is the right bow. Added lightning is a bonus, not a requirement.",
    ascendancyPick: "Finish the zone you are in, then run the trial once. Take the extra-projectile node first. More arrows is the whole ascendancy.",
    gear: [
      gear("Weapon", "Quill Rain", "A fast leveling bow. Use it from level 5 until a rare bow clearly kills faster.", "first", 5),
      gear("Quiver", "Blackgleam", "Flat damage on the quiver while the bow skill does the clearing.", "first", 8),
      gear("Helmet", "Goldrim", "Put it on and stop thinking about the helmet until maps.", "first", 1),
      gear("Boots", "Wanderlust", "Movement speed. Replace these only when rare boots have movement speed and life.", "first", 11),
      gear("Weapon", "Widowhail", "Use this in maps only when the quiver is where the damage lives. A weak quiver makes this a weak bow.", "endgame", 1),
      gear("Quiver", "Drillneck", "The quiver upgrade once Quill Rain still clears but bosses feel slow.", "soon", 55),
    ],
    variants: [
      {
        ascendancyId: "pathfinder",
        title: "Pathfinder",
        differs: "Follow this same bow route. At the trial, take the poison and flask nodes instead of extra projectiles. Keep a life flask with a charge-on-hit mod, and add a poison support only if it says it supports Lightning Arrow.",
      },
    ],
    tips: {
      act1: "If a pack is stacked on the road, the rod goes down before the second shot. Shooting the monsters directly is the slow version.",
      act2: "The desert is open. The rod still does the work. Buy a new bow at the caravan if yours is more than five levels old.",
      act3: "The jungle paths are tight. Shoot, step, shoot. You are not a character who stands in the middle.",
      act4: "Do the island in front of you. Keep the same two gems for the whole act.",
      interlude1: "Fix lightning and cold resist before Oswin. The new weapon-set points go into projectile damage.",
      interlude2: "Take the life reward and a resistance or movement boon. Azmadi still dies to a rod on the ground.",
      interlude3: "Take the spirit in Kriar even though Lightning Arrow does not reserve it yet.",
      endgame: "Stay on white maps until a pack dies to one rod and a short burst. Then add one support, not a new skill.",
    },
  },
  {
    id: "amazon-lightning-spear",
    classId: "huntress",
    ascendancyId: "amazon",
    name: "Lightning Spear",
    skill: "Lightning Spear",
    helper: "Explosive Spear",
    support: "Martial Tempo",
    weaponNoun: "spear",
    defence: "evasion and life",
    summary: "Throw Lightning Spear into the pack and keep walking. Explosive Spear is the button for anything that did not die. Amazon wants the projectile node first.",
    fantasy: "A huntress who throws one spear and is already moving to the next pack.",
    pack: "Throw Lightning Spear into the front of the pack, then sidestep. Use Explosive Spear only when a rare is still standing.",
    boss: "Throw Lightning Spear, step off the slam, and throw again. Explosive Spear is for the moment the boss stands still.",
    shop: "The spear with the highest attack damage wins. A buckler is for life and resists, not for blocking every hit.",
    ascendancyPick: "Run the trial once you can clear a zone without dying. Take the projectile node first.",
    gear: [
      gear("Weapon", "Splinter of Lorrata", "A leveling spear you can wear immediately. Replace it when a rare spear is obviously stronger.", "first", 1),
      gear("Off hand", "Dunkelhalt", "A simple buckler. Life and a resistance beat a clever unique.", "first", 1),
      gear("Helmet", "Goldrim", "All-resist helmet. Wear it and forget the slot.", "first", 1),
      gear("Boots", "Wanderlust", "Movement speed while you look for rare boots that also have life.", "first", 11),
      gear("Weapon", "Skysliver", "The mid-campaign spear once you are level 16 and Splinter feels slow.", "soon", 16),
      gear("Weapon", "Saitha's Spear", "A later spear for maps. Only switch if it kills faster than your rare.", "endgame", 33),
    ],
    variants: [
      {
        ascendancyId: "spirit-walker",
        title: "Spirit Walker",
        differs: "Same spear route until the trial. Take the spirit node first and keep a second weapon set for the spirit skill. Read each node before you click it.",
      },
      {
        ascendancyId: "ritualist",
        title: "Ritualist",
        differs: "Same spear route. At the trial, take one offering and use that same offering for a whole act. Do not skip the charm slot.",
      },
    ],
    tips: {
      act1: "Throw, move, throw. If you are standing next to a pack, you missed the point of the spear.",
      act2: "A buckler with life is enough. Do not hunt a perfect shield while the spear is five levels old.",
      act3: "Explosive Spear is the rare-monster button. Lightning Spear is everything else.",
      act4: "Each island is the same loop. Town, spear check, one island, town again.",
      interlude1: "Resistances first, then Oswin. Spend the weapon-set points on projectile damage.",
      interlude2: "Take the life and a movement or resistance boon. The spear fight does not change.",
      interlude3: "Take the spirit. Spirit Walker wants it now. Amazon can use it later.",
      endgame: "If bosses live too long, replace the spear before you add a second attack.",
    },
  },
  {
    id: "titan-earthquake",
    classId: "warrior",
    ascendancyId: "titan",
    name: "Earthquake",
    skill: "Earthquake",
    helper: "Boneshatter",
    support: "Martial Tempo",
    weaponNoun: "mace",
    defence: "armour and life",
    summary: "Slam Earthquake and let the aftershock finish the pack. Boneshatter is the button for a stunned rare. Titan takes the stun node first.",
    fantasy: "A warrior who hits the ground once and waits for the echo.",
    pack: "Step into the pack, slam Earthquake, and step back out before the aftershock. Boneshatter is for a rare that is already stunned.",
    boss: "Slam, walk out of the swing, slam again. Do not trade hits. The aftershock does the damage while you move.",
    shop: "A two-handed mace with high physical damage is the upgrade. A shield is optional and usually slower.",
    ascendancyPick: "Run the trial when white monsters stop scaring you. Take the stun node first, then go back to slamming.",
    gear: [
      gear("Weapon", "Hrimnor's Hymn", "A heavy mace you can use immediately. Keep it until a rare mace hits harder.", "first", 1),
      gear("Body", "Blackbraid", "Armour you can wear at level 1. Life on top of it is the whole defence.", "first", 1),
      gear("Helmet", "Horns of Bynden", "An early helmet. Replace it when a rare helmet has life and armour.", "first", 1),
      gear("Boots", "Trampletoe", "Movement and a slam-friendly pair of boots once you reach level 27.", "soon", 27),
      gear("Weapon", "Trephina", "A mid-campaign mace if Hymn has fallen behind.", "soon", 11),
      gear("Weapon", "Marohi Erqi", "A maps mace. Switch only when the slam is the slow part of the map.", "endgame", 60),
    ],
    variants: [
      {
        ascendancyId: "warbringer",
        title: "Warbringer",
        differs: "Same mace route. Put a totem down and use a warcry before the slam. Take the warcry node first.",
      },
      {
        ascendancyId: "smith-of-kitava",
        title: "Smith of Kitava",
        differs: "Same mace route. Cap fire resistance before you take the node that turns fire resistance into armour, or the node has nothing to convert.",
      },
    ],
    tips: {
      act1: "One slam, then move. Standing on the pack to watch the aftershock is how this build dies.",
      act2: "If the mace is old, the caravan weapon is worth more than any ring in the shop.",
      act3: "Armour on the chest and the helmet. Three small armour pieces beat one expensive unique.",
      act4: "Islands do not change the slam. Town between them and check the mace.",
      interlude1: "The resistance drop hurts a character who stands close. Fix armour and fire resist before Oswin.",
      interlude2: "Take the life reward. Earthquake wants life more than a clever boon.",
      interlude3: "Take the spirit, then finish the climb with the same slam.",
      endgame: "White maps until the aftershock clears the pack. A new mace is the first purchase, not a new gem.",
    },
  },
  {
    id: "witchhunter-galvanic-shards",
    classId: "mercenary",
    ascendancyId: "witchhunter",
    name: "Galvanic Shards",
    skill: "Galvanic Shards",
    helper: "Explosive Grenade",
    support: "Martial Tempo",
    weaponNoun: "crossbow",
    defence: "armour, evasion, and life",
    summary: "Galvanic Shards is the clear. Explosive Grenade is the pile. Witchhunter takes the culling node first and keeps the same crossbow plan the whole way.",
    fantasy: "A mercenary who shoots the pack and throws one grenade when it clumps.",
    pack: "Shoot Galvanic Shards while you walk backward. When the pack stacks up, throw Explosive Grenade into the middle and keep shooting.",
    boss: "Grenade at the boss's feet, then shards. Reload when the boss is swinging at where you were, not while it is aiming at you.",
    shop: "The crossbow with more damage wins, even if it looks plain. Reload speed is the second number to read.",
    ascendancyPick: "Do the trial once a zone is comfortable. Take the culling node first so rares fall over at the end of the fight.",
    gear: [
      gear("Weapon", "Rampart Raptor", "A crossbow you can wear immediately. Keep it while it still clears a screen.", "first", 1),
      gear("Helmet", "Goldrim", "Resistances while you look for a real helmet.", "first", 1),
      gear("Boots", "Wanderlust", "Movement speed. This build dies when it stands still to reload.", "first", 11),
      gear("Weapon", "Mist Whisper", "The mid-campaign crossbow once you reach its level.", "soon", 38),
      gear("Weapon", "The Last Lament", "A maps crossbow. Only switch when shards feel slow.", "endgame", 78),
    ],
    variants: [
      {
        ascendancyId: "tactician",
        title: "Tactician",
        differs: "Same crossbow route. Drop a banner before a rare or a boss, then shoot. Take the banner node first.",
      },
      {
        ascendancyId: "gemling-legionnaire",
        title: "Gemling Legionnaire",
        differs: "Same crossbow route. Take the gem-level node first. A higher-level Galvanic Shards is the upgrade, not a new skill.",
      },
    ],
    tips: {
      act1: "Shoot while walking. If you stop to aim, the pack reaches you during the reload.",
      act2: "Grenade is for the clump and the rare. Shards are for everything else.",
      act3: "A crossbow from Act 1 is the reason Act 3 feels hard. Check the vendor.",
      act4: "One island at a time. Reload and flask between packs, not in the middle of them.",
      interlude1: "Fix resistances, then fight Oswin the same way: grenade, shards, move.",
      interlude2: "Take the life. A grenade build that is one-shot is a dead build.",
      interlude3: "Take the spirit. You may reserve a banner or an aura later. The number is the point.",
      endgame: "White maps until reload no longer gets you hit. Then raise the tier, still on the same two skills.",
    },
  },
  {
    id: "invoker-ice-strike",
    classId: "monk",
    ascendancyId: "invoker",
    name: "Ice Strike",
    skill: "Ice Strike",
    helper: "Tempest Bell",
    support: "Martial Tempo",
    weaponNoun: "quarterstaff",
    defence: "evasion and energy shield",
    summary: "Drop Tempest Bell, then hit it with Ice Strike so the pack shatters. Invoker takes the elemental node that matches the ice you are already using.",
    fantasy: "A monk who sets a bell in the pack and lets the next swing do the rest.",
    pack: "Drop Tempest Bell in the pack and hit the bell with Ice Strike. Hitting the monsters and ignoring the bell is the slow version.",
    boss: "Bell at the boss's feet, Ice Strike into the bell, then step out. Put the bell down again when it breaks.",
    shop: "A quarterstaff with high attack damage and a bit of cold or lightning is the buy. Attributes on the staff matter if you are using Pillar of the Caged God.",
    ascendancyPick: "Run the trial when you can drop the bell and live. Take the elemental node that boosts cold or lightning, whichever your staff is actually adding.",
    gear: [
      gear("Weapon", "Pillar of the Caged God", "It grows when your strength, dexterity, and intelligence grow. Take small attribute nodes. Do not ignore them.", "first", 1),
      gear("Boots", "Ghostmarch", "Movement once you reach level 16. This build wants to leave after the bell pops.", "soon", 16),
      gear("Weapon", "The Blood Thorn", "A mid-campaign staff if Pillar has stopped keeping up.", "soon", 38),
      gear("Weapon", "Matsya", "Another staff option from level 20. Use whichever kills the pack faster.", "soon", 20),
      gear("Helmet", "Goldrim", "Resistances until a rare helmet has energy shield and life.", "first", 1),
    ],
    variants: [
      {
        ascendancyId: "martial-artist",
        title: "Martial Artist",
        differs: "Same staff route. Take the combo node first and keep Ice Strike as the hit you finish with. The element is secondary.",
      },
      {
        ascendancyId: "acolyte-of-chayula",
        title: "Acolyte of Chayula",
        differs: "Same staff route until the trial. Then add chaos only where the node you just took asks for it. Eye of Chayula is the amulet to look at. Skip a darkness node if you can no longer see the swing you need to dodge.",
      },
    ],
    tips: {
      act1: "Bell, strike, step. If the bell is on cooldown, Ice Strike alone is fine for one monster.",
      act2: "Attribute passives are damage on Pillar of the Caged God. Take them when they are next to you.",
      act3: "Energy shield on two pieces is enough. Do not rebuild the character into armour.",
      act4: "The islands are the same loop. Bell the rare, strike, sail on.",
      interlude1: "The resistance drop matters because you stand next to the bell. Fix resists, then fight Oswin.",
      interlude2: "Take the life even if you lean on energy shield. The bell puts you in melee range.",
      interlude3: "Take the spirit. A later reservation can sit on it.",
      endgame: "If the bell pop stops clearing, replace the staff before you add a third attack.",
    },
  },
  {
    id: "infernalist-skeletal-sniper",
    classId: "witch",
    ascendancyId: "infernalist",
    name: "Skeletal Sniper",
    skill: "Skeletal Sniper",
    helper: "Unearth",
    support: "a support that says it supports minions",
    weaponNoun: "wand",
    defence: "energy shield, with the minions in front",
    summary: "Raise Skeletal Snipers and let them shoot. Unearth makes corpses when a pack has none. You walk behind the minions and replace them when they fall.",
    fantasy: "A witch who rarely casts at the monster she wants dead.",
    pack: "Send the snipers in first. If they have nothing to shoot from, cast Unearth so the next sniper has a body. Do not run in ahead of them.",
    boss: "Raise the snipers before you open the fight. Recast the one that dies. You stay at the edge and move when the boss turns toward you.",
    shop: "The wand is a stat stick. Spirit and a level of minion skills matter more than a pretty unique.",
    ascendancyPick: "Run the trial once the minions can clear a zone. Take the infernal flame node first and keep the snipers as the damage.",
    gear: [
      gear("Body", "Ghostwrithe", "Energy shield you can wear immediately, while the minions do the hitting.", "first", 1),
      gear("Body", "Necromantle", "The minion body once you reach level 16. Switch if the snipers feel fragile.", "soon", 16),
      gear("Boots", "Bones of Ullr", "Minion boots. Wear them at 16 and keep them until rare boots are clearly better.", "soon", 16),
      gear("Weapon", "The Dark Defiler", "A sceptre for the late campaign. Spirit on it is the reason to switch.", "soon", 52),
      gear("Body", "Vis Mortis", "A maps body for the minions. Only when you meet the level.", "endgame", 58),
      gear("Helmet", "Goldrim", "Resistances while the minions learn the route.", "first", 1),
    ],
    variants: [
      {
        ascendancyId: "blood-mage",
        title: "Blood Mage",
        differs: "Same minion route until the trial. Blood Mage spends life. Keep the life flask on a key you can hit without looking, and take a life node only after that flask is already saving you.",
      },
      {
        ascendancyId: "lich",
        title: "Lich",
        differs: "Same snipers early. When you ascend, take the energy shield node first and replace the life chest with an energy shield chest.",
      },
    ],
    tips: {
      act1: "If you are hitting the monster yourself, the snipers are not out. Recast them.",
      act2: "Spirit on gear is a bigger upgrade than a damage ring. Read the wand before you buy it.",
      act3: "Unearth is for empty rooms and bosses. Snipers are for the map.",
      act4: "Between islands, recast a full set of snipers in town so you sail out ready.",
      interlude1: "Resistances dropped. You still die if a stray hit lands, even with minions in front.",
      interlude2: "Take the life. Minions do not drink your flask for you.",
      interlude3: "Take the spirit. This build actually spends it.",
      endgame: "White maps until the snipers clear while you walk. Then raise the tier. Do not add a second minion type in the same afternoon.",
    },
  },
  {
    id: "stormweaver-spark",
    classId: "sorceress",
    ascendancyId: "stormweaver",
    name: "Spark",
    skill: "Spark",
    helper: "Orb of Storms",
    support: "Arcane Tempo",
    weaponNoun: "wand or staff",
    defence: "energy shield",
    summary: "Cast Spark and keep moving so the projectiles fill the room. Orb of Storms sits in the pack and shocks while you walk. Stormweaver takes the shock node first.",
    fantasy: "A sorceress who casts once and lets the room fill with sparks.",
    pack: "Drop Orb of Storms in the pack, cast Spark twice, and walk through a door. The sparks do the rest. Standing still wastes them.",
    boss: "Orb of Storms under the boss, then Spark while you circle. Recast the orb when it expires. Do not channel.",
    shop: "Cast speed and a plus to spell skills beat a wand with a famous name. Buy the plain one if the numbers are higher.",
    ascendancyPick: "Run the trial when Spark already clears. Take the shock node first so the orb and the sparks help each other.",
    gear: [
      gear("Focus", "Threaded Light", "A focus from level 6. Spell damage on the off-hand is enough for the whole campaign.", "first", 6),
      gear("Body", "Ghostwrithe", "Energy shield at level 1. This build wants to be hit less, and shielded when it is.", "first", 1),
      gear("Helmet", "Goldrim", "Resistances. Replace it when a rare helmet has energy shield.", "first", 1),
      gear("Ring", "Dream Fragments", "A comfortable ring once you reach level 12. Mana and cold resist, then back to casting.", "soon", 12),
      gear("Weapon", "Lifesprig", "A maps wand. High level. Do not wait on it during the campaign.", "endgame", 78),
    ],
    variants: [
      {
        ascendancyId: "chronomancer",
        title: "Chronomancer",
        differs: "Same Spark route. Take the slow or recoup node first and spend it when a boss winds up, not on a white pack.",
      },
      {
        ascendancyId: "disciple-of-varashta",
        title: "Disciple of Varashta",
        differs: "Same Spark route through every act and interlude. At the trial, read the nodes in game and take the one that boosts Spark. Do not change gems until that node is chosen.",
      },
    ],
    tips: {
      act1: "Two casts of Spark, then walk. The projectiles need room and time.",
      act2: "If mana runs dry, take a mana node next to you or a smaller cast. Do not switch skills.",
      act3: "Orb of Storms is the boss tool. Spark is the corridor tool.",
      act4: "Islands are corridors with extra steps. Same two gems.",
      interlude1: "Energy shield characters feel the resistance drop. Fix the lowest resist before Oswin.",
      interlude2: "Take the life reward anyway. Energy shield is not a reason to skip permanent life.",
      interlude3: "Take the spirit. A later aura can sit on it.",
      endgame: "White maps until Spark clears around a corner. Cast speed on the wand is the first real upgrade.",
    },
  },
  {
    id: "shaman-volcano",
    classId: "druid",
    ascendancyId: "shaman",
    name: "Volcano",
    skill: "Volcano",
    helper: "Entangle",
    support: "a support that says it supports spells",
    weaponNoun: "staff",
    defence: "life and armour",
    summary: "You start with Volcano. Plant it, slam it so it sprays again, and hold the pack on it with Entangle. Shaman takes the elemental node first.",
    fantasy: "A druid who puts a mountain in the road and makes everything walk over it.",
    pack: "Cast Volcano in the pack's path. Slam it to spray again. Entangle anything that walks off it. You should be next to the volcano, not inside the monsters.",
    boss: "Volcano at the boss's feet. Slam it when the boss stands on it. Recast when it expires. Entangle is for adds, not for the slam.",
    shop: "A staff with fire or spell damage is the buy. The talisman is a life and resist slot until a rare one is better.",
    ascendancyPick: "Run the trial when Volcano already clears a zone. Take the elemental node first. Shaman turns the fire you are already using into the build.",
    gear: [
      gear("Talisman", "Amor Mandragora", "The talisman slot, available immediately. A rare talisman with life replaces it.", "first", 1),
      gear("Helmet", "Goldrim", "Resistances while the volcano does the killing.", "first", 1),
      gear("Boots", "Wanderlust", "Movement between volcanoes. Replace with life and movement speed.", "first", 11),
      gear("Talisman", "Spiteful Floret", "A later talisman. Switch at its level only if the numbers beat your rare.", "soon", 52),
      gear("Weapon", "The Searing Touch", "A fire staff for maps. Campaign staffs are whatever the vendor sells with better spell damage.", "endgame", 78),
    ],
    variants: [
      {
        ascendancyId: "oracle",
        title: "Oracle",
        differs: "Same Volcano route until the trial. Take Fateful Vision first. Cast Volcano, then cast it again when the visage appears so the second cast is the empowered one.",
      },
    ],
    tips: {
      act1: "You begin with Volcano. Slam it. A second skill can wait until Entangle drops.",
      act2: "If the staff is from the coast, the caravan has a better one. The talisman is not the priority.",
      act3: "Entangle the lead monster so the rest stand on the volcano. Do not chase stragglers.",
      act4: "One island, one staff check in town, then the next island.",
      interlude1: "Fire characters still need cold and lightning resist. Fix them before Oswin, then slam.",
      interlude2: "Take the life. Standing near your own volcano still gets you hit.",
      interlude3: "Take the spirit on the way up. The volcano loop does not change.",
      endgame: "White maps until one volcano and two slams clear the pack. A better staff comes before a second spell.",
    },
  },
];
