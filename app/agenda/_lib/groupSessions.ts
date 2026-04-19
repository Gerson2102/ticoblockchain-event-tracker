import type { Session } from "../../data/types";

// One row in the dual-track agenda. Either a `both`-stage session that
// spans both columns (ceremonies, breaks, keynotes shared across tracks)
// or a pair of stage-specific sessions (one or both sides populated).
export type TimeSlot = {
  startTime: string;
  time: string;
  both?: Session;
  main?: Session;
  escenario2?: Session;
};

export function groupByTimeSlot(sessions: readonly Session[]): TimeSlot[] {
  const map = new Map<string, TimeSlot>();
  for (const s of sessions) {
    const slot = map.get(s.startTime) ?? { startTime: s.startTime, time: s.time };
    if (s.stage === "both") slot.both = s;
    else if (s.stage === "main") slot.main = s;
    else slot.escenario2 = s;
    map.set(s.startTime, slot);
  }
  return [...map.values()].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
}
