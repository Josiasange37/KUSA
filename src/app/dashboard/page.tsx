"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar, TabKey } from "@/components/Sidebar";
import { OverviewView } from "@/components/OverviewView";
import { KybOnboardingView } from "@/components/KybOnboardingView";
import { DeveloperPortalView } from "@/components/DeveloperPortalView";
import { PaymentLinksView } from "@/components/PaymentLinksView";
import { PayoutsView } from "@/components/PayoutsView";
import { CheckoutWidgetModal } from "@/components/CheckoutWidgetModal";
import {
  ShieldAlert,
  ArrowRight,
  Receipt,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [environment, setEnvironment] = useState<"sandbox" | "live">("sandbox");
  const [kybApproved, setKybApproved] = useState<boolean>(false);
  const [kybStep, setKybStep] = useState<number>(2);

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutTitle, setCheckoutTitle] = useState<string>("Commande #CMD-8921");
  const [checkoutAmount, setCheckoutAmount] = useState<number>(15000);

  const handleOpenCheckoutModal = (title?: string, amount?: number) => {
    if (title) setCheckoutTitle(title);
    if (amount) setCheckoutAmount(amount);
    setCheckoutModalOpen(true);
  };

  const handleKybValidatedSuccess = () => {
    setEnvironment("live");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EE] text-[#101E29]">
      {/* Top Navbar */}
      <Navbar
        environment={environment}
        setEnvironment={setEnvironment}
        kybApproved={kybApproved}
        onOpenCheckoutModal={() => handleOpenCheckoutModal()}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          kybApproved={kybApproved}
          kybStep={kybStep}
        />

        {/* Center Content View */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Notification Banner when in Sandbox */}
          {environment === "sandbox" && (
            <div className="mb-6 p-4 bg-[#EAE6D8]/80 border border-[#DBAE40]/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center space-x-3">
                <span className="p-2 bg-[#DBAE40]/20 text-[#0B3E33] rounded-xl shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-xs font-jura font-bold text-[#0B3E33]">
                    Environnement de Test (Sandbox)
                  </h4>
                  <p className="text-[11px] text-[#5F6A70]">
                    Les paiements simulés ne débitent aucun argent réel. Pour encaisser en Production sur les 12 pays, complétez votre dossier d'entreprise (KYB).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("kyb")}
                className="px-4 py-2 bg-[#0B3E33] text-white hover:bg-[#101E29] text-xs font-jura font-semibold rounded-full transition-all flex items-center space-x-1.5 shrink-0 self-start sm:self-center shadow-xs"
              >
                <span>Vérifier mon Entreprise</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DBAE40]" />
              </button>
            </div>
          )}

          {/* DYNAMIC TAB VIEWS */}
          {activeTab === "overview" && (
            <OverviewView
              environment={environment}
              onOpenCheckoutModal={() => handleOpenCheckoutModal()}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "kyb" && (
            <KybOnboardingView
              kybApproved={kybApproved}
              setKybApproved={setKybApproved}
              kybStep={kybStep}
              setKybStep={setKybStep}
              onKybValidatedSuccess={handleKybValidatedSuccess}
            />
          )}

          {activeTab === "developer" && (
            <DeveloperPortalView environment={environment} />
          )}

          {activeTab === "payment-links" && (
            <PaymentLinksView
              onOpenCheckoutModal={(title, amount) =>
                handleOpenCheckoutModal(title, amount)
              }
            />
          )}

          {activeTab === "payouts" && <PayoutsView />}

          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="p-2.5 rounded-xl bg-[#0B3E33] text-[#DBAE40] shadow-2xs">
                      <Receipt className="w-5 h-5" />
                    </span>
                    <div>
                      <h1 className="text-xl font-jura font-bold text-[#0B3E33]">
                        Historique des Transactions (12 Pays)
                      </h1>
                      <p className="text-xs text-[#78848A]">
                        Suivi détaillé des encaissements Mobile Money et Cartes bancaires en temps réel.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#F6F4EE] hover:bg-[#EAE8E0] text-[#0B3E33] text-xs font-jura font-semibold rounded-full border border-[#E3E5E2] transition-colors">
                    <Download className="w-3.5 h-3.5 text-[#DBAE40]" />
                    <span>Exporter CSV</span>
                  </button>
                </div>
              </div>

              {/* Extended table */}
              <div className="bg-white p-5 rounded-2xl border border-[#E3E5E2] shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 text-[#78848A] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Rechercher par référence, téléphone..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs font-jura border border-[#E3E5E2] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0B3E33] bg-[#F6F4EE]/50"
                    />
                  </div>

                  <div className="text-xs text-[#78848A] font-jura">
                    Affichage de <strong className="text-[#0B3E33]">5 sur 1 842</strong> transactions
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F6F4EE] text-[#5F6A70] font-jura border-y border-[#E3E5E2]">
                      <tr>
                        <th className="py-2.5 px-3 font-bold">Référence</th>
                        <th className="py-2.5 px-3 font-bold">Client</th>
                        <th className="py-2.5 px-3 font-bold">Canal</th>
                        <th className="py-2.5 px-3 font-bold">Marché</th>
                        <th className="py-2.5 px-3 font-bold">Montant Brut</th>
                        <th className="py-2.5 px-3 font-bold">Frais KUSA</th>
                        <th className="py-2.5 px-3 font-bold">Statut</th>
                        <th className="py-2.5 px-3 font-bold text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E3E5E2]">
                      {[
                        {
                          id: "tx_98f1a23c",
                          ref: "CMD-8921",
                          client: "+237 699 00 11 22",
                          channel: "Orange Money",
                          country: "🇨🇲 Cameroun",
                          amount: "15 000 XAF",
                          fee: "450 XAF",
                          status: "SUCCESSFUL",
                          time: "28/09/2026 14:48",
                        },
                        {
                          id: "tx_44b2c901",
                          ref: "CMD-8920",
                          client: "+225 07 00 22 11",
                          channel: "Wave",
                          country: "🇨🇮 Côte d'Ivoire",
                          amount: "25 000 XOF",
                          fee: "750 XOF",
                          status: "SUCCESSFUL",
                          time: "28/09/2026 14:35",
                        },
                        {
                          id: "tx_77a988dd",
                          ref: "CMD-8919",
                          client: "+237 670 12 34 56",
                          channel: "MTN MoMo",
                          country: "🇨🇲 Cameroun",
                          amount: "50 000 XAF",
                          fee: "1 500 XAF",
                          status: "PENDING_CUSTOMER_ACTION",
                          time: "28/09/2026 14:12",
                        },
                        {
                          id: "tx_12ff4590",
                          ref: "CMD-8918",
                          client: "Aminata Diallo",
                          channel: "Visa Card",
                          country: "🇸🇳 Sénégal",
                          amount: "75 000 XOF",
                          fee: "2 250 XOF",
                          status: "SUCCESSFUL",
                          time: "28/09/2026 13:58",
                        },
                        {
                          id: "tx_33bc8819",
                          ref: "CMD-8917",
                          client: "+241 074 11 22 33",
                          channel: "Airtel Money",
                          country: "🇬🇦 Gabon",
                          amount: "30 000 XAF",
                          fee: "900 XAF",
                          status: "FAILED",
                          time: "28/09/2026 13:20",
                        },
                      ].map((t) => (
                        <tr key={t.id} className="hover:bg-[#F6F4EE]/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#0B3E33]">
                            {t.ref}
                          </td>
                          <td className="py-3 px-3 font-mono text-[#5F6A70]">
                            {t.client}
                          </td>
                          <td className="py-3 px-3 font-jura font-semibold text-[#101E29]">
                            {t.channel}
                          </td>
                          <td className="py-3 px-3 text-[#5F6A70]">{t.country}</td>
                          <td className="py-3 px-3 font-mono font-bold text-[#0B3E33]">
                            {t.amount}
                          </td>
                          <td className="py-3 px-3 font-mono text-[#78848A]">
                            {t.fee}
                          </td>
                          <td className="py-3 px-3">
                            {t.status === "SUCCESSFUL" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Réussi
                              </span>
                            )}
                            {t.status === "PENDING_CUSTOMER_ACTION" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                <Clock className="w-3 h-3 mr-1" />
                                En attente USSD
                              </span>
                            )}
                            {t.status === "FAILED" && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                                <XCircle className="w-3 h-3 mr-1" />
                                Échoué
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right text-[#78848A] font-mono">
                            {t.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "checkout-demo" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs">
                <h1 className="text-xl font-jura font-bold text-[#0B3E33]">
                  Démonstration Interactive du Widget Checkout KUSA
                </h1>
                <p className="text-xs text-[#5F6A70] mt-1 max-w-2xl leading-relaxed">
                  Voici le composant de paiement 3-tap officiel KUSA qui s'intègre en pop-in ou page hébergée sur les sites marchands pour l'encaissement via Mobile Money (Orange, MTN, Wave, etc.) et Cartes bancaires (Visa, Mastercard 3DS2).
                </p>

                <div className="mt-6 flex items-center space-x-3">
                  <button
                    onClick={() => handleOpenCheckoutModal("Formation Pro KUSA", 25000)}
                    className="px-5 py-2.5 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs rounded-full shadow-xs transition-all"
                  >
                    Ouvrir la Fenêtre Modale de Paiement
                  </button>
                </div>
              </div>

              {/* Static Preview embedded */}
              <div className="max-w-md mx-auto bg-white p-2 rounded-3xl shadow-xs border border-[#E3E5E2]">
                <div className="p-3 bg-[#F6F4EE] rounded-2xl text-center text-xs text-[#0B3E33] font-jura font-semibold mb-2">
                  Aperçu Embarqué Mobile-First
                </div>
                <CheckoutWidgetModal
                  isOpen={true}
                  onClose={() => {}}
                  title="Facture Client #CMD-8921"
                  amount={15000}
                  currency="XAF"
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Interactive Checkout Modal */}
      <CheckoutWidgetModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        title={checkoutTitle}
        amount={checkoutAmount}
        currency="XAF"
      />
    </div>
  );
}
