import { createElement, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GearCards } from "../src/components/GearCards";
import { GuideView } from "../src/components/GuideView";
import { buildSpecs } from "../src/content/buildSpecs";
import { getClass } from "../src/content/classes";
import { composeGuide } from "../src/content/composeGuide";

const spec = buildSpecs.find((row) => row.id === "deadeye-lightning-arrow");
if (!spec) {
  console.error("missing lightning arrow spec");
  process.exit(1);
}
const guide = composeGuide(spec);
const gameClass = getClass(spec.classId);
if (!gameClass) {
  console.error("missing ranger class");
  process.exit(1);
}

const failures: string[] = [];

function render(element: ReactElement) {
  return renderToStaticMarkup(element);
}

function requireLists(html: string, label: string) {
  const parts = html.split("data-gear-section=");
  if (parts.length < 2) failures.push(`${label} rendered no gear section`);
  for (let index = 1; index < parts.length; index += 1) {
    const body = parts[index];
    if (!body.includes("data-stat-list") || !/<ul\b[^>]*data-stat-list/.test(body)) {
      failures.push(`${label} gear section rendered without a list: ${body.slice(0, 48)}`);
    }
  }
}

const now = render(createElement(GuideView, { guide, gameClass, initialLevel: 12 }));
if (!now.includes("Shop these rolls.")) failures.push("Now tab did not render the gear check");
requireLists(now, "Now");

const leveling = render(createElement(GuideView, { guide, gameClass, initialLevel: 12, initialTab: "Leveling" }));
if (!leveling.includes("10% increased Movement Speed")) failures.push("Leveling gear list is missing the Act 1 movement speed roll");
requireLists(leveling, "Leveling");

const gear = render(createElement(GearCards, { cards: guide.gearCards, totals: guide.gearTotals, level: 70 }));
requireLists(gear, "Gear");
if (gear.includes("group-hover:block")) failures.push("Gear stats are still hidden until hover");
if (gear.includes("While leveling")) failures.push("Gear card still renders the while-leveling sentence");
if (!gear.includes("30% increased Movement Speed")) failures.push("Endgame totals are missing 30% movement speed");
if (gear.includes("10-15% increased Movement Speed")) failures.push("Gear still mashes movement speed into 10-15%");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("render checks passed");
