/** Readable label for a URL path segment (e.g. `industries` → `Industries`, `dairy-free` → `Dairy Free`). */
export function humanizeUrlSegmentLabel(segment: string): string {
  return segment
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Breadcrumbs follow the URL path for parent segments; the **current page** uses `pageTitle`
 * from the CMS instead of the last path segment.
 * Home icon is rendered by `Breadcrumbs`; parents get trailing-slash `href`s.
 */
export function breadcrumbsFromSlugPath(
  slug: string,
  pageTitle: string,
): Array<{ label: string; href?: string }> {
  const segments = slug
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);

  const title = pageTitle?.trim() || '';

  if (segments.length === 0) {
    return title ? [{ label: title }] : [];
  }

  if (segments.length === 1) {
    return [{ label: title || segments[0] }];
  }

  const items: Array<{ label: string; href?: string }> = [];
  for (let i = 0; i < segments.length - 1; i++) {
    const path = `/${segments.slice(0, i + 1).join('/')}/`;
    items.push({ label: segments[i], href: path });
  }

  items.push({ label: title || segments[segments.length - 1] });
  return items;
}
