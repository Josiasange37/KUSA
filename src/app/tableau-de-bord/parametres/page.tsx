import type { Metadata } from "next";
import Link from "next/link";
import { getDashboard } from "@/lib/dashboard";
import { fmtDate } from "@/lib/demo-data";
import { signOut } from "@/app/actions";
import { DemoNote, PageHead, Panel, PanelHead } from "@/components/dashboard/ui";
import { ThemeToggle } from "@/components/kusa/theme";

export const metadata: Metadata = { title: "Paramètres" };

const DOCS = [
  { label: "Registre du commerce (RCCM)", hint: "PDF ou photo lisible" },
  { label: "Pièce d'identité du gérant", hint: "CNI ou passeport, recto verso" },
  { label: "Justificatif de compte de reversement", hint: "Orange Money, MTN MoMo ou RIB" },
];

export default async function SettingsPage() {
  const { user } = await getDashboard();
  const rows: [string, string][] = [
    ["Nom", user.name],
    ["Activité", user.business],
    ["Type", user.type],
    ["Téléphone", user.phone ? `+237 ${user.phone}` : "—"],
    ["Email", user.email],
    ["Membre depuis", fmtDate(user.createdAt, { day: "numeric", month: "long", year: "numeric" })],
  ];

  return (
    <>
      <PageHead title="Paramètres" sub="Votre activité, vos documents et l'affichage." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel aria-labelledby="prof-h">
          <PanelHead id="prof-h" title="Profil de l'activité" />
          <dl className="px-5 sm:px-6 pb-5">
            {rows.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-3 ${i ? "border-t border-line" : ""}`}>
                <dt className="font-jura font-bold text-[13.5px] text-slate">{k}</dt>
                <dd className="font-inter text-[14.5px] text-forest break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel aria-labelledby="docs-h">
          <PanelHead id="docs-h" title="Vérification de l'activité" sub="Requise pour activer les paiements réels" />
          <ul className="px-5 sm:px-6 flex flex-col gap-2.5">
            {DOCS.map((d) => (
              <li key={d.label} className="flex items-center justify-between gap-3 rounded-[12px] border border-dashed border-line-2 px-4 py-3">
                <span className="min-w-0">
                  <span className="block font-inter font-medium text-[14px] text-forest">{d.label}</span>
                  <span className="block font-inter text-[12.5px] text-slate">{d.hint}</span>
                </span>
                <span className="flex-none font-jura font-bold text-[12px] px-2.5 py-1 rounded-full bg-surface-2 text-slate">Bientôt</span>
              </li>
            ))}
          </ul>
          <div className="px-5 sm:px-6 py-5">
            <DemoNote>L&apos;envoi des documents ouvrira avec la version finale de l&apos;espace marchand.</DemoNote>
          </div>
        </Panel>

        <Panel aria-labelledby="app-h">
          <PanelHead id="app-h" title="Affichage" />
          <div className="px-5 sm:px-6 pb-5 flex items-center justify-between gap-4">
            <p className="font-inter text-[14.5px] text-ink-2">Thème clair ou sombre</p>
            <ThemeToggle />
          </div>
        </Panel>

        <Panel aria-labelledby="sess-h2">
          <PanelHead id="sess-h2" title="Session de démonstration" />
          <div className="px-5 sm:px-6 pb-5 flex flex-col gap-3">
            <p className="font-inter text-[14px] leading-[155%] text-ink-2">
              Vos informations restent dans ce navigateur, le temps de la démo. Rien n&apos;est enregistré sur nos serveurs.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <form action={signOut}>
                <button type="submit" className="h-[44px] px-5 rounded-full border border-line-2 font-jura font-bold text-[14px] text-err-ink hover:bg-surface-2">
                  Quitter la démo
                </button>
              </form>
              <Link href="/contact?objet=Ouvrir%20un%20compte" className="inline-flex items-center h-[44px] px-5 rounded-full bg-brand text-white font-jura font-bold text-[14px]">
                Être prévenu du lancement
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
