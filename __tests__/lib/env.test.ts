import { validateEnv } from '@/lib/env';

describe('validateEnv', () => {
  const originalEnv = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  afterEach(() => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = originalEnv;
  });

  it('should return apiKey when valid', () => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = 'test-api-key';
    const result = validateEnv();
    expect(result.apiKey).toBe('test-api-key');
  });

  it('should return empty string when apiKey is not set', () => {
    delete process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const result = validateEnv();
    expect(result.apiKey).toBe('');
  });

  it('should return empty string when apiKey is placeholder', () => {
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = 'your_api_key_here';
    const result = validateEnv();
    expect(result.apiKey).toBe('');
  });
});

