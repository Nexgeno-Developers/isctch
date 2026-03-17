/**
 * Marketing Services API Data
 *
 * Mock data for marketing services listing and details pages.
 * Replace with real API calls when the backend is ready.
 */

export interface MarketingServiceSEO {
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
}

export interface MarketingServiceHighlight {
  id: string;
  title: string;
  description: string;
}

export interface MarketingServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroBackgroundImage?: string;
  listingImage: string;
  listingImageAlt: string;
  icon?: string;
  badge?: string;
  seo: MarketingServiceSEO;
  highlights: MarketingServiceHighlight[];
}

const MARKETING_SERVICES: MarketingServiceData[] = [
  {
    slug: 'market-intelligence',
    title: 'Market Intelligence',
    shortDescription:
      'Lamipak provides strategic market intelligence to help brands navigate the evolving beverage and dairy landscape. Our team analyzes global industry trends, consumer behavior, and emerging market opportunities to guide product positioning and packaging decisions. Through continuous research and competitive benchmarking, we help partners make informed choices that align with market demand and future growth potential.',
    description:
      'By combining data, on‑ground understanding, and category experience, we help you identify the right occasions, formats, and communication territories. Insights are translated into clear recommendations that guide product offerings, packaging portfolios, channel priorities, and activation plans, unlocking untapped value and long‑term growth potential.',
    heroBackgroundImage: '/marketing_banner.jpg',
    listingImage: '/market_inteligence.jpg',
    listingImageAlt: 'Team collaborating around digital analytics dashboard',
    icon: '/icons/brand_strategy.svg',
    badge: 'Insights',
    seo: {
      meta_title: 'Market Intelligence | Marketing Services',
      meta_description:
        'Unlock growth opportunities with category and shopper insights that guide products, packs, and activation.',
      canonical_url: '/marketing-services/market-intelligence',
    },
    highlights: [
      {
        id: 'category-trends',
        title: 'Category & Trend Mapping',
        description:
          'Understand how your category is evolving and where new demand spaces are emerging.',
      },
      {
        id: 'shopper-insights',
        title: 'Shopper & Channel Insights',
        description:
          'Decode how shoppers choose in‑store and online, and what influences their decisions.',
      },
      {
        id: 'growth-platforms',
        title: 'Growth Platforms',
        description:
          'Translate findings into clear growth platforms that connect innovation, pricing, and activation.',
      },
    ],
  },
  {
    slug: 'recipe-support',
    title: 'Recipe Support',
    shortDescription:
      'Our technical specialists collaborate closely with partners to support beverage formulation and product development. From ingredient compatibility to shelf-life optimization, Lamipak offers expertise that ensures product stability and quality throughout the packaging lifecycle. By combining food science knowledge with packaging engineering, we help brands bring safe, reliable, and market-ready products to consumers..',
    description:
      'From idea to pilot, we help align product recipes with processing requirements, packaging specifications, and desired eating or drinking experience. This ensures that new products are technically robust, commercially viable, and consistently deliver the intended sensory profile to consumers.',
    heroBackgroundImage: '/marketing_banner.jpg',
    listingImage: '/recipe_support.jpg',
    listingImageAlt: 'Scientist conducting laboratory tests on food sample',
    icon: '/icons/go_to_market.svg',
    badge: 'Technical',
    seo: {
      meta_title: 'Recipe Support | Marketing Services',
      meta_description:
        'Optimise recipes for quality, stability, and processing performance with Lamipak technical experts.',
      canonical_url: '/marketing-services/recipe-support',
    },
    highlights: [
      {
        id: 'formulation',
        title: 'Formulation Guidance',
        description:
          'Align product recipes with processing conditions and packaging performance requirements.',
      },
      {
        id: 'stability',
        title: 'Stability & Shelf‑Life',
        description:
          'Support stability testing and shelf‑life validation to protect quality from plant to consumer.',
      },
      {
        id: 'scale-up',
        title: 'Scale‑Up Support',
        description:
          'Help move from pilot to commercial production with controlled risk and clear learnings.',
      },
    ],
  },
  {
    slug: 'creative-consultancy',
    title: 'Creative Consultancy',
    shortDescription:
      'Lamipak’s creative consultancy services help brands translate their vision into compelling packaging designs. Our team supports graphic development, structural packaging design, and brand alignment to ensure the final product stands out on shelves while remaining production-ready. By integrating design thinking with manufacturing expertise, we deliver packaging that is both visually impactful and operationally efficient.',
    description:
      'By combining category experience, consumer understanding, and creative thinking, we shape messaging, visual language, and activation ideas that stand out while remaining practical for execution. The result is work that inspires your teams and resonates with consumers across multiple touchpoints.',
    heroBackgroundImage: '/marketing_banner.jpg',
    listingImage: '/creative_images.jpg',
    listingImageAlt: 'Creative team collaborating over design concepts',
    icon: '/icons/insights_design.svg',
    badge: 'Creative',
    seo: {
      meta_title: 'Creative Consultancy | Marketing Services',
      meta_description:
        'Develop powerful creative concepts and communication platforms that connect strategy to execution.',
      canonical_url: '/marketing-services/creative-consultancy',
    },
    highlights: [
      {
        id: 'concepts',
        title: 'Concept Development',
        description:
          'Translate brand and category insights into campaign and packaging concepts.',
      },
      {
        id: 'visual-language',
        title: 'Visual Language',
        description:
          'Shape distinctive visual assets and narratives that can stretch across packs and channels.',
      },
      {
        id: 'toolkits',
        title: 'Execution Toolkits',
        description:
          'Create practical toolkits that help internal and external teams execute consistently.',
      },
    ],
  },
  {
    slug: 'sales-distribution',
    title: 'Sales & Distribution',
    shortDescription:
      'Lamipak supports partners in expanding their market reach by providing insights into distribution strategies and regional demand patterns. Our experience across global markets allows us to guide brands in optimizing supply chains and identifying new opportunities for growth. This collaborative approach ensures products reach the right consumers through efficient and scalable distribution networks.',
    description:
      'We collaborate with commercial and logistics teams to connect packaging decisions with route‑to‑market realities. From pack size architecture and case design to merchandising and trade stories, we help you make choices that improve efficiency while unlocking new channels and outlets.',
    heroBackgroundImage: '/marketing_banner.jpg',
    listingImage: '/sales_images.jpg',
    listingImageAlt: 'Warehouse with stacked boxes ready for distribution',
    icon: '/icons/sales_distribution.svg',
    badge: 'Commercial',
    seo: {
      meta_title: 'Sales & Distribution | Marketing Services',
      meta_description:
        'Align packaging, case design, and trade stories with route‑to‑market strategies to grow availability and visibility.',
      canonical_url: '/marketing-services/sales-distribution',
    },
    highlights: [
      {
        id: 'pack-architecture',
        title: 'Pack Architecture',
        description:
          'Design the right mix of pack sizes and formats for different channels and price points.',
      },
      {
        id: 'logistics',
        title: 'Logistics Efficiency',
        description:
          'Optimise case and pallet configurations to reduce waste and improve handling across the supply chain.',
      },
      {
        id: 'trade-stories',
        title: 'Trade Stories',
        description:
          'Equip sales teams with clear benefits and visuals that make it easier to win space and expand distribution.',
      },
    ],
  },
];

/**
 * Get all marketing services
 */
export async function getAllMarketingServices(): Promise<MarketingServiceData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MARKETING_SERVICES;
}

/**
 * Get a single marketing service by slug
 */
export async function getMarketingServiceData(
  slug: string,
): Promise<MarketingServiceData | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  const service = MARKETING_SERVICES.find((item) => item.slug === slug);
  return service ?? null;
}

/**
 * Get all marketing service slugs (for static generation)
 */
export async function getAllMarketingServiceSlugs(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 20));
  return MARKETING_SERVICES.map((service) => service.slug);
}

