"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface UseCaseItem {
  title: string;
  description: string;
}

export const UseCasesSection: React.FC = () => {
  const cases: UseCaseItem[] = [
    {
      title: "Commerce en ligne",
      description: "Encaissez vos commandes directement depuis votre site.",
    },
    {
      title: "Services & abonnements",
      description: "Facturez à montant fixe, mois après mois.",
    },
    {
      title: "Indépendants & créateurs",
      description: "Un lien de paiement suffit, sans site web.",
    },
    {
      title: "Plateformes & marketplaces",
      description: "Centralisez les encaissements via une seule API.",
    },
  ];

  return (
    <section
      id="usecases"
      className="w-full bg-[#F6F4EE] flex justify-center py-[60px] lg:py-[76px] overflow-hidden"
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* Container: width 1252px, padding: 76px 57px 76px 86px, gap: 120px */}
      <div
        className="w-full max-w-[1252px] flex flex-col lg:flex-row items-center justify-between"
        style={{
          boxSizing: "border-box",
          padding: "0px 57px 0px 86px",
          gap: "120px",
        }}
      >
        {/* Left Column: Photograph Frame (width: 550px, height: 404px to 505px, border-radius: 55px matching Figma image 10) */}
        <ScrollReveal direction="right" delay={100} distance={30} duration={800} className="w-full max-w-[550px] flex-none">
          <div
            className="relative flex-none flex items-center justify-center w-full max-w-[550px] overflow-hidden rounded-[55px] shadow-sm transition-transform hover:scale-[1.01] duration-300"
            style={{
              boxSizing: "border-box",
              borderRadius: "55px",
            }}
          >
            <img
              src="/images/usecase-retail-photo.jpg"
              alt="Commerçante encaissant avec TPE et smartphone"
              className="w-full h-auto object-cover object-center rounded-[55px]"
              style={{
                borderRadius: "55px",
              }}
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        {/* Right Column: Use case content (width: 439px, gap: 16px) */}
        <div
          className="flex flex-col items-start w-full lg:w-[439px] flex-none"
          style={{
            gap: "16px",
            boxSizing: "border-box",
          }}
        >
          {/* Section label: Roboto Mono 400, 11px, line-height 13px, #78848A — unbroken sentence */}
          <ScrollReveal direction="down" delay={40} distance={15}>
            <span
              className="whitespace-nowrap"
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "11px",
                lineHeight: "13px",
                color: "#78848A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              CAS D’USAGE
            </span>
          </ScrollReveal>

          {/* Heading: Junge 400, 32px, line-height 115%, #0B3E33 */}
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2
              className="text-[28px] sm:text-[32px]"
              style={{
                fontFamily: "'Junge', serif",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "115%",
                color: "#0B3E33",
                width: "100%",
                maxWidth: "460px",
              }}
            >
              Des boutiques aux
              <br />
              plateformes, un même flux
            </h2>
          </ScrollReveal>

          {/* Use case list: width: 100% */}
          <div
            className="flex flex-col items-start w-full"
            style={{
              boxSizing: "border-box",
            }}
          >
            {cases.map((item, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={160 + index * 80}
                distance={18}
                className="w-full"
              >
                <div
                  className="flex flex-row items-start w-full transition-transform hover:translate-x-1.5 duration-200 cursor-pointer"
                  style={{
                    boxSizing: "border-box",
                    padding: "18px 0px",
                    gap: "12px",
                    minHeight: "74px",
                    borderBottom: index < cases.length - 1 ? "1px solid #DFE3E8" : "none",
                  }}
                >
                  {/* Dot bullet: 6px x 6px ochre gold #DBAE40 diamond/dot */}
                  <div className="flex-none pt-1.5 select-none" aria-hidden="true">
                    <span
                      className="block rounded-xs"
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#DBAE40",
                        transform: "rotate(45deg)",
                      }}
                    />
                  </div>

                  {/* Detail column: gap 5px */}
                  <div
                    className="flex flex-col items-start flex-1"
                    style={{
                      gap: "5px",
                    }}
                  >
                    {/* Title: Inter 500, 14.5px, line-height 145%, #0B3E33 */}
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14.5px",
                        lineHeight: "145%",
                        color: "#0B3E33",
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description: Inter 400, 13px, line-height 145%, #78848A */}
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "145%",
                        color: "#78848A",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
