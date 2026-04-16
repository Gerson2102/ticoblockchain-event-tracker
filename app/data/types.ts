// Shared data types for sessions, speakers, and event content.
// Used by home, agenda, and exponentes pages.

export type SessionStatus = "past" | "live" | "next" | "scheduled";

// TicoBlockchain 2026 runs two parallel tracks. "both" is used for
// ceremonies and breaks that span the whole venue.
export type Stage = "main" | "escenario-2" | "both";

export type SessionCategory =
  | "keynote"
  | "sponsor-slot" // sponsor-paid showcase slot
  | "workshop" // Gold tier
  | "panel" // Silver tier
  | "pitch" // Startup Pitch Session
  | "break" // Registro, Coffee Break
  | "ceremony"; // Apertura, Cierre, Coctel

export type Session = {
  id: string;
  time: string; // display: "09:10 — 09:55"
  startTime: string; // 24h "HH:mm" sort key
  title: string;
  speakerName?: string;
  speakerOrg?: string;
  description?: string; // topic detail / panelist roster
  stage: Stage;
  category: SessionCategory;
  status: SessionStatus;
};

export type Speaker = {
  id: string;
  name: string;
  org: string;
  talk: string;
  time: string;
  stage: Exclude<Stage, "both">;
  status: SessionStatus;
  imageUrl: string;
  // Render the portrait in grayscale until hovered. Used when an official
  // portrait is stylistically mismatched and would break the editorial tone.
  monochrome?: boolean;
};

export type PracticalInfoItem = {
  id: string;
  icon: import("../components/Icon").IconName;
  title: string;
  detail: string;
};

export type VenueDirections = {
  name: string;
  address: string;
  distances: readonly string[];
  transport: readonly string[];
  mapsEmbedUrl: string;
  mapsUrl: string;
  wazeUrl: string;
};
