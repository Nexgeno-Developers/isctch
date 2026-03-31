/**
 * Central API Helper
 * 
 * This module provides a centralized way to interact with the API.
 * Currently uses fake API functions, but can be easily switched to
 * real API calls when the Laravel backend is ready.
 */

import { API_CONFIG } from '@/config/api';
import { getHomepageData as fakeGetHomepageData, type HomepageData } from '@/fake-api/homepage';
import { getPageData as fakeGetPageData, type PageData } from '@/fake-api/pages';
import { 
  getProductData as fakeGetProductData, 
  getAllProductSlugs as fakeGetAllProductSlugs,
  getProductsByCategory as fakeGetProductsByCategory,
  type ProductData
} from '@/fake-api/products';
import {
  getAllCategories as fakeGetAllCategories,
  getCategoryBySlug as fakeGetCategoryBySlug,
  getAllCategorySlugs as fakeGetAllCategorySlugs,
  type ProductCategory
} from '@/fake-api/categories';
import {
  getTechnicalServiceData as fakeGetTechnicalServiceData,
  getAllTechnicalServices as fakeGetAllTechnicalServices,
  getAllTechnicalServiceSlugs as fakeGetAllTechnicalServiceSlugs,
  type TechnicalServiceData
} from '@/fake-api/technical-services';
import {
  getAllMarketingServices as fakeGetAllMarketingServices,
  getMarketingServiceData as fakeGetMarketingServiceData,
  getAllMarketingServiceSlugs as fakeGetAllMarketingServiceSlugs,
  type MarketingServiceData,
} from '@/fake-api/marketing-services';
import {
  getMarketingServicesOverviewData as fakeGetMarketingServicesOverviewData,
  getMarketingLatestNews as fakeGetMarketingLatestNews,
  getMarketingPressNews as fakeGetMarketingPressNews,
  type MarketingServicesOverview,
  type MarketingNewsItem,
} from '@/fake-api/marketing-services-overview';
import {
  getTechnicalServicesListingData as fakeGetTechnicalServicesListingData,
  type TechnicalServicesListingData
} from '@/fake-api/technical-services-listing';
import {
  getCompanyData as fakeGetCompanyData,
  type CompanyData
} from '@/fake-api/company';
import {
  getCareersListingData as fakeGetCareersListingData,
  getCareerJobBySlug as fakeGetCareerJobBySlug,
  getAllCareerJobSlugs as fakeGetAllCareerJobSlugs,
  type CareersListingData,
  type CareerJob,
} from '@/fake-api/careers';
import {
  getPackagingPageData as fakeGetPackagingPageData,
  getAllPackagingPages as fakeGetAllPackagingPages,
  getAllPackagingPageSlugs as fakeGetAllPackagingPageSlugs,
  type PackagingPageData,
} from '@/fake-api/packaging-pages';
import { getDynamicPageBySlug as fakeGetDynamicPageBySlug } from '@/fake-api/dynamic-pages';
import { getCanonicalUrl } from '@/config/site';

// Re-export types for convenience
export type {
  ProductData,
  ProductCategory,
  TechnicalServiceData,
  TechnicalServicesListingData,
  CompanyData,
  MarketingServiceData,
  MarketingServicesOverview,
  MarketingNewsItem,
  CareersListingData,
  CareerJob,
  PackagingPageData,
};
import {
  getHeaderData as fakeGetHeaderData,
  getFooterData as fakeGetFooterData,
  type HeaderData,
  type FooterData,
  type SocialLink,
} from '@/fake-api/layout';

