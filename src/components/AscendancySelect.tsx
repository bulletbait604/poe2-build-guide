import type { GameClass } from "@/content/classes";
import Image from "next/image";
import Link from "next/link";

export function AscendancySelect({ gameClass }: { gameClass: GameClass }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="relative min-h-[70vh] overflow-hidden border border-line bg-black">
        <Image
          src={gameClass.portrait}
          alt={gameClass.name}
          fill
          priority
          className="object-contain object-bottom"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>
      <div>
        <Link href="/" className="text-sm text-muted hover:text-gold">
          All classes
        </Link>
        <p className="mt-4 font-display text-xs tracking-[0.28em] text-ember uppercase">{gameClass.name}</p>
        <h1 className="mt-2 font-display text-4xl text-parchment">Choose an ascendancy</h1>
        <p className="mt-3 leading-7 text-muted">{gameClass.tagline}</p>
        <div className="mt-6 grid gap-3">
          {gameClass.ascendancies.map((ascendancy) => (
            <Link
              key={ascendancy.id}
              href={`/class/${gameClass.id}/${ascendancy.id}`}
              className="border border-line bg-panel px-5 py-4 hover:border-gold"
            >
              <span className="font-display text-2xl text-parchment">{ascendancy.name}</span>
              <span className="mt-1 block text-sm leading-6 text-muted">{ascendancy.blurb}</span>
              <span className="mt-3 block text-xs tracking-[0.16em] text-gold uppercase">
                {ascendancy.primary ? "Full written route" : "Same route, with a difference"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
