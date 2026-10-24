"use client";

import { classes, type GameClass } from "@/content/classes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ClassSelect() {
  const [selected, setSelected] = useState<GameClass | null>(null);

  useEffect(() => {
    if (!selected) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section>
      <div className="mb-6 max-w-2xl">
        <p className="font-display text-xs tracking-[0.28em] text-ember uppercase">Choose a class</p>
        <h1 className="mt-2 font-display text-4xl text-parchment sm:text-5xl">Who are you playing?</h1>
        <p className="mt-3 text-lg leading-7 text-muted">
          Pick a portrait. The next screen is the ascendancy, then a route you can follow one step at a time.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {classes.map((gameClass) => (
          <button
            key={gameClass.id}
            type="button"
            onClick={() => setSelected(gameClass)}
            className="group relative aspect-[3/4] overflow-hidden border border-line text-left hover:border-gold"
          >
            <Image
              src={gameClass.portrait}
              alt={gameClass.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 640px) 25vw, 50vw"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
              <span className="block font-display text-xl text-parchment">{gameClass.name}</span>
              <span className="block text-xs tracking-wide text-gold uppercase">{gameClass.attribute}</span>
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-40 flex bg-black">
          <div className="relative min-h-full flex-1">
            <Image
              src={selected.portrait}
              alt={selected.name}
              fill
              priority
              className="object-contain object-bottom sm:object-left"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/20 to-black/85" />
          <div className="relative z-10 flex w-full flex-col justify-end p-6 sm:ml-auto sm:w-[28rem] sm:justify-center sm:p-10">
            <p className="font-display text-xs tracking-[0.28em] text-gold uppercase">{selected.attribute}</p>
            <h2 className="mt-2 font-display text-5xl text-parchment">{selected.name}</h2>
            <p className="mt-3 text-lg leading-7 text-parchment/90">{selected.tagline}</p>
            <p className="mt-2 text-sm text-muted">{selected.weapon}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {selected.ascendancies.map((ascendancy) => (
                <li key={ascendancy.id} className="border-l border-gold/60 pl-3">
                  <span className="text-gold">{ascendancy.name}</span>
                  <span className="mt-0.5 block text-muted">{ascendancy.blurb}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link
                href={`/class/${selected.id}`}
                className="bg-gold px-5 py-3 font-semibold text-ink hover:bg-parchment"
              >
                Choose {selected.name}
              </Link>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="border border-line px-5 py-3 text-parchment hover:border-gold"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
