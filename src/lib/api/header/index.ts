import type { HeaderData, NavigationItem } from './types';
import { aboutUsPath, contactUsPath } from '@/config/publicRoutes';
import { fetchJsonCached } from '@/lib/api/apiCache';

type HeaderMenuItemApi = {
  id: number;
  name: string;
  url: string;
  order: number;
  status: boolean;
  children?: HeaderMenuItemApi[];
};

type HeaderMenuApiResponse = {
  data?: {
    items?: HeaderMenuItemApi[];
  };
};

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

const HEADER_MENU_GROUP_ID = process.env.HEADER_MENU_GROUP_ID || '1';
const HEADER_MENU_ENDPOINT = `/v1/menus/groups/${HEADER_MENU_GROUP_ID}`;
const TOP_BAR_MENU_GROUP_ID = process.env.TOP_BAR_MENU_GROUP_ID || '6';
const TOP_BAR_MENU_ENDPOINT = `/v1/menus/groups/${TOP_BAR_MENU_GROUP_ID}`;
const COMPANY_PROFILE_ENDPOINT = process.env.COMPANY_PROFILE_ENDPOINT || '/v1/companies/1';
const COMPANY_API_DOMAIN =
  process.env.COMPANY_API_DOMAIN || 'https://backend-lamipak.webtesting.pw';
const DEFAULT_LOGO_IMAGE = '/header-logo.svg';

const DEFAULT_HEADER_DATA: HeaderData = {
  logo: {
    text: 'LAMIPAK',
    image: DEFAULT_LOGO_IMAGE,
    href: '/',
  },
  navigation: [
    { id: 'nav-home', label: 'Home', href: '/' },
    { id: 'nav-about', label: 'About Us', href: aboutUsPath() },
    { id: 'nav-contact', label: 'Contact Us', href: contactUsPath() },
  ],
  cta: {
    text: 'Contact Us',
    href: contactUsPath(),
  },
};

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

function toRoutePath(path: string): string {
  const cleaned = path.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  return cleaned ? `/${cleaned}` : '/';
}

function toHref(path: string): string {
  const raw = path.trim();
  if (raw === '#' || raw === '') return '#';
  if (/^https?:\/\//i.test(raw)) return raw;
  return toRoutePath(raw);
}

function mapMenuItems(items: HeaderMenuItemApi[]): NavigationItem[] {
  return items
    .filter((item) => item.status)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: String(item.id),
      label: item.name,
      href: toHref(item.url),
      children: item.children?.length ? mapMenuItems(item.children) : undefined,
    }));
}

async function fetchHeaderNavigation(): Promise<NavigationItem[] | null> {
  const url = buildCompanyApiUrl(HEADER_MENU_ENDPOINT);
  if (!url) return null;

  try {
    const payload = await fetchJsonCached<HeaderMenuApiResponse>(url, {
      tags: ['header-menu'],
      init: { method: 'GET', headers: { Accept: 'application/json' } },
    });
    if (!payload) return null;
    const items = payload?.data?.items;
    if (!Array.isArray(items) || items.length === 0) return [];

    return mapMenuItems(items);
  } catch {
    return null;
  }
}

async function fetchHeaderBranding(): Promise<{ name?: string; logo?: string } | null> {
  const url = buildCompanyApiUrl(COMPANY_PROFILE_ENDPOINT);
  if (!url) return null;

  try {
    const payload = await fetchJsonCached<CompanyProfileApiResponse>(url, {
      tags: ['company-profile'],
      init: { headers: { Accept: 'application/json' } },
    });
    if (!payload) return null;
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

export async function fetchHeaderData(): Promise<HeaderData> {
  const [navigationFromApi, branding] = await Promise.all([
    fetchHeaderNavigation(),
    fetchHeaderBranding(),
  ]);

  return {
    ...DEFAULT_HEADER_DATA,
    navigation: navigationFromApi ?? DEFAULT_HEADER_DATA.navigation,
    logo: {
      ...DEFAULT_HEADER_DATA.logo,
      text: branding?.name || DEFAULT_HEADER_DATA.logo.text,
      image: branding?.logo || DEFAULT_HEADER_DATA.logo.image,
    },
  };
}

export async function fetchTopBarMenu(): Promise<NavigationItem[] | null> {
  const url = buildCompanyApiUrl(TOP_BAR_MENU_ENDPOINT);
  if (!url) return null;

  try {
    const payload = await fetchJsonCached<HeaderMenuApiResponse>(url, {
      tags: ['top-bar-menu'],
      init: { method: 'GET', headers: { Accept: 'application/json' } },
    });
    if (!payload) return null;
    const items = payload?.data?.items;
    if (!Array.isArray(items) || items.length === 0) return [];

    return mapMenuItems(items);
  } catch {
    return null;
  }
}

export type { HeaderData, NavigationItem };
