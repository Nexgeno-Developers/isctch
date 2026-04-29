import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { WHAT_WE_DO_PAGE_SLUG } from '@/config/publicRoutes';
import type { HomePeaceSummitCard, WhatWeDoInitiativeIcon, WhatWeDoPageData } from './types';

const COMPANY_API_DOMAIN = process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
const WHAT_WE_DO_REVALIDATE_SECONDS = Number(
  process.env.WHAT_WE_DO_PAGE_REVALIDATE_SECONDS ?? process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const ICON_MAP: Record<string, WhatWeDoInitiativeIcon> = {
  people: { src: '/dialog_icons.svg', alt: 'People icon' },
  meditation: { src: '/peace_tols_icon.svg', alt: 'Meditation icon' },
  graduation: { src: '/leadership_icons.svg', alt: 'Graduation icon' },
  megaphone: { src: '/voice_icons.svg', alt: 'Megaphone icon' },
  book: { src: '/education_icons.svg', alt: 'Book icon' },
  'scales-policy': { src: '/plocy_icons.svg', alt: 'Policy scales icon' },
};

function iconFromId(icon: string): WhatWeDoInitiativeIcon {
  return ICON_MAP[icon] ?? ICON_MAP.people;
}

function fallbackIconAt(index: number): WhatWeDoInitiativeIcon {
  return STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[index]?.icon ?? ICON_MAP.people;
}

const STATIC_WHAT_WE_DO_PAGE: WhatWeDoPageData = {
  hero: {
    breadcrumbHomeLabel: 'Home',
    breadcrumbCurrentLabel: 'What we do',
    kicker: 'Our Mission in Action',
    titleBlue: 'Turning Peace',
    titleOrange: 'into Practice',
  },
  peaceSummits: {
    kicker: 'Events',
    title: 'Global Peace Summits',
    summits: [
      {
        location: '450+ Communities United',
        title: 'Interfaith Solidarity',
        description:
          'We bridge the gap between religious divides by fostering direct communication and joint humanitarian projects. Our interfaith councils serve as the first line of defense against radicalization and communal conflict.',
        image: {
          src: '/diplomatic_image1.jpg',
          alt: 'International conference hall and diplomacy setting',
        },
        icon: iconFromId('people'),
        cta: {
          label: 'Connect with the Council',
          href: '/interfaith-dialogues',
        },
      },
      {
        location: '1.2M Lives Touched',
        title: 'Inner Peace & Wellbeing',
        description:
          'Global peace begins with individual mental health. We provid mindfulness training, trauma-informed care, and wellness workshops in conflict-affected zones to help survivors reclaim their inner stability.',
        image: {
          src: '/comminuty_core_images.jpg',
          alt: 'Diverse group of people gathering in a community space',
        },
        icon: iconFromId('megaphone'),
        cta: {
          label: 'Connect to Access Resources',
          href: '/community-activism',
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
        icon: iconFromId('book'),
        cta: {
          label: 'Explore Programs',
          href: '/peace-education',
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
        icon: iconFromId('graduation'),
        cta: {
          label: 'Join Youth Program',
          href: '/youth-leadership',
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
        icon: iconFromId('meditation'),
        cta: {
          label: 'Practice Mindfulness',
          href: '/inner-peace-tools',
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
        icon: iconFromId('scales-policy'),
        cta: {
          label: 'Support Advocacy',
          href: '/policy-advocacy',
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
    const iconRaw = pick(meta, [
      `peace_summit_${i}_icon`,
      `summit_${i}_icon`,
      `home_peace_summit_${i}_icon`,
      `what_we_do_card_${i}_icon`,
    ]);
    const ctaLabelRaw = pick(meta, [
      `peace_summit_${i}_cta_label`,
      `summit_${i}_cta_label`,
      `home_peace_summit_${i}_cta_label`,
      `what_we_do_card_${i}_cta_label`,
    ]);
    const ctaHrefRaw = pick(meta, [
      `peace_summit_${i}_cta_href`,
      `summit_${i}_cta_href`,
      `home_peace_summit_${i}_cta_href`,
      `what_we_do_card_${i}_cta_href`,
    ]);
    const fallbackImage =
      STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[out.length]?.image ||
      STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[0].image;
    out.push({
      location,
      title,
      description,
      image: {
        src: imageSrc ? normalizeImageUrl(imageSrc) : fallbackImage.src,
        alt: imageAlt,
      },
      icon: iconRaw ? iconFromId(iconRaw) : fallbackIconAt(out.length),
      cta: {
        label: ctaLabelRaw || STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[out.length]?.cta.label || 'Learn More',
        href: ctaHrefRaw || STATIC_WHAT_WE_DO_PAGE.peaceSummits.summits[out.length]?.cta.href || '#',
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
  const peaceSummits = peaceSummitsFromMeta(meta) ?? STATIC_WHAT_WE_DO_PAGE.peaceSummits;

  return {
    hero: { ...STATIC_WHAT_WE_DO_PAGE.hero, ...hero },
    peaceSummits: { ...STATIC_WHAT_WE_DO_PAGE.peaceSummits, ...peaceSummits },
  };
}

export async function getWhatWeDoPageData(slug = WHAT_WE_DO_PAGE_SLUG): Promise<WhatWeDoPageData> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const cached = unstable_cache(
    async () => resolveWhatWeDoPageData(cleanSlug),
    ['what-we-do-page-v3', cleanSlug, process.env.COMPANY_API_BASE_URL || 'static', COMPANY_API_DOMAIN || ''],
    {
      revalidate: WHAT_WE_DO_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, 'what-we-do-page', `page:${cleanSlug}`],
    },
  );
  return cached();
}

export type { WhatWeDoHeroData, WhatWeDoPageData } from './types';
