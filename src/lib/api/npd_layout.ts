import { cache } from 'react';

type Media = { url?: string | null } | null | undefined;

type NpdApiResponse = {
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
      intro_image?: Media;
      cta_primary_text?: string;
      cta_primary_url?: string;
      cta_secondary_text?: string;
      cta_secondary_url?: string;
      ecosystem_title_black?: string;
      ecosystem_title_blue?: string;
      ecosystem_cards?: Array<{
        image?: Media;
        icon?: Media;
        title?: string;
        description?: string;
      }>;
    };
    seo?: Record<string, unknown>;
  };
};

export type NpdEcosystemCard = {
  id: string;
  image?: string;
  imageAlt: string;
  iconUrl?: string;
  iconVariant: number;
  title: string;
  description: string;
};

export type NpdPageData = {
  title: string;
  heroBackgroundImage?: string;
  heroTitle: string;
  introHeadingBlack: string;
  introHeadingBlue: string;
  introBody: string;
  introImage?: string;
  introImageAlt?: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  ecosystemTitleBlack: string;
  ecosystemTitleBlue: string;
  ecosystemCards: NpdEcosystemCard[];
};

const DEFAULT_PAGE: NpdPageData = {
  title: 'New Product Development',
  heroBackgroundImage: '/about_banner.jpg',
  heroTitle: 'IDEATE INNOVATE SCALE',
  introHeadingBlack: 'Turn Your Beverage Idea Into',
  introHeadingBlue: 'A Market Ready Product',
  introBody:
    'From concept to commercialization, Lamipak supports your aseptic liquid packaging development with data-driven insights, sustainable packaging solutions, and technical expertise.',
  introImage: '/about_banner.jpg',
  introImageAlt: 'Aseptic packaging innovation',
  primaryCta: { text: 'Start Your Product Journey', href: '/contact-us' },
  secondaryCta: { text: 'Book Innovation Consultation', href: '/contact-us' },
  ecosystemTitleBlack: 'The Innovation',
  ecosystemTitleBlue: 'Ecosystem',
  ecosystemCards: [
    {
      id: '1',
      image: '/about_banner.jpg',
      imageAlt: 'Market insight',
      iconVariant: 0,
      title: 'Market Insight',
      description: 'Identifying high-growth trends through consumer data.',
    },
    {
      id: '2',
      image: '/about_banner.jpg',
      imageAlt: 'Prototyping',
      iconVariant: 1,
      title: 'Prototyping',
      description: 'Structural design and shelf-impact visualization.',
    },
    {
      id: '3',
      image: '/about_banner.jpg',
      imageAlt: 'Material tech',
      iconVariant: 2,
      title: 'Material Tech',
      description: 'Barrier performance validation and material science.',
    },
    {
      id: '4',
      image: '/about_banner.jpg',
      imageAlt: 'Scale up',
      iconVariant: 3,
      title: 'Scale Up',
      description: 'Full industrialization and line integration support.',
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

function mapApiToPage(api: NonNullable<NpdApiResponse['data']>): NpdPageData {
  const meta = api.meta || {};
  const base = { ...DEFAULT_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) || base.title;
  base.heroTitle = clean(meta.hero_title) || base.heroTitle;

  base.introHeadingBlack = clean(meta.intro_heading_black) || base.introHeadingBlack;
  base.introHeadingBlue = clean(meta.intro_heading_blue) || base.introHeadingBlue;
  base.introBody = clean(meta.intro_body) || base.introBody;
  const introImg = mediaUrl(meta.intro_image);
  if (introImg) base.introImage = introImg;

  const p1 = clean(meta.cta_primary_text);
  const u1 = clean(meta.cta_primary_url);
  const p2 = clean(meta.cta_secondary_text);
  const u2 = clean(meta.cta_secondary_url);
  if (p1 && u1) base.primaryCta = { text: p1, href: u1 };
  else if (p1) base.primaryCta = { ...base.primaryCta, text: p1 };
  else if (u1) base.primaryCta = { ...base.primaryCta, href: u1 };
  if (p2 && u2) base.secondaryCta = { text: p2, href: u2 };
  else if (p2) base.secondaryCta = { ...base.secondaryCta, text: p2 };
  else if (u2) base.secondaryCta = { ...base.secondaryCta, href: u2 };

  base.ecosystemTitleBlack = clean(meta.ecosystem_title_black) || base.ecosystemTitleBlack;
  base.ecosystemTitleBlue = clean(meta.ecosystem_title_blue) || base.ecosystemTitleBlue;

  const eco = meta.ecosystem_cards;
  if (eco?.length) {
    const mapped = eco
      .map((c, idx) => {
        const title = clean(c.title);
        const description = clean(c.description);
        if (!title || !description) return null;
        return {
          id: `eco-${idx + 1}`,
          image: mediaUrl(c.image),
          imageAlt: title,
          iconUrl: mediaUrl(c.icon),
          iconVariant: idx % 4,
          title,
          description,
        };
      })
      .filter(Boolean) as NpdEcosystemCard[];
    if (mapped.length) base.ecosystemCards = mapped;
  }

  return base;
}

export const fetchNpdLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (cleanSlug !== 'npd') return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/v1/page/npd`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as NpdApiResponse;
        const data = payload.data;
        if (data && data.layout === 'npd') {
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
    slug: 'npd',
    title: DEFAULT_PAGE.title,
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_PAGE },
  };
});
