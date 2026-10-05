# KUSA — Product Design & UX Notebook
**Auteur** : Lead Product Designer & Senior Fullstack Engineer  
**Version** : 1.0.0 — Production Ready  
**Date** : Septembre 2026  
**Identité de Marque** : [kusa.cm](https://kusa.cm/) — *« ENCAISSER, SIMPLEMENT. »*

---

## Sommaire
1. [Vision Produit & Philosophie d'Expérience](#1-vision-produit--philosophie-dexpérience)
2. [Design Tokens & Système Visuel KUSA](#2-design-tokens--système-visuel-kusa)
3. [Personas & Cartographie des Parcours Utilisateurs](#3-personas--cartographie-des-parcours-utilisateurs)
4. [Architecture de l'Information (Sitemap & Navigation)](#4-architecture-de-linformation-sitemap--navigation)
5. [Spécifications Écran par Écran](#5-spécifications-écran-par-écran)
   - [5.1 Onboarding & KYB Entreprise (Progressive Disclosure)](#51-onboarding--kyb-entreprise)
   - [5.2 Espace Développeur & Clés API](#52-espace-développeur--clés-api)
   - [5.3 Tableau de Bord Multi-Pays & Multi-Devises (12 Pays)](#53-tableau-de-bord-multi-pays--multi-devises)
   - [5.4 Moteur de Liens de Paiement (No-Code Payment Links)](#54-moteur-de-liens-de-paiement)
   - [5.5 Checkout Widget & Modal de Paiement Mobile Money / Cartes](#55-checkout-widget--modal-de-paiement)
6. [États d'Interface, Micro-Interactions & Gestion des Erreurs](#6-états-dinterface-micro-interactions--gestion-des-erreurs)
7. [Normes d'Accessibilité (WCAG 2.1 AA) & Performance Frontend](#7-normes-daccessibilité-wcag-21-aa--performance-frontend)

---

## 1. Vision Produit & Philosophie d'Expérience

### 1.1 La Promesse KUSA
En Afrique, le paiement numérique est fragmenté, anxiogène et complexe. Entre les délais d'affichage des prompts USSD, les échecs de connexion réseau et la méfiance des acheteurs, chaque seconde compte.  
KUSA apporte :
- **Pour le Développeur** : Intégration en moins de 15 minutes, clés instantanées en Sandbox, documentation interactive limpide et simulateur réaliste.
- **Pour l'Entreprise / Dirigeant** : Visibilité totale sur 12 pays et devises (XAF, XOF, CDF), réconciliation automatique sans tableur Excel, et reversements prévisibles.
- **Pour le Consommateur Final** : Un widget de paiement rassurant, ultra-rapide (3 clics maximum), aux couleurs institutionnelles africaines modernes, avec retour visuel en temps réel sur la saisie de son code secret USSD.

### 1.2 Principes de Design Directeurs
1. **L'Ancrage Noble & Rassurant** : Mariage du vert forêt profond (`#0E3B33`) et de l'or africain (`#D4AF37`) pour inspirer la solidité d'une grande institution financière tout en célébrant l'identité continentale.
2. **La Clarté Radicale (Zero Cognitive Friction)** : Aucun jargon bancaire inutile. Les statuts sont explicites : *« Confirmé »*, *« En attente du code PIN »*, *« Expiré »*.
3. **Le Mode Développeur Sans Barrière** : Inscription $\to$ Clés de test immédiates $\to$ Premier paiement simulé avant même d'avoir uploadé le premier document juridique.
4. **La Sérénité Financière** : Distinction transparente entre le *Solde Disponible* (retirable immédiatement), le *Solde en Cours de Compensation (Clearing T+1)* et la *Réserve de Garantie*.

---

## 2. Design Tokens & Système Visuel KUSA

### 2.1 Palette Chromatique Officielle

```css
:root {
  /* Couleurs Fondatrices KUSA */
  --kusa-forest: #0E3B33;       /* Vert Forêt profond : Couleur Primaire, Navbar, Headings */
  --kusa-navy: #0D1B2A;         /* Bleu Nuit / Midnight : Surfaces sombres, Sidebar, Textes dominants */
  --kusa-gold: #D4AF37;         /* Or Africain : Monnaie, Boutons CTA d'accent, Badges d'alerte positive */
  --kusa-gold-hover: #BF9B2F;   /* Or Hover */
  --kusa-cream: #F6F4EE;        /* Blanc Cassé / Crème : Fond d'application, cartes douces */
  --kusa-sage: #4E7C6B;         /* Vert Sauge : Statuts de succès, progression, graphiques */
  --kusa-sage-light: #EBF4F0;   /* Fond d'accent succès */
  
  /* Nuances Fonctionnelles */
  --kusa-white: #FFFFFF;
  --kusa-card-bg: #FFFFFF;
  --kusa-border: #E5E7EB;
  --kusa-border-subtle: #EDECE6;
  --kusa-text-primary: #0D1B2A;
  --kusa-text-secondary: #4B5563;
  --kusa-text-muted: #9CA3AF;
  
  /* Statuts Métier */
  --kusa-status-success: #15803D;
  --kusa-status-success-bg: #DCFCE7;
  --kusa-status-pending: #B45309;
  --kusa-status-pending-bg: #FEF3C7;
  --kusa-status-failed: #B91C1C;
  --kusa-status-failed-bg: #FEE2E2;
}
```

### 2.2 Typographie & Rythme Vertical
- **Police Primaire (Interface & Chiffres)** : `Plus Jakarta Sans` ou `Inter` (sans-serif géométrique moderne, excellente lisibilité des tables financières).
- **Police d'Accent / Code** : `JetBrains Mono` ou `Fira Code` pour les clés API (`pk_live_...`), les montants JSON, les IDs de transaction et les headers HTTP.
- **Échelle Typographique** :
  - `Display / H1` : 32px / line-height 40px (Gras 700)
  - `H2` : 24px / line-height 32px (Semi-bold 600)
  - `H3` : 18px / line-height 26px (Semi-bold 600)
  - `Body Regular` : 14px / line-height 20px (Regular 400 & Medium 500)
  - `Caption / Micro` : 12px / line-height 16px (Medium 500)
  - `Stat Metric Number` : 28px / line-height 36px (Extrabold 800 tabular-nums)

### 2.3 Motifs Graphiques Africains (Heritage Pattern)
Un bandeau géométrique discret (inspiré des tissages traditionnels et de la lettre **K** stylisée du logo KUSA) est appliqué en filigrane :
- En bordure supérieure du Header et du Checkout Widget.
- En filigrane SVG opacité 5% dans les en-têtes de cartes financières.
- Symbolique : *« Héritage, confiance, ancrage africain »*.

---

## 3. Personas & Cartographie des Parcours Utilisateurs

### 3.1 Persona 1 : Kwame — Lead Développeur E-commerce (Douala, Cameroun)
- **Objectif** : Intégrer Orange Money et MTN MoMo sur sa boutique Next.js en moins d'une après-midi.
- **Pain point** : La documentation des opérateurs telcos est souvent obsolète, avec des environnements de test instables et sans webhooks fiables.
- **Attente KUSA** : Ouvrir un compte en 30 secondes, copier `pk_test_...` et `sk_test_...`, tester un paiement de 5 000 XAF avec le simulateur, et recevoir le webhook localement.

### 3.2 Persona 2 : Aminata — Directrice Financière SaaS Panafricain (Abidjan & Dakar)
- **Objectif** : Piloter les encaissements en Côte d'Ivoire (Wave, Orange, Moov), au Sénégal et au Cameroun, et effectuer des reversements hebdomadaires vers la banque de la société.
- **Pain point** : Télécharger 6 relevés Excel différents chaque lundi matin pour savoir où sont les fonds.
- **Attente KUSA** : Un dashboard unique, des métriques consolidées en XAF/XOF, un relevé comptable exportable conforme OHADA, et un bouton *« Demander un virement bancaire »*.

### 3.3 Persona 3 : Moussa — Acheteur Smartphone sur un site marchand
- **Objectif** : Payer son billet ou son article à 15 000 XAF avec son téléphone Orange Money ou MTN.
- **Pain point** : Ne pas savoir s'il doit taper un code USSD ou attendre un SMS, peur d'être débité deux fois.
- **Attente KUSA** : Une page de paiement épurée avec son logo d'opérateur, qui lui dit : *« Regardez votre écran mobile, un prompt USSD apparaît pour saisir votre code secret dans les 60 secondes »*.

---

## 4. Architecture de l'Information (Sitemap & Navigation)

```
[Portail KUSA]
  ├── Espace Public
  │     ├── Landing Page (kusa.cm)
  │     ├── Documentation Développeur Interactive (/docs)
  │     └── Connexion / Inscription (/login, /register)
  │
  ├── Dashboard Marchand (Privé & Multi-Tenant)
  │     ├── En-tête : Switcher d'Environnement [● Sandbox / Live] + Switcher d'Organisation
  │     ├── 📊 Vue d'Ensemble (GMV, Transactions du jour, Taux de succès, Balance)
  │     ├── 💳 Transactions (Recherche temps réel, filtres 12 pays, détails & timeline d'événements)
  │     ├── 🔗 Liens de Paiement (Générateur sans code, partage WhatsApp/QR, stats de clics)
  │     ├── 💰 Soldes & Payouts (Solde disponible, en attente, historique des virements bancaires/MoMo)
  │     ├── ⚙️ Espace Développeurs (Clés API, Configuration Webhooks, Logs d'appels en direct)
  │     └── 🛡️ Conformité & KYB (Statut du compte, soumission des pièces d'entreprise, historique)
  │
  ├── Widget Hébergé (Client-facing)
  │     └── Checkout Page (/pay/:payment_link_id ou session modale intégrée)
  │
  └── Back-Office Super-Admin KUSA (Interne)
        ├── File de Revue KYB (Validation RCCM, NIU, CNI dirigeants)
        ├── Monitoring des Passerelles Telcos (Disponibilité temps réel des 12 pays)
        └── Grand Livre Global & Rapprochement Bancaire
```

---

## 5. Spécifications Écran par Écran

---

### 5.1 Onboarding & KYB Entreprise

#### Philosophie : Le principe de la Découverte Progressive (Progressive Disclosure)
1. **Étape 0 (Zero-Friction Registration)** :  
   - Formulaire minimal : Prénom, Nom, Nom de l'entreprise, Email professionnel, Mot de passe.  
   - Validation de l'email via code à 6 chiffres instantané.  
   - **Résultat immédiat** : Redirection vers le Dashboard KUSA en **Mode Sandbox activé par défaut**. Les clés `pk_test_...` et `sk_test_...` sont déjà prêtes.
2. **Bannière d'Activation Live** :  
   - Une bannière discrète mais percutante en haut du Dashboard :  
     *« Vous êtes en environnement Sandbox. Pour encaisser des paiements réels dans les 12 pays, complétez votre dossier d'immatriculation d'entreprise (KYB). »* [Bouton : Activer la Production].
3. **Le Formulaire KYB Guidé (Wizard en 4 Étapes)** :
   - **Étape 1 : Identité Légale de la Société** :
     - Forme juridique (SARL, SA, SAS, SASU, ETS).
     - Raison sociale exacte & Sigle commercial.
     - Numéro RCCM (Registre du Commerce et du Crédit Mobilier).
     - Numéro NIU / NIF (Identifiant Fiscal Unique).
     - Pays de domiciliation juridique (Sélecteur parmi les pays CEMAC & UEMOA/RDC).
     - Adresse physique du siège social & Site web ou page vitrine.
   - **Étape 2 : Pièces Officielles (Dropzone Drag & Drop sécurisé)** :
     - Extrait du Registre de Commerce (RCCM datant de moins de 3 mois).
     - Attestation d'Immatriculation Fiscale (NIU).
     - Statuts de la Société signés.
     - Justificatif d'adresse / Contrat de bail ou facture de service public.
     - *Feedback immédiat* : Contrôle d'extension (PDF, PNG, JPG), prévisualisation miniature, chiffrement local avant upload.
   - **Étape 3 : Représentant Légal & Bénéficiaires Effectifs (UBO)** :
     - Nom, Prénom, Date de naissance, Nationalité du gérant.
     - Upload de la Pièce d'Identité (CNI recto-verso ou Passeport en cours de validité).
     - Prise de photo liveness / selfie de vérification du dirigeant.
   - **Étape 4 : Compte de Règlement (Payout Account)** :
     - Choix du compte de réception des fonds :
       - Virement Bancaire (Relevé d'Identité Bancaire officiel au nom de la société : IBAN/RIB, Nom de la banque, Code BIC/SWIFT).
       - Ou Compte Marchand B2B Mobile Money certifié.
4. **État de Traitement & SLA** :
   - Statut visuel : `Dossier en cours d'examen (SLA : moins de 24h ouvrées)`.
   - Pendant ce temps, le marchand peut coder et tester 100% de son intégration en Sandbox.
   - Dès validation par l'équipe conformité : Notification par email + SMS, déblocage du sélecteur `[Production]` et génération des clés `pk_live_...` et `sk_live_...`.

---

### 5.2 Espace Développeur & Clés API

#### Composants Clés :
1. **Bascule d'Environnement Haute Visibilité** :
   - Toggle distinctif : `Mode Test (Orange / Vert Sauge)` vs `Mode Production (Vert Forêt / Or)`.
   - Empêche toute confusion accidentelle entre clés de test et d'argent réel.
2. **Bloc des Paires de Clés d'API** :
   - **Clé Publique (`pk_live_...` ou `pk_test_...`)** :
     - Utilisable dans les SDKs web/mobiles ou les boutons de paiement.
     - Affichée en clair avec bouton de copie en 1 clic et feedback tooltip *« Copié ! »*.
   - **Clé Secrète (`sk_live_...` ou `sk_test_...`)** :
     - Strictement confidentielle (appel serveur à serveur uniquement).
     - Masquée par défaut sous la forme `sk_live_••••••••••••••••3a8f`.
     - Bouton de révélation soumis au mot de passe de session ou 2FA.
     - Bouton **« Régénérer la clé secrète » (Rotation)** :
       - Ouvre une modal explicative : *« Période de grâce de 24h où l'ancienne et la nouvelle clé fonctionnent en parallèle pour éviter toute coupure de vos encaissements. »*
3. **Gestionnaire de Webhooks** :
   - Champ de saisie de l'URL de notification (ex: `https://api.monsite.cm/api/kusa-webhook`).
   - Générateur de Secret de Signature Webhook (`whsec_...`) pour valider l'en-tête `X-Kusa-Signature` en HMAC-SHA256.
   - Bouton **« Envoyer un événement de test »** :
     - Permet d'envoyer instantanément un payload fictif `payment.successful` à l'URL du marchand avec affichage immédiat de la réponse HTTP reçue (code 200, 500, temps de réponse en ms).
4. **Console d'Inspection des Logs API en Direct (Live Request Logs)** :
   - Table dynamique avec polling SSE/WebSocket :
     - Méthode HTTP (`POST`), Endpoint (`/v1/payments`), Statut HTTP (`200 OK`, `400 Bad Request`), Durée d'exécution (ex: `124ms`), Horodatage.
   - Volet latéral rétractable (Slide-over drawer) :
     - En cliquant sur une requête : affichage complet des Headers, du Payload JSON envoyé, et de la réponse retournée par KUSA.

---

### 5.3 Tableau de Bord Multi-Pays & Multi-Devises (12 Pays)

#### Structure du Dashboard Principal :
1. **Sélecteur de Portée Géographique (Country Scope Bar)** :
   - Sélecteur rapide : `🌍 Tous les 12 Pays (Agrégé)` ou filtrage par pays spécifique :
     - **Zone CEMAC (XAF)** : 🇨🇲 Cameroun, 🇬🇦 Gabon, 🇨🇬 Congo, 🇹🇩 Tchad, 🇨🇫 RCA, 🇬🇶 Guinée Éq.
     - **Zone UEMOA / RDC (XOF / CDF)** : 🇨🇮 Côte d'Ivoire, 🇸🇳 Sénégal, 🇧🇯 Bénin, 🇹🇬 Togo, 🇧🇫 Burkina Faso, 🇨🇩 RDC.
2. **Cartes d'Indicateurs Financiers Clés (KPI Cards)** :
   - **Volume Total Encaissé (GMV)** : Ex: `48 750 000 XAF` (+14.2% vs 30 derniers jours).
   - **Taux de Succès Global** : Ex: `96.8%` (Indicateur de santé des liaisons telcos).
   - **Panier Moyen** : Ex: `18 500 XAF`.
   - **Solde Disponible KUSA** : Ex: `12 400 000 XAF` [Bouton d'action : *Demander un Payout*].
   - **Solde en Attente (Clearing)** : Ex: `3 150 000 XAF` (Libéré à J+1).
   - **Réserve de Garantie** : Ex: `800 000 XAF` (Garantie litiges 5%).
3. **Graphique de Répartition des Encaissements** :
   - Graphique linéaire : Évolution journalière des encaissements par devise.
   - Graphique en anneau : Répartition par canal :
     - Orange Money (42%)
     - MTN MoMo (38%)
     - Wave (12%)
     - Cartes Visa / Mastercard (5%)
     - Autres opérateurs telcos (3%)
4. **Table des Transactions Temps Réel** :
   - Colonnes :
     - **Référence KUSA** (`tx_98f1a23c`) & Référence Marchand.
     - **Montant & Devise** (ex: `25 000 XAF`).
     - **Canal & Pays** : Badge avec drapeau + logo (🇨🇲 Orange Money, 🇨🇮 Wave, 💳 Visa).
     - **Client** (Numéro de téléphone masqué `+237 690 ••• •12` ou Nom du titulaire).
     - **Statut** : Badge coloré (`Réussi`, `En attente`, `Échoué`, `Remboursé`).
     - **Date & Heure** (ex: `Aujourd'hui à 14:32`).
     - **Action** : Voir le reçu, initier un remboursement partiel/total.

---

### 5.4 Moteur de Liens de Paiement (No-Code Payment Links)

#### Objectif : Permettre aux commerçants et PME de vendre sans aucune ligne de code.
1. **Modal de Création d'un Lien** :
   - Titre du produit / service (ex: *« Formation Marketing Digital »* ou *« Facture Client #1042 »*).
   - Description optionnelle.
   - Type de montant : **Montant Fixe** (ex: 20 000 XAF) ou **Montant Libre** (le client choisit combien il verse, idéal pour dons ou factures sur-mesure).
   - Devise autorisée : XAF, XOF, ou Multi-devises automatique selon le pays du client.
   - Personnalisation : Image du produit, redirection post-paiement vers le site du vendeur ou son WhatsApp.
   - Limite d'utilisation : Lien réutilisable à l'infini ou à usage unique (se désactive après 1 paiement).
2. **Partage Express & Multicanal** :
   - URL courte générée : `https://pay.kusa.cm/l/kusa_edu_2026`.
   - Boutons de partage direct :
     - Bouton vert **Partager sur WhatsApp** avec message pré-rempli : *« Bonjour ! Voici votre lien de paiement sécurisé KUSA pour finaliser votre commande : ... »*.
     - Bouton **Copier le lien**.
     - Bouton **Générer le QR Code** (téléchargeable pour impression sur facture papier ou comptoir physique).

---

### 5.5 Checkout Widget & Modal de Paiement (Mobile Money / Cartes)

#### L'Expérience Client Ultime (Le « 3-Tap Checkout » KUSA) :
Le composant est pensé en priorité pour un smartphone (90% du trafic d'achat en Afrique).

```
┌────────────────────────────────────────────────────────┐
│  KUSA  [Motif Africain Subtil en En-tête]   🔒 Sécurisé│
├────────────────────────────────────────────────────────┤
│  Marchand : Afritech Solutions SARL                    │
│  Total à payer : 15 000 XAF                            │
│  Réf : CMD-8921                                        │
├────────────────────────────────────────────────────────┤
│  Choisissez votre moyen de paiement :                  │
│                                                        │
│  [🔘] 🇨🇲 Orange Money          (USSD Push instantané)   │
│  [⚪] 🇨🇲 MTN Mobile Money      (USSD Push instantané)   │
│  [⚪] 🇨🇮 Wave                  (Paiement en 1 clic)    │
│  [⚪] 💳 Carte Visa / Mastercard (3D Secure 2)         │
├────────────────────────────────────────────────────────┤
│  Numéro de téléphone Orange Money :                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🇨🇲 +237  │  6 99 00 11 22                        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │       [ PAYER 15 000 XAF AVEC ORANGE MONEY ]      │  │
│  └──────────────────────────────────────────────────┘  │
│  🔒 Vos données sont protégées par le protocole KUSA   │
└────────────────────────────────────────────────────────┘
```

#### Écran d'Attente Dynamique USSD (The Waiting Room) :
Dès que l'acheteur clique sur « Payer » :
1. Une animation circulaire élégante aux couleurs KUSA (Or `#D4AF37` et Vert `#0E3B33`) s'enclenche.
2. Message d'instruction dynamique :  
   *« Une notification USSD a été envoyée sur votre téléphone (+237 699•••122). Veuillez taper votre code secret pour valider le paiement. »*
3. Compte à rebours progressif de 90 secondes.
4. Bouton de secours : *« Vous n'avez pas reçu le prompt ? Tapez manuellement #150# (Orange) ou *126# (MTN) »*.
5. Dès que le webhook ou le poller confirme la transaction :  
   - Transition instantanée vers un grand cercle vert sauge (`#4E7C6B`) avec icône de coche dorée.
   - Message : *« Paiement Confirmé ! Votre reçu a été envoyé par SMS. Redirection en cours... »*.

---

## 6. États d'Interface, Micro-Interactions & Gestion des Erreurs

### 6.1 Matrice des États par Composant

| Composant | État Normal (Default) | Au Survol (Hover) | Clic / Actif (Active) | En Chargement (Loading) | En Erreur (Error) |
|---|---|---|---|---|---|
| **Bouton Primaire KUSA** | Fond `#0E3B33`, Texte `#FFFFFF`, Rayon 8px | Fond `#0D1B2A`, Bordure `#D4AF37` 1px | Scale 0.98, Opacité 90% | Spinner or `#D4AF37`, texte masqué | Bordure rouge `#B91C1C`, shake animation |
| **Bouton Accent Or** | Fond `#D4AF37`, Texte `#0D1B2A` gras | Fond `#BF9B2F`, Ombre dorée légère | Scale 0.98 | Spinner blanc cassé | Désactivé opacité 50% |
| **Champ de Saisie** | Bordure `#E5E7EB`, Fond `#FFFFFF` | Bordure `#4E7C6B` | Ring 2px `#0E3B33` | Squelette d'animation pulsée | Bordure rouge `#B91C1C`, message d'aide |
| **Badge Statut** | Fond teinté doux (ex: `#DCFCE7`) | Opacité 90% | - | Icône de chargement animée | Fond rouge clair `#FEE2E2` |

### 6.2 Résolution UX des Cas Critiques du Skeptic Agent
1. **Paiement tardif après expiration (« Ghost Payment »)** :  
   - Si le client a payé après le timeout de la session, l'écran de checkout affiche un statut d'attention bienveillant :  
     *« Votre paiement de 15 000 XAF a bien été validé par l'opérateur après le délai d'attente initial. Votre commande #CMD-8921 a été automatiquement mise à jour et validée ! »* (Zéro panique client, support désengorgé).
2. **Indisponibilité temporaire d'un opérateur Telco** :  
   - Si l'API MTN MoMo d'un pays est temporairement en panne, le widget KUSA grise automatiquement l'option avec un badge discret *« Maintenance opérateur en cours »* et suggère automatiquement les alternatives disponibles (Orange Money, Carte bancaire).

---

## 7. Normes d'Accessibilité (WCAG 2.1 AA) & Performance Frontend

### 7.1 Règles d'Accessibilité Intégrées
- **Ratio de Contraste** :
  - Texte `#0E3B33` sur fond `#F6F4EE` : Ratio **9.8:1** (Largement supérieur au seuil WCAG AAA de 7:1).
  - Bouton Or `#D4AF37` avec texte `#0D1B2A` : Ratio **8.2:1** (Conforme AAA).
- **Navigation au Clavier** : Tous les éléments interactifs possèdent un état `:focus-visible` avec outline 2px or `#D4AF37`.
- **Lecteurs d'Écran** : Utilisation d'attributs `aria-live="polite"` pour annoncer le changement d'état lors du push USSD sans recharger la page.

### 7.2 Performance & Poids du Bundle
- **Taille cible du Checkout Widget** : $< 45$ Ko gzippé pour s'exécuter de façon fluide sur les connexions mobiles 3G africaines.
- **Rendu Hybride** : Dashboard en Server Components (Next.js 15 App Router) pour un affichage instantané des tables de données.
