import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CodeWindow } from "@/components/kusa/CodeWindow";
import { DocsNav, type DocsGroup } from "@/components/kusa/DocsNav";
import { Arrow, Label } from "@/components/kusa/home";
import {
  API_BASE,
  CREATE_LINK,
  CREATE_LINK_RESPONSE,
  CREATE_PAYMENT,
  CREATE_PAYMENT_RESPONSE,
  ENDPOINTS,
  ERRORS,
  VERIFY_WEBHOOK,
  WEBHOOK_PAYLOAD,
} from "@/lib/dev";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Développeurs",
  description:
    "Documentation de l'API KUSA : authentification, sandbox, paiements Orange Money, MTN MoMo et cartes, liens de paiement, webhooks signés, référence des endpoints et des erreurs.",
};

const GROUPS: DocsGroup[] = [
  {
    title: "Démarrer",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "authentification", label: "Authentification" },
      { id: "environnements", label: "Sandbox et production" },
    ],
  },
  {
    title: "Paiements",
    items: [
      { id: "paiement-en-ligne", label: "Paiement en ligne" },
      { id: "liens-de-paiement", label: "Liens de paiement" },
      { id: "paiement-en-boutique", label: "Paiement en boutique" },
      { id: "statuts", label: "Statuts" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { id: "webhooks", label: "Webhooks" },
      { id: "signature", label: "Vérifier la signature" },
    ],
  },
  {
    title: "Référence",
    items: [
      { id: "reference", label: "Endpoints" },
      { id: "erreurs", label: "Erreurs" },
      { id: "mise-en-production", label: "Mise en production" },
    ],
  },
];

const EXPLORE = [
  { href: "#introduction", title: "Guide de démarrage", text: "Vos clés, l'URL de base et votre premier appel en sandbox." },
  { href: "#paiement-en-ligne", title: "Paiements", text: "Un endpoint pour Orange Money, MTN MoMo et les cartes." },
  { href: "#liens-de-paiement", title: "Liens de paiement", text: "Créez par API les liens envoyés par WhatsApp ou SMS." },
  { href: "#webhooks", title: "Webhooks", text: "Recevez le résultat de chaque paiement et vérifiez sa signature." },
  { href: "#reference", title: "Référence API", text: "Toutes les routes, leurs champs et leurs réponses." },
  { href: "#erreurs", title: "Erreurs", text: "Chaque code d'erreur, sa cause et quoi faire." },
];

const WAYS = [
  {
    title: "Paiement en ligne",
    tag: "API",
    text: "Votre serveur crée le paiement, le client valide sur son téléphone ou sur la page carte. Vous gardez la main sur le parcours.",
    href: "#paiement-en-ligne",
    cta: "Intégrer",
  },
  {
    title: "Liens de paiement",
    tag: "Depuis l'espace ou par API",
    text: "Un lien partagé par WhatsApp, SMS ou email. À montant fixe pour une facture, libre pour une collecte.",
    href: "#liens-de-paiement",
    cta: "Créer un lien",
  },
  {
    title: "Paiement en boutique",
    tag: "Au comptoir",
    text: "La caisse envoie la demande au téléphone du client, ou affiche un QR code. Aucun terminal à acheter.",
    href: "#paiement-en-boutique",
    cta: "Voir le parcours",
  },
];

const PARTNERS = [
  { name: "Orange Money", src: "/images/partner-orange.png", w: 40, h: 40 },
  { name: "MTN MoMo", src: "/images/partner-mtn.png", w: 68, h: 40 },
  { name: "Visa", src: "/images/partner-visa.png", w: 72, h: 32 },
  { name: "Mastercard", src: "/images/partner-mastercard.png", w: 56, h: 38 },
  { name: "PayPal", src: "/images/partner-paypal.png", w: 44, h: 40 },
];

const PRICING: [string, string][] = [
  ["Ouverture du compte", "Gratuite"],
  ["Sandbox", "Gratuit, illimité"],
  ["Paiement réussi", "Commission"],
  ["Paiement échoué", "0 XAF"],
];

