import React, { useState } from "react";
import {
  Link as LinkIcon,
  Plus,
  Share2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  MessageCircle,
  Eye,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";

interface PaymentLinksViewProps {
  onOpenCheckoutModal: (title?: string, amount?: number) => void;
}

export const PaymentLinksView: React.FC<PaymentLinksViewProps> = ({
  onOpenCheckoutModal,
}) => {
  const [links, setLinks] = useState([
    {
      id: "pl_98a71b2",
      title: "Formation Développeur Mobile Money & Fintech",
      slug: "kusa_fintech_2026",
      url: "https://pay.kusa.cm/l/kusa_fintech_2026",
      amount: "25 000 XAF",
      numericAmount: 25000,
      currency: "XAF",
      type: "Montant Fixe",
      paymentsCount: 42,
      totalVolume: "1 050 000 XAF",
      status: "ACTIVE",
    },
    {
      id: "pl_44cd901",
      title: "Facture Prestation Cloud & Serveurs #104",
      slug: "facture_104_afritech",
      url: "https://pay.kusa.cm/l/facture_104_afritech",
      amount: "150 000 XAF",
      numericAmount: 150000,
      currency: "XAF",
      type: "Montant Fixe",
      paymentsCount: 1,
      totalVolume: "150 000 XAF",
      status: "ACTIVE",
    },
    {
      id: "pl_22ee884",
      title: "Abonnement Support Mensuel PME",
      slug: "support_mensuel_pme",
      url: "https://pay.kusa.cm/l/support_mensuel_pme",
      amount: "Montant Libre",
      numericAmount: 15000,
      currency: "XAF",
      type: "Montant Libre",
      paymentsCount: 18,
      totalVolume: "420 000 XAF",
      status: "ACTIVE",
    },
  ]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("10000");
  const [newCurrency, setNewCurrency] = useState("XAF");
  const [qrModalLink, setQrModalLink] = useState<any | null>(null);

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const num = parseInt(newAmount, 10) || 10000;
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]/g, "_").substring(0, 20);

    const newLink = {
      id: `pl_${Math.random().toString(36).substring(2, 9)}`,
      title: newTitle,
      slug: slug,
      url: `https://pay.kusa.cm/l/${slug}`,
      amount: `${num.toLocaleString("fr-FR")} ${newCurrency}`,
      numericAmount: num,
      currency: newCurrency,
      type: "Montant Fixe",
      paymentsCount: 0,
      totalVolume: `0 ${newCurrency}`,
      status: "ACTIVE",
    };

    setLinks([newLink, ...links]);
    setShowCreateModal(false);
    setNewTitle("");
    setNewAmount("10000");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-xl bg-[#0B3E33] text-[#DBAE40] shadow-2xs">
              <LinkIcon className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-jura font-bold text-[#0B3E33]">
                Liens de Paiement (No-Code Payment Links)
              </h1>
              <p className="text-xs text-[#78848A]">
                Créez des liens de paiement en 1 clic et partagez-les sur WhatsApp, SMS ou par email.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs rounded-full shadow-xs transition-transform hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-[#DBAE40]" />
          <span>Créer un Nouveau Lien</span>
        </button>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white p-5 rounded-2xl border border-[#E3E5E2] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-jura font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {link.status === "ACTIVE" ? "Actif" : "Désactivé"}
                </span>
                <span className="text-[11px] text-[#78848A] font-mono">
                  {link.type}
                </span>
              </div>

              <h3 className="font-jura font-bold text-sm text-[#0B3E33] line-clamp-2">
                {link.title}
              </h3>

              <div className="text-xl font-extrabold text-[#0B3E33] font-mono mt-2">
                {link.amount}
              </div>

              <div className="mt-3 p-2 bg-[#F6F4EE]/60 rounded-xl border border-[#E3E5E2] text-xs font-mono text-[#5F6A70] truncate flex items-center justify-between">
                <span className="truncate">{link.url}</span>
                <button
                  onClick={() => copyToClipboard(link.url, link.id)}
                  className="ml-2 text-gray-500 hover:text-[#0E3B33] shrink-0"
                >
                  {copiedId === link.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Ventes : <strong>{link.paymentsCount}</strong></span>
                <span className="font-mono text-[#0D1B2A] font-bold">
                  {link.totalVolume}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* WhatsApp Share */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Bonjour, voici votre lien de paiement KUSA sécurisé pour ${link.title} : ${link.url}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* QR Code */}
                <button
                  onClick={() => setQrModalLink(link)}
                  className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>QR Code</span>
                </button>

                {/* Preview Checkout */}
                <button
                  onClick={() =>
                    onOpenCheckoutModal(link.title, link.numericAmount)
                  }
                  className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-[#0E3B33] hover:bg-[#0D1B2A] text-[#D4AF37] rounded-lg text-[11px] font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Tester</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Création de Lien */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-4 pt-[calc(1rem_+_env(safe-area-inset-top))] pb-[calc(1rem_+_env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain">
          <div role="dialog" aria-modal="true" className="bg-white rounded-2xl max-w-md w-full my-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#0D1B2A]">
                Créer un Lien de Paiement Sans Code
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLink} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nom du Produit ou Service
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Formation, Consultation, Commande..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Montant
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Devise
                  </label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E3B33] bg-white font-mono"
                  >
                    <option value="XAF">XAF (CEMAC)</option>
                    <option value="XOF">XOF (UEMOA)</option>
                    <option value="CDF">CDF (RDC)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#F6F4EE] rounded-xl text-xs text-gray-600">
                Vos clients pourront payer ce lien par <strong>Orange Money, MTN MoMo, Wave ou Carte bancaire</strong> dans tous les pays supportés.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#0E3B33] text-[#D4AF37] hover:bg-[#0D1B2A] rounded-xl"
                >
                  Générer le Lien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalLink && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-4 pt-[calc(1rem_+_env(safe-area-inset-top))] pb-[calc(1rem_+_env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain">
          <div role="dialog" aria-modal="true" className="bg-white rounded-2xl max-w-sm w-full my-auto p-6 space-y-4 shadow-2xl text-center">
            <h3 className="font-bold text-sm text-[#0D1B2A]">
              QR Code de Paiement KUSA
            </h3>
            <p className="text-xs text-gray-500">{qrModalLink.title}</p>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 inline-block shadow-inner">
              {/* Stylized QR placeholder */}
              <div className="w-48 h-48 bg-white p-2 rounded-xl border border-gray-200 flex flex-col items-center justify-center space-y-2">
                <QrCode className="w-32 h-32 text-[#0E3B33]" />
                <span className="text-[10px] font-mono text-gray-400">
                  {qrModalLink.amount}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-[#0E3B33]">
              {qrModalLink.amount}
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <button
                onClick={() => setQrModalLink(null)}
                className="px-4 py-2 text-xs font-bold bg-[#0E3B33] text-white rounded-xl"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
