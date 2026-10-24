import { ninjaUserAgent } from "@/lib/poe";
import { rememberIcon } from "@/lib/items";

const CATEGORIES = [
  "UniqueWeapons",
  "UniqueArmours",
  "UniqueAccessories",
  "UniqueJewels",
  "UniqueFlasks",
  "UniqueCharms",
] as const;

type EconomyLine = {
  name?: string;
  icon?: string;
  primaryValue?: number;
  listingCount?: number;
  corrupted?: boolean;
};

type Overview = {
  lines?: EconomyLine[];
};

export type PricedItem = {
  name: string;
  icon: string | null;
  price: number | null;
  listings: number | null;
};

let cache: { at: number; items: Map<string, PricedItem> } | null = null;
const TTL = 60 * 60 * 1000;

async function ninjaJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": ninjaUserAgent(),
    },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`poe.ninja returned ${response.status}`);
  return (await response.json()) as T;
}

async function loadPrices() {
  if (cache && Date.now() - cache.at < TTL) return cache.items;

  const leagues = await ninjaJson<Array<{ id: string; name: string }>>(
    "https://poe.ninja/poe2/api/economy/leagues",
  );
  const league = leagues.find((entry) => !/hardcore|standard/i.test(entry.id)) ?? leagues[0];
  if (!league) return new Map<string, PricedItem>();

  const items = new Map<string, PricedItem>();
  for (const type of CATEGORIES) {
    const overview = await ninjaJson<Overview>(
      `https://poe.ninja/poe2/api/economy/stash/current/item/overview?league=${encodeURIComponent(league.id)}&type=${type}`,
    );
    for (const line of overview.lines ?? []) {
      if (!line.name || line.corrupted) continue;
      const key = line.name.toLowerCase();
      const existing = items.get(key);
      const price = typeof line.primaryValue === "number" ? line.primaryValue : null;
      if (existing && existing.price !== null && (price === null || existing.price <= price)) {
        continue;
      }
      if (line.icon) rememberIcon(line.name, line.icon);
      items.set(key, {
        name: line.name,
        icon: line.icon ?? null,
        price,
        listings: line.listingCount ?? null,
      });
    }
  }

  cache = { at: Date.now(), items };
  return items;
}

export async function pricesFor(names: string[]) {
  try {
    const items = await loadPrices();
    return names.map((name) => {
      const found = items.get(name.toLowerCase());
      return (
        found ?? {
          name,
          icon: null,
          price: null,
          listings: null,
        }
      );
    });
  } catch {
    return names.map((name) => ({ name, icon: null, price: null, listings: null }));
  }
}
