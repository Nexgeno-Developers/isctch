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

export function aboutUsPath(): string {
  return `/${ABOUT_US_PAGE_SLUG}`;
}

export function contactUsPath(): string {
  return `/${CONTACT_US_PAGE_SLUG}`;
}

export function donatePath(): string {
  return `/${DONATE_PAGE_SLUG}`;
}
