import { decodeHtmlEntities, formatBoldText } from '@/lib/htmlText';

export interface GreenEffortsPageData {
  title: string;
  heroBackgroundImage: string;
  greenSustainabilityVisionSection?: GreenSustainabilityVisionSectionData;
  greenPhotovoltaicProjectSections?: GreenPhotovoltaicProjectSectionData[];
  greenSustainabilityJourneySection?: GreenSustainabilityJourneySectionData;
}

export interface GreenSustainabilityVisionSectionData {
  heading: string;
  subtitle: string;
  cards: Array<{
    id: string;
    title: string;
    /** CMS `hero_items.image[].url` when present */
    iconImageUrl?: string;
    /** Fallback when no image */
    icon?: 'globe' | 'social' | 'product' | 'business';
    /** Raw HTML from CMS (`hero_items.description[]`) */
    descriptionHtml?: string;
    /** Legacy / fake-api structured bullets */
    bullets?: Array<{
      parts: Array<{ text: string; bold?: boolean }>;
    }>;
  }>;
  footerText: string;
}

export interface GreenPhotovoltaicProjectSectionData {
  htmlItems: string[];
}

export interface GreenSustainabilityJourneySectionData {
  headingLineBlue: string;
  headingLineBlack: string;
  body: string;
  image: string;
  imageAlt: string;
  backgroundColor?: string;
  accentColor?: string;
}

type Sustainability3ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      breadcrumb_image?: { id?: number; filename?: string; url?: string };
      hero_title?: string;
      hero_description_intro?: string;
      hero_items?: string | {
        itration?: string[];
        image?: Array<{ id?: number; filename?: string; url?: string } | string>;
        title?: string[];
        description?: string[];
      };
      hero_description_footer?: string;
      project_items?: string;
      sustainability_journey_title?: string;
      sustainability_journey_image?: string;
      sustainability_journey_description?: string;
    };
    seo?: Record<string, unknown>;
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

function safeJsonParse<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

type HeroItemsBlock = {
  itration?: string[];
  image?: Array<{ id?: number; filename?: string; url?: string } | string>;
  title?: string[];
  description?: string[];
};

function parseHeroItems(
  raw: NonNullable<NonNullable<Sustainability3ApiResponse['data']>['meta']>['hero_items'],
): HeroItemsBlock | null {
  if (raw == null) return null;
  if (typeof raw === 'string') {
    return safeJsonParse<HeroItemsBlock>(raw);
  }
  if (typeof raw === 'object') {
    return raw as HeroItemsBlock;
  }
  return null;
}

function heroImageUrl(entry: { id?: number; filename?: string; url?: string } | string | undefined) {
  if (!entry) return undefined;
  if (typeof entry === 'string') return entry.trim() || undefined;
  return entry.url?.trim() || undefined;
}

function hasHtmlTags(s: string): boolean {
  return /<[^>]+>/.test(s);
}

function parseHtmlDescriptionToBullets(
  html: string,
): Array<{ parts: Array<{ text: string; bold?: boolean }> }> {
  const decoded = decodeHtmlEntities(html);
  const paragraphs = decoded.match(/<p[^>]*>[\s\S]*?<\/p>/gi);
  if (!paragraphs) {
    const cleaned = stripHtml(decoded);
    return cleaned ? [{ parts: [{ text: cleaned }] }] : [];
  }

  return paragraphs
    .map((p) => {
      const parts: Array<{ text: string; bold?: boolean }> = [];
      const tagContent = p.replace(/<\/?p[^>]*>/gi, '');
      const segments = tagContent.split(
        /(<strong[^>]*>[\s\S]*?<\/strong>|<b[^>]*>[\s\S]*?<\/b>)/gi,
      );

      for (const seg of segments) {
        if (!seg) continue;
        const strongMatch = /^<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/i.exec(seg);
        if (strongMatch) {
          const text = stripHtml(strongMatch[1]);
          if (text) parts.push({ text, bold: true });
        } else {
          const text = stripHtml(seg);
          if (text) parts.push({ text });
        }
      }

      if (parts.length === 0) return null;
      return { parts };
    })
    .filter(Boolean) as Array<{ parts: Array<{ text: string; bold?: boolean }> }>;
}

