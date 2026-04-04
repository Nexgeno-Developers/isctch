import type { ProductData, ProductSEO } from '@/fake-api/products';
import { normalizeText, formatBoldText } from '@/lib/htmlText';

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
      video_url?: string;
      product_info_items?: {
        industry?: string[];
      };
      relation_industries?: Array<{
        title?: string;
      }>;
      relation_type?: string;
      relation_featured?: string;
      sizes_formats?: unknown;
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
  return normalizeText(value.replace(/<[^>]+>/g, ' '));
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function parseSizesFormats(raw: unknown): {
  variants: string[];
  imagesByVariant: Record<string, string>;
} {
  if (!raw) return { variants: [], imagesByVariant: {} };

  const parsed: unknown =
    typeof raw === 'string'
      ? (() => {
          try {
            return JSON.parse(raw);
          } catch {
            return null;
          }
        })()
      : raw;

  if (!parsed || typeof parsed !== 'object') return { variants: [], imagesByVariant: {} };

  const obj = parsed as { variants?: unknown; image?: unknown };
  const variants = Array.isArray(obj.variants)
    ? obj.variants.filter((v): v is string => typeof v === 'string' && !!v.trim())
    : [];

  const images = Array.isArray(obj.image) ? obj.image : [];
  const imagesByVariant: Record<string, string> = {};

  variants.forEach((variant, index) => {
    const media = images[index] as Media;
    const url = mediaUrl(media);
    if (url) imagesByVariant[variant] = url;
  });

  return { variants, imagesByVariant };
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
        label: formatBoldText(label.trim()),
        value: formatBoldText((descriptions[index] || '').trim()),
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

function parseRelatedProducts(
  raw: unknown,
  currentProductId: number | string | undefined,
): ProductData[] {
  if (!Array.isArray(raw)) return [];

  const seen = new Set<string>();
  const out: ProductData[] = [];

  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const o = item as {
      id?: number | string;
      title?: string;
      slug?: string;
      short_summary_image?: Media;
      short_summary_description?: string;
    };
    if (currentProductId !== undefined && String(o.id) === String(currentProductId)) continue;
    if (!o.slug?.trim() || !o.title?.trim()) continue;

    const path = o.slug.replace(/^\/+|\/+$/g, '');
    if (seen.has(path)) continue;
    seen.add(path);

    const slug = path.split('/').filter(Boolean).pop() || path;
    const image = mediaUrl(o.short_summary_image) || '/simimalr_product_1.jpg';
    const desc = stripHtml(o.short_summary_description);

    out.push({
      id: String(o.id ?? slug),
      slug,
      productPath: path,
      title: formatBoldText(o.title.trim()),
      description: formatBoldText(desc) || formatBoldText(o.title.trim()),
      shortDescription: desc ? formatBoldText(desc) : undefined,
      image,
      imageAlt: formatBoldText(o.title.trim()),
      seo: {
        meta_title: o.title.trim(),
        meta_description: desc || o.title.trim(),
        canonical_url: `/${path}`,
      },
    });
  }

  return out;
}

function mapApiDataToProduct(data: NonNullable<ProductLayoutApiResponse['data']>, requestedSlug: string): ProductData {
  const meta = data.meta || {};
  const apiSlug = data.slug || requestedSlug;
  const slug = apiSlug.split('/').filter(Boolean).pop() || requestedSlug;
  const fullPath = apiSlug.replace(/^\/+|\/+$/g, '');
  const title = data.title || slug;
  const heroBackgroundImage = mediaUrl(meta.breadcrumb_image);
  const shortSummaryImage = mediaUrl(meta.short_summary_image);

  const industries = meta.product_info_items?.industry || [];
  const sizeFormats = parseSizesFormats(meta.sizes_formats);
  const parsedSpecifications = parseSpecifications(meta.specifications);

  const featureTitles = meta.features_items?.title || [];
  const featureDescriptions = meta.features_items?.description || [];
  const featureImages = meta.features_items?.image || [];

  const accessoryTitles = meta.accessories_items?.title || [];
  const accessoryImages = meta.accessories_items?.image || [];

  // Always parse from API (empty array if missing). Do not leave undefined — that would make
  // SimilarProducts fall back to loading every mock slug, which is not the API list.
  const relatedProductCards = parseRelatedProducts(data.autofetch?.related_products, data.id);

  // "Compatible With" uses only compatibility_description (see ProductSpecifications).
  // Do not duplicate features_items or relation_industries as a checklist here.
  return {
    id: String(data.id || slug),
    slug,
    productPath: fullPath,
    title: formatBoldText(title),
    description:
      formatBoldText(stripHtml(meta.product_info_description)) || formatBoldText(stripHtml(data.content)) || formatBoldText(stripHtml(meta.short_summary_description)),
    shortDescription: formatBoldText(stripHtml(meta.short_summary_description)) || undefined,
    image: shortSummaryImage || heroBackgroundImage || '/product_image_1.jpg',
    imageAlt: formatBoldText(title),
    heroBackgroundImage,
    productImage3D: shortSummaryImage,
    // For API-driven products we only show the main image; no application tabs.
    applicationImages: undefined,
    applications: undefined,
    sizes: sizeFormats.variants.length ? sizeFormats.variants : undefined,
    sizeFormatImages:
      Object.keys(sizeFormats.imagesByVariant).length > 0 ? sizeFormats.imagesByVariant : undefined,
    quickSpecifications: parsedSpecifications.length ? parsedSpecifications : undefined,
    productVideo: meta.video_url?.trim() || undefined,
    compatibilityDescription: formatBoldText(stripHtml(meta.compatibility_description)) || undefined,
    productFeatures: featureTitles
      .map((featureTitle, index) => ({
        id: `${slug}-feature-${index + 1}`,
        title: formatBoldText(featureTitle || `Feature ${index + 1}`),
        description: formatBoldText(stripHtml(featureDescriptions[index])) || '-',
        image: mediaUrl(featureImages[index]) || shortSummaryImage || '/simimalr_product_1.jpg',
        imageAlt: formatBoldText(featureTitle || `Feature ${index + 1}`),
      }))
      .filter((item) => !!item.title),
    accessories: accessoryTitles
      .map((name, index) => ({
        id: `${slug}-accessory-${index + 1}`,
        name: formatBoldText(name),
        image: mediaUrl(accessoryImages[index]) || '/simimalr_product_1.jpg',
        imageAlt: formatBoldText(name || `Accessory ${index + 1}`),
      }))
      .filter((item) => !!item.name),
    technicalConsultation: {
      question: formatBoldText('Need technical consultation for this product?'),
      ctaText: formatBoldText('CONNECT TECHNICAL EXPERTS'),
      ctaLink: '/technical-services',
    },
    seo: toProductSeo(data, slug),
    relatedProductCards,
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

