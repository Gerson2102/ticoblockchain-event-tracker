"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { ICON_PATHS, type IconName } from "../../components/Icon";
import { ZONES } from "../data/zones";
import { GRECO_FEATURES } from "../data/greco-features";
import { STANDS } from "../data/stands";
import { LOBBY_POIS } from "../data/lobby-pois";
import type {
  BBox,
  GrecoFeature,
  LobbyPOI,
  POICategory,
  Stand,
} from "../types";

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 1300;

// External (out-of-building) wayfinding zones drawn to the right of the
// venue: parking lot at top, restaurant at bottom, with a narrow walking
// lane between them that connects to the hotel entrance. All decorative —
// not interactive, not filterable.
const EXTERIOR_ZONE_X = 970;
const EXTERIOR_ZONE_WIDTH = 210;
const PARKING_BBOX: BBox = { x: EXTERIOR_ZONE_X, y: 40, width: EXTERIOR_ZONE_WIDTH, height: 400 };
const RESTAURANT_BBOX: BBox = { x: EXTERIOR_ZONE_X, y: 900, width: EXTERIOR_ZONE_WIDTH, height: 380 };
const WALKING_PATH_BBOX: BBox = { x: 1050, y: 440, width: 50, height: 460 };
// Y-coordinate of the horizontal connector linking the lane to the
// hotel entrance (matches the vertical center of the entrada bbox).
const PATH_TO_ENTRANCE_Y = 815;
// Half-height of the horizontal corridor that branches off the lane
// toward the hotel entrance.
const CORRIDOR_HALF_HEIGHT = 25;
// Right edge of the unified venue outline (Sala Greco's right wall).
// Derived from zone data so the lane stays anchored if the building is
// ever resized.
const BUILDING_RIGHT_X = (() => {
  const g = ZONES.find((z) => z.id === "greco")!.bbox;
  return g.x + g.width;
})();

// Wall between Sala Greco and the Lobby — has gaps where the entry doors sit.
const WALL_Y = 620;
const DOOR_GAPS: readonly { x: number; width: number }[] = [
  { x: 280, width: 80 }, // matches entry-door-left bbox
  { x: 640, width: 80 }, // matches entry-door-right bbox
];

// Wall between Lobby and Escenario 2 room — has a single open passage
// at the top of the internal corridor (people enter the corridor freely
// from the lobby through this opening, no door marker).
const WALL_LOBBY_ESC2_Y = 880;
const LOBBY_ESC2_DOOR_GAPS: readonly { x: number; width: number }[] = [
  { x: 742, width: 126 }, // open passage at top of corridor
];

// Internal corridor on the right side of Escenario 2 — formed by two
// vertical walls. Top is open (matches LOBBY_ESC2_DOOR_GAPS), bottom is
// closed by the outer building. Left wall has a door gap (entrance into
// the main stage area).
const CORRIDOR_WALL_X = 740; // left corridor wall
const CORRIDOR_RIGHT_WALL_X = 870; // right corridor wall (inside the building)
const CORRIDOR_DOOR_GAP = { y: 970, height: 70 }; // matches esc2-entry-door bbox
const CORRIDOR_BOTTOM_Y = 1280;

// Audience grid configurations — Sala Greco (large) and Escenario 2 (smaller).
const GRECO_AUDIENCE_AREA: BBox = { x: 260, y: 180, width: 480, height: 332 };
const ESC2_AUDIENCE_AREA: BBox = { x: 150, y: 940, width: 480, height: 180 };

type FloorplanSVGProps = {
  selectedId: string | null;
  activeFilters: Set<POICategory>;
  onSelect: (id: string) => void;
};

