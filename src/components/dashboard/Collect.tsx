"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fmtTime, fmtXAF } from "@/lib/demo-data";

type Mode = "phone" | "qr";
type Phase = "idle" | "pending" | "success";
type Done = { id: string; amount: number; mode: Mode; who: string; at: string };

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"];
const PRESETS = [1000, 2500, 5000, 10000];

/* Deterministic QR-like matrix (demo only — a real QR comes from the API). */
function DemoQr({ seed }: { seed: string }) {
  const N = 25;
  const cells = useMemo(() => {
    let h = 2166136261;
    for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    const out: boolean[] = [];
    for (let i = 0; i < N * N; i++) {
      h ^= h << 13;
      h ^= h >>> 17;
      h ^= h << 5;
      out.push((h >>> 0) % 100 < 48);
    }
    return out;
  }, [seed]);
  const finder = (x: number, y: number) => {
    const inBox = (bx: number, by: number) => x >= bx && x < bx + 7 && y >= by && y < by + 7;
    for (const [bx, by] of [[0, 0], [N - 7, 0], [0, N - 7]]) {
      if (inBox(bx, by)) {
        const dx = x - bx, dy = y - by;
        return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0;
      }
    }
    return -1;
  };
  return (
    <svg viewBox={`-2 -2 ${N + 4} ${N + 4}`} className="w-full h-full" role="img" aria-label="QR code de démonstration">
      <rect x="-2" y="-2" width={N + 4} height={N + 4} fill="#fff" />
      {cells.map((on, i) => {
        const x = i % N, y = Math.floor(i / N);
        const f = finder(x, y);
        const fill = f === -1 ? on : f === 1;
        return fill ? <rect key={i} x={x} y={y} width="1.02" height="1.02" fill="#0B3E33" /> : null;
      })}
      <rect x={N / 2 - 3} y={N / 2 - 3} width="6" height="6" rx="1.2" fill="#fff" />
      <rect x={N / 2 - 2.2} y={N / 2 - 2.2} width="4.4" height="4.4" rx="1" fill="#DBAE40" />
    </svg>
  );
}

