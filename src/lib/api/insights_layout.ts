import { cache } from 'react';
import { formatBoldText } from '@/lib/htmlText';

type Media = { url?: string | null } | null | undefined;

export type InsightItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  href: string;
  /** Subcategory / vertical for listing filters (e.g. Dairy, Beverage). */
  subcategory?: string;
};

export type InsightsHubData = {
  title: string;
  /** Hero banner image (e.g. CMS `meta.banner_images.url`). */
  heroBackgroundImage?: string;
  pageIntro?: string;
  articlesSectionTitle: string;
  articlesSectionSubtitle?: string;
  articles: InsightItem[];
  articlesViewAllHref: string;
  webinarsSectionTitle: string;
  webinarsSectionSubtitle?: string;
  webinars: InsightItem[];
  webinarsViewAllHref: string;
  newsletterSectionTitle: string;
  newsletterSectionSubtitle?: string;
  newsletter: InsightItem[];
  newsletterViewAllHref: string;
};

type InsightItemApi = {
  id?: number | string;
  title?: string;
  description?: string;
  image?: Media;
  link?: string;
  slug?: string;
  subcategory?: string;
  category?: string;
};

type InsightsHubApiResponse = {
  data?: {
    slug?: string;
    title?: string;
    content?: string;
    layout?: string;
    meta?: {
      banner_images?: Media;
      page_intro?: string;
      articles_heading?: string;
      articles_subheading?: string;
      webinars_heading?: string;
      webinars_subheading?: string;
      newsletter_heading?: string;
      newsletter_subheading?: string;
      articles_view_all_path?: string;
      webinars_view_all_path?: string;
      newsletter_view_all_path?: string;
      /** JSON string or array of items (if CMS stores inline). */
      articles_items?: unknown;
      webinars_items?: unknown;
      newsletter_items?: unknown;
    };
    seo?: Record<string, unknown>;
    autofetch?: {
      articles?: InsightItemApi[] | InsightItemApi | null;
      webinars?: InsightItemApi[] | InsightItemApi | null;
      newsletter?: InsightItemApi[] | InsightItemApi | null;
    };
  };
};

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function clean(s?: string | null) {
  return (s ?? '').trim();
}

