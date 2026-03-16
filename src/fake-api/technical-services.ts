/**
 * Fake API for Technical Services Data
 * 
 * This file contains mock data for technical services pages.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

export interface TechnicalServiceSEO {
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
    [key: string]: unknown;
  };
}

export interface TechnicalServiceData {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  image: string;
  imageAlt: string;
  heroBackgroundImage?: string;
  icon?: string;
  category?: string;
  introSection?: {
    tagline: string; // e.g., "Ensuring Operational Excellence"
    icon?: string; // Star icon or other icon
    detailedDescription?: string; // Longer description paragraph
  };
  detailedFeatures?: {
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
  cta?: {
    label?: string;
    heading?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  seo: TechnicalServiceSEO;
}

// Mock Technical Services Data - Only 3 services (Lami Care, LamiPremium, LamiPartner)
const technicalServices: TechnicalServiceData[] = [
  {
    id: '1',
    slug: 'lami-care',
    title: 'Lami Care',
    description: 'Focused on foundational operational support, this tier includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
    shortDescription: 'Focused on foundational operational support, this tier includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
    image: '/images/technical-services/lami-care-thumbnail.jpg',
    imageAlt: 'Lami Care Service',
    heroBackgroundImage: '/banner-slider1.jpg',
    category: 'Service Tier',
    introSection: {
      tagline: 'Ensuring Operational Excellence',
      icon: '/images/icons/star.svg',
      detailedDescription: 'LamiCare is Lamipak\'s foundational technical service program designed to ensure stable, reliable, and efficient performance across your aseptic carton packaging and aseptic liquid packaging production lines. As part of Lamipak\'s integrated aseptic packaging solutions, LamiCare helps customers maintain production stability while supporting long-term efficiency and sustainable packaging solutions objectives.'
    },
    detailedFeatures: [
      {
        id: '1',
        title: 'Preventive Maintenance',
        description: 'Proactive maintenance services designed to enhance equipment reliability, extend operational lifespan, and ensure consistent performance of aseptic packaging systems and solutions.',
        image: '/images/technical-services/preventive-maintenance.jpg',
        imageAlt: 'Preventive Maintenance Team'
      },
      {
        id: '2',
        title: 'Corrective Maintenance',
        description: 'Rapid response maintenance services to address equipment issues, minimize downtime, and restore optimal performance of your aseptic packaging systems.',
        image: '/images/technical-services/corrective-maintenance.jpg',
        imageAlt: 'Corrective Maintenance Service'
      },
      {
        id: '3',
        title: 'Remote Technical Support',
        description: 'Expert remote assistance and troubleshooting services to resolve technical issues quickly, reduce on-site visits, and maintain continuous production operations.',
        image: '/images/technical-services/remote-support.jpg',
        imageAlt: 'Remote Technical Support'
      },
      {
        id: '4',
        title: 'Overall Line Assessment',
        description: 'Comprehensive evaluation of your entire production line to identify optimization opportunities, improve efficiency, and ensure peak performance across all systems.',
        image: '/images/technical-services/line-assessment.jpg',
        imageAlt: 'Overall Line Assessment'
      },
      {
        id: '5',
        title: 'Spare Parts Supply',
        description: 'Reliable access to genuine spare parts and components to maintain equipment performance, reduce downtime, and ensure long-term operational reliability.',
        image: '/images/technical-services/spare-parts.jpg',
        imageAlt: 'Spare Parts Supply'
      },
      {
        id: '6',
        title: 'Training & Capability Building',
        description: 'Comprehensive training programs to build your team\'s technical capabilities, enhance operational knowledge, and ensure optimal use of aseptic packaging systems.',
        image: '/images/technical-services/training.jpg',
        imageAlt: 'Training & Capability Building'
      }
    ],
    connectSection: {
      heading: 'Connect with Our Technical Experts',
      headingHighlight: 'Technical Experts',
      formTitle: 'Send Us A Message',
      illustrationImage: '/images/technical-services/connect-experts-illustration.jpg',
      illustrationAlt: 'Connect with Technical Experts'
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Ready to Get Started with Lami Care?',
      description: 'Contact our team to learn more about our foundational operational support services.',
      ctaText: 'Contact Us',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'Lami Care - Foundational Operational Support | Lamipak',
      meta_description: 'Focused on foundational operational support, Lami Care includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
      canonical_url: '/technical-services/lami-care',
      og_title: 'Lami Care - Foundational Operational Support | Lamipak',
      og_description: 'Focused on foundational operational support, Lami Care includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
      og_image: '/images/technical-services/lami-care-thumbnail.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Lami Care - Foundational Operational Support | Lamipak',
      twitter_description: 'Focused on foundational operational support, Lami Care includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
      twitter_image: '/images/technical-services/lami-care-thumbnail.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Lami Care',
        description: 'Focused on foundational operational support, this tier includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
        image: '/images/technical-services/lami-care-thumbnail.jpg'
      }
    }
  },
  {
    id: '2',
    slug: 'lami-premium',
    title: 'LamiPremium',
    description: 'This tier include Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
    shortDescription: 'This tier include Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
    image: '/images/technical-services/lami-premium-thumbnail.jpg',
    imageAlt: 'LamiPremium Service',
    heroBackgroundImage: '/banner-slider1.jpg',
    category: 'Service Tier',
    introSection: {
      tagline: 'Enhanced Performance & Efficiency',
      icon: '/images/icons/star.svg',
      detailedDescription: 'LamiPremium is Lamipak\'s advanced technical service program designed to deliver enhanced performance commitments and operational excellence. This tier provides comprehensive maintenance management, machine optimization, and customized solutions to maximize your production efficiency and equipment value.'
    },
    connectSection: {
      heading: 'Connect with Our Technical Experts',
      headingHighlight: 'Technical Experts',
      formTitle: 'Send Us A Message',
      illustrationImage: '/images/technical-services/connect-experts-illustration.jpg',
      illustrationAlt: 'Connect with Technical Experts'
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Upgrade to LamiPremium?',
      description: 'Contact our team to learn more about our premium service tier.',
      ctaText: 'Contact Us',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'LamiPremium - Premium Service Tier | Lamipak',
      meta_description: 'LamiPremium includes Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
      canonical_url: '/technical-services/lami-premium',
      og_title: 'LamiPremium - Premium Service Tier | Lamipak',
      og_description: 'LamiPremium includes Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
      og_image: '/images/technical-services/lami-premium-thumbnail.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'LamiPremium - Premium Service Tier | Lamipak',
      twitter_description: 'LamiPremium includes Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
      twitter_image: '/images/technical-services/lami-premium-thumbnail.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'LamiPremium',
        description: 'This tier include Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
        image: '/images/technical-services/lami-premium-thumbnail.jpg'
      }
    }
  },
  {
    id: '3',
    slug: 'lami-partner',
    title: 'LamiPartner',
    description: 'It includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
    shortDescription: 'It includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
    image: '/images/technical-services/lami-partner-thumbnail.jpg',
    imageAlt: 'LamiPartner Service',
    heroBackgroundImage: '/banner-slider1.jpg',
    category: 'Service Tier',
    introSection: {
      tagline: 'Strategic Partnership & Transformation',
      icon: '/images/icons/star.svg',
      detailedDescription: 'LamiPartner is Lamipak\'s premier technical service program offering strategic partnership and complete operational transformation. This tier includes operational cost commitment, advanced digital solutions, automation services, and comprehensive support to drive your business growth and innovation.'
    },
    connectSection: {
      heading: 'Connect with Our Technical Experts',
      headingHighlight: 'Technical Experts',
      formTitle: 'Send Us A Message',
      illustrationImage: '/images/technical-services/connect-experts-illustration.jpg',
      illustrationAlt: 'Connect with Technical Experts'
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Become a LamiPartner?',
      description: 'Contact our team to learn more about our partner service tier.',
      ctaText: 'Contact Us',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'LamiPartner - Partner Service Tier | Lamipak',
      meta_description: 'LamiPartner includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
      canonical_url: '/technical-services/lami-partner',
      og_title: 'LamiPartner - Partner Service Tier | Lamipak',
      og_description: 'LamiPartner includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
      og_image: '/images/technical-services/lami-partner-thumbnail.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'LamiPartner - Partner Service Tier | Lamipak',
      twitter_description: 'LamiPartner includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
      twitter_image: '/images/technical-services/lami-partner-thumbnail.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'LamiPartner',
        description: 'It includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
        image: '/images/technical-services/lami-partner-thumbnail.jpg'
      }
    }
  }
];

/**
 * Gets technical service data by slug
 * 
 * @param slug - The technical service slug
 * @returns TechnicalServiceData | null
 */
export function getTechnicalServiceData(slug: string): TechnicalServiceData | null {
  return technicalServices.find(service => service.slug === slug) || null;
}

/**
 * Gets all technical services
 * 
 * @returns TechnicalServiceData[]
 */
export function getAllTechnicalServices(): TechnicalServiceData[] {
  return technicalServices;
}

/**
 * Gets all technical service slugs (for static generation)
 * 
 * @returns string[]
 */
export function getAllTechnicalServiceSlugs(): string[] {
  return technicalServices.map(service => service.slug);
}
