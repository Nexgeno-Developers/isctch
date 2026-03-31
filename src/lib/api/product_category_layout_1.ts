type AutofetchProduct = {
  id: number;
  title: string;
  slug: string;
  short_summary_image?: { url?: string };
  short_summary_description?: string;
};

type ProductCategoryLayout1ApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      banner_images?: { url?: string };
      about_description?: string;
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
    autofetch?: {
      premium_products?: AutofetchProduct[] | AutofetchProduct | null;
      standard_products?: AutofetchProduct[] | AutofetchProduct | null;
    };
  };
};

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

function toArray<T>(value: T[] | T | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export async function fetcProductCategoryLayout1Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(
      `${baseUrl}/v1/page/${apiSlugPath}?autofetch=premium_products,standard_products`,
      { cache: 'no-store' },
    );
    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoryLayout1ApiResponse;
    if (!data || data.layout !== 'product_category_detail_1') return null;

    const standard = toArray(data.autofetch?.standard_products);
    const premium = toArray(data.autofetch?.premium_products);

    const intro = stripHtml(data.meta?.about_description) || stripHtml(data.title);

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
              title: data.title,
              backgroundImage: data.meta?.banner_images?.url || undefined,
              breadcrumbs: [{ label: data.title }],
            },
          },
          {
            type: 'rollFedCatalog',
            data: {
              eyebrow: data.title,
              intro,
              videoUrl: data.meta?.video_url || undefined,
              standardTitle: 'Standard Products',
              standardProducts: standard.map((p) => ({
                id: String(p.id),
                slug: p.slug,
                title: p.title,
                sizes: p.short_summary_description || '',
                image: p.short_summary_image?.url || undefined,
              })),
              premiumTitle: 'Premium Products',
              premiumProducts: premium.map((p) => ({
                id: String(p.id),
                slug: p.slug,
                title: p.title,
                sizes: p.short_summary_description || '',
                image: p.short_summary_image?.url || undefined,
              })),
            },
          },
        ],
      },
    };
  } catch {
    return null;
  }
}

