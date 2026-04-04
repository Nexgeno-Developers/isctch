import { cache } from 'react';

type Media = { url?: string | null } | null | undefined;

type InnovationsApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      hero_title?: string;
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

const DEFAULT_PAGE: InnovationsPageData = {
  title: 'Innovations',
  heroBackgroundImage: '/about_banner.jpg',
  heroTitle: 'END-TO-END BEVERAGE INNOVATION & DEVELOPMENT SOLUTIONS',
  introHeadingBlack: 'Your Complete Innovation-',
  introHeadingBlue: 'To-Execution Partner',
  introBody:
    'Lamipak Provides Integrated Solutions That Bridge The Gap From Innovative Ideas To Market-Ready Beverages, Ensuring High Performance, Quality, And Efficiency At Every Step.',
  featureCards: [
    {
      id: 'npd',
      image: '/about_banner.jpg',
      imageAlt: 'Laboratory interior for new product development',
      title: 'New Product Development (NPD)',
      description:
        "Turn Your Beverage Ideas Into Market-Ready Products With Lamipak's Expert Packaging Solutions, Technical Support, And Data-Driven Insights.",
      bullets: [
        'Market Research & Concept Development',
        'Aseptic Packaging Expertise',
        'Sustainable Packaging Solutions',
      ],
      ctaText: 'Explore NPD',
      ctaHref: '/npd',
    },
    {
      id: 'pilot',
      image: '/about_banner.jpg',
      imageAlt: 'Innovation center building',
      title: 'Pilot Plant',
      description:
        'Test, Refine, And Validate Your Product In Cutting-Edge Pilot Facilities Designed To Simulate Real-World Manufacturing And Ensure Scalability.',
      bullets: [
        'Recipe Development & Prototyping',
        'Aseptic Packaging Validation',
        'Pilot-Scale Production Support',
      ],
      ctaText: 'Explore Pilot Plant',
      ctaHref: '/pilot-plant',
    },
  ],
};

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function clean(s?: string | null) {
  const t = (s ?? '').trim();
  return t || undefined;
}

function mapApiToPage(api: NonNullable<InnovationsApiResponse['data']>): InnovationsPageData {
  const meta = api.meta || {};
  const base = { ...DEFAULT_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) || base.title;
  base.heroTitle = clean(meta.hero_title) || base.heroTitle;
  base.introHeadingBlack = clean(meta.intro_heading_black) || base.introHeadingBlack;
  base.introHeadingBlue = clean(meta.intro_heading_blue) || base.introHeadingBlue;
  base.introBody = clean(meta.intro_body) || base.introBody;

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

  return base;
}

export const fetchInnovationsLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (cleanSlug !== 'innovations') return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/v1/page/innovations`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as InnovationsApiResponse;
        const data = payload.data;
        if (data && data.layout === 'innovations') {
          return {
            slug: data.slug,
            title: data.title,
            seo: data.seo || {},
            page: mapApiToPage(data),
          };
        }
      }
    } catch {
      /* static defaults */
    }
  }

  return {
    slug: 'innovations',
    title: DEFAULT_PAGE.title,
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_PAGE },
  };
});
