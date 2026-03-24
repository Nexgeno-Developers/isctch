/**
 * Company/About Us Page API Data
 * 
 * Mock data for the company/about us page.
 * This will be replaced with real API calls when the backend is ready.
 */

export interface CompanySEO {
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: 'summary_large_image' | 'summary' | 'player' | 'app';
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema?: Record<string, unknown>;
}

export interface CompanyHero {
  title: string;
  backgroundImage: string;
}

export interface CompanyStatistic {
  id: string;
  icon: string; // Icon path or SVG
  value: string; // e.g., "1900+", "80+", "8%"
  label: string; // e.g., "Employees", "Coverage By Country"
}

export interface JourneyMilestone {
  year: string; // e.g., "2007", "2015"
  image: string; // Image path
  imageAlt: string; // Alt text for image
  caption: string; // Caption text displayed on image overlay
}

export interface JourneyData {
  title: string;
  titleHighlight: string; // Part of title to highlight (e.g., "LamiPak")
  milestones: JourneyMilestone[];
}

export interface CompanyNavigationItem {
  id: string;
  icon: string; // Icon type: 'info' | 'globe' | 'building' | 'document' | 'heart'
  label: string;
  href: string;
}

export interface CompanyNavigation {
  items: CompanyNavigationItem[];
}

/** Shared horizontal sub-nav (About us, Vision & Mission, Government, …) */
export const COMPANY_SUB_NAVIGATION: CompanyNavigation = {
  items: [
    {
      id: '1',
      icon: 'info',
      label: 'About us',
      href: '/our-company',
    },
    {
      id: '2',
      icon: 'globe',
      label: 'Introduction',
      href: '/introduction',
    },
    
    {
      id: '3',
      icon: 'globe',
      label: 'Vision & Mission',
      href: '/vision-mission',
    },
    {
      id: '4',
      icon: 'building',
      label: 'Governance',
      href: '/governance-management',
    },
    // {
    //   id: '4',
    //   icon: 'document',
    //   label: 'Media Kit',
    //   href: '/media-kit',
    // },
    // {
    //   id: '5',
    //   icon: 'heart',
    //   label: 'Responsibility',
    //   href: '/responsibility',
    // },
  ],
};

export interface AboutUsQuadrantSection {
  topLeft: {
    title: string;
    titleHighlight: string;
    paragraphs: string[];
  };
  topRight: {
    image: string;
    imageAlt: string;
  };
  bottomLeft: {
    image: string;
    imageAlt: string;
  };
  bottomRight: {
    title: string;
    titleHighlight: string;
    paragraphs: string[];
  };
}

export interface VisionMissionSection {
  backgroundImage: string;
  backgroundImageAlt: string;
  tagline: string;
  description: string;
  vision: {
    icon: string; // 'eye' or 'vision'
    heading: string;
    text: string;
  };
  mission: {
    icon: string; // 'target' or 'mission'
    heading: string;
    text: string;
  };
}

