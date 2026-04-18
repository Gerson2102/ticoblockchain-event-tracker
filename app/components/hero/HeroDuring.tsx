import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SponsorCallout as SponsorCalloutData } from "../../data/home-content";
import { HERO_CONTENT } from "../../data/home-content";
import { getMinutesUntilStart } from "../../data/sessions";
import type { Session } from "../../data/types";
import AgendaPreviewRow from "../AgendaPreviewRow";
import Icon from "../Icon";
import LiveDot from "../LiveDot";
import SponsorCallout from "../SponsorCallout";
import StageBadge from "../StageBadge";

type HeroDuringProps = {
  mainLive: Session | undefined;
  headline: { first: string; last: string };
  progressPct: number;
  // Next 3 upcoming sessions across both tracks, used by both the
  // "PRÓXIMA EN MAIN STAGE" strip (takes [0]) and the A CONTINUACIÓN rail.
  nextUpSessions: Session[];
  sponsorCallout: SponsorCalloutData | null;
  now: Date;
};

// Event-day hero: live speaker name as a wordmark, a progress bar tied to
// (now - start)/(end - start), and a right-rail departure board ("EN CURSO
// · POR VENIR"). When a sponsor activity is also live, the callout slots
// into the hero grid so mobile readers reach it without scrolling past the
// rail.
export default function HeroDuring({
  mainLive,
  headline,
  progressPct,
  nextUpSessions,
  sponsorCallout,
  now,
}: HeroDuringProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60dvh] sm:min-h-[70dvh] lg:min-h-[85dvh] bg-primary overflow-hidden">
      <div className="lg:col-span-9 relative flex flex-col justify-between p-5 sm:p-8 md:p-12 text-on-primary">
        <div className="flex items-center gap-3 animate-fade-up">
          <LiveDot />
          <span className="mono-data text-sm font-bold tracking-widest uppercase">
            {HERO_CONTENT.liveLabel}
          </span>
        </div>

        <div className="mt-12 md:mt-0">
          <h1
            aria-label={
              headline.last
                ? `${headline.first} ${headline.last}`
                : headline.first
            }
            className="text-[clamp(2.5rem,12vw,12rem)] leading-[0.85] font-black uppercase tracking-tighter -ml-1 md:-ml-4 break-words font-display animate-reveal-up stagger-1"
          >
            {headline.first}
            {headline.last && (
              <>
                <br />
                {headline.last}
              </>
            )}
          </h1>
          <div className="mt-8 flex items-baseline gap-4 border-l-4 border-secondary pl-6 animate-fade-up stagger-3">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-bold uppercase tracking-tight max-w-2xl">
              {mainLive?.title ?? "Sesión en preparación"}
            </h2>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-24 space-y-6 animate-fade-up stagger-4">
          {/* Progress tied to (now - start)/(end - start) via --progress-pct;
              animates on first paint and on every server refresh at a
              transition boundary. */}
          <div
            className="w-full bg-on-primary/10 h-1"
            role="progressbar"
            aria-label={
              mainLive
                ? `Progreso de ${mainLive.title}`
                : "Progreso de la sesión en curso"
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPct}
          >
            <div
              className="bg-secondary h-full animate-progress-fill"
              style={{ "--progress-pct": `${progressPct}%` } as CSSProperties}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="min-w-0 max-w-full md:max-w-[60%]">
              <div className="mono-data text-[10px] sm:text-xs uppercase tracking-widest text-on-primary/60 mb-1">
                PRÓXIMA EN MAIN STAGE
              </div>
              {nextUpSessions[0] ? (
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-on-primary leading-tight">
                    {nextUpSessions[0].title}
                  </span>
                  <span className="mono-data text-sm sm:text-base font-black text-secondary tracking-tighter">
                    {nextUpSessions[0].startTime}
                  </span>
                </div>
              ) : (
                <div className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-on-primary">
                  Cierre de jornada
                </div>
              )}
            </div>
            <div className="flex gap-4 shrink-0">
              <Link
                href="/agenda"
                className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
              >
                <Icon name="north_east" size={14} /> VER AGENDA COMPLETA
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay overflow-hidden">
          <Image
            src={HERO_CONTENT.heroImageUrl}
            alt={HERO_CONTENT.heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover animate-hero-zoom"
            priority
          />
        </div>
      </div>

      {/* Sponsor callout — rendered inside the hero grid so mobile DOM order
          places it directly under the main hero column (before the rail).
          `lg:order-last` pushes it below the hero row on desktop. Only
          present while a sponsor activity is live. */}
      {sponsorCallout && (
        <div className="lg:col-span-12 lg:order-last">
          <SponsorCallout callout={sponsorCallout} />
        </div>
      )}

      {/* Departure Board rail: AHORA strip on top, color-coded stage badges,
          countdown chips per row, hover slide-right + crimson left border. */}
      <div className="lg:col-span-3 bg-surface-container-low p-5 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10">
        <h3 className="font-display font-black text-xl uppercase mb-6 flex items-center justify-between text-primary animate-fade-up stagger-2">
          EN CURSO · POR VENIR
          <Icon name="sensors" size={22} />
        </h3>

        {mainLive && (
          <Link
            href="/agenda?stage=main"
            className="block mb-5 pb-5 border-b-2 border-primary/15 group animate-fade-up stagger-3"
            aria-label={`Ahora en ${mainLive.stage === "main" ? "Main Stage" : "ambos escenarios"}: ${mainLive.title}`}
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <LiveDot />
              <span className="mono-data text-[10px] font-black tracking-widest uppercase text-secondary">
                AHORA
              </span>
              <StageBadge stage={mainLive.stage} />
            </div>
            <h4 className="font-display font-black uppercase leading-[1.05] text-primary text-xl md:text-2xl tracking-tight mb-1 group-hover:text-secondary transition-colors duration-200">
              {mainLive.title}
            </h4>
            {(mainLive.speakerName ?? mainLive.speakerOrg) && (
              <p className="mono-data text-[11px] text-primary/60 uppercase tracking-wide mb-3">
                {mainLive.speakerName ?? mainLive.speakerOrg}
              </p>
            )}
            <div className="flex items-center gap-2">
              <div
                className="flex-1 h-[3px] bg-primary/10"
                role="progressbar"
                aria-label={`Progreso de ${mainLive.title}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPct}
              >
                <div
                  className="bg-secondary h-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="mono-data text-[10px] font-black text-secondary tabular-nums">
                {progressPct}%
              </span>
            </div>
          </Link>
        )}

        <div className="mono-data text-[10px] uppercase font-black tracking-widest text-primary/60 mb-1">
          A CONTINUACIÓN
        </div>
        <div className="flex flex-col">
          {nextUpSessions.map((session, i) => (
            <AgendaPreviewRow
              key={session.id}
              session={session}
              countdownMinutes={getMinutesUntilStart(session.startTime, now)}
              staggerClass={`stagger-${Math.min(i + 4, 7)}`}
            />
          ))}
        </div>

        <div className="mt-auto pt-6 animate-fade-in stagger-6">
          <p className="mono-data font-bold text-[11px] uppercase tracking-widest text-primary/70 border-t border-primary/15 pt-4">
            {HERO_CONTENT.capacityLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
