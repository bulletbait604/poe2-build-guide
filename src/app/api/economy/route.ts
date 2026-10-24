import { pricesFor } from "@/lib/economy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const names = (request.nextUrl.searchParams.get("names") ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 40);
  const items = await pricesFor(names);
  return NextResponse.json({ currency: "divine", items });
}
