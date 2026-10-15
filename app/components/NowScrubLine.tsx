import { EVENT_START_HHMM, getEventLocalDateTime } from "../lib/session-time";

type NowScrubLineProps = {
  now: Date;
  // Controls the label: "before" shows a pre-event hint, "during" shows
  // the live time, "after" shows a completion marker.
  phase: "before" | "during" | "after";
};

// The "now" marker sliced into the chronological list. It functions as the
// scrub head on a timeline: past rows sit above, upcoming rows sit below.
// Visually: a crimson rule across the full list width with a mono label
// anchored to the rail-node column.
export default function NowScrubLine({ now, phase }: NowScrubLineProps) {
  const clock = getEventLocalDateTime(now).hhmm;
  const label =
    phase === "before"
      ? `AÚN NO · HOY ABRE ${EVENT_START_HHMM}`
      : phase === "after"
        ? `FIN DE JORNADA · ${clock}`
        : `AHORA · ${clock}`;

  return (
    <div
      className="relative py-4 animate-fade-up"
      role="separator"
      aria-label={`Momento actual del evento: ${label}`}
    >
      <div
        className="absolute inset-x-0 top-1/2 h-[2px] bg-secondary"
        aria-hidden="true"
      />
      <div className="relative flex items-center">
        <span
          className="label-meta sm:text-xs font-bold bg-secondary text-on-secondary px-3 py-1 animate-live-glow"
        >
          {label}
        </span>
      </div>
    </div>
  );
}
