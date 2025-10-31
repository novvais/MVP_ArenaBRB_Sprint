import { useEffect, useRef } from "react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { getMapPoints, getFloorPlanByFloor } from "@/data/mapPoints";

const ConsumerMap = () => {
  const {
    map,
    isLoaded,
    error,
    addMarker,
    fitBounds,
    mapRef,
    setFloorPlan,
    clearFloorPlan,
  } = useGoogleMaps();
  const mapPoints = getMapPoints();
  const markersAdded = useRef(false);
  const floorListenersAdded = useRef(false);

  // Adicionar marcador do Estádio Mané Garrincha quando o mapa estiver carregado
  useEffect(() => {
    if (isLoaded && map && !markersAdded.current) {
      markersAdded.current = true;

      // Filtrar apenas o ponto do Estádio Mané Garrincha
      const arenaPoint = mapPoints.find((point) => point.id === "arena-brb");

      if (arenaPoint) {
        addMarker(arenaPoint);
        fitBounds([arenaPoint]);
      }
    }
  }, [isLoaded, map, addMarker, mapPoints, fitBounds]);

  // Detectar mudanças no controle de andares nativo do Google Maps
  useEffect(() => {
    if (!isLoaded || !map || floorListenersAdded.current) return;

    let cleanup: (() => void) | null = null;

    const setupFloorListeners = () => {
      // Procurar pelo controle nativo de andares
      const indoorControl = document.querySelector(".gm-indoor-level-picker");

      if (indoorControl && !floorListenersAdded.current) {
        floorListenersAdded.current = true;
        console.log(
          "✅ Controle de andares nativo encontrado, configurando listeners..."
        );

        // Função para mapear o valor do controle para o número do andar
        const mapFloorValue = (value: string): number | null => {
          // O controle nativo pode ter valores como "3.5", "3", "2", "1", "0"
          if (value === "3.5") return 3; // 3.5 mapeia para o 3º andar VIP
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            return numValue;
          }
          return null;
        };

        // Função para atualizar a planta baixa baseada no botão selecionado
        const updateFloorPlan = () => {
          const buttons = indoorControl.querySelectorAll(
            'div[role="button"], button, div[tabindex="0"]'
          );

          buttons.forEach((button) => {
            const buttonElement = button as HTMLElement;
            const computedStyle = window.getComputedStyle(buttonElement);
            const bgColor = computedStyle.backgroundColor;

            // Verificar se é o botão selecionado (pela cor de fundo azul do Google Maps)
            const isSelected =
              buttonElement.classList.contains("gm-selected") ||
              buttonElement.getAttribute("aria-selected") === "true" ||
              bgColor.includes("rgb(66, 133, 244)") || // Azul do Google Maps
              bgColor.includes("rgb(26, 115, 232)") ||
              bgColor === "rgb(66, 133, 244)" ||
              bgColor === "rgb(26, 115, 232)";

            if (isSelected) {
              const floorText = buttonElement.textContent?.trim() || "";
              const floorNumber = mapFloorValue(floorText);

              if (floorNumber !== null) {
                const floorPlan = getFloorPlanByFloor(floorNumber);
                if (floorPlan) {
                  setFloorPlan(floorPlan);
                  console.log(
                    `✅ Planta baixa atualizada para: ${floorPlan.floorName} (${floorText})`
                  );
                } else {
                  clearFloorPlan();
                  console.log(
                    `⚠️ Andar ${floorText} não encontrado, limpando planta baixa`
                  );
                }
              }
            }
          });
        };

        // Observar mudanças no controle usando MutationObserver
        const observer = new MutationObserver(() => {
          updateFloorPlan();
        });

        observer.observe(indoorControl, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "aria-selected"],
        });

        // Também observar mudanças de estilo
        const styleObserver = new MutationObserver(() => {
          updateFloorPlan();
        });

        // Observar mudanças de estilo em todos os botões
        const buttons = indoorControl.querySelectorAll(
          'div[role="button"], button, div[tabindex="0"]'
        );
        buttons.forEach((button) => {
          styleObserver.observe(button, {
            attributes: true,
            attributeFilter: ["style", "class"],
          });
        });

        // Adicionar listener de clique no container para capturar qualquer clique
        const handleClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target.closest(".gm-indoor-level-picker")) {
            setTimeout(() => {
              updateFloorPlan();
            }, 150);
          }
        };

        document.addEventListener("click", handleClick);

        // Atualizar inicialmente
        updateFloorPlan();

        // Reobservar quando novos botões aparecerem
        const checkNewButtons = setInterval(() => {
          if (!indoorControl.parentNode) {
            clearInterval(checkNewButtons);
            floorListenersAdded.current = false;
            // Chamar cleanup antes de retornar para evitar vazamentos de memória
            if (cleanup) {
              cleanup();
            } else {
              // Se cleanup ainda não foi definido, fazer limpeza manualmente
              observer.disconnect();
              styleObserver.disconnect();
              document.removeEventListener("click", handleClick);
            }
            return;
          }

          const currentButtons = indoorControl.querySelectorAll(
            'div[role="button"], button, div[tabindex="0"]'
          );
          currentButtons.forEach((button) => {
            if (!button.hasAttribute("data-observed")) {
              button.setAttribute("data-observed", "true");
              styleObserver.observe(button, {
                attributes: true,
                attributeFilter: ["style", "class"],
              });
            }
          });
        }, 1000);

        // Função de limpeza
        cleanup = () => {
          observer.disconnect();
          styleObserver.disconnect();
          document.removeEventListener("click", handleClick);
          clearInterval(checkNewButtons);
        };
      }
    };

    // Tentar configurar imediatamente
    setupFloorListeners();

    // Se não encontrou, tentar novamente após delays
    const timeout1 = setTimeout(() => {
      if (!floorListenersAdded.current) {
        setupFloorListeners();
      }
    }, 1000);

    const timeout2 = setTimeout(() => {
      if (!floorListenersAdded.current) {
        setupFloorListeners();
      }
    }, 3000);

    // Tentar quando o mapa fica "idle"
    const idleListener = google.maps.event.addListener(map, "idle", () => {
      setTimeout(() => {
        if (!floorListenersAdded.current) {
          setupFloorListeners();
        }
      }, 500);
    });

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      google.maps.event.removeListener(idleListener);
      if (cleanup) cleanup();
    };
  }, [isLoaded, map, setFloorPlan, clearFloorPlan]);

  if (error) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <header className="bg-card border-b border-border p-4 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <img
              src={logoConsumidorArenaBRB}
              alt="Arena BRB"
              className="h-12"
            />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Erro ao carregar o mapa
            </h2>
            <p className="text-muted-foreground">{error}</p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm">Debug info:</p>
              <p className="text-xs">isLoaded: {isLoaded.toString()}</p>
              <p className="text-xs">map: {map ? "Sim" : "Não"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border p-4 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <div className="flex-1 relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-muted-foreground">Carregando mapa...</p>
            </div>
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: "400px" }}
        />
      </div>
    </div>
  );
};

export default ConsumerMap;
