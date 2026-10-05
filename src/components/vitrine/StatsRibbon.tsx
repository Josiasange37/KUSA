"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const StatsRibbon: React.FC = () => {
  const partners = [
    { name: "Orange Money", src: "/images/partner-orange.png", width: "46px", height: "46px" },
    { name: "MTN MoMo", src: "/images/partner-mtn.png", width: "78px", height: "46px" },
    { name: "PayPal", src: "/images/partner-paypal.png", width: "52px", height: "46px" },
    { name: "Mastercard", src: "/images/partner-mastercard.png", width: "68px", height: "46px" },
    { name: "Visa", src: "/images/partner-visa.png", width: "88px", height: "38px" },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] border-y border-[#DFE3E8] shadow-xs">
      {/* Full-bleed edge-to-edge white bar spanning 100% of the screen width */}
      <div
        className="w-full max-w-[1440px] mx-auto min-h-[75px] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 py-3.5 lg:py-0 gap-4 lg:gap-8"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* Trust statement on the left */}
        <ScrollReveal direction="right" delay={50} distance={18}>
          <p
            className="font-jura text-[14px] sm:text-[15px] lg:text-[16px] text-center lg:text-left flex-none tracking-tight whitespace-normal sm:whitespace-nowrap"
            style={{
              fontFamily: "'Jura', sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "140%",
              color: "#606B7C",
            }}
          >
            Intégration rapide, Plusieurs moyens de paiement, en XAF, 99,9 % de disponibilité.
          </p>
        </ScrollReveal>

        {/* 5 Partner logos horizontally aligned on the right with staggered reveal */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-9 lg:gap-11 flex-1">
          {partners.map((partner, index) => (
            <ScrollReveal
              key={partner.name}
              direction="up"
              delay={80 + index * 60}
              distance={15}
            >
              <div
                className="flex-none flex items-center justify-center hover:opacity-100 hover:scale-105 transition-all duration-300 opacity-80 cursor-pointer"
                style={{ width: partner.width, height: partner.height }}
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
