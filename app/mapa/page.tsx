import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa — TicoBlockchain 2026",
  description: "Mapa del recinto de TicoBlockchain 2026",
};

export default function MapaPage() {
  return (
    <main id="main" className="pb-20">
      <section className="px-4 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 pt-8">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-headline font-black uppercase tracking-tighter text-primary animate-reveal-up">
            MAPA
          </h1>
          <div className="mt-4 md:mt-0 mono-data text-primary flex items-center gap-2">
            <span className="w-3 h-3 bg-secondary" />
            UBICACI&Oacute;N: HOTEL BARCEL&Oacute; SAN JOS&Eacute;
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-primary">
          {/* Map Controls / Legend */}
          <div className="lg:col-span-3 bg-primary text-white p-8 flex flex-col justify-between">
            <div>
              <p className="mono-data text-xs uppercase tracking-widest opacity-60 mb-8">
                Navegaci&oacute;n del recinto
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <span className="w-4 h-4 bg-primary-container border border-on-primary-container" />
                  <span className="font-headline font-bold uppercase">
                    SALA A: MAIN STAGE
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-4 h-4 bg-surface-variant" />
                  <span className="font-headline font-bold uppercase">
                    SALA B: WORKSHOPS
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-4 h-4 bg-white" />
                  <span className="font-headline font-bold uppercase">
                    SALA C: NETWORKING
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-8 sm:mt-12 bg-secondary p-3 sm:p-4 flex items-center gap-3">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontVariationSettings: `"FILL" 1` }}
              >
                location_on
              </span>
              <span className="font-headline font-black uppercase tracking-tight">
                Est&aacute;s aqu&iacute;
              </span>
            </div>
          </div>

          {/* Flat Floorplan Canvas */}
          <div className="lg:col-span-9 bg-surface-container-low min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative overflow-hidden p-8 flex items-center justify-center">
            <div className="w-full h-full max-w-4xl relative border-2 border-primary-container/20 min-h-[250px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px]">
              {/* Floorplan Grid Background */}
              <div className="absolute inset-0 bg-white grid grid-cols-6 grid-rows-6 opacity-40">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-b border-outline-variant/30"
                  />
                ))}
              </div>

              {/* Room A */}
              <div className="absolute top-10 left-10 w-2/3 h-1/2 bg-primary-container border-2 border-primary flex items-center justify-center">
                <span className="text-white font-headline font-black text-xl sm:text-2xl md:text-4xl uppercase opacity-20">
                  SALA A
                </span>
              </div>

              {/* Room B */}
              <div className="absolute bottom-10 left-10 w-1/3 h-1/3 bg-surface-variant border-2 border-primary flex items-center justify-center">
                <span className="text-primary font-headline font-black text-sm sm:text-lg md:text-2xl uppercase opacity-20">
                  SALA B
                </span>
              </div>

              {/* Room C */}
              <div className="absolute bottom-10 right-10 w-1/2 h-1/3 bg-white border-2 border-primary flex items-center justify-center">
                <span className="text-primary font-headline font-black text-sm sm:text-lg md:text-2xl uppercase opacity-20">
                  SALA C
                </span>
              </div>

              {/* The "You Are Here" Pin */}
              <div className="absolute top-1/2 right-1/4 flex flex-col items-center animate-pin-bounce">
                <div className="bg-secondary text-white px-3 py-1 mono-data text-[10px] uppercase mb-1 animate-live-glow">
                  Est&aacute;s aqu&iacute;
                </div>
                <span
                  className="material-symbols-outlined text-secondary text-3xl sm:text-4xl md:text-5xl"
                  style={{ fontVariationSettings: `"FILL" 1` }}
                >
                  location_on
                </span>
              </div>

              {/* Entrance */}
              <div className="absolute top-0 right-1/4 w-20 h-4 bg-primary" />
              <div className="absolute top-4 right-1/4 text-[8px] sm:text-[10px] mono-data uppercase tracking-tighter rotate-0 sm:-rotate-90 sm:origin-top-right">
                Entrada Principal
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
