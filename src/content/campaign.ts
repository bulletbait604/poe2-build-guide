import type { BuildSpec } from "@/content/buildSpecs";
import { statsForLevel } from "@/content/statLines";
import { stepImage } from "@/content/zoneArt";
import type { GuidePhase, GuideStep } from "@/lib/types";

// Campaign route for patch 0.5, checked against:
// - Maxroll, "Permanent Stats From The Campaign" (updated 2026-09-18)
//   https://maxroll.gg/poe2/getting-started/permanent-stats-from-campaign
// - Maxroll, "Path of Exile 2 Campaign Walkthrough" (updated 2026-06-02)
//   https://maxroll.gg/poe2/getting-started/path-of-exile-2-campaign-guide
// - Mobalytics, "PoE 0.5 Campaign Checklist" (updated 2026-06-02)
//   https://mobalytics.gg/poe-2/guides/0-5-campaign-checklist-stats-rewards-skillpoints-and-more
// - poe2db quest pages, including https://poe2db.tw/us/The_Lost_Lute ,
//   https://poe2db.tw/us/Quest , Tradition's Toll, Ancient Vows, Ascent to Power,
//   The Slithering Dead, Tribal Vengeance, Tribal Medicine, Howling Winds,
//   Clearing the Way, and Siege of Oriath.
// Play the Stolen Barya first and Holten last, which is the 0.5 checklist order.
// Maxroll numbers Holten as its first interlude chapter; the rewards are the same.
// Permanent rewards kept below: weapon-set passive points, spirit, resistances,
// life, mana, and the swappable or permanent stat choices. Gem-only bosses,
// currency bells, and bench unlocks are left out.
// The Lost Lute is Act 1. The lute is in Ogham Farmlands. Una is in Clearfell Encampment.

function phase(
  id: string,
  chapter: GuidePhase["chapter"],
  title: string,
  levelRange: string,
  levelMin: number,
  levelMax: number,
  steps: GuideStep[],
): GuidePhase {
  return { id, chapter, title, levelRange, levelMin, levelMax, steps };
}

function step(
  title: string,
  act: string,
  zone: string,
  quest: string,
  npc: string,
  reward: string,
  detail: string,
  gear?: string | string[],
): GuideStep {
  return { title, act, zone, quest, npc, reward, detail, gear, image: stepImage(zone, quest) };
}


