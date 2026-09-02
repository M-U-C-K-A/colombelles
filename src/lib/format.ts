const DATE = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

const DATE_SHORT = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Paris",
});

const TIME = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

const WEEKDAY = new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "Europe/Paris" });
const MONTH_SHORT = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "Europe/Paris" });
const DAY = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", timeZone: "Europe/Paris" });

export const formatDate = (iso: string) => DATE.format(new Date(iso));
export const formatDateShort = (iso: string) => DATE_SHORT.format(new Date(iso));
export const formatTime = (iso: string) => TIME.format(new Date(iso)).replace(":", "h");
export const formatWeekday = (iso: string) => WEEKDAY.format(new Date(iso));
export const formatDay = (iso: string) => DAY.format(new Date(iso));
export const formatMonthShort = (iso: string) =>
  MONTH_SHORT.format(new Date(iso)).replace(".", "").toUpperCase();

export function formatDateTime(iso: string) {
  return `${formatDate(iso)} à ${formatTime(iso)}`;
}

export function formatEventRange(startsAt: string, endsAt?: string) {
  const start = new Date(startsAt);
  if (!endsAt) return `${formatDate(startsAt)} · ${formatTime(startsAt)}`;
  const end = new Date(endsAt);
  const sameDay = start.toDateString() === end.toDateString();
  return sameDay
    ? `${formatDate(startsAt)} · ${formatTime(startsAt)} – ${formatTime(endsAt)}`
    : `${formatDate(startsAt)} → ${formatDate(endsAt)}`;
}

/** « il y a 3 jours », « dans 2 heures »… */
export function formatRelative(iso: string) {
  const rtf = new Intl.RelativeTimeFormat("fr-FR", { numeric: "auto" });
  const diff = new Date(iso).getTime() - Date.now();
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000000],
    ["month", 2592000000],
    ["day", 86400000],
    ["hour", 3600000],
    ["minute", 60000],
  ];
  for (const [unit, ms] of units) {
    if (Math.abs(diff) >= ms) return rtf.format(Math.round(diff / ms), unit);
  }
  return "à l'instant";
}

/** Numéro français : « 02 31 35 25 00 » → « +33231352500 » */
export function telHref(phone: string) {
  const digits = phone.replace(/[^0-9+]/g, "");
  return digits.startsWith("0") ? `+33${digits.slice(1)}` : digits;
}

export const isPast = (iso: string) => new Date(iso).getTime() < Date.now();

/* --- Conversions pour les champs de formulaire (heure de Paris) --- */

const PARIS_PARTS = new Intl.DateTimeFormat("fr-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function parisParts(iso: string) {
  const parts = PARIS_PARTS.formatToParts(new Date(iso));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour") === "24" ? "00" : get("hour")}:${get("minute")}`,
  };
}

/** ISO → « 2026-09-24T18:30 » pour <input type="datetime-local"> */
export function toDateTimeLocal(iso?: string): string {
  if (!iso) return "";
  const { date, time } = parisParts(iso);
  return `${date}T${time}`;
}

/** ISO → « 2026-09-24 » pour <input type="date"> */
export function toDateInput(iso?: string): string {
  if (!iso) return "";
  return iso.length === 10 ? iso : parisParts(iso).date;
}
