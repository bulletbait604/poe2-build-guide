"use client";

import { useSearchParams } from "next/navigation";

const messages: Record<string, string> = {
  setup:
    "Sign-in needs a Path of Exile developer app. Create one at pathofexile.com/developer, set the redirect to http://127.0.0.1:3000/api/auth/callback, request account:profile and account:characters, then put the client id in .env.local as POE_CLIENT_ID. Open the site at http://127.0.0.1:3000, not localhost.",
  denied: "Path of Exile sign-in was cancelled.",
  failed: "Path of Exile did not finish signing you in. Check the client id, the redirect URL, and that this site is open on 127.0.0.1.",
  signedin: "Signed in. Your PoE2 characters are listed under your account.",
};

export function AuthBanner() {
  const params = useSearchParams();
  const key = params.get("auth") || (params.get("signedin") ? "signedin" : "");
  const message = messages[key];
  if (!message) return null;

  return (
    <p className="mx-auto mb-4 max-w-6xl px-4 text-sm leading-6 text-gold">
      {message}
    </p>
  );
}
