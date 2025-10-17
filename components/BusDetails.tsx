'use client';

import { BusLine } from '@/types';

interface BusDetailsProps {
  bus: BusLine | null;
}

const BusDetails: React.FC<BusDetailsProps> = ({ bus }) => {
  if (!bus) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🚌</div>
          <h3 className="text-lg font-medium">Select a bus to view details</h3>
          <p className="text-sm">Click on a bus from the list or map to see detailed information</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Maintenance':
        return 'text-yellow-600 bg-yellow-100';
      case 'Out of Service':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{bus.name}</h2>
            <p className="text-gray-600">Route: {bus.route_number}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bus.status)}`}>
            {bus.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Driver Information</h3>
            <p className="text-gray-900"><span className="text-gray-700">Name:</span> {bus.driver.name}</p>
            <p className="text-gray-900"><span className="text-gray-700">ID:</span> {bus.driver.id}</p>
            <p className="text-gray-900"><span className="text-gray-700">Shift:</span> {bus.driver.shift_start} - {bus.driver.shift_end}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Vehicle Information</h3>
            <p className="text-gray-900"><span className="text-gray-700">License:</span> {bus.vehicle_info.license_plate}</p>
            <p className="text-gray-900"><span className="text-gray-700">Model:</span> {bus.vehicle_info.model}</p>
            <p className="text-gray-900"><span className="text-gray-700">Year:</span> {bus.vehicle_info.year}</p>
            <p className="text-gray-900"><span className="text-gray-700">Fuel:</span> {bus.vehicle_info.fuel_level}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Passenger Information</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-900">Current Load</span>
                <span className="text-gray-900">{bus.passengers.current}/{bus.passengers.capacity}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    bus.passengers.utilization_percentage >= 80 ? 'bg-red-500' :
                    bus.passengers.utilization_percentage >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${bus.passengers.utilization_percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-700 mt-1">{bus.passengers.utilization_percentage}% utilization</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Route Information</h3>
            <p className="text-gray-900"><span className="text-gray-700">Distance:</span> {bus.route_info.total_distance} km</p>
            <p className="text-gray-900"><span className="text-gray-700">Avg Speed:</span> {bus.route_info.average_speed} km/h</p>
            <p className="text-gray-900"><span className="text-gray-700">Frequency:</span> {bus.route_info.frequency_minutes} min</p>
            {bus.route_info.estimated_completion !== 'N/A' && (
              <p className="text-gray-900"><span className="text-gray-700">ETA:</span> {bus.route_info.estimated_completion}</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Current Location</h3>
          <p className="text-sm text-gray-900">📍 {bus.current_location.address}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Bus Stops</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {bus.bus_stops.map((stop, index) => (
              <div
                key={stop.id}
                className={`flex items-center p-3 rounded-lg border ${
                  stop.is_next_stop ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                  stop.is_next_stop ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{stop.name}</p>
                  {stop.estimated_arrival !== 'N/A' && (
                    <p className="text-sm text-gray-600">ETA: {stop.estimated_arrival}</p>
                  )}
                </div>
                {stop.is_next_stop && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Next
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {bus.incidents.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Incidents</h3>
            <div className="space-y-2">
              {bus.incidents.map((incident) => (
                <div key={incident.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{incident.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}>
                      {incident.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">{incident.description}</p>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Reported by: {incident.reported_by}</span>
                    <span>{incident.reported_time}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      incident.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      incident.status === 'Reported' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusDetails;
