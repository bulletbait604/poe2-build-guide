"use client";

import { ItemChip } from "@/components/ItemChip";
import type { AscendancyInfo, GameClass } from "@/content/classes";
import type { Guide } from "@/lib/types";
import type { LadderSnapshot } from "@/lib/ladder";
import type { PublicItem } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export function BuildList({
  gameClass,
  ascendancy,
  guides,
  ladder,
}: {
  gameClass: GameClass;
  ascendancy: AscendancyInfo;
  guides: Guide[];
  ladder: LadderSnapshot;
}) {
  const group = ladder.groups.find((entry) => entry.ascendancyId === ascendancy.id);

  return (
    <section>
      <Link href={`/class/${gameClass.id}`} className="text-sm text-muted hover:text-gold">
        {gameClass.name}
      </Link>
      <p className="mt-4 font-display text-xs tracking-[0.28em] text-ember uppercase">{ascendancy.name}</p>
      <h1 className="mt-2 font-display text-4xl text-parchment">Choose a route</h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted">
        Each route tells you which stats to look for on your armour as you level. Uniques are suggestions for later,
        not items you need to buy before you start.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-gold">{ladder.message}</p>

      <div className="mt-6 grid gap-3">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guide/${guide.id}`}
            className="block border border-line bg-panel-2 p-5 hover:border-gold"
          >
            <span className="font-display text-2xl text-parchment">{guide.name}</span>
            <span className="mt-1 block text-sm leading-6 text-muted">{guide.summary}</span>
            <span className="mt-3 block text-xs tracking-[0.16em] text-gold uppercase">
              {guide.skill} with {guide.helper}
              {group && ladder.live ? ` · ${group.count} in the top 1,000` : ""}
            </span>
          </Link>
        ))}
      </div>

      {ladder.live && group && group.characters.length > 0 ? (
        <div className="mt-8">
          <h2 className="font-display text-2xl">High characters on the ladder</h2>
          <ul className="mt-3 space-y-3">
            {group.characters.map((character) => (
              <li key={`${character.account}-${character.name}`} className="border border-line p-4">
                <p className="text-parchment">
                  #{character.rank} {character.name}{" "}
                  <span className="text-muted">
                    level {character.level} · {character.account}
                  </span>
                </p>
                <GearLookup account={character.account} character={character.name} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function GearLookup({ account, character }: { account: string; character: string }) {
  const [items, setItems] = useState<PublicItem[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(
        `/api/profile?account=${encodeURIComponent(account)}&character=${encodeURIComponent(character)}`,
      );
      const body = await response.json();
      if (!response.ok) {
        setMessage(body.error || "That profile could not be loaded.");
        setItems(null);
      } else if (body.private) {
        setMessage("This profile is private.");
        setItems(null);
      } else {
        setItems(body.items ?? []);
      }
    } catch {
      setMessage("That profile could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <button type="button" onClick={load} className="text-sm text-gold underline-offset-2 hover:underline">
        {loading ? "Loading gear" : "Show public gear"}
      </button>
      {message ? <p className="mt-2 text-sm text-muted">{message}</p> : null}
      {items ? (
        <div className="mt-3 flex gap-3 overflow-x-auto">
          {items.length === 0 ? <p className="text-sm text-muted">No equipped items were returned.</p> : null}
          {items.map((item) => (
            <ItemChip key={`${item.slot}-${item.name}`} name={item.name} slot={item.slot} icon={item.icon} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
