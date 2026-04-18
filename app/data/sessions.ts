import type { Session, SessionStatus } from "./types";
import { VENUE } from "./venue";

// Real TicoBlockchain 2026 agenda — 14 MAYO 2026.
// Two parallel tracks: Main Stage + Escenario 2.
// Ceremonies / breaks use stage="both" (single row spanning both tracks).
// Parallel sessions appear as two rows sharing the same startTime.
// Exactly one session has status "live" per stage at a time. Initial demo
// state has WINK (Main) and Olanzo (Escenario 2) live at 10:00.
export const SESSIONS: readonly Session[] = [
  {
    id: "registro",
    time: "08:00 — 09:00",
    startTime: "08:00",
    title: "Registro y Café de Bienvenida",
    speakerOrg: "Equipo TicoBlockchain",
    stage: "both",
    category: "break",
    status: "past",
  },
  {
    id: "apertura",
    time: "09:00 — 09:10",
    startTime: "09:00",
    title: "Apertura",
    speakerOrg: "Equipo TicoBlockchain",
    stage: "both",
    category: "ceremony",
    status: "past",
  },
  {
    id: "keynote-1-visa",
    time: "09:15 — 09:55",
    startTime: "09:15",
    title: "Keynote 1 — VISA",
    speakerName: "Daniel Calderón",
    speakerOrg: "Gerente de Desarrollo de Negocios — VISA · Centroamérica y Caribe",
    description:
      "Apertura del día con la visión de VISA sobre el futuro de los pagos digitales y la integración cripto en la región.",
    stage: "both",
    category: "keynote",
    status: "past",
  },
  {
    id: "wink-main",
    time: "10:00 — 10:25",
    startTime: "10:00",
    title: "WINK — Mitos y Realidades de la Inclusión Financiera",
    speakerName: "Diego Loaiza Centeno",
    speakerOrg: "CEO @ Wink",
    description:
      "Un recorrido sin filtros por los retos reales de llevar servicios financieros a los no bancarizados, desde la óptica de un neobanco costarricense.",
    stage: "main",
    category: "sponsor-slot",
    status: "live",
  },
  {
    id: "olanzo-esc2",
    time: "10:00 — 10:25",
    startTime: "10:00",
    title: "Olanzo",
    speakerOrg: "Olanzo",
    description:
      "Presentación patrocinada — infraestructura para pagos y liquidación on-chain.",
    stage: "escenario-2",
    category: "sponsor-slot",
    status: "live",
  },
  {
    id: "coffee-break-am",
    time: "10:30 — 10:50",
    startTime: "10:30",
    title: "Coffee Break — Networking",
    stage: "both",
    category: "break",
    status: "next",
  },
  {
    id: "perspectivas-inversion-main",
    time: "10:55 — 11:35",
    startTime: "10:55",
    title: "Perspectivas de Inversión 2026: Retos y Oportunidades",
    speakerName: "Karla Córdoba Brenes · Rogelio Martínez",
    speakerOrg: "Panel: AsoBlockchain + BlockchainGuard",
    description:
      "Panel con Karla Córdoba Brenes (Presidenta AsoBlockchain — Finanzas Regenerativas y RWA) y Rogelio Martínez (Inversor Ángel, Fundador BlockchainGuard — Inversión en Startups). Dónde está fluyendo el capital Web3 en LATAM para 2026.",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "nimiq-esc2",
    time: "10:55 — 11:35",
    startTime: "10:55",
    title: "Nimiq",
    speakerOrg: "Nimiq",
    description:
      "Presentación patrocinada — pagos peer-to-peer directos en navegador sin intermediarios.",
    stage: "escenario-2",
    category: "sponsor-slot",
    status: "scheduled",
  },
  {
    id: "startup-pitch-1-esc2",
    time: "11:40 — 12:05",
    startTime: "11:40",
    title: "Startup Pitch Session — Parte 1",
    description:
      "Rondas rápidas de pitches de startups cripto y fintech de la región frente a un jurado de inversionistas.",
    stage: "escenario-2",
    category: "pitch",
    status: "scheduled",
  },
  {
    id: "smart-cities-main",
    time: "12:10 — 12:30",
    startTime: "12:10",
    title: "SMART CITIES: Fintech for Good — Transformación de la ciudad con pagos digitales",
    description:
      "Cómo las ciudades están rediseñando su infraestructura de pagos con rieles on-chain para inclusión financiera y servicios públicos.",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "lnet-credenciales-esc2",
    time: "12:10 — 12:30",
    startTime: "12:10",
    title: "LNET — Web3 y Agronegocios · Credenciales Verificables",
    speakerName: "Jaddy Fernández",
    speakerOrg: "Alianzas Estratégicas @ LNET Global",
    description:
      "Cómo las credenciales verificables y Web3 están transformando la trazabilidad y financiación del sector agroalimentario latinoamericano.",
    stage: "escenario-2",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "regen-district-main",
    time: "12:35 — 13:10",
    startTime: "12:35",
    title: "Regen District en Próspera",
    speakerName: "Franz Tuñez",
    speakerOrg: "Próspera (Argentina)",
    description:
      "Caso de estudio desde Argentina: cómo Próspera está construyendo un distrito regenerativo bajo un marco legal pro-cripto.",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "smart-cities-esc2",
    time: "12:35 — 13:10",
    startTime: "12:35",
    title: "SMART CITIES",
    description:
      "Infraestructura urbana tokenizada: ciudades inteligentes financiadas y gobernadas on-chain.",
    stage: "escenario-2",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "keynote-2-identidad",
    time: "13:15 — 13:55",
    startTime: "13:15",
    title: "Keynote 2 — Identidad Para Agentes",
    speakerName: "Stephanie Sánchez",
    speakerOrg: "Miss Crypto Lawyer · Embajadora Oficial TicoBlockchain",
    description:
      "Identidad auto-soberana en la era de los agentes autónomos: cómo construir confianza on-chain cuando quien actúa no es un humano.",
    stage: "both",
    category: "keynote",
    status: "scheduled",
  },
  {
    id: "panel-fia",
    time: "14:00 — 14:35",
    startTime: "14:00",
    title: "Panel FIA — Regulación Fintech en Centroamérica",
    speakerName: "José Miguel Zamora Barquero · Randall Barquero",
    speakerOrg: "Panel: AsoFintech + Consortium Legal",
    description:
      "Panel regulatorio con José Miguel Zamora Barquero (Presidente AsoFintech — Regulación e Integración Regional) y Randall Barquero (Socio Consortium Legal, JD AsoFintech — Regulación Fintech: Actualidad y Perspectivas).",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "lulubit-esc2",
    time: "14:00 — 14:35",
    startTime: "14:00",
    title: "Lulubit",
    speakerOrg: "Lulubit",
    description:
      "Taller patrocinado — herramientas para integrar pagos cripto en comercios tradicionales.",
    stage: "escenario-2",
    category: "workshop",
    status: "scheduled",
  },
  {
    id: "coffee-break",
    time: "14:40 — 15:05",
    startTime: "14:40",
    title: "Coffee Break — Networking",
    stage: "both",
    category: "break",
    status: "scheduled",
  },
  {
    id: "pagos-stablecoins-main",
    time: "15:10 — 15:45",
    startTime: "15:10",
    title: "Pagos y Stablecoins — Ecosistema Fintech Regional",
    speakerName: "Roberto Grella · Steven Cabrera",
    speakerOrg: "Panel: Fintech Uruguay + Epark",
    description:
      "Panel con Roberto Grella (Fintech Uruguay — Ecosistema Fintech Regional) y Steven Cabrera (Fundador Epark — Fintech for Good). El tablero de pagos stablecoin en LATAM y el rol social de la fintech.",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "startup-pitch-2-esc2",
    time: "15:10 — 15:45",
    startTime: "15:10",
    title: "Startup Pitch Session — Parte 2",
    description:
      "Segunda ronda de pitches. Nuevos proyectos buscando capital, alianzas y distribución regional.",
    stage: "escenario-2",
    category: "pitch",
    status: "scheduled",
  },
  {
    id: "agentes-autonomos-main",
    time: "15:50 — 16:20",
    startTime: "15:50",
    title: "Agentes Autónomos en Cripto · AI en Cripto",
    speakerName: "Roberto Ponce Romay · Carlos René",
    speakerOrg: "Panel: Invermaster Ventures + DESA",
    description:
      "Panel con Roberto Ponce Romay (Managing Director Invermaster Ventures — Agentes Autónomos en Cripto) y Carlos René (CEO & Founder DESA — AI en Cripto). Cómo los agentes autónomos impulsados por IA están redefiniendo la operación on-chain.",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "crtw",
    time: "17:40 — 17:45",
    startTime: "17:40",
    title: "CRTW",
    speakerOrg: "Equipo TicoBlockchain",
    stage: "both",
    category: "ceremony",
    status: "scheduled",
  },
  {
    id: "cierre",
    time: "17:45 — 18:00",
    startTime: "17:45",
    title: "Cierre",
    speakerOrg: "Equipo TicoBlockchain",
    stage: "both",
    category: "ceremony",
    status: "scheduled",
  },
  {
    id: "coctel",
    time: "18:00 — 20:00",
    startTime: "18:00",
    title: "Cóctel de Cierre",
    speakerOrg: "Patrocinadores",
    stage: "both",
    category: "ceremony",
    status: "scheduled",
  },
] as const;

