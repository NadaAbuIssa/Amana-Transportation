'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import { BusLine, BusStop } from '@/types';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  busLines: BusLine[];
  selectedBusId?: number;
  onBusSelect?: (busId: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ busLines, selectedBusId, onBusSelect }) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([3.139, 101.6869]); // KL Sentral as default center

  useEffect(() => {
    if (busLines.length > 0) {
      // Center map on the first active bus or first bus
      const activeBus = busLines.find(bus => bus.status === 'Active') || busLines[0];
      if (activeBus) {
        setMapCenter([activeBus.current_location.latitude, activeBus.current_location.longitude]);
      }
    }
  }, [busLines]);

  const getBusIcon = (bus: BusLine) => {
    const color = bus.status === 'Active' ? '#22c55e' : bus.status === 'Maintenance' ? '#f59e0b' : '#ef4444';
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path fill="${color}" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 11.8 12.5 28.5 12.5 28.5s12.5-16.7 12.5-28.5C25 5.6 19.4 0 12.5 0zm0 17.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
    });
  };

  const getStopIcon = (stop: BusStop) => {
    const color = stop.is_next_stop ? '#3b82f6' : '#6b7280';
    
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
          <circle fill="${color}" cx="7.5" cy="7.5" r="7.5"/>
        </svg>
      `)}`,
      iconSize: [15, 15],
      iconAnchor: [7.5, 7.5],
      popupAnchor: [0, -7.5],
    });
  };

  const getRouteColor = (routeNumber: string) => {
    const colors = {
      'B101': '#ef4444',
      'B205': '#3b82f6',
      'B350': '#10b981',
      'B410': '#f59e0b',
      'B520': '#8b5cf6',
    };
    return colors[routeNumber as keyof typeof colors] || '#6b7280';
  };

  return (
    <div className="w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {busLines.map((bus) => {
          const isSelected = selectedBusId === bus.id;
          
          return (
            <div key={bus.id}>
              {/* Bus current location */}
              <Marker
                position={[bus.current_location.latitude, bus.current_location.longitude]}
                icon={getBusIcon(bus)}
                eventHandlers={{
                  click: () => onBusSelect?.(bus.id),
                }}
              >
               <Popup>
                <div className="p-3 w-56 rounded-xl shadow-lg bg-white dark:bg-gray-900">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-base text-gray-800 dark:text-gray-100">{bus.name}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        bus.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : bus.status === 'Maintenance'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {bus.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Route:</span> {bus.route_number}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Driver:</span> {bus.driver.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Passengers:</span> {bus.passengers.current}/{bus.passengers.capacity}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{bus.current_location.address}</p>
                </div>
              </Popup>

              </Marker>

              {/* Bus stops */}
              {bus.bus_stops.map((stop) => (
                <Marker
                  key={`${bus.id}-${stop.id}`}
                  position={[stop.latitude, stop.longitude]}
                  icon={getStopIcon(stop)}
                >
                  <Popup>
                    <div className="p-2">
                      <h4 className="font-semibold">{stop.name}</h4>
                      <p className="text-sm text-gray-600">Route: {bus.route_number}</p>
                      {stop.estimated_arrival !== 'N/A' && (
                        <p className="text-sm">ETA: {stop.estimated_arrival}</p>
                      )}
                      {stop.is_next_stop && (
                        <p className="text-sm font-semibold text-blue-600">Next Stop</p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Route line */}
              {bus.bus_stops.length > 1 && (
                <Polyline
                  positions={bus.bus_stops.map(stop => [stop.latitude, stop.longitude])}
                  color={getRouteColor(bus.route_number)}
                  weight={3}
                  opacity={isSelected ? 0.8 : 0.4}
                />
              )}
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
