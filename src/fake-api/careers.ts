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
  function: string;
  region: 'North America' | 'Latin America' | 'EMEA' | 'Asia Pacific';
  location: string;
  jobType: string; // e.g. Full-time
  experienceLevel: string; // e.g. "5–10 Years"
  postedDate: string; // e.g. "2026-03-10"
  postedAgo?: string; // e.g. "14 Hours Ago"
  salary?: string; // e.g. "Negotiable"
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyEmail?: string;
  applyLinkedInUrl?: string;
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
  verticalFeaturesHeader?: {
    heading: string;
    headingHighlight: string;
    description: string;
  };
  expertsSection?: {
    heading: string;
    headingHighlight: string;
    headingSuffix: string;
    description: string;
    videos: Array<{
      id: string;
      thumbnail: string;
      thumbnailAlt: string;
      videoUrl: string;
    }>;
  };
  connectSection?: {
    heading: string;
    headingHighlight: string;
    formTitle: string;
    illustrationImage: string;
    illustrationAlt: string;
  };
  jobsSection?: {
    notice: string;
    heading: string;
    headingHighlight: string;
    headingSuffix: string;
    regions: Array<'All' | 'North America' | 'Latin America' | 'EMEA' | 'Asia Pacific'>;
    filters: {
      titlePlaceholder: string;
      locationPlaceholder: string;
      functionPlaceholder: string;
      experiencePlaceholder: string;
      datePlaceholder: string;
    };
  };
  jobs: CareerJob[];
  seo: CareerSEO;
}

const JOBS: CareerJob[] = [
  {
    id: '1',
    slug: 'marketing-specialist',
    title: 'Marketing Specialist',
    department: 'Marketing',
    function: 'Human Resources',
    region: 'EMEA',
    location: 'Dubai, UAE',
    jobType: 'Full-time',
    experienceLevel: '2–5 Years',
    postedDate: '2026-03-10',
    postedAgo: '14 Hours Ago',
    salary: 'Negotiable',
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
    applyLinkedInUrl: 'https://www.linkedin.com',
  },
  {
    id: '2',
    slug: 'packaging-engineer',
    title: 'Packaging Engineer',
    department: 'Technical Services',
    function: 'Engineering',
    region: 'Asia Pacific',
    location: 'Shanghai, China',
    jobType: 'Full-time',
    experienceLevel: '5–10 Years',
    postedDate: '2026-03-01',
    postedAgo: '2 Days Ago',
    salary: 'Negotiable',
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
    applyLinkedInUrl: 'https://www.linkedin.com',
  },
  {
    id: '3',
    slug: 'sales-executive',
    title: 'Sales Executive',
    department: 'Commercial',
    function: 'Sales',
    region: 'Asia Pacific',
    location: 'Mumbai, India',
    jobType: 'Full-time',
    experienceLevel: '3–5 Years',
    postedDate: '2026-02-20',
    postedAgo: '1 Week Ago',
    salary: 'Negotiable',
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
    applyLinkedInUrl: 'https://www.linkedin.com',
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
      image: '/chairman_image.webp',
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
    verticalFeaturesHeader: {
      heading: 'Company Value',
      headingHighlight: 'Presentation',
      description:
        'Our values guide our commitment to quality, innovation, and sustainable packaging—creating freshness and safety in every product.',
    },
    expertsSection: {
      heading: 'Behind Every',
      headingHighlight: 'Solutions',
      headingSuffix: "There's A Team Of Experts Driving Innovation",
      description:
        'Behind every solution is a team of experts creating safe and sustainable packaging for global brands.',
      videos: [
        {
          id: 'experts-1',
          thumbnail: '/latest_insite_image_1.jpg',
          thumbnailAlt: 'Team of experts working on innovation',
          videoUrl: '/video2.mp4',
        },
        {
          id: 'experts-2',
          thumbnail: '/latest_insite_image_2.jpg',
          thumbnailAlt: 'Experts driving packaging innovation',
          videoUrl: '/video2.mp4',
        },
        {
          id: 'experts-3',
          thumbnail: '/latest_insite_image_3.jpg',
          thumbnailAlt: 'Innovation in sustainable packaging',
          videoUrl: '/video2.mp4',
        },
      ],
    },
    connectSection: {
      heading: 'Connect with Our Talent Team',
      headingHighlight: 'Talent Team',
      formTitle: 'Send Us A Message',
      illustrationImage: '/connected_image.jpg',
      illustrationAlt: 'Connect with Lamipak team',
    },
    jobsSection: {
      notice:
        'We will never ask for personal information unrelated to the job application process, such as bank or credit card data, and never charge any fees to apply to any jobs.',
      heading: 'See all open positions and',
      headingHighlight: 'early career opportunities',
      headingSuffix: 'or search by region :',
      regions: ['All', 'North America', 'Latin America', 'EMEA', 'Asia Pacific'],
      filters: {
        titlePlaceholder: 'Title',
        locationPlaceholder: 'Location',
        functionPlaceholder: 'All',
        experiencePlaceholder: 'Experience Level',
        datePlaceholder: 'Date',
      },
    },
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