type CompanyProfileApiResponse = {
  data?: {
    id?: number;
    name?: string | null;
    logo?:
      | string
      | {
          id?: number;
          filename?: string;
          url?: string | null;
        }
      | null;
    email?: string | null;
    phone?: string | null;
    whatsapp?: string | null;
    address?: string | null;
    website?: string | null;
    google_map?:
      | string
      | {
          id?: number;
          filename?: string;
          url?: string | null;
        }
      | null;
    meta_title?: string | null;
    meta_description?: string | null;
    is_active?: boolean;
    meta?: Array<Record<string, unknown>>;
    breadcrumb?: string | { url?: string | null } | null;
    breadcrumb_image?: string | { url?: string | null } | null;
    banner?: string | { url?: string | null } | null;
    banner_image?: string | { url?: string | null } | null;
    hero_image?: string | { url?: string | null } | null;
    about_banner?: string | { url?: string | null } | null;
  };
};

type CompanyProfile = {
  name?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  supportEmail?: string;
  salesPartnerEmail?: string;
  technicalSupportEmail?: string;
  careersEmail?: string;
  instagramUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  vimeoUrl?: string;
  googleMapImage?: string;
  breadcrumbImage?: string;
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

function extractMediaUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    const urlValue = (value as { url?: unknown }).url;
    if (typeof urlValue === 'string') return urlValue;
  }
  return undefined;
}

/**
 * Checks if we should use the real API or fake API
 */
const useRealAPI = (): boolean => {
  return Boolean(API_CONFIG.baseUrl);
};

async function fetchCompanyProfile(): Promise<CompanyProfile | null> {
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

    const rawGoogleMapUrl =
      typeof raw.google_map === 'string'
        ? raw.google_map
        : raw.google_map && typeof raw.google_map === 'object'
          ? raw.google_map.url || undefined
          : undefined;

    const supportEmail =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.support_email === 'string',
      )?.support_email as string | undefined;

    const breadcrumbMeta = raw.meta?.find(
      (item) =>
        !!item &&
        typeof item === 'object' &&
        !!item.breadcrumb &&
        typeof item.breadcrumb === 'object',
    ) as { breadcrumb?: { url?: string | null } } | undefined;

    const metaBannerItem = raw.meta?.find(
      (item) =>
        !!item &&
        typeof item === 'object' &&
        ('breadcrumb' in item ||
          'breadcrumb_image' in item ||
          'banner' in item ||
          'banner_image' in item ||
          'hero_image' in item ||
          'about_banner' in item),
    ) as Record<string, unknown> | undefined;

    const rawHeroBannerUrl =
      extractMediaUrl(raw.breadcrumb) ||
      extractMediaUrl(raw.breadcrumb_image) ||
      extractMediaUrl(raw.banner) ||
      extractMediaUrl(raw.banner_image) ||
      extractMediaUrl(raw.hero_image) ||
      extractMediaUrl(raw.about_banner) ||
      extractMediaUrl(metaBannerItem?.breadcrumb) ||
      extractMediaUrl(metaBannerItem?.breadcrumb_image) ||
      extractMediaUrl(metaBannerItem?.banner) ||
      extractMediaUrl(metaBannerItem?.banner_image) ||
      extractMediaUrl(metaBannerItem?.hero_image) ||
      extractMediaUrl(metaBannerItem?.about_banner) ||
      breadcrumbMeta?.breadcrumb?.url ||
      undefined;

    const salesPartnerEmail =
      raw.meta?.find(
        (item) =>
          !!item && typeof item === 'object' && typeof item.sales_partner_email === 'string',
      )?.sales_partner_email as string | undefined;

    const technicalSupportEmail =
      raw.meta?.find(
        (item) =>
          !!item && typeof item === 'object' && typeof item.technical_support_email === 'string',
      )?.technical_support_email as string | undefined;

    const careersEmail =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.careers_email === 'string',
      )?.careers_email as string | undefined;

    const instagramUrl =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.instagram_url === 'string',
      )?.instagram_url as string | undefined;

    const xUrl =
      raw.meta?.find((item) => !!item && typeof item === 'object' && typeof item.x_url === 'string')
        ?.x_url as string | undefined;

    const linkedinUrl =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.linkedin_url === 'string',
      )?.linkedin_url as string | undefined;

    const facebookUrl =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.facebook_url === 'string',
      )?.facebook_url as string | undefined;

    const youtubeUrl =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.youtube_url === 'string',
      )?.youtube_url as string | undefined;

    const tiktokUrl =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.tiktok_url === 'string',
      )?.tiktok_url as string | undefined;

    const vimeoUrl =
      raw.meta?.find(
        (item) => !!item && typeof item === 'object' && typeof item.vimeo_url === 'string',
      )?.vimeo_url as string | undefined;

    return {
      name: raw.name || undefined,
      logo: normalizeApiAssetUrl(rawLogoUrl),
      email: raw.email || undefined,
      phone: raw.phone || undefined,
      address: raw.address || undefined,
      website: raw.website || undefined,
      supportEmail,
      salesPartnerEmail,
      technicalSupportEmail,
      careersEmail,
      instagramUrl,
      xUrl,
      linkedinUrl,
      facebookUrl,
      youtubeUrl,
      tiktokUrl,
      vimeoUrl,
      googleMapImage: normalizeApiAssetUrl(rawGoogleMapUrl),
      breadcrumbImage: normalizeApiAssetUrl(rawHeroBannerUrl),
    };
  } catch {
    return null;
  }
}