export default function FloorplanSVG({
  selectedId,
  activeFilters,
  onSelect,
}: FloorplanSVGProps) {
  const handleKeyDown = (id: string) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="mapa-title mapa-desc"
      className="w-full h-auto select-none"
    >
      <title id="mapa-title">Mapa de Sala Greco, Lobby y Escenario 2</title>
      <desc id="mapa-desc">
        Mapa interactivo del recinto TicoBlockchain 2026 en Hotel Barceló San
        José. Sala Greco, el lobby y el Escenario 2 forman un solo espacio
        conectado, separados por paredes interiores con puertas de acceso. El
        Escenario 2 se ubica al sur del lobby y se accede por un corredor en
        el costado derecho. Incluye escenario principal, escenario 2, stands,
        mesas de regalos, check-in, servicios sanitarios, zona de comida y
        entrada del hotel.
      </desc>

      <ContainerOutline />
      <ExteriorBlock
        bbox={PARKING_BBOX}
        iconName="local_parking"
        label="PARKING"
        decorations={<ParkingStalls bbox={PARKING_BBOX} />}
      />
      <ExteriorBlock
        bbox={RESTAURANT_BBOX}
        iconName="restaurant"
        label="RESTAURANTE"
      />
      <WalkingPath />
      <AudienceGrid area={GRECO_AUDIENCE_AREA} rows={7} />
      <AudienceGrid area={ESC2_AUDIENCE_AREA} rows={3} />
      <Wall />
      <LobbyEsc2Wall />
      <CorridorWall />

      {/* Greco interactive features */}
      {GRECO_FEATURES.filter((f) => f.interactive).map((feature) => (
        <GrecoFeatureShape
          key={feature.id}
          feature={feature}
          dimmed={!activeFilters.has(feature.category)}
          selected={selectedId === feature.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(feature.id)}
        />
      ))}

      {/* Stands */}
      {STANDS.map((stand) => (
        <StandShape
          key={stand.id}
          stand={stand}
          dimmed={!activeFilters.has("stands")}
          selected={selectedId === stand.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(stand.id)}
        />
      ))}

      {/* Lobby POIs */}
      {LOBBY_POIS.map((poi) => (
        <LobbyPOIShape
          key={poi.id}
          poi={poi}
          dimmed={!activeFilters.has(poi.category)}
          selected={selectedId === poi.id}
          onSelect={onSelect}
          onKeyDown={handleKeyDown(poi.id)}
        />
      ))}

    </svg>
  );
}

/* ----------------------------- Sub-components ----------------------------- */

function ContainerOutline() {
  const greco = ZONES.find((z) => z.id === "greco")!.bbox;
  const lobby = ZONES.find((z) => z.id === "lobby")!.bbox;
  const esc2 = ZONES.find((z) => z.id === "escenario-2")!.bbox;

  // Unified outer boundary from top of Greco to bottom of Escenario 2.
  const outer: BBox = {
    x: greco.x,
    y: greco.y,
    width: greco.width,
    height: esc2.y + esc2.height - greco.y,
  };

  return (
    <g>
      {/* Unified container — single building */}
      <rect
        x={outer.x}
        y={outer.y}
        width={outer.width}
        height={outer.height}
        fill="var(--color-surface-container-lowest)"
        stroke="var(--color-primary)"
        strokeWidth={4}
      />
      {/* Subtle lobby tint for visual distinction without a hard border */}
      <rect
        x={lobby.x + 2}
        y={lobby.y}
        width={lobby.width - 4}
        height={lobby.height - 2}
        fill="var(--color-surface-container-low)"
      />
      {/* Corridor tint — internal hallway between the two vertical walls.
          Starts where the lobby tint ends so they meet seamlessly through
          the open passage at the top of the corridor (no white sliver). */}
      <rect
        x={CORRIDOR_WALL_X + 2}
        y={lobby.y + lobby.height - 2}
        width={CORRIDOR_RIGHT_WALL_X - CORRIDOR_WALL_X - 4}
        height={esc2.y + esc2.height - (lobby.y + lobby.height - 2) - 2}
        fill="var(--color-surface-container-low)"
      />

      {/* Zone labels — top-left corner of each area */}
      <text
        x={greco.x + 16}
        y={greco.y + 32}
        className="font-display"
        fontSize={26}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        SALA GRECO
      </text>
      <text
        x={lobby.x + 16}
        y={lobby.y + 36}
        className="font-display"
        fontSize={26}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        LOBBY
      </text>
      <text
        x={esc2.x + 16}
        y={esc2.y + 36}
        className="font-display"
        fontSize={26}
        fontWeight={700}
        letterSpacing="0.08em"
        fill="var(--color-primary)"
      >
        ESCENARIO 2
      </text>
    </g>
  );
}

