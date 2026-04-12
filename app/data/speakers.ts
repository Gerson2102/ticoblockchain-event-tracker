import type { Speaker } from "./types";

// Confirmed speakers for TicoBlockchain 2026 — 24 MAYO.
// Ordered by next appearance. Exactly one is "live" at a time.
//
// Portrait URLs are pulled from the official ticoblockchain.cr site
// (cdn.prod.website-files.com). Whitelisted in next.config.ts.

const CDN = "https://cdn.prod.website-files.com/6744c862a5d9324c919d6b4d";

// Official portraits — one per confirmed speaker on ticoblockchain.cr
const IMG_DANIEL_CALDERON = `${CDN}/67d6c61eee11dca78ec6021b_Screenshot2.avif`;
const IMG_DIEGO_LOAIZA = `${CDN}/67d6c54fe994495169f9271e_Diego%20Loaiza%20Centeno%202.avif`;
const IMG_KARLA_CORDOBA = `${CDN}/675c37edeca90d4c739eee46_KarlaC_JTS-22%20(p).avif`;
const IMG_ROGELIO_MARTINEZ = `${CDN}/69b1647566e862a48f42e86e_rogelio%20martinez.jpg`;
const IMG_JADDY_FERNANDEZ = `${CDN}/69b164ddcdb2ae14a989d05a_Jaddy%20Fernandez.jpg`;
const IMG_STEPHANIE_SANCHEZ = `${CDN}/67dd4ba9bd7e331b594ea0bf_Screenshot4.avif`;
const IMG_JOSE_MIGUEL_ZAMORA = `${CDN}/675c3780bd959b632317034d_jose%20miguel%20zamora.avif`;
const IMG_RANDALL_BARQUERO = `${CDN}/67d029a93702b2c591a8ce34_Randall%20Barquero%202025.avif`;
const IMG_ROBERTO_PONCE = `${CDN}/69b165f3ed6981db28554231_roberto%20ponce%20romay.jpg`;
const IMG_CARLOS_RENE = `${CDN}/69adda1a8b7cb04006a35843_Carlos.png`;
const IMG_ANDY_GUZMAN = `${CDN}/69b1632ad8361e61e604f16a_Andy%20Guzman.jpeg`;
const IMG_JORGE_MORA = `${CDN}/69b166db6b3cda83debb0b55_jorge%20mora%20flores.jpg`;

// Speakers without a real portrait on the official site — official site
// uses a generic placeholder for these as well.
const IMG_TBA = `${CDN}/67e29d86c819abd198b2e8cc_Screenshot%20(25).avif`;

export const SPEAKERS: readonly Speaker[] = [
  {
    id: "daniel-calderon",
    name: "Daniel Calderón",
    org: "VISA — Gerente Desarrollo Negocios · Centroamérica y Caribe",
    talk: "Keynote 1 — VISA: El futuro de los pagos digitales",
    time: "09:10 — 09:55",
    stage: "main",
    status: "past",
    imageUrl: IMG_DANIEL_CALDERON,
  },
  {
    id: "diego-loaiza-centeno",
    name: "Diego Loaiza Centeno",
    org: "CEO @ Wink",
    talk: "Mitos y Realidades de la Inclusión Financiera",
    time: "10:00 — 10:25",
    stage: "main",
    status: "live",
    imageUrl: IMG_DIEGO_LOAIZA,
  },
  {
    id: "karla-cordoba-brenes",
    name: "Karla Córdoba Brenes",
    org: "Presidenta @ AsoBlockchain",
    talk: "Finanzas Regenerativas y RWA",
    time: "10:30 — 10:55",
    stage: "main",
    status: "next",
    imageUrl: IMG_KARLA_CORDOBA,
  },
  {
    id: "rogelio-martinez",
    name: "Rogelio Martínez",
    org: "Inversor Ángel · Fundador @ BlockchainGuard",
    talk: "Inversión en Startups",
    time: "10:30 — 10:55",
    stage: "main",
    status: "next",
    imageUrl: IMG_ROGELIO_MARTINEZ,
  },
  {
    id: "jaddy-fernandez",
    name: "Jaddy Fernández",
    org: "Alianzas Estratégicas @ LNET Global (Perú)",
    talk: "Web3 y Agronegocios — Credenciales Verificables",
    time: "11:00 — 11:35",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: IMG_JADDY_FERNANDEZ,
  },
  {
    id: "franz-tunez",
    name: "Franz Tuñez",
    org: "Prospera (Argentina)",
    talk: "Payers District en Prospera",
    time: "12:10 — 12:30",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
  },
  {
    id: "stephanie-sanchez",
    name: "Stephanie Sánchez",
    org: "Miss Crypto Lawyer · Embajadora Oficial TicoBlockchain",
    talk: "Keynote 2 — Identidad Para Siempre",
    time: "12:35 — 13:10",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_STEPHANIE_SANCHEZ,
  },
  {
    id: "jose-miguel-zamora",
    name: "José Miguel Zamora Barquero",
    org: "Presidente @ AsoFintech",
    talk: "Regulación e Integración Regional (Panel FIA)",
    time: "13:15 — 13:35",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_JOSE_MIGUEL_ZAMORA,
  },
  {
    id: "randall-barquero",
    name: "Randall Barquero",
    org: "Socio @ Consortium Legal · JD AsoFintech",
    talk: "Regulación Fintech — Actualidad y Perspectivas (Panel FIA)",
    time: "13:15 — 13:35",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_RANDALL_BARQUERO,
    monochrome: true,
  },
  {
    id: "roberto-grella",
    name: "Roberto Grella",
    org: "Fintech Uruguay",
    talk: "Ecosistema Fintech Regional (Pagos y Stablecoins)",
    time: "15:10 — 15:45",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
  },
  {
    id: "steven-cabrera",
    name: "Steven Cabrera",
    org: "Fundador @ Epark",
    talk: "Fintech for Good (Pagos y Stablecoins)",
    time: "15:10 — 15:45",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_TBA,
  },
  {
    id: "roberto-ponce-romay",
    name: "Roberto Ponce Romay",
    org: "Managing Director @ Invermaster Ventures",
    talk: "Agentes Autónomos en Cripto",
    time: "15:50 — 16:20",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_ROBERTO_PONCE,
  },
  {
    id: "carlos-rene",
    name: "Carlos René",
    org: "CEO & Founder @ DESA",
    talk: "AI en Cripto",
    time: "15:50 — 16:20",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_CARLOS_RENE,
  },
  {
    id: "andy-guzman-toledo",
    name: "Andy Guzmán Toledo",
    org: "Head of Privacy @ Ethereum Foundation",
    talk: "Privacidad en Blockchains Públicas",
    time: "15:50 — 16:20",
    stage: "escenario-2",
    status: "scheduled",
    imageUrl: IMG_ANDY_GUZMAN,
  },
  {
    id: "jorge-mora-flores",
    name: "Jorge Mora Flores",
    org: "Consultor @ BID",
    talk: "Ciberseguridad y Transformación Digital",
    time: "Por anunciar",
    stage: "main",
    status: "scheduled",
    imageUrl: IMG_JORGE_MORA,
  },
] as const;
