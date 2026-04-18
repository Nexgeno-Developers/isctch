import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';

import { resolveDynamicPage } from '@/lib/api/resolveDynamicPage';

import LamiraPage from '@/components/LamiraPage';
import GreenEffortsPage from '@/components/GreenEffortsPage';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const PACKAGING_MAIN = 'packaging' as const;

const componentMap: Record<string, ComponentType<any>> = {
  lamira: LamiraPage,
  green: GreenEffortsPage,
  certifications: CertificationsAchievementsPage,
  'our-company': OurCompanyDynamicPage,
  'our-factory': OurCompanyDynamicPage,
  'carbon-roadmap': CarbonNetZeroRoadmapPage,
  'pick-carton': PickCartoonPage,
  'contact-us': ContactUsPage,
  'governance-management': GovernanceManagementPage,
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const resolved = await resolveDynamicPage(fullSlug, 1);
  return resolved.metadata;
}

export default async function DynamicPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const fullSlug = slug?.join('/') || '';
  const search = await searchParams;
  const pageParam = Array.isArray(search?.page) ? search?.page[0] : search?.page;
  const page = pageParam ? Number(pageParam) : 1;
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  const resolved = await resolveDynamicPage(fullSlug, safePage);

  switch (resolved.kind) {
    case 'api-layout': {
      const { layout, payload } = resolved;

      switch (layout) {
        case 'npd':
        case 'innovation_detail_1':
          return <NpdLayoutPage data={payload.page} />;
        case 'pilot_plant':
        case 'innovation_detail_2':
          return <PilotPlantLayoutPage data={payload.page} />;
        case 'innovation':
          return <InnovationsLayoutPage data={payload.page} />;
        case 'insights_article_detail':
          return <InsightsArticleDetailPage data={payload.page} />;
        case 'insights_listing':
          return <InsightsListingPage data={payload.page} />;
        case 'insights':
          return <InsightsHubPage data={payload.page} />;
        case 'default':
          return (
            <DefaultLayoutPage
              data={{
                slug: payload.slug as string,
                title: (payload.title as string) || '',
                content: (payload.content as string) || '',
                heroBackgroundImage:
                  typeof payload.heroBackgroundImage === 'string'
                    ? payload.heroBackgroundImage
                    : undefined,
              }}
            />
          );
    
       
      
      
        case 'product_categories':
          return (
            <ProductCategoriesHubPage
              pageData={payload.pageData as any}
              videoUrl={payload.videoUrl}
              pageContext={{
                mainCategory: payload.slug,
              }}
            />
          );
        case 'product_category_detail_5':
        case 'product_category_detail_1':
        case 'product_category_detail_4':
        case 'product_category_detail_2':
        case 'product_category_detail_3':
          return (
            <PageBuilder
              pageData={payload.pageData as any}
              pageContext={{
                mainCategory: PACKAGING_MAIN,
                subCategory: payload.slug,
              }}
            />
          );
        case 'sustainability_1':
          return <PickCartoonPage data={payload.pageData} />;
        case 'sustainability_2':
          return <LamiraPage data={payload.pageData} />;
        case 'sustainability_3':
          return <GreenEffortsPage data={payload.pageData} />;
        case 'sustainability_4':
          return <CertificationsAchievementsPage data={payload.pageData} />;
        case 'sustainability_5':
          return <NgosPage data={payload.pageData} />;
        case 'sustainability_6':
          return <CarbonNetZeroRoadmapPage data={payload.pageData} />;
        case 'career':
          return <CareerLandingPage data={payload.pageData} />;
        case 'marketing_services':
          return <MarketingServicesLayoutPage data={payload.page} />;
        case 'marketing_service_detail':
          return <MarketingServiceDetailLayoutPage data={payload.page} />;
        case 'technical_services':
          return <TechnicalServicesLayoutPage data={payload.page} />;
        case 'technical_service_detail':
          return <TechnicalServiceDetailLayoutPage data={payload.page} />;
        case 'contact_us':
          return <ContactUsPage data={payload.page} />;
        default:
          break;
      }
      break;
    }
   
   
    case 'sub-category':
      return (
        <PageBuilder
          pageData={resolved.pageData as any}
          pageContext={{
            mainCategory: PACKAGING_MAIN,
            subCategory: resolved.subCategory,
          }}
        />
      );
   
    case 'dynamic': {
      const data = resolved.page;

      if (data.type === 'green') {
        return (
          <GreenEffortsPage
            data={{
              title: data.title,
              heroBackgroundImage:
                typeof data.heroBackgroundImage === 'string'
                  ? data.heroBackgroundImage
                  : '/about_banner.jpg',
              greenSustainabilityVisionSection: data.greenSustainabilityVisionSection as any,
              greenPhotovoltaicProjectSections: data.greenPhotovoltaicProjectSections
                ? [{ htmlItems: [] }]
                : undefined,
              greenSustainabilityJourneySection: data.greenSustainabilityJourneySection as any,
            }}
          />
        );
      }

      if (data.type === 'certifications') {
        return (
          <CertificationsAchievementsPage
            data={{
              title: data.title,
              heroBackgroundImage:
                typeof data.heroBackgroundImage === 'string'
                  ? data.heroBackgroundImage
                  : '/about_banner.jpg',
              certificationsGreenBuildingSection: data.certificationsGreenBuildingSection as any,
              certificationsSustainabilityTimelineSection:
                data.certificationsSustainabilityTimelineSection as any,
              certificationsCertificateTilesSection:
                data.certificationsCertificateTilesSection as any,
            }}
          />
        );
      }

      if (data.type === 'carbon-roadmap') {
        return (
          <CarbonNetZeroRoadmapPage
            data={{
              title: data.title,
              heroBackgroundImage:
                typeof data.heroBackgroundImage === 'string'
                  ? data.heroBackgroundImage
                  : '/about_banner.jpg',
              carbonNetZeroRoadmapSection: data.carbonNetZeroRoadmapSection as any,
              carbonNetZeroPillarsSection: data.carbonNetZeroPillarsSection as any,
            }}
          />
        );
      }

      const Component = componentMap[data.type] || CmsPage;
      return <Component data={data} />;
    }
    case 'not-found':
      notFound();
      break;
    default:
      break;
  }

  notFound();
}
