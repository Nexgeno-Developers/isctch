export interface NgosPageData {
  title: string;
  heroBackgroundImage: string;
  breadcrumbDescription?: string;
  ngosMembershipMapSection?: NgoMembershipMapSectionData;
  ngosAllianceCardsSection?: NgoAllianceCardsSectionData;
  ngosCircularFutureSection?: NgoCircularFutureSectionData;
}

export interface NgoMembershipMapSectionData {
  headingBlue: string;
  headingBlack: string;
  /** CMS `meta.membership_map.url` */
  mapImage?: string;
  mapImageAlt?: string;
  accentColor?: string;
  leaderLineColor?: string;
  dotColor?: string;
  sectionBackgroundColor?: string;
}

export interface NgoAllianceCardsSectionData {
  headingBlue: string;
  headingBlack: string;
  accentColor?: string;
  cards: Array<{
    id: string;
    html: string;
  }>;
}

export interface NgoCircularFutureSectionData {
  heroHeadingBlue: string;
  heroHeadingBlack: string;
  heroIntro: string;
  featureHeadingBlack: string;
  featureHeadingBlue: string;
  featureBody: string;
  image: string;
  imageAlt: string;
  accentColor?: string;
  backgroundColor?: string;
}

type Sustainability5ApiResponse = {
  data?: {
    slug: string;
    title: string;
    content?: string;
    is_active?: boolean;
    layout?: string;
    meta?: {
      breadcrumb_image?: { id?: number; filename?: string; url?: string };
      breadcrumb_description?: string;
      membership_title?: string;
      membership_map?: { id?: number; filename?: string; url?: string };
      membership_block_1?: string;
      membership_block_2?: string;
      membership_block_3?: string;
      circular_future_title?: string;
      circular_future_description?: string;
      community_title?: string;
      community_image?: { id?: number; filename?: string; url?: string };
      community_description?: string;
    };
    seo?: Record<string, unknown>;
  };
};

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

function splitHeading(title: string): { blue: string; black: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) return { blue: title.trim(), black: '' };
  return { blue: parts[0], black: parts.slice(1).join(' ') };
}

export async function fetchSustainabilityLayout5Page(slug: string): Promise<{
  slug: string;
  title: string;
  seo: Record<string, unknown>;
  pageData: NgosPageData;
} | null> {
  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) return null;

  try {
    const apiSlugPath = buildPageApiPath(slug);
    const res = await fetch(`${baseUrl}/v1/page/${apiSlugPath}`, { cache: 'no-store' });
    if (!res.ok) return null;

    const { data } = (await res.json()) as Sustainability5ApiResponse;
    if (!data || data.layout !== 'sustainability_5' || data.is_active === false) return null;

    const meta = data.meta || {};
    const seo = (data.seo || {}) as Record<string, unknown>;

    const membershipHeading = splitHeading(
      meta.membership_title || 'NGO Membership Of Lamipak',
    );

    const allianceCardBlocks = [
      meta.membership_block_1,
      meta.membership_block_2,
      meta.membership_block_3,
    ].filter(Boolean) as string[];

    const membershipMapSection: NgoMembershipMapSectionData = {
      headingBlue: membershipHeading.blue,
      headingBlack: membershipHeading.black,
      mapImage: meta.membership_map?.url || '/ngo_image.webp',
      mapImageAlt:
        meta.membership_map?.filename?.replace(/[-_]+/g, ' ').trim() ||
        meta.membership_title ||
        'NGO membership map',
      accentColor: '#00AEEF',
    };

    const allianceCardsSection: NgoAllianceCardsSectionData | undefined =
      allianceCardBlocks.length
        ? {
            headingBlue: membershipHeading.blue,
            headingBlack: membershipHeading.black,
            accentColor: '#00AEEF',
            cards: allianceCardBlocks.map((html, idx) => ({
              id: `alliance-card-${idx}`,
              html,
            })),
          }
        : undefined;

    const circularFutureTitle = meta.circular_future_title || '';
    const circularHeading = splitHeading(circularFutureTitle);
    const communityTitle = meta.community_title || '';
    const communityParts = communityTitle.split(/\s+/);
    const communityMid = Math.ceil(communityParts.length / 2);

    const circularFutureSection: NgoCircularFutureSectionData | undefined =
      meta.circular_future_description || meta.community_description
        ? {
            heroHeadingBlue: circularHeading.blue,
            heroHeadingBlack: circularHeading.black,
            heroIntro: stripHtml(meta.circular_future_description),
            featureHeadingBlack: communityParts.slice(0, communityMid).join(' '),
            featureHeadingBlue: communityParts.slice(communityMid).join(' '),
            featureBody: stripHtml(meta.community_description),
            image: meta.community_image?.url || '/our_green_left_image.webp',
            imageAlt: communityTitle || 'People & Community',
            accentColor: '#00AEEF',
          }
        : undefined;

    const breadcrumbImage = meta.breadcrumb_image?.url || '/pick_cartoon_banner.webp';

    const pageData: NgosPageData = {
      title: data.title,
      heroBackgroundImage: breadcrumbImage,
      breadcrumbDescription: meta.breadcrumb_description,
      ngosMembershipMapSection: membershipMapSection,
      ngosAllianceCardsSection: allianceCardsSection,
      ngosCircularFutureSection: circularFutureSection,
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
