import type { Metadata } from "next";
import { SPEAKERS } from "../data/speakers";
import SpeakerCard from "./_components/SpeakerCard";
import { groupAppearances } from "./_lib/groupSpeakers";

export const metadata: Metadata = {
  title: "Exponentes",
  description:
    "Conoce a los exponentes confirmados de TicoBlockchain 2026 — keynotes, paneles y charlas.",
};

export default function ExponentesPage() {
  const appearances = groupAppearances(SPEAKERS);
  const totalSpeakers = SPEAKERS.length;
  const panelCount = appearances.filter((a) => a.kind === "panel").length;

  return (
    <main id="main" className="pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Hero */}
      <section className="mb-10 border-l-8 border-primary pl-6 pt-8 animate-slide-left">
        <span className="mono-data text-secondary font-bold tracking-widest text-sm uppercase">
          Cartelera Oficial · 14 MAYO 2026
        </span>
        <h1
          aria-label="Exponentes 2026"
          className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary"
        >
          EXPONENTES
          <br />
          <span className="text-secondary">2026</span>
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 mono-data text-[10px] uppercase tracking-widest font-bold">
          <span className="bg-primary text-on-primary px-3 py-1">
            {totalSpeakers} voces
          </span>
          <span className="bg-surface-container-highest text-primary px-3 py-1">
            {panelCount} paneles
          </span>
          <span className="bg-surface-container-highest text-primary px-3 py-1">
            2 escenarios
          </span>
        </div>
        <p className="mt-5 text-base sm:text-lg max-w-2xl font-medium text-on-surface-variant">
          Las personas que van a tomar el micrófono el 14 de mayo. Ordenadas por
          próxima aparición.
        </p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {appearances.map((appearance, i) => {
          const key =
            appearance.kind === "solo"
              ? appearance.speaker.id
              : appearance.speakers.map((s) => s.id).join("+");
          return (
            <SpeakerCard
              key={key}
              appearance={appearance}
              staggerClass={`stagger-${Math.min(i + 1, 7)}`}
            />
          );
        })}
      </div>
    </main>
  );
}