export function storyPhases(spec: BuildSpec): GuidePhase[] {
  const earlyGear = statsForLevel(spec, 8);
  const act2Gear = statsForLevel(spec, 22);
  const act3Gear = statsForLevel(spec, 36);
  const act4Gear = statsForLevel(spec, 48);
  const lesson = spec.defence === "armour" ? "Take Kaom's lesson." : "Take Rakiata's lesson.";
  const flask = spec.speed.includes("cast") ? "Take 30% mana flask recovery if you drink a mana flask. Otherwise 30% life." : "Take 30% life flask recovery.";

  return [
    phase("act-1", "acts", "Act 1", "Levels 1–14", 1, 14, [
      step("The Riverbank", "Act 1", "The Riverbank", "Kill the Bloated Miller", "The road opens Clearfell Encampment.", "No permanent stat.", "Kill the Bloated Miller. Enter Clearfell.", statsForLevel(spec, 1)),
      step("Clearfell", "Act 1", "Clearfell", "Kill Beira of the Rotten Pack", "Use the Head of the Winter Wolf.", "+10% cold resistance.", "Kill Beira. Use the Head of the Winter Wolf. +10% cold resistance.", earlyGear),
      step("Grelwood, Red Vale, Grim Tangle", "Act 1", "The Grelwood", "Find the way through the Grelwood", "Una is in the Grelwood, then Clearfell Encampment.", "No permanent stat.", "Find Una, kill the Rust King, then the Tree of Souls. Exit through the Grim Tangle."),
      step("Cemetery of the Eternals", "Act 1", "Cemetery of the Eternals", "Open the way to the Hunting Grounds", "Asinia in the Tomb. Draven in the Mausoleum.", "Hunting Grounds opens.", "Get both keys. Kill Lachlann of Endless Lament."),
      step("The Crowbell", "Act 1", "Hunting Grounds", "Kill The Crowbell", "Use the Book of Specialisation.", "+2 weapon-set passive points.", "Kill The Crowbell. +2 weapon-set passive points."),
      step("Freythorn", "Act 1", "Freythorn", "Ominous Altars", "The King in the Mists.", "+30 spirit.", "Finish the rituals. Kill the King in the Mists. +30 spirit."),
      step("The Lost Lute", "Act 1", "Ogham Farmlands", "The Lost Lute", "Return the lute to Una in Clearfell Encampment.", "+2 weapon-set points.", "Lute in Una's house in Ogham Farmlands. Return it to Una in Clearfell Encampment. +2 weapon-set points.", earlyGear),
      step("Ogham Village", "Act 1", "Ogham Village", "Kill the Executioner", "Leitis returns to Clearfell.", "No permanent stat.", "Kill the Executioner. Road to the Manor Ramparts."),
      step("Candlemass", "Act 1", "Ogham Manor", "Kill Candlemass, the Living Rite", "Use Candlemass' Essence.", "+20 life.", "Read the Psalm of Madness. Kill Candlemass. Use the essence. +20 life."),
      step("Count Geonor", "Act 1", "Ogham Manor", "The Mad Wolf of Ogham", "The Hooded One, after the kill.", "Passage to Act 2.", "Kill Count Geonor. Speak to the Hooded One and sail."),
    ]),
    phase("act-2", "acts", "Act 2", "Levels 14–29", 14, 29, [
      step("The caravan", "Act 2", "Vastiri Outskirts", "Earning Passage", "Zarka on the Ardura.", "Uncut Skill Gem.", "Kill Rathbreaker, return to Zarka, then Rudja in Mawdun Mine.", act2Gear),
      step("Traitor's Passage", "Act 2", "Traitor's Passage", "Ascent to Power", "Altar of Ascendancy in the Trial of the Sekhemas.", "First 2 ascendancy points.", "Kill Balbala, the Traitor. Take the Djinn Barya. Clear the trial. Take " + spec.ascendancyPick + "."),
      step("Jamanra, the first time", "Act 2", "The Halani Gates", "Open the three gates", "No stat turn-in.", "No permanent stat.", "Open the three gates. Jamanra escapes."),
      step("Keth", "Act 2", "Keth", "Kill Kabala, the Constrictor Queen", "Use the Book of Specialisation.", "+2 weapon-set points.", "Kill Kabala. +2 weapon-set points. Keep the Kabala Clan Relic."),
      step("The Lost City and the Buried Shrines", "Act 2", "The Lost City", "Kill Azarian, the Forsaken Son", "No stat turn-in.", "No permanent stat.", "Kill Azarian. Take the road into the Buried Shrines."),
      step("The Bone Pits", "Act 2", "The Bone Pits", "A Theft of Ivory", "Zarka takes the Mastodon Tusks.", "Uncut Support Gem.", "Kill Iktab and Ekbab. Return the tusks. Keep the Sun Clan Relic.", act2Gear),
      step("Valley of the Titans", "Act 2", "Valley of the Titans", "Ancient Vows", "Place both relics at the altar.", "+1 charm slot.", "Set both relics. Take +1 charm slot and 30% charm charges, or 30% charm duration. Then Zalmarath."),
      step("Deshar and the Final Letter", "Act 2", "Deshar", "Tradition's Toll", "Shambrin on the Ardura.", "+2 weapon-set points.", "Give the Final Letter to Shambrin. +2 weapon-set points."),
      step("The Spires, then the Dreadnought", "Act 2", "The Spires of Deshar", "Click the Sisters of Garukhan shrine", "Click the shrine.", "+10% lightning resistance.", "Click the Sisters of Garukhan shrine. +10% lightning resistance. Kill Jamanra on the Dreadnought.", act2Gear),
    ]),
    phase("act-3", "acts", "Act 3", "Levels 30–42", 30, 42, [
      step("Sandswept Marsh", "Act 3", "Sandswept Marsh", "Reach Ziggurat Encampment", "Servi and Oswald are in town.", "No permanent stat.", "Cross the marsh to Ziggurat Encampment.", act3Gear),
      step("Jungle Ruins", "Act 3", "Jungle Ruins", "Kill Mighty Silverfist", "Use the Book of Specialisation.", "+2 weapon-set points.", "Kill Mighty Silverfist. +2 weapon-set points. Take the Venom Crypts waypoint."),
      step("Venom Crypts", "Act 3", "The Venom Crypts", "The Slithering Dead", "Servi in Ziggurat Encampment.", "25% increased stun threshold, or 30% ailment threshold, or 25% mana regen.", "Take the venom to Servi. Pick 25% increased stun threshold, 30% ailment threshold, or 25% mana regen."),
      step("The wetlands and the machines", "Act 3", "Chimeral Wetlands", "Trial of Chaos, then Blackjaw", "Trial of Chaos, then the Stone Altar.", "+2 ascendancy points. +10% fire resistance.", "Run the Trial of Chaos once. Kill Blackjaw, the Remnant, for +10% fire resistance.", act3Gear),
      step("The waterways and Azak Bog", "Act 3", "The Azak Bog", "Tribal Vengeance", "Servi, after Ignagduk, the Bog Witch.", "+30 spirit.", "Kill Ignagduk, the Bog Witch. Turn in to Servi. +30 spirit."),
      step("The Molten Vault", "Act 3", "The Molten Vault", "Treasures of Utzaal", "Oswald, after Mektul.", "Reforging Bench.", "Optional. Mektul unlocks the bench. The story door is the Queen of Filth."),
      step("Aggorat, then Doryani", "Act 3", "Aggorat", "Sacrifice the Sacrificial Heart", "Altar in Aggorat.", "+2 weapon-set points.", "Sacrifice the heart in Aggorat. +2 weapon-set points. Kill Doryani.", act3Gear),
    ]),
    phase("act-4", "acts", "Act 4", "Levels 42–52", 42, 52, [
      step("Kingsmarch", "Act 4", "Kingsmarch", "The Search", "Makoru hires the ship.", "The boat.", "Talk to Makoru and sail. Island bosses drop weapon pieces.", act4Gear),
      step("Isle of Kin", "Act 4", "Isle of Kin", "The Blind Beast", "Leave the beast.", "Sulphite Potion and an Uncut Skill Gem.", "Kill Krutog, Lord of Kin. The Blind Beast drops a Sulphite Potion."),
      step("Whakapanu", "Act 4", "Whakapanu Island", "Tribal Medicine", "Kaimana takes the Shark Fin.", "Kaom's or Rakiata's lesson.", "Kill the Great White One. Take the fin to Kaimana. " + lesson),
      step("Shrike Island", "Act 4", "Shrike Island", "Kill the Scourge of the Skies", "Matiki, after the Siren.", "Weapon piece.", "Kill the Scourge of the Skies."),
      step("The prison", "Act 4", "Abandoned Prison", "Abandoned Prison", "Goddess of Justice shrine.", "30% flask recovery.", flask + " Then kill the Prisoner."),
      step("The Silent Hall", "Act 4", "The Silent Hall", "Pay your respects", "No NPC.", "+5% mana.", "Pay your respects. +5% mana."),
      step("Halls of the Dead", "Act 4", "Halls of the Dead", "Trial of the Ancestors", "Hinekora, after Yama.", "+2 weapon-set points.", "Finish the three tests. Take the lowest resistance. Kill Yama. Speak to Hinekora. +2 weapon-set points.", act4Gear),
      step("Arastas, then Dark Mists", "Act 4", "Journey's End", "Dark Mists", "Makoru sends you to Kedge Bay.", "+2 weapon-set passive points.", "Kill Torvian and Benedictus, then Omniphobia, Fear Manifest. +2 weapon-set passive points."),
      step("Tavakai", "Act 4", "Ngakanu", "Kill Tavakai, the Chieftain", "Heart of the Tribe.", "Act 4 ends.", "Kill Tavakai in the Heart of the Tribe."),
    ]),
    phase("interlude-barya", "interludes", "The Stolen Barya", "Do this one first", 52, 54, [
      step("Khari Crossing", "Interlude: The Stolen Barya", "The Khari Crossing", "Clearing the Way", "Risu in the Khari Bazaar.", "+2 weapon-set points.", "Do this interlude first. Kill Akthi and Anundr. Risu gives +2 weapon-set points.", ["75% Fire Resistance", "75% Cold Resistance", "75% Lightning Resistance", "25% increased Movement Speed"]),
      step("The Molten Shrine", "Interlude: The Stolen Barya", "Skullmaw Stairway", "Use the Molten One's Gift", "Use the gift yourself.", "+5% life.", "Use the Molten One's Gift at the Molten Shrine. +5% life."),
      step("The road to Qimah", "Interlude: The Stolen Barya", "Sel Khari Sanctuary", "Open the road to Qimah", "No stat turn-in.", "No permanent stat.", "Kill Elzarah, then Vornas at the Galai Gates."),
      step("Qimah", "Interlude: The Stolen Barya", "Qimah", "Choose one pillar", "Seven pillars at the edge of Qimah.", "One swappable boon.", "Pick one pillar. Skip the experience pillar. Azmadi closes the interlude."),
    ]),
    phase("interlude-doryani", "interludes", "Doryani's Contingency", "Spirit, then the yeti", 55, 57, [
      step("Kriar Village", "Interlude: Doryani's Contingency", "Kriar Village", "Slay Lythara, the Wayward Spear", "Reward is on the kill.", "+40 spirit.", "Kill Lythara. +40 spirit."),
      step("The yeti", "Interlude: Doryani's Contingency", "Howling Caves", "Howling Winds", "Hilda in the Glade.", "+2 weapon-set points.", "Kill the yeti. Return the Ice Tusks to Hilda. +2 weapon-set points."),
      step("The peaks and the vault", "Interlude: Doryani's Contingency", "Cuachic Vault", "Close Doryani's Contingency", "Elder Madox offers one unique.", "No permanent stat.", "Zolin and Zelina close the interlude. Take Madox's unique only if it beats your rare."),
    ]),
    phase("interlude-holten", "interludes", "The Curse of Holten", "Last, then Kingsmarch", 58, 60, [
      step("The road to Wolvenhold", "Interlude: The Curse of Holten", "Scorched Farmlands", "Reach Holten", "No stat turn-in.", "No permanent stat.", "Do Holten last. Road: Scorched Farmlands, Stones of Serle, Blackwood, Holten."),
      step("Oswin", "Interlude: The Curse of Holten", "Wolvenhold", "Kill Oswin, the Dread Warden", "Use the Book of Specialisation.", "+2 weapon-set points.", "Kill Oswin. +2 weapon-set points."),
      step("The Hooded One", "Interlude: Kingsmarch", "Kingsmarch", "Siege of Oriath", "The Hooded One in Kingsmarch.", "Last +2 weapon-set points.", "Speak to the Hooded One. Last +2 weapon-set points.", ["75% Fire Resistance", "75% Cold Resistance", "75% Lightning Resistance", "30% increased Movement Speed"]),
    ]),
    phase("endgame", "endgame", "Endgame", "Maps", 60, 100, [
      step("White maps", "Maps", "Your map device", "Run white maps", "No quest NPC.", "Map completion.", "Run white maps, then raise the tier.", ["75% Fire Resistance", "75% Cold Resistance", "75% Lightning Resistance", "30% Chaos Resistance", "50% Chaos Resistance", "30% increased Movement Speed"]),
      step("Map gear", "Maps", "your hideout", "Gear check", "Trade site.", "Rolls below.", "Buy the base on the Gear tab. Rolls below.", statsForLevel(spec, 82)),
      step("Uniques stay optional", "Maps", "Anywhere", "A unique is optional", "No turn-in.", "Nothing to buy.", "Wear a unique when it drops and beats your rare."),
      step("Bosses", "Maps", "The boss arena", "Boss fight", "No extra NPC.", "Boss loot.", spec.boss),
    ]),
  ];
}
