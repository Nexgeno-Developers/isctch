type Media = { url?: string | null } | null | undefined;

type TechnicalServiceDetailApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_video_url?: string;
      short_summary_title?: string;
      short_summary_description?: string;
      hero_title?: string;
      hero_image?: Media;
      hero_description?: string;
      information_items?: {
        image?: Array<Media> | Media;
        title?: Array<string> | string;
        description?: Array<string> | string;
      };
      video_url?: string;
      operational_title?: string;
      page_blocks?:
        | {
            id?: number;
            title?: string;
            slug?: string;
            short_summary_icon?: Media;
            short_summary_image?: Media;
            short_summary_title?: string;
            short_summary_description?: string;
          }
        | Array<{
            id?: number;
            title?: string;
            slug?: string;
            short_summary_icon?: Media;
            short_summary_image?: Media;
            short_summary_title?: string;
            short_summary_description?: string;
          }>;
    };
    seo?: Record<string, unknown>;
  };
};

export type TechnicalServiceDetailPageData = {
  title: string;
  heroBackgroundImage?: string;
  breadcrumbParentLabel: string;
  breadcrumbParentHref: string;
  introImage?: string;
  introImageAlt?: string;
  introDescription?: string;
  introDescriptionHtml?: string;
  detailedFeatures: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
  videoUrl?: string;
  operationalTitle?: string;
  operationalBlocks: Array<{
    id: string;
    title: string;
    description: string;
    /** Hero image (`short_summary_image`, or `short_summary_icon` if no photo). */
    image?: string;
    /** Shown beside title when both image and icon exist (`short_summary_icon` + `short_summary_image`). */
    iconUrl?: string;
    imageAlt?: string;
    href: string;
  }>;
  connectSection: {
    heading: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
};

import { formatBoldText } from '@/lib/htmlText';

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function slugCandidates(slug: string) {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const last = clean.split('/').filter(Boolean).pop();
  return Array.from(new Set([clean, last].filter(Boolean) as string[]));
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function stripHtml(value?: string) {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function slugToHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, '');
  return s ? `/${s}/` : '/';
}

export async function fetchTechnicalServiceDetailLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (!res.ok) continue;

      const { data } = (await res.json()) as TechnicalServiceDetailApiResponse;
      const layout = data?.layout?.trim?.() || data?.layout;
      if (!data || !layout || !layout.toString().startsWith('technical_service_detail')) continue;

      const meta = data.meta || {};
      const heroBg = mediaUrl(meta.breadcrumb_image) || undefined;
      const title = (meta.hero_title || meta.short_summary_title || data.title || '').trim() || data.title;

      const infoImages = toArray(meta.information_items?.image);
      const infoTitles = toArray(meta.information_items?.title);
      const infoDescs = toArray(meta.information_items?.description);
      const detailedFeatures = infoTitles
        .map((t, idx) => {
          const image = mediaUrl(infoImages[idx]) || '';
          const title = asString(t).trim();
          if (!title || !image) return null;
          return {
            id: `f-${idx}`,
            title: formatBoldText(title),
            description: formatBoldText(asString(infoDescs[idx]).trim()),
            image,
            imageAlt: formatBoldText(title),
          };
        })
        .filter(Boolean) as TechnicalServiceDetailPageData['detailedFeatures'];

      const blocks = toArray(meta.page_blocks)
        .map((block, idx) => {
          if (!block || typeof block !== 'object') return null;
          const typed = block as {
            id?: number;
            title?: string;
            slug?: string;
            short_summary_icon?: Media;
            short_summary_image?: Media;
            short_summary_title?: string;
            short_summary_description?: string;
          };
          const title = asString(typed.short_summary_title || typed.title).trim();
          const href = typed.slug ? slugToHref(typed.slug) : '';
          if (!title || !href) return null;
          const cover = mediaUrl(typed.short_summary_image);
          const icon = mediaUrl(typed.short_summary_icon);
          const cardImage = cover || icon;
          const iconForRow = cover && icon ? icon : undefined;
          return {
            id: String(typed.id ?? `b-${idx}`),
            title: formatBoldText(title),
            description: formatBoldText(stripHtml(typed.short_summary_description) || ''),
            image: cardImage,
            iconUrl: iconForRow,
            imageAlt: formatBoldText(title),
            href,
          };
        })
        .filter(Boolean) as TechnicalServiceDetailPageData['operationalBlocks'];

      const page: TechnicalServiceDetailPageData = {
        title: formatBoldText(title),
        heroBackgroundImage: heroBg,
        breadcrumbParentLabel: formatBoldText('Technical Services'),
        breadcrumbParentHref: '/technical-support-services',
        introImage: mediaUrl(meta.hero_image),
        introImageAlt: formatBoldText(title),
        introDescription: formatBoldText(stripHtml(meta.hero_description) || stripHtml(meta.short_summary_description) || ''),
        introDescriptionHtml: meta.hero_description || undefined,
        detailedFeatures,
        videoUrl: meta.video_url?.trim() || meta.short_summary_video_url?.trim() || undefined,
        operationalTitle: formatBoldText(meta.operational_title || '') || undefined,
        operationalBlocks: blocks,
        connectSection: {
          heading: formatBoldText('Connect with Our Technical Experts'),
          formTitle: formatBoldText('Send Us A Message'),
          illustrationImage: '/collaborating_together.webp',
          illustrationAlt: formatBoldText('Connect with Technical Experts'),
        },
      };

      return {
        slug: data.slug,
        title: data.title,
        seo: (data.seo || {}) as any,
        page,
        summary: stripHtml(meta.hero_description || data.content || ''),
      };
    } catch {
      continue;
    }
  }

  return null;
}

