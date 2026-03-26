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
export type CategoryShowcaseIconId =
  | 'roll'
  | 'sleeve'
  | 'cap'
  | 'straw'
  | 'water'
  | 'innovation'
  | 'sustainable'
  | 'metallic'
  | 'code';

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

export type WaterpakLandingSectionData = {
  title: string;
  image: string;
  descriptionLines: string[];
  sizeFormatTitle: string;
  sizeFormatText: string;
  availableInTitle: string;
  availableIn: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  availableInDescription: string;
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
};

export type MetallicLnkLandingSectionData = {
  title: string;
  image: string;
  descriptionLines: string[];
  sizeFormatTitle: string;
  sizeFormatText: string;
  productFeaturesTitle: string;
  productFeaturesPills: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  productFeaturesDescription: string;
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
};

export type OpticapLandingSectionData = {
  title: string;
  image: string;
  descriptionLines: string[];
  sizeFormatTitle: string;
  sizeFormatText: string;
  productFeaturesTitle: string;
  productFeaturesPills: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  productFeaturesDescription: string;
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
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
  | { type: 'waterpakLanding'; data: WaterpakLandingSectionData }
  | { type: 'metallicLnkLanding'; data: MetallicLnkLandingSectionData }
  | { type: 'opticapLanding'; data: OpticapLandingSectionData }
  | { type: 'productGrid'; data: ProductGridSectionData }
  | { type: 'productDetails'; data: ProductDetailsSectionData }
  | { type: 'customBanner'; data: CustomBannerSectionData }
  | { type: 'callToAction' }
  | { type: 'newsletterSubscription' };

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
        type: 'heroWithBreadcrumbs',
        data: {
          title: 'Packaging',
          backgroundImage: '/packaging_banner.webp',
          breadcrumbs: [{ label: 'Packaging' }],
        },
      },
      {
        type: 'categoryShowcase',
        data: {
          eyebrow: 'Solutions',
          headline: 'Packaging that fits your line',
          intro:
            'Lamipak offers a comprehensive range of aseptic packaging solutions designed to protect product quality, extend shelf life, and support efficient production. From beverages and dairy to culinary and specialty foods, our innovative carton packaging combines performance, flexibility, and sustainable packaging solutions to help brands deliver safe, high-quality products to consumers worldwide.',
          items: [
            {
              id: 'roll-fed',
              code: 'LAMI-01',
              title: 'Roll-fed',
              description:
                'Optimized for high-speed filling lines, our roll-fed aseptic material offers superior barrier properties and shelf-life stability.',
              ctaLabel: 'Technical specs',
              href: '/packaging/roll-fed',
              iconId: 'roll',
            },
            {
              id: 'sleeve-fed',
              code: 'LAMI-02',
              title: 'Sleeve-fed',
              description:
                'Versatile pre-formed sleeves designed for flexible manufacturing environments, providing rapid changeover capabilities.',
              ctaLabel: 'Technical specs',
              href: '/packaging/sleeve-fed',
              iconId: 'sleeve',
            },
            {
              id: 'cap-solutions',
              code: 'LAMI-03',
              title: 'Cap Solutions',
              description:
                'Precision-engineered closures ensuring leak-proof sealing and intuitive opening experiences for end consumers.',
              ctaLabel: 'Technical specs',
              href: '/packaging/cap-solutions',
              iconId: 'cap',
            },
            {
              id: 'straws',
              badge: 'BIO-BASED',
              title: 'Straws',
              description:
                'Paper and bio-plastic straw alternatives that integrate seamlessly with our drink packaging formats without compromising user experience.',
              ctaLabel: 'Impact report',
              href: '/packaging/lamistraw',
              variant: 'highlight',
              iconId: 'straw',
            },
            {
              id: 'waterpak',
              code: 'LAMI-05',
              title: 'Waterpak',
              description:
                'Specifically engineered for still water, providing a low-carbon alternative to PET bottles with exceptional freshness retention.',
              ctaLabel: 'Technical specs',
              href: '/packaging/waterpak',
              iconId: 'water',
            },
            {
              id: 'sustainable-solutions',
              code: 'LAMI-07',
              title: 'Sustainable',
              description:
                'Crafted with an outer bio-based polymer coating and unbleached paperboard, LamiNatural boasts a significantly lower carbon footprint throughout...',
              ctaLabel: 'Technical specs',
              href: '/packaging/sustainable-solutions',
              iconId: 'sustainable',
            },
            {
              id: 'metallic-lnk',
              code: 'LAMI-08',
              title: 'Metallic Ink',
              description:
                "Lamipak's metallic ink solutions provide a premium visual finish while maintaining strict food-grade safety standards for aseptic carton packaging.",
              ctaLabel: 'Technical specs',
              href: '/packaging/metallic-lnk',
              iconId: 'metallic',
            },
            {
              id: 'one-pack-one-code',
              code: 'LAMI-09',
              title: 'One Pack One Code',
              description:
                'Digital co-printing, traceability, and consumer engagement through a single code on-pack — connecting brands with shoppers while supporting compliance and loyalty.',
              ctaLabel: 'Technical specs',
              href: '/packaging/one-pack-one-code',
              iconId: 'code',
            },
          ],
        },
      },
      { type: 'callToAction' },
      { type: 'newsletterSubscription' },
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
        image: '/sleeve_product1.webp',
      },
      {
        id: 'lsba3',
        slug: 'brick-base',
        title: 'LSBA3',
        sizes: '500ml, 750ml, 1000ml',
        image: '/sleeve_product2.webp',
      },
      {
        id: 'lsba7',
        slug: 'brick-mid',
        title: 'LSBA7',
        sizes: '150ml, 200ml, 250ml, 300ml, 330ml, 350ml',
        image: '/sleeve_product3.webp',
      },
      {
        id: 'lsba12',
        slug: 'lamiwedge',
        title: 'LSBA12',
        sizes: '80ml, 90ml, 100ml, 110ml, 125ml, 150ml, 160ml, 180ml, 200ml',
        image: '/sleeve_product4.webp',
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
            backgroundImage: '/seelve_banner.webp',
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
            backgroundImage: '/sutanable_image1.webp',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Sustainable Solutions' },
            ],
          },
        },
        {
          type: 'sustainableSolutions',
          data: {
            intro: `At Lamipak, we are committed to sustainability, continuously investing in eco-friendly innovations to reduce environmental impact. Our diverse portfolio of sustainable packaging solutions includes high-performance sustainable aseptic packaging such as LamiNatural, LamiPure, and LamiPristine.
            
            To further support your transition to green packaging, our range is complemented by eco-friendly packaging materials and components like Waterpak, sustainable inks (Temperature & Metallic), and advanced environmentally friendly packaging closure systems like LamiCap. Partner with Lamipak to integrate innovative sustainable packaging solutions into your supply chain and meet the rising demand for responsible, recyclable packaging solutions.`,
            items: [
              {
                id: 'laminatural',
                title: 'LamiNatural',
                description:
                  'LamiNatural is more than just a package it&apos;s a commitment to sustainability, Lamipak’s first sustainable packaging solution. Featuring unbleached brown board and bio-based PE layers for outer surfaces, replacing conventional PE.',
                image: '/laminatural_image11.webp',
                imageAlt: 'LamiNatural sustainable packaging',
                href: '/',
              },
              {
                id: 'lamipure',
                title: 'LamiPure',
                description:
                  'LamiPure represents the next evolution in sustainable packaging solutions, building on the success of LamiNatural. As Lamipak&apos;s first aluminum foil-free barrier layer, LamiPure is poised to revolutionize the industry.',
                image: '/laminatural_image21.webp',
                imageAlt: 'LamiPure sustainable packaging',
                href: '/',
              },
              {
                id: 'lamipristine',
                title: 'LamiPristine',
                description:
                  'LamiPristine offers an innovative and sustainable aseptic packaging solution by eliminating aluminum foil and utilizing unbleached paperboard. By replacing conventional PE barrier layers with bio-based PE',
                image: '/laminatural_image31.webp',
                imageAlt: 'LamiPristine sustainable packaging',
                href: '/',
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
            backgroundImage: '/lawmistraw_banner.webp',
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
              "Lamipak's sustainable paper straw is a revolutionary product developed as the best alternative to plastic straws. With the alarming rise in discarded waste, there has never been a more critical time to switch to environmentally friendly alternatives like our biodegradable paper straws.",
              'As a leading provider of paper straws for aseptic packaging, Lamipak offers high-quality paper based straws that are fully functional and reliable. Our recyclable paper straws are specifically designed as paper straws for aseptic carton pack, ensuring that your transition to eco-friendly paper straws never compromises the consumer experience. Join us in implementing paper straws solutions that protect our oceans and provide a cleaner future.',
            ],
            cards: [
              {
                id: 'u-shape',
                title: 'U–Shape Straw',
                description:
                  'The U-Shape Paper Straw is a flexible, U-curved paper straw specifically designed for beverage cartons. It features a sturdy three-layer paper structure with a water-based outer coating to prevent it from getting soggy.',
                readMoreLabel: 'Read More →',
                href: '/',
                iconId: 'u',
                image: '/shadow_image.png',
                imageAlt: 'U-Shape Straw',
              },
              {
                id: 'telescopic',
                title: 'Telescopic Straw',
                description:
                  'The Telescopic Paper Straw is designed with an extendable tube structure that adapts seamlessly to various packaging sizes, offering enhanced flexibility and convenience.',
                readMoreLabel: 'Read More →',
                href: '/',
                iconId: 'telescope',
                image: '/shadow_image2.png',
                imageAlt: 'Telescopic Straw',
              },
              {
                id: 'i-shape',
                title: 'I–Shape Straw',
                description:
                  'The I–Shape Straw features a standard straight-tube design engineered for superior mechanical strength and strong puncture resistance, ensuring smooth and reliable piercing of packaging every time.',
                readMoreLabel: 'Read More →',
                href: '/',
                iconId: 'i',
                image: '/shadow_image3.png',
                imageAlt: 'I-Shape Straw',
              },
              {
                id: 'lamiflow',
                title: 'LamiFlow Straw',
                description:
                  'LamiFlow Straw redefines the drinking experience with its innovative four micro-opening design, replacing the conventional single aperture to deliver liquid evenly from multiple directions. Engineered through sensory science and .. ',
                readMoreLabel: 'Read More →',
                href: '/',
                iconId: 'flow',
                image: '/shadow_image4.png',
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
            backgroundImage: '/onepack_onecode.webp',
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
              { id: 'marketing', label: 'Marketing Promotion' },
              { id: 'loyalty', label: 'Loyalty and Rewards' },
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
                  'We print unique images, messages or QR codes directly onto existing packaging. Different packs can carry different messages, creating dynamic storytelling right on the shelf.',
                  'High-resolution variable data',
                  'Seamless integration with production lines',
                ],
                image: '/one_pack_image_1.webp',
              },
              {
                id: 'lottery',
                number: '02',
                title: 'Lottery Activities',
                bullets: [
                  'Consumers scan to participate in prize draws during events, activations, or campaigns, turning engagement into excitement',
                ],
                image: '/one_pack_image_2.webp',
              },
              {
                id: 'marketing',
                number: '03',
                title: 'Marketing Promotion',
                bullets: [
                  'Interactive games and digital promotions bring your brand to life and keep consumers coming back.',
                ],
                image: '/one_pack_image_3.webp',
              },
              {
                id: 'loyalty',
                number: '04',
                title: 'Loyalty and Rewards',
                bullets: [
                  'Each pack carries a unique code, enabling point systems and rewards that encourage repeat purchases through verified after-purchase scanning.',
                ],
                image: '/one_pack_image_4.webp',
              },
              {
                id: 'traceability',
                number: '05',
                title: 'Traceability',
                bullets: [
                  'Consumers can scan to learn where their product comes from, supporting transparency, sustainability stories, and organic sourcing claims.',
                ],
                image: '/one_pack_image_5.webp',
              },
            ],
          },
        },
      ],
    };
  }

  if (subCategory === 'waterpak') {
    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'WaterPak',
      seo: {
        meta_title: 'WaterPak | Lamipak',
        meta_description:
          'WaterPak packaging solutions for still and sparkling water — engineered for clarity, lightweight structure, and retail shelf appeal.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'Waterpak',
            backgroundImage: '/waterpak_image.webp',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Waterpak' },
            ],
          },
        },
        {
          type: 'waterpakLanding',
          data: {
            title: 'WaterPak',
            image: '/waterpak_image_left.webp',
            descriptionLines: [
              'WaterPak redefines hydration by offering a premium alternative packaging for bottled water that prioritizes both purity and planetary health. Utilizing state-of-the-art carton packaging for water, our solution features advanced barrier protection to ensure that still water packages remain fresh, odor-free, and completely protected from external contamination.',
              'As a leader in eco friendly water packaging, WaterPak utilizes a high-performance water in cardboard packaging design that is lightweight yet durable, thanks to specialized water resistant paper packaging technology. Whether in a convenient water carton box or a high-capacity water bag box system, our sustainable water packaging ensures an extended shelf life without compromising taste integrity. Choose water in recyclable packaging to align your brand with environmental responsibility and the future of sustainable hydration.',
            ],
            sizeFormatTitle: 'Size Format',
            sizeFormatText:
              'Can be used in Roll-fed format, Sleeve-fed format, and Sustainable product',
            availableInTitle: 'WaterPak is Available In',
            availableIn: [
              { id: 'sleeve-fed', label: 'Sleeve Fed', href: '/packaging/sleeve-fed' },
              { id: 'roll-fed', label: 'Roll Fed', href: '/packaging/roll-fed' },
              { id: 'one-pack-one-code', label: 'OnePack OneCode', href: '/packaging/one-pack-one-code' },
              { id: 'sustainable-product', label: 'Sustainable product', href: '/packaging/sustainable-solutions' },
            ],
            availableInDescription:
              'WaterPak offers exceptional flexibility, available in Roll-Fed, Sleeve-Fed, and Sustainable Product formats to support your brand&apos;s eco-commitment. Enhance your packaging further with OnePack OneCode integration to strengthen digital consumer engagement, making WaterPak a smart choice that prioritizes quality integrity and environmental responsibility.',
            connectSection: {
              heading: 'Connect with Our Technical Experts',
              headingHighlight: 'Technical Experts',
              formTitle: 'Send Us A Message',
              illustrationImage: '/connected_image.jpg',
              illustrationAlt: 'Connect with Technical Experts',
            },
          },
        },
      ],
    };
  }

  if (subCategory === 'metallic-lnk') {
    return {
      slug: `${mainCategory}/${subCategory}`,
      title: 'Metallic Ink',
      seo: {
        meta_title: 'Metallic Ink | Lamipak',
        meta_description:
          'Metallic ink co-printing effect for premium bottle and beverage packaging — designed for consistent adhesion and shelf impact.',
        canonical_path: `/${mainCategory}/${subCategory}`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'Metallic Ink',
            backgroundImage: '/metallic_ink.webp',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Metallic Ink' },
            ],
          },
        },
        {
          type: 'metallicLnkLanding',
          data: {
            title: 'Metallic Ink',
            image: '/waterpak_image_left_2.webp',
            descriptionLines: [
              'Metallic Ink delivers striking localized metallic effects, creating a premium, eye-catching look that elevates your brand’s presence on the shelf. With exceptional design flexibility, it reduces material costs while offering a sustainable and versatile packaging solution that combines luxury, innovation, and environmental responsibility.',
            ],
            sizeFormatTitle: 'Size Format',
            sizeFormatText: 'can be used in Roll-fed format and Sleeve-fed format',
            productFeaturesTitle: 'Product Features',
            productFeaturesPills: [
              { id: 'sleeve-fed', label: 'Sleeve Fed', href: '/packaging/sleeve-fed' },
              { id: 'roll-fed', label: 'Roll Fed', href: '/packaging/roll-fed' },
              { id: 'one-pack-one-code', label: 'OnePack OneCode', href: '/packaging/one-pack-one-code' },
            ],
            productFeaturesDescription:
              'Deliver a premium and exclusive feel to your brand with Metallic Ink, providing a luxurious shimmering effect on every corner of your packaging. This feature is fully compatible with both Roll-Fed and Sleeve-Fed formats, offering complete flexibility for your production lines. Elevate your shelf presence and strengthen consumer interaction through OnePack OneCode technology integration, setting a new standard for elegant and innovative packaging.',
            connectSection: {
              heading: 'Connect with Our Technical Experts',
              headingHighlight: 'Technical Experts',
              formTitle: 'Send Us A Message',
              illustrationImage: '/connected_image.jpg',
              illustrationAlt: 'Connect with Technical Experts',
            },
          },
        },
      ],
    };
  }

  if (subCategory === 'cap-solutions') {
    // Cap Solutions landing page (legacy "opticap" link is disabled below)
    return {
      slug: `${mainCategory}/cap-solutions`,
      title: 'Cap Solutions',
      seo: {
        meta_title: 'Cap Solutions | Lamipak',
        meta_description:
          'Cap Solutions are precision-engineered closures ensuring leak-proof delivery, consumer-friendly opening, and reliable compatibility across production lines.',
        canonical_path: `/${mainCategory}/cap-solutions`,
      },
      sections: [
        {
          type: 'heroWithBreadcrumbs',
          data: {
            title: 'Cap Solutions',
            backgroundImage: '/cap-solution.webp',
            breadcrumbs: [
              { label: 'Packaging', href: '/packaging' },
              { label: 'Cap Solutions' },
            ],
          },
        },
        {
          type: 'opticapLanding',
          data: {
            title: 'Cap Solutions',
            image: '/cap-solution_left-image.webp',
            descriptionLines: [
              'Opticap27, Lamipak&apos;s first cap product, brings innovation and reliability to our One-stop solutions. Newly patented anti-slip grooves for a comfortable and secure grip. Exclusive thread lock system for a tighter and safer close. Innovative cutter shape redefines the cutting experience.  An audible click to lock freshness.',
            
            ],
            sizeFormatTitle: 'Size Format',
            sizeFormatText: 'can be used in Roll-fed format, Sleeve-fed format, and Sustainable product',
            productFeaturesTitle: 'Product Features',
            productFeaturesPills: [
              { id: 'sleeve-fed', label: 'Sleeve Fed', href: '/packaging/sleeve-fed' },
              { id: 'roll-fed', label: 'Roll Fed', href: '/packaging/roll-fed' },
              { id: 'one-pack-one-code', label: 'OnePack OneCode', href: '/packaging/one-pack-one-code' },
              { id: 'waterpak', label: 'Waterpak', href: '/packaging/waterpak' },
              { id: 'metallic-lnk', label: 'Metallic Ink', href: '/packaging/metallic-lnk' },
              { id: 'sustainable-product', label: 'Sustainable Product', href: '/packaging/sustainable-solutions' },
            ],
            productFeaturesDescription:
              'Opticap27 can be seamlessly implemented across Roll-fed, Sleeve-fed, and WaterPak packaging formats, while fully supporting Sustainable Product variants for your green business vision. Add premium visual value with Metallic Ink accents and optimize digital connectivity through OnePackOneCode integration—making Opticap27 a crucial component for packaging that is safer, more functional, and truly modern.',
            connectSection: {
              heading: 'Connect with Our Technical Experts',
              headingHighlight: 'Technical Experts',
              formTitle: 'Send Us A Message',
              illustrationImage: '/connected_image.jpg',
              illustrationAlt: 'Connect with Technical Experts',
            },
          },
        },
      ],
    };
  }

  if (subCategory === 'opticap') {
    return null;
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

