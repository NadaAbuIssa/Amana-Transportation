# Amana Transportation - Real-time Bus Tracking System

A modern, responsive web application for tracking public transportation buses in Kuala Lumpur, Malaysia. Built with Next.js, Tailwind CSS, and Leaflet.js for interactive mapping.

## Features

- 🗺️ **Interactive Map**: Real-time bus location tracking with Leaflet.js
- 📊 **Dashboard**: Comprehensive operational summary and statistics
- 🚌 **Bus List**: Detailed view of all bus lines with status and passenger information
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🔄 **Live Data**: Auto-refreshing data every 30 seconds from the API
- 🎯 **Route Visualization**: Color-coded bus routes and stops on the map
- 📋 **Detailed Information**: Driver details, vehicle info, incidents, and passenger load

## Tech Stack

- **Frontend**: Next.js 15.5.5 with React 19
- **Styling**: Tailwind CSS 4
- **Mapping**: Leaflet.js with React-Leaflet
- **Language**: TypeScript
- **API**: Real-time data from Amana Bootcamp API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Amana-Transportation
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Map.tsx           # Dynamic map wrapper (SSR-safe)
│   ├── MapComponent.tsx  # Interactive map with Leaflet
│   ├── BusList.tsx       # Bus list component
│   ├── BusDetails.tsx    # Detailed bus information
│   └── Dashboard.tsx     # Operational dashboard
├── lib/                  # Utility functions
│   └── api.ts           # API integration functions
├── types/               # TypeScript type definitions
│   └── index.ts        # API data types
└── public/             # Static assets
```

## API Integration

The application fetches real-time data from:
```
https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation
```

### Data Structure

The API provides:
- **Company Information**: Name, description, headquarters
- **Bus Lines**: Routes, current locations, passenger counts
- **Operational Summary**: Total buses, capacity, utilization
- **Real-time Updates**: Live bus positions and status

## Key Components

### Map Component
- Interactive map with bus locations and routes
- Color-coded status indicators (Active/Maintenance/Out of Service)
- Clickable markers with detailed popups
- Route visualization with polylines

### Dashboard
- Real-time operational statistics
- Company information display
- System status indicators

### Bus List
- Comprehensive bus information cards
- Passenger load visualization
- Status indicators and incident alerts

### Bus Details
- Detailed view of selected bus
- Driver information
- Vehicle details and maintenance status
- Route stops and estimated arrival times
- Incident reports

## Responsive Design

The application is fully responsive with:
- **Mobile-first approach** using Tailwind CSS
- **Flexible grid layouts** that adapt to screen size
- **Touch-friendly interactions** for mobile devices
- **Optimized map rendering** for different screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Prettier for code formatting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Amana Bootcamp curriculum and is for educational purposes.

## Acknowledgments

- Built for Amana Bootcamp Full Stack Development course
- API data provided by Amana Bootcamp
- Map tiles by OpenStreetMap contributors
- Icons and UI components built with Tailwind CSS
