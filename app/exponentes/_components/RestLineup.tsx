"use client";

import { useMemo, useState } from "react";
import { MAX_STAGGER_LEVEL } from "../../lib/stagger";
import type { SpeakerAppearance } from "../_lib/groupSpeakers";
import SpeakerCard from "./SpeakerCard";
import SpeakerRow from "./SpeakerRow";
import StageFilter, { type StageFilterValue } from "./StageFilter";

type RestLineupProps = {
  appearances: SpeakerAppearance[];
  hasFeatured: boolean;
};

// Owns the stage-filter state for the "rest of the lineup" section.
// Featured stays unfiltered above (it's a live signal, not a directory)
// — only the long lineup grid responds to the toolbar. Both viewports
// share the same filtered list to stay in sync as the user toggles.
export default function RestLineup({ appearances, hasFeatured }: RestLineupProps) {
  const [stage, setStage] = useState<StageFilterValue>("all");

  const counts = useMemo(() => {
    const acc: Record<StageFilterValue, number> = {
      all: appearances.length,
      main: 0,
      "escenario-2": 0,
    };
    for (const a of appearances) {
      acc[a.speaker.stage] += 1;
    }
    return acc;
  }, [appearances]);

  const filtered = useMemo(() => {
    if (stage === "all") return appearances;
    return appearances.filter((a) => a.speaker.stage === stage);
  }, [appearances, stage]);

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-primary shrink-0" aria-hidden="true" />
          <span className="mono-data text-primary font-bold tracking-widest text-xs sm:text-sm uppercase">
            {hasFeatured
              ? `Cartel completo · ${filtered.length} más`
              : `Cartel completo · ${filtered.length} voces`}
          </span>
        </div>
        <StageFilter value={stage} counts={counts} onChange={setStage} />
      </div>

      {filtered.length === 0 && (
        <p className="mono-data text-sm text-on-surface-variant py-8 text-center">
          No hay exponentes en este escenario.
        </p>
      )}

      {/* Mobile: compact rows. */}
      <div className="flex flex-col gap-2 sm:hidden">
        {filtered.map((appearance, i) => (
          <SpeakerRow
            key={`row-${appearance.speaker.id}`}
            appearance={appearance}
            staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
          />
        ))}
      </div>

      {/* Tablet/desktop: full editorial card grid. */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filtered.map((appearance, i) => (
          <SpeakerCard
            key={`card-${appearance.speaker.id}`}
            appearance={appearance}
            staggerClass={`stagger-${Math.min(i + 1, MAX_STAGGER_LEVEL)}`}
          />
        ))}
      </div>
    </section>
  );
}
