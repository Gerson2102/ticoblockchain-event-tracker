import type { ArrivalStat } from "../../data/types";

type ArrivalStatBandProps = {
  stats: readonly ArrivalStat[];
};

// 3-up hook band for the Cómo Llegar section. Mirrors the editorial
// pattern from the "Información Práctica" manifest (oversized mono hook,
// crimson-dotted label, prose body) so the spatial dossier inherits the
// same voice as the temporal one.
export default function ArrivalStatBand({ stats }: ArrivalStatBandProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-y-4 border-primary">
      {stats.map((stat, i) => (
        <div
          key={stat.id}
          className={[
            "p-6 sm:p-8 md:p-10 animate-fade-up",
            i > 0 ? "md:border-l-2 md:border-primary/20 border-t-2 md:border-t-0 border-primary/20" : "",
            `stagger-${Math.min(i + 1, 7)}`,
          ].join(" ")}
        >
          <div className="mono-data font-black uppercase tracking-tighter text-primary text-[clamp(2rem,5vw,3.75rem)] leading-[0.9] break-words">
            {stat.hook}
          </div>
          <div className="mono-data text-[11px] uppercase font-bold tracking-widest text-primary mt-4 flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 bg-secondary shrink-0"
              aria-hidden="true"
            />
            {stat.label}
          </div>
          <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mt-3 max-w-prose">
            {stat.body}
          </p>
        </div>
      ))}
    </div>
  );
}
