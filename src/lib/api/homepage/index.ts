import 'server-only';

import { unstable_cache } from 'next/cache';

import type {
  HomeAboutCoreValuesData,
  HomeActionPillarIconId,
  HomeActionPillarItem,
  HomeActionPillarsData,
  HomeCoreValueIconId,
  HomeCoreValueItem,
  HomeHeroData,
  HomeImpactStatsData,
  HomePageData,
} from './types';
import { aboutUsPath } from '@/config/publicRoutes';
import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';

const HOMEPAGE_PAGE_SLUG = (process.env.HOMEPAGE_PAGE_SLUG || 'home').replace(
  /^\/+|\/+$/g,
  '',
);

const COMPANY_API_DOMAIN =
  process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';

const STATIC_HOME_HERO: HomeHeroData = {
  overline: 'ONE WORLD . ONE FAMILY',
  headline: {
    accent: '#IamPeace',
    lineMiddle: '— A United World Walking Toward',
    accentWord: 'Harmony',
  },
  description:
    'We are a global collective dedicated to fostering inner peace as the foundation for world peace. Join millions in a movement of selfless service, friendship, and radical inclusion.',
  primaryCta: {
    label: 'Join the movement',
    href: '/#join-movement',
  },
  secondaryCta: {
    label: 'Learn more',
    href: aboutUsPath(),
  },
  image: {
    src: '/homepage-hero.png',
    alt: 'Diverse group of smiling people representing global community',
  },
  statCard: {
    label: 'Active community',
    value: '2.4M+',
  },
};

const STATIC_IMPACT_STATS: HomeImpactStatsData = {
  items: [
    { mode: 'count', end: 3, suffix: '+', label: 'Global summits' },
    { mode: 'count', end: 50, suffix: '+', label: 'Countries reached' },
    { mode: 'count', end: 7, suffix: '', pad: 2, label: 'Core values' },
    { mode: 'symbol', symbol: '∞', label: 'Peace ambassadors' },
  ],
};

const STATIC_ABOUT_CORE_VALUES: HomeAboutCoreValuesData = {
  aboutKicker: 'About us',
  headlineLine1: 'Humanity is our Religion,',
  headlineLine2: 'Kindness is our Prayer.',
  body:
    'iSCTH is a global movement rooted in the belief that lasting peace begins with how we treat one another every day. We bring people together across cultures and borders through friendship, service, and shared values—so communities everywhere can grow stronger in empathy, dignity, and trust.',
  visionLabel: 'Vision:',
  visionText: 'To establish peace on earth as One World – One Family.',
  coreValuesKicker: 'Core values',
  values: [
    { icon: 'hand-heart', label: 'True friendship' },
    { icon: 'leaf', label: 'Selfless service' },
    { icon: 'handshake', label: 'Respect' },
    { icon: 'heart', label: 'Forgiveness' },
    { icon: 'scales', label: 'Equality' },
  ],
};

const CORE_VALUE_ICON_IDS: HomeCoreValueIconId[] = [
  'hand-heart',
  'leaf',
  'handshake',
  'heart',
  'scales',
];

function normalizeCoreValueIcon(raw: string): HomeCoreValueIconId {
  const s = raw.trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
  if ((CORE_VALUE_ICON_IDS as string[]).includes(s)) return s as HomeCoreValueIconId;
  if (s.includes('friend') || s.includes('hand-heart')) return 'hand-heart';
  if (s.includes('leaf') || s.includes('service')) return 'leaf';
  if (s.includes('shake') || s.includes('respect')) return 'handshake';
  if (s.includes('scale') || s.includes('equal')) return 'scales';
  if (s.includes('forgive') || s === 'heart') return 'heart';
  return 'heart';
}

function coreValuesListFromMeta(meta: MetaRecord | undefined): HomeCoreValueItem[] | null {
  if (!meta) return null;
  const out: HomeCoreValueItem[] = [];
  for (let i = 1; i <= 12; i++) {
    const label = pick(meta, [
      `about_core_value_${i}_label`,
      `core_value_${i}_label`,
      `home_core_value_${i}_label`,
    ]);
    if (!label) continue;
    const iconRaw = pick(meta, [
      `about_core_value_${i}_icon`,
      `core_value_${i}_icon`,
      `home_core_value_${i}_icon`,
    ]);
    out.push({
      label,
      icon: iconRaw ? normalizeCoreValueIcon(iconRaw) : STATIC_ABOUT_CORE_VALUES.values[out.length]?.icon ?? 'heart',
    });
  }
  return out.length ? out : null;
}

