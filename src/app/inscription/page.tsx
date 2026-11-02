import type { Metadata } from "next";
import { AuthFrame } from "@/components/kusa/AuthFrame";
import { SignUpFlow } from "@/components/kusa/SignUpFlow";

export const metadata: Metadata = {
  title: "Ouvrir un compte",
  description: "Créez votre compte KUSA avec un email et un mot de passe. Gratuit, sans abonnement.",
};

export default function SignUpPage() {
  return (
    <AuthFrame
      phrases={[
        ["Encaissez partout,", "sans monnaie."],
        ["Un seul compte,", "tous les paiements."],
        ["Un lien WhatsApp,", "et c'est payé."],
        ["Au comptoir", "comme en ligne."],
      ]}
      card={{ amount: "15 000 XAF", method: "Orange Money · à l'instant" }}
    >
      <SignUpFlow />
    </AuthFrame>
  );
}
