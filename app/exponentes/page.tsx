import type { Metadata } from "next";
import Image from "next/image";
import StatusBadge from "../components/StatusBadge";
import { SPEAKERS } from "../data/speakers";
import { stageLabel } from "../data/venue";

export const metadata: Metadata = {
  title: "Exponentes",
  description:
    "Conoce a los exponentes confirmados de TicoBlockchain 2026 — keynotes, paneles y charlas.",
};

export default function ExponentesPage() {
  return (
    <main id="main" className="pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 mb-16 border-b-2 border-primary pb-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1
            aria-label="Exponentes 2026"
            className="text-[10vw] md:text-[6vw] leading-[0.85] font-black uppercase font-display tracking-tighter text-primary animate-reveal-up"
          >
            EXPONENTES
            <br />
            <span className="text-secondary">2026</span>
          </h1>
          <div className="max-w-md mb-4 animate-fade-up stagger-3">
            <p className="mono-data text-xs uppercase tracking-widest text-on-surface-variant mb-2">
              ORDENADO POR PRÓXIMA APARICIÓN
            </p>
            <p className="text-primary font-medium leading-tight">
              La vanguardia del desarrollo blockchain en Latinoamérica. Mentes
              críticas, código puro y visión soberana.
            </p>
          </div>
        </div>
      </section>

      {/* Speakers Editorial Index */}
      <section className="px-0">
        {/* Table Header */}
        <div className="px-4 sm:px-6 grid grid-cols-12 gap-4 pb-4 border-b border-outline-variant items-center opacity-50 hidden md:grid animate-fade-in stagger-2">
          <div className="col-span-1 mono-data text-[10px] uppercase tracking-widest">
            Estado
          </div>
          <div className="col-span-5 mono-data text-[10px] uppercase tracking-widest">
            Exponente
          </div>
          <div className="col-span-4 mono-data text-[10px] uppercase tracking-widest">
            Charla
          </div>
          <div className="col-span-2 mono-data text-[10px] uppercase tracking-widest text-right">
            Horario
          </div>
        </div>

        {/* Speaker Rows */}
        {SPEAKERS.map((speaker, index) => (
          <div
            key={speaker.id}
            className={`group px-4 sm:px-6 py-10 border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-200 animate-fade-up stagger-${Math.min(index + 2, 7)}`}
          >
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
              <div className="col-span-12 md:col-span-1 mb-4 md:mb-0">
                <StatusBadge status={speaker.status} />
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center gap-4 sm:gap-6">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0 transition-all duration-500 relative overflow-hidden rounded-full ring-2 ring-primary/10 group-hover:ring-secondary ${
                    speaker.monochrome
                      ? "grayscale group-hover:grayscale-0"
                      : ""
                  }`}
                >
                  <Image
                    src={speaker.imageUrl}
                    alt={speaker.name}
                    fill
                    unoptimized={!speaker.imageUrl.startsWith("/")}
                    quality={90}
                    sizes="(min-width: 768px) 128px, (min-width: 640px) 96px, 80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black font-display tracking-tighter uppercase leading-none text-primary break-words">
                    {speaker.name}
                  </h2>
                  <p className="mono-data text-xs uppercase text-on-primary-container mt-1">
                    {speaker.org}
                  </p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight max-w-sm uppercase text-primary group-hover:translate-x-1 transition-transform duration-300">
                  {speaker.talk}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-2 text-left md:text-right">
                <p className="mono-data text-lg sm:text-2xl font-bold tracking-tighter text-primary">
                  {speaker.time}
                </p>
                <p className="mono-data text-[10px] uppercase opacity-60">
                  {stageLabel(speaker.stage)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

    </main>
  );
}
