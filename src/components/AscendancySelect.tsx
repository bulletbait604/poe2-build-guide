import type { GameClass } from "@/content/classes";
import Image from "next/image";
import Link from "next/link";

export function AscendancySelect({ gameClass }: { gameClass: GameClass }) {
  const wide = gameClass.ascendancies.length > 2;

  return (
    <section className="relative left-1/2 min-h-[calc(100dvh-5.5rem)] w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-black">
      <Image
        src={gameClass.portrait}
        alt={gameClass.name}
        fill
        priority
        className="object-cover object-[center_22%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(17,14,11,0.55)_78%)]" />
      <p
        aria-hidden
        className="pointer-events-none absolute top-[12%] left-1/2 -translate-x-1/2 font-display text-[16vw] leading-none tracking-[0.12em] text-parchment/[0.07] uppercase"
      >
        {gameClass.name}
      </p>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-5.5rem)] w-full max-w-5xl flex-col items-center justify-center px-5 py-14 text-center">
        <Link href="/" className="text-sm text-parchment/80 hover:text-gold">
          All classes
        </Link>
        <p className="mt-6 font-display text-xs tracking-[0.32em] text-ember uppercase">
          {gameClass.name} · {gameClass.attribute}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-parchment sm:text-6xl">Choose an ascendancy</h1>
        <p className="mt-4 max-w-xl text-lg leading-7 text-parchment">{gameClass.tagline}</p>
        <p className="mt-2 text-sm tracking-[0.18em] text-gold uppercase">{gameClass.weapon}</p>

        <div
          className={`mt-10 grid w-full gap-4 ${wide ? "md:grid-cols-3" : "max-w-3xl sm:grid-cols-2"}`}
        >
          {gameClass.ascendancies.map((ascendancy) => (
            <Link
              key={ascendancy.id}
              href={`/class/${gameClass.id}/${ascendancy.id}`}
              className="flex min-h-48 flex-col justify-between border border-gold/45 bg-ink/80 px-5 py-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:border-gold hover:bg-ink/90"
            >
              <span>
                <span className="block font-display text-2xl text-parchment sm:text-3xl">{ascendancy.name}</span>
                <span className="mt-3 block text-sm leading-6 text-parchment/80">{ascendancy.blurb}</span>
              </span>
              <span className="mt-6 block text-xs tracking-[0.18em] text-gold uppercase">Open the routes</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
