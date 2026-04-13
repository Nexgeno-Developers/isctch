import { cache } from 'react';

type CompanyApiResponse = {
  data?: {
    id?: number;
    is_active?: boolean;
    meta?: unknown[];
  };
};

export type CompanyCommonData = {
  questionsTitle?: string;
  questionsSubtitle?: string;
  questionsUrl?: string;
  subscribeTitle?: string;
  subscribeSubtitle?: string;
  guidanceTitle?: string;
  guidanceUrl?: string;
  industryDetailGuidanceTitle?: string;
  industryDetailGuidanceUrl?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactCardTitle?: string;
  contactCardDescription?: string;
  contactCardUrl?: string;
  technicalExpertsTitle?: string;
  technicalExpertsFormTitle?: string;
  technicalExpertsImage?: string;
};

const COMPANY_API_DOMAIN =
  process.env.COMPANY_API_DOMAIN || 'https://backend-lamipak.webtesting.pw';

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
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

function findMetaEntry(meta: unknown, key: string): unknown {
  if (!Array.isArray(meta)) return undefined;
  for (const item of meta) {
    if (item && typeof item === 'object' && key in item) {
      return (item as Record<string, unknown>)[key];
    }
  }
  return undefined;
}

function readMetaString(meta: unknown, key: string): string | undefined {
  const value = findMetaEntry(meta, key);
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function readMetaHref(meta: unknown, key: string): string | undefined {
  const value = readMetaString(meta, key);
  if (!value) return undefined;
  if (value === '#') return '#';
  if (/^https?:\/\//i.test(value)) return value;
  return value.startsWith('/') ? value : `/${value}`;
}

function readMetaMedia(meta: unknown, key: string): string | undefined {
  const value = findMetaEntry(meta, key);
  const rawUrl = extractMediaUrl(value);
  if (!rawUrl) return undefined;
  const trimmed = rawUrl.trim();
  if (!trimmed) return undefined;
  return normalizeApiAssetUrl(trimmed);
}

async function fetchCompanyCommonData(): Promise<CompanyCommonData | null> {
  const url = buildCompanyApiUrl('/v1/companies/1');
  if (!url) return null;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;

    const payload = (await res.json()) as CompanyApiResponse;
    const company = payload?.data;
    if (!company || company.is_active === false) return null;

    const meta = company.meta;

    return {
      questionsTitle: readMetaString(meta, 'questions_title'),
      questionsSubtitle: readMetaString(meta, 'questions_subtitle'),
      questionsUrl: readMetaHref(meta, 'questions_url'),
      subscribeTitle: readMetaString(meta, 'subscribe_title'),
      subscribeSubtitle: readMetaString(meta, 'subscribe_subtitle'),
      guidanceTitle: readMetaString(meta, 'guidance_title'),
      guidanceUrl: readMetaHref(meta, 'guidance_url'),
      industryDetailGuidanceTitle: readMetaString(meta, 'industry_detail_guidance_title'),
      industryDetailGuidanceUrl: readMetaHref(meta, 'industry_detail_guidance_url'),
      contactTitle: readMetaString(meta, 'contact_title'),
      contactSubtitle: readMetaString(meta, 'contact_subtitle'),
      contactCardTitle: readMetaString(meta, 'contact_card_title'),
      contactCardDescription: readMetaString(meta, 'contact_card_description'),
      contactCardUrl: readMetaHref(meta, 'contact_card_url'),
      technicalExpertsTitle: readMetaString(meta, 'technical_experts_title'),
      technicalExpertsFormTitle: readMetaString(meta, 'technical_experts_form_title'),
      technicalExpertsImage: readMetaMedia(meta, 'technical_experts_image'),
    };
  } catch {
    return null;
  }
}

export const getCompanyCommonData = cache(fetchCompanyCommonData);
