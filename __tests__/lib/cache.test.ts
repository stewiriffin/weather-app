import { cache, getWeatherCacheKey, getAirQualityCacheKey } from '@/lib/cache';

describe('Cache', () => {
  beforeEach(() => {
    cache.clear();
  });

  describe('getWeatherCacheKey', () => {
    it('should generate cache key for city', () => {
      const key = getWeatherCacheKey({ city: 'London', units: 'metric' });
      expect(key).toBe('weather:london:metric');
    });

    it('should generate cache key for coordinates', () => {
      const key = getWeatherCacheKey({ lat: 51.5074, lon: -0.1278, units: 'imperial' });
      expect(key).toBe('weather:51.51:-0.13:imperial');
    });

    it('should use default units if not provided', () => {
      const key = getWeatherCacheKey({ city: 'Paris' });
      expect(key).toBe('weather:paris:metric');
    });
  });

  describe('getAirQualityCacheKey', () => {
    it('should generate cache key for coordinates', () => {
      const key = getAirQualityCacheKey(51.5074, -0.1278);
      expect(key).toBe('airquality:51.51:-0.13');
    });
  });

  describe('cache operations', () => {
    it('should set and get values', () => {
      cache.set('test-key', 'test-value', 1000);
      expect(cache.get('test-key')).toBe('test-value');
    });

    it('should return null for non-existent keys', () => {
      expect(cache.get('non-existent')).toBeNull();
    });

    it('should expire entries after TTL', (done) => {
      cache.set('test-key', 'test-value', 100);
      expect(cache.get('test-key')).toBe('test-value');
      
      setTimeout(() => {
        expect(cache.get('test-key')).toBeNull();
        done();
      }, 150);
    });

    it('should check if key exists', () => {
      cache.set('test-key', 'test-value', 1000);
      expect(cache.has('test-key')).toBe(true);
      expect(cache.has('non-existent')).toBe(false);
    });

    it('should delete keys', () => {
      cache.set('test-key', 'test-value', 1000);
      cache.delete('test-key');
      expect(cache.get('test-key')).toBeNull();
    });

    it('should clear all entries', () => {
      cache.set('key1', 'value1', 1000);
      cache.set('key2', 'value2', 1000);
      cache.clear();
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
    });
  });
});

