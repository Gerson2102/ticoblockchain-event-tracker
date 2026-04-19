import type { Session } from "../../data/types";
import type { TimeSlot } from "../_lib/groupSessions";
import SessionCard from "./SessionCard";

type TimeSlotRowProps = {
  slot: TimeSlot;
  staggerClass?: string;
  singleStage?: "main" | "escenario-2" | null;
};

function searchable(s: Session | undefined): string {
  if (!s) return "";
  return [s.title, s.speakerName, s.speakerOrg, s.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function categoriesOf(slot: TimeSlot): string {
  const set = new Set<string>();
  if (slot.both) set.add(slot.both.category);
  if (slot.main) set.add(slot.main.category);
  if (slot.escenario2) set.add(slot.escenario2.category);
  return [...set].join(",");
}

function isLive(slot: TimeSlot): boolean {
  return (
    slot.both?.status === "live" ||
    slot.main?.status === "live" ||
    slot.escenario2?.status === "live"
  );
}

// One horizontal row in the dual-track timeline. Either a full-width
// card (for `both`-stage sessions) or a side-by-side grid (one col per
// stage). Empty stage cells render a muted em-dash placeholder so the
// two columns stay visually balanced.
export default function TimeSlotRow({ slot, staggerClass, singleStage = null }: TimeSlotRowProps) {
  const live = isLive(slot);

  // When a stage filter is active, only render the matching side (or a `both` row).
  const showMain = !singleStage || singleStage === "main" || !!slot.both;
  const showEsc2 = !singleStage || singleStage === "escenario-2" || !!slot.both;

  const dataSearch = [
    searchable(slot.both),
    searchable(slot.main),
    searchable(slot.escenario2),
  ]
    .filter(Boolean)
    .join(" ");

  const dataCategories = categoriesOf(slot);

  const timeLabel = (
    <div className="mono-data text-sm md:text-base font-bold text-primary whitespace-nowrap leading-tight">
      {slot.time}
    </div>
  );

  return (
    <li
      data-slot={slot.startTime}
      data-search={dataSearch}
      data-categories={dataCategories}
      {...(live ? { "data-now": true } : {})}
      className={`animate-fade-up ${staggerClass ?? ""}`}
    >
      {slot.both ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-3 md:gap-6 items-stretch border-b-2 ${
            live ? "border-secondary" : "border-primary/10"
          } py-2`}
        >
          <div className="hidden md:flex items-center">{timeLabel}</div>
          <div className="md:hidden mb-2">{timeLabel}</div>
          <SessionCard session={slot.both} variant="wide" />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-[6rem_1fr_1fr] gap-3 md:gap-6 items-stretch border-b-2 ${
            live ? "border-secondary" : "border-primary/10"
          } py-2`}
        >
          <div className="hidden md:flex items-center">{timeLabel}</div>
          <div className="md:hidden mb-2">{timeLabel}</div>

          {showMain && (
            <div className="flex flex-col">
              {/* Mobile-only stage label */}
              <div className="md:hidden mono-data text-[10px] font-bold uppercase tracking-widest text-secondary mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-secondary shrink-0" aria-hidden="true" />
                Main Stage
              </div>
              {slot.main ? (
                <SessionCard session={slot.main} stageLabel="MAIN" />
              ) : (
                <div className="h-full min-h-[80px] flex items-center justify-center bg-surface-container-low/50 border-2 border-dashed border-outline-variant/30">
                  <span
                    className="mono-data text-xs text-on-surface-variant/50 uppercase tracking-widest"
                    aria-label="Sin sesión en Main Stage"
                  >
                    —
                  </span>
                </div>
              )}
            </div>
          )}

          {showEsc2 && (
            <div className="flex flex-col">
              <div className="md:hidden mono-data text-[10px] font-bold uppercase tracking-widest text-primary mt-2 mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary shrink-0" aria-hidden="true" />
                Escenario 2
              </div>
              {slot.escenario2 ? (
                <SessionCard session={slot.escenario2} stageLabel="ESC 2" />
              ) : (
                <div className="h-full min-h-[80px] flex items-center justify-center bg-surface-container-low/50 border-2 border-dashed border-outline-variant/30">
                  <span
                    className="mono-data text-xs text-on-surface-variant/50 uppercase tracking-widest"
                    aria-label="Sin sesión en Escenario 2"
                  >
                    —
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </li>
  );
}
