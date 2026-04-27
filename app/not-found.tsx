import type { Metadata } from "next";
import Link from "next/link";
import { NAV_LINKS } from "./lib/nav-links";

export const metadata: Metadata = {
  title: "404 · Página no encontrada",
  description:
    "La página que buscas no existe en el sitio oficial de TicoBlockchain 2026.",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex-grow px-4 sm:px-6 md:px-12 py-20 max-w-5xl mx-auto w-full"
    >
      <section className="border-l-8 border-primary pl-6 animate-slide-left">
        <span className="mono-data text-secondary font-bold tracking-widest text-xs uppercase">
          Error 404 · Fuera de ruta
        </span>
        <h1 className="text-[15vw] md:text-[12rem] font-black uppercase tracking-tighter leading-none mt-2 font-display text-primary">
          404
        </h1>
        <p className="mt-2 text-2xl sm:text-4xl font-display font-black uppercase text-primary tracking-tighter">
          Esta sala no existe
        </p>
        <p className="mt-4 text-base sm:text-xl max-w-2xl font-medium text-on-surface-variant">
          La URL que escribiste no aparece en el cronograma oficial. Vuelve al
          inicio o salta directo a una sección del evento.
        </p>
      </section>

      <section className="mt-16 border-t-4 border-primary">
        <ul className="flex flex-col divide-y divide-primary/10">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 hover:bg-surface-container-high transition-colors duration-200"
              >
                <span className="mono-data text-sm font-bold text-primary/40 w-12">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter text-primary group-hover:translate-x-2 transition-transform duration-300">
                  {link.label}
                </span>
                <span className="mono-data text-xs uppercase tracking-widest text-primary/40 group-hover:text-secondary transition-colors duration-200">
                  Ir →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
