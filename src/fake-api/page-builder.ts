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

export type PageBuilderSection =
  | { type: 'hero'; data: HeroSectionData }
  | { type: 'subcategoryGrid'; data: SubCategoryGridSectionData }
  | { type: 'categoryShowcase'; data: CategoryShowcaseSectionData }
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
              href: '/packaging/sterile-packaging',
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

