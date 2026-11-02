/* Contenu partagé du site KUSA.
   Les éléments marqués « À CONFIRMER » sont des hypothèses à valider par Freemo avant mise en ligne. */

export const CONTACT_EMAIL = "contact@kusa.cm";

export type Solution = {
  slug: string;
  name: string;
  menu: string;
  title: [string, string];
  intro: string;
  forWho: string;
  needs: string;
  where: string;
  setup: string;
  steps: { t: string; d: string }[];
  uses: { t: string; d: string }[];
  image: { src: string; alt: string; caption: string };
  band: { src: string; alt: string; line: string; where: string };
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "liens-de-paiement",
    name: "Liens de paiement",
    menu: "Un lien à envoyer par WhatsApp, SMS ou email. Sans site web.",
    title: ["Un lien,", "un paiement."],
    intro:
      "Un lien avec montant et motif, envoyé par WhatsApp, SMS ou email. Votre client paie par Orange Money, MTN MoMo ou carte. Sans site, sans code.",
    forWho: "Boutiques, hôtels, indépendants, vente sur WhatsApp",
    needs: "Un compte KUSA et un téléphone",
    where: "Sur son téléphone, où qu'il soit",
    setup: "Aucun développement",
    steps: [
      { t: "Créez le lien", d: "Montant fixe ou libre, motif, nom du commerce. Le lien est prêt aussitôt." },
      { t: "Partagez-le", d: "Par WhatsApp, SMS, email ou sur vos réseaux sociaux." },
      { t: "Votre client paie", d: "Il ouvre le lien, choisit son moyen de paiement et valide." },
      { t: "Vous suivez", d: "Chaque paiement s'affiche : réussi, en attente ou échoué." },
    ],
    uses: [
      { t: "Acompte de réservation", d: "Un hôtel envoie le lien de l'acompte au moment où le client réserve par téléphone." },
      { t: "Commande WhatsApp", d: "Une boutique encaisse la commande avant de lancer la livraison." },
      { t: "Facture d'un prestataire", d: "Un indépendant joint le lien à sa facture pour être payé plus vite." },
    ],
    image: {
      src: "/images/usecase-retail-photo.jpg",
      alt: "Une commerçante en boutique tend un téléphone à une cliente pour le paiement",
      caption: "Paiement au comptoir d'une boutique de vêtements",
    },
    band: {
      src: "/images/quartier-bonadibong-douala-01.jpg",
      alt: "Immeubles du quartier Bonadibong à Douala sous un ciel bleu",
      line: "Votre client est à l'autre bout de la ville. Le lien arrive en une seconde.",
      where: "Quartier Bonadibong, Douala",
    },
  },
  {
    slug: "paiement-en-boutique",
    name: "Paiement en boutique",
    menu: "À la caisse : QR code ou demande de paiement sur le téléphone du client.",
    title: ["À la caisse,", "sans monnaie."],
    // À CONFIRMER : mode d'encaissement en point de vente (QR code / demande de paiement Mobile Money).
    intro:
      "Saisissez le montant au comptoir. Le client scanne votre QR code ou reçoit la demande sur son téléphone, puis valide. Fini les problèmes de monnaie.",
    forWho: "Supermarchés, bars, restaurants, pharmacies",
    needs: "Un compte KUSA et le téléphone de la caisse",
    where: "Au comptoir, devant vous",
    setup: "Aucun matériel à acheter",
    steps: [
      { t: "Saisissez le montant", d: "Depuis votre espace KUSA, sur téléphone ou ordinateur." },
      { t: "Le client valide", d: "Il scanne le QR code ou reçoit la demande, puis confirme avec son code." },
      { t: "La caisse est prévenue", d: "Le statut s'affiche en direct : vous savez aussitôt si c'est payé." },
      { t: "Le soir, tout est là", d: "Un seul historique pour tous les moyens de paiement, prêt pour la compta." },
    ],
    uses: [
      { t: "Supermarché", d: "Plusieurs caisses, un seul compte : chaque paiement est rattaché à sa caisse." },
      { t: "Bar et snack", d: "Le client règle l'addition depuis sa table, sans attendre la monnaie." },
      { t: "Pharmacie", d: "Encaissement rapide, reçu et historique pour la comptabilité." },
    ],
    image: {
      src: "/images/vegetable-market-in-douala.jpg",
      alt: "Une enfant marche dans une allée couverte du marché aux légumes de Douala",
      caption: "Marché aux légumes, Douala",
    },
    band: {
      src: "/images/cameroon-market-in-yaounde.jpg",
      alt: "Allée du marché général de Yaoundé, étals de fruits et de légumes",
      line: "Au comptoir, le client a toujours son téléphone. Pas toujours la monnaie.",
      where: "Marché général, Yaoundé",
    },
  },
  {
    slug: "paiement-en-ligne",
    name: "Paiement en ligne",
    menu: "Une API pour votre site ou votre application. Sandbox inclus.",
    title: ["Une API,", "tous les moyens."],
    intro:
      "Une seule intégration pour Orange Money, MTN MoMo et les cartes, sur votre site ou votre app. REST, webhooks signés, sandbox gratuit.",
    forWho: "E-commerce, startups, plateformes, applications",
    needs: "Un développeur et quelques lignes de code",
    where: "Sur votre site ou votre application",
    setup: "Intégration REST, sandbox gratuit",
    steps: [
      { t: "Récupérez vos clés de test", d: "Sandbox ouvert dès la création du compte, sans argent réel." },
      { t: "Créez un paiement", d: "Un POST avec le montant en XAF, le canal et le numéro du client." },
      { t: "Recevez le statut", d: "Un webhook signé vous prévient : pending, success ou failed." },
      { t: "Passez en production", d: "Clés de production après validation de votre dossier." },
    ],
    uses: [
      { t: "Boutique en ligne", d: "Encaissez les commandes de votre site, quel que soit l'opérateur du client." },
      { t: "Abonnements", d: "Facturez un montant fixe chaque mois pour un service ou une formation." },
      { t: "Marketplace", d: "Centralisez les encaissements de tous vos vendeurs sur une seule API." },
    ],
    image: {
      src: "/images/pricing-collaboration.png",
      alt: "Deux personnes travaillent côte à côte sur leurs ordinateurs portables dans un bureau",
      caption: "Une équipe technique intègre l'API KUSA",
    },
    band: {
      src: "/images/quartier-bonadibong-douala-01.jpg",
      alt: "Immeubles du quartier Bonadibong à Douala sous un ciel bleu",
      line: "Vos clients paient avec leur opérateur. Vous recevez un seul statut.",
      where: "Quartier Bonadibong, Douala",
    },
  },
];

