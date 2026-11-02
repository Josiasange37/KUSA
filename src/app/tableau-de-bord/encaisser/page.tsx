import type { Metadata } from "next";
import { getDashboard } from "@/lib/dashboard";
import { PageHead } from "@/components/dashboard/ui";
import { Collect } from "@/components/dashboard/Collect";

export const metadata: Metadata = { title: "Encaisser" };

export default async function CollectPage() {
  const { user } = await getDashboard();
  return (
    <>
      <PageHead title="Encaisser" sub="Au comptoir : demande sur le téléphone du client ou QR code." />
      <Collect business={user.business} />
    </>
  );
}
