type Media = { url?: string | null } | null | undefined;

type TechnicalServicesApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_title?: string;
      short_summary_icon?: Media;
      short_summary_image?: Media;
      short_summary_description?: string;
      hero_title?: string;
      hero_image?: Media;
      hero_description?: string;
      upgrade_expand_title?: string;
      differentiation_title?: string;
      differentiation_items?: {
        row_1?: string[];
        row_2?: string[];
        title_1?: string[];
        title_2?: string[];
      };
      operational_title?: string;
      page_blocks?: Array<{
        id?: number;
        title?: string;
        slug?: string;
        short_summary_icon?: Media;
        short_summary_image?: Media;
        short_summary_title?: string;
        short_summary_description?: string;
      }>;
    };
    seo?: Record<string, unknown>;
    autofetch?: {
      technical_services?:
        | {
            id?: number;
            title?: string;
            slug?: string;
            short_summary_icon?: Media;
            short_summary_image?: Media;
            short_summary_video_url?: string;
            short_summary_title?: string;
            short_summary_description?: string;
          }
        | Array<{
            id?: number;
            title?: string;
            slug?: string;
            short_summary_icon?: Media;
            short_summary_image?: Media;
            short_summary_video_url?: string;
            short_summary_title?: string;
            short_summary_description?: string;
          }>
        | null;
    };
  };
};

export type TechnicalServicesLayoutPageData = {
  heroTitle: string;
  heroBackgroundImage?: string;
  introSection: {
    heading: string;
    paragraphs: string[];
    image?: string;
    imageAlt: string;
  };
  upgradeSection: {
    heading: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      thumbnail?: string;
      thumbnailAlt?: string;
      videoUrl: string;
      ctaText: string;
      ctaLink: string;
    }>;
  };
  serviceDifferentiation: {
    heading: string;
    headerRow1: {
      empty: string;
      lamiCare: string;
      lamiPremium: string;
      lamiPartner: string;
    };
    headerRow2: {
      focus: string;
      stability: string;
      performance: string;
      transformation: string;
    };
    rows: Array<{
      category: string;
      lamiCare: string;
      lamiPremium: string;
      lamiPartner: string;
    }>;
  };
  operationalSuccess: {
    heading: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      image?: string;
      imageAlt: string;
      ctaText: string;
      ctaLink: string;
    }>;
  };
  connectSection: {
    heading: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
};

import { decodeHtmlEntities, normalizeText, formatBoldText } from '@/lib/htmlText';

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function slugCandidates(slug: string) {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  const last = clean.split('/').filter(Boolean).pop();
  return Array.from(new Set([clean, last].filter(Boolean) as string[]));
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function stripHtml(value?: string) {
  if (!value) return '';
  return normalizeText(value.replace(/<[^>]+>/g, ' '));
}

function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function slugToHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, '');
  return s ? `/${s}/` : '/';
}

function pickHeadingHighlight(heading: string) {
  const clean = heading.trim();
  if (!clean) return '';
  const words = clean.split(/\s+/);
  if (words.length <= 2) return clean;
  return words.slice(0, 2).join(' ');
}

function safeParagraphsFromHtml(html?: string) {
  if (!html) return [];
  const decodedHtml = decodeHtmlEntities(html);

  // Prefer extracting <p> blocks so we preserve paragraph breaks.
  const paras: string[] = [];
  const re = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(decodedHtml))) {
    const text = stripHtml(match[1]);
    if (text) paras.push(text);
  }

  if (paras.length > 0) return paras;

  // Fallback: treat <br> and newlines as paragraph separators.
  const fallback = decodedHtml
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/g)
    .map((chunk) => stripHtml(chunk))
    .filter(Boolean);

  return fallback;
}

