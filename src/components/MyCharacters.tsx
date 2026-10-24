"use client";

import { characterHref, useAccount } from "@/components/AccountProvider";

export function MyCharacters() {
  const account = useAccount();
  if (!account.signedIn) return null;
  const characters = [...account.characters].sort((a, b) => b.level - a.level);

  return (
    <section className="mb-10 border border-line bg-panel/80 p-5">
      <h2 className="font-display text-2xl text-parchment">Your characters</h2>
      {account.error ? <p className="mt-2 text-sm text-ember">{account.error}</p> : null}
      {characters.length === 0 && !account.error ? (
        <p className="mt-2 text-sm text-muted">No PoE2 characters on this account yet.</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {characters.map((character) => (
              <li key={`${character.league ?? ""}-${character.name}`}>
                <a href={characterHref(character)} className="block border border-line px-4 py-3 hover:border-gold">
                  <span className="font-display text-xl text-gold">{character.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    Level {character.level} {character.class}
                    {character.league ? ` · ${character.league}` : ""}
                  </span>
                  <span className="mt-2 block text-xs tracking-[0.14em] text-parchment uppercase">Open the matching route</span>
                </a>
              </li>
          ))}
        </ul>
      )}
    </section>
  );
}
