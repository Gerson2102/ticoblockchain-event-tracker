// Inline SVG icon set. Replaces the Material Symbols Outlined font that
// previously loaded from Google's CDN via a manual <link>. Using inline
// SVGs here removes an external network request, ships only the ~13
// glyphs we actually use, and lets icons inherit currentColor cleanly.
//
// Paths follow the Material Symbols 24x24 geometry so the visual voice
// of the map/legend/filters is preserved exactly.

import type { SVGProps } from "react";

export type IconName =
  | "close"
  | "menu"
  | "north_east"
  | "sensors"
  | "play_arrow"
  | "location_on"
  | "campaign"
  | "storefront"
  | "table_bar"
  | "how_to_reg"
  | "restaurant"
  | "wc"
  | "door_front"
  | "content_copy"
  | "check"
  | "arrow_forward"
  | "search"
  | "my_location";

// All paths use fill="currentColor" so the icon tints via CSS `color`.
// Exported so SVG contexts (see FloorplanSVG) can render the same glyphs
// inline without needing to mount the Icon component itself.
export const ICON_PATHS: Record<IconName, string> = {
  close:
    "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  menu: "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z",
  north_east: "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z",
  // Concentric broadcast rings around a solid dot.
  sensors:
    "M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM7.76 7.76 6.34 6.34a8 8 0 0 0 0 11.32l1.42-1.42a6 6 0 0 1 0-8.48zm8.48 0a6 6 0 0 1 0 8.48l1.42 1.42a8 8 0 0 0 0-11.32l-1.42 1.42zM12 2a10 10 0 0 0-7.07 17.07l1.42-1.42a8 8 0 1 1 11.31 0l1.41 1.41A10 10 0 0 0 12 2z",
  play_arrow: "M8 5v14l11-7z",
  location_on:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
  // Megaphone (campaign) — filled variant.
  campaign:
    "M18 11V4l-7 4H7a3 3 0 0 0 0 6v3h2v-3h2l7 4v-7zm2-3v6h-1V8h1z",
  // Storefront — awning with window.
  storefront:
    "M21 4H3v2h18V4zm1 8v-2l-1-5H3L2 10v2h1v7h10v-7h4v7h2v-7h1zM11 17H5v-5h6v5z",
  // Small pedestal table.
  table_bar:
    "M4 6h16v2h-3v5h3v2h-7v6h-2v-6H4v-2h3V8H4V6zm5 2v5h6V8H9z",
  // Person + check — stylized.
  how_to_reg:
    "M10 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm7.88 8.41L16.46 13l-3.54 3.54-1.42-1.41L10.08 16.54l2.84 2.83 4.96-4.96zM10 14a11 11 0 0 0-8 3.33V20h9.5v-2H4v-.65A9 9 0 0 1 10 16z",
  // Fork + knife.
  restaurant:
    "M11 9V2H9v7H7V2H5v7a4 4 0 0 0 3 3.86V22h2v-9.14A4 4 0 0 0 13 9V2h-2v7zm5-7v10h2.5v10H21V2h-5z",
  // W C lettering — standard pictogram simplified.
  wc: "M4 8h2l1 5 1-5h2l1 5 1-5h2l-2 9H9l-1-4-1 4H6L4 8zm11 0h2v3h3v2h-3v6h-2V8z",
  // Door with handle.
  door_front:
    "M18 20V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16H3v2h18v-2h-3zm-2 0H8V4h8v16zm-2-9h-2v2h2v-2z",
  // Copy (two stacked sheets).
  content_copy:
    "M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z",
  // Check mark.
  check: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z",
  // Arrow forward.
  arrow_forward: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  // Magnifying glass.
  search:
    "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  // Crosshair / radar dot — used for "jump to now".
  my_location:
    "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z",
};

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName;
  size?: number | string;
  title?: string;
};

export default function Icon({
  name,
  size,
  title,
  width,
  height,
  "aria-hidden": ariaHidden,
  ...rest
}: IconProps) {
  const resolvedSize = size ?? width ?? height ?? "1em";
  return (
    <svg
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : (ariaHidden ?? true)}
      viewBox="0 0 24 24"
      width={resolvedSize}
      height={resolvedSize}
      fill="currentColor"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
