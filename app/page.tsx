'use client';

import { useState, useEffect } from 'react';
import { AmanaTransportationData, BusLine } from '@/types';
import { fetchTransportationData } from '@/lib/api';
import Dashboard from '@/components/Dashboard';
import Map from '@/components/Map';
import BusList from '@/components/BusList';
import BusDetails from '@/components/BusDetails';

export default function Home() {
  const [data, setData] = useState<AmanaTransportationData | null>(null);
  const [selectedBusId, setSelectedBusId] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const transportationData = await fetchTransportationData();
        setData(transportationData);
        setError(null);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        setError('Failed to load transportation data. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleBusSelect = (busId: number) => {
    setSelectedBusId(busId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transportation data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Unable to load data</h2>
          <p className="text-gray-600 mb-4">{error || 'An unexpected error occurred'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectedBus = selectedBusId ? data.bus_lines.find(bus => bus.id === selectedBusId) ?? null : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <img src="/amana_bootcamp_logo.jpg" alt="Amana Transportation" className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Amana Transportation</h1>
                <p className="text-sm text-gray-600">Real-time Bus Tracking System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live Data</span>
              {lastUpdated && (
                <span className="text-xs">• Updated {lastUpdated}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard */}
        <div className="mb-8">
          <Dashboard
            operationalSummary={data.operational_summary}
            companyInfo={data.company_info}
          />
        </div>

        {/* Map and Bus List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Live Map</h2>
              <div className="h-96 lg:h-[500px]">
                <Map
                  busLines={data.bus_lines}
                  selectedBusId={selectedBusId}
                  onBusSelect={handleBusSelect}
                />
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="lg:col-span-1">
            <BusList
              busLines={data.bus_lines}
              selectedBusId={selectedBusId}
              onBusSelect={handleBusSelect}
            />
          </div>
        </div>

        {/* Bus Details */}
        <div className="mb-8">
          <BusDetails bus={selectedBus} />
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t">
          <p>© 2024 Amana Transportation. All rights reserved.</p>
          <p className="mt-1">
            Modern public bus service connecting key areas in Kuala Lumpur and surrounding regions
          </p>
        </footer>
      </main>
    </div>
  );
}
