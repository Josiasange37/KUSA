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
        className="hidden sm:block absolute top-0 right-0 h-full pointer-events-none select-none z-0 opacity-40 sm:opacity-70 lg:opacity-100"
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
        className="mx-auto h-full min-h-[calc(100vh-62px)] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-[160px] max-w-7xl w-full relative z-10 py-8 sm:py-12 lg:py-0 lg:pb-16"
        style={{
          boxSizing: "border-box",
          isolation: "isolate",
        }}
      >
        {/* Left Column: Hero copy */}
        <div
          className="flex flex-col items-start justify-center flex-none z-10 text-left w-full lg:w-[520px] xl:w-[580px] gap-6 sm:gap-7"
        >
          {/* Heading */}
          <ScrollReveal direction="up" delay={80} distance={24}>
            <h1
              className="font-junge text-[32px] xs:text-[36px] sm:text-[50px] lg:text-[58px] xl:text-[64px] break-words"
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

          {/* Description */}
          <ScrollReveal direction="up" delay={220} distance={20}>
            <p
              className="font-jura text-[15px] sm:text-[18px] xl:text-[19px]"
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

          {/* Hero actions */}
          <ScrollReveal direction="up" delay={300} distance={20} className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
              {/* Button 1: Demander un accès */}
              <Link
                href="/dashboard"
                className="hover:brightness-110 transition-all flex flex-row justify-center items-center shadow-md active:scale-95 w-full sm:w-auto sm:min-w-[195px] h-[48px] px-6 rounded-full bg-[#0B3E33]"
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
                className="hover:bg-gray-50 transition-all flex flex-row justify-center items-center shadow-xs border border-[#DFE3E8] active:scale-95 w-full sm:w-auto sm:min-w-[205px] h-[48px] px-6 rounded-full bg-white"
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

          {/* Integration formats: XAF · REST API · Webhooks · Sandbox */}
          <ScrollReveal direction="up" delay={360} distance={15}>
            <div
              className="pt-1 text-[12px] sm:text-[14px]"
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

        {/* Right Column: High-Res Woman Cutout Image */}
        <div className="relative flex items-end justify-center self-center lg:self-end mt-8 lg:mt-0 w-full lg:w-auto">
          <ScrollReveal direction="left" delay={200} distance={30} duration={800}>
            <div
              className="relative w-[260px] sm:w-[340px] md:w-[380px] lg:w-[430px] xl:w-[480px] h-auto transition-transform hover:scale-[1.01] duration-300 mx-auto"
              style={{
                transform: "rotate(-1.66deg)",
                transformOrigin: "bottom center",
              }}
            >
              <img
                src="/images/hero-woman-hires.png"
                alt="Entrepreneure africaine encaissant avec KUSA"
                className="w-full h-auto object-contain object-bottom pointer-events-none select-none max-h-[380px] sm:max-h-[480px] lg:max-h-[580px] xl:max-h-[640px]"
                loading="eager"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
