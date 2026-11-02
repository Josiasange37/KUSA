"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";

/* Live preview shared between the sign-up questions and the brand panel. */
export type Preview = {
  name?: string;
  business?: string;
  type?: string;
  phone?: string;
  email?: string;
  secure?: boolean;
  ready?: boolean;
  done?: boolean;
};

const PreviewCtx = createContext<{ preview: Preview | null; setPreview: (p: Preview | null) => void }>({
  preview: null,
  setPreview: () => {},
});
export const useAuthPreview = () => useContext(PreviewCtx);

const LOGOS = [
  { name: "Orange Money", src: "/images/partner-orange.png", w: 30, h: 30 },
  { name: "MTN MoMo", src: "/images/partner-mtn.png", w: 50, h: 30 },
  { name: "Visa", src: "/images/partner-visa.png", w: 52, h: 22 },
  { name: "Mastercard", src: "/images/partner-mastercard.png", w: 42, h: 28 },
];

function Tick({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 7) / 9} viewBox="0 0 9 7" fill="none" aria-hidden="true">
      <path d="M1 3.5L3.33333 5.5L8 1" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Headline above the woman, changing every few seconds */
function RotatingLine({ phrases }: { phrases: [string, string][] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % phrases.length), 7000);
    return () => window.clearInterval(t);
  }, [phrases.length]);
  const [a, b] = phrases[i];
  return (
    <p className="relative z-10 font-junge text-[38px] xl:text-[46px] leading-[110%] tracking-[-0.02em] text-forest max-w-[460px] min-h-[2.3em]">
      <span key={i} className="block phrase-in">
        {a}
        <br />
        {b}
      </span>
    </p>
  );
}

function PaymentCard({ amount, method }: { amount: string; method: string }) {
  return (
    <div className="auth-rise w-[250px] rounded-[16px] bg-surface p-4 border border-line shadow-[0_24px_50px_-18px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-[#1F8A5B] flex items-center justify-center flex-none">
          <Tick />
        </span>
        <span className="flex flex-col">
          <span className="font-jura font-bold text-[13px] text-slate">Paiement reçu</span>
          <span className="font-roboto font-bold text-[19px] text-forest leading-tight">{amount}</span>
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between font-inter text-[12px] text-slate">
        <span>{method}</span>
        <span className="font-mono text-[11px] text-gold">success</span>
      </div>
    </div>
  );
}

