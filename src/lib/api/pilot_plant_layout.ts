import { cache } from 'react';
import { normalizeText } from '@/lib/htmlText';

type Media = { url?: string | null } | null | undefined;

type PilotPlantApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      short_summary_description?: string;
      hero_title?: string;
      hero_subtitle?: string;
      hero_description?: string;
      hero_image?: Media;
      hero_capabilities_navigation_link?: string;
      hero_specs_navigation_link?: string;
      pilot_plant_title?: string;
      pilot_plant_description?: string;
      pilot_plant_pages?: Array<{
        id?: number | string;
        title?: string;
        slug?: string;
        short_summary_icon?: Media;
        short_summary_image?: Media;
        short_summary_title?: string;
        short_summary_description?: string;
      }>;
      application_versatility_title?: string;
      application_versatility_subtitle?: string;
      application_versatility_description?: string;
      application_versatility_items?: {
        itration?: string[];
        title?: string[];
        icon?: Media[];
        description?: string[];
      };
      ecosystem_items?: {
        itration?: string[];
        title?: string[];
        image?: Media[];
        point?: string[];
        value?: string[];
        description?: string[];
      };
      highlights_items?: {
        itration?: string[];
        value?: string[];
        title?: string[];
      };
      intro_label?: string;
      intro_heading_black?: string;
      intro_heading_blue?: string;
      intro_body?: string;
      intro_image?: Media;
      intro_overlay_title?: string;
      intro_overlay_subtitle?: string;
      cta_primary_text?: string;
      cta_primary_url?: string;
      cta_secondary_text?: string;
      cta_secondary_url?: string;
      facility_title_black?: string;
      facility_title_blue?: string;
      facility_description?: string;
      feature_cards?: Array<{
        image?: Media;
        title?: string;
        description?: string;
        link_text?: string;
        link_url?: string;
      }>;
    };
    seo?: Record<string, unknown>;
  };
};

export type PilotPlantFeatureCard = {
  id: string;
  image?: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
};

export type PilotPlantScopeIconId = 'drop' | 'leaf' | 'glass' | 'mug';

export type PilotPlantScopeGridItem = {
  id: string;
  icon: PilotPlantScopeIconId;
  /** Optional CMS icon URL (SVG/PNG). When present, used instead of `icon`. */
  iconUrl?: string;
  categoryLabel: string;
  title: string;
};

export type PilotPlantAgileHighlight = {
  title: string;
  description: string;
};

export type PilotPlantEcosystemStep = {
  id: string;
  /** Hero image for card top (dairy / process visual) */
  image?: string;
  imageAlt: string;
  step: string;
  phase: string;
  title: string;
  description: string;
};

export type PilotPlantStat = {
  value: string;
  label: string;
};

export type PilotPlantPageData = {
  title: string;
  heroBackgroundImage?: string;
  heroTitle: string;
  introLabel: string;
  introHeadingBlack: string;
  introHeadingBlue: string;
  introBody: string;
  introImage?: string;
  introImageAlt?: string;
  introOverlayTitle: string;
  introOverlaySubtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  facilityTitleBlack: string;
  facilityTitleBlue: string;
  facilityDescription: string;
  featureCards: PilotPlantFeatureCard[];
  /** Product scope + agile validation split section */
  scopeLabel: string;
  scopeTitleBlue: string;
  scopeTitleBlack: string;
  scopeGrid: PilotPlantScopeGridItem[];
  /** Raw HTML from CMS editor (application_versatility_description). */
  agileHtml?: string;
  agileEyebrow: string;
  agileTitle: string;
  agileBody: string;
  agileHighlights: PilotPlantAgileHighlight[];
  ecosystemTitleBlack: string;
  ecosystemTitleBlue: string;
  ecosystemSteps: PilotPlantEcosystemStep[];
  stats: PilotPlantStat[];
};

