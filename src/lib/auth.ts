import { poeConfig, poeUserAgent } from "@/lib/poe";
import {
  type Session,
  sessionCookieOptions,
  SESSION_COOKIE,
  seal,
  open,
} from "@/lib/session";
import { cookies } from "next/headers";

const TOKEN_URL = "https://www.pathofexile.com/oauth/token";
const API_URL = "https://api.pathofexile.com";

export const USER_SCOPES = "account:profile account:characters";
export const LADDER_SCOPES = "service:leagues service:leagues:ladder";

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number | null;
  username?: string;
  sub?: string;
  error?: string;
  error_description?: string;
};

export class PoeAuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

async function postToken(body: URLSearchParams) {
  const { clientId, clientSecret } = poeConfig();
  body.set("client_id", clientId);
  if (clientSecret) body.set("client_secret", clientSecret);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": poeUserAgent(),
    },
    body,
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => ({}))) as TokenResponse;
  if (!response.ok || !payload.access_token) {
    throw new PoeAuthError(
      payload.error_description || payload.error || "Path of Exile refused the login.",
      response.status,
    );
  }
  return payload;
}

export function sessionFromToken(payload: TokenResponse, previous?: Session): Session {
  const expiresIn = typeof payload.expires_in === "number" ? payload.expires_in : 60 * 60 * 10;
  return {
    accessToken: payload.access_token || previous?.accessToken || "",
    refreshToken: payload.refresh_token || previous?.refreshToken,
    expiresAt: Date.now() + expiresIn * 1000,
    username: payload.username || previous?.username,
    sub: payload.sub || previous?.sub,
  };
}

export async function exchangeCode(code: string, verifier: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: poeConfig().redirectUri,
    scope: USER_SCOPES,
    code_verifier: verifier,
  });
  return sessionFromToken(await postToken(body));
}

export async function refreshSession(session: Session) {
  if (!session.refreshToken) throw new PoeAuthError("Sign in again to refresh this session.");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: session.refreshToken,
  });
  return sessionFromToken(await postToken(body), session);
}

let serviceToken: { token: string; at: number } | null = null;

export async function getServiceToken() {
  const { clientId, clientSecret } = poeConfig();
  if (!clientId || !clientSecret) return null;
  if (serviceToken && Date.now() - serviceToken.at < 1000 * 60 * 60 * 12) {
    return serviceToken.token;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    scope: LADDER_SCOPES,
  });
  const payload = await postToken(body);
  serviceToken = { token: payload.access_token || "", at: Date.now() };
  return serviceToken.token;
}

export async function poeJson<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "User-Agent": poeUserAgent(),
    },
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });

  if (response.status === 401) throw new PoeAuthError("Path of Exile session expired.", 401);
  if (response.status === 403) throw new PoeAuthError("This token cannot read that Path of Exile data.", 403);
  if (!response.ok) throw new PoeAuthError(`Path of Exile returned ${response.status}.`, response.status);
  return (await response.json()) as T;
}

export async function authorizedJson<T>(session: Session, path: string) {
  let current = session;
  if (current.expiresAt < Date.now() + 60_000) {
    current = await refreshSession(current);
  }

  try {
    const data = await poeJson<T>(path, current.accessToken);
    return { session: current, data };
  } catch (error) {
    if (!(error instanceof PoeAuthError) || error.status !== 401 || !current.refreshToken) {
      throw error;
    }
    current = await refreshSession(current);
    const data = await poeJson<T>(path, current.accessToken);
    return { session: current, data };
  }
}

export async function persistSession(session: Session) {
  const jar = await cookies();
  const maxAge = Math.max(60, Math.floor((session.expiresAt - Date.now()) / 1000));
  jar.set(SESSION_COOKIE, seal(session), sessionCookieOptions(maxAge));
}

export async function readSealedSession() {
  const jar = await cookies();
  return open<Session>(jar.get(SESSION_COOKIE)?.value);
}
