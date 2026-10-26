// Vendors: Maxroll campaign walkthrough, updated 2026-06-02.
// https://maxroll.gg/poe2/getting-started/path-of-exile-2-campaign-guide
// Bases and implicits: poe2db item pages, read 2026-10-26 (patch 0.5.5).
// https://poe2db.tw/us/Bows and the matching pages for each weapon and armour class.
// Rare-mod numbers are the single tiers already checked in statLines.ts.

type Base = { name: string; level: number; detail: string };

const BOW: Base[] = [
  { name: "Crude Bow", level: 1, detail: "physical damage 6-9, 1.20 attacks per second" },
  { name: "Shortbow", level: 5, detail: "physical damage 7-14, 1.25 attacks per second, requires 12 Dexterity" },
  { name: "Warden Bow", level: 11, detail: "physical damage 12-20, 1.15 attacks per second, requires 23 Dexterity" },
  { name: "Recurve Bow", level: 16, detail: "physical damage 15-31, 1.10 attacks per second, requires 31 Dexterity" },
  { name: "Composite Bow", level: 22, detail: "physical damage 19-31, 1.20 attacks per second, requires 41 Dexterity" },
  { name: "Dualstring Bow", level: 28, detail: "physical damage 19-35, 1.15 attacks per second, requires 52 Dexterity, and the base can fire an extra arrow" },
  { name: "Cultist Bow", level: 33, detail: "physical damage 22-36, 1.20 attacks per second, requires 60 Dexterity" },
  { name: "Zealot Bow", level: 39, detail: "physical damage 31-47, 1.20 attacks per second, requires 70 Dexterity" },
  { name: "Tribal Bow", level: 50, detail: "physical damage 38-57, 1.20 attacks per second, requires 89 Dexterity" },
  { name: "Double Limb Bow", level: 56, detail: "physical damage 42-63, 1.20 attacks per second, requires 99 Dexterity" },
  { name: "Heavy Bow", level: 65, detail: "physical damage 45-75, 1.20 attacks per second, requires 114 Dexterity" },
  { name: "Cavalry Bow", level: 72, detail: "physical damage 49-82, 1.20 attacks per second, requires 149 Dexterity" },
  { name: "Warmonger Bow", level: 77, detail: "physical damage 56-84, 1.20 attacks per second, requires 163 Dexterity" },
];

const SPEAR: Base[] = [
  { name: "Hardwood Spear", level: 1, detail: "physical damage 5-9, 1.60 attacks per second" },
  { name: "Ironhead Spear", level: 5, detail: "physical damage 9-12, 1.60 attacks per second, requires 10 Dexterity" },
  { name: "Hunting Spear", level: 10, detail: "physical damage 10-17, 1.55 attacks per second, requires 9 Strength and 17 Dexterity" },
  { name: "Winged Spear", level: 16, detail: "physical damage 12-22, 1.70 attacks per second, requires 12 Strength and 25 Dexterity" },
  { name: "War Spear", level: 21, detail: "physical damage 16-27, 1.60 attacks per second, requires 14 Strength and 31 Dexterity" },
  { name: "Forked Spear", level: 26, detail: "physical damage 13-38, 1.55 attacks per second, requires 17 Strength and 38 Dexterity" },
  { name: "Barbed Spear", level: 33, detail: "physical damage 20-38, 1.50 attacks per second, requires 20 Strength and 47 Dexterity" },
  { name: "Broad Spear", level: 40, detail: "physical damage 32-48, 1.40 attacks per second, requires 26 Strength and 55 Dexterity" },
  { name: "Crossblade Spear", level: 45, detail: "physical damage 25-52, 1.60 attacks per second, requires 26 Strength and 63 Dexterity" },
  { name: "Seaglass Spear", level: 51, detail: "physical damage 29-53, 1.60 attacks per second, requires 29 Strength and 71 Dexterity" },
  { name: "Sword Spear", level: 52, detail: "physical damage 30-56, 1.60 attacks per second, requires 29 Strength and 72 Dexterity" },
  { name: "Helix Spear", level: 65, detail: "physical damage 37-68, 1.60 attacks per second, requires 36 Strength and 89 Dexterity" },
  { name: "Orichalcum Spear", level: 67, detail: "physical damage 46-62, 1.60 attacks per second, requires 41 Strength and 104 Dexterity" },
  { name: "Soaring Spear", level: 70, detail: "physical damage 35-65, 1.70 attacks per second, requires 41 Strength and 115 Dexterity" },
  { name: "Stalking Spear", level: 77, detail: "physical damage 47-79, 1.55 attacks per second, requires 50 Strength and 127 Dexterity" },
];

const CROSSBOW: Base[] = [
  { name: "Makeshift Crossbow", level: 1, detail: "physical damage 7-12, 1.60 attacks per second" },
  { name: "Tense Crossbow", level: 4, detail: "physical damage 8-15, 1.60 attacks per second, requires 8 Strength and 8 Dexterity" },
  { name: "Sturdy Crossbow", level: 10, detail: "physical damage 11-26, 1.55 attacks per second, requires 13 Strength and 13 Dexterity" },
  { name: "Varnished Crossbow", level: 16, detail: "physical damage 12-36, 1.60 attacks per second, requires 19 Strength and 19 Dexterity" },
  { name: "Dyad Crossbow", level: 20, detail: "physical damage 9-37, 1.60 attacks per second, requires 22 Strength and 22 Dexterity" },
  { name: "Alloy Crossbow", level: 26, detail: "physical damage 12-50, 1.70 attacks per second, requires 28 Strength and 28 Dexterity" },
  { name: "Bombard Crossbow", level: 33, detail: "physical damage 14-56, 1.65 attacks per second, requires 34 Strength and 34 Dexterity" },
  { name: "Construct Crossbow", level: 38, detail: "physical damage 18-72, 1.60 attacks per second, requires 39 Strength and 39 Dexterity" },
  { name: "Blackfire Crossbow", level: 45, detail: "physical damage 20-80, 1.60 attacks per second, requires 45 Strength and 45 Dexterity" },
  { name: "Piercing Crossbow", level: 50, detail: "physical damage 21-84, 1.65 attacks per second, requires 49 Strength and 49 Dexterity" },
  { name: "Cumbrous Crossbow", level: 52, detail: "physical damage 19-76, 1.60 attacks per second, requires 51 Strength and 51 Dexterity" },
  { name: "Dedalian Crossbow", level: 56, detail: "physical damage 25-99, 1.55 attacks per second, requires 55 Strength and 55 Dexterity" },
  { name: "Esoteric Crossbow", level: 65, detail: "physical damage 28-113, 1.60 attacks per second, requires 63 Strength and 63 Dexterity" },
  { name: "Stout Crossbow", level: 67, detail: "physical damage 30-119, 1.55 attacks per second, requires 74 Strength and 74 Dexterity" },
  { name: "Engraved Crossbow", level: 72, detail: "physical damage 31-124, 1.60 attacks per second, requires 82 Strength and 82 Dexterity" },
  { name: "Flexed Crossbow", level: 77, detail: "physical damage 32-127, 1.60 attacks per second, requires 89 Strength and 89 Dexterity" },
];

