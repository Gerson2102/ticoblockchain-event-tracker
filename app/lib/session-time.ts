import { SESSIONS } from "../data/sessions";
import type { Session, SessionStatus } from "../data/types";
import { VENUE } from "../data/venue";

// SESSIONS carries no status — it is computed from the clock (see below).
type SessionEntry = Omit<Session, "status">;

// Static lookup by id. Used by the sponsors page to resolve a sponsor's
// session metadata (time, stage, title) without running the live status
// pipeline — the sponsors page is purely informational and doesn't need
// past/live/next promotion.
export function getSessionById(id: string): SessionEntry | undefined {
  return SESSIONS.find((s) => s.id === id);
}

// Resolves the session a panelist's row in `speakers.ts` belongs to. Match
// rule mirrors `applyLiveStatus`: literal `time` equality plus stage match
// (with `stage === "both"` ceremonies acting as a wildcard). Returns
// undefined for "Por anunciar" speakers and any speaker whose time/stage
// pair has no matching session row.
export function findSessionByTimeStage(
  time: string,
  stage: Session["stage"],
): SessionEntry | undefined {
  return SESSIONS.find(
    (s) => s.time === time && (s.stage === stage || s.stage === "both"),
  );
}

export function getSessionsAt(now: Date): Session[] {
  const statuses = computeSessionStatuses(SESSIONS, now);
  return SESSIONS.map((s) => ({
    ...s,
    status: statuses.get(s.id) ?? "scheduled",
  }));
}

// Returns the current live session per physical stage. A "both"-stage
// session (ceremony/break) is mirrored onto both keys so the home hero
// never shows an empty state during Registro / Apertura / Cierre / Coctel.
export function getLiveSessions(now: Date): {
  main?: Session;
  escenario2?: Session;
} {
  const live = getSessionsAt(now).filter((s) => s.status === "live");
  // A stage's own talk outranks a venue-wide break running in parallel (lunch waves).
  const pick = (stage: "main" | "escenario-2") =>
    live.find((s) => s.stage === stage) ?? live.find((s) => s.stage === "both");
  return { main: pick("main"), escenario2: pick("escenario-2") };
}

// Next upcoming sessions across both tracks, sorted chronologically.
export function getNextSessions(count: number, now: Date): Session[] {
  return getSessionsAt(now)
    .filter((s) => s.status === "next" || s.status === "scheduled")
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, count);
}

// Discrete event lifecycle phase, derived from the wall clock in the event
// timezone. Drives the home hero swap (countdown / live speaker / gratitude)
// and hides during-only sections (parallel-live, "ahora" decorations) when
// the event isn't actually running.
type EventPhase = "before" | "during" | "after";

// Event window = earliest session start to latest session end, from SESSIONS
// (Registro opening to Cóctel de Cierre end) so a schedule shift is one edit.
const ranges = SESSIONS.map((s) => parseTimeRange(s.time)).filter(
  (r): r is { start: string; end: string } => r !== null,
);
export const EVENT_START_HHMM = ranges.map((r) => r.start).sort()[0];
export const EVENT_END_HHMM = ranges.map((r) => r.end).sort().at(-1)!;

export function getEventPhase(now: Date): EventPhase {
  const nowLocal = getEventLocalDateTime(now);
  if (nowLocal.dateISO < VENUE.eventDateISO) return "before";
  if (nowLocal.dateISO > VENUE.eventDateISO) return "after";
  if (nowLocal.hhmm < EVENT_START_HHMM) return "before";
  if (nowLocal.hhmm >= EVENT_END_HHMM) return "after";
  return "during";
}

// Whole days between today (event timezone) and event day. 0 once the page
// has crossed into event-day but is still before 08:00 ("today").
export function getDaysUntilEvent(now: Date): number {
  const nowLocal = getEventLocalDateTime(now);
  if (nowLocal.dateISO >= VENUE.eventDateISO) return 0;
  const a = new Date(`${nowLocal.dateISO}T00:00:00-06:00`).getTime();
  const b = new Date(`${VENUE.eventDateISO}T00:00:00-06:00`).getTime();
  return Math.max(0, Math.round((b - a) / 86_400_000));
}

// Minutes from `now` to a session's startTime on event day. Returns null
// when the session is already past its start. CR runs UTC-6 year-round,
// so the explicit offset is safe (same pattern used by getNextTransitionAt).
export function getMinutesUntilStart(
  startTime: string,
  now: Date,
): number | null {
  const startMs = new Date(
    `${VENUE.eventDateISO}T${startTime}:00-06:00`,
  ).getTime();
  const diffMs = startMs - now.getTime();
  if (diffMs <= 0) return null;
  return Math.floor(diffMs / 60000);
}

