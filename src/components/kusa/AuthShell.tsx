import { ScrollReveal } from "@/components/ui/ScrollReveal";

/* Form pages (account, sign-in, contact): the form on cream at left,
   the hero's woven field and woman cutout on the right. */
export function AuthShell({
  title,
  intro,
  children,
  asideTitle,
  image = { src: "/images/hero-woman-hires.png", alt: "Entrepreneure africaine montrant la confirmation d'un paiement sur son téléphone" },
}: {
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
  asideTitle: string;
  image?: { src: string; alt: string };
}) {
  return (
    <div className="bg-cream grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] min-h-[calc(100svh-var(--nav-h))]">
      <section className="px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 flex justify-center" aria-labelledby="form-h">
        <div className="w-full max-w-[600px] flex flex-col gap-6">
          <ScrollReveal direction="up" delay={60} distance={20}>
            <h1 id="form-h" className="font-junge text-[34px] sm:text-[46px] leading-[110%] tracking-[-0.02em] text-forest">
              {title}
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={140} distance={16}>
            <div className="font-jura font-semibold text-[16px] sm:text-[17px] leading-[155%] text-slate">{intro}</div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200} distance={16}>
            <div className="pt-2">{children}</div>
          </ScrollReveal>
        </div>
      </section>

      <aside className="relative overflow-hidden bg-surface-2 hidden lg:flex flex-col justify-between" aria-labelledby="aside-h">
        <div className="absolute inset-0 woven pointer-events-none select-none" aria-hidden="true" />
        <p id="aside-h" className="relative z-10 m-8 lg:m-12 font-junge text-[32px] xl:text-[40px] leading-[112%] tracking-[-0.02em] text-forest max-w-[420px]">
          {asideTitle}
        </p>
        <div className="relative z-10 hidden lg:flex justify-center items-end px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="w-full max-w-[420px] h-auto object-contain object-bottom select-none"
            style={{ transform: "rotate(-1.66deg)", transformOrigin: "bottom center" }}
          />
        </div>
      </aside>
    </div>
  );
}
