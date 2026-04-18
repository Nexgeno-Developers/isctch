import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';

import { resolveDynamicPage } from '@/lib/api/resolveDynamicPage';

import LamiraPage from '@/components/LamiraPage';
import GreenEffortsPage from '@/components/GreenEffortsPage';
import CmsPage from '@/components/CmsPage';
import PickCartoonPage from '@/components/PickCartoonPage';
import CertificationsAchievementsPage from '@/components/CertificationsAchievementsPage';
import NgosPage from '@/components/NgosPage';
import CarbonNetZeroRoadmapPage from '@/components/CarbonNetZeroRoadmapPage';
import OurCompanyDynamicPage from '@/components/OurCompanyDynamicPage';
import ContactUsPage from '@/components/ContactUsPage';
import GovernanceManagementPage from '@/components/GovernanceManagementPage';
import { PageBuilder } from '@/components/pageBuilder/PageBuilder';
import { ProductCategoriesHubPage } from '@/components/pages/ProductCategoriesHubPage';
import ProductDetailLayout from '@/components/products/ProductDetailLayout';
import { AboutUsPageSection } from '@/components/sections/AboutUsPageSection';
import { IntroductionPageSection } from '@/components/sections/IntroductionPageSection';
import { VisionMissionPageSection } from '@/components/sections/VisionMissionPageSection';
import { VisionMissionLayoutPageSection } from '@/components/sections/VisionMissionLayoutPageSection';
import GovernanceManagementLayoutPageSection from '@/components/sections/GovernanceManagementLayoutPageSection';
import ProductCategoryPageSection from '@/components/sections/ProductCategoryPageSection';
import ProductIndustryDetailLayoutPageSection from '@/components/sections/ProductIndustryDetailLayoutPageSection';
import ProductIndustriesLayoutPage from '@/components/pages/ProductIndustriesLayoutPage';
import RAndDCentreLayoutPage from '@/components/pages/RAndDCentreLayoutPage';
import NpdLayoutPage from '@/components/pages/NpdLayoutPage';
import PilotPlantLayoutPage from '@/components/pages/PilotPlantLayoutPage';
import InnovationsLayoutPage from '@/components/pages/InnovationsLayoutPage';
import InsightsHubPage from '@/components/pages/InsightsHubPage';
import DefaultLayoutPage from '@/components/pages/DefaultLayoutPage';
import InsightsListingPage from '@/components/pages/InsightsListingPage';
import InsightsArticleDetailPage from '@/components/pages/InsightsArticleDetailPage';
import CareerLandingPage from '@/components/CareerLandingPage';
import MarketingServicesLayoutPage from '@/components/pages/MarketingServicesLayoutPage';
import MarketingServiceDetailLayoutPage from '@/components/pages/MarketingServiceDetailLayoutPage';
import TechnicalServicesLayoutPage from '@/components/pages/TechnicalServicesLayoutPage';
import TechnicalServiceDetailLayoutPage from '@/components/pages/TechnicalServiceDetailLayoutPage';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function fullSlugFromParams(slug: string[] | undefined): string {
  return (slug?.filter(Boolean).join('/') || '').replace(/^\/+|\/+$/g, '');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = fullSlugFromParams(slug);

  if (fullSlug === ABOUT_US_PAGE_SLUG) {
    return {
      title: 'About Us',
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  if (fullSlug === CONTACT_US_PAGE_SLUG) {
    return {
      title: 'Contact Us',
      alternates: { canonical: getCanonicalUrl(`/${fullSlug}`) },
    };
  }
  return { title: 'Not Found' };
}

export default async function CatchAllPage({ params }: PageProps) {
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
        case 'rnd_center':
          return <RAndDCentreLayoutPage data={payload.page} />;
        case 'product_industries':
          return <ProductIndustriesLayoutPage data={payload.page} />;
        case 'product_industry_detail':
          return <ProductIndustryDetailLayoutPageSection data={payload.page} />;
        case 'about_4':
          return (
            <GovernanceManagementLayoutPageSection
              data={payload.page}
              activePath={`/${fullSlug}`}
            />
          );
        case 'about_3':
          return (
            <VisionMissionLayoutPageSection
              data={payload.page}
              activePath={`/${fullSlug}`}
            />
          );
        case 'about_1':
          return (
            <AboutUsPageSection
              hero={payload.page.hero}
              statistics={payload.page.statistics}
              journey={payload.page.journey}
              videoUrl={payload.page.videoUrl}
              navigation={payload.page.navigation}
              activePath={`/${fullSlug}`}
            />
          );
        case 'about_2':
          return (
            <IntroductionPageSection
              data={payload.page}
              activePath={`/${fullSlug}`}
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
    case 'product-category':
      return (
        <ProductCategoryPageSection
          category={resolved.category}
          products={resolved.products}
        />
      );
    case 'product':
      return (
        <ProductDetailLayout
          product={resolved.product}
          slugPath={resolved.slugPath}
        />
      );
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
    case 'legacy-vision-mission':
      return <VisionMissionPageSection data={resolved.page} />;
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
