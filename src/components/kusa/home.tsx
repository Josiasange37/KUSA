import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SwipeRow } from "@/components/kusa/SwipeRow";
import { FAQ, SECTORS, SOLUTIONS } from "@/lib/content";
import { MENU_ORDER, SOLUTION_ICONS } from "@/lib/solution-meta";

/* ───────────── Shared bits of the original KUSA language ───────────── */

export function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className="font-mono uppercase"
      style={{ fontSize: 12, lineHeight: "15px", letterSpacing: "0.1em", color: dark ? "#DBAE40" : "var(--color-slate)" }}
    >
      {children}
    </span>
  );
}

export function GoldDot() {
  return <span className="flex-none rounded-full bg-gold" style={{ width: 4, height: 4 }} aria-hidden="true" />;
}

export function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
      <path d="M3 8h10M13 8 9 4M13 8l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check() {
  return (
    <span className="flex-none flex items-center justify-center rounded-full" style={{ width: 16, height: 16, background: "#E5F3E9" }}>
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
        <path d="M1 3.5L3.33333 5.5L8 1" stroke="#62A97B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const PARTNERS = [
  { name: "Orange Money", src: "/images/partner-orange.png", width: 46, height: 46 },
  { name: "MTN MoMo", src: "/images/partner-mtn.png", width: 78, height: 46 },
  { name: "PayPal", src: "/images/partner-paypal.png", width: 52, height: 46 },
  { name: "Mastercard", src: "/images/partner-mastercard.png", width: 68, height: 46 },
  { name: "Visa", src: "/images/partner-visa.png", width: 88, height: 38 },
];

