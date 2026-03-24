/**
 * Fake API for Layout Data (Header & Footer)
 * 
 * This file contains mock data for header and footer.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

import { getAllCategories } from './categories';

type CompanyProfileApiResponse = {
  data?: {
    name?: string | null;
    logo?:
      | string
      | {
          id?: number;
          filename?: string;
          url?: string | null;
        }
      | null;
    is_active?: boolean;
  };
};

const COMPANY_API_BASE_URL =
  process.env.COMPANY_API_BASE_URL ||
  'https://backend-lamipak.webtesting.pw/api';
const COMPANY_PROFILE_ENDPOINT =
  process.env.COMPANY_PROFILE_ENDPOINT || '/v1/companies/1';
const COMPANY_API_DOMAIN =
  process.env.COMPANY_API_DOMAIN || 'https://backend-lamipak.webtesting.pw';

function buildCompanyApiUrl(endpoint: string): string {
  const base = COMPANY_API_BASE_URL.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeApiAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  const domain = COMPANY_API_DOMAIN.replace(/\/+$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${domain}${path}`;
}

async function fetchCompanyBranding(): Promise<{ name?: string; logo?: string } | null> {
  try {
    const response = await fetch(buildCompanyApiUrl(COMPANY_PROFILE_ENDPOINT), {
      cache: 'no-store',
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as CompanyProfileApiResponse;
    const raw = payload?.data;
    if (!raw || raw.is_active === false) return null;

    const rawLogoUrl =
      typeof raw.logo === 'string'
        ? raw.logo
        : raw.logo && typeof raw.logo === 'object'
          ? raw.logo.url || undefined
          : undefined;

    return {
      name: raw.name || undefined,
      logo: normalizeApiAssetUrl(rawLogoUrl),
    };
  } catch {
    return null;
  }
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface HeaderData {
  logo: {
    text?: string;
    image?: string;
    href: string;
  };
  navigation: NavigationItem[];
  cta?: {
    text: string;
    href: string;
  };
}

export interface FooterColumn {
  id: string;
  title: string;
  links: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon?: string;
}

export interface FooterData {
  logo: {
    text: string;
    image?: string;
    href: string;
  };
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
}

/**
 * Fetches header data
 * 
 * @returns Promise<HeaderData> - Header data
 */
export async function getHeaderData(): Promise<HeaderData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Fetch all categories for Industries dropdown
  const categories = await getAllCategories();
  
  // Convert categories to navigation items
  const industryChildren: NavigationItem[] = categories.map((category) => ({
    id: category.id,
    label: category.name,
    href: `/products/category/${category.slug}`,
  }));

  const branding = await fetchCompanyBranding();

  // Mock data + dynamic branding override
  return {
    logo: {
      text: branding?.name,
      image: branding?.logo,
      href: '/',
    },
    navigation: [
      {
        id: '1',
        label: 'About Us',
        href: '/about-us',
      },
      {
        id: '2',
        label: 'Products',
        href: '/products',
        children: industryChildren,
      },
      {
        id: '3',
        label: 'Insights',
        href: '/insights',
      },
      {
        id: '4',
        label: 'Services',
        href: '/services',
        children: [
          {
            id: '4-1',
            label: 'Technical Services',
            href: '/technical-services',
          },
          {
            id: '4-2',
            label: 'Marketing Service',
            href: '/marketing-services',
          },
        ],
      },
      {
        id: '5',
        label: 'Innovations',
        href: '/innovation',
      },
      {
        id: '6',
        label: 'Sustainability',
        href: '/sustainability',
        children: [
          {
            id: '6-1',
            label: 'Pick Carton, Save Nature',
            href: '/pick-carton',
          },
          {
            id: '6-2',
            label: 'LAMIRA',
            href: '/lamira',
          },
          {
            id: '6-3',
            label: 'Our Green Efforts',
            href: '/our-green-efforts',
          },
          {
            id: '6-4',
            label: 'Certifications & Achievements',
            href: '/certifications-achievements',
          },
          {
            id: '6-5',
            label: 'NGOs',
            href: '/ngos',
          },
          {
            id: '6-6',
            label: '2050 Carbon Net Zero Roadmap',
            href: '/2050-carbon-net-zero-roadmap',
          },
        ],
      },
    ],
    cta: {
      text: 'Contact Us',
      href: '/contact',
    },
  };
}

/**
 * Fetches footer data
 * 
 * @returns Promise<FooterData> - Footer data
 */
export async function getFooterData(): Promise<FooterData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const branding = await fetchCompanyBranding();

  // Mock data + dynamic branding override
  return {
    logo: {
      text: branding?.name || 'LAMIPAK',
      image: branding?.logo || '/footer-logo.png',
      href: '/',
    },
    description: 'Engineering the future of aseptic liquid packaging. Precision, sterility, and scale built for global leaders.',
    columns: [
      {
        id: '1',
        title: 'Quick Links',
        links: [
          { id: '1', label: 'Solutions', href: '/' },
          { id: '2', label: 'Industries', href: '/' },
          { id: '3', label: 'Sustainability', href: '/' },
          { id: '4', label: 'About Us', href: '/about-us' },
        ],
      },
      {
        id: '2',
        title: 'Legal',
        links: [
          { id: '5', label: 'Terms & Condition', href: '/' },
          { id: '6', label: 'Privacy Policy', href: '/' },
          { id: '7', label: 'Downloads', href: '/' },
          { id: '8', label: 'Blogs', href: '/' },
        ],
      },
      {
        id: '3',
        title: 'Connect',
        links: [
          { id: '9', label: 'Insights', href: '/' },
          { id: '10', label: 'Careers', href: '/career' },
          { id: '11', label: 'Contact Us', href: '/contact-us' },
        ],
      },
      {
        id: '4',
        title: 'Contact',
        links: [
          { id: '12', label: 'Standard Products', href: '/products/standard' },
          { id: '13', label: 'LamiSleeve', href: '/products/lamisleeve' },
          { id: '14', label: 'LamiPure', href: '/products/lamipure' },
          { id: '15', label: 'Caps ETC', href: '/products/caps' },
        ],
      },
    ],
    socialLinks: [
      {
        id: '1',
        platform: 'Twitter',
        href: 'https://twitter.com',
        icon: 'twitter',
      },
      {
        id: '2',
        platform: 'Facebook',
        href: 'https://facebook.com',
        icon: 'facebook',
      },
      {
        id: '3',
        platform: 'Instagram',
        href: 'https://instagram.com',
        icon: 'instagram',
      },
      {
        id: '4',
        platform: 'YouTube',
        href: 'https://youtube.com',
        icon: 'youtube',
      },
    ],
    copyright: `© ${new Date().getFullYear()} Lamipak. All Rights Reserved.`,
  };
}
