import Link from "next/link";
import { formatCountdown } from "../data/sessions";
import type { Session } from "../data/types";
import { agendaHrefForStage } from "../data/venue";
import Icon from "./Icon";
import StageBadge from "./StageBadge";

type AgendaPreviewRowProps = {
  session: Session;
  // If provided and > 0, a "en 12m" countdown chip renders on the right.
  countdownMinutes?: number | null;
  // Clamp long titles to 2 lines (used on the denser BEFORE rail where
  // up to 8 rows share the same vertical budget).
  clampTitle?: boolean;
  staggerClass?: string;
};

// Shared row for the hero-adjacent agenda rails (BEFORE: AGENDA DEL DÍA,
// DURING: A CONTINUACIÓN). Single element so the departure-board vocabulary
// stays in lockstep across phases: time · stage badge · title · crimson
// hover slide · reveal arrow.
export default function AgendaPreviewRow({
  session,
  countdownMinutes,
  clampTitle,
  staggerClass,
}: AgendaPreviewRowProps) {
  const showCountdown =
    typeof countdownMinutes === "number" && countdownMinutes > 0;

  return (
    <Link
      href={agendaHrefForStage(session.stage)}
      aria-label={`Ver en agenda: ${session.title}`}
      className={`group relative block py-3 border-b border-primary/10 border-l-[3px] border-l-transparent pl-4 -ml-4 hover:border-l-secondary hover:translate-x-1 transition-all duration-200 cursor-pointer animate-fade-up ${staggerClass ?? ""}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <span className="mono-data text-sm font-black text-primary tabular-nums">
            {session.startTime}
          </span>
          <StageBadge stage={session.stage} />
        </div>
        {showCountdown && (
          <span className="mono-data text-[10px] uppercase tracking-wider font-bold text-secondary shrink-0">
            {formatCountdown(countdownMinutes)}
          </span>
        )}
      </div>
      <h4
        className={`font-display font-bold text-sm uppercase leading-snug text-primary group-hover:text-secondary transition-colors duration-200 ${clampTitle ? "line-clamp-2" : ""}`}
      >
        {session.title}
      </h4>
      <Icon
        name="north_east"
        size={14}
        className="absolute top-3 right-0 text-primary/0 group-hover:text-secondary transition-colors duration-200"
      />
    </Link>
  );
}
