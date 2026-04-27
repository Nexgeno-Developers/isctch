import { aboutUsPath, contactUsPath, donatePath, whatWeDoPath } from '@/config/publicRoutes';
import type { HeaderData } from './types';

const LOGO_SRC = '/iscth-logo.png';

/**
 * Header layout source — edit here or swap this module for live CMS/API later.
 */
export const HEADER_LAYOUT: HeaderData = {
  logo: {
    text: 'Logo',
    image: LOGO_SRC,
    href: '/',
  },
  navigation: [
    { id: 'nav-about', label: 'About', href: '/' },
    {
      id: 'nav-what',
      label: 'What we do',
      href: whatWeDoPath(),
      children: [
        { id: 'nav-wwd-1', label: 'Programs', href: `${whatWeDoPath()}#programs` },
        { id: 'nav-wwd-2', label: 'Initiatives', href: `${whatWeDoPath()}#initiatives` },
      ],
    },
    { id: 'nav-summits', label: 'Summits', href: '#summits' },
    { id: 'nav-involved', label: 'Get involved', href: '#get-involved' },
    { id: 'nav-contact', label: 'Contact', href: '/' },
  ],
  cta: {
    text: 'Donate for peace',
    href: donatePath(),
  },
};

export type { NavItem, HeaderData } from './types';
