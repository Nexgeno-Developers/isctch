import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { SUMMITS_PAGE_SLUG, summitDetailPath } from '@/config/publicRoutes';
import type {
  SummitDetailPageData,
  SummitImage,
  SummitRelatedCard,
  SummitSidebarCard,
} from './types';

const COMPANY_API_DOMAIN = process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
const SUMMITS_REVALIDATE_SECONDS = Number(
  process.env.SUMMITS_PAGE_REVALIDATE_SECONDS ?? process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const STATIC_SUMMIT_DETAILS: Record<string, SummitDetailPageData> = {
  'neutrality-global-ethics': {
    hero: {
      breadcrumbHomeLabel: 'Home',
      breadcrumbCurrentLabel: 'Global Summits & Events',
      kicker: 'Geneva, Switzerland',
      titleBlue: 'Convening the World',
      titleOrange: 'for Peace',
    },
    detail: {
      location: 'Geneva, Switzerland',
      title: 'Neutrality & Global Ethics',
      summary:
        'Hosted in the heart of international diplomacy, the Geneva Summit focused on integrating peace consciousness into global intent to unite and work towards establishing peace.',
      paragraphs: [
        'Dignitaries and guests explored perspectives, ethical leadership, and peace frameworks for global cooperation.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim magna et quam pretium, in luctus dolor commodo. In sit amet neque urna. Morbi ultricies id tellus sed placerat.',
        'Etiam viverra gravida elit, nec lobortis lorem faucibus vitae. Pellentesque placerat tellus a elit fermentum, at feugiat turpis vestibulum. Cras ut egestas arcu, sed bibendum orci.',
      ],
      image: {
        src: '/diplomatic_image1.jpg',
        alt: 'Geneva waterfront summit venue',
      },
      sidebarCards: [
        {
          location: 'Geneva, Switzerland',
          title: 'Lorem Ipsum',
          image: {
            src: '/future_images.jpg',
            alt: 'Historic summit venue',
          },
          href: summitDetailPath('neutrality-global-ethics'),
        },
        {
          location: 'Geneva, Switzerland',
          title: 'Lorem Ipsum',
          image: {
            src: '/comminuty_core_images.jpg',
            alt: 'Peace summit landmark',
          },
          href: summitDetailPath('neutrality-global-ethics'),
        },
      ],
    },
    related: {
      cards: [
        {
          location: 'Erding, Germany',
          title: 'The Bavarian Peace Accord',
          description:
            'Bringing together local governments and international NGOs to create community-based peace structures in Europe.',
          image: {
            src: '/comminuty_core_images.jpg',
            alt: 'Community peace summit venue',
          },
          href: summitDetailPath('the-bavarian-peace-accord'),
        },
        {
          location: 'Dubai, UAE',
          title: 'Innovation For Stability',
          description:
            'Exploring how emerging technologies and sustainable development can act as deterrents to systemic global unrest.',
          image: {
            src: '/future_images.jpg',
            alt: 'Dubai skyline and waterfront',
          },
          href: summitDetailPath('innovation-for-stability'),
        },
        {
          location: 'Dubai, UAE',
          title: 'Innovation For Stability',
          description:
            'Exploring how emerging technologies and sustainable development can act as deterrents to systemic global unrest.',
          image: {
            src: '/global_images.webp',
            alt: 'Global city and peace innovation',
          },
          href: summitDetailPath('innovation-for-stability'),
        },
      ],
    },
  },
};

STATIC_SUMMIT_DETAILS['the-bavarian-peace-accord'] = {
  hero: {
    ...STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].hero,
    kicker: 'Erding, Germany',
  },
  detail: {
    ...STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].detail,
    location: 'Erding, Germany',
    title: 'The Bavarian Peace Accord',
    summary:
      'Bringing together local governments and international NGOs to create community-based peace structures in Europe.',
    paragraphs: [
      'The Bavarian Peace Accord convened municipal leaders, educators, and regional NGOs to translate diplomacy into community practice.',
      'Workshops focused on local mediation, youth participation, and practical systems that help neighbors respond to conflict before it becomes crisis.',
    ],
    image: {
      src: '/comminuty_core_images.jpg',
      alt: 'Community peace summit venue',
    },
  },
  related: STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].related,
};

STATIC_SUMMIT_DETAILS['innovation-for-stability'] = {
  hero: {
    ...STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].hero,
    kicker: 'Dubai, UAE',
  },
  detail: {
    ...STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].detail,
    location: 'Dubai, UAE',
    title: 'Innovation For Stability',
    summary:
      'Exploring how emerging technologies and sustainable development can act as deterrents to systemic global unrest.',
    paragraphs: [
      'This summit centered the role of ethical technology, resilient cities, and public trust in building durable peace.',
      'Participants explored practical ways to align innovation with human dignity, civic inclusion, and shared ecological responsibility.',
    ],
    image: {
      src: '/future_images.jpg',
      alt: 'Dubai skyline and waterfront',
    },
  },
  related: STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].related,
};

