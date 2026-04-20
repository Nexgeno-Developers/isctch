import { aboutUsPath, contactUsPath } from '@/config/publicRoutes';
import type { FooterData } from './types';

const LOGO_SRC = '/iscth-logo.png';
const LOGO_ALT =
  'International Spiritual Council for Transforming Humanity (iSCTH)';

const FOOTER_BODY: Omit<FooterData, 'copyright'> = {
  logo: {
    text: LOGO_ALT,
    image: LOGO_SRC,
    href: '/',
  },
  description:
    'International Spiritual Council for Transforming Humanity — fostering unity, compassion, and transformation across communities worldwide.',
  columns: [
    {
      id: 'footer-menu-2',
      title: 'Quick Links',
      links: [
        { id: 'fl-1', label: 'Home', href: '/' },
        { id: 'fl-2', label: 'About Us', href: aboutUsPath() },
        { id: 'fl-3', label: 'Contact Us', href: contactUsPath() },
      ],
    },
    {
      id: 'footer-menu-5',
      title: 'Contact',
      links: [{ id: 'fl-4', label: 'Get in touch', href: contactUsPath() }],
    },
  ],
  socialLinks: undefined,
};

/**
 * Footer layout source — edit `FOOTER_BODY` above or swap for live API later.
 */
export function getFooterLayout(): FooterData {
  const year = new Date().getFullYear();
  return {
    ...FOOTER_BODY,
    copyright: `© ${year} International Spiritual Council for Transforming Humanity. All rights reserved.`,
  };
}

export type { FooterData, FooterColumn, SocialLink } from './types';
