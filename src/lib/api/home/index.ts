import { cache } from 'react';
import { getHomepageData } from '@/fake-api/homepage';
import type {
  CommercialServiceCard,
  CommercialServicesData,
  FAQData,
  FAQItem,
  Hero,
  HeroSlide,
  HomepageData,
  ProductSustainabilityData,
  SustainabilityProductCard,
  SustainabilityWorkCard,
  VideoBannerData,
  WorkInSustainabilityData,
} from '@/fake-api/homepage';

export type { HomepageData } from '@/fake-api/homepage';

/**
 * When unset or not `1`, `/v1/page/home` is fetched and merged (same host as COMPANY_API_BASE_URL).
 * Set `HOME_PAGE_USE_FAKE_ONLY=1` to skip the network and use only `fake-api/homepage` stubs.
 */
function shouldMergeHomeFromApi(): boolean {
  return process.env.HOME_PAGE_USE_FAKE_ONLY !== '1';
}

/**
 * Homepage data: fake/local fallbacks from `getHomepageData()`, merged with the real `/v1/page/home`
 * response when enabled. Cached per request for parallel server components.
 */
export const fetchHomepageData = cache(async (): Promise<HomepageData> => {
  const base = await getHomepageData();
  if (!shouldMergeHomeFromApi()) {
    return base;
  }
  return mergeHomepageFromApi(base);
});

const COMPANY_API_BASE_URL =
  process.env.COMPANY_API_BASE_URL || 'https://backend-lamipak.webtesting.pw/api';

const HOME_AUTOFETCH =
  'marketing_services,technical_services,sustainable_products,sustainabilities';

const HOME_REVALIDATE_SECONDS = 300;

const HERO_CTA_ROTATION = [
  'EXPLORE SOLUTIONS',
  'DISCOVER MORE',
  'LEARN MORE',
  'GET STARTED',
  'EXPLORE NOW',
  'EXPLORE NOW',
  'EXPLORE NOW',
  'EXPLORE NOW',
] as const;

type MediaRef = { id?: number; filename?: string; url?: string | null };

type HomePageApiResponse = {
  data?: {
    id?: number;
    slug?: string;
    layout?: string;
    meta?: HomeMetaApi;
    seo?: {
      title?: string | null;
      description?: string | null;
      canonical_url?: string | null;
      schema?: unknown;
    };
    autofetch?: HomeAutofetchApi;
  };
};

type HomeMetaApi = {
  banner_items?: BannerItemsApi;
  global_beverage_title?: string;
  global_beverage_description?: string;
  global_beverage_video_url?: string;
  faqs_items?: FaqsItemsApi;
};

type BannerItemsApi = {
  itration?: unknown[];
  desktop_banner?: MediaRef[];
  mobile_banner?: MediaRef[];
  title?: string[];
  subtitle?: string[];
  navigation_url?: string[];
  label?: string[];
};

type FaqsItemsApi = {
  itration?: unknown[];
  title?: string[];
  description?: string[];
};

type ServiceAutofetchItem = {
  id?: number;
  title?: string;
  slug?: string;
  short_summary_icon?: MediaRef;
  short_summary_image?: MediaRef;
  short_summary_title?: string;
  short_summary_description?: string;
};

type SustainableProductAutofetchItem = {
  id?: number;
  title?: string;
  slug?: string;
  short_summary_image?: MediaRef;
  short_summary_description?: string;
};

type SustainabilityLinkItem = {
  id?: number;
  title?: string;
  slug?: string;
  short_summary_image?: MediaRef;
  short_summary_description?: string;
};

type HomeAutofetchApi = {
  marketing_services?: ServiceAutofetchItem;
  technical_services?: ServiceAutofetchItem;
  sustainable_products?: SustainableProductAutofetchItem[];
  sustainabilities?: SustainabilityLinkItem[];
};

function buildApiUrl(path: string): string {
  const base = COMPANY_API_BASE_URL.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeBasicEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&rdquo;/gi, '"')
    .replace(/&ldquo;/gi, '"')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function faqAnswerFromHtml(html: string): string {
  if (!html) return '';
  const withBreaks = html
    .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '');
  return decodeBasicEntities(stripHtml(withBreaks))
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitHeroTitle(full: string): { title: string; titleHighlight: string } {
  const idx = full.indexOf(',');
  if (idx === -1) {
    return { title: full.trim(), titleHighlight: '' };
  }
  return {
    title: full.slice(0, idx + 1).trim(),
    titleHighlight: full.slice(idx + 1).trim(),
  };
}

function splitGlobalBeverageTitle(full: string): { preTitleBlue: string; preTitleBlack: string } {
  const trimmed = full.trim();
  if (!trimmed) return { preTitleBlue: '', preTitleBlack: '' };
  const match = trimmed.match(/^(.+?)(\s+WITH\s+.+)$/i);
  if (match) {
    return { preTitleBlue: match[1].trim(), preTitleBlack: match[2].trim() };
  }
  return { preTitleBlue: trimmed, preTitleBlack: '' };
}

