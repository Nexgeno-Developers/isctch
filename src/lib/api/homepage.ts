import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { aboutUsPath, getInvolvedPath } from '@/config/publicRoutes';

export type HomeHeroCta = { label: string; href: string };
export type HomeHeroData = {
  overline: string;
  headline: { accent: string; lineMiddle: string; accentWord: string };
  description: string;
  primaryCta: HomeHeroCta;
  secondaryCta: HomeHeroCta;
  image: { src: string; alt: string };
  statCard: { label: string; value: string };
};
export type HomeImpactStatItem =
  | { mode: 'count'; end: number; prefix?: string; suffix?: string; pad?: number; label: string }
  | { mode: 'symbol'; symbol: string; label: string };
export type HomeImpactStatsData = { items: HomeImpactStatItem[] };
export type HomeCoreValueIconId = 'hand-heart' | 'leaf' | 'handshake' | 'heart' | 'scales';
export type HomeCoreValueItem = {
  icon: HomeCoreValueIconId;
  label: string;
  /** CMS `core_values.icon[].url` when present — shown instead of local glyph. */
  iconSrc?: string;
};
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
export type HomeActionPillarIconId =
  | 'people' | 'meditation' | 'graduation' | 'megaphone' | 'book' | 'scales-policy';
export type HomeActionPillarItem = { icon: HomeActionPillarIconId; title: string; description: string };
export type HomeActionPillarsData = { kicker: string; title: string; pillars: HomeActionPillarItem[] };
export type HomePeaceSummitCard = {
  location: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
};
export type HomePeaceSummitsData = { kicker: string; title: string; summits: HomePeaceSummitCard[] };
export type HomeHappyClientTestimonial = {
  quote: string;
  rating: number;
  authorName: string;
  authorInitial: string;
  avatar?: { src: string; alt: string };
};
export type HomeHappyClientsData = { title: string; testimonials: HomeHappyClientTestimonial[] };
export type HomeSupportMovementData = {
  header: { titleCyan: string; titleOrange: string; subline: string };
  panel: {
    headline: string;
    body: string;
    donorsLine: string;
    avatars: { src: string; alt: string }[];
  };
};
export type HomeEngagementCard = { title: string; description: string };
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

const PAGE_SLUG = (process.env.HOMEPAGE_PAGE_SLUG || 'home').replace(/^\/+|\/+$/g, '');
const PAGE_ID = process.env.HOMEPAGE_PAGE_ID?.trim();
const FORCE_STATIC_HERO_IMG = ['1', 'true', 'yes'].includes(
  (process.env.HOME_HERO_FORCE_STATIC_IMAGE || '').toLowerCase().trim(),
);
const REVALIDATE = Number(process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60);

type PagePayload = { data?: { meta?: unknown } };

type Ctx = {
  norm: (u: string) => string;
  heroFb: HomeHeroData;
  aboutFb: HomeAboutCoreValuesData;
  impactFb: HomeImpactStatsData;
  pillarsFb: HomeActionPillarsData;
  clientsFb: HomeHappyClientsData;
  engageFb: HomeEngagementData;
};

function apiBase(): string | null {
  const e = process.env.COMPANY_API_BASE_URL?.trim();
  return e ? e.replace(/\/+$/, '') : null;
}

function apiDomain(): string {
  return process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
}

function normImg(url: string): string {
  const d = apiDomain();
  const u = url.trim();
  if (!u) return '/hero_images.png';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  return d ? `${d}/${u.replace(/^\/+/, '')}` : (u.startsWith('/') ? u : `/${u}`);
}

function pagePath(): string {
  return PAGE_ID && /^\d+$/.test(PAGE_ID) ? `/v1/page/${PAGE_ID}` : `/v1/page/${PAGE_SLUG}`;
}

function cacheSeg(): string {
  return PAGE_ID && /^\d+$/.test(PAGE_ID) ? `id:${PAGE_ID}` : `slug:${PAGE_SLUG}`;
}

const rec = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null;
const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');
const isLayout = (m: unknown): m is Record<string, unknown> =>
  rec(m) && typeof m.banner_title === 'string' && m.banner_title.length > 0;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}

function splitHeroSub(subtitle: string): HomeHeroData['headline'] {
  const s = subtitle.trim();
  const parts = s.split(/\u2014|\u2013|—|–/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2) return { accent: s, lineMiddle: '', accentWord: '' };
  const accent = parts[0] ?? '';
  const tail = parts.slice(1).join(' ').trim();
  const words = tail.split(/\s+/).filter(Boolean);
  if (words.length < 2) return { accent, lineMiddle: tail, accentWord: '' };
  return {
    accent,
    lineMiddle: words.slice(0, -1).join(' '),
    accentWord: words[words.length - 1] ?? '',
  };
}

