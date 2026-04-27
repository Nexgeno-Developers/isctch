import type { HomeActionPillarsData, HomePeaceSummitsData } from '@/lib/api/homepage/types';

export type WhatWeDoHeroData = {
  breadcrumbHomeLabel: string;
  breadcrumbCurrentLabel: string;
  kicker: string;
  titleBlue: string;
  titleOrange: string;
};

export type WhatWeDoPageData = {
  hero: WhatWeDoHeroData;
  actionPillars: HomeActionPillarsData;
  peaceSummits: HomePeaceSummitsData;
};