export async function fetchCompanyProfileData(): Promise<CompanyProfile | null> {
  return fetchCompanyProfile();
}

/**
 * Fetches homepage data
 * 
 * @returns Promise<HomepageData>
 */
export async function fetchHomepageData(): Promise<HomepageData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.homepage}`);
    // if (!response.ok) throw new Error('Failed to fetch homepage data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetHomepageData();
}

/**
 * Fetches page data by slug
 * 
 * @param slug - The page slug
 * @returns Promise<PageData | null>
 */
export async function fetchPageData(slug: string): Promise<PageData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.page(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch page data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetPageData(slug);
}

/**
 * Fetches header data
 * 
 * @returns Promise<HeaderData>
 */
export async function fetchHeaderData(): Promise<HeaderData> {
  const fallback = await fakeGetHeaderData();
  const companyProfile = await fetchCompanyProfile();

  return {
    ...fallback,
    logo: {
      ...fallback.logo,
      text: companyProfile?.name || fallback.logo.text,
      image: companyProfile?.logo || fallback.logo.image,
    },
  };
}

function mergeFooterSocialLinks(fallback: SocialLink[], profile: CompanyProfile | null): SocialLink[] {
  if (!profile) return fallback;

  const overrideByIcon: Partial<Record<string, string | undefined>> = {
    x: profile.xUrl,
    twitter: profile.xUrl,
    linkedin: profile.linkedinUrl,
    facebook: profile.facebookUrl,
    instagram: profile.instagramUrl,
    youtube: profile.youtubeUrl,
    tiktok: profile.tiktokUrl,
    vimeo: profile.vimeoUrl,
  };

  return fallback.map((link) => {
    const key = link.icon || '';
    const next = overrideByIcon[key];
    return next ? { ...link, href: next } : link;
  });
}

/**
 * Fetches footer data
 * 
 * @returns Promise<FooterData>
 */
export async function fetchFooterData(): Promise<FooterData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.footer}`);
    // if (!response.ok) throw new Error('Failed to fetch footer data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  const fallback = await fakeGetFooterData();
  const companyProfile = await fetchCompanyProfile();
  if (!companyProfile) {
    return fallback;
  }

  const contactLinks = [
    companyProfile.address
      ? { id: 'api-contact-address', label: `Address: ${companyProfile.address}`, href: '#' }
      : null,
    companyProfile.phone
      ? {
          id: 'api-contact-phone',
          label: `Phone: ${companyProfile.phone}`,
          href: `tel:${companyProfile.phone}`,
        }
      : null,
    companyProfile.email
      ? {
          id: 'api-contact-email',
          label: `Email: ${companyProfile.email}`,
          href: `mailto:${companyProfile.email}`,
        }
      : null,
  ].filter(Boolean) as FooterData['columns'][number]['links'];

  const mappedColumns =
    contactLinks.length > 0
      ? fallback.columns.map((column) =>
          column.title === 'Contact'
            ? {
                ...column,
                links: contactLinks,
              }
            : column,
        )
      : fallback.columns;

  return {
    ...fallback,
    logo: {
      ...fallback.logo,
      text: companyProfile.name || fallback.logo.text,
      image: companyProfile.logo || fallback.logo.image,
    },
    description: fallback.description,
    columns: mappedColumns,
    socialLinks: mergeFooterSocialLinks(fallback.socialLinks ?? [], companyProfile),
  };
}

