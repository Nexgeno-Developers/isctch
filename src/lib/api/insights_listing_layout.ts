import { cache } from 'react';
import { formatBoldText } from '@/lib/htmlText';
import type { InsightItem } from '@/lib/api/insights_layout';

export type InsightsListingKind = 'articles' | 'webinars' | 'newsletter';

export type InsightsListingFilterLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type InsightsListingPagination = {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
};

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
  /** Optional category navigation links (e.g. parent + children). */
  filterLinks?: InsightsListingFilterLink[];
  /** Label for the "All" filter entry (parent category). */
  allFilterLabel?: string;
  /** Href for the "All" filter entry. */
  allFilterHref?: string;
  /** Whether the "All" filter entry is active. */
  allFilterActive?: boolean;
  /** Pagination from API categories endpoint. */
  pagination?: InsightsListingPagination;
  /** Base path to use when building pagination links. */
  paginationPath?: string;
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

type CategoryMedia = { url?: string | null } | string | null | undefined;

type CategoryNode = {
  id?: number | string;
  name?: string;
  title?: string;
  slug?: string;
  parent_id?: number | string;
  children?: CategoryNode[] | null;
};

type CategoryPost = {
  id?: number | string;
  title?: string;
  slug?: string;
  featured_image?: CategoryMedia;
  summary?: string | null;
};

type CategoryPostsPayload = {
  data?: CategoryPost[] | null;
  pagination?: {
    current_page?: number | string | null;
    per_page?: number | string | null;
    total?: number | string | null;
    last_page?: number | string | null;
  } | null;
};

type CategoryListingApiResponse = {
  category?: CategoryNode | null;
  layout?: string | null;
  parent?: CategoryNode | null;
  children?: CategoryNode[] | null;
  posts?: CategoryPostsPayload | null;
  seo?: Record<string, unknown> | null;
};

const PLACEHOLDER_IMG = '/about_banner.jpg';

const LISTING_ROUTES: Record<string, InsightsListingKind> = {
  'insights/articles': 'articles',
  'insights/webinars': 'webinars',
  'insights/newsletter': 'newsletter',
};

function inferKindFromSlug(cleanSlug: string): InsightsListingKind | null {
  if (cleanSlug.startsWith('insights/articles')) return 'articles';
  if (cleanSlug.startsWith('insights/webinars')) return 'webinars';
  if (cleanSlug.startsWith('insights/newsletter')) return 'newsletter';
  return null;
}

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

function mediaUrl(media?: { url?: string | null } | string | null) {
  if (!media) return undefined;
  if (typeof media === 'string') {
    return media.trim() ? media.trim() : undefined;
  }
  const url = media.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
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

function normalizeSlugPath(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

function slugToHref(slug?: string | null): string | undefined {
  if (!slug) return undefined;
  const cleanSlug = normalizeSlugPath(slug);
  return cleanSlug ? `/${cleanSlug}` : undefined;
}

function categoryLabel(node?: CategoryNode | null): string {
  return clean(node?.title) || clean(node?.name) || '';
}

function toNumber(value: number | string | null | undefined, fallback: number): number {
  if (value === null || value === undefined) return fallback;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function buildPostHref(baseSlug: string, rawSlug: string | undefined, fallbackId: string): string {
  const slug = clean(rawSlug);
  if (!slug) return `${slugToHref(baseSlug) || '/insights'}#${fallbackId}`;
  if (/^https?:\/\//i.test(slug)) return slug;
  if (slug.startsWith('/')) return slug;

  const base = normalizeSlugPath(baseSlug);
  if (slug.startsWith('insights/')) return `/${slug}`;
  if (base && slug.startsWith(base)) return `/${slug}`;
  return base ? `/${base}/${slug}` : `/${slug}`;
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

function mapCategoryToListing(
  payload: CategoryListingApiResponse,
  kind: InsightsListingKind,
  cleanSlug: string,
  page: number,
): InsightsListingData | null {
  const category = payload.category;
  if (!category) return null;

  const base = { ...DEFAULT_LISTINGS[kind], items: [] as InsightItem[] };
  const categoryTitle = categoryLabel(category) || base.title;

  base.title = formatBoldText(categoryTitle);
  base.breadcrumbLabel = stripHtml(categoryTitle) || base.breadcrumbLabel;
  base.paginationPath = `/${cleanSlug}`;

  const parent = payload.parent ?? null;
  const root = parent || category;
  const rootSlug = normalizeSlugPath(root.slug || cleanSlug);

  const allLabel = categoryLabel(root) || 'All';
  const allHref = slugToHref(root.slug) || `/${rootSlug}`;
  base.allFilterLabel = allLabel;
  base.allFilterHref = allHref;
  base.allFilterActive = rootSlug === cleanSlug;

  const children = (parent?.children?.length ? parent.children : payload.children) || [];
  const seen = new Set<string>();
  const filterLinks: InsightsListingFilterLink[] = [];

  for (const child of children) {
    const label = categoryLabel(child);
    const href = slugToHref(child.slug);
    if (!label || !href) continue;
    const slugKey = normalizeSlugPath(child.slug || href);
    if (seen.has(slugKey)) continue;
    seen.add(slugKey);
    filterLinks.push({
      label,
      href,
      active: slugKey === cleanSlug,
    });
  }

  if (filterLinks.length) base.filterLinks = filterLinks;

  const posts = toArray(payload.posts?.data);
  const mappedItems = posts
    .map((post, idx) => {
      const title = clean(post.title);
      const description = clean(post.summary || '');
      if (!title && !description) return null;
      const id = String(post.id ?? `post-${idx + 1}`);
      const href = buildPostHref(rootSlug, post.slug || undefined, id);

      return {
        id,
        title: formatBoldText(title || `Post ${idx + 1}`),
        description: formatBoldText(description || title || ''),
        image: mediaUrl(post.featured_image),
        imageAlt: title || 'Post',
        href,
        subcategory: undefined,
      } as InsightItem;
    })
    .filter(Boolean) as InsightItem[];

  base.items = mappedItems;

  const pagination = payload.posts?.pagination;
  const currentPage = toNumber(pagination?.current_page, page || 1);
  const perPage = toNumber(pagination?.per_page, mappedItems.length || 0);
  const total = toNumber(pagination?.total, mappedItems.length || 0);
  const lastPage = toNumber(pagination?.last_page, currentPage);

  base.pagination = {
    currentPage,
    perPage,
    total,
    lastPage,
  };

  return base;
}

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

export const fetchInsightsListingPage = cache(async (slug: string, page: number = 1) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const kind = inferKindFromSlug(cleanSlug) || LISTING_ROUTES[cleanSlug];
  if (!kind) return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const apiSlugPath = buildPageApiPath(cleanSlug);
      const pageParam = page && page > 1 ? `?page=${page}` : '';
      const res = await fetch(`${baseUrl}/v1/categories/${apiSlugPath}${pageParam}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const payload = (await res.json()) as CategoryListingApiResponse;
        if (payload.layout === 'default_category_listing') {
          const listing = mapCategoryToListing(payload, kind, cleanSlug, page);
          if (listing) {
            return {
              slug: payload.category?.slug || cleanSlug,
              title: categoryLabel(payload.category) || TITLES[kind],
              seo: payload.seo || {},
              page: listing,
            };
          }
        }
      }
    } catch {
      /* fall through */
    }

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
