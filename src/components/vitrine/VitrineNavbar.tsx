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
        className="mx-auto h-[61px] flex flex-row justify-between items-center px-5 sm:px-8 xl:px-[160px] max-w-7xl w-full"
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
            href="#features"
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
            href="#pricing"
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
          {/* Contact link: Nous contacter (bigger 13px) */}
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

          {/* Button: Démarrer (bigger 34px height) */}
          <Link
            href="/dashboard"
            className="flex-none order-1 hover:brightness-110 transition-all flex flex-row justify-center items-center font-jura shadow-xs"
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
        <div className="flex md:hidden items-center space-x-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center font-jura text-[11px] font-bold text-white px-3.5 py-1.5 rounded-full bg-[#0B3E33] whitespace-nowrap shadow-2xs"
            style={{ fontFamily: "'Jura', sans-serif" }}
          >
            Démarrer
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-700 hover:text-black rounded focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-gray-200 px-6 pt-4 pb-7 space-y-4 backdrop-blur-xl shadow-lg">
          <div className="flex flex-col space-y-2 font-jura">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-bold text-gray-800 hover:text-[#0B3E33] border-b border-gray-100 flex items-center justify-between"
            >
              <span>Produits</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="#developer"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-bold text-gray-800 hover:text-[#0B3E33] border-b border-gray-100 flex items-center justify-between"
            >
              <span>Développeurs</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="#usecases"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-bold text-gray-800 hover:text-[#0B3E33] border-b border-gray-100 flex items-center justify-between"
            >
              <span>Cas d&apos;usage</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-bold text-gray-800 hover:text-[#0B3E33] border-b border-gray-100 flex items-center justify-between"
            >
              <span>Tarifs</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="mailto:contact@kusa.cm"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-sm font-semibold text-[#0B3E33] border-b border-gray-100 flex items-center justify-between"
            >
              <span>Nous contacter</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="w-full py-3 px-5 rounded-full text-sm font-bold text-white bg-[#0B3E33] flex items-center justify-center space-x-2"
              style={{ fontFamily: "'Jura', sans-serif" }}
            >
              <span>Démarrer</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
