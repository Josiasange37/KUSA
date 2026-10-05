import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

interface NavbarProps {
  environment: "sandbox" | "live";
  setEnvironment: (env: "sandbox" | "live") => void;
  kybApproved: boolean;
  onOpenCheckoutModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  environment,
  setEnvironment,
  kybApproved,
  onOpenCheckoutModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F6F4EE]/95 backdrop-blur-md border-b border-[#E3E5E2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">
          {/* Brand Logo & Organization */}
          <div className="flex items-center space-x-5">
            <Link
              href="/"
              className="flex items-center space-x-3 cursor-pointer group"
              title="Retour à l'accueil"
            >
              <div className="relative w-[40px] h-[36px] flex items-center justify-center">
                <Image
                  src="/images/kusa-logo-icon.png"
                  alt="KUSA Logo"
                  width={40}
                  height={36}
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-jura font-bold text-xl tracking-wider text-[#0B3E33]">
                    KUSA
                  </span>
                  <span className="text-[10px] font-jura font-semibold px-2 py-0.5 rounded-full bg-[#0B3E33] text-white tracking-widest uppercase">
                    PayFac
                  </span>
                </div>
              </div>
            </Link>

            {/* Back to vitrine link */}
            <Link
              href="/"
              className="hidden lg:flex items-center space-x-1.5 text-xs font-jura font-semibold text-[#78848A] hover:text-[#0B3E33] pl-3 border-l border-[#E3E5E2] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Site Vitrine</span>
            </Link>

            {/* Organization Dropdown */}
            <div className="hidden md:flex items-center space-x-2 pl-3 border-l border-[#E3E5E2] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#0B3E33]" />
              <span className="font-semibold text-[#0B3E33] font-jura">Afritech SARL</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8E6DE] text-[#78848A] font-jura font-medium">
                Douala, CM
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#78848A]" />
            </div>
          </div>

          {/* Center: Environment Toggle Switcher */}
          <div className="flex items-center bg-[#EAE8E0] p-1 rounded-full border border-[#DCDAD0] shadow-inner">
            <button
              onClick={() => setEnvironment("sandbox")}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-jura transition-all ${
                environment === "sandbox"
                  ? "bg-[#DBAE40] text-[#101E29] font-bold shadow-xs"
                  : "text-[#78848A] hover:text-[#0B3E33] font-medium"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  environment === "sandbox" ? "bg-[#101E29]" : "bg-amber-500"
                }`}
              />
              <span>Sandbox (Test)</span>
            </button>

            <button
              onClick={() => {
                if (kybApproved) {
                  setEnvironment("live");
                } else {
                  alert(
                    "Le Mode Production (Live) nécessite la validation de votre dossier d'entreprise (KYB). Rendez-vous dans l'onglet Conformité & KYB."
                  );
                }
              }}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-jura transition-all ${
                environment === "live"
                  ? "bg-[#0B3E33] text-white font-bold shadow-xs"
                  : kybApproved
                  ? "text-[#78848A] hover:text-[#0B3E33] font-medium"
                  : "text-[#A0A8AE] cursor-not-allowed font-normal"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  environment === "live"
                    ? "bg-white"
                    : kybApproved
                    ? "bg-emerald-500"
                    : "bg-gray-400"
                }`}
              />
              <span>Production (Live)</span>
              {!kybApproved && (
                <span className="text-[9px] px-1.5 py-0.2 bg-[#DCDAD0] rounded-full text-[#78848A] font-semibold">
                  KYB
                </span>
              )}
            </button>
          </div>

          {/* Right: Quick Actions, Checkout Demo & User */}
          <div className="flex items-center space-x-3">
            {/* Live Interactive Checkout Trigger */}
            <button
              onClick={onOpenCheckoutModal}
              className="flex items-center space-x-2 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs px-4 py-2 rounded-full shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#DBAE40]" />
              <span>Tester le Checkout</span>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 text-[#78848A] hover:text-[#0B3E33] rounded-full hover:bg-[#E8E6DE] transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DBAE40] rounded-full ring-2 ring-[#F6F4EE]" />
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#0B3E33] flex items-center justify-center text-xs font-jura font-bold text-white border border-[#DBAE40]/50 shadow-xs cursor-pointer">
              KW
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
