import { formatBoldText } from '@/lib/htmlText';
import { breadcrumbsFromSlugPath } from '@/lib/breadcrumbsFromSlugPath';

type ProductCategoryItem = {
  id: number;
  title: string;
  slug: string;
  short_summary_description?: string;
  short_summary_icon?: { url?: string };
};

type ProductCategoriesApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    layout?: string;
    meta?: {
      banner_images?: { url?: string };
      about_description?: string;
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
    autofetch?: {
      product_categories?: ProductCategoryItem[];
    };
  };
};

export async function fetchProductCategoriesPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const res = await fetch(
      `${baseUrl}/v1/page/${encodeURIComponent(slug)}?autofetch=product_categories`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoriesApiResponse;
    if (!data || data.layout !== 'product_categories') return null;

    const clean = slug.replace(/^\/+|\/+$/g, '');
    const breadcrumbTitle = (data.title || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    const pageData = {
      slug: data.slug,
      title: formatBoldText(data.title),
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: formatBoldText(data.title),
            backgroundImage: data.meta?.banner_images?.url || undefined,
            breadcrumbs: breadcrumbsFromSlugPath(clean, breadcrumbTitle),
          },
        },
        {
          type: 'categoryShowcase',
          data: {
            intro: formatBoldText(data.meta?.about_description || data.content || '') || undefined,
            items: (data.autofetch?.product_categories || []).map((item) => ({
              id: String(item.id),
              title: formatBoldText(item.title),
              description: formatBoldText(item.short_summary_description || ''),
              ctaLabel: formatBoldText('Technical specs'),
              href: `/${data.slug}/${item.slug}/`,
              image: item.short_summary_icon?.url || undefined,
            })),
          },
        },
        { type: 'callToAction' },
        { type: 'newsletterSubscription' },
      ],
    };

    return {
      slug: data.slug,
      title: formatBoldText(data.title),
      meta: data.meta || {},
      heroImage: data.meta?.banner_images?.url,
      intro: formatBoldText(data.meta?.about_description || data.content || ''),
      categories: data.autofetch?.product_categories || [],
      seo: data.seo || {},
      pageData,
    };
  } catch {
    return null;
  }
}