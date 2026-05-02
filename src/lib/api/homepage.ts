import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { aboutUsPath, getInvolvedPath } from '@/config/publicRoutes';

// --- types (homepage UI + `getHomePageData` shape) ---------------------------

export type HomeHeroCta = {
  label: string;
  href: string;
};

export type HomeHeroData = {
  overline: string;
  headline: {
    accent: string;
    lineMiddle: string;
    accentWord: string;
  };
  description: string;
  primaryCta: HomeHeroCta;
  secondaryCta: HomeHeroCta;
  image: { src: string; alt: string };
  statCard: {
    label: string;
    value: string;
  };
};

/** One stat in the cyan impact bar — either animated count or a fixed symbol (∞). */
export type HomeImpactStatItem =
  | {
      mode: 'count';
      end: number;
      prefix?: string;
      suffix?: string;
      /** Minimum digit width, e.g. 2 → `07` */
      pad?: number;
      label: string;
    }
  | {
      mode: 'symbol';
      symbol: string;
      label: string;
    };

export type HomeImpactStatsData = {
  items: HomeImpactStatItem[];
};

/** Icon set for core value cards (mapped to inline SVGs in the UI). */
export type HomeCoreValueIconId =
  | 'hand-heart'
  | 'leaf'
  | 'handshake'
  | 'heart'
  | 'scales';

export type HomeCoreValueItem = {
  icon: HomeCoreValueIconId;
  label: string;
};

/** About + core values two-column block (homepage). */
export type HomeAboutCoreValuesData = {
  aboutKicker: string;
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  visionLabel: string;
  visionText: string;
  coreValuesKicker: string;
  values: HomeCoreValueItem[];
};

/** Icons for action pillar cards (inline SVGs). */
export type HomeActionPillarIconId =
  | 'people'
  | 'meditation'
  | 'graduation'
  | 'megaphone'
  | 'book'
  | 'scales-policy';

export type HomeActionPillarItem = {
  icon: HomeActionPillarIconId;
  title: string;
  description: string;
};

export type HomeActionPillarsData = {
  kicker: string;
  title: string;
  pillars: HomeActionPillarItem[];
};

export type HomePeaceSummitCard = {
  location: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export type HomePeaceSummitsData = {
  kicker: string;
  title: string;
  summits: HomePeaceSummitCard[];
};

export type HomeHappyClientTestimonial = {
  quote: string;
  /** Shown next to stars, e.g. 4.8 → "4.8/5". */
  rating: number;
  authorName: string;
  /** Shown in the avatar circle when `avatar` is omitted. */
  authorInitial: string;
  avatar?: { src: string; alt: string };
};

export type HomeHappyClientsData = {
  title: string;
  testimonials: HomeHappyClientTestimonial[];
};

/** #IamPEACE strip + Support the Movement donation panel (homepage). */
export type HomeSupportMovementData = {
  header: {
    titleCyan: string;
    titleOrange: string;
    subline: string;
  };
  panel: {
    headline: string;
    body: string;
    donorsLine: string;
    avatars: { src: string; alt: string }[];
  };
};

export type HomeEngagementCard = {
  title: string;
  description: string;
};

/** Engagement slider — Join Our Global Family (homepage). */
export type HomeEngagementData = {
  kicker: string;
  title: string;
  cards: HomeEngagementCard[];
  cta: { label: string; href: string };
};

export type HomePageData = {
  hero: HomeHeroData;
  impactStats: HomeImpactStatsData;
  aboutCoreValues: HomeAboutCoreValuesData;
  actionPillars: HomeActionPillarsData;
  peaceSummits: HomePeaceSummitsData;
  happyClients: HomeHappyClientsData;
  supportMovement: HomeSupportMovementData;
  engagement: HomeEngagementData;
};

// --- env / cache ------------------------------------------------------------

const DEV_FALLBACK_API_BASE = 'https://istch.webtesting.pw/api';
const DEV_FALLBACK_API_DOMAIN = 'https://istch.webtesting.pw';

const HOMEPAGE_PAGE_SLUG = (process.env.HOMEPAGE_PAGE_SLUG || 'home').replace(
  /^\/+|\/+$/g,
  '',
);

const HOMEPAGE_PAGE_ID = process.env.HOMEPAGE_PAGE_ID?.trim();

const HOME_HERO_FORCE_STATIC_IMAGE = ['1', 'true', 'yes'].includes(
  (process.env.HOME_HERO_FORCE_STATIC_IMAGE || '').toLowerCase().trim(),
);

const PAGE_CACHE_SECONDS = Number(
  process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

type PageApiPayload = {
  data?: { meta?: unknown; slug?: string };
};

type LayoutV1ParseContext = {
  normalizeImageUrl: (url: string) => string;
  staticHeroFallback: HomeHeroData;
  staticAboutFallback: HomeAboutCoreValuesData;
  staticImpactFallback: HomeImpactStatsData;
  staticActionPillars: HomeActionPillarsData;
  staticHappyClientsFallback: HomeHappyClientsData;
  staticEngagementFallback: HomeEngagementData;
};

function resolvedApiBaseUrl(): string | null {
  const fromEnv = process.env.COMPANY_API_BASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, '');
  if (process.env.NODE_ENV === 'development') return DEV_FALLBACK_API_BASE.replace(/\/+$/, '');
  return null;
}

function resolvedApiDomain(): string {
  const fromEnv = process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === 'development') return DEV_FALLBACK_API_DOMAIN;
  return '';
}