const QUARTERSTAFF: Base[] = [
  { name: "Wrapped Quarterstaff", level: 1, detail: "physical damage 7-12, 1.40 attacks per second" },
  { name: "Long Quarterstaff", level: 4, detail: "physical damage 9-18, 1.40 attacks per second, requires 9 Dexterity" },
  { name: "Gothic Quarterstaff", level: 11, detail: "physical damage 16-26, 1.40 attacks per second, requires 18 Dexterity and 9 Intelligence" },
  { name: "Crackling Quarterstaff", level: 16, detail: "physical damage 5-22, 1.40 attacks per second, requires 25 Dexterity and 12 Intelligence" },
  { name: "Crescent Quarterstaff", level: 20, detail: "physical damage 19-39, 1.50 attacks per second, requires 30 Dexterity and 14 Intelligence" },
  { name: "Steelpoint Quarterstaff", level: 28, detail: "physical damage 28-51, 1.40 attacks per second, requires 41 Dexterity and 18 Intelligence" },
  { name: "Slicing Quarterstaff", level: 33, detail: "physical damage 29-60, 1.40 attacks per second, requires 47 Dexterity and 20 Intelligence" },
  { name: "Barrier Quarterstaff", level: 37, detail: "physical damage 35-58, 1.40 attacks per second, requires 52 Dexterity and 22 Intelligence" },
  { name: "Hefty Quarterstaff", level: 45, detail: "physical damage 39-81, 1.30 attacks per second, requires 63 Dexterity and 26 Intelligence" },
  { name: "Smooth Quarterstaff", level: 49, detail: "physical damage 59-79, 1.50 attacks per second, requires 68 Dexterity and 28 Intelligence" },
  { name: "Anima Quarterstaff", level: 52, detail: "physical damage 47-79, 1.40 attacks per second, requires 72 Dexterity and 29 Intelligence" },
  { name: "Graceful Quarterstaff", level: 56, detail: "physical damage 47-87, 1.40 attacks per second, requires 77 Dexterity and 31 Intelligence" },
  { name: "Wyrm Quarterstaff", level: 65, detail: "physical damage 57-94, 1.40 attacks per second, requires 89 Dexterity and 36 Intelligence" },
  { name: "Sinister Quarterstaff", level: 67, detail: "physical damage 55-91, 1.40 attacks per second, requires 104 Dexterity and 41 Intelligence" },
  { name: "Lunar Quarterstaff", level: 72, detail: "physical damage 50-103, 1.50 attacks per second, requires 115 Dexterity and 46 Intelligence" },
  { name: "Striking Quarterstaff", level: 77, detail: "physical damage 53-111, 1.40 attacks per second, requires 127 Dexterity and 50 Intelligence" },
];

const MACE: Base[] = [
  { name: "Wooden Club", level: 1, detail: "one-hand mace. Use it while a shield is equipped" },
  { name: "Smithing Hammer", level: 4, detail: "one-hand mace, requires 11 Strength" },
  { name: "Slim Mace", level: 10, detail: "one-hand mace, requires 21 Strength" },
  { name: "Spiked Club", level: 16, detail: "one-hand mace, requires 31 Strength" },
  { name: "Warpick", level: 22, detail: "one-hand mace, requires 41 Strength" },
  { name: "Plated Mace", level: 26, detail: "one-hand mace, requires 48 Strength" },
  { name: "Brigand Mace", level: 33, detail: "one-hand mace, requires 60 Strength" },
  { name: "Construct Hammer", level: 36, detail: "one-hand mace, requires 65 Strength" },
  { name: "Morning Star", level: 45, detail: "one-hand mace, requires 80 Strength" },
  { name: "Jade Club", level: 49, detail: "one-hand mace, requires 87 Strength" },
  { name: "Lumen Mace", level: 52, detail: "one-hand mace, requires 92 Strength" },
  { name: "Execratus Hammer", level: 55, detail: "one-hand mace, requires 97 Strength" },
  { name: "Torment Club", level: 65, detail: "one-hand mace, requires 114 Strength" },
];

const GREAT: Base[] = [
  { name: "Felled Greatclub", level: 1, detail: "two-hand mace. Use it only when the shield slot is empty" },
  { name: "Oak Greathammer", level: 4, detail: "two-hand mace, requires 11 Strength" },
  { name: "Forge Maul", level: 11, detail: "two-hand mace, requires 23 Strength" },
  { name: "Studded Greatclub", level: 16, detail: "two-hand mace, requires 31 Strength" },
  { name: "Cultist Greathammer", level: 22, detail: "two-hand mace, requires 41 Strength" },
  { name: "Temple Maul", level: 28, detail: "two-hand mace, requires 52 Strength" },
  { name: "Leaden Greathammer", level: 33, detail: "two-hand mace, requires 60 Strength" },
  { name: "Crumbling Maul", level: 38, detail: "two-hand mace, requires 68 Strength" },
  { name: "Pointed Maul", level: 45, detail: "two-hand mace, requires 80 Strength" },
  { name: "Totemic Greatclub", level: 50, detail: "two-hand mace, requires 89 Strength" },
  { name: "Greatmace", level: 52, detail: "two-hand mace, requires 92 Strength" },
  { name: "Giant Maul", level: 65, detail: "two-hand mace, requires 114 Strength" },
];

const WAND: Base[] = [
  { name: "Withered Wand", level: 1, detail: "no level requirement" },
  { name: "Bone Wand", level: 2, detail: "requires level 2" },
  { name: "Attuned Wand", level: 2, detail: "requires level 2" },
  { name: "Siphoning Wand", level: 11, detail: "requires 23 Intelligence" },
  { name: "Volatile Wand", level: 16, detail: "requires 31 Intelligence" },
  { name: "Galvanic Wand", level: 25, detail: "requires 46 Intelligence" },
  { name: "Acrid Wand", level: 33, detail: "requires 60 Intelligence" },
  { name: "Offering Wand", level: 38, detail: "requires 68 Intelligence" },
  { name: "Frigid Wand", level: 45, detail: "requires 80 Intelligence" },
  { name: "Torture Wand", level: 49, detail: "requires 87 Intelligence" },
  { name: "Critical Wand", level: 52, detail: "requires 92 Intelligence" },
  { name: "Primordial Wand", level: 56, detail: "requires 99 Intelligence" },
  { name: "Dueling Wand", level: 65, detail: "requires 114 Intelligence" },
];

