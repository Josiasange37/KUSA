import type { Metadata } from "next";
import { Shell } from "@/components/dashboard/Shell";
import { getDashboard } from "@/lib/dashboard";

export const metadata: Metadata = {
  title: { default: "Espace marchand", template: "%s · Espace marchand KUSA" },
  robots: { index: false },
};
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await getDashboard();
  return (
    <Shell user={{ name: user.name, business: user.business, type: user.type, email: user.email }}>
      {children}
    </Shell>
  );
}
