'use client';

export default function WeatherSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-pulse">
      {/* Current Weather Skeleton */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
        {/* City and Date */}
        <div className="text-center mb-6">
          <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-2"></div>
          <div className="h-6 bg-white/20 rounded-lg w-48 mx-auto"></div>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="w-32 h-32 bg-white/20 rounded-full"></div>
          <div className="text-center md:text-left">
            <div className="h-24 bg-white/20 rounded-lg w-48 mb-2"></div>
            <div className="h-8 bg-white/20 rounded-lg w-40 mb-1"></div>
            <div className="h-6 bg-white/20 rounded-lg w-32"></div>
          </div>
        </div>

        {/* High/Low */}
        <div className="flex justify-center gap-8 mb-8 pb-8 border-b border-white/20">
          <div className="text-center">
            <div className="h-4 bg-white/20 rounded w-12 mx-auto mb-1"></div>
            <div className="h-8 bg-white/20 rounded w-16 mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-4 bg-white/20 rounded w-12 mx-auto mb-1"></div>
            <div className="h-8 bg-white/20 rounded w-16 mx-auto"></div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center p-4 bg-white/5 rounded-xl">
              <div className="w-8 h-8 bg-white/20 rounded-full mb-2"></div>
              <div className="h-4 bg-white/20 rounded w-20 mb-1"></div>
              <div className="h-6 bg-white/20 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div>
        <div className="h-8 bg-white/20 rounded-lg w-40 mb-4"></div>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-white/5 rounded-2xl">
                <div className="h-6 bg-white/20 rounded w-16 mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-12 mb-3"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-20 mb-3"></div>
                <div className="h-8 bg-white/20 rounded w-12 mb-1"></div>
                <div className="h-4 bg-white/20 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
