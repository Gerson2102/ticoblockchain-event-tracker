import type { Session } from "../data/types";
import StageBadge from "./StageBadge";
import StatusBadge from "./StatusBadge";

type DepartureRowProps = {
  session: Session;
  staggerClass?: string;
};

// Departure-board style row for the home page agenda preview.
// 12-col grid: time | stage badge | title | status.
export default function DepartureRow({
  session,
  staggerClass,
}: DepartureRowProps) {
  const isLive = session.status === "live";
  const isPast = session.status === "past";

  const rowClasses = [
    "grid grid-cols-1 md:grid-cols-12 py-8 items-center border-b border-primary/10 gap-2 md:gap-0 animate-fade-up",
    isLive
      ? "bg-surface-container-high"
      : "hover:bg-surface-container-high transition-colors duration-200 group",
    isPast ? "opacity-40" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const timeClasses = [
    "md:col-span-2 mono-data text-2xl font-bold tracking-tighter",
    isLive
      ? "text-secondary"
      : "text-primary/40 group-hover:text-primary transition-colors duration-200",
  ].join(" ");

  const titleClasses = [
    "text-lg sm:text-2xl font-display font-bold uppercase leading-tight",
    isLive
      ? "text-primary font-black italic underline underline-offset-8 decoration-secondary decoration-4"
      : "group-hover:translate-x-2 transition-transform duration-300 text-primary",
  ].join(" ");

  return (
    <div className={rowClasses}>
      <div className={timeClasses}>
        {isLive ? "AHORA" : session.startTime}
      </div>
      <div className="md:col-span-2">
        <StageBadge stage={session.stage} size="md" />
      </div>
      <div className="md:col-span-6">
        <h5 className={titleClasses}>{session.title}</h5>
      </div>
      <div className="md:col-span-2 text-left md:text-right">
        <StatusBadge status={session.status} />
      </div>
    </div>
  );
}
