import type { BentoHighlight } from "./types";

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

// Bento grid editorial highlights below the agenda preview.
export const BENTO_HIGHLIGHTS: readonly BentoHighlight[] = [
  {
    id: "recap-solana",
    kind: "recap",
    label: "RECAPITULACIÓN",
    title: "EL IMPACTO DE SOLANA EN LA REGIÓN",
    body: "Lee la transcripción completa de la charla inaugural de esta mañana.",
  },
  {
    id: "gallery",
    kind: "gallery",
    label: "GALERÍA LIVE",
    imageUrl: "/images/bento-gallery.webp",
    imageAlt:
      "High-energy conference hall with massive screens and professional lighting",
  },
  {
    id: "stats",
    kind: "stats",
    label: "ASISTENTES VIRTUALES",
    statValue: "+1.2K",
    statLabel: "ASISTENTES VIRTUALES",
  },
  {
    id: "location",
    kind: "location",
    label: "UBICACIÓN",
    title: "HOTEL BARCELÓ SAN JOSÉ",
  },
] as const;
