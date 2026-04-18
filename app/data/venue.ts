// Single source of truth for the event venue and stages.
// The 2026 edition happens at Hotel Barceló San José with two parallel tracks.

import type { Stage } from "./types";

export const VENUE = {
  name: "Hotel Barceló San José",
  fullName: "Hotel Barceló San José Palacio",
  address: "Robledal de La Uruca, San José 1150, Costa Rica",
  eventDate: "14 MAYO 2026",
  eventDateISO: "2026-05-14",
  timezone: "GMT-6",
  timezoneName: "America/Costa_Rica",
  mapsUrl: "https://www.google.com/maps/place/Barcel%C3%B3+San+Jos%C3%A9/",
  wazeUrl: "https://www.waze.com/ul?q=Hotel%20Barcel%C3%B3%20San%20Jos%C3%A9",
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

// Deep link into the agenda, scoped to the session's stage when applicable.
// "both"-stage sessions (ceremonies, breaks) land on the unfiltered agenda.
export function agendaHrefForStage(stage: Stage): string {
  if (stage === "escenario-2") return "/agenda?stage=escenario-2";
  if (stage === "main") return "/agenda?stage=main";
  return "/agenda";
}