const STAFF: Base[] = [
  { name: "Ashen Staff", level: 1, detail: "no level requirement" },
  { name: "Gelid Staff", level: 2, detail: "requires level 2" },
  { name: "Voltaic Staff", level: 2, detail: "requires level 2" },
  { name: "Spriggan Staff", level: 11, detail: "requires 23 Intelligence" },
  { name: "Pyrophyte Staff", level: 16, detail: "requires 31 Intelligence" },
  { name: "Chiming Staff", level: 25, detail: "requires 46 Intelligence" },
  { name: "Rending Staff", level: 33, detail: "requires 60 Intelligence" },
  { name: "Reaping Staff", level: 38, detail: "requires 68 Intelligence" },
  { name: "Icicle Staff", level: 45, detail: "requires 80 Intelligence" },
  { name: "Roaring Staff", level: 49, detail: "requires 87 Intelligence" },
  { name: "Paralysing Staff", level: 52, detail: "requires 92 Intelligence" },
  { name: "Sanctified Staff", level: 56, detail: "requires 99 Intelligence" },
  { name: "Dark Staff", level: 65, detail: "requires 114 Intelligence" },
  { name: "Reflecting Staff", level: 70, detail: "requires 114 Intelligence" },
  { name: "Permafrost Staff", level: 75, detail: "requires 114 Intelligence" },
];

const SCEPTRE: Base[] = [
  { name: "Rattling Sceptre", level: 1, detail: "no level requirement" },
  { name: "Stoic Sceptre", level: 6, detail: "requires 12 Intelligence" },
  { name: "Lupine Sceptre", level: 12, detail: "requires 24 Intelligence" },
  { name: "Omen Sceptre", level: 16, detail: "requires 12 Strength and 25 Intelligence" },
  { name: "Ochre Sceptre", level: 21, detail: "requires 40 Intelligence" },
  { name: "Shrine Sceptre", level: 26, detail: "requires 17 Strength and 38 Intelligence" },
  { name: "Devouring Sceptre", level: 33, detail: "requires 60 Intelligence" },
  { name: "Clasped Sceptre", level: 36, detail: "requires 65 Intelligence" },
  { name: "Devotional Sceptre", level: 45, detail: "requires 26 Strength and 63 Intelligence" },
  { name: "Wrath Sceptre", level: 49, detail: "requires 87 Intelligence" },
  { name: "Aromatic Sceptre", level: 52, detail: "requires 92 Intelligence" },
  { name: "Pious Sceptre", level: 58, detail: "requires 102 Intelligence" },
  { name: "Hallowed Sceptre", level: 65, detail: "requires 114 Intelligence" },
];

const QUIVER: Base[] = [
  { name: "Broadhead Quiver", level: 1, detail: "Adds 1 to 3 Physical Damage to Attacks" },
  { name: "Fire Quiver", level: 8, detail: "Adds 3 to 5 Fire damage to Attacks" },
  { name: "Sacral Quiver", level: 16, detail: "Gain (2-3) Life per Enemy Hit with Attacks" },
  { name: "Two-Point Quiver", level: 24, detail: "(20-30)% increased Accuracy Rating" },
  { name: "Blunt Quiver", level: 33, detail: "(25-40)% increased Stun Buildup" },
  { name: "Toxic Quiver", level: 39, detail: "(20-30)% chance to Poison on Hit with Attacks" },
  { name: "Serrated Quiver", level: 44, detail: "Attacks have (20-30)% chance to cause Bleeding" },
  { name: "Primed Quiver", level: 51, detail: "(7-10)% increased Attack Speed" },
  { name: "Penetrating Quiver", level: 55, detail: "100% chance to Pierce an Enemy" },
  { name: "Volant Quiver", level: 61, detail: "(20-30)% increased Arrow Speed" },
  { name: "Visceral Quiver", level: 65, detail: "(20-30)% increased Critical Hit Chance for Attacks" },
];

const SHIELD: Base[] = [
  { name: "Splintered Tower Shield", level: 1, detail: "strength shield" },
  { name: "Painted Tower Shield", level: 6, detail: "strength shield, requires 11 Strength" },
  { name: "Braced Tower Shield", level: 12, detail: "strength shield, requires 19 Strength" },
  { name: "Barricade Tower Shield", level: 16, detail: "strength shield, requires 25 Strength" },
  { name: "Effigial Tower Shield", level: 21, detail: "strength shield, requires 32 Strength" },
  { name: "Rampart Tower Shield", level: 28, detail: "strength shield, requires 42 Strength" },
  { name: "Heraldric Tower Shield", level: 33, detail: "strength shield, requires 48 Strength" },
  { name: "Stone Tower Shield", level: 36, detail: "strength shield, requires 52 Strength" },
  { name: "Crucible Tower Shield", level: 45, detail: "strength shield, requires 64 Strength" },
  { name: "Ancestor Tower Shield", level: 50, detail: "strength shield, requires 71 Strength" },
  { name: "Phalanx Tower Shield", level: 52, detail: "strength shield, requires 74 Strength" },
  { name: "Defiant Tower Shield", level: 58, detail: "strength shield, requires 82 Strength" },
];

type ArmourSlot = "body" | "helmet" | "gloves" | "boots" | "belt";

