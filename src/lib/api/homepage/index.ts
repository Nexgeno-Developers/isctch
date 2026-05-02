import 'server-only';

import { unstable_cache } from 'next/cache';

import type {
  HomeAboutCoreValuesData,
  HomeActionPillarIconId,
  HomeActionPillarItem,
  HomeActionPillarsData,
  HomeCoreValueIconId,
  HomeCoreValueItem,
  HomeHeroData,
  HomeHappyClientTestimonial,
  HomeHappyClientsData,
  HomeImpactStatsData,
  HomePageData,
  HomePeaceSummitCard,
  HomePeaceSummitsData,
  HomeSupportMovementData,
  HomeEngagementCard,
  HomeEngagementData,
} from './types';
import { aboutUsPath, getInvolvedPath } from '@/config/publicRoutes';
import { API_CACHE_TAG, fetchJsonCached } from '@/lib/api/apiCache';

const HOMEPAGE_PAGE_SLUG = (process.env.HOMEPAGE_PAGE_SLUG || 'home').replace(
  /^\/+|\/+$/g,
  '',
);

const COMPANY_API_DOMAIN =
  process.env.COMPANY_API_DOMAIN?.replace(/\/+$/, '') || '';

/** When true, hero copy can still come from the CMS but the image always uses STATIC_HOME_HERO.image. */
const HOME_HERO_FORCE_STATIC_IMAGE = ['1', 'true', 'yes'].includes(
  (process.env.HOME_HERO_FORCE_STATIC_IMAGE || '').toLowerCase().trim(),
);

const STATIC_HOME_HERO: HomeHeroData = {
  overline: 'ONE WORLD . ONE FAMILY',
  headline: {
    accent: '#IamPeace',
    lineMiddle: '— A United World Walking Toward',
    accentWord: 'Harmony',
  },
  description:
    'We are a global collective dedicated to fostering inner peace as the foundation for world peace. Join millions in a movement of selfless service, friendship, and radical inclusion.',
  primaryCta: {
    label: 'Join the movement',
    href: '/#join-movement',
  },
  secondaryCta: {
    label: 'Learn more',
    href: aboutUsPath(),
    
  },
  image: {
    src: '/hero_images.png',
    alt: 'Diverse group of smiling people representing global community',
  },
  statCard: {
    label: 'Active community',
    value: '2.4M+',
  },
};

const STATIC_IMPACT_STATS: HomeImpactStatsData = {
  items: [
    { mode: 'count', end: 3, suffix: '+', label: 'Global summits' },
    { mode: 'count', end: 50, suffix: '+', label: 'Countries reached' },
    { mode: 'count', end: 7, suffix: '', pad: 2, label: 'Core values' },
    { mode: 'symbol', symbol: '∞', label: 'Peace ambassadors' },
  ],
};

const STATIC_ABOUT_CORE_VALUES: HomeAboutCoreValuesData = {
  aboutKicker: 'About us',
  headlineLine1: 'Humanity is our Religion,',
  headlineLine2: 'Kindness is our Prayer.',
  body:
    'iSCTH is a global movement rooted in the belief that lasting peace begins with how we treat one another every day. We bring people together across cultures and borders through friendship, service, and shared values—so communities everywhere can grow stronger in empathy, dignity, and trust.',
  visionLabel: '"Vision:',
  visionText: 'To establish peace on earth as One World – One Family."',
  coreValuesKicker: 'Core values',
  values: [
    { icon: 'hand-heart', label: 'True friendship' },
    { icon: 'leaf', label: 'Selfless service' },
    { icon: 'handshake', label: 'Respect' },
    { icon: 'heart', label: 'Forgiveness' },
    { icon: 'scales', label: 'Equality' },
  ],
};

const CORE_VALUE_ICON_IDS: HomeCoreValueIconId[] = [
  'hand-heart',
  'leaf',
  'handshake',
  'heart',
  'scales',
];

function normalizeCoreValueIcon(raw: string): HomeCoreValueIconId {
  const s = raw.trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
  if ((CORE_VALUE_ICON_IDS as string[]).includes(s)) return s as HomeCoreValueIconId;
  if (s.includes('friend') || s.includes('hand-heart')) return 'hand-heart';
  if (s.includes('leaf') || s.includes('service')) return 'leaf';
  if (s.includes('shake') || s.includes('respect')) return 'handshake';
  if (s.includes('scale') || s.includes('equal')) return 'scales';
  if (s.includes('forgive') || s === 'heart') return 'heart';
  return 'heart';
}

