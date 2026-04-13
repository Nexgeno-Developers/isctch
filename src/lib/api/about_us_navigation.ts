import { normalizeText } from '@/lib/htmlText';
import type { CompanyNavigationData } from '@/components/company/CompanyNavigation';

type Media = { url?: string | null } | null | undefined;

export type AboutUsPageBlock = {
  id?: number | string;
  title?: string;
  slug?: string;
  short_summary_title?: string;
  short_summary_icon?: Media;
  short_summary_image?: Media;
};

function mediaUrl(media?: Media): string | undefined {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function toHref(slug?: string): string | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}` : '/';
}

function plainLabel(value?: string): string {
  if (!value) return '';
  return normalizeText(value.replace(/<[^>]+>/g, ' '));
}

export function mapPageBlocksToNavigation(
  blocks?: AboutUsPageBlock[] | null,
): CompanyNavigationData | null {
  if (!blocks?.length) return null;

  const items = blocks
    .map((block, idx) => {
      const label = plainLabel(block.short_summary_title || block.title || '');
      const href = toHref(block.slug);
      if (!label || !href) return null;
      const iconUrl = mediaUrl(block.short_summary_icon) || mediaUrl(block.short_summary_image);
      return {
        id: String(block.id ?? `nav-${idx + 1}`),
        label,
        href,
        iconUrl,
        iconAlt: label,
      };
    })
    .filter(Boolean) as CompanyNavigationData['items'];

  return items.length ? { items } : null;
}
