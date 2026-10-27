// Vendors: Maxroll campaign walkthrough, updated 2026-06-02.
// https://maxroll.gg/poe2/getting-started/path-of-exile-2-campaign-guide
// Bases and implicits: poe2db item pages, read 2026-10-26 (patch 0.5.5).
// https://poe2db.tw/us/Bows and the matching pages for each weapon and armour class.
// Rare-mod numbers are the single tiers already checked in statLines.ts.

// Shopping lines name the vendor and the one base for that stage.
// Tier ladders, item-level gates, and vendor-category notes stay in the comments above and in statLines.ts.

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
  { name: "Seaglass Spear", level: 51, detail: "physical damage 29-53, 1.60 attacks per second, requires 29 Strength, 71 Dexterity, and 50 Intelligence" },
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
type DefenceFamily = "str" | "dex" | "int" | "strdex" | "dexint";

const ARMOUR: Record<DefenceFamily, Record<ArmourSlot, Base[]>> = {
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
  strdex: {
    body: [
      { name: "Chain Mail", level: 1, detail: "armour and evasion body" },
      { name: "Rogue Armour", level: 11, detail: "armour and evasion body, requires 13 Strength and 13 Dexterity" },
      { name: "Vagabond Armour", level: 16, detail: "armour and evasion body, requires 17 Strength and 17 Dexterity" },
      { name: "Cloaked Mail", level: 26, detail: "armour and evasion body, requires 25 Strength and 25 Dexterity" },
      { name: "Explorer Armour", level: 33, detail: "armour and evasion body, requires 31 Strength and 31 Dexterity" },
      { name: "Scale Mail", level: 37, detail: "armour and evasion body, requires 34 Strength and 34 Dexterity" },
      { name: "Knight Armour", level: 45, detail: "armour and evasion body, requires 41 Strength and 41 Dexterity" },
      { name: "Ancestral Mail", level: 50, detail: "armour and evasion body, requires 44 Strength and 44 Dexterity" },
      { name: "Lamellar Mail", level: 52, detail: "armour and evasion body, requires 46 Strength and 46 Dexterity" },
      { name: "Gladiator Armour", level: 58, detail: "armour and evasion body, requires 51 Strength and 51 Dexterity" },
      { name: "Heroic Armour", level: 65, detail: "armour and evasion body, requires 67 Strength and 67 Dexterity" },
      { name: "Tournament Mail", level: 68, detail: "armour and evasion body, requires 67 Strength and 67 Dexterity" },
      { name: "Slayer Armour", level: 73, detail: "armour and evasion body, requires 67 Strength and 67 Dexterity" },
      { name: "Death Mail", level: 75, detail: "armour and evasion body, requires 67 Strength and 67 Dexterity" },
      { name: "Thane Mail", level: 80, detail: "armour and evasion body, requires 67 Strength and 67 Dexterity" },
    ],
    helmet: [
      { name: "Rusted Greathelm", level: 1, detail: "armour helmet. Armour-and-evasion helmets start at level 5 with a Brimmed Helm, which requires 7 Strength and 7 Dexterity" },
      { name: "Brimmed Helm", level: 5, detail: "armour and evasion helmet, requires 7 Strength and 7 Dexterity" },
      { name: "Guarded Helm", level: 11, detail: "armour and evasion helmet, requires 11 Strength and 11 Dexterity" },
      { name: "Visored Helm", level: 16, detail: "armour and evasion helmet, requires 15 Strength and 15 Dexterity" },
      { name: "Cowled Helm", level: 26, detail: "armour and evasion helmet, requires 22 Strength and 22 Dexterity" },
      { name: "Shielded Helm", level: 33, detail: "armour and evasion helmet, requires 27 Strength and 27 Dexterity" },
      { name: "Closed Helm", level: 45, detail: "armour and evasion helmet, requires 36 Strength and 36 Dexterity" },
      { name: "Decorated Helm", level: 52, detail: "armour and evasion helmet, requires 41 Strength and 41 Dexterity" },
      { name: "Gallant Helm", level: 65, detail: "armour and evasion helmet, requires 50 Strength and 50 Dexterity" },
      { name: "Cryptic Helm", level: 70, detail: "armour and evasion helmet, requires 54 Strength and 54 Dexterity" },
      { name: "Champion Helm", level: 75, detail: "armour and evasion helmet, requires 59 Strength and 59 Dexterity" },
      { name: "Gladiatorial Helm", level: 80, detail: "armour and evasion helmet, requires 63 Strength and 63 Dexterity" },
    ],
    gloves: [
      { name: "Stocky Mitts", level: 1, detail: "armour gloves. Armour-and-evasion gloves start at level 6 with Ringmail Gauntlets, which require 6 Strength and 6 Dexterity" },
      { name: "Ringmail Gauntlets", level: 6, detail: "armour and evasion gloves, requires 6 Strength and 6 Dexterity" },
      { name: "Layered Gauntlets", level: 16, detail: "armour and evasion gloves, requires 13 Strength and 13 Dexterity" },
      { name: "Doubled Gauntlets", level: 33, detail: "armour and evasion gloves, requires 24 Strength and 24 Dexterity" },
      { name: "Plate Gauntlets", level: 45, detail: "armour and evasion gloves, requires 32 Strength and 32 Dexterity" },
      { name: "Burnished Gauntlets", level: 52, detail: "armour and evasion gloves, requires 36 Strength and 36 Dexterity" },
      { name: "Ornate Gauntlets", level: 65, detail: "armour and evasion gloves, requires 44 Strength and 44 Dexterity" },
      { name: "Ancient Gauntlets", level: 70, detail: "armour and evasion gloves, requires 52 Strength and 52 Dexterity" },
      { name: "Cultist Gauntlets", level: 75, detail: "armour and evasion gloves, requires 52 Strength and 52 Dexterity" },
      { name: "Blacksteel Gauntlets", level: 80, detail: "armour and evasion gloves, requires 55 Strength and 55 Dexterity" },
    ],
    boots: [
      { name: "Rough Greaves", level: 1, detail: "armour boots. Armour-and-evasion boots start at level 6 with Mail Sabatons, which require 7 Strength and 7 Dexterity" },
      { name: "Mail Sabatons", level: 6, detail: "armour and evasion boots, requires 7 Strength and 7 Dexterity" },
      { name: "Braced Sabatons", level: 16, detail: "armour and evasion boots, requires 14 Strength and 14 Dexterity" },
      { name: "Stacked Sabatons", level: 33, detail: "armour and evasion boots, requires 26 Strength and 26 Dexterity" },
      { name: "Covered Sabatons", level: 45, detail: "armour and evasion boots, requires 34 Strength and 34 Dexterity" },
      { name: "Flexile Sabatons", level: 52, detail: "armour and evasion boots, requires 38 Strength and 38 Dexterity" },
      { name: "Bold Sabatons", level: 65, detail: "armour and evasion boots, requires 47 Strength and 47 Dexterity" },
      { name: "Noble Sabatons", level: 70, detail: "armour and evasion boots, requires 51 Strength and 51 Dexterity" },
      { name: "Fortress Sabatons", level: 75, detail: "armour and evasion boots, requires 56 Strength and 56 Dexterity" },
      { name: "Blacksteel Sabatons", level: 80, detail: "armour and evasion boots, requires 59 Strength and 59 Dexterity" },
    ],
    belt: [
      { name: "Rawhide Belt", level: 1, detail: "Has (1-3) Charm Slots and (20-30)% increased Life Recovery from Flasks" },
      { name: "Wide Belt", level: 14, detail: "Has (1-3) Charm Slots and (20-30)% increased Flask Charges gained" },
      { name: "Plate Belt", level: 25, detail: "Has (1-3) Charm Slots and +(140-180) to Armour" },
      { name: "Ornate Belt", level: 31, detail: "Has (1-3) Charm Slots" },
      { name: "Heavy Belt", level: 50, detail: "Has (1-3) Charm Slots" },
    ],
  },
  dexint: {
    body: [
      { name: "Hermit Garb", level: 1, detail: "evasion and energy shield body" },
      { name: "Waxed Jacket", level: 11, detail: "evasion and energy shield body, requires 13 Dexterity and 13 Intelligence" },
      { name: "Marabout Garb", level: 16, detail: "evasion and energy shield body, requires 17 Dexterity and 17 Intelligence" },
      { name: "Wayfarer Jacket", level: 28, detail: "evasion and energy shield body, requires 26 Dexterity and 26 Intelligence" },
      { name: "Anchorite Garb", level: 33, detail: "evasion and energy shield body, requires 31 Dexterity and 31 Intelligence" },
      { name: "Scalper's Jacket", level: 39, detail: "evasion and energy shield body, requires 35 Dexterity and 35 Intelligence" },
      { name: "Scoundrel Jacket", level: 45, detail: "evasion and energy shield body, requires 41 Dexterity and 41 Intelligence" },
      { name: "Ascetic Garb", level: 51, detail: "evasion and energy shield body, requires 45 Dexterity and 45 Intelligence" },
      { name: "Clandestine Jacket", level: 52, detail: "evasion and energy shield body, requires 46 Dexterity and 46 Intelligence" },
      { name: "Monastic Garb", level: 56, detail: "evasion and energy shield body, requires 50 Dexterity and 50 Intelligence" },
      { name: "Torment Jacket", level: 65, detail: "evasion and energy shield body, requires 67 Dexterity and 67 Intelligence" },
      { name: "Devout Garb", level: 68, detail: "evasion and energy shield body, requires 67 Dexterity and 67 Intelligence" },
      { name: "Assassin Garb", level: 73, detail: "evasion and energy shield body, requires 67 Dexterity and 67 Intelligence" },
      { name: "Falconer's Jacket", level: 75, detail: "evasion and energy shield body, requires 67 Dexterity and 67 Intelligence" },
      { name: "Austere Garb", level: 80, detail: "evasion and energy shield body, requires 67 Dexterity and 67 Intelligence" },
    ],
    helmet: [
      { name: "Shabby Hood", level: 1, detail: "evasion helmet. Evasion-and-energy-shield helmets start at level 5 with a Hewn Mask, which requires 7 Dexterity and 7 Intelligence" },
      { name: "Hewn Mask", level: 5, detail: "evasion and energy shield helmet, requires 7 Dexterity and 7 Intelligence" },
      { name: "Face Mask", level: 10, detail: "evasion and energy shield helmet, requires 10 Dexterity and 10 Intelligence" },
      { name: "Hooded Mask", level: 16, detail: "evasion and energy shield helmet, requires 15 Dexterity and 15 Intelligence" },
      { name: "Veiled Mask", level: 28, detail: "evasion and energy shield helmet, requires 23 Dexterity and 23 Intelligence" },
      { name: "Tribal Mask", level: 33, detail: "evasion and energy shield helmet, requires 27 Dexterity and 27 Intelligence" },
      { name: "Solid Mask", level: 45, detail: "evasion and energy shield helmet, requires 36 Dexterity and 36 Intelligence" },
      { name: "Shaded Mask", level: 52, detail: "evasion and energy shield helmet, requires 41 Dexterity and 41 Intelligence" },
      { name: "Death Mask", level: 65, detail: "evasion and energy shield helmet, requires 50 Dexterity and 50 Intelligence" },
      { name: "Faridun Mask", level: 70, detail: "evasion and energy shield helmet, requires 54 Dexterity and 54 Intelligence" },
      { name: "Soaring Mask", level: 75, detail: "evasion and energy shield helmet, requires 59 Dexterity and 59 Intelligence" },
      { name: "Grinning Mask", level: 80, detail: "evasion and energy shield helmet, requires 63 Dexterity and 63 Intelligence" },
    ],
    gloves: [
      { name: "Suede Bracers", level: 1, detail: "evasion gloves. Evasion-and-energy-shield gloves start at level 4 with Gauze Wraps, which require 6 Dexterity and 6 Intelligence" },
      { name: "Gauze Wraps", level: 4, detail: "evasion and energy shield gloves, requires 6 Dexterity and 6 Intelligence" },
      { name: "Linen Wraps", level: 16, detail: "evasion and energy shield gloves, requires 13 Dexterity and 13 Intelligence" },
      { name: "Spiral Wraps", level: 33, detail: "evasion and energy shield gloves, requires 24 Dexterity and 24 Intelligence" },
      { name: "Buckled Wraps", level: 45, detail: "evasion and energy shield gloves, requires 32 Dexterity and 32 Intelligence" },
      { name: "Furtive Wraps", level: 52, detail: "evasion and energy shield gloves, requires 36 Dexterity and 36 Intelligence" },
      { name: "Utility Wraps", level: 65, detail: "evasion and energy shield gloves, requires 44 Dexterity and 44 Intelligence" },
      { name: "Elegant Wraps", level: 70, detail: "evasion and energy shield gloves, requires 48 Dexterity and 48 Intelligence" },
      { name: "Vaal Wraps", level: 75, detail: "evasion and energy shield gloves, requires 52 Dexterity and 52 Intelligence" },
      { name: "Secured Wraps", level: 80, detail: "evasion and energy shield gloves, requires 55 Dexterity and 55 Intelligence" },
    ],
    boots: [
      { name: "Rawhide Boots", level: 1, detail: "evasion boots. Evasion-and-energy-shield boots start at level 5 with Frayed Shoes, which require 7 Dexterity and 7 Intelligence" },
      { name: "Frayed Shoes", level: 5, detail: "evasion and energy shield boots, requires 7 Dexterity and 7 Intelligence" },
      { name: "Threaded Shoes", level: 16, detail: "evasion and energy shield boots, requires 14 Dexterity and 14 Intelligence" },
      { name: "Hunting Shoes", level: 33, detail: "evasion and energy shield boots, requires 26 Dexterity and 26 Intelligence" },
      { name: "Steelpoint Shoes", level: 45, detail: "evasion and energy shield boots, requires 34 Dexterity and 34 Intelligence" },
      { name: "Velour Shoes", level: 52, detail: "evasion and energy shield boots, requires 38 Dexterity and 38 Intelligence" },
      { name: "Bladed Shoes", level: 65, detail: "evasion and energy shield boots, requires 47 Dexterity and 47 Intelligence" },
      { name: "Charmed Shoes", level: 70, detail: "evasion and energy shield boots, requires 51 Dexterity and 51 Intelligence" },
      { name: "Quickslip Shoes", level: 75, detail: "evasion and energy shield boots, requires 56 Dexterity and 56 Intelligence" },
      { name: "Daggerfoot Shoes", level: 80, detail: "evasion and energy shield boots, requires 59 Dexterity and 59 Intelligence" },
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

export function defenceKey(defence: string): DefenceFamily {
  const text = defence.toLowerCase();
  if (text.includes("armour") && text.includes("evasion") && !text.includes("energy")) return "strdex";
  if (text.includes("evasion") && text.includes("energy")) return "dexint";
  if (text.includes("intelligence")) return "int";
  if (text.includes("energy") && !text.includes("armour") && !text.includes("evasion")) return "int";
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

const PLURAL_BASE = /(?:Boots|Sandals|Greaves|Bracers|Gloves|Gauntlets|Mitts|Sabatons|Wraps|Shoes)$/;

export function withArticle(name: string) {
  if (PLURAL_BASE.test(name)) return name;
  return /^[aeiou]/i.test(name) ? `an ${name}` : `a ${name}`;
}

type TaggedRoll = { ilvl: number; text: string };

function best(rows: TaggedRoll[], level: number) {
  let chosen: TaggedRoll | undefined;
  for (const row of rows) {
    if (row.ilvl <= level) chosen = row;
  }
  return chosen;
}

function nextRoll(rows: TaggedRoll[], level: number) {
  return rows.find((row) => row.ilvl > level);
}

const PHYS_PERCENT: TaggedRoll[] = [
  { ilvl: 1, text: "(40-49)% increased Physical Damage" },
  { ilvl: 8, text: "(50-64)% increased Physical Damage" },
  { ilvl: 16, text: "(65-84)% increased Physical Damage" },
  { ilvl: 33, text: "(85-109)% increased Physical Damage" },
  { ilvl: 46, text: "(110-134)% increased Physical Damage" },
  { ilvl: 60, text: "(135-154)% increased Physical Damage" },
  { ilvl: 75, text: "(155-169)% increased Physical Damage" },
  { ilvl: 82, text: "(170-179)% increased Physical Damage" },
];

// poe2db PhysicalDamage on bows, spears, and one-hand maces.
const FLAT_ONE_HAND: TaggedRoll[] = [
  { ilvl: 1, text: "Adds (1-2) to (4-5) Physical Damage" },
  { ilvl: 8, text: "Adds (4-6) to (7-11) Physical Damage" },
  { ilvl: 16, text: "Adds (6-9) to (11-16) Physical Damage" },
  { ilvl: 33, text: "Adds (8-12) to (14-21) Physical Damage" },
  { ilvl: 46, text: "Adds (10-15) to (18-26) Physical Damage" },
  { ilvl: 54, text: "Adds (13-20) to (23-35) Physical Damage" },
  { ilvl: 60, text: "Adds (16-24) to (28-42) Physical Damage" },
  { ilvl: 65, text: "Adds (21-31) to (36-53) Physical Damage" },
  { ilvl: 75, text: "Adds (26-39) to (44-66) Physical Damage" },
];

// poe2db PhysicalDamage on crossbows, quarterstaves, two-hand maces, and talismans.
const FLAT_TWO_HAND: TaggedRoll[] = [
  { ilvl: 1, text: "Adds (2-3) to (5-7) Physical Damage" },
  { ilvl: 8, text: "Adds (5-8) to (10-15) Physical Damage" },
  { ilvl: 16, text: "Adds (8-12) to (15-22) Physical Damage" },
  { ilvl: 33, text: "Adds (11-17) to (20-30) Physical Damage" },
  { ilvl: 46, text: "Adds (14-21) to (25-37) Physical Damage" },
  { ilvl: 54, text: "Adds (19-29) to (33-49) Physical Damage" },
  { ilvl: 60, text: "Adds (23-35) to (39-59) Physical Damage" },
  { ilvl: 65, text: "Adds (29-44) to (50-75) Physical Damage" },
  { ilvl: 75, text: "Adds (37-55) to (63-94) Physical Damage" },
];

// Bows and crossbows stop at item level 37. Spears, maces, and quarterstaves continue.
const ATTACK_SPEED_BOW: TaggedRoll[] = [
  { ilvl: 1, text: "(5-7)% increased Attack Speed" },
  { ilvl: 11, text: "(8-10)% increased Attack Speed" },
  { ilvl: 22, text: "(11-13)% increased Attack Speed" },
  { ilvl: 30, text: "(14-16)% increased Attack Speed" },
  { ilvl: 37, text: "(17-19)% increased Attack Speed" },
];

const ATTACK_SPEED_MELEE: TaggedRoll[] = [
  ...ATTACK_SPEED_BOW,
  { ilvl: 45, text: "(20-22)% increased Attack Speed" },
  { ilvl: 60, text: "(23-25)% increased Attack Speed" },
  { ilvl: 77, text: "(26-28)% increased Attack Speed" },
];

function plusGem(kind: "Projectile" | "Melee" | "Spell" | "Minion", start: 1 | 2, levels: number[]) {
  return levels.map((ilvl, index) => ({ ilvl, text: `+${start + index} to Level of all ${kind} Skills` }));
}

const PHYS_IDEAL = [
  "Ideal at item level 75: (155-169)% increased Physical Damage.",
  "Ideal at item level 82: (170-179)% increased Physical Damage.",
];

function fromLine(row: TaggedRoll | undefined) {
  return row ? `From item level ${row.ilvl}: ${row.text}.` : "";
}

const GEM_LEVELS = [18, 36, 55, 81];

export function weaponRollPlan(noun: string, level: number): { now: string[]; later: string[]; ideal: string[]; gem: string } {
  const key = weaponKind(noun);
  const martial = key === "bow" || key === "spear" || key === "crossbow" || key === "quarterstaff" || key === "mace";
  if (martial) {
    const twoHandFlat = key === "crossbow" || key === "quarterstaff";
    const speed = key === "bow" || key === "crossbow" ? ATTACK_SPEED_BOW : ATTACK_SPEED_MELEE;
    const gem =
      key === "crossbow"
        ? plusGem("Projectile", 2, GEM_LEVELS)
        : key === "quarterstaff"
          ? plusGem("Melee", 2, GEM_LEVELS)
          : key === "mace"
            ? plusGem("Melee", 1, GEM_LEVELS)
            : plusGem("Projectile", 1, GEM_LEVELS);
    const gemTwoHand = key === "mace" ? plusGem("Melee", 2, GEM_LEVELS) : key === "spear" ? plusGem("Melee", 1, GEM_LEVELS) : [];
    const flat = twoHandFlat ? best(FLAT_TWO_HAND, level) : best(FLAT_ONE_HAND, level);
    const flatTwo = key === "mace" ? best(FLAT_TWO_HAND, level) : undefined;
    // One-hand and two-hand maces are different mods. Each stays its own line so a level 1
    // card can show (1-2)-(4-5) and (2-3)-(5-7) without gluing them into one sentence.
    const now = [best(PHYS_PERCENT, level)?.text, flat?.text, flatTwo?.text, best(speed, level)?.text].filter((row): row is string => Boolean(row));
    const currentGem = best(gem, level);
    const currentTwo = best(gemTwoHand, level);
    const gemText =
      key === "spear"
        ? [currentTwo ? `Melee ${currentTwo.text}` : "", currentGem ? `Projectile ${currentGem.text}` : ""].filter(Boolean).join(". ")
        : [currentGem ? `One-hand ${currentGem.text}` : "", currentTwo ? `Two-hand ${currentTwo.text}` : ""].filter(Boolean).join(". ");
    const later = [
      nextRoll(PHYS_PERCENT, level),
      nextRoll(twoHandFlat ? FLAT_TWO_HAND : FLAT_ONE_HAND, level),
      key === "mace" ? nextRoll(FLAT_TWO_HAND, level) : undefined,
      nextRoll(speed, level),
      nextRoll(gem, level),
      nextRoll(gemTwoHand, level),
    ]
      .map(fromLine)
      .filter(Boolean);
    const shownGem = key === "mace" || key === "spear" ? gemText : currentGem?.text ?? "";
    return { now, later, ideal: PHYS_IDEAL, gem: shownGem };
  }
  if (key === "wand") {
    const spell: TaggedRoll[] = [
      { ilvl: 1, text: "(25-34)% increased Spell Damage" },
      { ilvl: 8, text: "(35-44)% increased Spell Damage" },
      { ilvl: 16, text: "(45-54)% increased Spell Damage" },
      { ilvl: 33, text: "(55-64)% increased Spell Damage" },
      { ilvl: 46, text: "(65-74)% increased Spell Damage" },
      { ilvl: 60, text: "(75-89)% increased Spell Damage" },
      { ilvl: 70, text: "(90-104)% increased Spell Damage" },
      { ilvl: 80, text: "(105-119)% increased Spell Damage" },
    ];
    const cast: TaggedRoll[] = [
      { ilvl: 1, text: "(9-12)% increased Cast Speed" },
      { ilvl: 15, text: "(13-16)% increased Cast Speed" },
      { ilvl: 30, text: "(17-20)% increased Cast Speed" },
      { ilvl: 45, text: "(21-24)% increased Cast Speed" },
      { ilvl: 60, text: "(25-28)% increased Cast Speed" },
      { ilvl: 70, text: "(29-32)% increased Cast Speed" },
      { ilvl: 80, text: "(33-35)% increased Cast Speed" },
    ];
    const gem: TaggedRoll[] = [
      { ilvl: 5, text: "+1 to Level of all Spell Skills" },
      { ilvl: 25, text: "+2 to Level of all Spell Skills" },
      { ilvl: 55, text: "+3 to Level of all Spell Skills" },
      { ilvl: 78, text: "+4 to Level of all Spell Skills" },
    ];
    const now = [best(spell, level), best(cast, level), { ilvl: 1, text: "+5-8 Intelligence" }].flatMap((row) => (row ? [row.text] : []));
    return {
      now,
      later: [nextRoll(spell, level), nextRoll(cast, level), nextRoll(gem, level)].map(fromLine).filter(Boolean),
      ideal: ["Ideal at item level 78: +4 to Level of all Spell Skills.", "Ideal at item level 80: (33-35)% increased Cast Speed."],
      gem: best(gem, level)?.text ?? "",
    };
  }
  if (key === "staff") {
    const spell: TaggedRoll[] = [
      { ilvl: 1, text: "(50-68)% increased Spell Damage" },
      { ilvl: 8, text: "(69-88)% increased Spell Damage" },
      { ilvl: 16, text: "(89-108)% increased Spell Damage" },
      { ilvl: 33, text: "(109-128)% increased Spell Damage" },
      { ilvl: 46, text: "(129-148)% increased Spell Damage" },
      { ilvl: 60, text: "(149-188)% increased Spell Damage" },
      { ilvl: 70, text: "(189-208)% increased Spell Damage" },
      { ilvl: 80, text: "(209-238)% increased Spell Damage" },
    ];
    const cast: TaggedRoll[] = [
      { ilvl: 1, text: "(14-19)% increased Cast Speed" },
      { ilvl: 15, text: "(20-25)% increased Cast Speed" },
      { ilvl: 30, text: "(26-31)% increased Cast Speed" },
      { ilvl: 45, text: "(32-37)% increased Cast Speed" },
      { ilvl: 60, text: "(38-43)% increased Cast Speed" },
      { ilvl: 70, text: "(44-49)% increased Cast Speed" },
      { ilvl: 80, text: "(50-52)% increased Cast Speed" },
    ];
    const gem: TaggedRoll[] = [
      { ilvl: 5, text: "+2 to Level of all Spell Skills" },
      { ilvl: 25, text: "+3 to Level of all Spell Skills" },
      { ilvl: 55, text: "+4 to Level of all Spell Skills" },
      { ilvl: 78, text: "+(5-6) to Level of all Spell Skills" },
    ];
    const now = [best(spell, level), best(cast, level), { ilvl: 1, text: "+5-8 Intelligence" }].flatMap((row) => (row ? [row.text] : []));
    return {
      now,
      later: [nextRoll(spell, level), nextRoll(cast, level), nextRoll(gem, level)].map(fromLine).filter(Boolean),
      ideal: ["Ideal at item level 78: +(5-6) to Level of all Spell Skills.", "Ideal at item level 80: (50-52)% increased Cast Speed."],
      gem: best(gem, level)?.text ?? "",
    };
  }
  if (key === "sceptre") {
    const damage: TaggedRoll[] = [
      { ilvl: 1, text: "Allies in your Presence deal (25-34)% increased Damage" },
      { ilvl: 8, text: "Allies in your Presence deal (35-44)% increased Damage" },
      { ilvl: 16, text: "Allies in your Presence deal (45-54)% increased Damage" },
      { ilvl: 33, text: "Allies in your Presence deal (55-64)% increased Damage" },
      { ilvl: 46, text: "Allies in your Presence deal (65-74)% increased Damage" },
      { ilvl: 60, text: "Allies in your Presence deal (75-89)% increased Damage" },
      { ilvl: 70, text: "Allies in your Presence deal (90-104)% increased Damage" },
      { ilvl: 82, text: "Allies in your Presence deal (105-119)% increased Damage" },
    ];
    const gem: TaggedRoll[] = [
      { ilvl: 2, text: "+1 to Level of all Minion Skills" },
      { ilvl: 25, text: "+2 to Level of all Minion Skills" },
      { ilvl: 55, text: "+3 to Level of all Minion Skills" },
      { ilvl: 78, text: "+4 to Level of all Minion Skills" },
    ];
    const speed: TaggedRoll[] = [
      { ilvl: 5, text: "Allies in your Presence have (5-7)% increased Attack Speed" },
      { ilvl: 20, text: "Allies in your Presence have (8-10)% increased Attack Speed" },
      { ilvl: 35, text: "Allies in your Presence have (11-13)% increased Attack Speed" },
      { ilvl: 55, text: "Allies in your Presence have (14-16)% increased Attack Speed" },
    ];
    const ally = best(
      [
        { ilvl: 1, text: "Allies in your Presence deal (1-2) to (3-4) added Attack Physical Damage" },
        { ilvl: 8, text: "Allies in your Presence deal (2-3) to (4-6) added Attack Physical Damage" },
      ],
      level,
    );
    const now = [best(damage, level)?.text, "+5-8 Intelligence", level >= 2 ? best(gem, level)?.text : ally?.text].filter((row): row is string => Boolean(row));
    return {
      now: now.slice(0, 3),
      later: [nextRoll(damage, level), nextRoll(gem, level), nextRoll(speed, level)].map(fromLine).filter(Boolean),
      ideal: [
        "Ideal at item level 55: Allies in your Presence have (14-16)% increased Attack Speed.",
        "Ideal at item level 78: +4 to Level of all Minion Skills.",
      ],
      gem: best(gem, level)?.text ?? "",
    };
  }
  const now = [best(PHYS_PERCENT, level), best(FLAT_ONE_HAND, level), { text: "+5-8 Strength", ilvl: 1 }]
    .flatMap((row) => (row ? [row.text] : []));
  return { now, later: [fromLine(nextRoll(PHYS_PERCENT, level))].filter(Boolean), ideal: PHYS_IDEAL, gem: "" };
}


function emptyShop(base: string) {
  return `No ${base} with those rolls: buy a normal one and use an Orb of Transmutation, then an Orb of Augmentation.`;
}

export function weaponStats(noun: string, level: number) {
  return weaponRollPlan(noun, level).now;
}

export function weaponText(noun: string, level: number, attack = false) {
  const key = attack && weaponKind(noun) === "staff" ? "quarterstaff" : weaponKind(noun);
  const shop = shopFor(weaponKind(noun), level);
  const base = attack && weaponKind(noun) === "staff" ? baseAt("staff", level) : baseAt(key, level);
  const great = key === "mace" ? pick(GREAT, level) : null;
  const choice = great ? ` Or ${great.name}, with no shield.` : "";
  return `Buy ${withArticle(base.name)} from ${place(shop)}.${choice} Acceptable rolls are the list under this line. ${emptyShop(base.name)}`;
}

export function armourText(defence: string, level: number, caster: boolean) {
  const row = shops(level);
  const boots = armourAt("boots", defence, level);
  const body = armourAt("body", defence, level);
  const helm = armourAt("helmet", defence, level);
  const gloves = armourAt("gloves", defence, level);
  const belt = armourAt("belt", defence, level);
  const ring = caster ? "Lazuli Ring" : "Iron Ring";
  return `${place(row.armour)}: ${boots.name}, ${body.name}, ${helm.name}, ${gloves.name}, ${belt.name}. ${place(row.caster)}: ${ring}. Acceptable rolls are the list under this line.`;
}

function amuletName(key: DefenceFamily, level: number) {
  if (key === "int") return level >= 8 ? "Lapis Amulet" : "Azure Amulet";
  if (key === "dex" || key === "dexint") return level >= 8 ? "Jade Amulet" : "Crimson Amulet";
  return level >= 8 ? "Amber Amulet" : "Crimson Amulet";
}

function ringName(caster: boolean, level: number) {
  if (level >= 16) return "Topaz Ring";
  if (level >= 12) return "Sapphire Ring";
  if (level >= 8) return "Ruby Ring";
  return caster ? "Lazuli Ring" : "Iron Ring";
}

function armourSlotKey(slot: string): ArmourSlot | null {
  if (/body/i.test(slot)) return "body";
  if (/helm/i.test(slot)) return "helmet";
  if (/glove/i.test(slot)) return "gloves";
  if (/boot/i.test(slot)) return "boots";
  if (/belt/i.test(slot)) return "belt";
  return null;
}

function vendorFor(slot: string, spec: ShopSpec, level: number) {
  const row = shops(level);
  if (/ring|amulet/i.test(slot)) return row.caster;
  if (/shield/i.test(slot) && defenceKey(spec.defence) === "int") return row.caster;
  if (/wand|sceptre/i.test(slot) || (/staff/i.test(slot) && !/quarter/i.test(slot))) return row.caster;
  return row.armour;
}

function pieceText(slot: string, spec: ShopSpec, level: number) {
  const twoHand = spec.weaponNoun === "quarterstaff" || spec.weaponNoun === "staff";
  if (/shield/i.test(slot) && twoHand) return "No shield. Both hands hold the weapon.";
  if (/quiver/i.test(slot)) return `${place(shops(level).armour)}: ${baseAt("quiver", level).name}.`;
  if (/shield/i.test(slot)) {
    if (defenceKey(spec.defence) === "int") return `${place(shops(level).caster)}: energy shield shield.`;
    return `${place(shops(level).armour)}: ${baseAt("shield", level).name}.`;
  }
  if (/bow|spear|crossbow|quarterstaff|mace|wand|staff|sceptre|weapon/i.test(slot)) {
    const noun = nounFromSlot(slot, spec.weaponNoun);
    return `${place(shopFor(noun, level))}: ${baseAt(noun, level).name}.`;
  }
  const slotKey = armourSlotKey(slot);
  if (slotKey) return `${place(shops(level).armour)}: ${armourAt(slotKey, spec.defence, level).name}.`;
  if (/amulet/i.test(slot)) return `${place(shops(level).caster)}: ${amuletName(defenceKey(spec.defence), level)}.`;
  if (/ring/i.test(slot)) return `${place(shops(level).caster)}: ${ringName(isCaster(spec), level)}.`;
  return armourText(spec.defence, level, isCaster(spec));
}

export function slotStage(slot: string, spec: ShopSpec): [string, string, string] {
  return [pieceText(slot, spec, 1), pieceText(slot, spec, 28), pieceText(slot, spec, 66)];
}

function nounFromSlot(slot: string, fallback: string) {
  if (/crossbow/i.test(slot)) return "crossbow";
  if (/quarterstaff/i.test(slot)) return "quarterstaff";
  if (/^bow$/i.test(slot)) return "bow";
  if (/spear/i.test(slot)) return "spear";
  if (/sceptre/i.test(slot)) return "sceptre";
  if (/wand/i.test(slot)) return "wand";
  if (/^staff$/i.test(slot)) return "staff";
  if (/mace/i.test(slot)) return "mace";
  return fallback;
}

function namedPair(early: string, maps: string) {
  return early === maps ? early : `${early}, then ${maps}`;
}

export function baseLabel(slot: string, spec: ShopSpec) {
  const who = place(vendorFor(slot, spec, 1));
  if (/quiver/i.test(slot)) return `${namedPair(baseAt("quiver", 1).name, baseAt("quiver", 65).name)} · ${who}`;
  if (/shield/i.test(slot)) {
    if (spec.weaponNoun === "quarterstaff" || spec.weaponNoun === "staff") return "No shield. Both hands hold the weapon.";
    if (defenceKey(spec.defence) === "int") return `Energy shield shield · ${who}`;
    return `${namedPair(baseAt("shield", 1).name, baseAt("shield", 65).name)} · ${who}`;
  }
  if (/bow|spear|crossbow|weapon|staff|wand|mace|sceptre|quarterstaff/i.test(slot)) {
    const noun = nounFromSlot(slot, spec.weaponNoun);
    return `${namedPair(baseAt(noun, 1).name, baseAt(noun, 65).name)} · ${who}`;
  }
  const slotKey = armourSlotKey(slot);
  if (slotKey) {
    return `${namedPair(armourAt(slotKey, spec.defence, 1).name, armourAt(slotKey, spec.defence, 65).name)} · ${who}`;
  }
  if (/amulet/i.test(slot)) {
    const key = defenceKey(spec.defence);
    return `${namedPair(amuletName(key, 1), amuletName(key, 8))} · ${who}`;
  }
  if (/ring/i.test(slot)) return `${namedPair(ringName(isCaster(spec), 1), "Ruby Ring")} · ${who}`;
  return `${slot} · ${who}`;
}

export function howToBuy(slot: string, spec: ShopSpec) {
  return slotStage(slot, spec)[0];
}

export function weaponLine(noun: string, level: number) {
  const base = baseAt(noun, level);
  const shop = shopFor(noun, level);
  return `${place(shop)}: ${withArticle(base.name)}.`;
}