function coreValuesListFromMeta(meta: MetaRecord | undefined): HomeCoreValueItem[] | null {
  if (!meta) return null;
  const out: HomeCoreValueItem[] = [];
  for (let i = 1; i <= 12; i++) {
    const label = pick(meta, [
      `about_core_value_${i}_label`,
      `core_value_${i}_label`,
      `home_core_value_${i}_label`,
    ]);
    if (!label) continue;
    const iconRaw = pick(meta, [
      `about_core_value_${i}_icon`,
      `core_value_${i}_icon`,
      `home_core_value_${i}_icon`,
    ]);
    out.push({
      label,
      icon: iconRaw ? normalizeCoreValueIcon(iconRaw) : STATIC_ABOUT_CORE_VALUES.values[out.length]?.icon ?? 'heart',
    });
  }
  return out.length ? out : null;
}

function aboutCoreValuesFromMeta(meta: MetaRecord | undefined): HomeAboutCoreValuesData | null {
  if (!meta) return null;

  const line1 = pick(meta, ['about_headline_line1', 'home_about_headline_1']);
  const body = pick(meta, ['about_body', 'home_about_body', 'about_intro']);
  const visionText = pick(meta, ['about_vision_text', 'home_about_vision', 'vision_statement']);
  const list = coreValuesListFromMeta(meta);

  if (!line1 && !body && !visionText && !list) return null;

  return {
    aboutKicker:
      pick(meta, ['about_kicker', 'home_about_kicker']) || STATIC_ABOUT_CORE_VALUES.aboutKicker,
    headlineLine1: line1 || STATIC_ABOUT_CORE_VALUES.headlineLine1,
    headlineLine2:
      pick(meta, ['about_headline_line2', 'home_about_headline_2']) ||
      STATIC_ABOUT_CORE_VALUES.headlineLine2,
    body: body || STATIC_ABOUT_CORE_VALUES.body,
    visionLabel:
      pick(meta, ['about_vision_label', 'home_about_vision_label']) ||
      STATIC_ABOUT_CORE_VALUES.visionLabel,
    visionText: visionText || STATIC_ABOUT_CORE_VALUES.visionText,
    coreValuesKicker:
      pick(meta, ['core_values_kicker', 'about_core_values_kicker', 'home_core_values_kicker']) ||
      STATIC_ABOUT_CORE_VALUES.coreValuesKicker,
    values: list ?? STATIC_ABOUT_CORE_VALUES.values,
  };
}

const STATIC_ACTION_PILLARS: HomeActionPillarsData = {
  kicker: 'What we do',
  title: 'Our Action Pillars',
  pillars: [
    {
      icon: 'people',
      title: 'Interfaith Dialogues',
      description:
        'Building bridges between faiths to celebrate our shared human spirit and universal truths.',
    },
    {
      icon: 'meditation',
      title: 'Inner Peace Tools',
      description:
        'Mindfulness and meditation practices designed to cultivate resilience and personal tranquility.',
    },
    {
      icon: 'graduation',
      title: 'Youth Leadership',
      description:
        'Empowering the next generation with ethical leadership skills and a global perspective.',
    },
    {
      icon: 'megaphone',
      title: 'Raising Our Voice',
      description:
        'Advocating for the marginalized through global awareness campaigns and digital activism.',
    },
    {
      icon: 'book',
      title: 'Peace Education',
      description:
        'Integrating peace-building curriculum into schools and community learning centers.',
    },
    {
      icon: 'scales-policy',
      title: 'Policy Advocacy',
      description:
        'Collaborating with international bodies to influence policies that support global harmony.',
    },
  ],
};

const ACTION_PILLAR_ICON_IDS: HomeActionPillarIconId[] = [
  'people',
  'meditation',
  'graduation',
  'megaphone',
  'book',
  'scales-policy',
];

