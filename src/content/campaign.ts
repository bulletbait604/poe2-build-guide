import type { BuildSpec } from "@/content/buildSpecs";
import type { GuidePhase } from "@/lib/types";

// Campaign route for patch 0.5, checked against:
// - Maxroll, "Permanent Stats From The Campaign" (updated 2026-09-18)
//   https://maxroll.gg/poe2/getting-started/permanent-stats-from-campaign
// - Maxroll, "Path of Exile 2 Campaign Walkthrough" (updated 2026-06-02)
//   https://maxroll.gg/poe2/getting-started/path-of-exile-2-campaign-guide
// - Mobalytics, "PoE 0.5 Campaign Checklist" (updated 2026-06-02)
//   https://mobalytics.gg/poe-2/guides/0-5-campaign-checklist-stats-rewards-skillpoints-and-more
// Play the Stolen Barya first and Holten last, which is the 0.5 checklist order.
// Maxroll numbers Holten as its first interlude chapter; the rewards are the same.
// Permanent rewards kept below: weapon-set passive points, spirit, resistances,
// life, mana, and the swappable or permanent stat choices. Gem-only bosses,
// currency bells, and bench unlocks are left out.

function phase(
  id: string,
  chapter: GuidePhase["chapter"],
  title: string,
  levelRange: string,
  levelMin: number,
  levelMax: number,
  steps: GuidePhase["steps"],
): GuidePhase {
  return { id, chapter, title, levelRange, levelMin, levelMax, steps };
}

