/**
 * Local fallbacks for homepage sections not yet driven by CMS, and minimal stubs for
 * sections that are merged from the real API in `src/lib/api/home/index.ts` (`/v1/page/home`).
 */

export interface HeroSlide {
  id: string;
  category: string;
  title: string;
  description: string;
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
  videoUrl?: string; // Optional video URL for hero section
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
  subtitle: string;
  image: string;
  imageAlt: string;
  questions: Question[];
  ctaText: string;
  ctaLink: string;
}

export interface VideoBannerData {
  title: string;
  preTitle: string;
  preDescription?: string;
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
  /** CMS icon (e.g. SVG URL); when set, used instead of `icon` glyphs */
  iconUrl?: string;
  /** Fallback inline icon when `iconUrl` is absent */
  icon: 'gear' | 'megaphone';
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
  image: string;
  imageAlt: string;
  link: string;
  ctaText: string;
}

export interface WorkInSustainabilityData {
  cards: SustainabilityWorkCard[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQData {
  items: FAQItem[];
}

export interface InnovationCard {
  id: string;
  title: string;
  time: string;
  date: string;
  image: string;
  imageAlt: string;
  imagePosition: 'top' | 'bottom';
  isHighlighted?: boolean;
  link: string;
  ctaText: string;
}

export interface InnovationInPackagingData {
  cards: InnovationCard[];
  exploreMoreLink: string;
}

export interface PressReleaseCard {
  id: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  link: string;
}

export interface LatestPressReleaseData {
  cards: PressReleaseCard[];
}

export interface CallToActionData {
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface NewsletterSubscriptionData {
  headline: string;
  subtitle: string;
  placeholder: string;
  buttonText: string;
  backgroundImage: string;
}

export interface HomepageData {
  hero: Hero;
  approach: ApproachData;
  videoBanner: VideoBannerData;
  commercialServices: CommercialServicesData;
  latestInsights: LatestInsightsData;
  productSustainability: ProductSustainabilityData;
  workInSustainability: WorkInSustainabilityData;
  innovationInPackaging: InnovationInPackagingData;
  latestPressRelease: LatestPressReleaseData;
  callToAction: CallToActionData;
  newsletterSubscription: NewsletterSubscriptionData;
  faq: FAQData;
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

  return {
    /** Stubs only; CMS replaces via `mergeHomepageFromApi` when `/v1/page/home` succeeds */
    hero: {
      slides: [
        {
          id: 'fallback-1',
          category: 'LAMIPAK',
          title: 'Welcome',
          description: '',
          ctaText: 'EXPLORE',
          ctaLink: '/',
          backgroundImage: '/banner-slide-1.webp',
        },
      ],
      categories: [{ id: '1', label: 'Welcome', href: '/', slideIndex: 0 }],
      videoUrl: '/video2.mp4',
    },
    approach: {
      title: 'We engineer the future of <span class="text-[#009FE8]">aseptic packaging.</span>',
      subtitle: 'Answer three questions and discover your optimal packaging system.',
      image: '/approcah_image.jpg',
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
      title: '',
      preTitle: '',
      preDescription: '',
      videoUrl: 'https://www.youtube.com/watch?v=2Tpppx-X0z0',
      ctaText: 'View how we help global brands',
      ctaLink: '/about-us',
    },
    commercialServices: { cards: [] },
    latestInsights: {
      cards: [
        {
          id: '1',
          title: 'Global Dairy Market Outlook',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/latest_insite_image_1.jpg', // Replace with actual insight image
          imageAlt: 'Global Dairy Market Outlook - White carton packages with green leaf design',
          link: '/',
        },
        {
          id: '2',
          title: 'Smart Packaging & Traceability',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/latest_insite_image_2.jpg', // Replace with actual insight image
          imageAlt: 'Smart Packaging & Traceability - Laboratory with blue liquid containers',
          link: '/',
        },
        {
          id: '3',
          title: 'Circular Economy in Packaging',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/latest_insite_image_3.jpg', // Replace with actual insight image
          imageAlt: 'Circular Economy in Packaging - Person examining plastic pouch in laboratory',
          link: '/',
        },
         {
          id: '4',
          title: 'Smart Packaging & Traceability',
          category: 'INDUSTRY',
          date: 'NOV 2025',
          image: '/latest_insite_image_2.jpg', // Replace with actual insight image
          imageAlt: 'Smart Packaging & Traceability - Laboratory with blue liquid containers',
          link: '/',
        },
       
      ],
    },
    productSustainability: { products: [] },
    workInSustainability: {
      cards: [
        {
          id: 'fallback-w1',
          title: 'Sustainability',
          description: '',
          image: '/pick_cartoon.webp',
          imageAlt: 'Sustainability',
          link: '/sustainability',
          ctaText: 'Learn More',
        },
      ],
    },
    faq: { items: [] },
    innovationInPackaging: {
      exploreMoreLink: '/innovation',
      cards: [
        {
          id: '1',
          title: 'Del envase al mundo digital: transformando la conexión con el consumidor a través de One Pack One Code',
          time: '10:00 AM',
          date: 'January 21, 2026',
          image: '/banner-slider1.jpg', // Replace with actual innovation image
          imageAlt: 'Industrial facility with recycling machinery',
          imagePosition: 'top',
          isHighlighted: false,
          link: '/',
          ctaText: 'Learn More',
        },
        {
          id: '2',
          title: 'Del envase al mundo digital: transformando la conexión con el consumidor a través de One Pack One Code',
          time: '10:00 AM',
          date: 'January 21, 2026',
          image: '/banner-slider2.webp', // Replace with actual innovation image
          imageAlt: 'Milk cartons with blue patterns',
          imagePosition: 'bottom',
          isHighlighted: true,
          link: '/',
          ctaText: 'Learn More',
        },
        {
          id: '3',
          title: 'Del envase al mundo digital: transformando la conexión con el consumidor a través de One Pack One Code',
          time: '10:00 AM',
          date: 'January 21, 2026',
          image: '/banner-slider3.webp', // Replace with actual innovation image
          imageAlt: 'Bottling line in factory',
          imagePosition: 'top',
          isHighlighted: false,
          link: '/',
          ctaText: 'Learn More',
        },
        {
          id: '4',
          title: 'Sustainable Packaging Solutions for the Future',
          time: '2:00 PM',
          date: 'February 15, 2026',
          image: '/banner-slider4.webp',
          imageAlt: 'Sustainable packaging solutions',
          imagePosition: 'top',
          isHighlighted: false,
          link: '/',
          ctaText: 'Learn More',
        },
        {
          id: '5',
          title: 'Smart Packaging Technology Revolution',
          time: '11:30 AM',
          date: 'March 10, 2026',
          image: '/banner-slider5.webp',
          imageAlt: 'Smart packaging technology',
          imagePosition: 'bottom',
          isHighlighted: true,
          link: '/',
          ctaText: 'Learn More',
        },
      ],
    },
    latestPressRelease: {
      cards: [
        {
          id: '1',
          category: 'Dairy Systems',
          title: 'Lamipak Showcases Expanded End-to-End Packaging Solutions at Gulfood Manufacturing 2025',
          image: '/latest_press_1.jpg',
          imageAlt: 'Lamipak exhibition booth at Gulfood Manufacturing 2025',
          link: '/',
        },
        {
          id: '2',
          category: 'Dairy Systems',
          title: 'Lamipak Introduces New Fresh Milk Packaging Solutions',
          image: '/latest_press_2.jpg',
          imageAlt: 'Fresh milk packaging solutions',
          link: '/',
        },
        {
          id: '3',
          category: 'Dairy Systems',
          title: 'Lamipak Receives Certificate of Appreciation from PT. Lami Packaging Indonesia',
          image: '/latest_press_3.jpg',
          imageAlt: 'Certificate of appreciation',
          link: '/',
        },
        
      ],
    },
    callToAction: {
      heading: 'Still Have <span class="text-[#009FE8]">Questions?</span>',
      description: 'Our Lamipak team is ready to walk you through any technical details.',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
    },
    newsletterSubscription: {
      headline: 'Stay Ahead in Aseptic Packaging.',
      subtitle: 'Get the Latest Insights Delivered to Your Inbox.',
      placeholder: 'Enter your email',
      buttonText: 'SUBSCRIBE',
      backgroundImage: '/newsletter-bg.jpg',
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
