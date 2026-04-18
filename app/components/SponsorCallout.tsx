import type { SponsorCallout as SponsorCalloutData } from "../data/home-content";
import Icon from "./Icon";

type SponsorCalloutProps = {
  callout: SponsorCalloutData;
};

// Full-width banner shown below the live hero when a sponsor-linked activity
// (Lulubit workshop, Cofiblocks coffee breaks) is currently live. Uses a
// pale cobalt surface — tonally related to the primary brand color so it
// reads as "official event content", distinct from the crimson LIVE alerts
// and from the cream parallel track. Prominence comes from position
// (directly under hero), a stamped-number eyebrow, a thick crimson left
// rule, oversized sponsor display type, and a single crimson CTA — not
// from alarm-red fill.
export default function SponsorCallout({ callout }: SponsorCalloutProps) {
  return (
    <section
      className="bg-primary-fixed text-primary px-5 sm:px-8 md:px-12 lg:px-24 py-8 md:py-10 border-t-4 border-secondary animate-fade-up"
      aria-labelledby="sponsor-callout-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1 border-l-4 border-secondary pl-5 md:pl-6">
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-3">
            <span className="mono-data text-[10px] sm:text-xs font-black tracking-widest uppercase text-secondary">
              ACTIVIDAD DE SPONSOR
            </span>
            <span
              className="hidden sm:inline-block w-1 h-1 bg-primary/30 shrink-0"
              aria-hidden="true"
            />
            <span className="mono-data text-[10px] sm:text-xs font-bold tracking-widest uppercase text-primary/70 inline-flex items-center gap-2">
              <Icon name="campaign" size={16} aria-hidden className="shrink-0" />
              {callout.activityLabel}
            </span>
          </div>
          <h3
            id="sponsor-callout-heading"
            className="font-display font-black uppercase tracking-tighter leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] break-words text-primary"
          >
            {callout.sponsorName}
          </h3>
          <p className="mono-data text-xs sm:text-sm uppercase tracking-widest font-bold mt-3 text-primary/80">
            {callout.tagline}
          </p>
          <p className="text-sm sm:text-base leading-relaxed mt-4 max-w-2xl text-primary/75">
            {callout.description}
          </p>
        </div>
        <div className="shrink-0 lg:self-end">
          <a
            href={callout.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
          >
            <Icon name="north_east" size={14} /> {callout.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