function buildCompanyApiUrl(endpoint: string): string | null {
  const base = resolvedApiBaseUrl();
  if (!base) return null;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeImageUrl(url: string): string {
  const domain = resolvedApiDomain();
  const u = url.trim();
  if (!u) return '/hero_images.png';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (!domain) return u.startsWith('/') ? u : `/${u}`;
  return `${domain}/${u.replace(/^\/+/, '')}`;
}

function homePageApiPath(): string {
  if (HOMEPAGE_PAGE_ID && /^\d+$/.test(HOMEPAGE_PAGE_ID)) {
    return `/v1/page/${HOMEPAGE_PAGE_ID}`;
  }
  return `/v1/page/${HOMEPAGE_PAGE_SLUG}`;
}

function homePageCacheKeySegment(): string {
  return HOMEPAGE_PAGE_ID && /^\d+$/.test(HOMEPAGE_PAGE_ID)
    ? `id:${HOMEPAGE_PAGE_ID}`
    : `slug:${HOMEPAGE_PAGE_SLUG}`;
}

// --- layout v1: CMS meta → HomePageData -------------------------------------

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function isLayoutHomeV1Meta(meta: unknown): meta is Record<string, unknown> {
  return isRecord(meta) && typeof meta.banner_title === 'string' && meta.banner_title.length > 0;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}

function splitHeroHeadline(subtitle: string): {
  accent: string;
  lineMiddle: string;
  accentWord: string;
} {
  const s = subtitle.trim();
  const parts = s
    .split(/\u2014|\u2013|—|–/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const accent = parts[0] ?? '';
    const tail = parts.slice(1).join(' ').trim();
    const words = tail.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return {
        accent,
        lineMiddle: words.slice(0, -1).join(' '),
        accentWord: words[words.length - 1] ?? '',
      };
    }
    return { accent, lineMiddle: tail, accentWord: '' };
  }
  return { accent: s, lineMiddle: '', accentWord: '' };
}

function splitIamPeaceTitle(raw: string): { titleCyan: string; titleOrange: string } {
  const t = raw.trim();
  const idx = t.toUpperCase().lastIndexOf('PEACE');
  if (idx >= 0) {
    return {
      titleCyan: t.slice(0, idx).trim() || '#Iam',
      titleOrange: t.slice(idx).trim() || 'PEACE',
    };
  }
  return { titleCyan: '#Iam', titleOrange: t || 'PEACE' };
}

function scoreAsStatDisplay(s: string): number {
  const t = s.trim();
  if (/∞/.test(t)) return 4;
  if (/^0\d$/.test(t)) return 3;
  if (/^\d+\+?$/.test(t)) return 3;
  if (t.length <= 4 && !/[a-z]{3,}/i.test(t)) return 2;
  return 0;
}

function pickLabelAndDisplay(a: string, b: string): { label: string; display: string } {
  const sa = scoreAsStatDisplay(a);
  const sb = scoreAsStatDisplay(b);
  if (sa > sb) return { label: b, display: a };
  if (sb > sa) return { label: a, display: b };
  return a.length >= b.length ? { label: a, display: b } : { label: b, display: a };
}

