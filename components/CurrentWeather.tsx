'use client';

import { CurrentWeatherResponse } from '@/types/weather';
import { getWeatherIconUrl } from '@/lib/weather';
import { Wind, Droplets, Gauge, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CurrentWeatherProps {
  data: CurrentWeatherResponse;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const tempMin = Math.round(data.main.temp_min);
  const tempMax = Math.round(data.main.temp_max);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* City and Date */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {data.name}, {data.sys.country}
          </h1>
          <p className="text-white/70 text-lg">
            {format(new Date(data.dt * 1000), 'EEEE, MMMM d, yyyy • h:mm a')}
          </p>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="flex items-center">
            <Image
              src={getWeatherIconUrl(data.weather[0].icon)}
              alt={data.weather[0].description}
              width={120}
              height={120}
              className="w-32 h-32"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="text-7xl md:text-8xl font-bold text-white mb-2">
              {temp}°
            </div>
            <p className="text-2xl text-white/90 capitalize mb-1">
              {data.weather[0].description}
            </p>
            <p className="text-white/70">
              Feels like {feelsLike}°
            </p>
          </div>
        </div>

        {/* High/Low */}
        <div className="flex justify-center gap-8 mb-8 pb-8 border-b border-white/20">
          <div className="text-center">
            <p className="text-white/70 text-sm mb-1">High</p>
            <p className="text-2xl font-semibold text-white">{tempMax}°</p>
          </div>
          <div className="text-center">
            <p className="text-white/70 text-sm mb-1">Low</p>
            <p className="text-2xl font-semibold text-white">{tempMin}°</p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
            <Wind className="w-8 h-8 text-white/70 mb-2" />
            <p className="text-white/70 text-sm mb-1">Wind Speed</p>
            <p className="text-xl font-semibold text-white">{data.wind.speed} m/s</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
            <Droplets className="w-8 h-8 text-white/70 mb-2" />
            <p className="text-white/70 text-sm mb-1">Humidity</p>
            <p className="text-xl font-semibold text-white">{data.main.humidity}%</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
            <Gauge className="w-8 h-8 text-white/70 mb-2" />
            <p className="text-white/70 text-sm mb-1">Pressure</p>
            <p className="text-xl font-semibold text-white">{data.main.pressure} hPa</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
            <Eye className="w-8 h-8 text-white/70 mb-2" />
            <p className="text-white/70 text-sm mb-1">Visibility</p>
            <p className="text-xl font-semibold text-white">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
