import type { Metadata } from "next";
import Link from "next/link";
import DevTimeBanner from "../components/DevTimeBanner";
import Icon from "../components/Icon";
import LiveRefresh from "../components/LiveRefresh";
import TimelineRow from "../components/TimelineRow";
import { resolveNow } from "../data/now";
import { getNextTransitionAt, getSessionsAt } from "../data/sessions";
import type { Stage } from "../data/types";

// Dynamically rendered — consumes ?stage and ?now search params and serves
// time-derived session statuses on each request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Cronograma oficial de TicoBlockchain 2026. Main Stage y Escenario 2 · 14 de mayo 2026.",
};

type StageFilter = "todo" | "main" | "escenario-2";

const FILTERS: ReadonlyArray<{ id: StageFilter; label: string }> = [
  { id: "todo", label: "TODO" },
  { id: "main", label: "MAIN STAGE" },
  { id: "escenario-2", label: "ESCENARIO 2" },
] as const;

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

  return (
    <main
      id="main"
      className="flex-grow pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
      <LiveRefresh
        nextTransitionAt={nextTransitionAt}
        simulated={simulated !== null}
      />
      {simulated && <DevTimeBanner simulated={simulated} />}
      {/* Hero Section Header */}
      <section className="mb-16 border-l-8 border-primary pl-6 pt-8 animate-slide-left">
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
          Dos escenarios en paralelo. Main Stage y Escenario 2, sesiones de alto
          impacto, talleres técnicos y networking de élite — todo en el Hotel
          Barceló San José.
        </p>
      </section>

      {/* Filter Chips */}
      <section className="mb-8 animate-fade-up">
        <div className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">
          Filtrar por escenario
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const isActive = f.id === activeFilter;
            const href = f.id === "todo" ? "/agenda" : `/agenda?stage=${f.id}`;
            const chipClasses = [
              "inline-flex items-center px-4 py-2 min-h-[44px] text-[11px] font-display font-bold uppercase tracking-widest border-2 transition-colors duration-200",
              isActive
                ? "bg-primary text-on-primary border-primary"
                : "bg-transparent text-primary border-primary/40 hover:border-primary hover:bg-surface-container-high",
            ].join(" ");
            return (
              <Link key={f.id} href={href} className={chipClasses}>
                {f.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Vertical Timeline Agenda */}
      <section className="relative overflow-hidden">
        {/* Header for the list */}
        <div className="hidden md:flex border-b-2 border-primary pb-4 mb-4 font-display font-bold uppercase text-xs tracking-widest opacity-50 pl-4">
          <div className="w-32 shrink-0">Hora</div>
          <div className="flex-grow ml-12">Sesión y Exponente</div>
          <div className="w-52 shrink-0 text-right">Escenario</div>
        </div>

        {/* List Content */}
        <div className="flex flex-col">
          {filteredSessions.map((session, i) => (
            <TimelineRow
              key={session.id}
              session={session}
              staggerClass={`stagger-${Math.min(i + 1, 7)}`}
              lastItem={i === filteredSessions.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Almuerzo Callout — overlaps talks so it sits outside the chronological flow */}
      <aside className="mt-16 bg-surface-container-highest p-6 sm:p-8 border-l-8 border-secondary animate-fade-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="mono-data text-[10px] uppercase tracking-widest text-secondary font-bold mb-2">
              Almuerzo de Networking
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter text-primary">
              11:00 — 13:30
            </h3>
            <p className="mt-2 text-on-surface-variant max-w-2xl">
              Servicio continuo en el área de networking durante la franja de
              Main Stage y Escenario 2. Requiere tiquete de almuerzo incluido en
              tu registro.
            </p>
          </div>
          <span className="mono-data text-xs uppercase font-bold bg-secondary text-on-secondary px-4 py-2 whitespace-nowrap">
            Con Tiquete
          </span>
        </div>
      </aside>

      {/* Venue Info */}
      <aside className="mt-24">
        <div className="bg-surface-container-highest p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-2 border-primary">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase mb-4 text-primary">
              Información de Sede
            </h3>
            <p className="text-on-surface-variant">
              Hotel Barceló San José Palacio. Ubicado estratégicamente cerca del
              centro de la capital.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/mapa"
              className="inline-flex items-center gap-2 font-display font-bold uppercase border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all text-primary"
            >
              Ver Mapa Completo
              <Icon name="north_east" size={20} />
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}
