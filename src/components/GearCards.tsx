import { cardIcon } from "@/content/gearCards";
import type { GearAffix, GearCard, GearTotal } from "@/lib/types";
import Image from "next/image";

const rankOrder: Record<GearAffix["rank"], number> = { Must: 0, Nice: 1, Ignore: 2 };

function ordered(affixes: GearAffix[]) {
  return [...affixes].sort((a, b) => rankOrder[a.rank] - rankOrder[b.rank]);
}

function Rank({ rank }: { rank: GearAffix["rank"] }) {
  const tone =
    rank === "Must" ? "border-gold text-gold" : rank === "Nice" ? "border-line text-parchment" : "border-line text-muted";
  return <span className={`inline-block border px-1.5 py-0.5 text-[10px] tracking-[0.14em] uppercase ${tone}`}>{rank}</span>;
}

export function GearCards({
  cards,
  totals,
  spec,
}: {
  cards: GearCard[];
  totals: GearTotal[];
  spec: { weaponNoun: string; defence: string };
}) {
  return (
    <div>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <caption className="border-b border-line px-3 py-2 text-left font-display text-xl text-parchment">
            What the whole character should add up to
          </caption>
          <thead className="text-xs tracking-[0.14em] text-gold uppercase">
            <tr>
              <th className="px-3 py-2 font-normal">Target</th>
              <th className="px-3 py-2 font-normal">Leveling</th>
              <th className="px-3 py-2 font-normal">Early maps</th>
              <th className="px-3 py-2 font-normal">Endgame</th>
            </tr>
          </thead>
          <tbody>
            {totals.map((row) => (
              <tr key={row.label} className="border-t border-line align-top">
                <th className="px-3 py-2 font-normal text-parchment">{row.label}</th>
                <td className="px-3 py-2 text-muted">{row.leveling}</td>
                <td className="px-3 py-2 text-muted">{row.earlyMaps}</td>
                <td className="px-3 py-2 text-muted">{row.endgame}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3">
        {cards.map((card) => (
          <article key={card.slot} className="border border-line bg-[#14110e] p-3">
            <div className="flex gap-3">
              <span className="relative h-16 w-16 shrink-0 border border-gold/40 bg-black">
                <Image src={cardIcon(card.slot, spec)} alt="" fill className="object-contain p-1" sizes="64px" />
              </span>
              <div>
                <h3 className="font-display text-2xl text-parchment">{card.slot}</h3>
                <p className="text-parchment">{card.base}</p>
                <p className="mt-1 text-sm text-muted">{card.why}</p>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="text-xs tracking-[0.14em] text-gold uppercase">
                  <tr>
                    <th className="py-1 pr-3 font-normal">Affix</th>
                    <th className="py-1 pr-3 font-normal">Kind</th>
                    <th className="py-1 pr-3 font-normal">Rank</th>
                    <th className="py-1 pr-3 font-normal">Leveling</th>
                    <th className="py-1 pr-3 font-normal">Early maps</th>
                    <th className="py-1 font-normal">Endgame</th>
                  </tr>
                </thead>
                <tbody>
                  {ordered(card.affixes).map((affix) => (
                    <tr key={`${affix.name}-${affix.rank}`} className="border-t border-line/70 align-top">
                      <td className="py-2 pr-3 text-parchment">{affix.name}</td>
                      <td className="py-2 pr-3 text-muted">{affix.kind}</td>
                      <td className="py-2 pr-3">
                        <Rank rank={affix.rank} />
                      </td>
                      <td className="py-2 pr-3 text-muted">{affix.leveling}</td>
                      <td className="py-2 pr-3 text-muted">{affix.earlyMaps}</td>
                      <td className="py-2 text-muted">{affix.endgame}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-parchment">
              <span className="text-gold">How to get it. </span>
              {card.how}
            </p>
            <p className="mt-1 text-sm text-muted">
              <span className="text-parchment">While leveling. </span>
              {card.note}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
