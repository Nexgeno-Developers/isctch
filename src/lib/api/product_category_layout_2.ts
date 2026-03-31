import type { SustainableSolutionsSectionData } from '@/fake-api/page-builder';

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

function breadcrumbsForPage(slug: string, title: string) {
  const segments = slug.split('/').filter(Boolean);
  if (segments.length <= 1) {
    return [{ label: title }];
  }
  const hub = segments[0];
  return [
    { label: 'Packaging', href: `/${hub}/` },
    { label: title },
  ];
}

function buildSustainableSectionData(params: {
  title: string;
  meta?: ProductCategoryLayout2ApiResponse['data'] extends { meta?: infer M } ? M : never;
  content?: string;
}): SustainableSolutionsSectionData | null {
  const { title, meta, content } = params;

  const introSourceHtml = meta?.hero_description || content || '';
  const intro = stripHtml(introSourceHtml);

  const itemDescription =
    stripHtml(meta?.short_summary_description) || intro || stripHtml(content);
  const itemImage = meta?.short_summary_icon?.url || meta?.banner_images?.url || undefined;

  const items = [];

  if (itemDescription || itemImage) {
    items.push({
      id: 'sustainable-main',
      title: meta?.hero_title || title,
      description: itemDescription,
      image: itemImage,
      imageAlt: meta?.hero_title || title,
      href: undefined,
    });
  }

  if (!intro && items.length === 0) {
    return null;
  }

  return {
    intro: intro || undefined,
    items,
  };
}

export async function fetcProductCategoryLayout2Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoryLayout2ApiResponse;
    if (!data || data.layout !== 'product_category_detail_2' || data.is_active === false) {
      return null;
    }

    const meta = data.meta || {};
    const seo = data.seo || {};

    const sustainableSectionData = buildSustainableSectionData({
      title: data.title,
      meta,
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
        title: meta.hero_title || data.title,
        backgroundImage: meta.banner_images?.url || undefined,
        breadcrumbs: breadcrumbsForPage(data.slug, data.title),
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

