import type { Metadata } from "next";
import { AuthShell } from "@/components/kusa/AuthShell";
import { ContactForm } from "@/components/kusa/forms";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacter le service",
  description: "Une démo, une question sur les tarifs ou l'intégration : écrivez au service KUSA.",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ objet?: string }> }) {
  const { objet } = await searchParams;
  return (
    <AuthShell
      title="Contacter le service"
      intro={
        <>
          Une démo, une question sur les tarifs, l&apos;intégration ou votre compte : laissez-nous un message, nous vous
          répondons par email. Vous pouvez aussi écrire à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-forest underline underline-offset-4 decoration-gold">
            {CONTACT_EMAIL}
          </a>
          .
        </>
      }
      asideTitle="Une vraie personne vous répond, en français."
    >
      <ContactForm subject={objet} />
    </AuthShell>
  );
}
