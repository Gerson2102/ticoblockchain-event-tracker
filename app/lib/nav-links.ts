// Shared site navigation. Used by the global NavBar and the 404 page's
// quick-links list — both must offer the same destinations in the same order.
export const NAV_LINKS = [
  { href: "/", label: "EN VIVO" },
  { href: "/agenda", label: "AGENDA" },
  { href: "/exponentes", label: "EXPONENTES" },
  { href: "/mapa", label: "MAPA" },
  { href: "/sponsors", label: "SPONSORS" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
