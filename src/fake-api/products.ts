/**
 * Fake API for Product Data
 * 
 * This file contains mock data for product details pages.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

export interface ProductSEO {
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
    image?: string;
    brand?: {
      '@type': string;
      name: string;
    };
    offers?: {
      '@type': string;
      priceCurrency: string;
      price: string;
      availability: string;
    };
    [key: string]: unknown;
  };
}

export interface ProductData {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  imageAlt: string;
  heroBackgroundImage?: string;
  technicalSheetUrl?: string;
  technicalSheetText?: string;
  productImage3D?: string; // 3D product visualization image
  applicationImages?: Record<string, string>; // Images for each application (e.g., { 'DAIRY': '/image1.jpg', 'JUICE': '/image2.jpg' })
  productVideo?: string; // Product video URL (e.g., '/product-dt-video-new.gif')
  sizes?: string[]; // Available sizes (e.g., ['200ml', '250ml', '500ml', '1000ml'])
  quickSpecifications?: Array<{
    label: string;
    value: string;
  }>;
  compatibleWith?: string[]; // Compatible systems/equipment
  applications?: string[]; // Application categories (e.g., ['DAIRY', 'JUICE', 'PLANT-BASED', 'LIQUID FOODS'])
  productFeatures?: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
  gallery?: Array<{
    id: string;
    image: string;
    imageAlt: string;
  }>;
  category?: string;
  specifications?: Array<{
    label: string;
    value: string;
  }>;
  features?: string[];
  benefits?: string[];
  content?: string; // HTML content
  relatedProducts?: string[]; // Array of product slugs
  accessories?: Array<{
    id: string;
    name: string;
    image: string;
    imageAlt: string;
    slug?: string; // Link to product detail page if it's a product
  }>;
  seo: ProductSEO;
}

/**
 * Mock product data
 */
