'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { format } from 'date-fns';
import { ForecastResponse } from '@/types/weather';
import { getWeatherIconUrl, getHourlyForecast } from '@/lib/weather';

interface HourlyForecastProps {
  data: ForecastResponse;
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  // Get hourly forecast data (24 hours = 8 segments of 3-hour intervals)
  const hourlyData = getHourlyForecast(data, 24);

  return (
    <div className="w-full">
      {/* Horizontal scrolling container */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="flex gap-4 min-w-min">
          {hourlyData.map((item, index) => (
            <motion.div
              key={item.dt}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 min-w-[100px] cursor-pointer transition-all shadow-lg hover:shadow-xl"
            >
              {/* Time */}
              <p className="text-white/80 text-sm font-medium mb-2">
                {index === 0 ? 'Now' : format(new Date(item.dt * 1000), 'ha')}
              </p>

              {/* Weather Icon */}
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={getWeatherIconUrl(item.weather[0].icon)}
                  alt={item.weather[0].description}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Temperature */}
              <p className="text-white text-xl font-bold mb-1">
                {Math.round(item.main.temp)}°
              </p>

              {/* Weather description */}
              <p className="text-white/60 text-xs text-center capitalize mb-2">
                {item.weather[0].main}
              </p>

              {/* Rain probability */}
              {item.pop > 0 && (
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3 text-blue-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V4a1 1 0 011-1zm-5 8.274l-.818 2.552c-.25.78.409 1.674 1.318 1.674.487 0 .953-.2 1.303-.56l1.767-1.818a1 1 0 00.3-.721v-6.118l-1.878-.751a1 1 0 00-.74 0L5 6.283v5.991z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blue-300 text-xs">{Math.round(item.pop * 100)}%</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
