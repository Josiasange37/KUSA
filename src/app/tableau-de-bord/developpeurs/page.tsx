import type { Metadata } from "next";
import { getDashboard } from "@/lib/dashboard";
import { PageHead } from "@/components/dashboard/ui";
import { DevPanel } from "@/components/dashboard/DevPanel";

export const metadata: Metadata = { title: "Développeurs" };

/** Stable, fake-looking key for the demo (never a real secret). */
function demoKey(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  let out = "";
  for (let i = 0; i < 24; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    out += "abcdefghijkmnpqrstuvwxyz23456789"[(h >>> 0) % 32];
  }
  return out;
}

export default async function DevelopersPage() {
  const { user, data } = await getDashboard();
  return (
    <>
      <PageHead title="Développeurs" sub="Clés de test, webhook et journal des appels de votre intégration." />
      <DevPanel seed={demoKey(user.email + user.business)} recent={data.txs} now={data.now} />
    </>
  );
}
