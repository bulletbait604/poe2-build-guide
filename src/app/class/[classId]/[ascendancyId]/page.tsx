import { BuildList } from "@/components/BuildList";
import { getAscendancy, getClass } from "@/content/classes";
import { guidesForAscendancy } from "@/content/guides";
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
  const routes = guidesForAscendancy(ascendancyId);
  if (routes.length === 0) notFound();
  const ladder = await getLadder();
  return <BuildList gameClass={gameClass} ascendancy={ascendancy} guides={routes} ladder={ladder} />;
}
