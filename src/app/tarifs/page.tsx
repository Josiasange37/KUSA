import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, PillLink } from "@/components/kusa/PageHeader";
import { Check, Faq, FinalCta, Label } from "@/components/kusa/home";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FAQ } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Pas d'abonnement : une commission uniquement sur les paiements réussis. Ouverture de compte, sandbox et liens de paiement gratuits.",
};

const PLANS = [
  {
    name: "Standard",
    price: "0 XAF",
    per: "par mois",
    text: "Pour démarrer tout de suite : boutiques, bars, hôtels, indépendants, startups.",
    on: true,
    cta: { href: "/inscription", label: "Ouvrir un compte" },
    items: [
      "Ouverture du compte gratuite",
      "Aucun abonnement",
      "Commission uniquement sur les paiements réussis",
      "Liens de paiement inclus, sans limite",
      "Paiement en boutique inclus",
      "API et sandbox inclus",
      "Support en français, par email",
    ],
  },
  {
    name: "Grands volumes",
    price: "Sur devis",
    per: "selon votre volume mensuel",
    text: "Pour les supermarchés, chaînes d'hôtels et plateformes qui encaissent beaucoup chaque mois.",
    on: false,
    cta: { href: "/contact?objet=Tarifs", label: "Contacter le service" },
    items: [
      "Tout ce qui est dans Standard",
      "Taux de commission négocié",
      "Plusieurs caisses et plusieurs points de vente",
      "Accompagnement à l'intégration de l'API",
      "Interlocuteur dédié, en français",
    ],
  },
];

const PRICE_FAQ = FAQ.filter((f) =>
  ["Combien ça coûte ?", "Comment ouvrir un compte ?", "Faut-il un site web ?", "Faut-il un développeur ?", "Comment contacter le service ?"].includes(f.q)
);

export default function TarifsPage() {
  return (
    <>
      <PageHeader
        label="Tarifs"
        title={
          <>
            Payez quand{" "}
            <br className="hidden sm:block" />
            vous encaissez
          </>
        }
        intro="Pas d'abonnement, pas de frais d'ouverture. Une commission s'applique uniquement sur les paiements réussis ; le taux vous est communiqué à l'ouverture du compte."
      >
        <div className="flex flex-col sm:flex-row gap-3.5">
          <PillLink href="/inscription">Ouvrir un compte</PillLink>
          <PillLink href="/contact?objet=Tarifs" variant="secondary">
            Demander un devis
          </PillLink>
        </div>
      </PageHeader>

      <section aria-labelledby="formules-h" className="bg-surface py-16 sm:py-20 lg:py-[96px] border-t border-line-2">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-8 xl:px-0 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Label>Formules</Label>
            <h2 id="formules-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
              Deux formules, les mêmes outils
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PLANS.map((p, i) => (
              <ScrollReveal key={p.name} direction="up" delay={100 + i * 120} distance={24} className="h-full">
                <div
                  className={`${p.on ? "cta-card " : ""}relative h-full flex flex-col gap-5 p-7 sm:p-8 rounded-[18px] overflow-hidden ${p.on ? "text-[#F3F4F1]" : "bg-cream text-forest"}`}
                  style={p.on ? { background: "linear-gradient(180deg, #07382D 0%, #063537 63.94%, #032D4E 100%)" } : { border: "1px solid var(--color-line)" }}
                >
                  <span className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" style={{ width: 70, height: 67, borderTopRightRadius: 18 }} aria-hidden="true">
                    <Image src="/images/product-pattern-motif.png" alt="" width={140} height={134} className="w-full h-full object-cover" />
                  </span>
                  <h3 className={`font-roboto font-bold text-[18px] ${p.on ? "text-gold" : "text-forest"}`}>{p.name}</h3>
                  <p className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-junge text-[44px] leading-none">{p.price}</span>
                    <span className={`font-jura font-bold text-[14px] ${p.on ? "text-[#A9BDBA]" : "text-slate"}`}>{p.per}</span>
                  </p>
                  <p className={`font-jura font-bold text-[14.5px] leading-[150%] ${p.on ? "text-[#C5D3D1]" : "text-slate"}`}>{p.text}</p>
                  <ul className="flex flex-col gap-2.5">
                    {p.items.map((t) => (
                      <li key={t} className="flex items-center gap-2.5">
                        <Check />
                        <span className={`font-inter text-[14px] leading-[145%] ${p.on ? "text-[#E6ECEA]" : "text-ink-2"}`}>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.cta.href}
                    className={`mt-auto inline-flex items-center justify-center h-[48px] px-6 rounded-full font-jura font-bold text-[15px] transition-all active:scale-95 ${
                      p.on ? "bg-gold text-on-gold hover:brightness-105" : "bg-brand text-white hover:brightness-110"
                    }`}
                  >
                    {p.cta.label}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="font-inter text-[14px] leading-[155%] text-slate max-w-[720px]">
            Aucun matériel à acheter, aucun engagement de durée. Le taux exact vous est communiqué par écrit à
            l&apos;ouverture du compte.
          </p>
        </div>
      </section>

      <Faq items={PRICE_FAQ} title="Questions sur les tarifs" />
      <FinalCta />
    </>
  );
}
