export type DonateHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type DonateStatItem = {
  value: string;
  label: string;
};

export type DonateStatsData = {
  items: DonateStatItem[];
};

export type DonateContributionData = {
  heading: string;
  paragraphOne: string;
  paragraphTwo: string;
  quote: string;
  formTitle: string;
  secureLabel: string;
  oneTimeLabel: string;
  monthlyLabel: string;
  amounts: number[];
  defaultAmount: number;
  otherLabel: string;
  customAmountPlaceholder: string;
  submitOneTimeLabel: string;
  submitMonthlyLabel: string;
  footnote: string;
};

export type DonateBeyondSupportCard = {
  icon: 'volunteer' | 'advocacy' | 'partners';
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type DonateBeyondSupportData = {
  heading: string;
  subheading: string;
  cards: DonateBeyondSupportCard[];
};

export type DonateJoinMovementData = {
  heading: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundImage: { src: string; alt: string };
};

export type DonatePageData = {
  hero: DonateHeroData;
  stats: DonateStatsData;
  contribution: DonateContributionData;
  beyondSupport: DonateBeyondSupportData;
  joinMovement: DonateJoinMovementData;
};
