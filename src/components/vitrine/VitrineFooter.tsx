"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const VitrineFooter: React.FC = () => {
  return (
    <footer
      className="w-full flex justify-center overflow-hidden"
      style={{
        background: "#101E29",
        boxSizing: "border-box",
      }}
    >
      {/* Outer frame: responsive padding and gap */}
      <div
        className="w-full max-w-[1309px] flex flex-col items-start px-4 sm:px-8 lg:px-[95px] xl:px-[100px] pt-12 sm:pt-20 pb-8 gap-7 sm:gap-8"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* ============================================ */}
        {/* JOIN INVITATION BLOCK */}
        {/* ============================================ */}
        <div
          className="w-full relative"
          style={{
            minHeight: "183px",
          }}
        >
          {/* Left: Invitation copy (width 460px, gap 18px) */}
          <ScrollReveal direction="up" delay={60} distance={20}>
            <div
              className="flex flex-col items-start relative z-10"
              style={{
                maxWidth: "460px",
                gap: "18px",
              }}
            >
            {/* Heading: Inter 700, 22px, line-height 150%, #D3DADF */}
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "22px",
                lineHeight: "145%",
                color: "#D3DADF",
                margin: 0,
              }}
            >
              KUSA est un service d&apos;intégration technique.
            </h2>

            {/* Description: Inter 400, 12px, line-height 150%, #A4B2BE */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "155%",
                color: "#A4B2BE",
                margin: 0,
                maxWidth: "420px",
              }}
            >
              Nous ne sommes ni un établissement de paiement, ni un
              intégrateur, ni un PSP. Nous facilitons uniquement
              l&apos;intégration des API de paiement officielles.
            </p>

            {/* Join Us Button: width 170px, height 36px, bg #DBAE40, border-radius 5px */}
            <Link
              href="/dashboard"
              className="flex flex-row items-center justify-between hover:brightness-105 active:scale-[0.98] transition-all shadow-md"
              style={{
                width: "170px",
                height: "36px",
                background: "#DBAE40",
                borderRadius: "6px",
                padding: "0 14px 0 18px",
                boxSizing: "border-box",
                textDecoration: "none",
              }}
            >
              {/* Label: Jura 700, 12.5px, #111827 */}
              <span
                style={{
                  fontFamily: "'Jura', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "12.5px",
                  color: "#111827",
                  whiteSpace: "nowrap",
                }}
              >
                Join Us
              </span>

              {/* Arrow badge circle: 18px, bg #FFFFFF, arrow border 1.3px solid #111827 */}
              <div
                className="flex items-center justify-center flex-none"
                style={{
                  width: "18px",
                  height: "18px",
                  background: "#FFFFFF",
                  borderRadius: "50%",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 4H6.5M6.5 4L4 1.5M6.5 4L4 6.5"
                    stroke="#111827"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </ScrollReveal>

          {/* Right: Dotted World Map (318px × 275px), positioned right */}
          <div
            className="hidden lg:block absolute"
            style={{
              width: "318px",
              height: "275px",
              right: "0px",
              top: "-60px",
            }}
          >
            <ScrollReveal direction="left" delay={140} distance={25} duration={800}>
              <Image
                src="/images/world-map-dotted.png"
                alt="World map"
                width={318}
                height={275}
                className="object-contain opacity-60"
                style={{ width: "318px", height: "275px" }}
              />
            </ScrollReveal>
          </div>
        </div>

        {/* ============================================ */}
        {/* DIVIDER: width 1114px, height 1px, bg #303847 */}
        {/* ============================================ */}
        <div
          className="w-full"
          style={{
            maxWidth: "1114px",
            height: "1px",
            background: "#303847",
          }}
        />

        {/* ============================================ */}
        {/* BRAND ROW: Logo + Social Links */}
        {/* ============================================ */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left: Kusa Logo + Tagline */}
          <ScrollReveal direction="right" delay={80} distance={20}>
            <div className="flex items-center gap-3.5">
              {/* K Icon from uploaded logo */}
              <Image
                src="/images/kusa-logo-icon.png"
                alt="Kusa logo"
                width={44}
                height={44}
                className="object-contain flex-none transition-transform hover:rotate-6 duration-300"
                style={{
                  width: "44px",
                  height: "44px",
                }}
              />

              {/* Brand text */}
              <div className="flex flex-col">
                {/* "kusa" wordmark: Jura 700, 42px, #FFFFFF, letter-spacing -0.04em */}
                <span
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "42px",
                    lineHeight: "1",
                    color: "#FFFFFF",
                    letterSpacing: "-0.04em",
                  }}
                >
                  kusa
                </span>

                {/* Tagline: Jura 700, 11.5px, letter-spacing 0.13em, #FFFFFF */}
                <span
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "11.5px",
                    lineHeight: "1",
                    color: "#FFFFFF",
                    letterSpacing: "0.13em",
                    marginTop: "4px",
                  }}
                >
                  ENCAISSER, SIMPLEMENT.
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: 5 Social Link Circles */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="#"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: "30px",
                height: "30px",
                background: "#285441",
                borderRadius: "50%",
              }}
              aria-label="Facebook"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 2.5H10V0.5H8.5C7.12 0.5 6 1.62 6 3V4.5H4.5V6.5H6V13.5H8V6.5H10L10.5 4.5H8V3C8 2.72 8.22 2.5 8.5 2.5Z" stroke="#81AD93" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: "30px",
                height: "30px",
                background: "#285441",
                borderRadius: "50%",
              }}
              aria-label="Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="12" height="12" rx="3" stroke="#81AD93" strokeWidth="1.4"/>
                <circle cx="7" cy="7" r="2.5" stroke="#81AD93" strokeWidth="1.4"/>
                <circle cx="10.5" cy="3.5" r="0.75" fill="#81AD93"/>
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="#"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: "30px",
                height: "30px",
                background: "#285441",
                borderRadius: "50%",
              }}
              aria-label="Twitter"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1.5C12.4 2 11.7 2.4 11 2.5C11.8 1.9 12.3 1 12.5 0C11.8 0.5 11 0.8 10.2 1C9.5 0.4 8.6 0 7.5 0C5.6 0 4 1.6 4 3.5C4 3.8 4 4.1 4.1 4.3C2.7 4.2 1.4 3.5 0.5 2.4C0.2 2.9 0 3.5 0 4.1C0 5.3 0.6 6.3 1.5 6.9C1 6.9 0.5 6.7 0 6.5C0 8.2 1.1 9.5 2.6 9.9C2.3 10 1.9 10 1.6 10C1.4 10 1.1 10 0.9 9.9C1.4 11.3 2.7 12.3 4.2 12.3C3 13.3 1.5 13.8 0 13.7C1.3 14.5 2.8 15 4.5 15" stroke="#81AD93" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: "30px",
                height: "30px",
                background: "#285441",
                borderRadius: "50%",
              }}
              aria-label="LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 5.5V11M3.5 3V3.01M7 11V7.5C7 6.67 7.67 6 8.5 6C9.33 6 10 6.67 10 7.5V11M10 5.5V11" stroke="#81AD93" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="#81AD93" strokeWidth="1.4"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: "30px",
                height: "30px",
                background: "#285441",
                borderRadius: "50%",
              }}
              aria-label="YouTube"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="2.5" width="12" height="9" rx="3" stroke="#81AD93" strokeWidth="1.4"/>
                <path d="M6 5.5L9 7L6 8.5V5.5Z" stroke="#81AD93" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* FOOTER NAV: 3 columns (Produits, Entreprise, Développeurs) */}
        {/* width 980px, gap 18px between rows */}
        {/* ============================================ */}
        <div
          className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          style={{
            maxWidth: "980px",
            gap: "18px 0",
          }}
        >
          {/* Column 1: Produits */}
          <ScrollReveal direction="up" delay={80} distance={18}>
            <div
              className="flex flex-col items-start"
              style={{ gap: "14px" }}
            >
              {/* Group title: Inter 600, 12px, #DBAE40 */}
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#DBAE40",
                  margin: 0,
                  letterSpacing: "0.03em",
                }}
              >
                Produits
              </h4>
              <nav className="flex flex-col" style={{ gap: "11px" }}>
                {["API de paiement", "Liens de paiement", "Webhooks & statuts", "Tableau de bord"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="hover:text-white hover:translate-x-0.5 transition-all duration-150"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12.5px",
                        lineHeight: "16px",
                        color: "#A4B2BE",
                        textDecoration: "none",
                      }}
                    >
                      {link}
                    </a>
                  )
                )}
              </nav>
            </div>
          </ScrollReveal>

          {/* Column 2: Entreprise */}
          <ScrollReveal direction="up" delay={140} distance={18}>
            <div
              className="flex flex-col items-start"
              style={{ gap: "14px" }}
            >
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#DBAE40",
                  margin: 0,
                  letterSpacing: "0.03em",
                }}
              >
                Entreprise
              </h4>
              <nav className="flex flex-col" style={{ gap: "11px" }}>
                {["À propos", "Contact", "Support", "Mentions légales"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="hover:text-white hover:translate-x-0.5 transition-all duration-150"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12.5px",
                        lineHeight: "16px",
                        color: "#A4B2BE",
                        textDecoration: "none",
                      }}
                    >
                      {link}
                    </a>
                  )
                )}
              </nav>
            </div>
          </ScrollReveal>

          {/* Column 3: Développeurs */}
          <ScrollReveal direction="up" delay={200} distance={18}>
            <div
              className="flex flex-col items-start"
              style={{ gap: "14px" }}
            >
              <h4
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: "15px",
                  color: "#DBAE40",
                  margin: 0,
                  letterSpacing: "0.03em",
                  textDecoration: "underline",
                }}
              >
                Développeurs
              </h4>
              <nav className="flex flex-col" style={{ gap: "11px" }}>
                {["Documentation", "Référence API", "Environnement de test", "SDK & exemples"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="hover:text-white hover:translate-x-0.5 transition-all duration-150"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12.5px",
                        lineHeight: "16px",
                        color: "#A4B2BE",
                        textDecoration: "none",
                      }}
                    >
                      {link}
                    </a>
                  )
                )}
              </nav>
            </div>
          </ScrollReveal>

          {/* Column 4: Empty (per Figma, 4th col is empty spacer) */}
          <div className="hidden lg:block" />
        </div>

        {/* ============================================ */}
        {/* COPYRIGHT: Jura 700, 12px, line-height 160%, #CED2DB, centered */}
        {/* ============================================ */}
        <ScrollReveal direction="fade" delay={240} className="w-full">
          <div
            className="w-full flex flex-col items-center justify-center text-center"
            style={{
              paddingTop: "24px",
              gap: "4px",
            }}
          >
            <p
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "160%",
                color: "#CED2DB",
                margin: 0,
              }}
            >
              © Fintech128. All Rights Reserved. Licensing
            </p>
            <p
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "12px",
                lineHeight: "160%",
                color: "#CED2DB",
                margin: 0,
              }}
            >
              Webflow Templates by 128 digital. Powered by Webflow
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