function normalizeActionPillarIcon(
  raw: string,
  fallbackIndex: number,
): HomeActionPillarIconId {
  const s = raw.trim().toLowerCase().replace(/_/g, '-').replace(/\s+/g, '-');
  if ((ACTION_PILLAR_ICON_IDS as string[]).includes(s)) return s as HomeActionPillarIconId;
  if (s.includes('people') || s.includes('group') || s.includes('interfaith')) return 'people';
  if (s.includes('meditat') || s.includes('mindful') || s.includes('inner-peace')) return 'meditation';
  if (s.includes('graduat') || s.includes('youth') || s.includes('cap')) return 'graduation';
  if (s.includes('megaphone') || s.includes('voice') || s.includes('raising')) return 'megaphone';
  if (s.includes('book') || s.includes('education') && !s.includes('policy')) return 'book';
  if (s.includes('scale') || s.includes('policy') || s.includes('advocacy')) return 'scales-policy';
  return STATIC_ACTION_PILLARS.pillars[fallbackIndex]?.icon ?? 'people';
}

function actionPillarsListFromMeta(meta: MetaRecord | undefined): HomeActionPillarItem[] | null {
  if (!meta) return null;
  const out: HomeActionPillarItem[] = [];
  for (let i = 1; i <= 12; i++) {
    const title = pick(meta, [
      `action_pillar_${i}_title`,
      `pillar_${i}_title`,
      `home_action_pillar_${i}_title`,
    ]);
    if (!title) continue;
    const description = pick(meta, [
      `action_pillar_${i}_description`,
      `pillar_${i}_description`,
      `home_action_pillar_${i}_description`,
    ]);
    const iconRaw = pick(meta, [
      `action_pillar_${i}_icon`,
      `pillar_${i}_icon`,
      `home_action_pillar_${i}_icon`,
    ]);
    out.push({
      title,
      description: description || '',
      icon: iconRaw ? normalizeActionPillarIcon(iconRaw, out.length) : STATIC_ACTION_PILLARS.pillars[out.length]?.icon ?? 'people',
    });
  }
  return out.length ? out : null;
}

function actionPillarsFromMeta(meta: MetaRecord | undefined): HomeActionPillarsData | null {
  if (!meta) return null;

  const list = actionPillarsListFromMeta(meta);
  const title = pick(meta, ['action_pillars_title', 'pillars_title', 'home_action_pillars_title']);
  const kicker = pick(meta, [
    'action_pillars_kicker',
    'pillars_kicker',
    'what_we_do_kicker',
    'home_action_pillars_kicker',
  ]);

  if (!list && !title && !kicker) return null;

  return {
    kicker: kicker || STATIC_ACTION_PILLARS.kicker,
    title: title || STATIC_ACTION_PILLARS.title,
    pillars: list ?? STATIC_ACTION_PILLARS.pillars,
  };
}

const STATIC_PEACE_SUMMITS: HomePeaceSummitsData = {
  kicker: 'Events',
  title: 'Global Peace Summits',
  summits: [
    {
      location: 'Geneva, Switzerland',
      title: 'The Diplomatic Dialogue',
      description:
        'Focusing on neutral mediation and international law frameworks for a peaceful 21st century.',
      image: {
        src: '/diplomatic_image1.jpg',
        alt: 'International conference hall and diplomacy setting',
      },
    },
    {
      location: 'Erding, Germany',
      title: 'The Community Core',
      description:
        'Harnessing the power of local communities and grassroots activism to spark national change.',
      image: {
        src: '/comminuty_core_images.jpg',
        alt: 'Diverse group of people gathering in a community space',
      },
    },
    {
      location: 'Dubai, UAE',
      title: 'Future Harmony',
      description:
        'Exploring the intersection of technology, sustainable cities, and ethical human progress.',
      image: {
        src: '/future_images.jpg',
        alt: 'Modern city skyline at sunset',
      },
    },
    {
      location: 'Nairobi, Kenya',
      title: 'Grassroots Horizons',
      description:
        'Connecting regional leaders and youth networks to scale peace initiatives from the village to the continent.',
      image: {
        src: '/comminuty_core_images.jpg',
        alt: 'African city skyline and open horizon',
      },
    },
    {
      location: 'Tokyo, Japan',
      title: 'East Meets West',
      description:
        'Dialogues that honor ancestral wisdom while designing modern institutions rooted in compassion and clarity.',
      image: {
        src: '/diplomatic_image1.jpg',
        alt: 'Tokyo cityscape at night',
      },
    },
    {
      location: 'New York, USA',
      title: 'Urban Peace Labs',
      description:
        'City-wide experiments in restorative justice, public art, and neighborhood trust in the world’s great metros.',
      image: {
        src: '/comminuty_core_images.jpg',
        alt: 'New York City skyline',
      },
    },
  ],
};

