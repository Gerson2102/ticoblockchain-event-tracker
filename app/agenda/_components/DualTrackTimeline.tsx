import type { TimeSlot } from "../_lib/groupSessions";
import TimeSlotRow from "./TimeSlotRow";

type DualTrackTimelineProps = {
  slots: TimeSlot[];
  stageFilter: "todo" | "main" | "escenario-2";
};

export default function DualTrackTimeline({ slots, stageFilter }: DualTrackTimelineProps) {
  const singleStage = stageFilter === "todo" ? null : stageFilter;
  const showDual = singleStage === null;

  return (
    <section aria-label="Cronograma" className="mt-6">
      {/* Column headers — desktop only */}
      <div
        className={`hidden md:grid ${
          showDual ? "md:grid-cols-[6rem_1fr_1fr]" : "md:grid-cols-[6rem_1fr]"
        } gap-6 border-b-4 border-primary pb-3 mb-4 sticky top-[72px] bg-surface z-20`}
      >
        <div className="mono-data text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
          Hora
        </div>
        {showDual || singleStage === "main" ? (
          <div className="mono-data text-xs uppercase tracking-widest font-black text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary shrink-0" aria-hidden="true" />
            Main Stage
          </div>
        ) : null}
        {showDual || singleStage === "escenario-2" ? (
          <div className="mono-data text-xs uppercase tracking-widest font-black text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-primary shrink-0" aria-hidden="true" />
            Escenario 2
          </div>
        ) : null}
      </div>

      <ol role="list" className="flex flex-col">
        {slots.map((slot, i) => (
          <TimeSlotRow
            key={slot.startTime}
            slot={slot}
            singleStage={singleStage}
            staggerClass={`stagger-${Math.min(i + 1, 7)}`}
          />
        ))}
      </ol>
    </section>
  );
}