export type Sector = { key: string; name: string; text: string; uses: string; img: string; alt: string };

export const SECTORS: Sector[] = [
  {
    key: "supermarches",
    name: "Supermarchés",
    text: "Chaque caisse encaisse Orange Money, MTN MoMo et cartes. La journée dans un seul historique.",
    uses: "Paiement en boutique · rapprochement de fin de journée",
    img: "/images/cameroon-market-in-yaounde.jpg",
    alt: "Étals de fruits et légumes au marché général de Yaoundé",
  },
  {
    key: "boutiques",
    name: "Boutiques",
    text: "Un QR code au comptoir, un lien WhatsApp pour les commandes à distance.",
    uses: "Paiement en boutique · liens de paiement",
    img: "/images/usecase-retail-photo.jpg",
    alt: "Une commerçante encaisse une cliente au comptoir de sa boutique",
  },
  {
    key: "bars",
    name: "Bars et restaurants",
    text: "L'addition se règle sur le téléphone du client. Plus de course à la monnaie.",
    uses: "Paiement en boutique",
    img: "/images/vegetable-market-in-douala.jpg",
    alt: "Allée couverte du marché aux légumes de Douala",
  },
  {
    key: "hotels",
    name: "Hôtels",
    text: "Acompte à la réservation par lien de paiement, solde à la réception. Chaque nuitée est tracée.",
    uses: "Liens de paiement · paiement en boutique",
    img: "/images/quartier-bonadibong-douala-01.jpg",
    alt: "Immeubles du quartier Bonadibong à Douala sous un ciel bleu",
  },
  {
    key: "startups",
    name: "Startups",
    text: "API documentée, sandbox gratuit, webhooks signés : intégré en un après-midi.",
    uses: "Paiement en ligne · API",
    img: "/images/pricing-collaboration.png",
    alt: "Deux personnes travaillent sur ordinateur dans un bureau",
  },
  {
    key: "ecommerce",
    name: "E-commerce",
    text: "Tous les opérateurs sur votre site, chaque commande suivie en direct.",
    uses: "Paiement en ligne · liens de paiement",
    img: "/images/hero-woman-hires.png",
    alt: "Une commerçante souriante montre la confirmation de paiement sur son téléphone",
  },
];

export const BUSINESS_TYPES = [
  "Startup",
  "Supermarché",
  "Boutique",
  "Bar ou snack",
  "Restaurant",
  "Hôtel",
  "E-commerce",
  "Pharmacie",
  "Indépendant",
  "Autre",
];

export const CONTACT_SUBJECTS = ["Demander une démo", "Ouvrir un compte", "Tarifs", "Support technique", "Autre"];

export const FAQ:{ q: string; a: string }[] = [
  {
    q: "Qu'est-ce que KUSA ?",
    a: "Un seul compte pour encaisser Orange Money, MTN MoMo et les cartes en XAF : en boutique, par lien ou en ligne.",
  },
  {
    q: "Qui peut ouvrir un compte ?",
    a: "Toute activité au Cameroun, du snack au supermarché, de l'indépendant à la startup.",
  },
  {
    q: "Comment ouvrir un compte ?",
    a: "Email, mot de passe, description de l'activité. L'équipe KUSA valide ensuite votre dossier pour la production.",
  },
  {
    q: "Faut-il un site web ?",
    a: "Non. Liens de paiement et paiement en boutique marchent depuis votre téléphone.",
  },
  {
    q: "Faut-il un développeur ?",
    a: "Seulement pour l'API. Tout le reste se fait depuis votre espace KUSA.",
  },
  {
    q: "Quels moyens de paiement mes clients peuvent-ils utiliser ?",
    a: "Orange Money, MTN Mobile Money et les cartes Visa et Mastercard. D'autres moyens arrivent.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Compte, sandbox et liens de paiement sont gratuits. Une commission s'applique sur les paiements réussis uniquement ; le taux vous est donné à l'ouverture.",
  },
  {
    q: "Comment suivre mes paiements ?",
    a: "Dans votre tableau de bord, chaque paiement a son statut (réussi, en attente, échoué) et l'historique s'exporte.",
  },
  {
    q: "KUSA est-il une banque ?",
    a: "Non. KUSA intègre les API de paiement officielles ; ce n'est ni un établissement de paiement, ni un PSP.",
  },
  {
    q: "Comment contacter le service ?",
    a: "Via la page Contact ou à contact@kusa.cm. Réponse en français.",
  },
];

export const NAV = [
  { href: "/tarifs", label: "Tarifs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];
