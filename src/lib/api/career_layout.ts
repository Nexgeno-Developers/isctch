export interface CareerJob {
  id: string;
  slug: string;
  title: string;
  department: string;
  function?: string;
  region?: string;
  location: string;
  jobType: string;
  experienceLevel?: string;
  postedDate: string;
  postedAgo?: string;
  salary?: string;
  shortDescription: string;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  applyEmail?: string;
  applyLinkedInUrl?: string;
}

export interface CareerLandingPageData {
  title: string;
  heroTitle: string;
  heroBackgroundImage?: string;
  heroSplit?: {
    heading: string;
    /** Rich HTML from CMS (preferred when `hero_description` contains tags). */
    bodyHtml?: string;
    paragraphs: string[];
    emphasis: string;
    ctaText: string;
    ctaLink: string;
    mediaImage: string;
    mediaAlt: string;
    mediaLink?: string;
  };
  leadershipMessage?: {
    image: string;
    imageAlt: string;
    name: string;
    role: string;
    heading: string;
    bodyHtml?: string;
    paragraphs: string[];
  };
  verticalFeatures?: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
  verticalFeaturesHeader?: {
    heading: string;
    description: string;
  };
  expertsSection?: {
    heading: string;
    headingSuffix: string;
    description: string;
    videos: Array<{
      id: string;
      thumbnail: string;
      thumbnailAlt: string;
      videoUrl: string;
    }>;
  };
  connectSection?: {
    heading: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
  jobsSection?: {
    notice: string;
    heading: string;
    headingSuffix?: string;
    socialApplyLinks?: {
      instagram?: string;
      linkedin?: string;
      facebook?: string;
    };
  };
  jobs: CareerJob[];
  seo: Record<string, unknown>;
}

type CareerApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      breadcrumb_image?: { id?: number; filename?: string; url?: string };
      hero_title?: string;
      hero_description?: string;
      hero_video_url?: string;
      hero_navigation_link?: string;
      apply_title?: string;
      apply_linkedin_url?: string;
      hr_title?: string;
      hr_description?: string;
      hr_photo?: { id?: number; filename?: string; url?: string };
      hr_name?: string;
      hr_designation?: string;
      values_title?: string;
      values_subtitle?: string;
      values_items?: {
        itration?: string[];
        title?: string[];
        image?: Array<{ id?: number; filename?: string; url?: string }>;
        description?: string[];
      };
      solution_title?: string;
      solution_subtitle?: string;
      solution_items?: {
        itration?: string[];
        video_url?: string[];
      };
    };
    seo?: Record<string, unknown>;
  };
};

import { formatBoldText } from '@/lib/htmlText';

