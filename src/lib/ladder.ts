import { classes, matchLadderClass } from "@/content/classes";
import { getServiceToken, poeJson } from "@/lib/auth";
import { ladderConfigured } from "@/lib/poe";

export type LadderCharacter = {
  rank: number;
  name: string;
  account: string;
  level: number;
  className: string;
};

export type LadderGroup = {
  className: string;
  count: number;
  classId: string | null;
  ascendancyId: string | null;
  guideId: string | null;
  characters: LadderCharacter[];
};

export type LadderSnapshot = {
  live: boolean;
  message: string;
  league: string | null;
  updatedAt: string | null;
  groups: LadderGroup[];
};

type League = { id?: string; name?: string };
type LadderEntry = {
  rank?: number;
  dead?: boolean;
  character?: { name?: string; class?: string; level?: number };
  account?: { name?: string };
};

let cache: { at: number; snapshot: LadderSnapshot } | null = null;
const TTL = 10 * 60 * 1000;

function curated(message: string): LadderSnapshot {
  const groups: LadderGroup[] = [];
  for (const gameClass of classes) {
    for (const ascendancy of gameClass.ascendancies) {
      groups.push({
        className: ascendancy.name,
        count: ascendancy.primary ? 1 : 0,
        classId: gameClass.id,
        ascendancyId: ascendancy.id,
        guideId: ascendancy.guideId,
        characters: [],
      });
    }
  }

  return {
    live: false,
    message,
    league: null,
    updatedAt: null,
    groups,
  };
}

function groupEntries(entries: LadderEntry[], league: string): LadderSnapshot {
  const groups = new Map<string, LadderGroup>();

  for (const entry of entries) {
    const className = entry.character?.class || "Unknown";
    const matched = matchLadderClass(className);
    const key = matched?.ascendancyId || className;
    const existing = groups.get(key) ?? {
      className,
      count: 0,
      classId: matched?.classId ?? null,
      ascendancyId: matched?.ascendancyId ?? null,
      guideId: matched?.guideId ?? null,
      characters: [],
    };
    existing.count += 1;
    if (existing.characters.length < 5 && entry.character?.name && entry.account?.name) {
      existing.characters.push({
        rank: entry.rank ?? existing.count,
        name: entry.character.name,
        account: entry.account.name,
        level: entry.character.level ?? 0,
        className,
      });
    }
    groups.set(key, existing);
  }

  return {
    live: true,
    message: `Ranks from the top 1,000 characters in ${league}.`,
    league,
    updatedAt: new Date().toISOString(),
    groups: [...groups.values()].sort((a, b) => b.count - a.count),
  };
}

export async function getLadder(): Promise<LadderSnapshot> {
  if (cache && Date.now() - cache.at < TTL) return cache.snapshot;
  if (!ladderConfigured()) {
    return curated(
      "Live ladder ranks are waiting on a Path of Exile developer app with a client secret. The list below is the written route for each ascendancy.",
    );
  }

  try {
    const token = await getServiceToken();
    if (!token) {
      return curated("Live ladder ranks need POE_CLIENT_ID and POE_CLIENT_SECRET.");
    }

    const leagueList = await poeJson<{ leagues?: League[] }>("/league?realm=poe2&type=main", token);
    const league =
      leagueList.leagues?.find((entry) => entry.id && !/hardcore|standard/i.test(entry.id)) ??
      leagueList.leagues?.[0];
    if (!league?.id) {
      return curated("Path of Exile did not return a PoE2 league.");
    }

    const pages = await Promise.all(
      [0, 500].map((offset) =>
        poeJson<{ ladder?: { entries?: LadderEntry[] } }>(
          `/league/${encodeURIComponent(league.id!)}/ladder?realm=poe2&limit=500&offset=${offset}`,
          token,
        ),
      ),
    );
    const entries = pages.flatMap((page) => page.ladder?.entries ?? []);
    const snapshot = groupEntries(entries, league.name || league.id);
    cache = { at: Date.now(), snapshot };
    return snapshot;
  } catch {
    return curated("The official ladder did not answer. Showing the written routes instead.");
  }
}
