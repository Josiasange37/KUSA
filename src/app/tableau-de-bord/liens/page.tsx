import type { Metadata } from "next";
import { Suspense } from "react";
import { getDashboard } from "@/lib/dashboard";
import { PageHead } from "@/components/dashboard/ui";
import { LinksManager } from "@/components/dashboard/LinksManager";

export const metadata: Metadata = { title: "Liens de paiement" };

export default async function LinksPage() {
  const { user, data } = await getDashboard();
  return (
    <>
      <PageHead title="Liens de paiement" sub="À envoyer par WhatsApp, SMS ou email. Sans site, sans code." />
      <Suspense>
        <LinksManager initial={data.links} business={user.business} />
      </Suspense>
    </>
  );
}
