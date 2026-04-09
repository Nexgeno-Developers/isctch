import { cache } from 'react';
import { formatBoldText } from '@/lib/htmlText';

// ==================== Types ====================

export type MediaRef = { id?: number; filename?: string; url?: string | null };

export type HeroSlide = {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
};

export type Hero = {
  slides: HeroSlide[];
  categories: Array<{
    id: string;
    label: string;
    href: string;
    slideIndex: number;
  }>;
  videoUrl?: string;
};

export type CommercialServiceCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  iconUrl?: string;
  icon: 'gear' | 'megaphone';
};

export type CommercialServicesData = {
  cards: CommercialServiceCard[];
};

export type VideoBannerData = {
  title: string;
  preTitle: string;
  preDescription?: string;
  videoUrl?: string;
  ctaText: string;
  ctaLink: string;
};

export type SustainabilityProductCard = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  ctaText: string;
};

export type ProductSustainabilityData = {
  products: SustainabilityProductCard[];
};

export type SustainabilityWorkCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  ctaText: string;
};

export type WorkInSustainabilityData = {
  cards: SustainabilityWorkCard[];
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQData = {
  items: FAQItem[];
};

export type HomepageData = {
  hero: Hero;
  videoBanner: VideoBannerData;
  commercialServices: CommercialServicesData;
  productSustainability: ProductSustainabilityData;
  workInSustainability: WorkInSustainabilityData;
  faq: FAQData;
  latestPressRelease: LatestPressReleaseData;
  latestInsights: LatestInsightsData;
  approach: ApproachData;
  innovationInPackaging: InnovationInPackagingData;
  callToAction: CallToActionData;
  newsletterSubscription: NewsletterSubscriptionData;
  seo?: {
    meta_title: string;
    meta_description: string;
    canonical_url?: string;
    schema?: unknown;
  };
};

// Types for sections not yet driven by CMS (fallback stubs)
export type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
};

export type QuestionOption = {
  id: string;
  label: string;
  value: string;
};

export type Question = {
  id: string;
  question: string;
  options: QuestionOption[];
};

export type ApproachData = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  questions: Question[];
  ctaText: string;
  ctaLink: string;
};

export type InsightCard = {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  link: string;
};

export type LatestInsightsData = {
  cards: InsightCard[];
};

export type InnovationCard = {
  id: string;
  title: string;
  time: string;
  date: string;
  image: string;
  imageAlt: string;
  imagePosition: 'top' | 'bottom';
  isHighlighted?: boolean;
  link: string;
  ctaText: string;
};

export type InnovationInPackagingData = {
  cards: InnovationCard[];
  exploreMoreLink: string;
};

export type PressReleaseCard = {
  id: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  link: string;
};

export type LatestPressReleaseData = {
  cards: PressReleaseCard[];
};

export type CallToActionData = {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
};

export type NewsletterSubscriptionData = {
  headline: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  backgroundImage: string;
};

// ==================== API Types ====================

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

type HomeMetaApi = {
  banner_items?: BannerItemsApi;
  global_beverage_title?: string;
  global_beverage_description?: string;
  global_beverage_video_url?: string;
  faqs_items?: FaqsItemsApi;
};

