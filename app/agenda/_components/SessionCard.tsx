import type { Session, SessionCategory } from "../../data/types";

type SessionCardProps = {
  session: Session;
  stageLabel?: string;
  variant?: "column" | "wide";
};

const CATEGORY_CHIP: Record<SessionCategory, { label: string; className: string } | null> = {
  keynote: { label: "KEYNOTE", className: "bg-secondary text-on-secondary" },
  panel: { label: "PANEL", className: "bg-primary text-on-primary" },
  pitch: { label: "PITCH", className: "bg-primary-container text-on-primary-container" },
  workshop: { label: "WORKSHOP", className: "bg-primary-container text-on-primary-container" },
  "sponsor-slot": { label: "SPONSOR", className: "bg-surface-container-highest text-on-surface border border-outline-variant" },
  break: null,
  ceremony: null,
};

export default function SessionCard({ session, stageLabel, variant = "column" }: SessionCardProps) {
  const isLive = session.status === "live";
  const isPast = session.status === "past";
  const isBreak = session.category === "break" || session.category === "ceremony";

  const chip = CATEGORY_CHIP[session.category];
  const speakerLine = session.speakerName
    ? session.speakerOrg
      ? `${session.speakerName} — ${session.speakerOrg}`
      : session.speakerName
    : session.speakerOrg;

  const hasLongDescription = (session.description?.length ?? 0) > 120;

  const rootClasses = [
    "relative h-full px-5 py-5 md:px-6 md:py-6 flex flex-col gap-3 transition-colors duration-200",
    isLive
      ? "bg-surface-container-low animate-border-breathe border-2 border-secondary"
      : isBreak
        ? "bg-surface-container-highest"
        : "bg-surface hover:bg-surface-container-high border-2 border-transparent hover:border-primary/20",
    isPast ? "opacity-40" : "",
    variant === "wide" ? "md:text-center md:items-center" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClasses}>
      {/* Top meta row: live chip + category + stage short-label */}
      <div className={`flex flex-wrap items-center gap-2 ${variant === "wide" ? "md:justify-center" : ""}`}>
        {isLive && (
          <span
            className="mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest bg-secondary text-on-secondary animate-live-glow"
            aria-live="polite"
          >
            AHORA
          </span>
        )}
        {chip && (
          <span className={`mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest ${chip.className}`}>
            {chip.label}
          </span>
        )}
        {stageLabel && !isBreak && (
          <span className="mono-data text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest bg-primary/10 text-primary">
            {stageLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={`font-display font-black uppercase tracking-tighter leading-tight text-primary ${
          isBreak ? "text-lg md:text-xl" : "text-xl md:text-2xl"
        }`}
      >
        {session.title}
      </h3>

      {/* Speaker */}
      {speakerLine && (
        <p
          className={`mono-data text-[11px] uppercase tracking-widest font-bold ${
            isBreak ? "text-on-surface-variant" : "text-secondary"
          }`}
        >
          {speakerLine}
        </p>
      )}

      {/* Description — collapsible if long */}
      {session.description && (
        hasLongDescription ? (
          <details className="group mt-auto">
            <summary className="cursor-pointer list-none text-sm leading-snug text-on-surface-variant line-clamp-2 group-open:line-clamp-none">
              {session.description}
            </summary>
          </details>
        ) : (
          <p className="mt-auto text-sm leading-snug text-on-surface-variant">
            {session.description}
          </p>
        )
      )}
    </article>
  );
}