function toArray<T>(v: T | T[] | null | undefined): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function parseMetaItems(raw: unknown): InsightItemApi[] {
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

function mapItem(
  raw: InsightItemApi,
  idx: number,
  prefix: string,
  defaultBasePath: string,
): InsightItem | null {
  const title = clean(raw.title);
  const description = clean(raw.description);
  if (!title) return null;
  const id = String(raw.id ?? `${prefix}-${idx}`);
  const hrefRaw = clean(raw.link) || clean(raw.slug);
  const href = hrefRaw
    ? hrefRaw.startsWith('http')
      ? hrefRaw
      : hrefRaw.startsWith('/')
        ? hrefRaw
        : `/${hrefRaw.replace(/^\/+/, '')}`
    : `${defaultBasePath}#${id}`;

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

function mapItems(
  list: InsightItemApi[],
  prefix: string,
  defaultBase: string,
  limit?: number,
): InsightItem[] {
  const mapped = list
    .map((item, idx) => mapItem(item, idx, prefix, defaultBase))
    .filter(Boolean) as InsightItem[];
  const sliced = limit ? mapped.slice(0, limit) : mapped;
  return sliced;
}

const PLACEHOLDER_IMG = '/about_banner.jpg';

const DEFAULT_HUB: InsightsHubData = {
  title: 'Insights',
  heroBackgroundImage: PLACEHOLDER_IMG,
  pageIntro: 'Stay informed with the latest articles, webinars, and newsletters from Lamipak.',
  articlesSectionTitle: 'Articles',
  articlesSectionSubtitle: 'Expert perspectives on aseptic packaging, sustainability, and innovation.',
  articlesViewAllHref: '/insights/articles',
  webinarsSectionTitle: 'Webinar',
  webinarsSectionSubtitle: 'On-demand sessions and live recordings from our specialists.',
  webinarsViewAllHref: '/insights/webinars',
  newsletterSectionTitle: 'Newsletter',
  newsletterSectionSubtitle: 'Product updates, events, and industry news in your inbox.',
  newsletterViewAllHref: '/insights/newsletter',
  articles: [
    {
      id: 'a1',
      title: formatBoldText('Future of Aseptic Technology'),
      description: formatBoldText(
        'How next-generation barrier materials and digital monitoring are reshaping shelf life and food safety.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Aseptic packaging line',
      href: '/insights/articles/future-of-aseptic',
    },
    {
      id: 'a2',
      title: formatBoldText('Sustainability in Carton Packaging'),
      description: formatBoldText(
        'Balancing recyclability, renewable content, and performance across global markets.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Sustainable cartons',
      href: '/insights/articles/sustainability-carton',
    },
    {
      id: 'a3',
      title: formatBoldText('Innovation on the Filling Line'),
      description: formatBoldText(
        'Practical steps to boost OEE while maintaining aseptic integrity and brand quality.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Filling line',
      href: '/insights/articles/filling-line',
    },
  ],
  webinars: [
    {
      id: 'w1',
      title: formatBoldText('Aseptic Best Practices'),
      description: formatBoldText(
        'Panel discussion on validation, cleaning protocols, and supplier collaboration.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Webinar thumbnail',
      href: '/insights/webinars#best-practices',
    },
    {
      id: 'w2',
      title: formatBoldText('Barrier Films Deep Dive'),
      description: formatBoldText(
        'Technical walkthrough of multilayer structures for dairy and plant-based beverages.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Barrier films',
      href: '/insights/webinars#barrier-films',
    },
    {
      id: 'w3',
      title: formatBoldText('QA for High-Speed Lines'),
      description: formatBoldText(
        'Measurement strategies and defect prevention for 24/7 production.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Quality assurance',
      href: '/insights/webinars#qa-lines',
    },
  ],
  newsletter: [
    {
      id: 'n1',
      title: formatBoldText('Q1 Market Outlook'),
      description: formatBoldText(
        'Regional demand trends, capacity outlook, and sustainability policy updates.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Newsletter cover',
      href: '/insights/newsletter#q1-outlook',
    },
    {
      id: 'n2',
      title: formatBoldText('Product Launch Round-Up'),
      description: formatBoldText(
        'New formats, caps, and digital tools released this quarter.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Product launches',
      href: '/insights/newsletter#launch-roundup',
    },
    {
      id: 'n3',
      title: formatBoldText('Events & Tradeshows'),
      description: formatBoldText(
        'Where to meet Lamipak engineers and see demos live.',
      ),
      image: PLACEHOLDER_IMG,
      imageAlt: 'Events',
      href: '/insights/newsletter#events',
    },
  ],
};

function mapApiToHub(data: NonNullable<InsightsHubApiResponse['data']>): InsightsHubData {
  const meta = data.meta || {};
  const base: InsightsHubData = { ...DEFAULT_HUB };

  const heroBg = mediaUrl(meta.banner_images);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = formatBoldText(clean(data.title) || base.title);
  base.pageIntro = clean(meta.page_intro) || clean(data.content) || base.pageIntro;

  base.articlesSectionTitle = formatBoldText(clean(meta.articles_heading) || base.articlesSectionTitle);
  base.articlesSectionSubtitle = clean(meta.articles_subheading) || base.articlesSectionSubtitle;
  base.webinarsSectionTitle = formatBoldText(clean(meta.webinars_heading) || base.webinarsSectionTitle);
  base.webinarsSectionSubtitle = clean(meta.webinars_subheading) || base.webinarsSectionSubtitle;
  base.newsletterSectionTitle = formatBoldText(clean(meta.newsletter_heading) || base.newsletterSectionTitle);
  base.newsletterSectionSubtitle = clean(meta.newsletter_subheading) || base.newsletterSectionSubtitle;

  const av = clean(meta.articles_view_all_path);
  if (av) base.articlesViewAllHref = av.startsWith('/') ? av : `/${av}`;
  const wv = clean(meta.webinars_view_all_path);
  if (wv) base.webinarsViewAllHref = wv.startsWith('/') ? wv : `/${wv}`;
  const nv = clean(meta.newsletter_view_all_path);
  if (nv) base.newsletterViewAllHref = nv.startsWith('/') ? nv : `/${nv}`;

  const fromArticles =
    toArray(data.autofetch?.articles).length > 0
      ? toArray(data.autofetch?.articles)
      : parseMetaItems(meta.articles_items);
  const fromWebinars =
    toArray(data.autofetch?.webinars).length > 0
      ? toArray(data.autofetch?.webinars)
      : parseMetaItems(meta.webinars_items);
  const fromNews =
    toArray(data.autofetch?.newsletter).length > 0
      ? toArray(data.autofetch?.newsletter)
      : parseMetaItems(meta.newsletter_items);

  if (fromArticles.length) base.articles = mapItems(fromArticles, 'article', '/insights/articles', 3);
  if (fromWebinars.length) base.webinars = mapItems(fromWebinars, 'webinar', '/insights/webinars', 3);
  if (fromNews.length) base.newsletter = mapItems(fromNews, 'news', '/insights/newsletter', 3);

  return base;
}

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

export const fetchInsightsHubPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (cleanSlug !== 'insights') return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const apiSlugPath = buildPageApiPath(cleanSlug);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as InsightsHubApiResponse;
        const data = payload.data;
        if (data && data.layout === 'insights') {
          return {
            slug: data.slug || 'insights',
            title: data.title || 'Insights',
            seo: data.seo || {},
            page: mapApiToHub(data),
          };
        }
      }
    } catch {
      /* fall through to defaults */
    }
  }

  return {
    slug: 'insights',
    title: DEFAULT_HUB.title,
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_HUB },
  };
});
