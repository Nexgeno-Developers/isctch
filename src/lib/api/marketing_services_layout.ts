import type {
  MarketingHighlight,
  MarketingServiceListItem,
  MarketingServicesLayoutPageData,
} from '@/components/pages/MarketingServicesLayoutPage';
import type { MarketingNewsItem } from '@/components/marketing/LatestNewsClient';

type Media = { url?: string | null } | null | undefined;

type MarketingServicesApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_title?: string;
      short_summary_image?: Media;
      hero_title?: string;
      hero_image?: Media;
      hero_description?: string;
      highlights_title?: string;
      highlights_items?: {
        icon?: Array<Media>;
        value?: Array<string>;
        title?: Array<string>;
      };
    };
    seo?: Record<string, unknown>;
    autofetch?: {
      marketing_services?:
        | {
            id?: number;
            title?: string;
            slug?: string;
            short_summary_image?: Media;
            short_summary_description?: string;
          }
        | Array<{
            id?: number;
            title?: string;
            slug?: string;
            short_summary_image?: Media;
            short_summary_description?: string;
          }>
        | null;
      latest_insights?: MarketingNewsApiItem[] | MarketingNewsApiItem | null;
      latest_news?: MarketingNewsApiItem[] | MarketingNewsApiItem | null;
    };
  };
};

type MarketingNewsApiItem = {
  id?: number;
  title?: string;
  slug?: string;
  featured_image?: Media;
  summary?: string;
  published_at?: string | null;
};

import { formatBoldText } from '@/lib/htmlText';

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function slugCandidates(slug: string) {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const last = clean.split('/').filter(Boolean).pop();
  return Array.from(new Set([clean, last].filter(Boolean) as string[]));
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function stripHtml(value?: string) {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function slugToHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, '');
  return s ? `/${s}/` : '/';
}

function mapMarketingNewsItems(
  list: MarketingNewsApiItem[] | MarketingNewsApiItem | null | undefined,
): MarketingNewsItem[] {
  const items = toArray(list);
  if (!items.length) return [];

  return items
    .map((item, idx) => {
      const title = item.title?.trim();
      const image = mediaUrl(item.featured_image);
      if (!title || !image) return null;
      return {
        id: String(item.id ?? `news-${idx + 1}`),
        title,
        image,
        imageAlt: title,
        date: '',
        time: '',
      } as MarketingNewsItem;
    })
    .filter(Boolean) as MarketingNewsItem[];
}

export async function fetchMarketingServicesLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}?autofetch=marketing_services,latest_insights,latest_news`, {
        cache: 'no-store',
      });
      if (!res.ok) continue;

      const { data } = (await res.json()) as MarketingServicesApiResponse;
      if (!data || data.layout !== 'marketing_services') continue;

      const meta = data.meta || {};
      const heroTitle = meta.hero_title || data.title;
      const heroImage =
        mediaUrl(meta.breadcrumb_image) ||
        mediaUrl(meta.hero_image) ||
        undefined;

      const icons = meta.highlights_items?.icon || [];
      const values = meta.highlights_items?.value || [];
      const titles = meta.highlights_items?.title || [];

      const highlights = titles
        .map((t, idx) => ({
          id: `hl-${idx}`,
          icon: mediaUrl(icons[idx]),
          value: formatBoldText(values[idx]),
          title: formatBoldText(t),
        }))
        .filter((x) => !!x.title);

      const highlightItems: MarketingHighlight[] = highlights;

      const services: MarketingServiceListItem[] = toArray(data.autofetch?.marketing_services)
        .map((item, idx) => {
          const title = item.title?.trim();
          const itemSlug = item.slug?.trim();
          if (!title || !itemSlug) return null;
          return {
            id: String(item.id ?? `ms-${idx}`),
            title: formatBoldText(title),
            description: formatBoldText(stripHtml(item.short_summary_description) || '') || undefined,
            image: mediaUrl(item.short_summary_image),
            imageAlt: formatBoldText(title),
            href: slugToHref(itemSlug),
          };
        })
        .filter(Boolean) as MarketingServiceListItem[];

      const latestInsights = mapMarketingNewsItems(data.autofetch?.latest_insights);
      const latestNews = mapMarketingNewsItems(data.autofetch?.latest_news);

      return {
        slug: data.slug,
        title: formatBoldText(data.title),
        seo: (data.seo || {}) as any,
        page: {
          title: formatBoldText(data.title),
          heroBackgroundImage: heroImage,
          heroTitle: formatBoldText(heroTitle),
          heroDescriptionHtml: meta.hero_description || undefined,
          introImage: mediaUrl(meta.hero_image) || mediaUrl(meta.short_summary_image),
          introImageAlt: formatBoldText(heroTitle),
          highlightsTitle: formatBoldText(meta.highlights_title || '') || undefined,
          highlights: highlightItems,
          servicesHeading: formatBoldText(meta.short_summary_title || '') || undefined,
          services,
          latestInsights,
          latestNews,
        } satisfies MarketingServicesLayoutPageData,
        // useful plain text for SEO fallback if needed
        summary: stripHtml(meta.hero_description || data.content || ''),
      };
    } catch {
      continue;
    }
  }

  return null;
}

