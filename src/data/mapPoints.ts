import { MapPoint } from "@/types/map";

export const MAP_POINTS: MapPoint[] = [
  {
    id: "arena-brb",
    title: "Arena BRB Mané Garrincha",
    description: "Estádio principal para eventos esportivos e shows",
    position: {
      lat: -15.783611,
      lng: -47.899167,
    },
    type: "venue",
    icon: "🏟️",
  },
];

export const getMapPoints = (): MapPoint[] => {
  return MAP_POINTS;
};

export const getMapPointById = (id: string): MapPoint | undefined => {
  return MAP_POINTS.find((point) => point.id === id);
};
