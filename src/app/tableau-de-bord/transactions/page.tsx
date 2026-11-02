import type { Metadata } from "next";
import { Suspense } from "react";
import { getDashboard } from "@/lib/dashboard";
import { fmtXAF } from "@/lib/demo-data";
import { PageHead } from "@/components/dashboard/ui";
import { TransactionsView } from "@/components/dashboard/TransactionsView";

export const metadata: Metadata = { title: "Transactions" };

export default async function TransactionsPage() {
  const { data } = await getDashboard();
  return (
    <>
      <PageHead title="Transactions" sub={`${fmtXAF(data.kpi.month)} encaissés sur 30 jours`} />
      <Suspense>
        <TransactionsView txs={data.txs} now={data.now} />
      </Suspense>
    </>
  );
}
