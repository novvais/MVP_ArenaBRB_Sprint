import { FloorPlan } from "@/types/map";

// TODO: Configure VITE_ARENA_BRB_API_URL no arquivo .env
// Exemplo: VITE_ARENA_BRB_API_URL=https://api.arenabrb.com.br
const ARENA_BRB_API_BASE_URL = import.meta.env.VITE_ARENA_BRB_API_URL || "";

/**
 * PARA INTEGRAR COM API DA ARENA BRB:
 * 1. Configure VITE_ARENA_BRB_API_URL no arquivo .env
 * 2. Ajuste os endpoints (linhas 32 e 68) se necessário
 * 3. Ajuste o mapeamento (linhas 41-52 e 77-88) conforme resposta da API
 */

export const fetchFloorPlansFromArenaAPI = async (): Promise<FloorPlan[]> => {
  if (!ARENA_BRB_API_BASE_URL) {
    return [];
  }

  try {
    // Ajustar endpoint conforme documentação da API
    const response = await fetch(`${ARENA_BRB_API_BASE_URL}/floor-plans`);

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();

    // Ajustar campos conforme resposta da API
    const floorPlans: FloorPlan[] = data.map((item: any) => ({
      floor: item.floor,
      floorName: item.floorName,
      overlayUrl: item.overlayUrl,
      bounds: {
        north: item.bounds.north,
        south: item.bounds.south,
        east: item.bounds.east,
        west: item.bounds.west,
      },
      stadiumShape: item.stadiumShape,
    }));

    return floorPlans;
  } catch (error) {
    console.error("Erro ao buscar plantas baixas:", error);
    return [];
  }
};

export const fetchFloorPlanByFloor = async (floor: number): Promise<FloorPlan | null> => {
  if (!ARENA_BRB_API_BASE_URL) {
    return null;
  }

  try {
    // Ajustar endpoint conforme documentação da API
    const response = await fetch(`${ARENA_BRB_API_BASE_URL}/floor-plans/${floor}`);

    if (!response.ok) {
      return null;
    }

    const item = await response.json();

    // Ajustar campos conforme resposta da API
    return {
      floor: item.floor,
      floorName: item.floorName,
      overlayUrl: item.overlayUrl,
      bounds: {
        north: item.bounds.north,
        south: item.bounds.south,
        east: item.bounds.east,
        west: item.bounds.west,
      },
      stadiumShape: item.stadiumShape,
    };
  } catch (error) {
    console.error(`Erro ao buscar andar ${floor}:`, error);
    return null;
  }
};

