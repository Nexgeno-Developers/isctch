/**
 * Fake API for Homepage Data
 * 
 * This file contains mock data for the homepage.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

export interface HeroSlide {
  id: string;
  category: string;
  title: string;
  titleHighlight: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface Hero {
  slides: HeroSlide[];
  categories: Array<{
    id: string;
    label: string;
    href: string;
    slideIndex: number; // Index of the slide this category corresponds to
  }>;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface HomepageSEO {
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
  schema?: {
    '@context': string;
    '@type': string;
    headline?: string;
    description?: string;
    url?: string;
    [key: string]: unknown;
  };
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface ApproachData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  questions: Question[];
  ctaText: string;
  ctaLink: string;
}

export interface VideoBannerData {
  title: string;
  videoUrl?: string;
  ctaText: string;
  ctaLink: string;
}

export interface CommercialServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ctaText: string;
  ctaLink: string;
  icon: 'gear' | 'megaphone'; // Icon type
}

export interface CommercialServicesData {
  cards: CommercialServiceCard[];
}

export interface InsightCard {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  imageAlt: string;
  link: string;
}

export interface LatestInsightsData {
  cards: InsightCard[];
}

export interface SustainabilityProductCard {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  ctaText: string;
}

export interface ProductSustainabilityData {
  products: SustainabilityProductCard[];
}

export interface SustainabilityWorkCard {
  id: string;
  title: string;
  description: string;
  icon: 'A+' | 'star' | 'checkmark';
  iconShape: 'square' | 'circle' | 'shield';
  link: string;
  ctaText: string;
}

export interface WorkInSustainabilityData {
  cards: SustainabilityWorkCard[];
}

export interface HomepageData {
  hero: Hero;
  approach: ApproachData;
  videoBanner: VideoBannerData;
  commercialServices: CommercialServicesData;
  latestInsights: LatestInsightsData;
  productSustainability: ProductSustainabilityData;
  workInSustainability: WorkInSustainabilityData;
  services: Service[];
  products: Product[];
  testimonials: Testimonial[];
  seo?: HomepageSEO;
}

/**
 * Fetches all homepage data in a single request
 * 
 * @returns Promise<HomepageData> - All homepage sections
 */
