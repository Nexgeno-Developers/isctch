/**
 * Marketing Services Overview & Latest News API Data
 *
 * Mock data for the 360° marketing support section
 * and latest news slider on the marketing services listing page.
 */

export interface MarketingServicesOverview {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  statsHeading: string;
  statsSubheading: string;
  listingHeading: string;
  listingHeadingHighlight: string;
  stats: {
    id: string;
    icon: string;
    value: string;
    label: string;
  }[];
  connectSection: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
}

export interface MarketingNewsItem {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  date: string;
  time: string;
}

/**
 * Get marketing services overview content
 * used on the listing page 360° section.
 */
export async function getMarketingServicesOverviewData(): Promise<MarketingServicesOverview> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  return {
    heading: '360 Marketing Support Service',
    description:
      'Introducing Lamipak Market Support Service, a 360-degree marketing solution catering to the diverse needs of the client through business intelligence, recipe support, creative consultancy, and sales & distribution. With a holistic approach, we leverage insights, formulation expertise, and efficient routes to market to guide customers from initial concepts to compelling go-to-market products. Lamipak is committed to empowering businesses, ensuring a seamless journey from concept to market success in today’s dynamic and competitive landscape.',
    image: '/3d_images1.jpg',
    imageAlt: 'Lamipak 360 marketing support visualization',
    statsHeading: 'Empowering Your Business Journey With',
    statsSubheading: 'End-To-End Marketing Excellence',
    listingHeading: 'What Are You Looking For?',
    listingHeadingHighlight: 'Are You',
    stats: [
      {
        id: 'countries',
        icon: '/globe_icon.svg',
        value: '84+',
        label: 'Countries Distribution',
      },
      {
        id: 'support',
        icon: '/suppoer_icon.svg',
        value: '360°',
        label: 'Integrated Support',
      },
      {
        id: 'team',
        icon: '/employee.svg',
        value: '250+',
        label: 'Team Members',
      },
      {
        id: 'steps',
        icon: '/process.svg',
        value: '5 STEPS',
        label: 'Recipe to Market Process',
      },
    ],
    connectSection: {
      heading: 'Connect with Our Marketing Experts',
      headingHighlight: 'Marketing Experts',
      formTitle: 'Plan Your Next Launch',
      illustrationImage: '/connected_image.jpg',
      illustrationAlt: 'Team discussing marketing strategy',
    },
  };
}

/**
 * Fake API for Marketing Latest News (used on marketing services listing page)
 */
export async function getMarketingLatestNews(): Promise<MarketingNewsItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 80));

  return [
    {
      id: 'news-1',
      title: 'Global Dairy Market Outlook',
      image: '/latest_insite_image_1.jpg',
      imageAlt: 'Cartons of dairy products on a light background',
      date: 'January 5, 2025',
      time: '9:00 AM',
    },
    {
      id: 'news-2',
      title: 'Smart Packaging & Traceability',
      image: '/latest_insite_image_2.jpg',
      imageAlt: 'High-tech production line with blue lighting',
      date: 'January 12, 2025',
      time: '10:30 AM',
    },
    {
      id: 'news-3',
      title: 'Circular Economy in Packaging',
      image: '/latest_insite_image_3.jpg',
      imageAlt: 'Person reviewing sustainable packaging design',
      date: 'January 20, 2025',
      time: '3:15 PM',
    },
    {
      id: 'news-4',
      title: 'Circular Economy in Packaging',
      image: '/latest_insite_image_3.jpg',
      imageAlt: 'Person reviewing sustainable packaging design',
      date: 'January 20, 2025',
      time: '3:15 PM',
    },
  ];
}

export async function getMarketingPressNews(): Promise<MarketingNewsItem[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 80));

  return [
    {
      id: 'press-1',
      title: 'Lamipak Showcases Expanded End-to-End Packaging Solutions',
      image: '/latest_press_1.jpg',
      imageAlt: 'Lamipak exhibition booth at industry event',
      date: 'February 10, 2025',
      time: '11:00 AM',
    },
    {
      id: 'press-2',
      title: 'New Smart Packaging Hub Opens in Asia Pacific',
      image: '/latest_press_2.jpg',
      imageAlt: 'Modern innovation center lobby',
      date: 'March 3, 2025',
      time: '2:30 PM',
    },
    {
      id: 'press-3',
      title: 'Lamipak Partners with Leading Dairy Brand',
      image: '/latest_press_3.jpg',
      imageAlt: 'Business handshake in front of factory',
      date: 'April 18, 2025',
      time: '9:45 AM',
    },
  ];
}

