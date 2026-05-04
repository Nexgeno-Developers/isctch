import 'server-only';

import { unstable_cache } from 'next/cache';

import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';
import { DONATE_PAGE_SLUG, getInvolvedPath } from '@/config/publicRoutes';
import type { DonatePageData } from './types';

const COMPANY_API_DOMAIN = process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';
const DONATE_REVALIDATE_SECONDS = Number(
  process.env.DONATE_PAGE_REVALIDATE_SECONDS ?? process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const STATIC_DONATE_PAGE: DonatePageData = {
  hero: {
    breadcrumbHomeLabel: 'Home',
    breadcrumbCurrentLabel: 'Donate',
    kicker: 'Take Action',
    titleBlue: 'Supporting Peace',
    titleOrange: '& Stability',
  },
  stats: {
    items: [
      { value: '45+', label: 'Missions' },
      { value: '1.2M', label: 'Lives Impacted' },
      { value: '82%', label: 'Efficiency' },
      { value: '$0.95', label: 'Per Dollar Direct' },
    ],
  },
  contribution: {
    heading: 'Your contribution builds the foundations of global harmony.',
    paragraphOne:
      'Peace is not merely the absence of conflict, but the presence of justice and sustainable development. Through your support, ISCTH empowers grassroots movements and diplomatic dialogues across volatile regions.',
    paragraphTwo:
      'Every donation directly funds diplomatic training, community mediation centers, and crisis intervention programs that bridge the gap between hostility and understanding.',
    quote: 'Peace begins with a single act of kindness that reverberates across borders.',
    formTitle: 'Secure Donation',
    secureLabel: '100% Secure',
    oneTimeLabel: 'One-time',
    monthlyLabel: 'Monthly',
    fullNamePlaceholder: 'Full Name*',
    emailPlaceholder: 'Email Address*',
    countryPlaceholder: 'Country*',
    phonePlaceholder: 'Phone (optional)',
    currencyPlaceholder: 'Currency',
    amounts: [25, 50, 100, 250, 500],
    defaultAmount: 50,
    otherLabel: 'Other',
    customAmountPlaceholder: 'Custom Amount',
    submitOneTimeLabel: 'Donate for Peace',
    submitMonthlyLabel: 'Donate Monthly',
    footnote:
      'Tax-deductible under 501(c)(3) regulations. Receipt sent instantly via email.',
  },
  beyondSupport: {
    heading: 'Beyond Financial Support',
    subheading:
      'There are countless ways to strengthen the fabric of global peace. Explore how you can contribute your time and voice.',
    cards: [
      {
        icon: 'volunteer',
        title: 'Volunteer Globally',
        description:
          'Join our field teams in humanitarian relief, educational initiatives, or community organizing projects.',
        ctaLabel: 'Learn More',
        ctaHref: getInvolvedPath(),
      },
      {
        icon: 'advocacy',
        title: 'Advocacy & Voice',
        description:
          'Champion our causes in your own community by sharing our mission and participating in digital campaigns.',
        ctaLabel: 'View Toolkit',
        ctaHref: getInvolvedPath(),
      },
      {
        icon: 'partners',
        title: 'Corporate Partners',
        description:
          'Align your organization with peace through strategic sponsorship, grants, and employee engagement.',
        ctaLabel: 'Partner with us',
        ctaHref: '/contact-us',
      },
    ],
  },
  joinMovement: {
    heading: 'Together, we are the architects of a better world.',
    buttonLabel: 'Join the Movement',
    buttonHref: getInvolvedPath(),
    backgroundImage: {
      src: '/calltoaction_images1.webp',
      alt: 'Earth from space with glowing horizon',
    },
  },
};

function staticDonateContentKey(): string {
  const contribution = STATIC_DONATE_PAGE.contribution;
  return [
    STATIC_DONATE_PAGE.hero.kicker,
    STATIC_DONATE_PAGE.hero.titleBlue,
    STATIC_DONATE_PAGE.hero.titleOrange,
    contribution.heading,
    contribution.paragraphOne,
    contribution.paragraphTwo,
    contribution.quote,
    contribution.formTitle,
    contribution.secureLabel,
    contribution.oneTimeLabel,
    contribution.monthlyLabel,
    contribution.fullNamePlaceholder,
    contribution.emailPlaceholder,
    contribution.countryPlaceholder,
    contribution.phonePlaceholder,
    contribution.currencyPlaceholder,
    contribution.amounts.join(','),
    String(contribution.defaultAmount),
    contribution.otherLabel,
    contribution.customAmountPlaceholder,
    contribution.submitOneTimeLabel,
    contribution.submitMonthlyLabel,
    contribution.footnote,
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

function pick(meta: MetaRecord | undefined, keys: string[]): string {
  if (!meta) return '';
  for (const key of keys) {
    const value = meta[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function parseIntSafe(raw: string, fallback: number): number {
  const n = Number.parseInt(raw.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : fallback;
}

function parseAmounts(raw: string): number[] {
  const values = raw
    .split(/[,\s]+/)
    .map((s) => Number.parseInt(s.replace(/\D/g, ''), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  return values.length ? values : STATIC_DONATE_PAGE.contribution.amounts;
}

function normalizeImageUrl(url: string): string {
  const u = url.trim();
  if (!u) return STATIC_DONATE_PAGE.joinMovement.backgroundImage.src;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (u.startsWith('public/')) return `/${u.replace(/^public\/+/, '')}`;
  if (!u.includes('/')) return `/${u}`;
  if (!COMPANY_API_DOMAIN) return `/${u.replace(/^\/+/, '')}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

function normalizeMeta(data: PageApiPayload['data']): MetaRecord | undefined {
  const meta = data?.meta;
  if (!meta) return undefined;
  if (Array.isArray(meta)) {
    const out: MetaRecord = {};
    for (const row of meta) {
      if (!row || typeof row !== 'object') continue;
      for (const [k, v] of Object.entries(row)) {
        if (typeof v === 'string') out[k] = v;
      }
    }
    return out;
  }
  return meta as MetaRecord;
}

function donateFromMeta(meta: MetaRecord | undefined): DonatePageData | null {
  if (!meta) return null;

  const heading = pick(meta, ['donation_heading', 'donate_heading']);
  const heroBlue = pick(meta, ['donate_title_blue', 'donation_title_blue']);
  const heroOrange = pick(meta, ['donate_title_orange', 'donation_title_orange']);
  if (!heading && !heroBlue && !heroOrange) return null;

  const amountsRaw = pick(meta, ['donation_amounts', 'donate_amounts']);
  const amounts = amountsRaw ? parseAmounts(amountsRaw) : STATIC_DONATE_PAGE.contribution.amounts;
  const defaultRaw = pick(meta, ['donation_default_amount', 'donate_default_amount']);
  const parsedDefault = defaultRaw
    ? parseIntSafe(defaultRaw, STATIC_DONATE_PAGE.contribution.defaultAmount)
    : STATIC_DONATE_PAGE.contribution.defaultAmount;
  const defaultAmount = amounts.includes(parsedDefault) ? parsedDefault : amounts[0]!;

  const stats = STATIC_DONATE_PAGE.stats.items.map((item, i) => ({
    value: pick(meta, [`donate_stat_${i + 1}_value`, `donation_stat_${i + 1}_value`]) || item.value,
    label: pick(meta, [`donate_stat_${i + 1}_label`, `donation_stat_${i + 1}_label`]) || item.label,
  }));
  const beyondCards = STATIC_DONATE_PAGE.beyondSupport.cards.map((item, i) => ({
    icon: (pick(meta, [`donate_beyond_card_${i + 1}_icon`, `donation_beyond_card_${i + 1}_icon`]) as
      | 'volunteer'
      | 'advocacy'
      | 'partners') || item.icon,
    title:
      pick(meta, [`donate_beyond_card_${i + 1}_title`, `donation_beyond_card_${i + 1}_title`]) ||
      item.title,
    description:
      pick(meta, [
        `donate_beyond_card_${i + 1}_description`,
        `donation_beyond_card_${i + 1}_description`,
      ]) || item.description,
    ctaLabel:
      pick(meta, [`donate_beyond_card_${i + 1}_cta_label`, `donation_beyond_card_${i + 1}_cta_label`]) ||
      item.ctaLabel,
    ctaHref:
      pick(meta, [`donate_beyond_card_${i + 1}_cta_url`, `donation_beyond_card_${i + 1}_cta_url`]) ||
      item.ctaHref,
  }));

  return {
    hero: {
      breadcrumbHomeLabel:
        pick(meta, ['donate_breadcrumb_home', 'donation_breadcrumb_home']) ||
        STATIC_DONATE_PAGE.hero.breadcrumbHomeLabel,
      breadcrumbCurrentLabel:
        pick(meta, ['donate_breadcrumb_current', 'donation_breadcrumb_current']) ||
        STATIC_DONATE_PAGE.hero.breadcrumbCurrentLabel,
      kicker:
        pick(meta, ['donate_kicker', 'donation_kicker']) || STATIC_DONATE_PAGE.hero.kicker,
      titleBlue: heroBlue || STATIC_DONATE_PAGE.hero.titleBlue,
      titleOrange: heroOrange || STATIC_DONATE_PAGE.hero.titleOrange,
    },
    stats: { items: stats },
    contribution: {
      heading: heading || STATIC_DONATE_PAGE.contribution.heading,
      paragraphOne:
        pick(meta, ['donation_paragraph_one', 'donate_paragraph_one']) ||
        STATIC_DONATE_PAGE.contribution.paragraphOne,
      paragraphTwo:
        pick(meta, ['donation_paragraph_two', 'donate_paragraph_two']) ||
        STATIC_DONATE_PAGE.contribution.paragraphTwo,
      quote: pick(meta, ['donation_quote', 'donate_quote']) || STATIC_DONATE_PAGE.contribution.quote,
      formTitle:
        pick(meta, ['donation_form_title', 'donate_form_title']) ||
        STATIC_DONATE_PAGE.contribution.formTitle,
      secureLabel:
        pick(meta, ['donation_secure_label', 'donate_secure_label']) ||
        STATIC_DONATE_PAGE.contribution.secureLabel,
      oneTimeLabel:
        pick(meta, ['donation_one_time_label', 'donate_one_time_label']) ||
        STATIC_DONATE_PAGE.contribution.oneTimeLabel,
      monthlyLabel:
        pick(meta, ['donation_monthly_label', 'donate_monthly_label']) ||
        STATIC_DONATE_PAGE.contribution.monthlyLabel,
      fullNamePlaceholder:
        pick(meta, ['donation_full_name_placeholder', 'donate_full_name_placeholder']) ||
        STATIC_DONATE_PAGE.contribution.fullNamePlaceholder,
      emailPlaceholder:
        pick(meta, ['donation_email_placeholder', 'donate_email_placeholder']) ||
        STATIC_DONATE_PAGE.contribution.emailPlaceholder,
      countryPlaceholder:
        pick(meta, ['donation_country_placeholder', 'donate_country_placeholder']) ||
        STATIC_DONATE_PAGE.contribution.countryPlaceholder,
      phonePlaceholder:
        pick(meta, ['donation_phone_placeholder', 'donate_phone_placeholder']) ||
        STATIC_DONATE_PAGE.contribution.phonePlaceholder,
      currencyPlaceholder:
        pick(meta, ['donation_currency_placeholder', 'donate_currency_placeholder']) ||
        STATIC_DONATE_PAGE.contribution.currencyPlaceholder,
      amounts,
      defaultAmount,
      otherLabel:
        pick(meta, ['donation_other_label', 'donate_other_label']) ||
        STATIC_DONATE_PAGE.contribution.otherLabel,
      customAmountPlaceholder:
        pick(meta, ['donation_custom_amount_placeholder', 'donate_custom_amount_placeholder']) ||
        STATIC_DONATE_PAGE.contribution.customAmountPlaceholder,
      submitOneTimeLabel:
        pick(meta, ['donation_submit_one_time', 'donate_submit_one_time']) ||
        STATIC_DONATE_PAGE.contribution.submitOneTimeLabel,
      submitMonthlyLabel:
        pick(meta, ['donation_submit_monthly', 'donate_submit_monthly']) ||
        STATIC_DONATE_PAGE.contribution.submitMonthlyLabel,
      footnote:
        pick(meta, ['donation_footnote', 'donate_footnote']) ||
        STATIC_DONATE_PAGE.contribution.footnote,
    },
    beyondSupport: {
      heading:
        pick(meta, ['donate_beyond_heading', 'donation_beyond_heading']) ||
        STATIC_DONATE_PAGE.beyondSupport.heading,
      subheading:
        pick(meta, ['donate_beyond_subheading', 'donation_beyond_subheading']) ||
        STATIC_DONATE_PAGE.beyondSupport.subheading,
      cards: beyondCards,
    },
    joinMovement: {
      heading:
        pick(meta, ['donate_join_heading', 'donation_join_heading']) ||
        STATIC_DONATE_PAGE.joinMovement.heading,
      buttonLabel:
        pick(meta, ['donate_join_button_label', 'donation_join_button_label']) ||
        STATIC_DONATE_PAGE.joinMovement.buttonLabel,
      buttonHref:
        pick(meta, ['donate_join_button_url', 'donation_join_button_url']) ||
        STATIC_DONATE_PAGE.joinMovement.buttonHref,
      backgroundImage: {
        src: (() => {
          const imageRaw = pick(meta, ['donate_join_image', 'donation_join_image']);
          return imageRaw
            ? normalizeImageUrl(imageRaw)
            : STATIC_DONATE_PAGE.joinMovement.backgroundImage.src;
        })(),
        alt:
          pick(meta, ['donate_join_image_alt', 'donation_join_image_alt']) ||
          STATIC_DONATE_PAGE.joinMovement.backgroundImage.alt,
      },
    },
  };
}

async function fetchDonatePayload(slug: string): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${slug}`);
  if (!url) return null;
  return fetchJsonCached<PageApiPayload>(url, {
    tags: ['donate-page', `page:${slug}`],
    init: { headers: { Accept: 'application/json' } },
  });
}

async function resolveDonatePageData(slug: string): Promise<DonatePageData> {
  const payload = await fetchDonatePayload(slug);
  const meta = normalizeMeta(payload?.data);
  const mapped = donateFromMeta(meta);
  if (!mapped) return STATIC_DONATE_PAGE;

  return {
    hero: { ...STATIC_DONATE_PAGE.hero, ...mapped.hero },
    stats: {
      items: mapped.stats?.items?.length ? mapped.stats.items : STATIC_DONATE_PAGE.stats.items,
    },
    contribution: { ...STATIC_DONATE_PAGE.contribution, ...mapped.contribution },
    beyondSupport: {
      ...STATIC_DONATE_PAGE.beyondSupport,
      ...mapped.beyondSupport,
      cards:
        mapped.beyondSupport?.cards?.length
          ? mapped.beyondSupport.cards
          : STATIC_DONATE_PAGE.beyondSupport.cards,
    },
    joinMovement: {
      ...STATIC_DONATE_PAGE.joinMovement,
      ...mapped.joinMovement,
      backgroundImage: {
        ...STATIC_DONATE_PAGE.joinMovement.backgroundImage,
        ...mapped.joinMovement?.backgroundImage,
      },
    },
  };
}

export async function getDonatePageData(slug = DONATE_PAGE_SLUG): Promise<DonatePageData> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const cached = unstable_cache(
    async () => resolveDonatePageData(cleanSlug),
    [
      'donate-page-v3',
      cleanSlug,
      process.env.COMPANY_API_BASE_URL || 'static',
      COMPANY_API_DOMAIN || '',
      staticDonateContentKey(),
    ],
    {
      revalidate: DONATE_REVALIDATE_SECONDS,
      tags: [API_CACHE_TAG, 'donate-page', `page:${cleanSlug}`],
    },
  );
  return cached();
}

export type {
  DonateBeyondSupportData,
  DonateContributionData,
  DonateHeroData,
  DonateJoinMovementData,
  DonatePageData,
  DonateStatItem,
  DonateStatsData,
} from './types';
