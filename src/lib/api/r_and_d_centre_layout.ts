import { cache } from 'react';

type Media = { url?: string | null } | null | undefined;

type RAndDCentreApiResponse = {
  data?: {
    slug: string;
    title: string;
    layout?: string;
    content?: string;
    meta?: {
      breadcrumb_image?: Media;
      hero_eyebrow?: string;
      hero_title?: string;
      hero_description?: string;
      intro_heading_black?: string;
      intro_heading_blue?: string;
      intro_body?: string;
      cta_primary_text?: string;
      cta_primary_url?: string;
      cta_secondary_text?: string;
      cta_secondary_url?: string;
      stat_cards?: Array<{
        icon?: Media;
        value?: string;
        label?: string;
      }>;
      lifecycle_title_black?: string;
      lifecycle_title_blue?: string;
      lifecycle_cards?: Array<{
        icon?: Media;
        title?: string;
        description?: string;
        tags?: string[] | string;
      }>;
      laboratory_zones_title_black?: string;
      laboratory_zones_title_blue?: string;
      laboratory_zones_subtitle?: string;
      laboratory_zones_items?: Array<{
        icon?: Media;
        title?: string;
        description?: string;
        tags?: string[] | string;
      }>;
      bottom_cta_title?: string;
      bottom_cta_description?: string;
      bottom_cta_link_text?: string;
      bottom_cta_link_url?: string;
      bottom_cta_background_image?: Media;
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
  /** 0–5 selects built-in line icon when iconUrl is absent */
  iconVariant: number;
  title: string;
  description: string;
  tags: string[];
};

export type RAndDCentreLifecycleSection = {
  titleBlack: string;
  titleBlue: string;
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
  titleBlack: string;
  titleBlue: string;
  subtitle?: string;
  items: RAndDLaboratoryZoneItem[];
};

export type RAndDCentreBottomCtaSection = {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  /** Defaults to `/technical_bg.jpg` */
  backgroundImage?: string;
};

export type RAndDCentrePageData = {
  title: string;
  heroBackgroundImage?: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  introHeadingBlack: string;
  introHeadingBlue: string;
  introBodyHtml: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  stats: RAndDCentreStatCard[];
  lifecycleSection: RAndDCentreLifecycleSection;
  laboratoryZonesSection: RAndDLaboratoryZonesSection;
  bottomCtaSection: RAndDCentreBottomCtaSection;
};

const DEFAULT_PAGE: RAndDCentrePageData = {
  title: 'R&D Centre',
  heroBackgroundImage: '/about_banner.jpg',
  heroEyebrow: 'Our facility',
  heroTitle: 'A WORLD-CLASS HOME FOR PACKAGING INNOVATION',
  heroDescription:
    'Our 20,000 m² Innovation Center in Kunshan, China, is a global hub where ideas become industry breakthroughs.',
  introHeadingBlack: 'Where Packaging',
  introHeadingBlue: 'Science Meets Performance',
  introBodyHtml: `<p>Our R&amp;D laboratory unites material scientists, process engineers, and packaging specialists to advance aseptic barrier systems, structural design, and sustainable materials. Every test bench and pilot line is built to turn fundamental research into repeatable performance on your filling lines.</p>`,
  primaryCta: { text: 'EXPLORE OUR CAPABILITIES', href: '/packaging' },
  secondaryCta: { text: 'TALK TO OUR TEAM', href: '/contact-us' },
  stats: [
    {
      id: '1',
      value: '>¥110M',
      label: 'Investment in Laboratory Infrastructure',
    },
    {
      id: '2',
      value: '500 M²',
      label: 'Dedicated Laboratory Floor Space',
    },
    {
      id: '3',
      value: '20,000 M²',
      label: 'Innovation Center Campus Footprint',
    },
  ],
  lifecycleSection: {
    titleBlack: 'End-To-End Testing Across The',
    titleBlue: 'Full Packaging Lifecycle',
    cards: [
      {
        id: 'l1',
        iconVariant: 0,
        title: 'Polymer & Material Analysis',
        description:
          'We characterise the thermal rheological, and mechanical properties of every polymer used in our packaging structures ensuring the right material is chosen for the right function every time.',
        tags: ['DSC', 'TGA', 'Rheology', 'Melt Flow Index', 'Moisture Content'],
      },
      {
        id: 'l2',
        iconVariant: 1,
        title: 'Paperboard Performance',
        description:
          'The structural backbone of our cartons is tested for stiffness, tensile strength, air permeability, and printing compatibility—guaranteeing reliable performance on high-speed filling lines.',
        tags: ['Stiffness', 'Tensile Strength', 'Roughness (PPS)', 'Air Permeability', 'Bond Strength'],
      },
      {
        id: 'l3',
        iconVariant: 2,
        title: 'Surface & Interface Analysis',
        description:
          'From heat-seal integrity to ink adhesion, our surface labs ensure every interface within the packaging structure bonds perfectly—preventing leaks, delamination, and contamination risk.',
        tags: ['Surface Free Energy', 'Optical Microscopy', 'Heat Seal Testing', 'Layer Quantification'],
      },
      {
        id: 'l4',
        iconVariant: 3,
        title: 'Food Safety & Beverage Compatibility',
        description:
          'We assess how our packaging interacts with your specific product—testing for off-flavour migration, protein and fat compatibility, conductivity, and shelf-life performance under real-world conditions.',
        tags: ['Shelf Life', 'Protein/Fat Analysis', 'Conductivity', 'pH'],
      },
      {
        id: 'l5',
        iconVariant: 4,
        title: 'Sensory Evaluation',
        description:
          'A dedicated sensory lab, operating to GB/T 25006 and GB/T 21172 standards ensures our packaging does not impart any odour or flavour to your beverage—preserving the authentic taste your consumers expect.',
        tags: ['GB/T 25006', 'GB/T 21172', 'Odour', 'Flavour', 'Panel Testing'],
      },
      {
        id: 'l6',
        iconVariant: 5,
        title: 'Spectroscopic & Optical Analysis',
        description:
          'FTIR, UV-Vis and microscopy tools allow our chemists to identify materials, detect contaminants, measure light resistance, and verify printing quality at the molecular level.',
        tags: ['FTIR', 'UV-Vis', 'Microscopy', 'Light Resistance', 'Print Quality'],
      },
    ],
  },
  laboratoryZonesSection: {
    titleBlack: 'SEVEN SPECIALIZED',
    titleBlue: 'LABORATORY ZONES',
    subtitle: 'FROM SENSORY SCIENCE TO COMPETITIVE BENCHMARKING',
    items: [
      {
        id: 'z1',
        title: 'SENSORY LAB',
        description:
          "A controlled environment designed to detect the faintest odour or taste that could compromise your brand's flavour profile. Our trained panel evaluates packaging against the strictest sensory benchmarks.",
        tags: ['Odour Chamber', 'Flavour Migration', 'GB/T Standards'],
      },
      {
        id: 'z2',
        title: 'FOOD SCIENCE LAB',
        description:
          'Equipped to analyse the key nutritional and chemical parameters of beverages, this lab validates packaging compatibility across fat, protein, sugar, and pH — covering the full spectrum of beverage formats.',
        tags: ['Fat Analyser', 'Refractometer', 'Kjeldahl Protein', 'pH Meter', 'Incubator'],
      },
      {
        id: 'z3',
        title: 'SPECTROSCOPIC LAB',
        description:
          'From identifying unknown materials to confirming surface oxidation levels and light resistance of our barrier layers, our spectroscopy suite provides definitive molecular-level answers.',
        tags: ['FTIR (Lumas)', 'Color-Difference Meter', 'UV-VIS'],
      },
      {
        id: 'z4',
        title: 'POLYMER MATERIALS LAB',
        description:
          'This lab characterises the full thermal and flow behaviour of the polyethylene and specialty polymers used in our multi-layer structures — critical data for both new product development and quality control.',
        tags: ['DSC', 'TGA', 'Rheometer', 'Melt Flow Index'],
      },
      {
        id: 'z5',
        title: 'PULP & PAPER LAB',
        description:
          'Our paperboard testing capability covers the full range of mechanical and printability properties. We qualify every board grade used in our carton structures for both performance and converting compatibility.',
        tags: ['Bending Force', 'Gurley Air Perm.', 'COF Tester', 'Bendtsen', 'Micrometer'],
      },
      {
        id: 'z6',
        title: 'SURFACE ANALYSIS LAB',
        description:
          'Assessing surface free energy, layer-by-layer structure using optical microscopy, and heat-seal integrity across our formed packages — this lab is the final quality gate before materials enter production.',
        tags: ['OD Tester', 'DSA (Contact Angle)', 'Optical Microscope', 'Heat Seal Tester'],
      },
      {
        id: 'z7',
        title: 'PRE-TREATMENT & SAMPLE PREP LAB',
        description:
          'From cross-section grinding to small-scale extrusion and casting film trials, this lab enables rapid prototyping and sample preparation — accelerating innovation cycles for new packaging structures.',
        tags: ['Muffle Furnace', 'Cross-Section Grinder', 'Extrusion (Casting)', 'Climate Chamber'],
      },
      {
        id: 'z8',
        title: 'COMPETITIVE BENCHMARKING',
        description:
          "Beyond our own materials, our lab conducts structured benchmarking of competitive packaging in the market — giving our customers clarity on where Lamipak leads, and where we're pushing even further.",
        tags: ['Defect Analysis', 'New Design Validation', 'Market Comparison'],
      },
    ],
  },
  bottomCtaSection: {
    title: 'WANT TO BUILD THE NEXT GENERATION OF PACKAGE?',
    description:
      'Talk to our R&D team about your next beverage launch, existing packaging challenges, or a technical consultation for your specific formulation.',
    ctaText: 'REQUEST TECHNICAL CONSULTATION',
    ctaHref: '/contact-us',
    backgroundImage: '/technical_bg.jpg',
  },
};

function mediaUrl(media?: Media) {
  const url = media?.url;
  return typeof url === 'string' && url.trim() ? url : undefined;
}

function clean(s?: string | null) {
  const t = (s ?? '').trim();
  return t || undefined;
}

function parseTags(input: string[] | string | undefined): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.map((t) => String(t).trim()).filter(Boolean);
  return String(input)
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function mapApiToPage(api: NonNullable<RAndDCentreApiResponse['data']>): RAndDCentrePageData {
  const meta = api.meta || {};
  const base = { ...DEFAULT_PAGE };

  const heroBg = mediaUrl(meta.breadcrumb_image);
  if (heroBg) base.heroBackgroundImage = heroBg;

  base.title = clean(api.title) || base.title;
  base.heroEyebrow = clean(meta.hero_eyebrow) || base.heroEyebrow;
  base.heroTitle = clean(meta.hero_title) || base.heroTitle;
  base.heroDescription = clean(meta.hero_description) || base.heroDescription;

  base.introHeadingBlack = clean(meta.intro_heading_black) || base.introHeadingBlack;
  base.introHeadingBlue = clean(meta.intro_heading_blue) || base.introHeadingBlue;
  if (clean(meta.intro_body)) {
    base.introBodyHtml = meta.intro_body!.trim();
  }

  const pText = clean(meta.cta_primary_text);
  const pUrl = clean(meta.cta_primary_url);
  if (pText && pUrl) base.primaryCta = { text: pText, href: pUrl };
  else if (pText) base.primaryCta = { ...base.primaryCta, text: pText };
  else if (pUrl) base.primaryCta = { ...base.primaryCta, href: pUrl };

  const sText = clean(meta.cta_secondary_text);
  const sUrl = clean(meta.cta_secondary_url);
  if (sText && sUrl) base.secondaryCta = { text: sText, href: sUrl };
  else if (sText) base.secondaryCta = { ...base.secondaryCta, text: sText };
  else if (sUrl) base.secondaryCta = { ...base.secondaryCta, href: sUrl };

  const cards = meta.stat_cards;
  if (cards?.length) {
    base.stats = cards
      .map((c, idx) => {
        const value = clean(c.value);
        const label = clean(c.label);
        if (!value || !label) return null;
        return {
          id: String(idx + 1),
          iconUrl: mediaUrl(c.icon),
          value,
          label,
        };
      })
      .filter(Boolean) as RAndDCentreStatCard[];
  }

  const lb = clean(meta.lifecycle_title_black);
  const lblue = clean(meta.lifecycle_title_blue);
  if (lb) base.lifecycleSection.titleBlack = lb;
  if (lblue) base.lifecycleSection.titleBlue = lblue;

  const life = meta.lifecycle_cards;
  if (life?.length) {
    const mapped = life
      .map((c, idx) => {
        const title = clean(c.title);
        const description = clean(c.description);
        if (!title || !description) return null;
        const tags = parseTags(c.tags);
        return {
          id: `lc-${idx + 1}`,
          iconUrl: mediaUrl(c.icon),
          iconVariant: idx % 6,
          title,
          description,
          tags: tags.length ? tags : base.lifecycleSection.cards[idx]?.tags ?? [],
        };
      })
      .filter(Boolean) as RAndDCentreLifecycleCard[];
    if (mapped.length) {
      base.lifecycleSection = { ...base.lifecycleSection, cards: mapped };
    }
  }

  const zb = clean(meta.laboratory_zones_title_black);
  const zblue = clean(meta.laboratory_zones_title_blue);
  const zsub = clean(meta.laboratory_zones_subtitle);
  if (zb) base.laboratoryZonesSection.titleBlack = zb;
  if (zblue) base.laboratoryZonesSection.titleBlue = zblue;
  if (zsub) base.laboratoryZonesSection.subtitle = zsub;

  const zItems = meta.laboratory_zones_items;
  if (zItems?.length) {
    const mapped = zItems
      .map((z, idx) => {
        const title = clean(z.title);
        const description = clean(z.description);
        if (!title || !description) return null;
        const tags = parseTags(z.tags);
        return {
          id: `z-${idx + 1}`,
          iconUrl: mediaUrl(z.icon),
          title,
          description,
          tags: tags.length ? tags : base.laboratoryZonesSection.items[idx]?.tags ?? [],
        };
      })
      .filter(Boolean) as RAndDLaboratoryZoneItem[];
    if (mapped.length) {
      base.laboratoryZonesSection = { ...base.laboratoryZonesSection, items: mapped };
    }
  }

  const bTitle = clean(meta.bottom_cta_title);
  const bDesc = clean(meta.bottom_cta_description);
  const bCtaT = clean(meta.bottom_cta_link_text);
  const bCtaU = clean(meta.bottom_cta_link_url);
  const bBg = mediaUrl(meta.bottom_cta_background_image);
  if (bTitle) base.bottomCtaSection.title = bTitle;
  if (bDesc) base.bottomCtaSection.description = bDesc;
  if (bCtaT) base.bottomCtaSection.ctaText = bCtaT;
  if (bCtaU) base.bottomCtaSection.ctaHref = bCtaU;
  if (bBg) base.bottomCtaSection.backgroundImage = bBg;

  return base;
}

export const fetchRAndDCentreLayoutPage = cache(async (slug: string) => {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  if (cleanSlug !== 'r-and-d-centre') return null;

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/v1/page/r-and-d-centre`, { cache: 'no-store' });
      if (res.ok) {
        const payload = (await res.json()) as RAndDCentreApiResponse;
        const data = payload.data;
        if (data && data.layout === 'r_and_d_centre') {
          return {
            slug: data.slug,
            title: data.title,
            seo: data.seo || {},
            page: mapApiToPage(data),
          };
        }
      }
    } catch {
      /* fall through to static defaults */
    }
  }

  return {
    slug: 'r-and-d-centre',
    title: DEFAULT_PAGE.title,
    seo: {} as Record<string, unknown>,
    page: { ...DEFAULT_PAGE },
  };
});
