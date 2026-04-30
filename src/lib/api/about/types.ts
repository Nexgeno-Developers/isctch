export type AboutImage = {
  src: string;
  alt: string;
};

export type AboutHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  titleBlue: string;
  titleOrange: string;
};

export type AboutStoryData = {
  kicker: string;
  heading: string;
  body: string[];
  image: AboutImage;
};

export type AboutValueCard = {
  number: string;
  title: string;
  description: string;
  icon: 'eye' | 'flag';
};

export type AboutCoreValue = {
  title: string;
  description: string;
  image: AboutImage;
};

export type AboutCoreValuesData = {
  kicker: string;
  heading: string;
  values: AboutCoreValue[];
};

export type AboutTeamMember = {
  name: string;
  designation: string;
  image: AboutImage;
};

export type AboutManagementTeamData = {
  kicker: string;
  heading: string;
  description: string[];
  members: AboutTeamMember[];
};

export type AboutCtaData = {
  heading: string;
  donateLabel: string;
  donateHref: string;
  volunteerLabel: string;
  volunteerHref: string;
};

export type AboutPageData = {
  hero: AboutHeroData;
  story: AboutStoryData;
  quote: string;
  valueCards: AboutValueCard[];
  coreValues: AboutCoreValuesData;
  managementTeam: AboutManagementTeamData;
  cta: AboutCtaData;
};
