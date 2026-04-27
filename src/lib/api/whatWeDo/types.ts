export type WhatWeDoHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type WhatWeDoInitiativeIcon = {
  src: string;
  alt: string;
};

export type HomePeaceSummitCard = {
  location: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  icon: WhatWeDoInitiativeIcon;
  cta: {
    label: string;
    href: string;
  };
};

export type WhatWeDoPeaceSummitsData = {
  kicker: string;
  title: string;
  summits: HomePeaceSummitCard[];
};

export type WhatWeDoPageData = {
  hero: WhatWeDoHeroData;
  peaceSummits: WhatWeDoPeaceSummitsData;
};
