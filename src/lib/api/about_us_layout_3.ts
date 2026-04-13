import type { OurValuesSection, VisionMissionSection } from '@/fake-api/company';
import { normalizeText, formatBoldText } from '@/lib/htmlText';
import { mapPageBlocksToNavigation, type AboutUsPageBlock } from '@/lib/api/about_us_navigation';
import type { CompanyNavigationData } from '@/components/company/CompanyNavigation';

type Media = { url?: string | null } | null | undefined;

type AboutUsLayout3ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      vision_mission_title?: string;
      vision_mission_image?: Media;
      vision_mission_description?: string;
      vision_mission_vision?: string;
      vision_mission_mission?: string;
      values_title?: string;
      values_subtitle?: string;
      values_items?: {
        title?: string[];
        image?: Array<Media>;
        description?: string[];
      };
      page_blocks?: AboutUsPageBlock[];
    };
    seo?: Record<string, unknown>;
  };
};

export type AboutUsLayout3PageData = {
  title: string;
  heroBackgroundImage?: string;
  visionMission: VisionMissionSection;
  ourValues: OurValuesSection;
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

function mediaUrl(media?: Media): string | undefined {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

export async function fetchAboutUsLayout3Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as AboutUsLayout3ApiResponse;
    if (!data || data.layout !== 'about_3') return null;

    const meta = data.meta || {};

    const visionMission: VisionMissionSection = {
      backgroundImage: mediaUrl(meta.vision_mission_image) || '',
      backgroundImageAlt: meta.vision_mission_title || data.title,
      tagline: formatBoldText(meta.vision_mission_title || data.title),
      description: formatBoldText(meta.vision_mission_description || ''),
      vision: {
        icon: 'vision',
        heading: 'Vision',
        text: formatBoldText(meta.vision_mission_vision || ''),
      },
      mission: {
        icon: 'mission',
        heading: 'Mission',
        text: formatBoldText(meta.vision_mission_mission || ''),
      },
    };

    const valueTitles = meta.values_items?.title || [];
    const valueImages = meta.values_items?.image || [];
    const valueDescs = meta.values_items?.description || [];

    const ourValues: OurValuesSection = {
      heading: formatBoldText(meta.values_title || 'OUR VALUES'),
      description: formatBoldText(meta.values_subtitle || ''),
      values: valueTitles
        .map((title, idx) => {
          const t = formatBoldText((title || '').trim());
          const image = mediaUrl(valueImages[idx]) || '';
          if (!t || !image) return null;
          return {
            id: `v-${idx}`,
            title: t,
            image,
            imageAlt: t,
            caption: formatBoldText((valueDescs[idx] || '').trim()),
          };
        })
        .filter(Boolean) as OurValuesSection['values'],
    };

    const page: AboutUsLayout3PageData = {
      title: formatBoldText(data.title),
      heroBackgroundImage: meta.breadcrumb_image?.url || undefined,
      visionMission,
      ourValues,
      navigation: mapPageBlocksToNavigation(meta.page_blocks),
    };

    return {
      slug: data.slug,
      title: formatBoldText(data.title),
      seo: (data.seo || {}) as any,
      page,
      summary: stripHtml(data.content || data.title),
    };
  } catch {
    return null;
  }
}

