import { aboutUsPath, contactUsPath, donatePath, getInvolvedPath, summitsPath, whatWeDoPath } from '@/config/publicRoutes';
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
    { id: 'nav-about', label: 'About', href: aboutUsPath() },
    {
      id: 'nav-what',
      label: 'What we do',
      href: whatWeDoPath(),
      children: [
        { id: 'nav-wwd-1', label: 'Programs', href: `${whatWeDoPath()}#programs` },
        { id: 'nav-wwd-2', label: 'Initiatives', href: `${whatWeDoPath()}#initiatives` },
      ],
    },
    { id: 'nav-summits', label: 'Summits', href: summitsPath() },
    { id: 'nav-involved', label: 'Get involved', href: getInvolvedPath() },
    { id: 'nav-contact', label: 'Contact', href: contactUsPath() },
  ],
  cta: {
    text: 'Donate for peace',
    href: donatePath(),
  },
};

export type { NavItem, HeaderData } from './types';
