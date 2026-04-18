import { fetchJsonCached } from '@/lib/api/apiCache';

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

export type CompanyProfile = {
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
  process.env.COMPANY_API_BASE_URL || 'https://backend-lamipak.webtesting.pw/api';

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

async function fetchCompanyProfile(): Promise<CompanyProfile | null> {
  try {
    const payload = await fetchJsonCached<CompanyProfileApiResponse>(
      buildCompanyApiUrl(COMPANY_PROFILE_ENDPOINT),
      { tags: ['company-profile'], init: { headers: { Accept: 'application/json' } } },
    );
    if (!payload) return null;
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
