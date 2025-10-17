'use client';

import dynamic from 'next/dynamic';
import { BusLine } from '@/types';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

interface MapProps {
  busLines: BusLine[];
  selectedBusId?: number;
  onBusSelect?: (busId: number) => void;
}

const Map: React.FC<MapProps> = ({ busLines, selectedBusId, onBusSelect }) => {
  return (
    <MapComponent
      busLines={busLines}
      selectedBusId={selectedBusId}
      onBusSelect={onBusSelect}
    />
  );
};

export default Map;
