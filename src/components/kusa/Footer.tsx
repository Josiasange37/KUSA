import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/content";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions/paiement-en-boutique", label: "Paiement en boutique" },
      { href: "/solutions/paiement-en-ligne", label: "Paiement en ligne" },
      { href: "/solutions/liens-de-paiement", label: "Liens de paiement" },
      { href: "/tarifs", label: "Tarifs" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contacter le service" },
      { href: "/#questions", label: "FAQ" },
    ],
  },
  {
    title: "Développeurs",
    links: [
      { href: "/developpeurs", label: "Documentation" },
      { href: "/developpeurs#reference", label: "Référence API" },
      { href: "/developpeurs#webhooks", label: "Webhooks" },
      { href: "/developpeurs#environnements", label: "Environnement de test" },
    ],
  },
  {
    title: "Mon compte",
    links: [
      { href: "/inscription", label: "Ouvrir un compte" },
      { href: "/connexion", label: "Se connecter" },
      { href: "/connexion?oubli=1", label: "Mot de passe oublié" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full flex justify-center overflow-hidden bg-night">
      <div className="w-full max-w-[1200px] flex flex-col items-start px-4 sm:px-8 xl:px-0 pt-14 sm:pt-20 pb-8 gap-8 sm:gap-10">
        {/* Invitation + world map */}
        <div className="w-full relative" style={{ minHeight: 183 }}>
          <div className="flex flex-col items-start relative z-10 gap-[18px] max-w-[460px]">
            <h2 className="font-inter font-bold text-[22px] leading-[145%] text-[#D3DADF]">
              KUSA est un service d&apos;intégration technique.
            </h2>
            <p className="font-inter text-[14px] leading-[155%] text-[#A4B2BE] max-w-[420px]">
              Nous ne sommes ni un établissement de paiement, ni un PSP. Nous facilitons uniquement l&apos;intégration
              des API de paiement officielles.
            </p>
            <Link
              href="/inscription"
              className="group flex items-center justify-between gap-4 h-[40px] pl-[18px] pr-[12px] rounded-[6px] bg-gold shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <span className="font-jura font-bold text-[14px] text-[#111827] whitespace-nowrap">Ouvrir un compte</span>
              <span className="flex items-center justify-center flex-none w-[20px] h-[20px] rounded-full bg-[#fff] transition-transform group-hover:translate-x-0.5">
                <svg width="9" height="9" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M1.5 4H6.5M6.5 4L4 1.5M6.5 4L4 6.5" stroke="#111827" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="hidden lg:block absolute right-0 -top-[60px]" style={{ width: 318, height: 275 }} aria-hidden="true">
            <Image src="/images/world-map-dotted.png" alt="" width={318} height={275} className="object-contain opacity-60" />
          </div>
        </div>

        <div className="w-full h-px bg-[#303847]" />

        {/* Brand row */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3.5" aria-label="KUSA, accueil">
            <Image src="/images/kusa-logo-icon.png" alt="" width={44} height={41} className="object-contain flex-none transition-transform hover:rotate-6 duration-300" />
            <span className="flex flex-col">
              <span className="font-jura font-bold text-[42px] leading-none text-white tracking-[-0.04em]">kusa</span>
              <span className="font-jura font-bold text-[12.5px] leading-none text-white tracking-[0.13em] mt-1">ENCAISSER, SIMPLEMENT.</span>
            </span>
          </Link>
          <div className="flex flex-col gap-1.5 font-inter text-[14px] text-[#A4B2BE]">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center min-h-[40px] text-[#D3DADF] hover:text-white transition-colors">
              {CONTACT_EMAIL}
            </a>
            <span>Réponse en français, par email</span>
          </div>
        </div>

        {/* Columns */}
        <nav aria-label="Pied de page" className="w-full grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col items-start gap-3.5">
              <h3 className="font-inter font-semibold text-[13.5px] leading-[15px] text-gold tracking-[0.03em]">{col.title}</h3>
              <ul className="flex flex-col lg:gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex items-center min-h-[42px] lg:min-h-0 font-inter text-[14.5px] leading-[18px] text-[#A4B2BE] hover:text-white hover:translate-x-0.5 transition-all duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#303847]">
          <p className="font-jura font-bold text-[13px] leading-[160%] text-[#CED2DB]">© {new Date().getFullYear()} KUSA, par Freemo. Tous droits réservés.</p>
          <p className="font-jura font-bold text-[13px] leading-[160%] text-[#8D99A6]">Orange Money · MTN MoMo · Visa · Mastercard · XAF</p>
        </div>
      </div>
    </footer>
  );
}