function Wall() {
  // Draws the interior wall between Greco and Lobby as a series of thick
  // horizontal segments, skipping the door gaps. The doors themselves are
  // drawn as separate crimson rects by <GrecoFeatureShape kind="entry-door">.
  const xStart = 60;
  const xEnd = 940;
  const segments: { x1: number; x2: number }[] = [];

  // Sort gaps left-to-right
  const gaps = [...DOOR_GAPS].sort((a, b) => a.x - b.x);
  let cursor = xStart;
  for (const gap of gaps) {
    if (gap.x > cursor) {
      segments.push({ x1: cursor, x2: gap.x });
    }
    cursor = gap.x + gap.width;
  }
  if (cursor < xEnd) {
    segments.push({ x1: cursor, x2: xEnd });
  }

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {segments.map((seg, i) => (
        <line
          key={i}
          x1={seg.x1}
          y1={WALL_Y}
          x2={seg.x2}
          y2={WALL_Y}
          stroke="var(--color-primary)"
          strokeWidth={4}
          strokeLinecap="butt"
        />
      ))}
    </g>
  );
}

function LobbyEsc2Wall() {
  // Horizontal wall between the Lobby and the Escenario 2 room. Drawn as
  // segments around the main entrance door gap so the corridor is enclosed
  // except for the labeled entrance.
  const xStart = 60;
  const xEnd = 940;
  const segments: { x1: number; x2: number }[] = [];
  const gaps = [...LOBBY_ESC2_DOOR_GAPS].sort((a, b) => a.x - b.x);
  let cursor = xStart;
  for (const gap of gaps) {
    if (gap.x > cursor) segments.push({ x1: cursor, x2: gap.x });
    cursor = gap.x + gap.width;
  }
  if (cursor < xEnd) segments.push({ x1: cursor, x2: xEnd });

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {segments.map((seg, i) => (
        <line
          key={i}
          x1={seg.x1}
          y1={WALL_LOBBY_ESC2_Y}
          x2={seg.x2}
          y2={WALL_LOBBY_ESC2_Y}
          stroke="var(--color-primary)"
          strokeWidth={4}
          strokeLinecap="butt"
        />
      ))}
    </g>
  );
}

function CorridorWall() {
  // Two vertical walls forming the internal corridor on the right of
  // Escenario 2. Left wall is broken by the entry door gap; right wall
  // is solid. The corridor's top is open (handled by LobbyEsc2Wall);
  // the bottom is closed by the outer container.
  const doorTop = CORRIDOR_DOOR_GAP.y;
  const doorBottom = CORRIDOR_DOOR_GAP.y + CORRIDOR_DOOR_GAP.height;
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <line
        x1={CORRIDOR_WALL_X}
        y1={WALL_LOBBY_ESC2_Y}
        x2={CORRIDOR_WALL_X}
        y2={doorTop}
        stroke="var(--color-primary)"
        strokeWidth={4}
        strokeLinecap="butt"
      />
      <line
        x1={CORRIDOR_WALL_X}
        y1={doorBottom}
        x2={CORRIDOR_WALL_X}
        y2={CORRIDOR_BOTTOM_Y}
        stroke="var(--color-primary)"
        strokeWidth={4}
        strokeLinecap="butt"
      />
      <line
        x1={CORRIDOR_RIGHT_WALL_X}
        y1={WALL_LOBBY_ESC2_Y}
        x2={CORRIDOR_RIGHT_WALL_X}
        y2={CORRIDOR_BOTTOM_Y}
        stroke="var(--color-primary)"
        strokeWidth={4}
        strokeLinecap="butt"
      />
    </g>
  );
}

