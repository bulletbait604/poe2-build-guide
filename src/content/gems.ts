import art from "@/content/gemArt.json";

type ArtEntry = { icon: string; listedAs: string | null };

const icons = art as Record<string, ArtEntry>;

const tips: Record<string, string> = {
  "Ice Shot": "An arrow that bursts into cold. Freeze the pack and keep walking.",
  Snipe: "A charged bow shot. Use it when the boss is standing still.",
  "Lightning Arrow": "Arrows that burst lightning where they land. Shoot the rod, or the pack if the rod is down.",
  "Lightning Rod": "A stake you drop in the pack. Your arrows burst off it.",
  "Poisonburst Arrow": "The poison hit. One arrow into the pack, then keep moving.",
  "Gas Arrow": "A cloud that holds the pack. Drop it, then shoot through it.",
  "Acidic Concoction": "A thrown flask. The bottle does the damage, not the bow.",
  "Lightning Spear": "A spear throw that chains lightning through the pack.",
  "Storm Lance": "A lance in the ground. Throw or shoot into it.",
  Twister: "A travelling hit. Send it through the pack and follow it.",
  "Whirling Slash": "A close swing that starts the twister. Step in, then out.",
  Rake: "A bleeding spear hit. Apply it and let the blood work.",
  "Blood Hunt": "The follow-up on a bleeding enemy. Use it after Rake.",
  Spearfield: "Spears in the ground. Drop the field and stand where it covers the pack.",
  "Rolling Slam": "A two-part slam. The second hit is the one that matters.",
  Boneshatter: "A heavy melee hit. Use it on a stunned or standing boss.",
  Earthquake: "A slam that leaves a burst under the pack. Walk off it.",
  Sunder: "A wide melee swing. Aim it so the wave hits more than one.",
  "Shield Wall": "A wall you hide behind. Put it between you and the boss.",
  "Perfect Strike": "A charged melee hit. Release it when the boss is still.",
  "Molten Blast": "A fire projectile from the mace. Fire it into the pack.",
  "Galvanic Shards": "A burst of lightning bolts from the crossbow. Reload, then fire.",
  "Explosive Grenade": "A grenade in the pack. Throw it and step away.",
  "Oil Grenade": "Oil under the pack, then the explosive grenade.",
  "Permafrost Bolts": "Cold crossbow bolts. Freeze, then the other shot.",
  "Fragmentation Rounds": "A splitting crossbow shot. Fire it into a frozen or grouped pack.",
  "High Velocity Rounds": "A single heavy crossbow hit. Save it for the rare or the boss.",
  "Artillery Ballista": "A ballista that fires for you. Drop it, then keep shooting.",
  "Ice Strike": "A cold quarterstaff combo. The last hit is the freeze.",
  "Tempest Bell": "A bell on the ground. Hit it so the wave covers the pack.",
  "Falling Thunder": "A lightning slam after you leap. Land it on the pack.",
  "Storm Wave": "A wave from the staff. Send it down the pack.",
  "Tempest Flurry": "Fast quarterstaff hits. Stay on one enemy until the combo finishes.",
  "Charged Staff": "Charge the staff, then the next attack carries the lightning.",
  "Shattering Palm": "A palm strike that pops frozen enemies. Use it after the freeze.",
  "Killing Palm": "A dash to a low enemy. Use it to move, not to open a pack.",
  "Whirling Assault": "A spinning staff attack. Walk it through the pack.",
  "Flicker Strike": "A teleporting melee hit. You land on the enemy, so know where that is.",
  "Into the Breach": "A breach step. Use it to move onto the pack, then the main skill.",
  Spark: "Sparks that fill the room. Cast and walk. You do not aim each one.",
  "Frost Bomb": "A bomb that chills and lowers resistance. Drop it on the boss.",
  "Orb of Storms": "A storm you leave on the ground. Cast the other skill into it.",
  Arc: "A lightning chain. One cast jumps through the pack.",
  "Elemental Storm": "A storm on the ground. Stand so the pack is in it, not you.",
  Frostbolt: "A cold projectile. Cast it into the pack or into the wall.",
  Comet: "A delayed cold blast. Cast it where the boss will still be.",
  "Frost Wall": "A wall of ice. Put it between you and the hit.",
  Fireball: "A fire projectile that pops. Throw it into the pack.",
  "Flame Wall": "A wall of fire. Shoot or walk the pack through it.",
  "Ice Nova": "Cold around you. Step into the pack, cast, and step out.",
  Contagion: "A spread. Cast it first so the next hit jumps.",
  "Essence Drain": "A chaos projectile. Cast it after Contagion so the damage spreads.",
  Bonestorm: "A channel that fires bone spikes. Release it into the pack.",
  Unearth: "Corpses and bone. Use it to feed the minions or the detonation.",
  "Skeletal Sniper": "A minion that shoots. Raise it and let it clear while you move.",
  "Detonate Dead": "Explodes a corpse. Unearth first if the ground is empty.",
  "Dark Effigy": "A totem that fires at cursed or poisoned enemies. Drop it and walk.",
  "Ball Lightning": "A slow lightning orb. Cast it through the pack.",
  "Rain of Arrows": "A rain of arrows on an area. Drop it on the pack and move.",
  "Demon Form": "You become the demon. Turn it off before the life drain kills you.",
  Volcano: "A volcano on the ground. Slam or cast into it.",
  Entangle: "Roots the pack. Cast it, then the damage skill.",
  Maul: "The bear attack. Hit, then step. You are in melee.",
  "Furious Slam": "A heavy slam. Use it on a boss that has stopped.",
  Thunderstorm: "A storm around you. Walk the edge of the pack, not the middle, if it hurts you too.",
  "Walking Calamity": "A moving disaster. Point it through the pack.",
  Shred: "Fast clawing hits. Stay on one enemy until it ends.",
  "Lunar Assault": "A leaping attack. Land it on the pack.",
  "Bone Cage": "Bones around the enemy. Trap, then the other spell.",
  Tornado: "A tornado that walks. Send it and follow with the other skill.",
  "Shield Throw": "A thrown shield, if that gem is still in the list. If it is not, use Shield Wall.",
  "Explosive Spear": "A spear that explodes. Throw it into the pack and step back.",
  "Glacial Lance": "A cold lance. Throw it so the burst covers the pack.",
  "Wild Protector": "A companion. Summon it once and let it walk with you.",
  "Ritual Sacrifice": "A sacrifice for a buff. Use it when the pack is already in front of you.",
  "Blood Boil": "A blood burst. Use it on a pack that is already bleeding or grouped.",
  "Ancestral Spirits": "Totems that attack with you. Drop them, then slam.",
  "Seismic Cry": "A warcry before the slam. Shout, then Earthshatter.",
  Earthshatter: "Spikes, then a slam that breaks them. The slam is the damage.",
  "Supercharged Slam": "A charged slam. Release it on the boss or a packed door.",
  "Volcanic Fissure": "A fiery crack. Aim it through the pack.",
  "Supporting Fire": "Extra shots while you attack. Keep the grenade or the bolts going.",
  "Temper Weapon": "A buff on your weapon. Turn it on before the boss.",
  "Elemental Expression": "A staff spell that follows your attack. Hit, and it casts.",
  "Flames of Chayula": "The Chayula flame attack.",
  "Navira's Fracturing": "Navira's spell. One djinn at a time.",
  "Ruzhan's Reckoning": "Ruzhan's spell. One djinn at a time.",
  Kelari: "Kelari, the djinn. Summon that one and leave the others.",
  "Ice Storm": "A cold storm on the ground. Cast it where the pack is walking.",
  "Explosive Concoction": "A thrown fire flask. Throw into the pack.",
  "Martial Tempo": "More attack speed for the main skill.",
  "Arcane Tempo": "More cast speed for the main skill.",
  "Concentrated Effect": "Smaller area, more damage.",
};

function fallback(name: string, role: "skill" | "helper" | "support") {
  if (role === "skill") return `Socket ${name} as soon as the gem is offered. It stays the main skill.`;
  if (role === "helper") return `${name} is the second button. Add it when you have a second skill gem.`;
  if (name.startsWith("a support") || name.startsWith("one fire")) {
    return `Socket ${name}. Read the gem before you link it. If the text does not mention this skill, take it out.`;
  }
  return `Socket ${name} only when the gem says it supports the main skill.`;
}

export function gemInfo(name: string, role: "skill" | "helper" | "support") {
  const entry = icons[name];
  const listed = entry?.listedAs;
  const specific = tips[name] ?? fallback(name, role);
  const tip = listed ? `${specific} In the gem list this is ${listed}.` : specific;
  return {
    name,
    icon: entry?.icon ?? null,
    tip,
  };
}
