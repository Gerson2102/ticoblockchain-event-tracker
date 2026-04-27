// Sponsors directory for TicoBlockchain 2026. Tier order drives the
// sponsors page render order (highest → lowest). Logo URLs are sourced
// from the official ticoblockchain.cr Webflow CDN.

export type SponsorTier =
  | "diamante"
  | "oro"
  | "plata"
  | "startup"
  | "comunidad"
  | "aliados";

export type Sponsor = {
  id: string;
  name: string;
  tier: SponsorTier;
  logoUrl: string;
  // Session IDs this sponsor participates in. Powers the
  // "Qué hace en TBC2026" line under each logo on the sponsors page.
  sessionIds?: readonly string[];
  // Optional one-line description shown when the sponsor has no explicit
  // session (community/institutional partners). Kept short — under 90 chars.
  contribution?: string;
};

export const TIER_ORDER: readonly SponsorTier[] = [
  "diamante",
  "oro",
  "plata",
  "startup",
  "comunidad",
  "aliados",
] as const;

// Editorial copy for each tier:
// - `caption`  → the partner-class line beneath the label
// - `intro`    → the editorial sentence shown beside the label, framing the
//                tier's role at the event in plain Spanish
export const TIER_LABELS: Record<
  SponsorTier,
  { index: string; label: string; caption: string; intro: string }
> = {
  diamante: {
    index: "01",
    label: "Diamante",
    caption: "Main Partners",
    intro:
      "Patrocinador principal global. Abre la jornada con un keynote en ambos escenarios.",
  },
  oro: {
    index: "02",
    label: "Oro",
    caption: "Strategic Partners",
    intro:
      "Socios estratégicos del programa. Cada uno con un slot dedicado en el escenario principal o en paralelo.",
  },
  plata: {
    index: "03",
    label: "Plata",
    caption: "Premium Partners",
    intro:
      "Patrocinadores premium con activaciones y talleres durante la tarde.",
  },
  startup: {
    index: "04",
    label: "Startup",
    caption: "Innovation Partners",
    intro:
      "Empresas emergentes del ecosistema. Activan experiencias y patrocinan momentos clave del día.",
  },
  comunidad: {
    index: "05",
    label: "Comunidad",
    caption: "Community Partners",
    intro:
      "Comunidades locales que sostienen el ecosistema cripto en Costa Rica durante todo el año.",
  },
  aliados: {
    index: "06",
    label: "Aliados",
    caption: "Institutional Partners",
    intro:
      "Aliados institucionales y de medios que amplifican el evento más allá de San José.",
  },
};

const CDN = "https://cdn.prod.website-files.com/6744c862a5d9324c919d6b4d";

export const SPONSORS: readonly Sponsor[] = [
  // Diamante
  {
    id: "visa",
    name: "Visa",
    tier: "diamante",
    logoUrl: `${CDN}/67472b3f2c4db80f6212e02a_visa.svg`,
    sessionIds: ["keynote-1-visa"],
  },

  // Oro
  {
    id: "wink",
    name: "Wink (con respaldo de Coopenae)",
    tier: "oro",
    logoUrl: `${CDN}/6761ae70ab15b4ac09e07fdd_Wink%20con%20respaldo%20de%20Coopenae%20logo%202023%20color.png`,
    sessionIds: ["wink-main"],
  },
  {
    id: "nimiq",
    name: "Nimiq",
    tier: "oro",
    logoUrl: `${CDN}/69ac3b667ecc54f87f16d28e_nimiq_logo_cmyk_horizontal.jpg`,
    sessionIds: ["nimiq-esc2"],
  },

  // Plata
  {
    id: "lulubit",
    name: "Lulubit (EBI)",
    tier: "plata",
    logoUrl: `${CDN}/69655c7e03af5324e759fc41_EBI_Lulubit_B1.png`,
    sessionIds: ["lulubit-esc2"],
  },
  {
    id: "iitos",
    name: "iiTOS",
    tier: "plata",
    logoUrl: `${CDN}/67471865139af06249c86686_iiTOS_Icons%2002A-29.png`,
    contribution: "Patrocinador premium del programa principal.",
  },

  // Startup
  {
    id: "world",
    name: "World",
    tier: "startup",
    logoUrl: `${CDN}/69ac3d4e630297bd10d2c85e_%5BWorld%5D%20Logo-black%202.png`,
    contribution: "Activación en zona de networking durante todo el día.",
  },
  {
    id: "onvo",
    name: "ONVO",
    tier: "startup",
    logoUrl: `${CDN}/69ac3cef1f9143b6cf3cc109_LOGO%20ONVO.png`,
    contribution: "Activación en zona de networking durante todo el día.",
  },
  {
    id: "cofiblocks",
    name: "Cofiblocks",
    tier: "startup",
    logoUrl: `${CDN}/69ac3db62afbcb6cf7c82a39_Cofiblocks_Logo_s_borda.png`,
    sessionIds: ["coffee-break-am", "coffee-break"],
    contribution: "Patrocinador oficial de los coffee breaks.",
  },

  // Comunidad
  {
    id: "ethereum-cr",
    name: "Ethereum Costa Rica",
    tier: "comunidad",
    logoUrl: `${CDN}/67c8a3c0986bc3212e55d24b_Vector.png`,
    contribution:
      "Comunidad local que organiza meetups y workshops de Ethereum en Costa Rica.",
  },
  {
    id: "refi-cr",
    name: "ReFi Costa Rica",
    tier: "comunidad",
    logoUrl: `${CDN}/67c8a3d76914a3755a1b51db_reficr-transparente-fondo-claro.png`,
    contribution:
      "Movimiento local de finanzas regenerativas y soluciones climáticas on-chain.",
  },
  {
    id: "techebe",
    name: "TechEbe",
    tier: "comunidad",
    logoUrl: `${CDN}/69c54b85be71460db9cd81c9_Black%20Oranye%20Archetype%20Inspired%20Logo%20(1).png`,
    contribution: "Comunidad de desarrolladores y creadores tecnológicos.",
  },

  // Aliados
  {
    id: "lnet",
    name: "LNet",
    tier: "aliados",
    logoUrl: `${CDN}/69ac3f68a3d0a89362e42e04_lnet.png`,
    contribution:
      "Aliado regional — credenciales verificables y Web3 para agronegocios.",
  },
  {
    id: "hallos",
    name: "Hallos",
    tier: "aliados",
    logoUrl: `${CDN}/67a75b3f8007474127fe7156_Hallos.svg`,
    contribution: "Aliado institucional del evento.",
  },
] as const;

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return SPONSORS.filter((s) => s.tier === tier);
}