/**
 * Fetches product data by slug
 * 
 * @param slug - The product slug
 * @returns Promise<ProductData | null>
 */
export async function fetchProductData(slug: string): Promise<ProductData | null> {
  if (useRealAPI()) {
    // Real product endpoint is not implemented yet.
    // Keep product pages functional by falling back to local product data.
    return fakeGetProductData(slug);
  }
  
  return fakeGetProductData(slug);
}

/**
 * Gets all product slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllProductSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.products}`);
    // if (!response.ok) throw new Error('Failed to fetch products');
    // const data = await response.json();
    // return data.map((product: ProductData) => product.slug);
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllProductSlugs();
}

/**
 * Gets all product categories
 * 
 * @returns Promise<ProductCategory[]>
 */
export async function getAllCategories(): Promise<ProductCategory[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`);
    // if (!response.ok) throw new Error('Failed to fetch categories');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllCategories();
}

/**
 * Gets category by slug
 * 
 * @param slug - The category slug
 * @returns Promise<ProductCategory | null>
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.category(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch category');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetCategoryBySlug(slug);
}

/**
 * Gets all category slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`);
    // if (!response.ok) throw new Error('Failed to fetch categories');
    // const data = await response.json();
    // return data.map((category: ProductCategory) => category.slug);
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllCategorySlugs();
}

/**
 * Gets products by category slug
 * 
 * @param categorySlug - The category slug
 * @returns Promise<ProductData[]>
 */
export async function getProductsByCategory(categorySlug: string): Promise<ProductData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.productsByCategory(categorySlug)}`);
    // if (!response.ok) throw new Error('Failed to fetch products by category');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetProductsByCategory(categorySlug);
}

/**
 * Fetches technical service data by slug
 * 
 * @param slug - The technical service slug
 * @returns Promise<TechnicalServiceData | null>
 */
export async function fetchTechnicalServiceData(slug: string): Promise<TechnicalServiceData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalService(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch technical service data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetTechnicalServiceData(slug);
}

/**
 * Gets all technical services
 * 
 * @returns Promise<TechnicalServiceData[]>
 */
export async function getAllTechnicalServices(): Promise<TechnicalServiceData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalServices}`);
    // if (!response.ok) throw new Error('Failed to fetch technical services');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllTechnicalServices();
}

/**
 * Gets all technical service slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllTechnicalServiceSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalServices}`);
    // if (!response.ok) throw new Error('Failed to fetch technical services');
    // const data = await response.json();
    // return data.map((service: TechnicalServiceData) => service.slug);
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllTechnicalServiceSlugs();
}

/**
 * Fetches technical services listing page data
 * 
 * @returns Promise<TechnicalServicesListingData>
 */
