import { USER_SCOPES } from "@/lib/auth";
import { loginConfigured, poeConfig, appOrigin } from "@/lib/poe";
import {
  codeChallenge,
  newVerifier,
  PKCE_COOKIE,
  safeNextPath,
  seal,
  sessionCookieOptions,
} from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!loginConfigured()) {
    return NextResponse.redirect(new URL("/?auth=setup", appOrigin(request)));
  }

  const verifier = newVerifier();
  const state = newVerifier();
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));
  const config = poeConfig();
  const authorize = new URL("https://www.pathofexile.com/oauth/authorize");
  authorize.searchParams.set("client_id", config.clientId);
  authorize.searchParams.set("response_type", "code");
  authorize.searchParams.set("scope", USER_SCOPES);
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("redirect_uri", config.redirectUri);
  authorize.searchParams.set("code_challenge", codeChallenge(verifier));
  authorize.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authorize);
  response.cookies.set(
    PKCE_COOKIE,
    seal({ verifier, state, next }),
    sessionCookieOptions(60 * 10),
  );
  return response;
}
