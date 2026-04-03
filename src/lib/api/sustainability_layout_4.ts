export interface CertificationsAchievementsPageData {
  title: string;
  heroBackgroundImage: string;
  breadcrumbDescription?: string;
  certificationsGreenBuildingSection?: GreenBuildingCertificationsSectionData;
  certificationsSustainabilityTimelineSection?: SustainabilityTimelineSectionData;
  certificationsCertificateTilesSection?: CertificateTilesSectionData;
}

export interface GreenBuildingCertificationsSectionData {
  eyebrow: string;
  heading: string;
  eyebrowColor?: string;
  headingGreenColor?: string;
  pillColor?: string;
  iconCircleColor?: string;
  cards: Array<{
    id: string;
    image: string;
    imageAlt: string;
    factoryTitle: string;
    location: string;
    certificationLabel: string;
    year: string;
    description: string;
    badgeImages?: Array<{ src: string; alt: string }>;
  }>;
}

export interface SustainabilityTimelineSectionData {
  headingBlue: string;
  headingBlack: string;
  subtitle: string;
  accentColor?: string;
  backgroundColor?: string;
  items: Array<{
    id: string;
    year: string;
    title: string;
    description: string;
  }>;
}

export interface CertificateTilesSectionData {
  items: Array<{
    id: string;
    href: string;
    ctaLabel?: string;
    openInNewTab?: boolean;
  }>;
  cardBackgroundColor?: string;
  linkColor?: string;
  iconColor?: string;
  sectionBackgroundColor?: string;
}

type Sustainability4ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      breadcrumb_image?: { id?: number; filename?: string; url?: string };
      breadcrumb_description?: string;
      hero_title?: string;
      hero_subtitle?: string;
      hero_items?: {
        itration?: string[];
        image?: Array<{ id?: number; filename?: string; url?: string }>;
        title?: string[];
        location?: string[];
        year?: string[];
        key_points?: string[];
        description?: string[];
        certificates?: Array<
          | { id?: number; filename?: string; url?: string }
          | Array<{ id?: number; filename?: string; url?: string }>
        >;
      };
      timeline_title?: string;
      timeline_description?: string;
      timeline_items?: string;
      timeline_certificates?: { id?: number; filename?: string; url?: string };
    };
    seo?: Record<string, unknown>;
  };
};

import { formatBoldText } from '@/lib/htmlText';

function stripHtml(value?: string | null): string {
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

function safeJsonParse<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function parseLocationField(locationJson?: string): string {
  if (!locationJson) return '';
  const parsed = safeJsonParse<Array<{ value: string }>>(locationJson);
  if (!parsed) return locationJson;
  return parsed.map((item) => item.value).filter(Boolean).join(', ');
}

function parseKeyPointsField(keyPointsJson?: string): string {
  if (!keyPointsJson) return '';
  const parsed = safeJsonParse<Array<{ value: string }>>(keyPointsJson);
  if (!parsed) return keyPointsJson;
  return parsed.map((item) => item.value).filter(Boolean).join(', ');
}

function normalizeCertificates(
  cert?:
    | { id?: number; filename?: string; url?: string }
    | Array<{ id?: number; filename?: string; url?: string }>,
): Array<{ src: string; alt: string }> {
  if (!cert) return [];
  if (Array.isArray(cert)) {
    return cert
      .filter((c) => c?.url)
      .map((c) => ({ src: c.url!, alt: c.filename || 'Certificate' }));
  }
  if (cert.url) {
    return [{ src: cert.url, alt: cert.filename || 'Certificate' }];
  }
  return [];
}

function splitHeading(title: string): { blue: string; black: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) return { blue: title.trim(), black: '' };
  return { blue: parts[0], black: parts.slice(1).join(' ') };
}

