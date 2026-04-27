"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, type NavLink } from "../lib/nav-links";
import Icon from "./Icon";

// Nav height is a three-site contract — Tailwind v4 JIT needs static class
// strings, so the raw `72px` is duplicated across the call sites below.
// When changing the height, update ALL THREE:
//   1. NAV_HEIGHT here (inner row height)
//   2. the backdrop's `top-[72px]` on the {menuOpen && <div />} further down
//   3. `pt-[72px]` in app/layout.tsx on the div wrapping {children}
// 72px fits a 44px min-h button + breathing room.
const NAV_HEIGHT = "h-[72px]";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Reset the mobile menu whenever the route changes — the canonical
  // "adjusting state during render" pattern (avoids cascading effect renders).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // While the mobile menu is open: ESC closes it, Tab cycles focus inside
  // the menu panel (simple trap), and focus is restored to the toggle
  // button on ESC so keyboard users don't lose their anchor.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function isActive(link: NavLink) {
    if (link.href === "/") return pathname === "/";
    return pathname.startsWith(link.href);
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface pt-[env(safe-area-inset-top)]">
      <div
        className={`flex items-center justify-between px-[max(1rem,env(safe-area-inset-left))] sm:px-[max(1.5rem,env(safe-area-inset-left))] ${NAV_HEIGHT}`}
      >
        {/* Logo. min-w-0 + truncate ensures the logo shrinks before the
            right cluster at narrow widths. The " 2026" suffix hides below
            sm so the default mark reads cleanly on 320px. */}
        <Link
          href="/"
          className="min-w-0 truncate text-sm sm:text-2xl font-black tracking-tighter text-primary font-display uppercase"
        >
          TicoBlockchain<span className="hidden sm:inline"> 2026</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className={
                isActive(link)
                  ? "text-secondary font-black border-b-4 border-secondary font-display uppercase tracking-tight text-sm px-2 py-1"
                  : "text-primary font-bold hover:bg-primary-container hover:text-on-primary transition-colors duration-100 font-display uppercase tracking-tight text-sm px-2 py-1"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="md:hidden shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-primary bg-transparent text-primary"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="Menú de navegación"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* Backdrop: covers everything below the fixed nav. Clicking closes
          the menu. Only rendered on mobile since the menu itself is md:hidden. */}
      {menuOpen && (
        <div
          className="md:hidden fixed left-0 right-0 bottom-0 bg-primary/40 z-40 animate-fade-in"
          style={{ top: "calc(72px + env(safe-area-inset-top))" }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {menuOpen && (
        <div
          id="mobile-nav"
          ref={menuRef}
          className="md:hidden flex flex-col border-t-2 border-primary bg-surface animate-menu-slide-down relative z-50"
        >
          {NAV_LINKS.map((link) => {
            const base =
              "px-6 py-4 min-h-[48px] flex items-center border-b border-primary/10 font-display uppercase tracking-tight text-sm";
            const variant = isActive(link)
              ? "font-black text-secondary bg-surface"
              : "font-bold text-primary hover:bg-primary-container hover:text-on-primary transition-colors duration-100";
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${base} ${variant}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
