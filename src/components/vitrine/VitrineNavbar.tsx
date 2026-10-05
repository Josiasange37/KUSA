"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

interface VitrineNavbarProps {
  onOpenDemoCheckout?: () => void;
}

export const VitrineNavbar: React.FC<VitrineNavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-xs" : "bg-[#F6F4EE]/95 backdrop-blur-sm"
      }`}
      style={{
        height: "62px",
        boxSizing: "border-box",
        borderBottom: "1px solid #E3E5E2",
      }}
    >
      <div
        className="mx-auto h-[61px] flex flex-row justify-between items-center px-4 sm:px-8 xl:px-[160px] max-w-7xl w-full"
        style={{ boxSizing: "border-box" }}
      >
        {/* Logo Brand: Kusa K icon */}
        <Link
          href="/"
          className="flex-none order-0 flex items-center justify-center group"
          style={{ width: "46px", height: "42px" }}
          aria-label="KUSA Home"
        >
          <Image
            src="/images/kusa-logo-icon.png"
            alt="Kusa"
            width={46}
            height={42}
            className="object-contain"
            style={{ width: "46px", height: "42px" }}
            priority
          />
        </Link>

        {/* Desktop Navigation links (bigger font 13px, adaptive gap) */}
        <nav
          className="hidden md:flex flex-row items-center flex-none order-1 gap-6 lg:gap-8 xl:gap-9 h-[20px]"
        >
          {/* Navigation link 1: Produits */}
          <a
            href="#produits"
            className="hover:text-[#0B3E33] transition-colors inline-flex items-center justify-center font-jura whitespace-nowrap text-[13px] font-bold tracking-wide"
            style={{
              fontFamily: "'Jura', sans-serif",
              color: "#78848A",
              lineHeight: "145%",
            }}
          >
            Produits
          </a>

          {/* Navigation link 2: Développeurs */}
          <a
            href="#developer"
            className="hover:text-[#0B3E33] transition-colors inline-flex items-center justify-center font-jura whitespace-nowrap text-[13px] font-bold tracking-wide"
            style={{
              fontFamily: "'Jura', sans-serif",
              color: "#78848A",
              lineHeight: "145%",
            }}
          >
            Développeurs
          </a>

          {/* Navigation link 3: Cas d'usage */}
          <a
            href="#usecases"
            className="hover:text-[#0B3E33] transition-colors inline-flex items-center justify-center font-jura whitespace-nowrap text-[13px] font-bold tracking-wide"
            style={{
              fontFamily: "'Jura', sans-serif",
              color: "#78848A",
              lineHeight: "145%",
            }}
          >
            Cas d&apos;usage
          </a>

          {/* Navigation link 4: Tarifs */}
          <a
            href="#tarifs"
            className="hover:text-[#0B3E33] transition-colors inline-flex items-center justify-center font-jura whitespace-nowrap text-[13px] font-bold tracking-wide"
            style={{
              fontFamily: "'Jura', sans-serif",
              color: "#78848A",
              lineHeight: "145%",
            }}
          >
            Tarifs
          </a>
        </nav>

        {/* Desktop Navigation actions */}
        <div
          className="hidden md:flex flex-row items-center flex-none order-2 gap-4 lg:gap-6 h-[34px]"
        >
          {/* Contact link: Nous contacter */}
          <a
            href="mailto:contact@kusa.cm"
            className="hover:opacity-80 transition-opacity inline-flex items-center justify-center font-jura whitespace-nowrap text-[13px] font-semibold"
            style={{
              fontFamily: "'Jura', sans-serif",
              color: "#0B3E33",
              lineHeight: "145%",
            }}
          >
            Nous contacter
          </a>

          {/* Button: Démarrer */}
          <Link
            href="/dashboard"
            className="flex-none order-1 hover:brightness-110 transition-all flex flex-row justify-center items-center font-jura shadow-xs active:scale-95"
            style={{
              boxSizing: "border-box",
              height: "34px",
              background: "#0B3E33",
              borderRadius: "40px",
              padding: "0px 18px",
            }}
          >
            <span
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "14px",
                color: "#FFFFFF",
                textAlign: "center",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              Démarrer
            </span>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            href="/dashboard"
            className="flex items-center justify-center font-jura text-[12px] font-bold text-white px-3.5 py-1.5 rounded-full bg-[#0B3E33] whitespace-nowrap shadow-2xs active:scale-95 transition-transform"
            style={{ fontFamily: "'Jura', sans-serif" }}
          >
            Démarrer
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-[#0B3E33] hover:text-black rounded-lg focus:outline-none active:bg-black/5"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Navigation Menu appearing from the LEFT */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] w-screen h-screen min-h-screen bg-[#F6F4EE] text-[#101E29] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
          {/* Subtle woven geometry pattern background overlay just like the hero section */}
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

          {/* Top Bar: Brand Logo & Close Button */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#E3E5E2]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 group"
            >
              <Image
                src="/images/kusa-logo-icon.png"
                alt="Kusa"
                width={40}
                height={36}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-jura font-bold text-xl tracking-wider text-[#0B3E33]">
                  KUSA
                </span>
                <span className="text-[9px] font-jura tracking-widest text-[#DBAE40] uppercase font-semibold">
                  Paiement Panafricain
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#EAE8E0] active:scale-95 flex items-center justify-center text-[#0B3E33] border border-[#E3E5E2] transition-all shadow-2xs"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5 text-[#0B3E33]" />
            </button>
          </div>

          {/* Navigation Links list: No cards, clean minimalist editorial design */}
          <div className="relative z-10 px-6 sm:px-8 py-8 flex-1 flex flex-col justify-center space-y-6">
            <span className="text-[11px] font-mono tracking-widest text-[#DBAE40] uppercase font-bold px-1">
              Menu Navigation
            </span>

            <nav className="flex flex-col divide-y divide-[#E3E5E2]">
              {[
                {
                  href: "#produits",
                  num: "01",
                  title: "Produits & Solutions",
                  desc: "Mobile Money & Cartes",
                },
                {
                  href: "#developer",
                  num: "02",
                  title: "Espace Développeurs",
                  desc: "API REST, Webhooks & SDKs",
                },
                {
                  href: "#usecases",
                  num: "03",
                  title: "Cas d'Usage",
                  desc: "E-commerce & Facturation",
                },
                {
                  href: "#tarifs",
                  num: "04",
                  title: "Tarifs Transparents",
                  desc: "Commission au succès",
                },
                {
                  href: "mailto:contact@kusa.cm",
                  num: "05",
                  title: "Nous Contacter",
                  desc: "Support & Intégration",
                },
              ].map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-4 transition-colors px-1"
                >
                  <div className="flex items-baseline space-x-3.5">
                    <span className="font-mono text-xs text-[#DBAE40] font-bold">
                      {item.num}
                    </span>
                    <div>
                      <div className="font-junge text-2xl text-[#0B3E33] group-hover:text-[#DBAE40] group-hover:translate-x-1 transition-all">
                        {item.title}
                      </div>
                      <div className="text-[11px] font-jura text-[#5F6A70] mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#A0A8AE] group-hover:text-[#0B3E33] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Actions & Footer Info */}
          <div className="relative z-10 px-6 sm:px-8 pb-8 pt-4 border-t border-[#E3E5E2] space-y-4 bg-[#F6F4EE]/90">
            {/* Quick Regional Indicator */}
            <div className="flex items-center justify-between text-xs font-jura text-[#5F6A70]">
              <span className="font-semibold text-[#0B3E33]">12 Pays Africains</span>
              <span className="font-mono text-[#DBAE40] font-bold">CEMAC · UEMOA · RDC</span>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 px-6 rounded-full font-jura font-semibold text-sm text-white bg-[#0B3E33] hover:bg-[#101E29] flex items-center justify-center space-x-2 shadow-xs active:scale-[0.99] transition-all"
            >
              <span>Accéder au Tableau de Bord</span>
              <ChevronRight className="w-4 h-4 text-[#DBAE40]" />
            </Link>

            <p className="text-center text-[10px] text-[#78848A] font-jura">
              KUSA — L&apos;Infrastructure de Paiement des Entreprises Africaines
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