function displayToStatItem(display: string, label: string): HomeImpactStatItem {
  const d = display.trim();
  if (/∞/.test(d)) {
    return { mode: 'symbol', symbol: '∞', label };
  }
  const plus = /^(\d+)\+$/.exec(d);
  if (plus) {
    return { mode: 'count', end: Number.parseInt(plus[1]!, 10), suffix: '+', label };
  }
  if (/^0\d$/.test(d)) {
    return { mode: 'count', end: Number.parseInt(d, 10), suffix: '', pad: 2, label };
  }
  const plain = /^(\d+)$/.exec(d);
  if (plain) {
    return { mode: 'count', end: Number.parseInt(plain[1]!, 10), suffix: '', label };
  }
  const loose = d.match(/(\d+)/);
  if (loose) {
    return {
      mode: 'count',
      end: Number.parseInt(loose[1]!, 10),
      suffix: d.includes('+') ? '+' : '',
      label,
    };
  }
  return { mode: 'symbol', symbol: d || '∞', label };
}

function highlightsFromLayout(highlights: unknown): HomeImpactStatsData | null {
  if (!isRecord(highlights)) return null;
  const titles = highlights.title;
  const values = highlights.value;
  if (!Array.isArray(titles) || !Array.isArray(values) || titles.length === 0) return null;
  const n = Math.min(titles.length, values.length);
  const items: HomeImpactStatItem[] = [];
  for (let i = 0; i < n; i++) {
    const a = asString(titles[i]);
    const b = asString(values[i]);
    if (!a && !b) continue;
    const { label, display } = pickLabelAndDisplay(a, b);
    if (!label) continue;
    items.push(displayToStatItem(display, label));
  }
  return items.length ? { items } : null;
}

function iconUrlFromCell(cell: unknown, normalizeUrl: (u: string) => string): string | undefined {
  if (isRecord(cell) && typeof cell.url === 'string' && cell.url.trim()) {
    return normalizeUrl(cell.url.trim());
  }
  return undefined;
}

function normalizeCoreValueIconFromLabel(label: string): HomeCoreValueIconId {
  const s = label.toLowerCase();
  if (s.includes('friend')) return 'hand-heart';
  if (s.includes('service') || s.includes('selfless')) return 'leaf';
  if (s.includes('respect')) return 'handshake';
  if (s.includes('forgive')) return 'heart';
  if (s.includes('equal')) return 'scales';
  return 'heart';
}

function normalizeActionPillarIconFromTitle(
  title: string,
  index: number,
  fallback: HomeActionPillarIconId[],
): HomeActionPillarIconId {
  const s = title.toLowerCase();
  if (s.includes('interfaith') || s.includes('dialogue')) return 'people';
  if (s.includes('inner') || s.includes('meditat') || s.includes('mindful') || s.includes('peace tool'))
    return 'meditation';
  if (s.includes('youth') || s.includes('leadership')) return 'graduation';
  if (s.includes('voice') || s.includes('raising')) return 'megaphone';
  if (s.includes('education') || s.includes('curriculum')) return 'book';
  if (s.includes('policy') || s.includes('advocacy')) return 'scales-policy';
  return fallback[index] ?? 'people';
}

const DEFAULT_ACTION_ICONS: HomeActionPillarIconId[] = [
  'people',
  'meditation',
  'graduation',
  'megaphone',
  'book',
  'scales-policy',
];

function coreValuesFromLayout(block: unknown, normalizeUrl: (u: string) => string): HomeCoreValueItem[] | null {
  if (!isRecord(block)) return null;
  const titles = block.title;
  const icons = block.icon;
  if (!Array.isArray(titles)) return null;
  const out: HomeCoreValueItem[] = [];
  for (let i = 0; i < titles.length; i++) {
    const label = asString(titles[i]);
    if (!label || label === 'data') continue;
    const iconCell = Array.isArray(icons) ? icons[i] : undefined;
    const iconSrc = iconUrlFromCell(iconCell, normalizeUrl);
    out.push({
      icon: normalizeCoreValueIconFromLabel(label),
      label,
      ...(iconSrc ? { iconSrc } : {}),
    });
  }
  return out.length ? out : null;
}

