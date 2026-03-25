/**
 * Fake API for the mini CMS / page-builder.
 *
 * Response shape is designed to be replaced by your real backend later,
 * while keeping the same frontend renderer and route components.
 */

import { getCategoryBySlug, type ProductCategory } from '@/fake-api/categories';
import {
  getProductsByCategory,
  getProductData,
  type ProductData,
} from '@/fake-api/products';

export type PageBuilderMainCategory = string;
export type PageBuilderSubCategory = string;

export type PageBuilderSeo = {
  meta_title?: string;
  meta_description?: string;
  canonical_path?: string;
};

export type HeroSectionData = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
};

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

export type HeroWithBreadcrumbsSectionData = {
  title: string;
  backgroundImage?: string;
  breadcrumbs: BreadcrumbItemData[];
};

export type SubCategoryGridSectionItem = {
  type: 'subcategory';
  subCategory: string; // becomes [subCategory] in route
  title: string;
  image?: string;
};

export type SubCategoryGridSectionData = {
  eyebrow?: string;
  title: string;
  items: SubCategoryGridSectionItem[];
};

export type ProductGridSectionItem =
  | {
      type: 'product';
      slug: string;
      title: string;
      image?: string;
    }
  | {
      type: 'external';
      url: string;
      title: string;
      image?: string;
    };

export type ProductGridSectionData = {
  eyebrow?: string;
  title: string;
  products: ProductGridSectionItem[];
};

export type ProductDetailsSectionData = {
  title: string;
  shortDescription?: string;
  description?: string;
  image?: string;
  technicalSheetUrl?: string;
  technicalSheetText?: string;
};

export type CustomBannerSectionData = {
  text: string;
};

/** Main category “showcase” grid (Lamipak packaging hub style) */
export type CategoryShowcaseIconId = 'roll' | 'sleeve' | 'cap' | 'straw' | 'water' | 'innovation';

export type CategoryShowcaseItem = {
  id: string;
  /** e.g. LAMI-01 — shown top-right on default cards */
  code?: string;
  /** e.g. BIO-BASED — shown as badge (often on highlight card) */
  badge?: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  /** If true, opens href in a new tab */
  external?: boolean;
  variant?: 'default' | 'highlight';
  iconId?: CategoryShowcaseIconId;
};

export type CategoryShowcaseSectionData = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  items: CategoryShowcaseItem[];
};

export type RollFedCatalogProduct = {
  id: string;
  /** Product detail route slug, e.g. /products/brick-slim */
  slug: string;
  title: string;
  sizes: string;
  image?: string;
};

export type RollFedCatalogSectionData = {
  eyebrow?: string;
  intro: string;
  standardTitle: string;
  standardProducts: RollFedCatalogProduct[];
  premiumTitle: string;
  premiumProducts: RollFedCatalogProduct[];
};

export type SustainableSolutionItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  href?: string;
};

export type SustainableSolutionsSectionData = {
  intro?: string;
  items: SustainableSolutionItem[];
};

export type LamiStrawIconId = 'u' | 'telescope' | 'i' | 'flow';

export type LamiStrawCardItem = {
  id: string;
  title: string;
  description: string;
  readMoreLabel: string;
  href?: string;
  iconId: LamiStrawIconId;
  image?: string;
  imageAlt?: string;
};

export type LamiStrawLandingSectionData = {
  eyebrow: string;
  title: string;
  descriptionLines: string[];
  cards: LamiStrawCardItem[];
};

export type OnePackOneCodeTabId = 'digital' | 'lottery' | 'marketing' | 'loyalty' | 'traceability';

export type OnePackOneCodeTab = {
  id: OnePackOneCodeTabId;
  label: string;
};

export type OnePackOneCodeAccordionItem = {
  id: string;
  title: string;
  content: string;
};

export type OnePackOneCodeFeature = {
  id: string;
  number: string;
  title: string;
  bullets: string[];
  image?: string;
};

export type OnePackOneCodeLandingSectionData = {
  breadcrumbs: BreadcrumbItemData[];
  tabs: OnePackOneCodeTab[];
  activeTabId: OnePackOneCodeTabId;
  hero: {
    backgroundImage?: string;
    videoUrl?: string;
  };
  accessPoints: {
    title: string;
    description: string;
    items: OnePackOneCodeAccordionItem[];
  };
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
  features: OnePackOneCodeFeature[];
};

