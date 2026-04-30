import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { ABOUT_US_PAGE_SLUG, donatePath, getInvolvedPath } from '@/config/publicRoutes';
import type {
  AboutCoreValue,
  AboutCoreValuesData,
  AboutManagementTeamData,
  AboutPageData,
  AboutTeamMember,
  AboutValueCard,
} from './types';

const COMPANY_API_DOMAIN = process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
const ABOUT_REVALIDATE_SECONDS = Number(
  process.env.ABOUT_PAGE_REVALIDATE_SECONDS ?? process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const STATIC_ABOUT_PAGE: AboutPageData = {
  hero: {
    breadcrumbHomeLabel: 'Home',
    breadcrumbCurrentLabel: 'About Us',
    titleBlue: 'Our Story',
    titleOrange: '& Mission',
  },
  story: {
    kicker: 'The Genesis',
    heading: 'Lorem Ipsum',
    body: [
      'iSCTH was founded in response to a growing realization: while the world invests heavily in resolving conflict, far less attention is given to cultivating peace itself.',
      'Born from the collective wisdom of peace practitioners, spiritual leaders, educators, and global citizens, iSCTH brings together inner awareness and outer action.',
      'We believe peace must be lived within individuals, embedded in communities, and reflected in institutions. Our work bridges ancient wisdom and contemporary practice to address the emotional, cultural, and systemic roots of conflict.',
    ],
    image: {
      src: '/solidarity_images.webp',
      alt: 'Multicultural group representing unity and shared humanity',
    },
  },
  quote:
    'Peace Is Not A Destination, But A Daily Discipline Of Listening, Understanding, And Structural Empathy.',
  valueCards: [
    {
      number: '01',
      title: 'Our Vision',
      description:
        'To realize a world where spiritual diversity is the cornerstone of global stability, and every human heart beats in resonance with collective peace.',
      icon: 'eye',
    },
    {
      number: '02',
      title: 'Our Mission',
      description:
        'To catalyze human evolution by integrating ancient spiritual wisdom with modern diplomatic strategies to dismantle systemic barriers to peace.',
      icon: 'flag',
    },
  ],
  coreValues: {
    kicker: 'Our DNA',
    heading: 'Core Values',
    values: [
      {
        title: 'Radical Empathy',
        description:
          'We enter every dialogue with humility, listening deeply enough to understand both pain and possibility before proposing action.',
        image: {
          src: '/comminuty_core_images.jpg',
          alt: 'Community members supporting one another with empathy',
        },
      },
      {
        title: 'Structural Integrity',
        description:
          'Peace must be visible in systems, decisions, and daily conduct. We build transparent frameworks that keep trust at the center.',
        image: {
          src: '/policy_images.webp',
          alt: 'Policy and governance work for transparent peace systems',
        },
      },
      {
        title: 'Ancestral Wisdom',
        description:
          'We honor spiritual traditions and inherited knowledge as living resources for healing communities and guiding modern leadership.',
        image: {
          src: '/solidarity_images.webp',
          alt: 'Multicultural community honoring shared wisdom',
        },
      },
      {
        title: 'Global Inclusivity',
        description:
          'Every culture, faith, language, and generation belongs in the work of peace. Our platforms are designed to widen participation.',
        image: {
          src: '/global_images.webp',
          alt: 'Global view representing inclusive international cooperation',
        },
      },
      {
        title: 'Spiritual Courage',
        description:
          'We choose principled action, compassionate truth-telling, and steady service even when the path toward reconciliation is difficult.',
        image: {
          src: '/peace_images.webp',
          alt: 'Meditation and inner courage for peace work',
        },
      },
      {
        title: 'Adaptive Diplomacy',
        description:
          'Conflict changes quickly, so our methods stay flexible: combining dialogue, technology, education, and local leadership.',
        image: {
          src: '/diplomatic_image1.jpg',
          alt: 'International diplomacy setting for adaptive collaboration',
        },
      },
    ],
  },
  managementTeam: {
    kicker: 'Stewards of Vision and Integrity',
    heading: 'Management Team',
    description: [
      'The iSCTH Management Team translates vision into action. With backgrounds spanning peace-building, education, governance, strategy, and operations, the team ensures ethical leadership, transparency, and sustainable impact. Working closely with founders, the global board, and advisors, the team leads with humility, service, and accountability.',
    ],
    members: [
      {
        name: 'Name',
        designation: 'Designation',
        image: {
          src: '/peace_images.webp',
          alt: 'Management team member portrait',
        },
      },
      {
        name: 'Name',
        designation: 'Designation',
        image: {
          src: '/global_images.webp',
          alt: 'Management team member presenting strategy',
        },
      },
      {
        name: 'Name',
        designation: 'Designation',
        image: {
          src: '/hero_images.png',
          alt: 'Management team member smiling',
        },
      },
      {
        name: 'Name',
        designation: 'Designation',
        image: {
          src: '/youth_images.webp',
          alt: 'Management team member in planning session',
        },
      },
      {
        name: 'Name',
        designation: 'Designation',
        image: {
          src: '/solidarity_images.webp',
          alt: 'Management team member representing community',
        },
      },
    ],
  },
  cta: {
    heading: 'Be The Movement, Not Just The Witness.',
    donateLabel: 'Donate Now',
    donateHref: donatePath(),
    volunteerLabel: 'Volunteer With Us',
    volunteerHref: getInvolvedPath(),
  },
};

function staticAboutContentKey(): string {
  return [
    STATIC_ABOUT_PAGE.hero.breadcrumbCurrentLabel,
    STATIC_ABOUT_PAGE.hero.titleBlue,
    STATIC_ABOUT_PAGE.hero.titleOrange,
    STATIC_ABOUT_PAGE.story.kicker,
    STATIC_ABOUT_PAGE.story.heading,
    STATIC_ABOUT_PAGE.story.body.join('|'),
    STATIC_ABOUT_PAGE.story.image.src,
    STATIC_ABOUT_PAGE.quote,
    ...STATIC_ABOUT_PAGE.valueCards.flatMap((card) => [
      card.number,
      card.title,
      card.description,
      card.icon,
    ]),
    STATIC_ABOUT_PAGE.coreValues.kicker,
    STATIC_ABOUT_PAGE.coreValues.heading,
    ...STATIC_ABOUT_PAGE.coreValues.values.flatMap((value) => [
      value.title,
      value.description,
      value.image.src,
      value.image.alt,
    ]),
    STATIC_ABOUT_PAGE.managementTeam.kicker,
    STATIC_ABOUT_PAGE.managementTeam.heading,
    STATIC_ABOUT_PAGE.managementTeam.description.join('|'),
    ...STATIC_ABOUT_PAGE.managementTeam.members.flatMap((member) => [
      member.name,
      member.designation,
      member.image.src,
      member.image.alt,
    ]),
    STATIC_ABOUT_PAGE.cta.heading,
    STATIC_ABOUT_PAGE.cta.donateLabel,
    STATIC_ABOUT_PAGE.cta.donateHref,
    STATIC_ABOUT_PAGE.cta.volunteerLabel,
    STATIC_ABOUT_PAGE.cta.volunteerHref,
  ].join('|');
}

type MetaRecord = Record<string, string | undefined>;
type PageApiPayload = { data?: { meta?: MetaRecord | MetaRecord[] } };

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeMeta(data: PageApiPayload['data']): MetaRecord | undefined {
  const meta = data?.meta;
  if (!meta) return undefined;
  if (Array.isArray(meta)) {
    const out: MetaRecord = {};
    for (const row of meta) {
      if (!row || typeof row !== 'object') continue;
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === 'string') out[key] = value;
      }
    }
    return out;
  }
  return meta as MetaRecord;
}

