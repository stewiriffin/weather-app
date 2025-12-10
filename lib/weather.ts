import { CurrentWeatherResponse, ForecastResponse, WeatherData, AirQualityResponse } from '@/types/weather';
import { validateEnv } from './env';
import { cache, getWeatherCacheKey, getAirQualityCacheKey } from './cache';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
// Cache TTL: 5 minutes for weather data (API updates every 10 minutes)
const WEATHER_CACHE_TTL = 5 * 60 * 1000;
// Cache TTL: 1 hour for air quality (updates less frequently)
const AIR_QUALITY_CACHE_TTL = 60 * 60 * 1000;

function getApiKey(): string {
  const { apiKey } = validateEnv();
  return apiKey;
}

export type Units = 'metric' | 'imperial';

interface WeatherQueryParams {
  city?: string;
  lat?: number;
  lon?: number;
  units?: Units;
}

export async function getWeatherData(params: WeatherQueryParams): Promise<WeatherData> {
  const API_KEY = getApiKey();
  
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
  }

  const { city, lat, lon, units = 'metric' } = params;

  if (!city && (!lat || !lon)) {
    throw new Error('Either city name or coordinates (lat/lon) must be provided.');
  }

  // Check cache first
  const cacheKey = getWeatherCacheKey({ city, lat, lon, units });
  const cachedData = cache.get<WeatherData>(cacheKey);
  if (cachedData) {
    return cachedData;
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

    const weatherData: WeatherData = {
      current: currentWeather,
      forecast: forecast,
    };

    // Cache the result
    cache.set(cacheKey, weatherData, WEATHER_CACHE_TTL);

    return weatherData;
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

/**
 * Get hourly forecast data from the 5-day forecast response
 * The forecast endpoint returns data in 3-hour intervals
 * @param forecast - The forecast response from the API
 * @param hours - Number of hours to return (default: 24, which is 8 segments of 3-hour intervals)
 * @returns Array of forecast items for the specified number of hours
 */
export function getHourlyForecast(forecast: ForecastResponse, hours: number = 24): ForecastResponse['list'] {
  // Each item in the forecast list represents a 3-hour interval
  const segments = Math.ceil(hours / 3);
  return forecast.list.slice(0, segments);
}

/**
 * Get daily forecast data from the 5-day forecast response
 * Filters to get one forecast per day (typically at noon)
 * @param forecast - The forecast response from the API
 * @param days - Number of days to return (default: 5)
 * @returns Array of forecast items, one per day
 */
export function getDailyForecast(forecast: ForecastResponse, days: number = 5): ForecastResponse['list'] {
  // Get one forecast per day (at noon/midday)
  const dailyForecasts = forecast.list.filter((item) => {
    const hour = new Date(item.dt * 1000).getHours();
    return hour === 12;
  });
  return dailyForecasts.slice(0, days);
}

// Air Quality fetch function
export async function getAirQuality(lat: number, lon: number): Promise<AirQualityResponse> {
  const API_KEY = getApiKey();
  
  if (!API_KEY) {
    throw new Error('API key is not configured. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.');
  }

  // Check cache first
  const cacheKey = getAirQualityCacheKey(lat, lon);
  const cachedData = cache.get<AirQualityResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const queryParams = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      appid: API_KEY,
    });

    const response = await fetch(
      `${BASE_URL}/air_pollution?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch air quality data: ${response.statusText}`);
    }

    const airQuality: AirQualityResponse = await response.json();
    
    // Cache the result
    cache.set(cacheKey, airQuality, AIR_QUALITY_CACHE_TTL);
    
    return airQuality;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching air quality data.');
  }
}
