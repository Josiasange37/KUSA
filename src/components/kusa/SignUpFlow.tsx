"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { signUp, type FormState } from "@/app/actions";
import { BUSINESS_TYPES } from "@/lib/content";
import { useAuthPreview } from "@/components/kusa/AuthFrame";

type Key = "fullName" | "business" | "businessType" | "phone" | "email" | "password" | "terms";
type Values = Record<Exclude<Key, "terms">, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PW_RULES = [
  { label: "8 caractères au moins", test: (p: string) => p.length >= 8 },
  { label: "Une lettre", test: (p: string) => /[A-Za-z]/.test(p) },
  { label: "Un chiffre", test: (p: string) => /\d/.test(p) },
];

const STEPS: Key[] = ["fullName", "business", "businessType", "phone", "email", "password", "terms"];
const LETTERS = "ABCDEFGHIJ";

function validate(key: Key, v: Values, terms: boolean): string | undefined {
  switch (key) {
    case "fullName":
      return v.fullName.trim().length < 2 ? "Indiquez votre nom." : undefined;
    case "business":
      return v.business.trim().length < 2 ? "Indiquez le nom de votre activité." : undefined;
    case "businessType":
      return BUSINESS_TYPES.includes(v.businessType) ? undefined : "Choisissez votre type d'activité.";
    case "phone":
      return v.phone.replace(/\D/g, "").length < 8 ? "Indiquez un numéro de téléphone valide." : undefined;
    case "email":
      return EMAIL_RE.test(v.email.trim()) ? undefined : "Indiquez une adresse email valide, par exemple nom@entreprise.cm.";
    case "password":
      return PW_RULES.every((r) => r.test(v.password)) ? undefined : "Au moins 8 caractères, avec au moins une lettre et un chiffre.";
    case "terms":
      return terms ? undefined : "Acceptez les conditions pour créer votre compte.";
  }
}

