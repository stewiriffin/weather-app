/**
 * Simple in-memory cache with TTL (Time To Live)
 * Used to cache API responses and reduce API calls
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class Cache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Set a value in the cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set<T>(key: string, value: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Get a value from the cache
   * @param key - Cache key
   * @returns Cached value or null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    const age = now - entry.timestamp;

    if (age > entry.ttl) {
      // Entry expired, remove it
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Check if a key exists in the cache and is not expired
   * @param key - Cache key
   * @returns True if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Remove a specific key from the cache
   * @param key - Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Export a singleton instance
export const cache = new Cache();

// Cleanup expired entries every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 10 * 60 * 1000);
}

/**
 * Generate a cache key for weather data
 */
export function getWeatherCacheKey(params: {
  city?: string;
  lat?: number;
  lon?: number;
  units?: string;
}): string {
  if (params.city) {
    return `weather:${params.city.toLowerCase()}:${params.units || 'metric'}`;
  }
  if (params.lat !== undefined && params.lon !== undefined) {
    return `weather:${params.lat.toFixed(2)}:${params.lon.toFixed(2)}:${params.units || 'metric'}`;
  }
  throw new Error('Invalid cache key parameters');
}

/**
 * Generate a cache key for air quality data
 */
export function getAirQualityCacheKey(lat: number, lon: number): string {
  return `airquality:${lat.toFixed(2)}:${lon.toFixed(2)}`;
}

