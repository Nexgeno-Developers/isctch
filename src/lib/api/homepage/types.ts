export type HomeHeroCta = {
  label: string;
  href: string;
};

export type HomeHeroData = {
  overline: string;
  headline: {
    accent: string;
    lineMiddle: string;
    accentWord: string;
  };
  description: string;
  primaryCta: HomeHeroCta;
  secondaryCta: HomeHeroCta;
  image: { src: string; alt: string };
  statCard: {
    label: string;
    value: string;
  };
};

/** One stat in the cyan impact bar — either animated count or a fixed symbol (∞). */
export type HomeImpactStatItem =
  | {
      mode: 'count';
      end: number;
      prefix?: string;
      suffix?: string;
      /** Minimum digit width, e.g. 2 → `07` */
      pad?: number;
      label: string;
    }
  | {
      mode: 'symbol';
      symbol: string;
      label: string;
    };

export type HomeImpactStatsData = {
  items: HomeImpactStatItem[];
};

/** Icon set for core value cards (mapped to inline SVGs in the UI). */
export type HomeCoreValueIconId =
  | 'hand-heart'
  | 'leaf'
  | 'handshake'
  | 'heart'
  | 'scales';

export type HomeCoreValueItem = {
  icon: HomeCoreValueIconId;
  label: string;
};

/** About + core values two-column block (homepage). */
export type HomeAboutCoreValuesData = {
  aboutKicker: string;
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  visionLabel: string;
  visionText: string;
  coreValuesKicker: string;
  values: HomeCoreValueItem[];
};

/** Icons for action pillar cards (inline SVGs). */
export type HomeActionPillarIconId =
  | 'people'
  | 'meditation'
  | 'graduation'
  | 'megaphone'
  | 'book'
  | 'scales-policy';

export type HomeActionPillarItem = {
  icon: HomeActionPillarIconId;
  title: string;
  description: string;
};

export type HomeActionPillarsData = {
  kicker: string;
  title: string;
  pillars: HomeActionPillarItem[];
};

export type HomePageData = {
  hero: HomeHeroData;
  impactStats: HomeImpactStatsData;
  aboutCoreValues: HomeAboutCoreValuesData;
  actionPillars: HomeActionPillarsData;
};
