import 'server-only';

import { unstable_cache, revalidateTag } from 'next/cache';

export const API_CACHE_TAG = 'lamipak-api-cache';
export const DEFAULT_API_REVALIDATE_SECONDS = 60 * 30;

type CachedFetchOptions = {
  revalidate?: number;
  tags?: string[];
  init?: RequestInit;
};

const DEFAULT_HEADERS = { Accept: 'application/json' };

function buildCacheKey(url: string, init?: RequestInit): string[] {
  const method = (init?.method || 'GET').toUpperCase();
  return ['api', method, url];
}

export async function fetchJsonCached<T>(
  url: string,
  options: CachedFetchOptions = {},
): Promise<T | null> {
  const method = (options.init?.method || 'GET').toUpperCase();
  const headers = { ...DEFAULT_HEADERS, ...(options.init?.headers || {}) };

  if (method !== 'GET') {
    const res = await fetch(url, { ...options.init, headers });
    if (!res.ok) return null;
    return (await res.json()) as T;
  }

  const cached = unstable_cache(
    async () => {
      const res = await fetch(url, { ...options.init, headers, cache: 'no-store' });
      if (!res.ok) return null;
      return (await res.json()) as T;
    },
    buildCacheKey(url, options.init),
    {
      revalidate: options.revalidate ?? DEFAULT_API_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, ...(options.tags || [])],
    },
  );

  return cached();
}

export function revalidateApiCache() {
  revalidateTag(API_CACHE_TAG, 'max');
}
