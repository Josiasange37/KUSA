# KUSA — Product context

## What it is
KUSA (built by Freemo) is a payment aggregator for businesses in Cameroon / CEMAC. One account lets a business collect money in XAF through Orange Money, MTN Mobile Money and cards (Visa, Mastercard), with PayPal as a partner. KUSA is a technical integrator of official payment APIs — **not** a payment institution or PSP. That disclaimer must stay visible on the site.

## Information architecture (requested by Freemo HR: same logic and architecture as jeko.africa)
- `/` home: hero → products → sectors → how it works → partners → FAQ → final CTA → footer
- `/solutions/paiement-en-ligne` — unified payment API (developers, e-commerce)
- `/solutions/liens-de-paiement` — no-code payment links (WhatsApp, SMS, email)
- `/solutions/paiement-en-boutique` — in-store collection by QR code / phone push *(assumption: to confirm with Freemo — no physical terminal exists)*
- `/tarifs` — no subscription, commission per successful transaction (exact rates communicated at account opening)
- `/a-propos`
- `/contact` — "Contacter le service": demo / sales request form → email to contact@kusa.cm
- `/inscription` — create an account with email + password (Supabase Auth)
- `/connexion` — log in
- `/tableau-de-bord` — protected merchant area (minimal for now)

## Audience
Startups, supermarkets, shops (boutiques), bars, hotels, restaurants, freelancers, e-commerce. Mostly non-technical owners and managers; developers are a secondary audience.

## Primary action
Open an account (create account with a password). Secondary: contact the service / request a demo.

## Brand (kept from the current kusa-five.vercel.app)
- Forest `#0B3E33` (primary), Gold `#DBAE40` (accent), Cream `#F6F4EE` (ground), Navy `#0D1B2A` (ink)
- Plus Jakarta Sans (headings), Inter (text)
- Language: French

## Proof policy
No invented customers, testimonials, logos or business statistics. Partner logos (Orange, MTN, Visa, Mastercard, PayPal) are the only proof shown, as on the current site.
