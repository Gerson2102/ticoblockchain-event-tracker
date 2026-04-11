import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  getSponsorsByTier,
  TIER_LABELS,
  TIER_ORDER,
  type Sponsor,
  type SponsorTier,
} from "../data/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Patrocinadores oficiales de TicoBlockchain 2026 — Diamante, Oro, Plata, Startup, Comunidad y Aliados.",
};

// Animation timing — every tier block fades up STAGGER_TIER_MS later than
// the previous one so the eye follows the cascade top-to-bottom. Per-logo
// offsets inside each tier are tuned at the tile component (Diamante uses a
// longer per-logo gap because it has fewer, larger tiles).
const STAGGER_TIER_MS = 80;

// Per-tier visual treatment. Diamante is the flagship and gets a clean white
// tile with a heavy primary border. The other five tiers share the white
// border-tile treatment used in Stitch's "Patrocinadores Premium" mock —
// only the digit weight, label opacity, and tile size shift as the tier
// descends. Logos always render in their real brand colors; hover lifts the
// tile and snaps the border to primary.
type TierStyle = {
  digit: string;
  label: string;
  caption: string;
  separator: string;
  containerSpacing: string;
  // Tile sizing for non-Diamante tiers; Diamante uses the bespoke
  // DiamanteTile component below and ignores these.
  tileHeight: string;
  tilePadding: string;
  tileBorder: string;
  gridCols: string;
};

