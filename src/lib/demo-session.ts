import "server-only";
import { cookies } from "next/headers";

/* Demo session: sign-up and sign-in are mocked while the real merchant
   back end is being built. The session lives in one httpOnly cookie and
   only carries what the user typed (never the password). Swap this module
   for the real auth (Supabase is still wired in src/lib/supabase.ts). */

export const DEMO_COOKIE = "kusa_demo";
const PROFILE_COOKIE = "kusa_demo_profile"; // remembers the business details for the next sign-in
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type DemoUser = {
  name: string;
  business: string;
  type: string;
  email: string;
  phone: string;
  createdAt: string; // ISO 8601
};

function encode(u: DemoUser) {
  return Buffer.from(JSON.stringify(u), "utf8").toString("base64url");
}

function decode(raw: string | undefined): DemoUser | null {
  if (!raw) return null;
  try {
    const u = JSON.parse(Buffer.from(raw, "base64url").toString("utf8"));
    if (typeof u?.email !== "string" || typeof u?.name !== "string") return null;
    return {
      name: String(u.name).slice(0, 80),
      business: String(u.business ?? "").slice(0, 80) || "Votre activité",
      type: String(u.type ?? "").slice(0, 40) || "Boutique",
      email: String(u.email).slice(0, 120),
      phone: String(u.phone ?? "").slice(0, 30),
      createdAt: typeof u.createdAt === "string" ? u.createdAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function getDemoUser(): Promise<DemoUser | null> {
  const jar = await cookies();
  return decode(jar.get(DEMO_COOKIE)?.value);
}

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function startDemoSession(u: DemoUser) {
  const jar = await cookies();
  jar.set(DEMO_COOKIE, encode(u), { ...COOKIE_OPTS, maxAge: MAX_AGE });
  jar.set(PROFILE_COOKIE, encode(u), { ...COOKIE_OPTS, maxAge: MAX_AGE * 4 });
}

/** Profile entered at sign-up on this device, kept after sign-out. */
export async function getRememberedProfile(): Promise<DemoUser | null> {
  const jar = await cookies();
  return decode(jar.get(PROFILE_COOKIE)?.value);
}

export async function endDemoSession() {
  const jar = await cookies();
  jar.delete(DEMO_COOKIE);
}

/** "awa.ngono@boutique.cm" → "Awa Ngono" */
export function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "";
  const words = local.split(/[._-]+/).filter(Boolean).slice(0, 3);
  const name = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  return name || "Marchand KUSA";
}
