import Image from "next/image";
import type { Speaker } from "../../data/types";
import { stageLabel, stageShort } from "../../data/venue";
import StatusBadge from "../../components/StatusBadge";
import type { SpeakerAppearance } from "../_lib/groupSpeakers";

type SpeakerCardProps = {
  appearance: SpeakerAppearance;
  staggerClass?: string;
};

function statusOf(appearance: SpeakerAppearance): Speaker["status"] {
  return appearance.kind === "solo" ? appearance.speaker.status : appearance.status;
}

function stageOf(appearance: SpeakerAppearance): Speaker["stage"] {
  return appearance.kind === "solo" ? appearance.speaker.stage : appearance.stage;
}

function timeOf(appearance: SpeakerAppearance): string {
  return appearance.kind === "solo" ? appearance.speaker.time : appearance.time;
}

function Portrait({ speaker, size = "full" }: { speaker: Speaker; size?: "full" | "half" }) {
  const sizesAttr = size === "full"
    ? "(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
    : "(min-width: 1024px) 192px, (min-width: 640px) 25vw, 50vw";
  return (
    <div
      className={`relative w-full aspect-[4/5] overflow-hidden bg-surface-container-highest ${
        speaker.monochrome ? "grayscale" : ""
      }`}
    >
      <Image
        src={speaker.imageUrl}
        alt={speaker.name}
        fill
        sizes={sizesAttr}
        quality={90}
        unoptimized={!speaker.imageUrl.startsWith("/")}
        className="object-cover"
      />
    </div>
  );
}

export default function SpeakerCard({ appearance, staggerClass }: SpeakerCardProps) {
  const status = statusOf(appearance);
  const stage = stageOf(appearance);
  const time = timeOf(appearance);
  const isLive = status === "live";
  const isPast = status === "past";
  const isTBD = time === "Por anunciar";

  const rootClasses = [
    "group relative flex flex-col bg-surface-container-low border-2 transition-colors duration-200 animate-fade-up",
    isLive
      ? "border-secondary animate-border-breathe"
      : "border-transparent hover:border-primary/30",
    isPast ? "opacity-50" : "",
    staggerClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={rootClasses}>
      {/* Portrait block */}
      {appearance.kind === "solo" ? (
        <Portrait speaker={appearance.speaker} />
      ) : (
        <div className="grid grid-cols-2 gap-0">
          {appearance.speakers.slice(0, 2).map((s) => (
            <Portrait key={s.id} speaker={s} size="half" />
          ))}
        </div>
      )}

      {/* Meta strip: status + (panel/TBD chips) */}
      <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
        <StatusBadge status={status} size="sm" />
        {appearance.kind === "panel" && (
          <span className="mono-data text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest bg-primary-container text-on-primary-container">
            Panel
          </span>
        )}
        {isTBD && (
          <span className="mono-data text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest border-2 border-outline-variant text-on-surface-variant">
            Por anunciar
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
        {appearance.kind === "solo" ? (
          <>
            <h3 className="font-display font-black uppercase tracking-tighter text-primary text-2xl md:text-3xl leading-[0.95]">
              {appearance.speaker.name}
            </h3>
            <p className="mono-data text-[11px] uppercase tracking-widest font-bold text-on-primary-container line-clamp-2">
              {appearance.speaker.org}
            </p>
            <p className="text-sm font-bold uppercase text-primary leading-snug mt-1 line-clamp-3">
              {appearance.speaker.talk}
            </p>
          </>
        ) : (
          <>
            <h3 className="font-display font-black uppercase tracking-tighter text-primary text-xl md:text-2xl leading-[0.95]">
              Panel: {appearance.speakers[0].talk.replace(/ \(.*\)$/, "")}
            </h3>
            <ul className="flex flex-col gap-2 mt-1">
              {appearance.speakers.map((s) => (
                <li key={s.id} className="flex flex-col gap-0.5">
                  <span className="mono-data text-[11px] uppercase tracking-widest font-bold text-primary">
                    {s.name}
                  </span>
                  <span className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant line-clamp-1">
                    {s.org}
                  </span>
                </li>
              ))}
            </ul>
          </>
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
            className="mono-data text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary"
            title={stageLabel(stage)}
          >
            {stageShort(stage)}
          </span>
        </div>
      </div>
    </article>
  );
}
