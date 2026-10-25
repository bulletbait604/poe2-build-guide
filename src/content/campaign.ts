import type { BuildSpec } from "@/content/buildSpecs";
import type { GuidePhase } from "@/lib/types";

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
  return [
    phase("act-1", "acts", "Act 1", "Levels 1–14", 1, 14, [
      {
        title: "The Riverbank",
        detail: `The Bloated Miller is the door into Clearfell Encampment. Kill him and leave. ${fight}`,
      },
      {
        title: "Clearfell",
        detail:
          "Kill Beira of the Rotten Pack before you take the Grelwood exit. That is 10% cold resistance, permanent. Skip Mud Burrow. The Devourer only drops a gem.",
      },
      {
        title: "Grelwood, Red Vale, Grim Tangle",
        detail:
          "This is the story road, not a side tour. Meet Una in the Grelwood, get the runic tools in the Red Vale, do the ritual, then the Grim Tangle. Skip any boss whose only reward is a gem.",
      },
      {
        title: "Cemetery of the Eternals",
        detail:
          "Draven and Asinia drop the keys. Lachlann of Endless Lament is the gate into the Hunting Grounds. Skip the sarcophagus. It is a ring.",
      },
      {
        title: "Crowbell, then Freythorn",
        detail:
          "Kill the Crowbell in the Hunting Grounds. That is 2 weapon-set points. Freythorn is the next story zone: finish the four rituals and kill the King in the Mists. That fight is 30 spirit, and it is how the zone ends. Skip the dryad and the ritual-site gem.",
      },
      {
        title: "Ogham",
        detail:
          "On the Farmlands, pick up Una's lute. Turning it in is 2 weapon-set points. In the village, the Executioner is the door to the ramparts. Skip the smithing tools and the crop circle.",
      },
      {
        title: "Ogham Manor",
        detail: `Kill Candlemass on the first floor for 20 maximum life. Count Geonor is on the last floor. ${spec.boss} Then speak to the Hooded One and leave for the desert.`,
      },
    ]),
    phase("act-2", "acts", "Act 2", "Levels 14–29", 14, 29, [
      {
        title: "The caravan",
        detail: `Rathbreaker is the door into the Ardura Caravan. Then Mawdun Quarry and Rudja in Mawdun Mine. That fight is what moves the story. ${fight}`,
      },
      {
        title: "Traitor's Passage",
        detail:
          "Kill Basala and take the Djinn Barya. That item is the door back to the Halani Gates. Skip the bell chest.",
      },
      {
        title: "Jamanra, the first time",
        detail:
          "At the Halani Gates, open the three gates and fight Jamanra the Risen King. He escapes. That is the story. Skip the corpse piles.",
      },
      {
        title: "The first trial, then Keth",
        detail: `${spec.ascendancyPick} The desert map opens the Trial of Sekhemas after that fight. Clear it once for 2 ascendancy points. Then go to Keth and kill Kabala, the Constrictor Queen, for 2 weapon-set points. Take the clan relic. It is a quest item, not a bonus.`,
      },
      {
        title: "The Lost City and the Heart of Keth",
        detail:
          "The Lost City is the road. Azarian, the Forsaken Son, drops the Essence of Water, and you need that to continue. Skip the golden tomb, the treasure beetle, and the offering ring.",
      },
      {
        title: "Badlands, the horn, the valley",
        detail:
          "From the Mastodon Badlands, the Lightless Passage and the Bone Pits are both required. Speak to the creature in the Well of Souls, then kill the Bone Pits boss for the horn and pick up the Sun Clan relic. In the Valley of the Titans, open the three seals and set the relics in the medallion. Take the charm bonus. You can change it later. Titan Grotto is the door out.",
      },
      {
        title: "Deshar, the spires, the Dreadnought",
        detail:
          "Take the Final Letter in Deshar. Path of Mourning leads to the Spires of Deshar. Touch the Sisters of Garukhan for 10% lightning resistance, then kill Tor Gul. He is the zone boss. Turn the letter in to Shambrin for 2 weapon-set points, sail the Dreadnought, and kill Jamanra the Abomination.",
      },
    ]),
    phase("act-3", "acts", "Act 3", "Levels 30–42", 30, 42, [
      {
        title: "Sandswept Marsh",
        detail: `The marsh is only the road to Ziggurat Encampment. Skip Rootredge, the campfire, and the hanging tree. ${fight}`,
      },
      {
        title: "Jungle Ruins",
        detail:
          "Kill Mighty Silverfist before you leave the ruins. That is 2 weapon-set points. Grab the Venom Crypts waypoint on the way. Skip the troubled camp.",
      },
      {
        title: "Venom Crypts",
        detail:
          "Take the venom vial to Servi in town. The reward is one permanent choice: stun threshold, elemental ailment threshold, or mana regeneration. You cannot change it. Skip the hidden sarcophagi.",
      },
      {
        title: "The wetlands and the machines",
        detail:
          "Infested Barrens leads to the Chimeral Wetlands. The chimera is the door into Jiquani's Machinarium. The Trial of Chaos entrance is in the wetlands too. Run it when you want the next 2 ascendancy points. In the machinarium, open the doors with the soul cores and kill Blackjaw for 10% fire resistance. Zicoatl in the Sanctum drops the large soul core. That core opens the waterways. Skip the toxic bloom and the third door of gold.",
      },
      {
        title: "Azak Bog",
        detail:
          "The waterways are levers, then Azak Bog. Kill Ignagduk for 30 spirit and turn the quest in to Servi. The flame ritual in the bog is a temporary buff. Leave it.",
      },
      {
        title: "The past, then Doryani",
        detail:
          "The Drowned City's story door is the Queen of Filth in the Apex of Filth. Skip the Molten Vault. The bench is not a stat. Then Ketzuli in the Temple of Kopec, and Viper Napuatzi in Utzaal. A large corpse in Utzaal or Aggorat can drop a Sacrificial Heart. Stab it at the altar in Aggorat for 2 weapon-set points, then enter the Black Chambers and kill Doryani.",
      },
    ]),
    phase("act-4", "acts", "Act 4", "Levels 42–52", 42, 52, [
      {
        title: "Kingsmarch",
        detail: `Talk to Doryani and Alva for the boat charter. The islands can be sailed in any order. Do the ones that hold a weapon piece, and skip gem hunts, map scraps, and bell chests. ${fight}`,
      },
      {
        title: "Whakapanu and Shrike",
        detail:
          "On Whakapanu, go to the Singing Caverns and kill Diamora. On Shrike Island, kill the Scourge of the Skies and speak to Matiki if she is there. Skip the shark, the clam, and the dead sailors.",
      },
      {
        title: "The prison",
        detail:
          "In the Abandoned Prison, the Goddess of Justice is a permanent flask choice: 30% life recovery or 30% mana recovery. Take life recovery unless this build drinks a mana flask to attack. Then kill the Prisoner in Solitary Confinement. Skip the armoury.",
      },
      {
        title: "Isle of Kin",
        detail:
          "Cross the island into the Volcanic Warrens and kill Krutog, Lord of Kin. Free Matiki if she is caged here. She is the door to the Eye of Hinekora. Skip the Blind Beast. Those skill points moved.",
      },
      {
        title: "Eye of Hinekora and the ancestors",
        detail:
          "In the Silent Hall, pay respect. That is 5% maximum mana. In the Halls of the Dead, finish the three ancestor tests and take the resistance you are lowest on, or the attribute a gem is demanding. Then kill Yama the White. Talking to Navali afterward is 2 weapon-set points.",
      },
      {
        title: "Arastas, then the captain",
        detail:
          "Kill Torvian on Arastas and Benedictus in the Excavation. Skip the bells. Then Kedge Bay and Journey's End. Kill Captain Hartlin, have Dannig make the spikes, and free Freya. She is Omniphobia, Fear Manifest. Killing her and talking to Tujen is 2 weapon-set points.",
      },
      {
        title: "Tavakai",
        detail: `Sail to Ngakanu. The medicine circle is a lesson: take the armour lesson if you wear armour, or the evasion and energy-shield lesson if that is your defence (${spec.defence}). Then the Heart of the Tribe. Tavakai is the act boss. ${spec.boss} The Atlas is still closed.`,
      },
    ]),
    phase("interlude-barya", "interludes", "The Stolen Barya", "Do this one first", 52, 54, [
      {
        title: "Khari Crossing",
        detail:
          "Do this interlude first. It is the one that gets worse if you outlevel it. Resistances drop as soon as you enter an interlude, so check the lowest one before you zone in. Kill Akthi and Anundr, then speak to Risu. That is 2 weapon-set points.",
      },
      {
        title: "Skullmaw Stairway",
        detail: "The Molten Shrine is at the end of the stair. Use the gift. That is 5% maximum life.",
      },
      {
        title: "Qimah",
        detail:
          "Clear only the bosses that open the road to Qimah. The pillars are in a niche at the edge of the zone. Take resistance, movement speed, or defences. Leave the pillar that trades the other bonuses for experience. You can come back and change it. Skip the sanctuary jewellery and the reservoir.",
      },
    ]),
    phase("interlude-doryani", "interludes", "Doryani's Contingency", "Spirit, then the yeti", 55, 57, [
      {
        title: "Kriar Village",
        detail: `Kill Lythara, the Wayward Spear, for 40 spirit. Do this even if ${spec.skill} does not reserve spirit yet. If you needed the spirit more than the barya, this interlude can be the first one instead.`,
      },
      {
        title: "Howling Caves",
        detail: "Kill the Abominable Yeti and turn the tusks in. That is 2 weapon-set points. Leave the caves once the yeti is dead.",
      },
    ]),
    phase("interlude-holten", "interludes", "The Curse of Holten", "Last, then Kingsmarch", 58, 60, [
      {
        title: "Wolvenhold",
        detail:
          "Do Holten last. It is the short one. The road runs through the farmlands and the stones into Wolvenhold. Kill Oswin, the Dread Warden, for 2 weapon-set points. Skip the ferryman.",
      },
      {
        title: "The Hooded One",
        detail:
          "Return to Kingsmarch after all three interludes and speak to the Hooded One. That is the last 2 weapon-set points. You should have 24 from the campaign. Fix the lowest resistance before you open a map.",
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
