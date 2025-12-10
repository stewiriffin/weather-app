'use client';

import { useState, useMemo } from 'react';
import { getWeatherData, getWeatherByCoords } from '@/lib/weather';
import { WeatherData } from '@/types/weather';
import SearchBox from '@/components/SearchBox';
import CurrentWeather from '@/components/CurrentWeather';
import Forecast from '@/components/Forecast';
import WeatherSkeleton from '@/components/WeatherSkeleton';
import WeatherBackground from '@/components/WeatherBackground';
import TemperatureChart from '@/components/TemperatureChart';
import UnitToggle from '@/components/UnitToggle';
import { CloudRain } from 'lucide-react';
import { useWeather } from '@/lib/WeatherContext';
import { motion } from 'framer-motion';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

    try {
      const data = await getWeatherData({ city, units });
      setWeatherData(data);
      addRecentSearch(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
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
          console.log('Location acquired:', latitude, longitude);
          const data = await getWeatherByCoords(latitude, longitude, units);
          setWeatherData(data);
          // Add city name to recent searches
          if (data.current.name) {
            addRecentSearch(data.current.name);
          }
        } catch (err) {
          console.error('Location weather fetch error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred while fetching weather data');
          setWeatherData(null);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error - Code:', err.code, 'Message:', err.message);
        let errorMessage = 'Unable to retrieve your location. ';

        switch (err.code) {
          case 1: // PERMISSION_DENIED
            errorMessage += 'Please allow location access in your browser settings.';
            console.log('Permission denied by user');
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage += 'Location information is unavailable.';
            console.log('Position unavailable');
            break;
          case 3: // TIMEOUT
            errorMessage += 'Location request timed out.';
            console.log('Request timed out');
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            console.log('Unknown geolocation error');
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
            <CloudRain className="w-10 h-10 text-white" />
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
              <CloudRain className="w-20 h-20 text-white/60 mx-auto mb-4" />
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