export async function fetchTechnicalServicesLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}?autofetch=technical_services`, {
        cache: 'no-store',
      });
      if (!res.ok) continue;

      const { data } = (await res.json()) as TechnicalServicesApiResponse;
      if (!data || data.layout !== 'technical_services') continue;

      const meta = data.meta || {};

      const heroBg = mediaUrl(meta.breadcrumb_image) || mediaUrl(meta.hero_image) || undefined;
      const heroTitle = meta.hero_title || data.title;

      const introHeading = meta.hero_title || meta.short_summary_title || data.title;
      const introParagraphs = safeParagraphsFromHtml(meta.hero_description);
      const introFallback = stripHtml(meta.short_summary_description) || stripHtml(data.content) || '';
      const paragraphs =
        introParagraphs.length > 0 ? introParagraphs : introFallback ? [introFallback] : [];

      const introImage = mediaUrl(meta.hero_image) || mediaUrl(meta.short_summary_image) || undefined;

      const upgradeHeading = meta.upgrade_expand_title || '';
      const upgradeHighlight = pickHeadingHighlight(upgradeHeading);

      const upgradeCards = toArray(data.autofetch?.technical_services)
        .map((item, idx) => {
          const title = (item.short_summary_title || item.title || '').trim();
          const itemSlug = (item.slug || '').trim();
          if (!title || !itemSlug) return null;
          return {
            id: String(item.id ?? `ts-${idx}`),
            title: formatBoldText(title),
            description: formatBoldText(stripHtml(item.short_summary_description) || ''),
            thumbnail: mediaUrl(item.short_summary_icon) || mediaUrl(item.short_summary_image),
            thumbnailAlt: title,
            videoUrl: typeof item.short_summary_video_url === 'string' ? item.short_summary_video_url.trim() : '',
            ctaText: formatBoldText('Discover More'),
            ctaLink: slugToHref(itemSlug),
          };
        })
        .filter(Boolean) as TechnicalServicesLayoutPageData['upgradeSection']['cards'];

      const diffHeading = meta.differentiation_title || 'Service Differentiation';
      const diff = meta.differentiation_items || {};

      const row1 = diff.row_1 || [];
      const row2 = diff.row_2 || [];
      const colPremium = diff.title_1 || [];
      const colPartner = diff.title_2 || [];

      const headerRow1 = {
        empty: '',
        lamiCare: formatBoldText(row2[0] || 'LAMICARE'),
        lamiPremium: formatBoldText(colPremium[0] || 'LAMIPREMIUM'),
        lamiPartner: formatBoldText(colPartner[0] || 'LAMIPARTNER'),
      };

      const headerRow2 = {
        focus: formatBoldText(row1[1] || 'Focus'),
        stability: formatBoldText(row2[1] || 'Stability'),
        performance: formatBoldText(colPremium[1] || 'Performance'),
        transformation: formatBoldText(colPartner[1] || 'Transformation'),
      };

      const rows = [
        {
          category: formatBoldText(row1[2] || 'ENGAGEMENT'),
          lamiCare: formatBoldText(row2[2] || ''),
          lamiPremium: formatBoldText(colPremium[2] || ''),
          lamiPartner: formatBoldText(colPartner[2] || ''),
        },
        {
          category: formatBoldText(row1[3] || 'ACCOUNTABILITY'),
          lamiCare: formatBoldText(row2[3] || ''),
          lamiPremium: formatBoldText(colPremium[3] || ''),
          lamiPartner: formatBoldText(colPartner[3] || ''),
        },
        {
          category: formatBoldText(row1[4] || 'DIGITAL'),
          lamiCare: formatBoldText(row2[4] || ''),
          lamiPremium: formatBoldText(colPremium[4] || ''),
          lamiPartner: formatBoldText(colPartner[4] || ''),
        },
      ].filter((r) => Boolean(r.category));

      const operationalHeading = meta.operational_title || '';
      const operationalHighlight = pickHeadingHighlight(operationalHeading);

      const operationalCards = (meta.page_blocks || [])
        .map((block, idx) => {
          const title = (block.short_summary_title || block.title || '').trim();
          const blockSlug = (block.slug || '').trim();
          if (!title || !blockSlug) return null;
          return {
            id: String(block.id ?? `op-${idx}`),
            title: formatBoldText(title),
            description: formatBoldText(stripHtml(block.short_summary_description) || ''),
            image:
              mediaUrl(block.short_summary_image) || mediaUrl(block.short_summary_icon) || undefined,
            imageAlt: formatBoldText(title),
            ctaText: formatBoldText('Discover More'),
            ctaLink: slugToHref(blockSlug),
          };
        })
        .filter(Boolean) as TechnicalServicesLayoutPageData['operationalSuccess']['cards'];

      const page: TechnicalServicesLayoutPageData = {
        heroTitle: formatBoldText(heroTitle),
        heroBackgroundImage: heroBg,
        introSection: {
          heading: formatBoldText(introHeading),
          paragraphs: paragraphs.map(formatBoldText),
          image: introImage,
          imageAlt: formatBoldText(introHeading),
        },
        upgradeSection: {
          heading: formatBoldText(upgradeHeading),
          cards: upgradeCards,
        },
        serviceDifferentiation: {
          heading: formatBoldText(diffHeading),
          headerRow1,
          headerRow2,
          rows,
        },
        operationalSuccess: {
          heading: formatBoldText(operationalHeading),
          cards: operationalCards,
        },
        connectSection: {
          heading: formatBoldText('Connect with Our Technical Experts'),
          formTitle: formatBoldText('Send Us A Message'),
          illustrationImage: '/connected_image.jpg',
          illustrationAlt: formatBoldText('Connect with Technical Experts'),
        },
      };

      return {
        slug: data.slug,
        title: data.title,
        seo: (data.seo || {}) as any,
        page,
        summary: stripHtml(meta.hero_description || data.content || ''),
      };
    } catch {
      continue;
    }
  }

  return null;
}

