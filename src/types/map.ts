export interface MapPoint {
  id: string;
  title: string;
  description?: string;
  position: {
    lat: number;
    lng: number;
  };
  type:
    | "event"
    | "venue"
    | "parking"
    | "food"
    | "exit"
    | "entrance"
    | "stairs"
    | "elevator"
    | "restroom";
  icon?: string;
  floor?: number; // Andar do ponto (0 = térreo, 1 = 1º andar, etc.)
}

export interface FloorPlan {
  floor: number;
  floorName: string;
  overlayUrl: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  // Coordenadas para desenhar o formato do estádio (polygon oval/elíptico)
  stadiumShape?: Array<{ lat: number; lng: number }>;
}
