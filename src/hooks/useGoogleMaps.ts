import { useCallback, useEffect, useRef, useState } from "react";
import { GOOGLE_MAPS_CONFIG } from "@/config/googleMaps";
import { MapPoint } from "@/types/map";

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
  const floorSelectorRef = useRef<HTMLDivElement | null>(null);
  const nativeIndoorControlRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const isSearchingNativeControl = useRef<boolean>(false);

  // Inicializar o mapa apenas uma vez
  useEffect(() => {
    if (isInitialized) return;

    const initMap = async () => {
      try {
        // Verificar se Google Maps já está carregado
        if (!window.google) {
          // Carregar Google Maps usando o padrão recomendado com loading=async
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${
            GOOGLE_MAPS_CONFIG.apiKey
          }&libraries=${GOOGLE_MAPS_CONFIG.libraries.join(",")}&language=${
            GOOGLE_MAPS_CONFIG.language
          }&region=${GOOGLE_MAPS_CONFIG.region}&loading=async`;
          script.async = true;
          script.defer = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => {
              reject(new Error("Erro ao carregar Google Maps API"));
            };
            document.head.appendChild(script);
          });
        }

        // Aguardar até o Google Maps estar completamente disponível
        let attempts = 0;
        while ((!window.google || !window.google.maps || !window.google.maps.Map || !window.google.maps.MapTypeId) && attempts < 30) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }
        
        if (!window.google || !window.google.maps || !window.google.maps.Map || !window.google.maps.MapTypeId) {
          console.error("❌ Google Maps não está disponível:", {
            google: !!window.google,
            maps: !!window.google?.maps,
            Map: !!window.google?.maps?.Map,
            MapTypeId: !!window.google?.maps?.MapTypeId,
          });
          throw new Error("Google Maps API não carregou completamente após 3 segundos");
        }

        if (mapRef.current && window.google && window.google.maps) {
          console.log("✅ Google Maps está pronto, criando mapa...");
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: -15.783611, lng: -47.899167 }, // Centro na Arena BRB
            zoom: 17, // Zoom para mostrar estádio inteiro e arredores
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            // Estilos para ocultar TODOS os POIs padrões do Google Maps (incluindo os verdes)
            styles: [
              // Ocultar TODOS os POIs padrões (todos os pontos verdes)
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              // Manter estrutura do estádio para mostrar andares (mas sem ícones)
              {
                featureType: "poi.sports_complex",
                elementType: "geometry",
                stylers: [{ visibility: "on" }],
              },
              {
                featureType: "poi.sports_complex",
                elementType: "labels.text",
                stylers: [{ visibility: "on" }],
              },
              // Ocultar ícones de POIs dentro do estádio
              {
                featureType: "poi.sports_complex",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
            ],
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            clickableIcons: false,
            gestureHandling: "greedy",
            // Habilitar controles de andares (indoor maps)
            indoorPicker: true,
          });

          // Configurar listener para detectar quando controles de andares aparecem
          // Os controles nativos aparecem automaticamente quando há dados de indoor
          // e o zoom está alto (19+)
          google.maps.event.addListenerOnce(mapInstance, 'idle', () => {
            // Verificar se controles de andares apareceram
            setTimeout(() => {
              const indoorControl = document.querySelector('.gm-indoor-level-picker');
              if (indoorControl) {
                console.log("✅ Controles de andares nativos detectados!");
              }
            }, 1000);
          });

          setMap(mapInstance);
          setIsLoaded(true);
          setIsInitialized(true);
          console.log("✅ Mapa inicializado com sucesso!");
        } else {
          throw new Error("mapRef.current não está disponível");
        }
      } catch (err) {
        console.error("❌ Erro ao inicializar o mapa:", err);
        setError(
          `Erro ao carregar o Google Maps: ${
            err instanceof Error ? err.message : "Erro desconhecido"
          }`
        );
      }
    };

    initMap();
  }, [isInitialized]);

  // Função para remover controle de andares
  const removeFloorSelector = useCallback(() => {
    // Desconectar observer se existir
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    if (floorSelectorRef.current && floorSelectorRef.current.parentNode) {
      floorSelectorRef.current.parentNode.removeChild(floorSelectorRef.current);
      floorSelectorRef.current = null;
    } else {
      const existing = document.getElementById("floor-selector");
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }
    }
    // Não limpar a referência ao controle nativo - pode ser reutilizado
    isSearchingNativeControl.current = false;
  }, []);

  // Função para criar controle de andares customizado (igual ao nativo do Google Maps)
  const createFloorSelector = useCallback((mapInstance: google.maps.Map) => {
    // Remover seletor existente
    removeFloorSelector();

    // Criar container do seletor (estilo idêntico ao Google Maps)
    const selector = document.createElement("div");
    selector.id = "floor-selector";
    selector.style.cssText = `
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      background: white;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 2px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      padding: 8px 4px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-family: Roboto, Arial, sans-serif;
    `;

    // Andares disponíveis (ordem: 3.5, 3, 2, 1, 0)
    const floors = [
      { value: "3.5", label: "3.5" },
      { value: "3", label: "3" },
      { value: "2", label: "2" },
      { value: "1", label: "1" },
      { value: "0", label: "0" },
    ];

    let selectedFloor = "0"; // Padrão: térreo

    floors.forEach((floor) => {
      const button = document.createElement("div");
      button.textContent = floor.label;
      button.style.cssText = `
        width: 36px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${selectedFloor === floor.value ? "#4285f4" : "#ffffff"};
        color: ${selectedFloor === floor.value ? "white" : "#333333"};
        font-size: 13px;
        font-weight: ${selectedFloor === floor.value ? "500" : "400"};
        cursor: pointer;
        border-radius: 2px;
        user-select: none;
        transition: background-color 0.1s;
      `;

      button.addEventListener("mouseenter", () => {
        if (selectedFloor !== floor.value) {
          button.style.background = "#f5f5f5";
        }
      });

      button.addEventListener("mouseleave", () => {
        if (selectedFloor !== floor.value) {
          button.style.background = "#ffffff";
        }
      });

      button.addEventListener("click", (e) => {
        // Prevenir propagação para evitar triggers múltiplos
        e.stopPropagation();
        
        // Atualizar seleção visual
        selectedFloor = floor.value;
        floors.forEach((f, idx) => {
          const btnElement = selector.children[idx] as HTMLElement;
          if (btnElement) {
            if (f.value === floor.value) {
              btnElement.style.background = "#4285f4";
              btnElement.style.color = "white";
              btnElement.style.fontWeight = "500";
            } else {
              btnElement.style.background = "#ffffff";
              btnElement.style.color = "#333333";
              btnElement.style.fontWeight = "400";
            }
          }
        });

        // Fechar o pop-up ao trocar de andar
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
          openInfoWindowRef.current = null;
        }

        // Tentar mudar o andar usando o controle nativo
        const tryChangeFloor = () => {
          try {
            // Usar referência guardada ou procurar novamente
            let nativeControl: HTMLElement | null = nativeIndoorControlRef.current;
            
            if (!nativeControl) {
              // Procurar controle nativo
              nativeControl = document.querySelector('.gm-indoor-level-picker') as HTMLElement;
              
              if (!nativeControl && mapRef.current) {
                const allDivs = mapRef.current.querySelectorAll('div');
                for (const div of allDivs) {
                  const text = div.textContent || '';
                  if (text.includes('3.5') && text.includes('3') && text.includes('2') && text.includes('1') && text.includes('0')) {
                    const style = window.getComputedStyle(div);
                    const rect = div.getBoundingClientRect();
                    if (style.position === 'absolute' && div !== floorSelectorRef.current && rect.right > window.innerWidth - 50) {
                      nativeControl = div as HTMLElement;
                      nativeIndoorControlRef.current = nativeControl;
                      break;
                    }
                  }
                }
              }
            }
            
            if (nativeControl) {
              // Procurar botões filhos (ordem: 3.5, 3, 2, 1, 0)
              const children = Array.from(nativeControl.children);
              const floorIndexMap: Record<string, number> = {
                "3.5": 0,
                "3": 1,
                "2": 2,
                "1": 3,
                "0": 4,
              };
              const targetIndex = floorIndexMap[floor.value];
              
              if (children[targetIndex] && children[targetIndex] instanceof HTMLElement) {
                // Clicar no botão correspondente
                (children[targetIndex] as HTMLElement).click();
                console.log(`✅ Mudado para andar ${floor.label} via controle nativo`);
                return true;
              } else {
                // Tentar encontrar por texto
                for (const child of children) {
                  const text = (child.textContent || '').trim();
                  if (text === floor.value || text === floor.label) {
                    (child as HTMLElement).click();
                    console.log(`✅ Mudado para andar ${floor.label} por texto`);
                    return true;
                  }
                }
              }
            }
            
            return false;
          } catch (err) {
            console.error("Erro ao mudar andar:", err);
            return false;
          }
        };
        
        // Tentar imediatamente
        if (!tryChangeFloor()) {
          // Se não funcionou, tentar após um pequeno delay
          setTimeout(() => {
            tryChangeFloor();
          }, 300);
        }
      });

      selector.appendChild(button);
    });

    // Adicionar ao container do mapa
    if (mapRef.current) {
      mapRef.current.appendChild(selector);
      floorSelectorRef.current = selector;
    }
    
    // Observar se o controle nativo aparece (com proteção contra loop)
    const observer = new MutationObserver(() => {
      // Prevenir múltiplas execuções simultâneas
      if (isSearchingNativeControl.current) {
        return;
      }
      
      isSearchingNativeControl.current = true;
      
      // Procurar controle nativo
      let nativeControl = document.querySelector('.gm-indoor-level-picker') as HTMLElement;
      
      // Se não encontrou, procurar por texto e posição
      if (!nativeControl && mapRef.current) {
        const allDivs = mapRef.current.querySelectorAll('div');
        for (const div of allDivs) {
          const text = div.textContent || '';
          // Verificar se contém todos os números dos andares
          if (text.includes('3.5') && text.includes('3') && text.includes('2') && text.includes('1') && text.includes('0')) {
            const style = window.getComputedStyle(div);
            const rect = div.getBoundingClientRect();
            // Verificar se está à direita (onde o controle nativo geralmente aparece)
            if (style.position === 'absolute' && div !== floorSelectorRef.current && rect.right > window.innerWidth - 50) {
              nativeControl = div as HTMLElement;
              break;
            }
          }
        }
      }
      
      if (nativeControl && !nativeIndoorControlRef.current) {
        // Guardar referência ao controle nativo para usar depois
        nativeIndoorControlRef.current = nativeControl;
        console.log("✅ Controle nativo detectado e armazenado!");
        
        // Esconder nosso controle customizado se o nativo apareceu
        if (floorSelectorRef.current) {
          (floorSelectorRef.current as HTMLElement).style.display = 'none';
          console.log("👁️ Controle customizado escondido (usando nativo)");
        }
        
        // Desconectar observer imediatamente após encontrar o controle nativo
        observer.disconnect();
        observerRef.current = null;
        isSearchingNativeControl.current = false;
      } else {
        isSearchingNativeControl.current = false;
      }
    });
    
    observerRef.current = observer;
    
    // Observar mudanças no DOM
    if (mapRef.current) {
      observer.observe(mapRef.current, { 
        childList: true, 
        subtree: true,
        attributes: false, // Não observar mudanças de atributos para reduzir triggers
      });
    }
    
    // Parar observação após 5 segundos (reduzido de 10)
    setTimeout(() => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      isSearchingNativeControl.current = false;
    }, 5000);
  }, [removeFloorSelector]);

  // Adicionar evento de clique no mapa para fechar InfoWindows e remover controle
  useEffect(() => {
    if (map) {
      const clickListener = map.addListener("click", () => {
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
          openInfoWindowRef.current = null;
        }
        removeFloorSelector();
      });

      return () => {
        google.maps.event.removeListener(clickListener);
        removeFloorSelector();
      };
    }
  }, [map, removeFloorSelector]);

  // Função para buscar foto do local
  const getPlacePhoto = async (
    placeName: string,
    position: { lat: number; lng: number }
  ) => {
    try {
      if (!map) return "";

      const service = new google.maps.places.PlacesService(map);

      const searchQueries = [
        placeName,
        `${placeName} Brasília`,
        `${placeName} DF Brasil`,
      ];

      for (const query of searchQueries) {
        const request = {
          query: query,
          location: new google.maps.LatLng(position.lat, position.lng),
          radius: 5000,
          fields: ["photos", "name"],
        };

        const result = await new Promise<string>((resolve) => {
          service.textSearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results.length > 0
            ) {
              const bestMatch = results[0];
              if (bestMatch.photos && bestMatch.photos.length > 0) {
                const photo = bestMatch.photos[0];
                const photoUrl = photo.getUrl({ maxWidth: 500, maxHeight: 350 });
                resolve(photoUrl);
              } else {
                resolve("");
              }
            } else {
              resolve("");
            }
          });
        });

        if (result) {
          return result;
        }
      }

      return "";
    } catch (error) {
      console.error("Erro ao buscar foto:", error);
      return "";
    }
  };

  // Adicionar marcador
  const addMarker = useCallback(
    async (point: MapPoint) => {
      if (!map) {
        console.log("⚠️ Mapa não está disponível ainda");
        return;
      }

      console.log(`📍 Adicionando marcador: ${point.title}`, point.position);

      // Criar marcador simples (padrão do Google Maps ou customizado simples)
      const marker = new google.maps.Marker({
        position: point.position,
        map: map,
        title: point.title,
        // Usar marcador padrão do Google Maps (vermelho)
        // Para customizar, descomente as linhas abaixo:
        // icon: {
        //   url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        //     <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        //       <circle cx="20" cy="20" r="18" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
        //     </svg>
        //   `)}`,
        //   scaledSize: new google.maps.Size(40, 40),
        //   anchor: new google.maps.Point(20, 20),
        // },
      });

      // Buscar foto do local
      const photoUrl = await getPlacePhoto(point.title, point.position);

      // Criar InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 20px; max-width: 380px; font-family: Arial, sans-serif; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #3b82f6;">
              <span style="font-size: 28px; margin-right: 12px;">${point.icon}</span>
              <h3 style="margin: 0; font-size: 20px; font-weight: bold; color: #1f2937;">${point.title}</h3>
            </div>
            ${point.description ? `
              <div style="margin: 12px 0; padding: 12px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.5;">${point.description}</p>
              </div>
            ` : ""}
            ${photoUrl ? `
              <div style="margin: 16px 0;">
                <img src="${photoUrl}" alt="${point.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
              </div>
            ` : `
              <div style="margin: 16px 0; padding: 20px; background: #f3f4f6; border-radius: 10px; text-align: center; border: 2px dashed #d1d5db;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">📷 Imagem não disponível</p>
              </div>
            `}
            <div style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 10px; color: white;">
              <div style="display: flex; align-items: center;">
                <span style="font-size: 16px; margin-right: 8px;">🕒</span>
                <span style="font-weight: 600; font-size: 14px;">Horário: 24h (consulte eventos específicos)</span>
              </div>
            </div>
          </div>
        `,
      });

      // Adicionar evento de clique
      marker.addListener("click", () => {
        // Fechar a InfoWindow atualmente aberta (se houver)
        if (openInfoWindowRef.current) {
          openInfoWindowRef.current.close();
          openInfoWindowRef.current = null;
        }

        // Abrir InfoWindow (SEM mudar zoom - manter zoom atual)
        infoWindow.open(map, marker);
        openInfoWindowRef.current = infoWindow;

        // Se for o Mané Garrincha, criar controle de andares
        if (point.id === "arena-brb" && map) {
          createFloorSelector(map);
        } else {
          // Para outros pontos, remover controle de andares
          removeFloorSelector();
        }
      });

      setMarkers((prev) => [...prev, marker]);
      setInfoWindows((prev) => [...prev, infoWindow]);
    },
    [map, createFloorSelector, removeFloorSelector]
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
    },
    [map]
  );

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
  };
};