const loremQuote =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

const STATIC_HAPPY_CLIENTS: HomeHappyClientsData = {
  title: 'Happy Clients',
  testimonials: [
    {
      quote: loremQuote,
      rating: 4.8,
      authorName: 'John Smith',
      authorInitial: 'J',
    },
    {
      quote: loremQuote,
      rating: 4.8,
      authorName: 'John Smith',
      authorInitial: 'J',
    },
    {
      quote: loremQuote,
      rating: 4.8,
      authorName: 'John Smith',
      authorInitial: 'J',
    },
    {
      quote: loremQuote,
      rating: 4.9,
      authorName: 'Maria Chen',
      authorInitial: 'M',
    },
    {
      quote: loremQuote,
      rating: 4.7,
      authorName: 'David Okonkwo',
      authorInitial: 'D',
    },
    {
      quote: loremQuote,
      rating: 5,
      authorName: 'Elena Rossi',
      authorInitial: 'E',
    },
  ],
};

function happyClientsListFromMeta(meta: MetaRecord | undefined): HomeHappyClientTestimonial[] | null {
  if (!meta) return null;
  const out: HomeHappyClientTestimonial[] = [];
  for (let i = 1; i <= 16; i++) {
    const quote = pick(meta, [
      `happy_client_${i}_quote`,
      `testimonial_${i}_quote`,
      `home_happy_client_${i}_quote`,
    ]);
    if (!quote) continue;
    const authorName =
      pick(meta, [`happy_client_${i}_name`, `testimonial_${i}_name`, `home_happy_client_${i}_name`]) ||
      'Client';
    const initialRaw = pick(meta, [
      `happy_client_${i}_initial`,
      `testimonial_${i}_initial`,
      `home_happy_client_${i}_initial`,
    ]);
    const authorInitial = (initialRaw || authorName.trim().charAt(0) || '?').toUpperCase().slice(0, 1);
    const ratingRaw = pick(meta, [`happy_client_${i}_rating`, `testimonial_${i}_rating`]);
    const rating = ratingRaw ? Number.parseFloat(ratingRaw.replace(/[^\d.]/g, '')) : 4.8;
    const avatarSrc = pick(meta, [`happy_client_${i}_avatar`, `testimonial_${i}_image`]);
    const avatarAlt = pick(meta, [`happy_client_${i}_avatar_alt`, `testimonial_${i}_image_alt`]) || authorName;
    const item: HomeHappyClientTestimonial = {
      quote,
      rating: Number.isFinite(rating) ? Math.min(5, Math.max(0, rating)) : 4.8,
      authorName,
      authorInitial,
    };
    if (avatarSrc) {
      item.avatar = { src: normalizeImageUrl(avatarSrc), alt: avatarAlt };
    }
    out.push(item);
  }
  return out.length ? out : null;
}

function happyClientsFromMeta(meta: MetaRecord | undefined): HomeHappyClientsData | null {
  if (!meta) return null;

  const list = happyClientsListFromMeta(meta);
  const title = pick(meta, ['happy_clients_title', 'testimonials_title', 'home_happy_clients_title']);

  if (!list && !title) return null;

  return {
    title: title || STATIC_HAPPY_CLIENTS.title,
    testimonials: list ?? STATIC_HAPPY_CLIENTS.testimonials,
  };
}

function peaceSummitsListFromMeta(meta: MetaRecord | undefined): HomePeaceSummitCard[] | null {
  if (!meta) return null;
  const out: HomePeaceSummitCard[] = [];
  for (let i = 1; i <= 16; i++) {
    const title = pick(meta, [
      `peace_summit_${i}_title`,
      `summit_${i}_title`,
      `home_peace_summit_${i}_title`,
    ]);
    if (!title) continue;
    const location =
      pick(meta, [
        `peace_summit_${i}_location`,
        `summit_${i}_location`,
        `home_peace_summit_${i}_location`,
      ]) ||
      STATIC_PEACE_SUMMITS.summits[out.length]?.location ||
      '';
    const description =
      pick(meta, [
        `peace_summit_${i}_description`,
        `summit_${i}_description`,
        `home_peace_summit_${i}_description`,
      ]) || '';
    const imageSrc = pick(meta, [
      `peace_summit_${i}_image`,
      `summit_${i}_image`,
      `home_peace_summit_${i}_image`,
    ]);
    const imageAlt =
      pick(meta, [`peace_summit_${i}_image_alt`, `summit_${i}_image_alt`]) || title;
    const fallbackImg = STATIC_PEACE_SUMMITS.summits[out.length]?.image ?? STATIC_PEACE_SUMMITS.summits[0].image;
    out.push({
      location,
      title,
      description,
      image: {
        src: imageSrc ? normalizeImageUrl(imageSrc) : fallbackImg.src,
        alt: imageAlt,
      },
    });
  }
  return out.length ? out : null;
}