type ServiceAutofetchItem = {
  id?: number;
  title?: string;
  slug?: string;
  short_summary_icon?: MediaRef;
  short_summary_image?: MediaRef;
  short_summary_title?: string;
  short_summary_description?: string;
  short_summary_video_url?: string;
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

type LatestInsightApiItem = {
  id?: number;
  title?: string;
  slug?: string;
  featured_image?: MediaRef;
  summary?: string;
  published_at?: string | null;
  category?: string | null;
};

type HomeAutofetchApi = {
  services?: ServiceAutofetchItem[];
  marketing_services?: ServiceAutofetchItem[];
  technical_services?: ServiceAutofetchItem[];
  sustainable_products?: SustainableProductAutofetchItem[];
  sustainabilities?: SustainabilityLinkItem[];
  latest_insights?: LatestInsightApiItem[] | LatestInsightApiItem | null;
};

type HomePageApiResponse = {
  data?: {
    id?: number;
    slug?: string;
    layout?: string;
    title?: string;
    meta?: HomeMetaApi;
    seo?: {
      title?: string | null;
      description?: string | null;
      canonical_url?: string | null;
      schema?: unknown;
    };
    autofetch?: HomeAutofetchApi;
    latest_insights?: LatestInsightApiItem[] | LatestInsightApiItem | null;
  };
};

// ==================== Helpers ====================

const COMPANY_API_BASE_URL = process.env.COMPANY_API_BASE_URL || 'https://backend-lamipak.webtesting.pw/api';
const HOME_AUTOFETCH = 'services,sustainable_products,sustainabilities,latest_insights';
const HOME_REVALIDATE_SECONDS = 300;

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

function slugToHref(slug?: string): string {
  if (!slug) return '/';
  const cleaned = slug.replace(/^\/+|\/+$/g, '');
  return cleaned ? `/${cleaned}/` : '/';
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function inferServiceIconFallback(svc: ServiceAutofetchItem): 'gear' | 'megaphone' {
  const s = `${svc.slug || ''} ${svc.title || ''} ${svc.short_summary_title || ''}`.toLowerCase();
  if (s.includes('technical')) return 'gear';
  return 'megaphone';
}

function commercialServiceSortRank(slug: string): number {
  const s = slug.toLowerCase();
  if (s.includes('technical-support')) return 0;
  if (s.includes('marketing-support')) return 1;
  return 2;
}

function deriveProductLabel(description: string, title: string): string {
  const d = description.trim();
  if (!d) return title;
  const sentence = d.split(/(?<=[.!?])\s+/)[0]?.trim() || d;
  return sentence.length > 100 ? `${sentence.slice(0, 97)}…` : sentence;
}

function formatInsightDate(value?: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  })
    .format(d)
    .toUpperCase();
}

function cleanText(value?: string): string {
  if (!value) return '';
  return decodeBasicEntities(stripHtml(value));
}

function buildInsightsLink(slug?: string | null): string {
  const raw = (slug || '').trim();
  if (!raw) return '/insights/articles';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('/')) return raw;
  if (raw.startsWith('insights/')) return `/${raw}`;
  return `/insights/articles/${raw}`;
}

// ==================== Fallback Data ====================

const FALLBACK_APPROACH: ApproachData = {
  title: 'We engineer the future of <span class="text-[#009FE8]">aseptic packaging.</span>',
  subtitle: 'Answer three questions and discover your optimal packaging system.',
  image: '/approcah_image.jpg',
  imageAlt: 'Professional examining aseptic packaging in laboratory',
  questions: [
    {
      id: '1',
      question: 'What product are you packaging?',
      options: [
        { id: '1-1', label: 'Dairy', value: 'dairy' },
        { id: '1-2', label: 'Juice', value: 'juice' },
        { id: '1-3', label: 'Plant-Based', value: 'plant-based' },
        { id: '1-4', label: 'Liquid Food', value: 'liquid-food' },
        { id: '1-5', label: 'Nutritional', value: 'nutritional' },
        { id: '1-6', label: 'Pharma', value: 'pharma' },
      ],
    },
    {
      id: '2',
      question: 'What production scale?',
      options: [
        { id: '2-1', label: 'Startup', value: 'startup' },
        { id: '2-2', label: 'Regional', value: 'regional' },
        { id: '2-3', label: 'Global Scale', value: 'global-scale' },
        { id: '2-4', label: 'High-Speed Line', value: 'high-speed-line' },
      ],
    },
    {
      id: '3',
      question: 'What is your target market region?',
      options: [
        { id: '3-1', label: 'Asia Pacific', value: 'asia-pacific' },
        { id: '3-2', label: 'Europe', value: 'europe' },
        { id: '3-3', label: 'North America', value: 'north-america' },
        { id: '3-4', label: 'Middle East & Africa', value: 'middle-east-africa' },
        { id: '3-5', label: 'Latin America', value: 'latin-america' },
      ],
    },
  ],
  ctaText: 'DISCOVER YOUR SYSTEM',
  ctaLink: '/solutions',
};

// FALLBACK_INSIGHTS removed: latest insights now mapped from API `latest_insights`.

const FALLBACK_PRESS_RELEASES: LatestPressReleaseData = {
  cards: [
    {
      id: '1',
      category: 'Dairy Systems',
      title: 'Lamipak Showcases Expanded End-to-End Packaging Solutions at Gulfood Manufacturing 2025',
      image: '/latest_press_1.jpg',
      imageAlt: 'Lamipak exhibition booth at Gulfood Manufacturing 2025',
      link: '/',
    },
    {
      id: '2',
      category: 'Dairy Systems',
      title: 'Lamipak Introduces New Fresh Milk Packaging Solutions',
      image: '/latest_press_2.jpg',
      imageAlt: 'Fresh milk packaging solutions',
      link: '/',
    },
    {
      id: '3',
      category: 'Dairy Systems',
      title: 'Lamipak Receives Certificate of Appreciation from PT. Lami Packaging Indonesia',
      image: '/latest_press_3.jpg',
      imageAlt: 'Certificate of appreciation',
      link: '/',
    },
  ],
};

