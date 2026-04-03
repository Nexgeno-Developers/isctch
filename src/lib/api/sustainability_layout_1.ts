import { formatBoldText } from '@/lib/htmlText';

type Sustainability1ApiResponse = {
  data?: {
    id?: number;
    slug: string;
    language?: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    company_id?: number;
    meta?: {
      breadcrumb_image?: { id?: number; filename?: string; url?: string };
      hero_title?: string;
      hero_items?: {
        itration?: string[];
        image?: Array<{ id?: number; filename?: string; url?: string } | string>;
        description?: string[];
      };
      sustainable_packaging_vision_image?: string | number;
      sustainable_packaging_vision_title?: string;
      why_carton_title?: string;
      why_carton_description?: string;
      why_carton_items?: string;
      lamipak_commitment_image?: string | number;
      lamipak_commitment_title?: string;
      impact_statistics_title?: string;
      impact_statistics_description?: string;
      impact_statistics_items?: string;
      impact_statistics_footer_description?: string;
      recycling_journey_image?: string | number;
      recycling_journey_description?: string;
      short_summary_image?: { id?: number; filename?: string; url?: string };
      short_summary_description?: string;
    };
    seo?: Record<string, unknown>;
  };
};

type PageSection =
  | {
      type: 'sustainability_footprint';
      heading: string;
      items: Array<{
        id: string;
        image: string;
        imageAlt?: string;
        title: string;
        description: string;
      }>;
    }
  | {
      type: 'image_quote_banner';
      backgroundImage: string;
      backgroundAlt?: string;
      text: string;
    }
  | {
      type: 'why_cartons_matter';
      heading: string;
      description?: string;
      items: Array<{
        id: string;
        image: string;
        imageAlt?: string;
        title: string;
        description: string;
      }>;
    }
  | {
      type: 'impact_product_banner';
      backgroundImage: string;
      backgroundAlt?: string;
      productImage?: string;
      productAlt?: string;
      headingLines: string[];
    }
  | {
      type: 'power_of_carton_packaging';
      heading: string;
      introBold?: string;
      introText?: string;
      cards: Array<{
        id: string;
        value: string;
        title: string;
        descriptionEmphasis?: string;
        description: string;
      }>;
      footnote?: string;
    }
  | {
      type: 'journey_recycling_section';
      heading: string;
      image: string;
      imageAlt?: string;
      description: string;
      ctaText: string;
      ctaLink?: string;
    };

