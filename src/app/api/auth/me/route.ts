import { authorizedJson, persistSession, readSealedSession } from "@/lib/auth";
import { loginConfigured } from "@/lib/poe";
import type { PoeCharacter } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  if (!loginConfigured()) {
    return NextResponse.json({ configured: false, signedIn: false, characters: [] });
  }

  const session = await readSealedSession();
  if (!session) {
    return NextResponse.json({ configured: true, signedIn: false, characters: [] });
  }

  try {
    const profile = await authorizedJson<{ name?: string }>(session, "/profile");
    const characters = await authorizedJson<{ characters?: PoeCharacter[] }>(
      profile.session,
      "/character/poe2",
    );
    if (characters.session.accessToken !== session.accessToken) {
      await persistSession(characters.session);
    }
    return NextResponse.json({
      configured: true,
      signedIn: true,
      username: profile.data.name || characters.session.username || null,
      characters: characters.data.characters ?? [],
    });
  } catch {
    return NextResponse.json({
      configured: true,
      signedIn: true,
      username: session.username ?? null,
      characters: [],
      error: "Path of Exile did not return your characters. Sign in again if this keeps happening.",
    });
  }
}
