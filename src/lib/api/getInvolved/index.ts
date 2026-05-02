import 'server-only';

import type { GetInvolvedPageData } from './types';

const STATIC_GET_INVOLVED_PAGE: GetInvolvedPageData = {
  hero: {
    breadcrumbHomeLabel: 'Home',
    breadcrumbCurrentLabel: 'Get Involved',
    kicker: 'Global Movement',
    titleBlue: 'Become Peace',
    titleOrange: 'in Action',
  },
  program: {
    kicker: 'Leadership Program',
    title: 'Peace Ambassador',
    description: [
      'Join a global network of diplomatic leaders committed to conflict resolution and human unity.',
      'As a Peace Ambassador, you serve as the voice of reconciliation in your community and represent iSCTH at international summits.',
    ],
    image: {
      src: '/hero_images.png',
      alt: 'Emerging peace leaders standing together as a global community',
    },
    benefits: [
      'Access to exclusive diplomatic training and certification.',
      'Voting rights in global peace resolution forums.',
      'Platform to showcase local impact on a global stage.',
    ],
  },
  application: {
    title: 'Ambassador Application',
    subtitle: 'Please provide comprehensive details for our selection committee.',
    fields: [
      { name: 'fullName', label: 'Full Name', placeholder: 'Jane Smith', span: 'half' },
      { name: 'email', label: 'Email Address', placeholder: 'jane@peace.org', type: 'email', span: 'half' },
      { name: 'phone', label: 'Phone', placeholder: '+1...', type: 'tel', span: 'half' },
      { name: 'age', label: 'Age', placeholder: '25', type: 'number', span: 'half' },
      { name: 'country', label: 'Country', placeholder: 'Country', type: 'country', span: 'half' },
      { name: 'occupation', label: 'Occupation', placeholder: 'Current Role / Title', span: 'half' },
      {
        name: 'motivation',
        label: 'Motivation for Joining',
        placeholder: 'Why do you want to be a Peace Ambassador?',
        type: 'textarea',
        span: 'full',
      },
      {
        name: 'experience',
        label: 'Previous Experience',
        placeholder: 'Relevant advocacy work...',
        type: 'textarea',
        span: 'half',
      },
      {
        name: 'skills',
        label: 'Key Skills',
        placeholder: 'Mediation, speaking, writing...',
        type: 'textarea',
        span: 'half',
      },
      {
        name: 'impact',
        label: 'Vision for Impact',
        placeholder: 'What do you hope to achieve?',
        type: 'textarea',
        span: 'half',
      },
      {
        name: 'availability',
        label: 'Availability',
        placeholder: 'Hours per month',
        span: 'half',
      },
    ],
    submitLabel: 'Submit Application',
  },
};

export async function getGetInvolvedPageData(): Promise<GetInvolvedPageData> {
  return STATIC_GET_INVOLVED_PAGE;
}

export type {
  GetInvolvedApplicationData,
  GetInvolvedApplicationField,
  GetInvolvedHeroData,
  GetInvolvedPageData,
  GetInvolvedProgramData,
} from './types';
