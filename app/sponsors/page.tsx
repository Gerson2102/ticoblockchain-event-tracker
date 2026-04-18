import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getSessionById } from "../data/sessions";
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
// the previous one so the eye follows the cascade top-to-bottom.
const STAGGER_TIER_MS = 80;

// Per-tier visual treatment.
//
// Design-system constraints: no gray, no shadows, no border radius. Hierarchy
// comes from (a) tonal layering of surface tokens, (b) the mass of the digit,
// and (c) tile size — never from fading text via opacity. Text colors stay at
// `text-primary` so every tier reads at AA contrast on the warm cream surface.
type TierStyle = {
  digit: string;
  label: string;
  caption: string;
  containerSpacing: string;
  // Tile sizing for non-Diamante tiers. Diamante uses the bespoke
  // DiamanteTile component below and leaves these unset.
  tileBg?: string;
  tileHeight?: string;
  tilePadding?: string;
  tileBorder?: string;
  gridCols: string;
};

const TIER_STYLES: Record<SponsorTier, TierStyle> = {
  diamante: {
    digit: "text-8xl md:text-9xl text-primary",
    label: "text-3xl md:text-4xl text-primary",
    caption: "text-secondary font-bold",
    containerSpacing: "mb-24 md:mb-32",
    gridCols: "grid-cols-1",
  },
  oro: {
    digit: "text-7xl md:text-8xl text-primary",
    label: "text-2xl md:text-3xl text-primary",
    caption: "text-primary",
    containerSpacing: "mb-20 md:mb-28",
    tileBg: "bg-surface-container-lowest",
    tileHeight: "h-48 md:h-52",
    tilePadding: "p-10",
    tileBorder: "border-2 border-primary",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  plata: {
    digit: "text-6xl md:text-7xl text-primary",
    label: "text-2xl md:text-3xl text-primary",
    caption: "text-primary",
    containerSpacing: "mb-20 md:mb-28",
    tileBg: "bg-surface-container-lowest",
    tileHeight: "h-44 md:h-48",
    tilePadding: "p-10",
    tileBorder: "border-2 border-primary/60",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
  startup: {
    digit: "text-5xl md:text-6xl text-primary",
    label: "text-xl md:text-2xl text-primary",
    caption: "text-primary",
    containerSpacing: "mb-20 md:mb-24",
    tileBg: "bg-surface-container-low",
    tileHeight: "h-40 md:h-44",
    tilePadding: "p-8",
    tileBorder: "",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  },
  comunidad: {
    digit: "text-5xl md:text-6xl text-primary",
    label: "text-xl md:text-2xl text-primary",
    caption: "text-primary",
    containerSpacing: "mb-20 md:mb-24",
    tileBg: "bg-surface-container-low",
    tileHeight: "h-40 md:h-44",
    tilePadding: "p-8",
    tileBorder: "",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  },
  aliados: {
    digit: "text-5xl md:text-6xl text-primary",
    label: "text-xl md:text-2xl text-primary",
    caption: "text-primary",
    containerSpacing: "",
    tileBg: "bg-surface-container-low",
    tileHeight: "h-40 md:h-44",
    tilePadding: "p-8",
    tileBorder: "",
    gridCols: "grid-cols-1 sm:grid-cols-2",
  },
};

export default function SponsorsPage() {
  return (
    <main id="main">
      <section className="bg-surface-container-lowest px-4 sm:px-6 md:px-12 pt-8 md:pt-12 pb-24 md:pb-32">
        {/* ── Section heading ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-tighter text-primary leading-none animate-reveal-up">
            SPONSORS
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
      {/* Header: digit + label + caption + editorial intro.
          The intro paragraph occupies the right column on desktop so the
          tier reads as a two-column editorial spread (number+name | what
          this tier means). */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 pb-6 border-b-2 border-primary animate-fade-up"
        style={{ "--delay": `${tierIndex * STAGGER_TIER_MS}ms` } as CSSProperties}
      >
        <div className="lg:col-span-5 flex items-baseline gap-6">
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
        <p className="lg:col-span-7 text-base md:text-lg text-primary/80 leading-relaxed self-end">
          {meta.intro}
        </p>
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
              bgClass={styles.tileBg ?? ""}
              heightClass={styles.tileHeight ?? ""}
              paddingClass={styles.tilePadding ?? ""}
              borderClass={styles.tileBorder ?? ""}
            />
          ),
        )}
      </div>
    </div>
  );
}

