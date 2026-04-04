import { cache } from 'react';
import { formatBoldText } from '@/lib/htmlText';
import type { InsightItem } from '@/lib/api/insights_layout';

export type InsightsListingKind = 'articles' | 'webinars' | 'newsletter';

export type InsightsListingData = {
  kind: InsightsListingKind;
  title: string;
  /** Plain text for the last breadcrumb segment. */
  breadcrumbLabel: string;
  /** Hero banner image (e.g. CMS `meta.banner_images.url`). */
  heroBackgroundImage?: string;
  subtitle?: string;
  items: InsightItem[];
  /** Subcategory filter options (from CMS or derived from items). */
  filterSubcategories?: string[];
};

type InsightItemApi = {
  id?: number | string;
  title?: string;
  description?: string;
  image?: { url?: string | null } | null;
  link?: string;
  slug?: string;
  subcategory?: string;
  category?: string;
};

type ListingApiResponse = {
  data?: {
    slug?: string;
    title?: string;
    content?: string;
    layout?: string;
    meta?: {
      banner_images?: { url?: string | null } | null;
      list_subtitle?: string;
      /** Optional ordered list of subcategory filter labels (JSON array or string). */
      list_subcategories?: unknown;
      items?: unknown;
    };
    seo?: Record<string, unknown>;
    autofetch?: {
      items?: InsightItemApi[] | InsightItemApi | null;
    };
  };
};

const PLACEHOLDER_IMG = '/about_banner.jpg';

const LISTING_ROUTES: Record<string, InsightsListingKind> = {
  'insights/articles': 'articles',
  'insights/webinars': 'webinars',
  'insights/newsletter': 'newsletter',
};

const TITLES: Record<InsightsListingKind, string> = {
  articles: 'Articles',
  webinars: 'Webinar',
  newsletter: 'Newsletter',
};

function clean(s?: string | null) {
  return (s ?? '').trim();
}

function stripHtml(value?: string | null): string {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function mediaUrl(media?: { url?: string | null } | null) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function toArray<T>(v: T | T[] | null | undefined): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function parseItems(raw: unknown): InsightItemApi[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw as InsightItemApi[];
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw) as unknown;
      return Array.isArray(p) ? (p as InsightItemApi[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

function mapItem(raw: InsightItemApi, idx: number, kind: InsightsListingKind): InsightItem | null {
  const title = clean(raw.title);
  const description = clean(raw.description);
  if (!title) return null;
  const id = String(raw.id ?? `${kind}-${idx}`);
  const hrefRaw = clean(raw.link) || clean(raw.slug);
  const href = hrefRaw
    ? hrefRaw.startsWith('http')
      ? hrefRaw
      : hrefRaw.startsWith('/')
        ? hrefRaw
        : `/${hrefRaw.replace(/^\/+/, '')}`
    : `/insights/${kind}#${id}`;

  const sub =
    clean(raw.subcategory) ||
    clean(raw.category) ||
    undefined;

  return {
    id,
    title: formatBoldText(title),
    description: formatBoldText(description) || formatBoldText(title),
    image: mediaUrl(raw.image),
    imageAlt: title,
    href,
    subcategory: sub,
  };
}

const DEMO_ARTICLE_SUBCATEGORIES = ['Dairy', 'Beverage', 'Operations', 'Sustainability', 'Innovation'] as const;

function parseStringArray(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((x): x is string => typeof x === 'string' && !!x.trim())
      .map((x) => x.trim());
  }
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw) as unknown;
      if (Array.isArray(p)) {
        return p.filter((x): x is string => typeof x === 'string' && !!x.trim()).map((x) => x.trim());
      }
    } catch {
      return raw
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean);
    }
  }
  return [];
}