function Tick({ on }: { on: boolean }) {
  return (
    <span
      className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-none transition-colors duration-200 ${on ? "bg-[#1F8A5B]" : "bg-line-2"}`}
      aria-hidden="true"
    >
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path d="M1 3.5L3.33333 5.5L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-2.5 h-[54px] px-8 rounded-full bg-brand text-white font-jura font-bold text-[16px] shadow-md transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
    >
      {pending ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" />
          Création du compte…
        </>
      ) : (
        <>
          Créer mon compte
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            <path d="M3 8h10M13 8 9 4M13 8l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </button>
  );
}

export function SignUpFlow() {
  const [state, action] = useActionState<FormState, FormData>(signUp, {});
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [values, setValues] = useState<Values>({ fullName: "", business: "", businessType: "", phone: "", email: "", password: "" });
  const [terms, setTerms] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const fieldRef = useRef<HTMLInputElement | null>(null);
  const headRef = useRef<HTMLHeadingElement | null>(null);

  const { setPreview } = useAuthPreview();
  const key = STEPS[step];
  const first = values.fullName.trim().split(" ")[0];
  const total = STEPS.length;

  // The brand panel builds the merchant account live from the answers
  useEffect(() => {
    setPreview({
      name: values.fullName,
      business: values.business,
      type: values.businessType,
      phone: values.phone,
      email: EMAIL_RE.test(values.email.trim()) ? values.email.trim() : "",
      secure: PW_RULES.every((r) => r.test(values.password)),
      ready: STEPS.every((k) => !validate(k, values, terms)),
      done: Boolean(state.ok),
    });
  }, [values, terms, state.ok, setPreview]);
  useEffect(() => () => setPreview(null), [setPreview]);

  // Server-side errors: jump back to the first step that failed
  useEffect(() => {
    if (!state.fieldErrors) return;
    setErrors(state.fieldErrors as Partial<Record<Key, string>>);
    const firstBad = STEPS.findIndex((k) => state.fieldErrors?.[k]);
    if (firstBad >= 0) {
      setDir("back");
      setStep(firstBad);
    }
  }, [state]);

  // Focus the answer (or the question) on each new step
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (fieldRef.current) fieldRef.current.focus({ preventScroll: true });
      else headRef.current?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(t);
  }, [step]);

  const set = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const err = validate(key, values, terms);
    if (err) {
      setErrors((e) => ({ ...e, [key]: err }));
      return;
    }
    if (step < total - 1) {
      setDir("fwd");
      setStep(step + 1);
    }
  };
  const back = () => {
    if (step === 0) return;
    setDir("back");
    setStep(step - 1);
  };
  const goTo = (i: number) => {
    setDir(i < step ? "back" : "fwd");
    setStep(i);
  };

  // Typeform keys: A–J picks an activity
  useEffect(() => {
    if (key !== "businessType") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i >= 0 && i < BUSINESS_TYPES.length) {
        set("businessType", BUSINESS_TYPES[i]);
        window.setTimeout(() => {
          setDir("fwd");
          setStep((s) => s + 1);
        }, 280);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      next();
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Re-check every step before sending
    for (let i = 0; i < STEPS.length; i++) {
      const err = validate(STEPS[i], values, terms);
      if (err) {
        e.preventDefault();
        setErrors((x) => ({ ...x, [STEPS[i]]: err }));
        goTo(i);
        return;
      }
    }
  };

  /* ───────── Success ───────── */
  if (state.ok) {
    return (
      <div className="flex-1 flex items-center px-5 sm:px-10 lg:px-14 py-12">
        <div className="max-w-[560px] flex flex-col gap-6 step-in" role="status">
          <span className="pop w-16 h-16 rounded-full bg-[#1F8A5B] flex items-center justify-center shadow-lg">
            <svg width="28" height="22" viewBox="0 0 9 7" fill="none" aria-hidden="true">
              <path d="M1 3.5L3.33333 5.5L8 1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="font-junge text-[36px] sm:text-[48px] leading-[110%] tracking-[-0.02em] text-forest">
            Bienvenue chez KUSA{first ? `, ${first}` : ""}.
          </h1>
          <p className="font-jura font-semibold text-[17px] sm:text-[19px] leading-[155%] text-slate">{state.message}</p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/connexion" className="inline-flex items-center justify-center h-[50px] px-7 rounded-full bg-brand text-white font-jura font-bold text-[15px] transition-all hover:brightness-110 active:scale-95">
              Aller à la connexion
            </Link>
            <Link href="/developpeurs" className="inline-flex items-center justify-center h-[50px] px-7 rounded-full bg-surface border border-line-2 text-forest font-jura font-bold text-[15px] transition-all hover:bg-surface-2 active:scale-95">
              Lire la documentation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const err = errors[key];
  const errId = `err-${key}`;
  const qCls = "font-junge text-[30px] sm:text-[40px] xl:text-[46px] leading-[112%] tracking-[-0.02em] text-forest outline-none";

  const questions: Record<Key, { q: React.ReactNode; help?: string }> = {
    fullName: { q: "Pour commencer, comment vous appelez-vous ?", help: "Votre nom et prénom, tels qu'ils apparaîtront sur votre compte." },
    business: { q: <>Enchanté{first ? `, ${first}` : ""}. Comment s&apos;appelle votre activité ?</>, help: "Le nom que vos clients connaissent : boutique, hôtel, startup…" },
    businessType: { q: "Quel type d'activité ?", help: "Nous adaptons votre espace à votre façon d'encaisser." },
    phone: { q: "À quel numéro pouvons-nous vous joindre ?", help: "Pour vérifier votre activité. Jamais partagé." },
    email: { q: "Votre email professionnel ?", help: "C'est votre identifiant de connexion. Nous y envoyons le lien de confirmation." },
    password: { q: "Choisissez un mot de passe", help: "Il protège vos encaissements. Gardez-le pour vous." },
    terms: { q: "Tout est prêt. On vérifie ?", help: "Touchez une ligne pour la modifier." },
  };

  const inputProps = (k: keyof Values) => ({
    ref: (el: HTMLInputElement | null) => {
      if (STEPS[step] === k) fieldRef.current = el;
    },
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(k, e.target.value),
    onKeyDown: onEnter,
    "aria-invalid": err ? true : undefined,
    "aria-describedby": err ? errId : `help-${k}`,
  });

  if (key === "businessType" || key === "terms") fieldRef.current = null;

  return (
    <form action={action} onSubmit={onSubmit} noValidate className="flex-1 flex flex-col">
      {/* Every answer travels with the form, whichever step is shown */}
      {(Object.keys(values) as (keyof Values)[]).map((k) => (key === k ? null : <input key={k} type="hidden" name={k} value={values[k]} />))}
      {terms && key !== "terms" && <input type="hidden" name="terms" value="on" />}

      <div className="flex-1 flex items-start lg:items-center px-5 sm:px-10 lg:px-14 pt-[9svh] pb-10 lg:py-14">
        <div key={step} className={`w-full max-w-[620px] flex flex-col gap-5 ${dir === "fwd" ? "step-in" : "step-back"}`}>
          <h1 ref={headRef} tabIndex={-1} className={qCls}>
            {questions[key].q}
          </h1>
          {questions[key].help && (
            <p id={`help-${key}`} className="font-jura font-semibold text-[16px] sm:text-[17px] leading-[150%] text-slate -mt-1">
              {questions[key].help}
            </p>
          )}

          <div className="pt-4">
            {key === "fullName" && (
              <input {...inputProps("fullName")} name="fullName" className="tf-input" autoComplete="name" placeholder="Awa Ngono" aria-label="Votre nom" />
            )}
            {key === "business" && (
              <input {...inputProps("business")} name="business" className="tf-input" autoComplete="organization" placeholder="Boutique Awa" aria-label="Nom de votre activité" />
            )}
            {key === "phone" && (
              <div className="flex items-end gap-3">
                <span className="font-jura font-semibold text-[clamp(22px,2.6vw,30px)] text-slate pb-[14px] border-b-2 border-line-2">+237</span>
                <input {...inputProps("phone")} name="phone" type="tel" inputMode="tel" className="tf-input" autoComplete="tel-national" placeholder="6XX XX XX XX" aria-label="Téléphone" />
              </div>
            )}
            {key === "email" && (
              <input {...inputProps("email")} name="email" type="email" inputMode="email" className="tf-input" autoComplete="email" placeholder="nom@entreprise.cm" aria-label="Email professionnel" />
            )}
            {key === "password" && (
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    {...inputProps("password")}
                    name="password"
                    type={showPw ? "text" : "password"}
                    className="tf-input pr-24"
                    autoComplete="new-password"
                    aria-label="Mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-pressed={showPw}
                    className="absolute right-0 bottom-3 h-[38px] px-3 rounded-[8px] font-jura font-bold text-[13px] text-forest hover:bg-surface-2 transition-colors"
                  >
                    {showPw ? "Masquer" : "Afficher"}
                  </button>
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Règles du mot de passe">
                  {PW_RULES.map((r) => {
                    const ok = r.test(values.password);
                    return (
                      <li key={r.label} className={`flex items-center gap-2 font-jura font-bold text-[14px] transition-colors ${ok ? "text-forest" : "text-slate"}`}>
                        <Tick on={ok} />
                        {r.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {key === "businessType" && (
              <div role="radiogroup" aria-label="Type d'activité" aria-describedby={err ? errId : "help-businessType"} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input type="hidden" name="businessType" value={values.businessType} />
                {BUSINESS_TYPES.map((t, i) => {
                  const on = values.businessType === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => {
                        set("businessType", t);
                        window.setTimeout(() => {
                          setDir("fwd");
                          setStep((s) => Math.max(s, STEPS.indexOf("businessType") + 1));
                        }, 280);
                      }}
                      className={`group flex items-center gap-3 min-h-[52px] px-3 rounded-[12px] border-2 text-left transition-all active:scale-[0.98] ${
                        on ? "border-gold bg-[#DBAE40]/12" : "border-line-2 bg-surface hover:border-forest/30"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 flex-none rounded-[6px] flex items-center justify-center font-mono text-[12px] border transition-colors ${
                          on ? "bg-gold border-gold text-on-gold" : "border-line-2 text-slate group-hover:text-forest"
                        }`}
                        aria-hidden="true"
                      >
                        {LETTERS[i]}
                      </span>
                      <span className="font-jura font-bold text-[16px] text-forest">{t}</span>
                      {on && (
                        <svg className="ml-auto pop" width="16" height="12" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                          <path d="M1 3.5L3.33333 5.5L8 1" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {key === "terms" && (
              <div className="flex flex-col gap-5">
                <dl className="rounded-[16px] bg-surface border border-line overflow-hidden">
                  {(
                    [
                      ["Nom", values.fullName, 0],
                      ["Activité", values.business, 1],
                      ["Type", values.businessType, 2],
                      ["Téléphone", values.phone ? `+237 ${values.phone}` : "", 3],
                      ["Email", values.email, 4],
                      ["Mot de passe", values.password ? "•".repeat(Math.min(values.password.length, 12)) : "", 5],
                    ] as [string, string, number][]
                  ).map(([k, v, i], idx) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => goTo(i)}
                      className={`w-full grid grid-cols-[110px_1fr_auto] items-center gap-3 px-4 sm:px-5 py-3 text-left transition-colors hover:bg-surface-2 ${idx ? "border-t border-line" : ""}`}
                    >
                      <dt className="font-jura font-bold text-[13px] text-slate">{k}</dt>
                      <dd className="font-inter text-[15px] text-forest truncate">{v || "—"}</dd>
                      <span className="font-jura font-bold text-[12px] text-gold">Modifier</span>
                    </button>
                  ))}
                </dl>

                <label className="flex items-start gap-3 cursor-pointer font-inter text-[15px] leading-[150%] text-ink-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={terms}
                    onChange={(e) => {
                      setTerms(e.target.checked);
                      setErrors((x) => ({ ...x, terms: undefined }));
                    }}
                    className="mt-0.5 w-5 h-5 flex-none accent-[#DBAE40]"
                    aria-invalid={err ? true : undefined}
                    aria-describedby={err ? errId : undefined}
                  />
                  <span>J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité de KUSA.</span>
                </label>

                {state.error && (
                  <div role="alert" className="rounded-[12px] bg-err-bg border border-err-line px-4 py-3 font-inter text-[14.5px] leading-[150%] text-err-ink">
                    {state.error}
                  </div>
                )}
              </div>
            )}

            {err && (
              <p id={errId} role="alert" className="mt-3 inline-flex items-center gap-2 rounded-[8px] bg-err-bg px-3 py-1.5 font-inter text-[14px] text-err-ink">
                <span aria-hidden="true">!</span>
                {err}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-3 flex-wrap">
            {key === "terms" ? (
              <Submit />
            ) : key !== "businessType" ? (
              <button
                type="button"
                onClick={next}
                className="group inline-flex items-center gap-2 h-[50px] px-7 rounded-full bg-brand text-white font-jura font-bold text-[16px] shadow-md transition-all hover:brightness-110 active:scale-95"
              >
                OK
                <svg width="14" height="11" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                  <path d="M1 3.5L3.33333 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : null}
            {key !== "terms" && key !== "businessType" && (
              <span className="hidden sm:inline font-jura font-bold text-[13px] text-slate">
                appuyez sur <kbd className="font-mono text-[12px] px-1.5 py-0.5 rounded-[5px] bg-surface border border-line-2 text-forest">Entrée ↵</kbd>
              </span>
            )}
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="group inline-flex items-center gap-1.5 h-[50px] px-2 font-jura font-bold text-[15px] text-slate hover:text-forest transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
                  <path d="M13 8H3M3 8l4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Retour
              </button>
            )}
            {key === "businessType" && (
              <span className="hidden sm:inline font-jura font-bold text-[13px] text-slate">
                ou appuyez sur une lettre <kbd className="font-mono text-[12px] px-1.5 py-0.5 rounded-[5px] bg-surface border border-line-2 text-forest">A–J</kbd>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-10 lg:px-14 pb-8 flex items-center gap-4">
        <p className="font-jura font-bold text-[14px] text-slate">
          Déjà un compte ?{" "}
          <Link href="/connexion" className="text-forest underline underline-offset-4 decoration-gold">
            Se connecter
          </Link>
        </p>
      </div>
    </form>
  );
}
