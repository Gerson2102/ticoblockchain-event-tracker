import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  TIER_LABELS,
  type Sponsor,
  type SponsorTier,
} from "../../data/sponsors";
import { agendaHrefForStage } from "../../data/venue";
import { getSessionById } from "../../lib/session-time";

type SponsorRowProps = {
  sponsor: Sponsor;
  tier: Exclude<SponsorTier, "diamante">;
  delayMs: number;
};

// Tier → left-border mapping. Mirrors the editorial weight of the
// desktop tile system: Oro reads as full primary, Plata/Coctel as a
// faded primary, the lowest tiers carry a minimal hint so the row
// doesn't read as a floating logo.
const TIER_BORDERS: Record<Exclude<SponsorTier, "diamante">, string> = {
  oro: "border-primary",
  plata: "border-primary/60",
  coctel: "border-primary/60",
  startup: "border-primary/30",
  comunidad: "border-primary/30",
  aliados: "border-primary/30",
  media: "border-primary/30",
};

// Compact mobile row for non-Diamante sponsors. Structural twin of
// SpeakerRow on /exponentes: small left-aligned logo cell + flex-1
// text column with tier chip, name, and a single-line activity hook.
export default function SponsorRow({ sponsor, tier, delayMs }: SponsorRowProps) {
  return (
    <article
      className={`flex items-stretch gap-3 bg-surface-container-low border-l-4 ${TIER_BORDERS[tier]} animate-fade-up`}
      style={{ "--delay": `${delayMs}ms` } as CSSProperties}
    >
      <div className="relative w-16 h-16 shrink-0 bg-surface-container-lowest p-2 flex items-center justify-center">
        {sponsor.wordmark ? (
          <div className="font-display font-black uppercase tracking-tighter text-[9px] leading-[1] text-primary text-center">
            {sponsor.wordmark.split("\n").map((line, i, all) => (
              <span key={i}>
                {line}
                {i < all.length - 1 && <br />}
              </span>
            ))}
          </div>
        ) : sponsor.logoUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={sponsor.logoUrl}
              alt={sponsor.name}
              fill
              sizes="64px"
              className="object-contain"
              unoptimized
            />
          </div>
        ) : null}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 py-2 pr-3">
        <span className="label-meta font-bold text-primary/60">
          {TIER_LABELS[tier].label}
        </span>
        <h3 className="font-display font-black uppercase tracking-tighter text-primary text-base leading-[1.05] line-clamp-1">
          {sponsor.name}
        </h3>
        <SponsorActivitySummary sponsor={sponsor} />
      </div>
    </article>
  );
}

// One-line activity hook. Preserves the deep-link semantics of the
// desktop SponsorActivity strip — if the sponsor has sessions, the
// first one becomes a tap target into /agenda anchored to that
// session; otherwise the contribution sentence is clamped to two
// lines so the row stays compact.
function SponsorActivitySummary({ sponsor }: { sponsor: Sponsor }) {
  const sessions =
    sponsor.sessionIds
      ?.map((id) => getSessionById(id))
      .filter((s): s is NonNullable<typeof s> => s !== undefined) ?? [];

  if (sessions.length > 0) {
    const session = sessions[0];
    return (
      <Link
        href={`${agendaHrefForStage(session.stage)}#session-${session.id}`}
        className="block truncate text-xs text-primary/80 hover:text-secondary transition-colors"
      >
        <span className="mono-data text-primary/60">{session.time}</span>
        <span className="px-1">·</span>
        {session.title}
      </Link>
    );
  }

  if (sponsor.contribution) {
    return (
      <p className="text-xs text-primary/70 line-clamp-2">
        {sponsor.contribution}
        {sponsor.contributionLinkText && sponsor.contributionUrl && (
          <Link
            href={sponsor.contributionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-secondary transition-colors"
          >
            {sponsor.contributionLinkText}
          </Link>
        )}
      </p>
    );
  }

  return null;
}
