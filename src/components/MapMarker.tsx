import React from "react";
import { MapPoint } from "@/types/map";

interface MapMarkerProps {
  point: MapPoint;
  onClick?: (point: MapPoint) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ point, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(point);
    }
  };

  return (
    <div
      className="cursor-pointer transform transition-transform hover:scale-110"
      onClick={handleClick}
      title={point.title}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg border-2 border-white">
          {point.icon}
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
      </div>
    </div>
  );
};

export default MapMarker;
