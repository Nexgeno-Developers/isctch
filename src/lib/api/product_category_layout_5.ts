type MetaProductCategory = {
  id: number;
  title: string;
  slug: string;
  short_summary_icon?: { url?: string };
  short_summary_description?: string;
};

type ProductCategoryLayout5ApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      banner_images?: { url?: string };
      hero_image?: { url?: string };
      short_summary_icon?: { url?: string };
      short_summary_description?: string;
      hero_title?: string;
      hero_subtitle?: string;
      hero_description?: string;
      info_title?: string;
      info_description?: string;
      product_categories?: MetaProductCategory[];
      video_url?: string;
    };
    seo?: {
      title?: string;
      description?: string;
      keywords?: string;
      schema?: string;
      canonical_url?: string;
      robots_index?: string;
      robots_follow?: string;
      og_title?: string;
      og_description?: string;
      og_image?: { url?: string };
      twitter_title?: string;
      twitter_description?: string;
      twitter_image?: { url?: string };
    };
  };
};

export type OpticapLandingSectionData = {
  title: string;
  image: string;
  descriptionLines: string[];
  descriptionHtml?: string;
  sizeFormatTitle: string;
  sizeFormatText: string;
  productFeaturesTitle: string;
  productFeaturesPills: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  productFeaturesDescription: string;
  productFeaturesDescriptionHtml?: string;
  videoUrl?: string;
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
};

import { formatBoldText } from '@/lib/htmlText';
import { breadcrumbsFromSlugPath } from '@/lib/breadcrumbsFromSlugPath';

function stripHtml(value?: string) {
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

function slugToHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, '');
  return s ? `/${s}/` : '/';
}

/**
 * product_category_detail_5 → single UI: OpticapLandingSection + hero.
 */
export async function fetcProductCategoryLayout5Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(
      `${baseUrl}/v1/page/${apiSlugPath}?autofetch=product_categories`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoryLayout5ApiResponse;
    if (!data || data.layout !== 'product_category_detail_5') {
      return null;
    }

    const meta = data.meta || {};
    const heroTitle = formatBoldText(meta.hero_title || data.title);
    const heroSubtitle = formatBoldText(meta.hero_subtitle || '');
    const heroDescriptionHtml = meta.hero_description?.trim() || '';
    const heroDescriptionPlain = formatBoldText(stripHtml(meta.hero_description));
    const infoDescriptionHtml = meta.info_description?.trim() || '';

    const bannerTopUrl = meta.banner_images?.url || undefined;
    const heroContentImageUrl = meta.hero_image?.url || undefined;
    const topBackgroundUrl = bannerTopUrl || heroContentImageUrl;
    const mainImageUrl = heroContentImageUrl || bannerTopUrl || undefined;

    const productFeaturesPills = (meta.product_categories || []).map((item) => ({
      id: String(item.id),
      label: formatBoldText(item.title),
      href: slugToHref(item.slug),
    }));

    const descriptionLines = heroDescriptionHtml
      ? []
      : [heroDescriptionPlain || formatBoldText(meta.short_summary_description || '')].filter(Boolean);

    const videoUrl =
      meta.video_url?.trim() ||
      process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_VIDEO_URL?.trim() ||
      undefined;

    return {
      slug: data.slug,
      title: data.title,
      meta: data.meta || {},
      seo: data.seo || {},
      pageData: {
        slug: data.slug,
        title: data.title,
        sections: [
          {
            type: 'heroWithBreadcrumbs',
            data: {
              title: heroTitle,
              backgroundImage: topBackgroundUrl,
              breadcrumbs: breadcrumbsFromSlugPath(slug, data.title),
            },
          },
          {
            type: 'opticapLanding',
            data: {
              title: heroTitle,
              image: mainImageUrl,
              descriptionLines,
              descriptionHtml: heroDescriptionHtml || undefined,
              sizeFormatTitle: 'Size Format',
              sizeFormatText: heroDescriptionHtml ? '' : heroSubtitle,
              productFeaturesTitle: meta.info_title,
              productFeaturesPills,
              productFeaturesDescription: stripHtml(meta.info_description) || '',
              productFeaturesDescriptionHtml: infoDescriptionHtml || undefined,
              videoUrl,
            },
          },
        ],
      },
    };
  } catch {
    return null;
  }
}
