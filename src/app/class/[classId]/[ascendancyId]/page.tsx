import { BuildList } from "@/components/BuildList";
import { getAscendancy, getClass } from "@/content/classes";
import { getGuide } from "@/content/guides";
import { getLadder } from "@/lib/ladder";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AscendancyPage({
  params,
}: {
  params: Promise<{ classId: string; ascendancyId: string }>;
}) {
  const { classId, ascendancyId } = await params;
  const gameClass = getClass(classId);
  const ascendancy = getAscendancy(classId, ascendancyId);
  if (!gameClass || !ascendancy) notFound();
  const guide = getGuide(ascendancy.guideId);
  if (!guide) notFound();
  const ladder = await getLadder();
  return <BuildList gameClass={gameClass} ascendancy={ascendancy} guide={guide} ladder={ladder} />;
}
