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
    type: 'lamira',
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
    heroBackgroundImage: '/about_banner.jpg',
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
      image: '/banner-slider1.jpg',
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
          image: '/banner-slider2.jpg',
          imageAlt: 'People exploring nature trail',
        },
        {
          id: 'creative-diy-projects',
          title: 'Creative DIY Projects',
          description:
            'Lamira enjoys building and creating using materials found in nature, encouraging resourcefulness and responsible use of resources.',
          image: '/banner-slider3.jpg',
          imageAlt: 'Creative DIY projects with craft materials',
        },
        {
          id: 'forest-councils',
          title: 'Forest Councils',
          description:
            "Lamira often gathers animal and plant friends to discuss how to make their shared home more beautiful, balanced, and resilient.",
          image: '/journey_images.jpg',
          imageAlt: 'Forest friends council discussion',
        },
      ],
    },
    lamiraSharedGuideSection: {
      image: '/about_banner.jpg',
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
          image: '/services_image_1.jpg',
          imageAlt: 'Social moment image 1',
        },
        {
          id: 'moment-2',
          image: '/services_image_2.jpg',
          imageAlt: 'Social moment image 2',
        },
        {
          id: 'moment-3',
          image: '/journey_images.jpg',
          imageAlt: 'Social moment image 3',
        },
        {
          id: 'moment-4',
          image: '/about_us_image_1.jpg',
          imageAlt: 'Social moment image 4',
        },
        {
          id: 'moment-5',
          image: '/about_us_image_2.jpg',
          imageAlt: 'Social moment image 5',
        },
        {
          id: 'moment-6',
          image: '/sales_images.jpg',
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
    heroBackgroundImage: '/about_banner.jpg',
    breadcrumbs: {
      parentLabel: 'Home',
      parentHref: '/',
    },
    greenSustainabilityJourneySection: {
      headingLineBlue: 'Advancing Our',
      headingLineBlack: 'Sustainability Journey',
      body:
        'Lamipak continues to invest in renewable energy and sustainable manufacturing practices to support our broader climate goals. By integrating solar power into our production facilities, we are reducing greenhouse gas emissions, improving energy efficiency, and contributing to a more sustainable packaging industry. Our green efforts are part of a long-term commitment to responsible growth and environmental stewardship.',
      image: '/banner-slider4.webp',
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
            {
              parts: [
                {
                  text: 'Uphold transparency and responsible governance across our operations.',
                },
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
        surfaceCardColor: '#F0F2F5',
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
    heroBackgroundImage: '/about_banner.jpg',
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
            image: '/banner-slider2.jpg',
            imageAlt: 'Sustainability footprint example 1',
            title: '',
            description:
              'At Lamipak, sustainability is not a side initiative, it is a commitment built into every carton we produce. Our sustainability concept, Pick Carton, Save Nature, represents our mission to deliver packaging solutions that protect food, reduce environmental impact, and support a circular future.',
          },
          {
            id: 'pick-footprint-2',
            image: '/banner-slider3.jpg',
            imageAlt: 'Sustainability footprint example 2',
            title: '',
            description:
              'Carton packaging is primarily made from paperboard sourced from responsibly managed forests, a renewable resource that can be replenished when managed sustainably. Compared with packaging made mostly from fossil-based materials, paper-based cartons help reduce carbon emissions and dependence on non-renewable resources.',
          },
        ],
      },
      {
        type: 'image_quote_banner',
        backgroundImage: '/banner-slider1.jpg',
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
            image: '/banner-slider2.jpg',
            imageAlt: 'Renewable materials',
            title: 'Renewable materials',
            description:
              'Cartons are largely made from paperboard, a renewable material sourced from responsibly managed forests that can regenerate naturally over time.',
          },
          {
            id: 'pick-footprint',
            image: '/banner-slider3.jpg',
            imageAlt: 'Lower carbon footprint',
            title: 'Lower carbon footprint',
            description:
              'Multiple life cycle studies show that beverage cartons generally have a lower climate impact compared with packaging made primarily from fossil-based materials such as plastic, glass, or metal.',
          },
          {
            id: 'pick-transportation',
            image: '/banner-slider1.jpg',
            imageAlt: 'Efficient transportation',
            title: 'Efficient transportation',
            description:
              'Flat-packed cartons require significantly less storage space than rigid packaging formats like glass jars, which reduces transportation emissions and logistics costs across the supply chain.',
          },
        ],
      },
      {
        type: 'impact_product_banner',
        backgroundImage: '/banner-slider1.jpg',
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
            valueHighlight: '66-77%',
            valueRest: 'Lower',
            title: 'Climate Impact',
            descriptionEmphasis: '66% To 77% Lower Climate Impact Than Plastic Bottles',
            description:
              'Independent Life Cycle Assessments show that carton packages can have in certain dairy product categories.',
          },
          {
            id: 'pick-renewable-content',
            valueHighlight: 'Up To 90%',
            valueRest: '',
            title: 'Renewable Content',
            descriptionEmphasis: 'As High As 90%',
            description:
              'Innovations in carton packaging have increased renewable material content, helping reduce carbon footprint compared with conventional packaging formats.',
          },
          {
            id: 'pick-recycled-globally',
            valueHighlight: '1.3 Million',
            valueRest: 'Tonnes',
            title: 'Recycled Globally',
            descriptionEmphasis: '1.3 Million Tonnes Of Beverage Cartons',
            description:
              'More than were collected for recycling worldwide in 2024, demonstrating the growing role cartons play in the circular economy.',
          },
        ],
        footnote:
          'These numbers show how carton packaging contributes to reducing waste, lowering emissions, and supporting sustainable resource use.',
      },
      {
        type: 'journey_recycling_section',
        heading: 'Building A Circular Packaging Future',
        image: '/journey_images.jpg',
        imageAlt: 'The recycling journey',
        description:
          'Lamipak Believes That The Future Of Packaging Must Be Circular. Our Pick Carton, Save Nature Sustainability Campaign Highlights Our Commitment To Developing Packaging Solutions That Support Responsible Sourcing, Lower Carbon Impact, And Improved Recycling Systems.',
        ctaText: 'Join The Movement Pick Carton. Save Nature.',
        ctaLink: '/contact',
      },
    ],
  },
 
];

/**
 * Get a single dynamic page by slug.
 * Simulates a real API latency.
 */
export async function getDynamicPageBySlug(
  slug: string,
): Promise<DynamicPageData | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 80));

  const page = PAGES.find((p) => p.slug === slug);
  return page ?? null;
}

/**
 * Get all dynamic pages (optional helper).
 */
export async function getAllDynamicPages(): Promise<DynamicPageData[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return PAGES;
}

