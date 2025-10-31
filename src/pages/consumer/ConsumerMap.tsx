import { useEffect, useRef, useState } from "react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import {
  getMapPoints,
  getFloorPlans,
  getMapPointsByFloor,
  getFloorPlanByFloor,
} from "@/data/mapPoints";
import FloorSelector from "@/components/FloorSelector";
import { Button } from "@/components/ui/button";
import { MapPoint } from "@/types/map";

const ConsumerMap = () => {
  const {
    map,
    isLoaded,
    error,
    addMarker,
    removeMarker,
    clearMarkers,
    fitBounds,
    mapRef,
    setFloorPlan,
    clearFloorPlan,
  } = useGoogleMaps();
  const mapPoints = getMapPoints();
  const floorPlans = getFloorPlans();
  const markersAdded = useRef(false);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [isIndoorMode, setIsIndoorMode] = useState(false);

  // Adicionar marcadores quando o mapa estiver carregado (apenas uma vez)
  useEffect(() => {
    if (isLoaded && map && !markersAdded.current) {
      markersAdded.current = true;

      // Adicionar apenas marcadores externos (sem andar) inicialmente
      const externalPoints = mapPoints.filter(
        (point) => point.floor === undefined
      );
      externalPoints.forEach((point) => {
        addMarker(point);
      });

      // Ajustar zoom para mostrar todos os pontos externos
      fitBounds(externalPoints.length > 0 ? externalPoints : mapPoints);
    }
  }, [isLoaded, map, addMarker, fitBounds, mapPoints]);

  // Lidar com mudança de andar
  const handleFloorChange = (floor: number) => {
    if (!map) return;

    // Limpar marcadores atuais
    clearMarkers();

    // Obter pontos do andar selecionado e pontos externos
    const floorPoints = getMapPointsByFloor(floor);
    const externalPoints = mapPoints.filter(
      (point) => point.floor === undefined
    );
    const allPointsToShow = [...floorPoints, ...externalPoints];

    // Adicionar novos marcadores
    allPointsToShow.forEach((point) => {
      addMarker(point);
    });

    // Ajustar zoom
    fitBounds(allPointsToShow);

    // Definir planta baixa se existir
    const floorPlan = getFloorPlanByFloor(floor);
    if (floorPlan) {
      setFloorPlan(floorPlan);
      setSelectedFloor(floor);
      setIsIndoorMode(true);
    }
  };

  // Sair do modo indoor (voltar para visão externa)
  const handleExitIndoorMode = () => {
    if (!map) return;

    clearMarkers();
    clearFloorPlan();

    // Adicionar apenas pontos externos
    const externalPoints = mapPoints.filter(
      (point) => point.floor === undefined
    );
    externalPoints.forEach((point) => {
      addMarker(point);
    });

    fitBounds(externalPoints.length > 0 ? externalPoints : mapPoints);
    setSelectedFloor(null);
    setIsIndoorMode(false);
  };

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
        <div className="max-w-6xl mx-auto flex items-center justify-center relative">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
          {isIndoorMode && (
            <Button
              onClick={handleExitIndoorMode}
              variant="outline"
              size="sm"
              className="absolute right-0"
            >
              🌐 Visão Externa
            </Button>
          )}
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

        {/* Seletor de andares */}
        <FloorSelector
          floors={floorPlans.map((plan) => ({
            floor: plan.floor,
            floorName: plan.floorName,
          }))}
          selectedFloor={selectedFloor || -1}
          onFloorChange={handleFloorChange}
        />

        {/* Indicador de andar atual */}
        {isIndoorMode && selectedFloor !== null && (
          <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-3">
            <div className="text-sm font-semibold text-gray-700">
              {floorPlans.find((p) => p.floor === selectedFloor)?.floorName}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Arena BRB Mané Garrincha
            </div>
          </div>
        )}
      </div>

      <div className="bg-card border-t border-border p-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-foreground mb-2">
            Arena BRB - Complexo Esportivo
          </h3>
          <p className="text-sm text-muted-foreground">
            SRPN - Brasília, DF, 70297-400
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
            <span>🏟️ Arena BRB Mané Garrincha</span>
            <span>🏀 Ginásio Nilson Nelson</span>
            <span>🅿️ Estacionamento</span>
            <span>🚪 Entradas/Saídas</span>
            <span>🛗 Elevadores</span>
            <span>🪜 Escadas</span>
            <span>🍽️ Restaurantes</span>
            <span>🚻 Banheiros</span>
          </div>
          {isIndoorMode && (
            <p className="text-xs text-blue-600 font-medium mt-2">
              ℹ️ Clique nos números à esquerda para navegar entre os andares
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerMap;
