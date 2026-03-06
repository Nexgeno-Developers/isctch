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

export interface HomepageData {
  hero: Hero;
  approach: ApproachData;
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
