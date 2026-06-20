const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// Whether a published date is within the last `days` days.
// Kept out of component bodies so the Date.now() call stays out of render.
export function isRecent(publishedAt?: string, days = 30): boolean {
  if (!publishedAt) return false;
  const ms = days === 30 ? THIRTY_DAYS_MS : days * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(publishedAt).getTime() < ms;
}

const ICELANDIC_MONTHS = [
  "janúar", "febrúar", "mars", "apríl", "maí", "júní",
  "júlí", "ágúst", "september", "október", "nóvember", "desember",
];

// Format an ISO date as an Icelandic long date, e.g. "17. febrúar 2026".
// Uses fixed month names and UTC parts so the server and client render the same
// string — Date#toLocaleDateString resolves locale/timezone differently across
// runtimes, which caused a hydration mismatch in NewsCard.
export function formatDateIs(value?: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getUTCDate()}. ${ICELANDIC_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
