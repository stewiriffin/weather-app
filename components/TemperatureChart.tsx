'use client';

import { ForecastResponse } from '@/types/weather';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TemperatureChartProps {
  data: ForecastResponse;
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
  // Transform forecast data for the chart (take every 3rd item for better spacing - 8 data points)
  const chartData = data.list
    .filter((_, index) => index % 3 === 0)
    .slice(0, 8)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), 'EEE ha'),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">Temperature Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="rgba(255, 255, 255, 0.6)"
              tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.6)"
              tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              unit="°"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number) => [`${value}°`, 'Temperature']}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#ffffff"
              strokeWidth={2}
              fill="url(#tempGradient)"
              dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