export function Collect({ business }: { business: string }) {
  const [digits, setDigits] = useState("");
  const [mode, setMode] = useState<Mode>("phone");
  const [phone, setPhone] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Done[]>([]);
  const [ref, setRef] = useState("");
  const timer = useRef<number | null>(null);

  const amount = Number(digits || "0");
  const cleanPhone = phone.replace(/\D/g, "");
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const press = (k: string) => {
    setError("");
    if (k === "⌫") return setDigits((d) => d.slice(0, -1));
    setDigits((d) => (d + k).replace(/^0+/, "").slice(0, 8));
  };

  // physical keyboard on desktop
  useEffect(() => {
    if (phase !== "idle") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;
      if (/^\d$/.test(e.key)) press(e.key);
      if (e.key === "Backspace") press("⌫");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  const start = () => {
    if (amount < 100) return setError("Saisissez un montant d'au moins 100 XAF.");
    if (mode === "phone" && cleanPhone.length < 9) return setError("Saisissez le numéro du client (9 chiffres).");
    setError("");
    setRef(`KS-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    setPhase("pending");
    timer.current = window.setTimeout(() => {
      setPhase("success");
      setHistory((h) => [
        { id: `${Date.now()}`, amount, mode, who: mode === "phone" ? `+237 ${cleanPhone.slice(0, 3)} •• •• ${cleanPhone.slice(-2)}` : "QR code", at: new Date().toISOString() },
        ...h,
      ]);
    }, mode === "phone" ? 4200 : 5200);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setPhase("idle");
    setDigits("");
    setPhone("");
  };

  const sessionTotal = history.reduce((s, h) => s + h.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5">
      <section aria-labelledby="collect-h" className="rounded-[22px] bg-surface border border-line p-5 sm:p-7">
        <h2 id="collect-h" className="sr-only">
          Nouvel encaissement
        </h2>

        {phase === "idle" && (
          <div className="flex flex-col gap-5 step-in">
            {/* Amount display */}
            <div className="text-center pt-1">
              <p className="font-jura font-bold text-[14px] text-slate">Montant à encaisser</p>
              <p className="mt-1 font-roboto font-bold text-[44px] sm:text-[54px] leading-none text-forest tabular-nums" aria-live="polite">
                {amount ? new Intl.NumberFormat("fr-FR").format(amount) : "0"}
                <span className="ml-2 font-jura text-[20px] text-slate">XAF</span>
              </p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              {PRESETS.map((p) => (
                <button key={p} type="button" onClick={() => setDigits(String(p))} className="h-[36px] px-3.5 rounded-full bg-surface-2 font-jura font-bold text-[13.5px] text-forest active:scale-95 transition-transform">
                  {new Intl.NumberFormat("fr-FR").format(p)}
                </button>
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[360px] w-full mx-auto">
              {KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => press(k)}
                  aria-label={k === "⌫" ? "Effacer" : k}
                  className="h-[58px] rounded-[16px] bg-surface-2 font-roboto font-medium text-[22px] text-forest active:scale-95 active:bg-line transition-all"
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Mode */}
            <div className="max-w-[420px] w-full mx-auto flex flex-col gap-3">
              <div role="radiogroup" aria-label="Façon d'encaisser" className="grid grid-cols-2 gap-1 p-1 rounded-[14px] bg-surface-2">
                {(
                  [
                    ["phone", "Au téléphone"],
                    ["qr", "QR code"],
                  ] as [Mode, string][]
                ).map(([m, l]) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={mode === m}
                    onClick={() => setMode(m)}
                    className={`h-[44px] rounded-[10px] font-jura font-bold text-[14px] transition-all ${mode === m ? "bg-surface text-forest shadow-xs" : "text-slate"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {mode === "phone" && (
                <div className="kfield">
                  <label htmlFor="cl-phone">Numéro Orange Money ou MTN du client</label>
                  <div className="flex items-center gap-2">
                    <span className="h-[48px] px-3 rounded-[10px] bg-surface-2 flex items-center font-jura font-bold text-[15px] text-slate">+237</span>
                    <input id="cl-phone" type="tel" inputMode="numeric" autoComplete="off" placeholder="6XX XX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
              )}
              {error && (
                <p role="alert" className="rounded-[10px] bg-err-bg px-3 py-2 font-inter text-[14px] text-err-ink">
                  {error}
                </p>
              )}
              <button
                type="button"
                onClick={start}
                className="h-[56px] rounded-full bg-brand text-white font-jura font-bold text-[17px] shadow-md transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              >
                {mode === "phone" ? "Envoyer la demande" : "Afficher le QR code"}
                {amount >= 100 && <span className="opacity-80"> · {fmtXAF(amount)}</span>}
              </button>
            </div>
          </div>
        )}

        {phase === "pending" && (
          <div className="flex flex-col items-center text-center gap-5 py-4 step-in" aria-live="polite">
            {mode === "qr" ? (
              <>
                <p className="font-jura font-bold text-[15px] text-slate">Le client scanne pour payer</p>
                <div className="w-[230px] h-[230px] p-3 rounded-[20px] bg-white border border-line shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]">
                  <DemoQr seed={ref} />
                </div>
              </>
            ) : (
              <>
                <span className="relative w-20 h-20 rounded-full bg-mint flex items-center justify-center" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-40" />
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-forest)" strokeWidth="1.8" strokeLinecap="round">
                    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
                    <path d="M11 18.5h2" />
                  </svg>
                </span>
                <p className="font-jura font-bold text-[15px] text-slate">Demande envoyée au +237 {cleanPhone.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4")}</p>
              </>
            )}
            <p className="font-roboto font-bold text-[34px] text-forest tabular-nums">{fmtXAF(amount)}</p>
            <p className="inline-flex items-center gap-2 font-inter text-[14.5px] text-ink-2">
              <span className="w-4 h-4 rounded-full border-2 border-line-2 border-t-gold animate-spin" aria-hidden="true" />
              En attente de la validation du client…
            </p>
            <p className="font-inter text-[12.5px] text-slate">Démo : la validation est simulée au bout de quelques secondes.</p>
            <button type="button" onClick={reset} className="h-[44px] px-5 rounded-full border border-line-2 font-jura font-bold text-[14px] text-forest hover:bg-surface-2">
              Annuler
            </button>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center text-center gap-4 py-6 step-in" role="status">
            <span className="pop w-20 h-20 rounded-full bg-[#1F8A5B] flex items-center justify-center shadow-lg" aria-hidden="true">
              <svg width="34" height="26" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3.33333 5.5L8 1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="font-junge text-[30px] text-forest">Paiement reçu</p>
            <p className="font-roboto font-bold text-[34px] text-forest tabular-nums -mt-2">{fmtXAF(amount)}</p>
            <p className="font-inter text-[14px] text-slate">
              {business} · réf. <code className="font-mono">{ref}</code>
            </p>
            <button type="button" onClick={reset} className="mt-2 h-[52px] px-8 rounded-full bg-brand text-white font-jura font-bold text-[16px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all">
              Nouvel encaissement
            </button>
          </div>
        )}
      </section>

      <aside aria-labelledby="sess-h" className="rounded-[22px] bg-surface border border-line p-5 sm:p-6 self-start">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="sess-h" className="font-roboto font-bold text-[16.5px] text-forest">
            Cette session
          </h2>
          <span className="font-inter text-[13px] text-slate tabular-nums">{fmtXAF(sessionTotal)}</span>
        </div>
        {history.length === 0 ? (
          <p className="mt-3 font-inter text-[14px] leading-[155%] text-slate">
            Vos encaissements de la caisse apparaîtront ici, avec leur heure et le moyen utilisé.
          </p>
        ) : (
          <ul className="mt-3 flex flex-col">
            {history.map((h) => (
              <li key={h.id} className="flex items-center justify-between gap-3 py-2.5 border-t border-line first:border-0 step-in">
                <span className="min-w-0">
                  <span className="block font-inter font-medium text-[14px] text-forest">{h.mode === "qr" ? "QR code" : "Demande au téléphone"}</span>
                  <span className="block font-inter text-[12.5px] text-slate truncate">
                    {fmtTime(h.at)} · {h.who}
                  </span>
                </span>
                <span className="font-roboto font-bold text-[14.5px] text-forest tabular-nums">{fmtXAF(h.amount)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 rounded-[14px] bg-surface-2 p-4 font-inter text-[13px] leading-[155%] text-ink-2">
          Au comptoir, le client valide avec son propre code Mobile Money. KUSA ne voit jamais ce code.
        </div>
      </aside>
    </div>
  );
}
