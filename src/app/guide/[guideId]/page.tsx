import { GuideView } from "@/components/GuideView";
import { getClass } from "@/content/classes";
import { getGuide } from "@/content/guides";
import { withIcon } from "@/lib/items";
import type { Guide } from "@/lib/types";
import { notFound } from "next/navigation";

function paintGuide(guide: Guide): Guide {
  return {
    ...guide,
    gear: guide.gear.map((piece) => withIcon(piece)),
    levelBands: guide.levelBands.map((band) => ({
      ...band,
      items: band.items.map((item) => withIcon(item)),
    })),
    phases: guide.phases.map((phase) => ({
      ...phase,
      steps: phase.steps.map((step) => ({
        ...step,
        items: step.items?.map((item) => withIcon(item)),
      })),
    })),
  };
}

export default async function GuidePage({
  params,
  searchParams,
}: {
  params: Promise<{ guideId: string }>;
  searchParams: Promise<{ ascendancy?: string; level?: string }>;
}) {
  const { guideId } = await params;
  const query = await searchParams;
  const guide = getGuide(guideId);
  if (!guide) notFound();
  const gameClass = getClass(guide.classId);
  if (!gameClass) notFound();
  const level = Number(query.level);
  return (
    <GuideView
      guide={paintGuide(guide)}
      gameClass={gameClass}
      variantId={query.ascendancy ?? null}
      initialLevel={Number.isFinite(level) ? Math.min(100, Math.max(1, level)) : 1}
    />
  );
}
