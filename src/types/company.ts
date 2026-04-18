/**
 * Shared company / about-page shapes (replaces removed fake-api/company types).
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
  icon: string;
  value: string;
  label: string;
}

export interface JourneyMilestone {
  year: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export interface JourneyData {
  title: string;
  milestones: JourneyMilestone[];
}

export interface CompanyNavigationItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}

export interface CompanyNavigation {
  items: CompanyNavigationItem[];
}

export interface AboutUsQuadrantSection {
  topLeft: {
    title: string;
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
    paragraphs: string[];
  };
}

export interface VisionMissionSection {
  backgroundImage: string;
  backgroundImageAlt: string;
  tagline: string;
  description: string;
  vision: {
    icon: string;
    heading: string;
    text: string;
  };
  mission: {
    icon: string;
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
