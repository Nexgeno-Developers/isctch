/**
 * Fake API for typed dynamic pages (Lamira, Green Efforts, etc.)
 *
 * Shape matches the real Laravel API we plan to build:
 * {
 *   slug: string;
 *   type: string;
 *   title: string;
 *   content: string;
 * }
 *
 * Later you can replace this with real fetch calls in `src/lib/api.ts`
 * without touching the route or page components.
 */

import { getCompanyData as fakeGetCompanyData } from '@/fake-api/company';
import type { CompanyData } from '@/fake-api/company';

export interface GreenPhotovoltaicProjectBlock {
  locationLabel: string;
  /** Icon next to location (default: lightbulb) */
  locationIcon?: 'lightbulb' | 'sun';
  title: string;
  description: string;
  phases: Array<{
    id: string;
    badge: string;
    metrics: Array<{ label: string; value: string }>;
    footerNote?: string;
  }>;
  summaryMetrics: Array<{
    id: string;
    icon: 'lightning' | 'sun' | 'globe' | 'hand' | 'hand_arrows';
    label: string;
    value: string;
  }>;
  /** Accent for badges, icons, location (e.g. #009CFF) */
  accentColor?: string;
  /** Inner card fill (e.g. #EEF2F3) */
  surfaceCardColor?: string;
}

export interface DynamicPageData {
  slug: string;
  type: string;
  title: string;
  content: string;
  /** Our Company page data (reuses existing company mock model) */
  ourCompanyData?: CompanyData;
  lamiraMeetSection?: {
    titlePrefix?: string;
    titleHighlight: string;
    titleSuffix?: string;
    subtitle: string;
    storyTitle: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  lamiraSpecialAbilitiesSection?: {
    headingHighlight: string;
    headingSuffix: string;
    subtitle: string;
    image: string;
    imageAlt: string;
    videoUrl: string;
    abilities: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  lamiraLovesSection?: {
    headingPrefix?: string;
    headingHighlight: string;
    headingSuffix?: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }>;
  };
  lamiraSharedGuideSection?: {
    image: string;
    imageAlt: string;
    headingPrefix?: string;
    headingHighlight: string;
    headingSuffix?: string;
    description: string;
  };
  lamiraSocialWorldMomentsSection?: {
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix?: string;
    items: Array<{
      id: string;
      image: string;
      imageAlt: string;
    }>;
  };
  /** Two-column “Advancing our sustainability journey” block (Our Green Efforts) */
  greenSustainabilityJourneySection?: {
    headingLineBlue: string;
    headingLineBlack: string;
    body: string;
    image: string;
    imageAlt: string;
    /** Default #f8f9fa */
    backgroundColor?: string;
    /** First heading line color, default #00AEEF */
    accentColor?: string;
  };
  /** Sustainability vision grid (Our Green Efforts page) */
  greenSustainabilityVisionSection?: {
    headingBrand: string;
    headingRest: string;
    subtitle: string;
    cards: Array<{
      id: string;
      title: string;
      icon: 'globe' | 'social' | 'product' | 'business';
      bullets: Array<{
        parts: Array<{ text: string; bold?: boolean }>;
      }>;
    }>;
    footerText: string;
  };
  /** Photovoltaic / case-study blocks (Our Green Efforts); render in order */
  greenPhotovoltaicProjectSections?: GreenPhotovoltaicProjectBlock[];
  /** Green Building Certifications (certifications-achievements page) */
  certificationsGreenBuildingSection?: {
    eyebrow: string;
    /** First part of main title, shown in green */
    headingGreen: string;
    /** Second part of main title, shown in black */
    headingBlack: string;
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
      /** Footer seals / logos */
      badgeImages?: Array<{ src: string; alt: string }>;
    }>;
  };
  /** Vertical sustainability timeline (e.g. certifications-achievements page) */
  certificationsSustainabilityTimelineSection?: {
    headingBlue: string;
    headingBlack: string;
    subtitle: string;
    items: Array<{
      id: string;
      year: string;
      title: string;
      description: string;
    }>;
    accentColor?: string;
    backgroundColor?: string;
  };
  /** Square “View certificate” tiles row (certifications-achievements page) */
  certificationsCertificateTilesSection?: {
    items: Array<{
      id: string;
      /** Document URL (PDF or page) */
      href: string;
      /** Defaults to “VIEW CERTIFICATE” */
      ctaLabel?: string;
      openInNewTab?: boolean;
    }>;
    cardBackgroundColor?: string;
    linkColor?: string;
    iconColor?: string;
    sectionBackgroundColor?: string;
  };
  /** NGO membership world map (NGOs page) */
  ngosMembershipMapSection?: {
    headingBlue: string;
    headingBlack: string;
    markers: Array<{
      id: string;
      lines: string[];
      topPercent: number;
      leftPercent: number;
      size?: 'md' | 'lg';
      leaderHeightPx?: number;
    }>;
    accentColor?: string;
    leaderLineColor?: string;
    dotColor?: string;
    sectionBackgroundColor?: string;
  };
  /** Circular future intro + people & community (NGOs page) */
  ngosCircularFutureSection?: {
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
  };
  /** NGO alliance / recycling target cards (NGOs page) */
  ngosAllianceCardsSection?: {
    fieldLabels?: {
      organization?: string;
      initiative?: string;
      recyclingTarget?: string;
    };
    cards: Array<{
      id: string;
      /** First card: thick blue border */
      highlighted?: boolean;
      organizationName: string;
      initiativeDescription: string;
      recyclingTargets: string[];
    }>;
    accentColor?: string;
    highlightBorderColor?: string;
    cardBackgroundColor?: string;
    sectionBackgroundColor?: string;
  };
  /** Path to carbon neutrality timeline (2050 roadmap page) */
  carbonNetZeroRoadmapSection?: {
    headingBlack: string;
    headingBlue: string;
    milestones: Array<{
      id: string;
      year: string;
      title: string;
      icon: 'target' | 'trend' | 'leaf';
      bullets: string[];
    }>;
    summaryBarText: string;
    accentColor?: string;
    iconCircleBackground?: string;
    connectorLineColor?: string;
    sectionBackgroundColor?: string;
    summaryBarBackground?: string;
  };
  /** Key sustainability pillars grid (e.g. carbon roadmap page) */
  carbonNetZeroPillarsSection?: {
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon:
        | 'carbon_verification'
        | 'efficiency_innovation'
        | 'renewable_electricity'
        | 'supply_chain'
        | 'rd_innovation'
        | 'cdp_leadership';
    }>;
    accentColor?: string;
    cardBackgroundColor?: string;
    sectionBackgroundColor?: string;
  };
  seo?: {
    meta_title: string;
    meta_description: string;
    canonical_path?: string; // e.g. '/lamira'
    keywords?: string[];
    author?: string;
    robots?: {
      index?: boolean;
      follow?: boolean;
      nocache?: boolean;
      googleBot?:
        | string
        | {
            index?: boolean;
            follow?: boolean;
            noimageindex?: boolean;
            maxSnippet?: number;
            maxImagePreview?: 'none' | 'standard' | 'large';
            maxVideoPreview?: number;
          };
    };
    og_title?: string;
    og_description?: string;
    og_image?: string;
    og_type?: 'website' | 'article';
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    twitter_card?: 'summary' | 'summary_large_image' | 'player' | 'app';
  };
  heroBackgroundImage?: string;

  /** Governance Management - main framework section */
  governanceFrameworkSection?: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
    cards: Array<{
      id: string;
      title: string;
      subtitle: string;
      iconId:
        | 'framework'
        | 'integrity'
        | 'risk_control'
        | 'supply_chain'
        | 'security'
        | 'whistle';
    }>;
  };

  /** Governance Management - secondary framework section (no CTAs) */
  governanceFrameworkSecondarySection?: {
    eyebrow: string;
    title: string;
    description: string[];
    cards: Array<{
      id: string;
      title: string;
      subtitle: string;
      iconId:
        | 'framework'
        | 'integrity'
        | 'risk_control'
        | 'supply_chain'
        | 'security'
        | 'whistle';
    }>;
  };

  /** Governance Management - detail sections (image + gray center panel) */
  governanceDetailSections?: Array<
    | {
        layout: 'centerPanel';
        eyebrow: string;
        title: string;
        imageSrc: string;
        imageAlt: string;
        centerText: string;
        buttonText: string;
        buttonHref: string;
        paragraphs: string[];
      }
    | {
        layout: 'complianceCards';
        eyebrow: string;
        titleBlue: string;
        title: string;
        imageSrc: string;
        imageAlt: string;
        description?: string[];
        cards: Array<{
          id: string;
          title: string;
          description: string;
          iconId: 'supplier' | 'human_rights' | 'environment' | 'workplace';
        }>;
      }
    | {
        layout: 'securityTrust';
        eyebrow: string;
        titleBlue: string;
        title: string;
        leftParagraphs: string[];
        cards: Array<{
          id: string;
          title: string;
          description: string;
          iconId: 'confidentiality' | 'integrity' | 'availability';
        }>;
        stats: Array<{
          id: string;
          value: string;
          label: string;
        }>;
      }
    | {
        layout: 'whistleblowing';
        eyebrow: string;
        titleBlue: string;
        title: string;
        paragraphs: string[];
      }
    | {
        layout: 'whistleCards';
        cards: Array<{
          id: string;
          title: string;
          description: string;
          iconId: 'confidentiality' | 'non_retaliation' | 'fair_investigation';
        }>;
      }
  >;

  /** Governance Management - GRC section (Risk & Control cards) */
  governanceGrcSection?: {
    eyebrow: string;
    title: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      iconId: 'erm' | 'ic' | 'ia' | 'af';
    }>;
  };
  breadcrumbs?: {
    parentLabel: string;
    parentHref: string;
  };
  sections?: Array<
    | {
        type: 'sustainability_footprint';
        heading: string;
        headingHighlight?: string;
        headingSuffix?: string;
        items: Array<{
          id: string;
          image: string;
          imageAlt?: string;
          title: string;
          description: string;
        }>;
      }
    | {
        type: 'image_quote_banner';
        backgroundImage: string;
        backgroundAlt?: string;
        text: string;
      }
    | {
        type: 'why_cartons_matter';
        heading: string;
        headingHighlight?: string;
        description?: string;
        items: Array<{
          id: string;
          image: string;
          imageAlt?: string;
          title: string;
          description: string;
        }>;
      }
    | {
        type: 'impact_product_banner';
        backgroundImage: string;
        backgroundAlt?: string;
        productImage?: string;
        productAlt?: string;
        headingLines: string[];
      }
    | {
        type: 'power_of_carton_packaging';
        heading: string;
        headingHighlight?: string;
        headingSuffix?: string;
        introBold?: string;
        introText?: string;
        cards: Array<{
          id: string;
          valueHighlight: string;
          valueRest: string;
          title: string;
          descriptionEmphasis?: string;
          description: string;
        }>;
        footnote?: string;
      }
    | {
        type: 'journey_recycling_section';
        heading: string;
        headingHighlight?: string;
        image: string;
        imageAlt?: string;
        description: string;
        ctaText: string;
        ctaLink?: string;
      }
  >;
  // Extra fields can be added here and will be passed through to components
  [key: string]: unknown;
}