export async function fetchTechnicalServicesListingData(): Promise<TechnicalServicesListingData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalServicesListing}`);
    // if (!response.ok) throw new Error('Failed to fetch technical services listing data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetTechnicalServicesListingData();
}

/**
 * Fetches company/about us page data
 * 
 * @returns Promise<CompanyData>
 */
export async function fetchCompanyData(): Promise<CompanyData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.company}`);
    // if (!response.ok) throw new Error('Failed to fetch company data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  // Source company content through dynamic page API payload.
  // For About Us hero we want the exact banner + title from `fake-api/company.ts`.
  const dynamicCompanyPage = await fakeGetDynamicPageBySlug('our-company');
  const localCompanyData = await fakeGetCompanyData();
  const baseCompanyData = dynamicCompanyPage?.ourCompanyData ?? localCompanyData;

  const companyProfile = await fetchCompanyProfile();
  if (!companyProfile) {
    return baseCompanyData;
  }

  return {
    ...baseCompanyData,
    hero: {
      ...baseCompanyData.hero,
      title: localCompanyData.hero.title,
      backgroundImage: localCompanyData.hero.backgroundImage,
    },
  };
}

/**
 * Fetch careers listing data (server-side)
 */
export async function fetchCareersListingData(): Promise<CareersListingData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.careers}`);
    // if (!response.ok) throw new Error('Failed to fetch careers');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetCareersListingData();
}

/**
 * Fetch single career job by slug (server-side)
 */
export async function fetchCareerJobBySlug(slug: string): Promise<CareerJob | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.career(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch career job');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetCareerJobBySlug(slug);
}

/**
 * Get all career job slugs (for static generation)
 */
export async function getAllCareerJobSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.careers}`);
    // if (!response.ok) throw new Error('Failed to fetch careers');
    // const data = await response.json();
    // return data.map((job: CareerJob) => job.slug);
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllCareerJobSlugs();
}

/**
 * Fetches marketing services overview content (listing hero section)
 *
 * @returns Promise<MarketingServicesOverview>
 */
export async function fetchMarketingServicesOverviewData(): Promise<MarketingServicesOverview> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingServicesOverview}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing services overview');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingServicesOverviewData();
}

/**
 * Fetches latest marketing news for marketing services listing page
 *
 * @returns Promise<MarketingNewsItem[]>
 */
export async function fetchMarketingLatestNews(): Promise<MarketingNewsItem[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingLatestNews}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing latest news');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingLatestNews();
}

/**
 * Fetches press release & event news for marketing services listing page
 *
 * @returns Promise<MarketingNewsItem[]>
 */
export async function fetchMarketingPressNews(): Promise<MarketingNewsItem[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingPressNews}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing press news');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingPressNews();
}

/**
 * Fetch packaging page data by slug
 */
export async function fetchPackagingPageData(slug: string): Promise<PackagingPageData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.packagingPage(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch packaging page data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetPackagingPageData(slug);
}

/**
 * Get all packaging page slugs (for static generation)
 */
export async function getAllPackagingPageSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.packagingPages}`);
    // if (!response.ok) throw new Error('Failed to fetch packaging pages');
    // const data = await response.json();
    // return data.map((p: PackagingPageData) => p.slug);
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllPackagingPageSlugs();
}

/**
 * Fetch all packaging pages (server-side)
 */
export async function getAllPackagingPages(): Promise<PackagingPageData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.packagingPages}`);
    // if (!response.ok) throw new Error('Failed to fetch packaging pages');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllPackagingPages();
}

/**
 * Fetches all marketing services
 *
 * @returns Promise<MarketingServiceData[]>
 */
export async function getAllMarketingServices(): Promise<MarketingServiceData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingServices}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing services');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllMarketingServices();
}

/**
 * Fetches single marketing service by slug
 *
 * @param slug - The marketing service slug
 * @returns Promise<MarketingServiceData | null>
 */
export async function fetchMarketingServiceData(
  slug: string,
): Promise<MarketingServiceData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingService(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch marketing service data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingServiceData(slug);
}

/**
 * Gets all marketing service slugs (for static generation)
 *
 * @returns Promise<string[]>
 */
export async function getAllMarketingServiceSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingServices}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing services');
    // const data = await response.json();
    // return data.map((service: MarketingServiceData) => service.slug);
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllMarketingServiceSlugs();
}

