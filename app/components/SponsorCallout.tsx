import type { SponsorCallout as SponsorCalloutData } from "../data/home-content";
import Icon from "./Icon";
import LiveDot from "./LiveDot";

type SponsorCalloutProps = {
  callout: SponsorCalloutData;
};

// Full-width banner shown below the live hero when a sponsor-linked activity
// (Lulubit workshop, Cofiblocks coffee breaks) is currently live. Inverted
// crimson block — the visual equivalent of a warning light — so attendees
// notice the activity even if they're reading the hero.
export default function SponsorCallout({ callout }: SponsorCalloutProps) {
  return (
    <section
      className="bg-secondary text-on-secondary px-5 sm:px-8 md:px-12 lg:px-24 py-8 md:py-10 border-t-4 border-primary animate-fade-up"
      aria-labelledby="sponsor-callout-heading"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <LiveDot />
            <span className="mono-data text-[10px] sm:text-xs font-bold tracking-widest uppercase text-on-secondary">
              {callout.activityLabel}
            </span>
          </div>
          <h3
            id="sponsor-callout-heading"
            className="font-display font-black uppercase tracking-tighter leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] break-words"
          >
            {callout.sponsorName}
          </h3>
          <p className="mono-data text-xs sm:text-sm uppercase tracking-widest font-bold mt-3">
            {callout.tagline}
          </p>
          <p className="text-sm sm:text-base leading-relaxed mt-4 max-w-2xl text-on-secondary/90">
            {callout.description}
          </p>
        </div>
        <div className="shrink-0 lg:self-end">
          <a
            href={callout.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-on-secondary text-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px] border-2 border-on-secondary"
          >
            <Icon name="north_east" size={14} /> {callout.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
