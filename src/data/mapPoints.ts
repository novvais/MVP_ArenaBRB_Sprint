import { MapPoint, FloorPlan } from "@/types/map";

// Coordenadas base da Arena BRB (centro aproximado)
const ARENA_CENTER = {
  lat: -15.783611,
  lng: -47.899167,
};

// Delta para criar variações de posição (simulação de layout interno)
const DELTA = 0.002;

// Pontos importantes distribuídos pelos andares
export const MAP_POINTS: MapPoint[] = [
  // ANDAR TÉRREO (0)
  {
    id: "entrada-principal",
    title: "Entrada Principal",
    description: "Entrada principal da Arena BRB Mané Garrincha",
    position: {
      lat: ARENA_CENTER.lat + DELTA,
      lng: ARENA_CENTER.lng + DELTA * 0.5,
    },
    type: "entrance",
    icon: "🚪",
    floor: 0,
  },
  {
    id: "entrada-norte",
    title: "Entrada Norte",
    description: "Entrada lateral norte",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 1.5,
      lng: ARENA_CENTER.lng,
    },
    type: "entrance",
    icon: "🚪",
    floor: 0,
  },
  {
    id: "saida-sul",
    title: "Saída Sul",
    description: "Saída lateral sul",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 1.5,
      lng: ARENA_CENTER.lng,
    },
    type: "exit",
    icon: "🚶",
    floor: 0,
  },
  {
    id: "elevador-torre-1",
    title: "Elevador Torre 1",
    description: "Acesso aos andares superiores",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 0.5,
      lng: ARENA_CENTER.lng + DELTA * 0.8,
    },
    type: "elevator",
    icon: "🛗",
    floor: 0,
  },
  {
    id: "escada-central",
    title: "Escada Central",
    description: "Escada para andares superiores",
    position: {
      lat: ARENA_CENTER.lat,
      lng: ARENA_CENTER.lng - DELTA * 0.8,
    },
    type: "stairs",
    icon: "🪜",
    floor: 0,
  },
  {
    id: "restaurante-térreo",
    title: "Praça de Alimentação",
    description: "Praça de alimentação com diversas opções",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 0.3,
      lng: ARENA_CENTER.lng - DELTA * 0.5,
    },
    type: "food",
    icon: "🍔",
    floor: 0,
  },
  {
    id: "banheiro-térreo-masc",
    title: "Banheiro Masculino",
    description: "Acessível e espaçoso",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.7,
      lng: ARENA_CENTER.lng - DELTA * 0.6,
    },
    type: "restroom",
    icon: "🚹",
    floor: 0,
  },
  {
    id: "banheiro-térreo-fem",
    title: "Banheiro Feminino",
    description: "Acessível e espaçoso",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.5,
      lng: ARENA_CENTER.lng - DELTA * 0.8,
    },
    type: "restroom",
    icon: "🚺",
    floor: 0,
  },

  // 1º ANDAR
  {
    id: "saida-andar-1-leste",
    title: "Saída Leste - 1º Andar",
    description: "Saída para área externa",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.4,
      lng: ARENA_CENTER.lng + DELTA * 1.2,
    },
    type: "exit",
    icon: "🚶",
    floor: 1,
  },
  {
    id: "restaurante-premium-1",
    title: "Restaurante Premium",
    description: "Área VIP com vista para o campo",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 0.2,
      lng: ARENA_CENTER.lng - DELTA * 0.3,
    },
    type: "food",
    icon: "🍽️",
    floor: 1,
  },
  {
    id: "escada-1-leste",
    title: "Escada Leste",
    description: "Acesso para 2º andar",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.8,
      lng: ARENA_CENTER.lng + DELTA * 0.3,
    },
    type: "stairs",
    icon: "🪜",
    floor: 1,
  },
  {
    id: "banheiro-andar-1",
    title: "Banheiro - 1º Andar",
    description: "Unisex e acessível",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 1.1,
      lng: ARENA_CENTER.lng - DELTA * 0.4,
    },
    type: "restroom",
    icon: "🚻",
    floor: 1,
  },

  // 2º ANDAR
  {
    id: "observatorio",
    title: "Observatório",
    description: "Vista panorâmica da cidade",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 0.8,
      lng: ARENA_CENTER.lng + DELTA * 0.6,
    },
    type: "venue",
    icon: "🔭",
    floor: 2,
  },
  {
    id: "bar-sky",
    title: "Sky Bar",
    description: "Bar com vista espetacular",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.3,
      lng: ARENA_CENTER.lng - DELTA * 0.7,
    },
    type: "food",
    icon: "🍺",
    floor: 2,
  },
  {
    id: "escada-final",
    title: "Escada VIP",
    description: "Acesso exclusivo ao 3º andar",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 0.5,
      lng: ARENA_CENTER.lng + DELTA * 0.9,
    },
    type: "stairs",
    icon: "🪜",
    floor: 2,
  },
  {
    id: "banheiro-andar-2",
    title: "Banheiro VIP",
    description: "Exclusivo para área premium",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.9,
      lng: ARENA_CENTER.lng + DELTA * 0.5,
    },
    type: "restroom",
    icon: "🚻",
    floor: 2,
  },

  // 3º ANDAR (VIP/Área Premium)
  {
    id: "area-vip-principal",
    title: "Área VIP Principal",
    description: "Salas vip e hospitality",
    position: {
      lat: ARENA_CENTER.lat,
      lng: ARENA_CENTER.lng,
    },
    type: "venue",
    icon: "👑",
    floor: 3,
  },
  {
    id: "restaurante-executivo",
    title: "Restaurante Executivo",
    description: "Culinária de alta gastronomia",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 0.4,
      lng: ARENA_CENTER.lng - DELTA * 0.6,
    },
    type: "food",
    icon: "🍾",
    floor: 3,
  },
  {
    id: "saida-emergencia-3",
    title: "Saída de Emergência",
    description: "Acesso à escada de incêndio",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 1.2,
      lng: ARENA_CENTER.lng - DELTA * 0.2,
    },
    type: "exit",
    icon: "🚨",
    floor: 3,
  },
  {
    id: "banheiro-premium-3",
    title: "Banheiro Premium",
    description: "Instalações executivas",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 0.6,
      lng: ARENA_CENTER.lng + DELTA * 0.7,
    },
    type: "restroom",
    icon: "🚻",
    floor: 3,
  },

  // Pontos externos (fora da arena, sempre visíveis - NÃO têm floor)
  {
    id: "arena-brb",
    title: "Arena BRB Mané Garrincha",
    description: "Estádio principal para eventos esportivos e shows",
    position: {
      lat: ARENA_CENTER.lat,
      lng: ARENA_CENTER.lng,
    },
    type: "venue",
    icon: "🏟️",
    // SEM floor para sempre aparecer
  },
