export type SummitImage = {
  src: string;
  alt: string;
};

export type SummitDetailHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type SummitSidebarCard = {
  location: string;
  title: string;
  image: SummitImage;
  href: string;
};

export type SummitRelatedCard = {
  location: string;
  title: string;
  description: string;
  image: SummitImage;
  href: string;
};

export type SummitDetailData = {
  location: string;
  title: string;
  summary: string;
  paragraphs: string[];
  image: SummitImage;
  sidebarCards: SummitSidebarCard[];
};

export type SummitDetailPageData = {
  hero: SummitDetailHeroData;
  detail: SummitDetailData;
  related: {
    cards: SummitRelatedCard[];
  };
};
