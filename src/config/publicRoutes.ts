/**
 * Public marketing routes (served by `app/[...slug]/page.tsx`).
 * Slugs are path segments without a leading slash, e.g. `about-us` or `about-lamipak/about-company`.
 */

import type { CompanyNavigation } from '@/types/company';

export const ABOUT_US_PAGE_SLUG = (
  process.env.ABOUT_US_PAGE_SLUG || 'about-us'
).replace(/^\/+|\/+$/g, '');

export const CONTACT_US_PAGE_SLUG = (
  process.env.CONTACT_US_PAGE_SLUG || 'contact-us'
).replace(/^\/+|\/+$/g, '');

export function aboutUsPath(): string {
  return `/${ABOUT_US_PAGE_SLUG}`;
}

export function contactUsPath(): string {
  return `/${CONTACT_US_PAGE_SLUG}`;
}

export function getDefaultAboutSubNavigation(): CompanyNavigation {
  return {
    items: [
      { id: '1', icon: 'info', label: 'About us', href: aboutUsPath() },
      { id: '2', icon: 'globe', label: 'Contact us', href: contactUsPath() },
    ],
  };
}
