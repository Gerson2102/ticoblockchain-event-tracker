import type { CSSProperties } from "react";
import Link from "next/link";
import { HERO_CONTENT } from "../../data/home-content";
import type { Session } from "../../data/types";
import Icon from "../Icon";
import LiveDot from "../LiveDot";
import StageBadge from "../StageBadge";

type EnParaleloSectionProps = {
  // The escenario-2 live session, only when it's genuinely different from
  // the Main Stage session (not a mirrored "both"-stage ceremony).
  distinctParallel: Session | undefined;
  // Fallback for the empty state: the next escenario-2 or both-stage
  // session so the parallel-track spatial map survives the gap.
  nextParallel: Session | undefined;
  parallelProgressPct: number;
};

// Full-width Escenario 2 card that matches the hero vocabulary: live label
// + stage badge, title and speaker center-left, VER AGENDA CTA right, and
// a progress band along the bottom. Shows a compact empty-state strip
// (next esc-2 talk) when nothing is live on the parallel track.
export default function EnParaleloSection({
  distinctParallel,
  nextParallel,
  parallelProgressPct,
}: EnParaleloSectionProps) {
  if (!distinctParallel && !nextParallel) return null;

  return (
    <section className="bg-surface text-primary px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 border-t-4 border-primary border-b-4 border-b-secondary animate-fade-up">
      {distinctParallel ? (
        <>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6 pb-4 border-b border-primary/15">
            <div className="flex items-center gap-3 flex-wrap">
              <LiveDot />
              <span className="mono-data text-[11px] sm:text-xs font-black tracking-widest uppercase text-secondary">
                {HERO_CONTENT.parallelLabel}
              </span>
              <StageBadge stage={distinctParallel.stage} />
            </div>
            <span className="mono-data text-sm sm:text-base font-black tracking-tighter text-primary tabular-nums">
              {distinctParallel.time}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[3fr_auto] gap-6 md:gap-8 items-end">
            <div>
              <h2 className="font-display font-black uppercase tracking-tight leading-[0.95] text-[clamp(1.75rem,5vw,3.5rem)] text-primary mb-3 md:mb-4">
                {distinctParallel.title}
              </h2>
              {(distinctParallel.speakerName ?? distinctParallel.speakerOrg) && (
                <p className="mono-data text-sm uppercase tracking-wider text-on-surface-variant border-l-4 border-secondary pl-4">
                  {distinctParallel.speakerName ?? distinctParallel.speakerOrg}
                </p>
              )}
            </div>
            <Link
              href="/agenda?stage=escenario-2"
              className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px] shrink-0"
            >
              <Icon name="north_east" size={14} />
              VER AGENDA
            </Link>
          </div>

          <div className="mt-6 md:mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="mono-data text-[10px] uppercase tracking-widest font-black text-on-surface-variant">
                PROGRESO · ESCENARIO 2
              </span>
              <span className="mono-data text-[10px] uppercase tracking-widest font-black text-secondary tabular-nums">
                {parallelProgressPct}%
              </span>
            </div>
            <div
              className="w-full bg-primary/10 h-[6px]"
              role="progressbar"
              aria-label={`Progreso de ${distinctParallel.title}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={parallelProgressPct}
            >
              <div
                className="bg-secondary h-full animate-progress-fill"
                style={
                  {
                    "--progress-pct": `${parallelProgressPct}%`,
                  } as CSSProperties
                }
              />
            </div>
          </div>
        </>
      ) : nextParallel ? (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-3 flex-wrap min-w-0">
            <span
              className="w-2 h-2 bg-primary/40 shrink-0"
              aria-hidden="true"
            />
            <span className="mono-data text-[11px] font-black tracking-widest uppercase text-on-surface-variant">
              PRÓXIMA EN ESCENARIO 2
            </span>
            <StageBadge stage="escenario-2" />
            <span className="mono-data text-sm font-black tracking-tighter text-secondary tabular-nums">
              {nextParallel.startTime}
            </span>
          </div>
          <div className="flex-1 md:mx-4 min-w-0">
            <span className="font-display font-bold uppercase tracking-tight text-lg md:text-xl text-primary line-clamp-2">
              {nextParallel.title}
            </span>
          </div>
          <Link
            href="/agenda?stage=escenario-2"
            className="border-2 border-primary text-primary px-6 py-3 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:bg-primary hover:text-on-primary transition-colors duration-200 min-h-[48px] shrink-0"
          >
            <Icon name="north_east" size={14} />
            VER AGENDA
          </Link>
        </div>
      ) : null}
    </section>
  );
}
