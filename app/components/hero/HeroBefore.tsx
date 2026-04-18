import Image from "next/image";
import Link from "next/link";
import { HERO_CONTENT } from "../../data/home-content";
import type { Session } from "../../data/types";
import AgendaPreviewRow from "../AgendaPreviewRow";
import Icon from "../Icon";

type HeroBeforeProps = {
  daysUntilEvent: number;
  // First N sessions sorted by start time — drives the pre-event "AGENDA
  // DEL DÍA" rail so attendees can scan the opening arc of the day.
  openingSessions: Session[];
};

// Pre-event countdown hero + agenda preview rail. The countdown is the
// protagonist (the live data the pre-event page exists to deliver), with
// the wordmark and meta strip stacked beneath it in a single vertical
// reading unit.
export default function HeroBefore({
  daysUntilEvent,
  openingSessions,
}: HeroBeforeProps) {
  const countdownLabel =
    daysUntilEvent === 0
      ? "Hoy · Arranca 08:00 CRT"
      : daysUntilEvent === 1
        ? "Mañana · 08:00 CRT"
        : `En ${daysUntilEvent} días`;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60dvh] sm:min-h-[75dvh] lg:min-h-[85dvh] bg-primary overflow-hidden">
      <div className="lg:col-span-9 relative flex flex-col p-5 sm:p-8 md:p-12 text-on-primary">
        <div className="flex items-center justify-between gap-4 pb-5 border-b-2 border-on-primary/20 animate-fade-up">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-secondary animate-live-glow" />
            <span className="mono-data text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              PRÓXIMO EVENTO · SAN JOSÉ
            </span>
          </div>
          <span className="mono-data text-[10px] sm:text-xs uppercase tracking-widest text-on-primary/60">
            14.05.26 · GMT-6
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center py-10 md:py-14">
          <div className="animate-fade-up stagger-1 mb-6 md:mb-8">
            <span className="bg-secondary text-on-secondary mono-data text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 inline-flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 bg-on-secondary shrink-0"
                aria-hidden="true"
              />
              {countdownLabel}
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(4.5rem, 11vw, 10.5rem)",
              letterSpacing: "clamp(-0.5rem, -0.5vw, -0.25rem)",
            }}
            className="font-display font-black uppercase leading-[0.88] break-words animate-reveal-up stagger-2"
          >
            TICO
            <br />
            BLOCK
            <span className="text-secondary">CHAIN</span>
          </h1>
          <div className="mono-data text-secondary font-black tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-3 md:mt-5 animate-fade-up stagger-3">
            2026
          </div>
        </div>

        <div className="mt-auto space-y-6 animate-fade-up stagger-4">
          <div className="grid grid-cols-3 gap-0 border-y-2 border-on-primary/20">
            <div className="py-3 px-1 border-r border-on-primary/15">
              <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                Fecha
              </div>
              <div className="mono-data text-base sm:text-xl md:text-2xl font-black text-on-primary tracking-tighter">
                14.05.26
              </div>
            </div>
            <div className="py-3 px-1 border-r border-on-primary/15">
              <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                Inicio
              </div>
              <div className="mono-data text-base sm:text-xl md:text-2xl font-black text-on-primary tracking-tighter">
                08:00
              </div>
            </div>
            <div className="py-3 px-1">
              <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
                Venue
              </div>
              <div className="mono-data text-base sm:text-xl md:text-2xl font-black text-on-primary tracking-tighter">
                BARCELÓ
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="mono-data text-xs sm:text-sm uppercase tracking-wider text-on-primary/70">
              HOTEL BARCELÓ SAN JOSÉ · COSTA RICA
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/agenda"
                className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
              >
                <Icon name="north_east" size={14} /> VER AGENDA
              </Link>
              <Link
                href="/exponentes"
                className="border-2 border-on-primary text-on-primary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:bg-on-primary hover:text-primary transition-colors duration-200 min-h-[48px]"
              >
                EXPONENTES
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

      {/* Pre-event departure board — same dense vocabulary as the during-
          phase rail (color-coded stage badges, crimson left slide on hover,
          mono time chips), but no AHORA strip since nothing is live yet. */}
      <div className="lg:col-span-3 bg-surface-container-low p-5 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10">
        <h3 className="font-display font-black text-xl uppercase mb-1 flex items-center justify-between text-primary animate-fade-up stagger-2">
          AGENDA DEL DÍA
          <Icon name="sensors" size={22} />
        </h3>
        <p className="mono-data text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-6 animate-fade-up stagger-2">
          14 MAYO · DOS ESCENARIOS
        </p>

        <div className="flex flex-col">
          {openingSessions.map((session, i) => (
            <AgendaPreviewRow
              key={session.id}
              session={session}
              clampTitle
              staggerClass={`stagger-${Math.min(i + 3, 7)}`}
            />
          ))}
        </div>

        <Link
          href="/agenda"
          className="mt-auto pt-6 block animate-fade-in stagger-6 group/link"
        >
          <div className="mono-data font-black text-[11px] uppercase tracking-widest text-primary border-t border-primary/15 pt-4 flex items-center justify-between group-hover/link:text-secondary transition-colors duration-200">
            VER AGENDA COMPLETA
            <Icon
              name="north_east"
              size={14}
              className="group-hover/link:translate-x-1 transition-transform duration-200"
            />
          </div>
          <p className="mono-data text-[10px] uppercase tracking-widest text-primary/50 mt-2">
            {HERO_CONTENT.capacityLabel}
          </p>
        </Link>
      </div>
    </section>
  );
}