/** No dummy copy or placeholder assets — used only when API is unavailable. */
const EMPTY_PAGE: PilotPlantPageData = {
  title: '',
  heroTitle: '',
  introLabel: '',
  introHeadingBlack: '',
  introHeadingBlue: '',
  introBody: '',
  introOverlayTitle: '',
  introOverlaySubtitle: '',
  primaryCta: { text: '', href: '#' },
  secondaryCta: { text: '', href: '#' },
  facilityTitleBlack: '',
  facilityTitleBlue: '',
  facilityDescription: '',
  featureCards: [],
  scopeLabel: '',
  scopeTitleBlue: '',
  scopeTitleBlack: '',
  scopeGrid: [],
  agileHtml: '',
  agileEyebrow: '',
  agileTitle: '',
  agileBody: '',
  agileHighlights: [],
  ecosystemTitleBlack: '',
  ecosystemTitleBlue: '',
  ecosystemSteps: [],
  stats: [],
};

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function clean(s?: string | null) {
  const t = (s ?? '').trim();
  return t || undefined;
}

function htmlToPlainText(html?: string | null): string {
  if (!html) return '';
  return normalizeText(html.replace(/<[^>]+>/g, ' '));
}

function splitStarTitle(raw?: string | null): { black: string; blue: string } | null {
  const t = (raw ?? '').trim();
  if (!t) return null;
  const start = t.indexOf('*');
  if (start === -1) return { black: t, blue: '' };
  const end = t.indexOf('*', start + 1);
  if (end === -1) return { black: t.slice(0, start).trim(), blue: t.slice(start + 1).trim() };
  return { black: t.slice(0, start).trim(), blue: t.slice(start + 1, end).trim() };
}

function parseApplicationVersatilityDescription(html?: string | null): {
  eyebrow?: string;
  title?: string;
  body?: string;
  highlights?: PilotPlantAgileHighlight[];
} {
  const raw = html ?? '';
  const eyebrow = clean(raw.match(/<h6[^>]*>([\s\S]*?)<\/h6>/i)?.[1] ?? undefined);
  const title = clean(raw.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? undefined);
  const firstP = raw.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? '';
  // Keep the main body as the intro copy (exclude any highlight `<strong>` blocks).
  const introOnly = firstP.split(/<strong\b/i)[0] ?? '';
  const body = introOnly.replace(/\r\n/g, '\n').trim() || undefined;

  // Extract `<strong>Title</strong><br>Body.` pairs from the whole HTML.
  const highlights: PilotPlantAgileHighlight[] = [];
  // Capture everything after the `<strong>` block up to the next `<strong>` or end of the paragraph.
  // This preserves extra `<br><br>...` lines like "Lorem ispum".
  const re =
    /<strong[^>]*>([\s\S]*?)<\/strong>(?:\s*<br\s*\/?>\s*)+([\s\S]*?)(?=<strong\b|<\/p>)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw))) {
    const hTitle = clean(htmlToPlainText(m[1])) || '';
    const hDesc = m[2].replace(/\r\n/g, '\n').trim() || '';
    if (hTitle && hDesc) highlights.push({ title: hTitle, description: hDesc });
    if (highlights.length >= 6) break;
  }

  return {
    eyebrow,
    title,
    body,
    highlights: highlights.length ? highlights : undefined,
  };
}

