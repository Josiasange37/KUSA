"use client";

import React, { useState } from "react";
import { AfricanMotifDivider } from "@/components/AfricanMotifPattern";
import { Globe2, ShieldCheck, Zap, Smartphone, Check } from "lucide-react";

interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  zone: "CEMAC" | "UEMOA" | "RDC";
  currency: string;
  operators: string[];
  latency: string;
}

export const CoverageMapSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<"ALL" | "CEMAC" | "UEMOA" | "RDC">("ALL");

  const countries: CountryInfo[] = [
    {
      code: "CM",
      name: "Cameroun",
      flag: "🇨🇲",
      zone: "CEMAC",
      currency: "XAF",
      operators: ["Orange Money", "MTN MoMo", "Visa", "Mastercard"],
      latency: "1.8s",
    },
    {
      code: "CI",
      name: "Côte d'Ivoire",
      flag: "🇨🇮",
      zone: "UEMOA",
      currency: "XOF",
      operators: ["Wave (1 Clic)", "Orange Money", "MTN MoMo", "Moov"],
      latency: "1.4s",
    },
    {
      code: "SN",
      name: "Sénégal",
      flag: "🇸🇳",
      zone: "UEMOA",
      currency: "XOF",
      operators: ["Wave", "Orange Money", "Free Money", "Visa/MC"],
      latency: "1.5s",
    },
    {
      code: "GA",
      name: "Gabon",
      flag: "🇬🇦",
      zone: "CEMAC",
      currency: "XAF",
      operators: ["Airtel Money", "Moov Africa", "Cartes Bancaires"],
      latency: "2.1s",
    },
    {
      code: "CG",
      name: "Congo (Brazzaville)",
      flag: "🇨🇬",
      zone: "CEMAC",
      currency: "XAF",
      operators: ["MTN MoMo", "Airtel Money"],
      latency: "2.3s",
    },
    {
      code: "CD",
      name: "RDC (Kinshasa)",
      flag: "🇨🇩",
      zone: "RDC",
      currency: "CDF / USD",
      operators: ["M-Pesa", "Orange Money", "Airtel Money"],
      latency: "2.4s",
    },
    {
      code: "BJ",
      name: "Bénin",
      flag: "🇧🇯",
      zone: "UEMOA",
      currency: "XOF",
      operators: ["MTN MoMo", "Moov Money", "Celtiis Cash"],
      latency: "1.9s",
    },
    {
      code: "TG",
      name: "Togo",
      flag: "🇹🇬",
      zone: "UEMOA",
      currency: "XOF",
      operators: ["T-Money", "Moov Africa"],
      latency: "2.0s",
    },
    {
      code: "BF",
      name: "Burkina Faso",
      flag: "🇧🇫",
      zone: "UEMOA",
      currency: "XOF",
      operators: ["Orange Money", "Moov Africa"],
      latency: "2.2s",
    },
    {
      code: "TD",
      name: "Tchad",
      flag: "🇹🇩",
      zone: "CEMAC",
      currency: "XAF",
      operators: ["Airtel Money", "Moov Africa"],
      latency: "2.8s",
    },
    {
      code: "CF",
      name: "Centrafrique (RCA)",
      flag: "🇨🇫",
      zone: "CEMAC",
      currency: "XAF",
      operators: ["Orange Money", "Telecel"],
      latency: "2.9s",
    },
    {
      code: "GQ",
      name: "Guinée Équatoriale",
      flag: "🇬🇶",
      zone: "CEMAC",
      currency: "XAF",
      operators: ["Muni Dinero", "Cartes Bancaires"],
      latency: "2.5s",
    },
  ];

  const filteredCountries =
    selectedZone === "ALL"
      ? countries
      : countries.filter((c) => c.zone === selectedZone);

  return (
    <section id="countries" className="py-24 bg-[#F6F4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0E3B33]/10 border border-[#0E3B33]/20 text-[#0E3B33] text-xs font-bold mb-3">
            <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>COUVERTURE PANAFRICAINE UNIQUE</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0D1B2A] tracking-tight">
            12 Pays, 3 Devises Régionales,{" "}
            <span className="text-[#0E3B33]">Une Seule Intégration</span>
          </h2>

          <p className="mt-4 text-base text-gray-600">
            Encaissez dans la monnaie locale de vos acheteurs. KUSA unifie les zones CEMAC (XAF), UEMOA (XOF) et RDC (CDF) avec règlement automatique sur votre compte bancaire.
          </p>

          <AfricanMotifDivider className="mt-6" theme="gold" />

          {/* Zone Filter Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-gray-200 shadow-xs">
            <button
              onClick={() => setSelectedZone("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedZone === "ALL"
                  ? "bg-[#0E3B33] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Tous les 12 Pays
            </button>
            <button
              onClick={() => setSelectedZone("CEMAC")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedZone === "CEMAC"
                  ? "bg-[#0E3B33] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Zone CEMAC (XAF)
            </button>
            <button
              onClick={() => setSelectedZone("UEMOA")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedZone === "UEMOA"
                  ? "bg-[#0E3B33] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Zone UEMOA (XOF)
            </button>
            <button
              onClick={() => setSelectedZone("RDC")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedZone === "RDC"
                  ? "bg-[#0E3B33] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              RDC (CDF / USD)
            </button>
          </div>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCountries.map((c) => (
            <div
              key={c.code}
              className="p-5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#D4AF37] hover:shadow-kusa-card transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#0D1B2A] group-hover:text-[#0E3B33] transition-colors">
                      {c.name}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-mono font-semibold">
                      {c.zone} · {c.currency}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF4F0] text-[#0E3B33]">
                  Actif
                </span>
              </div>

              {/* Operators list */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">
                  Canaux d'encaissement :
                </span>
                <div className="flex flex-wrap gap-1">
                  {c.operators.map((op, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 text-[10px] font-medium border border-gray-200/60"
                    >
                      {op}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer SLA */}
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-[#D4AF37]" />
                  <span>Latence push :</span>
                </span>
                <span className="font-mono font-bold text-[#0E3B33]">{c.latency}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
