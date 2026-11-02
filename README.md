# KUSA — site et espace marchand

Agrégateur de paiement pour les commerces du Cameroun (Orange Money, MTN MoMo, cartes, en XAF).
Architecture calquée sur la logique de jeko.africa, demandée par Freemo. Le contexte produit est dans [PRODUCT.md](PRODUCT.md).

## Pages

| Route | Rôle |
| --- | --- |
| `/` | Accueil : solutions comparées, démo de lien de paiement, secteurs, étapes, partenaires, tarifs, FAQ |
| `/solutions/liens-de-paiement` · `/paiement-en-boutique` · `/paiement-en-ligne` | Une page par solution |
| `/tarifs` | Formules Standard et Grands volumes |
| `/a-propos` | Présentation et statut juridique |
| `/contact` | **Contacter le service** : formulaire envoyé par email (Resend) à contact@kusa.cm. `?objet=Tarifs` pré-remplit l'objet |
| `/inscription` | **Créer un compte avec email + mot de passe** (Supabase Auth) |
| `/connexion` | Connexion, et `?oubli=1` pour le mot de passe oublié |
| `/tableau-de-bord` | Espace marchand protégé par le middleware |
| `/auth/confirm` | Retour des liens email Supabase (confirmation, réinitialisation) |

## Démarrer

```bash
cp .env.example .env.local   # puis remplir les clés
npm install
npm run dev
```

Sans clés, le site fonctionne : les formulaires affichent un message invitant à écrire à contact@kusa.cm.

## Configurer Supabase

1. Créer un projet sur supabase.com, copier l'URL et la clé `anon` dans `.env.local`.
2. Authentication > Providers > Email : activé, avec « Confirm email » au choix. Si la confirmation est désactivée, l'inscription connecte directement.
3. Authentication > URL Configuration : ajouter `https://<votre-domaine>/auth/confirm` aux Redirect URLs.
4. Les modèles d'email par défaut fonctionnent (flux PKCE : le lien revient sur `/auth/confirm?code=…`). Le lien doit alors être ouvert dans le même navigateur. Pour que le lien marche aussi depuis un autre appareil, remplacer `{{ .ConfirmationURL }}` dans les modèles par
   `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type={{ .Type }}` (le parcours de réinitialisation redirige alors vers le tableau de bord par défaut).

Les infos marchand (nom, activité, type, téléphone) sont enregistrées dans `user_metadata`.

## Configurer l'envoi du formulaire de contact

Créer une clé API sur resend.com, vérifier le domaine `kusa.cm`, puis renseigner `RESEND_API_KEY`, `CONTACT_FROM` et `CONTACT_TO`.

## Déployer sur Vercel

Ajouter les mêmes variables d'environnement dans Vercel > Settings > Environment Variables, puis redéployer.
