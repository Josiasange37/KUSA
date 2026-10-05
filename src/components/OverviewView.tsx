import React, { useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Globe,
  RefreshCw,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
} from "lucide-react";

interface OverviewViewProps {
  environment: "sandbox" | "live";
  onOpenCheckoutModal: () => void;
  onNavigateTab: (tab: any) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  environment,
  onOpenCheckoutModal,
  onNavigateTab,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");

  const countries = [
    { code: "ALL", name: "Tous les 12 Pays", flag: "🌍", currency: "XAF/XOF" },
    { code: "CM", name: "Cameroun", flag: "🇨🇲", currency: "XAF", zone: "CEMAC" },
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XOF", zone: "UEMOA" },
    { code: "SN", name: "Sénégal", flag: "🇸🇳", currency: "XOF", zone: "UEMOA" },
    { code: "GA", name: "Gabon", flag: "🇬🇦", currency: "XAF", zone: "CEMAC" },
    { code: "CG", name: "Congo", flag: "🇨🇬", currency: "XAF", zone: "CEMAC" },
    { code: "CD", name: "RDC", flag: "🇨🇩", currency: "CDF", zone: "AFR-C" },
    { code: "BJ", name: "Bénin", flag: "🇧🇯", currency: "XOF", zone: "UEMOA" },
    { code: "TG", name: "Togo", flag: "🇹🇬", currency: "XOF", zone: "UEMOA" },
    { code: "BF", name: "Burkina Faso", flag: "🇧🇫", currency: "XOF", zone: "UEMOA" },
    { code: "TD", name: "Tchad", flag: "🇹🇩", currency: "XAF", zone: "CEMAC" },
    { code: "CF", name: "RCA", flag: "🇨🇫", currency: "XAF", zone: "CEMAC" },
    { code: "GQ", name: "Guinée Éq.", flag: "🇬🇶", currency: "XAF", zone: "CEMAC" },
  ];