/* ─── Tile sub-components ──────────────────────────────────────────────── */

// The flagship: a clean white tile with a thick primary border and an
// activity strip below. The premium feel comes from border weight and
// the inverted activity rail, not from a dark frame.
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
      className="animate-fade-up"
      style={{ "--delay": `${tierIndex * STAGGER_TIER_MS + index * 120 + 100}ms` } as CSSProperties}
    >
      <div className="relative bg-surface-container-lowest border-4 border-primary p-10 md:p-14">
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
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
      <SponsorActivity sponsor={sponsor} variant="diamante" />
    </div>
  );
}

// All non-Diamante tiers share this tile.
function StandardTile({
  sponsor,
  index,
  tierIndex,
  bgClass,
  heightClass,
  paddingClass,
  borderClass,
}: {
  sponsor: Sponsor;
  index: number;
  tierIndex: number;
  bgClass: string;
  heightClass: string;
  paddingClass: string;
  borderClass: string;
}) {
  return (
    <div
      className="animate-fade-up"
      style={{
        "--delay": `${tierIndex * STAGGER_TIER_MS + index * 90 + 150}ms`,
      } as CSSProperties}
    >
      <div
        className={`${bgClass} ${borderClass} ${heightClass} ${paddingClass} flex items-center justify-center transition-colors duration-300`}
      >
        <div className="relative w-full h-full max-w-[220px]">
          <Image
            src={sponsor.logoUrl}
            alt={sponsor.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
      <SponsorActivity sponsor={sponsor} variant="standard" />
    </div>
  );
}

/* ─── Activity line ────────────────────────────────────────────────────── */

// Renders "what this sponsor is doing at TBC2026" beneath the logo tile.
// If the sponsor has session IDs, each session becomes a deep link to the
// agenda page filtered to that stage. Otherwise we fall back to the static
// `contribution` string. Sponsors with neither render nothing (rare).
function SponsorActivity({
  sponsor,
  variant,
}: {
  sponsor: Sponsor;
  variant: "diamante" | "standard";
}) {
  const sessions =
    sponsor.sessionIds
      ?.map((id) => getSessionById(id))
      .filter((s): s is NonNullable<typeof s> => s !== undefined) ?? [];

  if (sessions.length === 0 && !sponsor.contribution) return null;

  // Diamante gets a wider, more emphatic activity bar that mirrors the tile
  // border weight. Standard tier sits in a low-tone surface block.
  const wrapperClass =
    variant === "diamante"
      ? "mt-0 bg-primary text-on-primary p-6 md:p-8"
      : "mt-0 bg-surface-container-high p-4 md:p-5 border-l-4 border-primary";

  return (
    <div className={wrapperClass}>
      <div
        className={`font-mono text-[10px] uppercase tracking-[0.3em] mb-2 ${
          variant === "diamante" ? "text-on-primary/70" : "text-primary/60"
        }`}
      >
        Qué hace en TBC2026
      </div>

      {sessions.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {sessions.map((session) => {
            const stageQuery =
              session.stage === "main"
                ? "?stage=main"
                : session.stage === "escenario-2"
                  ? "?stage=escenario-2"
                  : "";
            const stageLabel =
              session.stage === "main"
                ? "MAIN"
                : session.stage === "escenario-2"
                  ? "ESC 2"
                  : "AMBOS";
            return (
              <li key={session.id}>
                <Link
                  href={`/agenda${stageQuery}#${session.id}`}
                  className={`group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 ${
                    variant === "diamante"
                      ? "hover:text-secondary-fixed-dim"
                      : "hover:text-secondary"
                  } transition-colors`}
                >
                  <span className="font-mono text-xs sm:text-sm whitespace-nowrap">
                    {session.time} · {stageLabel}
                  </span>
                  <span
                    className={`font-display font-bold text-base sm:text-lg leading-tight ${
                      variant === "diamante"
                        ? ""
                        : "text-primary group-hover:text-secondary"
                    }`}
                  >
                    {session.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p
          className={`text-sm leading-snug ${
            variant === "diamante" ? "text-on-primary" : "text-primary/80"
          }`}
        >
          {sponsor.contribution}
        </p>
      )}
    </div>
  );
}

