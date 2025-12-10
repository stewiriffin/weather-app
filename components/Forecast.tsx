'use client';

import { useState } from 'react';
import { ForecastResponse } from '@/types/weather';
import { getWeatherIconUrl, getDailyForecast } from '@/lib/weather';
import { format } from 'date-fns';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import HourlyForecast from './HourlyForecast';
import { Clock, Calendar } from 'lucide-react';

interface ForecastProps {
  data: ForecastResponse;
}

type ForecastTab = 'hourly' | 'daily';

export default function Forecast({ data }: ForecastProps) {
  const [activeTab, setActiveTab] = useState<ForecastTab>('hourly');

  // Get daily forecasts using the helper function
  const dailyForecasts = getDailyForecast(data, 5);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab Headers */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
          <button
            onClick={() => setActiveTab('hourly')}
            aria-label="Show hourly forecast"
            aria-pressed={activeTab === 'hourly'}
            className={`relative px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              activeTab === 'hourly' ? 'text-white' : 'text-white/60 hover:text-white/80'
            }`}
          >
            {activeTab === 'hourly' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/20 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Clock className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Next 24 Hours</span>
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            aria-label="Show daily forecast"
            aria-pressed={activeTab === 'daily'}
            className={`relative px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              activeTab === 'daily' ? 'text-white' : 'text-white/60 hover:text-white/80'
            }`}
          >
            {activeTab === 'daily' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/20 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Calendar className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Next 5 Days</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
        <AnimatePresence mode="wait">
          {activeTab === 'hourly' ? (
            <motion.div
              key="hourly"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <HourlyForecast data={data} />
            </motion.div>
          ) : (
            <motion.div
              key="daily"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