// Returns sessions with each `status` replaced by a time-derived status.
// Pre/post event day, the literal "demo" status is preserved so the site
// can be previewed with the intended "live" hero pre-launch.
// Static lookup by id. Used by the sponsors page to resolve a sponsor's
// session metadata (time, stage, title) without running the live status
// pipeline — the sponsors page is purely informational and doesn't need
// past/live/next promotion.
export function getSessionById(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}

export function getSessionsAt(now: Date): Session[] {
  const statuses = computeSessionStatuses(SESSIONS, now);
  return SESSIONS.map((s) => ({
    ...s,
    status: statuses.get(s.id) ?? s.status,
  }));
}

// Returns the current live session per physical stage. A "both"-stage
// session (ceremony/break) is mirrored onto both keys so the home hero
// never shows an empty state during Registro / Apertura / Cierre / Coctel.
export function getLiveSessions(now: Date): {
  main?: Session;
  escenario2?: Session;
} {
  let main: Session | undefined;
  let escenario2: Session | undefined;

  for (const s of getSessionsAt(now)) {
    if (s.status !== "live") continue;
    if (s.stage === "both") {
      main = main ?? s;
      escenario2 = escenario2 ?? s;
    } else if (s.stage === "main") {
      main = main ?? s;
    } else if (s.stage === "escenario-2") {
      escenario2 = escenario2 ?? s;
    }
  }

  return { main, escenario2 };
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
export type EventPhase = "before" | "during" | "after";

// Event day runs 08:00–20:00 CRT. Registro opens at 08:00 and the Cóctel
// de Cierre ends at 20:00 — the full window the live page should feel "hot."
const EVENT_START_HHMM = "08:00";
const EVENT_END_HHMM = "20:00";

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

// ─── Time-derived status helpers ──────────────────────────────────────────

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
function getEventLocalDateTime(now: Date): {
  dateISO: string;
  hhmm: string;
} {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: VENUE.timezoneName,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    dateISO: `${get("year")}-${get("month")}-${get("day")}`,
    hhmm: `${get("hour")}:${get("minute")}`,
  };
}

// Derives each session's status from the wall clock in the event timezone.
// On pre/post event days, falls back to the literal demo status. On event
// day, computes past/live/scheduled from session start/end, then promotes
// the earliest "scheduled" per stage to "next".
export function computeSessionStatuses(
  sessions: readonly Session[],
  now: Date,
): Map<string, SessionStatus> {
  const result = new Map<string, SessionStatus>();
  const nowLocal = getEventLocalDateTime(now);

  if (nowLocal.dateISO !== VENUE.eventDateISO) {
    for (const s of sessions) result.set(s.id, s.status);
    return result;
  }

  for (const s of sessions) {
    const range = parseTimeRange(s.time);
    if (!range) {
      result.set(s.id, s.status);
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
