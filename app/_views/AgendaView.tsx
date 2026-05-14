import { Suspense } from "react";
import DevTimeBanner from "../components/DevTimeBanner";
import Icon from "../components/Icon";
import LiveRefresh from "../components/LiveRefresh";
import { getNextTransitionAt, getSessionsAt } from "../lib/session-time";
import AgendaToolbar from "../agenda/_components/AgendaToolbar";
import DualTrackTimeline from "../agenda/_components/DualTrackTimeline";
import JumpToNow from "../agenda/_components/JumpToNow";
import SessionFocus from "../agenda/_components/SessionFocus";
import { groupByTimeSlot } from "../agenda/_lib/groupSessions";

type AgendaViewProps = {
  now: Date;
  simulated: string | null;
};

// Shared body for the Agenda page. The public `/agenda` renders this with
// `now = new Date()` and `simulated = null` so the page is statically
// prerendered (ISR every 10s) and feels instant on prefetch — same as `/`
// and `/exponentes`. `/dev/agenda` renders the same view with a simulated
// time from `?now=` for QA.
//
// Stage filtering (`?stage=main|escenario-2`) is preserved as a shareable
// URL but applied **client-side** by AgendaToolbar via DOM manipulation
// against the `data-stage-filter` attribute on the wrapper and the
// `data-stages` / `data-stage` attributes baked into each row/cell.
export default function AgendaView({ now, simulated }: AgendaViewProps) {
  const nextTransitionAt = getNextTransitionAt(now);

  const sortedSessions = getSessionsAt(now).sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
  const slots = groupByTimeSlot(sortedSessions);

  return (
    <main
      id="main"
      data-stage-filter="todo"
      className="flex-grow pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
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
          Cronograma Oficial · 14 MAYO 2026
        </span>
        <h1
          aria-label="Agenda de eventos"
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary"
        >
          AGENDA
          <br />
          DE EVENTOS
        </h1>
        <p className="mt-6 text-base sm:text-xl max-w-2xl font-medium text-on-surface-variant">
          Dos escenarios en paralelo. Main Stage y Escenario 2, lado a lado —
          una sola línea de tiempo para elegir en vivo qué charla te lleva a casa.
        </p>
      </section>

      {/* Toolbar (client) — wrapped in Suspense because it reads useSearchParams */}
      <Suspense fallback={<div className="mb-6 h-24 animate-pulse bg-surface-container-low" />}>
        <AgendaToolbar slots={slots} />
      </Suspense>

      {/* Logistics strip — lunch runs in parallel to talks (not in SESSIONS),
          so surface it once above the schedule as context rather than a card.
          Split into two bracelet-keyed windows: ROSA 11:30—12:30, AZUL
          12:30—13:30. Swatch colors are inlined arbitrary values (one-off
          functional indicators, not part of the Horizonte Cobalt palette);
          each window also carries the literal word "ROSA" / "AZUL" so the
          info is never communicated by color alone. */}
      <div className="mb-6 flex flex-col gap-2 sm:gap-3 border-l-4 border-secondary bg-surface-container-highest px-4 py-3 animate-fade-up">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="restaurant" size={16} className="text-secondary shrink-0" />
            <span className="label-meta font-bold text-secondary truncate">
              Almuerzo · Restaurante
            </span>
          </div>
          <span className="mono-data text-[11px] font-bold text-primary shrink-0">
            11:30 — 13:30
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span
            className="w-4 h-4 mt-0.5 shrink-0 bg-[#db2777]"
            aria-hidden="true"
          />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 flex-1 min-w-0">
            <span className="mono-data text-[11px] font-bold text-primary tracking-widest shrink-0">
              ROSA · 11:30 — 12:30
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Servicio en el Restaurante para participantes con
              brazalete color ROSA.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span
            className="w-4 h-4 mt-0.5 shrink-0 bg-[#2563eb]"
            aria-hidden="true"
          />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 flex-1 min-w-0">
            <span className="mono-data text-[11px] font-bold text-primary tracking-widest shrink-0">
              AZUL · 12:30 — 13:30
            </span>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              Servicio en el Restaurante para participantes con
              brazalete color AZUL.
            </p>
          </div>
        </div>
      </div>

      {/* Dual-track timeline — always renders all slots; stage filter is
          applied client-side via DOM manipulation by AgendaToolbar. */}
      <DualTrackTimeline slots={slots} />

      {/* Floating jump-to-now (client) */}
      <JumpToNow />

      {/* Deep-link focus: opens <details> + pulses the targeted session */}
      <SessionFocus />
    </main>
  );
}
