import { useEffect, useRef } from "react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { getMapPoints } from "@/data/mapPoints";

const ConsumerMap = () => {
  const { map, isLoaded, error, addMarker, fitBounds, mapRef } =
    useGoogleMaps();
  const mapPoints = getMapPoints();
  const markersAdded = useRef(false);

  // Adicionar marcadores quando o mapa estiver carregado (apenas uma vez)
  useEffect(() => {
    if (isLoaded && map && !markersAdded.current) {
      markersAdded.current = true;

      // Adicionar marcadores
      mapPoints.forEach((point) => {
        addMarker(point);
      });

      // Ajustar zoom para mostrar todos os pontos
      fitBounds(mapPoints);
    }
  }, [isLoaded, map, addMarker, fitBounds, mapPoints]);

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

      <div className="bg-card border-t border-border p-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-foreground mb-2">
            Arena BRB - Complexo Esportivo
          </h3>
          <p className="text-sm text-muted-foreground">
            SRPN - Brasília, DF, 70297-400
          </p>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span>🏟️ Arena BRB Mané Garrincha</span>
            <span>🏀 Ginásio Nilson Nelson</span>
            <span>🅿️ Estacionamento</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerMap;
