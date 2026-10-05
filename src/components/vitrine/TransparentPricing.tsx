"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface IncludedBenefit {
  text: string;
}

export const TransparentPricing: React.FC = () => {
  const benefits: IncludedBenefit[] = [
    { text: "Intégration et environnement de test gratuits" },
    { text: "Commission par transaction réussie" },
    { text: "Liens de paiement inclus" },
    { text: "Support technique en français" },
  ];

  return (
    <section
      id="tarifs"
      className="w-full bg-[#F6F4EE] flex justify-center py-[60px] lg:py-[76px] overflow-hidden"
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* Outer Section Frame: width 1309px, padding: 76px 213px (responsive), gap: 76px */}
      <div
        className="w-full max-w-[1309px] flex flex-col items-center px-6 sm:px-12 xl:px-[213px]"
        style={{
          boxSizing: "border-box",
          gap: "76px",
        }}
      >
        {/* Top Part: Pricing block (width 883px, height 348px, gap: 50px) */}
        <div
          className="w-full max-w-[883px] flex flex-col lg:flex-row items-center justify-between"
          style={{
            boxSizing: "border-box",
            gap: "50px",
          }}
        >
          {/* Left Column: Pricing details (width 371px, height 269px, gap 17px) */}
          <div
            className="flex flex-col items-start w-full lg:w-[380px] flex-none"
            style={{
              gap: "17px",
              boxSizing: "border-box",
            }}
          >
            {/* Section label: Roboto Mono 400, 11px, line-height 13px, #78848A */}
            <ScrollReveal direction="down" delay={40} distance={15}>
              <span
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "11px",
                  lineHeight: "13px",
                  color: "#78848A",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                TARIFS
              </span>
            </ScrollReveal>

            {/* Heading: Jura 400, 32px, line-height 115%, #0B3E33 */}
            <ScrollReveal direction="up" delay={100} distance={20}>
              <h2
                className="text-[28px] sm:text-[32px]"
                style={{
                  fontFamily: "'Jura', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "115%",
                  color: "#0B3E33",
                  width: "100%",
                  maxWidth: "380px",
                }}
              >
                Une tarification simple,
                <br />
                sans frais cachés
              </h2>
            </ScrollReveal>

            {/* Description: Inter 400, 15px, line-height 150%, #78848A */}
            <ScrollReveal direction="up" delay={160} distance={18}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "15px",
                  lineHeight: "150%",
                  color: "#78848A",
                  width: "100%",
                  maxWidth: "380px",
                }}
              >
                Pas d&apos;abonnement pour démarrer. Les conditions détaillées
                sont communiquées lors de l&apos;ouverture de votre compte.
              </p>
            </ScrollReveal>

            {/* Included benefits: width 380px, padding-top 10px, gap 10px */}
            <div
              className="flex flex-col items-start w-full max-w-[380px]"
              style={{
                paddingTop: "10px",
                gap: "10px",
                boxSizing: "border-box",
              }}
            >
              {benefits.map((benefit, index) => (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={200 + index * 60}
                  distance={14}
                  className="w-full"
                >
                  <div
                    className="flex flex-row items-center w-full transition-transform hover:translate-x-1 duration-200"
                    style={{
                      boxSizing: "border-box",
                      gap: "11px",
                      minHeight: "20px",
                    }}
                  >
                    {/* Check badge: 16px x 16px, background #E5F3E9, border-radius 20px */}
                    <div
                      className="flex-none flex items-center justify-center"
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#E5F3E9",
                        borderRadius: "20px",
                      }}
                    >
                      {/* SVG Check icon with border 1.5px solid #62A97B */}
                      <svg
                        width="9"
                        height="7"
                        viewBox="0 0 9 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 3.5L3.33333 5.5L8 1"
                          stroke="#62A97B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Description: Inter 400, 13.5px, line-height 145%, #153E35 */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "13.5px",
                        lineHeight: "145%",
                        color: "#153E35",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {benefit.text}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column: Photograph (width: 461px, height: 348px, border-radius: 22px) */}
          <ScrollReveal direction="left" delay={180} distance={28} duration={750} className="w-full max-w-[461px] flex-none">
            <div
              className="relative flex-none flex items-center justify-center w-full max-w-[461px] h-[260px] sm:h-[310px] lg:h-[348px] overflow-hidden rounded-[22px] shadow-sm transition-transform hover:scale-[1.01] duration-300"
              style={{
                boxSizing: "border-box",
                borderRadius: "22px",
              }}
            >
              <img
                src="/images/pricing-collaboration.png"
                alt="Deux collègues collaborant sur des ordinateurs portables"
                className="w-full h-full object-cover object-center rounded-[22px]"
                style={{
                  borderRadius: "22px",
                }}
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Part: Access invitation / Call to Action Card */}
        {/* width 883px, padding 48px 64px, gap 18px, background gradient */}
        <ScrollReveal direction="up" delay={150} distance={30} duration={800} className="w-full max-w-[883px]">
          <div
            className="w-full max-w-[883px] flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:-translate-y-1 duration-300"
            style={{
              boxSizing: "border-box",
              minHeight: "258px",
              padding: "48px 32px",
              gap: "18px",
              background: "linear-gradient(180deg, #07382D 0%, #063537 63.94%, #032D4E 99.99%, #032C50 100%)",
              borderRadius: "22px",
            }}
          >
            {/* Invitation heading: Inter 500, 30px, line-height 36px, #F3F4F1 */}
            <h2
              className="text-[24px] sm:text-[30px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "36px",
                color: "#F3F4F1",
                maxWidth: "755px",
              }}
            >
              Prêt à accepter les paiements mobiles ?
            </h2>

            {/* Invitation description: Inter 400, 15px, line-height 150%, #98AFAC */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "150%",
                color: "#98AFAC",
                maxWidth: "640px",
              }}
            >
              Parlez-nous de votre projet, nous vous accompagnons dans l&apos;intégration
              technique des API de paiement officielles.
            </p>

            {/* Invitation action: padding-top 14px */}
            <div
              className="flex items-center justify-center pt-[10px]"
              style={{
                minWidth: "160px",
                height: "49px",
              }}
            >
              <Link
                href="/dashboard"
                className="flex items-center justify-center hover:brightness-105 active:scale-95 transition-all shadow-md"
                style={{
                  boxSizing: "border-box",
                  minWidth: "160px",
                  height: "38px",
                  background: "#DBAE40",
                  borderRadius: "40px",
                  padding: "0px 24px",
                }}
              >
                {/* Button Label: Inter 500, 13px, line-height 15px, color #0B3E33 */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "13px",
                    lineHeight: "15px",
                    color: "#0B3E33",
                    whiteSpace: "nowrap",
                  }}
                >
                  Demander un accès
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