/* The merchant account building itself as the visitor answers */
function MerchantCard({ p }: { p: Preview }) {
  const biz = p.business?.trim() || "Votre activité";
  const initials =
    (p.business?.trim() || p.name?.trim() || "K")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "K";
  const rows: { k: string; v?: string; on: boolean }[] = [
    { k: "Responsable", v: p.name, on: Boolean(p.name?.trim()) },
    { k: "Téléphone", v: p.phone ? `+237 ${p.phone}` : undefined, on: Boolean(p.phone?.trim()) },
    { k: "Email", v: p.email, on: Boolean(p.email?.trim()) },
    { k: "Sécurité", v: p.secure ? "Mot de passe fort" : undefined, on: Boolean(p.secure) },
  ];
  const status = p.done ? "Compte créé" : p.ready ? "Prêt à encaisser" : "En préparation";

  return (
    <div className="auth-rise w-[320px] rounded-[20px] bg-surface border border-line shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="relative px-5 pt-5 pb-4">
        <span className="absolute top-0 right-0 w-[56px] h-[54px] overflow-hidden rounded-tr-[20px]" aria-hidden="true">
          <Image src="/images/product-pattern-motif.png" alt="" width={112} height={108} className="w-full h-full object-cover" />
        </span>
        <p className="font-jura font-bold text-[12px] text-slate">Espace marchand KUSA</p>
        <div className="mt-3 flex items-center gap-3">
          <span key={initials} className="pop w-11 h-11 rounded-[12px] bg-gold text-on-gold flex items-center justify-center font-jura font-bold text-[16px] flex-none">
            {initials}
          </span>
          <span className="flex flex-col min-w-0">
            <span className={`font-roboto font-bold text-[18px] leading-tight truncate transition-colors ${p.business?.trim() ? "text-forest" : "text-slate"}`}>{biz}</span>
            <span className="font-jura font-bold text-[13px] text-slate truncate">{p.type || "Type d'activité"}</span>
          </span>
        </div>
      </div>

      <ul className="px-5 pb-4 flex flex-col gap-2.5">
        {rows.map((r) => (
          <li key={r.k} className="flex items-center gap-2.5 min-h-[22px]">
            <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-none transition-colors duration-300 ${r.on ? "bg-[#1F8A5B]" : "bg-line-2"}`}>
              {r.on && <Tick size={9} />}
            </span>
            <span className="font-jura font-bold text-[12.5px] text-slate w-[86px] flex-none">{r.k}</span>
            <span className={`font-inter text-[13px] truncate transition-opacity duration-300 ${r.on ? "text-forest opacity-100" : "opacity-0"}`}>{r.v || "·"}</span>
          </li>
        ))}
      </ul>

      <div className="px-5 py-3.5 bg-surface-2 flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-2 font-jura font-bold text-[13px] ${p.ready || p.done ? "text-forest" : "text-slate"}`}>
          <span className={`w-2 h-2 rounded-full ${p.done ? "bg-[#1F8A5B]" : p.ready ? "bg-gold" : "bg-line-2"}`} />
          {status}
        </span>
        <span className="flex items-center gap-2">
          {LOGOS.slice(0, 2).map((l) => (
            <span key={l.name} className="logo-chip flex items-center" style={{ width: l.w * 0.8, height: l.h * 0.8 }}>
              <Image src={l.src} alt="" width={l.w * 2} height={l.h * 2} className="w-full h-full object-contain" />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

/* Full-screen frame for sign-in and sign-up: only the logo on top,
   the form on the left, the KUSA world on the right. */
export function AuthFrame({
  children,
  phrases,
  card,
}: {
  children: React.ReactNode;
  phrases: [string, string][];
  card: { amount: string; method: string };
}) {
  const [preview, setPreview] = useState<Preview | null>(null);

  return (
    <PreviewCtx.Provider value={{ preview, setPreview }}>
      <div className="min-h-[100svh] grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] bg-cream">
        <div className="relative flex flex-col min-h-[100svh]">
          <header className="px-5 sm:px-10 lg:px-14 pt-5 sm:pt-7">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="KUSA, retour à l'accueil">
              <Image src="/images/kusa-logo-icon.png" alt="" width={41} height={38} priority className="transition-transform duration-300 group-hover:rotate-6" />
              <span className="font-jura font-bold text-[24px] leading-none tracking-[-0.04em] text-forest">kusa</span>
            </Link>
          </header>
          <div className="flex-1 flex flex-col">{children}</div>
        </div>

        <aside aria-hidden="true" className="relative hidden lg:block overflow-hidden bg-surface-2">
          <div className="absolute inset-0 woven" />
          <div className="absolute inset-0 flex flex-col p-12 xl:p-16">
            <RotatingLine phrases={phrases} />

            <div className="relative flex-1 flex items-end justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-woman-hires.png"
                alt=""
                className="relative z-0 w-full max-w-[400px] h-auto max-h-[58svh] object-contain object-bottom select-none -mb-12 xl:-mb-16"
                style={{ transform: "rotate(-1.66deg)", transformOrigin: "bottom center" }}
              />
              <div className="absolute right-0 top-[14%] z-10">
                {preview ? <MerchantCard p={preview} /> : <PaymentCard amount={card.amount} method={card.method} />}
              </div>
              {!preview && (
                <div className="auth-rise absolute right-0 bottom-[14%] z-10 rounded-[16px] bg-surface px-4 py-3 border border-line shadow-[0_24px_50px_-18px_rgba(0,0,0,0.35)] flex items-center gap-4">
                  {LOGOS.map((l) => (
                    <span key={l.name} className="logo-chip flex items-center justify-center" style={{ width: l.w, height: l.h }}>
                      <Image src={l.src} alt="" width={l.w * 2} height={l.h * 2} className="w-full h-full object-contain" />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </PreviewCtx.Provider>
  );
}
