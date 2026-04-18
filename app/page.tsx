import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import DepartureRow from "./components/DepartureRow";
import DevTimeBanner from "./components/DevTimeBanner";
import Icon from "./components/Icon";
import LiveDot from "./components/LiveDot";
import LiveRefresh from "./components/LiveRefresh";
import SessionCard from "./components/SessionCard";
import SponsorCallout from "./components/SponsorCallout";
import {
  HERO_CONTENT,
  PRACTICAL_INFO,
  SPONSOR_CALLOUTS,
  VENUE_DIRECTIONS,
} from "./data/home-content";
import { resolveNow } from "./data/now";
import {
  getDaysUntilEvent,
  getEventPhase,
  getLiveSessions,
  getNextSessions,
  getNextTransitionAt,
  getSessionProgress,
  getSessionsAt,
} from "./data/sessions";
import type { Session } from "./data/types";
import { VENUE } from "./data/venue";

// Dynamically rendered — the page is intentionally live and reads ?now=
// for dev-mode time simulation. Smart client refresh (LiveRefresh) invalidates
// at exact transition boundaries, so ISR-style caching would fight correctness.
export const dynamic = "force-dynamic";

// Sorted once per render pass — cheap for ~21 sessions.
function sortByStartTime(sessions: readonly Session[]): Session[] {
  return [...sessions].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

function splitSpeakerName(name: string | undefined): {
  first: string;
  last: string;
} {
  if (!name) return { first: "", last: "" };
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return {
    first: parts[0],
    last: parts.slice(1).join(" "),
  };
}

// Hero fallback: when the live Main Stage session has no named speaker
// (sponsor slot like WINK), fall back to the org name, then the title.
function heroHeadline(session: Session | undefined): {
  first: string;
  last: string;
} {
  if (!session) return { first: "EN", last: "PREPARACIÓN" };
  if (session.speakerName) return splitSpeakerName(session.speakerName);
  if (session.speakerOrg) return { first: session.speakerOrg, last: "" };
  return { first: session.title, last: "" };
}

// Screen-reader announcement for the current live session. Updates whenever
// the server re-renders at a transition boundary, and the polite live region
// forwards that to assistive tech without stealing focus.
function liveAnnouncement(mainLive: Session | undefined): string {
  if (!mainLive) return "Sin sesión activa en Main Stage.";
  const who = mainLive.speakerName ?? mainLive.speakerOrg;
  return who
    ? `En vivo en Main Stage: ${mainLive.title}. Exponente: ${who}.`
    : `En vivo en Main Stage: ${mainLive.title}.`;
}

export default async function EnVivoPage({
  searchParams,
}: {
  searchParams: Promise<{ now?: string | string[] }>;
}) {
  const { now: resolvedNow, simulated } = resolveNow((await searchParams).now);
  const now = resolvedNow;
  const nextTransitionAt = getNextTransitionAt(now);
  const phase = getEventPhase(now);
  const live = getLiveSessions(now);
  const mainLive = phase === "during" ? live.main : undefined;
  const parallelLive = phase === "during" ? live.escenario2 : undefined;

  const sidebarSessions = getNextSessions(3, now);
  const daysUntilEvent = getDaysUntilEvent(now);

  // Match the currently live sessions against sponsor-linked activities
  // (Lulubit workshop, Cofiblocks coffee breaks). Prefer the main live
  // session when both tracks match, fall back to escenario-2. De-duped so
  // a single "both"-stage session doesn't render the callout twice.
  const sponsorCallout =
    phase === "during"
      ? ((mainLive && SPONSOR_CALLOUTS[mainLive.id]) ??
          (parallelLive && parallelLive.id !== mainLive?.id
            ? SPONSOR_CALLOUTS[parallelLive.id]
            : undefined)) ??
        null
      : null;

  // Agenda preview anchors to the Main Stage live row. Slice ±1 around it
  // for visual continuity; fall back to the first 5 rows if nothing is live.
  const sortedSessions = sortByStartTime(getSessionsAt(now));
  const anchorIdx = mainLive
    ? sortedSessions.findIndex((s) => s.id === mainLive.id)
    : -1;
  const agendaPreview =
    anchorIdx >= 0
      ? sortedSessions.slice(Math.max(0, anchorIdx - 1), anchorIdx + 4)
      : sortedSessions.slice(0, 5);

  const headline = heroHeadline(mainLive);
  const progress = mainLive ? getSessionProgress(mainLive, now) : null;
  const progressPct = progress === null ? 0 : Math.round(progress * 100);

  const agendaHeading =
    phase === "before"
      ? { top: "AGENDA", bottom: "14 MAYO" }
      : phase === "after"
        ? { top: "AGENDA", bottom: "FINALIZADA" }
        : { top: "AGENDA", bottom: "LIVE" };
  const agendaBlurb =
    phase === "before"
      ? "La línea de tiempo oficial del día. Dos escenarios en paralelo, sin filtros."
      : phase === "after"
        ? "El recorrido completo del 14 de mayo. Revive cada bloque."
        : "Sigue en tiempo real el flujo de conocimiento. TicoBlockchain 2026 no se detiene.";
  const dateBadge =
    phase === "during" ? `HOY · ${VENUE.eventDate}` : VENUE.eventDate;

  return (
    <main id="main">
      <LiveRefresh
        nextTransitionAt={nextTransitionAt}
        simulated={simulated !== null}
      />
      {simulated && <DevTimeBanner simulated={simulated} />}

      {/* Polite SR announcement — only emits during the event window so
          screen readers are notified when the live session transitions.
          Invisible to sighted users. */}
      {phase === "during" && (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {liveAnnouncement(mainLive)}
        </div>
      )}

      {/* ── PHASE: BEFORE · countdown hero ────────────────────────────── */}
      {/* Composition: masthead rule → countdown glyph (left) + wordmark
          (right) filling the hero width → meta strip + CTAs at the bottom.
          The countdown is the protagonist because it's the live data the
          pre-event page exists to deliver; same DNA as "AHORA" during the
          event. */}
      {phase === "before" && (
        <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60dvh] sm:min-h-[75dvh] lg:min-h-[85dvh] bg-primary overflow-hidden">
          <div className="lg:col-span-9 relative flex flex-col p-5 sm:p-8 md:p-12 text-on-primary">
            {/* Masthead rule — eyebrow left, event date right. */}
            <div className="flex items-center justify-between gap-4 pb-5 border-b-2 border-on-primary/20 animate-fade-up">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-secondary animate-live-glow" />
                <span className="mono-data text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                  PRÓXIMO EVENTO · SAN JOSÉ
                </span>
              </div>
              <span className="mono-data text-[10px] sm:text-xs uppercase tracking-widest text-on-primary/60">
                14.05.26 · GMT-6
              </span>
            </div>

            {/* Hero composition: countdown eyebrow → wordmark hero →
                crimson "2026" accent. A single vertical reading unit so
                nothing competes for attention. The wordmark's short/long
                asymmetry (TICO / BLOCKCHAIN) fills the column naturally
                instead of fighting it. */}
            <div className="flex-1 flex flex-col justify-center py-10 md:py-14">
              {/* Countdown pill — context eyebrow above the wordmark. Lives
                  as a small crimson chip so the wordmark stays the hero. */}
              <div className="animate-fade-up stagger-1 mb-6 md:mb-8">
                <span className="bg-secondary text-on-secondary mono-data text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 inline-flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 bg-on-secondary shrink-0"
                    aria-hidden="true"
                  />
                  {daysUntilEvent === 0
                    ? "Hoy · Arranca 08:00 CRT"
                    : daysUntilEvent === 1
                      ? `Mañana · 08:00 CRT`
                      : `En ${daysUntilEvent} días`}
                </span>
              </div>

              {/* Wordmark — TICO (short) over BLOCKCHAIN (long) with CHAIN
                  in crimson for the brand accent. BLOCKCHAIN at this scale
                  fills the column width; TICO stays short by design. */}
              <h1 className="font-display font-black uppercase tracking-tighter leading-[0.88] text-[clamp(3rem,13vw,12rem)] break-words animate-reveal-up stagger-2">
                TICO
                <br />
                BLOCK
                <span className="text-secondary">CHAIN</span>
              </h1>
              <div className="mono-data text-secondary font-black tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-3 md:mt-5 animate-fade-up stagger-3">
                2026
              </div>
            </div>

            {/* Bottom: meta strip + venue + CTAs. Top/bottom rules sit on
                the grid itself so cell padding = the visual breathing room
                between line and label (tight ceiling, no floating gap). */}
            <div className="mt-auto space-y-6 animate-fade-up stagger-4">
              <div className="grid grid-cols-3 gap-0 border-y-2 border-on-primary/20">
                <div className="py-3 px-1 border-r border-on-primary/15">
                  <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                    Fecha
                  </div>
                  <div className="mono-data text-base sm:text-xl md:text-2xl font-black text-on-primary tracking-tighter">
                    14.05.26
                  </div>
                </div>
                <div className="py-3 px-1 border-r border-on-primary/15">
                  <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                    Inicio
                  </div>
                  <div className="mono-data text-base sm:text-xl md:text-2xl font-black text-on-primary tracking-tighter">
                    08:00
                  </div>
                </div>
                <div className="py-3 px-1">
                  <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                    Venue
                  </div>
                  <div className="mono-data text-base sm:text-xl md:text-2xl font-black text-on-primary tracking-tighter">
                    BARCELÓ
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="mono-data text-xs sm:text-sm uppercase tracking-wider text-on-primary/70">
                  HOTEL BARCELÓ SAN JOSÉ · COSTA RICA
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/agenda"
                    className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
                  >
                    <Icon name="north_east" size={14} /> VER AGENDA
                  </Link>
                  <Link
                    href="/exponentes"
                    className="border-2 border-on-primary text-on-primary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:bg-on-primary hover:text-primary transition-colors duration-200 min-h-[48px]"
                  >
                    EXPONENTES
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay overflow-hidden">
              <Image
                src={HERO_CONTENT.heroImageUrl}
                alt={HERO_CONTENT.heroImageAlt}
                fill
                sizes="100vw"
                className="object-cover animate-hero-zoom"
                priority
              />
            </div>
          </div>

          {/* Sidebar: preview of the first three sessions of the day. */}
          <div className="lg:col-span-3 bg-surface-container-low p-5 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10">
            <h3 className="font-display font-black text-xl uppercase mb-8 flex items-center justify-between text-primary animate-fade-up stagger-2">
              AGENDA DEL DÍA
              <Icon name="sensors" size={22} />
            </h3>
            <div className="space-y-1">
              {sidebarSessions.slice(0, 2).map((session, i) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  variant="light"
                  staggerClass={`stagger-${Math.min(i + 3, 7)}`}
                />
              ))}
              {sidebarSessions[2] && (
                <SessionCard
                  session={sidebarSessions[2]}
                  variant="dark"
                  staggerClass="stagger-5"
                />
              )}
            </div>

            <div className="mt-auto pt-8 animate-fade-in stagger-6">
              <Image
                src={HERO_CONTENT.sidebarImageUrl}
                alt={HERO_CONTENT.sidebarImageAlt}
                width={400}
                height={192}
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="w-full h-48 object-cover grayscale brightness-50 contrast-125 mb-4"
              />
              <p className="font-display font-bold text-xs uppercase tracking-tighter text-primary">
                {HERO_CONTENT.capacityLabel}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PHASE: DURING · live speaker hero ─────────────────────────── */}
      {phase === "during" && (
        <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60dvh] sm:min-h-[70dvh] lg:min-h-[85dvh] bg-primary overflow-hidden">
          <div className="lg:col-span-9 relative flex flex-col justify-between p-5 sm:p-8 md:p-12 text-on-primary">
            <div className="flex items-center gap-3 animate-fade-up">
              <LiveDot />
              <span className="mono-data text-sm font-bold tracking-widest uppercase">
                {HERO_CONTENT.liveLabel}
              </span>
            </div>

            <div className="mt-12 md:mt-0">
              <h1
                aria-label={
                  headline.last
                    ? `${headline.first} ${headline.last}`
                    : headline.first
                }
                className="text-[clamp(2.5rem,12vw,12rem)] leading-[0.85] font-black uppercase tracking-tighter -ml-1 md:-ml-4 break-words font-display animate-reveal-up stagger-1"
              >
                {headline.first}
                {headline.last && (
                  <>
                    <br />
                    {headline.last}
                  </>
                )}
              </h1>
              <div className="mt-8 flex items-baseline gap-4 border-l-4 border-secondary pl-6 animate-fade-up stagger-3">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-bold uppercase tracking-tight max-w-2xl">
                  {mainLive?.title ?? "Sesión en preparación"}
                </h2>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 md:mt-24 space-y-6 animate-fade-up stagger-4">
              {/* Real session progress — tied to (now - start)/(end - start)
                  via --progress-pct; animates on first paint and on every
                  server refresh at a transition boundary. */}
              <div
                className="w-full bg-on-primary/10 h-1"
                role="progressbar"
                aria-label={
                  mainLive
                    ? `Progreso de ${mainLive.title}`
                    : "Progreso de la sesión en curso"
                }
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPct}
              >
                <div
                  className="bg-secondary h-full animate-progress-fill"
                  style={
                    { "--progress-pct": `${progressPct}%` } as CSSProperties
                  }
                />
              </div>
              {/* Stacked meta: mono label → bold title → time chip. Replaces
                  the single-line "PRÓXIMA EN MAIN STAGE: …" that wrapped
                  unreadably on narrow screens. */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="min-w-0 max-w-full md:max-w-[60%]">
                  <div className="mono-data text-[10px] sm:text-xs uppercase tracking-widest text-on-primary/60 mb-1">
                    PRÓXIMA EN MAIN STAGE
                  </div>
                  {sidebarSessions[0] ? (
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-display text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-on-primary leading-tight">
                        {sidebarSessions[0].title}
                      </span>
                      <span className="mono-data text-sm sm:text-base font-black text-secondary tracking-tighter">
                        {sidebarSessions[0].startTime}
                      </span>
                    </div>
                  ) : (
                    <div className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-on-primary">
                      Cierre de jornada
                    </div>
                  )}
                </div>
                <div className="flex gap-4 shrink-0">
                  <Link
                    href="/agenda"
                    className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
                  >
                    <Icon name="north_east" size={14} /> VER AGENDA COMPLETA
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay overflow-hidden">
              <Image
                src={HERO_CONTENT.heroImageUrl}
                alt={HERO_CONTENT.heroImageAlt}
                fill
                sizes="100vw"
                className="object-cover animate-hero-zoom"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-3 bg-surface-container-low p-5 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10">
            <h3 className="font-display font-black text-xl uppercase mb-8 flex items-center justify-between text-primary animate-fade-up stagger-2">
              PRÓXIMAS CHARLAS
              <Icon name="sensors" size={22} />
            </h3>
            <div className="space-y-1">
              {sidebarSessions.slice(0, 2).map((session, i) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  variant="light"
                  staggerClass={`stagger-${Math.min(i + 3, 7)}`}
                />
              ))}
              {sidebarSessions[2] && (
                <SessionCard
                  session={sidebarSessions[2]}
                  variant="dark"
                  staggerClass="stagger-5"
                />
              )}
            </div>

            <div className="mt-auto pt-8 animate-fade-in stagger-6">
              <Image
                src={HERO_CONTENT.sidebarImageUrl}
                alt={HERO_CONTENT.sidebarImageAlt}
                width={400}
                height={192}
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="w-full h-48 object-cover grayscale brightness-50 contrast-125 mb-4"
              />
              <p className="font-display font-bold text-xs uppercase tracking-tighter text-primary">
                {HERO_CONTENT.capacityLabel}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PHASE: AFTER · gratitude hero ─────────────────────────────── */}
      {phase === "after" && (
        <section className="relative min-h-[60dvh] sm:min-h-[70dvh] lg:min-h-[85dvh] bg-primary overflow-hidden flex flex-col items-center justify-center text-center p-5 sm:p-8 md:p-12 lg:p-24 text-on-primary">
          <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12">
            <div className="flex items-center gap-3 animate-fade-up">
              <span className="w-2 h-2 bg-secondary" />
              <span className="mono-data text-sm font-bold tracking-widest uppercase">
                EDICIÓN 2026 · FINALIZADA
              </span>
            </div>

            <h1 className="text-[clamp(3rem,14vw,14rem)] leading-[0.85] font-black uppercase tracking-tighter break-words font-display animate-reveal-up stagger-1">
              GRACIAS
              <br />
              <span className="text-secondary">SAN JOSÉ</span>
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-bold uppercase tracking-tight max-w-3xl animate-fade-up stagger-3">
              La transmisión del 14 de mayo cerró el telón.
            </h2>

            <div className="grid grid-cols-3 gap-0 border-y-2 border-on-primary/20 w-full max-w-3xl animate-fade-up stagger-4">
              <div className="py-4 px-2 border-r border-on-primary/20">
                <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                  Charlas
                </div>
                <div className="mono-data text-2xl sm:text-4xl font-black text-on-primary tracking-tighter">
                  {sortedSessions.length}
                </div>
              </div>
              <div className="py-4 px-2 border-r border-on-primary/20">
                <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                  Escenarios
                </div>
                <div className="mono-data text-2xl sm:text-4xl font-black text-on-primary tracking-tighter">
                  02
                </div>
              </div>
              <div className="py-4 px-2">
                <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                  Edición
                </div>
                <div className="mono-data text-2xl sm:text-4xl font-black text-on-primary tracking-tighter">
                  2026
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center animate-fade-up stagger-5">
              <Link
                href="/agenda"
                className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
              >
                <Icon name="north_east" size={14} /> REVIVE LA AGENDA
              </Link>
              <Link
                href="/exponentes"
                className="border-2 border-on-primary text-on-primary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:bg-on-primary hover:text-primary transition-colors duration-200 min-h-[48px]"
              >
                VER EXPONENTES
              </Link>
            </div>
          </div>

          <div className="absolute inset-0 z-[-1] opacity-15 mix-blend-overlay overflow-hidden">
            <Image
              src={HERO_CONTENT.heroImageUrl}
              alt={HERO_CONTENT.heroImageAlt}
              fill
              sizes="100vw"
              className="object-cover animate-hero-zoom"
              priority
            />
          </div>
        </section>
      )}

      {/* Sponsor-linked activity callout — shown when the currently live
          session (main or parallel) is tied to an off-stage sponsor action
          (Lulubit app download, Cofiblocks coffee break). */}
      {sponsorCallout && <SponsorCallout callout={sponsorCallout} />}

      {/* En Paralelo — Escenario 2 Live Session (during only) */}
      {parallelLive && (
        <section className="bg-surface-container-high px-5 sm:px-8 md:px-12 lg:px-24 py-10 border-t border-primary/10 border-b-4 border-b-secondary animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <LiveDot />
              <span className="mono-data text-[11px] font-bold tracking-widest uppercase text-secondary">
                {HERO_CONTENT.parallelLabel}
              </span>
            </div>
            <div className="flex-grow md:ml-8">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-primary">
                {parallelLive.title}
              </h3>
              {(parallelLive.speakerName ?? parallelLive.speakerOrg) && (
                <p className="mono-data text-[11px] uppercase tracking-wider text-on-surface-variant mt-1">
                  {parallelLive.speakerName ?? parallelLive.speakerOrg}
                </p>
              )}
            </div>
            <span className="mono-data text-2xl font-black text-secondary whitespace-nowrap">
              {parallelLive.time}
            </span>
          </div>
        </section>
      )}

      {/* Chronogram / Departure Board Section — heading adapts to phase */}
      <section className="p-5 sm:p-8 md:p-12 lg:p-24 bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary font-display animate-slide-left">
            {agendaHeading.top}
            <br />
            {agendaHeading.bottom}
          </h2>
          <div className="max-w-md animate-fade-up stagger-2">
            <p className="text-xl font-medium leading-tight text-primary">
              {agendaBlurb}
            </p>
            <div className="mt-6 flex gap-4">
              <span className="bg-primary text-on-primary px-3 py-1 mono-data text-[10px] uppercase font-bold tracking-widest">
                {dateBadge}
              </span>
              <span className="bg-surface-container-highest px-3 py-1 mono-data text-[10px] uppercase font-bold tracking-widest">
                {VENUE.timezone}
              </span>
            </div>
          </div>
        </div>

        {/* The "Departure" List */}
        <div className="border-t-4 border-primary">
          {agendaPreview.map((session, i) => (
            <DepartureRow
              key={session.id}
              session={session}
              staggerClass={`stagger-${Math.min(i + 3, 7)}`}
            />
          ))}
        </div>
      </section>

      {/* Información Práctica — editorial manifest. Each row has an oversized
          mono "hook" (the actual data point), a crimson-dotted label, and
          prose body. Reads top-to-bottom like a departure board, not a
          grid of identical feature cards. */}
      <section className="bg-primary p-5 sm:p-8 md:p-12 lg:p-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-on-primary font-display animate-slide-left">
            INFORMACIÓN
            <br />
            PRÁCTICA
          </h2>
          <div className="mono-data text-[10px] sm:text-xs uppercase tracking-widest text-on-primary/60 max-w-xs md:text-right animate-fade-up stagger-2">
            Todo lo que necesitás para el 14 de mayo, en una sola línea de tiempo.
          </div>
        </div>

        <div className="border-t-4 border-on-primary/30">
          {PRACTICAL_INFO.map((item, i) => (
            <div
              key={item.id}
              className={`grid grid-cols-[auto_1fr] md:grid-cols-[3rem_5fr_6fr] gap-x-4 md:gap-x-8 gap-y-3 py-6 sm:py-8 md:py-10 border-b border-on-primary/15 items-start animate-fade-up stagger-${Math.min(i + 1, 7)}`}
            >
              {/* Index — departure-board row number */}
              <div className="mono-data text-[11px] sm:text-xs uppercase tracking-widest font-bold text-secondary pt-2 md:pt-4 row-span-2 md:row-span-1">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Hook + label */}
              <div className="min-w-0">
                <div className="mono-data font-black uppercase tracking-tighter text-on-primary text-[clamp(1.75rem,5vw,4rem)] leading-[0.9] break-words">
                  {item.hook}
                </div>
                <div className="mono-data text-[11px] uppercase font-bold tracking-widest text-on-primary/70 mt-3 md:mt-4 flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 bg-secondary shrink-0"
                    aria-hidden="true"
                  />
                  {item.label}
                </div>
              </div>

              {/* Body */}
              <div className="col-start-2 md:col-start-3 md:pt-3">
                <p className="text-on-primary/80 text-sm sm:text-base leading-relaxed max-w-prose">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo Llegar */}
      <section className="bg-surface p-5 sm:p-8 md:p-12 lg:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 lg:gap-2 items-stretch">
          {/* Venue Details — title + content unified */}
          <div className="flex flex-col animate-fade-up stagger-2">
            <h2 className="text-[clamp(2.75rem,8vw,7rem)] leading-[0.85] font-black uppercase tracking-tighter text-primary font-display mb-8 animate-slide-left">
              CÓMO
              <br />
              LLEGAR
            </h2>

            <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tighter text-primary mb-3">
              {VENUE_DIRECTIONS.name}
            </h3>
            <p className="text-on-surface-variant mb-8 text-base">
              {VENUE_DIRECTIONS.address}
            </p>

            <div className="mb-6 space-y-2">
              <div className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                Distancias
              </div>
              {VENUE_DIRECTIONS.distances.map((d) => (
                <div
                  key={d}
                  className="flex items-center gap-3 mono-data text-sm text-primary"
                >
                  <span className="w-1.5 h-1.5 bg-secondary shrink-0" />
                  {d}
                </div>
              ))}
            </div>

            <div className="mb-8 space-y-2">
              <div className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-3">
                Transporte
              </div>
              {VENUE_DIRECTIONS.transport.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 text-sm text-primary"
                >
                  <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-auto">
              <a
                href={VENUE_DIRECTIONS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-display font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors duration-200 btn-shine min-h-[48px]"
              >
                <Icon name="location_on" size={16} />
                Abrir en Google Maps
              </a>
              <a
                href={VENUE_DIRECTIONS.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 font-display font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-on-primary transition-colors duration-200 min-h-[48px]"
              >
                <Icon name="north_east" size={16} />
                Abrir en Waze
              </a>
            </div>
          </div>

          {/* Google Maps Embed — full column height */}
          <div className="animate-fade-up stagger-4">
            <div className="border-2 border-primary overflow-hidden w-full h-[350px] sm:h-[450px] lg:h-full lg:min-h-[600px]">
              <iframe
                src={VENUE_DIRECTIONS.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del Hotel Barceló San José"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