/* ───────────── Partner ribbon (original) ───────────── */
export function PartnerRibbon() {
  return (
    <section aria-label="Moyens de paiement acceptés" className="w-full bg-surface border-y border-line-2 shadow-xs">
      <div className="w-full max-w-[1440px] mx-auto min-h-[75px] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-4 lg:py-0 gap-4 lg:gap-8">
        <ScrollReveal direction="right" delay={50} distance={18}>
          <p className="font-jura font-bold text-[14px] sm:text-[15px] lg:text-[16px] text-center lg:text-left tracking-tight sm:whitespace-nowrap leading-[140%] text-slate">
            Intégration rapide, plusieurs moyens de paiement, en XAF, sur un seul compte.
          </p>
        </ScrollReveal>
        <ul className="w-full lg:w-auto flex items-center justify-between sm:justify-center lg:justify-end gap-2 sm:gap-8 lg:gap-11 flex-1 py-1 [--logo-k:0.7] sm:[--logo-k:1]">
          {PARTNERS.map((p, i) => (
            <li key={p.name}>
              <ScrollReveal direction="up" delay={80 + i * 60} distance={15}>
                <div className="logo-chip flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" style={{ width: `calc(${p.width}px * var(--logo-k))`, height: `calc(${p.height}px * var(--logo-k))` }}>
                  <Image src={p.src} alt={p.name} width={p.width * 2} height={p.height * 2} className="w-full h-full object-contain select-none" />
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Products: the three solutions (Jèko: Checkout · Terminal · Liens) ───────────── */
const PRODUCT_CARDS: Record<string, { tag: string; cta: string; features: string[] }> = {
  "paiement-en-boutique": {
    tag: "EN BOUTIQUE",
    cta: "Mettre en place",
    features: ["QR code ou demande sur le téléphone", "Aucun matériel à acheter", "Statut en direct à la caisse"],
  },
  "paiement-en-ligne": {
    tag: "API",
    cta: "Intégrer l'API",
    features: ["REST & JSON", "Webhooks de statut signés", "Environnement de test gratuit"],
  },
  "liens-de-paiement": {
    tag: "NO-CODE",
    cta: "Créer un lien",
    features: ["Montant fixe ou libre", "Partage WhatsApp, SMS, email", "Suivi en temps réel"],
  },
};

export function Products() {
  const items = MENU_ORDER.map((slug) => SOLUTIONS.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SOLUTIONS)[number] => Boolean(s)
  );
  return (
    <section id="produits" aria-labelledby="produits-h" className="w-full bg-cream flex justify-center py-16 sm:py-20 lg:py-[96px] px-4 sm:px-8 xl:px-0">
      <div className="w-full max-w-[1200px] flex flex-col items-start gap-8 sm:gap-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-4 lg:gap-12">
          <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-[560px]">
            <ScrollReveal direction="down" delay={40} distance={15}>
              <Label>Produits</Label>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100} distance={20}>
              <h2 id="produits-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
                Trois façons d&apos;encaisser,{" "}
                <br className="hidden sm:block" />
                une seule infrastructure
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p className="font-jura font-bold text-[15px] sm:text-[16px] leading-[150%] text-slate max-w-[440px]">
              Au comptoir, à distance ou en ligne, avec ou sans développeur.
            </p>
          </ScrollReveal>
        </div>

        <SwipeRow id="produits" className="snap-row flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 -mx-4 px-4 pb-3 gap-3 w-[calc(100%+32px)] md:w-full md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 md:pb-0 md:gap-5">
          {items.map((s, idx) => {
            const card = PRODUCT_CARDS[s.slug];
            return (
              <ScrollReveal key={s.slug} direction="up" delay={200 + idx * 120} distance={25} className="w-[86%] xs:w-[70%] flex-none snap-start md:w-full">
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group relative flex flex-col items-start bg-surface h-full p-6 sm:p-7 gap-[18px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-forest/30"
                  style={{ border: "1px solid var(--color-line)", boxShadow: "0px 8px 18px rgba(21, 42, 32, 0.07)", borderRadius: 16, minHeight: 330, isolation: "isolate" }}
                >
                  {/* African geometric motif, top-right corner */}
                  <span className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden" style={{ width: 70, height: 67, borderTopRightRadius: 16 }} aria-hidden="true">
                    <Image src="/images/product-pattern-motif.png" alt="" width={140} height={134} className="w-full h-full object-cover" />
                  </span>

                  <span className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-[10px] bg-mint flex items-center justify-center text-forest">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {SOLUTION_ICONS[s.slug]}
                      </svg>
                    </span>
                    <span className="inline-flex items-center h-[22px] px-2 rounded-[5px] bg-mint font-inter font-semibold text-[10px] tracking-[0.04em] text-forest">
                      {card.tag}
                    </span>
                  </span>

                  <span className="flex flex-col gap-2.5">
                    <h3 className="font-roboto font-bold text-[19px] leading-[140%] text-forest">{s.name}</h3>
                    <span className="font-jura font-bold text-[14px] leading-[150%] text-slate">{s.intro}</span>
                  </span>

                  <ul className="flex flex-col gap-2">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <GoldDot />
                        <span className="font-inter text-[14px] leading-[145%] text-forest">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 font-jura font-bold text-[14px] text-forest">
                    {card.cta}
                    <Arrow />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </SwipeRow>
      </div>
    </section>
  );
}

/* ───────────── Mid-page call to action (Jèko: « Prêt à transformer votre entreprise ? ») ───────────── */
export function MidCta() {
  return (
    <section aria-labelledby="midcta-h" className="w-full bg-surface border-y border-line-2 overflow-hidden relative">
      <div className="absolute inset-y-0 right-0 w-[38%] hidden md:block woven opacity-70 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 py-12 sm:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <ScrollReveal direction="up" distance={18}>
          <div className="flex flex-col gap-2 max-w-[560px]">
            <h2 id="midcta-h" className="font-junge text-[26px] sm:text-[32px] leading-[115%] text-forest">
              Prêt à encaisser sans monnaie ?
            </h2>
            <p className="font-jura font-bold text-[15px] leading-[150%] text-slate">
              Un email, un mot de passe, et le sandbox est à vous.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={120} distance={18}>
          <div className="flex flex-col xs:flex-row gap-3 md:bg-surface/90 md:p-2 md:rounded-full">
            <Link href="/inscription" className="inline-flex justify-center items-center h-[48px] px-6 rounded-full bg-brand text-white font-jura font-bold text-[15px] shadow-md transition-all hover:brightness-110 active:scale-95 whitespace-nowrap">
              Ouvrir un compte
            </Link>
            <Link href="/contact" className="inline-flex justify-center items-center h-[48px] px-6 rounded-full bg-surface border border-line-2 text-forest font-jura font-bold text-[15px] shadow-xs transition-all hover:bg-surface-2 active:scale-95 whitespace-nowrap">
              Contacter le service
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───────────── Sectors (Jèko: « Stimuler la croissance dans tous les secteurs ») ───────────── */
export function Sectors() {
  return (
    <section id="secteurs" aria-labelledby="secteurs-h" className="w-full bg-cream flex justify-center py-16 sm:py-20 lg:py-[96px] px-4 sm:px-8 xl:px-0">
      <div className="w-full max-w-[1200px] flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-[640px]">
          <ScrollReveal direction="down" delay={40} distance={15}>
            <Label>Cas d&apos;usage</Label>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2 id="secteurs-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
              Des boutiques aux{" "}
              <br className="hidden sm:block" />
              plateformes, un même flux
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p className="font-jura font-bold text-[15px] sm:text-[16px] leading-[150%] text-slate">
              Chaque activité encaisse à sa façon, sur le même compte.
            </p>
          </ScrollReveal>
        </div>

        <SwipeRow id="secteurs" as="ul" className="snap-row flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 -mx-4 px-4 pb-3 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 sm:gap-5">
          {SECTORS.map((s, i) => (
            <li key={s.key} className="w-[82%] xs:w-[64%] flex-none snap-start sm:w-auto">
              <ScrollReveal direction="up" delay={120 + (i % 3) * 90} distance={22} className="h-full">
                <article
                  className="group h-full flex flex-col bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{ border: "1px solid var(--color-line)", borderRadius: 16, boxShadow: "0px 8px 18px rgba(21, 42, 32, 0.07)" }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ objectPosition: s.key === "ecommerce" ? "center 25%" : s.key === "hotels" ? "center 92%" : "center" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 p-5 sm:p-6 flex-1">
                    <h3 className="font-roboto font-bold text-[17px] leading-[140%] text-forest">{s.name}</h3>
                    <p className="font-jura font-bold text-[14px] leading-[150%] text-slate">{s.text}</p>
                    <p className="mt-auto pt-2 flex items-center gap-2 font-inter text-[13.5px] text-forest">
                      <span className="block rounded-[1px] bg-gold" style={{ width: 6, height: 6, transform: "rotate(45deg)" }} aria-hidden="true" />
                      {s.uses}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </SwipeRow>
      </div>
    </section>
  );
}

/* ───────────── How to start (Jèko: « Comment démarrer ») ───────────── */
const STEPS = [
  {
    number: "01",
    title: "Créez votre compte",
    description: "Email, mot de passe, nom de l'activité. Vos clés de test arrivent aussitôt.",
    cta: { href: "/inscription", label: "Ouvrir un compte" },
  },
  {
    number: "02",
    title: "Choisissez comment encaisser",
    description: "Lien de paiement, paiement en boutique ou API : à vous de choisir.",
    cta: { href: "/solutions/liens-de-paiement", label: "Créer un lien" },
  },
  {
    number: "03",
    title: "Encaissez",
    description: "Orange Money, MTN MoMo ou carte. Chaque statut suivi en direct.",
    cta: { href: "/developpeurs", label: "Voir la documentation" },
  },
];

export function Steps() {
  return (
    <section id="demarrer" aria-labelledby="demarrer-h" className="w-full bg-surface flex justify-center py-16 sm:py-20 lg:py-[96px] overflow-hidden">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row items-start px-4 sm:px-8 xl:px-0 gap-10 lg:gap-20">
        <ScrollReveal direction="up" delay={50} distance={20} className="lg:w-[400px] flex-none">
          <div className="flex flex-col gap-4">
            <Label>Comment démarrer</Label>
            <h2 id="demarrer-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
              De l&apos;inscription au{" "}
              <br className="hidden sm:block" />
              premier encaissement
            </h2>
            <p className="font-jura font-bold text-[15px] leading-[150%] text-slate">
              Pas de matériel, pas d&apos;abonnement. L&apos;équipe KUSA vérifie votre activité avant le passage en
              production.
            </p>
          </div>
        </ScrollReveal>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {STEPS.map((step, idx) => (
            <li key={step.number}>
              <ScrollReveal direction="up" delay={140 + idx * 120} distance={22}>
                <div className="flex flex-col items-start gap-3 group">
                  <div className="w-full pb-3 border-b border-line">
                    <span className="font-mono text-[13px] leading-[15px] text-gold">{step.number}</span>
                  </div>
                  <h3 className="font-jura font-semibold text-[17px] leading-[145%] text-forest">{step.title}</h3>
                  <p className="font-inter text-[14px] leading-[150%] text-slate">{step.description}</p>
                  <Link href={step.cta.href} className="group inline-flex items-center gap-1.5 min-h-[44px] font-jura font-bold text-[14px] text-forest underline-offset-4 hover:underline decoration-gold">
                    {step.cta.label}
                    <Arrow />
                  </Link>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────── Pricing teaser (original « Tarifs » block) ───────────── */
const BENEFITS = [
  "Ouverture de compte et environnement de test gratuits",
  "Commission uniquement sur les paiements réussis",
  "Liens de paiement inclus, sans limite",
  "Support technique en français",
];

export function PricingTeaser() {
  return (
    <section id="tarifs" aria-labelledby="tarifs-h" className="w-full bg-cream flex justify-center py-16 sm:py-20 lg:py-[96px] overflow-hidden">
      <div className="w-full max-w-[1000px] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 xl:px-0 gap-10 sm:gap-14">
        <div className="flex flex-col items-start w-full lg:w-[420px] flex-none gap-4">
          <ScrollReveal direction="down" delay={40} distance={15}>
            <Label>Tarifs</Label>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2 id="tarifs-h" className="font-jura font-semibold text-[28px] sm:text-[34px] leading-[115%] text-forest">
              Une tarification simple,{" "}
              <br className="hidden sm:block" />
              sans frais cachés
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p className="font-inter text-[15px] leading-[150%] text-slate">
              Pas d&apos;abonnement. Taux communiqué à l&apos;ouverture du compte, négociable pour les grands volumes.
            </p>
          </ScrollReveal>
          <ul className="flex flex-col w-full pt-2 gap-2.5">
            {BENEFITS.map((b, i) => (
              <li key={b}>
                <ScrollReveal direction="up" delay={200 + i * 60} distance={14}>
                  <span className="flex items-center gap-2.5 min-h-[22px]">
                    <Check />
                    <span className="font-inter text-[14px] leading-[145%] text-ink-2">{b}</span>
                  </span>
                </ScrollReveal>
              </li>
            ))}
          </ul>
          <ScrollReveal direction="up" delay={460} distance={14}>
            <Link href="/tarifs" className="group mt-3 inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-brand text-white font-jura font-bold text-[14px] transition-all hover:brightness-110 active:scale-95">
              Voir les tarifs
              <Arrow />
            </Link>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="left" delay={180} distance={28} duration={750} className="w-full max-w-[480px] flex-none">
          <div className="relative w-full h-[260px] sm:h-[320px] lg:h-[360px] overflow-hidden rounded-[22px] shadow-sm">
            <Image
              src="/images/pricing-collaboration.png"
              alt="Deux collègues collaborant sur des ordinateurs portables"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───────────── Trust & partners (Jèko: « Nos partenaires » + « Sécurité et conformité ») ───────────── */
const TRUST = [
  { t: "API officielles uniquement", d: "Uniquement les API des opérateurs et des réseaux de cartes." },
  { t: "Code secret jamais transmis", d: "Le client valide sur son téléphone ; KUSA ne voit jamais son code." },
  { t: "Webhooks signés", d: "Chaque notification est signée en HMAC-SHA256." },
  { t: "Test et production séparés", d: "Clés distinctes : aucun argent réel pendant vos essais." },
];

export function Trust() {
  return (
    <section id="securite" aria-labelledby="securite-h" className="w-full bg-surface flex justify-center py-16 sm:py-20 lg:py-[96px]">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 xl:px-0 gap-10 lg:gap-20 items-start">
        <div className="flex flex-col gap-4">
          <ScrollReveal direction="down" delay={40} distance={15}>
            <Label>Partenaires & sécurité</Label>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2 id="securite-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
              Vos clients paient avec{" "}
              <br className="hidden sm:block" />
              les moyens qu&apos;ils ont déjà
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p className="font-jura font-bold text-[15px] sm:text-[16px] leading-[150%] text-slate max-w-[480px]">
              Orange Money, MTN MoMo, Visa, Mastercard et PayPal. Tout arrive en XAF sur un seul compte.
            </p>
          </ScrollReveal>
          <ul className="grid grid-cols-5 gap-2 sm:grid-cols-3 sm:gap-3 pt-3 max-w-[480px] [--logo-k:0.6] sm:[--logo-k:1]">
            {PARTNERS.map((p, i) => (
              <li key={p.name}>
                <ScrollReveal direction="up" delay={200 + i * 60} distance={14}>
                  <div className="logo-tile h-[56px] sm:h-[84px] rounded-[12px] sm:rounded-[14px] bg-cream flex items-center justify-center transition-transform hover:-translate-y-0.5">
                    <Image src={p.src} alt={p.name} width={p.width * 2} height={p.height * 2} className="object-contain" style={{ width: `calc(${p.width}px * var(--logo-k))`, height: `calc(${p.height}px * var(--logo-k))` }} />
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-col">
          {TRUST.map((item, i) => (
            <li key={item.t}>
              <ScrollReveal direction="up" delay={160 + i * 80} distance={18}>
                <div className="flex items-start gap-3 py-[18px] transition-transform hover:translate-x-1.5 duration-200" style={{ borderBottom: i < TRUST.length - 1 ? "1px solid var(--color-line-2)" : "none" }}>
                  <span className="flex-none pt-1.5" aria-hidden="true">
                    <span className="block rounded-[1px] bg-gold" style={{ width: 6, height: 6, transform: "rotate(45deg)" }} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <h3 className="font-inter font-medium text-[15.5px] leading-[145%] text-forest">{item.t}</h3>
                    <p className="font-inter text-[14px] leading-[150%] text-slate">{item.d}</p>
                  </span>
                </div>
              </ScrollReveal>
            </li>
          ))}
          <li>
            <ScrollReveal direction="up" delay={500} distance={14}>
              <p className="mt-4 rounded-[14px] bg-cream p-4 font-inter text-[14px] leading-[155%] text-ink-2">
                KUSA est un service d&apos;intégration technique des API de paiement officielles. Ce n&apos;est ni un
                établissement de paiement, ni un PSP.
              </p>
            </ScrollReveal>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ───────────── FAQ (Jèko: « Questions fréquentes ») ───────────── */
export function Faq({ items = FAQ, title = "Questions fréquentes sur KUSA" }: { items?: typeof FAQ; title?: string }) {
  return (
    <section id="questions" aria-labelledby="faq-h" className="w-full bg-cream flex justify-center py-16 sm:py-20 lg:py-[96px]">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[360px_1fr] px-4 sm:px-8 xl:px-0 gap-8 lg:gap-20">
        <div className="flex flex-col gap-4 lg:sticky lg:top-[110px] self-start">
          <Label>FAQ</Label>
          <h2 id="faq-h" className="font-junge text-[28px] sm:text-[36px] leading-[115%] text-forest">
            {title}
          </h2>
          <p className="font-jura font-bold text-[15px] leading-[150%] text-slate">
            Une autre question ?{" "}
            <Link href="/contact" className="text-forest underline underline-offset-4 decoration-gold">
              Contactez le service
            </Link>
            , nous répondons en français.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((f) => (
            <details key={f.q} className="faq-item group bg-surface rounded-[14px] border border-line transition-shadow open:shadow-[0px_8px_18px_rgba(21,42,32,0.07)]">
              <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 min-h-[56px]">
                <span className="font-roboto font-medium text-[16px] leading-[140%] text-forest">{f.q}</span>
                <span className="faq-plus flex-none w-7 h-7 rounded-full bg-mint flex items-center justify-center text-forest" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="px-5 sm:px-6 pb-5 -mt-1 font-inter text-[15px] leading-[160%] text-ink-2 max-w-[680px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Final call to action (original access card) ───────────── */
export function FinalCta({
  title = "Prêt à accepter les paiements mobiles ?",
  text = "Votre compte en quelques minutes. Un projet particulier ? Nous vous accompagnons dans l'intégration.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="final-h" className="w-full bg-cream flex justify-center px-4 sm:px-8 pb-16 sm:pb-20 lg:pb-[96px] pt-4">
      <ScrollReveal direction="up" delay={100} distance={30} duration={800} className="w-full max-w-[1000px]">
        <div
          className="cta-card relative w-full flex flex-col items-center justify-center text-center shadow-lg overflow-hidden"
          style={{
            minHeight: 280,
            padding: "56px 28px",
            gap: 18,
            background: "linear-gradient(180deg, #07382D 0%, #063537 63.94%, #032D4E 99.99%, #032C50 100%)",
            borderRadius: 22,
          }}
        >
          <div className="absolute inset-0 opacity-[0.07] woven pointer-events-none" aria-hidden="true" />
          <h2 id="final-h" className="relative font-junge text-[26px] sm:text-[34px] leading-[120%] text-[#F3F4F1] max-w-[680px]">
            {title}
          </h2>
          <p className="relative font-inter text-[15px] leading-[150%] text-[#A9BDBA] max-w-[600px]">{text}</p>
          <div className="relative flex flex-col xs:flex-row items-center gap-3 pt-2">
            <Link href="/inscription" className="inline-flex items-center justify-center h-[46px] px-7 rounded-full bg-gold text-on-gold font-inter font-semibold text-[14px] shadow-md transition-all hover:brightness-105 active:scale-95 whitespace-nowrap">
              Ouvrir un compte
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center h-[46px] px-7 rounded-full border border-white/25 text-[#F3F4F1] font-inter font-medium text-[14px] transition-all hover:bg-white/10 active:scale-95 whitespace-nowrap">
              Contacter le service
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
