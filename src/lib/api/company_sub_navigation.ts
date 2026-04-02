import type { CompanyNavigation } from '@/fake-api/company';

type MenuItemApi = {
  id: number;
  name: string;
  url: string;
  order: number;
  status: boolean;
  children?: MenuItemApi[];
};

type MenuGroupApiResponse = {
  data?: {
    items?: MenuItemApi[];
  };
};

const SUB_NAV_REVALIDATE_SECONDS = 300;

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function toRoutePath(path: string): string {
  const cleaned = path.trim().replace(/^\/+/, '').replace(/\/+$/, '');
  return cleaned ? `/${cleaned}` : '/';
}

function inferIcon(name: string, href: string): string {
  const key = `${name} ${href}`.toLowerCase();
  if (key.includes('about')) return 'info';
  if (key.includes('intro')) return 'globe';
  if (key.includes('vision') || key.includes('mission')) return 'vision';
  if (key.includes('governance')) return 'building';
  return 'info';
}

function mapItems(items: MenuItemApi[]): CompanyNavigation['items'] {
  return items
    .filter((i) => i.status)
    .sort((a, b) => a.order - b.order)
    .map((i) => {
      const href = toRoutePath(i.url);
      return {
        id: String(i.id),
        icon: inferIcon(i.name, href),
        label: i.name,
        href,
      };
    });
}

function isCompanySubNav(items: CompanyNavigation['items']): boolean {
  if (!items.length) return false;
  const hrefs = items.map((i) => (i.href || '').toLowerCase());
  const labels = items.map((i) => (i.label || '').toLowerCase());

  // Strong signal: dedicated about-lamipak section.
  if (hrefs.some((h) => h.startsWith('/about-lamipak/'))) return true;

  // Otherwise, require at least 2 "company" keywords and no obvious main-site items.
  const positive =
    labels.filter((l) =>
      l.includes('about') ||
      l.includes('intro') ||
      l.includes('vision') ||
      l.includes('mission') ||
      l.includes('governance') ||
      l.includes('management'),
    ).length;

  const negative =
    labels.filter((l) =>
      l.includes('product') ||
      l.includes('service') ||
      l.includes('contact') ||
      l.includes('career') ||
      l.includes('packaging'),
    ).length;

  return positive >= 2 && negative === 0;
}

export async function fetchCompanySubNavigation(): Promise<CompanyNavigation | null> {
  const configured = (process.env.COMPANY_SUB_MENU_GROUP_ID || '').trim();
  const candidateGroupIds = Array.from(
    new Set([configured, '2', '1', '3', '4'].filter(Boolean)),
  );

  const endpointTemplates = [
    (groupId: string) => `/v1/menus/groups/${groupId}`,
    (groupId: string) => `/v1/menus/group/${groupId}`,
    (groupId: string) => `/v1/menus/${groupId}`,
  ];

  for (const groupId of candidateGroupIds) {
    for (const tmpl of endpointTemplates) {
      const built = buildCompanyApiUrl(tmpl(groupId));
      if (!built) return null;

      try {
        const response = await fetch(built, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          next: { revalidate: SUB_NAV_REVALIDATE_SECONDS },
        });
        if (!response.ok) continue;

        const payload = (await response.json()) as MenuGroupApiResponse;
        const items = payload?.data?.items;
        if (!Array.isArray(items) || items.length === 0) continue;

        const mapped = mapItems(items);
        // Only accept the "About Lamipak" (company) sub-navigation menu.
        if (isCompanySubNav(mapped)) return { items: mapped };
      } catch {
        continue;
      }
    }
  }

  // We couldn't find any menu items; caller may fallback to static nav.
  return { items: [] };
}

