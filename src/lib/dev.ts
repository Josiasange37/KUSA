/* Exemples de l'API KUSA affichés sur le site et dans la documentation.
   À CONFIRMER avec l'équipe technique Freemo avant mise en production :
   URL de base, noms de champs et en-tête de signature. */

export const API_BASE = "https://api.kusa.africa/v1";

export type Sample = { label: string; code: string };

export const CREATE_PAYMENT: Sample[] = [
  {
    label: "cURL",
    code: `curl -X POST ${API_BASE}/payments \\
  -H "Authorization: Bearer kusa_test_4eC39HqLyjWDarjtT1zdp7dc" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 15000,
    "currency": "XAF",
    "channel": "orange_money",
    "customer": { "phone": "+237690000000" },
    "reference": "CMD-8921",
    "callback_url": "https://votre-site.cm/webhook"
  }'`,
  },
  {
    label: "Node.js",
    code: `const res = await fetch("${API_BASE}/payments", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.KUSA_SECRET_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 15000,
    currency: "XAF",
    channel: "orange_money",
    customer: { phone: "+237690000000" },
    reference: "CMD-8921",
    callback_url: "https://votre-site.cm/webhook",
  }),
});
const payment = await res.json();`,
  },
  {
    label: "PHP",
    code: `$ch = curl_init("${API_BASE}/payments");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer " . getenv("KUSA_SECRET_KEY"),
    "Content-Type: application/json",
  ],
  CURLOPT_POSTFIELDS => json_encode([
    "amount" => 15000,
    "currency" => "XAF",
    "channel" => "orange_money",
    "customer" => ["phone" => "+237690000000"],
    "reference" => "CMD-8921",
    "callback_url" => "https://votre-site.cm/webhook",
  ]),
]);
$payment = json_decode(curl_exec($ch), true);`,
  },
  {
    label: "Python",
    code: `import os, requests

payment = requests.post(
    "${API_BASE}/payments",
    headers={"Authorization": f"Bearer {os.environ['KUSA_SECRET_KEY']}"},
    json={
        "amount": 15000,
        "currency": "XAF",
        "channel": "orange_money",
        "customer": {"phone": "+237690000000"},
        "reference": "CMD-8921",
        "callback_url": "https://votre-site.cm/webhook",
    },
).json()`,
  },
];

export const CREATE_PAYMENT_RESPONSE = `{
  "id": "pay_01HZX4K8",
  "status": "pending",
  "amount": 15000,
  "currency": "XAF",
  "channel": "orange_money",
  "reference": "CMD-8921",
  "created_at": "2026-11-02T09:14:05Z"
}`;

export const CREATE_LINK: Sample[] = [
  {
    label: "cURL",
    code: `curl -X POST ${API_BASE}/payment-links \\
  -H "Authorization: Bearer kusa_test_4eC39HqLyjWDarjtT1zdp7dc" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 45000,
    "currency": "XAF",
    "label": "Acompte chambre 12, 14-16 nov.",
    "expires_at": "2026-11-10T23:59:00Z"
  }'`,
  },
  {
    label: "Node.js",
    code: `const link = await fetch("${API_BASE}/payment-links", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.KUSA_SECRET_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 45000,
    currency: "XAF",
    label: "Acompte chambre 12, 14-16 nov.",
  }),
}).then((r) => r.json());

console.log(link.url); // à envoyer par WhatsApp ou SMS`,
  },
];

export const CREATE_LINK_RESPONSE = `{
  "id": "plink_7Q2M",
  "url": "https://pay.kusa.africa/l/7Q2M",
  "status": "active",
  "amount": 45000,
  "currency": "XAF"
}`;

export const WEBHOOK_PAYLOAD = `POST /webhook HTTP/1.1
KUSA-Signature: t=1793611200,v1=5257a869e7ecebeda32a…
Content-Type: application/json

{
  "event": "payment.succeeded",
  "data": {
    "id": "pay_01HZX4K8",
    "status": "success",
    "amount": 15000,
    "currency": "XAF",
    "reference": "CMD-8921"
  }
}`;

export const VERIFY_WEBHOOK: Sample[] = [
  {
    label: "Node.js",
    code: `import crypto from "node:crypto";

// rawBody : le corps brut de la requête, avant JSON.parse
export function verify(rawBody, header, secret) {
  const { t, v1 } = Object.fromEntries(
    header.split(",").map((p) => p.split("="))
  );
  const expected = crypto
    .createHmac("sha256", secret)
    .update(\`\${t}.\${rawBody}\`)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expected));
}`,
  },
  {
    label: "PHP",
    code: `function kusa_verify(string $rawBody, string $header, string $secret): bool {
  parse_str(str_replace(",", "&", $header), $p);
  $expected = hash_hmac("sha256", $p["t"] . "." . $rawBody, $secret);
  return hash_equals($expected, $p["v1"]);
}`,
  },
  {
    label: "Python",
    code: `import hmac, hashlib

def verify(raw_body: bytes, header: str, secret: str) -> bool:
    parts = dict(p.split("=", 1) for p in header.split(","))
    signed = f"{parts['t']}.".encode() + raw_body
    expected = hmac.new(secret.encode(), signed, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, parts["v1"])`,
  },
];

export const ENDPOINTS: { method: "GET" | "POST"; path: string; desc: string }[] = [
  { method: "POST", path: "/payments", desc: "Créer un paiement (Orange Money, MTN MoMo, carte)" },
  { method: "GET", path: "/payments/{id}", desc: "Lire un paiement et son statut" },
  { method: "GET", path: "/payments", desc: "Lister les paiements, filtrés par date ou statut" },
  { method: "POST", path: "/payment-links", desc: "Créer un lien de paiement" },
  { method: "GET", path: "/payment-links/{id}", desc: "Lire un lien et ses paiements" },
  { method: "POST", path: "/payment-links/{id}/disable", desc: "Désactiver un lien" },
  { method: "GET", path: "/balance", desc: "Solde encaissé, par moyen de paiement" },
];

export const ERRORS: { code: string; http: number; desc: string }[] = [
  { code: "invalid_request", http: 400, desc: "Champ manquant ou mal formé. Le champ en cause est indiqué dans « param »." },
  { code: "unauthorized", http: 401, desc: "Clé absente, invalide ou d'un autre environnement." },
  { code: "not_found", http: 404, desc: "L'objet demandé n'existe pas pour ce compte." },
  { code: "duplicate_reference", http: 409, desc: "Un paiement porte déjà cette « reference ». Réutilisez-le au lieu d'en créer un autre." },
  { code: "channel_unavailable", http: 422, desc: "Le moyen de paiement n'est pas activé sur votre compte." },
  { code: "rate_limited", http: 429, desc: "Trop de requêtes. Réessayez après le délai indiqué dans « Retry-After »." },
];
