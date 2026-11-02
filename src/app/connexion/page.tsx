import type { Metadata } from "next";
import Link from "next/link";
import { AuthFrame } from "@/components/kusa/AuthFrame";
import { ResetForm, SignInForm } from "@/components/kusa/forms";

export const metadata: Metadata = {
  title: "Se connecter",
  description: "Connectez-vous à votre espace KUSA.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ suite?: string; oubli?: string; erreur?: string }>;
}) {
  const { suite, oubli, erreur } = await searchParams;
  const forgot = oubli === "1";
  const linkCls = "text-forest underline underline-offset-4 decoration-gold";

  return (
    <AuthFrame
      phrases={[
        ["Vos encaissements", "vous attendent."],
        ["Chaque paiement,", "suivi en direct."],
        ["Un seul historique,", "tous vos clients."],
      ]}
      card={{ amount: "45 000 XAF", method: "MTN MoMo · à l'instant" }}
    >
      <div className="flex-1 flex items-start lg:items-center px-5 sm:px-10 lg:px-14 pt-[8svh] pb-12 lg:py-12">
        <div className="w-full max-w-[460px] flex flex-col gap-6 step-in">
          <div className="flex flex-col gap-3">
            <h1 className="font-junge text-[36px] sm:text-[48px] leading-[110%] tracking-[-0.02em] text-forest">
              {forgot ? "Mot de passe oublié" : "Bon retour"}
            </h1>
            <p className="font-jura font-semibold text-[16px] sm:text-[17px] leading-[155%] text-slate">
              {forgot
                ? "Indiquez l'email de votre compte : nous vous envoyons un lien pour choisir un nouveau mot de passe."
                : "Connectez-vous à votre espace KUSA avec votre email et votre mot de passe."}
            </p>
          </div>

          {erreur && (
            <div role="alert" className="rounded-[12px] bg-err-bg border border-err-line px-4 py-3 font-inter text-[14.5px] text-err-ink">
              Ce lien n&apos;est plus valide. Connectez-vous ou demandez un nouveau lien.
            </div>
          )}

          {forgot ? <ResetForm /> : <SignInForm next={suite} />}

          <p className="font-jura font-bold text-[15px] text-slate pt-2">
            {forgot ? (
              <Link href="/connexion" className={linkCls}>
                Retour à la connexion
              </Link>
            ) : (
              <>
                Nouveau sur KUSA ?{" "}
                <Link href="/inscription" className={linkCls}>
                  Ouvrir un compte
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </AuthFrame>
  );
}
