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
  const text = stripHtml(html);
  if (!text) return [];
  return text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function breadcrumbsForPage(slug: string, title: string) {
  const segments = slug.split('/').filter(Boolean);
  if (segments.length <= 1) return [{ label: title }];
  const hub = segments[0];
  return [
    { label: 'Packaging', href: `/${hub}/` },
    { label: title },
  ];
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
      eyebrow: meta.hero_subtitle?.trim() || data.title,
      title: meta.hero_title?.trim() || data.title,
      descriptionLines:
        splitToParagraphs(meta.hero_description) ||
        splitToParagraphs(data.content) ||
        [],
      cards: products
        .map((p, idx) => {
          const title = p.title?.trim() || '';
          const description = stripHtml(p.short_summary_description);
          const image = p.short_summary_image?.url || undefined;
          const href = slugToHref(p.slug);

          if (!title && !description && !image) return null;

          return {
            id: String(p.id ?? `lamistraw-${idx}`),
            title: title || `Product ${idx + 1}`,
            description,
            readMoreLabel: 'Read More →',
            href,
            iconId: iconIdForIndex(idx),
            image,
            imageAlt: title || `Product ${idx + 1}`,
          };
        })
        .filter(Boolean) as LamiStrawCardItem[],
      videoUrl: meta.video_url?.trim() || undefined,
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
              title: meta.hero_title || data.title,
              backgroundImage: meta.banner_images?.url || undefined,
              breadcrumbs: breadcrumbsForPage(data.slug, data.title),
            },
          },
          {
            type: 'lamiStrawLanding',
            data: landingData,
          },
          { type: 'callToAction' },
          { type: 'newsletterSubscription' },
        ],
      },
    };
  } catch {
    return null;
  }
}

