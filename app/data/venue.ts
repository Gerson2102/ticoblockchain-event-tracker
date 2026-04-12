// Single source of truth for the event venue and stages.
// The 2026 edition happens at Hotel Barceló San José with two parallel tracks.

import type { Stage } from "./types";

export const VENUE = {
  name: "Hotel Barceló San José",
  eventDate: "24 MAYO 2026",
  eventDateISO: "2026-05-24",
  timezone: "GMT-6",
  timezoneName: "America/Costa_Rica",
} as const;

const STAGES = {
  main: { id: "main", label: "MAIN STAGE", short: "MAIN" },
  "escenario-2": { id: "escenario-2", label: "ESCENARIO 2", short: "ESC 2" },
} as const;

export function stageLabel(stage: Stage): string {
  if (stage === "both") return "AMBOS ESCENARIOS";
  return STAGES[stage].label;
}

export function stageShort(stage: Stage): string {
  if (stage === "both") return "AMBOS";
  return STAGES[stage].short;
}
