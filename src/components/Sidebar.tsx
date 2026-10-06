import React from "react";
import Link from "next/link";
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
  X,
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
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  kybApproved,
  kybStep,
  isOpen = false,
  onClose,
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

  const handleSelectTab = (id: TabKey) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  const sidebarContent = (
    <>
      <div className="p-4 space-y-6">
        {/* Merchant Account Card with vitrine styling */}
        <div className="p-3 bg-[#F6F4EE] rounded-2xl border border-[#E3E5E2] border-l-4 border-l-[#0B3E33] flex items-center justify-between shadow-2xs">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-[#0B3E33] text-[#DBAE40] flex items-center justify-center font-bold shadow-xs shrink-0">
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
                <span className="text-[10px] text-[#78848A] font-medium font-jura truncate">
                  {kybApproved ? "Compte Vérifié (Live)" : "Sandbox Actif"}
                </span>
              </div>
            </div>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-[#78848A] hover:text-[#0B3E33] rounded-lg hover:bg-black/5"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
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
                onClick={() => handleSelectTab(item.id)}
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
    </>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-[#E3E5E2] flex-col justify-between shrink-0 min-h-[calc(100vh-62px)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer: Appears from LEFT with clean hero cream background */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden w-screen h-screen min-h-screen bg-[#F6F4EE] text-[#101E29] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
          {/* Subtle woven background pattern texture just like hero section */}
          <div
            className="absolute top-0 right-0 h-full w-full pointer-events-none select-none z-0 opacity-20"
            style={{
              backgroundImage: "url('/images/hero-woven-geometry.png')",
              backgroundRepeat: "repeat",
              backgroundPosition: "top right",
              backgroundSize: "360px auto",
            }}
            aria-hidden="true"
          />

          {/* Top Gold & Green Accent Bar */}
          <div className="w-full h-1 bg-gradient-to-r from-[#0B3E33] via-[#DBAE40] to-[#0B3E33]" />

          <div className="relative z-10 p-6 space-y-6">
            {/* Header: Merchant info & Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E3E5E2]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3E33] text-[#DBAE40] flex items-center justify-center font-bold shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-jura font-bold text-[#0B3E33]">
                    Afritech Solutions
                  </h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        kybApproved ? "bg-emerald-500" : "bg-[#DBAE40]"
                      }`}
                    />
                    <span className="text-[11px] text-[#5F6A70] font-medium font-jura">
                      {kybApproved ? "Compte Vérifié (Live)" : "Mode Test (Sandbox)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#EAE8E0] active:scale-95 flex items-center justify-center text-[#0B3E33] border border-[#E3E5E2] transition-all shadow-2xs"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5 text-[#0B3E33]" />
                </button>
              )}
            </div>

            {/* Mobile Navigation Links: Clean open list, no heavy cards */}
            <nav className="space-y-1">
              <p className="text-[11px] font-mono tracking-widest text-[#DBAE40] uppercase font-bold px-2 mb-3">
                Modules du Tableau de Bord
              </p>

              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all font-jura ${
                      isActive
                        ? "bg-[#0B3E33] text-white shadow-xs font-bold"
                        : "text-[#101E29] hover:bg-[#EAE8E0]/70 hover:text-[#0B3E33] font-semibold"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#DBAE40]" : "text-[#0B3E33]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                          isActive
                            ? "bg-[#DBAE40] text-[#071D14] font-bold"
                            : item.badgeColor || "bg-[#EAE8E0] text-[#5F6A70]"
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

          {/* Footer & Vitrine Back Link */}
          <div className="relative z-10 p-6 border-t border-[#E3E5E2] bg-[#F6F4EE]/90 space-y-3">
            <Link
              href="/"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#EAE8E0] text-[#0B3E33] border border-[#E3E5E2] flex items-center justify-center space-x-2 text-xs font-jura font-bold transition-colors shadow-2xs"
            >
              <span>← Retour au Site Vitrine KUSA</span>
            </Link>

            <div className="flex items-center justify-between pt-1">
              <span className="font-jura font-bold text-xs text-[#0B3E33]">KUSA Platform</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-jura font-bold bg-[#DBAE40]/20 text-[#0B3E33] border border-[#DBAE40]/30">
                12 Pays · 99.9% Dispo
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
