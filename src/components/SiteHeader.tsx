"use client";

import Link from "next/link";
import { useAccount } from "@/components/AccountProvider";

export function SiteHeader() {
  const account = useAccount();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5">
      <Link href="/" className="font-display text-lg tracking-[0.18em] text-gold uppercase">
        PoE2 Build Guide
      </Link>
      <div className="flex items-center gap-3 text-sm">
        {account.loading ? <span className="text-muted">Checking session</span> : null}
        {account.signedIn ? (
          <>
            <span className="text-parchment">{account.username}</span>
            <form action="/api/auth/logout" method="post">
              <button className="border border-line px-3 py-1.5 text-muted hover:border-gold hover:text-gold" type="submit">
                Sign out
              </button>
            </form>
          </>
        ) : (
          <a
            className="border border-gold/70 bg-gold px-3 py-1.5 font-semibold text-ink hover:bg-parchment"
            href="/api/auth/login?next=/?signedin=1"
          >
            Sign in with Path of Exile
          </a>
        )}
      </div>
    </header>
  );
}
