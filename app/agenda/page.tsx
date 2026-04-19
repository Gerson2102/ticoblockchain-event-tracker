import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DevTimeBanner from "../components/DevTimeBanner";
import Icon from "../components/Icon";
import LiveRefresh from "../components/LiveRefresh";
import { resolveNow } from "../data/now";
import { getNextTransitionAt, getSessionsAt } from "../data/sessions";
import type { Stage } from "../data/types";
import AgendaToolbar from "./_components/AgendaToolbar";
import DualTrackTimeline from "./_components/DualTrackTimeline";
import JumpToNow from "./_components/JumpToNow";
import { groupByTimeSlot } from "./_lib/groupSessions";

// Dynamically rendered — consumes ?stage and ?now search params and serves
// time-derived session statuses on each request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Cronograma oficial de TicoBlockchain 2026. Main Stage y Escenario 2 · 14 de mayo 2026.",
};

type StageFilter = "todo" | "main" | "escenario-2";

function normalizeFilter(value: string | string[] | undefined): StageFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "main" || raw === "escenario-2") return raw;
  return "todo";
}

function matchesFilter(stage: Stage, filter: StageFilter): boolean {
  if (filter === "todo") return true;
  if (stage === "both") return true;
  return stage === filter;
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string | string[]; now?: string | string[] }>;
}) {
  const params = await searchParams;
  const activeFilter = normalizeFilter(params.stage);
  const { now, simulated } = resolveNow(params.now);
  const nextTransitionAt = getNextTransitionAt(now);

  const sortedSessions = getSessionsAt(now).sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
  const filteredSessions = sortedSessions.filter((s) =>
    matchesFilter(s.stage, activeFilter),
  );
  const slots = groupByTimeSlot(filteredSessions);

  return (
    <main
      id="main"
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
        <AgendaToolbar totalSlots={slots.length} />
      </Suspense>

      {/* Logistics strip — lunch runs in parallel to talks (not in SESSIONS),
          so surface it once above the schedule as context rather than a card. */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-l-4 border-secondary bg-surface-container-highest px-4 py-3 animate-fade-up">
        <div className="flex items-center gap-2 shrink-0">
          <Icon name="restaurant" size={16} className="text-secondary" />
          <span className="mono-data text-[10px] uppercase tracking-widest font-bold text-secondary">
            Almuerzo
          </span>
          <span className="mono-data text-[11px] font-bold text-primary">
            11:00 — 13:30
          </span>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant">
          Servicio continuo en el área de networking. Requiere tiquete incluido
          en tu registro.
        </p>
      </div>

      {/* Dual-track timeline */}
      {slots.length === 0 ? (
        <div className="border-t-2 border-primary border-b-2 py-16 px-6 text-center animate-fade-up">
          <div className="mono-data text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
            Sin resultados
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter text-primary mb-4">
            No hay sesiones
            <br />
            en este escenario
          </h3>
          <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
            El filtro actual no coincide con ninguna charla del cronograma.
          </p>
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-display font-bold uppercase tracking-widest text-xs btn-shine hover:bg-primary-container transition-colors duration-200 min-h-[48px]"
          >
            <Icon name="north_east" size={14} /> Ver toda la agenda
          </Link>
        </div>
      ) : (
        <DualTrackTimeline slots={slots} stageFilter={activeFilter} />
      )}

      {/* Floating jump-to-now (client) */}
      <JumpToNow />
    </main>
  );
}
