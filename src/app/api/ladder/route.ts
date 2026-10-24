import { getLadder } from "@/lib/ladder";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const ladder = await getLadder();
  return NextResponse.json(ladder);
}