const ARMOUR: Record<"str" | "dex" | "int", Record<ArmourSlot, Base[]>> = {
  dex: {
    body: [
      { name: "Leather Vest", level: 1, detail: "evasion body" },
      { name: "Quilted Vest", level: 4, detail: "evasion body, requires 10 Dexterity" },
      { name: "Pathfinder Coat", level: 11, detail: "evasion body, requires 21 Dexterity" },
      { name: "Shrouded Vest", level: 16, detail: "evasion body, requires 28 Dexterity" },
      { name: "Rhoahide Coat", level: 22, detail: "evasion body, requires 37 Dexterity" },
      { name: "Studded Vest", level: 26, detail: "evasion body, requires 43 Dexterity" },
      { name: "Scout's Vest", level: 33, detail: "evasion body, requires 54 Dexterity" },
      { name: "Serpentscale Coat", level: 36, detail: "evasion body, requires 59 Dexterity" },
      { name: "Corsair Vest", level: 45, detail: "evasion body, requires 72 Dexterity" },
      { name: "Strider Vest", level: 52, detail: "evasion body, requires 83 Dexterity" },
      { name: "Hardleather Coat", level: 56, detail: "evasion body, requires 89 Dexterity" },
      { name: "Exquisite Vest", level: 65, detail: "evasion body, requires 121 Dexterity" },
    ],
    helmet: [
      { name: "Shabby Hood", level: 1, detail: "evasion helmet" },
      { name: "Felt Cap", level: 10, detail: "evasion helmet, requires 17 Dexterity" },
      { name: "Lace Hood", level: 16, detail: "evasion helmet, requires 25 Dexterity" },
      { name: "Swathed Cap", level: 26, detail: "evasion helmet, requires 38 Dexterity" },
      { name: "Hunter Hood", level: 33, detail: "evasion helmet, requires 48 Dexterity" },
      { name: "Viper Cap", level: 38, detail: "evasion helmet, requires 54 Dexterity" },
      { name: "Corsair Cap", level: 45, detail: "evasion helmet, requires 64 Dexterity" },
      { name: "Leatherbound Hood", level: 50, detail: "evasion helmet, requires 71 Dexterity" },
      { name: "Velvet Cap", level: 52, detail: "evasion helmet, requires 74 Dexterity" },
      { name: "Covert Hood", level: 56, detail: "evasion helmet, requires 79 Dexterity" },
      { name: "Armoured Cap", level: 65, detail: "evasion helmet, requires 91 Dexterity" },
    ],
    gloves: [
      { name: "Suede Bracers", level: 1, detail: "evasion gloves" },
      { name: "Firm Bracers", level: 11, detail: "evasion gloves, requires 16 Dexterity" },
      { name: "Bound Bracers", level: 16, detail: "evasion gloves, requires 22 Dexterity" },
      { name: "Sectioned Bracers", level: 28, detail: "evasion gloves, requires 36 Dexterity" },
      { name: "Spined Bracers", level: 33, detail: "evasion gloves, requires 42 Dexterity" },
      { name: "Fine Bracers", level: 45, detail: "evasion gloves, requires 56 Dexterity" },
      { name: "Hardened Bracers", level: 52, detail: "evasion gloves, requires 64 Dexterity" },
      { name: "Engraved Bracers", level: 65, detail: "evasion gloves, requires 80 Dexterity" },
    ],
    boots: [
      { name: "Rawhide Boots", level: 1, detail: "evasion boots" },
      { name: "Laced Boots", level: 11, detail: "evasion boots, requires 17 Dexterity" },
      { name: "Embossed Boots", level: 16, detail: "evasion boots, requires 23 Dexterity" },
      { name: "Steeltoe Boots", level: 28, detail: "evasion boots, requires 39 Dexterity" },
      { name: "Lizardscale Boots", level: 33, detail: "evasion boots, requires 45 Dexterity" },
      { name: "Flared Boots", level: 45, detail: "evasion boots, requires 60 Dexterity" },
      { name: "Leatherplate Boots", level: 52, detail: "evasion boots, requires 69 Dexterity" },
      { name: "Embroidered Boots", level: 65, detail: "evasion boots, requires 86 Dexterity" },
    ],
    belt: [
      { name: "Rawhide Belt", level: 1, detail: "Has (1-3) Charm Slots and (20-30)% increased Life Recovery from Flasks" },
      { name: "Wide Belt", level: 14, detail: "Has (1-3) Charm Slots and (20-30)% increased Flask Charges gained" },
      { name: "Long Belt", level: 20, detail: "Has (1-3) Charm Slots and (15-20)% increased Charm Effect Duration" },
      { name: "Ornate Belt", level: 31, detail: "Has (1-3) Charm Slots" },
      { name: "Mail Belt", level: 40, detail: "Has (1-3) Charm Slots" },
      { name: "Heavy Belt", level: 50, detail: "Has (1-3) Charm Slots" },
    ],
  },
  str: {
    body: [
      { name: "Rusted Cuirass", level: 1, detail: "armour body" },
      { name: "Fur Plate", level: 4, detail: "armour body, requires 10 Strength" },
      { name: "Iron Cuirass", level: 11, detail: "armour body, requires 21 Strength" },
      { name: "Raider Plate", level: 16, detail: "armour body, requires 28 Strength" },
      { name: "Maraketh Cuirass", level: 20, detail: "armour body, requires 34 Strength" },
      { name: "Steel Plate", level: 27, detail: "armour body, requires 45 Strength" },
      { name: "Full Plate", level: 33, detail: "armour body, requires 54 Strength" },
      { name: "Vaal Cuirass", level: 37, detail: "armour body, requires 60 Strength" },
      { name: "Juggernaut Plate", level: 45, detail: "armour body, requires 72 Strength" },
      { name: "Colosseum Plate", level: 52, detail: "armour body, requires 83 Strength" },
      { name: "Champion Cuirass", level: 58, detail: "armour body, requires 92 Strength" },
      { name: "Glorious Plate", level: 65, detail: "armour body, requires 121 Strength" },
    ],
    helmet: [
      { name: "Rusted Greathelm", level: 1, detail: "armour helmet" },
      { name: "Soldier Greathelm", level: 12, detail: "armour helmet, requires 19 Strength" },
      { name: "Wrapped Greathelm", level: 16, detail: "armour helmet, requires 25 Strength" },
      { name: "Spired Greathelm", level: 27, detail: "armour helmet, requires 40 Strength" },
      { name: "Elite Greathelm", level: 33, detail: "armour helmet, requires 48 Strength" },
      { name: "Warrior Greathelm", level: 36, detail: "armour helmet, requires 52 Strength" },
      { name: "Commander Greathelm", level: 45, detail: "armour helmet, requires 64 Strength" },
      { name: "Sentinel Greathelm", level: 52, detail: "armour helmet, requires 74 Strength" },
      { name: "Goliath Greathelm", level: 57, detail: "armour helmet, requires 81 Strength" },
      { name: "Guardian Greathelm", level: 65, detail: "armour helmet, requires 91 Strength" },
    ],
    gloves: [
      { name: "Stocky Mitts", level: 1, detail: "armour gloves" },
      { name: "Riveted Mitts", level: 11, detail: "armour gloves, requires 16 Strength" },
      { name: "Tempered Mitts", level: 16, detail: "armour gloves, requires 22 Strength" },
      { name: "Bolstered Mitts", level: 27, detail: "armour gloves, requires 35 Strength" },
      { name: "Moulded Mitts", level: 33, detail: "armour gloves, requires 42 Strength" },
      { name: "Detailed Mitts", level: 45, detail: "armour gloves, requires 56 Strength" },
      { name: "Titan Mitts", level: 52, detail: "armour gloves, requires 64 Strength" },
      { name: "Grand Mitts", level: 65, detail: "armour gloves, requires 80 Strength" },
    ],
    boots: [
      { name: "Rough Greaves", level: 1, detail: "armour boots" },
      { name: "Iron Greaves", level: 11, detail: "armour boots, requires 17 Strength" },
      { name: "Bronze Greaves", level: 16, detail: "armour boots, requires 23 Strength" },
      { name: "Trimmed Greaves", level: 27, detail: "armour boots, requires 38 Strength" },
      { name: "Stone Greaves", level: 33, detail: "armour boots, requires 45 Strength" },
      { name: "Reefsteel Greaves", level: 45, detail: "armour boots, requires 60 Strength" },
      { name: "Monument Greaves", level: 52, detail: "armour boots, requires 69 Strength" },
      { name: "Totemic Greaves", level: 65, detail: "armour boots, requires 86 Strength" },
    ],
    belt: [
      { name: "Rawhide Belt", level: 1, detail: "Has (1-3) Charm Slots and (20-30)% increased Life Recovery from Flasks" },
      { name: "Wide Belt", level: 14, detail: "Has (1-3) Charm Slots and (20-30)% increased Flask Charges gained" },
      { name: "Plate Belt", level: 25, detail: "Has (1-3) Charm Slots and +(140-180) to Armour" },
      { name: "Ornate Belt", level: 31, detail: "Has (1-3) Charm Slots" },
      { name: "Heavy Belt", level: 50, detail: "Has (1-3) Charm Slots" },
    ],
  },
  int: {
    body: [
      { name: "Tattered Robe", level: 1, detail: "energy shield body" },
      { name: "Feathered Robe", level: 5, detail: "energy shield body, requires 11 Intelligence" },
      { name: "Hexer's Robe", level: 11, detail: "energy shield body, requires 21 Intelligence" },
      { name: "Bone Raiment", level: 16, detail: "energy shield body, requires 28 Intelligence" },
      { name: "Silk Robe", level: 22, detail: "energy shield body, requires 37 Intelligence" },
      { name: "Keth Raiment", level: 28, detail: "energy shield body, requires 47 Intelligence" },
      { name: "Votive Raiment", level: 33, detail: "energy shield body, requires 54 Intelligence" },
      { name: "Altar Robe", level: 40, detail: "energy shield body, requires 65 Intelligence" },
      { name: "Elementalist Robe", level: 45, detail: "energy shield body, requires 72 Intelligence" },
      { name: "Imperial Robe", level: 52, detail: "energy shield body, requires 83 Intelligence" },
      { name: "Plated Raiment", level: 58, detail: "energy shield body, requires 92 Intelligence" },
      { name: "Havoc Raiment", level: 65, detail: "energy shield body, requires 121 Intelligence" },
    ],
    helmet: [
      { name: "Twig Circlet", level: 1, detail: "energy shield helmet" },
      { name: "Wicker Tiara", level: 10, detail: "energy shield helmet, requires 17 Intelligence" },
      { name: "Beaded Circlet", level: 16, detail: "energy shield helmet, requires 25 Intelligence" },
      { name: "Chain Tiara", level: 26, detail: "energy shield helmet, requires 38 Intelligence" },
      { name: "Feathered Tiara", level: 33, detail: "energy shield helmet, requires 48 Intelligence" },
      { name: "Gold Circlet", level: 40, detail: "energy shield helmet, requires 58 Intelligence" },
      { name: "Vermeil Circlet", level: 45, detail: "energy shield helmet, requires 64 Intelligence" },
      { name: "Noble Circlet", level: 52, detail: "energy shield helmet, requires 74 Intelligence" },
      { name: "Twilight Tiara", level: 58, detail: "energy shield helmet, requires 82 Intelligence" },
      { name: "Magus Tiara", level: 65, detail: "energy shield helmet, requires 91 Intelligence" },
    ],
    gloves: [
      { name: "Torn Gloves", level: 1, detail: "energy shield gloves" },
      { name: "Sombre Gloves", level: 12, detail: "energy shield gloves, requires 17 Intelligence" },
      { name: "Stitched Gloves", level: 16, detail: "energy shield gloves, requires 22 Intelligence" },
      { name: "Jewelled Gloves", level: 26, detail: "energy shield gloves, requires 34 Intelligence" },
      { name: "Intricate Gloves", level: 33, detail: "energy shield gloves, requires 42 Intelligence" },
      { name: "Pauascale Gloves", level: 45, detail: "energy shield gloves, requires 56 Intelligence" },
      { name: "Embroidered Gloves", level: 52, detail: "energy shield gloves, requires 64 Intelligence" },
      { name: "Adorned Gloves", level: 65, detail: "energy shield gloves, requires 80 Intelligence" },
    ],
    boots: [
      { name: "Straw Sandals", level: 1, detail: "energy shield boots" },
      { name: "Wrapped Sandals", level: 11, detail: "energy shield boots, requires 17 Intelligence" },
      { name: "Lattice Sandals", level: 16, detail: "energy shield boots, requires 23 Intelligence" },
      { name: "Silk Slippers", level: 27, detail: "energy shield boots, requires 38 Intelligence" },
      { name: "Feathered Sandals", level: 33, detail: "energy shield boots, requires 45 Intelligence" },
      { name: "Flax Sandals", level: 45, detail: "energy shield boots, requires 60 Intelligence" },
      { name: "Studded Sandals", level: 52, detail: "energy shield boots, requires 69 Intelligence" },
      { name: "Elaborate Sandals", level: 65, detail: "energy shield boots, requires 86 Intelligence" },
    ],
    belt: [
      { name: "Linen Belt", level: 1, detail: "Has (1-3) Charm Slots and (20-30)% increased Mana Recovery from Flasks" },
      { name: "Wide Belt", level: 14, detail: "Has (1-3) Charm Slots and (20-30)% increased Flask Charges gained" },
      { name: "Long Belt", level: 20, detail: "Has (1-3) Charm Slots and (15-20)% increased Charm Effect Duration" },
      { name: "Ornate Belt", level: 31, detail: "Has (1-3) Charm Slots" },
      { name: "Mail Belt", level: 40, detail: "Has (1-3) Charm Slots" },
      { name: "Heavy Belt", level: 50, detail: "Has (1-3) Charm Slots" },
    ],
  },
};