// Decorative outlined block for an out-of-building zone (parking, restaurant).
// Centered icon + label; optional decorations slot for zone-specific marks
// like the parking stall ticks.
function ExteriorBlock({
  bbox,
  iconName,
  label,
  decorations,
}: {
  bbox: BBox;
  iconName: IconName;
  label: string;
  decorations?: ReactNode;
}) {
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill="var(--color-surface-container-high)"
        stroke="var(--color-primary)"
        strokeWidth={4}
      />
      {decorations}
      <POIIcon
        iconName={iconName}
        cx={cx}
        cy={cy - 18}
        size={56}
        fill="var(--color-primary)"
      />
      <text
        x={cx}
        y={cy + 32}
        className="font-display"
        fontSize={22}
        fontWeight={900}
        letterSpacing="0.08em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
      >
        {label}
      </text>
    </g>
  );
}

// Short vertical ticks along the top and bottom edges of the parking
// block — suggests parking stalls without being literal.
function ParkingStalls({ bbox }: { bbox: BBox }) {
  const stalls = 5;
  const stallStep = bbox.width / stalls;
  return (
    <>
      {Array.from({ length: stalls - 1 }, (_, i) => {
        const tickX = bbox.x + stallStep * (i + 1);
        return (
          <g key={i}>
            <line
              x1={tickX}
              y1={bbox.y}
              x2={tickX}
              y2={bbox.y + 22}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
            <line
              x1={tickX}
              y1={bbox.y + bbox.height - 22}
              x2={tickX}
              y2={bbox.y + bbox.height}
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
          </g>
        );
      })}
    </>
  );
}

function WalkingPath() {
  const { x, y, width, height } = WALKING_PATH_BBOX;
  const laneCenterX = x + width / 2;
  const laneRight = x + width;
  const laneBottom = y + height;
  const corridorTop = PATH_TO_ENTRANCE_Y - CORRIDOR_HALF_HEIGHT;
  const corridorBottom = PATH_TO_ENTRANCE_Y + CORRIDOR_HALF_HEIGHT;
  const wallStroke = {
    stroke: "var(--color-primary)",
    strokeWidth: 3,
    strokeDasharray: "8 6",
  };
  const spineStroke = {
    stroke: "var(--color-primary)",
    strokeWidth: 2,
    strokeDasharray: "6 6",
    opacity: 0.45,
  };

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {/* Fills (no stroke) — walls drawn separately so we can leave a doorway
          on the lane's left side where the corridor joins. */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="var(--color-surface-container-low)"
      />
      <rect
        x={BUILDING_RIGHT_X}
        y={corridorTop}
        width={x - BUILDING_RIGHT_X}
        height={corridorBottom - corridorTop}
        fill="var(--color-surface-container-low)"
      />

      {/* Vertical lane walls — top, right, bottom are continuous; the left
          wall has a gap at the corridor entry so the path flows through. */}
      <line x1={x} y1={y} x2={laneRight} y2={y} {...wallStroke} />
      <line x1={laneRight} y1={y} x2={laneRight} y2={laneBottom} {...wallStroke} />
      <line x1={x} y1={laneBottom} x2={laneRight} y2={laneBottom} {...wallStroke} />
      <line x1={x} y1={y} x2={x} y2={corridorTop} {...wallStroke} />
      <line x1={x} y1={corridorBottom} x2={x} y2={laneBottom} {...wallStroke} />

      {/* Horizontal corridor walls — top + bottom only. No left wall (the
          building's solid right wall already terminates the corridor) and
          no right wall (the lane's left-wall gap opens into the corridor). */}
      <line x1={BUILDING_RIGHT_X} y1={corridorTop} x2={x} y2={corridorTop} {...wallStroke} />
      <line x1={BUILDING_RIGHT_X} y1={corridorBottom} x2={x} y2={corridorBottom} {...wallStroke} />

      {/* Center spines — vertical runs full length, horizontal runs through
          the corridor; they cross at the entry point forming a "+" so flow
          reads as continuous in all four directions. */}
      <line x1={laneCenterX} y1={y + 8} x2={laneCenterX} y2={laneBottom - 8} {...spineStroke} />
      <line x1={BUILDING_RIGHT_X + 8} y1={PATH_TO_ENTRANCE_Y} x2={laneCenterX} y2={PATH_TO_ENTRANCE_Y} {...spineStroke} />
    </g>
  );
}

