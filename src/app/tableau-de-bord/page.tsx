import type { Metadata } from "next";
import Link from "next/link";
import { getDashboard } from "@/lib/dashboard";
import { CHANNELS, SOURCES, fmtDate, fmtPct, fmtTime, fmtXAF, hourIn, plural } from "@/lib/demo-data";
import { CHANNEL_VAR, ChannelTag, DemoNote, Kpi, PageHead, Panel, PanelHead, StatusPill, TextLink } from "@/components/dashboard/ui";
import { VolumeChart } from "@/components/dashboard/VolumeChart";

export const metadata: Metadata = { title: "Vue d'ensemble" };

const QUICK = [
  { href: "/tableau-de-bord/encaisser", label: "Encaisser en boutique", icon: <path d="M12 5v14M5 12h14" /> },
  { href: "/tableau-de-bord/liens?nouveau=1", label: "Créer un lien", icon: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /> },
  { href: "/tableau-de-bord/developpeurs", label: "Clés d'API", icon: <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" /> },
];

export default async function Overview({ searchParams }: { searchParams: Promise<{ bienvenue?: string }> }) {
  const { user, data } = await getDashboard();
  const { kpi } = data;
  const welcome = (await searchParams).bienvenue === "1";
  const first = user.name.split(" ")[0];
  const trend = (a: number, b: number) => (b > 0 ? (a - b) / b : null);
  const splitTotal = data.split.reduce((s, c) => s + c.amount, 0) || 1;
  const hour = hourIn(data.now);

  const steps = [
    { label: "Compte créé", done: true },
    { label: "Activité renseignée", done: user.business !== "Votre activité" },
    { label: "Pièces justificatives (RCCM, CNI)", done: false, href: "/tableau-de-bord/parametres" },
    { label: "Premier encaissement test", done: false, href: "/tableau-de-bord/encaisser" },
    { label: "Vérification par l'équipe KUSA", done: false },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <>
      <PageHead
        title={`${hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir"}, ${first}`}
        sub={<>{fmtDate(data.now, { weekday: "long", day: "numeric", month: "long" })} · {user.business}</>}
      />

      {welcome && (
        <div className="mb-6 rounded-[18px] dev-band overflow-hidden p-5 sm:p-6 step-in">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="pop flex-none w-11 h-11 rounded-full bg-[#1F8A5B] flex items-center justify-center">
                <svg width="20" height="16" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                  <path d="M1 3.5L3.33333 5.5L8 1" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="font-junge text-[22px] sm:text-[26px] leading-tight text-[#F3F4F1]">Bienvenue chez KUSA, {first}.</p>
                <p className="font-inter text-[14px] text-[#A9BDBA] mt-1">Votre espace marchand est prêt. Faites un premier encaissement test pour découvrir le parcours.</p>
              </div>
            </div>
            <Link href="/tableau-de-bord/encaisser" className="self-start sm:self-auto inline-flex items-center h-[44px] px-5 rounded-full bg-gold text-on-gold font-jura font-bold text-[14px] whitespace-nowrap">
              Faire un test
            </Link>
          </div>
        </div>
      )}

      {/* Quick actions: thumb-friendly on phones */}
      <ul className="snap-row flex gap-2.5 overflow-x-auto -mx-4 px-4 mb-5 lg:hidden">
        {QUICK.map((q) => (
          <li key={q.href} className="flex-none">
            <Link href={q.href} className="inline-flex items-center gap-2 h-[44px] pl-3 pr-4 rounded-full bg-surface border border-line-2 font-jura font-bold text-[14px] text-forest active:scale-[0.97] transition-transform">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {q.icon}
              </svg>
              {q.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
        <Kpi label="Aujourd'hui" value={fmtXAF(kpi.today)} trend={trend(kpi.today, kpi.yesterdaySoFar)} foot={`${plural(kpi.todayCount, "paiement")} · vs hier à la même heure`} />
        <Kpi label="7 derniers jours" value={fmtXAF(kpi.week)} trend={trend(kpi.week, kpi.weekPrev)} foot="vs 7 jours précédents" />
        <Kpi label="Taux de réussite" value={fmtPct(kpi.successRate)} foot="sur 30 jours" />
        <Kpi label="Panier moyen" value={fmtXAF(kpi.avgTicket)} foot={`${plural(kpi.monthCount, "paiement")} en 30 j`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-5">
        {/* Volume chart */}
        <Panel aria-labelledby="vol-h">
          <PanelHead id="vol-h" title="Encaissements réussis" sub="14 derniers jours, par moyen de paiement" action={<TextLink href="/tableau-de-bord/transactions">Détail</TextLink>} />
          <VolumeChart series={data.series} />
        </Panel>

        <div className="flex flex-col gap-5">
          {/* Balance & next payout */}
          <section aria-labelledby="bal-h" className="rounded-[18px] dev-band overflow-hidden p-5 sm:p-6">
            <div className="relative z-10 flex flex-col gap-3">
              <h2 id="bal-h" className="font-jura font-bold text-[14px] text-[#A1AFBA]">
                Solde à reverser
              </h2>
              <p className="font-roboto font-bold text-[30px] leading-none text-[#F3F4F1] tabular-nums">{fmtXAF(data.balance)}</p>
              {data.nextPayout && (
                <p className="font-inter text-[13.5px] leading-[150%] text-[#A9BDBA]">
                  Prochain reversement {fmtDate(data.nextPayout.at, { weekday: "long", hour: "2-digit", minute: "2-digit" })} vers {data.nextPayout.destination}.
                </p>
              )}
              <Link href="/tableau-de-bord/reversements" className="self-start mt-1 inline-flex items-center h-[38px] px-4 rounded-full bg-gold text-on-gold font-jura font-bold text-[13.5px]">
                Voir les reversements
              </Link>
            </div>
          </section>

          {/* Channel split */}
          <Panel aria-labelledby="split-h">
            <PanelHead id="split-h" title="Moyens de paiement" sub="Part du montant encaissé, 30 jours" />
            <ul className="px-5 sm:px-6 pb-5 flex flex-col gap-3.5">
              {data.split.map((c) => {
                const share = c.amount / splitTotal;
                return (
                  <li key={c.key} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <ChannelTag channel={c.key} label={c.label} />
                      <span className="font-inter text-[13px] text-slate tabular-nums">
                        <span className="text-forest font-medium">{fmtPct(share)}</span> · {c.count}
                      </span>
                    </div>
                    <span className="h-2 rounded-full bg-surface-2 overflow-hidden" aria-hidden="true">
                      <span className="block h-full rounded-full" style={{ width: `${share * 100}%`, background: CHANNEL_VAR[c.key] }} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>

        {/* Recent transactions */}
        <Panel aria-labelledby="recent-h">
          <PanelHead id="recent-h" title="Derniers paiements" sub={kpi.pending ? `${plural(kpi.pending, "paiement")} en attente de validation` : "Tout est à jour"} action={<TextLink href="/tableau-de-bord/transactions">Tout voir</TextLink>} />
          <ul className="px-2 sm:px-3 pb-3">
            {data.txs.slice(0, 7).map((t) => (
              <li key={t.id}>
                <Link href={`/tableau-de-bord/transactions?id=${t.id}`} className="flex items-center gap-3 px-3 py-3 rounded-[12px] hover:bg-surface-2 transition-colors">
                  <span className="w-10 h-10 flex-none rounded-[11px] flex items-center justify-center bg-surface-2" aria-hidden="true">
                    <span className="w-3 h-3 rounded-[4px]" style={{ background: CHANNEL_VAR[t.channel] }} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-inter font-medium text-[14.5px] text-forest truncate">{t.label}</span>
                    <span className="block font-inter text-[12.5px] text-slate truncate">
                      {fmtTime(t.at)} · {CHANNELS.find((c) => c.key === t.channel)?.short} · {SOURCES[t.source]}
                    </span>
                  </span>
                  <span className="flex flex-col items-end gap-1">
                    <span className={`font-roboto font-bold text-[14.5px] tabular-nums ${t.status === "failed" ? "text-slate line-through" : "text-forest"}`}>{fmtXAF(t.amount)}</span>
                    {t.status !== "success" && <StatusPill status={t.status} />}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Activation (Jèko-style onboarding to real payments) */}
        <Panel aria-labelledby="act-h" className="self-start">
          <PanelHead id="act-h" title="Activer les paiements réels" sub={`${doneCount} étapes sur ${steps.length}`} />
          <div className="px-5 sm:px-6">
            <span className="block h-1.5 rounded-full bg-surface-2 overflow-hidden" aria-hidden="true">
              <span className="block h-full rounded-full bg-gold" style={{ width: `${(doneCount / steps.length) * 100}%` }} />
            </span>
          </div>
          <ol className="px-3 sm:px-4 py-3">
            {steps.map((s) => {
              const body = (
                <>
                  <span className={`w-6 h-6 flex-none rounded-full flex items-center justify-center ${s.done ? "bg-ok text-white" : "border-2 border-line-2"}`} aria-hidden="true">
                    {s.done && (
                      <svg width="11" height="9" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.33333 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className={`flex-1 font-inter text-[14px] ${s.done ? "text-slate line-through decoration-line-2" : "text-forest"}`}>{s.label}</span>
                  <span className="sr-only">{s.done ? "terminé" : "à faire"}</span>
                </>
              );
              return (
                <li key={s.label}>
                  {s.href && !s.done ? (
                    <Link href={s.href} className="flex items-center gap-3 min-h-[44px] px-2 rounded-[10px] hover:bg-surface-2 transition-colors">
                      {body}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-slate">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 min-h-[44px] px-2">{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="px-5 sm:px-6 pb-5">
            <DemoNote>La vérification et l&apos;envoi des pièces arrivent avec la version finale.</DemoNote>
          </div>
        </Panel>
      </div>
    </>
  );
}