function aboutCoreValuesFromMeta(meta: MetaRecord | undefined): HomeAboutCoreValuesData | null {
  if (!meta) return null;

  const line1 = pick(meta, ['about_headline_line1', 'home_about_headline_1']);
  const body = pick(meta, ['about_body', 'home_about_body', 'about_intro']);
  const visionText = pick(meta, ['about_vision_text', 'home_about_vision', 'vision_statement']);
  const list = coreValuesListFromMeta(meta);

  if (!line1 && !body && !visionText && !list) return null;

  return {
    aboutKicker:
      pick(meta, ['about_kicker', 'home_about_kicker']) || STATIC_ABOUT_CORE_VALUES.aboutKicker,
    headlineLine1: line1 || STATIC_ABOUT_CORE_VALUES.headlineLine1,
    headlineLine2:
      pick(meta, ['about_headline_line2', 'home_about_headline_2']) ||
      STATIC_ABOUT_CORE_VALUES.headlineLine2,
    body: body || STATIC_ABOUT_CORE_VALUES.body,
    visionLabel:
      pick(meta, ['about_vision_label', 'home_about_vision_label']) ||
      STATIC_ABOUT_CORE_VALUES.visionLabel,
    visionText: visionText || STATIC_ABOUT_CORE_VALUES.visionText,
    coreValuesKicker:
      pick(meta, ['core_values_kicker', 'about_core_values_kicker', 'home_core_values_kicker']) ||
      STATIC_ABOUT_CORE_VALUES.coreValuesKicker,
    values: list ?? STATIC_ABOUT_CORE_VALUES.values,
  };
}

const STATIC_ACTION_PILLARS: HomeActionPillarsData = {
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
};

const ACTION_PILLAR_ICON_IDS: HomeActionPillarIconId[] = [
  'people',
  'meditation',
  'graduation',
  'megaphone',
  'book',
  'scales-policy',
];

function normalizeActionPillarIcon(
  raw: string,
  fallbackIndex: number,
): HomeActionPillarIconId {
  const s = raw.trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
  if ((ACTION_PILLAR_ICON_IDS as string[]).includes(s)) return s as HomeActionPillarIconId;
  if (s.includes('people') || s.includes('group') || s.includes('interfaith')) return 'people';
  if (s.includes('meditat') || s.includes('mindful') || s.includes('inner-peace')) return 'meditation';
  if (s.includes('graduat') || s.includes('youth') || s.includes('cap')) return 'graduation';
  if (s.includes('megaphone') || s.includes('voice') || s.includes('raising')) return 'megaphone';
  if (s.includes('book') || s.includes('education') && !s.includes('policy')) return 'book';
  if (s.includes('scale') || s.includes('policy') || s.includes('advocacy')) return 'scales-policy';
  return STATIC_ACTION_PILLARS.pillars[fallbackIndex]?.icon ?? 'people';
}

function actionPillarsListFromMeta(meta: MetaRecord | undefined): HomeActionPillarItem[] | null {
  if (!meta) return null;
  const out: HomeActionPillarItem[] = [];
  for (let i = 1; i <= 12; i++) {
    const title = pick(meta, [
      `action_pillar_${i}_title`,
      `pillar_${i}_title`,
      `home_action_pillar_${i}_title`,
    ]);
    if (!title) continue;
    const description = pick(meta, [
      `action_pillar_${i}_description`,
      `pillar_${i}_description`,
      `home_action_pillar_${i}_description`,
    ]);
    const iconRaw = pick(meta, [
      `action_pillar_${i}_icon`,
      `pillar_${i}_icon`,
      `home_action_pillar_${i}_icon`,
    ]);
    out.push({
      title,
      description: description || '',
      icon: iconRaw ? normalizeActionPillarIcon(iconRaw, out.length) : STATIC_ACTION_PILLARS.pillars[out.length]?.icon ?? 'people',
    });
  }
  return out.length ? out : null;
}

