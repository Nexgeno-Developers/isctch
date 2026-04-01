import type {
  MarketingHighlight,
  MarketingServiceListItem,
  MarketingServicesLayoutPageData,
} from '@/components/pages/MarketingServicesLayoutPage';

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
    };
  };
};

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

export async function fetchMarketingServicesLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}?autofetch=marketing_services`, {
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
          value: values[idx],
          title: t,
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
            title,
            description: stripHtml(item.short_summary_description) || undefined,
            image: mediaUrl(item.short_summary_image),
            imageAlt: title,
            href: slugToHref(itemSlug),
          };
        })
        .filter(Boolean) as MarketingServiceListItem[];

      return {
        slug: data.slug,
        title: data.title,
        seo: (data.seo || {}) as any,
        page: {
          title: data.title,
          heroBackgroundImage: heroImage,
          heroTitle,
          heroDescriptionHtml: meta.hero_description || undefined,
          introImage: mediaUrl(meta.short_summary_image),
          introImageAlt: heroTitle,
          highlightsTitle: meta.highlights_title || undefined,
          highlights: highlightItems,
          servicesHeading: meta.short_summary_title || undefined,
          services,
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

