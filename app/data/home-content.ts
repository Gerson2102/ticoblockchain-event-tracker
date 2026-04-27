import type { PracticalInfoItem, VenueDirections } from "./types";

// Sponsor activity callout — shown as a full-width banner below the hero
// when a session that ties to an off-stage sponsor action is live. Keyed by
// session id so the page can render it for whichever matching session is
// currently "live" (works for both the main and parallel tracks).
export type SponsorCallout = {
  sponsorName: string;
  activityLabel: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
};

export const SPONSOR_CALLOUTS: Record<string, SponsorCallout> = {
  "lulubit-esc2": {
    sponsorName: "LULUBIT",
    activityLabel: "WORKSHOP · ACTIVIDAD EN VIVO",
    tagline: "Descargá la app Lulubit para iOS y Android",
    description:
      "El taller patrocinado por Lulubit está en curso. Descargá la app desde la web oficial para seguir la demo en vivo y activar tu cuenta durante la sesión.",
    ctaText: "Descargar Lulubit",
    ctaUrl: "https://www.lulubit.app/",
  },
  "coffee-break-am": {
    sponsorName: "COFIBLOCKS",
    activityLabel: "COFFEE BREAK AM · PRESENTADO POR COFIBLOCKS",
    tagline: "Café costarricense, trazabilidad on-chain",
    description:
      "El break de media mañana es cortesía de Cofiblocks. Conocé cómo conectan caficultores locales con el mundo mediante contratos en blockchain.",
    ctaText: "Visitar Cofiblocks",
    ctaUrl: "https://www.cofiblocks.com/",
  },
  "coffee-break": {
    sponsorName: "COFIBLOCKS",
    activityLabel: "COFFEE BREAK PM · PRESENTADO POR COFIBLOCKS",
    tagline: "Café costarricense, trazabilidad on-chain",
    description:
      "Segundo break del día, cortesía de Cofiblocks. Descubrí el proyecto que tokeniza el café latinoamericano para pagar directo al productor.",
    ctaText: "Visitar Cofiblocks",
    ctaUrl: "https://www.cofiblocks.com/",
  },
};

// Home page hero — the current live talk gets the most editorial weight.
// Driven by the live session in app/data/sessions.ts.
export const HERO_CONTENT = {
  liveLabel: "EN VIVO · MAIN STAGE",
  parallelLabel: "EN PARALELO · ESCENARIO 2",
  heroImageUrl: "/images/hero-blockchain.webp",
  heroImageAlt:
    "Abstract representation of blockchain data nodes and neural networks in deep blue tones",
  sidebarImageUrl: "/images/sidebar-networking.webp",
  sidebarImageAlt:
    "Conference networking area with modern furniture and high-tech displays",
  capacityLabel: "ESTADO ACTUAL DEL EVENTO: 85% CAPACIDAD",
} as const;

// "Información Práctica" manifest. Each item has a mono-data hook that
// shouts from across the room — this is the departure-board treatment
// applied to attendee logistics.
export const PRACTICAL_INFO: readonly PracticalInfoItem[] = [
  {
    id: "checkin",
    hook: "07:30",
    label: "Check-in",
    body: "Presenta tu QR de confirmación en la entrada principal para recibir tu gafete oficial y kit de bienvenida.",
  },
  {
    id: "wifi",
    hook: "TicoBlockchain",
    label: "Red · WiFi",
    body: "Conectividad simétrica de alta velocidad. La contraseña de acceso está impresa al reverso de tu gafete.",
  },
  {
    id: "parking",
    hook: "Gratis",
    label: "Parqueo",
    body: "Estacionamiento gratuito y vigilado en las instalaciones del hotel para todos los asistentes registrados.",
  },
  {
    id: "lunch",
    hook: "11:00 / 12:30",
    label: "Almuerzo · Dos turnos",
    body: "Revisa el color de tu tiquete para confirmar tu horario. Servicio con tiquete incluido en tu registro.",
  },
  {
    id: "dresscode",
    hook: "Casual",
    label: "Dress code",
    body: "Sin requisitos formales. Sugerimos vestimenta cómoda para facilitar el networking y las sesiones largas.",
  },
  {
    id: "contact",
    hook: "Negro",
    label: "Staff · Soporte",
    body: "Equipo identificado con camiseta negra en lobby y ambos escenarios. Soporte logístico y técnico durante todo el día.",
  },
] as const;

// Venue directions — drives the Cómo Llegar "Arrival Dossier" section.
// Structured as editorial data hooks (stats + transport modes) rather than
// loose bullet strings so each block can render as a mono-data card with
// its own typography weight. The GPS coords fuel Waze/Apple Maps deep
// links and the "comparte con tu chofer" WhatsApp payload.
export const VENUE_DIRECTIONS: VenueDirections = {
  name: "Hotel Barceló San José Palacio",
  address: "Robledal de La Uruca, San José 1150, Costa Rica",
  shareAddress: "Hotel Barceló San José Palacio, Robledal de La Uruca, San José, Costa Rica",
  gps: { lat: 9.9454534, lng: -84.105194 },
  stats: [
    {
      id: "airport",
      hook: "13 KM",
      label: "Aeropuerto · Juan Santamaría",
      body: "Aproximadamente 15 minutos en Uber o DiDi desde la terminal internacional, según el tráfico de General Cañas.",
    },
    {
      id: "downtown",
      hook: "5 KM",
      label: "Centro · San José",
      body: "10 minutos en vehículo por la Autopista General Cañas. Ideal si te hospedás en el casco central de la capital.",
    },
    {
      id: "parking",
      hook: "GRATIS",
      label: "Parqueo · Vigilado",
      body: "Estacionamiento cubierto y vigilado del hotel incluido para todos los asistentes registrados del evento.",
    },
  ],
  mapsUrl: "https://maps.app.goo.gl/BBFHKXZaz3c9iFjw5",
  wazeUrl: "https://www.waze.com/ul?ll=9.9454534,-84.105194&navigate=yes",
  appleMapsUrl:
    "https://maps.apple.com/?q=Hotel+Barcel%C3%B3+San+Jos%C3%A9&ll=9.9454534,-84.105194",
} as const;
