import { cache } from 'react';
import { normalizeText } from '@/lib/htmlText';

type Media = { url?: string | null } | null | undefined;

type EcosystemItemsBlock = {
  itration?: string[];
  title?: string[];
  icon?: Media[];
  image?: Media[];
  description?: string[];
};

type NpdMeta = {
  breadcrumb_image?: Media;
  short_summary_icon?: Media;
  short_summary_description?: string;
  hero_title?: string;
  hero_image?: Media;
  hero_description?: string;
  hero_product_journey_navigation_link?: string;
  hero_consultation_navigation_link?: string;
  ecosystem_items?: EcosystemItemsBlock;
  video_url?: string;
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

type NpdApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: NpdMeta;
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
  /** Supports `*highlight*` segments; rendered with `formatBoldText` in the hero. */
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
  /** YouTube or other video URL for the section video banner (optional). */
  videoUrl?: string;
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

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function clean(s?: string | null) {
  const t = (s ?? '').trim();
  return t || undefined;
}

function htmlToPlainText(html?: string | null): string {
  if (!html) return '';
  return normalizeText(html.replace(/<[^>]+>/g, ' '));
}

function normalizeEcosystemDescription(s?: string | null): string {
  const t = (s ?? '').replace(/\r\n/g, ' ').replace(/\n/g, ' ');
  return normalizeText(t);
}

function mapEcosystemItemsBlock(eco: EcosystemItemsBlock | undefined): NpdEcosystemCard[] {
  if (!eco?.title?.length) return [];
  const out: NpdEcosystemCard[] = [];
  for (let i = 0; i < eco.title.length; i++) {
    const title = clean(eco.title[i]);
    if (!title) continue;
    const description = normalizeEcosystemDescription(eco.description?.[i]);
    out.push({
      id: `eco-${i + 1}`,
      image: mediaUrl(eco.image?.[i]),
      imageAlt: title,
      iconUrl: mediaUrl(eco.icon?.[i]),
      iconVariant: i % 4,
      title,
      description,
    });
  }
  return out;
}

function mapInnovationDetail1ToPage(api: NonNullable<NpdApiResponse['data']>): NpdPageData {
  const meta = api.meta || {};
  const base = { ...DEFAULT_PAGE };

  base.title = clean(api.title) || base.title;

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  const heroTitleRaw = clean(meta.hero_title);
  if (heroTitleRaw) base.heroTitle = heroTitleRaw;

  const fromHeroDesc = htmlToPlainText(meta.hero_description);
  const fromShort = clean(meta.short_summary_description);
  base.introBody = fromHeroDesc || fromShort || base.introBody;

  const heroImg = mediaUrl(meta.hero_image);
  if (heroImg) {
    base.introImage = heroImg;
    base.introImageAlt = base.title;
  }

  const href1 = clean(meta.hero_product_journey_navigation_link);
  const href2 = clean(meta.hero_consultation_navigation_link);
  base.primaryCta = {
    text: base.primaryCta.text,
    href: href1 || base.primaryCta.href,
  };
  base.secondaryCta = {
    text: base.secondaryCta.text,
    href: href2 || base.secondaryCta.href,
  };

  const ecoMapped = mapEcosystemItemsBlock(meta.ecosystem_items);
  if (ecoMapped.length) base.ecosystemCards = ecoMapped;

  const v = clean(meta.video_url);
  if (v) base.videoUrl = v;

  return base;
}

function mapLegacyNpdToPage(api: NonNullable<NpdApiResponse['data']>): NpdPageData {
  const meta = api.meta || {};
  const base = { ...DEFAULT_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) || base.title;

  const legacyHeroTitle = clean(meta.hero_title);
  if (legacyHeroTitle) {
    base.heroTitle = legacyHeroTitle;
  } else {
    const ib = clean(meta.intro_heading_black);
    const iblue = clean(meta.intro_heading_blue);
    if (ib && iblue) base.heroTitle = `${ib} *${iblue}*`;
    else if (ib) base.heroTitle = ib;
    else if (iblue) base.heroTitle = `*${iblue}*`;
  }

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

  const v = clean(meta.video_url);
  if (v) base.videoUrl = v;

  return base;
}

function mapApiToPage(api: NonNullable<NpdApiResponse['data']>): NpdPageData {
  const layout = api.layout || '';
  if (layout === 'innovation_detail_1') {
    return mapInnovationDetail1ToPage(api);
  }
  return mapLegacyNpdToPage(api);
}

const ACCEPTED_LAYOUTS = new Set(['npd', 'innovation_detail_1']);

export const fetchNpdLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (cleanSlug !== 'npd') return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const apiSlugPath = buildPageApiPath(cleanSlug);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as NpdApiResponse;
        const data = payload.data;
        if (data && ACCEPTED_LAYOUTS.has(data.layout || '')) {
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
