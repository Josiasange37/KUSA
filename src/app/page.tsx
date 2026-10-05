"use client";

import React, { useState } from "react";
import { VitrineNavbar } from "@/components/vitrine/VitrineNavbar";
import { HeroSection } from "@/components/vitrine/HeroSection";
import { StatsRibbon } from "@/components/vitrine/StatsRibbon";
import { BentoFeatures } from "@/components/vitrine/BentoFeatures";
import { DeveloperSection } from "@/components/vitrine/DeveloperSection";
import { UseCasesSection } from "@/components/vitrine/UseCasesSection";
import { OnboardingSteps } from "@/components/vitrine/OnboardingSteps";
import { TransparentPricing } from "@/components/vitrine/TransparentPricing";
import { VitrineFooter } from "@/components/vitrine/VitrineFooter";
import { CheckoutWidgetModal } from "@/components/CheckoutWidgetModal";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function VitrineLandingPage() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutTitle, setCheckoutTitle] = useState("Commande Démo #CMD-8921");
  const [checkoutAmount, setCheckoutAmount] = useState(25000);

  const handleOpenDemoCheckout = (title?: string, amount?: number) => {
    if (title) setCheckoutTitle(title);
    if (amount) setCheckoutAmount(amount);
    setCheckoutModalOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#0D1B2A] overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#0D1B2A]">
        {/* Floating Glass Navbar */}
        <VitrineNavbar onOpenDemoCheckout={() => handleOpenDemoCheckout()} />

        <main className="flex-1">
          {/* Asymmetric Hero with Live Interactive Showcase */}
          <HeroSection
            onOpenDemoCheckout={() =>
              handleOpenDemoCheckout("Facture Afritech #CMD-8921", 25000)
            }
          />

          {/* Partner Trust Ribbon (Orange, MTN) */}
          <StatsRibbon />

          {/* Bento Features: 3 Cards in a Row */}
          <BentoFeatures />

          {/* Developer First Section with Live Code Editor & 2x2 Feature Grid */}
          <DeveloperSection />

          {/* Business Use Cases: Retail Photo Left + Vertical Checklist Right */}
          <UseCasesSection />

          {/* 3-Step Onboarding Journey */}
          <OnboardingSteps />

          {/* Tarifs et accès: Checklist + Photo + Access Invitation Card */}
          <TransparentPricing />
        </main>

        {/* Institutional Luxury Footer with Pre-footer Tech Banner & Africa Map */}
        <VitrineFooter />

        {/* 3-Tap Mobile Money & Card Checkout Simulation Modal */}
        <CheckoutWidgetModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          title={checkoutTitle}
          amount={checkoutAmount}
          currency="XAF"
        />
      </div>
    </SmoothScrollProvider>
  );
}
