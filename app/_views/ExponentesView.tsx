import { Suspense } from "react";
import DevTimeBanner from "../components/DevTimeBanner";
import LiveRefresh from "../components/LiveRefresh";
import { SPEAKERS } from "../data/speakers";
import { getNextTransitionAt } from "../lib/session-time";
import { MAX_STAGGER_LEVEL } from "../lib/stagger";
import RestLineup from "../exponentes/_components/RestLineup";
import SpeakerCard from "../exponentes/_components/SpeakerCard";
import {
  expandAppearances,
  type SpeakerAppearance,
} from "../exponentes/_lib/groupSpeakers";
import { applyLiveStatus } from "../exponentes/_lib/speakerStatus";

// Editorial hero treatment is reserved for the moments people care about most
// — anyone live right now plus the next two slots about to take the stage.
// Pre-event we promote the first two scheduled appearances so the page still
// has an anchor; post-event there's nothing to feature and the rest section
// carries the full lineup as compact rows.
const FEATURED_NEXT_LIMIT = 2;

function partitionAppearances(appearances: SpeakerAppearance[]): {
  featured: SpeakerAppearance[];
  rest: SpeakerAppearance[];
  featuredKind: "live-or-next" | "scheduled-fallback" | "none";
} {
  const live = appearances.filter((a) => a.speaker.status === "live");
  const next = appearances
    .filter((a) => a.speaker.status === "next")
    .slice(0, FEATURED_NEXT_LIMIT);
  let featured = [...live, ...next];
  let featuredKind: "live-or-next" | "scheduled-fallback" | "none" =
    featured.length > 0 ? "live-or-next" : "none";

  if (featured.length === 0) {
    featured = appearances
      .filter((a) => a.speaker.status === "scheduled")
      .slice(0, FEATURED_NEXT_LIMIT);
    featuredKind = featured.length > 0 ? "scheduled-fallback" : "none";
  }

  const featuredKeys = new Set(featured.map((a) => a.speaker.id));
  const rest = appearances.filter((a) => !featuredKeys.has(a.speaker.id));
  return { featured, rest, featuredKind };
}

function featuredHeading(
  kind: "live-or-next" | "scheduled-fallback" | "none",
  hasLive: boolean,
): string {
  if (kind === "scheduled-fallback") return "Abren el día";
  if (kind === "live-or-next") return hasLive ? "En vivo · A continuación" : "A continuación";
  return "";
}

// Counts unique panel sessions in a list of appearances — used in the
// hero stat strip ("N paneles") so the data shape change doesn't lose
// the panel count it surfaces.
function countUniquePanels(appearances: SpeakerAppearance[]): number {
  const ids = new Set<string>();
  for (const a of appearances) {
    if (a.panelContext?.sessionId) ids.add(a.panelContext.sessionId);
  }
  return ids.size;
}

type ExponentesViewProps = {
  now: Date;
  simulated: string | null;
};

// Shared body for the Exponentes page. Public `/exponentes` renders this
// with `now = new Date()` and `simulated = null` for static ISR caching;
// `/dev/exponentes` renders it with a simulated time from `?now=` for QA.
export default function ExponentesView({ now, simulated }: ExponentesViewProps) {
  const liveSpeakers = applyLiveStatus(SPEAKERS, now);
  const nextTransitionAt = getNextTransitionAt(now);
  const appearances = expandAppearances(liveSpeakers);
  // Count actual cards rendered, not raw data rows. Same-name TBA
  // duplicates collapse into one card via expandAppearances, so reading
  // from `appearances` keeps the hero stat consistent with what scrolls.
  const totalSpeakers = appearances.length;
  const panelCount = countUniquePanels(appearances);

  const { featured, rest, featuredKind } = partitionAppearances(appearances);
  const hasLive = featured.some((a) => a.speaker.status === "live");
  const featuredLabel = featuredHeading(featuredKind, hasLive);

  return (
    <main id="main" className="pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
      <LiveRefresh
        nextTransitionAt={nextTransitionAt}
        simulated={simulated !== null}
      />
      {simulated && (
        <Suspense fallback={null}>
          <DevTimeBanner simulated={simulated} />
        </Suspense>
      )}

      {/* Hero */}
      <section className="mb-10 border-l-8 border-primary pl-6 pt-8 animate-slide-left">
        <span className="mono-data text-secondary font-bold tracking-widest text-sm uppercase">
          Cartelera Oficial · 14 MAYO 2026
        </span>
        <h1
          aria-label="Exponentes 2026"
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary"
        >
          EXPONENTES
          <br />
          <span className="text-secondary">2026</span>
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 label-meta font-bold">
          <span className="bg-primary text-on-primary px-3 py-1">
            {totalSpeakers} voces
          </span>
          <span className="bg-surface-container-highest text-primary px-3 py-1">
            {panelCount} paneles
          </span>
          <span className="bg-surface-container-highest text-primary px-3 py-1">
            2 escenarios
          </span>
        </div>
        <p className="mt-5 text-base sm:text-lg max-w-2xl font-medium text-on-surface-variant">
          Las personas que van a tomar el micrófono el 14 de mayo. Ordenadas por
          próxima aparición.
        </p>
      </section>

      {/* Featured — full editorial cards for live + next-up speakers, so the
          live-tracker emphasis lands at the top of the screen on every device.
          When a panel is live, all panelists land here individually so every
          face is visible. */}
      {featured.length > 0 && (
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span
              className={`w-1.5 h-1.5 shrink-0 ${hasLive ? "bg-secondary" : "bg-primary"}`}
              aria-hidden="true"
            />
            <span
              className={`mono-data font-bold tracking-widest text-xs sm:text-sm uppercase ${
                hasLive ? "text-secondary" : "text-primary"
              }`}
            >
              {featuredLabel}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featured.map((appearance, i) => (
              <SpeakerCard
                key={appearance.speaker.id}
                appearance={appearance}
                staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
                priority={i === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Rest of the lineup — owns its stage-filter state client-side. */}
      {rest.length > 0 && (
        <RestLineup appearances={rest} hasFeatured={featured.length > 0} />
      )}
    </main>
  );
}
