const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// Whether a published date is within the last `days` days.
// Kept out of component bodies so the Date.now() call stays out of render.
export function isRecent(publishedAt?: string, days = 30): boolean {
  if (!publishedAt) return false;
  const ms = days === 30 ? THIRTY_DAYS_MS : days * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(publishedAt).getTime() < ms;
}