const FALLBACK_CTA: CallToActionData = {
  heading: 'Still Have <span class="text-[#009FE8]">Questions?</span>',
  description: 'Our Lamipak team is ready to walk you through any technical details.',
  ctaText: 'Contact Us',
  ctaLink: '/contact',
};

const FALLBACK_NEWSLETTER: NewsletterSubscriptionData = {
  headline: 'Stay Ahead in Aseptic Engineering.',
  subtitle: 'Get the Latest Insights Delivered to Your Inbox.',
  placeholder: 'Enter your email',
  buttonText: 'SUBSCRIBE',
  backgroundImage: '/newsletter-bg.jpg',
};

// ==================== Mappers ====================

function mapBannerItemsToHero(banner: BannerItemsApi | undefined, videoUrl?: string): Hero | null {
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

    slides.push({
      id: String(banners[i]?.id ?? i + 1),
      category: labels[i]?.trim() || 'LAMIPAK',
      title: formatBoldText(fullTitle),
      description: subtitles[i]?.trim() ?? '',
      ctaText: 'EXPLORE SOLUTIONS',
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
    videoUrl,
  };
}

function mapServiceToCard(svc: ServiceAutofetchItem, icon: 'gear' | 'megaphone'): CommercialServiceCard | null {
  const id = svc.id;
  const slug = svc.slug?.trim();
  if (id == null && !slug) return null;

  const imageUrl = svc.short_summary_image?.url?.trim();
  if (!imageUrl) return null;

  const iconFromApi = svc.short_summary_icon?.url?.trim();

  return {
    id: String(id ?? slug),
    title: formatBoldText((svc.short_summary_title || svc.title || '').trim() || 'Service'),
    description: formatBoldText((svc.short_summary_description || '').trim()),
    image: imageUrl,
    imageAlt: formatBoldText((svc.title || svc.short_summary_title || 'Service').trim()),
    ctaText: 'Read More',
    ctaLink: slugToHref(slug),
    ...(iconFromApi ? { iconUrl: iconFromApi } : {}),
    icon,
  };
}

function mapCommercialServices(autofetch: HomeAutofetchApi | undefined): CommercialServicesData | null {
  const allServices = [
    ...(autofetch?.services || []),
    ...(autofetch?.marketing_services || []),
    ...(autofetch?.technical_services || []),
  ];

  if (!allServices.length) return null;

  const sorted = [...allServices].sort(
    (a, b) => commercialServiceSortRank(a.slug || '') - commercialServiceSortRank(b.slug || ''),
  );

  const cards: CommercialServiceCard[] = [];
  for (const svc of sorted) {
    const c = mapServiceToCard(svc, inferServiceIconFallback(svc));
    if (c) cards.push(c);
  }

  return cards.length ? { cards } : null;
}

function mapSustainableProducts(items: SustainableProductAutofetchItem[] | undefined): SustainabilityProductCard[] {
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
        title: formatBoldText(title),
        label: deriveProductLabel(description, title),
        description: formatBoldText(description),
        image,
        imageAlt: formatBoldText(title),
        link: slugToHref(slug),
        ctaText: 'Read More',
      };
    })
    .filter(Boolean) as SustainabilityProductCard[];
}

function mapSustainabilityWorkCards(items: SustainabilityLinkItem[] | undefined): SustainabilityWorkCard[] | null {
  if (!items?.length) return null;

  return items.map((item, index) => {
    const slug = item.slug?.trim() || '';
    const title = (item.title || '').trim();
    const apiImage = item.short_summary_image?.url?.trim();
    const apiDescription = (item.short_summary_description || '').trim();

    if (!title || !apiImage) return null;

    return {
      id: String(item.id ?? index + 1),
      title: formatBoldText(title),
      description: formatBoldText(apiDescription),
      image: apiImage,
      imageAlt: formatBoldText(title),
      link: slugToHref(slug),
      ctaText: 'Learn More',
    };
  }).filter(Boolean) as SustainabilityWorkCard[];
}

