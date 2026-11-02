"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, isSupabaseConfigured } from "@/lib/supabase";
import { BUSINESS_TYPES, CONTACT_EMAIL, CONTACT_SUBJECTS } from "@/lib/content";

export type FormState = {
  ok?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function raw(fd: FormData, key: string) {
  const v = fd.get(key);
  return typeof v === "string" ? v : "";
}

function passwordOk(p: string) {
  return p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p);
}

async function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

const NOT_CONFIGURED = `Les comptes ne sont pas encore activés sur ce site. Écrivez-nous à ${CONTACT_EMAIL}.`;

function authErrorFr(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("email not confirmed"))
    return "Votre email n'est pas encore confirmé. Ouvrez le lien reçu par email, puis reconnectez-vous.";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Un compte existe déjà avec cet email. Connectez-vous ou utilisez une autre adresse.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
  if (m.includes("password")) return "Ce mot de passe n'est pas accepté. Choisissez-en un plus long ou moins courant.";
  return "Une erreur est survenue. Réessayez dans un instant.";
}

/* ───────────── Inscription : email + mot de passe ───────────── */
export async function signUp(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = {
    fullName: str(fd, "fullName"),
    business: str(fd, "business"),
    businessType: str(fd, "businessType"),
    phone: str(fd, "phone"),
    email: str(fd, "email").toLowerCase(),
  };
  const password = raw(fd, "password");

  const fieldErrors: Record<string, string> = {};
  if (values.fullName.length < 2) fieldErrors.fullName = "Indiquez votre nom.";
  if (values.business.length < 2) fieldErrors.business = "Indiquez le nom de votre activité.";
  if (!BUSINESS_TYPES.includes(values.businessType)) fieldErrors.businessType = "Choisissez votre type d'activité.";
  if (values.phone.replace(/\D/g, "").length < 8) fieldErrors.phone = "Indiquez un numéro de téléphone valide.";
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = "Indiquez une adresse email valide, par exemple nom@entreprise.cm.";
  if (!passwordOk(password))
    fieldErrors.password = "Au moins 8 caractères, avec au moins une lettre et un chiffre.";
  if (fd.get("terms") !== "on") fieldErrors.terms = "Acceptez les conditions pour créer votre compte.";

  if (Object.keys(fieldErrors).length) return { fieldErrors, values };
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED, values };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password,
    options: {
      emailRedirectTo: `${await siteUrl()}/auth/confirm?next=${encodeURIComponent("/tableau-de-bord")}`,
      data: {
        full_name: values.fullName,
        business_name: values.business,
        business_type: values.businessType,
        phone: values.phone,
      },
    },
  });

  if (error) return { error: authErrorFr(error.message), values };

  // Confirmation par email désactivée dans Supabase : la session existe déjà.
  if (data.session) redirect("/tableau-de-bord");

  return {
    ok: true,
    message: `Compte créé. Nous avons envoyé un lien de confirmation à ${values.email}. Ouvrez-le pour accéder à votre espace.`,
  };
}

/* ───────────── Connexion ───────────── */
export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email").toLowerCase();
  const password = raw(fd, "password");
  const next = str(fd, "suite");

  const fieldErrors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Indiquez l'adresse email de votre compte.";
  if (!password) fieldErrors.password = "Indiquez votre mot de passe.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, values: { email } };
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED, values: { email } };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: authErrorFr(error.message), values: { email } };

  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/tableau-de-bord");
}

/* ───────────── Mot de passe oublié ───────────── */
export async function requestReset(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email").toLowerCase();
  if (!EMAIL_RE.test(email))
    return { fieldErrors: { email: "Indiquez l'adresse email de votre compte." }, values: { email } };
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED, values: { email } };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await siteUrl()}/auth/confirm?next=${encodeURIComponent("/tableau-de-bord?nouveau-mot-de-passe=1")}`,
  });
  // Même réponse que le compte existe ou non, pour ne pas révéler les emails inscrits.
  return {
    ok: true,
    message: `Si un compte existe pour ${email}, un lien pour choisir un nouveau mot de passe vient d'être envoyé.`,
  };
}

export async function updatePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const password = raw(fd, "password");
  if (!passwordOk(password))
    return { fieldErrors: { password: "Au moins 8 caractères, avec au moins une lettre et un chiffre." } };
  if (!isSupabaseConfigured()) return { error: NOT_CONFIGURED };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: authErrorFr(error.message) };
  return { ok: true, message: "Mot de passe mis à jour." };
}

/* ───────────── Déconnexion ───────────── */
export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}

/* ───────────── Contacter le service ───────────── */
export async function sendContact(_prev: FormState, fd: FormData): Promise<FormState> {
  const values = {
    name: str(fd, "name"),
    company: str(fd, "company"),
    businessType: str(fd, "businessType"),
    email: str(fd, "email").toLowerCase(),
    phone: str(fd, "phone"),
    subject: str(fd, "subject"),
    message: str(fd, "message"),
  };

  // Champ piège anti-robots : s'il est rempli, on répond « envoyé » sans rien faire.
  if (str(fd, "website")) return { ok: true, message: "Merci, votre message a bien été envoyé." };

  const fieldErrors: Record<string, string> = {};
  if (values.name.length < 2) fieldErrors.name = "Indiquez votre nom.";
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = "Indiquez une adresse email valide pour recevoir la réponse.";
  if (!CONTACT_SUBJECTS.includes(values.subject)) fieldErrors.subject = "Choisissez l'objet de votre demande.";
  if (values.message.length < 10) fieldErrors.message = "Décrivez votre besoin en quelques mots (10 caractères minimum).";
  if (values.message.length > 4000) fieldErrors.message = "Votre message est trop long (4 000 caractères maximum).";
  if (Object.keys(fieldErrors).length) return { fieldErrors, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error: `L'envoi du formulaire n'est pas encore activé. Écrivez-nous directement à ${CONTACT_EMAIL}.`,
      values,
    };
  }

  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  const rows = [
    ["Nom", values.name],
    ["Entreprise", values.company || "—"],
    ["Activité", values.businessType || "—"],
    ["Email", values.email],
    ["Téléphone", values.phone || "—"],
    ["Objet", values.subject],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "KUSA <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? CONTACT_EMAIL],
      reply_to: values.email,
      subject: `[Site KUSA] ${values.subject} — ${values.company || values.name}`,
      text: rows.map(([k, v]) => `${k} : ${v}`).join("\n") + `\n\n${values.message}`,
      html:
        `<table>${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join("")}</table>` +
        `<p style="white-space:pre-wrap">${esc(values.message)}</p>`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return { error: `Le message n'a pas pu partir. Réessayez, ou écrivez-nous à ${CONTACT_EMAIL}.`, values };
  }

  return {
    ok: true,
    message: `Merci ${values.name.split(" ")[0]}, votre message est envoyé. L'équipe KUSA vous répond à ${values.email}.`,
  };
}
