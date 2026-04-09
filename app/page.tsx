import Image from "next/image";

export default function EnVivoPage() {
  return (
    <main id="main">
      {/* Live Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[819px] bg-primary overflow-hidden">
        {/* Hero Stream Side */}
        <div className="lg:col-span-9 relative flex flex-col justify-between p-5 sm:p-8 md:p-12 text-white">
          {/* Live Indicator */}
          <div className="flex items-center gap-3 animate-fade-up">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary animate-live-glow" />
            </span>
            <span className="mono-data text-sm font-bold tracking-widest uppercase">
              EN VIVO &middot; SAL&Oacute;N DIAMANTE
            </span>
          </div>

          {/* Main Speaker Name (Oversized Editorial) */}
          <div className="mt-12 md:mt-0">
            <h1 className="text-[clamp(2.5rem,12vw,12rem)] leading-[0.85] font-black uppercase tracking-tighter -ml-1 md:-ml-4 break-words font-headline animate-reveal-up stagger-1">
              ELENA
              <br />
              RODR&Iacute;GUEZ
            </h1>
            <div className="mt-8 flex items-baseline gap-4 border-l-4 border-secondary pl-6 animate-fade-up stagger-3">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-headline font-bold uppercase tracking-tight max-w-2xl">
                Futuro de DeFi en Centroam&eacute;rica
              </h2>
            </div>
          </div>

          {/* Progress & Metadata */}
          <div className="mt-8 sm:mt-12 md:mt-24 space-y-6 animate-fade-up stagger-4">
            <div className="w-full bg-white/10 h-1">
              <div className="bg-secondary h-full animate-progress-fill" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="mono-data text-sm uppercase tracking-wider text-white/60">
                PR&Oacute;XIMA EN ESTE SAL&Oacute;N: PANEL DE INVERSI&Oacute;N{" "}
                <span className="text-white font-bold ml-2">11:00</span>
              </div>
              <div className="flex gap-4">
                <button className="bg-secondary text-white px-6 py-3 sm:px-8 sm:py-4 font-headline font-bold uppercase tracking-widest text-xs flex items-center gap-2 btn-shine hover:scale-105 transition-transform duration-200 min-h-[48px]">
                  <span className="material-symbols-outlined text-sm">
                    play_arrow
                  </span>{" "}
                  VER STREAM
                </button>
              </div>
            </div>
          </div>

          {/* Background Image Layer */}
          <div className="absolute inset-0 z-[-1] opacity-20 mix-blend-overlay overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIy5fc4IZu6iNfnSyydLGICw_03Yg3dzAeY5crteyQMDNdOudnJKA_QGJHEOOZhdSJJrNAomLxeFVD-RU4h8xVJ8qT9QhsVg9ih5Mgah_1UxDpBpN7eKIZGkiHoc2yVhAz7DDdu1QWQssJsdO3VoLI4DvvEn9iX2gZK-_5feGPyx9uE1YK633syMYSZ8swh48QRH6n33TSYF-Vn1V4Km8ha9fDPG8h0qXb0sFnTAhmvSAKNptAHcFiDhxzu1EbJ55p0dFcrTBzZUE"
              alt="Abstract representation of blockchain data nodes and neural networks in deep blue tones"
              fill
              sizes="100vw"
              className="object-cover animate-hero-zoom"
              priority
            />
          </div>
        </div>

        {/* Other Rooms Sidebar */}
        <div className="lg:col-span-3 bg-surface-container-low p-5 sm:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-primary/10">
          <h3 className="font-headline font-black text-xl uppercase mb-8 flex items-center justify-between text-primary animate-fade-up stagger-2">
            OTRAS SALAS
            <span className="material-symbols-outlined">sensors</span>
          </h3>
          <div className="space-y-1">
            {/* Room Card 1 */}
            <div className="group bg-white p-6 border-b-4 border-primary hover:border-secondary transition-all duration-300 cursor-pointer hover-lift animate-fade-up stagger-3">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-live-glow" />
                <span className="mono-data text-[10px] uppercase font-bold tracking-widest">
                  SAL&Oacute;N ESMERALDA
                </span>
              </div>
              <h4 className="font-headline font-bold text-lg leading-tight mb-2 group-hover:text-secondary transition-colors duration-200 text-primary">
                ADOPCI&Oacute;N MASIVA DE WALLETS EN LATAM
              </h4>
              <div className="mono-data text-xs text-primary/60">
                CON RA&Uacute;L JIM&Eacute;NEZ
              </div>
            </div>
            {/* Room Card 2 */}
            <div className="group bg-white p-6 border-b-4 border-primary hover:border-secondary transition-all duration-300 cursor-pointer hover-lift animate-fade-up stagger-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary animate-live-glow" />
                <span className="mono-data text-[10px] uppercase font-bold tracking-widest">
                  SAL&Oacute;N RUB&Iacute;
                </span>
              </div>
              <h4 className="font-headline font-bold text-lg leading-tight mb-2 group-hover:text-secondary transition-colors duration-200 text-primary">
                SMART CONTRACTS Y SEGURIDAD JUR&Iacute;DICA
              </h4>
              <div className="mono-data text-xs text-primary/60">
                CON DRA. MAR&Iacute;A CASTRO
              </div>
            </div>
            {/* Room Card 3 (Future) */}
            <div className="bg-primary p-6 text-white animate-fade-up stagger-5">
              <div className="mono-data text-[10px] uppercase font-bold tracking-widest mb-4 text-white/60">
                TERRAZA VIP
              </div>
              <h4 className="font-headline font-bold text-lg leading-tight mb-2">
                NETWORKING &amp; COFFEE BREAK
              </h4>
              <div className="mono-data text-xs text-white/40 uppercase">
                TERMINA EN 15 MIN
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 animate-fade-in stagger-6">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGxXzNTUdPs-ZI74JVJCzaUkge2Y5ry5VeEZTilPT79U8GQv9C6Zn7Wbg8Mdl5hhkiC-NaYMSEk7IdYrln6YbNFPfDe0c75bWO9J0IoUK4UdHvrLONsRnfqyChuelyEChpyQeWY6I9BnG4yW2s7mGK-iLiXRjPE8T7VwoDQLnvWBn8Y366j7sYlj1x051n8C6B-yF04lAl3vt050j9Z4nfR0BXhwcCzvG2G2UZwb__k5jbD3N9S-4mrdoS9M6FmZygMswSQZ-z2BQ"
              alt="Conference networking area with modern furniture and high-tech displays"
              width={400}
              height={192}
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="w-full h-48 object-cover grayscale brightness-50 contrast-125 mb-4 hover:grayscale-0 transition-all duration-700"
            />
            <p className="font-headline font-bold text-xs uppercase tracking-tighter text-primary">
              ESTADO ACTUAL DEL EVENTO: 85% CAPACIDAD
            </p>
          </div>
        </div>
      </section>

      {/* Chronogram / Departure Board Section */}
      <section className="p-5 sm:p-8 md:p-12 lg:p-24 bg-surface">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary font-headline animate-slide-left">
            AGENDA
            <br />
            LIVE
          </h2>
          <div className="max-w-md animate-fade-up stagger-2">
            <p className="text-xl font-medium leading-tight text-primary">
              Sigue en tiempo real el flujo de conocimiento. TicoBlockchain 2026
              no se detiene.
            </p>
            <div className="mt-6 flex gap-4">
              <span className="bg-primary text-white px-3 py-1 mono-data text-[10px] uppercase font-bold tracking-widest">
                HOY: 24 MAYO
              </span>
              <span className="bg-surface-container-highest px-3 py-1 mono-data text-[10px] uppercase font-bold tracking-widest">
                GMT-6
              </span>
            </div>
          </div>
        </div>

        {/* The "Departure" List */}
        <div className="border-t-4 border-primary">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 py-8 items-center border-b border-primary/10 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-3 gap-2 md:gap-0">
            <div className="md:col-span-2 mono-data text-2xl font-bold tracking-tighter text-primary/40 group-hover:text-primary transition-colors duration-200">
              11:00
            </div>
            <div className="md:col-span-2">
              <span className="bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase mono-data">
                SALA DIAMANTE
              </span>
            </div>
            <div className="md:col-span-6">
              <h5 className="text-lg sm:text-2xl font-headline font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">
                Panel: Inversi&oacute;n Institucional en Web3
              </h5>
            </div>
            <div className="md:col-span-2 text-left md:text-right">
              <span className="bg-primary text-white px-4 py-1 text-[10px] font-bold uppercase mono-data">
                PROGRAMADO
              </span>
            </div>
          </div>

          {/* Row 2 (Active/Current) */}
          <div className="grid grid-cols-1 md:grid-cols-12 py-8 items-center border-b border-primary/10 bg-surface-container-high animate-fade-up stagger-4 gap-2 md:gap-0">
            <div className="md:col-span-2 mono-data text-2xl font-bold tracking-tighter text-secondary">
              AHORA
            </div>
            <div className="md:col-span-2">
              <span className="bg-secondary text-white px-3 py-1 text-[10px] font-bold uppercase mono-data animate-live-glow">
                SALA ESMERALDA
              </span>
            </div>
            <div className="md:col-span-6">
              <h5 className="text-lg sm:text-2xl font-headline font-black uppercase text-primary italic underline underline-offset-8 decoration-secondary decoration-4">
                Adopci&oacute;n Masiva de Wallets en LATAM
              </h5>
            </div>
            <div className="md:col-span-2 text-left md:text-right">
              <span className="bg-secondary text-white px-4 py-1 text-[10px] font-bold uppercase mono-data animate-live-glow">
                EN VIVO
              </span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 py-8 items-center border-b border-primary/10 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-5 gap-2 md:gap-0">
            <div className="md:col-span-2 mono-data text-2xl font-bold tracking-tighter text-primary/40 group-hover:text-primary transition-colors duration-200">
              11:45
            </div>
            <div className="md:col-span-2">
              <span className="bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase mono-data">
                SALA RUB&Iacute;
              </span>
            </div>
            <div className="md:col-span-6">
              <h5 className="text-lg sm:text-2xl font-headline font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">
                Tokenizaci&oacute;n de Bienes Ra&iacute;ces en el Caribe
              </h5>
            </div>
            <div className="md:col-span-2 text-left md:text-right">
              <span className="bg-primary text-white px-4 py-1 text-[10px] font-bold uppercase mono-data">
                PROGRAMADO
              </span>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-12 py-8 items-center border-b border-primary/10 hover:bg-surface-container-high transition-colors duration-200 group animate-fade-up stagger-6 gap-2 md:gap-0">
            <div className="md:col-span-2 mono-data text-2xl font-bold tracking-tighter text-primary/40 group-hover:text-primary transition-colors duration-200">
              12:30
            </div>
            <div className="md:col-span-2">
              <span className="bg-primary-fixed px-3 py-1 text-[10px] font-bold uppercase mono-data">
                COMEDOR PRINCIPAL
              </span>
            </div>
            <div className="md:col-span-6">
              <h5 className="text-lg sm:text-2xl font-headline font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">
                ALMUERZO &amp; NETWORKING LIBRE
              </h5>
            </div>
            <div className="md:col-span-2 text-left md:text-right">
              <span className="bg-primary-container text-white px-4 py-1 text-[10px] font-bold uppercase mono-data">
                RECESO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Highlights */}
      <section className="bg-primary p-5 sm:p-8 md:p-12 lg:p-24 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {/* Main Featured Post */}
          <div className="sm:col-span-2 md:col-span-2 md:row-span-2 bg-primary p-6 sm:p-8 md:p-12 flex flex-col justify-end min-h-[300px] sm:min-h-[400px] md:min-h-[500px] border border-white/10 animate-fade-up stagger-1">
            <div className="mono-data text-secondary font-bold text-xs uppercase tracking-widest mb-4">
              RECAPITULACI&Oacute;N
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-none font-headline">
              EL IMPACTO DE SOLANA EN LA REGI&Oacute;N
            </h3>
            <p className="text-white/60 mb-8 max-w-sm">
              Lee la transcripci&oacute;n completa de la charla inaugural de
              esta ma&ntilde;ana.
            </p>
            <button className="w-fit border-b-2 border-secondary text-white font-headline font-bold uppercase tracking-widest py-2 hover:bg-secondary transition-colors duration-200 px-2 btn-shine">
              LEER M&Aacute;S
            </button>
          </div>

          {/* Visual Block 1 */}
          <div className="sm:col-span-2 md:col-span-2 bg-primary relative overflow-hidden min-h-[180px] sm:min-h-[250px] border border-white/10 group animate-fade-in stagger-2">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrNF9u6khWOJZWMF-SNv8cbHmNm74mPu0TFfiuFrXhotadgRTXBnrV0wB8k1aFIHOkHEFLola__AKmU1hpM0EPJfrxyNHqcoTT_lCiPks_dISc-WYrUZWyCZPLrp35a_H54Vn1xuMNwBOc5DDH_qJNgxjxnOMp-NJhI8KSqbaJmM4razvayloPGMCS3Ndo6EiWu6kZdTXo4Q8YeMmO02Eh5BmQaTrQCOZHD3cSDCxqzZLxt4pBQlHDJwCBuQzVP7AhHDXuX3JOg-Q"
              alt="High-energy conference hall with massive screens and professional lighting"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute bottom-8 left-8">
              <span className="bg-white text-primary px-3 py-1 mono-data text-[10px] font-bold uppercase">
                GALER&Iacute;A LIVE
              </span>
            </div>
          </div>

          {/* Stats Block */}
          <div className="bg-[#002060] p-5 sm:p-8 border border-white/10 animate-fade-up stagger-3">
            <div className="text-4xl sm:text-6xl font-black text-secondary mono-data">
              +1.2K
            </div>
            <div className="mono-data text-xs uppercase text-white/60 mt-2">
              ASISTENTES VIRTUALES
            </div>
          </div>

          {/* Location Block */}
          <div className="bg-surface p-5 sm:p-8 border border-white/10 group cursor-pointer hover-lift animate-fade-up stagger-4">
            <div className="flex justify-between items-start mb-12">
              <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-colors duration-200">
                location_on
              </span>
              <span className="mono-data text-[10px] font-bold uppercase text-primary/40">
                UBICACI&Oacute;N
              </span>
            </div>
            <div className="text-xl font-headline font-bold text-primary uppercase">
              HOTEL BARCEL&Oacute; SAN JOS&Eacute;
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Editorial Callout */}
      <section className="bg-surface p-5 sm:p-8 md:p-12 lg:p-24 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-primary max-w-4xl mb-12 font-headline animate-fade-up stagger-1">
          &iquest;TE PERDISTE ALGUNA SESI&Oacute;N? RECIBE EL RESUMEN EJECUTIVO
          DIARIO.
        </h2>
        <form className="w-full max-w-xl flex flex-col md:flex-row items-end gap-4 animate-fade-up stagger-3">
          <div className="flex-grow w-full">
            <label className="block text-left mono-data text-[10px] font-bold uppercase text-primary/60 mb-2">
              DIRECCI&Oacute;N DE CORREO
            </label>
            <input
              className="w-full bg-transparent border-b-2 border-primary focus:border-secondary transition-colors duration-200 py-4 outline-none font-headline font-bold uppercase"
              placeholder="TU@EMAIL.COM"
              type="email"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-4 sm:px-12 sm:py-5 font-headline font-bold uppercase tracking-widest text-sm w-full md:w-auto hover:bg-[#002060] transition-colors duration-200 btn-shine min-h-[48px]"
          >
            SUSCRIBIRSE
          </button>
        </form>
      </section>
    </main>
  );
}
