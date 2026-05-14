import type { Session } from "../../data/types";
import type { TimeSlot } from "../_lib/groupSessions";
import SessionCard from "./SessionCard";

type TimeSlotRowProps = {
  slot: TimeSlot;
  staggerClass?: string;
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

// Comma-separated list of stages with an actual session in this slot.
// "both" rows are tagged literally so AgendaToolbar's filter treats them
// as universal matches; otherwise we list the stages that actually have
// a session (em-dash placeholder cells don't count — they exist only as
// a visual spacer in the dual layout).
function stagesOf(slot: TimeSlot): string {
  if (slot.both) return "both";
  const stages: string[] = [];
  if (slot.main) stages.push("main");
  if (slot.escenario2) stages.push("escenario-2");
  return stages.join(",");
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
//
// Both stage cells are always rendered into the DOM so AgendaToolbar
// can apply the `?stage=` filter client-side via DOM manipulation. CSS
// rules in globals.css collapse the grid template from 3 cols to 2 cols
// when a stage filter is active, and the toolbar's useEffect hides the
// non-matching cell via `cell.style.display`.
export default function TimeSlotRow({ slot, staggerClass }: TimeSlotRowProps) {
  const live = isLive(slot);

  const dataSearch = [
    searchable(slot.both),
    searchable(slot.main),
    searchable(slot.escenario2),
  ]
    .filter(Boolean)
    .join(" ");

  const dataCategories = categoriesOf(slot);
  const dataStages = stagesOf(slot);

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
      data-stages={dataStages}
      {...(live ? { "data-now": true } : {})}
      className={`animate-fade-up ${staggerClass ?? ""}`}
    >
      {slot.both ? (
        <div
          data-row-grid
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
          data-row-grid
          className={`grid grid-cols-1 md:grid-cols-[6rem_1fr_1fr] gap-3 md:gap-6 items-stretch border-b-2 ${
            live ? "border-secondary" : "border-primary/10"
          } py-2`}
        >
          <div className="hidden md:flex items-center">{timeLabel}</div>

          <div
            data-stage="main"
            className="flex flex-col"
            {...(slot.main ? { "data-session-category": slot.main.category } : {})}
          >
            {/* Mobile-only stage label + per-stage time so each cell carries
                its own timestamp when the toolbar filter hides the sibling. */}
            <div className="md:hidden mb-1 flex items-center gap-2">
              <span className="label-meta font-bold text-secondary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-secondary shrink-0" aria-hidden="true" />
                Main Stage
              </span>
              <span className="mono-data text-[11px] font-bold text-primary whitespace-nowrap ml-auto">
                {slot.time}
              </span>
            </div>
            {slot.main ? (
              <SessionCard session={slot.main} stageLabel="MAIN" />
            ) : (
              <div className="h-full min-h-[80px] flex items-center justify-center bg-surface-container-low/50 border-2 border-dashed border-outline-variant/30">
                <span
                  className="label-meta text-xs text-on-surface-variant/50"
                  aria-label="Sin sesión en Main Stage"
                >
                  —
                </span>
              </div>
            )}
          </div>

          <div
            data-stage="escenario-2"
            className="flex flex-col"
            {...(slot.escenario2 ? { "data-session-category": slot.escenario2.category } : {})}
          >
            <div className="md:hidden mt-2 mb-1 flex items-center gap-2">
              <span className="label-meta font-bold text-primary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary shrink-0" aria-hidden="true" />
                Escenario 2
              </span>
              <span className="mono-data text-[11px] font-bold text-primary whitespace-nowrap ml-auto">
                {slot.time}
              </span>
            </div>
            {slot.escenario2 ? (
              <SessionCard session={slot.escenario2} stageLabel="ESC 2" />
            ) : (
              <div className="h-full min-h-[80px] flex items-center justify-center bg-surface-container-low/50 border-2 border-dashed border-outline-variant/30">
                <span
                  className="label-meta text-xs text-on-surface-variant/50"
                  aria-label="Sin sesión en Escenario 2"
                >
                  —
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
