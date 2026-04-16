import type { PracticalInfoItem, VenueDirections } from "./types";

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

// Practical info cards for attendees — replaces the old bento grid.
export const PRACTICAL_INFO: readonly PracticalInfoItem[] = [
  {
    id: "checkin",
    icon: "how_to_reg",
    title: "CHECK-IN: 07:30",
    detail:
      "Presenta tu QR de confirmación en la entrada principal para recibir tu gafete oficial y kit de bienvenida.",
  },
  {
    id: "wifi",
    icon: "sensors",
    title: "RED: TICOBLOCKCHAIN",
    detail:
      "Conectividad simétrica de alta velocidad. La contraseña de acceso se encuentra impresa al reverso de tu gafete.",
  },
  {
    id: "parking",
    icon: "location_on",
    title: "PARQUEO DISPONIBLE",
    detail:
      "Estacionamiento gratuito y vigilado en las instalaciones del hotel para todos los asistentes registrados.",
  },
  {
    id: "lunch",
    icon: "restaurant",
    title: "DOS TURNOS CON TIQUETE",
    detail:
      "Turno 1: 11:00 · Turno 2: 12:30. Revisa el color de tu tiquete para confirmar tu horario de almuerzo.",
  },
  {
    id: "dresscode",
    icon: "campaign",
    title: "CASUAL / SMART CASUAL",
    detail:
      "Sin requisitos formales. Sugerimos vestimenta cómoda para facilitar el networking y las sesiones largas.",
  },
  {
    id: "contact",
    icon: "storefront",
    title: "ORGANIZACIÓN",
    detail:
      "Soporte en tiempo real vía WhatsApp: +506 XXXX-XXXX para cualquier consulta técnica o logística durante el día.",
  },
] as const;

// Venue directions — replaces the old newsletter section.
export const VENUE_DIRECTIONS: VenueDirections = {
  name: "Hotel Barceló San José Palacio",
  address: "Robledal de La Uruca, San José 1150, Costa Rica",
  distances: [
    "13 km del Aeropuerto Juan Santamaría",
    "5 km del centro de San José",
  ],
  transport: [
    "Uber / DiDi — ~15 min desde el aeropuerto",
    "Taxi oficial disponible en el aeropuerto",
    "Estacionamiento gratuito en el hotel",
  ],
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Hotel+Barcelo+San+Jose+Costa+Rica&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsUrl: "https://www.google.com/maps/place/Barcel%C3%B3+San+Jos%C3%A9/",
  wazeUrl: "https://www.waze.com/ul?q=Hotel%20Barcel%C3%B3%20San%20Jos%C3%A9",
} as const;
