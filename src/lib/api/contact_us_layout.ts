import { fetchJsonCached } from '@/lib/api/apiCache';
import { formatBoldText, plainTextFromMaybeHtml } from '@/lib/htmlText';

type Media = { url?: string | null } | null | undefined;

export type ContactUsLayoutPageData = {
  title: string;
  heroBackgroundImage?: string;
};

type ContactUsApiResponse = {
  data?: {
    id?: number;
    slug?: string;
    title?: string;
    content?: string;
    is_active?: boolean | null;
    layout?: string | null;
    meta?: {
      breadcrumb_image?: Media;
    } | null;
    seo?: Record<string, unknown> | null;
  };
};

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function clean(s?: string | null) {
  return (s ?? '').trim();
}

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function slugCandidates(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const last = cleanSlug.split('/').filter(Boolean).pop();
  const candidates = [cleanSlug, last].filter(Boolean) as string[];

  // Legacy route alias.
  if (cleanSlug === 'contact-us') {
    candidates.push('contact');
  }

  return Array.from(new Set(candidates));
}

export async function fetchContactUsLayoutPage(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  for (const candidate of slugCandidates(slug)) {
    try {
      const apiSlugPath = buildPageApiPath(candidate);
      const payload = await fetchJsonCached<ContactUsApiResponse>(
        `${baseUrl}/v1/page/${apiSlugPath}`,
        { tags: [`page:${apiSlugPath}`] },
      );

      const data = payload?.data;
      if (!data || data.is_active === false) continue;
      if (data.layout !== 'contact_us') continue;

      const titleText =
        clean(data.title) ||
        plainTextFromMaybeHtml(clean(data.content)) ||
        'Contact Us';

      const heroBackgroundImage =
        mediaUrl(data.meta?.breadcrumb_image) || undefined;

      return {
        slug: data.slug || candidate,
        title: formatBoldText(titleText) || titleText,
        seo: (data.seo || {}) as Record<string, unknown>,
        page: {
          title: titleText,
          heroBackgroundImage,
        } satisfies ContactUsLayoutPageData,
      };
    } catch {
      continue;
    }
  }

  return null;
}