<<<<<<< HEAD
=======
  {
    id: "ginasio-nilson-nelson",
    title: "Ginásio Nilson Nelson",
    description: "Ginásio para eventos esportivos e atividades",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 1.2,
      lng: ARENA_CENTER.lng - DELTA * 0.8,
    },
    type: "venue",
    icon: "🏀",
    // SEM floor para sempre aparecer
  },
  {
    id: "estacionamento-nilson-nelson",
    title: "Estacionamento Nilson Nelson",
    description: "Área de estacionamento para visitantes",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 1.8,
      lng: ARENA_CENTER.lng - DELTA * 1.0,
    },
    type: "parking",
    icon: "🅿️",
    // SEM floor para sempre aparecer
  },
  {
    id: "estacionamento-sul",
    title: "Estacionamento Sul",
    description: "Área de estacionamento principal",
    position: {
      lat: ARENA_CENTER.lat - DELTA * 2.5,
      lng: ARENA_CENTER.lng,
    },
    type: "parking",
    icon: "🅿️",
    // SEM floor para sempre aparecer
  },
  {
    id: "estacionamento-norte",
    title: "Estacionamento Norte",
    description: "Estacionamento VIP",
    position: {
      lat: ARENA_CENTER.lat + DELTA * 2.5,
      lng: ARENA_CENTER.lng,
    },
    type: "parking",
    icon: "🅿️",
    // SEM floor para sempre aparecer
  },
];

