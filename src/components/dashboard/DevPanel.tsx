"use client";

import Link from "next/link";
import { useState } from "react";
import { fmtDate, type Tx } from "@/lib/demo-data";

type Log = { id: string; method: "POST" | "GET"; path: string; code: number; at: string; ms: number };

export function DevPanel({ seed, recent, now }: { seed: string; recent: Tx[]; now: string }) {
  const testKey = `kusa_test_${seed}`;
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hook, setHook] = useState("");
  const [savedHook, setSavedHook] = useState("");
  const [hookErr, setHookErr] = useState("");
  const [sent, setSent] = useState<{ at: string; code: number } | null>(null);

  const logs: Log[] = recent.slice(0, 8).map((t, i) => ({
    id: t.id,
    method: i % 3 === 2 ? "GET" : "POST",
    path: i % 3 === 2 ? `/v1/payments/${t.id}` : "/v1/payments",
    code: t.status === "failed" && i % 3 !== 2 ? 402 : i % 3 === 2 ? 200 : 201,
    at: t.at,
    ms: 120 + ((t.amount / 100) % 260),
  }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(testKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^https:\/\/[^\s]+\.[^\s]+/.test(hook.trim())) return setHookErr("Indiquez une URL en https://, par exemple https://votre-site.cm/webhook.");
    setHookErr("");
    setSavedHook(hook.trim());
    setSent(null);
  };

  const codeCls = (c: number) => (c < 300 ? "bg-ok-bg text-ok" : "bg-err-bg text-err-ink");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Keys */}
      <section aria-labelledby="keys-h" className="rounded-[18px] dev-band overflow-hidden p-5 sm:p-6">
        <div className="relative z-10 flex flex-col gap-4">
          <h2 id="keys-h" className="font-jura font-bold text-[18px] text-[#F0F2F2]">
            Clés d&apos;API
          </h2>
          <div className="rounded-[12px] bg-[#07131E] border border-white/[0.06] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="font-jura font-bold text-[12.5px] text-[#8896A4]">Clé secrète de test</span>
              <span className="font-mono text-[10.5px] px-1.5 py-0.5 rounded bg-[#DBAE40]/15 text-[#DBAE40]">SANDBOX</span>
            </div>
            <code className="font-mono text-[13px] text-[#ACBAC5] break-all">{shown ? testKey : `kusa_test_${"•".repeat(20)}${seed.slice(-4)}`}</code>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setShown((s) => !s)} className="h-[38px] px-3.5 rounded-[9px] border border-white/15 font-jura font-bold text-[13px] text-[#CED6DB] hover:bg-white/5">
                {shown ? "Masquer" : "Afficher"}
              </button>
              <button type="button" onClick={copy} className="h-[38px] px-3.5 rounded-[9px] bg-gold text-on-gold font-jura font-bold text-[13px]" aria-live="polite">
                {copied ? "Copiée" : "Copier"}
              </button>
            </div>
          </div>
          <div className="rounded-[12px] border border-dashed border-white/15 p-4 flex items-center justify-between gap-3">
            <span>
              <span className="block font-jura font-bold text-[13px] text-[#CED6DB]">Clé de production</span>
              <span className="block font-inter text-[12.5px] text-[#91A0AB]">Disponible après vérification de votre dossier.</span>
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8896A4" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </div>
          <Link href="/developpeurs" className="self-start inline-flex items-center h-[40px] px-4 rounded-full bg-gold text-on-gold font-jura font-bold text-[13.5px]">
            Lire la documentation
          </Link>
        </div>
      </section>

      {/* Webhook */}
      <section aria-labelledby="hook-h" className="rounded-[18px] bg-surface border border-line p-5 sm:p-6 flex flex-col gap-4">
        <div>
          <h2 id="hook-h" className="font-roboto font-bold text-[17px] text-forest">
            Webhook
          </h2>
          <p className="font-inter text-[13.5px] text-slate mt-1">KUSA appelle cette URL à chaque changement de statut, avec une signature HMAC-SHA256.</p>
        </div>
        <form onSubmit={save} noValidate className="flex flex-col gap-2">
          <div className="kfield">
            <label htmlFor="hook-url">URL de votre endpoint</label>
            <input id="hook-url" type="url" inputMode="url" placeholder="https://votre-site.cm/webhook" value={hook} onChange={(e) => setHook(e.target.value)} aria-invalid={hookErr ? true : undefined} aria-describedby={hookErr ? "hook-e" : undefined} />
            {hookErr && <p className="err" id="hook-e">{hookErr}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="h-[44px] px-5 rounded-full bg-brand text-white font-jura font-bold text-[14px] hover:brightness-110">
              Enregistrer
            </button>
            <button
              type="button"
              disabled={!savedHook}
              onClick={() => setSent({ at: new Date().toISOString(), code: 200 })}
              className="h-[44px] px-5 rounded-full border border-line-2 font-jura font-bold text-[14px] text-forest hover:bg-surface-2 disabled:opacity-45 disabled:cursor-not-allowed"
            >
              Envoyer un événement test
            </button>
          </div>
        </form>
        {savedHook && (
          <p className="font-inter text-[13px] text-ink-2 break-all">
            Enregistrée : <code className="font-mono">{savedHook}</code>
          </p>
        )}
        {sent && (
          <p role="status" className="rounded-[12px] bg-ok-bg px-4 py-3 font-inter text-[13.5px] text-ok step-in">
            <code className="font-mono">payment.succeeded</code> envoyé · réponse {sent.code} (simulée en démo)
          </p>
        )}
      </section>

      {/* Request log */}
      <section aria-labelledby="log-h" className="lg:col-span-2 rounded-[18px] bg-surface border border-line overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 pb-3">
          <h2 id="log-h" className="font-roboto font-bold text-[17px] text-forest">
            Journal des requêtes
          </h2>
          <span className="font-inter text-[12.5px] text-slate">Sandbox · mis à jour {fmtDate(now, { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <ul>
          {logs.map((l) => (
            <li key={l.id + l.method} className="grid grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-cols-[64px_minmax(0,1fr)_60px_90px] items-center gap-3 px-5 sm:px-6 py-3 border-t border-line">
              <span className={`font-mono text-[11px] font-medium px-2 py-0.5 rounded-[5px] text-center ${l.method === "POST" ? "bg-warn-bg text-warn-ink" : "bg-mint text-forest"}`}>{l.method}</span>
              <code className="font-mono text-[12.5px] text-ink-2 truncate">{l.path}</code>
              <span className={`font-mono text-[11.5px] px-2 py-0.5 rounded-[5px] text-center ${codeCls(l.code)}`}>{l.code}</span>
              <span className="hidden sm:block font-inter text-[12.5px] text-slate text-right tabular-nums">
                {fmtDate(l.at, { hour: "2-digit", minute: "2-digit" })} · {Math.round(l.ms)} ms
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
