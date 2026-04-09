import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Exponentes — TicoBlockchain 2026",
  description: "Conoce a los exponentes de TicoBlockchain 2026",
};

const speakers = [
  {
    name: "Carlos Mendez",
    org: "Lead Architect @ Ethereum Foundation",
    talk: "Soberanía de Datos en la Era de L2: El Futuro de ZK-Rollups en LATAM",
    time: "10:00 — 10:45",
    room: "SALA PRINCIPAL A",
    status: "live" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZX5dueRZk_dLql5HtVAqeWVM9fUrrc3Zxc0Dz1VgD0Ksh1szN0IzkPRW-JFjIZH7XHjtSW5K9sTKRbzZsxA4l5x4GWfCxGRa2sVvUlQge8IQRi8M6WNK3mtGf2lWF5HyaF8B9_vMP5jNgppJ56udcrdZcG7niHjXt-g_mu7Yl2Wvrl49UZb0ucdzomY2hdQ4yM2CodsJnWHRlNGL3uxf7AGOM5_JLwKlEJx4tzuEe_S6QQHxItQhDCUWkTYO_JnN65puTo_7YXMw",
  },
  {
    name: "Elena Rodriguez",
    org: "Founder @ Solarpunk Finance",
    talk: "ReFi y Regeneración de Ecosistemas Tropicales vía Tokenización",
    time: "11:00 — 11:45",
    room: "SALA B - INNOVACIÓN",
    status: "next" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiipefm9FgmLvq0ikyF72wz6PVbHZyK7pgwX-8ScF_VoT7oSaNaAV_G2lk8KurgDobC9vjFeVPEtFxJRuJpPkwzLoEZT8w0ENP7UNC2aAjtYl8rEgZQdDnSCHdIK-5bwi2CgWXiSBajYiRK3SrdCnpE6V_UH-F239zdjKZFXpWEsyfg8df9_FYXuKX05L7K2PoykPmOCqs8o_acK5f2ifXRNpR42xWEz0NIgDdjreH1h8FGFWcS_qeld2NyB5VfQEt97HX_J3ddnM",
  },
  {
    name: "Marco Valerio",
    org: "CTO @ TicoNodes",
    talk: "Infraestructura Crítica: Nodos en el Istmo y Resiliencia Energética",
    time: "12:00 — 12:45",
    room: "AUDITORIO BARCELÓ",
    status: "scheduled" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9-JCtp8F0cgSj2KjRr100CkoH8_wiYW1f8vqcHDKHtufJVMhckuwZMQtOGRUHJBpRfMsr4mcGRBM_G_s1wUMmDosB1bYROWDAVvvwk-QNX1ILgz3u-LEBQ1yZ0YwBuz7vP83MTTwZRkddaqLhHsdDHzMxG7EIelpLWFCRD-fPGsLIVperWLFre4Blxz8mvl_1sLIIOZB6Vdkh_KLnEzZwLJNtw7SYSmGpTY4WtVYbsw6laelVmkvJuYfby3OSGbjXXgJx96oBrBM",
  },
  {
    name: "Sofia Alfaro",
    org: "Legal Counsel @ CryptoCR",
    talk: "Marco Legal 2026: Ley Cripto y Activos Digitales en Centroamérica",
    time: "14:00 — 14:45",
    room: "SALA C - REGULACIÓN",
    status: "scheduled" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCihZQQz0UI-YiU2HidlxlndNs8vDvdDovdrPvukFAigl7kCDRd9J8XYv355pSWjR1SFT3DAzURCcrP7Jom4_Qf4T3qOfNaMqEyDjMZmlESQZlsdVrQQwsd1BvkF-JZXrr65xdfLoY5ckRR5evfNN0V4eOCIxGIsvFl7rG5jnuC8ruB1egcq0un8pBIu1xEOwrFcmV1qz0Xy76ZZ5wJ_9az4zAEnbVdVsWPyZjj9TbBvqG5F2mlLRBgwRUihTJNkyk4tV6G-eHhvw0",
  },
  {
    name: "Andres Mora",
    org: "Creative Director @ Metahuman",
    talk: "Diseño de Experiencias On-chain: De Billeteras a Metaversos",
    time: "15:00 — 15:45",
    room: "SALA B - INNOVACIÓN",
    status: "scheduled" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAuRImHGJbqTn-MiEgbcaDQRJNIdFY8gtECGQ-1McEioSLXmUNyxOgVcfYcc5Kr1adw4YEGcdqejpvEJ64nAIX_kTmXyjYAxShH7jRnZbQkWp6xM6K6JqyhNotKCz2rp7SlIliBXjPOlhDDoM_9lVnpt5Y4fZORBtFg9rhH002yl94OKclUElV-TE88V7pNbTJJ_2W4UFkBEk2W6Y3W3uxcrGbRDYNMWLHlrq9Nth3ra5HjM3av2Qk8oaQRdokIwmUQRRYOt08LqXw",
  },
];