export type ShopSpec = { weaponNoun: string; defence: string; speed: string };

type Shop = { who: string; where: string };

export function shops(level: number): { armour: Shop; caster: Shop; next: string } {
  if (level < 15) {
    return {
      armour: { who: "Renly", where: "Clearfell Encampment" },
      caster: { who: "Una", where: "Clearfell Encampment" },
      next: "After Act 1, check Shambrin for weapons and armour, and Zarka for wands, staves, sceptres, rings, and amulets. Both stand in the Ardura Caravan.",
    };
  }
  if (level < 30) {
    return {
      armour: { who: "Shambrin", where: "the Ardura Caravan" },
      caster: { who: "Zarka", where: "the Ardura Caravan" },
      next: "After Act 2, check Oswald for weapons and armour, and Servi for wands, staves, sceptres, rings, and amulets. Both stand in Ziggurat Encampment.",
    };
  }
  if (level < 43) {
    return {
      armour: { who: "Oswald", where: "Ziggurat Encampment" },
      caster: { who: "Servi", where: "Ziggurat Encampment" },
      next: "After Act 3, check Dannig for weapons and armour, and Rog for wands, staves, sceptres, rings, and amulets. Both stand in Kingsmarch.",
    };
  }
  if (level < 52) {
    return {
      armour: { who: "Dannig", where: "Kingsmarch" },
      caster: { who: "Rog", where: "Kingsmarch" },
      next: "In the Stolen Barya, check Sekhema Asala for weapons and armour, and Zarka for wands, staves, sceptres, rings, and amulets. Both stand in the Khari Bazaar.",
    };
  }
  if (level < 55) {
    return {
      armour: { who: "Sekhema Asala", where: "the Khari Bazaar" },
      caster: { who: "Zarka", where: "the Khari Bazaar" },
      next: "In Doryani's Contingency, check Delwyn for weapons and armour, and Doryani for wands, staves, sceptres, rings, and amulets. Both stand in the Glade.",
    };
  }
  if (level < 58) {
    return {
      armour: { who: "Delwyn", where: "the Glade" },
      caster: { who: "Doryani", where: "the Glade" },
      next: "In the Curse of Holten, check Renly for weapons and armour, and Una for wands, staves, sceptres, rings, and amulets. Both stand in the Refuge.",
    };
  }
  if (level < 61) {
    return {
      armour: { who: "Renly", where: "the Refuge" },
      caster: { who: "Una", where: "the Refuge" },
      next: "In maps, search the trade site for the same base name and the same rolls.",
    };
  }
  return {
    armour: { who: "the trade site", where: "your hideout" },
    caster: { who: "the trade site", where: "your hideout" },
    next: "Refresh the search after you gain a few levels. The base name stays the one listed here.",
  };
}

