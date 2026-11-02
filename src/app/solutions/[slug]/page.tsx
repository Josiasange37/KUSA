import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SOLUTIONS } from "@/lib/content";
import { CREATE_LINK, CREATE_LINK_RESPONSE, CREATE_PAYMENT, CREATE_PAYMENT_RESPONSE } from "@/lib/dev";
import { PageHeader, PillLink } from "@/components/kusa/PageHeader";
import { CodeWindow } from "@/components/kusa/CodeWindow";
import { Arrow, FinalCta, Label } from "@/components/kusa/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUTIONS.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.name, description: s.intro };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SOLUTIONS.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = SOLUTIONS.filter((x) => x.slug !== s.slug);
  const isApi = s.slug === "paiement-en-ligne";
  const isLinks = s.slug === "liens-de-paiement";

  const facts = [
    { k: "Pour qui", v: s.forWho },
    { k: "Ce qu'il faut", v: s.needs },
    { k: "Où paie le client", v: s.where },
    { k: "Mise en place", v: s.setup },
  ];

  return (
    <>
      <PageHeader
        label={s.name}
        title={
          <>
            {s.title[0]}{" "}
            <br className="hidden sm:block" />
            {s.title[1]}
          </>
        }
        intro={s.intro}
        image={{ src: s.image.src, alt: s.image.alt }}
      >
        <div className="flex flex-col sm:flex-row gap-3.5">
          <PillLink href="/inscription">Ouvrir un compte</PillLink>
          {isApi ? (
            <PillLink href="/developpeurs" variant="secondary">
              Voir la documentation
            </PillLink>
          ) : (
            <PillLink href={`/contact?objet=${encodeURIComponent("Demander une démo")}`} variant="secondary">
              Demander une démo
            </PillLink>
          )}
        </div>
      </PageHeader>

      <section aria-label="En bref" className="w-full bg-surface border-y border-line-2">
        <dl className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {facts.map((f) => (
            <div key={f.k} className="flex flex-col gap-1">
              <dt className="font-jura font-bold text-[14px] text-gold">{f.k}</dt>
              <dd className="font-jura font-bold text-[15px] leading-[145%] text-forest">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="etapes-h" className="bg-cream py-16 sm:py-20 lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-[560px]">
            <Label>Comment ça marche</Label>
            <h2 id="etapes-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
              En quatre étapes
            </h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {s.steps.map((st, i) => (
              <li key={st.t}>
                <ScrollReveal direction="up" delay={80 + i * 100} distance={22} className="h-full">
                  <div className="h-full flex flex-col gap-3 bg-surface p-6 rounded-[16px] border border-line shadow-[0px_8px_18px_rgba(21,42,32,0.07)] transition-transform hover:-translate-y-1">
                    <span className="font-mono text-[13px] text-gold pb-3 border-b border-line">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-jura font-semibold text-[17px] leading-[145%] text-forest">{st.t}</h3>
                    <p className="font-inter text-[14px] leading-[155%] text-slate">{st.d}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {(isApi || isLinks) && (
        <section aria-labelledby="api-h" className="dev-band w-full">
          <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-10 lg:gap-14 items-center">
            <div className="flex flex-col gap-4">
              <Label dark>Développeurs</Label>
              <h2 id="api-h" className="font-jura font-bold text-[28px] sm:text-[32px] leading-[115%] text-[#F0F2F2]">
                {isApi ? "Un appel, tous les moyens de paiement" : "Des liens générés par votre logiciel"}
              </h2>
              <p className="font-roboto font-light text-[15px] leading-[155%] text-[#A1AFBA] max-w-[460px]">
                {isApi
                  ? "Le même endpoint pour Orange Money, MTN MoMo et les cartes. Vous recevez un statut normalisé par webhook signé."
                  : "Créez les liens depuis votre espace sans code, ou par API pour les joindre automatiquement à une facture ou une réservation."}
              </p>
              <Link href="/developpeurs" className="group self-start inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-gold text-on-gold font-jura font-bold text-[14px] transition-all hover:brightness-105 active:scale-95">
                Lire la documentation
                <Arrow />
              </Link>
            </div>
            <div className="min-w-0">
              <CodeWindow
                title={isApi ? "POST /v1/payments" : "POST /v1/payment-links"}
                samples={isApi ? CREATE_PAYMENT : CREATE_LINK}
                response={isApi ? CREATE_PAYMENT_RESPONSE : CREATE_LINK_RESPONSE}
                responseLabel="Réponse 201"
              />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="usages-h" className="bg-surface py-16 sm:py-20 lg:py-[96px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <ScrollReveal direction="right" delay={80} distance={28} duration={800}>
            <figure className="flex flex-col gap-3">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[24px] sm:rounded-[36px] lg:rounded-[55px] shadow-sm">
                <Image src={s.band.src} alt={s.band.alt} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" style={{ objectPosition: s.band.src.includes("bonadibong") ? "center 88%" : "center" }} />
              </div>
              <figcaption className="font-jura font-bold text-[14px] text-slate px-2">{s.band.where}</figcaption>
            </figure>
          </ScrollReveal>
          <div className="flex flex-col gap-4">
            <Label>Cas d&apos;usage</Label>
            <h2 id="usages-h" className="font-junge text-[26px] sm:text-[32px] leading-[118%] text-forest">
              {s.band.line}
            </h2>
            <ul className="flex flex-col">
              {s.uses.map((u, i) => (
                <li key={u.t}>
                  <ScrollReveal direction="up" delay={120 + i * 80} distance={18}>
                    <div className="flex items-start gap-3 py-[18px] transition-transform hover:translate-x-1.5 duration-200" style={{ borderBottom: i < s.uses.length - 1 ? "1px solid var(--color-line-2)" : "none" }}>
                      <span className="flex-none pt-1.5" aria-hidden="true">
                        <span className="block rounded-[1px] bg-gold" style={{ width: 6, height: 6, transform: "rotate(45deg)" }} />
                      </span>
                      <span className="flex flex-col gap-1">
                        <h3 className="font-inter font-medium text-[15.5px] leading-[145%] text-forest">{u.t}</h3>
                        <p className="font-inter text-[14px] leading-[150%] text-slate">{u.d}</p>
                      </span>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="autres-h" className="bg-cream pt-16 sm:pt-20 pb-6">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-8 xl:px-0 flex flex-col gap-5">
          <h2 id="autres-h" className="font-junge text-[24px] sm:text-[28px] text-forest">
            Les autres façons d&apos;encaisser
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/solutions/${o.slug}`} className="group h-full flex flex-col gap-2 p-6 rounded-[16px] bg-surface border border-line transition-all hover:-translate-y-1 hover:shadow-lg">
                  <span className="font-roboto font-bold text-[17px] text-forest flex items-center gap-1.5">
                    {o.name}
                    <Arrow />
                  </span>
                  <span className="font-jura font-bold text-[14px] leading-[150%] text-slate">{o.menu}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