function stripHtml(value?: string | null): string {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function splitParagraphs(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n\s*\r?\n|\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function getYouTubeThumbnail(url: string): string {
  const match = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/.exec(url);
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return '/about_banner.jpg';
}

function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/i.test(url);
}

function heroMediaPoster(rawVideoUrl: string | undefined, fallback?: string): string {
  if (!rawVideoUrl) return fallback || '/about_banner.jpg';
  if (isYouTubeUrl(rawVideoUrl)) return getYouTubeThumbnail(rawVideoUrl);
  return fallback || '/about_banner.jpg';
}

function toEmbedUrl(url: string): string {
  const ytMatch = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/.exec(url);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  const vimeoMatch = /vimeo\.com\/(\d+)/.exec(url);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
}

export async function fetchCareerLayoutPage(slug: string): Promise<{
  slug: string;
  title: string;
  seo: Record<string, unknown>;
  pageData: CareerLandingPageData;
} | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as CareerApiResponse;
    if (!data || data.layout !== 'career' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;

    const heroDescriptionRaw = meta.hero_description?.trim() || '';
    const heroDescriptionIsHtml = /<[^>]+>/.test(heroDescriptionRaw);
    const heroDescriptionParagraphs = heroDescriptionIsHtml
      ? []
      : splitParagraphs(meta.hero_description);
    const heroHeading = meta.hero_title || 'Build Your International Career At LamiPak';

    const embedVideoUrl = meta.hero_video_url ? toEmbedUrl(meta.hero_video_url) : undefined;
    const breadcrumbUrl = meta.breadcrumb_image?.url;
    const heroPoster = meta.hero_video_url
      ? heroMediaPoster(meta.hero_video_url, breadcrumbUrl)
      : undefined;

    const heroSplit = meta.hero_title
      ? {
          heading: formatBoldText(heroHeading),
          bodyHtml: heroDescriptionIsHtml ? heroDescriptionRaw : undefined,
          paragraphs: heroDescriptionParagraphs.map((p) => formatBoldText(p.trim())),
          emphasis: heroDescriptionIsHtml
            ? ''
            : formatBoldText(heroDescriptionParagraphs[0] || ''),
          ctaText: formatBoldText('Explore More'),
          ctaLink: meta.hero_navigation_link || '/',
          mediaImage: heroPoster || breadcrumbUrl || '/about_banner.jpg',
          mediaAlt: formatBoldText(heroHeading),
          mediaLink: embedVideoUrl,
        }
      : undefined;

    const hrDescriptionRaw = meta.hr_description?.trim() || '';
    const hrDescriptionIsHtml = /<[^>]+>/.test(hrDescriptionRaw);
    const hrDescriptionParagraphs = hrDescriptionIsHtml ? [] : splitParagraphs(meta.hr_description);

    const leadershipMessage =
      meta.hr_title || meta.hr_description
        ? {
            image: meta.hr_photo?.url || '/about_banner.jpg',
            imageAlt: formatBoldText(meta.hr_name || 'Leadership'),
            name: formatBoldText(meta.hr_name || ''),
            role: formatBoldText(meta.hr_designation || ''),
            heading: formatBoldText(meta.hr_title || 'Brings Life To Packaging'),
            bodyHtml: hrDescriptionIsHtml ? hrDescriptionRaw : undefined,
            paragraphs: hrDescriptionParagraphs.length
              ? hrDescriptionParagraphs.map(formatBoldText)
              : hrDescriptionIsHtml
                ? []
                : [formatBoldText(stripHtml(meta.hr_description))],
          }
        : undefined;

    const valuesItems = meta.values_items;
    const valuesTitles = valuesItems?.title || [];
    const valuesImages = valuesItems?.image || [];
    const valuesDescriptions = valuesItems?.description || [];

    const verticalFeatures = valuesTitles.map((title, idx) => ({
      id: `value-${idx}`,
      title: formatBoldText(title),
      description: formatBoldText(valuesDescriptions[idx] || ''),
      image: valuesImages[idx]?.url || '/about_banner.jpg',
      imageAlt: formatBoldText(title),
    }));

    const verticalFeaturesHeader =
      meta.values_title || meta.values_subtitle
        ? {
            heading: formatBoldText(meta.values_title || 'Company Value Presentation'),
            description: formatBoldText(meta.values_subtitle || ''),
          }
        : undefined;

    const solutionItems = meta.solution_items;
    const solutionVideoUrls = solutionItems?.video_url || [];

    const expertsSection =
      meta.solution_title || solutionVideoUrls.length
        ? {
            heading: formatBoldText(meta.solution_title || "Behind Every Solutions, There's A Team Of Experts Driving Innovation"),
            headingSuffix: '',
            description: formatBoldText(meta.solution_subtitle || ''),
            videos: solutionVideoUrls.map((url, idx) => ({
              id: `video-${idx}`,
              thumbnail: getYouTubeThumbnail(url),
              thumbnailAlt: formatBoldText(`Expert video ${idx + 1}`),
              videoUrl: toEmbedUrl(url),
            })),
          }
        : undefined;

    const jobsSection = meta.apply_title
      ? {
          notice: '',
          heading: formatBoldText('Open Positions & Early Career Opportunities'),
          socialApplyLinks: meta.apply_linkedin_url
            ? { linkedin: meta.apply_linkedin_url }
            : undefined,
        }
      : undefined;

    const pageData: CareerLandingPageData = {
      title: formatBoldText(data.title),
      heroTitle: formatBoldText(heroHeading),
      heroBackgroundImage: meta.breadcrumb_image?.url || '/about_banner.jpg',
      heroSplit,
      leadershipMessage,
      verticalFeatures: verticalFeatures.length ? verticalFeatures : undefined,
      verticalFeaturesHeader,
      expertsSection,
      jobsSection,
      jobs: [],
      seo,
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