// Função para gerar formato oval/elíptico do estádio
const generateStadiumShape = (
  centerLat: number,
  centerLng: number,
  radiusLat: number,
  radiusLng: number,
  points: number = 32
): Array<{ lat: number; lng: number }> => {
  const shape: Array<{ lat: number; lng: number }> = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const lat = centerLat + radiusLat * Math.cos(angle);
    const lng = centerLng + radiusLng * Math.sin(angle);
    shape.push({ lat, lng });
  }
  return shape;
};

// Formato do estádio (oval/elíptico)
const STADIUM_SHAPE = generateStadiumShape(
  ARENA_CENTER.lat,
  ARENA_CENTER.lng,
  DELTA * 1.6, // Raio vertical (norte-sul)
  DELTA * 1.4, // Raio horizontal (leste-oeste)
  48 // Pontos para formar círculo suave
);

// Plantas baixas (floor plans) - URLs serão placeholders
export const FLOOR_PLANS: FloorPlan[] = [
  {
    floor: 0,
    floorName: "Térreo",
    overlayUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjVmNWY1IiBzdHJva2U9IiNjY2MiLz4KPHRleHQgeD0iNDAwIiB5PSI0MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMiIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlTDqXJyZW88L3RleHQ+Cjwvc3ZnPg==",
    bounds: {
      north: ARENA_CENTER.lat + DELTA * 1.8,
      south: ARENA_CENTER.lat - DELTA * 1.8,
      east: ARENA_CENTER.lng + DELTA * 1.8,
      west: ARENA_CENTER.lng - DELTA * 1.8,
    },
    stadiumShape: STADIUM_SHAPE,
  },
  {
    floor: 1,
    floorName: "1º Andar",
    overlayUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZTlmNWZmIiBzdHJva2U9IiM3YjhmZmYiLz4KPHRleHQgeD0iNDAwIiB5PSI0MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMiIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjFvIEFuZGFyPC90ZXh0Pgo8L3N2Zz4=",
    bounds: {
      north: ARENA_CENTER.lat + DELTA * 1.8,
      south: ARENA_CENTER.lat - DELTA * 1.8,
      east: ARENA_CENTER.lng + DELTA * 1.8,
      west: ARENA_CENTER.lng - DELTA * 1.8,
    },
    stadiumShape: STADIUM_SHAPE,
  },
  {
    floor: 2,
    floorName: "2º Andar",
    overlayUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZmZmNWU1IiBzdHJva2U9IiNmZmRiNGIiLz4KPHRleHQgeD0iNDAwIiB5PSI0MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMiIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjJvIEFuZGFyPC90ZXh0Pgo8L3N2Zz4=",
    bounds: {
      north: ARENA_CENTER.lat + DELTA * 1.8,
      south: ARENA_CENTER.lat - DELTA * 1.8,
      east: ARENA_CENTER.lng + DELTA * 1.8,
      west: ARENA_CENTER.lng - DELTA * 1.8,
    },
    stadiumShape: STADIUM_SHAPE,
  },
  {
    floor: 3,
    floorName: "3º Andar VIP",
    overlayUrl:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZjllNWQ3IiBzdHJva2U9IiNlOTdkNGYiLz4KPHRleHQgeD0iNDAwIiB5PSI0MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMiIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjNvIEFuZGFyIFZJUDwvdGV4dD4KPC9zdmc+",
    bounds: {
      north: ARENA_CENTER.lat + DELTA * 1.8,
      south: ARENA_CENTER.lat - DELTA * 1.8,
      east: ARENA_CENTER.lng + DELTA * 1.8,
      west: ARENA_CENTER.lng - DELTA * 1.8,
    },
    stadiumShape: STADIUM_SHAPE,
  },
>>>>>>> d010c148143f49af8e38e4d43619533b9b5c4c0b
];

export const getMapPoints = (): MapPoint[] => {
  return MAP_POINTS;
};

export const getMapPointById = (id: string): MapPoint | undefined => {
  return MAP_POINTS.find((point) => point.id === id);
};

export const getMapPointsByFloor = (floor: number): MapPoint[] => {
  return MAP_POINTS.filter((point) => point.floor === floor);
};

export const getFloorPlans = (): FloorPlan[] => {
  return FLOOR_PLANS;
};

export const getFloorPlanByFloor = (floor: number): FloorPlan | undefined => {
  return FLOOR_PLANS.find((plan) => plan.floor === floor);
};
