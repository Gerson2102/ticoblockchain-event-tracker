import type { Session, SessionCategory } from "../data/types";
import { stageLabel } from "../data/venue";

type TimelineRowProps = {
  session: Session;
  staggerClass?: string;
  lastItem?: boolean;
};

// Category tint applied to the left border of non-live rows. Live rows
// keep their dedicated secondary-color treatment.
function categoryAccent(category: SessionCategory): string {
  switch (category) {
    case "keynote":
      return "border-secondary";
    case "sponsor-slot":
      return "border-primary-container";
    case "panel":
    case "pitch":
    case "workshop":
      return "border-primary";
    default:
      return "border-outline-variant";
  }
}

// Vertical-timeline row for the full agenda page.
// Different visual treatment than DepartureRow: more detail, status-specific styling.
export default function TimelineRow({
  session,
  staggerClass,
  lastItem = false,
}: TimelineRowProps) {
  const isLive = session.status === "live";
  const isPast = session.status === "past";
  const isBoth = session.stage === "both";

  const rootClasses = [
    "flex flex-col md:flex-row items-start md:items-center py-8 group animate-fade-up border-l-4 pl-4",
    isLive
      ? "py-10 bg-surface-container-low border-secondary animate-border-breathe -mx-4 sm:-mx-6 pr-4 sm:pr-6 relative"
      : `${categoryAccent(session.category)} hover:bg-surface-container-high transition-colors duration-200`,
    isPast ? "opacity-40" : "",
    lastItem ? "border-b-2 border-primary" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const timeClasses = [
    "w-auto md:w-32 mono-data font-bold",
    isLive ? "text-2xl font-black text-secondary" : "text-lg sm:text-xl",
  ].join(" ");

  const titleClasses = [
    "font-display font-bold uppercase tracking-tight",
    isLive
      ? "text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-primary"
      : "text-2xl",
  ].join(" ");

  const speakerClasses = [
    "font-medium mt-1 uppercase text-sm tracking-wide",
    isLive ? "text-primary font-bold tracking-widest" : "text-on-surface-variant",
  ].join(" ");

  const stageBadgeClasses = [
    "text-[10px] font-bold px-3 py-1 uppercase tracking-tighter inline-block",
    isLive ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary",
  ].join(" ");

  const speakerLine = session.speakerName
    ? session.speakerOrg
      ? `${session.speakerName} — ${session.speakerOrg}`
      : session.speakerName
    : session.speakerOrg;

  return (
    <div className={rootClasses}>
      <div className={timeClasses}>{session.time}</div>
      <div className="flex-grow md:ml-12">
        {isLive && (
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-secondary text-on-secondary mono-data text-[10px] font-bold px-2 py-0.5 uppercase animate-live-glow">
              ahora
            </span>
          </div>
        )}
        <div className={titleClasses}>{session.title}</div>
        {speakerLine && <div className={speakerClasses}>{speakerLine}</div>}
        {session.description && (
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-snug text-on-surface-variant font-medium">
            {session.description}
          </p>
        )}
      </div>
      <div className="mt-4 md:mt-0 w-auto md:w-52 text-left md:text-right">
        {isBoth ? (
          <div className="flex flex-col gap-1 md:items-end">
            <span className={stageBadgeClasses}>MAIN STAGE</span>
            <span className={stageBadgeClasses}>ESCENARIO 2</span>
          </div>
        ) : (
          <span className={stageBadgeClasses}>{stageLabel(session.stage)}</span>
        )}
      </div>
    </div>
  );
}
