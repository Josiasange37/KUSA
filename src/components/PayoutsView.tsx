import React, { useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  Download,
  Check,
} from "lucide-react";

export const PayoutsView: React.FC = () => {
  const [showPayoutModal, setShowPayoutModal] = useState<boolean>(false);
  const [payoutAmount, setPayoutAmount] = useState<string>("5000000");
  const [payoutChannel, setPayoutChannel] = useState<string>("BANK");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [payoutSuccess, setPayoutSuccess] = useState<boolean>(false);

  const [availableBalance, setAvailableBalance] = useState<number>(12400000);

  const [history, setHistory] = useState([
    {
      id: "po_99182a",
      ref: "VIR-2026-09-001",
      amount: "5 000 000 XAF",
      channel: "Virement Bancaire (Ecobank CM)",
      status: "COMPLETED",
      date: "25 Sept 2026",
    },
    {
      id: "po_88273b",
      ref: "PO-MTN-2026-042",
      amount: "2 500 000 XAF",
      channel: "MTN MoMo B2B Corporate",
      status: "COMPLETED",
      date: "18 Sept 2026",
    },
    {
      id: "po_77192c",
      ref: "VIR-2026-09-002",
      amount: "10 000 000 XAF",
      channel: "Virement Bancaire (UBA CM)",
      status: "COMPLETED",
      date: "10 Sept 2026",
    },
  ]);

  const handleExecutePayout = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(payoutAmount, 10);
    if (isNaN(amountNum) || amountNum <= 0 || amountNum > availableBalance) {
      alert("Montant invalide ou supérieur à votre solde disponible.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setAvailableBalance(availableBalance - amountNum);
      const newEntry = {
        id: `po_${Math.random().toString(36).substring(2, 8)}`,
        ref: `VIR-2026-09-${Math.floor(Math.random() * 900 + 100)}`,
        amount: `${amountNum.toLocaleString("fr-FR")} XAF`,
        channel:
          payoutChannel === "BANK"
            ? "Virement Bancaire (Ecobank CM)"
            : "Orange Money B2B",
        status: "PROCESSING",
        date: "Aujourd'hui à 14:55",
      };
      setHistory([newEntry, ...history]);
      setPayoutSuccess(true);
      setTimeout(() => {
        setPayoutSuccess(false);
        setShowPayoutModal(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-xl bg-[#0B3E33] text-[#DBAE40] shadow-2xs">
              <Wallet className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-jura font-bold text-[#0B3E33]">
                Soldes & Reversements (Payouts)
              </h1>
              <p className="text-xs text-[#78848A]">
                Grand livre comptable à double entrée avec traçabilité mathématique des flux.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowPayoutModal(true)}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs rounded-full shadow-xs transition-transform hover:scale-[1.02]"
        >
          <ArrowUpRight className="w-4 h-4 text-[#DBAE40]" />
          <span>Demander un Virement (Payout)</span>
        </button>
      </div>

      {/* Ledger Accounts Balance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Available Balance */}
        <div className="bg-[#F6F4EE] text-[#0B3E33] p-6 rounded-2xl shadow-2xs border-2 border-[#DBAE40]/70 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-jura font-bold text-[#0B3E33] uppercase tracking-wider">
              Solde Disponible Retirable
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="text-3xl font-extrabold text-[#0B3E33] font-mono tracking-tight">
            {availableBalance.toLocaleString("fr-FR")}{" "}
            <span className="text-base font-jura font-bold text-[#DBAE40]">XAF</span>
          </div>

          <p className="text-xs text-[#5F6A70] mt-3 pt-3 border-t border-[#E3E5E2] leading-relaxed">
            Fonds compensés et garantis. Prêts pour reversement vers votre compte bancaire officiel.
          </p>
        </div>

        {/* Pending Clearing */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-jura font-bold text-[#78848A] uppercase tracking-wider">
              En Cours de Clearing (T+1)
            </span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>

          <div className="text-3xl font-extrabold text-[#0B3E33] font-mono tracking-tight">
            3 150 000 <span className="text-base font-jura font-bold text-[#78848A]">XAF</span>
          </div>

          <p className="text-xs text-[#78848A] mt-3 pt-3 border-t border-[#E3E5E2] leading-relaxed">
            Encaissements récents en cours de libération par les opérateurs télécoms (24h ouvrées).
          </p>
        </div>

        {/* Rolling Reserve */}
        <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-jura font-bold text-[#78848A] uppercase tracking-wider">
              Réserve de Garantie (5%)
            </span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="text-3xl font-extrabold text-[#0B3E33] font-mono tracking-tight">
            800 000 <span className="text-base font-jura font-bold text-[#78848A]">XAF</span>
          </div>

          <p className="text-xs text-[#78848A] mt-3 pt-3 border-t border-[#E3E5E2] leading-relaxed">
            Fonds conservés temporairement en couverture du risque de contestation ou litiges.
          </p>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-jura font-bold text-[#0B3E33]">
            Historique des Décaissements (Payouts)
          </h2>
          <span className="text-xs font-jura text-[#78848A]">Relevé certifié OHADA</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F4EE] text-[#5F6A70] font-jura border-y border-[#E3E5E2]">
              <tr>
                <th className="py-2.5 px-3 font-bold">Référence Virement</th>
                <th className="py-2.5 px-3 font-bold">Destination Bancaire / MoMo</th>
                <th className="py-2.5 px-3 font-bold">Montant Net</th>
                <th className="py-2.5 px-3 font-bold">Statut</th>
                <th className="py-2.5 px-3 font-bold text-right">Date d'Émission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E5E2]">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-[#F6F4EE]/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#0B3E33]">
                    {item.ref}
                  </td>
                  <td className="py-3 px-3 text-[#101E29] font-jura font-semibold">
                    {item.channel}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-[#0B3E33]">
                    {item.amount}
                  </td>
                  <td className="py-3 px-3">
                    {item.status === "COMPLETED" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Virement Exécuté
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                        <Clock className="w-3 h-3 mr-1" />
                        En Traitement Bancaire
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right text-[#78848A] font-mono">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-[#0D1B2A]">
                Demande de Reversement (Payout)
              </h3>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecutePayout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Compte de Réception Vérifié
                </label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                  <div className="text-xs font-bold text-gray-800">
                    Ecobank Cameroun — Afritech Solutions SARL
                  </div>
                  <div className="text-[11px] font-mono text-gray-500">
                    RIB : CM21 1002 5000 1234 5678 9012 345
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Montant à Décaisser (XAF)
                </label>
                <input
                  type="number"
                  min="100000"
                  max={availableBalance}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono font-bold text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
                <div className="text-[11px] text-gray-400 mt-1">
                  Disponible maximum : {availableBalance.toLocaleString("fr-FR")} XAF
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-100">
                Délai d'exécution : <strong>Virement BEAC en J+1 ouvré</strong> sans frais supplémentaires.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 text-xs font-bold bg-[#0E3B33] text-[#D4AF37] hover:bg-[#0D1B2A] rounded-xl flex items-center space-x-1.5"
                >
                  {isProcessing ? (
                    <span>Traitement...</span>
                  ) : payoutSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Ordre Enregistré</span>
                    </>
                  ) : (
                    <span>Confirmer le Virement</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
