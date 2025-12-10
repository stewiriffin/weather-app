'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Units } from './weather';

interface WeatherContextType {
  units: Units;
  toggleUnits: () => void;
  recentSearches: string[];
  addRecentSearch: (city: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<Units>('metric');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedUnits = localStorage.getItem('weatherUnits') as Units;
    if (savedUnits) {
      setUnits(savedUnits);
    }

    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  const toggleUnits = () => {
    setUnits((prev) => {
      const newUnits = prev === 'metric' ? 'imperial' : 'metric';
      localStorage.setItem('weatherUnits', newUnits);
      return newUnits;
    });
  };

  const addRecentSearch = (city: string) => {
    setRecentSearches((prev) => {
      // Remove duplicates and add new search at the beginning
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      const updated = [city, ...filtered].slice(0, 3); // Keep only last 3
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <WeatherContext.Provider value={{ units, toggleUnits, recentSearches, addRecentSearch }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