function AudienceGrid({ area, rows }: { area: BBox; rows: number }) {
  // Decorative "tipo escuela" seating: 3 distinct blocks separated by aisles.
  // Same layout primitives shared by Sala Greco and Escenario 2; only the
  // outer area and row count differ.
  const blocks = 3;
  const colsPerBlock = 2;
  const aisleWidth = 30;
  const cellGapX = 3;
  const cellGapY = 5;

  const blockWidth =
    (area.width - aisleWidth * (blocks - 1)) / blocks;
  const cellWidth =
    (blockWidth - cellGapX * (colsPerBlock - 1)) / colsPerBlock;
  const cellHeight = (area.height - cellGapY * (rows - 1)) / rows;

  const cells: { x: number; y: number; w: number; h: number }[] = [];
  for (let b = 0; b < blocks; b++) {
    const blockX = area.x + b * (blockWidth + aisleWidth);
    for (let c = 0; c < colsPerBlock; c++) {
      for (let r = 0; r < rows; r++) {
        cells.push({
          x: blockX + c * (cellWidth + cellGapX),
          y: area.y + r * (cellHeight + cellGapY),
          w: cellWidth,
          h: cellHeight,
        });
      }
    }
  }

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {cells.map((cell, i) => (
        <rect
          key={i}
          x={cell.x}
          y={cell.y}
          width={cell.w}
          height={cell.h}
          fill="var(--color-surface-variant)"
          opacity={0.45}
        />
      ))}
    </g>
  );
}

// Shared wrapper for all three interactive shape types. Handles the
// accessibility role, dim/selected visual states, and the bounding rect.
// Callers provide shape-specific text/icon children.
type InteractiveShapeProps = {
  id: string;
  bbox: BBox;
  fill: string;
  ariaLabel: string;
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void;
  extraClassName?: string;
  children?: ReactNode;
};

function InteractiveShape({
  id,
  bbox,
  fill,
  ariaLabel,
  dimmed,
  selected,
  onSelect,
  onKeyDown,
  extraClassName,
  children,
}: InteractiveShapeProps) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={() => onSelect(id)}
      onKeyDown={onKeyDown}
      className={`map-shape cursor-pointer${extraClassName ? ` ${extraClassName}` : ""}`}
      style={{ opacity: dimmed ? 0.2 : 1 }}
    >
      <rect
        x={bbox.x}
        y={bbox.y}
        width={bbox.width}
        height={bbox.height}
        fill={fill}
        stroke={selected ? "var(--color-secondary)" : "var(--color-primary)"}
        strokeWidth={selected ? 5 : 2}
      />
      {children}
    </g>
  );
}

type ShapeHandlers = {
  dimmed: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onKeyDown: (e: KeyboardEvent<SVGGElement>) => void;
};