const DEV_FAQ = [
  { q: "Quels moyens de paiement puis-je accepter ?", a: "Orange Money, MTN Mobile Money, et les cartes Visa et Mastercard. Le champ channel choisit le moyen : orange_money, mtn_momo ou card." },
  { q: "Comment obtenir mes clés API ?", a: "Ouvrez un compte : votre clé de test s'affiche aussitôt dans l'espace marchand, rubrique Développeurs. La clé de production arrive après la vérification de votre dossier." },
  { q: "Existe-t-il un environnement de test ?", a: "Oui. Avec une clé kusa_test_, rien n'est débité. Trois numéros de test vous permettent de simuler un succès, un échec ou une attente." },
  { q: "Comment savoir qu'un paiement a abouti ?", a: "Par le webhook : KUSA appelle votre URL dès que le statut passe à success ou failed. Vous pouvez aussi lire GET /v1/payments/{id}. Le retour du client sur votre site n'est jamais une preuve." },
  { q: "Comment sécuriser mes webhooks ?", a: "Vérifiez l'en-tête KUSA-Signature : un HMAC-SHA256 du corps brut avec votre secret. Refusez toute requête dont la signature ne correspond pas." },
  { q: "Que se passe-t-il si j'envoie deux fois la même requête ?", a: "Rien de plus. La reference est unique : une deuxième requête avec la même reference renvoie duplicate_reference au lieu de créer un second paiement." },
  { q: "Quand suis-je crédité ?", a: "Les paiements réussis sont reversés sur votre compte de reversement. Le rythme exact vous est confirmé à l'ouverture du compte." },
  { q: "Y a-t-il des limites de débit ?", a: "Oui, pour protéger la plateforme. Au-delà, l'API répond 429 avec un en-tête Retry-After qui indique quand réessayer." },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-junge text-[28px] sm:text-[34px] leading-[115%] text-forest scroll-mt-[110px]">
      <a href={`#${id}`} className="hover:underline decoration-gold underline-offset-[6px] decoration-2">
        {children}
      </a>
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-roboto font-bold text-[19px] leading-[140%] text-forest mt-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="font-inter text-[16px] leading-[165%] text-ink-2 max-w-[720px]">{children}</p>;
}

