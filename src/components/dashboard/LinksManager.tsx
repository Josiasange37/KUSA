"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fmtDay, fmtXAF, type PayLink } from "@/lib/demo-data";

export function LinksManager({ initial, business }: { initial: PayLink[]; business: string }) {
  const params = useSearchParams();
  const [links, setLinks] = useState(initial);
  const [creating, setCreating] = useState(params.get("nouveau") === "1");
  const [label, setLabel] = useState("");
  const [fixed, setFixed] = useState(true);
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState<{ label?: string; amount?: string }>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string | null>(null);
  const labelRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (creating) labelRef.current?.focus();
  }, [creating]);

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(amount.replace(/\D/g, ""));
    const next: typeof err = {};
    if (label.trim().length < 3) next.label = "Donnez un motif d'au moins 3 caractères.";
    if (fixed && n < 100) next.amount = "Indiquez un montant d'au moins 100 XAF.";
    setErr(next);
    if (Object.keys(next).length) return;
    const id = `plink_${Date.now().toString(36).toUpperCase().slice(-5)}`;
    const link: PayLink = {
      id,
      label: label.trim(),
      amount: fixed ? n : null,
      url: `https://pay.kusa.africa/l/${id.slice(-5)}`,
      status: "active",
      paidCount: 0,
      collected: 0,
      createdAt: new Date().toISOString(),
    };
    setLinks((l) => [link, ...l]);
    setFresh(id);
    setCreating(false);
    setLabel("");
    setAmount("");
  };

  const copy = async (l: PayLink) => {
    try {
      await navigator.clipboard.writeText(l.url);
      setCopied(l.id);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  const wa = (l: PayLink) =>
    `https://wa.me/?text=${encodeURIComponent(`${business} vous envoie un lien de paiement${l.amount ? ` de ${fmtXAF(l.amount)}` : ""} : ${l.label}\n${l.url}`)}`;

  return (
    <div className="flex flex-col gap-5">
      {!creating ? (
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="self-start inline-flex items-center gap-2 h-[48px] px-5 rounded-full bg-brand text-white font-jura font-bold text-[15px] shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau lien de paiement
        </button>
      ) : (
        <form onSubmit={create} noValidate className="rounded-[18px] bg-surface border border-line p-5 sm:p-6 flex flex-col gap-4 step-in" aria-labelledby="new-link-h">
          <h2 id="new-link-h" className="font-roboto font-bold text-[17px] text-forest">
            Nouveau lien
          </h2>
          <div className="kfield">
            <label htmlFor="ln-label">Motif du paiement</label>
            <input
              ref={labelRef}
              id="ln-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Ex. Acompte réservation, Commande n° 12"
              aria-invalid={err.label ? true : undefined}
              aria-describedby={err.label ? "ln-label-e" : undefined}
            />
            {err.label && <p className="err" id="ln-label-e">{err.label}</p>}
          </div>
          <div role="radiogroup" aria-label="Type de montant" className="grid grid-cols-2 gap-1 p-1 rounded-[14px] bg-surface-2 max-w-[420px]">
            {([
              [true, "Montant fixe"],
              [false, "Montant libre"],
            ] as [boolean, string][]).map(([v, l]) => (
              <button key={l} type="button" role="radio" aria-checked={fixed === v} onClick={() => setFixed(v)} className={`h-[42px] rounded-[10px] font-jura font-bold text-[14px] transition-all ${fixed === v ? "bg-surface text-forest shadow-xs" : "text-slate"}`}>
                {l}
              </button>
            ))}
          </div>
          {fixed ? (
            <div className="kfield max-w-[320px]">
              <label htmlFor="ln-amount">Montant (XAF)</label>
              <input
                id="ln-amount"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d ]/g, ""))}
                placeholder="15 000"
                aria-invalid={err.amount ? true : undefined}
                aria-describedby={err.amount ? "ln-amount-e" : undefined}
              />
              {err.amount && <p className="err" id="ln-amount-e">{err.amount}</p>}
            </div>
          ) : (
            <p className="font-inter text-[14px] text-slate">Le client saisira lui-même le montant à payer.</p>
          )}
          <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-1">
            <button type="button" onClick={() => { setCreating(false); setErr({}); }} className="h-[48px] px-5 rounded-full border border-line-2 font-jura font-bold text-[15px] text-forest hover:bg-surface-2">
              Annuler
            </button>
            <button type="submit" className="h-[48px] px-6 rounded-full bg-brand text-white font-jura font-bold text-[15px] hover:brightness-110 active:scale-[0.98] transition-all">
              Créer le lien
            </button>
          </div>
        </form>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((l) => (
          <li key={l.id} className={`rounded-[18px] bg-surface border p-5 flex flex-col gap-4 ${fresh === l.id ? "border-gold step-in" : "border-line"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-roboto font-bold text-[16px] text-forest truncate">{l.label}</p>
                <p className="font-inter text-[13px] text-slate">
                  {l.amount ? fmtXAF(l.amount) : "Montant libre"} · créé le {fmtDay(l.createdAt)}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={l.status === "active"}
                aria-label={`Lien ${l.status === "active" ? "actif" : "désactivé"} : ${l.label}`}
                onClick={() => setLinks((all) => all.map((x) => (x.id === l.id ? { ...x, status: x.status === "active" ? "disabled" : "active" } : x)))}
                className="flex-none flex items-center gap-2 h-[36px] font-jura font-bold text-[12.5px] text-slate"
              >
                {l.status === "active" ? "Actif" : "Désactivé"}
                <span className={`relative w-[38px] h-[22px] rounded-full transition-colors ${l.status === "active" ? "bg-ok" : "bg-line-2"}`}>
                  <span className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-all ${l.status === "active" ? "left-[19px]" : "left-[3px]"}`} />
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 rounded-[12px] bg-surface-2 pl-3 pr-1 h-[46px]">
              <code className="flex-1 min-w-0 truncate font-mono text-[12.5px] text-ink-2">{l.url}</code>
              <button type="button" onClick={() => copy(l)} className="h-[38px] px-3 rounded-[9px] bg-surface border border-line-2 font-jura font-bold text-[13px] text-forest" aria-live="polite">
                {copied === l.id ? "Copié" : "Copier"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="font-inter text-[13px] text-slate tabular-nums">
                <span className="text-forest font-medium">{l.paidCount}</span> paiements · <span className="text-forest font-medium">{fmtXAF(l.collected)}</span>
              </p>
              <a
                href={l.status === "active" ? wa(l) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={l.status !== "active"}
                className={`inline-flex items-center gap-2 h-[40px] px-4 rounded-full font-jura font-bold text-[13.5px] ${l.status === "active" ? "bg-[#1F8A5B] text-white" : "bg-surface-2 text-slate pointer-events-none"}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.4Z" />
                </svg>
                Envoyer
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
