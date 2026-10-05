import React from "react";
import {
  LayoutDashboard,
  Receipt,
  Link as LinkIcon,
  Wallet,
  Code2,
  ShieldCheck,
  CreditCard,
  Building2,
  Sparkles,
} from "lucide-react";

export type TabKey =
  | "overview"
  | "transactions"
  | "payment-links"
  | "payouts"
  | "developer"
  | "kyb"
  | "checkout-demo";

interface SidebarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  kybApproved: boolean;
  kybStep: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  kybApproved,
  kybStep,
}) => {
  const menuItems = [
    {
      id: "overview" as TabKey,
      label: "Vue d'Ensemble",
      icon: LayoutDashboard,
      badge: "12 Pays",
    },
    {
      id: "transactions" as TabKey,
      label: "Transactions",
      icon: Receipt,
      badge: null,
    },
    {
      id: "payment-links" as TabKey,
      label: "Liens de Paiement",
      icon: LinkIcon,
      badge: "No-Code",
    },
    {
      id: "payouts" as TabKey,
      label: "Soldes & Payouts",
      icon: Wallet,
      badge: "Ledger",
    },
    {
      id: "developer" as TabKey,
      label: "Espace Développeurs",
      icon: Code2,
      badge: "API & Keys",
    },
    {
      id: "kyb" as TabKey,
      label: "Conformité & KYB",
      icon: ShieldCheck,
      badge: kybApproved ? "Validé" : `Étape ${kybStep}/4`,
      badgeColor: kybApproved
        ? "bg-emerald-100 text-emerald-800"
        : "bg-amber-100 text-amber-800",
    },
    {
      id: "checkout-demo" as TabKey,
      label: "Widget de Paiement",
      icon: CreditCard,
      badge: "Démo",
      badgeColor: "bg-[#DBAE40]/20 text-[#DBAE40] font-bold",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E3E5E2] flex flex-col justify-between shrink-0 min-h-[calc(100vh-62px)]">
      <div className="p-4 space-y-6">
        {/* Merchant Account Card with vitrine styling */}
        <div className="p-3 bg-[#F6F4EE] rounded-2xl border border-[#E3E5E2] border-l-4 border-l-[#0B3E33] flex items-center space-x-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-[#0B3E33] text-[#DBAE40] flex items-center justify-center font-bold shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-jura font-bold text-[#0B3E33] truncate">
              Afritech Solutions
            </h4>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  kybApproved ? "bg-emerald-500" : "bg-[#DBAE40]"
                }`}
              />
              <span className="text-[10px] text-[#78848A] font-medium font-jura">
                {kybApproved ? "Compte Vérifié (Live)" : "Sandbox Actif"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <p className="px-3 text-[11px] font-jura font-bold text-[#78848A] uppercase tracking-wider mb-2">
            Plateforme KUSA
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all font-jura ${
                  isActive
                    ? "bg-[#0B3E33] text-white shadow-xs font-bold"
                    : "text-[#5F6A70] hover:bg-[#F6F4EE] hover:text-[#0B3E33] font-semibold"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-[#DBAE40]" : "text-[#78848A]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      item.badgeColor ||
                      (isActive
                        ? "bg-white/15 text-white"
                        : "bg-[#EAE8E0] text-[#5F6A70]")
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Institutional Dark Footer (matching vitrine footer palette #101E29) */}
      <div className="p-4 border-t border-[#1A2E3B] bg-[#101E29] text-[#D3DADF]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-jura font-bold text-xs text-white">KUSA Core v1.0</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-jura font-bold bg-[#DBAE40]/20 text-[#DBAE40] border border-[#DBAE40]/30">
            99.9% Dispo
          </span>
        </div>
        <p className="text-[10px] text-[#86929A] leading-relaxed">
          Agrégateur panafricain certifié. Conçu à Douala, Cameroun.
        </p>
      </div>
    </aside>
  );
};
