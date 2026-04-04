import { decodeHtmlEntities, formatBoldText } from '@/lib/htmlText';
import { breadcrumbsFromSlugPath } from '@/lib/breadcrumbsFromSlugPath';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';

export type LamiStrawIconId = 'u' | 'telescope' | 'i' | 'flow';

export type LamiStrawCardItem = {
  id: string;
  title: string;
  description: string;
  readMoreLabel: string;
  href?: string;
  iconId: LamiStrawIconId;
  image?: string;
  imageAlt?: string;
};

export type LamiStrawLandingSectionData = {
  eyebrow: string;
  title: string;
  descriptionLines: string[];
  cards: LamiStrawCardItem[];
  videoUrl?: string;
};

type AutofetchLamiStrawProduct = {
  id?: number;
  title?: string;
  slug?: string;
  short_summary_image?: { url?: string };
  short_summary_description?: string;
};

type ProductCategoryLayout3ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      banner_images?: { url?: string };
      hero_title?: string;
      hero_subtitle?: string;
      hero_description?: string;
      video_url?: string;
    };
    seo?: Record<string, unknown>;
    autofetch?: {
      lamistraw_products?: AutofetchLamiStrawProduct[] | AutofetchLamiStrawProduct | null;
    };
  };
};

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

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function slugToHref(slug?: string) {
  if (!slug) return undefined;
  const cleaned = slug.replace(/^\/+|\/+$/g, '');
  return cleaned ? `/${cleaned}/` : undefined;
}

function splitToParagraphs(html?: string | null): string[] {
  if (!html) return [];

  // 1) Prefer explicit <p> blocks if the editor stored real paragraphs.
  const pRe = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  const matches = [...html.matchAll(pRe)];
  if (matches.length) {
    return matches
      .map((m) => decodeHtmlEntities(stripHtml(m[1])).trim())
      .filter(Boolean);
  }

  // 2) Fallback for editor variants that use <br> tags or plain text newlines.
  const decoded = decodeHtmlEntities(html);
  const normalized = decoded
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n');

  // Remove any remaining HTML tags but keep newlines.
  const text = normalized.replace(/<[^>]+>/g, '');

  return text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function iconIdForIndex(idx: number): LamiStrawIconId {
  const order: LamiStrawIconId[] = ['u', 'telescope', 'i', 'flow'];
  return order[idx % order.length];
}

export async function fetcProductCategoryLayout3Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(
      `${baseUrl}/v1/page/${apiSlugPath}?autofetch=lamistraw_products`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoryLayout3ApiResponse;
    if (!data || data.layout !== 'product_category_detail_3' || data.is_active === false) {
      return null;
    }

    const meta = data.meta || {};
    const products = toArray(data.autofetch?.lamistraw_products);

    const landingData: LamiStrawLandingSectionData = {
      eyebrow: formatBoldText(meta.hero_subtitle?.trim() || data.title),
      title: formatBoldText(meta.hero_title?.trim() || data.title),
      descriptionLines:
        splitToParagraphs(meta.hero_description).map(formatBoldText) ||
        splitToParagraphs(data.content).map(formatBoldText) ||
        [],
      cards: products
        .map((p, idx) => {
          const title = p.title?.trim() || '';
          const description = formatBoldText(stripHtml(p.short_summary_description));
          const image = p.short_summary_image?.url || undefined;
          const href = slugToHref(p.slug);

          if (!title && !description && !image) return null;

          return {
            id: String(p.id ?? `lamistraw-${idx}`),
            title: formatBoldText(title || `Product ${idx + 1}`),
            description,
            readMoreLabel: formatBoldText('Read More →'),
            href,
            iconId: iconIdForIndex(idx),
            image,
            imageAlt: formatBoldText(title || `Product ${idx + 1}`),
          };
        })
        .filter(Boolean) as LamiStrawCardItem[],
      videoUrl: cleanVideoUrlFromApi(meta.video_url) || undefined,
    };

    // Skip the section if it would render empty.
    const hasAnyContent =
      Boolean(landingData.eyebrow?.trim()) ||
      Boolean(landingData.title?.trim()) ||
      landingData.descriptionLines.length > 0 ||
      landingData.cards.length > 0 ||
      Boolean(landingData.videoUrl);
    if (!hasAnyContent) return null;

    return {
      slug: data.slug,
      title: data.title,
      meta,
      seo: (data.seo ?? {}) as any,
      pageData: {
        slug: data.slug,
        title: data.title,
        sections: [
          {
            type: 'heroWithBreadcrumbs',
            data: {
              // Page `title` from API (e.g. "LamiStraw"); do not prefer meta.hero_title here so the banner matches the CMS title.
              title: data.title,
              backgroundImage: meta.banner_images?.url || undefined,
              breadcrumbs: breadcrumbsFromSlugPath(slug, data.title),
            },
          },
          {
            type: 'lamiStrawLanding',
            data: landingData,
          },
        ],
      },
    };
  } catch {
    return null;
  }
}

