'use client';

import { OperationalSummary, CompanyInfo } from '@/types';

interface DashboardProps {
  operationalSummary: OperationalSummary;
  companyInfo: CompanyInfo;
}

const Dashboard: React.FC<DashboardProps> = ({ operationalSummary, companyInfo }) => {
  const stats = [
    {
      title: 'Total Buses',
      value: operationalSummary.total_buses,
      color: 'bg-blue-500',
      icon: '🚌',
    },
    {
      title: 'Active Buses',
      value: operationalSummary.active_buses,
      color: 'bg-green-500',
      icon: '✅',
    },
    {
      title: 'Maintenance',
      value: operationalSummary.maintenance_buses,
      color: 'bg-yellow-500',
      icon: '🔧',
    },
    {
      title: 'Total Capacity',
      value: operationalSummary.total_capacity,
      color: 'bg-purple-500',
      icon: '👥',
    },
    {
      title: 'Current Passengers',
      value: operationalSummary.current_passengers,
      color: 'bg-indigo-500',
      icon: '🚶',
    },
    {
      title: 'Average Utilization',
      value: `${operationalSummary.average_utilization}%`,
      color: 'bg-pink-500',
      icon: '📊',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{companyInfo.name}</h1>
        <p className="text-gray-600">{companyInfo.description}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
          <span>📍 {companyInfo.headquarters}</span>
          <span>🏢 Founded: {companyInfo.founded}</span>
          <span>🚌 {companyInfo.industry}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}>
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">System Status</h3>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-blue-700">
            All systems operational • Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