STATIC_SUMMIT_DETAILS['grassroots-horizons'] = {
  hero: {
    ...STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].hero,
    kicker: 'Nairobi, Kenya',
  },
  detail: {
    ...STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].detail,
    location: 'Nairobi, Kenya',
    title: 'Grassroots Horizons',
    summary:
      'Connecting regional leaders and youth networks to scale peace initiatives from local communities to the continent.',
    paragraphs: [
      'Grassroots Horizons highlighted the peace work already happening in neighborhoods, schools, and local networks.',
      'The gathering focused on helping community organizers share tools, strengthen relationships, and build repeatable models of local transformation.',
    ],
    image: {
      src: '/solidarity_images.webp',
      alt: 'Peace leaders working together',
    },
  },
  related: STATIC_SUMMIT_DETAILS['neutrality-global-ethics'].related,
};

const DEFAULT_SUMMIT_DETAIL = STATIC_SUMMIT_DETAILS['neutrality-global-ethics'];

type MetaRecord = Record<string, string | undefined>;
type PageApiPayload = { data?: { meta?: MetaRecord | MetaRecord[] } };

function cleanSlug(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

function detailSlugFromPath(value: string): string {
  return cleanSlug(value).split('/').filter(Boolean).pop() || 'neutrality-global-ethics';
}

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeMeta(data: PageApiPayload['data']): MetaRecord | undefined {
  const meta = data?.meta;
  if (!meta) return undefined;
  if (Array.isArray(meta)) {
    const out: MetaRecord = {};
    for (const row of meta) {
      if (!row || typeof row !== 'object') continue;
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === 'string') out[key] = value;
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

function splitParagraphs(raw: string, fallback: string[]): string[] {
  if (!raw) return fallback;
  const paragraphs = raw
    .split(/\r?\n\s*\r?\n|\|/g)
    .map((item) => item.trim())
    .filter(Boolean);
  return paragraphs.length ? paragraphs : fallback;
}

function normalizeImageUrl(url: string, fallback: string): string {
  const u = url.trim();
  if (!u) return fallback;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (u.startsWith('public/')) return `/${u.replace(/^public\/+/, '')}`;
  if (!u.includes('/')) return `/${u}`;
  if (!COMPANY_API_DOMAIN) return `/${u.replace(/^\/+/, '')}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

function imageFromMeta(
  meta: MetaRecord | undefined,
  keys: string[],
  fallback: SummitImage,
  altFallback: string,
): SummitImage {
  const src = pick(meta, keys);
  const alt = pick(meta, keys.map((key) => `${key}_alt`));
  return {
    src: normalizeImageUrl(src, fallback.src),
    alt: alt || fallback.alt || altFallback,
  };
}

function sidebarCardsFromMeta(
  meta: MetaRecord | undefined,
  fallback: SummitSidebarCard[],
): SummitSidebarCard[] {
  if (!meta) return fallback;
  const cards: SummitSidebarCard[] = [];
  for (let i = 1; i <= 4; i++) {
    const title = pick(meta, [`summit_sidebar_${i}_title`, `sidebar_card_${i}_title`]);
    if (!title) continue;
    const location =
      pick(meta, [`summit_sidebar_${i}_location`, `sidebar_card_${i}_location`]) ||
      fallback[cards.length]?.location ||
      '';
    const href =
      pick(meta, [`summit_sidebar_${i}_href`, `sidebar_card_${i}_href`]) ||
      fallback[cards.length]?.href ||
      '#';
    const fallbackImage = fallback[cards.length]?.image || DEFAULT_SUMMIT_DETAIL.detail.image;
    cards.push({
      location,
      title,
      image: imageFromMeta(
        meta,
        [`summit_sidebar_${i}_image`, `sidebar_card_${i}_image`],
        fallbackImage,
        title,
      ),
      href,
    });
  }
  return cards.length ? cards : fallback;
}

function relatedCardsFromMeta(
  meta: MetaRecord | undefined,
  fallback: SummitRelatedCard[],
): SummitRelatedCard[] {
  if (!meta) return fallback;
  const cards: SummitRelatedCard[] = [];
  for (let i = 1; i <= 8; i++) {
    const title = pick(meta, [`related_summit_${i}_title`, `summit_related_${i}_title`]);
    if (!title) continue;
    const location =
      pick(meta, [`related_summit_${i}_location`, `summit_related_${i}_location`]) ||
      fallback[cards.length]?.location ||
      '';
    const description =
      pick(meta, [`related_summit_${i}_description`, `summit_related_${i}_description`]) ||
      fallback[cards.length]?.description ||
      '';
    const href =
      pick(meta, [`related_summit_${i}_href`, `summit_related_${i}_href`]) ||
      fallback[cards.length]?.href ||
      '#';
    const fallbackImage = fallback[cards.length]?.image || DEFAULT_SUMMIT_DETAIL.detail.image;
    cards.push({
      location,
      title,
      description,
      image: imageFromMeta(
        meta,
        [`related_summit_${i}_image`, `summit_related_${i}_image`],
        fallbackImage,
        title,
      ),
      href,
    });
  }
  return cards.length ? cards : fallback;
}

async function fetchSummitDetailPayload(slug: string): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${slug}`);
  if (!url) return null;
  return fetchJsonCached<PageApiPayload>(url, {
    tags: ['summit-detail-page', `page:${slug}`],
    init: { headers: { Accept: 'application/json' } },
  });
}

async function resolveSummitDetailPageData(slug: string): Promise<SummitDetailPageData> {
  const normalizedSlug = cleanSlug(slug);
  const detailSlug = detailSlugFromPath(normalizedSlug);
  const fallback = STATIC_SUMMIT_DETAILS[detailSlug] || DEFAULT_SUMMIT_DETAIL;
  const payload =
    (await fetchSummitDetailPayload(normalizedSlug)) ||
    (detailSlug !== normalizedSlug ? await fetchSummitDetailPayload(detailSlug) : null);
  const meta = normalizeMeta(payload?.data);

  if (!fallback) {
    throw new Error('Missing static summit detail fallback');
  }

  return {
    hero: {
      breadcrumbHomeLabel:
        pick(meta, ['summit_breadcrumb_home', 'breadcrumb_home']) || fallback.hero.breadcrumbHomeLabel,
      breadcrumbCurrentLabel:
        pick(meta, ['summit_breadcrumb_current', 'breadcrumb_current']) ||
        fallback.hero.breadcrumbCurrentLabel,
      kicker: pick(meta, ['summit_hero_kicker', 'summit_location', 'location']) || fallback.hero.kicker,
      titleBlue:
        pick(meta, ['summit_title_blue', 'summit_hero_title_blue', 'title_blue']) ||
        fallback.hero.titleBlue,
      titleOrange:
        pick(meta, ['summit_title_orange', 'summit_hero_title_orange', 'title_orange']) ||
        fallback.hero.titleOrange,
    },
    detail: {
      location: pick(meta, ['summit_location', 'location']) || fallback.detail.location,
      title: pick(meta, ['summit_detail_title', 'summit_card_title', 'title']) || fallback.detail.title,
      summary:
        pick(meta, ['summit_summary', 'summit_intro', 'summary', 'intro']) || fallback.detail.summary,
      paragraphs: splitParagraphs(
        pick(meta, ['summit_body', 'summit_content', 'body', 'content']),
        fallback.detail.paragraphs,
      ),
      image: imageFromMeta(
        meta,
        ['summit_main_image', 'summit_image', 'main_image', 'image'],
        fallback.detail.image,
        fallback.detail.title,
      ),
      sidebarCards: sidebarCardsFromMeta(meta, fallback.detail.sidebarCards),
    },
    related: {
      cards: relatedCardsFromMeta(meta, fallback.related.cards),
    },
  };
}

export function getSummitDetailSlugFromPath(slug: string): string {
  return detailSlugFromPath(slug);
}

export function isSummitDetailPath(fullSlug: string): boolean {
  const parts = cleanSlug(fullSlug).split('/').filter(Boolean);
  const summitIndex = parts.indexOf(SUMMITS_PAGE_SLUG);
  return summitIndex >= 0 && parts.length > summitIndex + 1;
}

export async function getSummitDetailPageData(slug: string): Promise<SummitDetailPageData> {
  const normalizedSlug = cleanSlug(slug);
  const cached = unstable_cache(
    async () => resolveSummitDetailPageData(normalizedSlug),
    [
      'summit-detail-page-v1',
      normalizedSlug,
      process.env.COMPANY_API_BASE_URL || 'static',
      COMPANY_API_DOMAIN || '',
    ],
    {
      revalidate: SUMMITS_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, 'summit-detail-page', `page:${normalizedSlug}`],
    },
  );
  return cached();
}

export type {
  SummitDetailData,
  SummitDetailHeroData,
  SummitDetailPageData,
  SummitImage,
  SummitRelatedCard,
  SummitSidebarCard,
} from './types';
