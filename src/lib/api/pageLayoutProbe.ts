export type ApiPageProbeData = {
  slug?: string;
  title?: string;
  layout?: string;
  content?: string;
  meta?: Record<string, unknown> | null;
  seo?: Record<string, unknown> | null;
  is_active?: boolean | null;
};

export type ApiPageProbeResult = ApiPageProbeData & {
  matchedSlug: string;
};

import { fetchJsonCached } from '@/lib/api/apiCache';

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function buildSlugCandidates(slug: string) {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (!clean) return [] as string[];

  const parts = clean.split('/').filter(Boolean);
  const last = parts[parts.length - 1];

  const candidates = [clean];
  if (last && last !== clean) candidates.push(last);

  const productCandidate = last ? `products/${last}` : undefined;
  if (productCandidate && !candidates.includes(productCandidate)) {
    candidates.push(productCandidate);
  }

  // Common legacy aliases.
  if (clean === 'contact-us' && !candidates.includes('contact')) {
    candidates.push('contact');
  }

  return candidates;
}

export async function probePageLayout(fullSlug: string): Promise<ApiPageProbeResult | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  const clean = fullSlug.replace(/^\/+|\/+$/g, '');
  if (!clean) return null;

  const candidates = buildSlugCandidates(clean);

  for (const candidate of candidates) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const payload = await fetchJsonCached<{ data?: ApiPageProbeData }>(
        `${baseUrl}/v1/page/${apiSlugPath}`,
        { tags: [`page:${apiSlugPath}`] },
      );
      if (!payload) continue;
      const data = payload?.data;
      if (!data) continue;
      if (data.is_active === false) continue;

      return {
        ...data,
        matchedSlug: candidate,
      };
    } catch {
      continue;
    }
  }

  return null;
}
