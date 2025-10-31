import React from "react";
import { cn } from "@/lib/utils";

interface FloorSelectorProps {
  floors: Array<{ floor: number; floorName: string }>;
  selectedFloor: number;
  onFloorChange: (floor: number) => void;
  className?: string;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({
  floors,
  selectedFloor,
  onFloorChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 z-10",
        "bg-white rounded-lg shadow-lg p-2",
        "flex flex-col gap-2",
        className
      )}
    >
      {floors.map((floorData) => (
        <button
          key={floorData.floor}
          onClick={() => onFloorChange(floorData.floor)}
          className={cn(
            "w-12 h-12 rounded-lg font-bold text-sm transition-all duration-200",
            "flex items-center justify-center",
            "hover:scale-110 active:scale-95",
            selectedFloor === floorData.floor
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
          title={floorData.floorName}
        >
          {floorData.floor}
        </button>
      ))}
      {/* Indicador de térreo/andar */}
      <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
    </div>
  );
};

export default FloorSelector;