export function defenceKey(defence: string): "str" | "dex" | "int" {
  const text = defence.toLowerCase();
  if (text.includes("energy") && !text.includes("armour") && !text.includes("evasion")) return "int";
  if (text.includes("evasion") && text.includes("energy")) return "int";
  if (text.includes("evasion")) return "dex";
  return "str";
}

export function casterWeapon(noun: string) {
  const key = weaponKind(noun);
  return key === "wand" || key === "staff" || key === "sceptre";
}

export function isCaster(spec: ShopSpec) {
  return casterWeapon(spec.weaponNoun) || spec.speed.toLowerCase().includes("cast");
}

function pick(ladder: Base[], level: number) {
  let chosen = ladder[0];
  for (const row of ladder) {
    if (row.level <= level) chosen = row;
  }
  return chosen;
}

function weaponKind(noun: string) {
  const text = noun.toLowerCase();
  if (text.includes("crossbow")) return "crossbow";
  if (text.includes("quarter")) return "quarterstaff";
  if (text.includes("bow")) return "bow";
  if (text.includes("spear")) return "spear";
  if (text.includes("mace")) return "mace";
  if (text.includes("sceptre")) return "sceptre";
  if (text.includes("wand")) return "wand";
  if (text.includes("staff")) return "staff";
  return noun;
}

function ladderFor(noun: string): Base[] {
  const key = weaponKind(noun);
  if (key === "bow") return BOW;
  if (key === "spear") return SPEAR;
  if (key === "crossbow") return CROSSBOW;
  if (key === "quarterstaff") return QUARTERSTAFF;
  if (key === "mace") return MACE;
  if (key === "wand") return WAND;
  if (key === "staff") return STAFF;
  if (key === "sceptre") return SCEPTRE;
  if (noun === "quiver") return QUIVER;
  if (noun === "shield") return SHIELD;
  return MACE;
}

export function baseAt(noun: string, level: number) {
  return pick(ladderFor(noun), level);
}

export function armourAt(slot: ArmourSlot, defence: string, level: number) {
  return pick(ARMOUR[defenceKey(defence)][slot], level);
}

function shopFor(noun: string, level: number) {
  const row = shops(level);
  return casterWeapon(noun) ? row.caster : row.armour;
}

function place(shop: Shop) {
  return `${shop.who} in ${shop.where}`;
}

function fallback(shop: Shop, base: string, level: number) {
  const row = shops(level);
  if (level >= 61) {
    return `If the trade site has no ${base} with one of those rolls, buy a normal ${base} and use an Orb of Transmutation, then an Orb of Augmentation. ${row.next}`;
  }
  return `If ${shop.who} has no ${base} with one of those rolls, buy a normal ${base} and use an Orb of Transmutation, then an Orb of Augmentation. ${row.next}`;
}

function weaponRolls(noun: string, level: number): { accept: string[]; ideal: string[] } {
  const key = weaponKind(noun);
  const early = level < 66;
  if (key === "bow" || key === "spear") {
    const speed = key === "spear" ? "(26-28)% increased Attack Speed" : "(17-19)% increased Attack Speed";
    const low = ["(4-6) to (7-11) added Physical Damage", "(5-7)% increased Attack Speed", "+1 to Level of all Projectile Skills"];
    const high = ["(26-39) to (44-66) added Physical Damage", "(155-169)% increased Physical Damage", speed, "+4 to Level of all Projectile Skills"];
    return early ? { accept: low, ideal: ["(40-49)% increased Physical Damage", ...high] } : { accept: high, ideal: high };
  }
  if (key === "crossbow") {
    const high = ["(37-55) to (63-94) added Physical Damage", "(17-19)% increased Attack Speed", "+5 to Level of all Projectile Skills"];
    return early
      ? { accept: ["(5-8) to (10-15) added Physical Damage", "(5-7)% increased Attack Speed", "+2 to Level of all Projectile Skills"], ideal: high }
      : { accept: high, ideal: high };
  }
  if (key === "quarterstaff") {
    const high = ["(37-55) to (63-94) added Physical Damage", "(26-28)% increased Attack Speed", "+5 to Level of all Melee Skills"];
    return early
      ? { accept: ["(5-8) to (10-15) added Physical Damage", "(5-7)% increased Attack Speed", "+2 to Level of all Melee Skills"], ideal: high }
      : { accept: high, ideal: high };
  }
  if (key === "wand") {
    return early
      ? {
          accept: ["+1 to Level of all Spell Skills", "(9-12)% increased Cast Speed", "+5-8 Intelligence"],
          ideal: ["+4 to Level of all Spell Skills", "(33-35)% increased Cast Speed", "+28-30 Intelligence"],
        }
      : {
          accept: ["+4 to Level of all Spell Skills", "(33-35)% increased Cast Speed", "+28-30 Intelligence"],
          ideal: ["+4 to Level of all Spell Skills", "(33-35)% increased Cast Speed", "+28-30 Intelligence"],
        };
  }
  if (key === "staff") {
    return early
      ? {
          accept: ["+2 to Level of all Spell Skills", "(14-19)% increased Cast Speed", "+5-8 Intelligence"],
          ideal: ["(5-6) to Level of all Spell Skills", "(50-52)% increased Cast Speed", "+28-30 Intelligence"],
        }
      : {
          accept: ["(5-6) to Level of all Spell Skills", "(50-52)% increased Cast Speed", "+28-30 Intelligence"],
          ideal: ["(5-6) to Level of all Spell Skills", "(50-52)% increased Cast Speed", "+28-30 Intelligence"],
        };
  }
  if (key === "sceptre") {
    return early
      ? {
          accept: ["+1 to Level of all Minion Skills", "(5-7)% increased Attack Speed for allies in your Presence", "+5-8 Intelligence"],
          ideal: ["+4 to Level of all Minion Skills", "(14-16)% increased Attack Speed for allies in your Presence", "+28-30 Intelligence"],
        }
      : {
          accept: ["+4 to Level of all Minion Skills", "(14-16)% increased Attack Speed for allies in your Presence", "+28-30 Intelligence"],
          ideal: ["+4 to Level of all Minion Skills", "(14-16)% increased Attack Speed for allies in your Presence", "+28-30 Intelligence"],
        };
  }
  return early
    ? {
        accept: ["(4-6) to (7-11) added Physical Damage", "(40-49)% increased Physical Damage", "+5-8 Strength"],
        ideal: ["(26-39) to (44-66) added Physical Damage", "(155-169)% increased Physical Damage", "+28-30 Strength"],
      }
    : {
        accept: ["(26-39) to (44-66) added Physical Damage", "(155-169)% increased Physical Damage", "+28-30 Strength"],
        ideal: ["(26-39) to (44-66) added Physical Damage", "(155-169)% increased Physical Damage", "+28-30 Strength"],
      };
}

function bullets(lines: string[]) {
  return lines.map((line) => `• ${line}`).join("\n");
}

