"use client";

import { matchLadderClass } from "@/content/classes";
import type { PoeCharacter } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

type AccountState = {
  configured: boolean;
  loading: boolean;
  signedIn: boolean;
  username: string | null;
  characters: PoeCharacter[];
  error: string | null;
};

const AccountContext = createContext<AccountState>({
  configured: false,
  loading: true,
  signedIn: false,
  username: null,
  characters: [],
  error: null,
});

export function useAccount() {
  return useContext(AccountContext);
}

export function characterHref(character: PoeCharacter) {
  const match = matchLadderClass(character.class);
  if (!match?.guideId) return "/";
  const params = new URLSearchParams({ level: String(character.level) });
  if (match.ascendancyId) params.set("ascendancy", match.ascendancyId);
  return `/guide/${match.guideId}?${params.toString()}`;
}

export function AccountProvider({
  configured,
  children,
}: {
  configured: boolean;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AccountState>({
    configured,
    loading: true,
    signedIn: false,
    username: null,
    characters: [],
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((response) => response.json())
      .then((body) => {
        if (cancelled) return;
        setState({
          configured: Boolean(body.configured),
          loading: false,
          signedIn: Boolean(body.signedIn),
          username: body.username ?? null,
          characters: Array.isArray(body.characters) ? body.characters : [],
          error: body.error ?? null,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setState((current) => ({ ...current, loading: false, error: "Could not check the Path of Exile session." }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <AccountContext.Provider value={state}>{children}</AccountContext.Provider>;
}
