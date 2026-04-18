import Image from "next/image";
import Link from "next/link";
import { HERO_CONTENT } from "../../data/home-content";
import Icon from "../Icon";

type HeroAfterProps = {
  totalSessions: number;
};

// Post-event gratitude hero. Keeps the dark cobalt hero vocabulary so the
// post-event landing feels like a conclusion to the same brand arc rather
// than a neutral archive page.
export default function HeroAfter({ totalSessions }: HeroAfterProps) {
  return (
    <section className="relative min-h-[60dvh] sm:min-h-[70dvh] lg:min-h-[85dvh] bg-primary overflow-hidden flex flex-col items-center justify-center text-center p-5 sm:p-8 md:p-12 lg:p-24 text-on-primary">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12">
        <div className="flex items-center gap-3 animate-fade-up">
          <span className="w-2 h-2 bg-secondary" />
          <span className="mono-data text-sm font-bold tracking-widest uppercase">
            EDICIÓN 2026 · FINALIZADA
          </span>
        </div>

        <h1 className="text-[clamp(3rem,14vw,14rem)] leading-[0.85] font-black uppercase tracking-tighter break-words font-display animate-reveal-up stagger-1">
          GRACIAS
          <br />
          <span className="text-secondary">SAN JOSÉ</span>
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-bold uppercase tracking-tight max-w-3xl animate-fade-up stagger-3">
          La transmisión del 14 de mayo cerró el telón.
        </h2>

        <div className="grid grid-cols-3 gap-0 border-y-2 border-on-primary/20 w-full max-w-3xl animate-fade-up stagger-4">
          <div className="py-4 px-2 border-r border-on-primary/20">
            <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
              Charlas
            </div>
            <div className="mono-data text-2xl sm:text-4xl font-black text-on-primary tracking-tighter">
              {totalSessions}
            </div>
          </div>
          <div className="py-4 px-2 border-r border-on-primary/20">
            <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
              Escenarios
            </div>
            <div className="mono-data text-2xl sm:text-4xl font-black text-on-primary tracking-tighter">
              02
            </div>
          </div>
          <div className="py-4 px-2">
            <div className="mono-data text-[10px] uppercase tracking-widest text-on-primary/50 mb-1">
              Edición
            </div>
            <div className="mono-data text-2xl sm:text-4xl font-black text-on-primary tracking-tighter">
              2026
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center animate-fade-up stagger-5">
          <Link
            href="/agenda"
            className="bg-secondary text-on-secondary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]"
          >
            <Icon name="north_east" size={14} /> REVIVE LA AGENDA
          </Link>
          <Link
            href="/exponentes"
            className="border-2 border-on-primary text-on-primary px-6 py-3 sm:px-8 sm:py-4 font-display font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2 hover:bg-on-primary hover:text-primary transition-colors duration-200 min-h-[48px]"
          >
            VER EXPONENTES
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 z-[-1] opacity-15 mix-blend-overlay overflow-hidden">
        <Image
          src={HERO_CONTENT.heroImageUrl}
          alt={HERO_CONTENT.heroImageAlt}
          fill
          sizes="100vw"
          className="object-cover animate-hero-zoom"
          priority
        />
      </div>
    </section>
  );
}
