import React, { useState } from "react";
import {
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  RefreshCw,
  Webhook,
  Send,
  Code2,
  Terminal,
  Activity,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface DeveloperPortalViewProps {
  environment: "sandbox" | "live";
}

export const DeveloperPortalView: React.FC<DeveloperPortalViewProps> = ({
  environment,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSecretKey, setShowSecretKey] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(
    "https://api.afritech.cm/v1/kusa-webhooks"
  );
  const [webhookTesting, setWebhookTesting] = useState<boolean>(false);
  const [webhookSuccess, setWebhookSuccess] = useState<boolean | null>(null);
  const [showRotationModal, setShowRotationModal] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const isLive = environment === "live";

  const publicApiKey = isLive
    ? "kusa_pk_live_89f0293da820c7419ef00b1a"
    : "kusa_pk_test_33a1094ba710d5508cd77e2b";

  const secretApiKey = isLive
    ? "kusa_sk_live_99d123847aa8bc641920ee441097fa21"
    : "kusa_sk_test_77c884912bb0ea510842fe310891ca02";

  const webhookSecret = isLive
    ? "kusa_whsec_live_55a90184bced210"
    : "kusa_whsec_test_12f88902acbd991";

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestWebhook = () => {
    setWebhookTesting(true);
    setWebhookSuccess(null);
    setTimeout(() => {
      setWebhookTesting(false);
      setWebhookSuccess(true);
    }, 1200);
  };

  // Mock API Logs
  const mockLogs = [
    {
      id: "req_0192847",
      method: "POST",
      endpoint: "/v1/payments",
      status: 201,
      duration: "142 ms",
      timestamp: "14:48:02",
      requestBody: {
        amount: 15000,
        currency: "XAF",
        channel: "orange_money",
        customer: { phone: "+237699001122" },
        idempotency_key: "idemp_99a8b7c6-1234",
      },
      responseBody: {
        status: "pending_customer_action",
        id: "tx_98f1a23c",
        ussd_message: "Prompt USSD émis avec succès.",
      },
    },
    {
      id: "req_0192846",
      method: "POST",
      endpoint: "/v1/payment-links",
      status: 200,
      duration: "98 ms",
      timestamp: "14:42:15",
      requestBody: {
        title: "Formation Next.js & Fintech",
        amount: 25000,
        currency: "XAF",
      },
      responseBody: {
        url: "https://pay.kusa.cm/l/kusa_edu_2026",
        status: "active",
      },
    },
    {
      id: "req_0192845",
      method: "GET",
      endpoint: "/v1/balances",
      status: 200,
      duration: "45 ms",
      timestamp: "14:30:11",
      requestBody: {},
      responseBody: {
        available: 12400000,
        pending: 3150000,
        currency: "XAF",
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-xl bg-[#0B3E33] text-[#DBAE40] shadow-2xs">
              <Code2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-jura font-bold text-[#0B3E33]">
                Espace Développeurs & Clés API
              </h1>
              <p className="text-xs text-[#78848A]">
                Gérez vos identifiants d'API, vos webhooks signés et inspectez les requêtes en temps réel.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-jura font-bold px-3.5 py-1.5 rounded-full border ${
              isLive
                ? "bg-[#0B3E33] text-[#DBAE40] border-[#DBAE40]/50"
                : "bg-[#EAE6D8] text-[#0B3E33] border-[#DBAE40]/40"
            }`}
          >
            Environnement actif : {isLive ? "Production (Live)" : "Sandbox (Test)"}
          </span>
        </div>
      </div>

      {/* API Keys Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E3E5E2] pb-3 gap-3">
          <div>
            <h2 className="text-sm font-jura font-bold text-[#0B3E33] flex items-center space-x-2">
              <Key className="w-4 h-4 text-[#DBAE40]" />
              <span>Paires de Clés d'API ({isLive ? "Live" : "Test"})</span>
            </h2>
            <p className="text-xs text-[#78848A]">
              La clé publique est utilisable côté client. La clé secrète ne doit JAMAIS être exposée.
            </p>
          </div>

          <button
            onClick={() => setShowRotationModal(true)}
            className="text-xs font-jura font-semibold text-[#0B3E33] hover:text-[#DBAE40] flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[#E3E5E2] hover:border-[#0B3E33] transition-all bg-[#F6F4EE] self-start sm:self-center"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#DBAE40]" />
            <span>Régénérer / Rotation</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Public Key */}
          <div>
            <label className="block text-xs font-jura font-bold text-[#101E29] mb-1">
              Clé Publique (Publishable Key)
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 min-w-0 px-3 py-2 bg-[#F6F4EE]/60 border border-[#E3E5E2] rounded-xl font-mono text-xs text-[#0B3E33] select-all truncate">
                {publicApiKey}
              </div>
              <button
                onClick={() => copyToClipboard(publicApiKey, "public")}
                className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#EAE8E0] text-[#0B3E33] border border-[#E3E5E2] rounded-xl text-xs font-jura font-semibold flex items-center space-x-1.5 transition-colors shrink-0"
              >
                {copiedKey === "public" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#DBAE40]" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secret Key */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Clé Secrète (Secret Key — Authentification Serveur)
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 min-w-0 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-800 flex items-center justify-between gap-2 overflow-hidden">
                <span className="truncate">
                  {showSecretKey
                    ? secretApiKey
                    : secretApiKey.substring(0, 10) + "••••••••••••••••••••••••••••"}
                </span>
                <button
                  onClick={() => setShowSecretKey(!showSecretKey)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  {showSecretKey ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <button
                onClick={() => copyToClipboard(secretApiKey, "secret")}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                {copiedKey === "secret" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Stockée sous chiffrement KMS (AES-256-GCM). Ne la partagez jamais dans un code frontend.
            </p>
          </div>
        </div>
      </div>

      {/* Webhooks & HMAC Signature */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E3E5E2] pb-3">
          <div>
            <h2 className="text-sm font-jura font-bold text-[#0B3E33] flex items-center space-x-2">
              <Webhook className="w-4 h-4 text-[#DBAE40]" />
              <span>Webhooks & Notifications d'Événements</span>
            </h2>
            <p className="text-xs text-[#78848A]">
              KUSA envoie un webhook signé en HMAC-SHA256 dès qu'un paiement est confirmé.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-jura font-bold text-[#101E29] mb-1">
              URL de Réception des Webhooks (Endpoint HTTPS)
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-3 py-2 text-xs font-mono border border-[#E3E5E2] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0B3E33] bg-[#F6F4EE]/60"
              />
              <button
                onClick={handleTestWebhook}
                disabled={webhookTesting}
                className="px-4 py-2 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold rounded-full text-xs flex items-center justify-center space-x-1.5 transition-colors shrink-0 shadow-xs self-start sm:self-center"
              >
                <Send className="w-3.5 h-3.5 text-[#DBAE40]" />
                <span>{webhookTesting ? "Envoi..." : "Tester l'URL"}</span>
              </button>
            </div>
            {webhookSuccess && (
              <div className="mt-2 text-[11px] font-semibold text-emerald-700 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Test réussi : Votre serveur a répondu HTTP 200 en 115 ms !</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-jura font-bold text-[#101E29] mb-1">
              Secret de Signature Webhook (HMAC-SHA256)
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 min-w-0 px-3 py-2 bg-[#F6F4EE]/60 border border-[#E3E5E2] rounded-xl font-mono text-xs text-[#0B3E33] truncate">
                {webhookSecret}
              </div>
              <button
                onClick={() => copyToClipboard(webhookSecret, "webhook")}
                className="px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#EAE8E0] text-[#0B3E33] border border-[#E3E5E2] rounded-xl text-xs font-jura font-semibold flex items-center space-x-1.5 shrink-0"
              >
                {copiedKey === "webhook" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#DBAE40]" />
                )}
                <span>Copier</span>
              </button>
            </div>
            <p className="text-[11px] text-[#78848A] mt-1">
              Vérifiez l'en-tête HTTP <code className="text-[#0B3E33] font-bold">X-Kusa-Signature</code> sur chaque requête reçue.
            </p>
          </div>
        </div>
      </div>

      {/* Live Request Logs */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-jura font-bold text-[#0B3E33] flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Journaux des Requêtes API en Direct (Live Logs)</span>
            </h2>
            <p className="text-xs text-[#78848A]">
              Inspectez le corps des requêtes JSON et les réponses instantanées du moteur KUSA.
            </p>
          </div>
        </div>

        <div className="border border-[#E3E5E2] rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4EE] text-[#5F6A70] font-jura border-b border-[#E3E5E2]">
              <tr>
                <th className="py-2.5 px-3 font-bold">Méthode & Route</th>
                <th className="py-2.5 px-3 font-bold">Statut HTTP</th>
                <th className="py-2.5 px-3 font-bold">Latence</th>
                <th className="py-2.5 px-3 font-bold">Heure</th>
                <th className="py-2.5 px-3 font-bold text-right">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E5E2]">
              {mockLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-[#F6F4EE]/60 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono font-bold text-gray-800 flex items-center space-x-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        log.method === "POST"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {log.method}
                    </span>
                    <span>{log.endpoint}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                      {log.status} OK
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-gray-500">
                    {log.duration}
                  </td>

                  <td className="py-3 px-3 text-gray-400 font-mono">
                    {log.timestamp}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-[#0E3B33] hover:text-[#D4AF37] font-semibold text-xs inline-flex items-center space-x-1">
                      <span>Inspecter</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Log Drawer */}
        {selectedLog && (
          <div className="p-4 bg-gray-900 text-white rounded-xl font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="text-[#D4AF37] font-bold">
                Requête {selectedLog.method} {selectedLog.endpoint}
              </span>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-white text-xs"
              >
                Fermer ✕
              </button>
            </div>
            <div>
              <div className="text-gray-400 text-[10px] uppercase mb-1">Payload JSON envoyé :</div>
              <pre className="bg-black/50 p-2 rounded text-emerald-400 overflow-x-auto text-[11px]">
                {JSON.stringify(selectedLog.requestBody, null, 2)}
              </pre>
            </div>
            <div>
              <div className="text-gray-400 text-[10px] uppercase mb-1">Réponse KUSA ({selectedLog.status}) :</div>
              <pre className="bg-black/50 p-2 rounded text-amber-300 overflow-x-auto text-[11px]">
                {JSON.stringify(selectedLog.responseBody, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Rotation Modal */}
      {showRotationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-[#0E3B33]">
              <RefreshCw className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-bold text-base text-[#0D1B2A]">
                Rotation Sécurisée de la Clé Secrète
              </h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pour éviter toute interruption de vos encaissements, KUSA active une <strong>période de grâce de 24 heures</strong>. Durant ce délai, votre ancienne clé et votre nouvelle clé fonctionneront en simultané.
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
              Assurez-vous de mettre à jour la clé sur vos serveurs avant l'expiration des 24 heures.
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowRotationModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  alert("Nouvelle clé secrète générée avec période de grâce de 24h.");
                  setShowRotationModal(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-[#0E3B33] text-[#D4AF37] hover:bg-[#0D1B2A] rounded-xl"
              >
                Confirmer la Rotation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
