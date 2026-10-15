import Image from "next/image";
import { stageLabel, stageShort } from "../../data/venue";
import StatusBadge from "../../components/StatusBadge";
import type { SpeakerAppearance } from "../_lib/groupSpeakers";
import PanelChip from "./PanelChip";

type SpeakerRowProps = {
  appearance: SpeakerAppearance;
  staggerClass?: string;
};

// Compact mobile row — one face per row, always. Panelists carry a
// PanelChip in the meta strip and a colored left-edge band that threads
// consecutive panel cards together (first panelist full primary, the rest
// faded). Live status takes precedence on the left edge — the breathing
// secondary band signals "happening now" over the panel hint.
export default function SpeakerRow({ appearance, staggerClass }: SpeakerRowProps) {
  const { speaker, panelContext, additionalSlot } = appearance;
  const status = speaker.status;
  const stage = speaker.stage;
  const time = speaker.time;
  const isLive = status === "live";
  const isPast = status === "past";
  const isTBD = time === "Por anunciar";
  const isPanelLead = panelContext?.indexInPanel === 0;
  const isPanelMember = panelContext !== undefined;

  // Border priority: live (secondary) > panel-lead (primary full) >
  // panel-member (primary faded) > none. The live state always wins so
  // the "happening now" cue isn't drowned out by the ambient panel band.
  const leftBorderClass = isLive
    ? "border-l-4 border-secondary animate-border-breathe"
    : isPanelLead
      ? "border-l-4 border-primary"
      : isPanelMember
        ? "border-l-4 border-primary/30"
        : "border-l-4 border-transparent";

  const rootClasses = [
    "group relative flex items-stretch gap-3 px-3 py-3 bg-surface-container-low transition-colors duration-150 animate-fade-up",
    leftBorderClass,
    isPast ? "opacity-60" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClasses}>
      {/* Square thumbnail — 80px keeps the editorial portrait recognisable
          while shrinking the card footprint by ~10× vs the full hero card. */}
      <div
        className="relative w-20 h-20 shrink-0 bg-surface-container-highest overflow-hidden"
      >
        <Image
          src={speaker.imageUrl}
          alt={speaker.name}
          fill
          sizes="80px"
          quality={85}
          unoptimized={!speaker.imageUrl.startsWith("/")}
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <StatusBadge status={status} size="sm" />
          {isTBD && (
            <span className="mono-data text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest border-2 border-outline-variant text-on-surface-variant shrink-0">
              Por anunciar
            </span>
          )}
        </div>

        {panelContext && (
          <PanelChip context={panelContext} stage={stage} variant="row" />
        )}

        <h3 className="font-display font-black uppercase tracking-tighter text-primary text-base sm:text-lg leading-[1.05] line-clamp-2">
          {speaker.name}
        </h3>

        <p className="label-meta text-[10px] font-bold text-on-primary-container line-clamp-1">
          {speaker.org}
        </p>

        {additionalSlot && (
          <p className="mono-data text-[9px] uppercase tracking-widest text-on-surface-variant line-clamp-1">
            <span className="text-primary/60">También:</span>{" "}
            <span className="text-primary/80">{additionalSlot.talk}</span>
          </p>
        )}

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <span
            className={`mono-data font-bold tracking-tight ${
              isTBD
                ? "text-on-surface-variant/60 text-xs italic"
                : "text-primary text-sm"
            }`}
          >
            {time}
          </span>
          <span
            className="label-meta text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary shrink-0"
            title={stageLabel(stage)}
          >
            {stageShort(stage)}
          </span>
        </div>
      </div>
    </article>
  );
}