export async function getHomepageData(): Promise<HomepageData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data
  return {
    hero: {
      slides: [
        {
          id: '1',
          category: 'ASEPTIC PACKAGING ENGINEERING',
          title: 'IN A STERILE WORLD,',
          titleHighlight: 'PRECISION STILL WINS.',
          ctaText: 'EXPLORE SOLUTIONS',
          ctaLink: '/solutions',
          backgroundImage: '/banner-slider1.jpg',
        },
        {
          id: '2',
          category: 'INNOVATION IN PACKAGING',
          title: 'ADVANCED TECHNOLOGY,',
          titleHighlight: 'SUSTAINABLE FUTURE.',
          ctaText: 'DISCOVER MORE',
          ctaLink: '/solutions',
          backgroundImage: '/banner-slider2.jpg',
        },
        {
          id: '3',
          category: 'INDUSTRIAL EXCELLENCE',
          title: 'WHERE QUALITY MEETS,',
          titleHighlight: 'PERFECTION.',
          ctaText: 'LEARN MORE',
          ctaLink: '/solutions',
          backgroundImage: '/banner-slider3.jpg',
        },
        {
          id: '4',
          category: 'GLOBAL LEADERSHIP',
          title: 'WORLDWIDE EXPERTISE,',
          titleHighlight: 'LOCAL SOLUTIONS.',
          ctaText: 'GET STARTED',
          ctaLink: '/contact',
          backgroundImage: '/banner-slider4.jpg',
        },
        {
          id: '5',
          category: 'CUTTING-EDGE SOLUTIONS',
          title: 'NEXT GENERATION,',
          titleHighlight: 'PACKAGING TECHNOLOGY.',
          ctaText: 'EXPLORE NOW',
          ctaLink: '/solutions',
          backgroundImage: '/banner-slider5.jpg',
        },
      ],
      categories: [
        {
          id: '1',
          label: 'DAIRY SYSTEMS',
          href: '/solutions/dairy',
          slideIndex: 0, // First slide
        },
        {
          id: '2',
          label: 'PLANT-BASED BEVERAGES',
          href: '/solutions/plant-based',
          slideIndex: 1, // Second slide
        },
        {
          id: '3',
          label: 'LIQUID FOODS',
          href: '/solutions/liquid-foods',
          slideIndex: 2, // Third slide
        },
        {
          id: '4',
          label: 'NUTRITIONAL',
          href: '/solutions/nutritional',
          slideIndex: 3, // Fourth slide
        },
        {
          id: '5',
          label: 'PHARMA LIQUIDS',
          href: '/solutions/pharma',
          slideIndex: 4, // Fifth slide
        },
      ],
    },
    approach: {
      title: 'We engineer the future of',
      titleHighlight: 'aseptic packaging.',
      subtitle: 'Answer three questions and discover your optimal packaging system.',
      image: '/our-approch-image.webp',
      imageAlt: 'Professional examining aseptic packaging in laboratory',
      questions: [
        {
          id: '1',
          question: 'What product are you packaging?',
          options: [
            { id: '1-1', label: 'Dairy', value: 'dairy' },
            { id: '1-2', label: 'Juice', value: 'juice' },
            { id: '1-3', label: 'Plant-Based', value: 'plant-based' },
            { id: '1-4', label: 'Liquid Food', value: 'liquid-food' },
            { id: '1-5', label: 'Nutritional', value: 'nutritional' },
            { id: '1-6', label: 'Pharma', value: 'pharma' },
          ],
        },
        {
          id: '2',
          question: 'What production scale?',
          options: [
            { id: '2-1', label: 'Startup', value: 'startup' },
            { id: '2-2', label: 'Regional', value: 'regional' },
            { id: '2-3', label: 'Global Scale', value: 'global-scale' },
            { id: '2-4', label: 'High-Speed Line', value: 'high-speed-line' },
          ],
        },
        {
          id: '3',
          question: 'What is your target market region?',
          options: [
            { id: '3-1', label: 'Asia Pacific', value: 'asia-pacific' },
            { id: '3-2', label: 'Europe', value: 'europe' },
            { id: '3-3', label: 'North America', value: 'north-america' },
            { id: '3-4', label: 'Middle East & Africa', value: 'middle-east-africa' },
            { id: '3-5', label: 'Latin America', value: 'latin-america' },
          ],
        },
      ],
      ctaText: 'DISCOVER YOUR SYSTEM',
      ctaLink: '/solutions',
    },
    videoBanner: {
      title: 'Innovation in Aseptic Packaging',
      videoUrl: '/video2.mp4', // or .gif for GIF files
      ctaText: 'WATCH OUR STORY',
      ctaLink: '/about',
    },
    commercialServices: {
      cards: [
        {
          id: '1',
          title: 'Technical Services',
          description: 'Dedicated to top-notch aseptic packaging, we launch our technical support services with customizable solutions to maximize your production line\'s efficiency.',
          image: '/banner-slider1.jpg', // Replace with actual technical services image
          imageAlt: 'Technical Services - Production line with aseptic packaging',
          ctaText: 'Read More',
          ctaLink: '/services/technical',
          icon: 'gear', // Gear icon
        },
        {
          id: '2',
          title: 'Marketing Service',
          description: 'Discover Lamipak Market Support Service, Your comprehensive marketing partner offering business intelligence, recipe support, and sales distribution.',
          image: '/banner-slider2.jpg', // Replace with actual marketing service image
          imageAlt: 'Marketing Service - Digital marketing and business intelligence',
          ctaText: 'Read More',
          ctaLink: '/services/marketing',
          icon: 'megaphone', // Megaphone icon
        },
      ],
    },
    latestInsights: {
      cards: [
        {
          id: '1',
          title: 'Global Dairy Market Outlook',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/banner-slider1.jpg', // Replace with actual insight image
          imageAlt: 'Global Dairy Market Outlook - White carton packages with green leaf design',
          link: '/insights/global-dairy-market-outlook',
        },
        {
          id: '2',
          title: 'Smart Packaging & Traceability',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/banner-slider2.jpg', // Replace with actual insight image
          imageAlt: 'Smart Packaging & Traceability - Laboratory with blue liquid containers',
          link: '/insights/smart-packaging-traceability',
        },
        {
          id: '3',
          title: 'Circular Economy in Packaging',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/banner-slider3.jpg', // Replace with actual insight image
          imageAlt: 'Circular Economy in Packaging - Person examining plastic pouch in laboratory',
          link: '/insights/circular-economy-packaging',
        },
        {
          id: '4',
          title: 'Sustainable Packaging Solutions',
          category: 'SUSTAINABILITY',
          date: 'OCT 2025',
          image: '/banner-slider4.jpg',
          imageAlt: 'Sustainable Packaging Solutions',
          link: '/insights/sustainable-packaging-solutions',
        },
        {
          id: '5',
          title: 'Future of Aseptic Technology',
          category: 'TECHNOLOGY',
          date: 'OCT 2025',
          image: '/banner-slider5.jpg',
          imageAlt: 'Future of Aseptic Technology',
          link: '/insights/future-aseptic-technology',
        },
      ],
    },
    productSustainability: {
      products: [
        {
          id: '1',
          title: 'LamiNatural',
          label: 'Bio-Based Materials',
          description: 'Plant-derived polymer packaging with full aseptic barrier performance and reduced carbon footprint.',
          image: '/banner-slider1.jpg', // Replace with actual LamiNatural product image
          imageAlt: 'LamiNatural - Green carton package with leaf design',
          link: '/products/laminatural',
          ctaText: 'Read More',
        },
        {
          id: '2',
          title: 'LamiPure',
          label: 'Bio-Based Materials',
          description: 'Plant-derived polymer packaging with full aseptic barrier performance and reduced carbon footprint.',
          image: '/banner-slider2.jpg', // Replace with actual LamiPure product image
          imageAlt: 'LamiPure - White carton package with blue water pattern',
          link: '/products/lamipure',
          ctaText: 'Read More',
        },
        {
          id: '3',
          title: 'Papers',
          label: 'Bio-Based Materials',
          description: 'Plant-derived polymer packaging with full aseptic barrier performance and reduced carbon footprint.',
          image: '/banner-slider3.jpg', // Replace with actual Papers product image
          imageAlt: 'Papers - Paper straws in blue liquid',
          link: '/products/papers',
          ctaText: 'Read More',
        },
        {
          id: '4',
          title: 'EcoFlex',
          label: 'Recyclable Materials',
          description: 'Fully recyclable packaging solution with enhanced barrier properties and sustainable sourcing.',
          image: '/banner-slider4.jpg',
          imageAlt: 'EcoFlex - Recyclable packaging solution',
          link: '/products/ecoflex',
          ctaText: 'Read More',
        },
        {
          id: '5',
          title: 'GreenWrap',
          label: 'Sustainable Materials',
          description: 'Biodegradable wrapping solution designed for optimal product protection and environmental impact.',
          image: '/banner-slider5.jpg',
          imageAlt: 'GreenWrap - Biodegradable wrapping solution',
          link: '/products/greenwrap',
          ctaText: 'Read More',
        },
      ],
    },
    workInSustainability: {
      cards: [
        {
          id: '1',
          title: 'CDP A Grade',
          description: 'Recognized by CDP for leadership in environmental transparency and climate action across our global operations.',
          icon: 'A+',
          iconShape: 'square',
          link: '/sustainability/cdp-a-grade',
          ctaText: 'Learn More',
        },
        {
          id: '2',
          title: 'LEED Platinum',
          description: 'Our manufacturing facilities achieve LEED Platinum certification — the highest standard in sustainable building design.',
          icon: 'star',
          iconShape: 'circle',
          link: '/sustainability/leed-platinum',
          ctaText: 'Learn More',
        },
        {
          id: '3',
          title: 'Our Commitment',
          description: 'Active partnerships with environmental NGOs to drive circular economy initiatives and reduce packaging waste globally.',
          icon: 'checkmark',
          iconShape: 'shield',
          link: '/sustainability/our-commitment',
          ctaText: 'Learn More',
        },
        {
          id: '4',
          title: 'Carbon Neutral',
          description: 'Achieving carbon neutrality across all operations through renewable energy and carbon offset programs.',
          icon: 'checkmark',
          iconShape: 'circle',
          link: '/sustainability/carbon-neutral',
          ctaText: 'Learn More',
        },
        {
          id: '5',
          title: 'Zero Waste',
          description: 'Implementing zero-waste initiatives at all facilities to minimize environmental impact and maximize resource efficiency.',
          icon: 'star',
          iconShape: 'square',
          link: '/sustainability/zero-waste',
          ctaText: 'Learn More',
        },
      ],
    },
    seo: {
      meta_title: 'Lamipak - Building the Future with Innovative Solutions1',
      meta_description: 'Welcome to our platform. Discover our services, products, and solutions for your business needs.',
      canonical_url: '/',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        headline: 'Welcome to Our Platform',
        description: 'Building the future with innovative solutions',
      },
    },
    services: [
      {
        id: '1',
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies',
      },
      {
        id: '2',
        title: 'Mobile Apps',
        description: 'Native and cross-platform mobile solutions',
      },
      {
        id: '3',
        title: 'Cloud Services',
        description: 'Scalable cloud infrastructure and deployment',
      },
      {
        id: '4',
        title: 'Consulting',
        description: 'Expert guidance for your digital transformation',
      },
    ],
    products: [
      {
        id: '1',
        name: 'Enterprise Suite',
        description: 'Complete solution for large organizations',
        price: 9999,
      },
      {
        id: '2',
        name: 'Business Package',
        description: 'Perfect for growing businesses',
        price: 4999,
      },
      {
        id: '3',
        name: 'Starter Plan',
        description: 'Essential features for small teams',
        price: 999,
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'John Doe',
        role: 'CEO',
        company: 'Tech Corp',
        content: 'Outstanding service and support. Highly recommended!',
      },
      {
        id: '2',
        name: 'Jane Smith',
        role: 'CTO',
        company: 'Innovate Inc',
        content: 'The best decision we made for our digital infrastructure.',
      },
      {
        id: '3',
        name: 'Mike Johnson',
        role: 'Founder',
        company: 'StartupXYZ',
        content: 'Exceeded our expectations in every way possible.',
      },
    ],
  };
}
