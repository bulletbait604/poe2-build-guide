import { buildSpecs } from "@/content/buildSpecs";
import { composeGuide } from "@/content/composeGuide";
import type { Guide } from "@/lib/types";

export const guides: Guide[] = buildSpecs.map(composeGuide);

export function getGuide(id: string) {
  return guides.find((guide) => guide.id === id) ?? null;
}

export function guidesForAscendancy(ascendancyId: string) {
  return guides.filter((guide) => guide.ascendancyId === ascendancyId);
}

export function guideForAscendancy(ascendancyId: string) {
  return guidesForAscendancy(ascendancyId)[0] ?? null;
}