function Note({ children, tone = "mint" }: { children: React.ReactNode; tone?: "mint" | "gold" }) {
  return (
    <div
      className={`rounded-[14px] px-5 py-4 font-inter text-[14.5px] leading-[160%] max-w-[720px] ${
        tone === "gold" ? "bg-warn-bg text-warn-ink" : "bg-mint text-forest"
      }`}
    >
      {children}
    </div>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5 max-w-[720px]">
      {items.map((li, i) => (
        <li key={i} className="flex items-start gap-3 font-inter text-[15.5px] leading-[160%] text-ink-2">
          <span className="mt-[9px] flex-none rounded-full bg-gold" style={{ width: 5, height: 5 }} aria-hidden="true" />
          <span>{li}</span>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <>
      {/* Phones: one card per row, label above value */}
      <ul className="sm:hidden flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <li key={i} className="rounded-[14px] border border-line bg-surface px-4 py-3.5 flex flex-col gap-2">
            {r.map((c, j) => (
              <div key={j} className={j === 0 ? "font-inter text-[15px] font-medium text-forest" : "flex flex-col gap-0.5"}>
                {j === 0 ? (
                  c
                ) : (
                  <>
                    <span className="font-jura font-bold text-[12.5px] text-slate">{head[j]}</span>
                    <span className="font-inter text-[14.5px] leading-[155%] text-ink-2">{c}</span>
                  </>
                )}
              </div>
            ))}
          </li>
        ))}
      </ul>

      {/* Larger screens: a real table */}
      <div className="hidden sm:block overflow-x-auto rounded-[14px] border border-line bg-surface max-w-full" tabIndex={0}>
        <table className="w-full min-w-[560px] text-left">
          <thead>
            <tr className="bg-surface-2">
              {head.map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-jura font-bold text-[14px] text-forest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-line align-top">
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-3 font-inter text-[14px] leading-[155%] text-ink-2">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Method({ m }: { m: "GET" | "POST" }) {
  return (
    <span className={`inline-block font-mono text-[11px] font-medium px-2 py-0.5 rounded-[5px] ${m === "POST" ? "bg-warn-bg text-warn-ink" : "bg-mint text-forest"}`}>
      {m}
    </span>
  );
}

export default function DevelopersPage() {
  return (
    <>
      {/* Hero: what the API does, what this documentation covers */}
      <section className="dev-band w-full overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[880px] px-4 sm:px-8 py-16 sm:py-24 flex flex-col items-center text-center gap-5">
          <ScrollReveal direction="down" delay={40} distance={15}>
            <Label dark>Développeurs</Label>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100} distance={22}>
            <h1 className="font-jura font-bold text-[34px] sm:text-[52px] leading-[108%] tracking-[-0.01em] text-[#F0F2F2]">
              Encaissez par Mobile Money{" "}
              <br className="hidden sm:block" />
              et carte, en une seule API
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={180} distance={18}>
            <p className="font-roboto font-light text-[16px] sm:text-[18px] leading-[155%] text-[#A1AFBA] max-w-[620px]">
              KUSA réunit Orange Money, MTN MoMo et les cartes derrière une API REST. Cette documentation couvre tout :
              créer un paiement, être prévenu du résultat, suivre vos reversements.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={260} distance={18} className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a href="#introduction" className="group inline-flex items-center justify-center gap-2 h-[48px] px-6 rounded-full bg-gold text-on-gold font-jura font-bold text-[15px] transition-all hover:brightness-105 active:scale-95">
                Commencer
                <Arrow />
              </a>
              <a href="#reference" className="inline-flex items-center justify-center h-[48px] px-6 rounded-full border border-white/20 text-[#F0F2F2] font-jura font-bold text-[15px] transition-all hover:bg-white/10 active:scale-95">
                Référence API
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={320} distance={14}>
            <p className="font-mono text-[12.5px] text-[#8896A4] break-all">
              URL de base · <span className="text-[#CED6DB]">{API_BASE}</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* One request */}
      <section aria-labelledby="une-requete" className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-8 xl:px-0 flex flex-col gap-8">
          <div className="max-w-[640px] flex flex-col gap-3">
            <h2 id="une-requete" className="font-junge text-[30px] sm:text-[38px] leading-[112%] text-forest">
              Encaisser tient en une seule requête
            </h2>
            <p className="font-jura font-semibold text-[16px] sm:text-[17px] leading-[155%] text-slate">
              Votre serveur crée le paiement. Le client reçoit la demande sur son téléphone et valide avec son code. KUSA
              appelle votre webhook avec le résultat.
            </p>
          </div>
          <ScrollReveal direction="up" delay={80} distance={24}>
            <CodeWindow title="POST /v1/payments" samples={CREATE_PAYMENT} response={CREATE_PAYMENT_RESPONSE} responseLabel="Réponse 201" split />
          </ScrollReveal>
        </div>
      </section>

      {/* Three ways, same keys */}
      <section aria-labelledby="trois-facons" className="bg-surface py-16 sm:py-20 border-y border-line">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-8 xl:px-0 flex flex-col gap-8">
          <div className="max-w-[640px] flex flex-col gap-3">
            <h2 id="trois-facons" className="font-junge text-[30px] sm:text-[38px] leading-[112%] text-forest">
              Trois façons d&apos;encaisser
            </h2>
            <p className="font-jura font-semibold text-[16px] sm:text-[17px] leading-[155%] text-slate">
              Le même compte, les mêmes clés. Seule l&apos;expérience du client change.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WAYS.map((w, i) => (
              <li key={w.title}>
                <ScrollReveal direction="up" delay={80 + i * 90} distance={20} className="h-full">
                  <a href={w.href} className="group relative h-full flex flex-col gap-3 p-6 rounded-[18px] bg-cream border border-line overflow-hidden transition-all hover:-translate-y-1 hover:border-forest/25">
                    <span className="absolute top-0 right-0 w-[56px] h-[54px] overflow-hidden rounded-tr-[18px]" aria-hidden="true">
                      <Image src="/images/product-pattern-motif.png" alt="" width={112} height={108} className="w-full h-full object-cover" />
                    </span>
                    <span>
                      <span className="block font-roboto font-bold text-[18px] text-forest">{w.title}</span>
                      <span className="block font-jura font-bold text-[13.5px] text-gold mt-0.5">{w.tag}</span>
                    </span>
                    <span className="font-inter text-[15px] leading-[160%] text-ink-2">{w.text}</span>
                    <span className="mt-auto pt-1 inline-flex items-center gap-1.5 font-jura font-bold text-[14px] text-forest">
                      {w.cta}
                      <Arrow />
                    </span>
                  </a>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners + pricing, side by side */}
      <section aria-label="Partenaires et tarifs" className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-8 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="font-junge text-[30px] sm:text-[34px] leading-[112%] text-forest">Nos partenaires</h2>
              <p className="font-jura font-semibold text-[16px] leading-[155%] text-slate">
                Vos clients paient avec ce qu&apos;ils ont déjà. Vous n&apos;intégrez qu&apos;une seule API.
              </p>
            </div>
            <ul className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-3 [--logo-k:0.8] sm:[--logo-k:1]">
              {PARTNERS.map((p) => (
                <li key={p.name} className="logo-tile h-[72px] rounded-[14px] bg-surface border border-line flex items-center justify-center">
                  <Image src={p.src} alt={p.name} width={p.w * 2} height={p.h * 2} className="object-contain" style={{ width: `calc(${p.w}px * var(--logo-k))`, height: `calc(${p.h}px * var(--logo-k))` }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h2 className="font-junge text-[30px] sm:text-[34px] leading-[112%] text-forest">Tarifs</h2>
              <p className="font-jura font-semibold text-[16px] leading-[155%] text-slate">
                Une commission sur chaque paiement réussi. Rien sur un paiement qui échoue, pas d&apos;abonnement, pas de frais
                d&apos;ouverture.
              </p>
            </div>
            <dl className="rounded-[18px] bg-surface border border-line">
              {PRICING.map(([k, v], i) => (
                <div key={k} className={`flex items-center justify-between gap-4 px-5 py-4 ${i ? "border-t border-line" : ""}`}>
                  <dt className="font-inter font-medium text-[15px] text-forest">{k}</dt>
                  <dd className="font-jura font-bold text-[14.5px] text-slate text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="font-inter text-[13.5px] text-slate">
              Le taux exact vous est communiqué à l&apos;ouverture du compte.{" "}
              <Link href="/tarifs" className="text-forest underline underline-offset-4 decoration-gold">
                Voir les tarifs
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Explore the documentation */}
      <section aria-labelledby="explorer-h" className="bg-surface border-y border-line">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-8 xl:px-0 py-14 sm:py-16">
          <h2 id="explorer-h" className="font-junge text-[28px] sm:text-[32px] leading-[112%] text-forest mb-6">
            Explorer la documentation
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {EXPLORE.map((e, i) => (
              <li key={e.href}>
                <ScrollReveal direction="up" delay={60 + i * 60} distance={16} className="h-full">
                  <a href={e.href} className="group h-full flex flex-col gap-1.5 p-5 rounded-[16px] bg-cream border border-line transition-all duration-300 hover:-translate-y-1 hover:border-forest/25">
                    <span className="font-roboto font-bold text-[16px] text-forest flex items-center gap-1.5">
                      {e.title}
                      <Arrow />
                    </span>
                    <span className="font-inter text-[14px] leading-[155%] text-slate">{e.text}</span>
                  </a>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Docs body */}
      <div className="bg-cream">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 pb-10 sm:pb-14 lg:pt-14 grid grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)] gap-6 lg:gap-14">
          <aside>
            <DocsNav groups={GROUPS} />
          </aside>

          <article className="prose-kusa flex flex-col gap-16 sm:gap-20 min-w-0">
            <Note tone="gold">
              Documentation en version préliminaire. Les clés d&apos;API sont délivrées à l&apos;ouverture du compte ;
              les noms de champs peuvent encore évoluer avant la mise en production.
            </Note>

            <section className="flex flex-col gap-5" aria-labelledby="introduction">
              <H2 id="introduction">Introduction</H2>
              <P>
                L&apos;API KUSA est une API REST. Elle reçoit et renvoie du JSON, utilise les codes HTTP standards et
                s&apos;authentifie par clé secrète. Une seule intégration couvre Orange Money, MTN Mobile Money et les
                cartes Visa et Mastercard.
              </P>
              <Bullets
                items={[
                  <>Les montants sont des entiers en XAF : <code>15000</code> pour 15 000 FCFA.</>,
                  <>Les dates sont au format ISO 8601, en UTC : <code>2026-11-02T09:14:05Z</code>.</>,
                  <>Chaque paiement porte votre <code>reference</code>, unique : la même référence ne crée jamais deux paiements.</>,
                  <>Un paiement n&apos;a que trois statuts : <code>pending</code>, <code>success</code>, <code>failed</code>.</>,
                ]}
              />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="authentification">
              <H2 id="authentification">Authentification</H2>
              <P>
                Chaque requête porte votre clé secrète dans l&apos;en-tête <code>Authorization</code>. Vos clés sont
                dans votre espace KUSA, rubrique Développeurs, dès la création du compte.
              </P>
              <CodeWindow title="En-tête" samples={[{ label: "HTTP", code: "Authorization: Bearer kusa_test_4eC39HqLyjWDarjtT1zdp7dc" }]} />
              <Note>
                La clé secrète reste sur votre serveur. Ne la placez jamais dans une application mobile, un site statique
                ou un dépôt Git. En cas de fuite, régénérez-la depuis votre espace : l&apos;ancienne cesse de fonctionner
                immédiatement.
              </Note>
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="environnements">
              <H2 id="environnements">Sandbox et production</H2>
              <P>Le préfixe de la clé choisit l&apos;environnement. Même URL, mêmes endpoints, mêmes réponses : seul l&apos;argent change.</P>
              <Table
                head={["Environnement", "Préfixe de clé", "Argent réel", "Disponible"]}
                rows={[
                  ["Sandbox", <code key="t">kusa_test_</code>, "Non", "Dès l'ouverture du compte"],
                  ["Production", <code key="l">kusa_live_</code>, "Oui", "Après validation de votre dossier"],
                ]}
              />
              <H3>Simuler un résultat en sandbox</H3>
              <P>En sandbox, le numéro du client décide de l&apos;issue du paiement :</P>
              <Table
                head={["Numéro de test", "Résultat"]}
                rows={[
                  [<code key="a">+237690000000</code>, <><code>success</code> après quelques secondes</>],
                  [<code key="b">+237690000001</code>, <><code>failed</code> : solde insuffisant</>],
                  [<code key="c">+237690000002</code>, <>reste <code>pending</code> : le client ne valide pas</>],
                ]}
              />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="paiement-en-ligne">
              <H2 id="paiement-en-ligne">Paiement en ligne</H2>
              <P>
                Créez un paiement avec le montant, le moyen de paiement et le numéro du client. Pour Orange Money et MTN
                MoMo, le client reçoit une demande sur son téléphone et valide avec son code secret. Pour une carte, la
                réponse contient une <code>redirect_url</code> vers la page de paiement sécurisée.
              </P>
              <CodeWindow title="POST /v1/payments" samples={CREATE_PAYMENT} response={CREATE_PAYMENT_RESPONSE} responseLabel="Réponse 201" />
              <Table
                head={["Champ", "Type", "Description"]}
                rows={[
                  [<code key="1">amount</code>, "entier", "Montant en XAF, 100 minimum."],
                  [<code key="2">currency</code>, "texte", <>Toujours <code>XAF</code>.</>],
                  [<code key="3">channel</code>, "texte", <><code>orange_money</code>, <code>mtn_momo</code> ou <code>card</code>.</>],
                  [<code key="4">customer.phone</code>, "texte", "Numéro du client au format international. Requis pour le Mobile Money."],
                  [<code key="5">reference</code>, "texte", "Votre identifiant de commande, unique par paiement."],
                  [<code key="6">callback_url</code>, "URL", "Facultatif. Remplace l'URL de webhook du compte pour ce paiement."],
                ]}
              />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="liens-de-paiement">
              <H2 id="liens-de-paiement">Liens de paiement</H2>
              <P>
                Un lien de paiement s&apos;envoie par WhatsApp, SMS ou email ; le client choisit son moyen de paiement sur
                la page KUSA. Créez-les depuis votre espace sans code, ou par API pour les générer automatiquement pour
                une facture ou une réservation.
              </P>
              <CodeWindow title="POST /v1/payment-links" samples={CREATE_LINK} response={CREATE_LINK_RESPONSE} responseLabel="Réponse 201" />
              <P>
                Sans <code>amount</code>, le client saisit lui-même le montant. Chaque paiement reçu sur le lien déclenche
                le même webhook qu&apos;un paiement en ligne.
              </P>
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="paiement-en-boutique">
              <H2 id="paiement-en-boutique">Paiement en boutique</H2>
              <P>
                Au comptoir, deux façons d&apos;encaisser depuis votre logiciel de caisse : envoyer la demande sur le
                téléphone du client avec <code>POST /v1/payments</code>, ou afficher le QR code d&apos;un lien de
                paiement à montant fixe. Dans les deux cas, la caisse suit le statut par webhook ou avec{" "}
                <code>GET /v1/payments/{"{id}"}</code>.
              </P>
              <Note>Sans logiciel de caisse, tout se fait depuis l&apos;espace KUSA sur le téléphone du commerçant. Aucun terminal à acheter.</Note>
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="statuts">
              <H2 id="statuts">Statuts</H2>
              <Table
                head={["Statut", "Signification", "Que faire"]}
                rows={[
                  [<code key="p">pending</code>, "Le client n'a pas encore validé.", "Attendre le webhook. Ne pas livrer."],
                  [<code key="s">success</code>, "L'argent est encaissé.", "Livrer la commande. Statut définitif."],
                  [<code key="f">failed</code>, "Refusé, expiré ou annulé par le client.", "Proposer de payer à nouveau. Statut définitif."],
                ]}
              />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="webhooks">
              <H2 id="webhooks">Webhooks</H2>
              <P>
                Quand un paiement change de statut, KUSA envoie un <code>POST</code> à l&apos;URL de webhook de votre
                compte. Événements : <code>payment.succeeded</code>, <code>payment.failed</code>,{" "}
                <code>payment_link.paid</code>.
              </P>
              <CodeWindow title="Notification reçue" samples={[{ label: "HTTP", code: WEBHOOK_PAYLOAD }]} />
              <Bullets
                items={[
                  "Répondez 2xx en moins de 10 secondes, puis traitez la notification en arrière-plan.",
                  "Sans réponse 2xx, KUSA réessaie jusqu'à trois fois, avec un délai croissant.",
                  "Traitez chaque notification de façon idempotente : la même peut arriver deux fois.",
                  "Le retour du client sur votre page de succès n'est jamais une preuve de paiement.",
                ]}
              />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="signature">
              <H2 id="signature">Vérifier la signature</H2>
              <P>
                L&apos;en-tête <code>KUSA-Signature</code> contient un horodatage <code>t</code> et une signature{" "}
                <code>v1</code> : un HMAC-SHA256 de <code>t.corps_brut</code> avec le secret de webhook de votre compte.
                Calculez-le sur le corps brut, avant tout parsing JSON.
              </P>
              <CodeWindow title="Vérification" samples={VERIFY_WEBHOOK} />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="reference">
              <H2 id="reference">Endpoints</H2>
              <P>
                Toutes les routes sont relatives à <code>{API_BASE}</code>.
              </P>
              <Table head={["Méthode", "Route", "Rôle"]} rows={ENDPOINTS.map((e) => [<Method key="m" m={e.method} />, <code key="p">{e.path}</code>, e.desc])} />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="erreurs">
              <H2 id="erreurs">Erreurs</H2>
              <P>Une erreur renvoie un code HTTP 4xx ou 5xx et un objet au même format :</P>
              <CodeWindow
                title="Réponse 400"
                samples={[
                  {
                    label: "JSON",
                    code: `{\n  "error": {\n    "code": "invalid_request",\n    "message": "Le champ amount doit être un entier.",\n    "param": "amount"\n  }\n}`,
                  },
                ]}
              />
              <Table head={["Code", "HTTP", "Cause"]} rows={ERRORS.map((e) => [<code key="c">{e.code}</code>, String(e.http), e.desc])} />
            </section>

            <section className="flex flex-col gap-5" aria-labelledby="mise-en-production">
              <H2 id="mise-en-production">Mise en production</H2>
              <ol className="flex flex-col gap-3 max-w-[720px]">
                {[
                  "Votre dossier est validé par l'équipe KUSA : vous recevez un email.",
                  "Vous remplacez la clé kusa_test_ par votre clé kusa_live_, côté serveur uniquement.",
                  "Votre URL de webhook de production est en HTTPS et vérifie la signature.",
                  "Vous avez testé les trois issues en sandbox : success, failed et pending.",
                ].map((t, i) => (
                  <li key={t} className="flex items-start gap-3.5 font-inter text-[15.5px] leading-[160%] text-ink-2">
                    <span className="flex-none font-mono text-[13px] text-gold pt-[3px]">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>

            </section>
          </article>
        </div>
      </div>

      {/* Developer FAQ */}
      <section aria-labelledby="dev-faq" className="bg-surface border-t border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-4 sm:px-8">
          <h2 id="dev-faq" className="font-junge text-[30px] sm:text-[36px] leading-[112%] text-forest text-center mb-8">
            Questions fréquentes
          </h2>
          <div className="flex flex-col">
            {DEV_FAQ.map((f) => (
              <details key={f.q} className="faq-item border-b border-line">
                <summary className="flex items-center justify-between gap-4 min-h-[60px] py-4">
                  <span className="font-roboto font-medium text-[16px] text-forest">{f.q}</span>
                  <span className="faq-plus flex-none w-7 h-7 rounded-full bg-mint flex items-center justify-center text-forest" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 -mt-1 font-inter text-[15px] leading-[165%] text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* First call */}
      <section aria-labelledby="premier-appel" className="dev-band py-16 sm:py-24">
        <div className="relative z-10 mx-auto max-w-[640px] px-4 sm:px-8 flex flex-col items-center text-center gap-4">
          <h2 id="premier-appel" className="font-jura font-bold text-[30px] sm:text-[40px] leading-[110%] text-[#F0F2F2]">
            Votre premier appel
          </h2>
          <p className="font-roboto font-light text-[16px] sm:text-[17px] leading-[155%] text-[#A1AFBA]">
            Ouvrez un compte, copiez votre clé de test et faites votre premier paiement en sandbox. Sans argent réel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
            <Link href="/inscription" className="inline-flex items-center justify-center h-[48px] px-6 rounded-full bg-gold text-on-gold font-jura font-bold text-[15px] transition-all hover:brightness-105 active:scale-95">
              Obtenir ma clé de test
            </Link>
            <a href="#introduction" className="inline-flex items-center justify-center h-[48px] px-6 rounded-full border border-white/20 text-[#F0F2F2] font-jura font-bold text-[15px] transition-all hover:bg-white/10 active:scale-95">
              Lire le guide
            </a>
          </div>
          <p className="font-inter text-[13.5px] text-[#91A0AB] pt-1">
            Une question sur l&apos;intégration ?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#F0F2F2] underline underline-offset-4 decoration-gold">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