function peaceSummitsFromMeta(meta: MetaRecord | undefined): HomePeaceSummitsData | null {
  if (!meta) return null;

  const list = peaceSummitsListFromMeta(meta);
  const title = pick(meta, [
    'peace_summits_title',
    'global_peace_summits_title',
    'home_peace_summits_title',
  ]);
  const kicker = pick(meta, [
    'peace_summits_kicker',
    'events_kicker',
    'home_peace_summits_kicker',
  ]);

  if (!list && !title && !kicker) return null;

  return {
    kicker: kicker || STATIC_PEACE_SUMMITS.kicker,
    title: title || STATIC_PEACE_SUMMITS.title,
    summits: list ?? STATIC_PEACE_SUMMITS.summits,
  };
}

const STATIC_SUPPORT_MOVEMENT: HomeSupportMovementData = {
  header: {
    titleCyan: '#Iam',
    titleOrange: 'PEACE',
    subline: 'From Inner Peace to World Peace.',
  },
  panel: {
    headline: 'Support the Movement',
    body:
      'Your contribution directly funds global peace summits, humanitarian aid, and education programs that reach thousands of communities. Every gift helps us expand dialogue, heal divisions, and build a more compassionate world.',
    donorsLine: 'JOINED BY 45,000+ DONORS',
    avatars: [
      {
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
        alt: 'Donor portrait',
      },
      {
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        alt: 'Donor portrait',
      },
      {
        src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
        alt: 'Donor portrait',
      },
    ],
  },
};

function supportMovementFromMeta(meta: MetaRecord | undefined): HomeSupportMovementData | null {
  if (!meta) return null;

  const panelHeadline = pick(meta, [
    'donation_headline',
    'support_movement_headline',
    'donation_panel_headline',
  ]);
  if (!panelHeadline) return null;

  const avatars: HomeSupportMovementData['panel']['avatars'] = [];
  for (let i = 1; i <= 3; i++) {
    const srcRaw = pick(meta, [`donation_avatar_${i}_src`, `support_avatar_${i}`]);
    const alt = pick(meta, [`donation_avatar_${i}_alt`]) || `Supporter ${i}`;
    const fallback = STATIC_SUPPORT_MOVEMENT.panel.avatars[i - 1];
    avatars.push({
      src: srcRaw ? normalizeImageUrl(srcRaw) : (fallback?.src ?? STATIC_SUPPORT_MOVEMENT.panel.avatars[0].src),
      alt,
    });
  }

  return {
    header: {
      titleCyan: pick(meta, ['donation_header_cyan', 'peace_brand_cyan']) || STATIC_SUPPORT_MOVEMENT.header.titleCyan,
      titleOrange: pick(meta, ['donation_header_orange', 'peace_brand_orange']) || STATIC_SUPPORT_MOVEMENT.header.titleOrange,
      subline: pick(meta, ['donation_subline', 'support_subline']) || STATIC_SUPPORT_MOVEMENT.header.subline,
    },
    panel: {
      headline: panelHeadline,
      body: pick(meta, ['donation_body', 'support_movement_body']) || STATIC_SUPPORT_MOVEMENT.panel.body,
      donorsLine: pick(meta, ['donation_donors_line', 'support_donors_line']) || STATIC_SUPPORT_MOVEMENT.panel.donorsLine,
      avatars: avatars.length === 3 ? avatars : STATIC_SUPPORT_MOVEMENT.panel.avatars,
    },
  };
}

