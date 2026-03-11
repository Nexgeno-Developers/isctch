/**
 * Fake API for Product Categories
 * 
 * This file contains mock data for product categories.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

export interface CategorySEO {
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: {
    '@context': string;
    '@type': string;
    name?: string;
    description?: string;
    [key: string]: unknown;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  heroBackgroundImage?: string; // Background image for hero section
  heroSubtitle?: string; // Subtitle text for hero section (e.g., "PURE DAIRY, SAFELY PACKED FOR YOU")
  pilotPlant?: {
    label: string;
    heading: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
  seo?: CategorySEO;
}

/**
 * Category definitions with SEO data
 */
const categories: ProductCategory[] = [
  {
    id: '1',
    name: 'Aseptic Packaging',
    slug: 'aseptic-packaging',
    description: 'Advanced aseptic packaging solutions for extended shelf life without refrigeration. Perfect for dairy, beverages, and liquid foods.',
    image: '/category-aseptic.jpg',
    heroBackgroundImage: '/banner-slider1.jpg',
    heroSubtitle: 'Extended shelf life, superior barrier protection',
    pilotPlant: {
      label: 'PILOT PLANT',
      heading: 'TEST YOUR PRODUCT ON PILOT LINES BEFORE FULL-SCALE COMMITMENT',
      ctaText: 'REQUEST PILOT ACCESS',
      ctaLink: '/contact',
      backgroundImage: '/pilot-plant-bg',
    },
    seo: {
      meta_title: 'Aseptic Packaging Solutions | Lamipak - Extended Shelf Life Packaging',
      meta_description: 'Discover our advanced aseptic packaging solutions designed for extended shelf life, superior barrier protection, and sustainable packaging for dairy, beverages, and liquid foods.',
      canonical_url: '/products/category/aseptic-packaging',
      og_title: 'Aseptic Packaging Solutions | Lamipak',
      og_description: 'Advanced aseptic packaging for extended shelf life without refrigeration',
      og_image: '/category-aseptic.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Aseptic Packaging Solutions',
      twitter_description: 'Extended shelf life packaging solutions for dairy and beverages',
      twitter_image: '/category-aseptic.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Aseptic Packaging',
        description: 'Advanced aseptic packaging solutions for extended shelf life',
      },
    },
  },
  {
    id: '2',
    name: 'Sterile Packaging',
    slug: 'sterile-packaging',
    description: 'Ultra-clean sterile packaging for pharmaceutical and sensitive liquid applications. FDA approved with Class A sterility standards.',
    image: '/category-sterile.jpg',
    heroBackgroundImage: '/banner-slider2.jpg',
    heroSubtitle: 'Pharmaceutical-grade sterile packaging solutions',
    seo: {
      meta_title: 'Sterile Packaging Solutions | Lamipak - Pharmaceutical Grade Packaging',
      meta_description: 'Ultra-clean sterile packaging systems for pharmaceutical and sensitive liquid products. FDA approved with Class A sterility standards and maximum product safety.',
      canonical_url: '/products/category/sterile-packaging',
      og_title: 'Sterile Packaging Solutions | Lamipak',
      og_description: 'Pharmaceutical-grade sterile packaging for maximum product safety',
      og_image: '/category-sterile.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Sterile Packaging Solutions',
      twitter_description: 'Ultra-clean sterile packaging for pharmaceutical applications',
      twitter_image: '/category-sterile.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Sterile Packaging',
        description: 'Ultra-clean sterile packaging for pharmaceutical applications',
      },
    },
  },
  {
    id: '3',
    name: 'Closure Systems',
    slug: 'closure-systems',
    description: 'Innovative closure systems providing secure sealing, easy opening, and tamper-evident features for various packaging formats.',
    image: '/category-closure.jpg',
    heroBackgroundImage: '/banner-slider3.jpg',
    heroSubtitle: 'Secure sealing, easy opening, tamper-evident',
    seo: {
      meta_title: 'Closure Systems | Lamipak - Secure Packaging Closures',
      meta_description: 'Innovative closure systems for secure sealing, easy opening, and tamper-evident features. Multiple closure types including screw cap, snap cap, and pull-tab.',
      canonical_url: '/products/category/closure-systems',
      og_title: 'Closure Systems | Lamipak',
      og_description: 'Innovative closure systems for secure sealing and easy opening',
      og_image: '/category-closure.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Closure Systems',
      twitter_description: 'Secure packaging closures with tamper-evident features',
      twitter_image: '/category-closure.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Closure Systems',
        description: 'Innovative closure systems for secure packaging',
      },
    },
  },
  {
    id: '4',
    name: 'Sustainable Solutions',
    slug: 'sustainable-solutions',
    description: 'Eco-friendly packaging solutions designed for sustainability and reduced environmental impact. Plant-derived materials and recyclable options.',
    image: '/category-sustainable.jpg',
    heroBackgroundImage: '/banner-slider4.jpg',
    heroSubtitle: 'Eco-friendly packaging for a sustainable future',
    seo: {
      meta_title: 'Sustainable Packaging Solutions | Lamipak - Eco-Friendly Packaging',
      meta_description: 'Eco-friendly packaging solutions for sustainability. Plant-derived materials, recyclable options, and reduced carbon footprint packaging.',
      canonical_url: '/products/category/sustainable-solutions',
      og_title: 'Sustainable Packaging Solutions | Lamipak',
      og_description: 'Eco-friendly packaging solutions for a sustainable future',
      og_image: '/category-sustainable.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Sustainable Packaging Solutions',
      twitter_description: 'Eco-friendly packaging with reduced environmental impact',
      twitter_image: '/category-sustainable.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Sustainable Solutions',
        description: 'Eco-friendly packaging solutions for sustainability',
      },
    },
  },
  {
    id: '5',
    name: 'Specialty Packaging',
    slug: 'specialty-packaging',
    description: 'Custom packaging solutions for specialized applications and unique requirements. Tailored solutions for specific industry needs.',
    image: '/category-specialty.jpg',
    heroBackgroundImage: '/banner-slider5.jpg',
    heroSubtitle: 'Custom packaging tailored to your needs',
    seo: {
      meta_title: 'Specialty Packaging Solutions | Lamipak - Custom Packaging',
      meta_description: 'Custom packaging solutions for specialized applications. Tailored solutions designed for unique industry requirements and specific needs.',
      canonical_url: '/products/category/specialty-packaging',
      og_title: 'Specialty Packaging Solutions | Lamipak',
      og_description: 'Custom packaging solutions for specialized applications',
      og_image: '/category-specialty.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Specialty Packaging Solutions',
      twitter_description: 'Custom packaging tailored to your specific needs',
      twitter_image: '/category-specialty.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Specialty Packaging',
        description: 'Custom packaging solutions for specialized applications',
      },
    },
  },
];

/**
 * Gets all categories
 * 
 * @returns Promise<ProductCategory[]>
 */
export async function getAllCategories(): Promise<ProductCategory[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories;
}

/**
 * Gets category by slug
 * 
 * @param slug - The category slug
 * @returns Promise<ProductCategory | null>
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories.find((c) => c.slug === slug) || null;
}

/**
 * Gets all category slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories.map((c) => c.slug);
}
