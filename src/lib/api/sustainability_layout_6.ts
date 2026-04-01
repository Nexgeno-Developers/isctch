export interface CarbonNetZeroRoadmapPageData {
  title: string;
  heroBackgroundImage: string;
  carbonNetZeroRoadmapSection?: CarbonNetZeroRoadmapSectionData;
  carbonNetZeroPillarsSection?: CarbonNetZeroPillarsSectionData;
}

export interface CarbonNetZeroRoadmapSectionData {
  headingBlack: string;
  headingBlue: string;
  milestones: Array<{
    id: string;
    year: string;
    title: string;
    icon: 'target' | 'trend' | 'leaf';
    bullets: string[];
  }>;
  summaryBarText: string;
  summaryBarUrl?: string;
  accentColor?: string;
  iconCircleBackground?: string;
  connectorLineColor?: string;
  sectionBackgroundColor?: string;
  summaryBarBackground?: string;
}

export interface CarbonNetZeroPillarsSectionData {
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon:
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
}

type Sustainability6ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      breadcrumb_image?: { id?: number; filename?: string; url?: string };
      path_title?: string;
      path_items?: string;
      sustainability_section_title?: string;
      sustainability_section_items?: string;
      Net_Zero_Target_text?: string;
      Net_Zero_Target_url?: string;
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

function extractBulletsFromHtml(html: string): string[] {
  const items = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  if (!items) return [];
  return items
    .map((li) => li.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function splitHeading(title: string): { first: string; rest: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) return { first: title.trim(), rest: '' };
  return { first: parts[0], rest: parts.slice(1).join(' ') };
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

    const pathHeading = splitHeading(meta.path_title || 'Path To Carbon Neutrality');

    const pathItems = safeJsonParse<{
      itration?: string[];
      icon?: string[];
      title?: string[];
      year?: string[];
      description?: string[];
    }>(meta.path_items);

    const pathYears = pathItems?.year || [];
    const pathTitles = pathItems?.title || [];
    const pathDescriptions = pathItems?.description || [];

    const milestones = pathYears.map((year, idx) => ({
      id: `m-${year}`,
      year,
      title: pathTitles[idx] || '',
      icon: ROADMAP_ICONS[idx] || 'target' as const,
      bullets: extractBulletsFromHtml(pathDescriptions[idx] || ''),
    }));

    const roadmapSection: CarbonNetZeroRoadmapSectionData = {
      headingBlack: pathHeading.first,
      headingBlue: pathHeading.rest,
      milestones,
      summaryBarText: meta.Net_Zero_Target_text || '2050 NET ZERO ACROSS THE VALUE CHAIN',
      summaryBarUrl: meta.Net_Zero_Target_url,
      accentColor: '#00AEEF',
      iconCircleBackground: '#e8ecef',
      connectorLineColor: '#d1d5db',
      sectionBackgroundColor: '#f5f6f8',
      summaryBarBackground: '#00AEEF',
    };

    const pillarHeading = splitHeading(
      meta.sustainability_section_title || 'Key Sustainability Pillar',
    );

    const pillarItems = safeJsonParse<{
      itration?: string[];
      icon?: string[];
      title?: string[];
      description?: string[];
    }>(meta.sustainability_section_items);

    const pillarTitles = pillarItems?.title || [];
    const pillarDescriptions = pillarItems?.description || [];

    const pillars = pillarTitles.map((title, idx) => ({
      id: `pillar-${idx}`,
      title,
      description: pillarDescriptions[idx] || '',
      icon: PILLAR_ICONS[idx] || 'carbon_verification' as const,
    }));

    const pillarsSection: CarbonNetZeroPillarsSectionData | undefined = pillars.length
      ? {
          headingPrefix: pillarHeading.first,
          headingHighlight: pillarHeading.rest,
          headingSuffix: '',
          items: pillars,
          accentColor: '#00AEEF',
          cardBackgroundColor: '#f2f4f6',
          sectionBackgroundColor: '#ffffff',
        }
      : undefined;

    const breadcrumbImage = meta.breadcrumb_image?.url || '/pick_cartoon_banner.webp';

    const pageData: CarbonNetZeroRoadmapPageData = {
      title: data.title,
      heroBackgroundImage: breadcrumbImage,
      carbonNetZeroRoadmapSection: roadmapSection,
      carbonNetZeroPillarsSection: pillarsSection,
    };

    return {
      slug: data.slug,
      title: data.title,
      seo,
      pageData,
    };
  } catch {
    return null;
  }
}
