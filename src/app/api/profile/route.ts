import { publicCharacters, publicGear, validAccount, validCharacter } from "@/lib/profile";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const account = request.nextUrl.searchParams.get("account")?.trim() ?? "";
  const character = request.nextUrl.searchParams.get("character")?.trim() ?? "";

  if (!validAccount(account)) {
    return NextResponse.json({ error: "Enter a public account name." }, { status: 400 });
  }

  try {
    if (!character) {
      return NextResponse.json(await publicCharacters(account));
    }
    if (!validCharacter(character)) {
      return NextResponse.json({ error: "That character name is not valid." }, { status: 400 });
    }
    return NextResponse.json(await publicGear(account, character));
  } catch {
    return NextResponse.json({ error: "Path of Exile did not return that profile." }, { status: 502 });
  }
}