const PAGES: DynamicPageData[] = [
  {
    slug: 'lamira',
    type: 'lamira1',
    title: 'Lamira',
    content:
      'Lamira is our next‑generation packaging platform, designed to deliver high performance, flexibility, and efficiency across your filling lines. With Lamira, brands can respond faster to market changes while optimizing total cost of ownership.',
    seo: {
      meta_title: 'Lamira | Packaging Platform | Lamipak',
      meta_description:
        'Discover Lamira, Lamipak’s next‑generation packaging platform engineered for performance, flexibility and total cost efficiency across filling lines.',
      canonical_path: '/lamira',
      keywords: ['lamira', 'lamipak', 'packaging platform', 'sustainable packaging'],
      author: 'Lamipak',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          maxSnippet: -1,
          maxImagePreview: 'large',
          maxVideoPreview: -1,
        },
      },
      og_title: 'Lamira | Next‑Generation Packaging Platform',
      og_description:
        'Lamira helps brands respond faster to market changes while optimizing total cost of ownership.',
      og_image: '/about_banner.jpg',
      og_type: 'website',
      twitter_title: 'Lamira | Next‑Generation Packaging Platform',
      twitter_description:
        'High‑performance, flexible packaging platform from Lamipak, designed for future‑ready filling lines.',
      twitter_image: '/about_banner.jpg',
      twitter_card: 'summary_large_image',
    },
    heroBackgroundImage: '/pick_cartoon_banner.webp',
    breadcrumbs: {
      parentLabel: 'Packaging',
      parentHref: '/',
    },
    lamiraMeetSection: {
      titlePrefix: 'Meet',
      titleHighlight: 'Lamira',
      subtitle: "Lamipak’s guardian of nature and innovation",
      storyTitle: "Lamira’s Story",
      paragraphs: [
        'Lamira was born in the pristine forests of finland, a place known for its pure landscapes, rich biodiversity, and deep connection to nature. from these forests, Lamira began a journey to become a protector of the natural world and a guide for sustainable thinking.',
        'Lamira is known as the eternal guardian, a timeless character who symbolizes the responsibility we all share in caring for our environment. with a friendly personality and a sense of curiosity, Lamira inspires people to see sustainability not as a challenge, but as an opportunity for creativity and progress.',
      ],
      image: '/lamira_right_image.webp',
      imageAlt: 'Lamira tree and sustainable innovation network visual',
    },
    lamiraSpecialAbilitiesSection: {
      headingHighlight: "Lamira's",
      headingSuffix: 'Special Abilities',
      subtitle:
        "Lamira's unique abilities symbolize the transformation and innovation that sustainable packaging can achieve.",
      image: '/banner-slider2.jpg',
      imageAlt: 'Lamira special abilities collage',
      videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
      abilities: [
        {
          id: 'purification-spell',
          title: 'Purification Spell',
          description:
            "Lamira's blue antlers hold magical powers. When they touch discarded packaging materials, they transform them into seeds. these seeds represent new beginnings and the possibility of giving materials a second life.",
        },
        {
          id: 'packaging-reshaping-magic',
          title: 'Packaging Reshaping Magic',
          description:
            "Lamira's blue scarf can morph into any shape. this ability reflects Lamira's expertise in designing flexible packaging solutions that adapt to different products, needs, and industries.",
        },
      ],
    },
    lamiraLovesSection: {
      headingPrefix: 'What',
      headingHighlight: 'Lamira',
      headingSuffix: 'Loves',
      subtitle:
        'Lamira spends time exploring the natural world and bringing together friends who share a passion for protecting it.',
      items: [
        {
          id: 'nature-exploration',
          title: 'Nature Exploration',
          description:
            "From forests and oceans to deserts and mountains, Lamira enjoys discovering the beauty and diversity of earth's landscapes.",
          image: '/what_lamira_1.webp',
          imageAlt: 'People exploring nature trail',
        },
        {
          id: 'creative-diy-projects',
          title: 'Creative DIY Projects',
          description:
            'Lamira enjoys building and creating using materials found in nature, encouraging resourcefulness and responsible use of resources.',
          image: '/what_lamira_2.webp',
          imageAlt: 'Creative DIY projects with craft materials',
        },
        {
          id: 'forest-councils',
          title: 'Forest Councils',
          description:
            "Lamira often gathers animal and plant friends to discuss how to make their shared home more beautiful, balanced, and resilient.",
          image: '/what_lamira_1.webp',
          imageAlt: 'Forest friends council discussion',
        },
      ],
    },
    lamiraSharedGuideSection: {
      image: '/share_left_1.webp',
      imageAlt: 'Lamira shared guide tree in network',
      headingPrefix: 'A Shared Guide',
      headingHighlight: 'For The Future',
      headingSuffix: '',
      description:
        'Lamira is more than a mascot. lamira is a symbol of Lamipak’s commitment to sustainable packaging innovation and a reminder that protecting our planet requires creativity, collaboration, and responsibility. through Lamira’s story, Lamipak invites partners, customers, and communities to imagine a future where packaging solutions support both people and nature. together, guided by lamira, we can continue building a world where innovation nurtures the environment and every idea helps create a more sustainable tomorrow.',
    },
    lamiraSocialWorldMomentsSection: {
      headingPrefix: 'Moments From Our',
      headingHighlight: 'Social World',
      headingSuffix: '',
      items: [
        {
          id: 'moment-1',
          image: '/moments_21.webp',
          imageAlt: 'Social moment image 1',
        },
        {
          id: 'moment-2',
          image: '/moments_22.webp',
          imageAlt: 'Social moment image 2',
        },
        {
          id: 'moment-3',
          image: '/moments_23.webp',
          imageAlt: 'Social moment image 3',
        },
        {
          id: 'moment-4',
          image: '/moments_24.webp',
          imageAlt: 'Social moment image 4',
        },
        {
          id: 'moment-5',
          image: '/moments_25.webp',
          imageAlt: 'Social moment image 5',
        },
        {
          id: 'moment-6',
          image: '/moments_26.webp',
          imageAlt: 'Social moment image 6',
        },
      ],
    },
  },
  {
    slug: 'our-green-efforts',
    type: 'green',
    title: 'Our Green Efforts',
    content:
      'Our Green Efforts initiative brings together responsible sourcing, energy efficiency, and circular packaging design. From renewable materials to expanded recycling partnerships, we work across the value chain to lower environmental impact.',
    heroBackgroundImage: '/pick_cartoon_banner.webp',
    breadcrumbs: {
      parentLabel: 'Home',
      parentHref: '/',
    },
    greenSustainabilityJourneySection: {
      headingLineBlue: '',
      headingLineBlack: 'Advancing Our Sustainability Journey',
      body:
        'Lamipak continues to invest in renewable energy and sustainable manufacturing practices to support our broader climate goals. By integrating solar power into our production facilities, we are reducing greenhouse gas emissions, improving energy efficiency, and contributing to a more sustainable packaging industry. Our green efforts are part of a long-term commitment to responsible growth and environmental stewardship.',
      image: '/our_green_left_image.webp',
      imageAlt: 'Lush green forest canopy framing a bright sky — symbolizing environmental care and renewable growth',
      backgroundColor: '#f8f9fa',
      accentColor: '#00AEEF',
    },
    greenSustainabilityVisionSection: {
      headingBrand: 'Lamipak',
      headingRest: 'Sustainability Vision',
      subtitle:
        'Bring Life To Packaging, Achieve Sustainability Across Every Dimension Of Our Business.',
      cards: [
        {
          id: 'env',
          title: 'ENVIRONMENTAL RESPONSIBILITY',
          icon: 'globe',
          bullets: [
            {
              parts: [
                { text: '42% carbon reduction by 2030 and achieve ' },
                { text: 'net zero', bold: true },
                { text: ' by 2050.' },
              ],
            },
            {
              parts: [
                { text: 'Reduce negative impact on environment to ' },
                { text: 'protect our planet.', bold: true },
              ],
            },
          ],
        },
        {
          id: 'social',
          title: 'SOCIAL RESPONSIBILITY',
          icon: 'social',
          bullets: [
            {
              parts: [{ text: 'Improve employee diversity, equity and inclusion.' }],
            },
            {
              parts: [{ text: 'Launch more social welfare activities.' }],
            },
          ],
        },
        {
          id: 'product',
          title: 'PRODUCT RESPONSIBILITY',
          icon: 'product',
          bullets: [
            {
              parts: [
                {
                  text: 'ECO-Design to reduce carbon emission and promote product recycling.',
                },
              ],
            },
            {
              parts: [{ text: 'Research more sustainable product.' }],
            },
          ],
        },
        {
          id: 'business',
          title: 'BUSINESS RESPONSIBILITY',
          icon: 'business',
          bullets: [
            {
              parts: [
                {
                  text: 'Strengthen the management of business ethic and information security protection to achieve zero information incident to ',
                },
                { text: 'protect our stakeholders.', bold: true },
              ],
            },
            
          ],
        },
      ],
      footerText:
        'We will stay focused on sustainability in our development and forge ahead toward more ethical business, greener products, a more beautiful environment, and a warmer society.',
    },
    greenPhotovoltaicProjectSections: [
      {
        locationIcon: 'lightbulb',
        locationLabel: 'Indonesia',
        accentColor: '#00A0E3',
        surfaceCardColor: '#edf0f1',
        title: 'Indonesia Photovoltaic Project',
        description:
          'Large-Scale Solar Power Installations To Support Greener Manufacturing Across Our Indonesia Facility.',
        phases: [
          {
            id: 'id-phase-1',
            badge: 'Phase 1',
            metrics: [
              { label: 'Installed Capacity', value: '2,868 MW' },
              { label: 'Power Generation', value: '3.8 GWh' },
            ],
          },
          {
            id: 'id-phase-2',
            badge: 'Phase 2',
            metrics: [
              { label: 'Installed Capacity', value: '3,200 MW' },
              { label: 'Power Generation', value: '4.2 GWh' },
            ],
            footerNote: 'Completed On July 1, 2025',
          },
        ],
        summaryMetrics: [
          {
            id: 'green-electricity',
            icon: 'lightning',
            label: 'Total Green Electricity',
            value: '7.05 GWh',
          },
          {
            id: 'solar-share',
            icon: 'sun',
            label: 'On-Site Solar Share',
            value: '42%',
          },
          {
            id: 'co2-avoided',
            icon: 'globe',
            label: 'Estimated CO₂ Avoided',
            value: '3,200 t',
          },
          {
            id: 'community',
            icon: 'hand',
            label: 'Local Community Programs',
            value: '12',
          },
        ],
      },
      {
        locationIcon: 'sun',
        locationLabel: 'Kunshan, China',
        accentColor: '#009CFF',
        surfaceCardColor: '#EEF2F3',
        title: 'Kunshan Photovoltaic Project',
        description:
          'Solar Energy Systems At Our Kunshan Facility To Further Expand Renewable Energy Use.',
        phases: [
          {
            id: 'ks-phase-1',
            badge: 'Phase 1',
            metrics: [
              { label: 'Installed Capacity', value: '9.6 MW' },
              { label: 'Power Generation', value: '10 GWh' },
            ],
          },
          {
            id: 'ks-phase-2',
            badge: 'Phase 2',
            metrics: [
              { label: 'Installed Capacity', value: '7.8 MW' },
              { label: 'Power Generation', value: '6 GWh' },
            ],
          },
        ],
        summaryMetrics: [
          {
            id: 'ks-capacity',
            icon: 'lightning',
            label: 'Total Capacity',
            value: '17.4 MW',
          },
          {
            id: 'ks-generation',
            icon: 'sun',
            label: 'Total Generation',
            value: '16 GWh',
          },
          {
            id: 'ks-coverage',
            icon: 'globe',
            label: 'Energy Coverage',
            value: '~27% Demand',
          },
          {
            id: 'ks-kwh',
            icon: 'hand_arrows',
            label: 'KWh/Solar Gen',
            value: '98,629,959',
          },
        ],
      },
    ],
    seo: {
      meta_title: 'Our Green Efforts | Sustainability | Lamipak',
      meta_description:
        'Learn how Lamipak drives sustainability through responsible sourcing, energy efficiency and circular packaging design.',
      canonical_path: '/our-green-efforts',
      keywords: ['green efforts', 'sustainability', 'lamipak', 'circular packaging'],
      author: 'Lamipak',
      robots: {
        index: true,
        follow: true,
      },
      og_title: 'Our Green Efforts | Lamipak Sustainability',
      og_description:
        'Discover Lamipak’s initiatives to lower environmental impact across the entire packaging value chain.',
      og_image: '/banner-slider1.jpg',
      og_type: 'website',
      twitter_title: 'Our Green Efforts | Lamipak Sustainability',
      twitter_description:
        'From renewable materials to recycling partnerships, see how Lamipak advances circular packaging.',
      twitter_image: '/banner-slider1.jpg',
      twitter_card: 'summary_large_image',
    },
  },
  {
    slug: 'certifications-achievements',
    type: 'certifications',
    title: 'Certifications & Achievements',
    content:
      'Lamipak’s manufacturing sites pursue rigorous green building standards including LEED certification, reflecting our commitment to sustainable facilities and responsible operations.',
    heroBackgroundImage: '/pick_cartoon_banner.webp',
    breadcrumbs: {
      parentLabel: 'Home',
      parentHref: '/',
    },
    certificationsGreenBuildingSection: {
      eyebrow: 'PROTECTING ENVIRONMENT',
      headingGreen: 'Green Building',
      headingBlack: 'Certifications',
      eyebrowColor: '#00AEEF',
      headingGreenColor: '#0D9B4E',
      pillColor: '#009CFF',
      iconCircleColor: '#00AEEF',
      cards: [
        {
          id: 'china-kunshan',
          image: '/certificte_image_1.webp',
          imageAlt: 'Aerial view of Lamipak China factory with rooftop solar panels',
          factoryTitle: 'Lamipak (China) Factory',
          location: 'Kunshan, China',
          certificationLabel: 'LEED Platinum',
          year: '2023',
          description:
            'Our Kunshan facility was designed and operated to meet the highest LEED performance standards for energy, water, indoor environmental quality, and sustainable site development. Rooftop solar and efficient building systems reduce operational carbon intensity while supporting a healthier workplace for our teams.',
          badgeImages: [
            { src: '/platinum.webp', alt: 'LEED Platinum recognition' },
          ],
        },
        {
          id: 'indonesia-cikande',
          image: '/certificte_image_2.webp',
          imageAlt: 'Aerial view of Lamipak Indonesia factory with solar installations',
          factoryTitle: 'Lamipak Indonesia Factory',
          location: 'Cikande, Indonesia',
          certificationLabel: 'LEED Gold',
          year: '2025',
          description:
            'The Cikande plant integrates renewable energy and resource-efficient design to achieve LEED Gold certification, aligning operations with Lamipak’s global sustainability vision and local environmental stewardship in Indonesia.',
          badgeImages: [
            { src: '/awards_image_1.webp', alt: 'LEED Gold certificate' },
            { src: '/awards_image_2.webp', alt: 'U.S. Green Building Council LEED Gold seal' },
          ],
        },
      ],
    },
    certificationsSustainabilityTimelineSection: {
      headingBlue: 'Our Sustainability',
      headingBlack: 'Timeline',
      subtitle: 'Major Milestones In Our Journey Toward Responsible Growth.',
      accentColor: '#00AEEF',
      backgroundColor: '#f8f9fa',
      items: [
        {
          id: 'tl-2019',
          year: '2019',
          title: 'First Sustainability Report',
          description:
            'Released Our First Sustainability Report Aligned With GRI Standards And Carbon Emission Verification.',
        },
        {
          id: 'tl-2020',
          year: '2020',
          title: 'Sustainable Product Launch',
          description: 'Launched The First U-Shaped Paper Straw As An Eco-Friendly Alternative.',
        },
        {
          id: 'tl-2021',
          year: '2021',
          title: 'SBTi & EV Commitment',
          description:
            'Signed The SBTi Commitment And Began Transitioning Fleet To Electric Vehicles.',
        },
        {
          id: 'tl-2022',
          year: '2022',
          title: 'Green Building Upgrade',
          description:
            'Upgraded Building To LEED Standards And Implemented ISO 50001 Energy Management Certification.',
        },
        {
          id: 'tl-2023',
          year: '2023',
          title: 'LEED Platinum Certification',
          description:
            'Kunshan Factory Achieved Dual LEED Platinum Certifications For Production And Office Buildings.',
        },
        {
          id: 'tl-2025',
          year: '2025',
          title: 'LEED Gold Certification',
          description:
            'Indonesian Factory Achieved LEED Gold, With 100% Renewable Electricity In Plant.',
        },
      ],
    },
    certificationsCertificateTilesSection: {
      sectionBackgroundColor: '#ffffff',
      cardBackgroundColor: '#edf0f1',
      linkColor: '#0096FF',
      iconColor: '#8b9399',
      items: [
        {
          id: 'tile-leed-kunshan-prod',
          href: '#',
          ctaLabel: 'VIEW CERTIFICATE',
        },
        {
          id: 'tile-leed-kunshan-office',
          href: '#',
          ctaLabel: 'VIEW CERTIFICATE',
        },
        {
          id: 'tile-leed-indonesia',
          href: '#',
          ctaLabel: 'VIEW CERTIFICATE',
        },
        {
          id: 'tile-iso50001',
          href: '#',
          ctaLabel: 'VIEW CERTIFICATE',
        },
      ],
    },
    seo: {
      meta_title: 'Certifications & Achievements | Green Building | Lamipak',
      meta_description:
        'Explore Lamipak’s LEED-certified factories and green building achievements across China and Indonesia.',
      canonical_path: '/certifications-achievements',
      keywords: ['LEED', 'green building', 'certifications', 'Lamipak', 'sustainability'],
      author: 'Lamipak',
      robots: { index: true, follow: true },
      og_title: 'Certifications & Achievements | Lamipak',
      og_description:
        'Green building certifications including LEED Platinum and LEED Gold at Lamipak manufacturing facilities.',
      og_image: '/banner-slider2.webp',
      og_type: 'website',
      twitter_title: 'Certifications & Achievements | Lamipak',
      twitter_description: 'LEED-certified facilities and sustainability achievements at Lamipak.',
      twitter_image: '/banner-slider2.webp',
      twitter_card: 'summary_large_image',
    },
  },
  {
    slug: 'ngos',
    type: 'ngos',
    title: 'NGOs',
    content:
      'Lamipak works with NGOs and partners across Europe, China, and New Zealand to advance environmental stewardship, responsible packaging, and community engagement.',
    heroBackgroundImage: '/pick_cartoon_banner.webp',
    breadcrumbs: {
      parentLabel: 'Home',
      parentHref: '/',
    },
    ngosMembershipMapSection: {
      headingBlue: 'NGO Membership',
      headingBlack: 'Of Lamipak',
      accentColor: '#00AEEF',
      leaderLineColor: '#7dd3fc',
      dotColor: '#D1D3D4',
      sectionBackgroundColor: '#ffffff',
      markers: [
        {
          id: 'europe',
          lines: ['Europe'],
          topPercent: 33,
          leftPercent: 49,
          size: 'md',
          leaderHeightPx: 52,
        },
        {
          id: 'china',
          lines: ['China'],
          topPercent: 40,
          leftPercent: 71.5,
          size: 'lg',
          leaderHeightPx: 58,
        },
        {
          id: 'new-zealand',
          lines: ['New', 'Zealand'],
          topPercent: 75,
          leftPercent: 87.5,
          size: 'md',
          leaderHeightPx: 48,
        },
      ],
    },
    ngosCircularFutureSection: {
      backgroundColor: '#f9f9f9',
      accentColor: '#00AEEF',
      heroHeadingBlue: 'Working Together For',
      heroHeadingBlack: 'A Circular Future.',
      heroIntro:
        'By Partnering With International Organizations And Industry Platforms, Lamipak Contributes To Strengthening Recycling Systems, Advancing Sustainable Packaging Solutions, And Supporting The Transition To A Circular Economy. These Collaborations Reflect Our Commitment To Shared Responsibility In Protecting The Environment And Building A More Sustainable Packaging Industry.',
      featureHeadingBlack: 'Our',
      featureHeadingBlue: 'People & Community',
      featureBody:
        'To Strengthen Our Learning And Development Framework, We Provide A Diverse Range Of Training Programs That Empower Employees To Enhance Their Skills And Grow Alongside The Organization. We Place The Long-Term, Sustainable Development Of Our Enterprise At The Forefront, With A Strong Commitment To Maintaining The Highest Safety Standards. The Health And Safety Of Our Employees Remain Our Top Priority, Ensuring A Secure And Supportive Working Environment For Everyone.',
      image: '/our_green_left_image.webp',
      imageAlt: 'Forest canopy forming a heart shape toward the sky — circular future and care for nature',
    },
    ngosAllianceCardsSection: {
      sectionBackgroundColor: '#ffffff',
      cardBackgroundColor: '#EDF0F1',
      accentColor: '#00AEEF',
      highlightBorderColor: '#00AEEF',
      fieldLabels: {
        organization: 'ORGANIZATION',
        initiative: 'INITIATIVE',
        recyclingTarget: 'RECYCLING TARGET',
      },
      cards: [
        {
          id: 'fbca',
          highlighted: true,
          organizationName: 'FBCA (The Food and Beverage Carton Alliance)',
          initiativeDescription:
            'FBCA is a platform to increase recycling of fiber-based multi-material packaging by bringing together producers, recyclers, and stakeholders across the value chain.',
          recyclingTargets: ['2025 target: 60%', '2030 target: 70%'],
        },
        {
          id: 'atcsri',
          organizationName:
            'Alliance of Technological Innovation in Compulsory Resources Recycling Industry (ATCSRI)',
          initiativeDescription:
            'ATCSRI is an alliance for technology innovation across enterprise resources and the recycling industry, supporting circular systems and improved recovery rates.',
          recyclingTargets: ['2025 target: 26%', '2030 target: 40%'],
        },
        {
          id: 'packaging-forum',
          organizationName: 'The Packaging Forum',
          initiativeDescription:
            'A membership organization providing a forum for collaboration on sustainable outcomes for packaging materials, design, and end-of-life solutions.',
          recyclingTargets: [
            'All packaging in Aotearoa NZ to be reusable, recyclable or compostable by 2025',
          ],
        },
      ],
    },
    seo: {
      meta_title: 'NGOs | NGO Membership | Lamipak',
      meta_description:
        'Discover Lamipak’s NGO partnerships and membership across Europe, China, and New Zealand.',
      canonical_path: '/ngos',
      keywords: ['NGO', 'Lamipak', 'sustainability', 'partnerships', 'membership'],
      author: 'Lamipak',
      robots: { index: true, follow: true },
      og_title: 'NGO Membership Of Lamipak',
      og_description:
        'Lamipak collaborates with NGOs worldwide to support environmental and social progress.',
      og_image: '/banner-slider2.webp',
      og_type: 'website',
      twitter_title: 'NGO Membership Of Lamipak',
      twitter_description:
        'Our NGO partnerships in Europe, China, and New Zealand advance responsible growth.',
      twitter_image: '/banner-slider2.webp',
      twitter_card: 'summary_large_image',
    },
  },
  {
    slug: '2050-carbon-net-zero-roadmap',
    type: 'carbon-roadmap',
    title: '2050 Carbon Net Zero Roadmap',
    content:
      'Lamipak’s science-based pathway outlines near-, medium-, and long-term targets to cut operational and value-chain emissions on the journey to net zero.',
    heroBackgroundImage: '/pick_cartoon_banner.webp',
    breadcrumbs: {
      parentLabel: 'Home',
      parentHref: '/',
    },
    carbonNetZeroRoadmapSection: {
      headingBlack: 'Path To',
      headingBlue: 'Carbon Neutrality',
      accentColor: '#00AEEF',
      iconCircleBackground: '#e8ecef',
      connectorLineColor: '#d1d5db',
      sectionBackgroundColor: '#f5f6f8',
      summaryBarBackground: '#00AEEF',
      milestones: [
        {
          id: 'm-2025',
          year: '2025',
          title: 'Near Term Target',
          icon: 'target',
          bullets: [
            'Reduce scope 1 and 2 emissions by 25%',
            'Reduce scope 3 intensity by 30.4% per ton',
          ],
        },
        {
          id: 'm-2030',
          year: '2030',
          title: 'Medium Term Target',
          icon: 'trend',
          bullets: [
            'Reduce scope 1 and 2 emissions by 42%',
            'Reduce scope 3 intensity by 51.6% per ton',
          ],
        },
        {
          id: 'm-2050',
          year: '2050',
          title: 'Long Term Target',
          icon: 'leaf',
          bullets: [
            'Reduce scope 1 and 2 emissions by 83%',
            'Reduce scope 3 intensity by 66.3% per ton',
            'Reach net zero ghg across the value chain',
          ],
        },
      ],
      summaryBarText: '2050 NET ZERO ACROSS THE VALUE CHAIN',
    },
    carbonNetZeroPillarsSection: {
      headingPrefix: 'Key',
      headingHighlight: 'Sustainability',
      headingSuffix: 'Pillar',
      accentColor: '#00AEEF',
      cardBackgroundColor: '#f2f4f6',
      sectionBackgroundColor: '#ffffff',
      items: [
        {
          id: 'pillar-carbon-verify',
          icon: 'carbon_verification',
          title: 'Yearly Carbon Verification',
          description:
            'Rigorous third-party auditing to ensure our emission data is accurate, transparent, and meets global standards.',
        },
        {
          id: 'pillar-efficiency',
          icon: 'efficiency_innovation',
          title: 'Efficiency & Innovation',
          description:
            'Seeking energy saving through technological changes with a target of 3% yearly improvement and operational neutrality.',
        },
        {
          id: 'pillar-renewable',
          icon: 'renewable_electricity',
          title: 'Renewable Electricity',
          description:
            'Expanding on-site solar panel capacity across Indonesia (2.8MW) and Kunshan (10MW) to reach 100% renewable energy by 2030.',
        },
        {
          id: 'pillar-supply-chain',
          icon: 'supply_chain',
          title: 'Supply Chain Reduction',
          description:
            'Establishing strategy and collaborating with partners to reduce the carbon footprint of our entire value chain.',
        },
        {
          id: 'pillar-rd',
          icon: 'rd_innovation',
          title: 'R&D Innovation',
          description:
            'Investing in research to reduce product carbon footprint by 50% through innovative material and structural design.',
        },
        {
          id: 'pillar-cdp',
          icon: 'cdp_leadership',
          title: 'CDP Climate Leadership',
          description:
            'Striving to achieve and maintain the CDP Climate A List leadership ranking for environmental transparency.',
        },
      ],
    },
    seo: {
      meta_title: '2050 Carbon Net Zero Roadmap | Lamipak',
      meta_description:
        'Explore Lamipak’s pathway to carbon neutrality: 2025, 2030, and 2050 targets for scope 1, 2, and 3 emissions.',
      canonical_path: '/2050-carbon-net-zero-roadmap',
      keywords: ['carbon neutral', 'net zero', 'SBTi', 'roadmap', 'Lamipak', 'GHG'],
      author: 'Lamipak',
      robots: { index: true, follow: true },
      og_title: 'Path To Carbon Neutrality | Lamipak',
      og_description:
        'Near-, medium-, and long-term emissions targets on Lamipak’s journey to net zero across the value chain.',
      og_image: '/banner-slider2.webp',
      og_type: 'website',
      twitter_title: '2050 Carbon Net Zero Roadmap | Lamipak',
      twitter_description: 'Science-aligned milestones for scope 1, 2, and 3 emissions through 2050.',
      twitter_image: '/banner-slider2.webp',
      twitter_card: 'summary_large_image',
    },
  },
  {
    slug: 'pick-carton',
    type: 'pick-carton',
    title: 'Pick Carton. Save Nature.',
    content:
      'Pick Carton is our sustainability concept that encourages brands and consumers to choose smarter, paper‑based carton packaging. By favoring renewable materials and supporting recycling infrastructure, Pick Carton helps protect food and the planet.',
    seo: {
      meta_title: 'Pick Carton | Save Nature | Lamipak',
      meta_description:
        'Pick Carton, Save Nature is Lamipak’s sustainability concept promoting renewable, recyclable carton packaging for a lower‑impact future.',
      canonical_path: '/pick-carton',
      keywords: ['pick carton', 'save nature', 'carton packaging', 'lamipak sustainability'],
      author: 'Lamipak',
      robots: {
        index: true,
        follow: true,
      },
      og_title: 'Pick Carton. Save Nature.',
      og_description:
        'Choose smarter, paper‑based carton packaging that protects food and the planet.',
      og_image: '/banner-slider1.jpg',
      og_type: 'website',
      twitter_title: 'Pick Carton | Save Nature | Lamipak',
      twitter_description:
        'Discover how Pick Carton helps brands and consumers reduce environmental impact through carton packaging.',
      twitter_image: '/banner-slider1.jpg',
      twitter_card: 'summary_large_image',
    },
    heroBackgroundImage: '/pick_cartoon_banner.webp',
    breadcrumbs: {
      parentLabel: 'Packaging',
      parentHref: '/',
    },
    sections: [
      {
        type: 'sustainability_footprint',
        heading: 'Our',
        headingHighlight: 'Sustainability',
        headingSuffix: 'Footprint',
        items: [
          {
            id: 'pick-footprint-1',
            image: '/pick_cartoon_left.webp',
            imageAlt: 'Sustainability footprint example 1',
            title: '',
            description:
              'At Lamipak, sustainability is not a side initiative. It is a commitment built into every carton we produce. Our sustainability concept, Pick Carton, Save Nature, represents our mission to deliver packaging solutions that protect food, reduce environmental impact, and support a circular future.',
          },
          {
            id: 'pick-footprint-2',
            image: '/pick_cartoon_right.webp',
            imageAlt: 'Sustainability footprint example 2',
            title: '',
            description:
              'Carton packaging is primarily made from paperboard sourced from responsibly managed forests, a renewable resource that can be replenished when managed sustainably. Compared with packaging made mostly from fossil-based materials, paper-based cartons help reduce carbon emissions and dependence on non-renewable resources. ',
          },
        ],
      },
      {
        type: 'image_quote_banner',
        backgroundImage: '/pick_cartoon_cta_1.webp',
        backgroundAlt: 'Nature background',
        text: 'By Choosing Carton Packaging, Brands And Consumers Are Choosing A Smarter Way To Package Beverages And Food While Protecting The Planet.',
      },
      {
        type: 'why_cartons_matter',
        heading: 'Why Cartons',
        headingHighlight: 'Matter',
        description:
          'Packaging has a major environmental impact, affecting carbon emissions, transport efficiency, and recyclability. Cartons provide key benefits that support a more sustainable packaging ecosystem.',
        items: [
          {
            id: 'pick-renewable',
            image: '/why_cartoon_1.webp',
            imageAlt: 'Renewable materials',
            title: 'Renewable materials',
            description:
              'Cartons are largely made from paperboard, a renewable material sourced from responsibly managed forests that can regenerate naturally over time.',
          },
          {
            id: 'pick-footprint',
            image: '/why_cartoon_2.webp',
            imageAlt: 'Lower carbon footprint',
            title: 'Lower carbon footprint',
            description:
              'Multiple life cycle studies show that beverage cartons generally have a lower climate impact compared with packaging made primarily from fossil-based materials such as plastic, glass, or metal.',
          },
          {
            id: 'pick-transportation',
            image: '/why_cartoon_3.webp',
            imageAlt: 'Efficient transportation',
            title: 'Efficient transportation',
            description:
              'Flat-packed cartons require significantly less storage space than rigid packaging formats like glass jars, which reduces transportation emissions and logistics costs across the supply chain.',
          },
        ],
      },
      {
        type: 'impact_product_banner',
        backgroundImage: '/pick_cartoon_cta_2.webp',
        backgroundAlt: 'Green field background',
        productImage: '/banner-slider2.jpg',
        productAlt: 'Carton packs',
        headingLines: [
          'Lamipak Develops',
          'Packaging That Reduces',
          'Environmental Impact',
          'While Ensuring Safety And',
          'Quality.',
        ],
      },
      {
        type: 'power_of_carton_packaging',
        heading: 'The Power Of',
        headingHighlight: 'Carton',
        headingSuffix: 'Packaging',
        introBold: 'Sustainability By The Numbers.',
        introText:
          'Here Are A Few Facts That Demonstrate Why Cartons Play A Critical Role In Sustainable Packaging Systems:',
        cards: [
          {
            id: 'pick-climate-impact',
            valueHighlight: '',
            valueRest: '',
            title: '66–77% lower climate impact',
            description:
              'Independent life cycle assessments show that carton packages can have 66% to 77% lower climate impact than plastic bottles in certain dairy product categories.',
          },
          {
            id: 'pick-renewable-content',
            valueHighlight: '',
            valueRest: '',
            title: 'Up to 90% renewable content',
         
            description:
              'Innovations in carton packaging have increased renewable material content to as high as 90%, helping reduce carbon footprint compared with conventional packaging formats.',
          },
          {
            id: 'pick-recycled-globally',
            valueHighlight: '',
            valueRest: '',
            title: '1.3 million tonnes recycled globally',
            description:
              'More than 1.3 million tonnes of beverage cartons were collected for recycling worldwide in 2024, demonstrating the growing role cartons play in the circular economy',
          },
        ],
        footnote:
          'These numbers show how carton packaging contributes to reducing waste, lowering emissions, and supporting sustainable resource use.',
      },
      {
        type: 'journey_recycling_section',
        heading: 'Building A Circular Packaging Future',
        image: '/journey_image.jpg',
        imageAlt: 'The recycling journey',
        description:
          'Lamipak believes that the future of packaging must be circular. Our Pick Carton, Save Nature sustainability campaign highlights our commitment to developing packaging solutions that support responsible sourcing, lower carbon impact, and improved recycling systems. By choosing cartons, businesses help reduce reliance on fossil-based materials, improve logistics efficiency, and support packaging that can be recovered and recycled into new materials. Together with partners across the value chain, we are working to ensure that every carton delivers more than product protection. It delivers measurable environmental progress.',
        ctaText: 'Join The Movement Pick Carton. Save Nature.',
        ctaLink: '/contact',
      },
    ],
  },
 
  {
    slug: 'contact-us',
    type: 'contact-us',
    title: 'Contact Us',
    content:
      'Get in touch with Lamipak. Reach our team for partnerships, inquiries, and support.',
    heroBackgroundImage: '/about_banner.jpg',
    seo: {
      meta_title: 'Contact Us - Get in Touch | Lamipak',
      meta_description:
        'Reach out to Lamipak for inquiries, partnerships, and support.',
      canonical_path: '/contact-us',
      keywords: ['contact', 'Lamipak', 'packaging', 'partnerships', 'support'],
      author: 'Lamipak',
      robots: { index: true, follow: true },
      og_title: 'Contact Us | Lamipak',
      og_description:
        'Reach out to Lamipak for inquiries, partnerships, and support.',
      og_image: '/banner-slider2.webp',
      og_type: 'website',
      twitter_title: 'Contact Us | Lamipak',
      twitter_description:
        'Reach out to Lamipak for inquiries, partnerships, and support.',
      twitter_image: '/banner-slider2.webp',
      twitter_card: 'summary_large_image',
    },
  },

  {
    slug: 'governance-management',
    type: 'governance-management',
    title: 'Governance Management',
    content:
      'Reach out to Lamipak for governance management inquiries, governance policies, and compliance-related support.',
    heroBackgroundImage: '/about_banner.jpg',
    governanceDetailSections: [
      {
        layout: 'centerPanel',
        eyebrow: 'Ethical Standards',
        title: 'Business Integrity & Ethical Conduct',
        imageSrc: '/buisness_intigrity.webp',
        imageAlt: 'Team discussing compliance in a corporate setting',
        centerText:
          'Integrity is the foundation of how lamipak operates. we maintain a strict zero-tolerance policy toward corruption, bribery, fraud, and unethical conduct in any form.',
        buttonText: 'Zero Tolerance Policy',
        buttonHref: '/contact',
        paragraphs: [
          'Our code of business conduct requires all employees, managers, and business partners to comply with the laws and regulations of every country in which we operate. we expect the same high standards of integrity from our suppliers, distributors, and service partners. ethical decision-making is embedded into our daily operations to ensure that business success is achieved responsibly and transparently.',
          
        ],
      },
      {
        layout: 'complianceCards',
        eyebrow: 'Global Standards',
        titleBlue: 'Responsible Supply Chain &',
        title: 'Global Compliance',
        imageSrc: '/responsible_image.jpg',
        imageAlt: 'People discussing supplier code of conduct and compliance',
        description: [
          'As a global supplier to the food and beverage industry, Lamipak recognizes its responsibility to promote ethical and responsible practices throughout its value chain.',
          'Our Supplier Code of Conduct establishes clear expectations for business integrity, labor standards, environmental responsibility, and workplace safety. We work closely with suppliers and partners to ensure alignment with these principles.',
          'We also uphold internationally recognized human rights principles and maintain a workplace environment that prohibits forced labor, discrimination, harassment, and unsafe working conditions.',
        ],
        cards: [
          {
            id: 'supplier-code',
            title: 'Supplier Code Of Conduct',
            description:
              'Clear expectations for business integrity, labor standards, environmental responsibility, and workplace safety across supplier network',
            iconId: 'supplier',
          },
          {
            id: 'human-rights',
            title: 'Human Right',
            description:
              'We uphold internationally recognized human rights principles and prohibit forced labor, discrimination, and harassment throughout our operations',
            iconId: 'human_rights',
          },
          {
            id: 'environmental-resp',
            title: 'Environmental Responsibility',
            description:
              'Environmental standards are embedded into our supplier expectations and our own operational practices globally',
            iconId: 'environment',
          },
          {
            id: 'workplace-safety',
            title: 'Workplace Safety',
            description:
              'Safe working conditions are a non-negotiable requirement for lamipak and all partners across the value chain',
            iconId: 'workplace',
          },
        ],
      },
      {
        layout: 'securityTrust',
        eyebrow: 'Digital Trust',
        titleBlue: 'Information Security & Data',
        title: 'Protection',
        leftParagraphs: [
          "Protecting information assets is essential in today's digital business environment.",
          "Lamipak maintains a structured IT information security policy and code of practice for the classification and protection of information, which defines how company and customer data are managed, classified, and safeguarded.",
          'Through continuous improvement of our security controls and information management systems, we work to ensure the confidentiality, integrity, and availability of critical business data.',
        ],
        cards: [
          {
            id: 'confidentiality',
            title: 'Confidentiality',
            description:
              'Company and customer data are managed and classified under a structured it information security policy to prevent unauthorised access.',
            iconId: 'confidentiality',
          },
          {
            id: 'integrity',
            title: 'Integrity',
            description:
              'Continuous improvement of security controls and information management systems ensures data remains accurate and unaltered.',
            iconId: 'integrity',
          },
          {
            id: 'availability',
            title: 'Availability',
            description:
              'Critical business data remains accessible and reliable to authorised users at all times through robust systems and controls.',
            iconId: 'availability',
          },
        ],
        stats: [
          { id: 'zero', value: 'ZERO', label: 'Tolerance For Corruption & Fraud' },
          { id: '04', value: '04', label: 'Core Grc Pillars' },
          {
            id: '100',
            value: '100%',
            label: 'Supplier Code Of Conduct Coverage',
          },
          {
            id: 'cia',
            value: 'CIA',
            label: 'Confidentiality Integrity Availability',
          },
        ],
      },
      {
        layout: 'whistleblowing',
        eyebrow: 'Openness & Accountability',
        titleBlue: 'Speak-Up &',
        title: 'Whistleblowing',
        paragraphs: [
          'Lamipak encourages a culture of openness and accountability. employees, partners, and stakeholders are encouraged to report concerns related to misconduct, unethical behavior, or violations of company policies. our reporting channels are designed to ensure:',
        ],
      },
      {
        layout: 'whistleCards',
        cards: [
          {
            id: 'confidentiality',
            title: 'Confidentiality',
            description:
              'All reports are handled with strict confidentiality to protect the identity of the reporting individual.',
            iconId: 'confidentiality',
          },
          {
            id: 'non-retaliation',
            title: 'Non-Retaliation',
            description:
              'Individuals who raise concerns in good faith are protected from retaliation or discrimination.',
            iconId: 'non_retaliation',
          },
          {
            id: 'fair-investigation',
            title: 'Fair Investigation',
            description:
              'All reports are reviewed objectively and investigated through appropriate internal processes to maintain a fair and ethical working environment.',
            iconId: 'fair_investigation',
          },
        ],
      },
    ],
    governanceFrameworkSection: {
      eyebrow: 'Lamipak - Corporate Governance',
      title: 'Governance & Management',
      description:
        "Strong governance is the foundation of Lampiak’s long-term value creation.It is built on transparency, accountability, and responsible decision-making across all global operations. Through clear policies and ethical practices, Lampiak ensures sustainable growth while protecting the interests of stakeholders, employees, partners, and the environment.",
      primaryCta: { text: 'Explore Our Framework', href: '/' },
      secondaryCta: { text: 'Speak Up', href: '/' },
      cards: [
        {
          id: 'framework',
          title: 'Our Governance Framework',
          subtitle: 'Transparency & accountability',
          iconId: 'framework',
        },
        {
          id: 'integrity',
          title: 'Business Integrity & Ethical Conduct',
          subtitle: 'Zero-tolerance policy',
          iconId: 'integrity',
        },
        {
          id: 'risk_control',
          title: 'Governance, Risk & Control',
          subtitle: 'Transparency & accountability',
          iconId: 'risk_control',
        },
        {
          id: 'supply_chain',
          title: 'Responsible Supply Chain',
          subtitle: 'Global compliance',
          iconId: 'supply_chain',
        },
        
      ],
    },
    governanceFrameworkSecondarySection: {
      eyebrow: 'Our Governance Framework',
      title: 'Governance & Management',
      description: [
        "Strong governance is the foundation of Lampiak’s long-term value creation.It is built on transparency, accountability, and responsible decision-making across all global operations. Through clear policies and ethical practices, Lampiak ensures sustainable growth while protecting the interests of stakeholders, employees, partners, and the environment.",
        'We maintain a structured system of policies, procedures, and oversight mechanisms designed to ensure that our business is conducted ethically, responsibly, and in full compliance with applicable laws and regulations. These principles guide our management practices and support sustainable growth in the global food and beverage packaging industry.',
        'Our governance framework integrates risk management, compliance oversight, and operational controls to ensure consistent standards across our manufacturing, supply chain, and commercial activities worldwide.',
      ],
      cards: [
        {
          id: 'framework',
          title: 'Transparency',
          subtitle: 'Transparency & accountability',
          iconId: 'framework',
        },
        {
          id: 'integrity',
          title: 'Accountability',
          subtitle: 'Global compliance',
          iconId: 'integrity',
        },
        {
          id: 'risk_control',
          title: 'Compliance',
          subtitle: 'Data protection & it policy',
          iconId: 'risk_control',
        },
        {
          id: 'supply_chain',
          title: 'Sustainable Growth',
          subtitle: 'Confidential reporting',
          iconId: 'supply_chain',
        },
        {
          id: 'security',
          title: 'Information Security',
          subtitle: 'Data protection & it policy',
          iconId: 'security',
        },
        {
          id: 'whistle',
          title: 'Speak-Up & Whistleblowing',
          subtitle: 'Confidential reporting',
          iconId: 'whistle',
        },
      ],
    },
    governanceGrcSection: {
      eyebrow: 'Risk & Control',
      title: 'Governance, Risk, And Control Systems (GRC)',
      description:
        'Lamipak operates a comprehensive risk control system designed to underpin the achievement of our objectives on operations’ effectiveness and efficiency, assets safety, compliance, reliable reporting and strategy. our framework is structured around four core pillars:',
      cards: [
        {
          id: 'erm',
          title: 'Enterprise Risk Management',
          description:
            "The group’s enterprise risk management (ERM) process is designed to identify, assess, and mitigate actual and potential risks as emerging risks to our business in order to protect the group from negative financial and/or reputational impact.",
          iconId: 'erm',
        },
        {
          id: 'ic',
          title: 'Internal Control',
          description:
            'Internal control is designed to reduce identified risks to the business, safeguard the company’s assets, help to detect fraud, protect the shareholders’ investment, it also helps to ensure reliability of reporting, and compliance with laws.',
          iconId: 'ic',
        },
        {
          id: 'ia',
          title: 'Internal Audit',
          description:
            'Internal auditing is an independent activity that evaluates and improves risk management, internal control, and governance to help an organization achieve its objectives.',
          iconId: 'ia',
        },
        {
          id: 'af',
          title: 'Anti-Fraud',
          description:
            'Anti-fraud refers to measures used to prevent and detect fraud through awareness, security controls, technology, and actions to fix weaknesses and strengthen teamwork.',
          iconId: 'af',
        },
      ],
    },
    seo: {
      meta_title: 'Governance Management | Lamipak',
      meta_description:
        'Contact Lamipak for governance management inquiries, governance policies, and compliance-related support.',
      canonical_path: '/governance-management',
      keywords: [
        'governance management',
        'Lamipak',
        'compliance',
        'policies',
        'contact',
      ],
      author: 'Lamipak',
      robots: { index: true, follow: true },
      og_title: 'Governance Management | Lamipak',
      og_description:
        'Contact Lamipak for governance management inquiries, governance policies, and compliance-related support.',
      og_image: '/banner-slider2.webp',
      og_type: 'website',
      twitter_title: 'Governance Management | Lamipak',
      twitter_description:
        'Contact Lamipak for governance management inquiries, governance policies, and compliance-related support.',
      twitter_image: '/banner-slider2.webp',
      twitter_card: 'summary_large_image',
    },
  },
];

