import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CodeWindow } from "@/components/kusa/CodeWindow";
import { Label, Arrow } from "@/components/kusa/home";
import { CREATE_PAYMENT, CREATE_PAYMENT_RESPONSE } from "@/lib/dev";

const DEV_FEATURES = [
  { title: "Sandbox complet", description: "Testez sans mouvement d'argent réel." },
  { title: "Webhooks signés", description: "Statuts reçus automatiquement, HMAC-SHA256." },
  { title: "Statuts normalisés", description: "pending, success, failed. Partout." },
  { title: "cURL, Node.js, PHP, Python", description: "Exemples prêts à copier." },
];

export function DevSection() {
  return (
    <section id="developpeurs" aria-labelledby="dev-h" className="dev-band w-full flex justify-center overflow-hidden">
      <div className="relative z-20 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-between py-16 sm:py-20 lg:py-[96px] px-4 sm:px-8 xl:px-0 gap-10 lg:gap-16">
        <div className="flex flex-col items-start w-full lg:w-[480px] flex-none gap-4">
          <ScrollReveal direction="down" delay={40} distance={15}>
            <Label dark>Développeurs</Label>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100} distance={20}>
            <h2 id="dev-h" className="font-jura font-bold text-[28px] sm:text-[32px] leading-[118%] text-[#F0F2F2]">
              Une API pensée pour être{" "}
              <br className="hidden sm:block" />
              intégrée en une après-midi
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={160} distance={18}>
            <p className="font-roboto font-light text-[15px] leading-[150%] text-[#A1AFBA]">
              REST prévisible, JSON explicite, webhooks signés, sandbox complet. Web ou mobile, la même intégration.
            </p>
          </ScrollReveal>

          <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full pt-2">
            {DEV_FEATURES.map((f, i) => (
              <li key={f.title}>
                <ScrollReveal direction="up" delay={220 + i * 60} distance={18} className="h-full">
                  <div
                    className="h-full flex flex-col gap-1 p-3.5 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20"
                    style={{ minHeight: 62, background: "rgba(255,255,255,0.031)", border: "1px solid rgba(255,255,255,0.078)", borderRadius: 12 }}
                  >
                    <span className="font-jura font-semibold text-[14px] leading-[145%] text-[#CED6DB]">{f.title}</span>
                    <span className="font-inter text-[13px] leading-[140%] text-[#91A0AB]">{f.description}</span>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          <ScrollReveal direction="up" delay={480} distance={14} className="w-full xs:w-auto">
            <div className="flex flex-col xs:flex-row gap-3 pt-3">
              <Link href="/developpeurs" className="group inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-full bg-gold text-on-gold font-jura font-bold text-[14px] transition-all hover:brightness-105 active:scale-95 whitespace-nowrap">
                Lire la documentation
                <Arrow />
              </Link>
              <Link href="/inscription" className="inline-flex items-center justify-center h-[44px] px-5 rounded-full border border-white/20 text-[#F0F2F2] font-jura font-bold text-[14px] transition-all hover:bg-white/10 active:scale-95 whitespace-nowrap">
                Obtenir mes clés de test
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="left" delay={200} distance={30} duration={750} className="w-full max-w-[600px] min-w-0">
          <CodeWindow title="POST /v1/payments" samples={CREATE_PAYMENT} response={CREATE_PAYMENT_RESPONSE} responseLabel="Réponse 201" />
        </ScrollReveal>
      </div>
    </section>
  );
}