function GrecoFeatureShape({
  feature,
  ...handlers
}: { feature: GrecoFeature } & ShapeHandlers) {
  const { bbox, kind, label, shortLabel, iconName } = feature;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const fill =
    kind === "stage"
      ? "var(--color-primary-container)"
      : kind === "check-in" || kind === "entry-door"
        ? "var(--color-secondary)"
        : "var(--color-primary-fixed-dim)"; // mesas-regalo, sonido, mesas-cocteleras

  const textFill =
    kind === "stage" || kind === "check-in" || kind === "entry-door"
      ? "var(--color-on-primary)"
      : "var(--color-primary)";

  const showLabel = kind !== "entry-door"; // doors are too thin for labels
  const displayLabel = (shortLabel ?? label).toUpperCase();
  // Only pulse when the stage is actually active — otherwise the opacity
  // keyframes override the dimmed inline opacity and the stage stays visible.
  const extraClassName =
    kind === "stage" && !handlers.dimmed ? "map-stage-pulse" : undefined;

  // check-in strips are only 30px tall — stack icon+text horizontally instead of vertically.
  const horizontalLayout = kind === "check-in";
  const labelFontSize = kind === "stage" ? 22 : horizontalLayout ? 14 : 15;
  const iconSize = kind === "stage" ? 28 : horizontalLayout ? 18 : 26;
  const iconOffsetY = kind === "stage" ? 22 : 20;
  const labelOffsetY = kind === "stage" ? 18 : 17;

  return (
    <InteractiveShape
      id={feature.id}
      bbox={bbox}
      fill={fill}
      ariaLabel={label}
      extraClassName={extraClassName}
      {...handlers}
    >
      {iconName && horizontalLayout && (
        <POIIcon
          iconName={iconName}
          cx={bbox.x + 16}
          cy={cy}
          size={iconSize}
          fill={textFill}
        />
      )}
      {iconName && !horizontalLayout && (
        <POIIcon
          iconName={iconName}
          cx={cx}
          cy={cy - iconOffsetY}
          size={iconSize}
          fill={textFill}
        />
      )}
      {showLabel && (
        <text
          x={horizontalLayout && iconName ? bbox.x + 32 : cx}
          y={iconName && !horizontalLayout ? cy + labelOffsetY : cy}
          className="font-display"
          fontSize={labelFontSize}
          fontWeight={700}
          letterSpacing="0.05em"
          textAnchor={horizontalLayout && iconName ? "start" : "middle"}
          dominantBaseline="middle"
          fill={textFill}
          style={{ textTransform: "uppercase", pointerEvents: "none" }}
        >
          {displayLabel}
        </text>
      )}
    </InteractiveShape>
  );
}

function StandShape({
  stand,
  ...handlers
}: { stand: Stand } & ShapeHandlers) {
  const { bbox, number } = stand;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  return (
    <InteractiveShape
      id={stand.id}
      bbox={bbox}
      fill="var(--color-surface-variant)"
      ariaLabel={`Stand ${number}`}
      {...handlers}
    >
      <POIIcon
        iconName="storefront"
        cx={cx}
        cy={cy - 13}
        size={22}
        fill="var(--color-primary)"
      />
      <text
        x={cx}
        y={cy + 14}
        className="font-display"
        fontSize={26}
        fontWeight={900}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--color-primary)"
        style={{ pointerEvents: "none" }}
      >
        {number.toString().padStart(2, "0")}
      </text>
    </InteractiveShape>
  );
}

function LobbyPOIShape({
  poi,
  ...handlers
}: { poi: LobbyPOI } & ShapeHandlers) {
  const { bbox, label, shortLabel, category, iconName } = poi;
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const fill =
    category === "entrance"
      ? "var(--color-primary-container)"
      : category === "food"
        ? "var(--color-primary-fixed-dim)"
        : "var(--color-surface-variant)"; // toilet

  const textFill =
    category === "entrance"
      ? "var(--color-on-primary)"
      : "var(--color-primary)";

  const displayLabel = (shortLabel ?? label).toUpperCase();

  return (
    <InteractiveShape
      id={poi.id}
      bbox={bbox}
      fill={fill}
      ariaLabel={label}
      {...handlers}
    >
      <POIIcon iconName={iconName} cx={cx} cy={cy - 14} size={28} fill={textFill} />
      <text
        x={cx}
        y={cy + 19}
        className="font-display"
        fontSize={14}
        fontWeight={700}
        letterSpacing="0.05em"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textFill}
        style={{ textTransform: "uppercase", pointerEvents: "none" }}
      >
        {displayLabel}
      </text>
    </InteractiveShape>
  );
}


// Renders a shared Icon glyph inline inside the SVG context. The 24x24
// path is centered on (cx, cy) via a transform so the existing text
// anchoring math keeps working unchanged.
function POIIcon({
  iconName,
  cx,
  cy,
  size = 26,
  fill,
}: {
  iconName: IconName;
  cx: number;
  cy: number;
  size?: number;
  fill: string;
}) {
  const scale = size / 24;
  const tx = cx - size / 2;
  const ty = cy - size / 2;
  return (
    <g
      transform={`translate(${tx} ${ty}) scale(${scale})`}
      style={{ pointerEvents: "none" }}
    >
      <path d={ICON_PATHS[iconName]} fill={fill} />
    </g>
  );
}