function actionPillarsListFromLayout(
  block: unknown,
  normalizeUrl: (u: string) => string,
): HomeActionPillarItem[] | null {
  if (!isRecord(block)) return null;
  const titles = block.title;
  const descriptions = block.description;
  const icons = block.icon;
  if (!Array.isArray(titles)) return null;
  const pillars: HomeActionPillarItem[] = [];
  for (let i = 0; i < titles.length; i++) {
    const title = asString(titles[i]);
    if (!title || title === 'data') continue;
    const desc = Array.isArray(descriptions) ? asString(descriptions[i]) : '';
    const iconCell = Array.isArray(icons) ? icons[i] : undefined;
    const iconSrc = iconUrlFromCell(iconCell, normalizeUrl);
    pillars.push({
      icon: normalizeActionPillarIconFromTitle(title, pillars.length, DEFAULT_ACTION_ICONS),
      title,
      description: desc,
      ...(iconSrc ? { iconSrc } : {}),
    });
  }
  return pillars.length ? pillars : null;
}

function actionPillarsFromLayoutFixed(
  block: unknown,
  meta: Record<string, unknown>,
  normalizeUrl: (u: string) => string,
  fallback: HomeActionPillarsData,
): HomeActionPillarsData {
  const pillars = actionPillarsListFromLayout(block, normalizeUrl) ?? fallback.pillars;
  return {
    kicker: asString(meta.our_action_subtitle) || fallback.kicker,
    title: asString(meta.our_action_title) || fallback.title,
    pillars,
  };
}

function testimonialsFromLayout(
  block: unknown,
  normalizeUrl: (u: string) => string,
): HomeHappyClientTestimonial[] | null {
  if (!isRecord(block)) return null;
  const names = block.name;
  const reviews = block.review;
  const ratings = block.rating;
  const images = block.image;
  if (!Array.isArray(names) || !Array.isArray(reviews)) return null;
  const out: HomeHappyClientTestimonial[] = [];
  const n = Math.min(names.length, reviews.length);
  for (let i = 0; i < n; i++) {
    const authorName = asString(names[i]) || 'Client';
    const quote = asString(reviews[i]);
    if (!quote) continue;
    const ratingRaw = Array.isArray(ratings) ? asString(ratings[i]) : '';
    const rating = ratingRaw ? Number.parseFloat(ratingRaw.replace(/[^\d.]/g, '')) : 4.8;
    const authorInitial = (authorName.trim().charAt(0) || '?').toUpperCase();
    const imgCell = Array.isArray(images) ? images[i] : undefined;
    const avatarUrl = iconUrlFromCell(imgCell, normalizeUrl);
    const item: HomeHappyClientTestimonial = {
      quote,
      rating: Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 4.8,
      authorName,
      authorInitial,
    };
    if (avatarUrl && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(avatarUrl)) {
      item.avatar = { src: avatarUrl, alt: authorName };
    }
    out.push(item);
  }
  return out.length ? out : null;
}

function engagementFromLayout(meta: Record<string, unknown>): HomeEngagementData | null {
  const items = meta.engagement_items;
  if (!isRecord(items)) return null;
  const titles = items.title;
  const descriptions = items.description;
  if (!Array.isArray(titles)) return null;
  const cards: HomeEngagementCard[] = [];
  for (let i = 0; i < titles.length; i++) {
    const title = asString(titles[i]);
    if (!title) continue;
    const description = Array.isArray(descriptions) ? asString(descriptions[i]) : '';
    cards.push({ title, description });
  }
  if (!cards.length) return null;
  return {
    kicker: asString(meta.engagement_subtitle) || 'Engagement',
    title: asString(meta.engagement_title) || 'Join Our Global Family',
    cards,
    cta: {
      label: 'Apply as peace ambassador',
      href: asString(meta.engagement_ambassador_navigation_url) || getInvolvedPath(),
    },
  };
}

function splitAboutHeadline(aboutTitle: string): { line1: string; line2: string } {
  const t = aboutTitle.trim();
  const comma = t.indexOf(',');
  if (comma >= 0) {
    return {
      line1: t.slice(0, comma + 1).trim(),
      line2: t.slice(comma + 1).trim(),
    };
  }
  return { line1: t, line2: '' };
}

