'use client';

import { ReactNode, useMemo } from 'react';
import { motion } from 'framer-motion';

interface WeatherBackgroundProps {
  condition?: string;
  isNight?: boolean;
  children: ReactNode;
}

const weatherGradients = {
  Clear: {
    day: 'from-blue-400 via-cyan-400 to-blue-500',
    night: 'from-indigo-900 via-purple-900 to-slate-900',
  },
  Clouds: {
    day: 'from-gray-400 via-slate-400 to-gray-500',
    night: 'from-slate-800 via-gray-900 to-slate-950',
  },
  Rain: {
    day: 'from-slate-500 via-blue-500 to-slate-600',
    night: 'from-slate-900 via-blue-950 to-black',
  },
  Drizzle: {
    day: 'from-slate-400 via-blue-400 to-slate-500',
    night: 'from-slate-800 via-blue-900 to-slate-950',
  },
  Thunderstorm: {
    day: 'from-gray-700 via-slate-600 to-gray-800',
    night: 'from-gray-900 via-slate-950 to-black',
  },
  Snow: {
    day: 'from-slate-300 via-blue-200 to-slate-400',
    night: 'from-slate-700 via-indigo-900 to-slate-900',
  },
  Mist: {
    day: 'from-gray-300 via-slate-300 to-gray-400',
    night: 'from-gray-800 via-slate-800 to-gray-900',
  },
  Smoke: {
    day: 'from-gray-400 via-slate-400 to-gray-500',
    night: 'from-gray-800 via-slate-900 to-black',
  },
  Haze: {
    day: 'from-orange-300 via-amber-300 to-yellow-400',
    night: 'from-orange-900 via-amber-950 to-slate-900',
  },
  Dust: {
    day: 'from-orange-400 via-amber-400 to-orange-500',
    night: 'from-orange-950 via-amber-950 to-slate-950',
  },
  Fog: {
    day: 'from-gray-400 via-slate-400 to-gray-500',
    night: 'from-gray-900 via-slate-900 to-black',
  },
  Sand: {
    day: 'from-yellow-500 via-amber-500 to-orange-500',
    night: 'from-yellow-950 via-amber-950 to-orange-950',
  },
  Ash: {
    day: 'from-gray-500 via-slate-500 to-gray-600',
    night: 'from-gray-950 via-slate-950 to-black',
  },
  Squall: {
    day: 'from-slate-600 via-gray-600 to-slate-700',
    night: 'from-slate-950 via-gray-950 to-black',
  },
  Tornado: {
    day: 'from-gray-700 via-slate-700 to-gray-800',
    night: 'from-gray-950 via-slate-950 to-black',
  },
  default: {
    day: 'from-blue-500 via-blue-600 to-indigo-700',
    night: 'from-indigo-900 via-purple-900 to-slate-900',
  },
};

export default function WeatherBackground({ condition, isNight = false, children }: WeatherBackgroundProps) {
  const gradient = useMemo(() => {
    const weatherType = condition as keyof typeof weatherGradients;
    const timeOfDay = isNight ? 'night' : 'day';

    if (weatherGradients[weatherType]) {
      return weatherGradients[weatherType][timeOfDay];
    }

    return weatherGradients.default[timeOfDay];
  }, [condition, isNight]);

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000 py-8 px-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