type PageData = {
  slug: string;
  type: string;
  title: string;
  content: string;
  heroBackgroundImage?: string;
  sections?: PageSection[];
  [key: string]: unknown;
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

function safeJsonParse<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function resolveImageUrl(
  entry: { id?: number; filename?: string; url?: string } | string | number | undefined,
  imageMap: Map<string | number, string>,
): string | undefined {
  if (!entry) return undefined;
  if (typeof entry === 'string' && entry.startsWith('http')) return entry;
  if (typeof entry === 'object' && 'url' in entry) return entry.url;
  if (typeof entry === 'string' || typeof entry === 'number') {
    return imageMap.get(entry);
  }
  return undefined;
}

function buildImageMap(
  heroImages: Array<{ id?: number; filename?: string; url?: string } | string>,
): Map<string | number, string> {
  const map = new Map<string | number, string>();
  for (const img of heroImages) {
    if (typeof img === 'object' && img.id && img.url) {
      map.set(img.id, img.url);
    }
  }
  return map;
}

function extractCtaFromHtml(html: string): { text: string; link: string; cleanedHtml: string } | null {
  const match = html.match(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/i);
  if (match) {
    const cleanedHtml = html.replace(/<a[^>]+href="[^"]+"[^>]*>[^<]+<\/a>/gi, '').trim();
    return { text: match[2].trim(), link: match[1].trim(), cleanedHtml };
  }
  return null;
}

export async function fetchSustainabilityLayout1Page(slug: string): Promise<{
  slug: string;
  title: string;
  seo: Record<string, unknown>;
  pageData: PageData;
} | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as Sustainability1ApiResponse;
    if (!data || data.layout !== 'sustainability_1' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;

    const heroImages = meta.hero_items?.image || [];
    const heroDescriptions = meta.hero_items?.description || [];
    const imageMap = buildImageMap(
      heroImages.filter(
        (img): img is { id?: number; filename?: string; url?: string } => typeof img === 'object',
      ),
    );

    const sustainabilityFootprintSection: PageSection | null = heroImages.length
      ? {
          type: 'sustainability_footprint' as const,
          heading: formatBoldText(meta.hero_title || data.title),
          items: heroImages
            .map((img, idx) => {
              const imageUrl = resolveImageUrl(img, imageMap);
              if (!imageUrl) return null;
              return {
                id: `pick-footprint-${idx + 1}`,
                image: imageUrl,
                imageAlt: data.title,
                title: '',
                description: formatBoldText(stripHtml(heroDescriptions[idx] || '')),
              };
            })
            .filter(Boolean) as Array<{
            id: string;
            image: string;
            imageAlt: string;
            title: string;
            description: string;
          }>,
        }
      : null;

    const visionImageUrl = resolveImageUrl(meta.sustainable_packaging_vision_image, imageMap);
    const imageQuoteBannerSection: PageSection | null = meta.sustainable_packaging_vision_title
      ? {
          type: 'image_quote_banner' as const,
          backgroundImage: visionImageUrl || meta.breadcrumb_image?.url || '',
          backgroundAlt: meta.sustainable_packaging_vision_title,
          text: formatBoldText(meta.sustainable_packaging_vision_title),
        }
      : null;

    let whyCartonParsed: {
      itration?: string[];
      image?: Array<string | number | { id?: number; url?: string }>;
      title?: string[];
      description?: string[];
    } | null = null;
    if (typeof meta.why_carton_items === 'string') {
      whyCartonParsed = safeJsonParse(meta.why_carton_items);
    } else if (typeof meta.why_carton_items === 'object') {
      whyCartonParsed = meta.why_carton_items as typeof whyCartonParsed;
    }
    const whyTitles = whyCartonParsed?.title || [];
    const whyDescriptions = whyCartonParsed?.description || [];
    const whyImages = whyCartonParsed?.image || [];

    const whyCartonItems: Array<{ id: string; image: string; imageAlt?: string; title: string; description: string }> = [];
    for (let idx = 0; idx < whyTitles.length; idx++) {
      const t = whyTitles[idx];
      const imageUrl = resolveImageUrl(whyImages[idx], imageMap);
      if (!imageUrl && !t) continue;
      whyCartonItems.push({
        id: `why-carton-${idx}`,
        title: formatBoldText(t),
        description: formatBoldText(whyDescriptions[idx] || ''),
        image: imageUrl || '',
        imageAlt: t,
      });
    }

    const whyCartonsMatterSection: PageSection | null = whyCartonItems.length
      ? {
          type: 'why_cartons_matter' as const,
          heading: formatBoldText(meta.why_carton_title || ''),
          description: formatBoldText(stripHtml(meta.why_carton_description || '')),
          items: whyCartonItems.filter((item) => Boolean(item.title || item.description)),
        }
      : null;

    const impactParsed = safeJsonParse<{
      itration?: string[];
      title?: string[];
      description?: string[];
    }>(meta.impact_statistics_items);
    const impactTitles = impactParsed?.title || [];
    const impactDescriptions = impactParsed?.description || [];

    const commitmentImageUrl = resolveImageUrl(meta.lamipak_commitment_image, imageMap);
    const impactProductBannerSection: PageSection | null = meta.lamipak_commitment_title
      ? {
          type: 'impact_product_banner' as const,
          backgroundImage: commitmentImageUrl || meta.breadcrumb_image?.url || '',
          backgroundAlt: meta.lamipak_commitment_title,
          productImage: meta.short_summary_image?.url,
          productAlt: data.title,
          headingLines: meta.lamipak_commitment_title
            .split(/\r?\n/)
            .map((l) => formatBoldText(l.trim()))
            .filter(Boolean),
        }
      : null;

    const powerOfCartonSection: PageSection | null = impactTitles.length
      ? {
          type: 'power_of_carton_packaging' as const,
          heading: formatBoldText(meta.impact_statistics_title || ''),
          introText: formatBoldText(stripHtml(meta.impact_statistics_description || '')),
          cards: impactTitles
            .map((t, idx) => ({
              id: `impact-stat-${idx}`,
              value: formatBoldText(t),
              title: formatBoldText(t),
              description: formatBoldText(impactDescriptions[idx] || ''),
            }))
            .filter((c) => Boolean(c.title || c.description)),
          footnote: formatBoldText(stripHtml(meta.impact_statistics_footer_description || '')),
        }
      : null;

    const journeyImageUrl = resolveImageUrl(meta.recycling_journey_image, imageMap);
    const ctaInfo = meta.recycling_journey_description
      ? extractCtaFromHtml(meta.recycling_journey_description)
      : null;
    const journeyRecyclingSection: PageSection | null = meta.recycling_journey_description
      ? {
          type: 'journey_recycling_section' as const,
          heading: formatBoldText(meta.impact_statistics_title || data.title),
          image: journeyImageUrl || '',
          imageAlt: data.title,
          description: formatBoldText(stripHtml(ctaInfo?.cleanedHtml || meta.recycling_journey_description)),
          ctaText: ctaInfo?.text || '',
          ctaLink: ctaInfo?.link || '/contact',
        }
      : null;

    const sections = [
      sustainabilityFootprintSection,
      imageQuoteBannerSection,
      whyCartonsMatterSection,
      impactProductBannerSection,
      powerOfCartonSection,
      journeyRecyclingSection,
    ].filter(Boolean) as PageSection[];

    const pageData: PageData = {
      slug: data.slug,
      type: 'pick-carton',
      title: data.title,
      content: formatBoldText(stripHtml(data.content)),
      heroBackgroundImage: meta.breadcrumb_image?.url,
      sections,
    };

    return {
      slug: data.slug,
      title: data.title,
      seo,
      pageData,
    };
  } catch {
    return null;
  }
}
