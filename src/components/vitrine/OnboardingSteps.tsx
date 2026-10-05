"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface StepItem {
  number: string;
  title: string;
  description: string;
}

export const OnboardingSteps: React.FC = () => {
  const steps: StepItem[] = [
    {
      number: "01",
      title: "Créez votre compte",
      description: "Renseignez votre activité et récupérez vos clés d'API de test.",
    },
    {
      number: "02",
      title: "Intégrez l'API",
      description: "Quelques lignes de code pour déclencher un paiement ou générer un lien.",
    },
    {
      number: "03",
      title: "Encaissez",
      description: "Vos clients paient via Orange Money ou Mobile Money, vous recevez le statut en direct.",
    },
  ];

  return (
    <section
      id="onboarding"
      className="w-full bg-[#FFFFFF] flex justify-center py-12 sm:py-16 lg:py-[76px] overflow-hidden"
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* Centered Container: responsive padding and gap */}
      <div
        className="w-full max-w-[1309px] flex flex-col items-start px-4 sm:px-8 xl:px-[213px] gap-8 sm:gap-11"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* Step introduction */}
        <ScrollReveal direction="up" delay={50} distance={20}>
          <div
            className="flex flex-col items-start w-full max-w-[500px]"
            style={{
              boxSizing: "border-box",
            }}
          >
            {/* Heading: Junge 400, 32px, line-height 115%, #0B3E33 */}
            <h2
              className="text-[26px] sm:text-[32px] break-words"
              style={{
                fontFamily: "'Junge', serif",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "115%",
                color: "#0B3E33",
                width: "100%",
                maxWidth: "520px",
              }}
            >
              De l&apos;inscription au
              <br />
              premier encaissement
            </h2>
          </div>
        </ScrollReveal>

        {/* Onboarding steps row: responsive grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-[883px]"
          style={{
            boxSizing: "border-box",
          }}
        >
          {steps.map((step, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={140 + idx * 120}
              distance={22}
              className="w-full md:max-w-[273px]"
            >
              <div
                className="flex flex-col items-start w-full md:max-w-[273px] transition-transform hover:-translate-y-1 duration-200 cursor-pointer"
                style={{
                  boxSizing: "border-box",
                  gap: "12px",
                }}
              >
                {/* Step marker: width 273px, height 28px, padding-bottom 12px, border-bottom 1px solid #E3E5E2 */}
                <div
                  className="flex flex-row items-start w-full"
                  style={{
                    boxSizing: "border-box",
                    paddingBottom: "12px",
                    height: "28px",
                    borderBottom: "1px solid #E3E5E2",
                  }}
                >
                  {/* Step number: Roboto Mono 400, 12px, line-height 15px, color #DBAE40 */}
                  <span
                    style={{
                      fontFamily: "'Roboto Mono', monospace",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#DBAE40",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Title: Jura 600, 15.5px, line-height 145%, color #0B3E33 */}
                <h3
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "15.5px",
                    lineHeight: "145%",
                    color: "#0B3E33",
                    width: "100%",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description: Inter 400, 13px, line-height 150%, color #78848A */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "150%",
                    color: "#78848A",
                    width: "100%",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
