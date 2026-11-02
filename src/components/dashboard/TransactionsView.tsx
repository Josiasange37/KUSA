"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CHANNELS, SOURCES, dayKey, fmtDate, fmtTime, fmtXAF, type Channel, type Tx, type TxStatus } from "@/lib/demo-data";
import { CHANNEL_VAR, StatusPill } from "@/components/dashboard/ui";

const STATUS_TABS: { key: TxStatus | "all"; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "success", label: "Réussis" },
  { key: "pending", label: "En attente" },
  { key: "failed", label: "Échoués" },
];
const PERIODS = [
  { key: "1", label: "Aujourd'hui" },
  { key: "7", label: "7 jours" },
  { key: "30", label: "30 jours" },
];
const chLabel = (c: Channel) => CHANNELS.find((x) => x.key === c)?.label ?? c;

export function TransactionsView({ txs, now }: { txs: Tx[]; now: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<TxStatus | "all">("all");
  const [channel, setChannel] = useState<Channel | "all">("all");
  const [period, setPeriod] = useState("30");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(40);
  const openId = params.get("id");
  const open = txs.find((t) => t.id === openId) ?? null;

  const filtered = useMemo(() => {
    const nowMs = new Date(now).getTime();
    const today = dayKey(new Date(now));
    const needle = q.trim().toLowerCase();
    return txs.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (channel !== "all" && t.channel !== channel) return false;
      if (period === "1" && dayKey(new Date(t.at)) !== today) return false;
      if (period !== "1" && nowMs - new Date(t.at).getTime() > Number(period) * 86_400_000) return false;
      if (needle && !`${t.reference} ${t.label} ${t.customer} ${t.amount}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [txs, status, channel, period, q, now]);

  useEffect(() => setLimit(40), [status, channel, period, q]);

  const total = filtered.filter((t) => t.status === "success").reduce((s, t) => s + t.amount, 0);
  const visible = filtered.slice(0, limit);
  const groups = visible.reduce<{ day: string; items: Tx[] }[]>((acc, t) => {
    const k = dayKey(new Date(t.at));
    const g = acc[acc.length - 1];
    if (g && g.day === k) g.items.push(t);
    else acc.push({ day: k, items: [t] });
    return acc;
  }, []);

  const setOpen = (id: string | null) => {
    const sp = new URLSearchParams(params.toString());
    if (id) sp.set("id", id);
    else sp.delete("id");
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  const exportCsv = () => {
    const head = ["id", "reference", "date", "montant_xaf", "moyen", "statut", "canal", "libelle", "client"];
    const rows = filtered.map((t) => [t.id, t.reference, t.at, t.amount, t.channel, t.status, t.source, t.label, t.customer]);
    const csv = [head, ...rows].map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `kusa-transactions-${dayKey(new Date(now))}.csv` });
    a.click();
    URL.revokeObjectURL(url);
  };

  const chip = (on: boolean) =>
    `inline-flex items-center h-[40px] px-4 rounded-full font-jura font-bold text-[14px] whitespace-nowrap transition-colors ${
      on ? "bg-brand text-white" : "bg-surface border border-line-2 text-forest hover:bg-surface-2"
    }`;

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="snap-row flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0" role="group" aria-label="Statut">
          {STATUS_TABS.map((s) => (
            <button key={s.key} type="button" aria-pressed={status === s.key} onClick={() => setStatus(s.key)} className={chip(status === s.key)}>
              {s.label}
              <span className={`ml-2 text-[12px] tabular-nums ${status === s.key ? "text-white/75" : "text-slate"}`}>
                {s.key === "all" ? txs.length : txs.filter((t) => t.status === s.key).length}
              </span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-[minmax(0,1fr)_180px_180px_auto] gap-2.5">
          <label className="col-span-2 sm:col-span-1 relative">
            <span className="sr-only">Rechercher</span>
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Référence, libellé, montant…"
              className="w-full h-[44px] pl-10 pr-3 rounded-[12px] bg-surface border border-line-2 font-inter text-[15px] text-forest placeholder:text-slate focus:outline-none focus:border-gold"
            />
          </label>
          <label>
            <span className="sr-only">Moyen de paiement</span>
            <select value={channel} onChange={(e) => setChannel(e.target.value as Channel | "all")} className="w-full h-[44px] px-3 rounded-[12px] bg-surface border border-line-2 font-jura font-bold text-[14px] text-forest focus:outline-none focus:border-gold">
              <option value="all">Tous les moyens</option>
              {CHANNELS.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Période</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full h-[44px] px-3 rounded-[12px] bg-surface border border-line-2 font-jura font-bold text-[14px] text-forest focus:outline-none focus:border-gold">
              {PERIODS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={exportCsv} className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 h-[44px] px-4 rounded-[12px] bg-surface border border-line-2 font-jura font-bold text-[14px] text-forest hover:bg-surface-2 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
            </svg>
            Exporter (CSV)
          </button>
        </div>
        <p className="font-inter text-[13.5px] text-slate" aria-live="polite">
          <span className="text-forest font-medium tabular-nums">{filtered.length}</span> paiements · <span className="text-forest font-medium tabular-nums">{fmtXAF(total)}</span> encaissés
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[18px] bg-surface border border-line px-6 py-14 text-center flex flex-col items-center gap-3">
          <p className="font-roboto font-bold text-[17px] text-forest">Aucun paiement ne correspond</p>
          <p className="font-inter text-[14px] text-slate max-w-[340px]">Élargissez la période ou retirez un filtre pour revoir vos encaissements.</p>
          <button type="button" onClick={() => { setStatus("all"); setChannel("all"); setPeriod("30"); setQ(""); }} className={chip(false)}>
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {groups.map((g) => {
            const dayTotal = g.items.filter((t) => t.status === "success").reduce((s, t) => s + t.amount, 0);
            return (
              <section key={g.day} aria-label={fmtDate(`${g.day}T12:00:00+01:00`, { weekday: "long", day: "numeric", month: "long" })} className="rounded-[18px] bg-surface border border-line overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-surface-2">
                  <h2 className="font-jura font-bold text-[14px] text-forest first-letter:uppercase">{fmtDate(`${g.day}T12:00:00+01:00`, { weekday: "long", day: "numeric", month: "long" })}</h2>
                  <span className="font-inter text-[13px] text-slate tabular-nums">{fmtXAF(dayTotal)}</span>
                </div>
                <ul>
                  {g.items.map((t) => (
                    <li key={t.id} className="border-t border-line first:border-0">
                      <button type="button" onClick={() => setOpen(t.id)} className="w-full text-left grid grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 hover:bg-surface-2 transition-colors">
                        <span className="w-9 h-9 rounded-[10px] bg-surface-2 flex items-center justify-center" aria-hidden="true">
                          <span className="w-3 h-3 rounded-[4px]" style={{ background: CHANNEL_VAR[t.channel] }} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-inter font-medium text-[14.5px] text-forest truncate">{t.label}</span>
                          <span className="block font-inter text-[12.5px] text-slate truncate">
                            {fmtTime(t.at)} · <span className="sm:hidden">{CHANNELS.find((c) => c.key === t.channel)?.short} · </span>
                            {t.reference}
                          </span>
                        </span>
                        <span className="hidden sm:block font-inter text-[13.5px] text-ink-2 truncate">{chLabel(t.channel)}</span>
                        <span className="hidden sm:block font-inter text-[13px] text-slate truncate">{t.customer}</span>
                        <span className="flex flex-col items-end gap-1">
                          <span className={`font-roboto font-bold text-[14.5px] tabular-nums ${t.status === "failed" ? "text-slate line-through" : "text-forest"}`}>{fmtXAF(t.amount)}</span>
                          <StatusPill status={t.status} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {filtered.length > limit && (
            <button type="button" onClick={() => setLimit((l) => l + 40)} className="self-center inline-flex items-center h-[46px] px-6 rounded-full bg-surface border border-line-2 font-jura font-bold text-[14.5px] text-forest hover:bg-surface-2 transition-colors">
              Afficher plus ({filtered.length - limit} restants)
            </button>
          )}
        </div>
      )}

      {open && <TxDetail tx={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function TxDetail({ tx, onClose }: { tx: Tx; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const created = new Date(tx.at).getTime();
  const steps = [
    { label: "Paiement créé", at: new Date(created - 40_000).toISOString(), done: true },
    { label: tx.channel === "card" ? "Client redirigé vers la page carte" : "Demande envoyée sur le téléphone du client", at: new Date(created - 30_000).toISOString(), done: true },
    {
      label: tx.status === "success" ? "Validé par le client" : tx.status === "failed" ? "Refusé ou expiré" : "En attente de validation",
      at: tx.at,
      done: tx.status !== "pending",
    },
    { label: tx.status === "success" ? "Webhook payment.succeeded envoyé" : tx.status === "failed" ? "Webhook payment.failed envoyé" : "Webhook à venir", at: new Date(created + 1200).toISOString(), done: tx.status !== "pending" },
  ];
  const rows: [string, React.ReactNode][] = [
    ["Montant", fmtXAF(tx.amount)],
    ["Moyen", chLabel(tx.channel)],
    ["Client", tx.customer],
    ["Canal", SOURCES[tx.source]],
    ["Référence", <code key="r" className="font-mono text-[13px]">{tx.reference}</code>],
    ["Identifiant", <code key="i" className="font-mono text-[12.5px] break-all">{tx.id}</code>],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end" role="dialog" aria-modal="true" aria-labelledby="tx-h">
      <button type="button" aria-label="Fermer" className="absolute inset-0 bg-black/40 menu-in" onClick={onClose} />
      <div className="relative w-full sm:w-[440px] max-h-[88svh] sm:max-h-none overflow-y-auto bg-cream rounded-t-[24px] sm:rounded-none sm:border-l border-line sheet-up sm:animate-none" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="sticky top-0 bg-cream/95 backdrop-blur-sm px-5 pt-3 pb-3 border-b border-line flex items-center justify-between gap-3">
          <span className="sm:hidden absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1 rounded-full bg-line-2" aria-hidden="true" />
          <h2 id="tx-h" className="pt-3 sm:pt-0 font-roboto font-bold text-[17px] text-forest truncate">
            {tx.label}
          </h2>
          <button type="button" onClick={onClose} aria-label="Fermer le détail" className="mt-2 sm:mt-0 w-[44px] h-[44px] -mr-2 rounded-[10px] flex items-center justify-center text-forest hover:bg-surface-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <p className="font-roboto font-bold text-[30px] text-forest tabular-nums">{fmtXAF(tx.amount)}</p>
            <StatusPill status={tx.status} />
          </div>
          <p className="font-inter text-[13.5px] text-slate -mt-3 first-letter:uppercase">{fmtDate(tx.at, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</p>

          <dl className="rounded-[14px] bg-surface border border-line">
            {rows.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[110px_minmax(0,1fr)] gap-3 px-4 py-3 ${i ? "border-t border-line" : ""}`}>
                <dt className="font-jura font-bold text-[13px] text-slate">{k}</dt>
                <dd className="font-inter text-[14px] text-forest min-w-0">{v}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h3 className="font-jura font-bold text-[14px] text-forest mb-3">Chronologie</h3>
            <ol className="flex flex-col">
              {steps.map((s, i) => (
                <li key={s.label} className="relative flex gap-3 pb-4 last:pb-0">
                  {i < steps.length - 1 && <span className="absolute left-[9px] top-5 bottom-0 w-px bg-line-2" aria-hidden="true" />}
                  <span className={`relative mt-0.5 w-[19px] h-[19px] flex-none rounded-full border-2 ${s.done ? "bg-ok border-ok" : "bg-surface border-line-2"}`} aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className={`block font-inter text-[14px] ${s.done ? "text-forest" : "text-slate"}`}>{s.label}</span>
                    {s.done && <span className="block font-inter text-[12.5px] text-slate tabular-nums">{fmtDate(s.at, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="font-inter text-[12.5px] leading-[150%] text-slate">
            Données de démonstration. Dans la version finale, ce détail reprendra exactement la réponse de <code className="font-mono">GET /v1/payments/{"{id}"}</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
