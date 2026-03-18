/**
 * Fake API for Careers
 *
 * Mock data for careers listing and job details.
 * Replace with real API calls when Laravel backend is ready.
 */

export interface CareerSEO {
  meta_title: string;
  meta_description: string;
  canonical_url?: string;
}

export interface CareerJob {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  jobType: string; // e.g. Full-time
  postedDate: string; // e.g. "2026-03-10"
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyEmail?: string;
}

export interface CareersListingData {
  heroTitle: string;
  heroBackgroundImage?: string;
  heroSplit?: {
    heading: string;
    headingHighlight: string;
    paragraphs: string[];
    emphasis: string;
    ctaText: string;
    ctaLink: string;
    mediaImage: string;
    mediaAlt: string;
    mediaLink?: string; // optional video link
  };
  intro?: {
    heading: string;
    description: string;
  };
  leadershipMessage?: {
    image: string;
    imageAlt: string;
    name: string;
    role: string;
    heading: string;
    headingHighlight: string;
    paragraphs: string[];
  };
  verticalFeatures?: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
  jobs: CareerJob[];
  seo: CareerSEO;
}

const JOBS: CareerJob[] = [
  {
    id: '1',
    slug: 'marketing-specialist',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Dubai, UAE',
    jobType: 'Full-time',
    postedDate: '2026-03-10',
    shortDescription:
      'Support go-to-market planning, campaigns, and content creation across key product categories.',
    description:
      'You will help execute integrated marketing initiatives, coordinate with cross-functional teams, and support the development of compelling communication for our packaging solutions.',
    responsibilities: [
      'Support campaign planning and execution across channels.',
      'Coordinate with sales and product teams to align messaging.',
      'Create and maintain marketing collateral and presentations.',
      'Track performance metrics and summarize insights.',
    ],
    requirements: [
      '2+ years experience in marketing or related roles.',
      'Strong writing and communication skills.',
      'Comfortable working with multiple stakeholders.',
      'Experience with B2B marketing is a plus.',
    ],
    applyEmail: 'hr@lamipak.com',
  },
  {
    id: '2',
    slug: 'packaging-engineer',
    title: 'Packaging Engineer',
    department: 'Technical Services',
    location: 'Shanghai, China',
    jobType: 'Full-time',
    postedDate: '2026-03-01',
    shortDescription:
      'Drive packaging performance, testing, and customer technical support for aseptic solutions.',
    description:
      'You will work with R&D and customer teams to improve packaging performance, run validation testing, and support troubleshooting for production lines.',
    responsibilities: [
      'Support packaging qualification and validation projects.',
      'Analyze performance data and recommend improvements.',
      'Collaborate with customers on technical troubleshooting.',
      'Document results and maintain technical reports.',
    ],
    requirements: [
      'Bachelor’s degree in Packaging, Mechanical, or Materials Engineering.',
      'Experience with packaging testing and QA workflows.',
      'Strong analytical and problem-solving skills.',
      'Ability to travel occasionally.',
    ],
    applyEmail: 'hr@lamipak.com',
  },
  {
    id: '3',
    slug: 'sales-executive',
    title: 'Sales Executive',
    department: 'Commercial',
    location: 'Mumbai, India',
    jobType: 'Full-time',
    postedDate: '2026-02-20',
    shortDescription:
      'Build and manage customer relationships, identify opportunities, and drive revenue growth.',
    description:
      'You will manage accounts, develop pipeline, and coordinate with internal teams to deliver packaging solutions aligned to customer needs.',
    responsibilities: [
      'Manage assigned accounts and build strong relationships.',
      'Develop and execute sales plans to meet targets.',
      'Identify new opportunities and expand distribution.',
      'Coordinate proposals and commercial negotiations.',
    ],
    requirements: [
      '3+ years experience in B2B sales.',
      'Strong negotiation and presentation skills.',
      'Experience in FMCG, packaging, or industrial sectors preferred.',
      'Willingness to travel locally.',
    ],
    applyEmail: 'hr@lamipak.com',
  },
];

export async function getCareersListingData(): Promise<CareersListingData> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return {
    heroTitle: 'Career',
    heroBackgroundImage: '/about_banner.jpg',
    heroSplit: {
      heading: 'Build Your International',
      headingHighlight: 'Career At LamiPak',
      paragraphs: [
        'At Lamipak, we don’t just make packaging; we build solutions for the future. As one of the fastest‑growing players in the industry, we invite creative and innovative talents to join us on our journey to conquer global challenges.',
        'We believe in the power of collaboration and the unique skills of each individual. Whether you’re an engineer, marketing expert, designer, or sales professional, Lamipak provides a space for you to contribute meaningfully, learn continuously, and lead change.',
      ],
      emphasis: 'Be part of the solution. Step into our world today.',
      ctaText: 'Join Us',
      ctaLink: '#open-positions',
      mediaImage: '/about_banner.jpg',
      mediaAlt: 'Lamipak production line',
      mediaLink: '/video2.mp4',
    },
    intro: {
      heading: 'Join Lamipak',
      description:
        'Explore open roles across commercial, marketing, and technical teams. We value ownership, collaboration, and continuous learning.',
    },
    leadershipMessage: {
      image: '/images/career/leader.jpg',
      imageAlt: 'Lamipak leader portrait',
      name: 'Danny Oei',
      role: 'Chairman',
      heading: 'Brings',
      headingHighlight: 'Life',
      paragraphs: [
        'Lamipak is built on the belief that packaging can protect quality, enable progress, and connect brands with consumers in meaningful ways. Our teams bring together creativity, engineering discipline, and a passion for improvement.',
        'If you’re excited to learn, collaborate, and take ownership, you’ll find a place here to grow your skills and make a real impact—locally and globally.',
      ],
    },
    verticalFeatures: [
      {
        id: 'growth',
        title: 'Growth & Learning',
        description:
          'Access continuous learning opportunities, mentorship, and cross-functional exposure to build skills that grow with your career.',
        image: '/banner-slider2.jpg',
        imageAlt: 'Team learning and collaborating',
      },
      {
        id: 'innovation',
        title: 'Innovation Culture',
        description:
          'Work on challenging problems in packaging, sustainability, and digital solutions—where ideas turn into real impact.',
        image: '/banner-slider3.jpg',
        imageAlt: 'Innovation in packaging',
      },
      {
        id: 'global',
        title: 'Global Opportunities',
        description:
          'Join international teams and projects across markets, enabling broader perspective and meaningful collaboration.',
        image: '/banner-slider4.jpg',
        imageAlt: 'Global operations',
      },
      {
        id: 'ownership',
        title: 'Ownership & Trust',
        description:
          'We empower people to take ownership, move fast, and make decisions—supported by strong teams and clear goals.',
        image: '/banner-slider5.jpg',
        imageAlt: 'Ownership and leadership',
      },
      {
        id: 'wellbeing',
        title: 'People & Wellbeing',
        description:
          'A supportive environment that values collaboration, respect, and sustainable ways of working for long-term success.',
        image: '/banner-slider1.jpg',
        imageAlt: 'Team wellbeing',
      },
    ],
    jobs: JOBS,
    seo: {
      meta_title: 'Career | Lamipak',
      meta_description: 'Explore career opportunities at Lamipak.',
      canonical_url: '/career',
    },
  };
}

export async function getCareerJobBySlug(slug: string): Promise<CareerJob | null> {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return JOBS.find((job) => job.slug === slug) ?? null;
}

export async function getAllCareerJobSlugs(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return JOBS.map((job) => job.slug);
}

