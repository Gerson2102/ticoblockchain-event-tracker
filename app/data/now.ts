// Resolves the "now" to use for session status calculations.
// In development, a ?now=<ISO-8601> URL param overrides the real clock so
// QA can eyeball the UI at any simulated moment (e.g. ?now=2026-05-14T10:15:00-06:00).
// In production the override is ignored — no one should be able to spoof
// the clock on a public live-event page.

type ResolvedNow = {
  now: Date;
  simulated: string | null; // ISO string if override active, else null
};

export function resolveNow(param: string | string[] | undefined): ResolvedNow {
  if (process.env.NODE_ENV === "production") {
    return { now: new Date(), simulated: null };
  }
  const raw = Array.isArray(param) ? param[0] : param;
  if (!raw) return { now: new Date(), simulated: null };
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return { now: new Date(), simulated: null };
  }
  return { now: parsed, simulated: raw };
}
