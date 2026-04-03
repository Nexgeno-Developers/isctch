type Media = { url?: string | null } | null | undefined;

type TechnicalServiceDetailApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_video_url?: string;
      short_summary_title?: string;
      short_summary_description?: string;
      hero_title?: string;
      hero_image?: Media;
      hero_description?: string;
      information_items?: {
        image?: Array<Media>;
        title?: Array<string>;
        description?: Array<string>;
      };
      video_url?: string;
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
  };
};

export type TechnicalServiceDetailPageData = {
  title: string;
  heroBackgroundImage?: string;
  breadcrumbParentLabel: string;
  breadcrumbParentHref: string;
  introImage?: string;
  introImageAlt?: string;
  introDescription?: string;
  introDescriptionHtml?: string;
  detailedFeatures: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
  videoUrl?: string;
  operationalTitle?: string;
  operationalBlocks: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    href: string;
  }>;
  connectSection: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
};

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
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugToHref(slug: string) {
  const s = slug.replace(/^\/+|\/+$/g, '');
  return s ? `/${s}/` : '/';
}

export async function fetchTechnicalServiceDetailLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
      if (!res.ok) continue;

      const { data } = (await res.json()) as TechnicalServiceDetailApiResponse;
      if (!data || data.layout !== 'technical_service_detail') continue;

      const meta = data.meta || {};
      const heroBg = mediaUrl(meta.breadcrumb_image) || undefined;
      const title = (meta.hero_title || meta.short_summary_title || data.title || '').trim() || data.title;

      const infoImages = meta.information_items?.image || [];
      const infoTitles = meta.information_items?.title || [];
      const infoDescs = meta.information_items?.description || [];
      const detailedFeatures = infoTitles
        .map((t, idx) => {
          const image = mediaUrl(infoImages[idx]) || '';
          const title = (t || '').trim();
          if (!title || !image) return null;
          return {
            id: `f-${idx}`,
            title,
            description: (infoDescs[idx] || '').trim(),
            image,
            imageAlt: title,
          };
        })
        .filter(Boolean) as TechnicalServiceDetailPageData['detailedFeatures'];

      const blocks = (meta.page_blocks || [])
        .map((block, idx) => {
          const title = (block.short_summary_title || block.title || '').trim();
          const href = block.slug ? slugToHref(block.slug) : '';
          if (!title || !href) return null;
          const cardImage =
            mediaUrl(block.short_summary_image) || mediaUrl(block.short_summary_icon);
          return {
            id: String(block.id ?? `b-${idx}`),
            title,
            description: stripHtml(block.short_summary_description) || '',
            image: cardImage,
            imageAlt: title,
            href,
          };
        })
        .filter(Boolean) as TechnicalServiceDetailPageData['operationalBlocks'];

      const page: TechnicalServiceDetailPageData = {
        title,
        heroBackgroundImage: heroBg,
        breadcrumbParentLabel: 'Technical Services',
        breadcrumbParentHref: '/technical-support-services',
        introImage: mediaUrl(meta.hero_image),
        introImageAlt: title,
        introDescription: stripHtml(meta.hero_description) || stripHtml(meta.short_summary_description) || '',
        introDescriptionHtml: meta.hero_description || undefined,
        detailedFeatures,
        videoUrl: meta.video_url?.trim() || meta.short_summary_video_url?.trim() || undefined,
        operationalTitle: meta.operational_title || undefined,
        operationalBlocks: blocks,
        connectSection: {
          heading: 'Connect with Our Technical Experts',
          headingHighlight: 'Technical Experts',
          formTitle: 'Send Us A Message',
          illustrationImage: '/collaborating_together.webp',
          illustrationAlt: 'Connect with Technical Experts',
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

