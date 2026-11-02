import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, PillLink } from "@/components/kusa/PageHeader";
import { FinalCta, Label } from "@/components/kusa/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "À propos",
  description: "KUSA, par Freemo : l'infrastructure de paiement des commerces et entreprises du Cameroun.",
};

const PRINCIPLES = [
  {
    t: "Simple pour le commerçant",
    d: "Un email, un mot de passe, et l'espace KUSA s'utilise depuis un téléphone. Pas de matériel à acheter.",
  },
  { t: "Sérieux pour les développeurs", d: "REST et JSON, statuts normalisés, webhooks signés, sandbox sans argent réel." },
  {
    t: "Clair sur ce que nous sommes",
    d: "KUSA est un service d'intégration technique des API de paiement officielles. Ce n'est ni un établissement de paiement, ni un PSP.",
  },
  { t: "Joignable, en français", d: "Une question, une démo, un problème : le service répond par email, en français." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="À propos"
        title={
          <>
            Fait pour les{" "}
            <br className="hidden sm:block" />
            commerces africains
          </>
        }
        intro="KUSA est construit par Freemo pour que chaque commerce, du snack de quartier au supermarché, encaisse aussi simplement qu'un grand groupe."
        image={{ src: "/images/quartier-bonadibong-douala-01.jpg", alt: "Immeubles du quartier Bonadibong à Douala sous un ciel bleu", position: "center 70%" }}
      >
        <div className="flex flex-col sm:flex-row gap-3.5">
          <PillLink href="/inscription">Ouvrir un compte</PillLink>
          <PillLink href="/contact" variant="secondary">
            Contacter le service
          </PillLink>
        </div>
      </PageHeader>

      <section aria-labelledby="pourquoi-h" className="bg-surface py-16 sm:py-20 lg:py-[96px] border-t border-line-2">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <ScrollReveal direction="right" delay={80} distance={28} duration={800}>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[24px] sm:rounded-[36px] lg:rounded-[55px] shadow-sm">
              <Image
                src="/images/cameroon-market-in-yaounde.jpg"
                alt="Allée du marché général de Yaoundé, étals de fruits et de légumes"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
                style={{ objectPosition: "center 60%" }}
              />
            </div>
          </ScrollReveal>
          <div className="flex flex-col gap-4">
            <Label>Pourquoi KUSA</Label>
            <h2 id="pourquoi-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
              Trois caisses{" "}
              <br className="hidden sm:block" />
              deviennent une
            </h2>
            <p className="font-jura font-bold text-[16px] leading-[155%] text-slate">
              Au Cameroun, les clients paient avec Orange Money, MTN MoMo, parfois une carte. Pour le commerçant, cela veut
              dire plusieurs comptes, plusieurs relevés et des soirées de rapprochement.
            </p>
            <p className="font-inter text-[16px] leading-[160%] text-ink-2">
              KUSA réunit ces moyens de paiement derrière un seul compte et une seule API. Le commerçant encaisse au
              comptoir, par lien ou sur son site, et retrouve tout au même endroit.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principes-h" className="dev-band py-16 sm:py-20 lg:py-[96px]">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Label dark>Nos principes</Label>
            <h2 id="principes-h" className="font-jura font-bold text-[28px] sm:text-[34px] leading-[115%] text-[#F0F2F2]">
              Ce qui nous guide
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t}>
                <ScrollReveal direction="up" delay={80 + i * 80} distance={18} className="h-full">
                  <div className="h-full flex flex-col gap-2 p-6 rounded-[14px]" style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <h3 className="font-jura font-semibold text-[17px] text-[#E4EAEC]">{p.t}</h3>
                    <p className="font-inter text-[14.5px] leading-[155%] text-[#A1AFBA]">{p.d}</p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-16 sm:pt-20 bg-cream" />
      <FinalCta title="Une question avant d'ouvrir un compte ?" text="Le service KUSA vous répond en français. Démo, tarifs, intégration : écrivez-nous." />
    </>
  );
}
