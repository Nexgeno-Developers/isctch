import type { GovernanceFrameworkSectionData } from '@/components/governance/GovernanceFrameworkSection';
import type { GovernanceFrameworkSecondarySectionData } from '@/components/governance/GovernanceFrameworkSecondarySection';
import type { GovernanceGrcSectionData } from '@/components/governance/GovernanceGrcSection';
import type { GovernanceCenterPanelDetailSectionData } from '@/components/governance/GovernanceDetailSection';
import type { GovernanceComplianceCardsSectionData } from '@/components/governance/GovernanceComplianceCardsSection';
import type { GovernanceSecurityTrustSectionData } from '@/components/governance/GovernanceSecurityTrustSection';
import type { GovernanceWhistleblowingSectionData } from '@/components/governance/GovernanceWhistleblowingSection';
import type { GovernanceWhistleblowingCardsSectionData } from '@/components/governance/GovernanceWhistleblowingCardsSection';

type Media = { url?: string | null } | null | undefined;
import { decodeHtmlEntities, normalizeText } from '@/lib/htmlText';

type AboutUsLayout4ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    layout?: string;
    meta?: {
      breadcrumb_image?: Media;
      hero_title?: string;
      hero_subtitle?: string;
      hero_description?: string;
      hero_items?: {
        icon?: Array<Media>;
        title?: string[];
        description?: string[];
      };
      governance_title?: string;
      governance_subtitle?: string;
      governance_description?: string;
      governance_items?: {
        icon?: Array<Media>;
        title?: string[];
        description?: string[];
      };
      ethical_title?: string;
      ethical_banner?: Media;
      ethical_tagline?: string;
      ethical_url?: string;
      ethical_description?: string;
      risk_control_title?: string;
      risk_control_subtitle?: string;
      risk_control_description?: string;
      risk_control_items?: {
        icon?: Array<Media>;
        title?: string[];
        description?: string[];
      };
      global_standard_title?: string;
      global_standard_subtitle?: string;
      global_standard_image?: Media;
      global_standard_description?: string;
      global_standard_items?: {
        icon?: Array<Media>;
        title?: string[];
        description?: string[];
      };
      digital_trust_title?: string;
      digital_trust_subtitle?: string;
      digital_trust_description?: string;
      digital_trust_items?: {
        icon?: Array<Media>;
        title?: string[];
        description?: string[];
      };
      digital_trust_type2_items?: string | { title?: string[]; description?: string[] };
      speak_up_title?: string;
      speak_up_subtitle?: string;
      speak_up_description?: string;
      speak_up_items?: {
        icon?: Array<Media>;
        title?: string[];
        description?: string[];
      };
    };
    seo?: Record<string, unknown>;
  };
};

export type AboutUsLayout4PageData = {
  title: string;
  heroBackgroundImage?: string;
  governanceFrameworkSection: GovernanceFrameworkSectionData;
  governanceFrameworkSecondarySection: GovernanceFrameworkSecondarySectionData;
  governanceDetailSections: Array<
    | GovernanceCenterPanelDetailSectionData
    | GovernanceComplianceCardsSectionData
    | GovernanceSecurityTrustSectionData
    | GovernanceWhistleblowingSectionData
    | GovernanceWhistleblowingCardsSectionData
  >;
  governanceGrcSection: GovernanceGrcSectionData;
};

function buildPageApiPath(slug: string) {
  return slug
    .split('/')
    .filter(Boolean)
    .map((part) => encodeURIComponent(part))
    .join('/');
}

function stripHtml(value?: string) {
  if (!value) return '';
  return normalizeText(value.replace(/<[^>]+>/g, ' '));
}

function paragraphsFromHtml(html?: string): string[] {
  if (!html) return [];
  const decodedHtml = decodeHtmlEntities(html);
  const paras: string[] = [];
  const re = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(decodedHtml))) {
    const inner = match[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/\r\n/g, '\n');
    const parts = inner
      .split(/\n{2,}/g)
      .map((chunk) => stripHtml(chunk))
      .filter(Boolean);
    paras.push(...parts);
  }
  if (paras.length) return paras;
  const text = stripHtml(decodedHtml);
  return text ? [text] : [];
}

function mediaUrl(media?: Media): string | undefined {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url.trim() : undefined;
}

function safeParseJson<T>(input?: string): T | null {
  if (!input) return null;
  try {
    return JSON.parse(input) as T;
  } catch {
    return null;
  }
}