function actionPillarsFromMeta(meta: MetaRecord | undefined): HomeActionPillarsData | null {
  if (!meta) return null;

  const list = actionPillarsListFromMeta(meta);
  const title = pick(meta, ['action_pillars_title', 'pillars_title', 'home_action_pillars_title']);
  const kicker = pick(meta, [
    'action_pillars_kicker',
    'pillars_kicker',
    'what_we_do_kicker',
    'home_action_pillars_kicker',
  ]);

  if (!list && !title && !kicker) return null;

  return {
    kicker: kicker || STATIC_ACTION_PILLARS.kicker,
    title: title || STATIC_ACTION_PILLARS.title,
    pillars: list ?? STATIC_ACTION_PILLARS.pillars,
  };
}

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeImageUrl(url: string): string {
  const u = url.trim();
  if (!u) return STATIC_HOME_HERO.image.src;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (!COMPANY_API_DOMAIN) return u.startsWith('/') ? u : `/${u}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

type MetaRecord = Record<string, string | undefined>;

function pick(meta: MetaRecord | undefined, keys: string[]): string {
  if (!meta) return '';
  for (const k of keys) {
    const v = meta[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

function parseIntSafe(raw: string, fallback: number): number {
  const n = Number.parseInt(raw.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : fallback;
}

function heroFromMeta(meta: MetaRecord | undefined): HomeHeroData | null {
  if (!meta || typeof meta !== 'object') return null;

  const accent = pick(meta, ['hero_heading_accent', 'hero_accent', 'headline_accent']);
  const description = pick(meta, ['hero_description', 'description']);
  if (!accent && !description) return null;

  return {
    overline: pick(meta, ['hero_overline', 'overline']) || STATIC_HOME_HERO.overline,
    headline: {
      accent: accent || STATIC_HOME_HERO.headline.accent,
      lineMiddle:
        pick(meta, ['hero_heading_middle', 'hero_line_middle', 'headline_middle']) ||
        STATIC_HOME_HERO.headline.lineMiddle,
      accentWord:
        pick(meta, ['hero_heading_accent_word', 'hero_accent_word', 'headline_word']) ||
        STATIC_HOME_HERO.headline.accentWord,
    },
    description: description || STATIC_HOME_HERO.description,
    primaryCta: {
      label:
        pick(meta, ['hero_primary_cta_label', 'primary_cta_label']) ||
        STATIC_HOME_HERO.primaryCta.label,
      href:
        pick(meta, ['hero_primary_cta_url', 'primary_cta_url']) ||
        STATIC_HOME_HERO.primaryCta.href,
    },
    secondaryCta: {
      label:
        pick(meta, ['hero_secondary_cta_label', 'secondary_cta_label']) ||
        STATIC_HOME_HERO.secondaryCta.label,
      href:
        pick(meta, ['hero_secondary_cta_url', 'secondary_cta_url']) ||
        STATIC_HOME_HERO.secondaryCta.href,
    },
    image: {
      src: (() => {
        const imageSrc = pick(meta, ['hero_image', 'hero_image_url', 'image']);
        return imageSrc ? normalizeImageUrl(imageSrc) : STATIC_HOME_HERO.image.src;
      })(),
      alt: pick(meta, ['hero_image_alt', 'image_alt']) || STATIC_HOME_HERO.image.alt,
    },
    statCard: {
      label: pick(meta, ['hero_stat_label', 'stat_label']) || STATIC_HOME_HERO.statCard.label,
      value: pick(meta, ['hero_stat_value', 'stat_value']) || STATIC_HOME_HERO.statCard.value,
    },
  };
}

function impactFromMeta(meta: MetaRecord | undefined): HomeImpactStatsData | null {
  if (!meta) return null;

  const s1 = pick(meta, ['impact_summits_end', 'impact_stat_1_end']);
  const s2 = pick(meta, ['impact_countries_end', 'impact_stat_2_end']);
  const s3 = pick(meta, ['impact_values_end', 'impact_stat_3_end']);
  const sym = pick(meta, ['impact_ambassadors_symbol', 'impact_stat_4_symbol']);

  if (!s1 && !s2 && !s3 && !sym) return null;

  const items: HomeImpactStatsData['items'] = [];

  if (s1 || pick(meta, ['impact_summits_label'])) {
    items.push({
      mode: 'count',
      end: s1 ? parseIntSafe(s1, 3) : 3,
      suffix: pick(meta, ['impact_summits_suffix']) || '+',
      label: pick(meta, ['impact_summits_label']) || STATIC_IMPACT_STATS.items[0].label,
    });
  }
  if (s2 || pick(meta, ['impact_countries_label'])) {
    items.push({
      mode: 'count',
      end: s2 ? parseIntSafe(s2, 50) : 50,
      suffix: pick(meta, ['impact_countries_suffix']) || '+',
      label: pick(meta, ['impact_countries_label']) || STATIC_IMPACT_STATS.items[1].label,
    });
  }
  if (s3 || pick(meta, ['impact_values_label'])) {
    const padRaw = pick(meta, ['impact_values_pad']);
    items.push({
      mode: 'count',
      end: s3 ? parseIntSafe(s3, 7) : 7,
      suffix: pick(meta, ['impact_values_suffix']) || '',
      pad: padRaw ? parseIntSafe(padRaw, 2) : 2,
      label: pick(meta, ['impact_values_label']) || STATIC_IMPACT_STATS.items[2].label,
    });
  }
  if (sym || pick(meta, ['impact_ambassadors_label'])) {
    items.push({
      mode: 'symbol',
      symbol: sym || '∞',
      label: pick(meta, ['impact_ambassadors_label']) || STATIC_IMPACT_STATS.items[3].label,
    });
  }

  if (items.length < 4) return null;
  return { items };
}

type PageApiPayload = {
  data?: {
    meta?: MetaRecord | MetaRecord[];
    slug?: string;
  };
};

function normalizeMeta(raw: PageApiPayload['data']): MetaRecord | undefined {
  const m = raw?.meta;
  if (!m) return undefined;
  if (Array.isArray(m)) {
    const out: MetaRecord = {};
    for (const row of m) {
      if (row && typeof row === 'object') {
        for (const [k, v] of Object.entries(row)) {
          if (typeof v === 'string') out[k] = v;
        }
      }
    }
    return out;
  }
  return m as MetaRecord;
}

async function fetchPagePayload(): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${HOMEPAGE_PAGE_SLUG}`);
  if (!url) return null;
  try {
    return await fetchJsonCached<PageApiPayload>(url, {
      tags: ['homepage', `page:${HOMEPAGE_PAGE_SLUG}`],
      init: { headers: { Accept: 'application/json' } },
    });
  } catch {
    return null;
  }
}