const ICON_MAP = ['globe', 'social', 'product', 'business'] as const;

export async function fetchSustainabilityLayout3Page(slug: string): Promise<{
  slug: string;
  title: string;
  seo: Record<string, unknown>;
  pageData: GreenEffortsPageData;
} | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as Sustainability3ApiResponse;
    if (!data || data.layout !== 'sustainability_3' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;

    const heroItems = parseHeroItems(meta.hero_items);
    const heroTitles = heroItems?.title || [];
    const heroDescriptions = heroItems?.description || [];
    const heroImages = heroItems?.image || [];

    const visionCards = heroTitles
      .map((title, idx) => {
        const rawTitle = (title || '').trim();
        if (!rawTitle) return null;

        const htmlDesc = (heroDescriptions[idx] || '').trim();
        const iconImageUrl = heroImageUrl(heroImages[idx]);
        const icon = ICON_MAP[idx] ?? 'globe';
        const html = hasHtmlTags(htmlDesc);

        const bullets = html ? undefined : parseHtmlDescriptionToBullets(htmlDesc || rawTitle);
        const descriptionHtml = html ? htmlDesc : undefined;

        if (!descriptionHtml && !bullets?.length) return null;

        return {
          id: `vision-card-${idx}`,
          title: formatBoldText(rawTitle.toUpperCase()),
          icon: icon as (typeof ICON_MAP)[number],
          iconImageUrl,
          descriptionHtml,
          bullets,
        };
      })
      .filter(Boolean) as GreenSustainabilityVisionSectionData['cards'];

    const visionSection: GreenSustainabilityVisionSectionData | undefined = visionCards.length
      ? {
          headingBrand: 'Lamipak',
          headingRest:
            meta.hero_title?.replace(/^Lamipak\s*/i, '') || 'Sustainability Vision',
          subtitle:
            formatBoldText(meta.hero_description_intro || '') ||
            'Bring Life To Packaging, Achieve Sustainability Across Every Dimension Of Our Business.',
          cards: visionCards,
          footerText: formatBoldText(stripHtml(meta.hero_description_footer || '')),
        }
      : undefined;

    const parsedProjectItems = safeJsonParse<{ itration?: string[]; content?: string[] }>(
      meta.project_items,
    );
    const projectHtmlItems = parsedProjectItems?.content?.filter(Boolean) || [];

    const photovoltaicSection: GreenPhotovoltaicProjectSectionData | undefined =
      projectHtmlItems.length ? { htmlItems: projectHtmlItems } : undefined;

    const journeyImageId = meta.sustainability_journey_image;
    let journeyImage = '/our_green_left_image.webp';
    if (journeyImageId) {
      const matchedImage = heroImages.find((img) => {
        if (typeof img === 'string') return false;
        return String(img.id) === String(journeyImageId);
      });
      if (matchedImage && typeof matchedImage === 'object' && matchedImage.url) {
        journeyImage = matchedImage.url;
      }
    }

    const journeyTitle = meta.sustainability_journey_title || '';
    const journeyHeadingParts = journeyTitle.split(/\s+/);
    const midPoint = Math.ceil(journeyHeadingParts.length / 2);
    const headingLineBlue = journeyHeadingParts.slice(0, midPoint).join(' ');
    const headingLineBlack = journeyHeadingParts.slice(midPoint).join(' ');

    const journeySection: GreenSustainabilityJourneySectionData | undefined =
      meta.sustainability_journey_description
        ? {
            headingLineBlue,
            headingLineBlack,
            body: formatBoldText(stripHtml(meta.sustainability_journey_description)),
            image: journeyImage,
            imageAlt: journeyTitle || 'Sustainability journey',
            backgroundColor: '#f8f9fa',
            accentColor: '#00AEEF',
          }
        : undefined;

    const breadcrumbImage = meta.breadcrumb_image?.url || '/pick_cartoon_banner.webp';

    const pageData: GreenEffortsPageData = {
      title: data.title,
      heroBackgroundImage: breadcrumbImage,
      greenSustainabilityVisionSection: visionSection,
      greenPhotovoltaicProjectSections: photovoltaicSection
        ? [photovoltaicSection]
        : undefined,
      greenSustainabilityJourneySection: journeySection,
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
