import { cache } from 'react';
import { normalizeText } from '@/lib/htmlText';

type Media = { url?: string | null } | null | undefined;

type InnovationsApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      breadcrumb_title?: string;
      hero_title?: string;
      hero_image?: Media;
      hero_description?: string;
      page_blocks?: Array<{
        id?: number | string;
        title?: string;
        slug?: string;
        short_summary_image?: Media;
        short_summary_icon?: Media;
        short_summary_title?: string;
        short_summary_description?: string;
      }>;
      intro_heading_black?: string;
      intro_heading_blue?: string;
      intro_body?: string;
      feature_cards?: Array<{
        image?: Media;
        title?: string;
        description?: string;
        bullets?: string[];
        cta_text?: string;
        cta_url?: string;
      }>;
    };
    seo?: Record<string, unknown>;
  };
};

export type InnovationsFeatureCard = {
  id: string;
  image?: string;
  imageAlt: string;
  title: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
};

export type InnovationsPageData = {
  title: string;
  heroTitle: string;
  heroBackgroundImage?: string;
  introHeadingBlack: string;
  introHeadingBlue: string;
  introBody: string;
  featureCards: InnovationsFeatureCard[];
};

const EMPTY_PAGE: InnovationsPageData = {
  title: '',
  heroTitle: '',
  introHeadingBlack: '',
  introHeadingBlue: '',
  introBody: '',
  featureCards: [],
};

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function clean(s?: string | null) {
  const t = (s ?? '').trim();
  return t || undefined;
}

function htmlToPlainText(html?: string | null): string {
  if (!html) return '';
  return normalizeText(html.replace(/<[^>]+>/g, ' '));
}

function splitStarTitle(raw?: string | null): { black: string; blue: string } | null {
  const t = (raw ?? '').trim();
  if (!t) return null;
  const start = t.indexOf('*');
  if (start === -1) return { black: t, blue: '' };
  const end = t.indexOf('*', start + 1);
  if (end === -1) return { black: t.slice(0, start).trim(), blue: t.slice(start + 1).trim() };
  return { black: t.slice(0, start).trim(), blue: t.slice(start + 1, end).trim() };
}

function mapApiToPage(api: NonNullable<InnovationsApiResponse['data']>): InnovationsPageData {
  const meta = api.meta || {};
  const base: InnovationsPageData = { ...EMPTY_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) ?? '';
  // Hero should remain plain text in current design.
  base.heroTitle = clean(meta.breadcrumb_title) || clean(meta.hero_title) || base.title;

  const split = splitStarTitle(meta.hero_title);
  if (split) {
    base.introHeadingBlack = split.black || '';
    base.introHeadingBlue = split.blue || '';
  } else {
    base.introHeadingBlack = clean(meta.intro_heading_black) ?? '';
    base.introHeadingBlue = clean(meta.intro_heading_blue) ?? '';
  }
  base.introBody =
    clean(meta.hero_description) ||
    clean(meta.intro_body) ||
    htmlToPlainText(meta.hero_description) ||
    '';

  // Feature cards from CMS: page_blocks (preferred)
  if (meta.page_blocks?.length) {
    const mapped: InnovationsFeatureCard[] = meta.page_blocks
      .map((b, idx) => {
        const title = clean(b.short_summary_title) || clean(b.title);
        const description = clean(b.short_summary_description);
        const slug = clean(b.slug);
        if (!title || !description || !slug) return null;
        const image = mediaUrl(b.short_summary_image) || mediaUrl(b.short_summary_icon);
        return {
          id: String(b.id ?? `block-${idx + 1}`),
          image,
          imageAlt: title,
          title,
          description,
          bullets: [],
          ctaText: 'Explore',
          ctaHref: `/${slug.replace(/^\/+/, '')}`,
        };
      })
      .filter(Boolean) as InnovationsFeatureCard[];
    if (mapped.length) base.featureCards = mapped;
  } else {
    // Legacy support: feature_cards
    const cards = meta.feature_cards;
    if (cards?.length) {
      const mapped = cards
        .map((c, idx) => {
          const title = clean(c.title);
          const description = clean(c.description);
          if (!title || !description) return null;
          const bullets = (c.bullets || []).map((b) => clean(b)).filter(Boolean) as string[];
          const ctaText = clean(c.cta_text);
          const ctaUrl = clean(c.cta_url);
          return {
            id: `fc-${idx + 1}`,
            image: mediaUrl(c.image),
            imageAlt: title,
            title,
            description,
            bullets,
            ctaText: ctaText || 'Learn more',
            ctaHref: ctaUrl || '/contact-us',
          };
        })
        .filter(Boolean) as InnovationsFeatureCard[];
      if (mapped.length) base.featureCards = mapped;
    }
  }

  return base;
}

export const fetchInnovationsLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (!cleanSlug) return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(`${baseUrl}/v1/page/${encodeURIComponent(cleanSlug)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const payload = (await res.json()) as InnovationsApiResponse;
    const data = payload.data;
    if (!data || data.layout !== 'innovation') return null;
    return {
      slug: data.slug,
      title: data.title,
      seo: data.seo || {},
      page: mapApiToPage(data),
    };
  } catch {
    return null;
  }
});
