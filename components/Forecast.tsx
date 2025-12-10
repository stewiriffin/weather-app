'use client';

import { ForecastResponse } from '@/types/weather';
import { getWeatherIconUrl } from '@/lib/weather';
import { format } from 'date-fns';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ForecastProps {
  data: ForecastResponse;
}

export default function Forecast({ data }: ForecastProps) {
  // Get one forecast per day (at noon/midday)
  const dailyForecasts = data.list.filter((item) => {
    const hour = new Date(item.dt * 1000).getHours();
    return hour === 12;
  }).slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h2>
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dailyForecasts.map((item, index) => {
            const temp = Math.round(item.main.temp);
            const tempMin = Math.round(item.main.temp_min);
            const tempMax = Math.round(item.main.temp_max);
            const date = new Date(item.dt * 1000);

            return (
              <motion.div
                key={item.dt}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                <p className="text-white/90 font-semibold mb-2">
                  {index === 0 ? 'Today' : format(date, 'EEE')}
                </p>
                <p className="text-white/70 text-sm mb-3">
                  {format(date, 'MMM d')}
                </p>
                <Image
                  src={getWeatherIconUrl(item.weather[0].icon)}
                  alt={item.weather[0].description}
                  width={64}
                  height={64}
                  className="w-16 h-16 mb-2"
                />
                <p className="text-white/80 text-sm capitalize mb-3 text-center h-10">
                  {item.weather[0].description}
                </p>
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-bold text-white mb-1">
                    {temp}°
                  </p>
                  <p className="text-white/60 text-sm">
                    {tempMax}° / {tempMin}°
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
