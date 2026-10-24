import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "poe_session";
export const PKCE_COOKIE = "poe_pkce";

export type Session = {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  username?: string;
  sub?: string;
};

export type PkceState = {
  verifier: string;
  state: string;
  next: string;
};

export function sessionSecret() {
  const fromEnv = process.env.POE_SESSION_SECRET?.trim();
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  if (process.env.NODE_ENV !== "production") {
    return "dev-only-poe2-build-guide-session-key";
  }
  return "";
}

function sign(payload: string) {
  const secret = sessionSecret();
  if (!secret) throw new Error("POE_SESSION_SECRET is not set.");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function seal(value: unknown) {
  const payload = Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function open<T>(token: string | undefined): T | null {
  if (!token || !sessionSecret()) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export function safeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (!/^\/[A-Za-z0-9\-._~/?=&%]*$/.test(value)) return "/";
  return value;
}

export function newVerifier() {
  return randomBytes(32).toString("base64url");
}

export function codeChallenge(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

export async function readSession() {
  const jar = await cookies();
  return open<Session>(jar.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