function deriveSubcategories(items: InsightItem[]): string[] {
  const s = new Set<string>();
  items.forEach((i) => {
    const t = i.subcategory?.trim();
    if (t) s.add(t);
  });
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

function buildMany(kind: InsightsListingKind, count: number): InsightItem[] {
  const baseTitle =
    kind === 'articles' ? 'Article' : kind === 'webinars' ? 'Webinar' : 'Newsletter';
  return Array.from({ length: count }, (_, i) => ({
    id: `${kind}-${i + 1}`,
    title: formatBoldText(`${baseTitle} ${i + 1}: Industry insights and practical guidance`),
    description: formatBoldText(
      'Short summary placeholder — replace with CMS copy. Image, title, and read more link as on the insights hub cards.',
    ),
    image: PLACEHOLDER_IMG,
    imageAlt: `${baseTitle} ${i + 1}`,
    href:
      kind === 'articles'
        ? `/insights/articles/article-${i + 1}`
        : `/insights/${kind === 'newsletter' ? 'newsletter' : kind}#item-${i + 1}`,
    subcategory:
      kind === 'articles' ? DEMO_ARTICLE_SUBCATEGORIES[i % DEMO_ARTICLE_SUBCATEGORIES.length] : undefined,
  }));
}

const DEFAULT_LISTINGS: Record<InsightsListingKind, InsightsListingData> = {
  articles: {
    kind: 'articles',
    title: 'Articles',
    breadcrumbLabel: TITLES.articles,
    heroBackgroundImage: PLACEHOLDER_IMG,
    subtitle: 'Browse all articles from Lamipak.',
    filterSubcategories: [...DEMO_ARTICLE_SUBCATEGORIES],
    items: buildMany('articles', 9),
  },
  webinars: {
    kind: 'webinars',
    title: 'Webinar',
    breadcrumbLabel: TITLES.webinars,
    heroBackgroundImage: PLACEHOLDER_IMG,
    subtitle: 'Browse all webinars and recordings.',
    items: buildMany('webinars', 9),
  },
  newsletter: {
    kind: 'newsletter',
    title: 'Newsletter',
    breadcrumbLabel: TITLES.newsletter,
    heroBackgroundImage: PLACEHOLDER_IMG,
    subtitle: 'Browse all newsletter editions.',
    items: buildMany('newsletter', 9),
  },
};

function mapApiToListing(
  data: NonNullable<ListingApiResponse['data']>,
  kind: InsightsListingKind,
): InsightsListingData {
  const meta = data.meta || {};
  const base = { ...DEFAULT_LISTINGS[kind] };

  base.title = formatBoldText(clean(data.title) || base.title);
  base.subtitle = clean(meta.list_subtitle) || clean(data.content) || base.subtitle;

  const heroBg = mediaUrl(meta.banner_images);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.breadcrumbLabel =
    stripHtml(clean(data.title)) || TITLES[kind];

  const rawList = toArray(data.autofetch?.items).length
    ? toArray(data.autofetch?.items)
    : parseItems(meta.items);

  if (rawList.length) {
    base.items = rawList
      .map((item, idx) => mapItem(item, idx, kind))
      .filter(Boolean) as InsightItem[];
  }

  const metaSubs = parseStringArray(meta.list_subcategories);
  if (metaSubs.length) {
    base.filterSubcategories = metaSubs;
  } else if (kind === 'articles') {
    const derived = deriveSubcategories(base.items);
    if (derived.length) base.filterSubcategories = derived;
  }

  return base;
}

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

export const fetchInsightsListingPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const kind = LISTING_ROUTES[cleanSlug];
  if (!kind) return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const apiSlugPath = buildPageApiPath(cleanSlug);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as ListingApiResponse;
        const data = payload.data;
        if (data && data.layout === 'insights_listing') {
          return {
            slug: data.slug || cleanSlug,
            title: data.title || TITLES[kind],
            seo: data.seo || {},
            page: mapApiToListing(data, kind),
          };
        }
      }
    } catch {
      /* defaults */
    }
  }

  const def = DEFAULT_LISTINGS[kind];
  return {
    slug: cleanSlug,
    title: def.title,
    seo: {} as Record<string, unknown>,
    page: { ...def },
  };
});
