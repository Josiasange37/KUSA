/* Demo data for the merchant dashboard.
   Everything is derived from one generated list of transactions, so every
   total, rate, chart and payout on screen adds up. The generator is seeded
   from the merchant's business name: same merchant, same numbers.
   Replace getDemoDashboard() with real API calls when the back end exists. */

export type Channel = "orange_money" | "mtn_momo" | "card";
export type TxStatus = "success" | "pending" | "failed";
export type Source = "boutique" | "lien" | "en_ligne";

export type Tx = {
  id: string;
  reference: string;
  at: string; // ISO 8601, UTC
  amount: number; // XAF, integer
  channel: Channel;
  status: TxStatus;
  source: Source;
  label: string;
  customer: string; // masked
};

export type PayLink = {
  id: string;
  label: string;
  amount: number | null;
  url: string;
  status: "active" | "disabled";
  paidCount: number;
  collected: number;
  createdAt: string;
};

export type Payout = {
  id: string;
  at: string;
  amount: number;
  destination: string;
  status: "paid" | "scheduled";
  count: number;
};

export type DayPoint = { day: string; orange_money: number; mtn_momo: number; card: number; total: number };

export const CHANNELS: { key: Channel; label: string; short: string }[] = [
  { key: "orange_money", label: "Orange Money", short: "Orange" },
  { key: "mtn_momo", label: "MTN MoMo", short: "MTN" },
  { key: "card", label: "Carte bancaire", short: "Carte" },
];

export const SOURCES: Record<Source, string> = {
  boutique: "En boutique",
  lien: "Lien de paiement",
  en_ligne: "En ligne",
};

export const TZ = "Africa/Douala";

/* ───────── formatting (fixed locale + time zone: same output on server and client) ───────── */
const nf = new Intl.NumberFormat("fr-FR");
export const fmtXAF = (n: number) => `${nf.format(Math.round(n))} XAF`;
export const fmtNum = (n: number) => nf.format(n);
export const fmtPct = (n: number) => `${nf.format(Math.round(n * 1000) / 10)} %`;
export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: TZ, ...opts }).format(new Date(iso));
export const fmtTime = (iso: string) => fmtDate(iso, { hour: "2-digit", minute: "2-digit" });
export const fmtDay = (iso: string) => fmtDate(iso, { day: "numeric", month: "short" });
/** Hour of day (0–23) in Douala */
export const hourIn = (iso: string) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hourCycle: "h23" }).format(new Date(iso)));
/** "1 paiement", "3 paiements" */
export const plural = (n: number, one: string, many = `${one}s`) => `${fmtNum(n)} ${n > 1 ? many : one}`;

/** YYYY-MM-DD in Douala time */
export const dayKey = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);

/* ───────── seeded randomness ───────── */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Profile = {
  perDay: [number, number];
  amount: [number, number];
  step: number;
  sources: [Source, number][];
  channels: [Channel, number][];
  labels: string[];
};

const PROFILES: Record<string, Profile> = {
  Supermarché: { perDay: [18, 32], amount: [1500, 45000], step: 100, sources: [["boutique", 0.9], ["lien", 0.1]], channels: [["orange_money", 0.47], ["mtn_momo", 0.39], ["card", 0.14]], labels: ["Caisse 1", "Caisse 2", "Caisse 3"] },
  Boutique: { perDay: [6, 14], amount: [5000, 65000], step: 500, sources: [["boutique", 0.6], ["lien", 0.4]], channels: [["orange_money", 0.5], ["mtn_momo", 0.4], ["card", 0.1]], labels: ["Comptoir", "Commande WhatsApp"] },
  "Bar ou snack": { perDay: [12, 26], amount: [1500, 18000], step: 500, sources: [["boutique", 1]], channels: [["orange_money", 0.52], ["mtn_momo", 0.44], ["card", 0.04]], labels: ["Addition table", "Comptoir"] },
  Restaurant: { perDay: [8, 18], amount: [3000, 32000], step: 500, sources: [["boutique", 0.8], ["lien", 0.2]], channels: [["orange_money", 0.46], ["mtn_momo", 0.4], ["card", 0.14]], labels: ["Addition table", "Commande à emporter"] },
  Hôtel: { perDay: [2, 6], amount: [25000, 185000], step: 5000, sources: [["lien", 0.55], ["boutique", 0.45]], channels: [["orange_money", 0.38], ["mtn_momo", 0.32], ["card", 0.3]], labels: ["Acompte réservation", "Solde séjour"] },
  "E-commerce": { perDay: [6, 16], amount: [5000, 85000], step: 500, sources: [["en_ligne", 0.85], ["lien", 0.15]], channels: [["orange_money", 0.44], ["mtn_momo", 0.36], ["card", 0.2]], labels: ["Commande"] },
  Startup: { perDay: [5, 14], amount: [2000, 50000], step: 500, sources: [["en_ligne", 0.9], ["lien", 0.1]], channels: [["orange_money", 0.45], ["mtn_momo", 0.37], ["card", 0.18]], labels: ["Abonnement", "Commande"] },
  Pharmacie: { perDay: [8, 18], amount: [2000, 30000], step: 100, sources: [["boutique", 0.95], ["lien", 0.05]], channels: [["orange_money", 0.48], ["mtn_momo", 0.4], ["card", 0.12]], labels: ["Ordonnance", "Comptoir"] },
  Indépendant: { perDay: [1, 4], amount: [10000, 150000], step: 1000, sources: [["lien", 0.9], ["boutique", 0.1]], channels: [["orange_money", 0.5], ["mtn_momo", 0.42], ["card", 0.08]], labels: ["Facture", "Prestation"] },
};
const DEFAULT_PROFILE = PROFILES.Boutique;

