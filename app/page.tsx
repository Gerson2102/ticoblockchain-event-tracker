import Image from "next/image";
import DepartureRow from "./components/DepartureRow";
import DevTimeBanner from "./components/DevTimeBanner";
import Icon from "./components/Icon";
import LiveDot from "./components/LiveDot";
import LiveRefresh from "./components/LiveRefresh";
import SessionCard from "./components/SessionCard";
import {
  HERO_CONTENT,
  PRACTICAL_INFO,
  VENUE_DIRECTIONS,
} from "./data/home-content";
import { resolveNow } from "./data/now";
import {
  getLiveSessions,
  getNextSessions,
  getNextTransitionAt,
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

export default async function EnVivoPage({
  searchParams,
}: {
  searchParams: Promise<{ now?: string | string[] }>;
}) {
  const { now: resolvedNow, simulated } = resolveNow((await searchParams).now);
  const now = resolvedNow;
  const nextTransitionAt = getNextTransitionAt(now);
  const live = getLiveSessions(now);
  const mainLive = live.main;
  const parallelLive = live.escenario2;

  const sidebarSessions = getNextSessions(3, now);

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

  return (
    <main id="main">
      <LiveRefresh
        nextTransitionAt={nextTransitionAt}
        simulated={simulated !== null}
      />
      {simulated && <DevTimeBanner simulated={simulated} />}
      {/* Live Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] bg-primary overflow-hidden">
        {/* Hero Stream Side */}
        <div className="lg:col-span-9 relative flex flex-col justify-between p-5 sm:p-8 md:p-12 text-on-primary">
          {/* Live Indicator */}
          <div className="flex items-center gap-3 animate-fade-up">
            <LiveDot />
            <span className="mono-data text-sm font-bold tracking-widest uppercase">
              {HERO_CONTENT.liveLabel}
            </span>
          </div>

          {/* Main Speaker Name (Oversized Editorial) */}
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

          {/* Progress & Metadata */}
          <div className="mt-8 sm:mt-12 md:mt-24 space-y-6 animate-fade-up stagger-4">
            <div className="w-full bg-on-primary/10 h-1">
              <div className="bg-secondary h-full animate-progress-fill" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="mono-data text-sm uppercase tracking-wider text-on-primary/60">
                PRÓXIMA EN MAIN STAGE:{" "}
                {sidebarSessions[0] ? (
                  <>
                    {sidebarSessions[0].title.toUpperCase()}
                    <span className="text-on-primary font-bold ml-2">
                      {sidebarSessions[0].startTime}
                    </span>
                  </>
                ) : (
                  "CIERRE DE JORNADA"
                )}
              </div>
              <div className="flex gap-4">
                <button className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]">
                  <Icon name="play_arrow" size={14} /> VER STREAM
                </button>
              </div>
            </div>
          </div>

          {/* Background Image Layer */}
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

        {/* Upcoming Sessions Sidebar */}
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
              className="w-full h-48 object-cover grayscale brightness-50 contrast-125 mb-4 hover:grayscale-0 transition-all duration-700"
            />
            <p className="font-display font-bold text-xs uppercase tracking-tighter text-primary">
              {HERO_CONTENT.capacityLabel}
            </p>
          </div>
        </div>
      </section>

      {/* En Paralelo — Escenario 2 Live Session */}
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

      {/* Chronogram / Departure Board Section */}
      <section className="p-5 sm:p-8 md:p-12 lg:p-24 bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary font-display animate-slide-left">
            AGENDA
            <br />
            LIVE
          </h2>
          <div className="max-w-md animate-fade-up stagger-2">
            <p className="text-xl font-medium leading-tight text-primary">
              Sigue en tiempo real el flujo de conocimiento. TicoBlockchain 2026
              no se detiene.
            </p>
            <div className="mt-6 flex gap-4">
              <span className="bg-primary text-on-primary px-3 py-1 mono-data text-[10px] uppercase font-bold tracking-widest">
                HOY: {VENUE.eventDate}
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

      {/* Información Práctica */}
      <section className="bg-primary p-5 sm:p-8 md:p-12 lg:p-24">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-on-primary font-display mb-16 animate-slide-left">
          INFORMACIÓN
          <br />
          PRÁCTICA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRACTICAL_INFO.map((item, i) => (
            <div
              key={item.id}
              className={`group bg-primary-container border-l-4 border-secondary p-6 flex items-start gap-4 cursor-default transition-all duration-300 hover:bg-primary hover:border-l-8 hover:-translate-y-1 animate-fade-up stagger-${Math.min(i + 1, 7)}`}
            >
              <Icon
                name={item.icon}
                size={24}
                className="text-secondary shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110"
              />
              <div>
                <h3 className="mono-data text-sm font-bold uppercase tracking-wider text-on-primary mb-2 transition-colors duration-300 group-hover:text-secondary">
                  {item.title}
                </h3>
                <p className="text-on-primary-container text-sm leading-relaxed">
                  {item.detail}
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

