export type GetInvolvedHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type GetInvolvedProgramData = {
  kicker: string;
  title: string;
  description: string[];
  image: {
    src: string;
    alt: string;
  };
  benefits: string[];
};

export type GetInvolvedApplicationField = {
  name: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'country';
  span?: 'full' | 'half';
};

export type GetInvolvedApplicationData = {
  title: string;
  subtitle: string;
  fields: GetInvolvedApplicationField[];
  submitLabel: string;
};

export type GetInvolvedEngageCard = {
  image: { src: string; alt: string };
  icon: { src: string; alt: string };
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export type GetInvolvedEngageSectionData = {
  title: string;
  subtitle: string;
  cards: GetInvolvedEngageCard[];
};

export type GetInvolvedPageData = {
  hero: GetInvolvedHeroData;
  program: GetInvolvedProgramData;
  application: GetInvolvedApplicationData;
  engageSection: GetInvolvedEngageSectionData;
};
