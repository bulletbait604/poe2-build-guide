import { buildSpecs } from "@/content/buildSpecs";
import { composeGuide } from "@/content/composeGuide";
import type { Guide } from "@/lib/types";

export const guides: Guide[] = buildSpecs.map(composeGuide);

export function getGuide(id: string) {
  return guides.find((guide) => guide.id === id) ?? null;
}

export function guideForAscendancy(ascendancyId: string) {
  return (
    guides.find(
      (guide) =>
        guide.ascendancyId === ascendancyId ||
        guide.variants.some((variant) => variant.ascendancyId === ascendancyId),
    ) ?? null
  );
}
