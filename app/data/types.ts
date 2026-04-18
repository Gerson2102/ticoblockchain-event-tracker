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

// Single row of the "Información Práctica" manifest. Designed around an
// editorial "data hook" (a timestamp, network name, ratio, single word)
// so the section reads like a departure-board column rather than a grid
// of identical feature cards.
export type PracticalInfoItem = {
  id: string;
  hook: string; // mono-data headline (e.g. "07:30", "TICOBLOCKCHAIN", "GRATIS")
  label: string; // short uppercase label (e.g. "Check-in", "Red · WiFi")
  body: string; // prose detail
};

// Stat-band hook for the arrival section — same editorial shape as
// PracticalInfoItem, duplicated here so the venue-directions module can
// own its own vocabulary (distances, parking, elevation) without leaking
// back into the schedule feed.
export type ArrivalStat = {
  id: string;
  hook: string;
  label: string;
  body: string;
};

export type VenueDirections = {
  name: string;
  address: string;
  // Short-form address optimized for clipboard + WhatsApp share flows.
  // Keeps the city/country but strips the hotel name so the receiver gets
  // a clean navigable string.
  shareAddress: string;
  gps: { lat: number; lng: number };
  stats: readonly ArrivalStat[];
  mapsUrl: string;
  wazeUrl: string;
  appleMapsUrl: string;
};