export interface CompanyValue {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export interface OurValuesSection {
  heading: string;
  description: string;
  values: CompanyValue[];
}

export interface CompanyData {
  hero: CompanyHero;
  statistics: CompanyStatistic[];
  journey: JourneyData;
  navigation: CompanyNavigation;
  aboutUsQuadrant?: AboutUsQuadrantSection;
  visionMission?: VisionMissionSection;
  ourValues?: OurValuesSection;
  seo: CompanySEO;
}

/**
 * Get company/about us page data
 * 
 * @returns Promise<CompanyData>
 */
export async function getCompanyData(): Promise<CompanyData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    hero: {
      title: 'Our Company',
      backgroundImage: '/about_banner.jpg', // You'll need to add this image
    },
    statistics: [
      {
        id: '1',
        icon: '/employee.svg', // Two people icon
        value: '1900+',
        label: 'Employees',
      },
      {
        id: '2',
        icon: '/globe_icon.svg', // Globe icon
        value: '80+',
        label: 'Coverage By Country',
      },
      {
        id: '3',
        icon: '/customer.svg', // Customers icon
        value: '340+',
        label: 'Customers',
      },
      {
        id: '4',
        icon: '/growth_icon.svg', // Growth arrow icon
        value: '8%',
        label: 'Annual Growth Rate',
      },
      {
        id: '5',
        icon: '/sku_icon.svg', // Document/paper icon
        value: '60+',
        label: 'Total SKU',
      },
      {
        id: '6',
        icon: '/factory_icon.svg', // Factory icon
        value: '2',
        label: 'Dual Factory Strength China + India',
      },
    ],
    journey: {
      title: 'LamiPak Journey',
      titleHighlight: 'LamiPak',
      milestones: [
        {
          year: '2007',
          image: '/journey_images.jpg',
          imageAlt: 'LamiPak was established',
          caption: 'LamiPak was established',
        },
        {
          year: '2015',
          image: '/journey_images.jpg',
          imageAlt: 'Major expansion milestone',
          caption: 'Major expansion milestone',
        },
        {
          year: '2018',
          image: '/journey_images.jpg',
          imageAlt: 'International market entry',
          caption: 'International market entry',
        },
        {
          year: '2019',
          image: '/journey_images.jpg',
          imageAlt: 'New product line launch',
          caption: 'New product line launch',
        },
        {
          year: '2020',
          image: '/journey_images.jpg',
          imageAlt: 'Digital transformation initiative',
          caption: 'Digital transformation initiative',
        },
        {
          year: '2021',
          image: '/journey_images.jpg',
          imageAlt: 'Sustainability commitment',
          caption: 'Sustainability commitment',
        },
        {
          year: '2022',
          image: '/journey_images.jpg',
          imageAlt: 'Global expansion',
          caption: 'Global expansion',
        },
        {
          year: '2023',
          image: '/journey_images.jpg',
          imageAlt: 'Innovation center opening',
          caption: 'Innovation center opening',
        },
        {
          year: '2024',
          image: '/journey_images.jpg',
          imageAlt: 'Future vision',
          caption: 'Future vision',
        },
      ],
    },
    navigation: COMPANY_SUB_NAVIGATION,
    aboutUsQuadrant: {
      topLeft: {
        title: 'Lamipak: A Global Leader in Aseptic Carton Packaging',
        titleHighlight: 'Lamipak',
        paragraphs: [
          'Lamipak is a leading aseptic carton packaging manufacturer, providing high-performance solutions for the global food and beverage industry. We specialize in advanced aseptic processing and packaging systems that ensure product safety, extended shelf life, and operational efficiency.',
          'Before 2007, Lamipak focused on mass production of paper-based packaging materials. In 2007, we established a dedicated aseptic packaging brand and manufacturing facility for aseptic liquid packaging, marking a significant milestone in our journey toward innovation and excellence.',
        ],
      },
      topRight: {
        image: '/about_us_image_2.jpg',
        imageAlt: 'Lamipak industrial facility with solar panels',
      },
      bottomLeft: {
        image: '/about_us_image_1.jpg',
        imageAlt: 'Lamipak manufacturing facility aerial view',
      },
      bottomRight: {
        title: 'Leading the Future of Eco-Friendly Aseptic Packaging',
        titleHighlight: 'Eco-Friendly Aseptic Packaging',
        paragraphs: [
          'Over the past decade, Lamipak has evolved into a globally recognized provider of sustainable packaging solutions, serving customers in over 87 countries. Our environmentally friendly packaging solutions offer superior barrier performance and compatibility with modern filling systems, with production increasing fourfold within five years.',
          'Lamipak continuously innovates in aseptic packaging materials and systems, supporting various brands in dairy, juice, plant-based, and functional beverages with reliable, scalable, and sustainable solutions. We are committed to delivering packaging solutions that combine quality, efficiency, and environmental responsibility.',
        ],
      },
    },
    visionMission: {
      backgroundImage: '/vission_mission_bg.jpg',
      backgroundImageAlt: 'Lamipak team meeting',
      tagline: 'Protecting Freshness in Every Pack',
      description: 'Our milk packaging ensures hygiene, freshness and quality, using advanced systems to deliver safe and pure milk to customers.',
      vision: {
        icon: 'eye',
        heading: 'Our Vision',
        text: 'To lead the advancement of sustainable aseptic carton packaging by combining innovative manufacturing excellence, and environmental responsibility.',
      },
      mission: {
        icon: 'target',
        heading: 'Our Mission',
        text: 'To Develop And Deliver High-Quality Aseptic Packaging Materials And Aseptic Liquid Packaging System That Protect Product Integrity, Safeguard Consumer Health, And Support A More Sustainable Global Food Supply Chain. As Strategic Partners, We Work Closely With Customers To Create Practical Customised Packaging Solutions That Address Real Industry Challenges And Enable Sustainable Growth.',
      },
    },
    ourValues: {
      heading: 'OUR VALUES',
      description: 'We Are Committed To Quality, Innovation, Collaboration, And Sustainable Growth In Everything We Do.',
      values: [
        {
          id: '1',
          title: 'Enriching Customers',
          image: '/our_values_images.jpg',
          imageAlt: 'Business meeting handshake',
          caption: 'We Focus On Delivering Dependable Aseptic Packaging Solutions That Create Measurable Value For Food And Beverage Packaging Companies.',
        },
        {
          id: '2',
          title: 'Taking Ownership',
          image: '/our_values_images.jpg',
          imageAlt: 'Team collaboration',
          caption: 'We take full responsibility for our actions and decisions, ensuring accountability and excellence in everything we do.',
        },
        {
          id: '3',
          title: 'Embracing Diversity',
          image: '/our_values_images.jpg',
          imageAlt: 'Diverse team',
          caption: 'We celebrate and leverage the unique perspectives and talents of our diverse workforce to drive innovation.',
        },
        {
          id: '4',
          title: 'Collaborating Together',
          image: '/our_values_images.jpg',
          imageAlt: 'Team collaboration',
          caption: 'We believe in the power of teamwork and collaboration to achieve greater results than any individual could alone.',
        },
        {
          id: '5',
          title: 'Striving For Knowledge',
          image: '/our_values_images.jpg',
          imageAlt: 'Learning and development',
          caption: 'We continuously seek to learn, grow, and improve, staying at the forefront of industry knowledge and innovation.',
        },
        {
          id: '6',
          title: 'Daring To Explore',
          image: '/our_values_images.jpg',
          imageAlt: 'Innovation and exploration',
          caption: 'We embrace challenges and explore new possibilities, pushing boundaries to create breakthrough solutions.',
        },
      ],
    },
    seo: {
      meta_title: 'About Us - Lamipak',
      meta_description: 'Learn about Lamipak, a leading company with 1900+ employees, serving 340+ customers across 80+ countries with innovative solutions.',
      canonical_url: '/our-company',
      og_title: 'About Us - Lamipak',
      og_description: 'Learn about Lamipak, a leading company with 1900+ employees, serving 340+ customers across 80+ countries with innovative solutions.',
      og_image: '/images/company/about-og.jpg',
      twitter_card: 'summary_large_image',
      twitter_title: 'About Us - Lamipak',
      twitter_description: 'Learn about Lamipak, a leading company with 1900+ employees, serving 340+ customers across 80+ countries with innovative solutions.',
      twitter_image: '/images/company/about-og.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Lamipak',
        description: 'A leading company with innovative solutions',
        url: 'https://lamipak.com',
      },
    },
  };
}