async function resolveHomePage(): Promise<HomePageData> {
  const payload = await fetchPagePayload();
  const meta = normalizeMeta(payload?.data);

  const hero = heroFromMeta(meta) ?? STATIC_HOME_HERO;
  const impactStats = impactFromMeta(meta) ?? STATIC_IMPACT_STATS;
  const aboutCoreValues = aboutCoreValuesFromMeta(meta) ?? STATIC_ABOUT_CORE_VALUES;
  const actionPillars = actionPillarsFromMeta(meta) ?? STATIC_ACTION_PILLARS;

  return { hero, impactStats, aboutCoreValues, actionPillars };
}

const PAGE_CACHE_SECONDS = Number(
  process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const getCachedHomePage = unstable_cache(
  resolveHomePage,
  ['homepage-page', HOMEPAGE_PAGE_SLUG, process.env.COMPANY_API_BASE_URL || 'static'],
  {
    revalidate: PAGE_CACHE_SECONDS,
    tags: [API_CACHE_TAG, 'homepage', 'homepage-hero', `page:${HOMEPAGE_PAGE_SLUG}`],
  },
);

export async function getHomePageData(): Promise<HomePageData> {
  return getCachedHomePage();
}

export async function getHomeHero(): Promise<HomeHeroData> {
  return (await getCachedHomePage()).hero;
}

export async function getHomeImpactStats(): Promise<HomeImpactStatsData> {
  return (await getCachedHomePage()).impactStats;
}

export async function getHomeAboutCoreValues(): Promise<HomeAboutCoreValuesData> {
  return (await getCachedHomePage()).aboutCoreValues;
}

export async function getHomeActionPillars(): Promise<HomeActionPillarsData> {
  return (await getCachedHomePage()).actionPillars;
}

export type {
  HomeAboutCoreValuesData,
  HomeActionPillarIconId,
  HomeActionPillarItem,
  HomeActionPillarsData,
  HomeCoreValueIconId,
  HomeCoreValueItem,
  HomeHeroData,
  HomeHeroCta,
  HomeImpactStatItem,
  HomeImpactStatsData,
  HomePageData,
} from './types';