function statDispScore(s: string): number {
  const t = s.trim();
  if (/∞/.test(t)) return 4;
  if (/^0\d$/.test(t) || /^\d+\+?$/.test(t)) return 3;
  if (t.length <= 4 && !/[a-z]{3,}/i.test(t)) return 2;
  return 0;
}

function toImpactItem(display: string, label: string): HomeImpactStatItem {
  const d = display.trim();
  if (/∞/.test(d)) return { mode: 'symbol', symbol: '∞', label };
  const p = /^(\d+)\+$/.exec(d);
  if (p) return { mode: 'count', end: Number.parseInt(p[1]!, 10), suffix: '+', label };
  if (/^0\d$/.test(d)) return { mode: 'count', end: Number.parseInt(d, 10), suffix: '', pad: 2, label };
  const plain = /^(\d+)$/.exec(d);
  if (plain) return { mode: 'count', end: Number.parseInt(plain[1]!, 10), suffix: '', label };
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

function highlights(h: unknown): HomeImpactStatsData | null {
  if (!rec(h)) return null;
  const titles = h.title;
  const values = h.value;
  if (!Array.isArray(titles) || !Array.isArray(values) || !titles.length) return null;
  const items: HomeImpactStatItem[] = [];
  const n = Math.min(titles.length, values.length);
  for (let i = 0; i < n; i++) {
    const a = str(titles[i]);
    const b = str(values[i]);
    if (!a && !b) continue;
    const sa = statDispScore(a);
    const sb = statDispScore(b);
    let label: string;
    let display: string;
    if (sa > sb) {
      label = b;
      display = a;
    } else if (sb > sa) {
      label = a;
      display = b;
    } else {
      label = a.length >= b.length ? a : b;
      display = a.length >= b.length ? b : a;
    }
    if (!label) continue;
    items.push(toImpactItem(display, label));
  }
  return items.length ? { items } : null;
}

function cellUrl(cell: unknown, norm: (u: string) => string): string | undefined {
  return rec(cell) && typeof cell.url === 'string' && cell.url.trim()
    ? norm(cell.url.trim())
    : undefined;
}

function coreIcon(label: string): HomeCoreValueIconId {
  const s = label.toLowerCase();
  if (s.includes('friend')) return 'hand-heart';
  if (s.includes('service') || s.includes('selfless')) return 'leaf';
  if (s.includes('respect')) return 'handshake';
  if (s.includes('forgive')) return 'heart';
  if (s.includes('equal')) return 'scales';
  return 'heart';
}

const PILLAR_FALLBACK: HomeActionPillarIconId[] = [
  'people',
  'meditation',
  'graduation',
  'megaphone',
  'book',
  'scales-policy',
];

function pillarIcon(title: string, i: number): HomeActionPillarIconId {
  const s = title.toLowerCase();
  if (s.includes('interfaith') || s.includes('dialogue')) return 'people';
  if (s.includes('inner') || s.includes('meditat') || s.includes('mindful') || s.includes('peace tool'))
    return 'meditation';
  if (s.includes('youth') || s.includes('leadership')) return 'graduation';
  if (s.includes('voice') || s.includes('raising')) return 'megaphone';
  if (s.includes('education') || s.includes('curriculum')) return 'book';
  if (s.includes('policy') || s.includes('advocacy')) return 'scales-policy';
  return PILLAR_FALLBACK[i] ?? 'people';
}

function coreValues(block: unknown, norm: (u: string) => string): HomeCoreValueItem[] | null {
  if (!rec(block) || !Array.isArray(block.title)) return null;
  const titles = block.title;
  const icons = block.icon;
  const out: HomeCoreValueItem[] = [];
  for (let i = 0; i < titles.length; i++) {
    const label = str(titles[i]);
    if (!label || label === 'data') continue;
    const url = cellUrl(Array.isArray(icons) ? icons[i] : undefined, norm);
    out.push({
      icon: coreIcon(label),
      label,
      ...(url ? { iconSrc: url } : {}),
    });
  }
  return out.length ? out : null;
}

function pillars(
  block: unknown,
  meta: Record<string, unknown>,
  fb: HomeActionPillarsData,
): HomeActionPillarsData {
  if (!rec(block) || !Array.isArray(block.title)) {
    return {
      kicker: str(meta.our_action_subtitle) || fb.kicker,
      title: str(meta.our_action_title) || fb.title,
      pillars: fb.pillars,
    };
  }
  const titles = block.title;
  const descs = block.description;
  const list: HomeActionPillarItem[] = [];
  for (let i = 0; i < titles.length; i++) {
    const title = str(titles[i]);
    if (!title || title === 'data') continue;
    list.push({
      icon: pillarIcon(title, list.length),
      title,
      description: Array.isArray(descs) ? str(descs[i]) : '',
    });
  }
  return {
    kicker: str(meta.our_action_subtitle) || fb.kicker,
    title: str(meta.our_action_title) || fb.title,
    pillars: list.length ? list : fb.pillars,
  };
}

function testimonials(block: unknown, norm: (u: string) => string): HomeHappyClientTestimonial[] | null {
  if (!rec(block) || !Array.isArray(block.name) || !Array.isArray(block.review)) return null;
  const names = block.name;
  const reviews = block.review;
  const ratings = block.rating;
  const images = block.image;
  const out: HomeHappyClientTestimonial[] = [];
  const n = Math.min(names.length, reviews.length);
  for (let i = 0; i < n; i++) {
    const authorName = str(names[i]) || 'Client';
    const quote = str(reviews[i]);
    if (!quote) continue;
    const ratingRaw = Array.isArray(ratings) ? str(ratings[i]) : '';
    const rating = ratingRaw ? Number.parseFloat(ratingRaw.replace(/[^\d.]/g, '')) : 4.8;
    const item: HomeHappyClientTestimonial = {
      quote,
      rating: Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 4.8,
      authorName,
      authorInitial: (authorName.trim().charAt(0) || '?').toUpperCase(),
    };
    const avatarUrl = cellUrl(Array.isArray(images) ? images[i] : undefined, norm);
    if (avatarUrl && /\.(png|jpe?g|webp|gif)(\?|$)/i.test(avatarUrl)) {
      item.avatar = { src: avatarUrl, alt: authorName };
    }
    out.push(item);
  }
  return out.length ? out : null;
}

function engagement(meta: Record<string, unknown>): HomeEngagementData | null {
  const items = meta.engagement_items;
  if (!rec(items) || !Array.isArray(items.title)) return null;
  const titles = items.title;
  const descriptions = items.description;
  const cards: HomeEngagementCard[] = [];
  for (let i = 0; i < titles.length; i++) {
    const title = str(titles[i]);
    if (!title) continue;
    cards.push({ title, description: Array.isArray(descriptions) ? str(descriptions[i]) : '' });
  }
  if (!cards.length) return null;
  return {
    kicker: str(meta.engagement_subtitle) || 'Engagement',
    title: str(meta.engagement_title) || 'Join Our Global Family',
    cards,
    cta: {
      label: 'Apply as peace ambassador',
      href: str(meta.engagement_ambassador_navigation_url) || getInvolvedPath(),
    },
  };
}

function aboutLines(aboutTitle: string): { line1: string; line2: string } {
  const t = aboutTitle.trim();
  const c = t.indexOf(',');
  return c >= 0
    ? { line1: t.slice(0, c + 1).trim(), line2: t.slice(c + 1).trim() }
    : { line1: t, line2: '' };
}

function bannerImg(
  meta: Record<string, unknown>,
  norm: (u: string) => string,
  fb: HomeHeroData['image'],
): HomeHeroData['image'] {
  const pick = (v: unknown): HomeHeroData['image'] | null => {
    if (v == null) return null;
    if (typeof v === 'string' && v.trim()) return { src: norm(v), alt: '' };
    if (rec(v) && typeof v.url === 'string') {
      return { src: norm(v.url), alt: typeof v.filename === 'string' ? v.filename : 'Banner' };
    }
    return null;
  };
  return pick(meta.banner_desktop_image) ?? pick(meta.banner_mobile_image) ?? fb;
}

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

function makeCtx(): Ctx {
  return {
    norm: normImg,
    heroFb: emptyHero(),
    aboutFb: {
      aboutKicker: '',
      headlineLine1: '',
      headlineLine2: '',
      body: '',
      visionLabel: '',
      visionText: '',
      coreValuesKicker: '',
      values: [],
    },
    impactFb: { items: [] },
    pillarsFb: { kicker: '', title: '', pillars: [] },
    clientsFb: { title: '', testimonials: [] },
    engageFb: {
      kicker: '',
      title: '',
      cards: [],
      cta: { label: 'Apply as peace ambassador', href: getInvolvedPath() },
    },
  };
}

let _ctx: Ctx | null = null;
function ctx(): Ctx {
  return (_ctx ??= makeCtx());
}

function emptyPage(): HomePageData {
  const c = ctx();
  return {
    hero: { ...c.heroFb },
    impactStats: { items: [] },
    aboutCoreValues: { ...c.aboutFb },
    actionPillars: { kicker: '', title: '', pillars: [] },
    peaceSummits: { kicker: '', title: '', summits: [] },
    happyClients: { title: '', testimonials: [] },
    supportMovement: {
      header: { titleCyan: '', titleOrange: '', subline: '' },
      panel: { headline: '', body: '', donorsLine: '', avatars: [] },
    },
    engagement: { ...c.engageFb },
  };
}

function parseLayout(m: Record<string, unknown>, c: Ctx): HomePageData {
  const { norm, heroFb, aboutFb, impactFb, pillarsFb, clientsFb, engageFb } = c;
  const hero: HomeHeroData = {
    overline: str(m.banner_title) || heroFb.overline,
    headline: splitHeroSub(str(m.banner_subtitle)),
    description: stripHtml(str(m.banner_description)) || heroFb.description,
    primaryCta: {
      label: 'Join the movement',
      href: str(m.banner_join_navigation) || heroFb.primaryCta.href,
    },
    secondaryCta: {
      label: 'Learn more',
      href: str(m.banner_learn_more_navigation) || heroFb.secondaryCta.href,
    },
    image: bannerImg(m, norm, heroFb.image),
    statCard: {
      label: 'Active community',
      value: str(m.banner_active_community_count) || heroFb.statCard.value,
    },
  };

  const aboutTitle = str(m.about_title);
  const { line1, line2 } = aboutTitle ? aboutLines(aboutTitle) : { line1: '', line2: '' };
  const coreList = coreValues(m.core_values, norm);

  const iamRaw = str(m.i_am_piece_title).trim();
  const peaceIdx = iamRaw.toUpperCase().lastIndexOf('PEACE');
  const iam =
    peaceIdx >= 0
      ? {
          cyan: iamRaw.slice(0, peaceIdx).trim() || '#Iam',
          orange: iamRaw.slice(peaceIdx).trim() || 'PEACE',
        }
      : { cyan: '#Iam', orange: iamRaw || 'PEACE' };

  const tList = testimonials(m.testimonials, norm);
  const tTitle = str(m.testimonials_title) || clientsFb.title;

  return {
    hero,
    impactStats: highlights(m.highlights) ?? impactFb,
    aboutCoreValues: {
      aboutKicker: str(m.about_subtitle) || aboutFb.aboutKicker,
      headlineLine1: line1 || aboutFb.headlineLine1,
      headlineLine2: line2 || aboutFb.headlineLine2,
      body: stripHtml(str(m.about_description)) || aboutFb.body,
      visionLabel: aboutFb.visionLabel,
      visionText: aboutFb.visionText,
      coreValuesKicker: str(m.core_values_title) || aboutFb.coreValuesKicker,
      values: coreList ?? aboutFb.values,
    },
    actionPillars: pillars(m.our_actions, m, pillarsFb),
    peaceSummits: {
      kicker: str(m.events_subtitle) || 'Events',
      title: str(m.events_title) || 'Global Peace Summits',
      summits: [],
    },
    happyClients: {
      title: tTitle.replace(/\b\w/g, (x) => x.toUpperCase()),
      testimonials: tList ?? clientsFb.testimonials,
    },
    supportMovement: {
      header: {
        titleCyan: iam.cyan,
        titleOrange: iam.orange,
        subline: str(m.i_am_piece_subtitle) || '',
      },
      panel: {
        headline: str(m.support_title) || '',
        body: stripHtml(str(m.support_description)) || '',
        donorsLine: '',
        avatars: [],
      },
    },
    engagement: engagement(m) ?? engageFb,
  };
}

async function fetchUncached(): Promise<HomePageData> {
  const base = apiBase();
  if (!base) return emptyPage();

  const payload = await fetchJsonCached<PagePayload>(`${base}${pagePath()}`, {
    tags: ['homepage', `page:${cacheSeg()}`],
    init: { headers: { Accept: 'application/json' } },
  });

  const meta = payload?.data?.meta;
  if (!isLayout(meta)) return emptyPage();
  const c = ctx();
  let data = parseLayout(meta, c);
  if (FORCE_STATIC_HERO_IMG) {
    data = { ...data, hero: { ...data.hero, image: c.heroFb.image } };
  }
  return data;
}

const getCachedHomePage = unstable_cache(
  fetchUncached,
  [
    'homepage-page-v2',
    cacheSeg(),
    process.env.COMPANY_API_BASE_URL || 'static',
  ],
  {
    revalidate: REVALIDATE,
    tags: [API_CACHE_TAG, 'homepage', 'homepage-hero', `page:${cacheSeg()}`],
  },
);

export async function getHomePageData(): Promise<HomePageData> {
  return getCachedHomePage();
}
