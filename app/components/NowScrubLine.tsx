import { VENUE } from "../data/venue";

type NowScrubLineProps = {
  now: Date;
  // Controls the label: "before" shows a pre-event hint, "during" shows
  // the live time, "after" shows a completion marker.
  phase: "before" | "during" | "after";
};

function formatEventClock(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: VENUE.timezoneName,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("hour")}:${get("minute")}`;
}

// The "now" marker sliced into the chronological list. It functions as the
// scrub head on a timeline: past rows sit above, upcoming rows sit below.
// Visually: a crimson rule across the full list width with a mono label
// anchored to the rail-node column.
export default function NowScrubLine({ now, phase }: NowScrubLineProps) {
  const clock = formatEventClock(now);
  const label =
    phase === "before"
      ? `AÚN NO · HOY ABRE 08:00`
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
          className="mono-data text-[10px] sm:text-xs uppercase font-bold tracking-widest bg-secondary text-on-secondary px-3 py-1 animate-live-glow"
        >
          {label}
        </span>
      </div>
    </div>
  );
}