function StatusBadge({ status }: { status: "live" | "next" | "scheduled" }) {
  if (status === "live") {
    return (
      <span className="bg-secondary text-white mono-data text-[10px] px-2 py-1 font-bold animate-live-glow">
        EN VIVO
      </span>
    );
  }
  if (status === "next") {
    return (
      <span className="bg-primary text-white mono-data text-[10px] px-2 py-1 font-bold">
        SIGUIENTE
      </span>
    );
  }
  return (
    <span className="border-2 border-primary text-primary mono-data text-[10px] px-2 py-1 font-bold">
      PROGRAMADO
    </span>
  );
}

const staggerClasses = [
  "stagger-2",
  "stagger-3",
  "stagger-4",
  "stagger-5",
  "stagger-6",
];

export default function ExponentesPage() {
  return (
    <main id="main" className="pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 mb-16 border-b-2 border-primary pb-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="text-[10vw] md:text-[6vw] leading-[0.85] font-black uppercase font-headline tracking-tighter text-primary animate-reveal-up">
            EXPONENTES
            <br />
            <span className="text-secondary">2026</span>
          </h1>
          <div className="max-w-md mb-4 animate-fade-up stagger-3">
            <p className="mono-data text-xs uppercase tracking-widest text-on-surface-variant mb-2">
              ORDENADO POR PR&Oacute;XIMA APARICI&Oacute;N
            </p>
            <p className="text-primary font-medium leading-tight">
              La vanguardia del desarrollo blockchain en Latinoam&eacute;rica.
              Mentes cr&iacute;ticas, c&oacute;digo puro y visi&oacute;n
              soberana.
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
        {speakers.map((speaker, index) => (
          <div
            key={speaker.name}
            className={`group px-4 sm:px-6 py-10 border-b border-outline-variant hover:bg-surface-container-low transition-colors duration-200 animate-fade-up ${staggerClasses[index]}`}
          >
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
              <div className="col-span-12 md:col-span-1 mb-4 md:mb-0">
                <StatusBadge status={speaker.status} />
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 relative overflow-hidden">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(min-width: 768px) 96px, (min-width: 640px) 80px, 64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 border-l-4 border-transparent group-hover:border-secondary transition-colors duration-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black font-headline tracking-tighter uppercase leading-none text-primary">
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
                  {speaker.room}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-20 px-4 sm:px-6 animate-fade-up stagger-7">
        <div className="bg-primary p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase font-headline tracking-tighter mb-6">
            &iquest;QUIERES SER PARTE DEL PANEL?
          </h2>
          <p className="text-on-primary-container max-w-2xl mx-auto mb-10 text-lg">
            La convocatoria para rel&aacute;mpagos (lightning talks) sigue
            abierta para desarrolladores locales.
          </p>
          <button className="bg-secondary text-white px-6 py-3 sm:px-10 sm:py-4 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-200 btn-shine min-h-[48px]">
            APLICAR AHORA
          </button>
        </div>
      </section>
    </main>
  );
}