function ignoreWeapon(noun: string) {
  if (noun === "bow") {
    return "Ignore item rarity, critical hit chance, and any unique. Ignore an Artillery Bow. That base has 50% reduced Projectile Range.";
  }
  if (noun === "quiver") {
    return "Ignore item rarity. A quiver rolls +1 to Level of all Projectile Skills. It does not roll +2 or +3.";
  }
  return "Ignore item rarity, stun threshold, and any unique you would have to buy.";
}

export function weaponStats(noun: string, level: number) {
  return weaponRolls(noun, level).accept.slice(0, 3);
}

export function weaponText(noun: string, level: number) {
  const key = weaponKind(noun);
  const shop = shopFor(key, level);
  const base = baseAt(key, level);
  const rolls = weaponRolls(key, level);
  const great = key === "mace" ? pick(GREAT, level) : null;
  const shield = noun.toLowerCase().includes("shield") ? baseAt("shield", level) : null;
  const hand = great
    ? `With a shield equipped, buy the one-hand mace. The two-hand mace at this level is a ${great.name} (${great.detail}), and it fills both hands.`
    : "";
  const off = shield ? `The shield at this level is a ${shield.name} (${shield.detail}).` : "";
  const bowNext = key === "bow" ? "A Shortbow needs level 5 and 12 Dexterity. A Recurve Bow needs level 16 and 31 Dexterity." : "";
  return [
    `Buy a ${noun} from ${place(shop)}.`,
    `The base at level ${level} is a ${base.name} (${base.detail}).`,
    bowNext,
    hand,
    off,
    "Acceptable on that base:",
    bullets(rolls.accept),
    "Ideal once the item level can roll it:",
    bullets(rolls.ideal),
    ignoreWeapon(key),
    fallback(shop, base.name, level),
  ]
    .filter(Boolean)
    .join("\n");
}

export function quiverText(level: number) {
  const shop = shops(level).armour;
  const base = baseAt("quiver", level);
  const rolls = level < 66
    ? ["+1 to Level of all Projectile Skills", "(5-7)% increased Attack Speed", "(8-10)% increased Attack Speed"]
    : ["+1 to Level of all Projectile Skills", "(14-16)% increased Attack Speed", "(11-13)% increased Attack Speed"];
  return [
    `Buy a quiver from ${place(shop)}.`,
    `The base at level ${level} is a ${base.name}. ${base.detail}. At level 1 the Broadhead Quiver adds 1 to 3 Physical Damage to Attacks. Keep that one unless this build's damage is fire, in which case a level 8 Fire Quiver adds 3 to 5 Fire damage to Attacks.`,
    "Acceptable:",
    bullets(rolls),
    "Ideal stays +1 to Level of all Projectile Skills, with (14-16)% increased Attack Speed.",
    ignoreWeapon("quiver"),
    fallback(shop, base.name, level),
  ].join("\n");
}

function lifeLine(defence: string, level: number) {
  const energy = defenceKey(defence) === "int";
  if (level < 16) return energy ? "+10-17 maximum Energy Shield" : "+10-19 maximum Life";
  if (level < 33) return energy ? "+25-30 maximum Energy Shield" : "+30-39 maximum Life";
  if (level < 52) return energy ? "+36-41 maximum Energy Shield" : "+60-69 maximum Life";
  if (level < 66) return energy ? "+61-73 maximum Energy Shield" : "+100-119 maximum Life";
  return energy ? "+91-96 maximum Energy Shield" : "+200-214 maximum Life";
}

function resistLine(level: number) {
  if (level < 16) return "+6-10% Fire Resistance, +6-10% Cold Resistance, and +6-10% Lightning Resistance";
  if (level < 33) return "+11-15% Fire Resistance, +11-15% Cold Resistance, and +11-15% Lightning Resistance";
  if (level < 52) return "+16-20% Fire Resistance, +16-20% Cold Resistance, and +16-20% Lightning Resistance";
  if (level < 66) return "+26-30% Fire Resistance, +26-30% Cold Resistance, and +26-30% Lightning Resistance";
  return "+36-40% Fire Resistance, +36-40% Cold Resistance, and +36-40% Lightning Resistance";
}

function moveLine(level: number) {
  if (level < 16) return "10% increased Movement Speed is acceptable. Ideal at item level 16 is 15% increased Movement Speed.";
  if (level < 33) return "15% increased Movement Speed is acceptable. Ideal at item level 33 is 20% increased Movement Speed.";
  if (level < 46) return "20% increased Movement Speed is acceptable. Ideal at item level 46 is 25% increased Movement Speed.";
  if (level < 65) return "25% increased Movement Speed is acceptable. Ideal at item level 65 is 30% increased Movement Speed.";
  return "30% increased Movement Speed is acceptable. Ideal at item level 82 is 35% increased Movement Speed.";
}

export function armourText(defence: string, level: number, caster: boolean) {
  const row = shops(level);
  const armour = row.armour;
  const jewels = row.caster;
  const body = armourAt("body", defence, level);
  const helm = armourAt("helmet", defence, level);
  const gloves = armourAt("gloves", defence, level);
  const boots = armourAt("boots", defence, level);
  const belt = armourAt("belt", defence, level);
  const life = lifeLine(defence, level);
  const resist = resistLine(level);
  const ring = caster
    ? "Buy a Lazuli Ring from the jewellery shop. The base is +(20-30) to maximum Mana. At level 8 a Ruby Ring is +(20-30)% to Fire Resistance, at level 12 a Sapphire Ring is +(20-30)% to Cold Resistance, and at level 16 a Topaz Ring is +(20-30)% to Lightning Resistance."
    : "Buy an Iron Ring from the jewellery shop. The base Adds 1 to 4 Physical Damage to Attacks. At level 8 a Ruby Ring is +(20-30)% to Fire Resistance, at level 12 a Sapphire Ring is +(20-30)% to Cold Resistance, and at level 16 a Topaz Ring is +(20-30)% to Lightning Resistance.";
  const key = defenceKey(defence);
  const amulet = key === "int"
    ? "At level 1 buy an Azure Amulet, (20-30)% increased Mana Regeneration Rate. At level 8 buy a Lapis Amulet. The base itself is +(10-15) to Intelligence."
    : key === "dex"
      ? "At level 1 buy a Crimson Amulet, (2-4) Life Regeneration per second. At level 8 buy a Jade Amulet. The base itself is +(10-15) to Dexterity."
      : "At level 1 buy a Crimson Amulet, (2-4) Life Regeneration per second. At level 8 buy an Amber Amulet. The base itself is +(10-15) to Strength.";
  return [
    `Buy the armour from ${place(armour)}.`,
    `Boots: a ${boots.name}. ${boots.detail}. ${moveLine(level)} Also take ${life} and one of ${resist}.`,
    `Body: a ${body.name}. ${body.detail}. Acceptable: ${life}. Ideal on a body in maps is ${defenceKey(defence) === "int" ? "+91-96 maximum Energy Shield and (101-110)% increased Energy Shield" : "+200-214 maximum Life"}. A Greater Iron Rune in the body socket adds 18% increased Armour, Evasion and Energy Shield.`,
    `Helmet: a ${helm.name}. ${helm.detail}. Acceptable: ${life}.`,
    `Gloves: a ${gloves.name}. ${gloves.detail}. Acceptable: ${life}.`,
    `Belt: a ${belt.name} from ${place(armour)}. ${belt.detail}. Acceptable: ${life}.`,
    `Rings and amulets are ${place(jewels)}, in the same town.`,
    ring,
    amulet,
    "Ignore boots with 0% increased Movement Speed. Ignore stun threshold and life regeneration on the armour. Ignore a second life roll while one of fire, cold, or lightning is still under 75%.",
    fallback(armour, boots.name, level),
  ].join("\n");
}