const STATIC_ENGAGEMENT: HomeEngagementData = {
  kicker: 'Engagement',
  title: 'Join Our Global Family',
  cards: [
    {
      title: 'Peace Ambassador',
      description:
        'Represent the movement in your region, host gatherings, and welcome newcomers into a culture of kindness.',
    },
    {
      title: 'Community Chapter Lead',
      description:
        'Coordinate local chapters, partner with schools and faith groups, and keep momentum between global events.',
    },
    {
      title: 'Youth Facilitator',
      description:
        'Mentor young leaders through workshops, dialogue circles, and service projects that build lasting friendships.',
    },
    {
      title: 'Interfaith Liaison',
      description:
        'Bridge diverse traditions through shared meals, study circles, and joint service that highlight our common humanity.',
    },
    {
      title: 'Digital Storyteller',
      description:
        'Amplify voices of hope through social content, newsletters, and campaigns that inspire action worldwide.',
    },
    {
      title: 'Summit Volunteer',
      description:
        'Support flagship gatherings with logistics, hospitality, and participant care that make every summit memorable.',
    },
    {
      title: 'Education Partner',
      description:
        'Integrate peace literacy into classrooms and community programs with curriculum, training, and follow-up.',
    },
    {
      title: 'Policy Fellow',
      description:
        'Connect grassroots insight with institutions through briefings, coalitions, and ethical advocacy for peace.',
    },
  ],
  cta: {
    label: 'Apply as peace ambassador',
    href: getInvolvedPath(),
  },
};

function engagementCardsFromMeta(meta: MetaRecord | undefined): HomeEngagementCard[] | null {
  if (!meta) return null;
  const out: HomeEngagementCard[] = [];
  for (let i = 1; i <= 16; i++) {
    const title = pick(meta, [`engagement_card_${i}_title`, `engagement_${i}_title`]);
    if (!title) continue;
    const description =
      pick(meta, [`engagement_card_${i}_description`, `engagement_${i}_description`]) || '';
    out.push({ title, description });
  }
  return out.length ? out : null;
}

function engagementFromMeta(meta: MetaRecord | undefined): HomeEngagementData | null {
  if (!meta) return null;

  const title = pick(meta, ['engagement_title', 'join_family_title', 'home_engagement_title']);
  const kicker = pick(meta, ['engagement_kicker', 'engagement_label', 'home_engagement_kicker']);
  const list = engagementCardsFromMeta(meta);

  if (!title && !kicker && !list) return null;

  return {
    kicker: kicker || STATIC_ENGAGEMENT.kicker,
    title: title || STATIC_ENGAGEMENT.title,
    cards: list ?? STATIC_ENGAGEMENT.cards,
    cta: {
      label:
        pick(meta, ['engagement_cta_label', 'peace_ambassador_cta_label']) ||
        STATIC_ENGAGEMENT.cta.label,
      href: pick(meta, ['engagement_cta_url', 'peace_ambassador_cta_url']) || STATIC_ENGAGEMENT.cta.href,
    },
  };
}

function buildCompanyApiUrl(endpoint: string): string | null {
  const baseUrl = process.env.COMPANY_API_BASE_URL?.trim();
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/+$/, '');
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

function normalizeImageUrl(url: string): string {
  const u = url.trim();
  if (!u) return STATIC_HOME_HERO.image.src;
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('/')) return u;
  if (!COMPANY_API_DOMAIN) return u.startsWith('/') ? u : `/${u}`;
  return `${COMPANY_API_DOMAIN}/${u.replace(/^\/+/, '')}`;
}

type MetaRecord = Record<string, string | undefined>;

