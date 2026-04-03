import { cache } from 'react';

type Media = { url?: string | null } | null | undefined;

type PilotPlantApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      hero_title?: string;
      intro_label?: string;
      intro_heading_black?: string;
      intro_heading_blue?: string;
      intro_body?: string;
      intro_image?: Media;
      intro_overlay_title?: string;
      intro_overlay_subtitle?: string;
      cta_primary_text?: string;
      cta_primary_url?: string;
      cta_secondary_text?: string;
      cta_secondary_url?: string;
      facility_title_black?: string;
      facility_title_blue?: string;
      facility_description?: string;
      feature_cards?: Array<{
        image?: Media;
        title?: string;
        description?: string;
        link_text?: string;
        link_url?: string;
      }>;
    };
    seo?: Record<string, unknown>;
  };
};

export type PilotPlantFeatureCard = {
  id: string;
  image?: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
};

export type PilotPlantScopeIconId = 'drop' | 'leaf' | 'glass' | 'mug';

export type PilotPlantScopeGridItem = {
  id: string;
  icon: PilotPlantScopeIconId;
  categoryLabel: string;
  title: string;
};

export type PilotPlantAgileHighlight = {
  title: string;
  description: string;
};

export type PilotPlantEcosystemStep = {
  id: string;
  /** Hero image for card top (dairy / process visual) */
  image?: string;
  imageAlt: string;
  step: string;
  phase: string;
  title: string;
  description: string;
};

export type PilotPlantStat = {
  value: string;
  label: string;
};

export type PilotPlantPageData = {
  title: string;
  heroBackgroundImage?: string;
  heroTitle: string;
  introLabel: string;
  introHeadingBlack: string;
  introHeadingBlue: string;
  introBody: string;
  introImage?: string;
  introImageAlt?: string;
  introOverlayTitle: string;
  introOverlaySubtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  facilityTitleBlack: string;
  facilityTitleBlue: string;
  facilityDescription: string;
  featureCards: PilotPlantFeatureCard[];
  /** Product scope + agile validation split section */
  scopeLabel: string;
  scopeTitleBlue: string;
  scopeTitleBlack: string;
  scopeGrid: PilotPlantScopeGridItem[];
  agileEyebrow: string;
  agileTitle: string;
  agileBody: string;
  agileHighlights: PilotPlantAgileHighlight[];
  ecosystemTitleBlack: string;
  ecosystemTitleBlue: string;
  ecosystemSteps: PilotPlantEcosystemStep[];
  stats: PilotPlantStat[];
};