// Human-readable countdown chip: "en 12m", "en 1h", "en 1h 20m".
export function formatCountdown(minutes: number): string {
  if (minutes < 60) return `en ${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `en ${h}h` : `en ${h}h ${m}m`;
}

// Fraction (0..1) of elapsed time through a session's time window, computed
// in the event timezone. Returns null when the session has no parseable
// range or `now` is outside the window. Drives the hero progress bar.
export function getSessionProgress(
  session: Session,
  now: Date,
): number | null {
  const range = parseTimeRange(session.time);
  if (!range) return null;
  const nowLocal = getEventLocalDateTime(now);
  if (nowLocal.dateISO !== VENUE.eventDateISO) return null;
  if (nowLocal.hhmm < range.start || nowLocal.hhmm >= range.end) return null;

  const toMin = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };
  const total = toMin(range.end) - toMin(range.start);
  if (total <= 0) return null;
  const elapsed = toMin(nowLocal.hhmm) - toMin(range.start);
  return Math.max(0, Math.min(1, elapsed / total));
}

// Returns the next moment the status map will change — i.e. the nearest
// talk start or end after `now`, as an ISO UTC string. The client uses this
// to schedule a single surgical refresh at the exact boundary instead of
// polling. Returns null outside event day or after the last transition.
export function getNextTransitionAt(now: Date): string | null {
  const nowLocal = getEventLocalDateTime(now);
  if (nowLocal.dateISO !== VENUE.eventDateISO) return null;

  const times = new Set<string>();
  for (const s of SESSIONS) {
    const range = parseTimeRange(s.time);
    if (!range) continue;
    times.add(range.start);
    times.add(range.end);
  }

  const nextHHMM = [...times].filter((t) => t > nowLocal.hhmm).sort()[0];
  if (!nextHHMM) return null;

  // CR is UTC-6 year-round (no DST) — the explicit offset makes this
  // timestamp unambiguous regardless of server zone.
  return new Date(
    `${VENUE.eventDateISO}T${nextHHMM}:00-06:00`,
  ).toISOString();
}

// Parses "09:10 — 09:55" into { start: "09:10", end: "09:55" }.
// Returns null for formats we can't read (e.g. "Por anunciar").
function parseTimeRange(time: string): { start: string; end: string } | null {
  const match = time.match(/^(\d{2}:\d{2})\s*[—–-]\s*(\d{2}:\d{2})$/);
  if (!match) return null;
  return { start: match[1], end: match[2] };
}

// Projects `now` into the event's local timezone and returns the date and
// time as plain strings. Using formatToParts keeps comparisons timezone-safe
// regardless of the server's system zone.
const eventClock = new Intl.DateTimeFormat("en-CA", {
  timeZone: VENUE.timezoneName,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function getEventLocalDateTime(now: Date): {
  dateISO: string;
  hhmm: string;
} {
  const parts = eventClock.formatToParts(now);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    dateISO: `${get("year")}-${get("month")}-${get("day")}`,
    hhmm: `${get("hour")}:${get("minute")}`,
  };
}

// Derives each session's status from the wall clock in the event timezone.
// Off event day every session is "scheduled" (before) or "past" (after). On event
// day, computes past/live/scheduled from session start/end, then promotes
// the earliest "scheduled" per stage to "next".
export function computeSessionStatuses(
  sessions: readonly SessionEntry[],
  now: Date,
): Map<string, SessionStatus> {
  const result = new Map<string, SessionStatus>();
  const nowLocal = getEventLocalDateTime(now);
  const offHours: SessionStatus =
    getEventPhase(now) === "after" ? "past" : "scheduled";

  if (nowLocal.dateISO !== VENUE.eventDateISO) {
    for (const s of sessions) result.set(s.id, offHours);
    return result;
  }

  for (const s of sessions) {
    const range = parseTimeRange(s.time);
    if (!range) {
      result.set(s.id, offHours);
      continue;
    }
    if (nowLocal.hhmm >= range.end) {
      result.set(s.id, "past");
    } else if (nowLocal.hhmm >= range.start) {
      result.set(s.id, "live");
    } else {
      result.set(s.id, "scheduled");
    }
  }

  // Promote earliest "scheduled" per physical stage to "next".
  const stages = ["main", "escenario-2"] as const;
  for (const stage of stages) {
    const firstScheduled = [...sessions]
      .filter(
        (s) =>
          result.get(s.id) === "scheduled" &&
          (s.stage === stage || s.stage === "both"),
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime))[0];
    if (firstScheduled) result.set(firstScheduled.id, "next");
  }

  return result;
}

// "Name — Org", or whichever of the two exists.
export function speakerLine(
  session: Pick<Session, "speakerName" | "speakerOrg">,
): string | undefined {
  return session.speakerName && session.speakerOrg
    ? `${session.speakerName} — ${session.speakerOrg}`
    : (session.speakerName ?? session.speakerOrg);
}