export async function fetchSustainabilityLayout4Page(slug: string): Promise<{
  slug: string;
  title: string;
  seo: Record<string, unknown>;
  pageData: CertificationsAchievementsPageData;
} | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as Sustainability4ApiResponse;
    if (!data || data.layout !== 'sustainability_4' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;
    const heroItems = meta.hero_items;

    const images = heroItems?.image || [];
    const titles = heroItems?.title || [];
    const locations = heroItems?.location || [];
    const years = heroItems?.year || [];
    const keyPoints = heroItems?.key_points || [];
    const descriptions = heroItems?.description || [];
    const certificates = heroItems?.certificates || [];

    const greenBuildingHeading = splitHeading(meta.hero_subtitle || 'Green Building Certifications');

    const greenBuildingCards = titles.map((factoryTitle, idx) => ({
      id: `cert-card-${idx}`,
      image: images[idx]?.url || '/certificte_image_1.webp',
      imageAlt: factoryTitle,
      factoryTitle: formatBoldText(factoryTitle),
      location: formatBoldText(parseLocationField(locations[idx])),
      certificationLabel: formatBoldText(parseKeyPointsField(keyPoints[idx])),
      year: years[idx] || '',
      description: formatBoldText(descriptions[idx] || ''),
      badgeImages: normalizeCertificates(certificates[idx]),
    }));

    const greenBuildingSection: GreenBuildingCertificationsSectionData | undefined =
      greenBuildingCards.length
        ? {
            eyebrow: formatBoldText(meta.hero_title || 'PROTECTING ENVIRONMENT'),
            heading: formatBoldText(meta.hero_subtitle || 'Green Building Certifications'),
            eyebrowColor: '#00AEEF',
            headingGreenColor: '#009FE8',
            pillColor: '#009CFF',
            iconCircleColor: '#00AEEF',
            cards: greenBuildingCards,
          }
        : undefined;

    const timelineParsed = safeJsonParse<{
      itration?: string[];
      year?: string[];
      title?: string[];
      description?: string[];
    }>(meta.timeline_items);

    const timelineYears = timelineParsed?.year || [];
    const timelineTitles = timelineParsed?.title || [];
    const timelineDescriptions = timelineParsed?.description || [];

    const timelineItems = timelineYears.map((year, idx) => ({
      id: `tl-${year}-${idx}`,
      year,
      title: formatBoldText(timelineTitles[idx] || ''),
      description: formatBoldText(timelineDescriptions[idx] || ''),
    }));

    const timelineHeading = splitHeading(
      meta.timeline_title || 'Our Sustainability Timeline',
    );

    const timelineSection: SustainabilityTimelineSectionData | undefined =
      timelineItems.length
        ? {
            headingBlue: `${timelineHeading.blue} `,
            headingBlack: timelineHeading.black,
            subtitle: meta.timeline_description || '',
            accentColor: '#00AEEF',
            backgroundColor: '#f8f9fa',
            items: timelineItems,
          }
        : undefined;

    const timelinePdf = meta.timeline_certificates?.url;
    const tilesSection: CertificateTilesSectionData | undefined = timelinePdf
      ? {
          items: [
            {
              id: 'cert-tile-1',
              href: timelinePdf,
              ctaLabel: 'VIEW CERTIFICATE',
              openInNewTab: true,
            },
          ],
          sectionBackgroundColor: '#ffffff',
          cardBackgroundColor: '#edf0f1',
          linkColor: '#0096FF',
          iconColor: '#8b9399',
        }
      : undefined;

    const breadcrumbImage = meta.breadcrumb_image?.url || '/pick_cartoon_banner.webp';

    const pageData: CertificationsAchievementsPageData = {
      title: data.title,
      heroBackgroundImage: breadcrumbImage,
      breadcrumbDescription: meta.breadcrumb_description,
      certificationsGreenBuildingSection: greenBuildingSection,
      certificationsSustainabilityTimelineSection: timelineSection,
      certificationsCertificateTilesSection: tilesSection,
    };

    return {
      slug: data.slug,
      title: data.title,
      seo,
      pageData,
    };
  } catch {
    return null;
  }
}