const products: ProductData[] = [
  {
    id: '1',
    slug: 'lamisleeve-aseptic-packaging',
    title: 'LAMISLEEVE',
    description: 'Advanced aseptic packaging solution for liquid products with superior barrier properties and extended shelf life.',
    shortDescription: 'Precision-engineered aseptic carton for high-speed filling and extended shelf life.',
    image: '/product_image_1.jpg',
    imageAlt: 'LamiSleeve Aseptic Packaging',
    heroBackgroundImage: '/banner-slider1.jpg',
    technicalSheetUrl: '/technical-sheets/lamisleeve.pdf',
    technicalSheetText: 'DOWNLOAD TECHNICAL SHEET',
    gallery: [
      {
        id: '1',
        image: '/product_image_1.jpg',
        imageAlt: 'LamiSleeve packaging front view',
      },
      {
        id: '2',
        image: '/product_image_2.jpg',
        imageAlt: 'LamiSleeve packaging side view',
      },
    ],
    category: 'Aseptic Packaging',
    specifications: [
      { label: 'Material', value: 'Multi-layer barrier film' },
      { label: 'Capacity', value: '250ml - 1L' },
      { label: 'Shelf Life', value: 'Up to 12 months' },
      { label: 'Barrier Properties', value: 'Oxygen & Light resistant' },
    ],
    features: [
      'Extended shelf life without refrigeration',
      'Superior barrier protection',
      'Lightweight and eco-friendly',
      'Easy to open and pour',
    ],
    benefits: [
      'Reduces food waste',
      'Lower transportation costs',
      'Maintains product quality',
      'Sustainable packaging solution',
    ],
    content: `
      <h2>About LamiSleeve Aseptic Packaging</h2>
      <p>LamiSleeve is our flagship aseptic packaging solution designed for liquid products that require extended shelf life without refrigeration. Our advanced multi-layer barrier technology ensures optimal product protection while maintaining freshness and nutritional value.</p>
      
      <h3>Key Advantages</h3>
      <ul>
        <li>Extended shelf life up to 12 months</li>
        <li>Superior barrier against oxygen and light</li>
        <li>Lightweight design reduces environmental impact</li>
        <li>Easy-to-open convenience for consumers</li>
      </ul>
      
      <h3>Applications</h3>
      <p>Ideal for dairy products, plant-based beverages, liquid foods, and nutritional drinks.</p>
    `,
    relatedProducts: ['lamipure-sterile-packaging', 'caps-etc-closure-solutions'],
    seo: {
      meta_title: 'LamiSleeve Aseptic Packaging | Lamipak - Premium Packaging Solutions',
      meta_description: 'Discover LamiSleeve aseptic packaging - advanced barrier technology for extended shelf life. Perfect for dairy, beverages, and liquid foods.',
      canonical_url: '/products/lamisleeve-aseptic-packaging',
      og_title: 'LamiSleeve Aseptic Packaging | Lamipak',
      og_description: 'Premium aseptic packaging solution with superior barrier properties',
      og_image: '/product_image_1.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'LamiSleeve Aseptic Packaging',
      twitter_description: 'Advanced aseptic packaging for extended shelf life',
      twitter_image: '/product_image_1.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'LamiSleeve Aseptic Packaging',
        description: 'Advanced aseptic packaging solution for liquid products',
        image: '/product_image_1.jpg',
        brand: {
          '@type': 'Brand',
          name: 'Lamipak',
        },
      },
    },
  },
  {
    id: '2',
    slug: 'lamipure-sterile-packaging',
    title: 'LAMIPURE',
    description: 'Ultra-clean sterile packaging system ensuring maximum product safety and quality for pharmaceutical and sensitive liquid applications.',
    shortDescription: 'Precision-engineered sterile packaging for pharmaceutical and sensitive liquid applications.',
    image: '/product_image_2.jpg',
    imageAlt: 'LamiPure Sterile Packaging',
    heroBackgroundImage: '/banner-slider2.jpg',
    technicalSheetUrl: '/technical-sheets/lamipure.pdf',
    technicalSheetText: 'DOWNLOAD TECHNICAL SHEET',
    category: 'Sterile Packaging',
    specifications: [
      { label: 'Sterility Level', value: 'Class A (ISO 14644)' },
      { label: 'Capacity', value: '100ml - 500ml' },
      { label: 'Applications', value: 'Pharmaceutical & Sensitive liquids' },
      { label: 'Certification', value: 'FDA approved' },
    ],
    features: [
      'Ultra-clean manufacturing process',
      'Pharmaceutical-grade materials',
      'Tamper-evident design',
      'Precision dosing capabilities',
    ],
    benefits: [
      'Maximum product safety',
      'Regulatory compliance',
      'Extended product stability',
      'Consumer confidence',
    ],
    relatedProducts: ['lamisleeve-aseptic-packaging', 'caps-etc-closure-solutions'],
    seo: {
      meta_title: 'LamiPure Sterile Packaging | Lamipak - Pharmaceutical Grade Solutions',
      meta_description: 'Ultra-clean sterile packaging for pharmaceutical and sensitive liquid products. FDA approved with Class A sterility standards.',
      canonical_url: '/products/lamipure-sterile-packaging',
      og_title: 'LamiPure Sterile Packaging | Lamipak',
      og_description: 'Pharmaceutical-grade sterile packaging solutions',
      og_image: '/product_image_2.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'LamiPure Sterile Packaging',
      twitter_description: 'Ultra-clean sterile packaging for pharmaceutical applications',
      twitter_image: '/product_image_2.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'LamiPure Sterile Packaging',
        description: 'Ultra-clean sterile packaging system for pharmaceutical applications',
        image: '/product_image_2.jpg',
        brand: {
          '@type': 'Brand',
          name: 'Lamipak',
        },
      },
    },
  },
  
  {
    id: '3',
    slug: 'lamipure-sterile-packaging',
    title: 'LAMIPURE',
    description: 'Ultra-clean sterile packaging system ensuring maximum product safety and quality for pharmaceutical and sensitive liquid applications.',
    shortDescription: 'Precision-engineered sterile packaging for pharmaceutical and sensitive liquid applications.',
    image: '/product_image_2.jpg',
    imageAlt: 'LamiPure Sterile Packaging',
    heroBackgroundImage: '/banner-slider2.jpg',
    technicalSheetUrl: '/technical-sheets/lamipure.pdf',
    technicalSheetText: 'DOWNLOAD TECHNICAL SHEET',
    category: 'Sterile Packaging',
    specifications: [
      { label: 'Sterility Level', value: 'Class A (ISO 14644)' },
      { label: 'Capacity', value: '100ml - 500ml' },
      { label: 'Applications', value: 'Pharmaceutical & Sensitive liquids' },
      { label: 'Certification', value: 'FDA approved' },
    ],
    features: [
      'Ultra-clean manufacturing process',
      'Pharmaceutical-grade materials',
      'Tamper-evident design',
      'Precision dosing capabilities',
    ],
    benefits: [
      'Maximum product safety',
      'Regulatory compliance',
      'Extended product stability',
      'Consumer confidence',
    ],
    relatedProducts: ['lamisleeve-aseptic-packaging', 'caps-etc-closure-solutions'],
    seo: {
      meta_title: 'LamiPure Sterile Packaging | Lamipak - Pharmaceutical Grade Solutions',
      meta_description: 'Ultra-clean sterile packaging for pharmaceutical and sensitive liquid products. FDA approved with Class A sterility standards.',
      canonical_url: '/products/lamipure-sterile-packaging',
      og_title: 'LamiPure Sterile Packaging | Lamipak',
      og_description: 'Pharmaceutical-grade sterile packaging solutions',
      og_image: '/product_image_2.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'LamiPure Sterile Packaging',
      twitter_description: 'Ultra-clean sterile packaging for pharmaceutical applications',
      twitter_image: '/product_image_2.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'LamiPure Sterile Packaging',
        description: 'Ultra-clean sterile packaging system for pharmaceutical applications',
        image: '/product_image_2.jpg',
        brand: {
          '@type': 'Brand',
          name: 'Lamipak',
        },
      },
    },
  },
  {
    id: '4',
    slug: 'caps-etc-closure-solutions',
    title: 'CAPS ETC',
    description: 'Innovative closure systems providing secure sealing, easy opening, and tamper-evident features for various packaging formats.',
    shortDescription: 'Precision-engineered closure systems for secure sealing and easy opening.',
    image: '/product_image_3.jpg',
    imageAlt: 'Caps ETC Closure Solutions',
    heroBackgroundImage: '/banner-slider3.jpg',
    technicalSheetUrl: '/technical-sheets/caps-etc.pdf',
    technicalSheetText: 'DOWNLOAD TECHNICAL SHEET',
    category: 'Closure Systems',
    specifications: [
      { label: 'Types', value: 'Screw cap, Snap cap, Pull-tab' },
      { label: 'Materials', value: 'PP, PE, Aluminum' },
      { label: 'Sizes', value: '28mm - 63mm' },
      { label: 'Features', value: 'Tamper-evident, Resealable' },
    ],
    features: [
      'Multiple closure types available',
      'Tamper-evident technology',
      'Resealable options',
      'Customizable designs',
    ],
    benefits: [
      'Enhanced product protection',
      'Consumer convenience',
      'Brand differentiation',
      'Extended product freshness',
    ],
    relatedProducts: ['lamisleeve-aseptic-packaging', 'lamipure-sterile-packaging'],
    seo: {
      meta_title: 'Caps ETC Closure Solutions | Lamipak - Secure Packaging Closures',
      meta_description: 'Innovative closure systems with tamper-evident features. Screw caps, snap caps, and pull-tab solutions for all packaging needs.',
      canonical_url: '/products/caps-etc-closure-solutions',
      og_title: 'Caps ETC Closure Solutions | Lamipak',
      og_description: 'Innovative closure systems for secure packaging',
      og_image: '/product_image_3.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Caps ETC Closure Solutions',
      twitter_description: 'Secure closure systems with tamper-evident features',
      twitter_image: '/product_image_3.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Caps ETC Closure Solutions',
        description: 'Innovative closure systems for various packaging formats',
        image: '/product_image_3.jpg',
        brand: {
          '@type': 'Brand',
          name: 'Lamipak',
        },
      },
    },
  },
  {
    id: '5',
    slug: 'brick-slim',
    title: 'BRICK SLIM',
    description: 'Optimized for milk and dairy beverages requiring sterile integrity, structural durability, and cold-chain reliability.',
    shortDescription: 'Precision-engineered aseptic carton for high-speed filling and extended shelf life.',
    image: '/product_image_1.jpg',
    imageAlt: 'Brick Slim Aseptic Carton',
    heroBackgroundImage: '/banner-slider2.jpg',
    technicalSheetUrl: '/technical-sheets/brick-slim.pdf',
    technicalSheetText: 'DOWNLOAD TECHNICAL SHEET',
    productImage3D: '/product_image_1.jpg',
    applicationImages: {
      'DAIRY': '/product_image_1.jpg',
      'JUICE': '/product_image_2.jpg',
      'PLANT-BASED': '/product_image_3.jpg',
      'LIQUID FOODS': '/product_image_1.jpg',
    },
    productVideo: '/product-dt-video-new.gif',
    productFeatures: [
      {
        id: '1',
        title: 'Metallic Ink',
        description: 'Premium print finish',
        image: '/product_image_1.jpg',
        imageAlt: 'Metallic Ink product feature',
      },
      {
        id: '2',
        title: 'LamiNatural',
        description: 'Sustainable material',
        image: '/product_image_2.jpg',
        imageAlt: 'LamiNatural product feature',
      },
      {
        id: '3',
        title: 'WaterPak',
        description: 'Water-resistant coating',
        image: '/product_image_3.jpg',
        imageAlt: 'WaterPak product feature',
      },
    ],
    sizes: ['200ml', '250ml', '500ml', '1000ml'],
    quickSpecifications: [
      { label: 'Filling Speed', value: 'Up to 24,000 packs/hour' },
      { label: 'Shelf Life', value: 'Up to 12 months' },
      { label: 'Barrier Structure', value: 'Multi-layer composite' },
      { label: 'Material Efficiency', value: 'Optimized weight ratio' },
    ],
    compatibleWith: [
      'High-speed filling lines',
      'Standard aseptic systems',
      'Modular integration lines',
    ],
    applications: ['DAIRY', 'JUICE', 'PLANT-BASED', 'LIQUID FOODS'],
    category: 'Aseptic Packaging',
    specifications: [
      { label: 'Material', value: 'Multi-layer aseptic carton' },
      { label: 'Capacity', value: '200ml - 1L' },
      { label: 'Shelf Life', value: 'Up to 12 months' },
      { label: 'Filling Speed', value: 'High-speed compatible' },
    ],
    features: [
      'High-speed filling capability',
      'Extended shelf life without refrigeration',
      'Superior barrier protection',
      'Slim profile design',
      'Easy to handle and stack',
    ],
    benefits: [
      'Increased production efficiency',
      'Reduced storage space requirements',
      'Maintains product quality',
      'Sustainable packaging solution',
      'Consumer-friendly design',
    ],
    content: `
      <h2>About Brick Slim Aseptic Carton</h2>
      <p>Brick Slim is our precision-engineered aseptic carton solution designed specifically for high-speed filling operations. With its slim profile and advanced barrier technology, it offers extended shelf life while maintaining optimal product quality.</p>
      
      <h3>Key Advantages</h3>
      <ul>
        <li>High-speed filling compatible</li>
        <li>Extended shelf life up to 12 months</li>
        <li>Slim profile reduces storage space</li>
        <li>Superior barrier against oxygen and light</li>
        <li>Easy to handle and stack</li>
      </ul>
      
      <h3>Applications</h3>
      <p>Ideal for dairy products, plant-based beverages, liquid foods, and nutritional drinks requiring high-speed production lines.</p>
    `,
    relatedProducts: ['lamisleeve-aseptic-packaging', 'lamipure-sterile-packaging'],
    accessories: [
      {
        id: '1',
        name: 'Telescopic Straw',
        image: '/product_image_1.jpg',
        imageAlt: 'Telescopic Straw accessory',
        slug: 'telescopic-straw',
      },
      {
        id: '2',
        name: 'U-Shape Straw',
        image: '/product_image_2.jpg',
        imageAlt: 'U-Shape Straw accessory',
        slug: 'u-shape-straw',
      },
      {
        id: '3',
        name: 'Telescopic Straw',
        image: '/product_image_1.jpg',
        imageAlt: 'Telescopic Straw accessory',
        slug: 'telescopic-straw',
      },
      {
        id: '4',
        name: 'Telescopic Straw',
        image: '/product_image_1.jpg',
        imageAlt: 'Telescopic Straw accessory',
        slug: 'telescopic-straw',
      },
      {
        id: '5',
        name: 'Telescopic Straw',
        image: '/product_image_1.jpg',
        imageAlt: 'Telescopic Straw accessory',
        slug: 'telescopic-straw',
      },
    ],
    seo: {
      meta_title: 'Brick Slim Aseptic Carton | Lamipak - High-Speed Packaging Solutions',
      meta_description: 'Discover Brick Slim - precision-engineered aseptic carton for high-speed filling and extended shelf life. Perfect for modern production environments.',
      canonical_url: '/products/brick-slim',
      og_title: 'Brick Slim Aseptic Carton | Lamipak',
      og_description: 'Precision-engineered aseptic carton for high-speed filling and extended shelf life',
      og_image: '/product_image_1.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Brick Slim Aseptic Carton',
      twitter_description: 'High-speed aseptic carton with extended shelf life',
      twitter_image: '/product_image_1.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Brick Slim Aseptic Carton',
        description: 'Precision-engineered aseptic carton for high-speed filling and extended shelf life',
        image: '/product_image_1.jpg',
        brand: {
          '@type': 'Brand',
          name: 'Lamipak',
        },
      },
    },
  },
];

/**
 * Fetches product data by slug
 * 
 * @param slug - The product slug
 * @returns Promise<ProductData | null>
 */
export async function getProductData(slug: string): Promise<ProductData | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const product = products.find((p) => p.slug === slug);
  return product || null;
}

/**
 * Gets all product slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllProductSlugs(): Promise<string[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  return products.map((p) => p.slug);
}
