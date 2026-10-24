import { AscendancySelect } from "@/components/AscendancySelect";
import { getClass } from "@/content/classes";
import { notFound } from "next/navigation";

export default async function ClassPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params;
  const gameClass = getClass(classId);
  if (!gameClass) notFound();
  return <AscendancySelect gameClass={gameClass} />;
}
