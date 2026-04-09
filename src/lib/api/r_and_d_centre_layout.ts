import { cache } from 'react';
import { formatBoldText } from '@/lib/htmlText';

type MediaRef = { id?: number; filename?: string; url?: string | null };

type HeroItemsBlock = {
  itration?: string[];
  icon?: Array<MediaRef | string>;
  title?: string[];
  description?: string[];
};

type LifecycleItemsBlock = {
  itration?: string[];
  icon?: Array<MediaRef | string>;
  title?: string[];
  description?: string[];
  key_points?: string[];
};

type LaboratoryZonesItemsBlock = {
  itration?: string[];
  icon?: Array<MediaRef | string>;
  title?: string[];
  description?: string[];
  key_points?: string[];
};

type RAndDCentreApiResponse = {
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
      breadcrumb_image?: MediaRef;
      breadcrumb_title?: string;
      breadcrumb_description?: string;
      short_summary_title?: string;
      short_summary_image?: MediaRef;
      short_summary_description?: string;
      hero_title?: string;
      hero_description?: string;
      hero_items?: string | HeroItemsBlock;
      hero_explore_capabilities?: string;
      hero_talk_to_team?: string;
      lifecycle_title?: string;
      lifecycle_items?: string | LifecycleItemsBlock;
      laboratory_zones_title?: string;
      laboratory_zones_items?: string | LaboratoryZonesItemsBlock;
      laboratory_zones_subtitle?: string;
      consultation_background_image?: MediaRef;
      consultation_title?: string;
      consultation_description?: string;
      consultation_cta_title?: string;
      consultation_cta_url?: string;
    };
    seo?: Record<string, unknown>;
  };
};

export type RAndDCentreStatCard = {
  id: string;
  iconUrl?: string;
  value: string;
  label: string;
};

export type RAndDCentreLifecycleCard = {
  id: string;
  iconUrl?: string;
  title: string;
  description: string;
  tags: string[];
};

export type RAndDCentreLifecycleSection = {
  title: string;
  cards: RAndDCentreLifecycleCard[];
};

export type RAndDLaboratoryZoneItem = {
  id: string;
  iconUrl?: string;
  title: string;
  description: string;
  tags: string[];
};

export type RAndDLaboratoryZonesSection = {
  title: string;
  subtitle?: string;
  items: RAndDLaboratoryZoneItem[];
};

export type RAndDCentreBottomCtaSection = {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
};

