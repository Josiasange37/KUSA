import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getDemoUser } from "@/lib/demo-session";
import { getDemoDashboard } from "@/lib/demo-data";

/** One place every dashboard page reads from. Today: demo session + generated data.
    Tomorrow: the authenticated merchant and the KUSA API, same return shape. */
export const getDashboard = cache(async () => {
  const user = await getDemoUser();
  if (!user) redirect("/connexion?suite=/tableau-de-bord");
  const data = getDemoDashboard(`${user.business}|${user.email}`, user.type, user.phone);
  return { user, data };
});
