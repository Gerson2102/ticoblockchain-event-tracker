"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "EN VIVO" },
  { href: "/agenda", label: "AGENDA" },
  { href: "/exponentes", label: "EXPONENTES" },
  { href: "/mapa", label: "MAPA" },
  { href: "/sponsors", label: "SPONSORS" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function isActive(link: (typeof navLinks)[number]) {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fbf9f5]">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">
        <Link
          href="/"
          className="text-lg sm:text-2xl font-black tracking-tighter text-[#000d33] font-headline uppercase"
        >
          TicoBlockchain 2026
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={
                isActive(link)
                  ? "text-[#ba002e] font-black border-b-4 border-[#ba002e] font-headline uppercase tracking-tight text-sm px-2 py-1"
                  : "text-[#000d33] font-bold hover:bg-[#002060] hover:text-white transition-colors duration-100 font-headline uppercase tracking-tight text-sm px-2 py-1"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="#registro"
            className="bg-[#002060] text-white px-4 py-3 sm:px-6 sm:py-2 text-xs sm:text-sm font-bold font-headline uppercase tracking-tight hover:opacity-90 transition-opacity min-h-[48px] flex items-center"
          >
            REGISTRO
          </Link>

          <button
            type="button"
            className="md:hidden min-w-[48px] min-h-[48px] flex items-center justify-center border-2 border-[#000d33] bg-transparent"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Menú de navegación"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="material-symbols-outlined text-[#000d33]">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden flex flex-col border-t-2 border-[#000d33] bg-[#fbf9f5] animate-menu-slide-down"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={
                isActive(link)
                  ? "px-6 py-4 border-b border-[#000d33]/10 font-headline font-black uppercase tracking-tight text-sm text-[#ba002e] bg-[#fbf9f5]"
                  : "px-6 py-4 border-b border-[#000d33]/10 font-headline font-bold uppercase tracking-tight text-sm text-[#000d33] hover:bg-[#002060] hover:text-white transition-colors duration-100"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
