import { AmanaTransportationData } from '@/types';

// Use our local API route to avoid CORS issues
const API_BASE_URL = '/api/transportation';

export async function fetchTransportationData(): Promise<AmanaTransportationData> {
  try {
    const response = await fetch(API_BASE_URL, {
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching transportation data:', error);
    throw error;
  }
}

export async function getBusLines() {
  const data = await fetchTransportationData();
  return data.bus_lines;
}

export async function getCompanyInfo() {
  const data = await fetchTransportationData();
  return data.company_info;
}

export async function getOperationalSummary() {
  const data = await fetchTransportationData();
  return data.operational_summary;
}
