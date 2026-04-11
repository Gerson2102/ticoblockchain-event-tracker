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
};

export const TIER_ORDER: readonly SponsorTier[] = [
  "diamante",
  "oro",
  "plata",
  "startup",
  "comunidad",
  "aliados",
] as const;

// Editorial captions describe the *kind of money* a tier represents.
// They sit beneath the tier label in the hero blocks and frame each tier's
// role at the event without quoting actual sponsorship amounts.
export const TIER_LABELS: Record<
  SponsorTier,
  { index: string; label: string; caption: string }
> = {
  diamante: { index: "01", label: "Diamante", caption: "Main Partners" },
  oro: { index: "02", label: "Oro", caption: "Strategic Partners" },
  plata: { index: "03", label: "Plata", caption: "Premium Partners" },
  startup: { index: "04", label: "Startup", caption: "Innovation Partners" },
  comunidad: { index: "05", label: "Comunidad", caption: "Community Partners" },
  aliados: { index: "06", label: "Aliados", caption: "Institutional Partners" },
};

const CDN = "https://cdn.prod.website-files.com/6744c862a5d9324c919d6b4d";

export const SPONSORS: readonly Sponsor[] = [
  // Diamante
  {
    id: "visa",
    name: "Visa",
    tier: "diamante",
    logoUrl: `${CDN}/67472b3f2c4db80f6212e02a_visa.svg`,
  },

  // Oro
  {
    id: "wink",
    name: "Wink (con respaldo de Coopenae)",
    tier: "oro",
    logoUrl: `${CDN}/6761ae70ab15b4ac09e07fdd_Wink%20con%20respaldo%20de%20Coopenae%20logo%202023%20color.png`,
  },
  {
    id: "nimiq",
    name: "Nimiq",
    tier: "oro",
    logoUrl: `${CDN}/69ac3b667ecc54f87f16d28e_nimiq_logo_cmyk_horizontal.jpg`,
  },

  // Plata
  {
    id: "lulubit",
    name: "Lulubit (EBI)",
    tier: "plata",
    logoUrl: `${CDN}/69655c7e03af5324e759fc41_EBI_Lulubit_B1.png`,
  },
  {
    id: "iitos",
    name: "iiTOS",
    tier: "plata",
    logoUrl: `${CDN}/67471865139af06249c86686_iiTOS_Icons%2002A-29.png`,
  },

  // Startup
  {
    id: "world",
    name: "World",
    tier: "startup",
    logoUrl: `${CDN}/69ac3d4e630297bd10d2c85e_%5BWorld%5D%20Logo-black%202.png`,
  },
  {
    id: "onvo",
    name: "ONVO",
    tier: "startup",
    logoUrl: `${CDN}/69ac3cef1f9143b6cf3cc109_LOGO%20ONVO.png`,
  },
  {
    id: "cofiblocks",
    name: "Cofiblocks",
    tier: "startup",
    logoUrl: `${CDN}/69ac3db62afbcb6cf7c82a39_Cofiblocks_Logo_s_borda.png`,
  },

  // Comunidad
  {
    id: "ethereum-cr",
    name: "Ethereum Costa Rica",
    tier: "comunidad",
    logoUrl: `${CDN}/67c8a3c0986bc3212e55d24b_Vector.png`,
  },
  {
    id: "refi-cr",
    name: "ReFi Costa Rica",
    tier: "comunidad",
    logoUrl: `${CDN}/67c8a3d76914a3755a1b51db_reficr-transparente-fondo-claro.png`,
  },
  {
    id: "techebe",
    name: "TechEbe",
    tier: "comunidad",
    logoUrl: `${CDN}/69c54b85be71460db9cd81c9_Black%20Oranye%20Archetype%20Inspired%20Logo%20(1).png`,
  },

  // Aliados
  {
    id: "lnet",
    name: "LNet",
    tier: "aliados",
    logoUrl: `${CDN}/69ac3f68a3d0a89362e42e04_lnet.png`,
  },
  {
    id: "hallos",
    name: "Hallos",
    tier: "aliados",
    logoUrl: `${CDN}/67a75b3f8007474127fe7156_Hallos.svg`,
  },
] as const;

export function getSponsorsByTier(tier: SponsorTier): Sponsor[] {
  return SPONSORS.filter((s) => s.tier === tier);
}
