import { GuideView } from "@/components/GuideView";
import { getClass } from "@/content/classes";
import { getGuide } from "@/content/guides";
import { withIcon } from "@/lib/items";
import type { Guide } from "@/lib/types";
import { notFound } from "next/navigation";

function paintGuide(guide: Guide): Guide {
  return {
    ...guide,
    uniques: guide.uniques.map((piece) => withIcon(piece)),
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
      initialLevel={Number.isFinite(level) ? Math.min(100, Math.max(1, level)) : 1}
    />
  );
}
