import type { PageBuilderSection } from '@/fake-api/page-builder';
import type { PageBuilderContext } from './PageBuilder';
import type { ReactElement } from 'react';

import { HeroSection } from '@/components/sections/HeroSection';
import { SubCategoryGridSection } from '@/components/sections/SubCategoryGridSection';
import { ProductGridSection } from '@/components/sections/ProductGridSection';
import { ProductDetailsSection } from '@/components/sections/ProductDetailsSection';
import { CustomBannerSection } from '@/components/sections/CustomBannerSection';
import { CategoryShowcaseSection } from '@/components/sections/CategoryShowcaseSection';
import { RollFedCatalogSection } from '@/components/sections/RollFedCatalogSection';
import { SustainableSolutionsSection } from '@/components/sections/SustainableSolutionsSection';
import { HeroWithBreadcrumbsSection } from '@/components/sections/HeroWithBreadcrumbsSection';
import { LamiStrawLandingSection } from '@/components/sections/LamiStrawLandingSection';
import { OnePackOneCodeLandingSection } from '@/components/sections/OnePackOneCodeLandingSection';

const sectionMap: Partial<
  Record<PageBuilderSection['type'], (props: { data: any; pageContext?: PageBuilderContext }) => ReactElement | null>
> = {
  hero: ({ data }) => <HeroSection data={data} />,
  subcategoryGrid: ({ data, pageContext }) => <SubCategoryGridSection data={data} pageContext={pageContext} />,
  categoryShowcase: ({ data }) => <CategoryShowcaseSection data={data} />,
  rollFedCatalog: ({ data }) => <RollFedCatalogSection data={data} />,
  heroWithBreadcrumbs: ({ data }) => <HeroWithBreadcrumbsSection data={data} />,
  sustainableSolutions: ({ data }) => <SustainableSolutionsSection data={data} />,
  lamiStrawLanding: ({ data }) => <LamiStrawLandingSection data={data} />,
  onePackOneCodeLanding: ({ data }) => <OnePackOneCodeLandingSection data={data} />,
  productGrid: ({ data, pageContext }) => <ProductGridSection data={data} pageContext={pageContext} />,
  productDetails: ({ data }) => <ProductDetailsSection data={data} />,
  customBanner: ({ data }) => <CustomBannerSection data={data} />,
};

export function SectionRenderer({
  section,
  pageContext,
}: {
  section: PageBuilderSection;
  pageContext: PageBuilderContext;
}): ReactElement | null {
  const Component = sectionMap[section.type];
  if (!Component) return null;
  return Component({ data: section.data, pageContext });
}