function heroImageFromLayout(
  meta: Record<string, unknown>,
  normalizeUrl: (u: string) => string,
  fallback: HomeHeroData['image'],
) {
  const desktop = meta.banner_desktop_image;
  const mobile = meta.banner_mobile_image;
  const pickImg = (v: unknown): { src: string; alt: string } | null => {
    if (v == null) return null;
    if (typeof v === 'string' && v.trim()) {
      return { src: normalizeUrl(v), alt: '' };
    }
    if (isRecord(v) && typeof v.url === 'string') {
      const alt = typeof v.filename === 'string' ? v.filename : 'Banner';
      return { src: normalizeUrl(v.url), alt };
    }
    return null;
  };
  return pickImg(desktop) ?? pickImg(mobile) ?? fallback;
}

function parseHomePageFromLayoutV1(meta: Record<string, unknown>, ctx: LayoutV1ParseContext): HomePageData {
  const {
    normalizeImageUrl: norm,
    staticHeroFallback,
    staticAboutFallback,
    staticImpactFallback,
    staticActionPillars,
    staticHappyClientsFallback,
    staticEngagementFallback,
  } = ctx;

  const headline = splitHeroHeadline(asString(meta.banner_subtitle));
  const hero: HomeHeroData = {
    overline: asString(meta.banner_title) || staticHeroFallback.overline,
    headline,
    description: stripHtml(asString(meta.banner_description)) || staticHeroFallback.description,
    primaryCta: {
      label: 'Join the movement',
      href: asString(meta.banner_join_navigation) || staticHeroFallback.primaryCta.href,
    },
    secondaryCta: {
      label: 'Learn more',
      href: asString(meta.banner_learn_more_navigation) || staticHeroFallback.secondaryCta.href,
    },
    image: heroImageFromLayout(meta, norm, staticHeroFallback.image),
    statCard: {
      label: 'Active community',
      value: asString(meta.banner_active_community_count) || staticHeroFallback.statCard.value,
    },
  };

  const impactStats = highlightsFromLayout(meta.highlights) ?? staticImpactFallback;

  const aboutTitle = asString(meta.about_title);
  const { line1, line2 } = aboutTitle ? splitAboutHeadline(aboutTitle) : { line1: '', line2: '' };

  const coreList = coreValuesFromLayout(meta.core_values, norm);
  const aboutCoreValues: HomeAboutCoreValuesData = {
    aboutKicker: asString(meta.about_subtitle) || staticAboutFallback.aboutKicker,
    headlineLine1: line1 || staticAboutFallback.headlineLine1,
    headlineLine2: line2 || staticAboutFallback.headlineLine2,
    body: stripHtml(asString(meta.about_description)) || staticAboutFallback.body,
    visionLabel: staticAboutFallback.visionLabel,
    visionText: staticAboutFallback.visionText,
    coreValuesKicker: asString(meta.core_values_title) || staticAboutFallback.coreValuesKicker,
    values: coreList ?? staticAboutFallback.values,
  };

  const actionPillars = actionPillarsFromLayoutFixed(meta.our_actions, meta, norm, staticActionPillars);

  const peaceSummits: HomePeaceSummitsData = {
    kicker: asString(meta.events_subtitle) || 'Events',
    title: asString(meta.events_title) || 'Global Peace Summits',
    summits: [],
  };

  const testimonialList = testimonialsFromLayout(meta.testimonials, norm);
  const rawTestimonialTitle = asString(meta.testimonials_title) || staticHappyClientsFallback.title;
  const happyClients: HomeHappyClientsData = {
    title: rawTestimonialTitle.replace(/\b\w/g, (c) => c.toUpperCase()),
    testimonials: testimonialList ?? staticHappyClientsFallback.testimonials,
  };

  const iam = splitIamPeaceTitle(asString(meta.i_am_piece_title));
  const supportMovement: HomeSupportMovementData = {
    header: {
      titleCyan: iam.titleCyan,
      titleOrange: iam.titleOrange,
      subline: asString(meta.i_am_piece_subtitle) || '',
    },
    panel: {
      headline: asString(meta.support_title) || '',
      body: stripHtml(asString(meta.support_description)) || '',
      donorsLine: '',
      avatars: [],
    },
  };

  const engagement = engagementFromLayout(meta) ?? staticEngagementFallback;

  return {
    hero,
    impactStats,
    aboutCoreValues,
    actionPillars,
    peaceSummits,
    happyClients,
    supportMovement,
    engagement,
  };
}

