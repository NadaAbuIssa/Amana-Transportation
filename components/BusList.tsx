'use client';

import { BusLine } from '@/types';

interface BusListProps {
  busLines: BusLine[];
  selectedBusId?: number;
  onBusSelect: (busId: number) => void;
}

const BusList: React.FC<BusListProps> = ({ busLines, selectedBusId, onBusSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Out of Service':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Bus Lines</h2>
      <div className="space-y-3">
        {busLines.map((bus) => (
          <div
            key={bus.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedBusId === bus.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onBusSelect(bus.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{bus.name}</h3>
                <p className="text-sm text-gray-600">Route: {bus.route_number}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(bus.status)}`}>
                {bus.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Driver</p>
                <p className="font-medium">{bus.driver.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Vehicle</p>
                <p className="font-medium">{bus.vehicle_info.license_plate}</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Passenger Load</span>
                <span className="text-sm font-medium">
                  {bus.passengers.current}/{bus.passengers.capacity} ({bus.passengers.utilization_percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getUtilizationColor(bus.passengers.utilization_percentage)}`}
                  style={{ width: `${bus.passengers.utilization_percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              <p>📍 {bus.current_location.address}</p>
              {bus.route_info.estimated_completion !== 'N/A' && (
                <p>🕒 ETA: {bus.route_info.estimated_completion}</p>
              )}
            </div>

            {bus.incidents.length > 0 && (
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm font-medium text-yellow-800">⚠️ {bus.incidents.length} incident(s)</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