function sanitizeYoutubeWatchUrl(url: string): string {
  try {
    const u = new URL(url.trim());
    u.searchParams.delete('themeRefresh');
    u.searchParams.delete('si');
    return u.toString();
  } catch {
    return url.trim();
  }
}

function normalizeNavHref(url?: string): string {
  if (!url || !url.trim()) return '/';
  const raw = url.trim();
  try {
    const u = new URL(raw);
    if (
      u.hostname === 'localhost' ||
      u.hostname === '127.0.0.1' ||
      u.hostname.includes('lamipak') ||
      u.hostname.includes('vercel.app')
    ) {
      const path = u.pathname || '/';
      return path + (u.search || '');
    }
    return raw;
  } catch {
    return raw.startsWith('/') ? raw : `/${raw.replace(/^\/+/, '')}`;
  }
}

function mapBannerItemsToHero(banner: BannerItemsApi | undefined, baseHero: Hero): Hero | null {
  if (!banner?.desktop_banner?.length) return null;

  const banners = banner.desktop_banner;
  const titles = banner.title ?? [];
  const subtitles = banner.subtitle ?? [];
  const labels = banner.label ?? [];
  const navUrls = banner.navigation_url ?? [];

  const slides: HeroSlide[] = [];

  for (let i = 0; i < banners.length; i++) {
    const bg = banners[i]?.url;
    if (!bg) continue;

    const fullTitle = titles[i] ?? '';
    const { title, titleHighlight } = splitHeroTitle(fullTitle);

    slides.push({
      id: String(banners[i]?.id ?? i + 1),
      category: labels[i]?.trim() || 'LAMIPAK',
      title,
      titleHighlight,
      description: subtitles[i]?.trim() ?? '',
      ctaText: HERO_CTA_ROTATION[i % HERO_CTA_ROTATION.length],
      ctaLink: normalizeNavHref(navUrls[i]),
      backgroundImage: bg,
    });
  }

  if (!slides.length) return null;

  const categories = slides.map((_, i) => ({
    id: String(i + 1),
    label: labels[i]?.trim() || slides[i].category,
    href: normalizeNavHref(navUrls[i]),
    slideIndex: i,
  }));

  return {
    slides,
    categories,
    videoUrl: baseHero.videoUrl,
  };
}

function mapServiceToCard(
  svc: ServiceAutofetchItem,
  icon: 'gear' | 'megaphone',
): CommercialServiceCard | null {
  const id = svc.id;
  const slug = svc.slug?.trim();
  if (id == null && !slug) return null;

  const imageUrl = svc.short_summary_image?.url?.trim();
  if (!imageUrl) return null;

  return {
    id: String(id ?? slug),
    title: (svc.short_summary_title || svc.title || '').trim() || 'Service',
    description: (svc.short_summary_description || '').trim(),
    image: imageUrl,
    imageAlt: (svc.title || svc.short_summary_title || 'Service').trim(),
    ctaText: 'Read More',
    ctaLink: slug ? `/${slug.replace(/^\/+/, '')}` : '/services',
    icon,
  };
}

function mapCommercialServices(autofetch: HomeAutofetchApi | undefined): CommercialServicesData | null {
  const tech = autofetch?.technical_services;
  const mkt = autofetch?.marketing_services;
  const cards: CommercialServiceCard[] = [];

  if (tech) {
    const c = mapServiceToCard(tech, 'gear');
    if (c) cards.push(c);
  }
  if (mkt) {
    const c = mapServiceToCard(mkt, 'megaphone');
    if (c) cards.push(c);
  }

  if (!cards.length) return null;
  return { cards };
}

function deriveProductLabel(description: string, title: string): string {
  const d = description.trim();
  if (!d) return title;
  const sentence = d.split(/(?<=[.!?])\s+/)[0]?.trim() || d;
  return sentence.length > 100 ? `${sentence.slice(0, 97)}…` : sentence;
}

function mapSustainableProducts(
  items: SustainableProductAutofetchItem[] | undefined,
): SustainabilityProductCard[] {
  if (!items?.length) return [];
  return items
    .map((p) => {
      const id = p.id;
      const slug = p.slug?.trim();
      const image = p.short_summary_image?.url?.trim();
      if (id == null || !slug || !image) return null;

      const title = (p.title || 'Product').trim();
      const description = (p.short_summary_description || '').trim();

      return {
        id: String(id),
        title,
        label: deriveProductLabel(description, title),
        description,
        image,
        imageAlt: title,
        link: `/${slug.replace(/^\/+/, '')}`,
        ctaText: 'Read More',
      } satisfies SustainabilityProductCard;
    })
    .filter(Boolean) as SustainabilityProductCard[];
}

