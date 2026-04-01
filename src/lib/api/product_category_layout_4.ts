type ProductCategoryLayout4ApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      banner_images?: { url?: string };
      hero_items?: {
        /** Usually an array of labels (5 items). */
        name?: string[];
        icon?: Array<{ url?: string }>;
      };
      info_items?: {
        /** Usually an array of titles (5 items). */
        title?: string[];
        /** Usually an array of HTML description strings (5 items). */
        description?: string[];
        image?: Array<{ url?: string }>;
      };
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
  };
};

export type OnePackOneCodeTabId = 'digital' | 'lottery' | 'marketing' | 'loyalty' | 'traceability';

export type OnePackOneCodeTab = {
  id: OnePackOneCodeTabId;
  label: string;
  iconUrl?: string;
};

export type OnePackOneCodeFeature = {
  id: string;
  number: string;
  title: string;
  bullets: string[];
  image?: string;
};

export type OnePackOneCodeLandingSectionData = {
  breadcrumbs: Array<{ label: string; href?: string }>;
  tabs: OnePackOneCodeTab[];
  activeTabId: OnePackOneCodeTabId;
  hero: {
    backgroundImage?: string;
    videoUrl?: string;
  };
  accessPoints: {
    title: string;
    description: string;
    items: Array<{ id: string; title: string; content: string }>;
  };
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
  features: OnePackOneCodeFeature[];
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

function extractBulletTextFromHtml(html?: string) {
  if (!html) return [];

  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  const liMatches = [...html.matchAll(liRegex)];
  if (liMatches.length) {
    return liMatches
      .map((m) => stripHtml(m[1]))
      .filter(Boolean);
  }

  // Fallback: no <li>, just show the whole description as one bullet.
  const text = stripHtml(html);
  return text ? [text] : [];
}

export async function fetcProductCategoryLayout4Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as ProductCategoryLayout4ApiResponse;
    if (!data || data.layout !== 'product_category_detail_4') return null;

    const meta = data.meta || {};
    const heroImage = meta.banner_images?.url || undefined;
    const videoUrl = meta.video_url;

    const tabOrder = [
      'digital',
      'lottery',
      'marketing',
      'loyalty',
      'traceability',
    ] as const;

    const heroNames = meta.hero_items?.name || [];
    const heroIcons = meta.hero_items?.icon || [];
    const defaultLabels: Record<(typeof tabOrder)[number], string> = {
      digital: 'Digital Co-Printing',
      lottery: 'Lottery Activities',
      marketing: 'Marketing/Brand Promotion',
      loyalty: 'Loyalty/Rewards',
      traceability: 'Traceability',
    };

    const tabs = tabOrder.map((id, idx) => ({
      id,
      label: heroNames[idx] || defaultLabels[id],
      iconUrl: heroIcons[idx]?.url,
    }));

    const infoTitles = meta.info_items?.title || [];
    const infoDescriptions = meta.info_items?.description || [];
    const infoImages = meta.info_items?.image || [];

    const features = tabOrder.map((id, idx) => {
      const title = infoTitles[idx] || defaultLabels[id];
      const htmlDesc = infoDescriptions[idx];
      const bullets = extractBulletTextFromHtml(htmlDesc);
      const image = infoImages[idx]?.url || undefined;
      const number = String(idx + 1).padStart(2, '0');

      return {
        id: `${id}-${idx}`,
        number,
        title,
        bullets,
        image,
      };
    });

    return {
      slug: data.slug,
      title: data.title,
      seo: data.seo || {},
      meta: meta,
      pageData: {
        slug: data.slug,
        title: data.title,
        sections: [
          {
            type: 'onePackOneCodeLanding',
            data: {
              breadcrumbs: breadcrumbsForPage(data.slug, data.title),
              tabs,
              activeTabId: 'digital',
              hero: {
                backgroundImage: heroImage,
                videoUrl: videoUrl || undefined,
              },
              // Access points UI is currently not rendered by the component,
              // but the type requires it.
              accessPoints: {
                title: 'Access Points',
                description: '',
                items: features.map((f) => ({
                  id: f.id,
                  title: f.title,
                  content: f.bullets.join('\n'),
                })),
              },
              features,
              connectSection: undefined,
            },
          },
        ],
      },
    };
  } catch {
    return null;
  }
}