const TIER_STYLES: Record<SponsorTier, TierStyle> = {
  diamante: {
    digit: "text-8xl md:text-9xl text-primary",
    label: "text-3xl md:text-4xl text-primary",
    caption: "text-secondary font-bold",
    separator: "",
    containerSpacing: "mb-24 md:mb-32",
    tileHeight: "",
    tilePadding: "",
    tileBorder: "",
    gridCols: "grid-cols-1",
  },
  oro: {
    digit: "text-6xl md:text-7xl text-primary/50",
    label: "text-2xl md:text-3xl text-primary",
    caption: "text-primary/60",
    separator: "border-b-2 border-primary pb-4",
    containerSpacing: "mb-24 md:mb-32",
    tileHeight: "h-48 md:h-52",
    tilePadding: "p-10",
    tileBorder: "border-2 border-primary/20 hover:border-primary",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  plata: {
    digit: "text-5xl md:text-6xl text-primary/40",
    label: "text-2xl md:text-3xl text-primary/80",
    caption: "text-primary/50",
    separator: "border-b-2 border-primary/40 pb-4",
    containerSpacing: "mb-24 md:mb-32",
    tileHeight: "h-44 md:h-48",
    tilePadding: "p-10",
    tileBorder: "border-2 border-primary/20 hover:border-primary",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  startup: {
    digit: "text-5xl md:text-6xl text-primary/30",
    label: "text-xl md:text-2xl text-primary/70",
    caption: "text-primary/40",
    separator: "border-b border-primary/30 pb-4",
    containerSpacing: "mb-20 md:mb-24",
    tileHeight: "h-40 md:h-44",
    tilePadding: "p-8",
    tileBorder: "border border-primary/15 hover:border-primary",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  },
  comunidad: {
    digit: "text-4xl md:text-5xl text-primary/25",
    label: "text-xl md:text-2xl text-primary/60",
    caption: "text-primary/35",
    separator: "border-b border-primary/20 pb-4",
    containerSpacing: "mb-20 md:mb-24",
    tileHeight: "h-40 md:h-44",
    tilePadding: "p-8",
    tileBorder: "border border-primary/15 hover:border-primary",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  },
  aliados: {
    digit: "text-4xl md:text-5xl text-primary/20",
    label: "text-xl md:text-2xl text-primary/50",
    caption: "text-primary/30",
    separator: "border-b border-primary/15 pb-4",
    containerSpacing: "",
    tileHeight: "h-40 md:h-44",
    tilePadding: "p-8",
    tileBorder: "border border-primary/15 hover:border-primary",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
};

export default function SponsorsPage() {
  return (
    <main id="main">
      <section className="bg-white px-4 sm:px-6 md:px-12 pt-8 md:pt-12 pb-24 md:pb-32">
        {/* ── Section heading ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-primary leading-none animate-reveal-up">
            Sponsors
          </h1>
          <div
            className="font-mono text-sm uppercase tracking-widest text-secondary border-l-4 border-secondary pl-4 animate-fade-up"
            style={{ "--delay": "200ms" } as CSSProperties}
          >
            Socios Estratégicos 2026
          </div>
        </div>

        {/* ── 6 tier blocks ─────────────────────────────────────────────── */}
        {TIER_ORDER.map((tier, tierIndex) => {
          const sponsors = getSponsorsByTier(tier);
          if (sponsors.length === 0) return null;
          return (
            <TierBlock
              key={tier}
              tier={tier}
              sponsors={sponsors}
              tierIndex={tierIndex}
            />
          );
        })}
      </section>
    </main>
  );
}

/* ─── Tier block ───────────────────────────────────────────────────────── */

type TierBlockProps = {
  tier: SponsorTier;
  sponsors: Sponsor[];
  tierIndex: number;
};

function TierBlock({ tier, sponsors, tierIndex }: TierBlockProps) {
  const styles = TIER_STYLES[tier];
  const meta = TIER_LABELS[tier];
  const isDiamante = tier === "diamante";

  return (
    <div className={styles.containerSpacing}>
      {/* Header: digit + label + caption */}
      <div
        className={`flex items-baseline gap-6 mb-8 ${styles.separator} animate-fade-up`}
        style={{ "--delay": `${tierIndex * STAGGER_TIER_MS}ms` } as CSSProperties}
      >
        <div
          className={`font-display font-black leading-none ${styles.digit}`}
        >
          {meta.index}
        </div>
        <div>
          <div
            className={`font-display font-black uppercase tracking-tighter ${styles.label}`}
          >
            {meta.label}
          </div>
          <div
            className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] ${styles.caption}`}
          >
            {meta.caption}
          </div>
        </div>
      </div>

      {/* Logo grid */}
      <div className={`grid gap-4 md:gap-6 ${styles.gridCols}`}>
        {sponsors.map((sponsor, i) =>
          isDiamante ? (
            <DiamanteTile
              key={sponsor.id}
              sponsor={sponsor}
              index={i}
              tierIndex={tierIndex}
            />
          ) : (
            <StandardTile
              key={sponsor.id}
              sponsor={sponsor}
              index={i}
              tierIndex={tierIndex}
              heightClass={styles.tileHeight}
              paddingClass={styles.tilePadding}
              borderClass={styles.tileBorder}
            />
          ),
        )}
      </div>
    </div>
  );
}

/* ─── Tile sub-components ──────────────────────────────────────────────── */

// The flagship: a clean white tile with a thick primary border. The premium
// feel comes from border weight, not from a dark frame. A small mono "Global
// Tier" badge in the top-left adds an editorial detail without competing with
// the logo. Visa renders in its real brand blue.
function DiamanteTile({
  sponsor,
  index,
  tierIndex,
}: {
  sponsor: Sponsor;
  index: number;
  tierIndex: number;
}) {
  return (
    <div
      className="relative bg-white border-4 border-primary p-10 md:p-14 group transition-all duration-300 hover:-translate-y-1 animate-fade-up"
      style={{ "--delay": `${tierIndex * STAGGER_TIER_MS + index * 120 + 100}ms` } as CSSProperties}
    >
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-primary/40 uppercase tracking-widest">
        Global Tier
      </div>

      <div className="flex items-center justify-center pt-4">
        <div className="relative w-full max-w-[360px] h-20 md:h-28 lg:h-32">
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 90vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

// All non-Diamante tiers share this tile. Logos always render in real brand
// colors. Hover snaps the border to primary, lifts the tile, and scales the
// logo — no grayscale-to-color stunt.
function StandardTile({
  sponsor,
  index,
  tierIndex,
  heightClass,
  paddingClass,
  borderClass,
}: {
  sponsor: Sponsor;
  index: number;
  tierIndex: number;
  heightClass: string;
  paddingClass: string;
  borderClass: string;
}) {
  return (
    <div
      className={`bg-white ${borderClass} ${heightClass} ${paddingClass} flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 animate-fade-up`}
      style={{
        "--delay": `${tierIndex * STAGGER_TIER_MS + index * 90 + 150}ms`,
      } as CSSProperties}
    >
      <div className="relative w-full h-full max-w-[220px]">
        <Image
          src={sponsor.logoUrl}
          alt={sponsor.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          unoptimized
        />
      </div>
    </div>
  );
}
