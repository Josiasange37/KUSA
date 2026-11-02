"use client";

import { useState } from "react";
import { CHANNELS, fmtDate, fmtXAF, type Channel, type DayPoint } from "@/lib/demo-data";

const VAR: Record<Channel, string> = {
  orange_money: "var(--color-ch-orange)",
  mtn_momo: "var(--color-ch-mtn)",
  card: "var(--color-ch-card)",
};

const compact = new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 });

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p;
}

/* Stacked daily volume by payment method, 14 days.
   Legend + per-day tooltip + table view, so identity is never colour alone. */
export function VolumeChart({ series }: { series: DayPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const max = niceMax(Math.max(...series.map((d) => d.total)));
  const ticks = [max, max / 2, 0];
  const totals = CHANNELS.map((c) => ({ ...c, sum: series.reduce((s, d) => s + d[c.key], 0) }));
  const shown = hover ?? series.length - 1;
  const d = series[shown];

  return (
    <div className="px-5 sm:px-6 pb-5">
      {/* Legend with values (direct labels) + view switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
          {totals.map((c) => (
            <li key={c.key} className="flex items-center gap-2 font-inter text-[13px] text-ink-2">
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: VAR[c.key] }} aria-hidden="true" />
              {c.label}
              <span className="text-slate tabular-nums">{compact.format(c.sum)}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setTable((t) => !t)}
          aria-pressed={table}
          className="h-[34px] px-3 rounded-[8px] border border-line-2 font-jura font-bold text-[12.5px] text-forest hover:bg-surface-2 transition-colors"
        >
          {table ? "Voir le graphique" : "Voir en tableau"}
        </button>
      </div>

      {table ? (
        <div className="overflow-x-auto -mx-1" tabIndex={0}>
          <table className="w-full min-w-[460px] text-left">
            <caption className="sr-only">Encaissements réussis par jour et par moyen de paiement, 14 derniers jours</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-3 font-jura font-bold text-[12.5px] text-slate">Jour</th>
                {CHANNELS.map((c) => (
                  <th key={c.key} scope="col" className="py-2 px-3 font-jura font-bold text-[12.5px] text-slate text-right">{c.short}</th>
                ))}
                <th scope="col" className="py-2 pl-3 font-jura font-bold text-[12.5px] text-slate text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...series].reverse().map((p) => (
                <tr key={p.day} className="border-b border-line last:border-0">
                  <th scope="row" className="py-2 pr-3 font-inter font-normal text-[13px] text-ink-2 whitespace-nowrap">{fmtDate(p.day, { weekday: "short", day: "numeric", month: "short" })}</th>
                  {CHANNELS.map((c) => (
                    <td key={c.key} className="py-2 px-3 font-inter text-[13px] text-ink-2 text-right tabular-nums">{compact.format(p[c.key])}</td>
                  ))}
                  <td className="py-2 pl-3 font-inter font-medium text-[13px] text-forest text-right tabular-nums">{fmtXAF(p.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          {/* Readout for the focused day (always visible: works without hover on touch) */}
          <div className="flex items-baseline justify-between gap-3 mb-3 min-h-[44px]" aria-live="polite">
            <div>
              <p className="font-jura font-bold text-[12.5px] text-slate">{fmtDate(d.day, { weekday: "long", day: "numeric", month: "long" })}</p>
              <p className="font-roboto font-bold text-[20px] text-forest tabular-nums">{fmtXAF(d.total)}</p>
            </div>
            <ul className="hidden sm:flex gap-4">
              {CHANNELS.map((c) => (
                <li key={c.key} className="font-inter text-[12.5px] text-slate tabular-nums text-right">
                  <span className="block">{c.short}</span>
                  <span className="text-ink-2">{compact.format(d[c.key])}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[200px] sm:h-[220px]">
            {/* recessive grid */}
            {ticks.map((t, i) => (
              <div key={t} className="absolute inset-x-0 flex items-center gap-2" style={{ top: `${(i / (ticks.length - 1)) * 100}%`, transform: "translateY(-50%)" }} aria-hidden="true">
                <span className="w-9 flex-none text-right font-inter text-[11px] text-slate tabular-nums">{compact.format(t)}</span>
                <span className="flex-1 h-px bg-line" />
              </div>
            ))}

            <div className="absolute inset-y-0 left-11 right-0 flex items-end gap-[3px] sm:gap-1.5">
              {series.map((p, i) => {
                const h = (p.total / max) * 100;
                const on = shown === i;
                return (
                  <button
                    key={p.day}
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover(i)}
                    aria-label={`${fmtDate(p.day, { weekday: "long", day: "numeric", month: "long" })} : ${fmtXAF(p.total)}`}
                    className="group relative flex-1 h-full flex items-end justify-center"
                  >
                    <span
                      className={`flex w-full max-w-[34px] flex-col-reverse gap-[2px] rounded-t-[4px] overflow-hidden transition-opacity duration-150 ${hover !== null && !on ? "opacity-45" : "opacity-100"}`}
                      style={{ height: `${h}%` }}
                    >
                      {CHANNELS.map((c) =>
                        p[c.key] > 0 ? <span key={c.key} className="w-full" style={{ height: `${(p[c.key] / p.total) * 100}%`, background: VAR[c.key] }} /> : null
                      )}
                    </span>
                    {on && <span className="absolute -bottom-[7px] w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-[3px] sm:gap-1.5 pl-11 pt-3" aria-hidden="true">
            {series.map((p, i) => (
              <span key={p.day} className={`flex-1 text-center font-inter text-[11px] tabular-nums ${shown === i ? "text-forest font-medium" : "text-slate"} ${i % 2 === 1 && i !== series.length - 1 ? "invisible sm:visible" : ""}`}>
                {fmtDate(p.day, { day: "numeric" })}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
