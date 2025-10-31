import { MapPoint } from "@/types/map";

// Coordenadas base da Arena BRB (centro aproximado)
const ARENA_CENTER = {
  lat: -15.783611,
  lng: -47.899167,
};

// Pontos externos que devem ser buscados da Google Places API
export const EXTERNAL_PLACES_TO_FETCH = [
  {
    id: "arena-brb",
    queries: [
      "Arena BRB Mané Garrincha",
      "Estádio Mané Garrincha Brasília",
      "Arena BRB Brasília DF",
    ],
    type: "venue" as const,
    icon: "🏟️",
  },
  {
    id: "ginasio-nilson-nelson",
    queries: [
      "Ginásio Nilson Nelson",
      "Ginásio Nilson Nelson Brasília",
      "Nilson Nelson Gymnasium Brasília",
    ],
    type: "venue" as const,
    icon: "🏀",
  },
  {
    id: "estacionamento-principal",
    queries: [
      "Estacionamento Arena BRB",
      "Parking Arena BRB Mané Garrincha",
    ],
    type: "parking" as const,
    icon: "🅿️",
  },
];

// Função para buscar pontos externos da Google Places API
export const fetchExternalPointsFromPlaces = async (
  map: google.maps.Map
): Promise<MapPoint[]> => {
  const points: MapPoint[] = [];
  const service = new google.maps.places.PlacesService(map);

  for (const placeConfig of EXTERNAL_PLACES_TO_FETCH) {
    try {
      let placeResult: google.maps.places.PlaceResult | null = null;

      // Tentar cada query até encontrar um resultado
      for (const query of placeConfig.queries) {
        const request = {
          query: query,
          location: new google.maps.LatLng(ARENA_CENTER.lat, ARENA_CENTER.lng),
          radius: 2000, // 2km de raio
          fields: [
            "place_id",
            "name",
            "geometry",
            "formatted_address",
            "types",
          ],
        };

        const result = await new Promise<google.maps.places.PlaceResult | null>(
          (resolve) => {
            service.textSearch(request, (results, status) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results &&
                results.length > 0
              ) {
                // Verificar se está próximo o suficiente (dentro de 2km)
                const resultPosition = results[0].geometry?.location;
                if (resultPosition) {
                  const distance =
                    google.maps.geometry.spherical.computeDistanceBetween(
                      new google.maps.LatLng(
                        ARENA_CENTER.lat,
                        ARENA_CENTER.lng
                      ),
                      resultPosition
                    );

                  if (distance <= 2000) {
                    resolve(results[0]);
                    return;
                  }
                }
              }
              resolve(null);
            });
          }
        );

        if (result) {
          placeResult = result;
          break;
        }
      }

      if (placeResult?.geometry?.location) {
        const location = placeResult.geometry.location;
        points.push({
          id: placeConfig.id,
          title: placeResult.name || placeConfig.id,
          description: placeResult.formatted_address,
          position: {
            lat: location.lat(),
            lng: location.lng(),
          },
          type: placeConfig.type,
          icon: placeConfig.icon,
          // SEM floor para sempre aparecer
        });
      }
    } catch (error) {
      console.error(
        `Erro ao buscar ${placeConfig.id} da Places API:`,
        error
      );
    }
  }

  return points;
};

