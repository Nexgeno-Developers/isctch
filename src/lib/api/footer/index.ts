import { aboutUsPath, contactUsPath, donatePath, whatWeDoPath } from '@/config/publicRoutes';
import type { FooterData } from './types';

const LOGO_SRC = '/iscth-logo.png';

const FOOTER_BODY: Omit<FooterData, 'copyright'> = {
  logo: {
    text: 'iSCTH',
    orgLine: 'INTERNATIONAL SPIRITUAL COUNCIL FOR TRANSFORMING HUMANITY',
    image: LOGO_SRC,
    href: '/',
  },
  description:
    'A global movement dedicated to the vision of One World - One Family. We believe peace starts within and radiates through collective action.',
  socialLinks: [
    { id: 'social-ig', platform: 'Instagram', href: '#', icon: 'instagram' },
    { id: 'social-x', platform: 'X', href: '#', icon: 'x' },
    { id: 'social-fb', platform: 'Facebook', href: '#', icon: 'facebook' },
    { id: 'social-li', platform: 'LinkedIn', href: '#', icon: 'linkedin' },
  ],
  columns: [
    {
      id: 'movement',
      title: 'Movement',
      links: [
        { id: 'mv-1', label: 'About', href: aboutUsPath() },
        { id: 'mv-2', label: 'What We Do', href: whatWeDoPath() },
        { id: 'mv-3', label: 'Summits', href: '/#summits' },
      ],
    },
    {
      id: 'action',
      title: 'Action',
      links: [
        { id: 'ac-1', label: 'Get Involved', href: '/#get-involved' },
        { id: 'ac-2', label: 'Donate', href: donatePath() },
        { id: 'ac-3', label: 'Volunteer', href: '/#get-involved' },
      ],
    },
    {
      id: 'connect',
      title: 'Connect',
      links: [
        { id: 'cn-1', label: 'Contact', href: contactUsPath() },
        { id: 'cn-2', label: 'Partner', href: contactUsPath() },
      ],
      accentText: '#IAMPEACE',
    },
  ],
};

/**
 * Footer layout source — edit `FOOTER_BODY` above or swap for live API later.
 */
export function getFooterLayout(): FooterData {
  const year = new Date().getFullYear();
  return {
    ...FOOTER_BODY,
    copyright: `© ${year} iSCTH. All rights reserved. #IamPEACE`,
  };
}

export type { FooterData, FooterColumn, SocialLink } from './types';
