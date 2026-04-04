type Media = { url?: string | null } | null | undefined;

type MarketingServiceDetailApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_image?: Media;
      short_summary_title?: string;
      short_summary_description?: string;
      hero_title?: string;
      hero_image?: Media;
      hero_navigation_url?: string;
      hero_description?: string;
      highlights_items?: {
        icon?: Array<Media>;
        title?: Array<string>;
        description?: Array<string>;
      };
      video_url?: string;
      brand_journey_title?: string;
      brand_journey_items?: {
        icon?: Array<Media>;
        title?: Array<string>;
        description?: Array<string>;
      };
    };
    seo?: Record<string, unknown>;
  };
};

import { formatBoldText } from '@/lib/htmlText';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';

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

export type MarketingServiceDetailPageData = {
  title: string;
  heroBackgroundImage?: string;
  introTitle: string;
  introDescription: string;
  introCtaHref?: string;
  introImage?: string;
  introImageAlt?: string;
  heroDescriptionHtml?: string;
  highlights: Array<{
    id: string;
    icon?: string;
    title: string;
    description?: string;
  }>;
  videoUrl?: string;
  brandJourneyTitle?: string;
  brandJourneyItems: Array<{
    id: string;
    icon?: string;
    title: string;
    subtitle?: string;
  }>;
};

export async function fetchMarketingServiceDetailLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (!res.ok) continue;

      const { data } = (await res.json()) as MarketingServiceDetailApiResponse;
      if (!data || data.layout !== 'marketing_service_detail') continue;

      const meta = data.meta || {};
      const heroBg =
        mediaUrl(meta.breadcrumb_image) || mediaUrl(meta.hero_image) || undefined;

      const hiIcons = meta.highlights_items?.icon || [];
      const hiTitles = meta.highlights_items?.title || [];
      const hiDescs = meta.highlights_items?.description || [];
      const highlights = hiTitles
        .map((t, idx) => ({
          id: `h-${idx}`,
          icon: mediaUrl(hiIcons[idx]),
          title: formatBoldText(t || ''),
          description: formatBoldText(hiDescs[idx] || ''),
        }))
        .filter((x) => !!x.title);

      const bjIcons = meta.brand_journey_items?.icon || [];
      const bjTitles = meta.brand_journey_items?.title || [];
      const bjDescs = meta.brand_journey_items?.description || [];
      const brandJourneyItems = bjTitles
        .map((t, idx) => ({
          id: `bj-${idx}`,
          icon: mediaUrl(bjIcons[idx]),
          title: formatBoldText(t),
          subtitle: formatBoldText(bjDescs[idx]),
        }))
        .filter((x) => !!x.title);

      const page: MarketingServiceDetailPageData = {
        title: formatBoldText(data.title),
        heroBackgroundImage: heroBg,
        // Top split section should use hero_* fields (per backend).
        introTitle: formatBoldText(meta.hero_title || meta.short_summary_title || data.title),
        introDescription:
          formatBoldText(stripHtml(meta.hero_description)) ||
          formatBoldText(meta.short_summary_description || '') ||
          formatBoldText(stripHtml(data.content)) ||
          '',
        introCtaHref:
          meta.hero_navigation_url && meta.hero_navigation_url !== '#'
            ? meta.hero_navigation_url
            : undefined,
        introImage: mediaUrl(meta.hero_image) || mediaUrl(meta.short_summary_image),
        introImageAlt: formatBoldText(meta.short_summary_title || data.title),
        heroDescriptionHtml: meta.hero_description || undefined,
        highlights,
        videoUrl: cleanVideoUrlFromApi(meta.video_url) || undefined,
        brandJourneyTitle: formatBoldText(meta.brand_journey_title || '') || undefined,
        brandJourneyItems,
      };

      return {
        slug: data.slug,
        title: data.title,
        seo: (data.seo || {}) as any,
        page,
      };
    } catch {
      continue;
    }
  }

  return null;
}