function pieceText(slot: string, spec: ShopSpec, level: number) {
  const twoHand = spec.weaponNoun === "quarterstaff" || spec.weaponNoun === "staff";
  if (/shield/i.test(slot) && twoHand) return "This weapon is two-handed. Leave the shield slot empty.";
  if (/quiver/i.test(slot)) return quiverText(level);
  if (/shield/i.test(slot)) {
    const shop = shops(level).armour;
    const base = baseAt("shield", level);
    const life = lifeLine(spec.defence, level);
    return [
      `Buy a shield from ${place(shop)}.`,
      `The base at level ${level} is a ${base.name}. ${base.detail}.`,
      `Acceptable: ${life}, and ${resistLine(level)}.`,
      "Ignore block chance and item rarity.",
      fallback(shop, base.name, level),
    ].join("\n");
  }
  if (/bow|spear|crossbow|quarterstaff|mace|wand|staff|sceptre|weapon/i.test(slot)) return weaponText(spec.weaponNoun, level);
  const row = shops(level);
  const caster = isCaster(spec);
  const life = lifeLine(spec.defence, level);
  if (/boot/i.test(slot)) {
    const base = armourAt("boots", spec.defence, level);
    return [
      `Buy boots from ${place(row.armour)}.`,
      `The base at level ${level} is ${base.name}. ${base.detail}.`,
      moveLine(level),
      `Also take ${life} and one of ${resistLine(level)}.`,
      "Ignore a pair with 0% increased Movement Speed, stun threshold, and life regeneration.",
      fallback(row.armour, base.name, level),
    ].join("\n");
  }
  if (/body|helm|glove|belt/i.test(slot)) {
    const key: ArmourSlot = /body/i.test(slot) ? "body" : /helm/i.test(slot) ? "helmet" : /glove/i.test(slot) ? "gloves" : "belt";
    const base = armourAt(key, spec.defence, level);
    const rune = /body/i.test(slot) ? " A Greater Iron Rune in the body socket adds 18% increased Armour, Evasion and Energy Shield." : "";
    return [
      `Buy this from ${place(row.armour)}.`,
      `The base at level ${level} is ${base.name}. ${base.detail}.`,
      `Acceptable: ${life}, and one of ${resistLine(level)}.${rune}`,
      "Ignore stun threshold, life regeneration, and item rarity.",
      fallback(row.armour, base.name, level),
    ].join("\n");
  }
  if (/ring|amulet/i.test(slot)) {
    const key = defenceKey(spec.defence);
    const amulet = key === "int" ? "a Lapis Amulet at level 8, +(10-15) to Intelligence" : key === "dex" ? "a Jade Amulet at level 8, +(10-15) to Dexterity" : "an Amber Amulet at level 8, +(10-15) to Strength";
    const ring = caster
      ? "a Lazuli Ring at level 1, +(20-30) to maximum Mana"
      : "an Iron Ring at level 1, Adds 1 to 4 Physical Damage to Attacks";
    const named = /amulet/i.test(slot) ? amulet : ring;
    return [
      `Buy this from ${place(row.caster)}.`,
      `Take ${named}.`,
      "At level 8 a Ruby Ring is +(20-30)% to Fire Resistance. At level 12 a Sapphire Ring is +(20-30)% to Cold Resistance. At level 16 a Topaz Ring is +(20-30)% to Lightning Resistance.",
      `Acceptable rare rolls: ${life}, and ${resistLine(level)}.`,
      "Ignore a second life roll while fire, cold, or lightning is still under 75%.",
      fallback(row.caster, /amulet/i.test(slot) ? "amulet" : "ring", level),
    ].join("\n");
  }
  return armourText(spec.defence, level, caster);
}

export function slotStage(slot: string, spec: ShopSpec): [string, string, string] {
  return [pieceText(slot, spec, 1), pieceText(slot, spec, 28), pieceText(slot, spec, 66)];
}

export function baseLabel(slot: string, spec: ShopSpec) {
  if (/quiver/i.test(slot)) {
    const base = baseAt("quiver", 1);
    return `${base.name}. ${base.detail}.`;
  }
  if (/shield/i.test(slot)) {
    if (spec.weaponNoun === "quarterstaff" || spec.weaponNoun === "staff") return "No shield. This weapon uses both hands.";
    const base = baseAt("shield", 1);
    return `${base.name}. ${base.detail}.`;
  }
  if (/bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff/i.test(slot)) {
    const now = baseAt(spec.weaponNoun, 1);
    const mid = baseAt(spec.weaponNoun, 16);
    const maps = baseAt(spec.weaponNoun, 65);
    if (weaponKind(spec.weaponNoun) === "bow") {
      return "Crude Bow at level 1. Shortbow at level 5. Recurve Bow at level 16. Heavy Bow at level 65.";
    }
    return `${now.name} at level 1. ${mid.name} at level ${mid.level}. ${maps.name} at level ${maps.level}.`;
  }
  const key = defenceKey(spec.defence);
  const slotKey: ArmourSlot | null = /body/i.test(slot)
    ? "body"
    : /helm/i.test(slot)
      ? "helmet"
      : /glove/i.test(slot)
        ? "gloves"
        : /boot/i.test(slot)
          ? "boots"
          : /belt/i.test(slot)
            ? "belt"
            : null;
  if (slotKey) {
    const now = armourAt(slotKey, spec.defence, 1);
    const mid = armourAt(slotKey, spec.defence, 16);
    return `${now.name} (${key}) at level 1. ${mid.name} at level ${mid.level}.`;
  }
  if (/amulet/i.test(slot)) {
    if (key === "int") return "Azure Amulet at level 1. Lapis Amulet at level 8, +(10-15) to Intelligence.";
    if (key === "dex") return "Crimson Amulet at level 1. Jade Amulet at level 8, +(10-15) to Dexterity.";
    return "Crimson Amulet at level 1. Amber Amulet at level 8, +(10-15) to Strength.";
  }
  if (/ring/i.test(slot)) {
    return isCaster(spec)
      ? "Lazuli Ring at level 1, +(20-30) to maximum Mana. Ruby Ring at level 8."
      : "Iron Ring at level 1, Adds 1 to 4 Physical Damage to Attacks. Ruby Ring at level 8.";
  }
  return slot;
}

export function howToBuy(slot: string, spec: ShopSpec) {
  return slotStage(slot, spec)[0];
}

export function weaponLine(noun: string, level: number) {
  const base = baseAt(noun, level);
  const shop = shopFor(noun, level);
  return `${place(shop)}: a ${base.name}. ${base.detail}.`;
}
