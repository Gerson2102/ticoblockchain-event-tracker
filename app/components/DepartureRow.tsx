import type { Session } from "../data/types";
import StageBadge from "./StageBadge";
import StatusBadge from "./StatusBadge";

type DepartureRowProps = {
  session: Session;
  staggerClass?: string;
  // Minutes until this session begins — renders on the NEXT status block.
  countdownMinutes?: number;
};

// Departure-board style row for the home page agenda preview.
// A single row of an airport FIDS: rail node | time | stage monogram |
// title + speaker | status. The LIVE row inverts to cobalt-on-white for
// "contrast = elevation" per the Horizonte Cobalt system.
export default function DepartureRow({
  session,
  staggerClass,
  countdownMinutes,
}: DepartureRowProps) {
  const isLive = session.status === "live";
  const isPast = session.status === "past";
  const isNext = session.status === "next";

  const rowClasses = [
    "grid grid-cols-[2rem_auto_1fr_auto] md:grid-cols-[2.5rem_minmax(6rem,11rem)_auto_minmax(0,1fr)_auto] items-center gap-x-3 sm:gap-x-5 md:gap-x-6 py-6 sm:py-7 border-b border-primary/20 animate-fade-up group",
    isLive
      ? "bg-primary text-on-primary border-b-secondary"
      : "hover:bg-surface-container-high transition-colors duration-200",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // Rail node: crimson pulsing square for LIVE, filled cobalt for past,
  // hollow cobalt outline for upcoming. Always placed in its own column so
  // the nodes line up vertically into a timeline rail.
  const nodeClasses = isLive
    ? "w-3 h-3 bg-secondary animate-live-glow"
    : isPast
      ? "w-3 h-3 bg-primary/40"
      : "w-3 h-3 border-2 border-primary bg-surface";

  const timeClasses = [
    "mono-data font-black tracking-tighter leading-none whitespace-nowrap",
    "text-[clamp(1.75rem,4vw,3rem)]",
    isLive
      ? "text-on-primary"
      : isPast
        ? "text-primary/55"
        : "text-primary group-hover:text-primary",
  ].join(" ");

  const titleClasses = [
    "font-display font-bold uppercase tracking-tight leading-tight",
    "text-lg sm:text-xl md:text-2xl",
    isLive
      ? "text-on-primary font-black tracking-tighter"
      : isPast
        ? "text-primary/70"
        : "text-primary group-hover:translate-x-1 transition-transform duration-300",
  ].join(" ");

  const speakerLine = session.speakerName
    ? session.speakerOrg
      ? `${session.speakerName} — ${session.speakerOrg}`
      : session.speakerName
    : session.speakerOrg;

  const speakerClasses = [
    "mono-data text-[10px] sm:text-[11px] uppercase tracking-widest font-bold mt-2",
    isLive ? "text-on-primary/80" : "text-on-surface-variant",
  ].join(" ");

  const timeLabel = isLive ? "AHORA" : session.startTime;

  return (
    <div className={rowClasses}>
      {/* Rail node */}
      <div className="flex justify-center items-center self-start pt-2 md:pt-3">
        <span className={nodeClasses} aria-hidden="true" />
      </div>

      {/* Time */}
      <div className={timeClasses}>{timeLabel}</div>

      {/* Stage monogram */}
      <div className="hidden md:block">
        <StageBadge stage={session.stage} size="md" />
      </div>

      {/* Title + speaker */}
      <div className="col-start-3 md:col-start-4 row-start-1 md:row-start-auto min-w-0">
        <h5 className={titleClasses}>{session.title}</h5>
        {speakerLine && <div className={speakerClasses}>{speakerLine}</div>}
        {/* Stage badge appears on mobile under the title so the grid stays
            readable on narrow viewports. */}
        <div className="md:hidden mt-2">
          <StageBadge stage={session.stage} size="sm" />
        </div>
      </div>

      {/* Status */}
      <div className="col-start-4 md:col-start-5 row-start-1 md:row-start-auto text-right self-start md:self-center pt-1 md:pt-0">
        <StatusBadge
          status={session.status}
          countdownMinutes={isNext ? countdownMinutes : undefined}
        />
      </div>
    </div>
  );
}
