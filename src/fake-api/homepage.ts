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
  preTitleBlue?: string;
  preTitleBlack?: string;
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
  headingHighlight: string;
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

  // Mock data
  return {
    hero: {
      slides: [
        {
          id: '1',
          category: 'ASEPTIC PACKAGING ENGINEERING',
          title: 'Leading Aseptic,',
          titleHighlight: 'Packaging Company.',
          ctaText: 'EXPLORE SOLUTIONS',
          description:
            'Lamipak is a trusted aseptic packaging manufacturer delivering innovative and reliable aseptic packaging solutions for food and beverage brands worldwide.',
          ctaLink: '/',
          backgroundImage: '/banner-slide-1.webp',
        },
        {
          id: '2',
          category: 'INNOVATION IN PACKAGING',
          title: 'Dairy Industry,',
          titleHighlight: 'Aseptic Packaging.',
          ctaText: 'DISCOVER MORE',
          ctaLink: '/',
          description:
            'Specialized aseptic packaging solutions for milk, flavoured dairy, yoghurt, cheese and cultured products. Protect freshness, maintain nutritional value, and enhance brand appeal with durable and sustainable packaging solutions tailored for dairy.',
          backgroundImage: '/banner-slide-2.webp',
        },
        {
          id: '3',
          category: 'INDUSTRIAL EXCELLENCE',
          title: 'Juice, Nectar &,',
          titleHighlight: 'StillDrinks Packaging.',
          ctaText: 'LEARN MORE',
          ctaLink: '/',
          description:
            'Premium aseptic packaging for juice, nectar, and still beverages that safeguards taste and freshness. Our eco friendly packaging solutions combine product protection with environmentally responsible design.',
          backgroundImage: '/banner-slide-3.webp',
        },
        {
          id: '4',
          category: 'GLOBAL LEADERSHIP',
          title: 'Plant-Based,',
          titleHighlight: 'Packaging Innovation.',
          ctaText: 'GET STARTED',
          ctaLink: '/',
          description:
            'Future-focused environmentally friendly packaging for plant-based beverages and dairy alternatives. Our sustainable packaging solutions help brands reduce impact while maintaining product integrity and shelf stability.',
          backgroundImage: '/banner-slide-4.webp',
        },
        {
          id: '5',
          category: 'CUTTING-EDGE SOLUTIONS',
          title: 'Ready-to-Drink,',
          titleHighlight: '(RTD) Packaging.',
          ctaText: 'EXPLORE NOW',
          ctaLink: '/',
          description:
            'High-performance aseptic packaging designed for ready-to-drink beverages. Protect taste, extend shelf life, and support growth with innovative and packaging solutions.',
          backgroundImage: '/banner-slide-5.webp',
        },

        {
          id: '6',
          category: 'CUTTING-EDGE SOLUTIONS',
          title: 'Alcohol Packaging,',
          titleHighlight: '',
          ctaText: 'EXPLORE NOW',
          ctaLink: '/',
          description:
            'Modern aseptic packaging solutions for wine, liquor, and spirits that combine product protection with lightweight packaging solutions for today’s evolving beverage market.',
          backgroundImage: '/banner-slide-6.webp',
        },

        {
          id: '7',
          category: 'CUTTING-EDGE SOLUTIONS',
          title: 'Functional Drinks,',
          titleHighlight: 'Packaging Solutions.',
          ctaText: 'EXPLORE NOW',
          ctaLink: '/',
          description:
            'Smart aseptic packaging solutions for energy drinks, fortified beverages, and wellness blends. Preserve active ingredients and extend shelf life with advanced, packaging solutions built for performance.',
          backgroundImage: '/banner-slide-7.webp',
        },

        {
          id: '8',
          category: 'CUTTING-EDGE SOLUTIONS',
          title: 'Nutraceutical,',
          titleHighlight: 'Packaging Excellence.',
          ctaText: 'EXPLORE NOW',
          ctaLink: '/',
          description:
            'Secure and hygienic carton packaging designed for nutraceutical drinks. Our nutraceuticals packaging innovations ensure product safety, stability, and premium shelf presence.',
          backgroundImage: '/banner-slide-8.webp',
        },

        // {
        //   id: '9',
        //   category: 'CUTTING-EDGE SOLUTIONS',
        //   title: 'Sustainable ,',
        //   titleHighlight: 'Packaging Solutions',
        //   ctaText: 'EXPLORE NOW',
        //   ctaLink: '/',
        //   description:
        //     'Sustainable Packaging Solutions for a Greener Future. Backed by our green factories and responsible production practices, Lamipak offers a broad range of sustainable packaging solutions and renewable aseptic packaging solutions that reduce environmental impact while protecting product quality.',
        //   backgroundImage: '/banner-slide-9.webp',
        // },
      ],
      categories: [
        {
          id: '1',
          label: 'Leading Aseptic',
          href: '/',
          slideIndex: 0, // First slide
        },
        {
          id: '2',
          label: 'Dairy Industry',
          href: '/',
          slideIndex: 1, // Second slide
        },
        {
          id: '3',
          label: 'Juice, Nectar',
          href: '/',
          slideIndex: 2, // Third slide
        },
        {
          id: '4',
          label: 'Plant Based',
          href: '/',
          slideIndex: 3, // Fourth slide
        },
        {
          id: '5',
          label: 'Ready-to-Drink',
          href: '/',
          slideIndex: 4, // Fifth slide
        },
        {
          id: '6',
          label: 'Alcohol',
          href: '/',
          slideIndex: 5, // Fifth slide
        },

        {
          id: '7',
          label: 'Functional Drinks',
          href: '/',
          slideIndex: 6, // Fifth slide
        },

        {
          id: '8',
          label: 'Nutraceutical',
          href: '/',
          slideIndex: 7, // Fifth slide
        },

        // {
        //   id: '5',
        //   label: 'Sustainable',
        //   href: '/',
        //   slideIndex: 8, // Fifth slide
        // },

      ],
      videoUrl: '/video2.mp4',
    },
    approach: {
      title: 'We engineer the future of',
      titleHighlight: 'aseptic packaging.',
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
      title: 'Innovation in aseptic packaging',
      preTitleBlue: 'HOW GLOBAL BEVERAGE BRANDS SCALE',
      preTitleBlack: 'WITH ASEPTIC PRECISION',
      preDescription:
        'With advanced manufacturing facilities in China and Indonesia, Lamipak delivers high-quality packaging products to customers across more than 80 countries. Our global operations combine precision engineering, scalable production, and carton packaging solutions to support brands and companies worldwide.',
      videoUrl: 'https://www.youtube.com/watch?v=2Tpppx-X0z0',
      ctaText: 'View how we help global brands',
      ctaLink: '/about-us',
    },
    commercialServices: {
      cards: [
        {
          id: '1',
          title: 'Technical Services',
          description: 'Focused on delivering reliable aseptic packaging solutions, our technical services provide tailored support to optimise production line performance. We help maximise efficiency, maintain product quality, and ensure smooth, uninterrupted operations.',
          image: '/services_image_1.jpg', // Replace with actual technical services image
          imageAlt: 'Technical Services - Production line with aseptic packaging',
          ctaText: 'Read More',
          ctaLink: '/technical-services',
          icon: 'gear', // Gear icon
        },
        {
          id: '2',
          title: 'Marketing Service',
          description: 'Explore Lamipak Market Support Service, your strategic marketing partner delivering business intelligence, creative support, recipe development support, and sales distribution guidance to drive successful product launches and market growth. We identity growth opportunities for your product and new market opportunities',
          image: '/services_image_2.jpg', // Replace with actual marketing service image
          imageAlt: 'Marketing Service - Digital marketing and business intelligence',
          ctaText: 'Read More',
          ctaLink: '/marketing-services',
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
    productSustainability: {
      products: [
        {
          id: '1',
          title: 'LamiNatural',
          label: 'Responsibly sourced paperboard',
          description: 'Sustainable aseptic carton packaging made from renewable materials and responsibly sourced paperboard, offering strong barrier protection for food and beverages while reducing environmental impact carbon footprint.',
          image: '/LamiNatural1.webp', // Replace with actual LamiNatural product image
          imageAlt: 'LamiNatural - Green carton package with leaf design',
          link: '/',
          ctaText: 'Read More',
        },
        {
          id: '2',
          title: 'LamiPure',
          label: 'Aluminum foil-free technology',
          description: 'LamiPure delivers aluminum foil-free aseptic carton packaging with bio-based materials, supporting sustainable packaging solutions while reducing carbon emissions for food and beverage products.',
          image: '/LamiNatural2.webp', // Replace with actual LamiPure product image
          imageAlt: 'LamiPure - White carton package with blue water pattern',
          link: '/',
          ctaText: 'Read More',
        },
        {
          id: '3',
          title: 'Papers',
          label: 'Sustainable Paper Straws',
          description: 'Eco-friendly paper straws designed to replace plastic, made from renewable materials with food-grade safety and reliable performance.',
          image: '/LamiNatural3.webp', // Replace with actual Papers product image
          imageAlt: 'Papers - Paper straws in blue liquid',
          link: '/',
          ctaText: 'Read More',
        },
        
      ],
    },
    workInSustainability: {
      cards: [
        {
          id: '1',
          title: 'Pick Carton, Save Nature',
          description:
            'At Lamipak, sustainability is not a side initiative. It is a commitment built into every carton we produce.',
          image: '/latest_press_1.jpg',
          imageAlt: 'Pick Carton Save Nature',
          link: '/pick-carton',
          ctaText: 'Learn More',
        },
        {
          id: '2',
          title: 'LAMIRA',
          description:
            'Lamira was born in the pristine forests of Finland, a place known for its pure landscapes, rich biodiversity...',
          image: '/latest_press_2.jpg',
          imageAlt: 'LAMIRA',
          link: '/lamira',
          ctaText: 'Learn More',
        },
        {
          id: '3',
          title: 'Our Green Efforts',
          description:
            'At Lamipak, sustainability guides our operations. Through renewable energy and responsible production...',
          image: '/latest_press_3.jpg',
          imageAlt: 'Our Green Efforts',
          link: '/our-green-efforts',
          ctaText: 'Learn More',
        },
        {
          id: '4',
          title: 'Certifications & Achievements',
          description:
            'Sustainability is a key part of our long-term strategy with measurable milestones across operations and certifications.',
          image: '/banner-slider2.webp',
          imageAlt: 'Certifications and achievements in sustainability',
          link: '/certifications-achievements',
          ctaText: 'Learn More',
        },
        {
          id: '5',
          title: 'NGOs',
          description:
            'By collaborating with industry partners and recycling alliances, we accelerate responsible packaging transitions.',
          image: '/banner-slider3.webp',
          imageAlt: 'NGO and sustainability collaboration',
          link: '/ngos',
          ctaText: 'Learn More',
        },
        {
          id: '6',
          title: '2050 Carbon Net Zero Roadmap',
          description: '2050 NET ZERO ACROSS THE VALUE CHAIN',
          image: '/banner-slider4.webp',
          imageAlt: '2050 carbon net zero roadmap',
          link: '/2050-carbon-net-zero-roadmap',
          ctaText: 'Learn More',
        },
      ],
    },
    faq: {
      items: [
        {
          id: '1',
          question: 'What does Lamipak specialize in?',
          answer: `Lamipak specializes in aseptic liquid packaging materials, primarily used for beverages such as milk, juice, plant-based drinks, and other liquid foods. The company develops high-quality carton packaging solutions that help brands protect product freshness, extend shelf life, and reduce environmental impact through efficient material design and responsible sourcing.
             Lamipak works closely with beverage producers worldwide to deliver packaging that combines performance, sustainability, and brand visibility.`,
        },
        {
          id: '2',
          question: 'What types of packaging formats does Lamipak offer?',
          answer: `Lamipak provides a range of aseptic carton packaging formats designed to meet different product and market needs. These formats are suitable for dairy, plant-based beverages, juices, and other liquid foods. Options include various carton sizes and shapes that help brands optimize shelf presence, logistics efficiency, and consumer convenience.
          Each packaging format is engineered to work with compatible filling machines and to maintain product quality throughout the supply chain.`,
        },
        {
          id: '3',
          question: 'How does Lamipak support sustainability in packaging?',
          answer: `Sustainability is central to Lamipak’s packaging development. The company focuses on responsibly sourced paperboard, optimized material structures, and manufacturing practices that support lower environmental impact. Lamipak also works with certified systems and global sustainability standards to help customers meet their own environmental goals while delivering safe, reliable packaging.`,
        },
        {
          id: '4',
          question: 'Which industries does Lamipak serve?',
          answer: `Lamipak serves a wide range of beverage and liquid food producers across global markets. This includes companies in dairy, plant-based beverages, juices, and other liquid food categories that require reliable aseptic packaging solutions.
            By combining packaging materials with technical expertise and industry insights, Lamipak helps brands bring products to market efficiently and competitively.`,
        },
        {
          id: '5',
          question: 'How can I start working with Lamipak?',
          answer: `Companies interested in Lamipak packaging solutions can easily get in touch with the team to discuss their product requirements, packaging needs, and market goals. Lamipak specialists work closely with customers to recommend the right carton formats, technical solutions, and marketing support. Whether you are launching a new beverage or expanding your packaging portfolio, Lamipak can help you find the right solution.`,
        },
       
      ],
    },
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
      heading: 'Still Have',
      headingHighlight: 'Questions?',
      description: 'Our Lamipak team is ready to walk you through any technical details.',
      ctaText: 'Contact Us',
      ctaLink: '/contact',
    },
    newsletterSubscription: {
      headline: 'Stay Ahead in Aseptic Engineering.',
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
