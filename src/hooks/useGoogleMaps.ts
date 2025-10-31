import { useCallback, useEffect, useRef, useState } from "react";
import { GOOGLE_MAPS_CONFIG } from "@/config/googleMaps";
import { MapPoint, FloorPlan } from "@/types/map";

// Declaração de tipos para window.google
declare global {
  interface Window {
    google: typeof google;
  }
}

interface UseGoogleMapsReturn {
  map: google.maps.Map | null;
  markers: google.maps.Marker[];
  infoWindows: google.maps.InfoWindow[];
  isLoaded: boolean;
  error: string | null;
  mapRef: React.RefObject<HTMLDivElement>;
  addMarker: (point: MapPoint) => void;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;
  fitBounds: (points: MapPoint[]) => void;
  setFloorPlan: (floorPlan: FloorPlan | null) => void;
  clearFloorPlan: () => void;
}

export const useGoogleMaps = (): UseGoogleMapsReturn => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const openInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const floorPlanOverlayRef = useRef<google.maps.GroundOverlay | null>(null);
  const floorPlanPolygonRef = useRef<google.maps.Polygon | null>(null);

  // Inicializar o mapa apenas uma vez
  useEffect(() => {
    if (isInitialized) return;

    const initMap = async () => {
      try {
        // Verificar se Google Maps já está carregado
        if (!window.google) {
          // Carregar Google Maps se não estiver disponível
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${
            GOOGLE_MAPS_CONFIG.apiKey
          }&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(",")}&language=${
            GOOGLE_MAPS_CONFIG.language
          }&region=${GOOGLE_MAPS_CONFIG.region}`;
          script.async = true;
          script.defer = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // Aguardar um pouco para garantir que o Google Maps está disponível
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (mapRef.current && window.google) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -15.783611, lng: -47.899167 }, // Centro na Arena BRB
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP, // Mapa simples
            styles: [
              // Manter estradas e estruturas, mas em tons de branco/cinza
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#e0e0e0" }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f8f8f8" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#d0d0d0" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#666666" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }],
              },
              // Ocultar todos os POIs (pontos de interesse)
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.business",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.attraction",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.government",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.medical",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.park",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.place_of_worship",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.school",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.sports_complex",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              // Ocultar trânsito
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              // Manter apenas labels administrativos essenciais
              {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{ color: "#666666" }],
              },
              {
                featureType: "administrative",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff" }],
              },
            ],
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            clickableIcons: false,
            gestureHandling: "greedy", // Permite interação normal
          });

          setMap(mapInstance);
          setIsLoaded(true);
          setIsInitialized(true);
        }
      } catch (err) {
        console.error("Erro ao inicializar o mapa:", err);
        setError(
          `Erro ao carregar o Google Maps: ${
            err instanceof Error ? err.message : "Erro desconhecido"
          }`
        );
      }
    };

    initMap();
  }, [isInitialized]);

  // Adicionar evento de clique no mapa para fechar InfoWindows
  useEffect(() => {
    if (map) {
      const clickListener = map.addListener("click", () => {
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
          openInfoWindowRef.current = null;
        }
      });

      return () => {
        google.maps.event.removeListener(clickListener);
      };
    }
  }, [map]);

  // Função para buscar foto do local
  const getPlacePhoto = async (
    placeName: string,
    position: { lat: number; lng: number },
    isIndoorPoint: boolean = false
  ) => {
    // Para pontos internos, não buscar fotos - retornar vazio imediatamente
    if (isIndoorPoint) {
      return "";
    }

    try {
      const service = new google.maps.places.PlacesService(map!);

      // Para pontos externos importantes, buscar com contexto específico da Arena BRB
      const searchQueries = [
        placeName.includes("Arena BRB") || placeName.includes("Mané Garrincha")
          ? placeName
          : `${placeName} Arena BRB Mané Garrincha`,
        placeName.includes("Arena BRB") || placeName.includes("Mané Garrincha")
          ? `${placeName} Brasília`
          : `${placeName} Arena BRB`,
        placeName.includes("Ginásio") || placeName.includes("Nilson Nelson")
          ? placeName
          : `${placeName} Ginásio Nilson Nelson`,
        `${placeName} Brasília DF`,
      ];

      for (const query of searchQueries) {
        const request = {
          query: query,
          location: new google.maps.LatLng(position.lat, position.lng),
          radius: 500, // Reduzir raio para ser mais específico
          fields: ["photos", "name", "place_id", "formatted_address"],
        };

        const result = await new Promise<string>((resolve) => {
          service.textSearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results[0] &&
              results[0].photos &&
              results[0].photos.length > 0
            ) {
              // Verificar se o resultado está próximo o suficiente (dentro de 500m)
              const resultPosition = results[0].geometry?.location;
              if (resultPosition && window.google?.maps?.geometry?.spherical) {
                const distance =
                  window.google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(position.lat, position.lng),
                    resultPosition
                  );

                // Só aceitar se estiver próximo (menos de 500 metros)
                if (distance > 500) {
                  resolve("");
                  return;
                }
              }

              const photo = results[0].photos[0];
              const photoUrl = photo.getUrl({ maxWidth: 400, maxHeight: 300 });
              console.log(`Foto encontrada para: ${query}`);
              resolve(photoUrl);
            } else {
              resolve("");
            }
          });
        });

        if (result) {
          return result;
        }
      }

      console.log(`Nenhuma foto encontrada para: ${placeName}`);
      return "";
    } catch (error) {
      console.error("Erro ao buscar foto:", error);
      return "";
    }
  };

  // Adicionar marcador
  const addMarker = useCallback(
    async (point: MapPoint) => {
      if (!map) return;

      const marker = new google.maps.Marker({
        position: point.position,
        map: map,
        title: point.title,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="22" fill="#3b82f6" stroke="#ffffff" stroke-width="3"/>
              <text x="25" y="32" text-anchor="middle" fill="white" font-size="20" font-family="Arial">${point.icon}</text>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(50, 50),
          anchor: new google.maps.Point(25, 25),
        },
      });

      // Buscar foto do local (apenas para pontos externos, não para internos)
      const isIndoorPoint = point.floor !== undefined;
      const photoUrl = await getPlacePhoto(
        point.title,
        point.position,
        isIndoorPoint
      );

      // Criar InfoWindow com foto e informações destacadas
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 20px; max-width: 380px; font-family: Arial, sans-serif; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #3b82f6;">
              <span style="font-size: 28px; margin-right: 12px;">${
                point.icon
              }</span>
              <h3 style="margin: 0; font-size: 20px; font-weight: bold; color: #1f2937;">${
                point.title
              }</h3>
            </div>
            ${
              point.description
                ? `
              <div style="margin: 12px 0; padding: 12px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5;">${point.description}</p>
              </div>
            `
                : ""
            }
            ${
              photoUrl
                ? `
              <div style="margin: 16px 0;">
                <img src="${photoUrl}" alt="${point.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
              </div>
            `
                : isIndoorPoint
                ? `
              <div style="margin: 16px 0; padding: 30px; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 10px; text-align: center; border: 2px solid #d1d5db;">
                <div style="font-size: 48px; margin-bottom: 12px;">${
                  point.icon || "📍"
                }</div>
                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Local interno da Arena BRB</p>
                <p style="margin: 4px 0 0 0; color: #9ca3af; font-size: 12px;">${
                  point.floor !== undefined
                    ? `${
                        point.floor === 0 ? "Térreo" : `${point.floor}º Andar`
                      }`
                    : ""
                }</p>
              </div>
            `
                : `
              <div style="margin: 16px 0; padding: 20px; background: #f3f4f6; border-radius: 10px; text-align: center; border: 2px dashed #d1d5db;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">📷 Imagem não disponível</p>
              </div>
            `
            }
            <div style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 10px; color: white;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 16px; margin-right: 8px;">🕒</span>
                <span style="font-weight: 600; font-size: 14px;">Horário: 24h (consulte eventos específicos)</span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="font-size: 16px; margin-right: 8px;">📍</span>
                <span style="font-weight: 600; font-size: 14px;">SRPN - Brasília, DF</span>
              </div>
            </div>
          </div>
        `,
      });

      // Adicionar evento de clique com fechamento forçado
      marker.addListener("click", () => {
        // Fechar a InfoWindow atualmente aberta (se houver)
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
          openInfoWindowRef.current = null;
        }

        // Abrir a nova InfoWindow
        infoWindow.open(map, marker);
        openInfoWindowRef.current = infoWindow;
      });

      setMarkers((prev) => [...prev, marker]);
      setInfoWindows((prev) => [...prev, infoWindow]);
    },
    [map]
  );

  // Remover marcador
  const removeMarker = useCallback((id: string) => {
    setMarkers((prev) => {
      const markerToRemove = prev.find((marker) => marker.getTitle() === id);
      if (markerToRemove) {
        markerToRemove.setMap(null);
        return prev.filter((marker) => marker !== markerToRemove);
      }
      return prev;
    });

    setInfoWindows((prev) => {
      const infoWindowToRemove = prev.find((iw) => {
        const content = iw.getContent();
        return typeof content === "string" && content.includes(id);
      });
      if (infoWindowToRemove) {
        infoWindowToRemove.close();
        return prev.filter((iw) => iw !== infoWindowToRemove);
      }
      return prev;
    });
  }, []);

  // Limpar todos os marcadores
  const clearMarkers = useCallback(() => {
    markers.forEach((marker) => marker.setMap(null));
    infoWindows.forEach((iw) => iw.close());
    if (openInfoWindowRef.current) {
      openInfoWindowRef.current.close();
      openInfoWindowRef.current = null;
    }
    setMarkers([]);
    setInfoWindows([]);
  }, [markers, infoWindows]);

  // Ajustar zoom para mostrar todos os pontos
  const fitBounds = useCallback(
    (points: MapPoint[]) => {
      if (!map || points.length === 0) return;

      const bounds = new google.maps.LatLngBounds();
      points.forEach((point) => {
        bounds.extend(point.position);
      });

      map.fitBounds(bounds);

      // Ajustar zoom se necessário
      const listener = google.maps.event.addListener(map, "idle", () => {
        if (map.getZoom()! > 16) {
          map.setZoom(16);
        }
        google.maps.event.removeListener(listener);
      });
    },
    [map]
  );

  // Definir planta baixa (floor plan)
  const setFloorPlan = useCallback(
    (floorPlan: FloorPlan | null) => {
      if (!map) return;

      // Remover planta baixa anterior se houver (GroundOverlay e Polygon)
      if (floorPlanOverlayRef.current) {
        floorPlanOverlayRef.current.setMap(null);
        floorPlanOverlayRef.current = null;
      }
      if (floorPlanPolygonRef.current) {
        floorPlanPolygonRef.current.setMap(null);
        floorPlanPolygonRef.current = null;
      }

      // Adicionar nova planta baixa
      if (floorPlan) {
        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(floorPlan.bounds.south, floorPlan.bounds.west),
          new google.maps.LatLng(floorPlan.bounds.north, floorPlan.bounds.east)
        );

        // Se houver stadiumShape, usar Polygon em vez de GroundOverlay
        if (floorPlan.stadiumShape && floorPlan.stadiumShape.length > 0) {
          // Criar array de LatLng para o Polygon
          const polygonPath = floorPlan.stadiumShape.map(
            (coord) => new google.maps.LatLng(coord.lat, coord.lng)
          );

          // Criar Polygon com formato oval/elíptico do estádio
          const polygon = new google.maps.Polygon({
            paths: polygonPath,
            strokeColor: "#FF9800", // Laranja para destacar
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FFE0B2", // Laranja claro e semi-transparente
            fillOpacity: 0.35,
            clickable: false,
            zIndex: 1, // Abaixo dos marcadores
          });

          polygon.setMap(map);
          floorPlanPolygonRef.current = polygon;

          // Ajustar zoom para mostrar o estádio
          map.fitBounds(bounds);
        } else {
          // Fallback para GroundOverlay se não houver stadiumShape
          const overlay = new google.maps.GroundOverlay(
            floorPlan.overlayUrl,
            bounds,
            {
              opacity: 0.6,
            }
          );

          overlay.setMap(map);
          floorPlanOverlayRef.current = overlay;

          // Ajustar zoom para mostrar a planta baixa
          map.fitBounds(bounds);
        }
      }
    },
    [map]
  );

  // Limpar planta baixa
  const clearFloorPlan = useCallback(() => {
    if (floorPlanOverlayRef.current) {
      floorPlanOverlayRef.current.setMap(null);
      floorPlanOverlayRef.current = null;
    }
    if (floorPlanPolygonRef.current) {
      floorPlanPolygonRef.current.setMap(null);
      floorPlanPolygonRef.current = null;
    }
  }, []);

  return {
    map,
    markers,
    infoWindows,
    isLoaded,
    error,
    mapRef,
    addMarker,
    removeMarker,
    clearMarkers,
    fitBounds,
    setFloorPlan,
    clearFloorPlan,
  };
};
