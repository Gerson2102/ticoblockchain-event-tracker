import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agenda — TicoBlockchain 2026",
  description: "Cronograma oficial de TicoBlockchain 2026",
};

export default function AgendaPage() {
  return (
    <main
      id="main"
      className="flex-grow pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full"
    >
      {/* Hero Section Header */}
      <section className="mb-16 border-l-8 border-primary pl-6 pt-8 animate-slide-left">
        <span className="mono-data text-secondary font-bold tracking-widest text-sm uppercase">
          Cronograma Oficial
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mt-2 font-headline text-primary">
          AGENDA
          <br />
          DE EVENTOS
        </h1>
        <p className="mt-6 text-base sm:text-xl max-w-2xl font-medium text-on-surface-variant">
          Explora el futuro de Web3 en Costa Rica. Sesiones de alto impacto,
          talleres t&eacute;cnicos y networking de &eacute;lite.
        </p>
      </section>

      {/* Vertical Timeline Agenda */}
      <section className="relative overflow-hidden">
        {/* Header for the list */}
        <div className="hidden md:flex border-b-2 border-primary pb-4 mb-4 font-headline font-bold uppercase text-xs tracking-widest opacity-50">
          <div className="w-24 shrink-0">Hora</div>
          <div className="flex-grow ml-12">Sesi&oacute;n y Exponente</div>
          <div className="w-48 shrink-0 text-right">Ubicaci&oacute;n</div>
        </div>

        {/* List Content */}
        <div className="flex flex-col">
          {/* Past Item 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-8 opacity-40 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-1">
            <div className="w-auto md:w-24 mono-data text-lg sm:text-xl font-bold">08:00</div>
            <div className="flex-grow md:ml-12">
              <div className="font-headline text-2xl font-bold uppercase tracking-tight">
                Registro y Caf&eacute; de Bienvenida
              </div>
              <div className="text-on-surface-variant font-medium mt-1 uppercase text-sm tracking-wide">
                Equipo TicoBlockchain
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Lobby Principal
              </span>
            </div>
          </div>

          {/* Past Item 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-8 opacity-40 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-2">
            <div className="w-auto md:w-24 mono-data text-lg sm:text-xl font-bold">09:00</div>
            <div className="flex-grow md:ml-12">
              <div className="font-headline text-2xl font-bold uppercase tracking-tight">
                Keynote: El Estado de Cripto en LATAM
              </div>
              <div className="text-on-surface-variant font-medium mt-1 uppercase text-sm tracking-wide">
                Elena Rodriguez &mdash; CEO Global
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Gran Sal&oacute;n A
              </span>
            </div>
          </div>

          {/* ACTIVE ITEM */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-10 bg-surface-container-low border-l-4 border-secondary animate-border-breathe -mx-4 px-4 sm:-mx-6 sm:px-6 relative group animate-fade-up stagger-3">
            <div className="w-auto md:w-24 mono-data text-2xl font-black text-secondary">
              10:30
            </div>
            <div className="flex-grow md:ml-12">
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-secondary text-white mono-data text-[10px] font-bold px-2 py-0.5 uppercase animate-live-glow">
                  ahora
                </span>
              </div>
              <div className="font-headline text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-primary">
                De-Fi Profundo: Protocolos de Pr&oacute;xima Generaci&oacute;n
              </div>
              <div className="text-primary font-bold mt-1 uppercase text-sm tracking-widest">
                Marco Sol&iacute;s &mdash; CTO Soluciones Blockchain
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-secondary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Auditorio B
              </span>
            </div>
          </div>

          {/* Future Item 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-8 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-4">
            <div className="w-auto md:w-24 mono-data text-lg sm:text-xl font-bold">12:00</div>
            <div className="flex-grow md:ml-12">
              <div className="font-headline text-2xl font-bold uppercase tracking-tight">
                Almuerzo de Networking &amp; Workshop
              </div>
              <div className="text-on-surface-variant font-medium mt-1 uppercase text-sm tracking-wide">
                Comunidad Abierta
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Terraza Barcel&oacute;
              </span>
            </div>
          </div>

          {/* Future Item 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-8 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-5">
            <div className="w-auto md:w-24 mono-data text-lg sm:text-xl font-bold">14:00</div>
            <div className="flex-grow md:ml-12">
              <div className="font-headline text-2xl font-bold uppercase tracking-tight">
                Seguridad en Smart Contracts: Auditor&iacute;a Real
              </div>
              <div className="text-on-surface-variant font-medium mt-1 uppercase text-sm tracking-wide">
                Dra. Luc&iacute;a M&eacute;ndez &mdash; Auditora Lead
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Laboratorio 1
              </span>
            </div>
          </div>

          {/* Future Item 3 */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-8 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-6">
            <div className="w-auto md:w-24 mono-data text-lg sm:text-xl font-bold">15:30</div>
            <div className="flex-grow md:ml-12">
              <div className="font-headline text-2xl font-bold uppercase tracking-tight">
                Panel: El Futuro del Dinero Digital en CR
              </div>
              <div className="text-on-surface-variant font-medium mt-1 uppercase text-sm tracking-wide">
                Varios Panelistas Invitados
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Gran Sal&oacute;n A
              </span>
            </div>
          </div>

          {/* Future Item 4 */}
          <div className="flex flex-col md:flex-row items-start md:items-center py-8 hover:bg-surface-container-high transition-colors duration-200 group border-b-2 border-primary animate-fade-up stagger-7">
            <div className="w-auto md:w-24 mono-data text-lg sm:text-xl font-bold">17:00</div>
            <div className="flex-grow md:ml-12">
              <div className="font-headline text-2xl font-bold uppercase tracking-tight">
                Clausura y C&oacute;cteles
              </div>
              <div className="text-on-surface-variant font-medium mt-1 uppercase text-sm tracking-wide">
                Patrocinadores Platinum
              </div>
            </div>
            <div className="mt-4 md:mt-0 w-auto md:w-48 text-left md:text-right">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tighter">
                Lounge VIP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Visual Accent */}
      <aside className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        <div className="relative bg-primary-container p-8 text-on-primary min-h-[200px] sm:min-h-[300px] flex flex-col justify-end overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9Tmh4SB2EcX86Qgc6vqq441-Kusu1Uw6fHWGTN9RSWCh4_XXrBK-eYQNG3M9qS9gt_ik6aqj40Vr7Ke8zKRtJwscdfQpzTSxvxX-05AaesFfVAHiiMFmydT73zKvMqjHyE0yhDWmyYWpyrNUgWf0gIOh_DRCMWbiGLz_ubojXszEudaABlXsOuqq_WLnXIVQP2sS7CAvZgVECWG-OVz03EyHTrii3V6JYdRyYxKE7zB5sq4WpeJ10aXdPE-_rKxtE-SQtAIRTqtk"
            alt="Abstract digital blocks and light trails representing blockchain structure"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover mix-blend-overlay opacity-30"
          />
          <div className="relative z-10">
            <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-none mb-4">
              &iquest;Te perdiste algo?
            </h3>
            <p className="mono-data text-sm uppercase tracking-widest text-on-primary-container">
              Las grabaciones estar&aacute;n disponibles para todos los
              registrados 48h despu&eacute;s del cierre.
            </p>
          </div>
        </div>
        <div className="bg-surface-container-highest p-8 flex flex-col justify-between border-2 border-primary">
          <div>
            <h3 className="font-headline text-2xl font-bold uppercase mb-4 text-primary">
              Informaci&oacute;n de Sede
            </h3>
            <p className="text-on-surface-variant">
              Hotel Barcel&oacute; San Jos&eacute; Palacio. Ubicado
              estrat&eacute;gicamente cerca del centro de la capital.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/mapa"
              className="inline-flex items-center gap-2 font-headline font-bold uppercase border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all text-primary"
            >
              Ver Mapa Completo
              <span className="material-symbols-outlined">north_east</span>
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}
