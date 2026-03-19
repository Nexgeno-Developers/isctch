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

export interface DynamicPageData {
  slug: string;
  type: string;
  title: string;
  content: string;
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
            id: 'footprint-1',
            image: '/banner-slider2.jpg',
            imageAlt: 'Sustainability footprint example 1',
            title: '',
            description:
              'At Lamipak, sustainability is not a side initiative, it is a commitment built into every carton we produce. Our sustainability concept, Pick Carton, Save Nature, represents our mission to deliver packaging solutions that protect food, reduce environmental impact, and support a circular future.',
          },
          {
            id: 'footprint-2',
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
            id: 'renewable',
            image: '/banner-slider2.jpg',
            imageAlt: 'Renewable materials',
            title: 'Renewable materials',
            description:
              'Cartons are largely made from paperboard, a renewable material sourced from responsibly managed forests that can regenerate naturally over time.',
          },
          {
            id: 'footprint',
            image: '/banner-slider3.jpg',
            imageAlt: 'Lower carbon footprint',
            title: 'Lower carbon footprint',
            description:
              'Multiple life cycle studies show that beverage cartons generally have a lower climate impact compared with packaging made primarily from fossil-based materials such as plastic, glass, or metal.',
          },
          {
            id: 'transportation',
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
            id: 'climate-impact',
            valueHighlight: '66-77%',
            valueRest: 'Lower',
            title: 'Climate Impact',
            descriptionEmphasis: '66% To 77% Lower Climate Impact Than Plastic Bottles',
            description:
              'Independent Life Cycle Assessments show that carton packages can have in certain dairy product categories.',
          },
          {
            id: 'renewable-content',
            valueHighlight: 'Up To 90%',
            valueRest: '',
            title: 'Renewable Content',
            descriptionEmphasis: 'As High As 90%',
            description:
              'Innovations in carton packaging have increased renewable material content, helping reduce carbon footprint compared with conventional packaging formats.',
          },
          {
            id: 'recycled-globally',
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
  {
    slug: 'our-green-efforts',
    type: 'green',
    title: 'Our Green Efforts',
    content:
      'Our Green Efforts initiative brings together responsible sourcing, energy efficiency, and circular packaging design. From renewable materials to expanded recycling partnerships, we work across the value chain to lower environmental impact.',
  },
  {
    slug: 'pick-carton',
    type: 'green',
    title: 'Pick Carton. Save Nature.',
    content:
      'Pick Carton is our sustainability concept that encourages brands and consumers to choose smarter, paper‑based carton packaging. By favoring renewable materials and supporting recycling infrastructure, Pick Carton helps protect food and the planet.',
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

