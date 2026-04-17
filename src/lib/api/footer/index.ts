import type { FooterData, FooterColumn, SocialLink } from './types';
import { fetchJsonCached } from '@/lib/api/apiCache';

type CompanyApiResponse = {
  data?: {
    id?: number;
    name?: string | null;
    logo?: { id?: number; filename?: string; url?: string } | null;
    footer_logo_image?: { id?: number; filename?: string; url?: string } | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    short_description?: string | null;
    is_active?: boolean;
    meta?: unknown[];
  };
};

type MenuGroupItem = {
  id?: number;
  name?: string;
  url?: string | null;
  icon?: string | null;
  status?: boolean;
  parent_id?: number | null;
  children?: MenuGroupItem[];
};

type MenuGroupApiResponse = {
  data?: {
    menu_group?: { id?: number; name?: string; slug?: string; status?: boolean };
    items?: MenuGroupItem[];
  };
};

/** When CMS omits `menu_group.name`, keep stable labels per known group id. */
const MENU_GROUP_FALLBACK_TITLE: Record<number, string> = {
  2: 'Quick Links',
  3: 'Legal',
  4: 'Innovations',
  5: 'Contact',
};

type MenuGroupBundle = {
  title: string;
  items: MenuGroupItem[];
};

const COMPANY_API_DOMAIN =
  process.env.COMPANY_API_BASE_URL;

const DEFAULT_FOOTER_DATA: FooterData = {
  logo: {
    text: 'Lamipak',
    image: undefined,
    href: '/',
  },
  description:
    'Engineering the future of aseptic liquid packaging. Precision, sterility, and scale built for global leaders.',
  columns: [],
  socialLinks: undefined,
  copyright: `© ${new Date().getFullYear()} Lamipak. All Rights Reserved.`,
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
  const domain = COMPANY_API_DOMAIN?.trim()?.replace(/\/+$/, '');
  if (!domain) return undefined;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${domain}${path}`;
}

function extractUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null) {
    const u = (value as { url?: unknown }).url;
    if (typeof u === 'string') return u;
  }
  return undefined;
}

function findMetaValue(meta: unknown, key: string): string | undefined {
  if (!Array.isArray(meta)) return undefined;
  for (const item of meta) {
    if (item && typeof item === 'object' && key in item) {
      const val = (item as Record<string, unknown>)[key];
      if (typeof val === 'string' && val.trim()) return val;
    }
  }
  return undefined;
}

async function fetchMenuGroup(groupId: number): Promise<MenuGroupBundle> {
  const fallbackTitle = MENU_GROUP_FALLBACK_TITLE[groupId] || 'Links';
  const url = buildCompanyApiUrl(`/v1/menus/groups/${groupId}`);
  if (!url) return { title: fallbackTitle, items: [] };

  const payload = await fetchJsonCached<MenuGroupApiResponse>(url, {
    tags: [`menu-group:${groupId}`],
    init: { headers: { Accept: 'application/json' } },
  });
  const data = payload?.data;
  const groupName = data?.menu_group?.name?.trim();
  const title = groupName || fallbackTitle;
  const items = data?.items?.filter((i) => i.status !== false) || [];
  return { title, items };
}

const SOCIAL_KEYS = [
  { metaKey: 'x_url', icon: 'x', platform: 'X' },
  { metaKey: 'twitter_url', icon: 'x', platform: 'X' },
  { metaKey: 'linkedin_url', icon: 'linkedin', platform: 'LinkedIn' },
  { metaKey: 'facebook_url', icon: 'facebook', platform: 'Facebook' },
  { metaKey: 'instagram_url', icon: 'instagram', platform: 'Instagram' },
  { metaKey: 'youtube_url', icon: 'youtube', platform: 'YouTube' },
  { metaKey: 'tiktok_url', icon: 'tiktok', platform: 'TikTok' },
  { metaKey: 'vimeo_url', icon: 'vimeo', platform: 'Vimeo' },
] as const;

/**
 * Footer lists are flat; CMS may nest items (e.g. Products → Roll Fed). Walk the tree in order.
 */
function flattenFooterLinks(items: MenuGroupItem[]): FooterData['columns'][number]['links'] {
  const out: FooterData['columns'][number]['links'] = [];
  let syntheticId = 0;
  const walk = (list: MenuGroupItem[]) => {
    for (const item of list) {
      if (item.status === false) continue;
      const label = (item.name || '').trim();
      const rawHref = (item.url || '').trim();
      if (label && rawHref) {
        out.push({
          id: String(item.id ?? `footer-${syntheticId++}`),
          label,
          href: rawHref,
        });
      }
      if (item.children?.length) walk(item.children);
    }
  };
  walk(items);
  return out;
}

async function fetchCompanyData(): Promise<CompanyApiResponse['data'] | null> {
  const url = buildCompanyApiUrl('/v1/companies/1');
  if (!url) return null;

  const payload = await fetchJsonCached<CompanyApiResponse>(url, {
    tags: ['company-profile'],
    init: { headers: { Accept: 'application/json' } },
  });
  const company = payload?.data;
  if (!company || company.is_active === false) return null;
  return company;
}

export async function fetchFooterData(): Promise<FooterData> {
  const [company, quickBundle, legalBundle, innovationsBundle, contactBundle] = await Promise.all([
    fetchCompanyData(),
    fetchMenuGroup(2),
    fetchMenuGroup(3),
    fetchMenuGroup(4),
    fetchMenuGroup(5),
  ]);

  if (!company) {
    return {
      ...DEFAULT_FOOTER_DATA,
      copyright: `© ${new Date().getFullYear()} Lamipak. All Rights Reserved.`,
    };
  }

  const logoUrl = extractUrl(company.footer_logo_image) || extractUrl(company.logo);

  const columns: FooterData['columns'] = [];

  const pushColumn = (id: string, bundle: MenuGroupBundle) => {
    const links = flattenFooterLinks(bundle.items);
    if (!links.length) return;
    columns.push({ id, title: bundle.title, links });
  };

  pushColumn('footer-menu-2', quickBundle);
  pushColumn('footer-menu-5', contactBundle);
  pushColumn('footer-menu-3', legalBundle);
  pushColumn('footer-menu-4', innovationsBundle);
  


  const socialLinks: SocialLink[] = [];
  for (const { metaKey, icon, platform } of SOCIAL_KEYS) {
    const href = findMetaValue(company.meta, metaKey);
    if (href) {
      socialLinks.push({ id: `s-${icon}`, platform, href, icon });
    }
  }

  return {
    logo: {
      text: company.name || DEFAULT_FOOTER_DATA.logo.text,
      image: normalizeApiAssetUrl(logoUrl),
      href: '/',
    },
    description:
      company.short_description || DEFAULT_FOOTER_DATA.description,
    columns,
    socialLinks: socialLinks.length ? socialLinks : undefined,
    copyright: `© ${new Date().getFullYear()} Lamipak. All Rights Reserved.`,
  };
}

export type { FooterData, SocialLink, FooterColumn };
