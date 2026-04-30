/**
 * Paths served by `app/[...slug]/page.tsx` (about / contact slugs).
 */

export const ABOUT_US_PAGE_SLUG = (
  process.env.ABOUT_US_PAGE_SLUG || 'about-us'
).replace(/^\/+|\/+$/g, '');

export const CONTACT_US_PAGE_SLUG = (
  process.env.CONTACT_US_PAGE_SLUG || 'contact-us'
).replace(/^\/+|\/+$/g, '');

export const DONATE_PAGE_SLUG = (
  process.env.DONATE_PAGE_SLUG || 'donate'
).replace(/^\/+|\/+$/g, '');

export const WHAT_WE_DO_PAGE_SLUG = (
  process.env.WHAT_WE_DO_PAGE_SLUG || 'what-we-do'
).replace(/^\/+|\/+$/g, '');

export const SUMMITS_PAGE_SLUG = (
  process.env.SUMMITS_PAGE_SLUG || 'summits'
).replace(/^\/+|\/+$/g, '');

export const GET_INVOLVED_PAGE_SLUG = (
  process.env.GET_INVOLVED_PAGE_SLUG || 'get-involved'
).replace(/^\/+|\/+$/g, '');

export function normalizeSlug(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

export function fullSlugFromParams(slug: string[] | undefined): string {
  return normalizeSlug(slug?.filter(Boolean).join('/') || '');
}

/**
 * Shared slug matcher for catch-all routes.
 * - exact mode: full slug must match (e.g. "123/donate123")
 * - last-segment mode: last segment must match (e.g. ".../donate123")
 */
export function matchesRouteSlug(
  fullSlug: string,
  routeSlug: string,
  mode: 'exact' | 'last-segment' = 'exact',
): boolean {
  const normalizedFullSlug = normalizeSlug(fullSlug);
  const normalizedRouteSlug = normalizeSlug(routeSlug);
  if (!normalizedFullSlug || !normalizedRouteSlug) return false;
  if (normalizedFullSlug === normalizedRouteSlug) return true;
  if (mode === 'exact') return false;

  const fullLast = normalizedFullSlug.split('/').filter(Boolean).pop();
  const routeLast = normalizedRouteSlug.split('/').filter(Boolean).pop();
  return Boolean(fullLast && routeLast && fullLast === routeLast);
}

export function aboutUsPath(): string {
  return `/${ABOUT_US_PAGE_SLUG}`;
}

export function contactUsPath(): string {
  return `/${CONTACT_US_PAGE_SLUG}`;
}

export function donatePath(): string {
  return `/${DONATE_PAGE_SLUG}`;
}

export function whatWeDoPath(): string {
  return `/${WHAT_WE_DO_PAGE_SLUG}`;
}

export function summitsPath(): string {
  return `/${SUMMITS_PAGE_SLUG}`;
}

export function getInvolvedPath(): string {
  return `/${GET_INVOLVED_PAGE_SLUG}`;
}
