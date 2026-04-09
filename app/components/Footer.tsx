import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#000d33] text-[#fbf9f5] w-full py-6 sm:py-8 px-4 sm:px-6 mt-auto flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
      <div className="text-lg font-bold text-[#fbf9f5] font-headline uppercase tracking-tight">
        TICOBLOCKCHAIN 2026
      </div>
      <div className="mono-data text-xs uppercase tracking-widest opacity-80">
        &copy; 2026 TICOBLOCKCHAIN | HOTEL BARCEL&Oacute; SAN JOS&Eacute;
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <Link
          href="#"
          className="mono-data text-xs uppercase tracking-widest text-[#fbf9f5] opacity-80 hover:text-[#ba002e] transition-colors"
        >
          PRIVACIDAD
        </Link>
        <Link
          href="#"
          className="mono-data text-xs uppercase tracking-widest text-[#fbf9f5] opacity-80 hover:text-[#ba002e] transition-colors"
        >
          CONTACTO
        </Link>
        <Link
          href="#"
          className="mono-data text-xs uppercase tracking-widest text-[#fbf9f5] opacity-80 hover:text-[#ba002e] transition-colors"
        >
          PRENSA
        </Link>
      </div>
    </footer>
  );
}
