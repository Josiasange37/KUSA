"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SOLUTIONS } from "@/lib/content";
import { MENU_ORDER, SOLUTION_ICONS } from "@/lib/solution-meta";
import { ThemeToggle } from "@/components/kusa/theme";

const LINKS = [
  { href: "/tarifs", label: "Tarifs" },
  { href: "/developpeurs", label: "Développeurs" },
  { href: "/a-propos", label: "À propos" },
];


function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "none" }}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mSolOpen, setMSolOpen] = useState(false);
  const solRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSolOpen(false);
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!mobileOpen) setMSolOpen(false);
  }, [mobileOpen]);

  useEffect(() => {
    if (!solOpen) return;
    const onDown = (e: MouseEvent) => {
      if (solRef.current && !solRef.current.contains(e.target as Node)) setSolOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSolOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [solOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solutions = MENU_ORDER.map((slug) => SOLUTIONS.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SOLUTIONS)[number] => Boolean(s)
  );
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const solActive = pathname.startsWith("/solutions");

  const linkCls = "font-jura text-[15px] font-semibold whitespace-nowrap transition-colors hover:text-forest px-1 py-2";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled ? "bg-surface/95 backdrop-blur-md shadow-xs" : "bg-cream/95 backdrop-blur-sm"
        }`}
        style={{
          height: "calc(var(--nav-h) + env(safe-area-inset-top))",
          paddingTop: "env(safe-area-inset-top)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div className="h-full w-full flex items-center px-4 sm:px-8">
          {/* Brand: K icon + kusa wordmark */}
          <Link href="/" className="flex items-center gap-2.5 flex-none group" aria-label="KUSA, accueil">
            <Image
              src="/images/kusa-logo-icon.png"
              alt=""
              width={41}
              height={38}
              priority
              className="object-contain transition-transform duration-300 group-hover:rotate-6"
              style={{ width: 41, height: 38 }}
            />
            <span className="font-jura font-bold text-[24px] leading-none tracking-[-0.04em] text-forest">kusa</span>
          </Link>

          {/* Desktop links, left-aligned next to the brand */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-7 xl:gap-8 ml-12 xl:ml-14">
            <div ref={solRef} className="relative">
              <button
                type="button"
                className={`${linkCls} inline-flex items-center gap-1.5 ${solActive ? "text-forest" : "text-ink-2"}`}
                aria-expanded={solOpen}
                aria-controls="menu-solutions"
                onClick={() => setSolOpen((o) => !o)}
              >
                Solutions
                <Chevron open={solOpen} />
              </button>

              {solOpen && (
                <div
                  id="menu-solutions"
                  className="menu-in absolute left-[-16px] top-[calc(100%+14px)] w-[420px] bg-surface rounded-[16px] p-2.5"
                  style={{ border: "1px solid var(--color-line)", boxShadow: "0 20px 45px -15px rgba(14, 59, 51, 0.22)" }}
                >
                  <ul className="flex flex-col">
                    {solutions.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/solutions/${s.slug}`}
                          className="flex items-start gap-3.5 rounded-[12px] p-3 transition-colors hover:bg-cream focus-visible:bg-cream"
                        >
                          <span className="flex-none w-10 h-10 rounded-[10px] bg-mint flex items-center justify-center text-forest">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              {SOLUTION_ICONS[s.slug]}
                            </svg>
                          </span>
                          <span className="flex flex-col gap-0.5">
                            <span className="font-roboto font-bold text-[15px] text-forest">{s.name}</span>
                            <span className="font-jura font-semibold text-[13px] leading-[1.45] text-slate">{s.menu}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1.5 rounded-[12px] bg-cream px-4 py-3 flex items-center justify-between gap-3">
                    <span className="font-jura font-semibold text-[13px] text-slate">Un doute sur la bonne solution ?</span>
                    <Link href="/contact" className="font-jura font-bold text-[13px] text-forest underline underline-offset-4 decoration-gold">
                      Contacter le service
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`${linkCls} ${isActive(l.href) ? "text-forest" : "text-ink-2"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions: outlined + filled */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <ThemeToggle />
            {signedIn ? (
              <Link
                href="/tableau-de-bord"
                className="inline-flex items-center h-[44px] px-5 rounded-[8px] bg-brand text-white font-jura font-bold text-[14px] transition-all hover:brightness-110 active:scale-[0.97]"
              >
                Mon espace
              </Link>
            ) : (
              <>
                <Link
                  href="/connexion"
                  className="inline-flex items-center h-[44px] px-5 rounded-[8px] bg-surface border border-line-2 text-forest font-jura font-bold text-[14px] transition-all hover:border-forest/40 hover:bg-surface-2 active:scale-[0.97]"
                >
                  Se connecter
                </Link>
                <Link
                  href="/inscription"
                  className="inline-flex items-center h-[44px] px-5 rounded-[8px] bg-brand text-white font-jura font-bold text-[14px] shadow-xs transition-all hover:brightness-110 active:scale-[0.97]"
                >
                  Ouvrir un compte
                </Link>
              </>
            )}
          </div>

          {/* Mobile: logo + burger only; everything else lives in the drawer */}
          <ThemeToggle bare className="lg:hidden ml-auto" />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden ml-1 -mr-2 w-[48px] h-[48px] flex items-center justify-center rounded-[10px] text-forest active:bg-surface-2 transition-colors"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h16M4 16h10" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="lg:hidden fixed inset-0 z-[100] bg-cream text-navy flex flex-col overflow-y-auto overscroll-contain menu-in"
        >
          <div className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none select-none opacity-25 woven" style={{ backgroundSize: "300px auto" }} aria-hidden="true" />

          {/* Same bar, burger turned into a close button */}
          <div
            className="relative z-10 flex items-center justify-between px-4 sm:px-8 border-b border-line bg-cream"
            style={{ minHeight: "calc(var(--nav-h) + env(safe-area-inset-top))", paddingTop: "env(safe-area-inset-top)" }}
          >
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5" aria-label="KUSA, accueil">
              <Image src="/images/kusa-logo-icon.png" alt="" width={41} height={38} className="object-contain" />
              <span className="font-jura font-bold text-[24px] leading-none tracking-[-0.04em] text-forest">kusa</span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              className="-mr-2 w-[48px] h-[48px] rounded-[10px] flex items-center justify-center text-forest active:bg-surface-2"
              aria-label="Fermer le menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="relative z-10 flex-1 px-4 sm:px-8 pt-4 pb-8 flex flex-col gap-6">
            <nav aria-label="Menu principal">
              <ul className="flex flex-col">
                {/* Solutions: one row that drops the three solutions open */}
                <li className="drawer-item" style={{ animationDelay: "60ms" }}>
                  <button
                    type="button"
                    onClick={() => setMSolOpen((o) => !o)}
                    aria-expanded={mSolOpen}
                    aria-controls="m-solutions"
                    className={`w-full flex items-center justify-between min-h-[60px] px-1 font-junge text-[28px] leading-none transition-colors ${
                      mSolOpen || solActive ? "text-gold" : "text-forest"
                    }`}
                  >
                    Solutions
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${mSolOpen ? "bg-gold text-on-gold rotate-180" : "bg-surface-2 text-forest"}`}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id="m-solutions"
                    className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: mSolOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-1 gap-2 pt-1 pb-4" inert={!mSolOpen}>
                        {solutions.map((s, i) => (
                          <li key={s.slug} className={mSolOpen ? "drawer-item" : ""} style={{ animationDelay: `${i * 60}ms` }}>
                            <Link
                              href={`/solutions/${s.slug}`}
                              onClick={() => setMobileOpen(false)}
                              aria-current={pathname === `/solutions/${s.slug}` ? "page" : undefined}
                              className="relative flex items-center gap-3.5 min-h-[72px] pl-3 pr-4 rounded-[16px] bg-surface border border-line overflow-hidden active:scale-[0.98] transition-transform"
                            >
                              <span className="absolute top-0 right-0 w-[44px] h-[42px] overflow-hidden rounded-tr-[16px] opacity-90" aria-hidden="true">
                                <Image src="/images/product-pattern-motif.png" alt="" width={88} height={84} className="w-full h-full object-cover" />
                              </span>
                              <span className="flex-none w-12 h-12 rounded-[12px] bg-mint flex items-center justify-center text-forest">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  {SOLUTION_ICONS[s.slug]}
                                </svg>
                              </span>
                              <span className="flex flex-col min-w-0 pr-8">
                                <span className="font-roboto font-bold text-[17px] text-forest">{s.name}</span>
                                <span className="font-jura font-semibold text-[13.5px] leading-[1.35] text-slate line-clamp-2">{s.setup}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>

                {[...LINKS, { href: "/contact", label: "Contacter le service" }].map((l, i) => (
                  <li key={l.href} className="drawer-item border-t border-line" style={{ animationDelay: `${120 + i * 50}ms` }}>
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`flex items-center justify-between min-h-[60px] px-1 font-junge text-[28px] leading-none transition-colors active:text-gold ${
                        isActive(l.href) ? "text-gold" : "text-forest"
                      }`}
                    >
                      {l.label}
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-slate">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="drawer-item flex items-center justify-between gap-4 rounded-[14px] bg-surface border border-line px-4 py-2" style={{ animationDelay: "440ms" }}>
              <span className="font-jura font-bold text-[15px] text-forest">Apparence</span>
              <ThemeToggle />
            </div>
          </div>

          {/* Actions in the thumb zone */}
          <div className="sticky bottom-0 z-10 px-4 sm:px-8 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))] bg-cream border-t border-line">
            {signedIn ? (
              <Link href="/tableau-de-bord" onClick={() => setMobileOpen(false)} className="w-full h-[52px] rounded-full bg-brand text-white font-jura font-bold text-[16px] flex items-center justify-center active:scale-[0.98] transition-transform">
                Mon espace
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/connexion" onClick={() => setMobileOpen(false)} className="h-[52px] rounded-full bg-surface border border-line-2 text-forest font-jura font-bold text-[15px] flex items-center justify-center active:scale-[0.98] transition-transform">
                  Se connecter
                </Link>
                <Link href="/inscription" onClick={() => setMobileOpen(false)} className="h-[52px] rounded-full bg-brand text-white font-jura font-bold text-[15px] flex items-center justify-center active:scale-[0.98] transition-transform">
                  Ouvrir un compte
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
