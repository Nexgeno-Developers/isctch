import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { WHAT_WE_DO_PAGE_SLUG } from '@/config/publicRoutes';
import type { HomeActionPillarIconId, HomeActionPillarItem, HomePeaceSummitCard } from '@/lib/api/homepage/types';
import type { WhatWeDoPageData } from './types';

const COMPANY_API_DOMAIN = process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
const WHAT_WE_DO_REVALIDATE_SECONDS = Number(
  process.env.WHAT_WE_DO_PAGE_REVALIDATE_SECONDS ?? process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const STATIC_WHAT_WE_DO_PAGE: WhatWeDoPageData = {
  hero: {
    breadcrumbHomeLabel: 'Home',
    breadcrumbCurrentLabel: 'What we do',
    kicker: 'Our Mission in Action',
    titleBlue: 'Turning Peace',
    titleOrange: 'into Practice',
  },
  actionPillars: {
    kicker: 'What we do',
    title: 'Our Action Pillars',
    pillars: [
      {
        icon: 'people',
        title: 'Interfaith Dialogues',
        description:
          'Building bridges between faiths to celebrate our shared human spirit and universal truths.',
      },
      {
        icon: 'meditation',
        title: 'Inner Peace Tools',
        description:
          'Mindfulness and meditation practices designed to cultivate resilience and personal tranquility.',
      },
      {
        icon: 'graduation',
        title: 'Youth Leadership',
        description:
          'Empowering the next generation with ethical leadership skills and a global perspective.',
      },
      {
        icon: 'megaphone',
        title: 'Raising Our Voice',
        description:
          'Advocating for the marginalized through global awareness campaigns and digital activism.',
      },
      {
        icon: 'book',
        title: 'Peace Education',
        description:
          'Integrating peace-building curriculum into schools and community learning centers.',
      },
      {
        icon: 'scales-policy',
        title: 'Policy Advocacy',
        description:
          'Collaborating with international bodies to influence policies that support global harmony.',
      },
    ],
  },
  peaceSummits: {
    kicker: 'Events',
    title: 'Global Peace Summits',
    summits: [
      {
        location: 'Geneva, Switzerland',
        title: 'The Diplomatic Dialogue',
        description:
          'Focusing on neutral mediation and international law frameworks for a peaceful 21st century.',
        image: {
          src: '/diplomatic_image1.jpg',
          alt: 'International conference hall and diplomacy setting',
        },
      },
      {
        location: 'Erding, Germany',
        title: 'The Community Core',
        description:
          'Harnessing the power of local communities and grassroots activism to spark national change.',
        image: {
          src: '/comminuty_core_images.jpg',
          alt: 'Diverse group of people gathering in a community space',
        },
      },
      {
        location: 'Dubai, UAE',
        title: 'Future Harmony',
        description:
          'Exploring the intersection of technology, sustainable cities, and ethical human progress.',
        image: {
          src: '/future_images.jpg',
          alt: 'Modern city skyline at sunset',
        },
      },
    ],
  },
};

type MetaRecord = Record<string, string | undefined>;
type PageApiPayload = { data?: { meta?: MetaRecord | MetaRecord[] } };

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeImageUrl(url: string): string {
  const u = url.trim();
  if (!u) return STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[0]?.image.src || '/future_images.jpg';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (!COMPANY_API_DOMAIN) return `/${u.replace(/^\/+/, '')}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

function normalizeMeta(data: PageApiPayload['data']): MetaRecord | undefined {
  const meta = data?.meta;
  if (!meta) return undefined;
  if (Array.isArray(meta)) {
    const out: MetaRecord = {};
    for (const row of meta) {
      if (!row || typeof row !== 'object') continue;
      for (const [k, v] of Object.entries(row)) {
        if (typeof v === 'string') out[k] = v;
      }
    }
    return out;
  }
  return meta as MetaRecord;
}

function pick(meta: MetaRecord | undefined, keys: string[]): string {
  if (!meta) return '';
  for (const key of keys) {
    const value = meta[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

const ACTION_PILLAR_ICON_IDS: HomeActionPillarIconId[] = [
  'people',
  'meditation',
  'graduation',
  'megaphone',
  'book',
  'scales-policy',
];

function normalizeActionPillarIcon(raw: string, fallbackIndex: number): HomeActionPillarIconId {
  const s = raw.trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
  if ((ACTION_PILLAR_ICON_IDS as string[]).includes(s)) return s as HomeActionPillarIconId;
  if (s.includes('people') || s.includes('group') || s.includes('interfaith')) return 'people';
  if (s.includes('meditat') || s.includes('mindful') || s.includes('inner-peace')) return 'meditation';
  if (s.includes('graduat') || s.includes('youth') || s.includes('cap')) return 'graduation';
  if (s.includes('megaphone') || s.includes('voice') || s.includes('raising')) return 'megaphone';
  if (s.includes('book') || (s.includes('education') && !s.includes('policy'))) return 'book';
  if (s.includes('scale') || s.includes('policy') || s.includes('advocacy')) return 'scales-policy';
  return STATIC_WHAT_WE_DO_PAGE.actionPillars.pillars[fallbackIndex]?.icon ?? 'people';
}

function actionPillarsListFromMeta(meta: MetaRecord | undefined): HomeActionPillarItem[] | null {
  if (!meta) return null;
  const out: HomeActionPillarItem[] = [];
  for (let i = 1; i <= 12; i++) {
    const title = pick(meta, [
      `action_pillar_${i}_title`,
      `pillar_${i}_title`,
      `home_action_pillar_${i}_title`,
      `what_we_do_pillar_${i}_title`,
    ]);
    if (!title) continue;
    const description = pick(meta, [
      `action_pillar_${i}_description`,
      `pillar_${i}_description`,
      `home_action_pillar_${i}_description`,
      `what_we_do_pillar_${i}_description`,
    ]);
    const iconRaw = pick(meta, [
      `action_pillar_${i}_icon`,
      `pillar_${i}_icon`,
      `home_action_pillar_${i}_icon`,
      `what_we_do_pillar_${i}_icon`,
    ]);
    out.push({
      title,
      description: description || '',
      icon: iconRaw
        ? normalizeActionPillarIcon(iconRaw, out.length)
        : STATIC_WHAT_WE_DO_PAGE.actionPillars.pillars[out.length]?.icon ?? 'people',
    });
  }
  return out.length ? out : null;
}

function actionPillarsFromMeta(meta: MetaRecord | undefined): WhatWeDoPageData['actionPillars'] | null {
  if (!meta) return null;
  const list = actionPillarsListFromMeta(meta);
  const title = pick(meta, [
    'action_pillars_title',
    'pillars_title',
    'home_action_pillars_title',
    'what_we_do_title',
  ]);
  const kicker = pick(meta, [
    'action_pillars_kicker',
    'pillars_kicker',
    'what_we_do_kicker',
    'home_action_pillars_kicker',
  ]);
  if (!list && !title && !kicker) return null;

  return {
    kicker: kicker || STATIC_WHAT_WE_DO_PAGE.actionPillars.kicker,
    title: title || STATIC_WHAT_WE_DO_PAGE.actionPillars.title,
    pillars: list ?? STATIC_WHAT_WE_DO_PAGE.actionPillars.pillars,
  };
}

function peaceSummitsListFromMeta(meta: MetaRecord | undefined): HomePeaceSummitCard[] | null {
  if (!meta) return null;
  const out: HomePeaceSummitCard[] = [];
  for (let i = 1; i <= 16; i++) {
    const title = pick(meta, [
      `peace_summit_${i}_title`,
      `summit_${i}_title`,
      `home_peace_summit_${i}_title`,
      `what_we_do_card_${i}_title`,
    ]);
    if (!title) continue;
    const location =
      pick(meta, [
        `peace_summit_${i}_location`,
        `summit_${i}_location`,
        `home_peace_summit_${i}_location`,
        `what_we_do_card_${i}_badge`,
      ]) || STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[out.length]?.location || '';
    const description =
      pick(meta, [
        `peace_summit_${i}_description`,
        `summit_${i}_description`,
        `home_peace_summit_${i}_description`,
        `what_we_do_card_${i}_description`,
      ]) || '';
    const imageSrc = pick(meta, [
      `peace_summit_${i}_image`,
      `summit_${i}_image`,
      `home_peace_summit_${i}_image`,
      `what_we_do_card_${i}_image`,
    ]);
    const imageAlt =
      pick(meta, [
        `peace_summit_${i}_image_alt`,
        `summit_${i}_image_alt`,
        `what_we_do_card_${i}_image_alt`,
      ]) || title;
    const fallback =
      STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[out.length]?.image ||
      STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[0].image;
    out.push({
      location,
      title,
      description,
      image: {
        src: imageSrc ? normalizeImageUrl(imageSrc) : fallback.src,
        alt: imageAlt,
      },
    });
  }
  return out.length ? out : null;
}

function peaceSummitsFromMeta(meta: MetaRecord | undefined): WhatWeDoPageData['peaceSummits'] | null {
  if (!meta) return null;
  const list = peaceSummitsListFromMeta(meta);
  const title = pick(meta, [
    'peace_summits_title',
    'global_peace_summits_title',
    'home_peace_summits_title',
    'what_we_do_cards_title',
  ]);
  const kicker = pick(meta, [
    'peace_summits_kicker',
    'events_kicker',
    'home_peace_summits_kicker',
    'what_we_do_cards_kicker',
  ]);
  if (!list && !title && !kicker) return null;

  return {
    kicker: kicker || STATIC_WHAT_WE_DO_PAGE.peaceSummits.kicker,
    title: title || STATIC_WHAT_WE_DO_PAGE.peaceSummits.title,
    summits: list ?? STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits,
  };
}

function heroFromMeta(meta: MetaRecord | undefined): WhatWeDoPageData['hero'] | null {
  if (!meta) return null;
  const blue = pick(meta, ['what_we_do_title_blue', 'what_we_do_heading_blue', 'title_blue']);
  const orange = pick(meta, ['what_we_do_title_orange', 'what_we_do_heading_orange', 'title_orange']);
  const kicker = pick(meta, ['what_we_do_kicker', 'mission_kicker']);
  if (!blue && !orange && !kicker) return null;

  return {
    breadcrumbHomeLabel:
      pick(meta, ['what_we_do_breadcrumb_home', 'breadcrumb_home']) ||
      STATIC_WHAT_WE_DO_PAGE.hero.breadcrumbHomeLabel,
    breadcrumbCurrentLabel:
      pick(meta, ['what_we_do_breadcrumb_current', 'breadcrumb_current']) ||
      STATIC_WHAT_WE_DO_PAGE.hero.breadcrumbCurrentLabel,
    kicker: kicker || STATIC_WHAT_WE_DO_PAGE.hero.kicker,
    titleBlue: blue || STATIC_WHAT_WE_DO_PAGE.hero.titleBlue,
    titleOrange: orange || STATIC_WHAT_WE_DO_PAGE.hero.titleOrange,
  };
}

async function fetchWhatWeDoPayload(slug: string): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${slug}`);
  if (!url) return null;
  return fetchJsonCached<PageApiPayload>(url, {
    tags: ['what-we-do-page', `page:${slug}`],
    init: { headers: { Accept: 'application/json' } },
  });
}