function pick(meta: MetaRecord | undefined, keys: string[]): string {
  if (!meta) return '';
  for (const k of keys) {
    const v = meta[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

function parseIntSafe(raw: string, fallback: number): number {
  const n = Number.parseInt(raw.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : fallback;
}

function heroFromMeta(meta: MetaRecord | undefined): HomeHeroData | null {
  if (!meta || typeof meta !== 'object') return null;

  const accent = pick(meta, ['hero_heading_accent', 'hero_accent', 'headline_accent']);
  const description = pick(meta, ['hero_description', 'description']);
  if (!accent && !description) return null;

  return {
    overline: pick(meta, ['hero_overline', 'overline']) || STATIC_HOME_HERO.overline,
    headline: {
      accent: accent || STATIC_HOME_HERO.headline.accent,
      lineMiddle:
        pick(meta, ['hero_heading_middle', 'hero_line_middle', 'headline_middle']) ||
        STATIC_HOME_HERO.headline.lineMiddle,
      accentWord:
        pick(meta, ['hero_heading_accent_word', 'hero_accent_word', 'headline_word']) ||
        STATIC_HOME_HERO.headline.accentWord,
    },
    description: description || STATIC_HOME_HERO.description,
    primaryCta: {
      label:
        pick(meta, ['hero_primary_cta_label', 'primary_cta_label']) ||
        STATIC_HOME_HERO.primaryCta.label,
      href:
        pick(meta, ['hero_primary_cta_url', 'primary_cta_url']) ||
        STATIC_HOME_HERO.primaryCta.href,
    },
    secondaryCta: {
      label:
        pick(meta, ['hero_secondary_cta_label', 'secondary_cta_label']) ||
        STATIC_HOME_HERO.secondaryCta.label,
      href:
        pick(meta, ['hero_secondary_cta_url', 'secondary_cta_url']) ||
        STATIC_HOME_HERO.secondaryCta.href,
    },
    image: {
      src: (() => {
        // Avoid generic `image` / `image_alt` — page featured image would override the hero asset.
        const imageSrc = pick(meta, ['hero_image', 'hero_image_url', 'home_hero_image']);
        return imageSrc ? normalizeImageUrl(imageSrc) : STATIC_HOME_HERO.image.src;
      })(),
      alt: pick(meta, ['hero_image_alt', 'home_hero_image_alt']) || STATIC_HOME_HERO.image.alt,
    },
    statCard: {
      label: pick(meta, ['hero_stat_label', 'stat_label']) || STATIC_HOME_HERO.statCard.label,
      value: pick(meta, ['hero_stat_value', 'stat_value']) || STATIC_HOME_HERO.statCard.value,
    },
  };
}

function impactFromMeta(meta: MetaRecord | undefined): HomeImpactStatsData | null {
  if (!meta) return null;

  const s1 = pick(meta, ['impact_summits_end', 'impact_stat_1_end']);
  const s2 = pick(meta, ['impact_countries_end', 'impact_stat_2_end']);
  const s3 = pick(meta, ['impact_values_end', 'impact_stat_3_end']);
  const sym = pick(meta, ['impact_ambassadors_symbol', 'impact_stat_4_symbol']);

  if (!s1 && !s2 && !s3 && !sym) return null;

  const items: HomeImpactStatsData['items'] = [];

  if (s1 || pick(meta, ['impact_summits_label'])) {
    items.push({
      mode: 'count',
      end: s1 ? parseIntSafe(s1, 3) : 3,
      suffix: pick(meta, ['impact_summits_suffix']) || '+',
      label: pick(meta, ['impact_summits_label']) || STATIC_IMPACT_STATS.items[0].label,
    });
  }
  if (s2 || pick(meta, ['impact_countries_label'])) {
    items.push({
      mode: 'count',
      end: s2 ? parseIntSafe(s2, 50) : 50,
      suffix: pick(meta, ['impact_countries_suffix']) || '+',
      label: pick(meta, ['impact_countries_label']) || STATIC_IMPACT_STATS.items[1].label,
    });
  }
  if (s3 || pick(meta, ['impact_values_label'])) {
    const padRaw = pick(meta, ['impact_values_pad']);
    items.push({
      mode: 'count',
      end: s3 ? parseIntSafe(s3, 7) : 7,
      suffix: pick(meta, ['impact_values_suffix']) || '',
      pad: padRaw ? parseIntSafe(padRaw, 2) : 2,
      label: pick(meta, ['impact_values_label']) || STATIC_IMPACT_STATS.items[2].label,
    });
  }
  if (sym || pick(meta, ['impact_ambassadors_label'])) {
    items.push({
      mode: 'symbol',
      symbol: sym || '∞',
      label: pick(meta, ['impact_ambassadors_label']) || STATIC_IMPACT_STATS.items[3].label,
    });
  }

  if (items.length < 4) return null;
  return { items };
}

type PageApiPayload = {
  data?: {
    meta?: MetaRecord | MetaRecord[];
    slug?: string;
  };
};

function normalizeMeta(raw: PageApiPayload['data']): MetaRecord | undefined {
  const m = raw?.meta;
  if (!m) return undefined;
  if (Array.isArray(m)) {
    const out: MetaRecord = {};
    for (const row of m) {
      if (row && typeof row === 'object') {
        for (const [k, v] of Object.entries(row)) {
          if (typeof v === 'string') out[k] = v;
        }
      }
    }
    return out;
  }
  return m as MetaRecord;
}

async function fetchPagePayload(): Promise<PageApiPayload | null> {
  const url = buildCompanyApiUrl(`/v1/page/${HOMEPAGE_PAGE_SLUG}`);
  if (!url) return null;
  try {
    return await fetchJsonCached<PageApiPayload>(url, {
      tags: ['homepage', `page:${HOMEPAGE_PAGE_SLUG}`],
      init: { headers: { Accept: 'application/json' } },
    });
  } catch {
    return null;
  }
}

async function resolveHomePage(): Promise<HomePageData> {
  const payload = await fetchPagePayload();
  const meta = normalizeMeta(payload?.data);

  let hero = heroFromMeta(meta) ?? STATIC_HOME_HERO;
  if (HOME_HERO_FORCE_STATIC_IMAGE) {
    hero = { ...hero, image: STATIC_HOME_HERO.image };
  }
  const impactStats = impactFromMeta(meta) ?? STATIC_IMPACT_STATS;
  const aboutCoreValues = aboutCoreValuesFromMeta(meta) ?? STATIC_ABOUT_CORE_VALUES;
  const actionPillars = actionPillarsFromMeta(meta) ?? STATIC_ACTION_PILLARS;
  const peaceSummits = peaceSummitsFromMeta(meta) ?? STATIC_PEACE_SUMMITS;
  const happyClients = happyClientsFromMeta(meta) ?? STATIC_HAPPY_CLIENTS;
  const supportMovement = supportMovementFromMeta(meta) ?? STATIC_SUPPORT_MOVEMENT;
  const engagement = engagementFromMeta(meta) ?? STATIC_ENGAGEMENT;

  return {
    hero,
    impactStats,
    aboutCoreValues,
    actionPillars,
    peaceSummits,
    happyClients,
    supportMovement,
    engagement,
  };
}

const PAGE_CACHE_SECONDS = Number(
  process.env.HOMEPAGE_HERO_REVALIDATE_SECONDS ?? 60 * 60,
);

const getCachedHomePage = unstable_cache(
  resolveHomePage,
  ['homepage-page', HOMEPAGE_PAGE_SLUG, process.env.COMPANY_API_BASE_URL || 'static'],
  {
    revalidate: PAGE_CACHE_SECONDS,
    tags: [API_CACHE_TAG, 'homepage', 'homepage-hero', `page:${HOMEPAGE_PAGE_SLUG}`],
  },
);

export async function getHomePageData(): Promise<HomePageData> {
  return getCachedHomePage();
}

export async function getHomeHero(): Promise<HomeHeroData> {
  return (await getCachedHomePage()).hero;
}

export async function getHomeImpactStats(): Promise<HomeImpactStatsData> {
  return (await getCachedHomePage()).impactStats;
}

export async function getHomeAboutCoreValues(): Promise<HomeAboutCoreValuesData> {
  return (await getCachedHomePage()).aboutCoreValues;
}

export async function getHomeActionPillars(): Promise<HomeActionPillarsData> {
  return (await getCachedHomePage()).actionPillars;
}

export async function getHomePeaceSummits(): Promise<HomePeaceSummitsData> {
  return (await getCachedHomePage()).peaceSummits;
}

export async function getHomeHappyClients(): Promise<HomeHappyClientsData> {
  return (await getCachedHomePage()).happyClients;
}

export async function getHomeSupportMovement(): Promise<HomeSupportMovementData> {
  return (await getCachedHomePage()).supportMovement;
}

export async function getHomeEngagement(): Promise<HomeEngagementData> {
  return (await getCachedHomePage()).engagement;
}

export type {
  HomeAboutCoreValuesData,
  HomeActionPillarIconId,
  HomeActionPillarItem,
  HomeActionPillarsData,
  HomeCoreValueIconId,
  HomeCoreValueItem,
  HomeEngagementCard,
  HomeEngagementData,
  HomeHeroData,
  HomeHeroCta,
  HomeImpactStatItem,
  HomeImpactStatsData,
  HomePageData,
  HomeHappyClientTestimonial,
  HomeHappyClientsData,
  HomePeaceSummitCard,
  HomePeaceSummitsData,
  HomeSupportMovementData,
} from './types';
