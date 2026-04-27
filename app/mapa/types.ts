import type { IconName } from "../components/Icon";

export type BBox = { x: number; y: number; width: number; height: number };

export type POICategory =
  | "stage"
  | "stands"
  | "food"
  | "toilet"
  | "checkin"
  | "entrance"
  | "tables";

export type Zone = {
  id: "greco" | "lobby" | "escenario-2";
  label: string;
  bbox: BBox;
};

type GrecoFeatureKind =
  | "stage"
  | "mesas-regalo"
  | "sonido"
  | "mesas-cocteleras"
  | "check-in"
  | "audience"
  | "entry-door";

export type GrecoFeature = {
  id: string;
  kind: GrecoFeatureKind;
  label: string;
  shortLabel?: string;
  bbox: BBox;
  category: POICategory;
  interactive: boolean;
  description?: string;
  iconName?: IconName;
};

type StandNumber = 1 | 2 | 3 | 4 | 5;

export type Stand = {
  id: `stand-${StandNumber}`;
  number: StandNumber;
  wall: "left" | "right";
  bbox: BBox;
  sponsorName?: string;
  sponsorUrl?: string;
};

export type LobbyPOI = {
  id:
    | "hotel-entrance"
    | "food-coffee"
    | "toilets"
    | "entrevistas"
    | "asoblockchain";
  label: string;
  shortLabel?: string;
  category: POICategory;
  bbox: BBox;
  iconName: IconName;
  description?: string;
};

export type SelectableFeature =
  | { kind: "greco-feature"; data: GrecoFeature }
  | { kind: "stand"; data: Stand }
  | { kind: "lobby-poi"; data: LobbyPOI };
