"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "../../components/Icon";

type AgendaToolbarProps = {
  totalSlots: number;
};

const STAGES = [
  { id: "todo", label: "Todo", param: null as string | null },
  { id: "main", label: "Main Stage", param: "main" },
  { id: "escenario-2", label: "Escenario 2", param: "escenario-2" },
] as const;

const CATEGORIES = [
  { id: "keynote", label: "Keynote" },
  { id: "panel", label: "Panel" },
  { id: "pitch", label: "Pitch" },
  { id: "workshop", label: "Workshop" },
  { id: "sponsor-slot", label: "Sponsor" },
] as const;

export default function AgendaToolbar({ totalSlots }: AgendaToolbarProps) {
  const params = useSearchParams();
  const stageParam = params.get("stage");
  const activeStage = stageParam === "main" || stageParam === "escenario-2" ? stageParam : "todo";

  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(totalSlots);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const rows = document.querySelectorAll<HTMLElement>("[data-slot]");
    let visible = 0;
    rows.forEach((row) => {
      const searchable = row.getAttribute("data-search") ?? "";
      const categories = (row.getAttribute("data-categories") ?? "").split(",");
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory =
        activeCategories.size === 0 || categories.some((c) => activeCategories.has(c));
      const isVisible = matchesQuery && matchesCategory;
      row.hidden = !isVisible;
      if (isVisible) visible++;
    });
    setVisibleCount(visible);
  }, [query, activeCategories]);

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
        <span className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
          Escenario
        </span>
        <div className="flex flex-wrap gap-2">
          {STAGES.map((s) => {
            const href = s.param ? `/agenda?stage=${s.param}` : "/agenda";
            const isActive = s.id === activeStage;
            return (
              <Link
                key={s.id}
                href={href}
                className={[
                  "inline-flex items-center px-4 py-2 min-h-[40px] mono-data text-[11px] font-bold uppercase tracking-widest border-2 transition-colors duration-200",
                  isActive
                    ? "bg-primary text-on-primary border-primary"
                    : "bg-transparent text-primary border-primary/30 hover:border-primary hover:bg-surface-container-high",
                ].join(" ")}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Category chips — client filter */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="mono-data text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
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
                  "inline-flex items-center px-3 py-1.5 min-h-[36px] mono-data text-[11px] font-bold uppercase tracking-widest border-2 transition-colors duration-200",
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
            className="w-full pl-10 pr-3 py-2.5 bg-surface-container-low border-2 border-primary/20 text-primary placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none mono-data text-xs uppercase tracking-widest"
          />
        </div>

        <div className="flex items-center gap-3">
          <span
            className="mono-data text-[10px] uppercase tracking-widest font-bold text-on-surface-variant"
            aria-live="polite"
          >
            {visibleCount} de {totalSlots} slots
          </span>
          {hasClientFilter && (
            <button
              type="button"
              onClick={clearAll}
              className="mono-data text-[10px] uppercase tracking-widest font-bold text-secondary hover:text-primary underline underline-offset-2"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
