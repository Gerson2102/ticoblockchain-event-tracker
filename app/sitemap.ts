import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/url";

// Resolved at build time. Bumps automatically on every deploy so crawlers
// see fresh signals when the agenda or speaker roster changes — no need to
// remember to edit a constant by hand.
const LAST_UPDATED = new Date();

type Route = {
  path: string;
  priority: number;
};

const ROUTES: readonly Route[] = [
  { path: "/", priority: 1.0 },
  { path: "/agenda", priority: 0.9 },
  { path: "/exponentes", priority: 0.8 },
  { path: "/mapa", priority: 0.6 },
  { path: "/sponsors", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_UPDATED,
    priority,
  }));
}
