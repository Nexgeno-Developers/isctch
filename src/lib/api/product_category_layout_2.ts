export type SustainableSolutionItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  href?: string;
};

export type SustainableSolutionsSectionData = {
  intro?: string;
  items: SustainableSolutionItem[];
  videoUrl?: string;
};

import { formatBoldText } from '@/lib/htmlText';
import { breadcrumbsFromSlugPath } from '@/lib/breadcrumbsFromSlugPath';

type ProductCategoryLayout2ApiResponse = {
  data?: {
    id: number;
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      banner_images?: { url?: string };
      short_summary_icon?: { url?: string };
      short_summary_description?: string;
      hero_title?: string;
      hero_description?: string;
      video_url?: string;
    };
    seo?: {
      title?: string;
      description?: string;
      keywords?: string | null;
      schema?: string | null;
      canonical_url?: string | null;
      robots_index?: string | null;
      robots_follow?: string | null;
      og_title?: string | null;
      og_description?: string | null;
      og_image?: { url?: string | null } | null;
      twitter_title?: string | null;
      twitter_description?: string | null;
      twitter_image?: { url?: string | null } | null;
      sitemap_priority?: string | null;
    };
    autofetch?: {
      sustainable_products?:
        | {
            id?: number;
            title?: string;
            slug?: string;
            short_summary_image?: { url?: string };
            short_summary_description?: string;
          }
        | Array<{
            id?: number;
            title?: string;
            slug?: string;
            short_summary_image?: { url?: string };
            short_summary_description?: string;
          }>
        | null;
    };
  };
};

type Layout2Meta = NonNullable<ProductCategoryLayout2ApiResponse['data']>['meta'];
type Layout2Autofetch = NonNullable<ProductCategoryLayout2ApiResponse['data']>['autofetch'];

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

function buildSustainableSectionData(params: {
  title: string;
  slug: string;
  meta?: Layout2Meta;
  autofetch?: Layout2Autofetch;
  content?: string;
}): SustainableSolutionsSectionData | null {
  const { title, slug, meta, autofetch, content } = params;

  // Keep editor HTML (including <p> tags) so frontend can render
  // real paragraph breaks and decode entities like &amp;.
  const intro = (meta?.hero_description ?? content ?? '').trim();

  const rawProducts = toArray(autofetch?.sustainable_products);
  const items = rawProducts
    .map((item, idx) => {
      const itemTitle = item.title?.trim() || `${meta?.hero_title || title} ${idx + 1}`;
      // Keep the editor HTML/plain text as-is.
      // RichText handles entity decoding + paragraph breaks.
      const itemDescription = (item.short_summary_description ?? '').trim();
      const itemImage = item.short_summary_image?.url || undefined;
      const itemHref = slugToHref(item.slug);

      if (!itemDescription && !itemImage && !itemTitle) return null;

      return {
        id: String(item.id ?? `sustainable-${idx}`),
        title: formatBoldText(itemTitle),
        description: formatBoldText(itemDescription),
        image: itemImage,
        imageAlt: formatBoldText(itemTitle),
        href: itemHref,
      };
    })
    .filter(Boolean) as SustainableSolutionsSectionData['items'];

  if (items.length === 0) {
    const fallbackDescription = (meta?.short_summary_description ?? intro ?? content ?? '').trim();
    const fallbackImage = meta?.short_summary_icon?.url || meta?.banner_images?.url || undefined;

    if (fallbackDescription || fallbackImage) {
      items.push({
        id: 'sustainable-main',
        title: formatBoldText(meta?.hero_title || title),
        description: formatBoldText(fallbackDescription),
        image: fallbackImage,
        imageAlt: formatBoldText(meta?.hero_title || title),
      });
    }
  }

  if (!intro && items.length === 0) {
    return null;
  }

  return {
    intro: intro || undefined,
    items,
    videoUrl: meta?.video_url?.trim() || undefined,
  };
}

export async function fetcProductCategoryLayout2Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(
      `${baseUrl}/v1/page/${apiSlugPath}?autofetch=sustainable_products`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoryLayout2ApiResponse;
    if (!data || data.layout !== 'product_category_detail_2' || data.is_active === false) {
      return null;
    }

    const meta = data.meta || {};
    const seo = data.seo || {};

    const sustainableSectionData = buildSustainableSectionData({
      title: data.title,
      slug: data.slug,
      meta,
      autofetch: data.autofetch,
      content: data.content,
    });

    const sections: Array<
      | { type: 'heroWithBreadcrumbs'; data: any }
      | { type: 'sustainableSolutions'; data: SustainableSolutionsSectionData }
      | { type: 'callToAction' }
      | { type: 'newsletterSubscription' }
    > = [];

    sections.push({
      type: 'heroWithBreadcrumbs',
      data: {
        title: formatBoldText(meta.hero_title || data.title),
        backgroundImage: meta.banner_images?.url || undefined,
        breadcrumbs: breadcrumbsFromSlugPath(slug, data.title),
      },
    });

    if (sustainableSectionData) {
      sections.push({
        type: 'sustainableSolutions',
        data: sustainableSectionData,
      });
    }

    sections.push({ type: 'callToAction' });
    sections.push({ type: 'newsletterSubscription' });

    return {
      slug: data.slug,
      title: data.title,
      meta,
      seo,
      pageData: {
        slug: data.slug,
        title: data.title,
        sections,
      },
    };
  } catch {
    return null;
  }
}

