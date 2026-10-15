import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // ?now= is a dev-only time-travel hook (see app/data/now.ts). If it
      // ever leaks into a shared URL, keep it out of the index so Google
      // doesn't crawl simulated states as canonical content.
      disallow: "/*?*now=",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
