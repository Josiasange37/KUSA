import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase";
import { signOut } from "@/app/actions";
import { NewPasswordForm } from "@/components/kusa/forms";
import { Arrow, Label } from "@/components/kusa/home";
import { SOLUTIONS } from "@/lib/content";

export const metadata: Metadata = { title: "Mon espace", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ "nouveau-mot-de-passe"?: string }>;
}) {
  const user = await getUser();
  if (!user) redirect("/connexion?suite=/tableau-de-bord");
  const sp = await searchParams;
  const meta = (user.user_metadata ?? {}) as Record<string, string>;
  const first = (meta.full_name ?? "").split(" ")[0];

  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden">
        <div className="hidden md:block absolute top-0 right-0 bottom-0 w-[38%] woven pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 py-12 sm:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Label>Mon espace</Label>
            <h1 className="font-junge text-[34px] sm:text-[48px] leading-[110%] text-forest">Bonjour{first ? `, ${first}` : ""}</h1>
            <p className="font-jura font-bold text-[16px] text-slate">{meta.business_name ?? "Votre activité"}</p>
          </div>
          <form action={signOut} className="md:bg-surface/90 md:p-2 md:rounded-full">
            <button type="submit" className="inline-flex items-center h-[44px] px-5 rounded-full bg-surface border border-line-2 text-forest font-jura font-bold text-[14px] transition-all hover:bg-surface-2 active:scale-95">
              Se déconnecter
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 pb-16 sm:pb-24 flex flex-col gap-5">
        {sp["nouveau-mot-de-passe"] === "1" && (
          <section aria-labelledby="pw-h" className="bg-surface rounded-[16px] border border-line p-6 sm:p-8">
            <h2 id="pw-h" className="font-roboto font-bold text-[18px] text-forest mb-5">
              Choisir un nouveau mot de passe
            </h2>
            <NewPasswordForm />
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">
          <section aria-labelledby="dossier-h" className="bg-surface rounded-[16px] border border-line p-6 sm:p-8 shadow-[0px_8px_18px_rgba(21,42,32,0.07)]">
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <h2 id="dossier-h" className="font-roboto font-bold text-[18px] text-forest">
                Votre dossier
              </h2>
              <span className="inline-flex items-center gap-2 h-[26px] px-3 rounded-full bg-warn-bg font-inter font-medium text-[12px] text-warn-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                En cours de vérification
              </span>
            </div>
            <dl className="flex flex-col">
              {[
                ["Activité", meta.business_name],
                ["Type", meta.business_type],
                ["Téléphone", meta.phone],
                ["Email", user.email],
              ].map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-[110px_1fr] gap-4 py-3 ${i ? "border-t border-line" : ""}`}>
                  <dt className="font-jura font-bold text-[14px] text-slate">{k}</dt>
                  <dd className="font-inter text-[15px] text-navy break-words">{v || "—"}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-inter text-[14px] leading-[155%] text-ink-2">
              L&apos;équipe KUSA vérifie votre activité avant d&apos;activer les paiements réels. En attendant, préparez votre
              intégration en sandbox.
            </p>
          </section>

          <section aria-labelledby="keys-h" className="dev-band rounded-[16px] overflow-hidden p-6 sm:p-8">
            <div className="relative z-10 flex flex-col gap-4 h-full">
              <h2 id="keys-h" className="font-jura font-bold text-[20px] text-[#F0F2F2]">
                Clés d&apos;API
              </h2>
              <div className="rounded-[12px] bg-[#07131E] border border-white/[0.06] p-4 flex flex-col gap-1.5">
                <span className="font-jura font-bold text-[12px] text-[#8896A4]">Clé de test</span>
                <code className="font-mono text-[13px] text-[#ACBAC5] break-all">En attente d&apos;émission</code>
              </div>
              <p className="font-roboto font-light text-[14px] leading-[155%] text-[#A1AFBA]">
                Vos clés s&apos;affichent ici dès leur émission par l&apos;équipe KUSA. La clé de production arrive après
                validation du dossier.
              </p>
              <Link href="/developpeurs" className="group mt-auto inline-flex items-center gap-2 self-start h-[42px] px-5 rounded-full bg-gold text-on-gold font-jura font-bold text-[14px] transition-all hover:brightness-105 active:scale-95">
                Lire la documentation
                <Arrow />
              </Link>
            </div>
          </section>
        </div>

        <section aria-labelledby="sol-h" className="flex flex-col gap-4 pt-4">
          <h2 id="sol-h" className="font-junge text-[26px] text-forest">
            Comment encaisser
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SOLUTIONS.map((s) => (
              <li key={s.slug}>
                <Link href={`/solutions/${s.slug}`} className="group h-full flex flex-col gap-2 p-5 rounded-[16px] bg-surface border border-line transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="font-roboto font-bold text-[16px] text-forest flex items-center gap-1.5">
                    {s.name}
                    <Arrow />
                  </span>
                  <span className="font-jura font-bold text-[13.5px] leading-[150%] text-slate">{s.menu}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-jura font-bold text-[15px] text-slate pt-2">
            Une question sur votre dossier ?{" "}
            <Link href="/contact?objet=Ouvrir%20un%20compte" className="text-forest underline underline-offset-4 decoration-gold">
              Contacter le service
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
