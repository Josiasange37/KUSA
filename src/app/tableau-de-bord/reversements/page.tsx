import type { Metadata } from "next";
import { getDashboard } from "@/lib/dashboard";
import { fmtDate, fmtXAF } from "@/lib/demo-data";
import { DemoNote, PageHead, Panel, PanelHead } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Reversements" };

export default async function PayoutsPage() {
  const { data } = await getDashboard();
  const paid = data.payouts.filter((p) => p.status === "paid");
  const paidTotal = paid.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHead title="Reversements" sub="Vos encaissements réussis, reversés chaque matin sur votre compte." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <section aria-labelledby="po-bal" className="md:col-span-2 rounded-[18px] dev-band overflow-hidden p-5 sm:p-6">
          <div className="relative z-10 flex flex-col gap-2">
            <h2 id="po-bal" className="font-jura font-bold text-[14px] text-[#A1AFBA]">
              Solde à reverser
            </h2>
            <p className="font-roboto font-bold text-[34px] leading-none text-[#F3F4F1] tabular-nums">{fmtXAF(data.balance)}</p>
            {data.nextPayout && (
              <p className="font-inter text-[14px] text-[#A9BDBA]">
                Prochain reversement {fmtDate(data.nextPayout.at, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                <br className="sm:hidden" /> vers {data.nextPayout.destination}
              </p>
            )}
          </div>
        </section>
        <div className="rounded-[18px] bg-surface border border-line p-5 sm:p-6 flex flex-col gap-1.5">
          <p className="font-jura font-bold text-[13.5px] text-slate">Reversé sur 14 jours</p>
          <p className="font-roboto font-bold text-[26px] text-forest tabular-nums">{fmtXAF(paidTotal)}</p>
          <p className="font-inter text-[12.5px] text-slate">{paid.length} reversements</p>
        </div>
      </div>

      <Panel aria-labelledby="po-h">
        <PanelHead id="po-h" title="Historique" sub="Un reversement par journée d'encaissement" />
        <ul>
          {data.payouts.map((p) => (
            <li key={p.id} className="flex items-center gap-3 px-5 sm:px-6 py-3.5 border-t border-line">
              <span className={`w-9 h-9 flex-none rounded-[10px] flex items-center justify-center ${p.status === "paid" ? "bg-ok-bg text-ok" : "bg-wait-bg text-wait"}`} aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {p.status === "paid" ? <path d="M5 12.5 10 17l9-10" /> : <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2" /></>}
                </svg>
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-inter font-medium text-[14.5px] text-forest first-letter:uppercase">
                  {fmtDate(p.at, { weekday: "long", day: "numeric", month: "short" })}
                </span>
                <span className="block font-inter text-[12.5px] text-slate truncate">
                  {p.status === "paid" ? "Versé" : "Programmé"} à {fmtDate(p.at, { hour: "2-digit", minute: "2-digit" })} · {p.count > 1 ? `${p.count} paiements` : "1 paiement"} · {p.destination}
                </span>
              </span>
              <span className="font-roboto font-bold text-[15px] text-forest tabular-nums">{fmtXAF(p.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="px-5 sm:px-6 py-4 border-t border-line">
          <DemoNote>Rythme et compte de reversement à confirmer à l&apos;ouverture du compte. Montants calculés sur les paiements réussis de la démo.</DemoNote>
        </div>
      </Panel>
    </>
  );
}