export type PageBuilderSection =
  | { type: 'hero'; data: HeroSectionData }
  | { type: 'heroWithBreadcrumbs'; data: HeroWithBreadcrumbsSectionData }
  | { type: 'subcategoryGrid'; data: SubCategoryGridSectionData }
  | { type: 'categoryShowcase'; data: CategoryShowcaseSectionData }
  | { type: 'rollFedCatalog'; data: RollFedCatalogSectionData }
  | { type: 'sustainableSolutions'; data: SustainableSolutionsSectionData }
  | { type: 'lamiStrawLanding'; data: LamiStrawLandingSectionData }
  | { type: 'onePackOneCodeLanding'; data: OnePackOneCodeLandingSectionData }
  | { type: 'productGrid'; data: ProductGridSectionData }
  | { type: 'productDetails'; data: ProductDetailsSectionData }
  | { type: 'customBanner'; data: CustomBannerSectionData };

export type PageBuilderPageData = {
  slug: string;
  title: string;
  seo?: PageBuilderSeo;
  sections: PageBuilderSection[];
};

function isSupportedMainCategory(mainCategory: string): boolean {
  // Today we implement one group as example.
  // Later you can add more mappings based on backend.
  return mainCategory === 'packaging';
}

function buildCategoryHero(category: ProductCategory): HeroSectionData {
  return {
    title: category.name,
    subtitle: category.heroSubtitle,
    backgroundImage: category.heroBackgroundImage || category.image,
  };
}

function toProductGridItem(product: ProductData): Extract<ProductGridSectionItem, { type: 'product' }> {
  return {
    type: 'product',
    slug: product.slug,
    title: product.title,
    image: product.image,
  };
}

export async function getMainCategoryPage(
  mainCategory: PageBuilderMainCategory,
): Promise<PageBuilderPageData | null> {
  if (!isSupportedMainCategory(mainCategory)) return null;

  return {
    slug: mainCategory,
    title: 'Packaging',
    seo: {
      meta_title: 'Packaging Solutions | Lamipak',
      meta_description:
        'Explore roll-fed, sleeve-fed, cap solutions, sustainable straws, Waterpak, and innovation services — API-driven packaging hub.',
      canonical_path: `/${mainCategory}`,
    },
    sections: [
      {
        type: 'hero',
        data: {
          title: 'Packaging',
          subtitle: undefined,
          backgroundImage: '/banner-slider1.jpg',
        },
      },
      {
        type: 'categoryShowcase',
        data: {
          eyebrow: 'Solutions',
          headline: 'Packaging that fits your line',
          intro:
            'From high-speed roll-fed systems to sustainable straw alternatives, Lamipak delivers engineered packaging formats, closures, and technical support — all from one partner.',
          items: [
            {
              id: 'roll-fed',
              code: 'LAMI-01',
              title: 'Roll-fed',
              description:
                'Optimized for high-speed filling lines with consistent web control, barrier performance, and formats tuned for dairy, juice, and liquid foods.',
              ctaLabel: 'Technical specs',
              href: '/packaging/aseptic-packaging',
              iconId: 'roll',
            },
            {
              id: 'sleeve-fed',
              code: 'LAMI-02',
              title: 'Sleeve-fed',
              description:
                'Versatile pre-formed sleeves designed for flexible changeovers, strong seals, and reliable performance across multiple SKU profiles.',
              ctaLabel: 'Technical specs',
              href: '/packaging/sleeve-fed',
              iconId: 'sleeve',
            },
            {
              id: 'cap-solutions',
              code: 'LAMI-03',
              title: 'Cap solutions',
              description:
                'Precision-engineered closures ensuring leak-proof delivery, consumer-friendly opening, and compatibility with your filling environment.',
              ctaLabel: 'Technical specs',
              href: '/packaging/closure-systems',
              iconId: 'cap',
            },
            {
              id: 'sustainable-straws',
              badge: 'BIO-BASED',
              title: 'Sustainable straws',
              description:
                'Paper and bio-plastic straw alternatives engineered for drinking comfort, compliance, and sustainability storytelling on-pack.',
              ctaLabel: 'Impact report',
              href: '/packaging/sustainable-solutions',
              variant: 'highlight',
              iconId: 'straw',
            },
            {
              id: 'waterpak',
              code: 'LAMI-05',
              title: 'Waterpak',
              description:
                'Specifically engineered for still and sparkling water — lightweight structures, clarity, and shelf appeal for bottled water brands.',
              ctaLabel: 'Technical specs',
              href: '/packaging/specialty-packaging',
              iconId: 'water',
            },
            {
              id: 'innovation-hub',
              code: 'Custom',
              title: 'Innovation hub',
              description:
                'Bespoke technical integration services for unique line layouts, pilot trials, and co-development from concept to commercial scale.',
              ctaLabel: 'Talk to us',
              href: '/contact-us',
              iconId: 'innovation',
            },
            {
              id: 'one-pack-one-code',
              code: 'LAMI-04',
              title: 'OnePack OneCode',
              description:
                'Digital co-printing and traceability solutions that connect brands with consumers using one smart code.',
              ctaLabel: 'Explore',
              href: '/packaging/one-pack-one-code',
              iconId: 'innovation',
            },
          ],
        },
      },
      {
        type: 'customBanner',
        data: {
          text: 'Need help choosing the right packaging? Contact our technical team.',
        },
      },
    ],
  };
}

