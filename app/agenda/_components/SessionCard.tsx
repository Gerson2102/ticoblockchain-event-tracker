import { speakerLine } from "../../lib/session-time";
import type { Session, SessionCategory } from "../../data/types";

type SessionCardProps = {
  session: Session;
  stageLabel?: string;
  variant?: "column" | "wide";
};

const CATEGORY_CHIP: Record<SessionCategory, { label: string; className: string } | null> = {
  keynote: { label: "KEYNOTE", className: "bg-secondary text-on-secondary" },
  panel: { label: "PANEL", className: "bg-primary text-on-primary" },
  talk: { label: "CHARLA", className: "bg-surface-container-highest text-primary border border-primary" },
  pitch: { label: "PITCH", className: "bg-primary-container text-on-primary-container" },
  workshop: { label: "WORKSHOP", className: "bg-primary-container text-on-primary-container" },
  break: null,
  ceremony: null,
};

export default function SessionCard({ session, stageLabel, variant = "column" }: SessionCardProps) {
  const isLive = session.status === "live";
  const isPast = session.status === "past";
  const isBreak = session.category === "break" || session.category === "ceremony";

  const chip = CATEGORY_CHIP[session.category];
  const speaker = speakerLine(session);

  const hasLongDescription = (session.description?.length ?? 0) > 120;

  // Both lunch breaks render full-width (stage="both") so they show
  // regardless of the stage filter, but each retains its bracelet color
  // matching the AgendaView logistics strip — ROSA wave (11:30—12:30),
  // AZUL wave (12:30—13:30). Discriminate by id since stage is "both".
  // Other shared breaks (coffee, ceremonies) stay neutral.
  const breakBg =
    isBreak && session.id === "lunch-break-main"
      ? "bg-[#db2777]/15"
      : isBreak && session.id === "lunch-break-esc2"
        ? "bg-[#2563eb]/15"
        : "bg-surface-container-highest";

  const rootClasses = [
    "relative h-full px-5 py-5 md:px-6 md:py-6 flex flex-col gap-3 transition-colors duration-200",
    isLive
      ? "bg-surface-container-low animate-border-breathe border-2 border-secondary"
      : isBreak
        ? breakBg
        : "bg-surface hover:bg-surface-container-high border-2 border-transparent hover:border-primary/20",
    isPast ? "opacity-40" : "",
    variant === "wide" ? "md:text-center md:items-center" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article id={`session-${session.id}`} className={`scroll-mt-24 ${rootClasses}`}>
      {/* Top meta row: live chip + category + stage short-label */}
      <div className={`flex flex-wrap items-center gap-2 ${variant === "wide" ? "md:justify-center" : ""}`}>
        {isLive && (
          <span
            className="label-meta font-bold px-2 py-0.5 bg-secondary text-on-secondary animate-live-glow"
            aria-live="polite"
          >
            AHORA
          </span>
        )}
        {chip && (
          <span className={`label-meta font-bold px-2 py-0.5 ${chip.className}`}>
            {chip.label}
          </span>
        )}
        {stageLabel && !isBreak && (
          <span className="label-meta font-bold px-2 py-0.5 bg-primary/10 text-primary">
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
      {speaker && (
        <p
          className={`label-meta text-[11px] font-bold ${
            isBreak ? "text-on-surface-variant" : "text-secondary"
          }`}
        >
          {speaker}
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
