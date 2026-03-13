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
  features?: string[];
  benefits?: string[];
  process?: {
    title: string;
    description: string;
    steps?: {
      title: string;
      description: string;
      icon?: string;
    }[];
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

// Mock Technical Services Data
const technicalServices: TechnicalServiceData[] = [
  {
    id: '1',
    slug: 'product-development',
    title: 'Product Development',
    description: 'Our comprehensive product development services help you bring innovative packaging solutions to market. We work closely with your team to design, develop, and optimize products that meet your specific requirements.',
    shortDescription: 'Comprehensive product development services for innovative packaging solutions.',
    image: '/images/technical-services/product-development.jpg',
    imageAlt: 'Product Development Services',
    heroBackgroundImage: '/images/technical-services/product-development-hero.jpg',
    icon: '/images/icons/product-development.svg',
    category: 'Development',
    features: [
      'Custom product design and engineering',
      'Rapid prototyping and testing',
      'Material selection and optimization',
      'Quality assurance and validation',
      'Regulatory compliance support',
      'Scale-up and manufacturing support'
    ],
    benefits: [
      'Faster time to market',
      'Reduced development costs',
      'Improved product quality',
      'Enhanced market competitiveness'
    ],
    process: {
      title: 'Our Development Process',
      description: 'We follow a structured approach to ensure successful product development.',
      steps: [
        {
          title: 'Discovery & Planning',
          description: 'Understanding your requirements and market needs',
          icon: '/images/icons/discovery.svg'
        },
        {
          title: 'Design & Prototyping',
          description: 'Creating initial designs and prototypes for testing',
          icon: '/images/icons/design.svg'
        },
        {
          title: 'Testing & Validation',
          description: 'Rigorous testing to ensure quality and performance',
          icon: '/images/icons/testing.svg'
        },
        {
          title: 'Production & Launch',
          description: 'Scaling up and launching your product to market',
          icon: '/images/icons/production.svg'
        }
      ]
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Ready to Develop Your Next Product?',
      description: 'Contact our team to discuss your product development needs.',
      ctaText: 'Contact Us',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'Product Development Services | Lamipak',
      meta_description: 'Comprehensive product development services for innovative packaging solutions. Custom design, rapid prototyping, and manufacturing support.',
      canonical_url: '/technical-services/product-development',
      og_title: 'Product Development Services | Lamipak',
      og_description: 'Comprehensive product development services for innovative packaging solutions.',
      og_image: '/images/technical-services/product-development.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Product Development Services | Lamipak',
      twitter_description: 'Comprehensive product development services for innovative packaging solutions.',
      twitter_image: '/images/technical-services/product-development.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Product Development Services',
        description: 'Comprehensive product development services for innovative packaging solutions.',
        image: '/images/technical-services/product-development.jpg'
      }
    }
  },
  {
    id: '2',
    slug: 'technical-consultation',
    title: 'Technical Consultation',
    description: 'Expert technical consultation services to help you solve complex packaging challenges. Our experienced team provides strategic guidance, technical expertise, and innovative solutions tailored to your business needs.',
    shortDescription: 'Expert technical consultation for complex packaging challenges.',
    image: '/images/technical-services/technical-consultation.jpg',
    imageAlt: 'Technical Consultation Services',
    heroBackgroundImage: '/images/technical-services/technical-consultation-hero.jpg',
    icon: '/images/icons/consultation.svg',
    category: 'Consultation',
    features: [
      'Expert technical guidance',
      'Problem-solving and troubleshooting',
      'Process optimization',
      'Material recommendations',
      'Quality improvement strategies',
      'Cost reduction solutions'
    ],
    benefits: [
      'Access to industry expertise',
      'Faster problem resolution',
      'Optimized processes',
      'Reduced operational costs'
    ],
    process: {
      title: 'Consultation Process',
      description: 'Our structured approach ensures effective consultation and solutions.',
      steps: [
        {
          title: 'Initial Assessment',
          description: 'Understanding your challenges and requirements',
          icon: '/images/icons/assessment.svg'
        },
        {
          title: 'Analysis & Planning',
          description: 'Analyzing issues and developing strategic solutions',
          icon: '/images/icons/analysis.svg'
        },
        {
          title: 'Implementation Support',
          description: 'Guiding you through solution implementation',
          icon: '/images/icons/implementation.svg'
        },
        {
          title: 'Ongoing Support',
          description: 'Continuous monitoring and optimization',
          icon: '/images/icons/support.svg'
        }
      ]
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Need Technical Consultation?',
      description: 'Schedule a consultation with our experts today.',
      ctaText: 'Schedule Consultation',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'Technical Consultation Services | Lamipak',
      meta_description: 'Expert technical consultation services for complex packaging challenges. Strategic guidance and innovative solutions.',
      canonical_url: '/technical-services/technical-consultation',
      og_title: 'Technical Consultation Services | Lamipak',
      og_description: 'Expert technical consultation services for complex packaging challenges.',
      og_image: '/images/technical-services/technical-consultation.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Technical Consultation Services | Lamipak',
      twitter_description: 'Expert technical consultation services for complex packaging challenges.',
      twitter_image: '/images/technical-services/technical-consultation.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Technical Consultation Services',
        description: 'Expert technical consultation services for complex packaging challenges.',
        image: '/images/technical-services/technical-consultation.jpg'
      }
    }
  },
  {
    id: '3',
    slug: 'quality-assurance',
    title: 'Quality Assurance & Testing',
    description: 'Comprehensive quality assurance and testing services to ensure your packaging meets the highest standards. We provide rigorous testing, validation, and certification services to guarantee product quality and compliance.',
    shortDescription: 'Comprehensive quality assurance and testing services for packaging.',
    image: '/images/technical-services/quality-assurance.jpg',
    imageAlt: 'Quality Assurance Services',
    heroBackgroundImage: '/images/technical-services/quality-assurance-hero.jpg',
    icon: '/images/icons/quality.svg',
    category: 'Quality',
    features: [
      'Comprehensive testing protocols',
      'Material quality validation',
      'Performance testing',
      'Regulatory compliance testing',
      'Certification support',
      'Quality management systems'
    ],
    benefits: [
      'Ensured product quality',
      'Regulatory compliance',
      'Reduced risk of defects',
      'Enhanced customer confidence'
    ],
    process: {
      title: 'Quality Assurance Process',
      description: 'Our systematic approach ensures consistent quality and compliance.',
      steps: [
        {
          title: 'Test Planning',
          description: 'Developing comprehensive test plans and protocols',
          icon: '/images/icons/planning.svg'
        },
        {
          title: 'Testing & Analysis',
          description: 'Conducting rigorous tests and analyzing results',
          icon: '/images/icons/testing.svg'
        },
        {
          title: 'Validation & Certification',
          description: 'Validating results and obtaining certifications',
          icon: '/images/icons/certification.svg'
        },
        {
          title: 'Continuous Monitoring',
          description: 'Ongoing quality monitoring and improvement',
          icon: '/images/icons/monitoring.svg'
        }
      ]
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Ensure Quality & Compliance',
      description: 'Partner with us for comprehensive quality assurance services.',
      ctaText: 'Request Testing',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'Quality Assurance & Testing Services | Lamipak',
      meta_description: 'Comprehensive quality assurance and testing services for packaging. Rigorous testing, validation, and certification.',
      canonical_url: '/technical-services/quality-assurance',
      og_title: 'Quality Assurance & Testing Services | Lamipak',
      og_description: 'Comprehensive quality assurance and testing services for packaging.',
      og_image: '/images/technical-services/quality-assurance.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Quality Assurance & Testing Services | Lamipak',
      twitter_description: 'Comprehensive quality assurance and testing services for packaging.',
      twitter_image: '/images/technical-services/quality-assurance.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Quality Assurance & Testing Services',
        description: 'Comprehensive quality assurance and testing services for packaging.',
        image: '/images/technical-services/quality-assurance.jpg'
      }
    }
  },
  {
    id: '4',
    slug: 'pilot-plant-services',
    title: 'Pilot Plant Services',
    description: 'State-of-the-art pilot plant services for testing and validating your packaging solutions at scale. Our pilot facilities allow you to test production processes, optimize parameters, and validate solutions before full-scale implementation.',
    shortDescription: 'Pilot plant services for testing and validating packaging solutions at scale.',
    image: '/images/technical-services/pilot-plant.jpg',
    imageAlt: 'Pilot Plant Services',
    heroBackgroundImage: '/images/technical-services/pilot-plant-hero.jpg',
    icon: '/images/icons/pilot-plant.svg',
    category: 'Testing',
    features: [
      'Scale-up testing',
      'Process optimization',
      'Production validation',
      'Parameter fine-tuning',
      'Performance evaluation',
      'Cost analysis'
    ],
    benefits: [
      'Reduced scale-up risk',
      'Optimized production parameters',
      'Validated solutions',
      'Cost-effective testing'
    ],
    process: {
      title: 'Pilot Plant Process',
      description: 'Our structured approach ensures successful pilot testing and validation.',
      steps: [
        {
          title: 'Planning & Setup',
          description: 'Planning test parameters and setting up pilot equipment',
          icon: '/images/icons/setup.svg'
        },
        {
          title: 'Testing & Monitoring',
          description: 'Conducting tests and monitoring performance metrics',
          icon: '/images/icons/monitoring.svg'
        },
        {
          title: 'Analysis & Optimization',
          description: 'Analyzing results and optimizing processes',
          icon: '/images/icons/optimization.svg'
        },
        {
          title: 'Scale-up Support',
          description: 'Supporting transition to full-scale production',
          icon: '/images/icons/scale-up.svg'
        }
      ]
    },
    cta: {
      label: 'GET STARTED',
      heading: 'Test Your Solutions at Scale',
      description: 'Book our pilot plant facilities for your testing needs.',
      ctaText: 'Book Pilot Plant',
      ctaLink: '/contact'
    },
    seo: {
      meta_title: 'Pilot Plant Services | Lamipak',
      meta_description: 'Pilot plant services for testing and validating packaging solutions at scale. Scale-up testing and process optimization.',
      canonical_url: '/technical-services/pilot-plant-services',
      og_title: 'Pilot Plant Services | Lamipak',
      og_description: 'Pilot plant services for testing and validating packaging solutions at scale.',
      og_image: '/images/technical-services/pilot-plant.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'Pilot Plant Services | Lamipak',
      twitter_description: 'Pilot plant services for testing and validating packaging solutions at scale.',
      twitter_image: '/images/technical-services/pilot-plant.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Pilot Plant Services',
        description: 'Pilot plant services for testing and validating packaging solutions at scale.',
        image: '/images/technical-services/pilot-plant.jpg'
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