export async function getSubCategoryPage(
  mainCategory: PageBuilderMainCategory,
  subCategory: PageBuilderSubCategory,
): Promise<PageBuilderPageData | null> {
  if (!isSupportedMainCategory(mainCategory)) return null;

  if (subCategory === 'roll-fed') {
    const standardProducts: RollFedCatalogProduct[] = [
      {
        id: 'brick-slim',
        slug: 'brick-slim',
        title: 'Brick Slim',
        sizes: '80ml, 125ml, 200ml, 250ml, 500ml, 1000ml, 1500ml, 2000ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'brick-base',
        slug: 'brick-base',
        title: 'Brick Base',
        sizes: '100ml, 200ml, 250ml, 500ml, 1000ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'brick-mid',
        slug: 'brick-mid',
        title: 'Brick Mid',
        sizes: '200ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'lamiwedge',
        slug: 'lamiwedge',
        title: 'LamiWedge',
        sizes: '125ml, 200ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'lamipillow',
        slug: 'lamipillow',
        title: 'LamiPillow',
        sizes: '70ml, 100ml, 200ml, 220ml, 250ml, 600ml, 1000ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'lamitriangle',
        slug: 'lamitriangle',
        title: 'LamiTriangle',
        sizes: '20ml, 65ml, 80ml, 150ml, 200ml',
        image: '/product_image_3.jpg',
      },
    ];

    const premiumProducts: RollFedCatalogProduct[] = [
      { id: 'lamileaf-slim', slug: 'lamileaf-slim', title: 'LamiLeaf Slim', sizes: '125ml, 200ml', image: '/product_image_3.jpg' },
      { id: 'lamidiamond', slug: 'lamidiamond', title: 'LamiDiamond', sizes: '200ml, 250ml, 1000ml', image: '/product_image_3.jpg' },
      { id: 'lamisquare', slug: 'lamisquare', title: 'LamiSquare', sizes: '1000ml', image: '/product_image_3.jpg' },
      { id: 'lamiedge', slug: 'lamiedge', title: 'LamiEdge', sizes: '500ml, 1000ml', image: '/product_image_3.jpg' },
      { id: 'lamileaf-base', slug: 'lamileaf-base', title: 'LamiLeaf Base', sizes: '250ml', image: '/product_image_3.jpg' },
      { id: 'lamigemina', slug: 'lamigemina', title: 'LamiGemina', sizes: '1000ml', image: '/product_image_3.jpg' },
      { id: 'lami-gemina-leaf', slug: 'lami-gemina-leaf', title: 'Lami Gemina Leaf', sizes: '1000ml', image: '/product_image_3.jpg' },
      { id: 'lamiultra', slug: 'lamiultra', title: 'LamiUltra', sizes: '180ml', image: '/product_image_3.jpg' },
    ];

    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'Roll-Fed',
      seo: {
        meta_title: 'Roll-Fed | Lamipak',
        meta_description: 'Roll-fed packaging systems with standard and premium product families.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'Roll-Fed',
            backgroundImage: '/banner-slider1.jpg',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Roll-Fed' },
            ],
          },
        },
        {
          type: 'rollFedCatalog',
          data: {
            eyebrow: 'Roll-Fed',
            intro:
              'Lamipak’s roll-fed packaging system is the most efficient solution for today’s beverage industry. Designed for high compatibility with various filling machines, this format offers competitive production costs without compromising food safety. With aseptic lamination technology that ensures long-lasting freshness, Lamipak Roll-fed sets a new standard for brands prioritizing sustainability, logistical efficiency, and retail.',
            standardTitle: 'Standard Products',
            standardProducts,
            premiumTitle: 'Premium Products',
            premiumProducts,
          },
        },
      ],
    };
  }

  if (subCategory === 'sleeve-fed') {
    const standardProducts: RollFedCatalogProduct[] = [
      {
        id: 'lsba1',
        slug: 'brick-slim',
        title: 'LSBA1',
        sizes: '125ml, 150ml, 180ml, 200ml, 250ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'lsba3',
        slug: 'brick-base',
        title: 'LSBA3',
        sizes: '500ml, 750ml, 1000ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'lsba7',
        slug: 'brick-mid',
        title: 'LSBA7',
        sizes: '150ml, 200ml, 250ml, 300ml, 330ml, 350ml',
        image: '/product_image_3.jpg',
      },
      {
        id: 'lsba12',
        slug: 'lamiwedge',
        title: 'LSBA12',
        sizes: '80ml, 90ml, 100ml, 110ml, 125ml, 150ml, 160ml, 180ml, 200ml',
        image: '/product_image_3.jpg',
      },
    ];

    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'Sleeve-Fed',
      seo: {
        meta_title: 'Sleeve-Fed | Lamipak',
        meta_description:
          'Sleeve-fed format with broad content options and standard product families.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'Sleeve-Fed',
            backgroundImage: '/banner-slider1.jpg',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Sleeve-Fed' },
            ],
          },
        },
        {
          type: 'rollFedCatalog',
          data: {
            eyebrow: 'Sleeve-Fed',
            intro:
              'Discover Lamipak’s groundbreaking Sleeve-fed products, introducing a revolutionary sleeve-fed format that offers an array of content options for aseptic packages. Unlike traditional roll-fed methods, this innovative format accommodates particulates in your product, a feat made possible for filling lines equipped with the appropriate kit. Expand the possibilities for your product by exploring a broader range of content options, enhancing its appeal and functionality.',
            standardTitle: 'Standard Products',
            standardProducts,
            premiumTitle: '',
            premiumProducts: [],
          },
        },
      ],
    };
  }

  if (subCategory === 'sustainable-solutions') {
    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'Sustainable Solutions',
      seo: {
        meta_title: 'Sustainable Solutions | Lamipak',
        meta_description:
          'Sustainable aseptic packaging solutions like LamiNatural, LamiPure, and LamiPristine — engineered for performance and reduced environmental impact.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'Sustainable Solutions',
            backgroundImage: '/banner-slider1.jpg',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Sustainable Solutions' },
            ],
          },
        },
        {
          type: 'sustainableSolutions',
          data: {
            intro:
              'Lamipak is committed to sustainable packaging and engineered solutions designed to protect product quality while reducing environmental impact.',
            items: [
              {
                id: 'laminatural',
                title: 'LamiNatural',
                description:
                  'LamiNatural is more than just a package; it is a commitment to sustainability. Lamipak’s first sustainable packaging solution, featuring in a bio-based barrier design and reduced impact in real-world operations.',
                image: '/product_image_1.jpg',
                imageAlt: 'LamiNatural sustainable packaging',
                href: '/products/lamisleeve-aseptic-packaging',
              },
              {
                id: 'lamipure',
                title: 'LamiPure',
                description:
                  'LamiPure represents the next evolution in sustainable packaging solutions. Engineered with performance at its core, LamiPure offers aseptic barrier reliability while helping brands reduce their environmental footprint.',
                image: '/product_image_2.jpg',
                imageAlt: 'LamiPure sustainable packaging',
                href: '/products/lamipure-sterile-packaging',
              },
              {
                id: 'lamipristine',
                title: 'LamiPristine',
                description:
                  'LamiPristine is an innovative and sustainable aseptic packaging solution by eliminating foil and utilizing unbleached paperboard. By replacing conventional PE barrier layers, LamiPristine supports better circularity in real operations.',
                image: '/product_image_3.jpg',
                imageAlt: 'LamiPristine sustainable packaging',
                href: '/products/lamisleeve-aseptic-packaging',
              },
            ],
          },
        },
      ],
    };
  }

  if (subCategory === 'lamistraw') {
    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'LamiStraw',
      seo: {
        meta_title: 'LamiStraw | Lamipak',
        meta_description:
          'LamiPak paper straw alternatives: sustainable, consumer-friendly, and designed for modern aseptic beverages.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'LamiStraw',
            backgroundImage: '/banner-slider1.jpg',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'LamiStraw' },
            ],
          },
        },
        {
          type: 'lamiStrawLanding',
          data: {
            eyebrow: 'LamiPak Paper Straws',
            title: 'The Sustainable Alternative To Plastic Straws',
            descriptionLines: [
              "Lamipak’s sustainable paper straw is a revolutionary product developed as the best alternative to plastic straws. With the alarming rise in discarded waste, there has never been a more critical time to switch to environmentally friendly alternatives like our biodegradable paper straws.",
              'As a leading provider of paper straws for aseptic packaging, Lamipak offers high-quality paper based straws that are fully functional and reliable. Our recyclable paper straws are specifically designed as paper straws for aseptic carton packs, ensuring that your transition to eco-friendly paper straws never compromises the consumer experience. Join us in implementing paper straws solutions that protect our oceans and provide a cleaner future.',
            ],
            cards: [
              {
                id: 'u-shape',
                title: 'U-Shape Straw',
                description:
                  'The U-Shape Straw is a flexible, U-curved paper straw specifically designed for beverage cartons. Features a sturdy build and a water-based curved section.',
                readMoreLabel: 'Read More →',
                href: '/products/u-shape-straw',
                iconId: 'u',
                image: '/accessories_img_2.jpg',
                imageAlt: 'U-Shape Straw',
              },
              {
                id: 'telescopic',
                title: 'Telescopic Straw',
                description:
                  'The Telescopic Straw is designed with an extendable tube structure that adapts seamlessly to various packaging sizes, offering enhanced flexibility and convenience.',
                readMoreLabel: 'Read More →',
                href: '/products/telescopic-straw',
                iconId: 'telescope',
                image: '/accessories_img_1.jpg',
                imageAlt: 'Telescopic Straw',
              },
              {
                id: 'i-shape',
                title: 'I-Shape Straw',
                description:
                  'The I-Shape Straw features a standard straight tube design engineered for superior mechanical strength and strong puncture resistance, ensuring comfort and reliable performance.',
                readMoreLabel: 'Read More →',
                href: '/products/telescopic-straw',
                iconId: 'i',
                image: '/accessories_img_3.jpg',
                imageAlt: 'I-Shape Straw',
              },
              {
                id: 'lamiflow',
                title: 'LamiFlow Straw',
                description:
                  'LamiFlow Straw redefines the drinking experience with its innovative flow-molded design, replacing the conventional single aperture to deliver liquid through multiple directions.',
                readMoreLabel: 'Read More →',
                href: '/products/telescopic-straw',
                iconId: 'flow',
                image: '/accessories_img_3.jpg',
                imageAlt: 'LamiFlow Straw',
              },
            ],
          },
        },
      ],
    };
  }

  if (subCategory === 'one-pack-one-code') {
    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'One Pack One Code',
      seo: {
        meta_title: 'One Pack One Code | Lamipak',
        meta_description:
          'Digital co-printing and traceability solutions for aseptic packaging — connecting brands with consumers through one code.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'One Pack One Code',
            backgroundImage: '/banner-slider2.webp',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'One Pack One Code' },
            ],
          },
        },
        {
          type: 'onePackOneCodeLanding',
          data: {
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'One Pack One Code' },
            ],
            tabs: [
              { id: 'digital', label: 'Digital Co-Printing' },
              { id: 'lottery', label: 'Lottery Activities' },
              { id: 'marketing', label: 'Marketing/Brand Promotion' },
              { id: 'loyalty', label: 'Loyalty/Rewards' },
              { id: 'traceability', label: 'Traceability' },
            ],
            activeTabId: 'lottery',
            hero: {
              backgroundImage: '/banner-slider2.webp',
              videoUrl: '/video2.mp4',
            },
            connectSection: {
              heading: 'Connect with Our Technical Experts',
              headingHighlight: 'Technical Experts',
              formTitle: 'Send Us A Message',
              illustrationImage: '/connected_image.jpg',
              illustrationAlt: 'Connect with Technical Experts',
            },
            accessPoints: {
              title: 'Universal Access Points',
              description:
                'Flexible code placement allows for seamless integration without compromising brand aesthetics.',
              items: [
                { id: 'tap', title: 'Under the tap', content: 'Place the code under the tap for quick consumer scanning.' },
                { id: 'cap', title: 'Under the cap', content: 'Keep the code accessible while maintaining a clean look.' },
                { id: 'back', title: 'On the back', content: 'Use the back area for QR and campaign routing.' },
                { id: 'label-cap', title: 'On the cap', content: 'Print on the cap for reliable scan performance.' },
              ],
            },
            features: [
              {
                id: 'digital',
                number: '01',
                title: 'Digital Co-Printing',
                bullets: [
                  'Our high-speed digital printing technology allows for unique identification across single packs.',
                  'Highly-resilient variable data and customization at scale.',
                  'Seamless integration with existing production workflows.',
                ],
                image: '/product_image_1.jpg',
              },
              {
                id: 'lottery',
                number: '02',
                title: 'LOTTERY',
                bullets: [
                  'Engage consumers with instant-win campaigns and participating codes.',
                  'Boost brand interaction through controlled redemption flows.',
                  'Track participation and performance across regions.',
                ],
                image: '/product_image_2.jpg',
              },
              {
                id: 'marketing',
                number: '03',
                title: 'Marketing/Brand Promotion',
                bullets: [
                  'Drive targeted promotions with scannable codes and dynamic callouts.',
                  'Support seasonal campaigns, retail activations, and content-led engagement.',
                  'Deliver measurable performance insights from scan-to-engagement.',
                ],
                image: '/product_image_3.jpg',
              },
              {
                id: 'loyalty',
                number: '04',
                title: 'Loyalty and Rewards',
                bullets: [
                  'Turn purchases into loyalty points and reward-based experiences.',
                  'Personalize redemption journeys for repeat customers and partners.',
                  'Maintain traceability while improving customer satisfaction.',
                ],
                image: '/product_image_2.jpg',
              },
              {
                id: 'traceability',
                number: '05',
                title: 'Traceability',
                bullets: [
                  'Track product origin and improve quality assurance workflows.',
                  'Reduce risk with verified code validation and data continuity.',
                  'Support compliance and responsible supply chain reporting.',
                ],
                image: '/product_image_1.jpg',
              },
            ],
          },
        },
      ],
    };
  }

  const category = await getCategoryBySlug(subCategory);
  if (!category) return null;

  const products = await getProductsByCategory(subCategory);
  const productItems: ProductGridSectionItem[] = products.map(toProductGridItem);

  return {
    slug: `${mainCategory}/${subCategory}`,
    title: category.name,
    seo: {
      meta_title: category.seo?.meta_title || `${category.name} | Lamipak`,
      meta_description: category.seo?.meta_description || category.description,
      canonical_path: `/products/category/${subCategory}`,
    },
    sections: [
      { type: 'hero', data: buildCategoryHero(category) },
      {
        type: 'productGrid',
        data: {
          eyebrow: 'WHAT WE SUPPORT',
          title: `${category.name} We Support`,
          products: productItems,
        },
      },
    ],
  };
}

