import type { AboutUsQuadrantSection } from '@/fake-api/company';
import { decodeHtmlEntities, normalizeText, formatBoldText } from '@/lib/htmlText';
import { mapPageBlocksToNavigation, type AboutUsPageBlock } from '@/lib/api/about_us_navigation';
import type { CompanyNavigationData } from '@/components/company/CompanyNavigation';

type Media = { url?: string | null } | null | undefined;

type AboutUsLayout2ApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      about_title?: string;
      about_image?: Media | string | null;
      about_description?: string;
      about_video_url?: string;
      about_title_secondary?: string;
      about_image_secondary?: Media | string | null;
      about_description_secondary?: string;
      page_blocks?: AboutUsPageBlock[];
    };
    seo?: Record<string, unknown>;
  };
};

export type AboutUsLayout2PageData = {
  title: string;
  heroBackgroundImage?: string;
  quadrant: AboutUsQuadrantSection;
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

function safeParagraphsFromHtml(html?: string) {
  if (!html) return [];
  const decodedHtml = decodeHtmlEntities(html);

  const paras: string[] = [];
  const re = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(decodedHtml))) {
    // Preserve paragraph breaks inside a single <p> by splitting on <br><br>
    const inner = match[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/\r\n/g, '\n');
    const parts = inner
      .split(/\n{2,}/g)
      .map((chunk) => stripHtml(chunk))
      .filter(Boolean);
    paras.push(...parts);
  }

  if (paras.length > 0) return paras;

  const fallback = decodedHtml
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/g)
    .map((chunk) => stripHtml(chunk))
    .filter(Boolean);

  return fallback;
}

function mediaUrl(value: unknown): string | undefined {
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

async function resolveMediaIdToUrl(baseUrl: string, value: unknown): Promise<string | undefined> {
  const direct = mediaUrl(value);
  if (direct) return direct;
  if (typeof value !== 'string') return undefined;
  const id = value.trim();
  if (!/^\d+$/.test(id)) return undefined;

  // Best-effort: backend commonly exposes one of these endpoints.
  const candidates = [
    `/v1/media/${encodeURIComponent(id)}`,
    `/v1/medias/${encodeURIComponent(id)}`,
    `/v1/media-library/${encodeURIComponent(id)}`,
    `/v1/media-items/${encodeURIComponent(id)}`,
  ];

  try {
    for (const path of candidates) {
      const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
      if (!res.ok) continue;
      const payload = (await res.json()) as any;
      const url =
        payload?.data?.url ??
        payload?.data?.file?.url ??
        payload?.data?.media?.url ??
        payload?.url ??
        payload?.path ??
        payload?.data?.path ??
        payload?.data?.original_url ??
        payload?.data?.attributes?.url ??
        undefined;
      if (typeof url === 'string' && url.trim()) return url.trim();
    }
    return undefined;
  } catch {
    return undefined;
  }
}

function pickHighlightFromTitle(title: string): string {
  const t = title.trim();
  if (!t) return '';
  const colonIdx = t.indexOf(':');
  if (colonIdx > 0) return t.slice(0, colonIdx).trim();
  const firstWord = t.split(/\s+/)[0] || '';
  return firstWord;
}

function pickTrailingHighlight(title: string): string {
  const t = title.trim();
  if (!t) return '';
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length <= 3) return t;
  return words.slice(-3).join(' ');
}

export async function fetchAboutUsLayout2Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as AboutUsLayout2ApiResponse;
    if (!data || data.layout !== 'about_2') return null;

    const meta = data.meta || {};

    const topTitle = formatBoldText(meta.about_title?.trim() || data.title);
    const bottomTitle = formatBoldText(meta.about_title_secondary?.trim() || '');

    const topHighlight = pickHighlightFromTitle(topTitle);
    const bottomHighlight = pickTrailingHighlight(bottomTitle);

    const topImage = await resolveMediaIdToUrl(baseUrl, meta.about_image);
    const bottomImage = await resolveMediaIdToUrl(baseUrl, meta.about_image_secondary);

    const quadrant: AboutUsQuadrantSection = {
      topLeft: {
        title: formatBoldText(topTitle),
        paragraphs: safeParagraphsFromHtml(meta.about_description).map(formatBoldText),
      },
      topRight: {
        image: topImage || '',
        imageAlt: topTitle,
      },
      bottomLeft: {
        image: bottomImage || '',
        imageAlt: bottomTitle || topTitle,
      },
      bottomRight: {
        title: formatBoldText(bottomTitle || topTitle),
        paragraphs: safeParagraphsFromHtml(meta.about_description_secondary).map(formatBoldText),
      },
    };

    const page: AboutUsLayout2PageData = {
      title: data.title,
      heroBackgroundImage: meta.breadcrumb_image?.url || undefined,
      quadrant,
      videoUrl: meta.about_video_url?.trim() || undefined,
      navigation: mapPageBlocksToNavigation(meta.page_blocks),
    };

    return {
      slug: data.slug,
      title: data.title,
      seo: (data.seo || {}) as any,
      page,
      summary: stripHtml(data.content || data.title),
    };
  } catch {
    return null;
  }
}