/**
 * Get a single dynamic page by slug.
 * Simulates a real API latency.
 */
export async function getDynamicPageBySlug(
  slug: string,
): Promise<DynamicPageData | null> {
  if (slug === 'about-us') {
    const companyData = await fakeGetCompanyData();
    const companySeo = companyData.seo;

    return {
      slug,
      type: 'About Us',
      title: 'About Us',
      content: companySeo.meta_description,
      ourCompanyData: companyData,
      seo: {
        meta_title: companySeo.meta_title,
        meta_description: companySeo.meta_description,
        canonical_path: companySeo.canonical_url,
        keywords: undefined,
        author: undefined,
        robots: { index: true, follow: true },
        og_title: companySeo.og_title,
        og_description: companySeo.og_description,
        og_image: companySeo.og_image,
        og_type: 'website',
        twitter_title: companySeo.twitter_title,
        twitter_description: companySeo.twitter_description,
        twitter_image: companySeo.twitter_image,
        twitter_card:
          (companySeo.twitter_card as
            | 'summary_large_image'
            | 'summary'
            | 'player'
            | 'app'
            | undefined) ?? 'summary_large_image',
      },
    };
  }

  if (slug === 'introduction') {
    const companyData = await fakeGetCompanyData();
    const companySeo = companyData.seo;

    return {
      slug,
      type: 'our-factory',
      title: 'Introduction',
      content: companySeo.meta_description,
      ourCompanyData: companyData,
      seo: {
        meta_title: companySeo.meta_title,
        meta_description: companySeo.meta_description,
        canonical_path: '/introduction',
        keywords: undefined,
        author: undefined,
        robots: { index: true, follow: true },
        og_title: companySeo.og_title,
        og_description: companySeo.og_description,
        og_image: companySeo.og_image,
        og_type: 'website',
        twitter_title: companySeo.twitter_title,
        twitter_description: companySeo.twitter_description,
        twitter_image: companySeo.twitter_image,
        twitter_card:
          (companySeo.twitter_card as
            | 'summary_large_image'
            | 'summary'
            | 'player'
            | 'app'
            | undefined) ?? 'summary_large_image',
      },
    };
  }

  if (slug === 'vision-mission') {
    const companyData = await fakeGetCompanyData();
    const companySeo = companyData.seo;

    return {
      slug,
      type: 'our-factory',
      title: 'Vision & Mission',
      content: companySeo.meta_description,
      ourCompanyData: companyData,
      seo: {
        meta_title: 'Vision & Mission - Lamipak',
        meta_description: companySeo.meta_description,
        canonical_path: '/vision-mission',
        keywords: undefined,
        author: undefined,
        robots: { index: true, follow: true },
        og_title: 'Vision & Mission - Lamipak',
        og_description: companySeo.og_description,
        og_image: companySeo.og_image,
        og_type: 'website',
        twitter_title: 'Vision & Mission - Lamipak',
        twitter_description: companySeo.twitter_description,
        twitter_image: companySeo.twitter_image,
        twitter_card:
          (companySeo.twitter_card as
            | 'summary_large_image'
            | 'summary'
            | 'player'
            | 'app'
            | undefined) ?? 'summary_large_image',
      },
    };
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 80));

  const normalizedSlug = slug === 'contact' ? 'contact-us' : slug;
  const page = PAGES.find((p) => p.slug === normalizedSlug);
  return page ?? null;
}

/**
 * Get all dynamic pages (optional helper).
 */
export async function getAllDynamicPages(): Promise<DynamicPageData[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return PAGES;
}

