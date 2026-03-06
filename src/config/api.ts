/**
 * API Configuration
 * 
 * Central configuration for API endpoints.
 * Uses NEXT_PUBLIC_API_URL environment variable for the base URL.
 * Falls back to empty string for fake API during development.
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  endpoints: {
    homepage: '/homepage',
    page: (slug: string) => `/page/${slug}`,
    header: '/header',
    footer: '/footer',
    approach: '/approach',
  },
} as const;
