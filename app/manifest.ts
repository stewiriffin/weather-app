import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SkyCast - Weather Dashboard',
    short_name: 'SkyCast',
    description: 'Beautiful weather dashboard with real-time forecasts, air quality data, and hourly updates',
    start_url: '/',
    display: 'standalone',
    background_color: '#0ea5e9',
    theme_color: '#0ea5e9',
    orientation: 'portrait-primary',
    scope: '/',
    id: '/',
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['weather', 'utilities'],
    shortcuts: [
      {
        name: 'Search Weather',
        short_name: 'Search',
        description: 'Search for weather in any city',
        url: '/?action=search',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ]
  };
}
