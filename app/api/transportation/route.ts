import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation', {
      headers: {
        'User-Agent': 'Amana-Transportation-App/1.0',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching transportation data:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch transportation data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
