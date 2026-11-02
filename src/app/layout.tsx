import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/kusa/Navbar";
import { Footer } from "@/components/kusa/Footer";
import { getUser } from "@/lib/supabase";
import { SiteChrome } from "@/components/kusa/theme";
import { THEME_INIT } from "@/lib/theme-init";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B3E33",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://kusa-five.vercel.app"),
  title: {
    default: "KUSA, l'infrastructure de paiement des entreprises africaines",
    template: "%s · KUSA",
  },
  description:
    "Boutiques, supermarchés, bars, hôtels et startups : encaissez Orange Money, MTN Mobile Money et les cartes en XAF, au comptoir, par lien ou par API, sur un seul compte KUSA.",
  icons: { icon: "/images/kusa-logo-icon.png", apple: "/images/kusa-logo-icon.png" },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    siteName: "KUSA",
    images: ["/images/hero-woman-hires.png"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getUser();
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script id="kusa-theme" strategy="beforeInteractive">
          {THEME_INIT}
        </Script>
        <a className="skip" href="#contenu">
          Aller au contenu
        </a>
        <SiteChrome>
          <Navbar signedIn={Boolean(user)} />
          <div aria-hidden="true" style={{ height: "calc(var(--nav-h) + env(safe-area-inset-top))" }} />
        </SiteChrome>
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  );
}
