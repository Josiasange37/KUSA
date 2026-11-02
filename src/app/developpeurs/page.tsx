import type { Metadata } from "next";
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
  { href: "#introduction", title: "Démarrer", text: "Clés d'API, URL de base et premier appel en sandbox." },
  { href: "#paiement-en-ligne", title: "Paiements", text: "Orange Money, MTN MoMo et cartes avec un seul endpoint." },
  { href: "#liens-de-paiement", title: "Liens de paiement", text: "Créez par API les liens envoyés par WhatsApp ou SMS." },
  { href: "#webhooks", title: "Webhooks", text: "Statuts poussés vers votre serveur, signés HMAC-SHA256." },
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
      {/* Portal hero, in the original developer band */}
      <section className="dev-band w-full overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-12 items-center">
          <div className="flex flex-col items-start gap-5">
            <ScrollReveal direction="down" delay={40} distance={15}>
              <Label dark>Développeurs</Label>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={100} distance={22}>
              <h1 className="font-jura font-bold text-[34px] sm:text-[46px] leading-[110%] text-[#F0F2F2]">
                Documentation{" "}
                <br className="hidden sm:block" />
                de l&apos;API KUSA
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={180} distance={18}>
              <p className="font-roboto font-light text-[16px] sm:text-[17px] leading-[155%] text-[#A1AFBA] max-w-[520px]">
                Encaissez Orange Money, MTN Mobile Money et les cartes en XAF avec une seule intégration REST. Sandbox
                gratuit, webhooks signés, statuts normalisés.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={260} distance={18}>
              <div className="flex flex-col xs:flex-row gap-3 pt-1">
                <a href="#introduction" className="group inline-flex items-center justify-center gap-2 h-[46px] px-6 rounded-full bg-gold text-on-gold font-jura font-bold text-[15px] transition-all hover:brightness-105 active:scale-95">
                  Commencer
                  <Arrow />
                </a>
                <a href="#reference" className="inline-flex items-center justify-center h-[46px] px-6 rounded-full border border-white/20 text-[#F0F2F2] font-jura font-bold text-[15px] transition-all hover:bg-white/10 active:scale-95">
                  Référence API
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={320} distance={14}>
              <p className="font-mono text-[13.5px] text-[#8896A4] pt-1 break-all">
                URL de base · <span className="text-[#CED6DB]">{API_BASE}</span>
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="left" delay={200} distance={30} duration={750} className="hidden lg:block min-w-0">
            <CodeWindow title="POST /v1/payments" samples={CREATE_PAYMENT} />
          </ScrollReveal>
        </div>
      </section>

      {/* Explore the documentation */}
      <section aria-labelledby="explorer-h" className="bg-surface border-b border-line-2">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 py-10 sm:py-12">
          <h2 id="explorer-h" className="font-jura font-bold text-[16px] text-forest mb-5">
            Explorer la documentation
          </h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {EXPLORE.map((e, i) => (
              <li key={e.href}>
                <ScrollReveal direction="up" delay={60 + i * 70} distance={16} className="h-full">
                  <a href={e.href} className="group h-full flex flex-col gap-1.5 sm:gap-2 p-4 sm:p-5 rounded-[16px] bg-cream transition-all duration-300 hover:-translate-y-1 hover:bg-surface-2">
                    <span className="font-roboto font-bold text-[16px] text-forest flex items-center gap-1.5">
                      {e.title}
                      <Arrow />
                    </span>
                    <span className="font-jura font-bold text-[14.5px] leading-[150%] text-slate">{e.text}</span>
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

              <div
                className="cta-card mt-4 rounded-[22px] p-7 sm:p-9 flex flex-col md:flex-row md:items-center justify-between gap-5"
                style={{ background: "linear-gradient(180deg, #07382D 0%, #063537 63.94%, #032D4E 100%)" }}
              >
                <div className="flex flex-col gap-1.5">
                  <p className="font-junge text-[24px] leading-[120%] text-[#F3F4F1]">Prêt à intégrer ?</p>
                  <p className="font-inter text-[14.5px] text-[#A9BDBA]">
                    Ouvrez un compte pour obtenir vos clés de test, ou écrivez à{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline underline-offset-4 decoration-gold">
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row gap-3">
                  <Link href="/inscription" className="inline-flex items-center justify-center h-[46px] px-6 rounded-full bg-gold text-on-gold font-jura font-bold text-[14px] transition-all hover:brightness-105 active:scale-95 whitespace-nowrap">
                    Obtenir mes clés
                  </Link>
                  <Link href="/contact?objet=Support%20technique" className="inline-flex items-center justify-center h-[46px] px-6 rounded-full border border-white/25 text-[#F3F4F1] font-jura font-bold text-[14px] transition-all hover:bg-white/10 active:scale-95 whitespace-nowrap">
                    Support technique
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