export async function fetchAboutUsLayout4Page(slug: string) {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as AboutUsLayout4ApiResponse;
    if (!data || data.layout !== 'about_4') return null;

    const meta = data.meta || {};

    const heroBg = mediaUrl(meta.breadcrumb_image) || undefined;

    const frameworkIconIds = [
      'framework',
      'integrity',
      'risk_control',
      'supply_chain',
    ] as const;

    const heroCardTitles = meta.hero_items?.title || [];
    const heroCardDescs = meta.hero_items?.description || [];
    const heroCardIcons = meta.hero_items?.icon || [];

    const governanceFrameworkSection: GovernanceFrameworkSectionData = {
      eyebrow: meta.hero_subtitle || data.title,
      title: meta.hero_title || data.title,
      description: stripHtml(meta.hero_description) || '',
      primaryCta: { text: 'Explore our  framework', href: '#governance-framework' },
      secondaryCta: { text: 'Speak Up', href: '#governance-framework' },
      cards: frameworkIconIds
        .map((iconId, idx) => {
          const title = (heroCardTitles[idx] || '').trim();
          const subtitle = (heroCardDescs[idx] || '').trim();
          if (!title) return null;
          return {
            id: `hero-${idx}`,
            title,
            subtitle,
            iconId,
            iconUrl: mediaUrl(heroCardIcons[idx]),
          };
        })
        .filter(Boolean) as GovernanceFrameworkSectionData['cards'],
    };

    const secondaryIconIds = [
      'framework',
      'integrity',
      'risk_control',
      'supply_chain',
      'security',
      'whistle',
    ] as const;

    const govTitles = meta.governance_items?.title || [];
    const govDescs = meta.governance_items?.description || [];
    const govIcons = meta.governance_items?.icon || [];

    const governanceFrameworkSecondarySection: GovernanceFrameworkSecondarySectionData = {
      eyebrow: meta.governance_title || meta.hero_title || data.title,
      title: meta.governance_subtitle || meta.hero_subtitle || '',
      description: paragraphsFromHtml(meta.governance_description),
      cards: secondaryIconIds
        .map((iconId, idx) => {
          const title = (govTitles[idx] || '').trim();
          const subtitle = (govDescs[idx] || '').trim();
          if (!title) return null;
          return {
            id: `gov-${idx}`,
            title,
            subtitle,
            iconId,
            iconUrl: mediaUrl(govIcons[idx]),
          };
        })
        .filter(Boolean) as GovernanceFrameworkSecondarySectionData['cards'],
    };

    const detailSections: AboutUsLayout4PageData['governanceDetailSections'] = [];

    // Ethical conduct -> center panel section
    if (meta.ethical_title) {
      detailSections.push({
        layout: 'centerPanel',
        eyebrow: meta.ethical_title,
        title: meta.ethical_title,
        imageSrc: mediaUrl(meta.ethical_banner) || '',
        imageAlt: meta.ethical_title,
        centerText: stripHtml(meta.ethical_tagline) || '',
        buttonText: 'Zero Tolerance Policy',
        buttonHref: meta.ethical_url || '#',
        paragraphs: paragraphsFromHtml(meta.ethical_description),
      });
    }

    // Risk & Control -> GRC section
    const grcIconIds = ['erm', 'ic', 'ia', 'af'] as const;
    const rcTitles = meta.risk_control_items?.title || [];
    const rcDescs = meta.risk_control_items?.description || [];
    const rcIcons = meta.risk_control_items?.icon || [];

    const governanceGrcSection: GovernanceGrcSectionData = {
      eyebrow: meta.risk_control_title || 'Risk & Control',
      title: meta.risk_control_subtitle || '',
      description: stripHtml(meta.risk_control_description) || '',
      cards: grcIconIds
        .map((iconId, idx) => {
          const title = (rcTitles[idx] || '').trim();
          const description = (rcDescs[idx] || '').trim();
          if (!title) return null;
          return {
            id: `grc-${idx}`,
            title,
            description,
            iconId,
            iconUrl: mediaUrl(rcIcons[idx]),
          };
        })
        .filter(Boolean) as GovernanceGrcSectionData['cards'],
    };

    // Global standards -> compliance cards section
    if (meta.global_standard_title && meta.global_standard_image) {
      const complianceIconIds = ['supplier', 'human_rights', 'environment', 'workplace'] as const;
      const gsTitles = meta.global_standard_items?.title || [];
      const gsDescs = meta.global_standard_items?.description || [];
      const gsIcons = meta.global_standard_items?.icon || [];

      detailSections.push({
        layout: 'complianceCards',
        eyebrow: meta.global_standard_title,
        titleBlue: meta.global_standard_title,
        title: meta.global_standard_subtitle || '',
        imageSrc: mediaUrl(meta.global_standard_image) || '',
        imageAlt: meta.global_standard_title,
        description: paragraphsFromHtml(meta.global_standard_description),
        cards: complianceIconIds
          .map((iconId, idx) => {
            const title = (gsTitles[idx] || '').trim();
            const description = (gsDescs[idx] || '').trim();
            if (!title) return null;
            return {
              id: `gs-${idx}`,
              title,
              description,
              iconId,
              iconUrl: mediaUrl(gsIcons[idx]),
            };
          })
          .filter(Boolean) as GovernanceComplianceCardsSectionData['cards'],
      });
    }

    // Digital trust -> security trust section (cards + stats)
    if (meta.digital_trust_title) {
      const dtIconIds = ['confidentiality', 'integrity', 'availability'] as const;
      const dtTitles = meta.digital_trust_items?.title || [];
      const dtDescs = meta.digital_trust_items?.description || [];
      const dtIcons = meta.digital_trust_items?.icon || [];

      const type2 =
        typeof meta.digital_trust_type2_items === 'string'
          ? safeParseJson<{ title?: string[]; description?: string[] }>(meta.digital_trust_type2_items)
          : meta.digital_trust_type2_items || null;

      const statValues = type2?.title || [];
      const statLabels = type2?.description || [];

      detailSections.push({
        layout: 'securityTrust',
        eyebrow: meta.digital_trust_title,
        titleBlue: meta.digital_trust_title,
        title: meta.digital_trust_subtitle || '',
        leftParagraphs: paragraphsFromHtml(meta.digital_trust_description),
        cards: dtIconIds
          .map((iconId, idx) => {
            const title = (dtTitles[idx] || '').trim();
            const description = (dtDescs[idx] || '').trim();
            if (!title) return null;
            return {
              id: `dt-${idx}`,
              title,
              description,
              iconId,
              iconUrl: mediaUrl(dtIcons[idx]),
            };
          })
          .filter(Boolean) as GovernanceSecurityTrustSectionData['cards'],
        stats: statValues
          .map((value, idx) => {
            const v = (value || '').trim();
            const label = (statLabels[idx] || '').trim();
            if (!v || !label) return null;
            return { id: `dt-stat-${idx}`, value: v, label };
          })
          .filter(Boolean) as GovernanceSecurityTrustSectionData['stats'],
      });
    }

    // Speak-up -> whistle sections
    if (meta.speak_up_title) {
      detailSections.push({
        layout: 'whistleblowing',
        eyebrow: meta.speak_up_title,
        titleBlue: meta.speak_up_title,
        title: meta.speak_up_subtitle || '',
        paragraphs: paragraphsFromHtml(meta.speak_up_description),
      });

      const whistleIconIds = ['confidentiality', 'non_retaliation', 'fair_investigation'] as const;
      const suTitles = meta.speak_up_items?.title || [];
      const suDescs = meta.speak_up_items?.description || [];
      const suIcons = meta.speak_up_items?.icon || [];

      detailSections.push({
        layout: 'whistleCards',
        cards: whistleIconIds
          .map((iconId, idx) => {
            const title = (suTitles[idx] || '').trim();
            const description = (suDescs[idx] || '').trim();
            if (!title) return null;
            return {
              id: `su-${idx}`,
              title,
              description,
              iconId,
              iconUrl: mediaUrl(suIcons[idx]),
            };
          })
          .filter(Boolean) as GovernanceWhistleblowingCardsSectionData['cards'],
      });
    }

    const page: AboutUsLayout4PageData = {
      title: data.title,
      heroBackgroundImage: heroBg,
      governanceFrameworkSection,
      governanceFrameworkSecondarySection,
      governanceDetailSections: detailSections,
      governanceGrcSection,
    };

    return {
      slug: data.slug,
      title: data.title,
      seo: (data.seo || {}) as any,
      page,
      summary: stripHtml(data.content || data.title),
    };
  } catch {
    return null;
  }
}

