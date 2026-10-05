"use client";

import React from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface DevFeature {
  title: string;
  description: string;
}

export const DeveloperSection: React.FC = () => {
  const topRowFeatures: DevFeature[] = [
    {
      title: "Sandbox complet",
      description: "Testez sans mouvement d'argent réel.",
    },
    {
      title: "Webhooks fiables",
      description: "Recevez automatiquement les statuts.",
    },
  ];

  const bottomRowFeatures: DevFeature[] = [
    {
      title: "Statuts normalisés",
      description: "pending, success, failed.",
    },
    {
      title: "Documentation claire",
      description: "Exemples prêts à copier.",
    },
  ];

  const codeBodyText = `curl -X POST https://api.kusa.africa/v1/payments \\
  -H "Authorization: Bearer kusa_live_demo_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 15000,
    "currency": "XAF",
    "channel": "orange_money",
    "customer": { "phone": "+237690000000" },
    "callback_url": "https://votre-site.cm/webhook"
  }'`;

  const responseText = '{ "status": "succeeded", "reference": "kusa_01x" }';

  return (
    <section
      id="developer"
      className="w-full relative flex justify-center overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #071D14 0%, #0B291E 20%, #0E2E24 50%, #0B291E 80%, #071D14 100%)",
        isolation: "isolate",
      }}
    >
      {/* Edge-to-edge Bogolan motif full-width background */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          backgroundImage: "url('/images/dev-full-bg-texture.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
        aria-hidden="true"
      />

      {/* Layer 1: Top section accent bar (#0B3E33, height: 4px, top: 0px, left: 0px) */}
      <div
        className="absolute top-0 left-0 w-full z-10"
        style={{
          height: "4px",
          background: "#0B3E33",
        }}
        aria-hidden="true"
      />

      {/* Centered Content Frame: width 1309px x min-height 481px */}
      <div
        className="relative z-20 w-full max-w-[1309px] min-h-[481px] flex flex-col lg:flex-row items-center justify-between"
        style={{
          boxSizing: "border-box",
          padding: "76px 123px 107px 168px",
          gap: "82px",
          isolation: "isolate",
        }}
      >

        {/* Layer 2: Left Column: Developer Copy & Features (width: 440px, height: 320px) */}
        <div
          className="flex flex-col items-start w-full lg:w-[440px] flex-none"
          style={{
            zIndex: 2,
            gap: "16px",
            boxSizing: "border-box",
          }}
        >
          {/* Section label: Roboto 400, 11px, line-height 13px, #DBAE40 */}
          <ScrollReveal direction="down" delay={40} distance={15}>
            <span
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "11px",
                lineHeight: "13px",
                color: "#DBAE40",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              DÉVELOPPEURS
            </span>
          </ScrollReveal>

          {/* Heading: Jura 700, 32px, line-height 115%, #F0F2F2 */}
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2
              className="text-[28px] sm:text-[32px]"
              style={{
                fontFamily: "'Jura', sans-serif",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "115%",
                color: "#F0F2F2",
                width: "100%",
                maxWidth: "440px",
              }}
            >
              Une API pensée pour être
              <br />
              intégrée en une après-midi
            </h2>
          </ScrollReveal>

          {/* Description: Roboto 300, 15px, line-height 150%, #A1AFBA */}
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontStyle: "normal",
                fontWeight: 300,
                fontSize: "15px",
                lineHeight: "150%",
                color: "#A1AFBA",
                width: "100%",
                maxWidth: "440px",
              }}
            >
              Des endpoints REST prévisibles, des réponses JSON explicites, des
              webhooks signés et un environnement de test complet. Web ou mobile,
              l&apos;intégration reste la même.
            </p>
          </ScrollReveal>

          {/* Developer features grid: 440px width x 140px height, padding-top: 8px, gap: 10px */}
          <div
            className="flex flex-col items-start w-full max-w-[440px]"
            style={{
              paddingTop: "8px",
              gap: "10px",
              boxSizing: "border-box",
            }}
          >
            {/* Feature row 0: gap 12px, height 62px */}
            <div
              className="flex flex-row items-start w-full"
              style={{
                gap: "12px",
                boxSizing: "border-box",
              }}
            >
              {topRowFeatures.map((feat, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  delay={220 + idx * 80}
                  distance={18}
                  className="flex-1"
                >
                  <div
                    className="flex flex-col items-start w-full transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 cursor-pointer"
                    style={{
                      boxSizing: "border-box",
                      minHeight: "62px",
                      padding: "12px 14px",
                      gap: "4px",
                      background: "rgba(255, 255, 255, 0.0313726)",
                      border: "1px solid rgba(255, 255, 255, 0.0784314)",
                      borderRadius: "12px",
                    }}
                  >
                    {/* Card Title: Jura 400, 12.5px, line-height 145%, #CED6DB */}
                    <span
                      style={{
                        fontFamily: "'Jura', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "12.5px",
                        lineHeight: "145%",
                        color: "#CED6DB",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {feat.title}
                    </span>

                    {/* Card Description: Inter 400, 11px, line-height 140%, #91A0AB */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "11px",
                        lineHeight: "140%",
                        color: "#91A0AB",
                      }}
                    >
                      {feat.description}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Feature row 1: gap 12px, height 62px */}
            <div
              className="flex flex-row items-start w-full"
              style={{
                gap: "12px",
                boxSizing: "border-box",
              }}
            >
              {bottomRowFeatures.map((feat, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  delay={360 + idx * 80}
                  distance={18}
                  className="flex-1"
                >
                  <div
                    className="flex flex-col items-start w-full transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 cursor-pointer"
                    style={{
                      boxSizing: "border-box",
                      minHeight: "62px",
                      padding: "12px 14px",
                      gap: "4px",
                      background: "rgba(255, 255, 255, 0.0313726)",
                      border: "1px solid rgba(255, 255, 255, 0.0784314)",
                      borderRadius: "12px",
                    }}
                  >
                    {/* Card Title: Jura 400, 12.5px, line-height 145%, #CED6DB */}
                    <span
                      style={{
                        fontFamily: "'Jura', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "12.5px",
                        lineHeight: "145%",
                        color: "#CED6DB",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {feat.title}
                    </span>

                    {/* Card Description: Inter 400, 11px, line-height 140%, #91A0AB */}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "11px",
                        lineHeight: "140%",
                        color: "#91A0AB",
                      }}
                    >
                      {feat.description}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 3: Right Column: API Code Window (width: 521px, height: 328px) */}
        <ScrollReveal direction="left" delay={200} distance={30} duration={750} className="w-full max-w-[521px] flex-none">
          <div
            className="flex flex-col items-start w-full max-w-[521px] flex-none transition-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] duration-300"
            style={{
              zIndex: 3,
              boxSizing: "border-box",
              width: "521px",
              height: "328px",
              background: "#07131E",
              border: "1px solid rgba(255, 255, 255, 0.054902)",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 16px 40px -10px rgba(0,0,0,0.5), 0 0 35px rgba(11,62,51,0.25)",
            }}
          >
          {/* Top Code Toolbar: height: 36px, padding: 0px 15px, gap: 8px */}
          <div
            className="flex flex-row items-center w-full"
            style={{
              boxSizing: "border-box",
              height: "36px",
              padding: "0px 15px",
              gap: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.0627451)",
            }}
          >
            {/* Window control: Red (#D15449, 7px x 7px) */}
            <span
              className="flex-none rounded-full"
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#D15449",
              }}
            />

            {/* Window control: Yellow (#D3AD43, 7px x 7px) */}
            <span
              className="flex-none rounded-full"
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#D3AD43",
              }}
            />

            {/* Window control: Green (#4F9A71, 7px x 7px) */}
            <span
              className="flex-none rounded-full"
              style={{
                width: "7px",
                height: "7px",
                backgroundColor: "#4F9A71",
              }}
            />

            {/* Request Method Label: Roboto Mono 400, 11px, line-height 15px, #8896A4 */}
            <span
              className="ml-1"
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "11px",
                lineHeight: "15px",
                color: "#8896A4",
              }}
            >
              POST /v1/payments
            </span>
          </div>

          {/* Request Code Area: height: 210px, padding: 0px 16px, flex-1 */}
          <div
            className="w-full flex-1 overflow-x-auto flex items-center"
            style={{
              padding: "0px 16px",
              height: "210px",
              boxSizing: "border-box",
            }}
          >
            {/* Payment request: Roboto Mono 400, 13px, line-height 165% (21px), #ACBAC5 */}
            <pre
              style={{
                margin: 0,
                fontFamily: "'Roboto Mono', monospace",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "165%",
                color: "#ACBAC5",
                whiteSpace: "pre",
              }}
            >
              {codeBodyText}
            </pre>
          </div>

          {/* Response Output Box: height: 48px, padding: 14px 16px, border: 1px solid #17222C */}
          <div
            className="w-full flex items-center"
            style={{
              boxSizing: "border-box",
              height: "48px",
              padding: "14px 16px",
              borderTop: "1px solid #17222C",
            }}
          >
            {/* Response Text: Roboto Mono 400, 15px, line-height 20px, #439764 */}
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "20px",
                color: "#439764",
                whiteSpace: "nowrap",
              }}
            >
              {responseText}
            </span>
          </div>
        </div>
      </ScrollReveal>
    </div>
    </section>
  );
};
