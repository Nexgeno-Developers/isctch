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
  publishedAt?: string;
};

export type RightSideBlock = {
  id: string;
  image?: string;
  imageAlt: string;
  href?: string;
};

export type InsightsArticleDetailPageData = {
  /** Primary line (black), often includes trailing colon — supports HTML from `formatBoldText`. */
  titleMain: string;
  /** Accent line (sky blue) — optional second part of the headline. */
  titleAccent?: string;
  heroImage?: string;
  /** Full article HTML from CMS. */
  bodyHtml: string;
  /** Plain label for breadcrumb current segment. */
  breadcrumbLabel: string;
  breadcrumbParentLabel?: string;
  breadcrumbParentHref?: string;
  authorName?: string;
  authorAvatar?: string;
  publishedAt?: string;
  categories?: Array<{ label: string; href?: string }>;
  summary?: string;
  rightSideBlocks?: RightSideBlock[];
  relatedPosts: RelatedArticleItem[];
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
  published_at?: string;
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

type PostAuthorApi = {
  id?: number | string;
  name?: string;
  email?: string;
  profile_image?: Media;
};

type PostCategoryApi = {
  id?: number | string;
  name?: string;
  title?: string;
  slug?: string;
  parent_id?: number | string | null;
};

type PostRightSideBlockApi = {
  image?: Media;
  url?: string | null;
};

type PostRelatedApi = {
  title?: string;
  slug?: string;
  summary?: string | null;
  featured_image?: Media;
  published_at?: string;
};

type PostDetailApiResponse = {
  data?: {
    id?: number | string;
    slug?: string;
    auto_slug?: string[];
    language?: string;
    title?: string;
    content?: string;
    featured_image?: Media;
    layout?: string;
    is_active?: boolean | null;
    author?: PostAuthorApi | null;
    categories?: PostCategoryApi[] | null;
    tags?: Array<Record<string, unknown>> | null;
    meta?: {
      right_side_blocks?: PostRightSideBlockApi[] | null;
      summary?: string | null;
    } | null;
    seo?: Record<string, unknown> | null;
    published_at?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    related_posts?: PostRelatedApi[] | null;
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

function normalizeSlugPath(slug?: string | null): string {
  return (slug || '').replace(/^\/+|\/+$/g, '');
}

function slugToHref(slug?: string | null): string | undefined {
  const clean = normalizeSlugPath(slug);
  return clean ? `/${clean}` : undefined;
}

function categoryLabel(category?: PostCategoryApi | null): string {
  return clean(category?.title) || clean(category?.name) || '';
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

function resolveCanonicalSlug(cleanSlug: string, autoSlugs?: string[] | null): string {
  const normalized = (autoSlugs || [])
    .map((s) => normalizeSlugPath(s))
    .filter(Boolean);
  if (normalized.includes(cleanSlug)) return cleanSlug;
  return normalized[0] || cleanSlug;
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
    publishedAt: raw.published_at || undefined,
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
  relatedPosts: [
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
    if (mapped.length) base.relatedPosts = mapped;
  }

  return base;
}

function mapPostToPage(
  data: NonNullable<PostDetailApiResponse['data']>,
  cleanSlug: string,
): InsightsArticleDetailPageData {
  const base: InsightsArticleDetailPageData = {
    ...DEFAULT_PAGE,
    relatedPosts: [],
    rightSideBlocks: [],
  };
  const title = clean(data.title) || 'Article';
  const summary = clean(data.meta?.summary);

  base.titleMain = formatBoldText(title);
  base.titleAccent = undefined;
  base.bodyHtml = clean(data.content) || base.bodyHtml;
  base.heroImage = mediaUrl(data.featured_image) || base.heroImage;
  base.breadcrumbLabel = stripHtml(title).slice(0, 80) || base.breadcrumbLabel;
  base.summary = summary || undefined;

  if (data.author?.name) base.authorName = data.author.name;
  const avatar = mediaUrl(data.author?.profile_image);
  if (avatar) base.authorAvatar = avatar;
  if (data.published_at) base.publishedAt = data.published_at;

  const categories = (data.categories || []).filter(Boolean) as PostCategoryApi[];
  if (categories.length) {
    const mapped = categories
      .map((c) => {
        const label = categoryLabel(c);
        if (!label) return null;
        return {
          label,
          href: slugToHref(c.slug),
        };
      })
      .filter(Boolean) as Array<{ label: string; href?: string }>;
    if (mapped.length) base.categories = mapped;

    const parent = categories.find((c) => c.parent_id == null) || categories[0];
    if (parent) {
      base.breadcrumbParentLabel = categoryLabel(parent) || undefined;
      base.breadcrumbParentHref = slugToHref(parent.slug);
    }
  }

  const rightBlocks = toArray(data.meta?.right_side_blocks as PostRightSideBlockApi[] | null);
  if (rightBlocks.length) {
    base.rightSideBlocks = rightBlocks
      .map((block, idx) => {
        const image = mediaUrl(block.image);
        if (!image) return null;
        return {
          id: `ad-${idx + 1}`,
          image,
          imageAlt: `Sponsored ${idx + 1}`,
          href: clean(block.url) || undefined,
        } as RightSideBlock;
      })
      .filter(Boolean) as RightSideBlock[];
  }

  const related = toArray(data.related_posts);
  if (related.length) {
    const baseSlug = normalizeSlugPath(
      (categories.find((c) => c.parent_id == null)?.slug || 'insights/articles') as string,
    );
    const mapped = related
      .map((item, idx) => {
        const relTitle = clean(item.title);
        const excerpt = clean(item.summary);
        if (!relTitle && !excerpt) return null;
        const id = `rel-${idx + 1}`;
        return {
          id,
          title: formatBoldText(relTitle || `Post ${idx + 1}`),
          excerpt: formatBoldText(excerpt || relTitle || ''),
          image: mediaUrl(item.featured_image),
          imageAlt: relTitle || 'Post',
          href: buildPostHref(baseSlug, item.slug, id),
          publishedAt: item.published_at || undefined,
        } as RelatedArticleItem;
      })
      .filter(Boolean) as RelatedArticleItem[];
    if (mapped.length) base.relatedPosts = mapped;
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

export const fetchPostDetailPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const parts = cleanSlug.split('/').filter(Boolean);
  const postSlug = parts[parts.length - 1];
  if (!postSlug) return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/v1/posts/${encodeURIComponent(postSlug)}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const payload = (await res.json()) as PostDetailApiResponse;
      const data = payload.data;
      if (data && data.layout === 'default_post_detail' && data.is_active !== false) {
        const canonicalSlug = resolveCanonicalSlug(cleanSlug, data.auto_slug);
        const page = mapPostToPage(data, canonicalSlug);
        const seo = { ...(data.seo || {}) } as Record<string, any>;
        if (!seo.description && page.summary) {
          seo.description = page.summary;
        }
        if (!seo.title && data.title) {
          seo.title = data.title;
        }
        const heroImage = mediaUrl(data.featured_image);
        if (!seo.og_image && heroImage) {
          seo.og_image = { url: heroImage };
        }
        if (!seo.twitter_image && heroImage) {
          seo.twitter_image = { url: heroImage };
        }
        return {
          slug: canonicalSlug,
          title: stripHtml(clean(data.title)) || 'Article',
          seo,
          page,
        };
      }
    }
  } catch {
    /* fall through */
  }

  return null;
});

export const fetchInsightsArticleDetailPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (!isInsightsArticleDetailPath(cleanSlug)) return null;

  const parts = cleanSlug.split('/').filter(Boolean);
  const articleSlug = parts.slice(2).join('/') || parts[2] || 'article';

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    const post = await fetchPostDetailPage(cleanSlug);
    if (post) return post;

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

    return null;
  }

  return {
    slug: cleanSlug,
    title: stripHtml(DEFAULT_PAGE.titleMain) || 'Article',
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_PAGE, breadcrumbLabel: articleSlug.replace(/-/g, ' ') },
  };
});
