import type { SessionStatus } from "../data/types";

type StatusBadgeProps = {
  status: SessionStatus;
  size?: "sm" | "md";
  // When provided on a `next` status, renders "SIGUIENTE · EN N MIN" so
  // the departure-board row telegraphs exactly how soon the talk starts.
  countdownMinutes?: number;
};

const LABELS: Record<SessionStatus, string> = {
  live: "EN VIVO",
  next: "SIGUIENTE",
  scheduled: "PROGRAMADO",
  past: "FINALIZADO",
};

function formatCountdownLabel(minutes: number): string {
  if (minutes < 60) return `EN ${minutes} MIN`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `EN ${h} H` : `EN ${h} H ${m} MIN`;
}

export default function StatusBadge({
  status,
  size = "md",
  countdownMinutes,
}: StatusBadgeProps) {
  const padding = size === "sm" ? "px-2 py-0.5" : "px-3 py-1";
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  if (status === "live") {
    return (
      <span
        className={`bg-secondary text-on-secondary mono-data ${textSize} ${padding} font-bold uppercase animate-live-glow`}
      >
        {LABELS.live}
      </span>
    );
  }
  if (status === "next") {
    const label =
      typeof countdownMinutes === "number" && countdownMinutes > 0
        ? `${LABELS.next} · ${formatCountdownLabel(countdownMinutes)}`
        : LABELS.next;
    return (
      <span
        className={`bg-primary text-on-primary mono-data ${textSize} ${padding} font-bold uppercase`}
      >
        {label}
      </span>
    );
  }
  if (status === "past") {
    return (
      <span
        className={`mono-data ${textSize} ${padding} font-bold uppercase text-primary/50`}
      >
        {LABELS.past}
      </span>
    );
  }
  return (
    <span
      className={`border-2 border-primary text-primary mono-data ${textSize} ${padding} font-bold uppercase`}
    >
      {LABELS.scheduled}
    </span>
  );
}
