"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductCardData {
  tag: string;
  tagWidth: string;
  title: string;
  description: string;
  features: string[];
}

export const BentoFeatures: React.FC = () => {
  const cards: ProductCardData[] = [
    {
      tag: "API",
      tagWidth: "26px",
      title: "API de paiement unifiée",
      description:
        "Une seule intégration pour Orange Money et Mobile Money, sur votre plateforme web ou mobile. D'autres moyens de paiement seront ajoutés progressivement.",
      features: [
        "REST & JSON",
        "Webhooks de statut",
        "Environnement de test",
      ],
    },
    {
      tag: "NO-CODE",
      tagWidth: "51px",
      title: "Liens de paiement",
      description:
        "Créez un lien à montant fixe ou variable et envoyez-le à vos clients par WhatsApp, SMS ou email. Aucun développement requis.",
      features: [
        "Montant fixe ou libre",
        "Partage instantané",
        "Suivi en temps réel",
      ],
    },
    {
      tag: "PILOTAGE",
      tagWidth: "51px",
      title: "Suivi des transactions",
      description:
        "Visualisez les paiements réussis, en attente et échoués, avec des statuts explicites et une traçabilité complète des échanges.",
      features: [
        "Statuts clairs",
        "Historique exportable",
        "Rapprochement simplifié",
      ],
    },
  ];

  return (
    <section
      id="produits"
      className="w-full bg-[#F6F4EE] flex justify-center py-[60px] lg:py-[76px] px-6 sm:px-12 lg:px-0"
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* Produits Section Container: max-w-[1309px] centered */}
      <div
        className="w-full max-w-[1309px] flex flex-col items-start"
        style={{
          boxSizing: "border-box",
          gap: "37px",
        }}
      >
        {/* Section Introduction (max-width: 540px, gap: 15px) */}
        <div
          className="flex flex-col items-start w-full max-w-[540px]"
          style={{
            gap: "15px",
          }}
        >
          {/* Section label: PRODUITS — Roboto Mono 400, 11px */}
          <ScrollReveal direction="down" delay={40} distance={15}>
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "11px",
                lineHeight: "14px",
                letterSpacing: "0.1em",
                color: "#78848A",
                textTransform: "uppercase",
              }}
            >
              PRODUITS
            </span>
          </ScrollReveal>

          {/* Heading — Junge 400, 32px, line-height 115% */}
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2
              className="text-[28px] sm:text-[32px]"
              style={{
                fontFamily: "'Junge', serif",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "115%",
                color: "#0B3E33",
              }}
            >
              Deux façons d&apos;encaisser,
              <br />
              une seule infrastructure
            </h2>
          </ScrollReveal>

          {/* Description — Jura 700, 15px, line-height 150% */}
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "15px",
                lineHeight: "150%",
                color: "#78848A",
              }}
            >
              Que vous soyez une entreprise avec une équipe technique ou un indépendant
              sans site web, KUSA s&apos;adapte à votre manière de vendre.
            </p>
          </ScrollReveal>
        </div>

        {/* Product Offerings Row: 3 cards, gap 20px, stretch to fill with staggered reveal */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 w-full"
          style={{
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          {cards.map((card, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={200 + idx * 120}
              distance={25}
              className="w-full"
            >
              <div
                className="relative flex flex-col items-start bg-[#FFFFFF] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#0B3E33]/30 cursor-pointer h-full"
                style={{
                  boxSizing: "border-box",
                  padding: "24px",
                  gap: "18px",
                  isolation: "isolate",
                  border: "1px solid #E3E5E2",
                  boxShadow: "0px 8px 18px rgba(21, 42, 32, 0.07)",
                  borderRadius: "16px",
                  minHeight: "280px",
                }}
              >
              {/* Card texture: African geometric pattern at top-right corner (70x67px) */}
              <div
                className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden"
                style={{
                  width: "70px",
                  height: "67px",
                  zIndex: 0,
                  borderTopRightRadius: "16px",
                }}
                aria-hidden="true"
              >
                <img
                  src="/images/product-pattern-motif.png"
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Product tag — Inter 600, 10px, bg #E7F2ED, border-radius 4px */}
              <div
                className="flex flex-row items-center justify-center flex-none"
                style={{
                  minWidth: card.tagWidth,
                  height: "22px",
                  padding: "4px 8px",
                  background: "#E7F2ED",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "10px",
                    lineHeight: "145%",
                    color: "#0B3E33",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.tag}
                </span>
              </div>

              {/* Product description block (title + description), gap 10px */}
              <div
                className="flex flex-col items-start w-full"
                style={{
                  gap: "10px",
                  zIndex: 2,
                }}
              >
                {/* Product title — Roboto 700, 17px, line-height 140% */}
                <h3
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "17px",
                    lineHeight: "140%",
                    color: "#0B3E33",
                  }}
                >
                  {card.title}
                </h3>

                {/* Description — Jura 700, 13.5px, line-height 150% */}
                <p
                  style={{
                    fontFamily: "'Jura', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    lineHeight: "150%",
                    color: "#78848A",
                  }}
                >
                  {card.description}
                </p>
              </div>

              {/* Feature list — gap 8px */}
              <div
                className="flex flex-col items-start w-full"
                style={{
                  gap: "8px",
                  zIndex: 3,
                }}
              >
                {card.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex flex-row items-center w-full"
                    style={{
                      gap: "8px",
                      height: "18px",
                    }}
                  >
                    {/* Gold Bullet — 4x4px, #DBAE40 */}
                    <span
                      className="flex-none rounded-full"
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#DBAE40",
                      }}
                    />

                    {/* Feature text — Inter 400, 12.5px, line-height 145% */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12.5px",
                        lineHeight: "145%",
                        color: "#0B3E33",
                      }}
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      </div>
    </section>
  );
};
