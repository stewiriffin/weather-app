# Weather Dashboard

A production-ready, modern Weather Dashboard built with Next.js 14+, TypeScript, and Tailwind CSS. Get real-time weather updates and 5-day forecasts for any city worldwide.

## Features

- **Real-time Weather Data**: Current weather conditions including temperature, humidity, wind speed, and pressure
- **5-Day Forecast**: Extended weather forecast with daily predictions
- **Beautiful UI**: Modern glassmorphism design with smooth animations
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Type-Safe**: Built with TypeScript for enhanced reliability
- **Error Handling**: Comprehensive error handling for network requests and invalid inputs
- **Loading States**: Skeleton loaders for better user experience

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **API**: OpenWeatherMap API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenWeatherMap API key (free tier available)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:

   The API key is already configured in the `.env.local` file. If you need to use a different API key:

   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Update the `.env.local` file with your API key:
     ```
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
     ```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   - Local: [http://localhost:3000](http://localhost:3000)
   - Or the port shown in your terminal (usually 3000, 3001, or 3002)

3. **Search for a city** to see the current weather and 5-day forecast

## Project Structure

```
Weather/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   ├── manifest.ts           # PWA manifest configuration
│   └── page.tsx              # Main page with weather dashboard
├── components/
│   ├── AirQuality.tsx        # Air quality display component
│   ├── CurrentWeather.tsx    # Current weather display
│   ├── ErrorBoundary.tsx     # Error boundary component
│   ├── Forecast.tsx          # 5-day forecast component
│   ├── HourlyForecast.tsx    # Hourly forecast component
│   ├── SearchBox.tsx         # City search input component
│   ├── TemperatureChart.tsx  # Temperature chart component
│   ├── UnitToggle.tsx        # Temperature unit toggle
│   ├── WeatherBackground.tsx # Dynamic weather background
│   └── WeatherSkeleton.tsx   # Loading skeleton component
├── lib/
│   ├── cache.ts              # API response caching
│   ├── env.ts                # Environment variable validation
│   ├── utils.ts              # Utility functions
│   ├── weather.ts            # Weather API utility functions
│   └── WeatherContext.tsx    # Weather context provider
├── types/
│   └── weather.ts            # TypeScript interfaces
├── __tests__/                # Test files
│   ├── components/           # Component tests
│   └── lib/                  # Library tests
├── public/                   # Static assets (PWA icons go here)
├── .env.local                # Environment variables (with API key)
├── .env.local.example        # Example environment file
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup file
├── package.json              # Project dependencies
├── PWA_ICONS.md              # PWA icons setup guide
└── README.md                 # This file
```

## Testing

The project includes unit tests using Jest and React Testing Library.

1. **Run tests**:
   ```bash
   npm test
   ```

2. **Run tests in watch mode**:
   ```bash
   npm run test:watch
   ```

3. **Generate coverage report**:
   ```bash
   npm run test:coverage
   ```

## Build for Production

1. **Set up PWA icons** (see `PWA_ICONS.md` for details):
   - Create `icon-192x192.png` and `icon-512x512.png`
   - Place them in the `public/` directory

2. **Create a production build**:
   ```bash
   npm run build
   ```

3. **Start the production server**:
   ```bash
   npm start
   ```

## Features Breakdown

### SearchBox Component
- Clean input field with search icon
- Loading state during API requests
- Form validation
- Recent searches with localStorage persistence
- Geolocation support
- Full keyboard navigation and ARIA labels

### CurrentWeather Component
- Large temperature display
- City name and country
- Weather condition icon and description
- Feels-like temperature
- High/Low temperatures
- Weather details grid (wind speed, humidity, pressure, visibility)
- Accessible with proper ARIA labels

### Forecast Component
- 5-day weather forecast
- Hourly forecast (next 24 hours)
- Daily temperature predictions
- Weather icons and descriptions
- High/Low temperatures for each day
- Tabbed interface with smooth animations

### AirQuality Component
- Real-time air quality index (AQI)
- Detailed pollutant information (PM2.5, PM10, O₃, NO₂)
- Visual AQI indicator with color coding
- Health recommendations based on AQI level

### Additional Features
- **Error Boundary**: Graceful error handling with recovery options
- **API Caching**: Reduces API calls with intelligent caching (5 min for weather, 1 hour for air quality)
- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **Temperature Chart**: Visual temperature trends using Recharts
- **Dynamic Backgrounds**: Weather-appropriate gradient backgrounds
- **PWA Support**: Installable as a Progressive Web App
- **Accessibility**: Full keyboard navigation, ARIA labels, screen reader support
- **Environment Validation**: Validates required environment variables

## API Integration

The application uses the OpenWeatherMap API to fetch:
- Current weather data
- 5-day weather forecast

All API calls include comprehensive error handling for:
- Network failures
- Invalid city names
- Missing API keys
- Rate limiting

## Responsive Design

The dashboard is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## PWA Icons Setup

This app is configured as a Progressive Web App (PWA). To complete the setup, you need to add PWA icons. See `PWA_ICONS.md` for detailed instructions on creating and adding the required icon files.

## Improvements Made

This project has been enhanced with:
- ✅ Error boundary for graceful error handling
- ✅ API response caching to reduce API calls
- ✅ Air quality integration
- ✅ Comprehensive accessibility improvements (ARIA labels, keyboard navigation)
- ✅ Environment variable validation
- ✅ Unit tests with Jest and React Testing Library
- ✅ Removed console.log statements from production code
- ✅ Improved code organization and documentation

## License

This project is open source and available for personal and commercial use.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Lucide React](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)
