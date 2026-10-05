"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface HeroSectionProps {
  onOpenDemoCheckout?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section
      className="relative bg-[#F6F4EE] overflow-hidden w-full mt-[62px] min-h-[calc(100vh-62px)] flex items-center"
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* Background texture: Exact woven geometry pattern on right side */}
      <div
        className="absolute top-0 right-0 h-full pointer-events-none select-none z-0 opacity-40 sm:opacity-70 lg:opacity-100"
        style={{
          left: "max(calc(50% + 654.5px - 485px), 52%)",
          right: 0,
          backgroundImage: "url('/images/hero-woven-geometry.png')",
          backgroundRepeat: "repeat",
          backgroundPosition: "top left",
          backgroundSize: "471px auto",
        }}
        aria-hidden="true"
      />

      {/* Main Container (occupies full height of viewport) */}
      <div
        className="mx-auto h-full min-h-[calc(100vh-62px)] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 xl:px-[160px] max-w-7xl w-full relative z-10 py-10 lg:py-0 lg:pb-16"
        style={{
          boxSizing: "border-box",
          isolation: "isolate",
        }}
      >
        {/* Left Column: Hero copy (enlarged text & buttons) */}
        <div
          className="flex flex-col items-start justify-center flex-none z-10 text-left w-full lg:w-[540px] xl:w-[580px]"
          style={{
            gap: "28px",
          }}
        >
          {/* Heading (font Junge, 400, enlarged: 42px -> 54px -> 64px, color: #0B3E33) */}
          <ScrollReveal direction="up" delay={80} distance={24}>
            <h1
              className="font-junge text-[42px] sm:text-[54px] xl:text-[64px]"
              style={{
                fontFamily: "'Junge', serif",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "110%",
                color: "#0B3E33",
                letterSpacing: "-0.02em",
              }}
            >
              L&apos;infrastructure
              <br />
              de paiement
              <br />
              des entreprises
              <br />
              africaines
            </h1>
          </ScrollReveal>

          {/* Description (font Jura, 600, enlarged: 16px -> 19px, max-w-[540px]) */}
          <ScrollReveal direction="up" delay={220} distance={20}>
            <p
              className="font-jura text-[16px] sm:text-[18px] xl:text-[19px]"
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "155%",
                color: "#78848A",
                maxWidth: "540px",
              }}
            >
              KUSA facilite l&apos;intégration des API de paiement officielles.
              Encaissez en ligne sur votre site ou votre application, ou envoyez un
              simple lien de paiement à vos clients.
            </p>
          </ScrollReveal>

          {/* Hero actions (enlarged buttons: 48px height, 15px bold text) */}
          <ScrollReveal direction="up" delay={300} distance={20}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              {/* Button 1: Demander un accès */}
              <Link
                href="/dashboard"
                className="hover:brightness-110 transition-all flex flex-row justify-center items-center shadow-md active:scale-95"
                style={{
                  boxSizing: "border-box",
                  minWidth: "195px",
                  height: "48px",
                  background: "#0B3E33",
                  borderRadius: "40px",
                  padding: "0px 30px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "18px",
                    color: "#FFFFFF",
                    whiteSpace: "nowrap",
                  }}
                >
                  Demander un accès
                </span>
              </Link>

              {/* Button 2: Voir la documentation */}
              <a
                href="#developer"
                className="hover:bg-gray-50 transition-all flex flex-row justify-center items-center shadow-xs border active:scale-95"
                style={{
                  boxSizing: "border-box",
                  minWidth: "205px",
                  height: "48px",
                  background: "#FFFFFF",
                  border: "1px solid #DFE3E8",
                  borderRadius: "40px",
                  padding: "0px 30px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "15px",
                    lineHeight: "18px",
                    color: "#0B3E33",
                    whiteSpace: "nowrap",
                  }}
                >
                  Voir la documentation
                </span>
              </a>
            </div>
          </ScrollReveal>

          {/* Integration formats: XAF · REST API · Webhooks · Sandbox (enlarged: 13px / 14px) */}
          <ScrollReveal direction="up" delay={360} distance={15}>
            <div
              className="pt-1 text-[13px] sm:text-[14px]"
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "16px",
                color: "#78848A",
                letterSpacing: "0.04em",
              }}
            >
              XAF · REST API · Webhooks · Sandbox
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: High-Res Woman Cutout Image (occupies bottom of the viewport view) */}
        <div className="relative flex items-end justify-center self-center lg:self-end mt-10 lg:mt-0">
          <ScrollReveal direction="left" delay={200} distance={30} duration={800}>
            <div
              className="relative w-[300px] sm:w-[380px] lg:w-[430px] xl:w-[480px] h-auto transition-transform hover:scale-[1.01] duration-300"
              style={{
                transform: "rotate(-1.66deg)",
                transformOrigin: "bottom center",
              }}
            >
              <img
                src="/images/hero-woman-hires.png"
                alt="Entrepreneure africaine encaissant avec KUSA"
                className="w-full h-auto object-contain object-bottom pointer-events-none select-none max-h-[460px] sm:max-h-[520px] lg:max-h-[580px] xl:max-h-[640px]"
                loading="eager"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
