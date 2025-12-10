'use client';

import { useState, useMemo, useEffect } from 'react';
import { getWeatherData, getWeatherByCoords, getAirQuality } from '@/lib/weather';
import { WeatherData, AirQualityResponse } from '@/types/weather';
import SearchBox from '@/components/SearchBox';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import WeatherBackground from '@/components/WeatherBackground';
import TemperatureChart from '@/components/TemperatureChart';
import UnitToggle from '@/components/UnitToggle';
import AirQuality from '@/components/AirQuality';
import { CloudRain } from 'lucide-react';
import { useWeather } from '@/lib/WeatherContext';
import { motion } from 'framer-motion';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAirQuality, setIsLoadingAirQuality] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { units, addRecentSearch } = useWeather();

  // Determine if it's night time based on current weather data
  const isNight = useMemo(() => {
    if (!weatherData) return false;
    const currentTime = weatherData.current.dt;
    const sunrise = weatherData.current.sys.sunrise;
    const sunset = weatherData.current.sys.sunset;
    return currentTime < sunrise || currentTime > sunset;
  }, [weatherData]);

  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setAirQuality(null);

    try {
      const data = await getWeatherData({ city, units });
      setWeatherData(data);
      addRecentSearch(city);
      // Fetch air quality data
      await fetchAirQuality(data.current.coord.lat, data.current.coord.lon);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
      setAirQuality(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAirQuality = async (lat: number, lon: number) => {
    setIsLoadingAirQuality(true);
    try {
      const aqData = await getAirQuality(lat, lon);
      setAirQuality(aqData);
    } catch (err) {
      // Silently fail for air quality - it's not critical
      setAirQuality(null);
    } finally {
      setIsLoadingAirQuality(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude, units);
          setWeatherData(data);
          // Add city name to recent searches
          if (data.current.name) {
            addRecentSearch(data.current.name);
          }
          // Fetch air quality data
          await fetchAirQuality(latitude, longitude);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred while fetching weather data');
          setWeatherData(null);
          setAirQuality(null);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        let errorMessage = 'Unable to retrieve your location. ';

        switch (err.code) {
          case 1: // PERMISSION_DENIED
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage += 'Location information is unavailable.';
            break;
          case 3: // TIMEOUT
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
        }

        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <WeatherBackground
      condition={weatherData?.current.weather[0].main}
      isNight={isNight}
    >
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <CloudRain className="w-10 h-10 text-white" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Weather Dashboard
            </h1>
          </div>
          <p className="text-white/80 text-lg mb-4">
            Get real-time weather updates for any city
          </p>
          <div className="flex justify-center">
            <UnitToggle />
          </div>
        </motion.div>

        {/* Search Box */}
        <SearchBox
          onSearch={handleSearch}
          onLocationSearch={handleLocationSearch}
          isLoading={isLoading}
        />

        {/* Loading State */}
        {isLoading && <WeatherSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl p-6 text-center">
              <p className="text-white text-lg">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Success State - Weather Data */}
        {weatherData && !isLoading && !error && (
          <div>
            <CurrentWeather data={weatherData.current} />
            {airQuality && <AirQuality data={airQuality} />}
            <TemperatureChart data={weatherData.forecast} />
            <Forecast data={weatherData.forecast} />
          </div>
        )}

        {/* Initial State */}
        {!weatherData && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12">
              <CloudRain className="w-20 h-20 text-white/60 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome to Weather Dashboard
              </h2>
              <p className="text-white/80 text-lg">
                Search for a city or use your location to get started
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </WeatherBackground>
  );
}
