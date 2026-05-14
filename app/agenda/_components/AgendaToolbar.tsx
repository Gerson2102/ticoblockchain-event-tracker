"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import Icon from "../../components/Icon";
import type { TimeSlot } from "../_lib/groupSessions";

type AgendaToolbarProps = {
  slots: readonly TimeSlot[];
};

const STAGES = [
  { id: "todo", label: "Todo", param: null as string | null },
  { id: "main", label: "Main Stage", param: "main" },
  { id: "escenario-2", label: "Escenario 2", param: "escenario-2" },
] as const;

type StageId = (typeof STAGES)[number]["id"];

const CATEGORIES = [
  { id: "keynote", label: "Keynote" },
  { id: "panel", label: "Panel" },
  { id: "talk", label: "Charla" },
  { id: "pitch", label: "Pitch" },
  { id: "workshop", label: "Workshop" },
] as const;

export default function AgendaToolbar({ slots }: AgendaToolbarProps) {
  const totalSlots = slots.length;
  const router = useRouter();
  const params = useSearchParams();
  const stageParam = params.get("stage");
  const urlStage: StageId =
    stageParam === "main" || stageParam === "escenario-2" ? stageParam : "todo";

  // Optimistic stage flips the active button instantly on click; the real URL
  // (and the DOM-driven filter sweep below) update in the background via a
  // transition. Even though /agenda is now statically rendered (no server
  // roundtrip for the stage filter), this keeps the button feedback ahead
  // of the next paint.
  const [activeStage, setOptimisticStage] = useOptimistic(urlStage);
  const [, startStageTransition] = useTransition();

  const handleStageClick = (id: StageId, param: string | null) => {
    if (id === activeStage) return;
    startStageTransition(() => {
      setOptimisticStage(id);
      router.replace(param ? `/agenda?stage=${param}` : "/agenda", {
        scroll: false,
      });
    });
  };

  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  // Pure derivation of the visible-slot count from filter inputs + slot data.
  // Mirrors the predicate the DOM-mutation effect below applies row-by-row,
  // so the "X de Y slots" label updates in render without us having to call
  // setState from the effect (which the react-hooks/set-state-in-effect rule
  // flags as a cascading render).
  const visibleCount = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let count = 0;
    for (const slot of slots) {
      const sessions = [slot.both, slot.main, slot.escenario2].filter(
        (s): s is NonNullable<typeof s> => s !== undefined,
      );
      const searchable = sessions
        .flatMap((s) => [s.title, s.speakerName, s.speakerOrg, s.description])
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const categories = sessions.map((s) => s.category);
      const stages = slot.both
        ? ["both"]
        : [
            slot.main ? "main" : null,
            slot.escenario2 ? "escenario-2" : null,
          ].filter((s): s is string => s !== null);

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory =
        activeCategories.size === 0 || categories.some((c) => activeCategories.has(c));
      const matchesStage =
        urlStage === "todo" || stages.includes("both") || stages.includes(urlStage);

      if (matchesQuery && matchesCategory && matchesStage) count++;
    }
    return count;
  }, [slots, query, activeCategories, urlStage]);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    // Drive CSS grid-template-columns collapse via the wrapper attribute.
    // CSS rules in globals.css read [data-stage-filter="main|escenario-2"]
    // and collapse [data-row-grid] / [data-header-grid] from 3 cols to 2.
    const wrapper = document.querySelector<HTMLElement>("[data-stage-filter]");
    if (wrapper) wrapper.setAttribute("data-stage-filter", urlStage);

    // Hide the non-matching column header when a single stage is active.
    const headers = document.querySelectorAll<HTMLElement>("[data-stage-header]");
    headers.forEach((header) => {
      const headerStage = header.getAttribute("data-stage-header");
      header.hidden = urlStage !== "todo" && headerStage !== urlStage;
    });

    const rows = document.querySelectorAll<HTMLElement>("[data-slot]");
    rows.forEach((row) => {
      const searchable = row.getAttribute("data-search") ?? "";
      const categories = (row.getAttribute("data-categories") ?? "").split(",");
      const stages = (row.getAttribute("data-stages") ?? "").split(",");
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory =
        activeCategories.size === 0 || categories.some((c) => activeCategories.has(c));
      // "both"-stage rows match any stage filter; otherwise the row must
      // have a session in the selected stage to remain visible.
      const matchesStage =
        urlStage === "todo" || stages.includes("both") || stages.includes(urlStage);
      row.hidden = !(matchesQuery && matchesCategory && matchesStage);

      // Cell-level filter: hide the stage cell whose category doesn't
      // match the active category set, and hide the stage cell that
      // doesn't match the active stage. Placeholder em-dash cells have
      // a `data-stage` but no `data-session-category` — they're skipped
      // by the category half (treated as "no category" → always passes)
      // and only hidden when the stage filter mismatches.
      const cells = row.querySelectorAll<HTMLElement>("[data-stage]");
      cells.forEach((cell) => {
        const cellStage = cell.getAttribute("data-stage");
        const cellCategory = cell.getAttribute("data-session-category") ?? "";
        const cellMatchesStage =
          urlStage === "todo" || !cellStage || cellStage === urlStage;
        const cellMatchesCategory =
          activeCategories.size === 0 || !cellCategory || activeCategories.has(cellCategory);
        cell.style.display = cellMatchesStage && cellMatchesCategory ? "" : "none";
      });
    });
  }, [query, activeCategories, urlStage]);

  const toggleCategory = (id: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearAll = () => {
    setQuery("");
    setActiveCategories(new Set());
  };

  const hasClientFilter = query.length > 0 || activeCategories.size > 0;

  return (
    <section aria-label="Filtros de agenda" className="mb-6 flex flex-col gap-5 animate-fade-up">
      {/* Stage filter — URL driven */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="label-meta text-on-surface-variant font-bold">
          Escenario
        </span>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => {
            const isActive = s.id === activeStage;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleStageClick(s.id, s.param)}
                aria-pressed={isActive}
                className={[
                  "inline-flex items-center px-4 py-2 min-h-[40px] label-meta text-[11px] font-bold border-2 transition-colors duration-200",
                  isActive
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-transparent text-primary border-primary/30 hover:border-primary hover:bg-surface-container-high",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category chips — client filter */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="label-meta text-on-surface-variant font-bold">
          Categoría
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = activeCategories.has(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCategory(c.id)}
                aria-pressed={active}
                className={[
                  "inline-flex items-center px-3 py-1.5 min-h-[36px] label-meta text-[11px] font-bold border-2 transition-colors duration-200",
                  active
                    ? "bg-secondary text-on-secondary border-secondary"
                    : "bg-transparent text-primary border-primary/20 hover:border-primary hover:bg-surface-container-high",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + count */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-grow max-w-md">
          <label htmlFor="agenda-search" className="sr-only">
            Buscar sesión o exponente
          </label>
          <Icon
            name="search"
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            id="agenda-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar exponente o charla..."
            className="w-full pl-10 pr-3 py-2.5 bg-surface-container-low border-2 border-primary/20 text-primary placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none label-meta text-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <span
            className="label-meta font-bold text-on-surface-variant"
            aria-live="polite"
          >
            {visibleCount} de {totalSlots} slots
          </span>
          {hasClientFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="label-meta font-bold text-secondary hover:text-primary underline underline-offset-2"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