const DEFAULT_PAGE: PilotPlantPageData = {
  title: 'Knowledge Centre Pilot Plant',
  heroBackgroundImage: '/about_banner.jpg',
  heroTitle: 'KNOWLEDGE CENTRE PILOT PLANT',
  introLabel: 'KNOWLEDGE CENTRE',
  introHeadingBlack: 'From Concept',
  introHeadingBlue: 'To Shelf.',
  introBody:
    'Bridging the gap between liquid food imagination and industrial reality through end-to-end technical support.',
  introImage: '/about_banner.jpg',
  introImageAlt: 'Laboratory validation',
  introOverlayTitle: '100% ACCURACY',
  introOverlaySubtitle: 'Recipe Validation Excellence',
  primaryCta: { text: 'Explore Capabilities', href: '/contact-us' },
  secondaryCta: { text: 'Technical Specs', href: '/contact-us' },
  facilityTitleBlack: 'The',
  facilityTitleBlue: 'Pilot Plant',
  facilityDescription:
    'A state-of-the-art facility mimicking full-scale environments on an agile scale, the ultimate proving ground for high-speed production.',
  featureCards: [
    {
      id: '1',
      image: '/about_banner.jpg',
      imageAlt: 'Recipe innovation',
      title: 'Recipe Innovation',
      description: 'Balanced liquid formulas with sustainable barrier properties.',
      linkText: 'VIEW SPECS',
      linkHref: '/contact-us',
    },
    {
      id: '2',
      image: '/about_banner.jpg',
      imageAlt: 'Efficiency tuning',
      title: 'Efficiency Tuning',
      description: 'Optimizing machine speeds and material waste reduction.',
      linkText: 'OPTIMIZATION DATA',
      linkHref: '/contact-us',
    },
    {
      id: '3',
      image: '/about_banner.jpg',
      imageAlt: 'Shelf-life studies',
      title: 'Shelf-life Studies',
      description: 'Accelerated stability testing and nutritional preservation.',
      linkText: 'LAB RESULTS',
      linkHref: '/contact-us',
    },
  ],
  scopeLabel: 'PRODUCT SCOPE',
  scopeTitleBlue: 'Application',
  scopeTitleBlack: 'Versatility',
  scopeGrid: [
    { id: 's1', icon: 'drop', categoryLabel: 'DAIRY', title: 'UHT & CREAM' },
    { id: 's2', icon: 'leaf', categoryLabel: 'PLANT BASED', title: 'OAT & SOY' },
    { id: 's3', icon: 'glass', categoryLabel: 'JUICE', title: 'NECTARS & DRINKS' },
    { id: 's4', icon: 'mug', categoryLabel: 'RTD', title: 'TEA & COFFEE' },
  ],
  agileEyebrow: 'PROTOTYPING',
  agileTitle: 'Agile Validation',
  agileBody:
    'Small batch testing (50–200L) before industrial commitment — reducing R&D costs and market risk.',
  agileHighlights: [
    {
      title: 'Technical Stress Tests',
      description: 'Validation of pH levels and viscosity.',
    },
    {
      title: 'Seal Integrity',
      description: 'Mass production speed simulations.',
    },
  ],
  ecosystemTitleBlack: 'The Innovation',
  ecosystemTitleBlue: 'Ecosystem',
  ecosystemSteps: [
    {
      id: 'e1',
      image: '/about_banner.jpg',
      imageAlt: 'Dairy products — ideation',
      step: '01',
      phase: 'IDEATION',
      title: 'Recipe Concept',
      description: 'Market trends and formula development.',
    },
    {
      id: 'e2',
      image: '/about_banner.jpg',
      imageAlt: 'Dairy products — pilot fill',
      step: '02',
      phase: 'PILOT FILL',
      title: 'Technical Trial',
      description: 'Aseptic filling and initial quality sampling.',
    },
    {
      id: 'e3',
      image: '/about_banner.jpg',
      imageAlt: 'Dairy products — validation',
      step: '03',
      phase: 'VALIDATION',
      title: 'Audit Stage',
      description: 'Stability testing and performance audits.',
    },
    {
      id: 'e4',
      image: '/about_banner.jpg',
      imageAlt: 'Dairy products — industrial',
      step: '04',
      phase: 'INDUSTRIAL',
      title: 'Mass Rollout',
      description: 'Full production scaling and optimization.',
    },
  ],
  stats: [
    { value: '35%', label: 'R&D TIME REDUCTION' },
    { value: '12k+', label: 'VALIDATED RECIPES' },
    { value: '0.01%', label: 'ERROR RATE GOAL' },
    { value: '24/7', label: 'EXPERT SUPPORT' },
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

function mapApiToPage(api: NonNullable<PilotPlantApiResponse['data']>): PilotPlantPageData {
  const meta = api.meta || {};
  const base = { ...DEFAULT_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) || base.title;
  base.heroTitle = clean(meta.hero_title) || base.heroTitle;

  base.introLabel = clean(meta.intro_label) || base.introLabel;
  base.introHeadingBlack = clean(meta.intro_heading_black) || base.introHeadingBlack;
  base.introHeadingBlue = clean(meta.intro_heading_blue) || base.introHeadingBlue;
  base.introBody = clean(meta.intro_body) || base.introBody;
  const introImg = mediaUrl(meta.intro_image);
  if (introImg) base.introImage = introImg;

  base.introOverlayTitle = clean(meta.intro_overlay_title) || base.introOverlayTitle;
  base.introOverlaySubtitle = clean(meta.intro_overlay_subtitle) || base.introOverlaySubtitle;

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

  base.facilityTitleBlack = clean(meta.facility_title_black) || base.facilityTitleBlack;
  base.facilityTitleBlue = clean(meta.facility_title_blue) || base.facilityTitleBlue;
  base.facilityDescription = clean(meta.facility_description) || base.facilityDescription;

  const cards = meta.feature_cards;
  if (cards?.length) {
    const mapped = cards
      .map((c, idx) => {
        const title = clean(c.title);
        const description = clean(c.description);
        const linkText = clean(c.link_text);
        const linkUrl = clean(c.link_url);
        if (!title || !description) return null;
        return {
          id: `card-${idx + 1}`,
          image: mediaUrl(c.image),
          imageAlt: title,
          title,
          description,
          linkText: linkText || 'LEARN MORE',
          linkHref: linkUrl || '/contact-us',
        };
      })
      .filter(Boolean) as PilotPlantFeatureCard[];
    if (mapped.length) base.featureCards = mapped;
  }

  return base;
}

export const fetchPilotPlantLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (cleanSlug !== 'pilot-plant') return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/v1/page/pilot-plant`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as PilotPlantApiResponse;
        const data = payload.data;
        if (data && data.layout === 'pilot_plant') {
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
    slug: 'pilot-plant',
    title: DEFAULT_PAGE.title,
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_PAGE },
  };
});
