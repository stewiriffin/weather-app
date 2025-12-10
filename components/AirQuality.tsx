'use client';

import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { AirQualityResponse } from '@/types/weather';

interface AirQualityProps {
  data: AirQualityResponse;
}

const AQI_LEVELS = [
  { level: 1, label: 'Good', color: 'bg-green-500', gradientColor: '#10b981', message: 'Air quality is excellent, perfect for outdoor activities' },
  { level: 2, label: 'Fair', color: 'bg-lime-500', gradientColor: '#84cc16', message: 'Air quality is acceptable for most people' },
  { level: 3, label: 'Moderate', color: 'bg-yellow-500', gradientColor: '#eab308', message: 'Sensitive individuals should consider limiting prolonged outdoor exposure' },
  { level: 4, label: 'Poor', color: 'bg-orange-500', gradientColor: '#f97316', message: 'Everyone may begin to experience health effects' },
  { level: 5, label: 'Very Poor', color: 'bg-red-700', gradientColor: '#7f1d1d', message: 'Health alert: everyone may experience serious health effects' },
];

export default function AirQuality({ data }: AirQualityProps) {
  const currentAQI = data.list[0];
  const aqiInfo = AQI_LEVELS.find(level => level.level === currentAQI.main.aqi) || AQI_LEVELS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Air Quality</h2>
            <p className="text-white/70 text-sm">Current conditions</p>
          </div>
        </div>

        {/* AQI Level Display */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-bold text-white">{currentAQI.main.aqi}</span>
            <span className="text-2xl font-semibold text-white/90">{aqiInfo.label}</span>
          </div>
          <p className="text-white/80 text-sm">{aqiInfo.message}</p>
        </div>

        {/* AQI Progress Bar - Green to Maroon Gradient */}
        <div className="mb-6">
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
            {/* Gradient background from Green to Maroon */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(to right, #10b981 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #7f1d1d 100%)'
              }}
            />
            {/* Current position indicator */}
            <motion.div
              initial={{ left: 0 }}
              animate={{ left: `${((currentAQI.main.aqi - 1) / 4) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-0 w-1 h-full bg-white shadow-lg z-10"
              style={{ transform: 'translateX(-50%)' }}
            />
            {/* Level markers */}
            <div className="absolute inset-0 flex">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className="flex-1 border-r border-white/20 last:border-r-0"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/60">
            <span className="font-medium">1</span>
            <span className="font-medium">2</span>
            <span className="font-medium">3</span>
            <span className="font-medium">4</span>
            <span className="font-medium">5</span>
          </div>
        </div>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1">PM2.5</p>
            <p className="text-white font-semibold">{currentAQI.components.pm2_5.toFixed(1)} μg/m³</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1">PM10</p>
            <p className="text-white font-semibold">{currentAQI.components.pm10.toFixed(1)} μg/m³</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1">O₃</p>
            <p className="text-white font-semibold">{currentAQI.components.o3.toFixed(1)} μg/m³</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1">NO₂</p>
            <p className="text-white font-semibold">{currentAQI.components.no2.toFixed(1)} μg/m³</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