function mapApiToPage(api: NonNullable<PilotPlantApiResponse['data']>): PilotPlantPageData {
  const meta = api.meta || {};
  const base: PilotPlantPageData = { ...EMPTY_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) ?? '';
  // Hero banner should show the CMS page `title` (e.g. "Knowledge Centre Pilot Plant").
  base.heroTitle = base.title || clean(meta.hero_title) || '';

  // ===== innovation_detail_2 (CMS) =====
  base.introLabel = clean(meta.hero_subtitle) || clean(meta.intro_label) || '';

  const heroDesc = htmlToPlainText(meta.hero_description);
  const shortDesc = clean(meta.short_summary_description);
  base.introBody = heroDesc || shortDesc || clean(meta.intro_body) || '';

  const heroImg = mediaUrl(meta.hero_image);
  const introImg = mediaUrl(meta.intro_image);
  const chosenIntroImg = heroImg || introImg;
  if (chosenIntroImg) base.introImage = chosenIntroImg;

  // Intro title: prefer legacy split fields; otherwise split hero_title at "to" (keeps existing design spans).
  const ib = clean(meta.intro_heading_black);
  const iblue = clean(meta.intro_heading_blue);
  if (ib || iblue) {
    base.introHeadingBlack = ib || '';
    base.introHeadingBlue = iblue || '';
  } else {
    const ht = clean(meta.hero_title);
    if (ht) {
      const m = ht.match(/^(.*?)(\s+to\s+.*)$/i);
      if (m) {
        base.introHeadingBlack = m[1].trim() || '';
        base.introHeadingBlue = m[2].trim() || '';
      } else {
        base.introHeadingBlack = ht;
        base.introHeadingBlue = '';
      }
    }
  }

  const capHref = clean(meta.hero_capabilities_navigation_link);
  const specsHref = clean(meta.hero_specs_navigation_link);
  if (capHref) base.primaryCta = { ...base.primaryCta, href: capHref };
  if (specsHref) base.secondaryCta = { ...base.secondaryCta, href: specsHref };

  const facilitySplit = splitStarTitle(meta.pilot_plant_title);
  if (facilitySplit) {
    base.facilityTitleBlack = facilitySplit.black || '';
    base.facilityTitleBlue = facilitySplit.blue || '';
  }
  base.facilityDescription = clean(meta.pilot_plant_description) || '';

  // Feature cards from CMS: pilot_plant_pages
  if (meta.pilot_plant_pages?.length) {
    const mapped: PilotPlantFeatureCard[] = meta.pilot_plant_pages
      .map((p, idx) => {
        const title = clean(p.short_summary_title) || clean(p.title);
        const description = clean(p.short_summary_description);
        const slug = clean(p.slug);
        if (!title || !description || !slug) return null;
        const image = mediaUrl(p.short_summary_image) || mediaUrl(p.short_summary_icon);
        return {
          id: String(p.id ?? `pp-${idx + 1}`),
          image,
          imageAlt: title,
          title,
          description,
          linkText: 'VIEW SPECS',
          linkHref: `/${slug.replace(/^\/+/, '')}`,
        };
      })
      .filter(Boolean) as PilotPlantFeatureCard[];
    if (mapped.length) base.featureCards = mapped;
  }

  // Scope / application versatility
  base.scopeTitleBlack = clean(meta.application_versatility_title) || '';
  base.scopeTitleBlue = clean(meta.application_versatility_subtitle) || '';

  const scopeItems = meta.application_versatility_items;
  if (scopeItems?.title?.length) {
    const iconByIdx: PilotPlantScopeIconId[] = ['drop', 'leaf', 'glass', 'mug'];
    const grid: PilotPlantScopeGridItem[] = [];
    for (let i = 0; i < scopeItems.title.length; i++) {
      const cat = clean(scopeItems.title[i]);
      const title = clean(scopeItems.description?.[i]);
      if (!cat || !title) continue;
      const iconUrl = mediaUrl(scopeItems.icon?.[i]);
      grid.push({
        id: `scope-${i + 1}`,
        icon: iconByIdx[i % iconByIdx.length],
        iconUrl,
        categoryLabel: cat,
        title,
      });
    }
  if (grid.length) base.scopeGrid = grid;
  }

  const descParsed = parseApplicationVersatilityDescription(meta.application_versatility_description);
  base.agileHtml = meta.application_versatility_description || '';
  if (descParsed.eyebrow) base.agileEyebrow = descParsed.eyebrow;
  if (descParsed.title) base.agileTitle = descParsed.title;
  if (descParsed.body) base.agileBody = descParsed.body;
  if (descParsed.highlights?.length) base.agileHighlights = descParsed.highlights;

  // Ecosystem
  const eco = meta.ecosystem_items;
  if (eco?.title?.length) {
    const steps: PilotPlantEcosystemStep[] = [];
    for (let i = 0; i < eco.title.length; i++) {
      const title = clean(eco.title[i]);
      const description = clean(eco.description?.[i]);
      const step = clean(eco.point?.[i]);
      const phase = clean(eco.value?.[i]);
      if (!title || !description) continue;
      steps.push({
        id: `eco-${i + 1}`,
        image: mediaUrl(eco.image?.[i]),
        imageAlt: title,
        step: step || String(i + 1).padStart(2, '0'),
        phase: phase || '',
        title,
        description,
      });
    }
    if (steps.length) base.ecosystemSteps = steps;
  }

  const hi = meta.highlights_items;
  if (hi?.value?.length && hi?.title?.length) {
    const stats: PilotPlantStat[] = [];
    const n = Math.min(hi.value.length, hi.title.length);
    for (let i = 0; i < n; i++) {
      const value = clean(hi.value[i]);
      const label = clean(hi.title[i]);
      if (!value || !label) continue;
      stats.push({ value, label: label.toUpperCase() });
    }
    if (stats.length) base.stats = stats;
  }

  // ===== legacy pilot_plant mapping (existing) =====
  const legacyIntroImg = mediaUrl(meta.intro_image);
  if (introImg) base.introImage = introImg;

  base.introOverlayTitle = clean(meta.intro_overlay_title) || base.introOverlayTitle;
  base.introOverlaySubtitle = clean(meta.intro_overlay_subtitle) || base.introOverlaySubtitle;

  const p1 = clean(meta.cta_primary_text);
  const u1 = clean(meta.cta_primary_url);
  const p2 = clean(meta.cta_secondary_text);
  const u2 = clean(meta.cta_secondary_url);
  if (p1 && u1) base.primaryCta = { text: p1, href: u1 };
  else if (p1) base.primaryCta = { ...base.primaryCta, text: p1 };
  else if (u1) base.primaryCta = { ...base.primaryCta, href: u1 };
  if (p2 && u2) base.secondaryCta = { text: p2, href: u2 };
  else if (p2) base.secondaryCta = { ...base.secondaryCta, text: p2 };
  else if (u2) base.secondaryCta = { ...base.secondaryCta, href: u2 };

  base.facilityTitleBlack = clean(meta.facility_title_black) || base.facilityTitleBlack;
  base.facilityTitleBlue = clean(meta.facility_title_blue) || base.facilityTitleBlue;
  base.facilityDescription = clean(meta.facility_description) || base.facilityDescription;

  const cards = meta.feature_cards;
  if (cards?.length) {
    const mapped = cards
      .map((c, idx) => {
        const title = clean(c.title);
        const description = clean(c.description);
        const linkText = clean(c.link_text);
        const linkUrl = clean(c.link_url);
        if (!title || !description) return null;
        return {
          id: `card-${idx + 1}`,
          image: mediaUrl(c.image),
          imageAlt: title,
          title,
          description,
          linkText: linkText || 'LEARN MORE',
          linkHref: linkUrl || '/contact-us',
        };
      })
      .filter(Boolean) as PilotPlantFeatureCard[];
    if (mapped.length) base.featureCards = mapped;
  }

  return base;
}

export const fetchPilotPlantLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (!cleanSlug) return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      // Route slug and CMS slug can differ; configure via env when needed.
      const apiSlug = (process.env.PILOT_PLANT_PAGE_SLUG || cleanSlug).trim();
      const res = await fetch(`${baseUrl}/v1/page/${encodeURIComponent(apiSlug)}`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as PilotPlantApiResponse;
        const data = payload.data;
        if (data && (data.layout === 'pilot_plant' || data.layout === 'innovation_detail_2')) {
          return {
            slug: data.slug,
            title: data.title,
            seo: data.seo || {},
            page: mapApiToPage(data),
          };
        }
      }
    } catch {
      /* static defaults */
    }
  }

  return {
    slug: 'pilot-plant',
    title: '',
    seo: {} as Record<string, unknown>,
    page: { ...EMPTY_PAGE },
  };
});
