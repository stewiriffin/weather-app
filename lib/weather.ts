import { CurrentWeatherResponse, ForecastResponse, WeatherData } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export type Units = 'metric' | 'imperial';

interface WeatherQueryParams {
  city?: string;
  lat?: number;
  lon?: number;
  units?: Units;
}

export async function getWeatherData(params: WeatherQueryParams): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
  }

  const { city, lat, lon, units = 'metric' } = params;

  if (!city && (!lat || !lon)) {
    throw new Error('Either city name or coordinates (lat/lon) must be provided.');
  }

  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      units,
      appid: API_KEY,
    });

    if (city) {
      queryParams.append('q', city);
    } else if (lat !== undefined && lon !== undefined) {
      queryParams.append('lat', lat.toString());
      queryParams.append('lon', lon.toString());
    }

    // Fetch current weather
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?${queryParams.toString()}`
    );

    if (!currentWeatherResponse.ok) {
      if (currentWeatherResponse.status === 404) {
        throw new Error('Location not found. Please check and try again.');
      }
      throw new Error(`Failed to fetch weather data: ${currentWeatherResponse.statusText}`);
    }

    const currentWeather: CurrentWeatherResponse = await currentWeatherResponse.json();

    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?${queryParams.toString()}`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Failed to fetch forecast data: ${forecastResponse.statusText}`);
    }

    const forecast: ForecastResponse = await forecastResponse.json();

    return {
      current: currentWeather,
      forecast: forecast,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching weather data.');
  }
}

// Helper function for city search (backwards compatibility)
export async function getWeatherByCity(city: string, units: Units = 'metric'): Promise<WeatherData> {
  return getWeatherData({ city, units });
}

// Helper function for geolocation search
export async function getWeatherByCoords(lat: number, lon: number, units: Units = 'metric'): Promise<WeatherData> {
  return getWeatherData({ lat, lon, units });
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
