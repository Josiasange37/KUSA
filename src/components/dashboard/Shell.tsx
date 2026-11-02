"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "@/app/actions";
import { ThemeToggle } from "@/components/kusa/theme";

type NavItem = { href: string; label: string; short?: string; icon: React.ReactNode };

const I = (d: React.ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

export const NAV: NavItem[] = [
  { href: "/tableau-de-bord", label: "Vue d'ensemble", short: "Accueil", icon: I(<path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-7.5Z" />) },
  { href: "/tableau-de-bord/transactions", label: "Transactions", short: "Paiements", icon: I(<path d="M4 7h13l-3-3M20 17H7l3 3" />) },
  { href: "/tableau-de-bord/encaisser", label: "Encaisser", icon: I(<path d="M12 5v14M5 12h14" />) },
  { href: "/tableau-de-bord/liens", label: "Liens de paiement", short: "Liens", icon: I(<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />) },
  { href: "/tableau-de-bord/reversements", label: "Reversements", icon: I(<path d="M4 9h16M4 9l2-4h12l2 4M5 9v10h14V9M9 13h6" />) },
  { href: "/tableau-de-bord/developpeurs", label: "Développeurs", icon: I(<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" />) },
  { href: "/tableau-de-bord/parametres", label: "Paramètres", icon: I(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>) },
];

const TABS = ["/tableau-de-bord", "/tableau-de-bord/transactions", "/tableau-de-bord/encaisser", "/tableau-de-bord/liens"];

function initials(s: string) {
  return (
    s
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "K"
  );
}

export function Shell({ user, children }: { user: { name: string; business: string; type: string; email: string }; children: React.ReactNode }) {
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const active = (href: string) => (href === "/tableau-de-bord" ? pathname === href : pathname.startsWith(href));
  const current = NAV.find((n) => active(n.href));

  useEffect(() => setMore(false), [pathname]);
  useEffect(() => {
    if (!more) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMore(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [more]);

  const brand = (
    <Link href="/tableau-de-bord" className="flex items-center gap-2.5" aria-label="KUSA, vue d'ensemble">
      <Image src="/images/kusa-logo-icon.png" alt="" width={36} height={33} priority />
      <span className="font-jura font-bold text-[22px] leading-none tracking-[-0.04em] text-forest">kusa</span>
      <span className="font-mono text-[10px] leading-none px-1.5 py-1 rounded-[5px] bg-warn-bg text-warn-ink">DÉMO</span>
    </Link>
  );

  const merchant = (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-10 h-10 flex-none rounded-[11px] bg-gold text-on-gold flex items-center justify-center font-jura font-bold text-[15px]">{initials(user.business)}</span>
      <span className="flex flex-col min-w-0">
        <span className="font-roboto font-bold text-[14.5px] text-forest truncate">{user.business}</span>
        <span className="font-jura font-semibold text-[12.5px] text-slate truncate">{user.type}</span>
      </span>
    </div>
  );

  return (
    <div className="min-h-[100svh] bg-cream lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
      {/* ───────── Desktop sidebar ───────── */}
      <aside className="hidden lg:flex flex-col sticky top-0 h-[100svh] border-r border-line bg-surface">
        <div className="px-5 pt-6 pb-5">{brand}</div>
        <div className="mx-4 mb-4 p-3 rounded-[14px] bg-surface-2">{merchant}</div>
        <nav aria-label="Espace marchand" className="flex-1 overflow-y-auto px-3">
          <ul className="flex flex-col gap-0.5">
            {NAV.map((n) => {
              const on = active(n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={on ? "page" : undefined}
                    className={`flex items-center gap-3 h-[44px] px-3 rounded-[10px] font-jura font-bold text-[14.5px] transition-colors ${
                      on ? "bg-mint text-forest" : "text-slate hover:text-forest hover:bg-surface-2"
                    }`}
                  >
                    <span className={on ? "text-forest" : ""}>{n.icon}</span>
                    {n.label}
                    {n.href.endsWith("encaisser") && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 flex flex-col gap-3 border-t border-line">
          <div className="rounded-[14px] p-4 dev-band overflow-hidden">
            <div className="relative z-10 flex flex-col gap-2">
              <p className="font-jura font-bold text-[13.5px] text-[#F0F2F2]">Une question ?</p>
              <p className="font-inter text-[12.5px] leading-[150%] text-[#A1AFBA]">Le service KUSA vous répond en français.</p>
              <Link href="/contact" className="self-start inline-flex items-center h-[34px] px-3.5 rounded-full bg-gold text-on-gold font-jura font-bold text-[13px]">
                Contacter le service
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <form action={signOut} className="flex-1">
              <button type="submit" className="w-full h-[44px] rounded-[10px] border border-line-2 font-jura font-bold text-[14px] text-forest hover:bg-surface-2 transition-colors">
                Se déconnecter
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* ───────── Main column ───────── */}
      <div className="min-w-0 flex flex-col min-h-[100svh]">
        {/* Mobile top bar */}
        <header
          className="lg:hidden sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-line"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="h-[60px] px-4 flex items-center justify-between gap-3">
            {brand}
            <div className="flex items-center gap-1 -mr-1.5">
              <ThemeToggle bare />
              <Link href="/tableau-de-bord/parametres" aria-label="Paramètres du compte" className="w-[44px] h-[44px] flex items-center justify-center">
                <span className="w-9 h-9 rounded-[10px] bg-gold text-on-gold flex items-center justify-center font-jura font-bold text-[13px]">{initials(user.business)}</span>
              </Link>
            </div>
          </div>
        </header>

        {/* In-development notice: always visible, never dismissable */}
        <div role="note" className="bg-warn-bg border-b border-line">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 py-2.5 flex items-start sm:items-center gap-3">
            <span className="flex-none mt-[1px] sm:mt-0 w-6 h-6 rounded-full bg-gold/25 text-warn-ink flex items-center justify-center" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 8v5M12 16.5v.01" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <p className="font-inter text-[13px] sm:text-[13.5px] leading-[150%] text-warn-ink">
              <strong className="font-semibold">Espace marchand en cours de développement.</strong> Vous visitez une démo : les chiffres sont fictifs et
              aucun paiement réel n&apos;est traité.{" "}
              <Link href="/contact?objet=Ouvrir%20un%20compte" className="underline underline-offset-2 font-medium whitespace-nowrap">
                Être prévenu du lancement
              </Link>
            </p>
          </div>
        </div>

        {/* Desktop top bar */}
        <div className="hidden lg:flex items-center justify-between gap-4 max-w-[1180px] w-full mx-auto px-10 pt-6">
          <p className="font-jura font-bold text-[13.5px] text-slate">
            Espace marchand <span aria-hidden="true">/</span> <span className="text-forest">{current?.label ?? "Vue d'ensemble"}</span>
          </p>
          <div className="flex items-center gap-2.5">
            <Link href="/tableau-de-bord/liens?nouveau=1" className="inline-flex items-center h-[42px] px-4 rounded-[10px] bg-surface border border-line-2 text-forest font-jura font-bold text-[14px] hover:bg-surface-2 transition-colors">
              Créer un lien
            </Link>
            <Link href="/tableau-de-bord/encaisser" className="inline-flex items-center gap-2 h-[42px] px-4 rounded-[10px] bg-brand text-white font-jura font-bold text-[14px] hover:brightness-110 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Encaisser
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-5 pb-[calc(96px+env(safe-area-inset-bottom))] lg:pb-14">
          {children}
        </div>
      </div>

      {/* ───────── Mobile tab bar (thumb zone) ───────── */}
      <nav
        aria-label="Espace marchand"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 h-[64px]">
          {TABS.map((href) => {
            const n = NAV.find((x) => x.href === href)!;
            const on = active(href);
            const isCollect = href.endsWith("encaisser");
            return (
              <li key={href} className="flex">
                <Link href={href} aria-current={on ? "page" : undefined} className="flex-1 flex flex-col items-center justify-center gap-1 relative">
                  {isCollect ? (
                    <span className={`-mt-6 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(11,62,51,0.6)] ring-4 ring-cream ${on ? "bg-gold text-on-gold" : "bg-brand text-white"}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  ) : (
                    <span className={on ? "text-forest" : "text-slate"}>{n.icon}</span>
                  )}
                  <span className={`font-jura font-bold text-[11.5px] ${on ? "text-forest" : "text-slate"}`}>{n.short ?? n.label}</span>
                  {on && !isCollect && <span className="absolute top-0 w-8 h-[3px] rounded-b-full bg-gold" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
          <li className="flex">
            <button
              type="button"
              onClick={() => setMore(true)}
              aria-expanded={more}
              aria-controls="more-sheet"
              className="flex-1 flex flex-col items-center justify-center gap-1"
            >
              <span className={NAV.slice(4).some((n) => active(n.href)) ? "text-forest" : "text-slate"}>
                {I(
                  <>
                    <circle cx="5" cy="12" r="1.3" />
                    <circle cx="12" cy="12" r="1.3" />
                    <circle cx="19" cy="12" r="1.3" />
                  </>
                )}
              </span>
              <span className="font-jura font-bold text-[11.5px] text-slate">Plus</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* "Plus" bottom sheet */}
      {more && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Plus d'options" id="more-sheet">
          <button type="button" aria-label="Fermer" className="absolute inset-0 bg-black/40 menu-in" onClick={() => setMore(false)} />
          <div className="sheet-up absolute bottom-0 inset-x-0 rounded-t-[24px] bg-cream border-t border-line px-4 pt-3" style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}>
            <span className="block mx-auto mb-4 w-10 h-1 rounded-full bg-line-2" aria-hidden="true" />
            <div className="px-1 mb-4">{merchant}</div>
            <ul className="flex flex-col gap-1">
              {NAV.slice(4).map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={active(n.href) ? "page" : undefined}
                    className={`flex items-center gap-3.5 min-h-[54px] px-3 rounded-[12px] font-jura font-bold text-[16px] ${active(n.href) ? "bg-mint text-forest" : "text-forest active:bg-surface-2"}`}
                  >
                    {n.icon}
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/" className="flex items-center gap-3.5 min-h-[54px] px-3 rounded-[12px] font-jura font-bold text-[16px] text-forest active:bg-surface-2">
                  {I(<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />)}
                  Retour au site KUSA
                </Link>
              </li>
            </ul>
            <form action={signOut} className="mt-3">
              <button type="submit" className="w-full h-[50px] rounded-full border border-line-2 font-jura font-bold text-[15px] text-err-ink bg-surface">
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
