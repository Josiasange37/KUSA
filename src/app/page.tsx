import { Hero } from "@/components/kusa/Hero";
import { DevSection } from "@/components/kusa/DevSection";
import { Faq, FinalCta, MidCta, PartnerRibbon, PricingTeaser, Products, Sectors, Steps, Trust } from "@/components/kusa/home";

/* Order follows jeko.africa: hero → products → call to action → sectors →
   developers → how to start → pricing → partners & security → FAQ → closing call. */
export default function Home() {
  return (
    <>
      <Hero />
      <PartnerRibbon />
      <Products />
      <MidCta />
      <Sectors />
      <DevSection />
      <Steps />
      <PricingTeaser />
      <Trust />
      <Faq />
      <FinalCta />
    </>
  );
}
