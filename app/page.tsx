import DepartureRow from "./components/DepartureRow";
import DevTimeBanner from "./components/DevTimeBanner";
import EnParaleloSection from "./components/hero/EnParaleloSection";
import HeroAfter from "./components/hero/HeroAfter";
import HeroBefore from "./components/hero/HeroBefore";
import HeroDuring from "./components/hero/HeroDuring";
import Icon from "./components/Icon";
import LiveRefresh from "./components/LiveRefresh";
import {
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

  const nextUpSessions = getNextSessions(3, now);
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

  // Only treat escenario-2 as "distinct" when it's not a mirrored "both"-
  // stage session already shown in the main hero. Empty state falls back
  // to the next scheduled esc-2 / both talk so the spatial map stays intact.
  const distinctParallel =
    parallelLive && parallelLive.id !== mainLive?.id ? parallelLive : undefined;
  const parallelProgress = distinctParallel
    ? getSessionProgress(distinctParallel, now)
    : null;
  const parallelProgressPct =
    parallelProgress === null ? 0 : Math.round(parallelProgress * 100);

  // Agenda preview anchors to the Main Stage live row. Slice ±1 around it
  // for visual continuity; fall back to the first 5 rows if nothing is live.
  const sortedSessions = sortByStartTime(getSessionsAt(now));
  const nextParallel =
    phase === "during" && !distinctParallel
      ? sortedSessions.find(
          (s) =>
            (s.stage === "escenario-2" || s.stage === "both") &&
            (s.status === "next" || s.status === "scheduled"),
        )
      : undefined;
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
          screen readers are notified when the live session transitions. */}
      {phase === "during" && (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {liveAnnouncement(mainLive)}
        </div>
      )}

      {phase === "before" && (
        <HeroBefore
          daysUntilEvent={daysUntilEvent}
          openingSessions={sortedSessions.slice(0, 8)}
        />
      )}

      {phase === "during" && (
        <HeroDuring
          mainLive={mainLive}
          headline={headline}
          progressPct={progressPct}
          nextUpSessions={nextUpSessions}
          sponsorCallout={sponsorCallout}
          now={now}
        />
      )}

      {phase === "after" && <HeroAfter totalSessions={sortedSessions.length} />}

      {phase === "during" && (
        <EnParaleloSection
          distinctParallel={distinctParallel}
          nextParallel={nextParallel}
          parallelProgressPct={parallelProgressPct}
        />
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
              <div className="mono-data text-[11px] sm:text-xs uppercase tracking-widest font-bold text-secondary pt-2 md:pt-4 row-span-2 md:row-span-1">
                {String(i + 1).padStart(2, "0")}
              </div>

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
