import { rememberIcon } from "@/lib/items";
import { poeUserAgent } from "@/lib/poe";
import type { PoeCharacter, PublicItem } from "@/lib/types";

const ACCOUNT_NAME = /^[A-Za-z0-9_-]{3,32}$/;
const CHARACTER_NAME = /^[A-Za-z0-9_-]{1,24}$/;

type CacheEntry = { at: number; body: unknown };
const cache = new Map<string, CacheEntry>();
const TTL = 5 * 60 * 1000;

export function validAccount(value: string) {
  return ACCOUNT_NAME.test(value);
}

export function validCharacter(value: string) {
  return CHARACTER_NAME.test(value);
}

async function publicGet(path: string) {
  const response = await fetch(`https://www.pathofexile.com${path}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": poeUserAgent(),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  if (response.status === 403) return { private: true as const, data: null };
  if (response.status === 404) return { private: false as const, missing: true as const, data: null };
  if (!response.ok) throw new Error(`Path of Exile returned ${response.status}`);
  return { private: false as const, missing: false as const, data: await response.json() };
}

export async function publicCharacters(account: string) {
  const key = `chars:${account.toLowerCase()}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.body as Awaited<ReturnType<typeof fetchCharacters>>;
  const body = await fetchCharacters(account);
  cache.set(key, { at: Date.now(), body });
  return body;
}

async function fetchCharacters(account: string) {
  const result = await publicGet(
    `/character-window/get-characters?accountName=${encodeURIComponent(account)}&realm=poe2`,
  );
  if (result.private) return { private: true as const, characters: [] as PoeCharacter[] };
  const raw = Array.isArray(result.data)
    ? result.data
    : Array.isArray((result.data as { characters?: unknown[] } | null)?.characters)
      ? ((result.data as { characters: unknown[] }).characters)
      : null;
  if (result.missing || !raw) {
    return { private: false as const, characters: [] as PoeCharacter[] };
  }
  const characters = (raw as Array<Record<string, unknown>>)
    .filter((entry) => typeof entry.name === "string")
    .map((entry) => ({
      name: String(entry.name),
      class: String(entry.class ?? ""),
      level: Number(entry.level ?? 0),
      league: typeof entry.league === "string" ? entry.league : undefined,
    }));
  return { private: false as const, characters };
}

export async function publicGear(account: string, character: string) {
  const key = `gear:${account.toLowerCase()}:${character.toLowerCase()}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.body as Awaited<ReturnType<typeof fetchGear>>;
  const body = await fetchGear(account, character);
  cache.set(key, { at: Date.now(), body });
  return body;
}

async function fetchGear(account: string, character: string) {
  const result = await publicGet(
    `/character-window/get-items?accountName=${encodeURIComponent(account)}&character=${encodeURIComponent(character)}&realm=poe2`,
  );
  if (result.private) return { private: true as const, items: [] as PublicItem[] };
  const payload = result.data as { items?: Array<Record<string, unknown>> } | null;
  const items = (payload?.items ?? [])
    .map((item) => {
      const name = String(item.name || item.typeLine || "Item");
      const icon = typeof item.icon === "string" ? item.icon : null;
      rememberIcon(name, icon);
      return {
        name,
        typeLine: String(item.typeLine ?? ""),
        slot: String(item.inventoryId ?? "Gear"),
        icon,
      };
    })
    .filter((item) => item.icon || item.name);
  return { private: false as const, items };
}
