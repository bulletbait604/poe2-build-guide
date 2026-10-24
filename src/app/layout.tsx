import type { Metadata } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import { Suspense } from "react";
import { AuthBanner } from "@/components/AuthBanner";
import { AccountProvider } from "@/components/AccountProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { loginConfigured } from "@/lib/poe";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "PoE2 Build Guide",
  description: "Pick a Path of Exile 2 class and follow a plain step-by-step route through the campaign, interludes, and maps.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <AccountProvider configured={loginConfigured()}>
          <SiteHeader />
          <Suspense fallback={null}>
            <AuthBanner />
          </Suspense>
          <main className="mx-auto w-full max-w-6xl px-4 pb-16">{children}</main>
          <SiteFooter />
        </AccountProvider>
      </body>
    </html>
  );
}