export type RAndDCentrePageData = {
  title: string;
  heroBackgroundImage?: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  introHeading: string;
  introBodyHtml: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats: RAndDCentreStatCard[];
  lifecycleSection: RAndDCentreLifecycleSection;
  laboratoryZonesSection: RAndDLaboratoryZonesSection;
  bottomCtaSection: RAndDCentreBottomCtaSection;
};

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function mediaUrl(media?: MediaRef): string | undefined {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function clean(s?: string | null): string {
  return (s ?? '').trim();
}

function safeJsonParse<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function parseHeroItems(raw: string | HeroItemsBlock | undefined): HeroItemsBlock | null {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  return safeJsonParse<HeroItemsBlock>(raw);
}

function parseLifecycleItems(raw: string | LifecycleItemsBlock | undefined): LifecycleItemsBlock | null {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  return safeJsonParse<LifecycleItemsBlock>(raw);
}

function parseLaboratoryZonesItems(raw: string | LaboratoryZonesItemsBlock | undefined): LaboratoryZonesItemsBlock | null {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  return safeJsonParse<LaboratoryZonesItemsBlock>(raw);
}

function iconEntryUrl(entry: MediaRef | string | undefined): string | undefined {
  if (!entry) return undefined;
  if (typeof entry === 'string') return entry.trim() || undefined;
  return mediaUrl(entry);
}

function parseKeyPoints(raw?: string): string[] {
  if (!raw) return [];
  const parsed = safeJsonParse<Array<{ value: string }>>(raw);
  if (parsed) return parsed.map((p) => p.value).filter(Boolean);
  return raw
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export const fetchRAndDCentreLayoutPage = cache(async (slug: string) => {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as RAndDCentreApiResponse;
    if (!data || data.layout !== 'rnd_center' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;

    const heroBg = mediaUrl(meta.breadcrumb_image);

    const heroEyebrow = formatBoldText(meta.breadcrumb_title || data.title);
    const heroTitle = formatBoldText(meta.short_summary_title || data.title);
    const heroDescription = formatBoldText(meta.breadcrumb_description || '');

    const introHeading = formatBoldText(meta.hero_title || data.title);
    const introBodyHtml = meta.hero_description || '';

    const primaryCta = {
      text: 'EXPLORE OUR CAPABILITIES',
      href: meta.hero_explore_capabilities || '/packaging',
    };
    const secondaryCta = {
      text: 'TALK TO OUR TEAM',
      href: meta.hero_talk_to_team || '/contact-us',
    };

    const heroItemsParsed = parseHeroItems(meta.hero_items);
    const heroTitles = heroItemsParsed?.title || [];
    const heroDescriptions = heroItemsParsed?.description || [];
    const heroIcons = heroItemsParsed?.icon || [];

    const stats: RAndDCentreStatCard[] = [];
    for (let idx = 0; idx < heroTitles.length; idx++) {
      const value = formatBoldText(heroTitles[idx] || '');
      const label = formatBoldText(heroDescriptions[idx] || '');
      if (!value || !label) continue;
      stats.push({
        id: `stat-${idx}`,
        iconUrl: iconEntryUrl(heroIcons[idx]),
        value,
        label,
      });
    }

    const lifecycleTitle = formatBoldText(meta.lifecycle_title || '');
    const lifecycleParsed = parseLifecycleItems(meta.lifecycle_items);
    const lifecycleTitles = lifecycleParsed?.title || [];
    const lifecycleDescriptions = lifecycleParsed?.description || [];
    const lifecycleIcons = lifecycleParsed?.icon || [];
    const lifecycleKeyPoints = lifecycleParsed?.key_points || [];

    const lifecycleCards: RAndDCentreLifecycleCard[] = [];
    for (let idx = 0; idx < lifecycleTitles.length; idx++) {
      const title = formatBoldText(lifecycleTitles[idx] || '');
      const description = formatBoldText(lifecycleDescriptions[idx] || '');
      if (!title || !description) continue;
      const tags = parseKeyPoints(lifecycleKeyPoints[idx]).map(formatBoldText);
      lifecycleCards.push({
        id: `lifecycle-${idx}`,
        iconUrl: iconEntryUrl(lifecycleIcons[idx]),
        title,
        description,
        tags,
      });
    }

    const lifecycleSection: RAndDCentreLifecycleSection = {
      title: lifecycleTitle,
      cards: lifecycleCards,
    };

    const laboratoryZonesTitle = formatBoldText(meta.laboratory_zones_title || '');
    const laboratoryZonesSubtitle = formatBoldText(meta.laboratory_zones_subtitle || '');
    const zonesParsed = parseLaboratoryZonesItems(meta.laboratory_zones_items);
    const zonesTitles = zonesParsed?.title || [];
    const zonesDescriptions = zonesParsed?.description || [];
    const zonesIcons = zonesParsed?.icon || [];
    const zonesKeyPoints = zonesParsed?.key_points || [];

    const zonesItems: RAndDLaboratoryZoneItem[] = [];
    for (let idx = 0; idx < zonesTitles.length; idx++) {
      const title = formatBoldText(zonesTitles[idx] || '');
      const description = formatBoldText(zonesDescriptions[idx] || '');
      if (!title || !description) continue;
      const tags = parseKeyPoints(zonesKeyPoints[idx]).map(formatBoldText);
      zonesItems.push({
        id: `zone-${idx}`,
        iconUrl: iconEntryUrl(zonesIcons[idx]),
        title,
        description,
        tags,
      });
    }

    const laboratoryZonesSection: RAndDLaboratoryZonesSection = {
      title: laboratoryZonesTitle,
      subtitle: laboratoryZonesSubtitle,
      items: zonesItems,
    };

    const bottomCtaSection: RAndDCentreBottomCtaSection = {
      title: formatBoldText(meta.consultation_title || data.title),
      description: formatBoldText(
        meta.consultation_description || meta.short_summary_description || '',
      ),
      ctaText: clean(meta.consultation_cta_title) || 'REQUEST TECHNICAL CONSULTATION',
      ctaHref: clean(meta.consultation_cta_url) || meta.hero_talk_to_team || '/contact-us',
      backgroundImage:
        mediaUrl(meta.consultation_background_image),
    };

    const pageData: RAndDCentrePageData = {
      title: data.title,
      heroBackgroundImage: heroBg,
      heroEyebrow,
      heroTitle,
      heroDescription,
      introHeading,
      introBodyHtml,
      primaryCta,
      secondaryCta,
      stats,
      lifecycleSection,
      laboratoryZonesSection,
      bottomCtaSection,
    };

    return {
      slug: data.slug,
      title: data.title,
      seo,
      page: pageData,
    };
  } catch {
    return null;
  }
});
