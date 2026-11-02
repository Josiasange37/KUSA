"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  requestReset,
  sendContact,
  signIn,
  signUp,
  updatePassword,
  type FormState,
} from "@/app/actions";
import { BUSINESS_TYPES, CONTACT_SUBJECTS } from "@/lib/content";

function Submit({ children, busy }: { children: React.ReactNode; busy: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex justify-center items-center h-[50px] px-7 rounded-full bg-brand text-white font-jura font-bold text-[15px] shadow-md transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-wait w-full sm:w-auto"
    >
      {pending ? busy : children}
    </button>
  );
}

function Msg({ state }: { state: FormState }) {
  if (state.error)
    return (
      <div role="alert" className="mb-6 rounded-[12px] bg-err-bg border border-err-line px-4 py-3 font-inter text-[14.5px] leading-[150%] text-err-ink">
        {state.error}
      </div>
    );
  if (state.ok && state.message)
    return (
      <div role="status" className="rounded-[14px] bg-mint border border-line px-5 py-4 font-inter text-[15px] leading-[155%] text-forest flex gap-3 items-start">
        <span className="flex-none mt-0.5 w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center" aria-hidden="true">
          <svg width="10" height="8" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.33333 5.5L8 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {state.message}
      </div>
    );
  return null;
}

type FieldProps = {
  name: string;
  label: string;
  state: FormState;
  type?: string;
  autoComplete?: string;
  hint?: string;
  required?: boolean;
  full?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
};

