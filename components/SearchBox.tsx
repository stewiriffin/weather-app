'use client';

import { Search, MapPin } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '@/lib/WeatherContext';

interface SearchBoxProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  isLoading: boolean;
}

export default function SearchBox({ onSearch, onLocationSearch, isLoading }: SearchBoxProps) {
  const [city, setCity] = useState('');
  const { recentSearches } = useWeather();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  const handleRecentSearch = (searchCity: string) => {
    onSearch(searchCity);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              disabled={isLoading}
              aria-label="Search for a city"
              aria-describedby="search-description"
              className="w-full px-6 py-4 pr-14 text-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span id="search-description" className="sr-only">Enter a city name to get weather information</span>
            <button
              type="submit"
              disabled={isLoading || !city.trim()}
              aria-label="Search for weather"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={onLocationSearch}
            disabled={isLoading}
            aria-label="Use my current location"
            className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <MapPin className="w-5 h-5" />
            <span className="hidden sm:inline">Use Location</span>
          </button>
        </div>
      </form>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          <span className="text-white/70 text-sm">Recent:</span>
          {recentSearches.map((searchCity, index) => (
            <motion.button
              key={searchCity}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleRecentSearch(searchCity)}
              disabled={isLoading}
              aria-label={`Search for ${searchCity}`}
              className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {searchCity}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
