import Image from "next/image";
import type { Speaker } from "../../data/types";
import { stageLabel, stageShort } from "../../data/venue";
import StatusBadge from "../../components/StatusBadge";
import Icon from "../../components/Icon";
import { isHttpUrl } from "../../lib/url";
import type { SpeakerAppearance } from "../_lib/groupSpeakers";
import PanelChip from "./PanelChip";

type SpeakerCardProps = {
  appearance: SpeakerAppearance;
  staggerClass?: string;
  // Mark above-the-fold cards so the first portrait paints with eager
  // loading + fetchpriority=high — fixes the LCP miss on /exponentes.
  priority?: boolean;
};

function ExternalLinkChip({
  href,
  label,
  speakerName,
  variant = "card",
}: {
  href: string;
  label: string;
  speakerName: string;
  variant?: "card" | "inline";
}) {
  const className =
    variant === "card"
      ? "border-2 border-primary/30 text-primary px-2 py-1 label-meta font-bold inline-flex items-center gap-1.5 hover:bg-primary hover:text-on-primary hover:border-primary transition-colors duration-200"
      : "label-meta text-[9px] font-bold text-on-surface-variant hover:text-primary inline-flex items-center gap-1 transition-colors";
  const iconSize = variant === "card" ? 12 : 11;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Icon name="north_east" size={iconSize} />
      {label}
      <span className="sr-only"> de {speakerName}</span>
    </a>
  );
}

function Portrait({
  speaker,
  priority = false,
}: {
  speaker: Speaker;
  priority?: boolean;
}) {
  return (
    <div
      className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest"
    >
      <Image
        src={speaker.imageUrl}
        alt={speaker.name}
        fill
        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
        quality={90}
        unoptimized={!speaker.imageUrl.startsWith("/")}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

export default function SpeakerCard({ appearance, staggerClass, priority = false }: SpeakerCardProps) {
  const { speaker, panelContext, additionalSlot } = appearance;
  const status = speaker.status;
  const stage = speaker.stage;
  const time = speaker.time;
  const isLive = status === "live";
  const isPast = status === "past";
  const isTBD = time === "Por anunciar";
  const isPanelLead = panelContext?.indexInPanel === 0;
  const isPanelMember = panelContext !== undefined;

  // Top-border accent threads cards from the same panel together regardless
  // of their position in the responsive grid — first panelist gets full
  // primary, the rest get a faded variant. Plain cards have no top accent.
  const topBorderClass = isPanelLead
    ? "border-t-4 border-t-primary"
    : isPanelMember
      ? "border-t-4 border-t-primary/30"
      : "";

  const rootClasses = [
    "group relative flex flex-col bg-surface-container-low border-2 transition-colors duration-200 animate-fade-up",
    isLive
      ? "border-secondary animate-border-breathe"
      : "border-transparent hover:border-primary/30",
    topBorderClass,
    isPast ? "opacity-50" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClasses}>
      {/* Portrait block — one face per card, always. */}
      <Portrait speaker={speaker} priority={priority} />

      {/* Meta strip: status + (TBD chip) */}
      <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
        <StatusBadge status={status} size="sm" />
        {isTBD && (
          <span className="mono-data text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest border-2 border-outline-variant text-on-surface-variant">
            Por anunciar
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
        {panelContext && (
          <PanelChip context={panelContext} stage={stage} variant="card" />
        )}
        <h3 className="font-display font-black uppercase tracking-tighter text-primary text-2xl md:text-3xl leading-[0.95]">
          {speaker.name}
        </h3>
        <p className="label-meta text-[11px] font-bold text-on-primary-container line-clamp-2">
          {speaker.org}
        </p>
        <p className="text-sm font-bold uppercase text-primary leading-snug mt-1 line-clamp-3">
          {speaker.talk}
        </p>
        {additionalSlot && (
          <div className="mt-1 border-l-2 border-primary/30 pl-2">
            <span className="mono-data text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
              También presenta
            </span>
            <p className="text-xs font-bold uppercase text-primary leading-snug mt-0.5">
              {additionalSlot.talk}
            </p>
            <span className="mono-data text-[10px] text-on-surface-variant/80 italic">
              {additionalSlot.time}
            </span>
          </div>
        )}
        {(isHttpUrl(speaker.linkedinUrl) || isHttpUrl(speaker.companyUrl)) && (
          <ul className="flex flex-wrap gap-2 mt-1">
            {isHttpUrl(speaker.linkedinUrl) && (
              <li>
                <ExternalLinkChip
                  href={speaker.linkedinUrl}
                  label="LinkedIn"
                  speakerName={speaker.name}
                />
              </li>
            )}
            {isHttpUrl(speaker.companyUrl) && (
              <li>
                <ExternalLinkChip
                  href={speaker.companyUrl}
                  label="Sitio"
                  speakerName={speaker.name}
                />
              </li>
            )}
          </ul>
        )}

        {/* Footer: time + stage */}
        <div className="mt-auto pt-4 border-t-2 border-primary/10 flex items-center justify-between gap-2">
          <span
            className={`mono-data font-bold tracking-tight ${
              isTBD
                ? "text-on-surface-variant/60 text-sm italic"
                : "text-primary text-base"
            }`}
          >
            {time}
          </span>
          <span
            className="label-meta font-bold px-2 py-1 bg-primary/10 text-primary"
            title={stageLabel(stage)}
          >
            {stageShort(stage)}
          </span>
        </div>
      </div>
    </article>
  );
}
