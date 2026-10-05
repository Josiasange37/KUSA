"use client";

import React from "react";
import Link from "next/link";
import { AfricanMotifPattern, AfricanWatermarkBg } from "@/components/AfricanMotifPattern";
import { ArrowRight } from "lucide-react";

interface SocialProofCtaProps {
  onOpenDemoCheckout?: () => void;
}

export const SocialProofCta: React.FC<SocialProofCtaProps> = () => {
  return (
    <section className="py-12 sm:py-20 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0E3B33] via-[#0B2520] to-[#0D1B2A] text-white p-6 sm:p-12 lg:p-16 border border-[#D4AF37]/30 shadow-2xl overflow-hidden text-center">
          
          {/* Top & Bottom African Motif Bands */}
          <AfricanMotifPattern
            className="h-1.5 w-full bg-[#08131F] absolute top-0 left-0 right-0"
            variant="gold"
            opacity={0.6}
          />
          <AfricanMotifPattern
            className="h-1.5 w-full bg-[#08131F] absolute bottom-0 left-0 right-0"
            variant="gold"
            opacity={0.6}
          />

          <AfricanWatermarkBg opacity={0.03} />

          {/* Background Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5 sm:space-y-6">
            
            {/* Headline */}
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Prêt à accepter les{" "}
              <span className="text-[#D4AF37]">paiements mobiles</span> ?
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto font-normal leading-relaxed">
              Ouvrez votre compte en 30 secondes, générez vos premières clés de test et encaissez vos clients dans 12 pays africains.
            </p>

            {/* Action Button */}
            <div className="pt-3 sm:pt-4 flex items-center justify-center">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-bold text-sm text-[#0D1B2A] bg-gradient-to-r from-[#D4AF37] via-[#E8C866] to-[#BF9B2F] hover:shadow-kusa-gold transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Créer un compte</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
