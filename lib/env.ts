/**
 * Environment variable validation
 * Ensures required environment variables are present at build/runtime
 */

export function validateEnv() {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    if (typeof window === 'undefined') {
      // Server-side: throw error during build
      throw new Error(
        'NEXT_PUBLIC_OPENWEATHER_API_KEY is not set. Please add it to your .env.local file. ' +
        'See .env.local.example for reference.'
      );
    } else {
      // Client-side: log warning
      console.warn(
        'NEXT_PUBLIC_OPENWEATHER_API_KEY is not configured. ' +
        'Please add it to your .env.local file.'
      );
    }
  }

  return {
    apiKey: apiKey || '',
  };
}

// Validate on module load (server-side only)
if (typeof window === 'undefined') {
  try {
    validateEnv();
  } catch (error) {
    // Only throw in production builds
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}

