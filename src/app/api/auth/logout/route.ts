import { SESSION_COOKIE } from "@/lib/session";
import { appOrigin } from "@/lib/poe";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(new URL("/", appOrigin()));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