// --- fetch + empty fallbacks ------------------------------------------------

function emptyHero(): HomeHeroData {
  return {
    overline: '',
    headline: { accent: '', lineMiddle: '', accentWord: '' },
    description: '',
    primaryCta: { label: 'Join the movement', href: getInvolvedPath() },
    secondaryCta: { label: 'Learn more', href: aboutUsPath() },
    image: { src: '/hero_images.png', alt: '' },
    statCard: { label: '', value: '' },
  };
}

function buildLayoutParseContext(): LayoutV1ParseContext {
  return {
    normalizeImageUrl,
    staticHeroFallback: emptyHero(),
    staticAboutFallback: {
      aboutKicker: '',
      headlineLine1: '',
      headlineLine2: '',
      body: '',
      visionLabel: '',
      visionText: '',
      coreValuesKicker: '',
      values: [],
    },
    staticImpactFallback: { items: [] },
    staticActionPillars: { kicker: '', title: '', pillars: [] },
    staticHappyClientsFallback: { title: '', testimonials: [] },
    staticEngagementFallback: {
      kicker: '',
      title: '',
      cards: [],
      cta: { label: 'Apply as peace ambassador', href: getInvolvedPath() },
    },
  };
}

let layoutCtx: LayoutV1ParseContext | null = null;

function getLayoutParseContext(): LayoutV1ParseContext {
  if (!layoutCtx) layoutCtx = buildLayoutParseContext();
  return layoutCtx;
}

function emptyHomePage(): HomePageData {
  const ctx = getLayoutParseContext();
  return {
    hero: { ...ctx.staticHeroFallback },
    impactStats: { items: [] },
    aboutCoreValues: { ...ctx.staticAboutFallback },
    actionPillars: { kicker: '', title: '', pillars: [] },
    peaceSummits: { kicker: '', title: '', summits: [] },
    happyClients: { title: '', testimonials: [] },
    supportMovement: {
      header: { titleCyan: '', titleOrange: '', subline: '' },
      panel: { headline: '', body: '', donorsLine: '', avatars: [] },
    },
    engagement: { ...ctx.staticEngagementFallback },
  };
}

async function fetchHomePageDataUncached(): Promise<HomePageData> {
  const url = buildCompanyApiUrl(homePageApiPath());
  if (!url) return emptyHomePage();

  const tag = homePageCacheKeySegment();
  const payload = await fetchJsonCached<PageApiPayload>(url, {
    tags: ['homepage', `page:${tag}`],
    init: { headers: { Accept: 'application/json' } },
  });

  const meta = payload?.data?.meta;
  if (!isLayoutHomeV1Meta(meta)) return emptyHomePage();

  const ctx = getLayoutParseContext();
  let data = parseHomePageFromLayoutV1(meta, ctx);

  if (HOME_HERO_FORCE_STATIC_IMAGE) {
    data = {
      ...data,
      hero: { ...data.hero, image: ctx.staticHeroFallback.image },
    };
  }

  return data;
}

// --- public API -------------------------------------------------------------

const getCachedHomePage = unstable_cache(
  fetchHomePageDataUncached,
  [
    'homepage-page-v2',
    homePageCacheKeySegment(),
    process.env.COMPANY_API_BASE_URL ||
      (process.env.NODE_ENV === 'development' ? 'dev-fallback' : 'static'),
  ],
  {
    revalidate: PAGE_CACHE_SECONDS,
    tags: [
      API_CACHE_TAG,
      'homepage',
      'homepage-hero',
      `page:${homePageCacheKeySegment()}`,
    ],
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

export async function getHomePeaceSummits(): Promise<HomePeaceSummitsData> {
  return (await getCachedHomePage()).peaceSummits;
}

export async function getHomeHappyClients(): Promise<HomeHappyClientsData> {
  return (await getCachedHomePage()).happyClients;
}

export async function getHomeSupportMovement(): Promise<HomeSupportMovementData> {
  return (await getCachedHomePage()).supportMovement;
}

export async function getHomeEngagement(): Promise<HomeEngagementData> {
  return (await getCachedHomePage()).engagement;
}