function pick<T>(r: () => number, weighted: [T, number][]): T {
  let x = r();
  for (const [v, w] of weighted) {
    if ((x -= w) <= 0) return v;
  }
  return weighted[weighted.length - 1][0];
}

function maskPhone(r: () => number) {
  const pre = pick(r, [["69", 0.3], ["65", 0.2], ["67", 0.25], ["68", 0.25]]);
  const d = () => Math.floor(r() * 10);
  return `+237 ${pre}• •• •${d()} ${d()}${d()}`;
}

function maskCard(r: () => number) {
  const brand = r() < 0.62 ? "Visa" : "Mastercard";
  return `${brand} •••• ${String(1000 + Math.floor(r() * 9000))}`;
}

export type Dashboard = ReturnType<typeof getDemoDashboard>;

export function getDemoDashboard(seedKey: string, type: string, phone: string, now = new Date()) {
  const r = mulberry32(hash(seedKey || "kusa"));
  const p = PROFILES[type] ?? DEFAULT_PROFILE;
  const nowMs = now.getTime();
  const DAY = 86_400_000;
  const todayKey = dayKey(now);

  /* ── transactions, 30 days ── */
  const txs: Tx[] = [];
  let seq = 0;
  for (let d = 29; d >= 0; d--) {
    const dayStart = new Date(`${dayKey(new Date(nowMs - d * DAY))}T00:00:00+01:00`).getTime();
    const weekend = [0, 6].includes(new Date(dayStart + 12 * 3600_000).getUTCDay());
    const boost = weekend && ["Bar ou snack", "Restaurant", "Supermarché"].includes(type) ? 1.35 : 1;
    const n = Math.round((p.perDay[0] + r() * (p.perDay[1] - p.perDay[0])) * boost);
    for (let i = 0; i < n; i++) {
      // business hours 7h–22h, busier around midday and evening
      const hour = 7 + Math.min(14.99, Math.abs(r() + r() - 1) * 15 + (r() < 0.4 ? 5 : 0));
      const at = dayStart + hour * 3600_000 + Math.floor(r() * 3600_000);
      if (at > nowMs) continue;
      const raw = p.amount[0] + Math.pow(r(), 2.2) * (p.amount[1] - p.amount[0]);
      const amount = Math.max(p.step, Math.round(raw / p.step) * p.step);
      const channel = pick(r, p.channels);
      const source = pick(r, p.sources);
      const recent = nowMs - at < 90 * 60_000;
      const status: TxStatus = recent && r() < 0.35 ? "pending" : r() < 0.055 ? "failed" : "success";
      seq++;
      const ref = source === "en_ligne" ? `CMD-${(4800 + seq).toString()}` : `KS-${(100000 + Math.floor(r() * 899999)).toString(36).toUpperCase()}`;
      const label = source === "en_ligne" ? `Commande #${ref.slice(4)}` : p.labels[Math.floor(r() * p.labels.length)];
      txs.push({
        id: `pay_${(at / 1000).toString(36)}${seq.toString(36)}`,
        reference: ref,
        at: new Date(at).toISOString(),
        amount,
        channel,
        status,
        source,
        label,
        customer: channel === "card" ? maskCard(r) : maskPhone(r),
      });
    }
  }
  txs.sort((a, b) => b.at.localeCompare(a.at));

  const ok = txs.filter((t) => t.status === "success");
  const sum = (list: Tx[]) => list.reduce((s, t) => s + t.amount, 0);
  const byDay = (k: string) => (t: Tx) => dayKey(new Date(t.at)) === k;
  const yKey = dayKey(new Date(nowMs - DAY));

  const todayOk = ok.filter(byDay(todayKey));
  const yesterdayOk = ok.filter(byDay(yKey));
  // fair comparison: yesterday up to the same time of day
  const yesterdaySoFar = yesterdayOk.filter((t) => new Date(t.at).getTime() <= nowMs - DAY);
  const last7 = ok.filter((t) => nowMs - new Date(t.at).getTime() < 7 * DAY);
  const prev7 = ok.filter((t) => {
    const age = nowMs - new Date(t.at).getTime();
    return age >= 7 * DAY && age < 14 * DAY;
  });
  const settled = txs.filter((t) => t.status !== "pending");

  /* ── 14-day series by channel ── */
  const series: DayPoint[] = [];
  for (let d = 13; d >= 0; d--) {
    const k = dayKey(new Date(nowMs - d * DAY));
    const list = ok.filter(byDay(k));
    const pt: DayPoint = { day: `${k}T12:00:00+01:00`, orange_money: 0, mtn_momo: 0, card: 0, total: 0 };
    for (const t of list) pt[t.channel] += t.amount;
    pt.total = pt.orange_money + pt.mtn_momo + pt.card;
    series.push(pt);
  }

  /* ── channel split, 30 days ── */
  const split = CHANNELS.map((c) => {
    const list = ok.filter((t) => t.channel === c.key);
    return { ...c, amount: sum(list), count: list.length };
  });

  /* ── payouts: each day's successful payments are paid out next morning at 8:00 ── */
  const digits = phone.replace(/\D/g, "");
  const destination = `Orange Money •• ${digits.slice(-2) || "21"}`;
  const payouts: Payout[] = [];
  for (let d = 13; d >= 1; d--) {
    const k = dayKey(new Date(nowMs - d * DAY));
    const list = ok.filter(byDay(k));
    if (!list.length) continue;
    const paidAt = new Date(new Date(`${dayKey(new Date(nowMs - (d - 1) * DAY))}T08:00:00+01:00`).getTime());
    const isFuture = paidAt.getTime() > nowMs;
    payouts.push({
      id: `po_${k.replaceAll("-", "")}`,
      at: paidAt.toISOString(),
      amount: sum(list),
      destination,
      status: isFuture ? "scheduled" : "paid",
      count: list.length,
    });
  }
  const tomorrow8 = new Date(`${dayKey(new Date(nowMs + DAY))}T08:00:00+01:00`).toISOString();
  if (todayOk.length) {
    payouts.push({ id: `po_${todayKey.replaceAll("-", "")}`, at: tomorrow8, amount: sum(todayOk), destination, status: "scheduled", count: todayOk.length });
  }
  payouts.sort((a, b) => b.at.localeCompare(a.at));
  const scheduled = payouts.filter((x) => x.status === "scheduled");

  /* ── payment links ── */
  const linkLabels: Record<string, [string, number | null][]> = {
    Hôtel: [["Acompte chambre double, 2 nuits", 45000], ["Séminaire salle Wouri", 250000], ["Solde séjour", null]],
    Indépendant: [["Facture site vitrine", 150000], ["Acompte prestation", 50000], ["Paiement libre", null]],
    Boutique: [["Robe wax taille M", 18000], ["Livraison Douala", 2000], ["Paiement libre", null]],
  };
  const base = linkLabels[type] ?? [["Commande spéciale", 25000], ["Livraison", 2000], ["Paiement libre", null]];
  const links: PayLink[] = base.map(([label, amount], i) => {
    const paid = ok.filter((t) => t.source === "lien").filter((_, j) => j % base.length === i);
    return {
      id: `plink_${(hash(label) % 46656).toString(36).toUpperCase().padStart(3, "0")}${i}`,
      label,
      amount,
      url: `https://pay.kusa.africa/l/${(hash(label + seedKey) % 1679616).toString(36).toUpperCase()}`,
      status: i === 2 && type === "Indépendant" ? "disabled" : "active",
      paidCount: paid.length,
      collected: sum(paid),
      createdAt: new Date(nowMs - (24 - i * 7) * DAY).toISOString(),
    };
  });

  return {
    now: now.toISOString(),
    txs,
    kpi: {
      today: sum(todayOk),
      todayCount: todayOk.length,
      yesterday: sum(yesterdayOk),
      yesterdaySoFar: sum(yesterdaySoFar),
      week: sum(last7),
      weekPrev: sum(prev7),
      month: sum(ok),
      monthCount: ok.length,
      successRate: settled.length ? ok.length / settled.length : 0,
      avgTicket: ok.length ? sum(ok) / ok.length : 0,
      pending: txs.filter((t) => t.status === "pending").length,
    },
    series,
    split,
    payouts,
    balance: scheduled.reduce((s, x) => s + x.amount, 0),
    nextPayout: scheduled.length ? scheduled[scheduled.length - 1] : null,
    links,
  };
}
