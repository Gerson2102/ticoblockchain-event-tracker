import { VENUE_DIRECTIONS } from "../data/home-content";
import { SPEAKERS } from "../data/speakers";
import { VENUE } from "../data/venue";
import { EVENT_END_HHMM, EVENT_START_HHMM } from "../lib/session-time";
import { SITE_URL } from "../lib/url";

// Event window in America/Costa_Rica (UTC-6, no DST), from the first session
// start to the last session end — Google uses these for the SERP event card.
const START_ISO = `${VENUE.eventDateISO}T${EVENT_START_HHMM}:00-06:00`;
const END_ISO = `${VENUE.eventDateISO}T${EVENT_END_HHMM}:00-06:00`;

// Server-rendered JSON-LD for the conference. Emitted as a <script> tag
// inside the home page so Google's Event rich result + AI search engines
// have a canonical, machine-readable description of TicoBlockchain 2026.
//
// Validate at: https://search.google.com/test/rich-results
export default function EventJsonLd() {
  const performers = SPEAKERS.map((speaker) => ({
    "@type": "Person",
    name: speaker.name,
    jobTitle: speaker.org,
    image: speaker.imageUrl,
  }));

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "BusinessEvent",
    name: "TicoBlockchain 2026",
    description:
      "Evento blockchain anual de Costa Rica. Charlas, paneles y workshops sobre Web3, fintech, regulación y RWA en dos escenarios paralelos.",
    startDate: START_ISO,
    endDate: END_ISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "es-CR",
    url: SITE_URL,
    // Resolves to the route registered by app/opengraph-image.tsx, which
    // returns image/png at 1200×630 — within Google's required dimensions
    // for Event rich results. No `.png` suffix: Next.js's file-based
    // metadata route is registered at `/opengraph-image` (verified against
    // the prerendered <meta property="og:image"> output).
    image: `${SITE_URL}/opengraph-image`,
    location: {
      "@type": "Place",
      name: VENUE_DIRECTIONS.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Robledal de La Uruca",
        addressLocality: "San José",
        postalCode: "1150",
        addressRegion: "San José",
        addressCountry: "CR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: VENUE_DIRECTIONS.gps.lat,
        longitude: VENUE_DIRECTIONS.gps.lng,
      },
      hasMap: VENUE_DIRECTIONS.mapsUrl,
    },
    organizer: {
      "@type": "Organization",
      name: "TicoBlockchain",
      url: SITE_URL,
    },
    performer: performers,
  };

  // Defense-in-depth: even though the schema is built from typed const data
  // we control, escaping `<` to its unicode form prevents any future string
  // (a speaker name, an org with markup, etc.) containing `</script>` from
  // breaking out of the script tag. JSON.parse on the receiver decodes the
  // escape transparently.
  const json = JSON.stringify(eventLd).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
