import { SESSION_COOKIE } from "@/lib/session";
import { appOrigin } from "@/lib/poe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", appOrigin(request)));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
