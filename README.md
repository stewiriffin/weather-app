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
│   └── page.tsx              # Main page with weather dashboard
├── components/
│   ├── SearchBox.tsx         # City search input component
│   ├── CurrentWeather.tsx    # Current weather display
│   ├── Forecast.tsx          # 5-day forecast component
│   └── WeatherSkeleton.tsx   # Loading skeleton component
├── lib/
│   └── weather.ts            # Weather API utility functions
├── types/
│   └── weather.ts            # TypeScript interfaces
├── public/                   # Static assets
├── .env.local                # Environment variables (with API key)
├── .env.local.example        # Example environment file
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Build for Production

1. **Create a production build**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## Features Breakdown

### SearchBox Component
- Clean input field with search icon
- Loading state during API requests
- Form validation

### CurrentWeather Component
- Large temperature display
- City name and country
- Weather condition icon and description
- Feels-like temperature
- High/Low temperatures
- Weather details grid (wind speed, humidity, pressure, visibility)

### Forecast Component
- 5-day weather forecast
- Daily temperature predictions
- Weather icons and descriptions
- High/Low temperatures for each day

### WeatherSkeleton Component
- Animated loading skeleton
- Matches the layout of actual weather data
- Provides visual feedback during data fetching

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

## License

This project is open source and available for personal and commercial use.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Lucide React](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)