export function storyPhases(spec: BuildSpec): GuidePhase[] {
  const fight = `Use ${spec.skill}. ${spec.pack}`;
  const flask = spec.speed.includes("cast")
    ? "Take mana recovery only if you are drinking a mana flask to keep casting. Otherwise take life recovery."
    : "Take life recovery. Take mana recovery only if this build drinks a mana flask to attack.";
  const lesson =
    spec.defence === "armour"
      ? "Take Kaom's lesson. It is 30% increased armour, evasion, and energy shield."
      : "Take Rakiata's lesson. Armour also applies to elemental damage, evasion grants deflection, and energy shield starts recharging faster. Take Kaom's lesson instead if you are stacking armour.";

  return [
    phase("act-1", "acts", "Act 1", "Levels 1–14", 1, 14, [
      {
        title: "The Riverbank",
        detail: `Kill the Bloated Miller. That opens Clearfell Encampment. ${fight}`,
      },
      {
        title: "Clearfell",
        detail:
          "The road out is the Grelwood, at the top of the zone. On the way, kill Beira of the Rotten Pack and use the Head of the Winter Wolf. That is +10% cold resistance, permanent. Leave the Mud Burrow and the abandoned stash. Those are gems, not stats.",
      },
      {
        title: "Grelwood, Red Vale, Grim Tangle",
        detail:
          "This is the story road. Find Una, enter the Red Vale, and kill the Rust King for the runes. Back in the Grelwood, finish the Tree of Souls and kill Gerung, the Brambleghast. Then walk the Grim Tangle to the exit. Ervig, the Rotted Druid, only drops a support gem, so leave him once the way forward is open.",
      },
      {
        title: "Cemetery of the Eternals",
        detail:
          "Asinia is in the Tomb of the Consort. Draven is in the Mausoleum. Their keys open Lachlann of Endless Lament, and he is the door to the Hunting Grounds. Leave the sarcophagus. It is a ring.",
      },
      {
        title: "The Crowbell, then Freythorn",
        detail:
          "The Crowbell is in the Hunting Grounds. Killing him is +2 weapon-set passive points. Freythorn is the side zone. Finish the rituals and kill the King in the Mists. That is +30 spirit, and the first kill also drops a spirit gem. Leave the dryad. That fight is only a support gem.",
      },
      {
        title: "Ogham Farmlands and the village",
        detail:
          "Pick up Una's lute and return it to her. That is +2 weapon-set points. The Executioner is the door through Ogham Village to the Manor Ramparts. Leave the smithing tools and the crop circle. The tools unlock a salvaging bench, not a stat.",
      },
      {
        title: "Ogham Manor",
        detail: `On the first floor, read the Psalm of Madness and kill Candlemass, the Living Rite. That is +20 maximum life. Count Geonor is the last floor. ${spec.boss} Then speak to the Hooded One and sail.`,
      },
    ]),
    phase("act-2", "acts", "Act 2", "Levels 14–29", 14, 29, [
      {
        title: "The caravan",
        detail: `Rathbreaker, in the Vastiri Outskirts, is the door into the Ardura Caravan. Then Mawdun Quarry and Rudja, the Dread Engineer, in Mawdun Mine. That fight is what moves the story. ${fight}`,
      },
      {
        title: "Traitor's Passage",
        detail: `Kill Balbala, the Traitor, and take the Djinn Barya. It is the key back to the Halani Gates, and the same coin opens the Trial of the Sekhemas. Clear that trial once for the first 2 ascendancy points. ${spec.ascendancyPick} Leave the bell chest. It is a gem.`,
      },
      {
        title: "Jamanra, the first time",
        detail:
          "At the Halani Gates, open the three gates and fight Jamanra, the Risen King. He escapes. That is the story. Leave the corpse piles.",
      },
      {
        title: "Keth",
        detail:
          "Kill Kabala, the Constrictor Queen, for +2 weapon-set points. Kill hyenas until the Kabala Clan Relic drops. You need that relic at the Valley of the Titans. It is not a bonus by itself. Leave the treasure room.",
      },
      {
        title: "The Lost City and the Buried Shrines",
        detail:
          "The Lost City is the road into the Buried Shrines. Azarian, the Forsaken Son, is the story boss. Kill him and take the road onward. Leave the elemental shrine. Those chests are rings, not a permanent stat.",
      },
      {
        title: "The Bone Pits",
        detail:
          "The Mastodon Badlands lead here. Kill Iktab, the Deathlord, and Ekbab, Ancient Steed, to finish the zone. Kill snakes until the Sun Clan Relic drops. You need it with the Kabala relic.",
      },
      {
        title: "Valley of the Titans",
        detail:
          "Set both relics in the altar. Pick +1 charm slot and 30% increased charm charges gained, or +1 charm slot and 30% increased charm effect duration. You can come back and swap. Then the Titan Grotto. Zalmarath, the Colossus, is the door out.",
      },
      {
        title: "Deshar, the spires, the Dreadnought",
        detail:
          "Take the Final Letter in Deshar and give it to Shambrin for +2 weapon-set points. The Path of Mourning leads to the Spires of Deshar. Click the Sisters of Garukhan shrine for +10% lightning resistance. You do not have to kill anything for the shrine. Tor Gul, the Defiler, is the zone boss, so he is the road. Sail the Dreadnought and kill Jamanra, the Abomination. Leave the Watchful Twins. They drop a trial coin, not a stat.",
      },
    ]),
    phase("act-3", "acts", "Act 3", "Levels 30–42", 30, 42, [
      {
        title: "Sandswept Marsh",
        detail: `The marsh is only the road to Ziggurat Encampment. Leave Rootdredge and the Orok campfire. One is a gem and the other is a jeweller's orb. ${fight}`,
      },
      {
        title: "Jungle Ruins",
        detail:
          "Kill Mighty Silverfist before you leave the ruins. That is +2 weapon-set points. Take the Venom Crypts waypoint while you are here. Leave the troubled camp.",
      },
      {
        title: "Venom Crypts",
        detail:
          "Take the venom vial to Servi in Ziggurat Encampment. The choice is permanent: 25% increased stun threshold, 30% increased elemental ailment threshold, or 25% increased mana regeneration. You cannot change it. Leave the hidden sarcophagi.",
      },
      {
        title: "The wetlands and the machines",
        detail:
          "Infested Barrens leads to the Chimeral Wetlands. Xyclucian, the Chimera, is the door into Jiquani's Machinarium. The Trial of Chaos is in the wetlands. Run it once when you want the next 2 ascendancy points. In the machinarium, open the doors with the soul cores and kill Blackjaw, the Remnant, for +10% fire resistance. Zicoatl, Warden of the Core, in Jiquani's Sanctum drops the large soul core that opens the waterways. Leave the toxic bloom and the third door of gold.",
      },
      {
        title: "The waterways and Azak Bog",
        detail:
          "The Matlan Waterways are the levers, then Azak Bog. Kill Ignagduk, the Bog Witch, for +30 spirit and turn the quest in to Servi. Leave the flame ritual. It is a temporary buff.",
      },
      {
        title: "The past, then Doryani",
        detail:
          "In the Drowned City, the story door is the Queen of Filth in the Apex of Filth. Leave the Molten Vault. Mektul unlocks a reforging bench, not a stat. Then Ketzuli, High Priest of the Sun, in the Temple of Kopec, and Viper Napuatzi in Utzaal. A large corpse in Utzaal or Aggorat can drop a Sacrificial Heart. Sacrifice it at the altar in Aggorat for +2 weapon-set points, then enter the Black Chambers and kill Doryani, Royal Thaumaturge.",
      },
    ]),
    phase("act-4", "acts", "Act 4", "Levels 42–52", 42, 52, [
      {
        title: "Kingsmarch",
        detail: `Talk to the town and take the boat. The marked islands hold the weapon pieces, and they can be sailed in any order. Skip gem hunts, map scraps, and bell chests. ${fight}`,
      },
      {
        title: "Isle of Kin",
        detail:
          "Cross the island into the Volcanic Warrens and kill Krutog, Lord of Kin. He is a weapon piece. Leave the Blind Beast. That fight is a greater rune. The skill points are not on this island.",
      },
      {
        title: "Whakapanu",
        detail: `Kill the Great White One and take the shark fin to Kaimana at the Karui boat in Kingsmarch. ${lesson} You can swap the lesson later. Then the Singing Caverns. Diamora, Song of Death, is the weapon piece. Leave the beckoning clam. It trades for an amulet, not a permanent stat.`,
      },
      {
        title: "Shrike Island",
        detail:
          "Kill the Scourge of the Skies. That is a weapon piece. Speak to Matiki if she is here. She is part of the road to the Eye of Hinekora. Leave the dead sailors.",
      },
      {
        title: "The prison",
        detail: `In the Abandoned Prison, the Goddess of Justice is a flask choice you can swap later: 30% increased life recovery from flasks, or 30% increased mana recovery from flasks. ${flask} Then kill the Prisoner in Solitary Confinement. That is a weapon piece. Leave the armoury.`,
      },
      {
        title: "Eye of Hinekora and the ancestors",
        detail:
          "In the Silent Hall, pay your respects. That is +5% maximum mana. In the Halls of the Dead, finish the three tests. Each choice is permanent: Ngamahu is +5 strength or +5 fire resistance, Tasalio is +5 intelligence or +5 cold resistance, and Tawhoa is +5 dexterity or +5 lightning resistance. Take the resistance you are lowest on, or the attribute a gem is demanding. Then kill Yama the White and speak to Hinekora. That is +2 weapon-set points.",
      },
      {
        title: "Arastas, then the captain",
        detail:
          "Kill Torvian, Hand of the Saviour, on Arastas, and Benedictus, First Herald, in the Excavation. Leave the bells. They are currency. Then Kedge Bay and Journey's End. Kill Captain Hartlin, finish Dark Mists, and kill Omniphobia, Fear Manifest. That turn-in is +2 weapon-set points.",
      },
      {
        title: "Tavakai",
        detail: `Sail to Ngakanu and enter the Heart of the Tribe. Tavakai, the Chieftain, is the act boss. ${spec.boss} The defence lesson was the shark fin on Whakapanu. The Atlas is still closed.`,
      },
    ]),
    phase("interlude-barya", "interludes", "The Stolen Barya", "Do this one first", 52, 54, [
      {
        title: "Khari Crossing",
        detail:
          "Do this interlude first. It gets harder if you outlevel it. Resistances drop as soon as you enter an interlude, so check the lowest one before you zone in. Kill Akthi, the Final Sting, and Anundr, the Sandworm, then speak to Risu. That is +2 weapon-set points. The Skullmaw Stairway is off this zone. Use the Molten One's Gift at the Molten Shrine. That is +5% maximum life.",
      },
      {
        title: "The road to Qimah",
        detail:
          "Pools of Khatal, then Sel Khari Sanctuary. Elzarah, the Cobra Lord, is the story boss there. Then the Galai Gates and Vornas, the Fell Flame. Those bosses open the road. They do not give a permanent stat. Leave the sanctuary jewellery.",
      },
      {
        title: "Qimah",
        detail:
          "The seven pillars are in a niche at the edge of the zone. Choose one, and you can come back and swap: +5 to all attributes, +5% to all elemental resistances, 12% increased cooldown recovery, 3% increased movement speed, 20% increased presence area, or 15% increased global defences. Do not take the experience pillar. It turns the other bonuses into penalties. Azmadi, the Faridun Prince, in the Qimah Reservoir closes this interlude. Do not farm the vials. They are currency.",
      },
    ]),
    phase("interlude-doryani", "interludes", "Doryani's Contingency", "Spirit, then the yeti", 55, 57, [
      {
        title: "Kriar Village",
        detail: `The Glade and the Ashen Forest are the road in. Kill Lythara, the Wayward Spear, for +40 spirit. With the King in the Mists and Ignagduk, that is 100 spirit from the campaign. Do this even if ${spec.skill} does not reserve spirit yet. If you needed the spirit more than the barya, this interlude can be the first one instead.`,
      },
      {
        title: "Glacial Tarn and the yeti",
        detail:
          "Rakkar, the Frozen Talon, is the road through the Glacial Tarn. Then the Howling Caves. Kill the Abominable Yeti and turn the tusks in. That is +2 weapon-set points. Leave the caves once the yeti is dead.",
      },
      {
        title: "The peaks and the vault",
        detail:
          "Kriar Peaks lead to the Etched Ravine. Stormgore, the Guardian, is the road, and Zolin and Zelina in the Cuachic Vault close the interlude. Elder Madox offers one free unique. That is loot, not a stat. Take it only if you are already there and it beats what you have on.",
      },
    ]),
    phase("interlude-holten", "interludes", "The Curse of Holten", "Last, then Kingsmarch", 58, 60, [
      {
        title: "The road to Wolvenhold",
        detail:
          "Do Holten last. It is the short one. The road is the Scorched Farmlands (Isolde of the White Shroud and Heldra of the Black Pyre), the Stones of Serle (Siora, Blade of the Mists), the Blackwood, and Holten. Leave the ferryman. He sells runes.",
      },
      {
        title: "Oswin, then the estate",
        detail:
          "Kill Oswin, the Dread Warden, in Wolvenhold for +2 weapon-set points. Thane Wulfric and Lady Elyswyth in Holten Estate close the interlude.",
      },
      {
        title: "The Hooded One",
        detail:
          "Return to Kingsmarch after all three interludes and speak to the Hooded One to finish Siege of Oriath. That is the last +2 weapon-set points. You should have 24 from the campaign. Fix the lowest resistance before you open a map.",
      },
    ]),
    phase("endgame", "endgame", "Endgame", "Maps", 60, 100, [
      {
        title: "White maps",
        detail: `Run white maps until ${spec.skill} clears a pack without you stopping. Then raise the tier.`,
      },
      {
        title: "What to upgrade",
        detail: `Weapon damage, then life, then the lowest resistance. The defence on the gear is ${spec.defence}.`,
      },
      {
        title: "Uniques stay optional",
        detail: "A unique below is a suggestion. Wear it when it drops and beats the rare. Do not stop mapping to buy one.",
      },
      { title: "Bosses", detail: spec.boss },
    ]),
  ];
}
