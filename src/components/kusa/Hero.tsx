import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* The original KUSA hero, kept as it was: Junge headline, Jura copy,
   woven geometry on the right and the woman with the confirmed payment. */
export function Hero() {
  return (
    <section className="relative bg-cream overflow-hidden w-full vh-safe flex items-center">
      {/* Woven geometry pattern on the right side */}
      <div
        className="hidden sm:block absolute top-0 right-0 h-full pointer-events-none select-none z-0 opacity-40 sm:opacity-70 lg:opacity-100 woven"
        style={{ left: "max(calc(50% + 654.5px - 485px), 52%)", right: 0 }}
        aria-hidden="true"
      />

      <div
        className="mx-auto h-full vh-safe flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-[160px] max-w-7xl w-full relative z-10 py-8 sm:py-12 lg:py-0 lg:pb-16"
        style={{ isolation: "isolate" }}
      >
        {/* Left column: hero copy */}
        <div className="flex flex-col items-start justify-center flex-none z-10 text-left w-full lg:w-[520px] xl:w-[580px] gap-6 sm:gap-7">
          <ScrollReveal direction="up" delay={80} distance={24}>
            <h1
              className="font-junge text-[40px] xs:text-[44px] sm:text-[50px] lg:text-[58px] xl:text-[64px] break-words"
              style={{ fontWeight: 400, lineHeight: "110%", color: "var(--color-forest)", letterSpacing: "-0.02em" }}
            >
              L&apos;infrastructure
              <br />
              de paiement
              <br />
              des entreprises
              <br />
              africaines
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={220} distance={20}>
            <p
              className="font-jura text-[15px] sm:text-[18px] xl:text-[19px]"
              style={{ fontWeight: 600, lineHeight: "155%", color: "var(--color-slate)", maxWidth: "540px" }}
            >
              KUSA facilite l&apos;intégration des API de paiement officielles. Encaissez en ligne sur votre site ou
              votre application, ou envoyez un simple lien de paiement à vos clients.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} distance={20} className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/inscription"
                className="hover:brightness-110 transition-all flex justify-center items-center shadow-md active:scale-95 w-full sm:w-auto sm:min-w-[195px] h-[48px] px-6 rounded-full bg-brand"
              >
                <span className="font-jura text-[15px] leading-[18px] font-bold text-white whitespace-nowrap">
                  Demander un accès
                </span>
              </Link>
              <Link
                href="/developpeurs"
                className="hover:bg-surface-2 transition-all flex justify-center items-center shadow-xs border border-line-2 active:scale-95 w-full sm:w-auto sm:min-w-[205px] h-[48px] px-6 rounded-full bg-surface"
              >
                <span className="font-jura text-[15px] leading-[18px] font-bold text-forest whitespace-nowrap">
                  Voir la documentation
                </span>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={360} distance={15}>
            <div
              className="pt-1 text-[12px] sm:text-[14px] font-jura"
              style={{ fontWeight: 700, lineHeight: "16px", color: "var(--color-slate)", letterSpacing: "0.04em" }}
            >
              XAF · REST API · Webhooks · Sandbox
            </div>
          </ScrollReveal>
        </div>

        {/* Right column: woman cutout */}
        <div className="relative flex items-end justify-center self-center lg:self-end mt-8 lg:mt-0 w-full lg:w-auto">
          <ScrollReveal direction="left" delay={200} distance={30} duration={800}>
            <div
              className="relative w-[260px] sm:w-[340px] md:w-[380px] lg:w-[430px] xl:w-[480px] h-auto transition-transform hover:scale-[1.01] duration-300 mx-auto"
              style={{ transform: "rotate(-1.66deg)", transformOrigin: "bottom center" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-woman-hires.png"
                alt="Entrepreneure africaine encaissant avec KUSA"
                className="w-full h-auto object-contain object-bottom pointer-events-none select-none max-h-[380px] sm:max-h-[480px] lg:max-h-[580px] xl:max-h-[640px]"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