async function resolveWhatWeDoPageData(slug: string): Promise<WhatWeDoPageData> {
  const payload = await fetchWhatWeDoPayload(slug);
  const meta = normalizeMeta(payload?.data);

  const hero = heroFromMeta(meta) ?? STATIC_WHAT_WE_DO_PAGE.hero;
  const actionPillars = actionPillarsFromMeta(meta) ?? STATIC_WHAT_WE_DO_PAGE.actionPillars;
  const peaceSummits = peaceSummitsFromMeta(meta) ?? STATIC_WHAT_WE_DO_PAGE.peaceSummits;

  return {
    hero: { ...STATIC_WHAT_WE_DO_PAGE.hero, ...hero },
    actionPillars: { ...STATIC_WHAT_WE_DO_PAGE.actionPillars, ...actionPillars },
    peaceSummits: { ...STATIC_WHAT_WE_DO_PAGE.peaceSummits, ...peaceSummits },
  };
}

export async function getWhatWeDoPageData(slug = WHAT_WE_DO_PAGE_SLUG): Promise<WhatWeDoPageData> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const cached = unstable_cache(
    async () => resolveWhatWeDoPageData(cleanSlug),
    ['what-we-do-page-v1', cleanSlug, process.env.COMPANY_API_BASE_URL || 'static', COMPANY_API_DOMAIN || ''],
    {
      revalidate: WHAT_WE_DO_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, 'what-we-do-page', `page:${cleanSlug}`],
    },
  );
  return cached();
}

export type { WhatWeDoHeroData, WhatWeDoPageData } from './types';
