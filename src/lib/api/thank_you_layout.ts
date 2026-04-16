import { fetchJsonCached } from '@/lib/api/apiCache';
import { plainTextFromMaybeHtml } from '@/lib/htmlText';

export type ThankYouLayoutPageData = {
  title: string;
  /** Optional rich text body from CMS. */
  contentHtml?: string;
  /** Plain fallback text (meta.short_description). */
  shortDescription?: string;
  heroBackgroundImage?: string;
  sideImage?: string;
};

type Media = { url?: string | null } | null | undefined;

type ThankYouApiResponse = {
  data?: {
    id?: number;
    slug?: string;
    title?: string;
    content?: string;
    is_active?: boolean | null;
    layout?: string | null;
    meta?: {
      breadcrumb_image?: Media;
      side_image?: Media;
      short_description?: string | null;
    } | null;
    seo?: Record<string, unknown> | null;
  };
};

function clean(value?: string | null) {
  return (value ?? '').trim();
}

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function stripPresentationAttributes(html: string): string {
  // CMS content sometimes contains Tailwind classes; drop them so page styling stays consistent.
  return html
    .replace(/\sclass=(["']).*?\1/gi, '')
    .replace(/\sstyle=(["']).*?\1/gi, '');
}

export async function fetchThankYouLayoutPage() {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const payload = await fetchJsonCached<ThankYouApiResponse>(
      `${baseUrl}/v1/page/thank-you`,
      { tags: ['page:thank-you'] },
    );
    const data = payload?.data;
    if (!data || data.is_active === false) return null;
    const layout = clean(data.layout);
    if (layout && layout !== 'thank_us' && layout !== 'thank_you') return null;

    const title = clean(data.title) || 'Thank You';
    const contentRaw = clean(data.content);
    const shortDescription = clean(data.meta?.short_description) || undefined;

    const contentHtml =
      contentRaw && contentRaw !== '<p></p>'
        ? stripPresentationAttributes(contentRaw)
        : undefined;

    const heroBackgroundImage =
      mediaUrl(data.meta?.breadcrumb_image) || undefined;
    const sideImage = mediaUrl(data.meta?.side_image) || undefined;

    // If API content is empty and meta is empty, still return something sane.
    const effectiveShort =
      shortDescription ||
      (contentRaw ? plainTextFromMaybeHtml(contentRaw) : '') ||
      'We have received your message and will be in touch shortly.';

    return {
      slug: data.slug || 'thank-you',
      title,
      seo: (data.seo || {}) as Record<string, unknown>,
      page: {
        title,
        contentHtml,
        shortDescription: effectiveShort,
        heroBackgroundImage,
        sideImage,
      } satisfies ThankYouLayoutPageData,
    };
  } catch {
    return null;
  }
}
