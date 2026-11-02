import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Label } from "@/components/kusa/home";

/* Inner-page opening in the hero's language: cream ground, Junge title,
   Jura copy, woven geometry on the right (or a picture when one fits). */
export function PageHeader({
  label,
  title,
  intro,
  children,
  image,
}: {
  label: string;
  title: React.ReactNode;
  intro: string;
  children?: React.ReactNode;
  image?: { src: string; alt: string; position?: string };
}) {
  return (
    <section className="relative bg-cream overflow-hidden w-full">
      <div className="hidden md:block absolute top-0 right-0 bottom-0 w-[42%] woven pointer-events-none select-none" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 xl:px-0 py-14 sm:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10">
        <div className="flex flex-col items-start gap-5 sm:gap-6 max-w-[620px]">
          <ScrollReveal direction="down" delay={40} distance={15}>
            <Label>{label}</Label>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={80} distance={24}>
            <h1 className="font-junge text-[34px] xs:text-[40px] sm:text-[52px] lg:text-[58px] leading-[110%] tracking-[-0.02em] text-forest">
              {title}
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200} distance={20}>
            <p className="font-jura font-semibold text-[16px] sm:text-[18px] leading-[155%] text-slate max-w-[560px]">{intro}</p>
          </ScrollReveal>
          {children && (
            <ScrollReveal direction="up" delay={280} distance={20} className="w-full sm:w-auto">
              {children}
            </ScrollReveal>
          )}
        </div>
        {image && (
          <ScrollReveal direction="left" delay={200} distance={30} duration={800}>
            <div className="relative w-full md:w-[360px] lg:w-[440px] aspect-[4/3] md:aspect-[4/5] overflow-hidden rounded-[22px] shadow-sm">
              <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 768px) 100vw, 440px" className="object-cover" style={{ objectPosition: image.position ?? "center" }} />
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

export function PillLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const cls =
    variant === "primary"
      ? "bg-brand text-white shadow-md hover:brightness-110"
      : "bg-surface text-forest border border-line-2 shadow-xs hover:bg-surface-2";
  return (
    <Link href={href} className={`inline-flex justify-center items-center h-[48px] px-6 rounded-full font-jura font-bold text-[15px] whitespace-nowrap transition-all active:scale-95 w-full sm:w-auto ${cls}`}>
      {children}
    </Link>
  );
}
