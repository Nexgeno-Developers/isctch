/**
 * Fake API for Technical Services Listing Page Data
 * 
 * This file contains mock data for the technical services listing page.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

/**
 * Service Tier Card Data
 */
export interface ServiceTierCard {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  /** YouTube/watch/shorts URL (will be converted to an embed URL for modal playback) */
  videoUrl: string;
  ctaText: string;
  ctaLink: string;
}

/**
 * Service Differentiation Row Data
 */
export interface ServiceDifferentiationRow {
  category: string;
  lamiCare: string;
  lamiPremium: string;
  lamiPartner: string;
}

/**
 * Operational Success Card Data
 */
export interface OperationalSuccessCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
}

/**
 * Technical Services Listing Page Data
 */
export interface TechnicalServicesListingData {
  heroTitle: string;
  heroBackgroundImage?: string;
  introSection: {
    heading: string;
    paragraphs: string[];
    image: string;
    imageAlt: string;
  };
  upgradeSection: {
    heading: string;
    headingHighlight: string; // Part of heading to highlight (e.g., "Upgrade & Expand")
    cards: ServiceTierCard[];
  };
  serviceDifferentiation: {
    heading: string;
    headerRow1: {
      empty: string;
      lamiCare: string;
      lamiPremium: string;
      lamiPartner: string;
    };
    headerRow2: {
      focus: string;
      stability: string;
      performance: string;
      transformation: string;
    };
    rows: ServiceDifferentiationRow[];
  };
  operationalSuccess: {
    heading: string;
    headingHighlight: string; // Part of heading to highlight (e.g., "Driving Operational")
    cards: OperationalSuccessCard[];
  };
  connectSection: {
    heading: string;
    headingHighlight: string; // Part of heading to highlight (e.g., "Technical Experts")
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
}

/**
 * Gets technical services listing page data
 * 
 * @returns TechnicalServicesListingData
 */
export function getTechnicalServicesListingData(): TechnicalServicesListingData {
  return {
    heroTitle: 'Technical Service',
    heroBackgroundImage: '/technical_banner.webp',
    introSection: {
      heading: 'Technical Support Service',
      paragraphs: [
        'As one of the leading aseptic packaging manufacturers, Lamipak delivers comprehensive Technical Support Services designed to maximize efficiency across the entire aseptic carton packaging and aseptic liquid packaging value chain.',
        'Beyond supplying aseptic packaging materials, Lamipak provides integrated technical expertise covering aseptic processing and packaging, production optimization, equipment performance, and operational reliability for modern food and beverages packaging industries. ',
        'Our technical service ecosystem supports customers throughout every stage from machine installation and start-up to long-term operational excellence ensuring stable production, improved line efficiency, and sustainable business growth.'
      ],
      image: '/technical_support_image.jpg',
      imageAlt: 'Technical Support Team'
    },
    upgradeSection: {
      heading: 'Upgrade & Expand Technical Service Solutions to a Knowledge Platform',
      headingHighlight: 'Upgrade & Expand',
      cards: [
        {
          id: '1',
          title: 'Lami Care',
          description: 'Focused on foundational operational support, this tier includes Preventative Maintenance, Corrective Maintenance, Remote Support, Overall Assessment, Spare Parts, Training.',
          thumbnail: '/technical_video.jpg',
          thumbnailAlt: 'Lami Care Service',
          videoUrl: 'https://youtube.com/shorts/m6jnXa3kRw4?feature=share',
          ctaText: 'Discover More',
          ctaLink: '/technical-services/lami-care'
        },
        {
          id: '2',
          title: 'LamiPremium',
          description: 'This tier include Performance Commitment, Maintenance Management, Machine Volume Conversion, Machine Refurbish & Reconditioning, Machine Installation & Commissioning, Package Volume Customization.',
          thumbnail: '/technical_video.jpg',
          thumbnailAlt: 'LamiPremium Service',
          videoUrl: 'https://www.youtube.com/watch?v=zB6zq2zb7Oc',
          ctaText: 'Discover More',
          ctaLink: '/'
        },
        {
          id: '3',
          title: 'LamiPartner',
          description: 'It includes Operational cost commitment, Digital Solution (31 Smart Version), Automation Service, New Format Customization, Machine Start-up, Plant Components.',
          thumbnail: '/technical_video.jpg',
          thumbnailAlt: 'LamiPartner Service',
          videoUrl: 'https://www.youtube.com/watch?v=owZIf_Opcyw',
          ctaText: 'Discover More',
          ctaLink: '/'
        }
      ]
    },
    serviceDifferentiation: {
      heading: 'Service Differentiation',
      headerRow1: {
        empty: '',
        lamiCare: 'LAMICARE',
        lamiPremium: 'LAMIPREMIUM',
        lamiPartner: 'LAMIPARTNER'
      },
      headerRow2: {
        focus: 'Focus',
        stability: 'Stability',
        performance: 'Performance',
        transformation: 'Transformation'
      },
      rows: [
        {
          category: 'ENGAGEMENT',
          lamiCare: 'On-Demand',
          lamiPremium: 'Managed',
          lamiPartner: 'Strategic'
        },
        {
          category: 'ACCOUNTABILITY',
          lamiCare: 'Service Response',
          lamiPremium: 'Efficiency Targets',
          lamiPartner: 'Operational Commitment'
        },
        {
          category: 'DIGITAL',
          lamiCare: 'Basic Reporting',
          lamiPremium: 'Structured Analytics',
          lamiPartner: 'Real-Time Intelligence'
        }
      ]
    },
    operationalSuccess: {
      heading: 'Driving Operational Success',
      headingHighlight: 'Driving Operational',
      cards: [
        {
          id: '1',
          title: 'Spare Parts',
          description: 'Elevate reliability and minimize downtime where our spare parts services can ensure seamless access to critical components for sustained operational excellence.',
          image: '/driving_image_1.jpg',
          imageAlt: 'Spare Parts Service',
          ctaText: 'Discover More',
          ctaLink: '/technical-services/spare-parts'
        },
        {
          id: '2',
          title: 'Lamipak Value Added Engineering',
          description: 'We stand as a strategic partner that goes beyond being a mere packaging provider, offering expert technical support to optimize your operations and drive innovation.',
          image: '/driving_image_2.jpg',
          imageAlt: 'Lamipak Value Added Engineering',
          ctaText: 'Discover More',
          ctaLink: '/technical-services/value-added-engineering'
        },
        {
          id: '3',
          title: 'R&D Center',
          description: 'Our R&D Center is an innovation hub merging cutting-edge technology with continuous research to create smarter, stronger, and more sustainable packaging solutions.',
          image: '/driving_image_3.jpg',
          imageAlt: 'R&D Center',
          ctaText: 'Discover More',
          ctaLink: '/technical-services/rd-center'
        },
        {
          id: '4',
          title: 'Pilot Plan',
          description: 'Our Pilot Plant serves as a small-scale manufacturing facility that enables precise sample production before moving to mass production. This facility provides the perfect testing ground for new products and processes.',
          image: '/driving_image_4.jpg',
          imageAlt: 'Pilot Plan',
          ctaText: 'Discover More',
          ctaLink: '/technical-services/pilot-plan'
        }
      ]
    },
    connectSection: {
      heading: 'Connect with Our Technical Experts',
      headingHighlight: 'Technical Experts',
      formTitle: 'Send Us A Message',
      illustrationImage: '/connected_image.jpg',
      illustrationAlt: 'Connect with Technical Experts'
    }
  };
}