export async function getProductDetailPage(
  mainCategory: PageBuilderMainCategory,
  subCategory: PageBuilderSubCategory,
  slug: string,
): Promise<PageBuilderPageData | null> {
  if (!isSupportedMainCategory(mainCategory)) return null;

  const product = await getProductData(slug);
  if (!product) return null;

  return {
    slug: `${mainCategory}/${subCategory}/${slug}`,
    title: product.title,
    seo: {
      meta_title: product.seo?.meta_title || `${product.title} | Lamipak`,
      meta_description: product.seo?.meta_description || product.shortDescription,
      canonical_path: product.seo?.canonical_url || `/${mainCategory}/${subCategory}/${slug}`,
    },
    sections: [
      {
        type: 'hero',
        data: {
          title: product.title,
          subtitle: product.shortDescription,
          backgroundImage: product.heroBackgroundImage || product.image,
        },
      },
      {
        type: 'productDetails',
        data: {
          title: product.title,
          shortDescription: product.shortDescription,
          description: product.description,
          image: product.image,
          technicalSheetUrl: product.technicalSheetUrl,
          technicalSheetText: product.technicalSheetText,
        },
      },
      {
        type: 'customBanner',
        data: {
          text: product.category
            ? `Explore more ${product.category} products for your line.`
            : 'Explore more Lamipak products for your line.',
        },
      },
    ],
  };
}