function mapSustainabilityWorkCards(
  items: SustainabilityLinkItem[] | undefined,
  fallback: WorkInSustainabilityData,
): SustainabilityWorkCard[] | null {
  if (!items?.length) return null;

  const fakeCards = fallback.cards;

  return items.map((item, index) => {
    const slug = item.slug?.trim() || '';
    const tail = slug.split('/').filter(Boolean).pop() || '';
    const fakeMatch =
      fakeCards.find((c) => {
        const linkTail = c.link.replace(/^\//, '').split('/').filter(Boolean).pop() || '';
        return tail && (c.link.includes(tail) || linkTail === tail);
      }) || fakeCards[index % fakeCards.length];

    const title = (item.title || fakeMatch.title).trim();
    const apiImage = item.short_summary_image?.url?.trim();
    const apiDescription = (item.short_summary_description || '').trim();

    return {
      id: String(item.id ?? index + 1),
      title,
      description: apiDescription || fakeMatch.description,
      image: apiImage || fakeMatch.image,
      imageAlt: title,
      link: slug ? `/${slug.replace(/^\/+/, '')}` : fakeMatch.link,
      ctaText: fakeMatch.ctaText,
    };
  });
}

function mapFaqs(faqs: FaqsItemsApi | undefined): FAQItem[] | null {
  const titles = faqs?.title ?? [];
  const descriptions = faqs?.description ?? [];
  if (!titles.length && !descriptions.length) return null;

  const n = Math.max(titles.length, descriptions.length);
  const out: FAQItem[] = [];

  for (let i = 0; i < n; i++) {
    const question = (titles[i] || '').trim();
    const answer = faqAnswerFromHtml(descriptions[i] || '');
    if (!question && !answer) continue;
    out.push({
      id: String(i + 1),
      question: question || `Question ${i + 1}`,
      answer: answer || '',
    });
  }

  return out.length ? out : null;
}

function mapVideoBanner(meta: HomeMetaApi | undefined, base: VideoBannerData): VideoBannerData | null {
  if (!meta?.global_beverage_video_url?.trim()) return null;

  const videoUrl = sanitizeYoutubeWatchUrl(meta.global_beverage_video_url);
  const { preTitleBlue, preTitleBlack } = splitGlobalBeverageTitle(
    meta.global_beverage_title?.trim() || '',
  );
  const preDescription = (meta.global_beverage_description || '').trim();

  return {
    ...base,
    title: base.title,
    preTitleBlue: preTitleBlue || base.preTitleBlue,
    preTitleBlack: preTitleBlack || base.preTitleBlack,
    preDescription: preDescription || base.preDescription,
    videoUrl,
    ctaText: base.ctaText,
    ctaLink: base.ctaLink,
  };
}

/**
 * Fetches `/v1/page/home` with autofetch and merges real sections into fake homepage data.
 * Sections without API content keep `base` values.
 */
export async function mergeHomepageFromApi(base: HomepageData): Promise<HomepageData> {
  try {
    const url = buildApiUrl(
      `/v1/page/home?autofetch=${encodeURIComponent(HOME_AUTOFETCH)}`,
    );
    const response = await fetch(url, { next: { revalidate: HOME_REVALIDATE_SECONDS } });

    if (!response.ok) return base;

    const payload = (await response.json()) as HomePageApiResponse;
    const data = payload.data;
    if (!data || data.layout !== 'home') return base;

    const meta = data.meta;
    const autofetch = data.autofetch ?? {};

    const heroMapped = meta?.banner_items
      ? mapBannerItemsToHero(meta.banner_items, base.hero)
      : null;

    const videoMapped = mapVideoBanner(meta, base.videoBanner);

    const commercialMapped = mapCommercialServices(autofetch);

    const products = mapSustainableProducts(autofetch.sustainable_products);
    const productMapped: ProductSustainabilityData | null =
      products.length > 0 ? { products } : null;

    const workCards = mapSustainabilityWorkCards(autofetch.sustainabilities, base.workInSustainability);
    const workMapped: WorkInSustainabilityData | null =
      workCards && workCards.length > 0 ? { cards: workCards } : null;

    const faqItems = mapFaqs(meta?.faqs_items);
    const faqMapped: FAQData | null = faqItems ? { items: faqItems } : null;

    const baseSeo = base.seo;
    const seoMerged =
      data.seo?.title || data.seo?.description || data.seo?.canonical_url
        ? {
            ...(baseSeo ?? {
              meta_title: 'Lamipak',
              meta_description: '',
              canonical_url: '/',
            }),
            meta_title: data.seo?.title ?? baseSeo?.meta_title ?? 'Lamipak',
            meta_description: data.seo?.description ?? baseSeo?.meta_description ?? '',
            canonical_url: data.seo?.canonical_url ?? baseSeo?.canonical_url ?? '/',
          }
        : baseSeo;

    return {
      ...base,
      hero: heroMapped ?? base.hero,
      videoBanner: videoMapped ?? base.videoBanner,
      commercialServices: commercialMapped ?? base.commercialServices,
      productSustainability: productMapped ?? base.productSustainability,
      workInSustainability: workMapped ?? base.workInSustainability,
      faq: faqMapped ?? base.faq,
      seo: seoMerged,
    };
  } catch {
    return base;
  }
}
