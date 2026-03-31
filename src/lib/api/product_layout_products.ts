import type { ProductData, ProductSEO } from '@/fake-api/products';

type Media = { url?: string | null } | null | undefined;

type ProductLayoutApiResponse = {
  data?: {
    id?: number | string;
    slug?: string;
    title?: string;
    content?: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_image?: Media;
      short_summary_description?: string;
      product_info_description?: string;
      compatibility_description?: string;
      specifications?: string;
      product_info_items?: {
        industry?: string[];
      };
      relation_industries?: Array<{
        title?: string;
      }>;
      relation_type?: string;
      relation_featured?: string;
      sizes_formats?: string;
      features_items?: {
        image?: Array<Media>;
        title?: string[];
        description?: string[];
      };
      accessories_items?: {
        image?: Array<Media>;
        title?: string[];
      };
    };
    seo?: {
      title?: string | null;
      description?: string | null;
      canonical_url?: string | null;
      og_title?: string | null;
      og_description?: string | null;
      og_image?: Media;
      twitter_title?: string | null;
      twitter_description?: string | null;
      twitter_image?: Media;
      schema?: Record<string, unknown> | null;
      keywords?: string | null;
      robots_index?: string | null;
      robots_follow?: string | null;
      sitemap_priority?: string | null;
    };
    autofetch?: {
      related_products?: unknown;
    };
  };
};

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function stripHtml(value?: string | null) {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function parseSizesFormats(raw?: string) {
  if (!raw) return [] as string[];
  try {
    const parsed = JSON.parse(raw) as { variants?: unknown };
    if (!Array.isArray(parsed.variants)) return [];
    return parsed.variants.filter((v): v is string => typeof v === 'string' && !!v.trim());
  } catch {
    return [];
  }
}

function parseSpecifications(raw?: string) {
  if (!raw) return [] as Array<{ label: string; value: string }>;
  try {
    const parsed = JSON.parse(raw) as {
      title?: unknown;
      description?: unknown;
    };

    const titles = Array.isArray(parsed.title)
      ? parsed.title.filter((v): v is string => typeof v === 'string' && !!v.trim())
      : [];
    const descriptions = Array.isArray(parsed.description)
      ? parsed.description.filter((v): v is string => typeof v === 'string')
      : [];

    return titles
      .map((label, index) => ({
        label: label.trim(),
        value: (descriptions[index] || '').trim(),
      }))
      .filter((item) => item.label && item.value);
  } catch {
    return [];
  }
}

function toProductSeo(data: ProductLayoutApiResponse['data'], fallbackSlug: string): ProductSEO {
  const seo = data?.seo;
  return {
    meta_title: (seo?.title || data?.title || fallbackSlug || 'Product').toString(),
    meta_description: (seo?.description || stripHtml(data?.content) || data?.title || '').toString(),
    canonical_url: seo?.canonical_url || `/${fallbackSlug}`,
    og_title: seo?.og_title || undefined,
    og_description: seo?.og_description || undefined,
    og_image: mediaUrl(seo?.og_image),
    twitter_title: seo?.twitter_title || undefined,
    twitter_description: seo?.twitter_description || undefined,
    twitter_image: mediaUrl(seo?.twitter_image),
    schema: (seo?.schema as unknown as ProductSEO['schema']) || undefined,
  };
}

function mapApiDataToProduct(data: NonNullable<ProductLayoutApiResponse['data']>, requestedSlug: string): ProductData {
  const meta = data.meta || {};
  const apiSlug = data.slug || requestedSlug;
  const slug = apiSlug.split('/').filter(Boolean).pop() || requestedSlug;
  const title = data.title || slug;
  const heroBackgroundImage = mediaUrl(meta.breadcrumb_image);
  const shortSummaryImage = mediaUrl(meta.short_summary_image);

  const industries = meta.product_info_items?.industry || [];
  const sizes = parseSizesFormats(meta.sizes_formats);
  const parsedSpecifications = parseSpecifications(meta.specifications);

  const featureTitles = meta.features_items?.title || [];
  const featureDescriptions = meta.features_items?.description || [];
  const featureImages = meta.features_items?.image || [];

  const accessoryTitles = meta.accessories_items?.title || [];
  const accessoryImages = meta.accessories_items?.image || [];

  // "Compatible With" uses only compatibility_description (see ProductSpecifications).
  // Do not duplicate features_items or relation_industries as a checklist here.
  return {
    id: String(data.id || slug),
    slug,
    title,
    description:
      stripHtml(meta.product_info_description) || stripHtml(data.content) || stripHtml(meta.short_summary_description),
    shortDescription: stripHtml(meta.short_summary_description) || undefined,
    image: shortSummaryImage || heroBackgroundImage || '/product_image_1.jpg',
    imageAlt: title,
    heroBackgroundImage,
    productImage3D: shortSummaryImage,
    // For API-driven products we only show the main image; no application tabs.
    applicationImages: undefined,
    applications: undefined,
    sizes: sizes.length ? sizes : undefined,
    quickSpecifications: parsedSpecifications.length ? parsedSpecifications : undefined,
    compatibilityDescription: stripHtml(meta.compatibility_description) || undefined,
    productFeatures: featureTitles
      .map((featureTitle, index) => ({
        id: `${slug}-feature-${index + 1}`,
        title: featureTitle || `Feature ${index + 1}`,
        description: stripHtml(featureDescriptions[index]) || '-',
        image: mediaUrl(featureImages[index]) || shortSummaryImage || '/simimalr_product_1.jpg',
        imageAlt: featureTitle || `Feature ${index + 1}`,
      }))
      .filter((item) => !!item.title),
    accessories: accessoryTitles
      .map((name, index) => ({
        id: `${slug}-accessory-${index + 1}`,
        name,
        image: mediaUrl(accessoryImages[index]) || '/simimalr_product_1.jpg',
        imageAlt: name || `Accessory ${index + 1}`,
      }))
      .filter((item) => !!item.name),
    technicalConsultation: {
      question: 'Need technical consultation for this product?',
      ctaText: 'CONNECT TECHNICAL EXPERTS',
      ctaLink: '/technical-services',
    },
    seo: toProductSeo(data, slug),
  };
}

export async function fetchProductLayoutPage(slug: string): Promise<ProductData | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (!clean) return null;

  const lastSegment = clean.split('/').filter(Boolean).pop();
  const candidates = Array.from(
    new Set([clean, lastSegment, lastSegment ? `products/${lastSegment}` : null].filter(Boolean) as string[]),
  );

  for (const candidate of candidates) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}?autofetch=related_products`, {
        cache: 'no-store',
      });
      if (!res.ok) continue;

      const payload = (await res.json()) as ProductLayoutApiResponse;
      const data = payload?.data;
      if (!data || data.layout !== 'products') continue;

      return mapApiDataToProduct(data, clean);
    } catch {
      continue;
    }
  }

  return null;
}

