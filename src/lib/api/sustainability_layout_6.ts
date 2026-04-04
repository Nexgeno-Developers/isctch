import { formatBoldText } from '@/lib/htmlText';

export type CarbonNetZeroRoadmapPageData = {
  title: string;
  heroBackgroundImage?: string;
  carbonNetZeroRoadmapSection?: CarbonNetZeroRoadmapSectionData;
  carbonNetZeroPillarsSection?: CarbonNetZeroPillarsSectionData;
};

export type CarbonNetZeroRoadmapSectionData = {
  heading: string;
  milestones: Array<{
    id: string;
    year: string;
    title: string;
    iconImageUrl?: string;
    icon?: 'target' | 'trend' | 'leaf';
    bullets?: string[];
    descriptionHtml?: string;
  }>;
  summaryBarText: string;
  summaryBarUrl?: string;
  accentColor?: string;
  iconCircleBackground?: string;
  connectorLineColor?: string;
  sectionBackgroundColor?: string;
  summaryBarBackground?: string;
};

export type CarbonNetZeroPillarsSectionData = {
  heading: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    iconImageUrl?: string;
    icon?:
      | 'carbon_verification'
      | 'efficiency_innovation'
      | 'renewable_electricity'
      | 'supply_chain'
      | 'rd_innovation'
      | 'cdp_leadership';
  }>;
  accentColor?: string;
  cardBackgroundColor?: string;
  sectionBackgroundColor?: string;
};

type MediaRef = { id?: number; filename?: string; url?: string };

type RepeaterBlock = {
  itration?: string[];
  icon?: Array<string | MediaRef>;
  title?: string[];
  year?: string[];
  description?: string[];
};

type Sustainability6ApiResponse = {
  data?: {
    id?: number;
    slug: string;
    language?: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    company_id?: number;
    meta?: {
      breadcrumb_image?: MediaRef;
      path_title?: string;
      path_items?: string | RepeaterBlock;
      sustainability_section_title?: string;
      sustainability_section_items?: string | RepeaterBlock;
      Net_Zero_Target_text?: string;
      Net_Zero_Target_url?: string;
      short_summary_image?: MediaRef;
      short_summary_description?: string;
    };
    seo?: Record<string, unknown>;
  };
};

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function safeJsonParse<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function parseRepeaterBlock(raw: string | RepeaterBlock | undefined): RepeaterBlock | null {
  if (raw == null) return null;
  if (typeof raw === 'object') return raw;
  if (typeof raw === 'string') return safeJsonParse<RepeaterBlock>(raw);
  return null;
}

function iconEntryUrl(entry: string | MediaRef | undefined): string | undefined {
  if (!entry) return undefined;
  if (typeof entry === 'string') return entry.trim() || undefined;
  return entry.url?.trim() || undefined;
}

function normalizePageTitle(title: string): string {
  return title
    .replace(/\u2028|\u2029/g, ' ')
    .replace(/\r\n|\n|\r/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractBulletsFromHtml(html: string): string[] {
  const items = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  if (!items) return [];
  return items
    .map((li) => li.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function hasHtmlTags(s: string): boolean {
  return /<[^>]+>/.test(s);
}

const ROADMAP_ICONS: Array<'target' | 'trend' | 'leaf'> = ['target', 'trend', 'leaf'];

const PILLAR_ICONS: CarbonNetZeroPillarsSectionData['items'][number]['icon'][] = [
  'carbon_verification',
  'efficiency_innovation',
  'renewable_electricity',
  'supply_chain',
  'rd_innovation',
  'cdp_leadership',
];

export async function fetchSustainabilityLayout6Page(slug: string): Promise<{
  slug: string;
  title: string;
  seo: Record<string, unknown>;
  pageData: CarbonNetZeroRoadmapPageData;
} | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as Sustainability6ApiResponse;
    if (!data || data.layout !== 'sustainability_6' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;

    const pathItems = parseRepeaterBlock(meta.path_items);
    const pathYears = pathItems?.year || [];
    const pathTitles = pathItems?.title || [];
    const pathDescriptions = pathItems?.description || [];
    const pathIcons = pathItems?.icon || [];

    const milestones = pathYears.map((year, idx) => {
      const desc = pathDescriptions[idx] || '';
      const iconImageUrl = iconEntryUrl(pathIcons[idx]);
      const html = hasHtmlTags(desc);

      const bulletsPlain = (() => {
        if (!desc.trim()) return [];
        const fromLi = extractBulletsFromHtml(desc);
        return fromLi.length ? fromLi : [desc.trim()];
      })();

      return {
        id: `m-${year}-${idx}`,
        year,
        title: formatBoldText(pathTitles[idx] || ''),
        iconImageUrl,
        icon: (ROADMAP_ICONS[idx] ?? 'target') as 'target' | 'trend' | 'leaf',
        descriptionHtml: html ? desc : undefined,
        bullets: html ? undefined : bulletsPlain,
      };
    });

    const roadmapSection: CarbonNetZeroRoadmapSectionData | undefined = milestones.length
      ? {
          heading: formatBoldText(meta.path_title || data.title),
          milestones,
          summaryBarText: formatBoldText(meta.Net_Zero_Target_text || ''),
          summaryBarUrl: meta.Net_Zero_Target_url,
          accentColor: '#00AEEF',
          iconCircleBackground: '#e8ecef',
          connectorLineColor: '#d1d5db',
          sectionBackgroundColor: '#f5f6f8',
          summaryBarBackground: '#00AEEF',
        }
      : undefined;

    const pillarItems = parseRepeaterBlock(meta.sustainability_section_items);
    const pillarTitles = pillarItems?.title || [];
    const pillarDescriptions = pillarItems?.description || [];
    const pillarIcons = pillarItems?.icon || [];

    const pillars = pillarTitles.map((title, idx) => ({
      id: `pillar-${idx}`,
      title: formatBoldText(title),
      description: pillarDescriptions[idx] || '',
      iconImageUrl: iconEntryUrl(pillarIcons[idx]),
      icon: (PILLAR_ICONS[idx] ?? 'carbon_verification') as (typeof PILLAR_ICONS)[number],
    }));

    const pillarsSection: CarbonNetZeroPillarsSectionData | undefined = pillars.length
      ? {
          heading: formatBoldText(meta.sustainability_section_title || data.title),
          items: pillars,
          accentColor: '#00AEEF',
          cardBackgroundColor: '#f2f4f6',
          sectionBackgroundColor: '#ffffff',
        }
      : undefined;

    const pageData: CarbonNetZeroRoadmapPageData = {
      title: normalizePageTitle(data.title),
      heroBackgroundImage: meta.breadcrumb_image?.url,
      carbonNetZeroRoadmapSection: roadmapSection,
      carbonNetZeroPillarsSection: pillarsSection,
    };

    return { slug: data.slug, title: normalizePageTitle(data.title), seo, pageData };
  } catch {
    return null;
  }
}
