import Image from "next/image";
import DepartureRow from "./components/DepartureRow";
import Icon from "./components/Icon";
import LiveDot from "./components/LiveDot";
import SessionCard from "./components/SessionCard";
import { HERO_CONTENT, BENTO_HIGHLIGHTS } from "./data/home-content";
import {
  getLiveSessions,
  getNextSessions,
  getSessionsAt,
} from "./data/sessions";
import type { Session } from "./data/types";
import { VENUE } from "./data/venue";

// Revalidate every 60 seconds so time-derived session status (live/next/past)
// updates during the event without a redeploy.
export const revalidate = 60;

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

export default function EnVivoPage() {
  const now = new Date();
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
      {/* Live Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[819px] bg-primary overflow-hidden">
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
            <h1 className="text-[clamp(2.5rem,12vw,12rem)] leading-[0.85] font-black uppercase tracking-tighter -ml-1 md:-ml-4 break-words font-display animate-reveal-up stagger-1">
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

      {/* Bento Grid Highlights */}
      <section className="bg-primary p-5 sm:p-8 md:p-12 lg:p-24 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-on-primary/10">
          {BENTO_HIGHLIGHTS.map((item, i) => (
            <BentoCell key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Newsletter / Editorial Callout */}
      <section className="bg-surface p-5 sm:p-8 md:p-12 lg:p-24 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary max-w-4xl mb-12 font-display animate-fade-up stagger-1">
          ¿TE PERDISTE ALGUNA SESIÓN? RECIBE EL RESUMEN EJECUTIVO DIARIO.
        </h2>
        <form className="w-full max-w-xl flex flex-col md:flex-row items-end gap-4 animate-fade-up stagger-3">
          <div className="flex-grow w-full">
            <label className="block text-left mono-data text-[10px] font-bold uppercase text-primary/60 mb-2">
              DIRECCIÓN DE CORREO
            </label>
            <input
              className="w-full bg-transparent border-b-2 border-primary focus:border-secondary transition-colors duration-200 py-4 outline-none font-display font-bold uppercase"
              placeholder="TU@EMAIL.COM"
              type="email"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-on-primary px-8 py-4 sm:px-12 sm:py-5 font-display font-bold uppercase tracking-widest text-sm w-full md:w-auto hover:bg-primary-container transition-colors duration-200 btn-shine min-h-[48px]"
          >
            SUSCRIBIRSE
          </button>
        </form>
      </section>
    </main>
  );
}

/* ------------------------- Bento grid sub-component ------------------------- */

type BentoCellProps = {
  item: (typeof BENTO_HIGHLIGHTS)[number];
  index: number;
};

function BentoCell({ item, index }: BentoCellProps) {
  const stagger = `stagger-${Math.min(index + 1, 7)}`;

  if (item.kind === "recap") {
    return (
      <div
        className={`sm:col-span-2 md:col-span-2 md:row-span-2 bg-primary p-6 sm:p-8 md:p-12 flex flex-col justify-end min-h-[300px] sm:min-h-[400px] md:min-h-[500px] border border-on-primary/10 animate-fade-up ${stagger}`}
      >
        <div className="mono-data text-secondary font-bold text-xs uppercase tracking-widest mb-4">
          {item.label}
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-on-primary uppercase tracking-tighter mb-6 leading-none font-display">
          {item.title}
        </h3>
        <p className="text-on-primary/60 mb-8 max-w-sm">{item.body}</p>
        <button className="w-fit border-b-2 border-secondary text-on-primary font-display font-bold uppercase tracking-widest py-2 hover:bg-secondary transition-colors duration-200 px-2 btn-shine">
          LEER MÁS
        </button>
      </div>
    );
  }

  if (item.kind === "gallery") {
    return (
      <div
        className={`sm:col-span-2 md:col-span-2 bg-primary relative overflow-hidden min-h-[180px] sm:min-h-[250px] border border-on-primary/10 group animate-fade-in ${stagger}`}
      >
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.imageAlt ?? ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        )}
        <div className="absolute bottom-8 left-8">
          <span className="bg-on-primary text-primary px-3 py-1 mono-data text-[10px] font-bold uppercase">
            {item.label}
          </span>
        </div>
      </div>
    );
  }

  if (item.kind === "stats") {
    return (
      <div
        className={`bg-primary-container p-5 sm:p-8 border border-on-primary/10 animate-fade-up ${stagger}`}
      >
        <div className="text-4xl sm:text-6xl font-black text-secondary mono-data">
          {item.statValue}
        </div>
        <div className="mono-data text-xs uppercase text-on-primary/60 mt-2">
          {item.statLabel}
        </div>
      </div>
    );
  }

  // location
  return (
    <div
      className={`bg-surface p-5 sm:p-8 border border-on-primary/10 group cursor-pointer hover-lift animate-fade-up ${stagger}`}
    >
      <div className="flex justify-between items-start mb-12">
        <Icon
          name="location_on"
          size={24}
          className="text-primary group-hover:text-secondary transition-colors duration-200"
        />
        <span className="mono-data text-[10px] font-bold uppercase text-primary/40">
          {item.label}
        </span>
      </div>
      <div className="text-xl font-display font-bold text-primary uppercase">
        {item.title}
      </div>
    </div>
  );
}