function Field({ name, label, state, type = "text", autoComplete, hint, required, full, inputMode, placeholder }: FieldProps) {
  const id = useId();
  const err = state.fieldErrors?.[name];
  const describedBy = [hint ? `${id}-h` : "", err ? `${id}-e` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`kfield ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id}>
        {label}
        {!required && <span className="font-semibold text-slate"> (facultatif)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        required={required}
        defaultValue={state.values?.[name] ?? ""}
        aria-invalid={err ? true : undefined}
        aria-describedby={describedBy}
      />
      {hint && <p className="hint" id={`${id}-h`}>{hint}</p>}
      {err && <p className="err" id={`${id}-e`}>{err}</p>}
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  state,
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  state: FormState;
  required?: boolean;
  defaultValue?: string;
}) {
  const id = useId();
  const err = state.fieldErrors?.[name];
  return (
    <div className="kfield">
      <label htmlFor={id}>
        {label}
        {!required && <span className="font-semibold text-slate"> (facultatif)</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={state.values?.[name] ?? defaultValue ?? ""}
        aria-invalid={err ? true : undefined}
        aria-describedby={err ? `${id}-e` : undefined}
      >
        <option value="" disabled={required}>
          Choisir…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {err && <p className="err" id={`${id}-e`}>{err}</p>}
    </div>
  );
}

function PasswordField({ state, label, autoComplete, hint }: { state: FormState; label: string; autoComplete: string; hint?: string }) {
  const id = useId();
  const [show, setShow] = useState(false);
  const err = state.fieldErrors?.password;
  const describedBy = [hint ? `${id}-h` : "", err ? `${id}-e` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className="kfield sm:col-span-2">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          id={id}
          name="password"
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          required
          minLength={autoComplete === "new-password" ? 8 : undefined}
          aria-invalid={err ? true : undefined}
          aria-describedby={describedBy}
          style={{ paddingRight: 96 }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-pressed={show}
          aria-controls={id}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-[38px] px-3 rounded-[8px] font-jura font-bold text-[13px] text-forest hover:bg-cream transition-colors"
        >
          {show ? "Masquer" : "Afficher"}
        </button>
      </div>
      {hint && <p className="hint" id={`${id}-h`}>{hint}</p>}
      {err && <p className="err" id={`${id}-e`}>{err}</p>}
    </div>
  );
}

export function SignUpForm() {
  const [state, action] = useActionState(signUp, {});
  const termsId = useId();
  if (state.ok) return <Msg state={state} />;
  return (
    <form action={action} noValidate>
      <Msg state={state} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        <Field name="fullName" label="Votre nom" autoComplete="name" required state={state} />
        <Field name="business" label="Nom de votre activité" autoComplete="organization" required state={state} />
        <SelectField name="businessType" label="Type d'activité" options={BUSINESS_TYPES} required state={state} />
        <Field name="phone" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" placeholder="6XX XX XX XX" required state={state} />
        <Field name="email" label="Email professionnel" type="email" autoComplete="email" required full state={state} />
        <PasswordField state={state} label="Mot de passe" autoComplete="new-password" hint="Au moins 8 caractères, avec au moins une lettre et un chiffre." />
        <div className="sm:col-span-2">
          <label htmlFor={termsId} className="flex items-start gap-3 cursor-pointer font-inter text-[14px] leading-[150%] text-ink-2">
            <input
              id={termsId}
              type="checkbox"
              name="terms"
              className="mt-0.5 w-5 h-5 flex-none accent-[#DBAE40]"
              aria-invalid={state.fieldErrors?.terms ? true : undefined}
            />
            <span>J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité de KUSA.</span>
          </label>
          {state.fieldErrors?.terms && <p className="mt-1.5 text-[13px] font-medium text-err-ink">{state.fieldErrors.terms}</p>}
        </div>
        <div className="sm:col-span-2 pt-1">
          <Submit busy="Création du compte…">Créer mon compte</Submit>
        </div>
      </div>
    </form>
  );
}

export function SignInForm({ next }: { next?: string }) {
  const [state, action] = useActionState(signIn, {});
  return (
    <form action={action} noValidate>
      <Msg state={state} />
      <input type="hidden" name="suite" value={next ?? ""} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field name="email" label="Email" type="email" autoComplete="email" required full state={state} />
        <PasswordField state={state} label="Mot de passe" autoComplete="current-password" />
        <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
          <Submit busy="Connexion…">Se connecter</Submit>
          <Link href="/connexion?oubli=1" className="font-jura font-bold text-[14px] text-forest underline underline-offset-4 decoration-gold text-center">
            Mot de passe oublié ?
          </Link>
        </div>
      </div>
    </form>
  );
}

export function ResetForm() {
  const [state, action] = useActionState(requestReset, {});
  if (state.ok) return <Msg state={state} />;
  return (
    <form action={action} noValidate>
      <Msg state={state} />
      <div className="grid grid-cols-1 gap-5">
        <Field name="email" label="Email du compte" type="email" autoComplete="email" required state={state} />
        <div>
          <Submit busy="Envoi…">Recevoir un lien</Submit>
        </div>
      </div>
    </form>
  );
}

export function NewPasswordForm() {
  const [state, action] = useActionState(updatePassword, {});
  if (state.ok) return <Msg state={state} />;
  return (
    <form action={action} noValidate>
      <Msg state={state} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <PasswordField state={state} label="Nouveau mot de passe" autoComplete="new-password" hint="Au moins 8 caractères, avec au moins une lettre et un chiffre." />
        <div>
          <Submit busy="Enregistrement…">Enregistrer</Submit>
        </div>
      </div>
    </form>
  );
}

export function ContactForm({ subject }: { subject?: string }) {
  const [state, action] = useActionState(sendContact, {});
  const msgId = useId();
  if (state.ok) return <Msg state={state} />;
  const err = state.fieldErrors?.message;
  return (
    <form action={action} noValidate>
      <Msg state={state} />
      <div className="hp" aria-hidden="true">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field name="name" label="Votre nom" autoComplete="name" required state={state} />
        <Field name="company" label="Entreprise" autoComplete="organization" state={state} />
        <Field name="email" label="Email" type="email" autoComplete="email" required state={state} />
        <Field name="phone" label="Téléphone" type="tel" inputMode="tel" autoComplete="tel" state={state} />
        <SelectField name="businessType" label="Type d'activité" options={BUSINESS_TYPES} state={state} />
        <SelectField
          name="subject"
          label="Objet"
          options={CONTACT_SUBJECTS}
          required
          state={state}
          defaultValue={subject && CONTACT_SUBJECTS.includes(subject) ? subject : undefined}
        />
        <div className="kfield sm:col-span-2">
          <label htmlFor={msgId}>Votre message</label>
          <textarea
            id={msgId}
            name="message"
            required
            maxLength={4000}
            defaultValue={state.values?.message ?? ""}
            aria-invalid={err ? true : undefined}
            aria-describedby={err ? `${msgId}-e` : undefined}
          />
          {err && <p className="err" id={`${msgId}-e`}>{err}</p>}
        </div>
        <div className="sm:col-span-2 pt-1">
          <Submit busy="Envoi…">Envoyer le message</Submit>
        </div>
      </div>
    </form>
  );
}
