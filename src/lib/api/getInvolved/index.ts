import 'server-only';

import { contactUsPath, whatWeDoPath } from '@/config/publicRoutes';

import type { GetInvolvedEngageSectionData, GetInvolvedPageData } from './types';

const STATIC_ENGAGE_SECTION: GetInvolvedEngageSectionData = {
  title: 'Other Ways To Engage',
  subtitle:
    'From individual volunteering to institutional collaboration, there is a place for everyone in our global community.',
  cards: [
    {
      image: {
        src: '/solidarity_images.webp',
        alt: 'Volunteers in matching shirts doing community cleanup outdoors',
      },
      icon: { src: '/true_icon.svg', alt: '' },
      title: 'Global Volunteer',
      description:
        'Join field teams for humanitarian relief, education drives, and neighborhood peace-building wherever you live.',
      cta: { label: 'Join Team', href: whatWeDoPath() },
    },
    {
      image: {
        src: '/comminuty_core_images.jpg',
        alt: 'People seated in a circle for dialogue and listening',
      },
      icon: { src: '/dialog_icons.svg', alt: '' },
      title: 'Peace Circles',
      description:
        'Host or join facilitated circles that build trust, empathy, and shared action across difference in your community.',
      cta: { label: 'Start a Circle', href: contactUsPath() },
    },
    {
      image: {
        src: '/diplomatic_image1.jpg',
        alt: 'Two professionals shaking hands in a bright office',
      },
      icon: { src: '/partners_icons.svg', alt: '' },
      title: 'Collaborate',
      description:
        'Partner with iSCTH through grants, sponsorships, and programs that align your mission with global peace outcomes.',
      cta: { label: 'Partner With Us', href: contactUsPath() },
    },
  ],
};

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
  engageSection: STATIC_ENGAGE_SECTION,
};

export async function getGetInvolvedPageData(): Promise<GetInvolvedPageData> {
  return STATIC_GET_INVOLVED_PAGE;
}

export type {
  GetInvolvedApplicationData,
  GetInvolvedApplicationField,
  GetInvolvedEngageCard,
  GetInvolvedEngageSectionData,
  GetInvolvedHeroData,
  GetInvolvedPageData,
  GetInvolvedProgramData,
} from './types';
