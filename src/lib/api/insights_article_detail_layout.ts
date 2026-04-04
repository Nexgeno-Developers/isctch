import { cache } from 'react';
import { formatBoldText } from '@/lib/htmlText';

type Media = { url?: string | null } | null | undefined;

/** Compact item for the “related articles” sidebar. */
export type RelatedArticleItem = {
  id: string;
  category?: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt: string;
  href: string;
};

export type InsightsArticleDetailPageData = {
  /** Primary line (black), often includes trailing colon — supports HTML from `formatBoldText`. */
  titleMain: string;
  /** Accent line (sky blue) — optional second part of the headline. */
  titleAccent?: string;
  heroImage?: string;
  /** Full article HTML from CMS. */
  bodyHtml: string;
  relatedArticles: RelatedArticleItem[];
  /** Plain label for breadcrumb current segment. */
  breadcrumbLabel: string;
};

type RelatedApi = {
  id?: number | string;
  title?: string;
  description?: string;
  short_summary_description?: string;
  category?: string;
  image?: Media;
  link?: string;
  slug?: string;
};

type ArticleDetailApiResponse = {
  data?: {
    slug?: string;
    title?: string;
    content?: string;
    layout?: string;
    meta?: {
      banner_images?: Media;
      hero_image?: Media;
      title_accent?: string;
      /** If set, used as black part of headline; else falls back to `title`. */
      title_main?: string;
    };
    seo?: Record<string, unknown>;
    autofetch?: {
      related_articles?: RelatedApi[] | RelatedApi | null;
    };
  };
};

const PLACEHOLDER = '/about_banner.jpg';

function clean(s?: string | null) {
  return (s ?? '').trim();
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function toArray<T>(v: T | T[] | null | undefined): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function stripHtml(value?: string | null): string {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function mapRelated(
  raw: RelatedApi,
  idx: number,
  articleSlug: string,
): RelatedArticleItem | null {
  const title = clean(raw.title);
  const excerpt = clean(raw.description ?? raw.short_summary_description);
  if (!title && !excerpt) return null;
  const id = String(raw.id ?? `rel-${idx}`);
  const hrefRaw = clean(raw.link) || clean(raw.slug);
  const href = hrefRaw
    ? hrefRaw.startsWith('http')
      ? hrefRaw
      : hrefRaw.startsWith('/')
        ? hrefRaw
        : `/insights/articles/${hrefRaw.replace(/^\/+/, '')}`
    : `/insights/articles/${articleSlug}/related-${id}`;

  return {
    id,
    category: clean(raw.category) || undefined,
    title: formatBoldText(title || 'Article'),
    excerpt: formatBoldText(excerpt || title || ''),
    image: mediaUrl(raw.image),
    imageAlt: stripHtml(title) || 'Article',
    href,
  };
}

const DEFAULT_BODY = `
<p>Lamipak helps brands turn complex market and channel data into clear packaging and recipe decisions—so your next launch lands with the right format, barrier, and line performance.</p>
<h2><strong>From Insights to Product and Recipe Optimization</strong></h2>
<p>Our teams combine filling-line telemetry, sensory benchmarks, and regional demand signals. That means fewer trials on the pilot line and faster alignment between marketing claims and what your plant can run at scale.</p>
<p>Whether you are extending an existing SKU or entering a new category, we map constraints early: shelf life targets, regulatory labeling, recyclability goals, and total cost—so the path from insight to industrialization stays traceable.</p>
`;

const DEFAULT_PAGE: InsightsArticleDetailPageData = {
  titleMain: formatBoldText('Lamipak Market Insights And Promotion:'),
  titleAccent: formatBoldText('Turning Data Into Market Success'),
  heroImage: PLACEHOLDER,
  bodyHtml: DEFAULT_BODY,
  breadcrumbLabel: 'Market insights',
  relatedArticles: [
    {
      id: 'r1',
      category: 'Dairy',
      title: formatBoldText('Aseptic dairy trends 2026'),
      excerpt: formatBoldText(
        'What buyers are asking for in premium white milk and drinking yogurt—and how barrier choices affect shelf presence.',
      ),
      image: PLACEHOLDER,
      imageAlt: 'Dairy',
      href: '/insights/articles/dairy-trends-2026',
    },
    {
      id: 'r2',
      category: 'Beverage',
      title: formatBoldText('Plant-based NPD checklist'),
      excerpt: formatBoldText(
        'Stability, clean label, and filling compatibility for oat and nut bases on high-speed lines.',
      ),
      image: PLACEHOLDER,
      imageAlt: 'Beverage',
      href: '/insights/articles/plant-based-npd',
    },
    {
      id: 'r3',
      category: 'Operations',
      title: formatBoldText('OEE without compromising sterility'),
      excerpt: formatBoldText(
        'Balancing CIP windows, changeover time, and QA sampling on aseptic carton lines.',
      ),
      image: PLACEHOLDER,
      imageAlt: 'Operations',
      href: '/insights/articles/oee-aseptic-lines',
    },
  ],
};

function mapApiToPage(
  data: NonNullable<ArticleDetailApiResponse['data']>,
  articleSlug: string,
): InsightsArticleDetailPageData {
  const meta = data.meta || {};
  const base: InsightsArticleDetailPageData = { ...DEFAULT_PAGE };

  const rawTitle = clean(data.title) || 'Article';
  const mainFromMeta = clean(meta.title_main);
  const accentFromMeta = clean(meta.title_accent);

  if (mainFromMeta || accentFromMeta) {
    base.titleMain = formatBoldText(mainFromMeta || rawTitle);
    base.titleAccent = accentFromMeta ? formatBoldText(accentFromMeta) : undefined;
  } else {
    base.titleMain = formatBoldText(rawTitle);
    base.titleAccent = undefined;
  }

  base.bodyHtml = clean(data.content) || base.bodyHtml;
  base.heroImage = mediaUrl(meta.hero_image) || mediaUrl(meta.banner_images) || base.heroImage;
  base.breadcrumbLabel = stripHtml(rawTitle).slice(0, 80) || base.breadcrumbLabel;

  const related = toArray(data.autofetch?.related_articles);
  if (related.length) {
    const mapped = related
      .map((r, idx) => mapRelated(r, idx, articleSlug))
      .filter(Boolean) as RelatedArticleItem[];
    if (mapped.length) base.relatedArticles = mapped;
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

export function isInsightsArticleDetailPath(slug: string): boolean {
  const parts = slug.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  return parts.length >= 3 && parts[0] === 'insights' && parts[1] === 'articles';
}

export const fetchInsightsArticleDetailPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (!isInsightsArticleDetailPath(cleanSlug)) return null;

  const parts = cleanSlug.split('/').filter(Boolean);
  const articleSlug = parts.slice(2).join('/') || parts[2] || 'article';

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const apiSlugPath = buildPageApiPath(cleanSlug);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as ArticleDetailApiResponse;
        const data = payload.data;
        if (data && data.layout === 'insights_article_detail') {
          return {
            slug: data.slug || cleanSlug,
            title: stripHtml(clean(data.title)) || 'Article',
            seo: data.seo || {},
            page: mapApiToPage(data, articleSlug),
          };
        }
      }
    } catch {
      /* defaults */
    }
  }

  return {
    slug: cleanSlug,
    title: stripHtml(DEFAULT_PAGE.titleMain) || 'Article',
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_PAGE, breadcrumbLabel: articleSlug.replace(/-/g, ' ') },
  };
});