  // Mock transactions
  const transactions = [
    {
      id: "tx_98f1a23c",
      ref: "CMD-8921",
      customer: "+237 699 ••• 122",
      channel: "Orange Money",
      country: "🇨🇲 Cameroun",
      amount: "15 000 XAF",
      fee: "450 XAF",
      status: "SUCCESSFUL",
      time: "Il y a 3 min",
    },
    {
      id: "tx_44b2c901",
      ref: "CMD-8920",
      customer: "+225 070 ••• 884",
      channel: "Wave",
      country: "🇨🇮 Côte d'Ivoire",
      amount: "25 000 XOF",
      fee: "750 XOF",
      status: "SUCCESSFUL",
      time: "Il y a 12 min",
    },
    {
      id: "tx_77a988dd",
      ref: "CMD-8919",
      customer: "+237 670 ••• 551",
      channel: "MTN MoMo",
      country: "🇨🇲 Cameroun",
      amount: "50 000 XAF",
      fee: "1 500 XAF",
      status: "PENDING_CUSTOMER_ACTION",
      time: "Il y a 18 min",
    },
    {
      id: "tx_12ff4590",
      ref: "CMD-8918",
      customer: "Aminata Diallo",
      channel: "Visa Card (3DS2)",
      country: "🇸🇳 Sénégal",
      amount: "75 000 XOF",
      fee: "2 250 XOF",
      status: "SUCCESSFUL",
      time: "Il y a 34 min",
    },
    {
      id: "tx_33bc8819",
      ref: "CMD-8917",
      customer: "+241 074 ••• 990",
      channel: "Airtel Money",
      country: "🇬🇦 Gabon",
      amount: "30 000 XAF",
      fee: "900 XAF",
      status: "FAILED",
      reason: "Solde client insuffisant",
      time: "Il y a 1h",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner: Vitrine aesthetic with Junge heading and gold accents */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xs border border-[#E3E5E2] relative overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="absolute -right-10 -bottom-10 w-96 h-96 pointer-events-none opacity-5"
          style={{
            backgroundImage: "url('/images/hero-woven-geometry.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "180px auto",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F6F4EE] border border-[#E3E5E2] text-[#0B3E33] text-xs font-jura font-semibold mb-3">
              <Globe className="w-3.5 h-3.5 text-[#DBAE40]" />
              <span>Agrégation 12 Pays Actifs — CEMAC & UEMOA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-junge text-[#0B3E33] tracking-tight">
              Tableau de bord d&apos;encaissement KUSA
            </h1>
            <p className="text-[#5F6A70] text-xs sm:text-sm mt-2 leading-relaxed">
              Encaissez par Mobile Money (Orange, MTN, Wave, Moov, Airtel) et Cartes bancaires (Visa, Mastercard) avec réconciliation automatique et grand livre à double entrée.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenCheckoutModal}
              className="px-5 py-2.5 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs rounded-full shadow-xs transition-all flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CreditCard className="w-4 h-4 text-[#DBAE40]" />
              <span>Simuler un Paiement Client</span>
            </button>
          </div>
        </div>
      </div>

      {/* 12-Country Selector Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-[#E3E5E2] shadow-2xs">
        <div className="flex items-center justify-between mb-2.5 px-2">
          <div className="flex items-center space-x-2 text-xs font-jura font-bold text-[#0B3E33]">
            <Globe className="w-4 h-4 text-[#DBAE40]" />
            <span>Filtrer par Marché National (12 Pays) :</span>
          </div>
          <span className="text-[11px] text-[#78848A] font-jura">
            Devises : XAF, XOF, CDF, EUR, USD
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none px-1">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setSelectedCountry(c.code)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-jura whitespace-nowrap transition-all ${
                selectedCountry === c.code
                  ? "bg-[#0B3E33] text-white font-bold shadow-xs"
                  : "bg-[#F6F4EE] text-[#5F6A70] hover:bg-[#EAE8E0] hover:text-[#0B3E33] border border-[#E3E5E2]"
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCountry === c.code
                    ? "bg-[#DBAE40] text-[#101E29] font-bold"
                    : "bg-[#EAE8E0] text-[#78848A]"
                }`}
              >
                {c.currency}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV Total */}
        <div className="bg-white p-5 rounded-2xl border border-[#E3E5E2] border-t-2 border-t-[#0B3E33] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-jura font-bold text-[#78848A] uppercase tracking-wider">
              Volume Encaissé (GMV)
            </span>
            <span className="p-2 rounded-xl bg-[#F6F4EE] text-[#0B3E33]">
              <TrendingUp className="w-4 h-4 text-[#DBAE40]" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B3E33] tracking-tight font-mono">
            48 750 000 <span className="text-xs font-jura font-semibold text-[#78848A]">XAF</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-emerald-700 font-semibold font-jura">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% ce mois</span>
            <span className="text-[#A0A8AE] font-normal">· 1 842 transactions</span>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white p-5 rounded-2xl border border-[#E3E5E2] border-t-2 border-t-[#0B3E33] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-jura font-bold text-[#78848A] uppercase tracking-wider">
              Taux de Succès Global
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B3E33] tracking-tight font-mono">
            96.8%
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-[#5F6A70] font-jura">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Latence USSD moyenne : 18s</span>
          </div>
        </div>

        {/* Solde Disponible (Available Balance) */}
        <div className="bg-[#F6F4EE] p-5 rounded-2xl border border-[#DBAE40]/50 border-t-2 border-t-[#DBAE40] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-jura font-bold text-[#0B3E33] uppercase tracking-wider">
              Solde Disponible (Retirable)
            </span>
            <span className="p-2 rounded-xl bg-[#DBAE40]/20 text-[#0B3E33]">
              <CreditCard className="w-4 h-4 text-[#0B3E33]" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-[#0B3E33] tracking-tight font-mono">
            12 400 000 <span className="text-xs font-jura font-semibold text-[#78848A]">XAF</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E3E5E2]">
            <span className="text-[11px] text-[#78848A] font-jura">Compte certifié</span>
            <button
              onClick={() => onNavigateTab("payouts")}
              className="text-[11px] font-jura font-bold text-[#0B3E33] hover:text-[#DBAE40] flex items-center space-x-1 transition-colors"
            >
              <span>Demander Payout</span>
              <ArrowUpRight className="w-3 h-3 text-[#DBAE40]" />
            </button>
          </div>
        </div>

        {/* En Attente (Clearing) & Réserve */}
        <div className="bg-white p-5 rounded-2xl border border-[#E3E5E2] border-t-2 border-t-[#0B3E33] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-jura font-bold text-[#78848A] uppercase tracking-wider">
              Clearing & Réserve
            </span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs font-jura">
              <span className="text-[#5F6A70]">En cours (J+1) :</span>
              <span className="font-mono font-bold text-[#0B3E33]">3 150 000 XAF</span>
            </div>
            <div className="flex items-center justify-between text-xs font-jura">
              <span className="text-[#5F6A70]">Réserve litiges (5%) :</span>
              <span className="font-mono font-bold text-[#0B3E33]">800 000 XAF</span>
            </div>
          </div>
          <div className="text-[10px] text-[#78848A] mt-2 font-jura">
            Grand Livre à double entrée conforme
          </div>
        </div>
      </div>

      {/* Operator Distribution & Live Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Operators Share */}
        <div className="bg-white p-5 rounded-2xl border border-[#E3E5E2] shadow-2xs">
          <h3 className="text-sm font-jura font-bold text-[#0B3E33] mb-4 flex items-center justify-between">
            <span>Répartition par Opérateur</span>
            <span className="text-[11px] text-[#78848A] font-normal">Temps Réel</span>
          </h3>

          <div className="space-y-3.5">
            {[
              { name: "Orange Money", share: 42, color: "bg-orange-500", volume: "20.4M XAF" },
              { name: "MTN Mobile Money", share: 38, color: "bg-amber-400", volume: "18.5M XAF" },
              { name: "Wave", share: 12, color: "bg-sky-400", volume: "5.8M XOF" },
              { name: "Cartes Visa & Mastercard", share: 5, color: "bg-[#0B3E33]", volume: "2.4M XAF" },
              { name: "Moov / Airtel / M-Pesa", share: 3, color: "bg-red-500", volume: "1.6M XAF" },
            ].map((op) => (
              <div key={op.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-jura">
                  <span className="font-semibold text-[#101E29]">{op.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#78848A] text-[11px] font-mono">{op.volume}</span>
                    <span className="font-bold text-[#0B3E33]">{op.share}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#F6F4EE] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${op.color}`}
                    style={{ width: `${op.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3.5 bg-[#F6F4EE] rounded-2xl border border-[#E3E5E2] text-[11px] text-[#5F6A70] space-y-1">
            <div className="font-jura font-bold text-[#0B3E33] flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#DBAE40]" />
              <span>Routage Intelligent Multi-Passerelles</span>
            </div>
            <p className="text-[10px] text-[#78848A] leading-relaxed">
              Bascule automatique en cas de ralentissement d'un telco pour maintenir votre taux de conversion au-dessus de 95%.
            </p>
          </div>
        </div>

        {/* Right: Live Transactions Stream (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-[#E3E5E2] shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-jura font-bold text-[#0B3E33]">
                Transactions d'Encaissement en Direct
              </h3>
              <p className="text-xs text-[#78848A] font-jura">
                Flux multi-pays consolidé avec statuts normalisés
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onNavigateTab("transactions")}
                className="text-xs font-jura text-[#0B3E33] hover:text-[#DBAE40] font-bold flex items-center space-x-1 transition-colors"
              >
                <span>Voir tout</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#DBAE40]" />
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F4EE] text-[#5F6A70] font-jura border-y border-[#E3E5E2]">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Référence & Client</th>
                  <th className="py-2.5 px-3 font-bold">Canal & Pays</th>
                  <th className="py-2.5 px-3 font-bold">Montant Net</th>
                  <th className="py-2.5 px-3 font-bold">Statut</th>
                  <th className="py-2.5 px-3 font-bold text-right">Horodatage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E5E2]">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F6F4EE]/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#0B3E33]">{tx.ref}</div>
                      <div className="text-[11px] text-[#78848A] font-mono">{tx.customer}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-jura font-semibold text-[#101E29]">{tx.channel}</div>
                      <div className="text-[11px] text-[#78848A]">{tx.country}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-[#0B3E33]">{tx.amount}</div>
                      <div className="text-[10px] text-[#78848A] font-mono">Frais: {tx.fee}</div>
                    </td>

                    <td className="py-3 px-3">
                      {tx.status === "SUCCESSFUL" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Confirmé
                        </span>
                      )}
                      {tx.status === "PENDING_CUSTOMER_ACTION" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                          <Clock className="w-3 h-3 mr-1" />
                          Attente PIN USSD
                        </span>
                      )}
                      {tx.status === "FAILED" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                          <XCircle className="w-3 h-3 mr-1" />
                          Échoué
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right text-[#78848A] font-mono">
                      {tx.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
