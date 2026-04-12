import type { Session, SessionStatus } from "./types";
import { VENUE } from "./venue";

// Real TicoBlockchain 2026 agenda — 24 MAYO 2026.
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
    time: "09:10 — 09:55",
    startTime: "09:10",
    title: "Keynote 1 — VISA",
    speakerName: "Daniel Calderón",
    speakerOrg: "Gerente de Desarrollo de Negocios — VISA · Centroamérica y Caribe",
    description:
      "Apertura del día con la visión de VISA sobre el futuro de los pagos digitales y la integración cripto en la región.",
    stage: "main",
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
    id: "perspectivas-inversion-main",
    time: "10:30 — 10:55",
    startTime: "10:30",
    title: "Perspectivas de Inversión 2026: Retos y Oportunidades",
    speakerName: "Karla Córdoba Brenes · Rogelio Martínez",
    speakerOrg: "Panel: AsoBlockchain + BlockchainGuard",
    description:
      "Panel con Karla Córdoba Brenes (Presidenta AsoBlockchain — Finanzas Regenerativas y RWA) y Rogelio Martínez (Inversor Ángel, Fundador BlockchainGuard — Inversión en Startups). Dónde está fluyendo el capital Web3 en LATAM para 2026.",
    stage: "main",
    category: "panel",
    status: "next",
  },
  {
    id: "nimiq-esc2",
    time: "10:30 — 10:55",
    startTime: "10:30",
    title: "Nimiq",
    speakerOrg: "Nimiq",
    description:
      "Presentación patrocinada — pagos peer-to-peer directos en navegador sin intermediarios.",
    stage: "escenario-2",
    category: "sponsor-slot",
    status: "next",
  },
  {
    id: "startup-pitch-1-main",
    time: "11:00 — 11:35",
    startTime: "11:00",
    title: "Startup Pitch Session — Parte 1",
    description:
      "Rondas rápidas de pitches de startups cripto y fintech de la región frente a un jurado de inversionistas.",
    stage: "main",
    category: "pitch",
    status: "scheduled",
  },
  {
    id: "lnet-credenciales-esc2",
    time: "11:00 — 11:35",
    startTime: "11:00",
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
    id: "payers-district-main",
    time: "12:10 — 12:30",
    startTime: "12:10",
    title: "Payers District en Prospera",
    speakerName: "Franz Tuñez",
    speakerOrg: "Prospera (Argentina)",
    description:
      "Caso de estudio desde Argentina: cómo Prospera está construyendo un distrito de pagos descentralizados bajo un marco legal pro-cripto.",
    stage: "main",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "smart-cities-esc2",
    time: "12:10 — 12:30",
    startTime: "12:10",
    title: "SMART CITIES",
    description:
      "Infraestructura urbana tokenizada: ciudades inteligentes financiadas y gobernadas on-chain.",
    stage: "escenario-2",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "keynote-2-identidad-main",
    time: "12:35 — 13:10",
    startTime: "12:35",
    title: "Keynote 2 — Identidad Para Siempre",
    speakerName: "Stephanie Sánchez",
    speakerOrg: "Miss Crypto Lawyer · Embajadora Oficial TicoBlockchain",
    description:
      "La visión legal y humana de la identidad auto-soberana: por qué la identidad on-chain es el próximo campo de batalla regulatorio.",
    stage: "main",
    category: "keynote",
    status: "scheduled",
  },
  {
    id: "lulubit-esc2",
    time: "12:35 — 13:10",
    startTime: "12:35",
    title: "Lulubit",
    speakerOrg: "Lulubit",
    description:
      "Taller patrocinado — herramientas para integrar pagos cripto en comercios tradicionales.",
    stage: "escenario-2",
    category: "workshop",
    status: "scheduled",
  },
  {
    id: "panel-fia",
    time: "13:15 — 13:35",
    startTime: "13:15",
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
    id: "privacidad-blockchains-esc2",
    time: "15:50 — 16:20",
    startTime: "15:50",
    title: "Privacidad en Blockchains Públicas",
    speakerName: "Andy Guzmán Toledo",
    speakerOrg: "Head of Privacy @ Ethereum Foundation",
    description:
      "Una mirada técnica desde la Ethereum Foundation al estado actual de la privacidad en redes públicas — por qué importa y qué viene.",
    stage: "escenario-2",
    category: "panel",
    status: "scheduled",
  },
  {
    id: "cierre",
    time: "17:40 — 17:45",
    startTime: "17:40",
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
