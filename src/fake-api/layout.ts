/**
 * Fake API for Layout Data (Header & Footer)
 * 
 * This file contains mock data for header and footer.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface HeaderData {
  logo: {
    text?: string;
    image?: string;
    href: string;
  };
  navigation: NavigationItem[];
  cta?: {
    text: string;
    href: string;
  };
}

export interface FooterColumn {
  id: string;
  title: string;
  links: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon?: string;
}

export interface FooterData {
  logo: {
    text: string;
    image?: string;
    href: string;
  };
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
}

/**
 * Fetches header data
 * 
 * @returns Promise<HeaderData> - Header data
 */
export async function getHeaderData(): Promise<HeaderData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data - in real implementation, this would fetch from API
  return {
    logo: {
      text: 'LAMIPAK',
      image: '/logo.png',
      href: '/',
    },
    navigation: [
      {
        id: '1',
        label: 'Solutions',
        href: '/solutions',
      },
      {
        id: '2',
        label: 'Industries',
        href: '/industries',
      },
      {
        id: '3',
        label: 'Sustainability',
        href: '/sustainability',
      },
      {
        id: '4',
        label: 'Insights',
        href: '/insights',
      },
      {
        id: '5',
        label: 'About Us',
        href: '/about',
      },
    ],
    cta: {
      text: 'Contact Us',
      href: '/contact',
    },
  };
}

/**
 * Fetches footer data
 * 
 * @returns Promise<FooterData> - Footer data
 */
export async function getFooterData(): Promise<FooterData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data - in real implementation, this would fetch from API
  return {
    logo: {
      text: 'LAMIPAK',
      image: '/logo.png',
      href: '/',
    },
    description: 'Engineering the future of aseptic liquid packaging. Precision, sterility, and scale built for global leaders.',
    columns: [
      {
        id: '1',
        title: 'Quick Links',
        links: [
          { id: '1', label: 'Solutions', href: '/solutions' },
          { id: '2', label: 'Industries', href: '/industries' },
          { id: '3', label: 'Sustainability', href: '/sustainability' },
          { id: '4', label: 'About', href: '/about' },
        ],
      },
      {
        id: '2',
        title: 'Legal',
        links: [
          { id: '5', label: 'Terms & Condition', href: '/terms' },
          { id: '6', label: 'Privacy Policy', href: '/privacy' },
          { id: '7', label: 'Downloads', href: '/downloads' },
          { id: '8', label: 'Blogs', href: '/blog' },
        ],
      },
      {
        id: '3',
        title: 'Connect',
        links: [
          { id: '9', label: 'Insights', href: '/insights' },
          { id: '10', label: 'Careers', href: '/careers' },
          { id: '11', label: 'Contact', href: '/contact' },
        ],
      },
      {
        id: '4',
        title: 'Contact',
        links: [
          { id: '12', label: 'Standard Products', href: '/products/standard' },
          { id: '13', label: 'LamiSleeve', href: '/products/lamisleeve' },
          { id: '14', label: 'LamiPure', href: '/products/lamipure' },
          { id: '15', label: 'Caps ETC', href: '/products/caps' },
        ],
      },
    ],
    socialLinks: [
      {
        id: '1',
        platform: 'Twitter',
        href: 'https://twitter.com',
        icon: 'twitter',
      },
      {
        id: '2',
        platform: 'Facebook',
        href: 'https://facebook.com',
        icon: 'facebook',
      },
      {
        id: '3',
        platform: 'Instagram',
        href: 'https://instagram.com',
        icon: 'instagram',
      },
      {
        id: '4',
        platform: 'YouTube',
        href: 'https://youtube.com',
        icon: 'youtube',
      },
    ],
    copyright: `© ${new Date().getFullYear()} Lamipak. All Rights Reserved.`,
  };
}
