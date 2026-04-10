import type { CompanyHero, CompanyStatistic, JourneyData } from '@/fake-api/company';
import { normalizeText, formatBoldText } from '@/lib/htmlText';
import { mapPageBlocksToNavigation, type AboutUsPageBlock } from '@/lib/api/about_us_navigation';
import type { CompanyNavigationData } from '@/components/company/CompanyNavigation';

type Media = { url?: string | null } | null | undefined;

type AboutUsLayout1ApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      business_statistics_items?: string | StatsJson;
      journey_items?: string | JourneyJson;
      video_url?: string;
      page_blocks?: AboutUsPageBlock[];
    };
    seo?: Record<string, unknown>;
  };
};

export type AboutUsLayout1PageData = {
  hero: CompanyHero;
  statistics: CompanyStatistic[];
  journey: JourneyData;
  videoUrl?: string;
  navigation?: CompanyNavigationData | null;
};

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function stripHtml(value?: string) {
  if (!value) return '';
  return normalizeText(value.replace(/<[^>]+>/g, ' '));
}

function safeParseJson<T>(input?: string): T | null {
  if (!input) return null;
  try {
    return JSON.parse(input) as T;
  } catch {
    return null;
  }
}

type StatsJson = {
  icon?: Array<string | { url?: string | null } | null>;
  value?: string[];
  title?: string[];
};

type JourneyJson = {
  year?: string[];
  title?: string[];
  image?: Array<string | { url?: string | null } | null>;
};

function normalizeMaybeJson<T extends object>(
  input: string | T | undefined,
  parser: (raw: string) => T | null,
): T | null {
  if (!input) return null;
  if (typeof input === 'string') return parser(input);
  return input;
}

function mediaOrStringUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') {
    const s = value.trim();
    if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;
    return undefined;
  }
  if (typeof value === 'object') {
    const url = (value as { url?: unknown }).url;
    if (typeof url === 'string') {
      const s = url.trim();
      return s ? s : undefined;
    }
  }
  return undefined;
}

export async function fetchAboutUsLayout1Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as AboutUsLayout1ApiResponse;
    if (!data || data.layout !== 'about_1') return null;

    const meta = data.meta || {};
    const hero: CompanyHero = {
      title: data.title,
      backgroundImage: meta.breadcrumb_image?.url || '',
    };

    const statsJson = normalizeMaybeJson(meta.business_statistics_items, (raw) =>
      safeParseJson<StatsJson>(raw),
    );
    const values = statsJson?.value || [];
    const titles = statsJson?.title || [];
    const icons = statsJson?.icon || [];

    const statistics: CompanyStatistic[] = titles
      .map((label, idx) => {
        const cleanLabel = formatBoldText((label || '').trim());
        const value = formatBoldText((values[idx] || '').trim());
        if (!cleanLabel || !value) return null;
        return {
          id: `s-${idx}`,
          icon: mediaOrStringUrl(icons[idx]) || '',
          value,
          label: cleanLabel,
        };
      })
      .filter(Boolean) as CompanyStatistic[];

    const journeyJson = normalizeMaybeJson(meta.journey_items, (raw) =>
      safeParseJson<JourneyJson>(raw),
    );
    const years = journeyJson?.year || [];
    const captions = journeyJson?.title || [];
    const images = journeyJson?.image || [];

    const journey: JourneyData = {
      title: '<span class="text-[#009FE8]">LamiPak</span> Journey',
      milestones: years
        .map((year, idx) => {
          const y = (year || '').trim();
          if (!y) return null;
          const caption = formatBoldText((captions[idx] || '').trim() || y);
          const image = mediaOrStringUrl(images[idx]);
          return image
            ? {
                year: y,
                image,
                imageAlt: caption,
                caption,
              }
            : null;
        })
        .filter(Boolean) as JourneyData['milestones'],
    };

    const page: AboutUsLayout1PageData = {
      hero,
      statistics,
      journey,
      videoUrl: meta.video_url?.trim() || undefined,
      navigation: mapPageBlocksToNavigation(meta.page_blocks),
    };

    return {
      slug: data.slug,
      title: data.title,
      seo: (data.seo || {}) as any,
      page,
      summary: stripHtml(data.title),
    };
  } catch {
    return null;
  }
}

