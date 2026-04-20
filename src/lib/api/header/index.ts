import { aboutUsPath, contactUsPath } from '@/config/publicRoutes';
import type { HeaderData } from './types';

const LOGO_SRC = '/iscth-logo.png';
const LOGO_ALT =
  'International Spiritual Council for Transforming Humanity (iSCTH)';

/**
 * Header layout source — edit here or swap this module for live CMS/API later.
 */
export const HEADER_LAYOUT: HeaderData = {
  logo: {
    text: LOGO_ALT,
    image: LOGO_SRC,
    href: '/',
    acronym: 'iSCTH',
    organizationName:
      'INTERNATIONAL SPIRITUAL COUNCIL FOR TRANSFORMING HUMANITY',
    tagline: 'One World... One Family',
  },
  navigation: [
    { id: 'nav-about', label: 'About', href: aboutUsPath() },
    {
      id: 'nav-what',
      label: 'What we do',
      href: '#what-we-do',
      children: [
        { id: 'nav-wwd-1', label: 'Programs', href: '#programs' },
        { id: 'nav-wwd-2', label: 'Initiatives', href: '#initiatives' },
      ],
    },
    { id: 'nav-summits', label: 'Summits', href: '#summits' },
    { id: 'nav-involved', label: 'Get involved', href: '#get-involved' },
    { id: 'nav-contact', label: 'Contact', href: contactUsPath() },
  ],
  cta: {
    text: 'Donate for peace',
    href: '#donate',
  },
};

export type { NavItem, HeaderData } from './types';
