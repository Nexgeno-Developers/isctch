/**
 * Fake API for Page Data
 * 
 * This file contains mock data for dynamic pages.
 * When the Laravel API is ready, replace the implementation
 * with actual fetch calls to the API_CONFIG endpoints.
 */

export interface PageSchema {
  '@context': string;
  '@type': string;
  headline?: string;
  description?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    '@type': string;
    name: string;
  };
  publisher?: {
    '@type': string;
    name: string;
  };
  [key: string]: unknown;
}

export interface PageSEO {
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
  schema?: PageSchema;
}

export interface PageData {
  title: string;
  content: string;
  seo: PageSEO;
}

/**
 * Fetches page data by slug
 * 
 * @param slug - The page slug/identifier
 * @returns Promise<PageData | null> - Page data or null if not found
 */
export async function getPageData(slug: string): Promise<PageData | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data - in real implementation, this would fetch from API
  const mockPages: Record<string, PageData> = {
    'about': {
      title: 'About Us',
      content: `
        <h2>Our Story</h2>
        <p>We are a team of passionate developers and designers dedicated to creating exceptional digital experiences.</p>
        <p>Founded in 2020, we have been helping businesses transform their digital presence and achieve their goals.</p>
        <h2>Our Mission</h2>
        <p>To deliver innovative solutions that drive growth and success for our clients.</p>
      `,
      seo: {
        meta_title: 'About Us - Learn More About Our Company',
        meta_description: 'Discover our story, mission, and the team behind our innovative solutions.',
        canonical_url: '/about',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          headline: 'About Us',
          description: 'Discover our story, mission, and the team behind our innovative solutions.',
        },
      },
    },
    'services': {
      title: 'Our Services',
      content: `
        <h2>What We Offer</h2>
        <p>We provide a comprehensive range of services to help your business succeed:</p>
        <ul>
          <li>Web Development</li>
          <li>Mobile App Development</li>
          <li>Cloud Solutions</li>
          <li>Consulting Services</li>
        </ul>
        <p>Contact us to learn more about how we can help your business grow.</p>
      `,
      seo: {
        meta_title: 'Our Services - Comprehensive Solutions',
        meta_description: 'Explore our range of services including web development, mobile apps, and cloud solutions.',
        canonical_url: '/services',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Service',
          headline: 'Our Services',
          description: 'Explore our range of services including web development, mobile apps, and cloud solutions.',
        },
      },
    },
    'contact': {
      title: 'Contact Us',
      content: `
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you. Reach out to us through any of the following channels:</p>
        <p><strong>Email:</strong> contact@example.com</p>
        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        <p><strong>Address:</strong> 123 Main Street, City, State 12345</p>
      `,
      seo: {
        meta_title: 'Contact Us - Get in Touch',
        meta_description: 'Reach out to us for inquiries, support, or to discuss your project needs.',
        canonical_url: '/contact',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          headline: 'Contact Us',
          description: 'Reach out to us for inquiries, support, or to discuss your project needs.',
        },
      },
    },
  };

  return mockPages[slug] || null;
}