function pick(meta: MetaRecord | undefined, keys: string[]): string {
  if (!meta) return '';
  for (const key of keys) {
    const value = meta[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function splitParagraphs(raw: string, fallback: string[]): string[] {
  if (!raw) return fallback;
  const paragraphs = raw
    .split(/\r?\n\s*\r?\n|\|/g)
    .map((item) => item.trim())
    .filter(Boolean);
  return paragraphs.length ? paragraphs : fallback;
}

function normalizeImageUrl(url: string, fallback: string): string {
  const u = url.trim();
  if (!u) return fallback;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (u.startsWith('public/')) return `/${u.replace(/^public\/+/, '')}`;
  if (!u.includes('/')) return `/${u}`;
  if (!COMPANY_API_DOMAIN) return `/${u.replace(/^\/+/, '')}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

function valueCardsFromMeta(meta: MetaRecord | undefined): AboutValueCard[] {
  const fallback = STATIC_ABOUT_PAGE.valueCards;
  if (!meta) return fallback;

  const cards: AboutValueCard[] = [];
  for (let i = 1; i <= 4; i++) {
    const title = pick(meta, [`about_value_${i}_title`, `about_card_${i}_title`]);
    if (!title) continue;
    const description =
      pick(meta, [`about_value_${i}_description`, `about_card_${i}_description`]) ||
      fallback[cards.length]?.description ||
      '';
    const number =
      pick(meta, [`about_value_${i}_number`, `about_card_${i}_number`]) ||
      fallback[cards.length]?.number ||
      String(i).padStart(2, '0');
    const iconRaw = pick(meta, [`about_value_${i}_icon`, `about_card_${i}_icon`]);
    cards.push({
      number,
      title,
      description,
      icon: iconRaw === 'flag' ? 'flag' : fallback[cards.length]?.icon || 'eye',
    });
  }

  return cards.length ? cards : fallback;
}

function coreValuesFromMeta(meta: MetaRecord | undefined): AboutCoreValuesData {
  const fallback = STATIC_ABOUT_PAGE.coreValues;
  if (!meta) return fallback;

  const values: AboutCoreValue[] = [];
  for (let i = 1; i <= 10; i++) {
    const title = pick(meta, [
      `about_core_value_${i}_title`,
      `core_value_${i}_title`,
      `about_dna_${i}_title`,
    ]);
    if (!title) continue;

    const fallbackValue = fallback.values[values.length] || fallback.values[0];
    values.push({
      title,
      description:
        pick(meta, [
          `about_core_value_${i}_description`,
          `core_value_${i}_description`,
          `about_dna_${i}_description`,
        ]) ||
        fallbackValue.description ||
        '',
      image: {
        src: normalizeImageUrl(
          pick(meta, [
            `about_core_value_${i}_image`,
            `core_value_${i}_image`,
            `about_dna_${i}_image`,
          ]),
          fallbackValue.image.src,
        ),
        alt:
          pick(meta, [
            `about_core_value_${i}_image_alt`,
            `core_value_${i}_image_alt`,
            `about_dna_${i}_image_alt`,
          ]) ||
          fallbackValue.image.alt ||
          title,
      },
    });
  }

  return {
    kicker:
      pick(meta, ['about_core_values_kicker', 'core_values_kicker', 'about_dna_kicker']) ||
      fallback.kicker,
    heading:
      pick(meta, ['about_core_values_heading', 'core_values_heading', 'about_dna_heading']) ||
      fallback.heading,
    values: values.length ? values : fallback.values,
  };
}

function teamMembersFromMeta(meta: MetaRecord | undefined): AboutTeamMember[] {
  const fallback = STATIC_ABOUT_PAGE.managementTeam.members;
  if (!meta) return fallback;

  const members: AboutTeamMember[] = [];
  for (let i = 1; i <= 12; i++) {
    const name = pick(meta, [`about_team_${i}_name`, `team_member_${i}_name`]);
    if (!name) continue;
    const designation =
      pick(meta, [`about_team_${i}_designation`, `team_member_${i}_designation`]) ||
      fallback[members.length]?.designation ||
      '';
    const fallbackImage = fallback[members.length]?.image || fallback[0].image;
    members.push({
      name,
      designation,
      image: {
        src: normalizeImageUrl(
          pick(meta, [`about_team_${i}_image`, `team_member_${i}_image`]),
          fallbackImage.src,
        ),
        alt:
          pick(meta, [`about_team_${i}_image_alt`, `team_member_${i}_image_alt`]) ||
          fallbackImage.alt ||
          name,
      },
    });
  }

  return members.length ? members : fallback;
}

function managementTeamFromMeta(meta: MetaRecord | undefined): AboutManagementTeamData {
  const fallback = STATIC_ABOUT_PAGE.managementTeam;
  return {
    kicker:
      pick(meta, ['about_team_kicker', 'management_team_kicker']) ||
      fallback.kicker,
    heading:
      pick(meta, ['about_team_heading', 'management_team_heading']) ||
      fallback.heading,
    description: splitParagraphs(
      pick(meta, ['about_team_description', 'management_team_description']),
      fallback.description,
    ),
    members: teamMembersFromMeta(meta),
  };
}

async function fetchAboutPayload(slug: string): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${slug}`);
  if (!url) return null;
  return fetchJsonCached<PageApiPayload>(url, {
    tags: ['about-page', `page:${slug}`],
    init: { headers: { Accept: 'application/json' } },
  });
}

async function resolveAboutPageData(slug: string): Promise<AboutPageData> {
  const payload = await fetchAboutPayload(slug);
  const meta = normalizeMeta(payload?.data);
  const fallback = STATIC_ABOUT_PAGE;
  const storyImage = fallback.story.image;

  return {
    hero: {
      breadcrumbHomeLabel:
        pick(meta, ['about_breadcrumb_home', 'breadcrumb_home']) || fallback.hero.breadcrumbHomeLabel,
      breadcrumbCurrentLabel:
        pick(meta, ['about_breadcrumb_current', 'breadcrumb_current']) ||
        fallback.hero.breadcrumbCurrentLabel,
      titleBlue: pick(meta, ['about_title_blue', 'about_heading_blue', 'title_blue']) || fallback.hero.titleBlue,
      titleOrange:
        pick(meta, ['about_title_orange', 'about_heading_orange', 'title_orange']) ||
        fallback.hero.titleOrange,
    },
    story: {
      kicker: pick(meta, ['about_story_kicker', 'about_kicker']) || fallback.story.kicker,
      heading: pick(meta, ['about_story_heading', 'about_story_title']) || fallback.story.heading,
      body: splitParagraphs(
        pick(meta, ['about_story_body', 'about_story_content', 'about_body']),
        fallback.story.body,
      ),
      image: {
        src: normalizeImageUrl(
          pick(meta, ['about_story_image', 'about_image']),
          storyImage.src,
        ),
        alt:
          pick(meta, ['about_story_image_alt', 'about_image_alt']) ||
          storyImage.alt,
      },
    },
    quote: pick(meta, ['about_quote', 'about_statement']) || fallback.quote,
    valueCards: valueCardsFromMeta(meta),
    coreValues: coreValuesFromMeta(meta),
    managementTeam: managementTeamFromMeta(meta),
    cta: {
      heading:
        pick(meta, ['about_cta_heading', 'movement_cta_heading']) ||
        fallback.cta.heading,
      donateLabel:
        pick(meta, ['about_cta_donate_label', 'movement_cta_donate_label']) ||
        fallback.cta.donateLabel,
      donateHref:
        pick(meta, ['about_cta_donate_href', 'movement_cta_donate_href']) ||
        fallback.cta.donateHref,
      volunteerLabel:
        pick(meta, ['about_cta_volunteer_label', 'movement_cta_volunteer_label']) ||
        fallback.cta.volunteerLabel,
      volunteerHref:
        pick(meta, ['about_cta_volunteer_href', 'movement_cta_volunteer_href']) ||
        fallback.cta.volunteerHref,
    },
  };
}

export async function getAboutPageData(slug = ABOUT_US_PAGE_SLUG): Promise<AboutPageData> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const cached = unstable_cache(
    async () => resolveAboutPageData(cleanSlug),
    [
      'about-page-v3',
      cleanSlug,
      process.env.COMPANY_API_BASE_URL || 'static',
      COMPANY_API_DOMAIN || '',
      staticAboutContentKey(),
    ],
    {
      revalidate: ABOUT_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, 'about-page', `page:${cleanSlug}`],
    },
  );
  return cached();
}

export type {
  AboutCoreValue,
  AboutCoreValuesData,
  AboutCtaData,
  AboutHeroData,
  AboutManagementTeamData,
  AboutPageData,
  AboutStoryData,
  AboutTeamMember,
  AboutValueCard,
} from './types';
