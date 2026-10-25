import { exchangeCode } from "@/lib/auth";
import { appOrigin } from "@/lib/poe";
import {
  open,
  PKCE_COOKIE,
  SESSION_COOKIE,
  seal,
  sessionCookieOptions,
  type PkceState,
} from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get("error");
  const pkce = open<PkceState>(request.cookies.get(PKCE_COOKIE)?.value);
  const fail = (code: string) => {
    const response = NextResponse.redirect(new URL(`/?auth=${code}`, appOrigin(request)));
    response.cookies.delete(PKCE_COOKIE);
    return response;
  };

  if (error === "access_denied") return fail("denied");
  if (error) return fail("failed");

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  if (!pkce || !code || pkce.state !== state) return fail("failed");

  try {
    const session = await exchangeCode(code, pkce.verifier);
    const destination = pkce.next === "/" ? "/?signedin=1" : pkce.next;
    const response = NextResponse.redirect(new URL(destination, appOrigin(request)));
    const maxAge = Math.max(60, Math.floor((session.expiresAt - Date.now()) / 1000));
    response.cookies.set(SESSION_COOKIE, seal(session), sessionCookieOptions(maxAge));
    response.cookies.delete(PKCE_COOKIE);
    return response;
  } catch {
    return fail("failed");
  }
}