function mapFaqs(faqs: FaqsItemsApi | undefined): FAQItem[] | null {
  const titles = faqs?.title ?? [];
  const descriptions = faqs?.description ?? [];
  if (!titles.length && !descriptions.length) return null;

  const n = Math.max(titles.length, descriptions.length);
  const out: FAQItem[] = [];

  for (let i = 0; i < n; i++) {
    const question = formatBoldText((titles[i] || '').trim());
    const answer = formatBoldText(faqAnswerFromHtml(descriptions[i] || ''));
    if (!question && !answer) continue;
    out.push({
      id: String(i + 1),
      question: question || `Question ${i + 1}`,
      answer: answer || '',
    });
  }

  return out.length ? out : null;
}

function mapLatestInsights(items: LatestInsightApiItem[] | LatestInsightApiItem | null | undefined): LatestInsightsData | null {
  const list = toArray(items);
  if (!list.length) return null;

  const cards = list
    .map((item, idx) => {
      const id = item.id ?? idx + 1;
      const title = cleanText(item.title);
      const image = item.featured_image?.url?.trim();
      const slug = item.slug?.trim();
      if (!title || !image || !slug) return null;

      const category = cleanText(item.category || '') || 'INSIGHTS';
      const date = formatInsightDate(item.published_at);

      return {
        id: String(id),
        title,
        category,
        date,
        image,
        imageAlt: title,
        link: buildInsightsLink(slug),
      } as InsightCard;
    })
    .filter(Boolean) as InsightCard[];

  return cards.length ? { cards } : null;
}

function mapVideoBanner(meta: HomeMetaApi | undefined): VideoBannerData | null {
  if (!meta?.global_beverage_video_url?.trim()) return null;

  const videoUrl = sanitizeYoutubeWatchUrl(meta.global_beverage_video_url);
  const preTitle = formatBoldText(meta.global_beverage_title?.trim() || '');
  const preDescription = formatBoldText(meta.global_beverage_description?.trim() || '');

  return {
    title: '',
    preTitle,
    preDescription,
    videoUrl,
    ctaText: 'View how we help global brands',
    ctaLink: '/about-us',
  };
}

// ==================== Main Fetch ====================

export const fetchHomepageData = cache(async (): Promise<HomepageData | null> => {
  try {
    const url = buildApiUrl(
      `/v1/page/home?autofetch=${encodeURIComponent(HOME_AUTOFETCH)}`,
    );
    const response = await fetch(url, { next: { revalidate: HOME_REVALIDATE_SECONDS } });

    if (!response.ok) return null;

    const payload = (await response.json()) as HomePageApiResponse;
    const data = payload.data;
    if (!data || data.layout !== 'home') return null;

    const meta = data.meta;
    const autofetch = data.autofetch ?? {};

    const heroMapped = meta?.banner_items
      ? mapBannerItemsToHero(meta.banner_items)
      : null;

    const videoMapped = mapVideoBanner(meta);

    const commercialMapped = mapCommercialServices(autofetch);

    const products = mapSustainableProducts(autofetch.sustainable_products);
    const productMapped: ProductSustainabilityData | null =
      products.length > 0 ? { products } : null;

    const workCards = mapSustainabilityWorkCards(autofetch.sustainabilities);
    const workMapped: WorkInSustainabilityData | null =
      workCards && workCards.length > 0 ? { cards: workCards } : null;

    const faqItems = mapFaqs(meta?.faqs_items);
    const faqMapped: FAQData | null = faqItems ? { items: faqItems } : null;

    const latestInsightsMapped = mapLatestInsights(
      autofetch.latest_insights ?? data.latest_insights,
    );

    const seoMerged = data.seo?.title || data.seo?.description
      ? {
          meta_title: data.seo?.title ?? '',
          meta_description: data.seo?.description ?? '',
          canonical_url: data.seo?.canonical_url ?? '/',
          schema: data.seo?.schema,
        }
      : undefined;

    return {
      hero: heroMapped ?? { slides: [], categories: [] },
      videoBanner: videoMapped ?? { title: '', preTitle: '', ctaText: '', ctaLink: '/' },
      commercialServices: commercialMapped ?? { cards: [] },
      productSustainability: productMapped ?? { products: [] },
      workInSustainability: workMapped ?? { cards: [] },
      faq: faqMapped ?? { items: [] },
      latestPressRelease: FALLBACK_PRESS_RELEASES,
      latestInsights: latestInsightsMapped ?? { cards: [] },
      approach: FALLBACK_APPROACH,
      innovationInPackaging: { cards: [], exploreMoreLink: '/' },
      callToAction: FALLBACK_CTA,
      newsletterSubscription: FALLBACK_NEWSLETTER,
      seo: seoMerged,
    };
  } catch {
    return null;
  }
});
