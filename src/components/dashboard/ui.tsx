import Link from "next/link";
import type { Channel, TxStatus } from "@/lib/demo-data";

/* Server-safe building blocks of the merchant dashboard. */

export function PageHead({ title, sub, actions }: { title: string; sub?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
      <div className="flex flex-col gap-1.5 min-w-0">
        <h1 className="font-junge text-[30px] sm:text-[38px] leading-[110%] tracking-[-0.02em] text-forest">{title}</h1>
        {sub && <p className="font-jura font-semibold text-[15px] sm:text-[16px] text-slate">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
    </div>
  );
}

export function Panel({
  children,
  className = "",
  ...rest
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`rounded-[18px] bg-surface border border-line ${className}`} {...rest}>
      {children}
    </section>
  );
}

export function PanelHead({ id, title, sub, action }: { id?: string; title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-5 pb-3">
      <div className="min-w-0">
        <h2 id={id} className="font-roboto font-bold text-[16.5px] text-forest">
          {title}
        </h2>
        {sub && <p className="font-jura font-semibold text-[13.5px] text-slate mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1 min-h-[36px] font-jura font-bold text-[14px] text-forest whitespace-nowrap hover:underline underline-offset-4 decoration-gold">
      {children}
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        <path d="M3 8h10M13 8 9 4M13 8l-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

const STATUS: Record<TxStatus, { label: string; cls: string; icon: React.ReactNode }> = {
  success: {
    label: "Réussi",
    cls: "bg-ok-bg text-ok",
    icon: <path d="M3.5 8.2 6.5 11 12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  },
  pending: {
    label: "En attente",
    cls: "bg-wait-bg text-wait",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 5.2V8l1.8 1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  failed: {
    label: "Échoué",
    cls: "bg-err-bg text-err-ink",
    icon: <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  },
};

export function StatusPill({ status }: { status: TxStatus }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1 h-[24px] pl-1.5 pr-2.5 rounded-full font-inter font-medium text-[12.5px] whitespace-nowrap ${s.cls}`}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {s.icon}
      </svg>
      {s.label}
    </span>
  );
}

export const CHANNEL_VAR: Record<Channel, string> = {
  orange_money: "var(--color-ch-orange)",
  mtn_momo: "var(--color-ch-mtn)",
  card: "var(--color-ch-card)",
};

export function ChannelTag({ channel, label }: { channel: Channel; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-inter text-[13.5px] text-ink-2 whitespace-nowrap">
      <span className="w-2.5 h-2.5 rounded-[3px] flex-none" style={{ background: CHANNEL_VAR[channel] }} aria-hidden="true" />
      {label}
    </span>
  );
}

export function Kpi({ label, value, foot, trend }: { label: string; value: string; foot?: string; trend?: number | null }) {
  const up = trend != null && trend >= 0;
  return (
    <div className="rounded-[18px] bg-surface border border-line p-4 sm:p-5 flex flex-col gap-1.5 min-w-0">
      <p className="font-jura font-bold text-[13.5px] text-slate">{label}</p>
      <p className="font-roboto font-bold text-[21px] sm:text-[26px] leading-tight text-forest tabular-nums truncate">{value}</p>
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-inter text-[12.5px] leading-[1.35] text-slate min-h-[18px]">
        {trend != null && Number.isFinite(trend) && (
          <span className={`inline-flex items-center gap-0.5 font-medium whitespace-nowrap ${up ? "text-ok" : "text-err-ink"}`}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ transform: up ? "none" : "rotate(180deg)" }}>
              <path d="M6 10V2M6 2 2.5 5.5M6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {Math.abs(Math.round(trend * 100))} %
          </span>
        )}
        <span>{foot}</span>
      </p>
    </div>
  );
}

export function DemoNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 font-inter text-[12.5px] leading-[150%] text-slate">
      <span className="mt-[3px] flex-none font-mono text-[10px] px-1.5 py-[1px] rounded-[4px] bg-warn-bg text-warn-ink">DÉMO</span>
      <span>{children}</span>
    </p>
  );
}
