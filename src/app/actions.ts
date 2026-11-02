"use server";

import { redirect } from "next/navigation";
import { endDemoSession, getRememberedProfile, nameFromEmail, startDemoSession } from "@/lib/demo-session";
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




/* ───────────── Inscription (démo) ─────────────
   Same validation as the future real flow; on success a demo session opens
   and the merchant lands on the dashboard. No account is stored anywhere. */
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

  await startDemoSession({
    name: values.fullName,
    business: values.business,
    type: values.businessType,
    email: values.email,
    phone: values.phone,
    createdAt: new Date().toISOString(),
  });
  redirect("/tableau-de-bord?bienvenue=1");
}

/* ───────────── Connexion (démo) ───────────── */
export async function signIn(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email").toLowerCase();
  const password = raw(fd, "password");
  const next = str(fd, "suite");

  const fieldErrors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Indiquez l'adresse email de votre compte.";
  if (!password) fieldErrors.password = "Indiquez votre mot de passe.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, values: { email } };

  // Reuse what the merchant entered at sign-up on this device, if any
  const known = await getRememberedProfile();
  await startDemoSession(
    known && known.email === email
      ? known
      : {
          name: nameFromEmail(email),
          business: "Votre activité",
          type: "Boutique",
          email,
          phone: "",
          createdAt: new Date().toISOString(),
        }
  );
  redirect(next.startsWith("/tableau-de-bord") ? next : "/tableau-de-bord");
}

/* ───────────── Mot de passe oublié (démo) ───────────── */
export async function requestReset(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email").toLowerCase();
  if (!EMAIL_RE.test(email))
    return { fieldErrors: { email: "Indiquez l'adresse email de votre compte." }, values: { email } };
  return {
    ok: true,
    message: `Démo : dans la version finale, un lien pour choisir un nouveau mot de passe sera envoyé à ${email}.`,
  };
}

export async function updatePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const password = raw(fd, "password");
  if (!passwordOk(password))
    return { fieldErrors: { password: "Au moins 8 caractères, avec au moins une lettre et un chiffre." } };
  return { ok: true, message: "Mot de passe mis à jour (démo)." };
}

/* ───────────── Déconnexion ───────────── */
export async function signOut() {
  await endDemoSession();
  redirect("/connexion");
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
