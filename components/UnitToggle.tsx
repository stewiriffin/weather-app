'use client';

import { motion } from 'framer-motion';
import { useWeather } from '@/lib/WeatherContext';

export default function UnitToggle() {
  const { units, toggleUnits } = useWeather();

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
      <button
        onClick={toggleUnits}
        className="relative px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
      >
        {units === 'metric' && (
          <motion.div
            layoutId="activeUnit"
            className="absolute inset-0 bg-white/20 rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">°C</span>
      </button>
      <button
        onClick={toggleUnits}
        className="relative px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
      >
        {units === 'imperial' && (
          <motion.div
            layoutId="activeUnit"
            className="absolute inset-0 bg-white/20 rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">°F</span>
      </button>
    </div>
  );
}
