import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getCanonicalUrl } from '@/config/site';

import type { ProductCategory } from '@/lib/api';
import {
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/api';
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
import { fetchProductCategoriesPage } from '@/lib/api/product_categories';
import { fetcProductCategoryLayout5Page } from '@/lib/api/product_category_layout_5';
import { fetcProductCategoryLayout1Page } from '@/lib/api/product_category_layout_1';
import { fetcProductCategoryLayout2Page } from '@/lib/api/product_category_layout_2';
import { fetcProductCategoryLayout3Page } from '@/lib/api/product_category_layout_3';
import { fetcProductCategoryLayout4Page } from '@/lib/api/product_category_layout_4';
import { fetchProductData } from '@/lib/api';
import { fetchProductLayoutPage } from '@/lib/api/product_layout_products';
import { fetchSustainabilityLayout1Page } from '@/lib/api/sustainability_layout_1';
import { fetchSustainabilityLayout2Page } from '@/lib/api/sustainability_layout_2';
import { fetchSustainabilityLayout3Page } from '@/lib/api/sustainability_layout_3';
import { fetchSustainabilityLayout4Page } from '@/lib/api/sustainability_layout_4';
import { fetchSustainabilityLayout5Page } from '@/lib/api/sustainability_layout_5';
import { fetchSustainabilityLayout6Page } from '@/lib/api/sustainability_layout_6';
import { fetchCareerLayoutPage } from '@/lib/api/career_layout';
import { fetchMarketingServicesLayoutPage } from '@/lib/api/marketing_services_layout';
import MarketingServicesLayoutPage from '@/components/pages/MarketingServicesLayoutPage';
import { fetchMarketingServiceDetailLayoutPage } from '@/lib/api/marketing_service_detail_layout';
import MarketingServiceDetailLayoutPage from '@/components/pages/MarketingServiceDetailLayoutPage';
import { fetchTechnicalServicesLayoutPage } from '../../lib/api/technical_services_layout';
import TechnicalServicesLayoutPage from '../../components/pages/TechnicalServicesLayoutPage';
import { fetchTechnicalServiceDetailLayoutPage } from '../../lib/api/technical_service_detail_layout';
import TechnicalServiceDetailLayoutPage from '../../components/pages/TechnicalServiceDetailLayoutPage';
import { buildApiMetadata } from '@/components/seo/buildApiMetadata';
import { getSubCategoryPage } from '@/fake-api/page-builder';
import ProductDetailLayout from '@/components/products/ProductDetailLayout';
import { AboutUsPageSection } from '@/components/sections/AboutUsPageSection';
import { fetchAboutUsLayout1Page } from '@/lib/api/about_us_layout_1';
import { fetchAboutUsLayout2Page } from '@/lib/api/about_us_layout_2';
import { IntroductionPageSection } from '@/components/sections/IntroductionPageSection';
import { VisionMissionPageSection } from '@/components/sections/VisionMissionPageSection';
import { fetchAboutUsLayout3Page } from '@/lib/api/about_us_layout_3';
import { VisionMissionLayoutPageSection } from '@/components/sections/VisionMissionLayoutPageSection';
import { fetchAboutUsLayout4Page } from '@/lib/api/about_us_layout_4';
import GovernanceManagementLayoutPageSection from '@/components/sections/GovernanceManagementLayoutPageSection';
import ProductCategoryPageSection from '@/components/sections/ProductCategoryPageSection';
import { fetchProductIndustryDetailLayoutPage } from '@/lib/api/product_industry_detail_layout';
import ProductIndustryDetailLayoutPageSection from '@/components/sections/ProductIndustryDetailLayoutPageSection';
import { fetchProductIndustriesLayoutPage } from '@/lib/api/product_industries_layout';
import ProductIndustriesLayoutPage from '@/components/pages/ProductIndustriesLayoutPage';
import { fetchRAndDCentreLayoutPage } from '@/lib/api/r_and_d_centre_layout';
import RAndDCentreLayoutPage from '@/components/pages/RAndDCentreLayoutPage';
import { fetchNpdLayoutPage } from '@/lib/api/npd_layout';
import NpdLayoutPage from '@/components/pages/NpdLayoutPage';
import { fetchPilotPlantLayoutPage } from '@/lib/api/pilot_plant_layout';
import PilotPlantLayoutPage from '@/components/pages/PilotPlantLayoutPage';
import { fetchInnovationsLayoutPage } from '@/lib/api/innovations_layout';
import InnovationsLayoutPage from '@/components/pages/InnovationsLayoutPage';
import { fetchInsightsHubPage } from '@/lib/api/insights_layout';
import { fetchInsightsListingPage } from '@/lib/api/insights_listing_layout';
import { fetchInsightsArticleDetailPage } from '@/lib/api/insights_article_detail_layout';
import InsightsHubPage from '@/components/pages/InsightsHubPage';
import InsightsListingPage from '@/components/pages/InsightsListingPage';
import InsightsArticleDetailPage from '@/components/pages/InsightsArticleDetailPage';

import {
  getDynamicPageBySlug,
  type DynamicPageData,
} from '@/fake-api/dynamic-pages';
import CareerLandingPage from '@/components/CareerLandingPage';

interface PageProps {
  params: Promise<{
    slug: string[]; // ✅ FIXED (array for nested routes)
  }>;
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

async function fetchPageData(fullSlug: string) {
  return getDynamicPageBySlug(fullSlug); // ✅ now accepts full slug
}

/* ================== SEO ================== */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug?.join('/') || ''; // ✅ MAIN FIX

  /* Dedicated pages must run before generic `/v1/page/{slug}` fetches (e.g. industries) */
  const npdLayout = await fetchNpdLayoutPage(fullSlug);
  if (npdLayout) {
    return buildApiMetadata({
      slug: npdLayout.slug,
      title: npdLayout.title,
      seo: npdLayout.seo || {},
    });
  }

  const pilotPlantLayout = await fetchPilotPlantLayoutPage(fullSlug);
  if (pilotPlantLayout) {
    return buildApiMetadata({
      slug: pilotPlantLayout.slug,
      title: pilotPlantLayout.title,
      seo: pilotPlantLayout.seo || {},
    });
  }

  const innovationsLayout = await fetchInnovationsLayoutPage(fullSlug);
  if (innovationsLayout) {
    return buildApiMetadata({
      slug: innovationsLayout.slug,
      title: innovationsLayout.title,
      seo: innovationsLayout.seo || {},
    });
  }

  const insightsArticleDetail = await fetchInsightsArticleDetailPage(fullSlug);
  if (insightsArticleDetail) {
    return buildApiMetadata({
      slug: insightsArticleDetail.slug,
      title: insightsArticleDetail.title,
      seo: insightsArticleDetail.seo || {},
    });
  }

  const insightsListing = await fetchInsightsListingPage(fullSlug);
  if (insightsListing) {
    return buildApiMetadata({
      slug: insightsListing.slug,
      title: insightsListing.title,
      seo: insightsListing.seo || {},
    });
  }

  const insightsHub = await fetchInsightsHubPage(fullSlug);
  if (insightsHub) {
    return buildApiMetadata({
      slug: insightsHub.slug,
      title: insightsHub.title,
      seo: insightsHub.seo || {},
    });
  }

  const rAndDCentreLayout = await fetchRAndDCentreLayoutPage(fullSlug);
  if (rAndDCentreLayout) {
    return buildApiMetadata({
      slug: rAndDCentreLayout.slug,
      title: rAndDCentreLayout.title,
      seo: rAndDCentreLayout.seo || {},
    });
  }

  const productIndustriesLayout = await fetchProductIndustriesLayoutPage(fullSlug);
  if (productIndustriesLayout) {
    return buildApiMetadata({
      slug: productIndustriesLayout.slug,
      title: productIndustriesLayout.title,
      seo: productIndustriesLayout.seo || {},
    });
  }

  const industryLayout = await fetchProductIndustryDetailLayoutPage(fullSlug);
  if (industryLayout) {
    return buildApiMetadata({
      slug: industryLayout.slug,
      title: industryLayout.title,
      seo: industryLayout.seo || {},
    });
  }

  if (fullSlug.startsWith('products/category/')) {
    const categorySlug = fullSlug.replace(/^products\/category\//, '').split('/')[0] || '';
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
      return {
        title: 'Category Not Found',
        description: 'The requested category could not be found.',
      };
    }

    const seo = (category as any).seo as any;
    const canonicalUrl = seo?.canonical_url
      ? getCanonicalUrl(seo.canonical_url)
      : getCanonicalUrl(`/products/category/${categorySlug}`);

    return {
      title:
        seo?.meta_title ||
        `${(category as any).name} | Lamipak - Premium Packaging Solutions`,
      description:
        seo?.meta_description ||
        (category as any).description ||
        `Explore our ${(category as any).name.toLowerCase()} products and solutions.`,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title:
          seo?.og_title ||
          seo?.meta_title ||
          `${(category as any).name} | Lamipak`,
        description:
          seo?.og_description ||
          seo?.meta_description ||
          (category as any).description ||
          `Explore our ${(category as any).name.toLowerCase()} products.`,
        images: seo?.og_image
          ? [seo.og_image]
          : (category as any).image
            ? [(category as any).image]
            : [],
        url: canonicalUrl,
        type: 'website',
      },
      twitter: {
        card:
          (seo?.twitter_card as
            | 'summary_large_image'
            | 'summary'
            | 'player'
            | 'app') || 'summary_large_image',
        title:
          seo?.twitter_title ||
          seo?.meta_title ||
          `${(category as any).name} | Lamipak`,
        description:
          seo?.twitter_description ||
          seo?.meta_description ||
          (category as any).description ||
          `Explore our ${(category as any).name.toLowerCase()} products.`,
        images: seo?.twitter_image
          ? [seo.twitter_image]
          : (category as any).image
            ? [(category as any).image]
            : [],
      },
    };
  }

  const governanceLayout = await fetchAboutUsLayout4Page(fullSlug);
  if (governanceLayout) {
    return buildApiMetadata({
      slug: governanceLayout.slug,
      title: governanceLayout.title,
      seo: governanceLayout.seo || {},
    });
  }

  if (fullSlug === 'vision-mission') {
    const page = await fetchAboutUsLayout3Page(fullSlug);
    if (page) {
      return buildApiMetadata({
        slug: page.slug,
        title: page.title,
        seo: page.seo || {},
      });
    }
  }

  const aboutLayout = await fetchAboutUsLayout1Page(fullSlug);
  if (aboutLayout) {
    return buildApiMetadata({
      slug: aboutLayout.slug,
      title: aboutLayout.title,
      seo: aboutLayout.seo || {},
    });
  }

  const introductionLayout = await fetchAboutUsLayout2Page(fullSlug);
  if (introductionLayout) {
    return buildApiMetadata({
      slug: introductionLayout.slug,
      title: introductionLayout.title,
      seo: introductionLayout.seo || {},
    });
  }

  const visionLayout = await fetchAboutUsLayout3Page(fullSlug);
  if (visionLayout) {
    return buildApiMetadata({
      slug: visionLayout.slug,
      title: visionLayout.title,
      seo: visionLayout.seo || {},
    });
  }

  const apiPage = await fetchProductCategoriesPage(fullSlug);
  if (apiPage) {
    return buildApiMetadata({
      slug: apiPage.slug,
      title: apiPage.title,
      seo: apiPage.seo,
    });
  }

  const layout5Page = await fetcProductCategoryLayout5Page(fullSlug);
  if (layout5Page) {
    return buildApiMetadata({
      slug: layout5Page.slug,
      title: layout5Page.title,
      seo: layout5Page.seo,
    });
  }

  const layout1Page = await fetcProductCategoryLayout1Page(fullSlug);
  if (layout1Page) {
    return buildApiMetadata({
      slug: layout1Page.slug,
      title: layout1Page.title,
      seo: layout1Page.seo,
    });
  }

  const layout4Page = await fetcProductCategoryLayout4Page(fullSlug);
  if (layout4Page) {
    return buildApiMetadata({
      slug: layout4Page.slug,
      title: layout4Page.title,
      seo: layout4Page.seo,
    });
  }

  const layout2Page = await fetcProductCategoryLayout2Page(fullSlug);
  if (layout2Page) {
    return buildApiMetadata({
      slug: layout2Page.slug,
      title: layout2Page.title,
      seo: layout2Page.seo,
    });
  }

  const layout3Page = await fetcProductCategoryLayout3Page(fullSlug);
  if (layout3Page) {
    return buildApiMetadata({
      slug: layout3Page.slug,
      title: layout3Page.title,
      seo: layout3Page.seo,
    });
  }

  const sustainability1Page = await fetchSustainabilityLayout1Page(fullSlug);
  if (sustainability1Page) {
    return buildApiMetadata({
      slug: sustainability1Page.slug,
      title: sustainability1Page.title,
      seo: sustainability1Page.seo,
    });
  }

  const sustainability2Page = await fetchSustainabilityLayout2Page(fullSlug);
  if (sustainability2Page) {
    return buildApiMetadata({
      slug: sustainability2Page.slug,
      title: sustainability2Page.title,
      seo: sustainability2Page.seo,
    });
  }

  const sustainability3Page = await fetchSustainabilityLayout3Page(fullSlug);
  if (sustainability3Page) {
    return buildApiMetadata({
      slug: sustainability3Page.slug,
      title: sustainability3Page.title,
      seo: sustainability3Page.seo,
    });
  }

  const sustainability4Page = await fetchSustainabilityLayout4Page(fullSlug);
  if (sustainability4Page) {
    return buildApiMetadata({
      slug: sustainability4Page.slug,
      title: sustainability4Page.title,
      seo: sustainability4Page.seo,
    });
  }

  const sustainability5Page = await fetchSustainabilityLayout5Page(fullSlug);
  if (sustainability5Page) {
    return buildApiMetadata({
      slug: sustainability5Page.slug,
      title: sustainability5Page.title,
      seo: sustainability5Page.seo,
    });
  }

  const sustainability6Page = await fetchSustainabilityLayout6Page(fullSlug);
  if (sustainability6Page) {
    return buildApiMetadata({
      slug: sustainability6Page.slug,
      title: sustainability6Page.title,
      seo: sustainability6Page.seo,
    });
  }

  const careerPage = await fetchCareerLayoutPage(fullSlug);
  if (careerPage) {
    return buildApiMetadata({
      slug: careerPage.slug,
      title: careerPage.title,
      seo: careerPage.seo,
    });
  }

  const marketingServicesLayout = await fetchMarketingServicesLayoutPage(fullSlug);
  if (marketingServicesLayout) {
    return buildApiMetadata({
      slug: marketingServicesLayout.slug,
      title: marketingServicesLayout.title,
      seo: marketingServicesLayout.seo || {},
    });
  }

  const marketingServiceDetailLayout = await fetchMarketingServiceDetailLayoutPage(fullSlug);
  if (marketingServiceDetailLayout) {
    return buildApiMetadata({
      slug: marketingServiceDetailLayout.slug,
      title: marketingServiceDetailLayout.title,
      seo: marketingServiceDetailLayout.seo || {},
    });
  }

  const technicalServicesLayout = await fetchTechnicalServicesLayoutPage(fullSlug);
  if (technicalServicesLayout) {
    return buildApiMetadata({
      slug: technicalServicesLayout.slug,
      title: technicalServicesLayout.title,
      seo: technicalServicesLayout.seo || {},
    });
  }
  
  const technicalServiceDetailLayout = await fetchTechnicalServiceDetailLayoutPage(fullSlug);
  if (technicalServiceDetailLayout) {
    return buildApiMetadata({
      slug: technicalServiceDetailLayout.slug,
      title: technicalServiceDetailLayout.title,
      seo: technicalServiceDetailLayout.seo || {},
    });
  }

  const productSlug = slug?.[slug.length - 1];
  const productApiPage = await fetchProductLayoutPage(fullSlug);
  if (productApiPage) {
    const canonicalUrl = productApiPage.seo.canonical_url
      ? getCanonicalUrl(productApiPage.seo.canonical_url)
      : getCanonicalUrl(`/${fullSlug}`);

    return {
      title: productApiPage.seo.meta_title,
      description: productApiPage.seo.meta_description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: productApiPage.seo.og_title || productApiPage.seo.meta_title,
        description: productApiPage.seo.og_description || productApiPage.seo.meta_description,
        images: productApiPage.seo.og_image ? [productApiPage.seo.og_image] : [productApiPage.image],
        url: canonicalUrl,
        type: 'website',
      },
      twitter: {
        card:
          (productApiPage.seo.twitter_card as
            | 'summary_large_image'
            | 'summary'
            | 'player'
            | 'app') || 'summary_large_image',
        title: productApiPage.seo.twitter_title || productApiPage.seo.meta_title,
        description:
          productApiPage.seo.twitter_description || productApiPage.seo.meta_description,
        images: productApiPage.seo.twitter_image
          ? [productApiPage.seo.twitter_image]
          : [productApiPage.image],
      },
    };
  }

  if (productSlug) {
    const productData = await fetchProductData(productSlug);
    if (productData) {
      const canonicalUrl = productData.seo.canonical_url
        ? getCanonicalUrl(productData.seo.canonical_url)
        : getCanonicalUrl(`/${fullSlug}`);

      return {
        title: productData.seo.meta_title,
        description: productData.seo.meta_description,
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: productData.seo.og_title || productData.seo.meta_title,
          description: productData.seo.og_description || productData.seo.meta_description,
          images: productData.seo.og_image ? [productData.seo.og_image] : [productData.image],
          url: canonicalUrl,
          type: 'website',
        },
        twitter: {
          card:
            (productData.seo.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') ||
            'summary_large_image',
          title: productData.seo.twitter_title || productData.seo.meta_title,
          description: productData.seo.twitter_description || productData.seo.meta_description,
          images: productData.seo.twitter_image ? [productData.seo.twitter_image] : [productData.image],
        },
      };
    }
  }

  const subCategoryMock =
    slug?.length === 1 ? await getSubCategoryPage(PACKAGING_MAIN, slug[0]) : null;
  if (subCategoryMock) {
    return {
      title: subCategoryMock.seo?.meta_title || subCategoryMock.title,
      description: subCategoryMock.seo?.meta_description,
      alternates: {
        canonical: getCanonicalUrl(`/${slug[0]}`),
      },
    };
  }

  const data = await fetchPageData(fullSlug);

  if (!data) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const seo = data.seo;

  const canonicalPath = seo?.canonical_path || `/${fullSlug}`;
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  const title = seo?.meta_title || data.title;
  const description =
    seo?.meta_description || data.content?.toString().slice(0, 150) || undefined;

  return {
    title,
    description,
    keywords: seo?.keywords,
    authors: seo?.author ? [{ name: seo.author }] : undefined,
    robots: seo?.robots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: canonicalUrl,
      type: seo?.og_type || 'website',
      images: seo?.og_image ? [seo.og_image] : undefined,
    },
    twitter: {
      card: seo?.twitter_card || 'summary_large_image',
      title: seo?.twitter_title || title,
      description: seo?.twitter_description || description,
      images: seo?.twitter_image ? [seo.twitter_image] : undefined,
    },
  };
}

/* ================== PAGE ================== */
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const fullSlug = slug?.join('/') || ''; // ✅ MAIN FIX

  const npdLayout = await fetchNpdLayoutPage(fullSlug);
  if (npdLayout) {
    return <NpdLayoutPage data={npdLayout.page} />;
  }

  const pilotPlantLayout = await fetchPilotPlantLayoutPage(fullSlug);
  if (pilotPlantLayout) {
    return <PilotPlantLayoutPage data={pilotPlantLayout.page} />;
  }

  const innovationsLayout = await fetchInnovationsLayoutPage(fullSlug);
  if (innovationsLayout) {
    return <InnovationsLayoutPage data={innovationsLayout.page} />;
  }

  const insightsArticleDetail = await fetchInsightsArticleDetailPage(fullSlug);
  if (insightsArticleDetail) {
    return <InsightsArticleDetailPage data={insightsArticleDetail.page} />;
  }

  const insightsListing = await fetchInsightsListingPage(fullSlug);
  if (insightsListing) {
    return <InsightsListingPage data={insightsListing.page} />;
  }

  const insightsHub = await fetchInsightsHubPage(fullSlug);
  if (insightsHub) {
    return <InsightsHubPage data={insightsHub.page} />;
  }

  const rAndDCentreLayout = await fetchRAndDCentreLayoutPage(fullSlug);
  if (rAndDCentreLayout) {
    return <RAndDCentreLayoutPage data={rAndDCentreLayout.page} />;
  }

  const productIndustriesLayout = await fetchProductIndustriesLayoutPage(fullSlug);
  if (productIndustriesLayout) {
    return <ProductIndustriesLayoutPage data={productIndustriesLayout.page} />;
  }

  const industryLayout = await fetchProductIndustryDetailLayoutPage(fullSlug);
  if (industryLayout) {
    return <ProductIndustryDetailLayoutPageSection data={industryLayout.page} />;
  }

  if (fullSlug.startsWith('products/category/')) {
    const categorySlug = fullSlug.replace(/^products\/category\//, '').split('/')[0] || '';
    const category = (await getCategoryBySlug(categorySlug)) as ProductCategory | null;
    if (!category) notFound();
    const products = await getProductsByCategory(categorySlug);
    return <ProductCategoryPageSection category={category} products={products} />;
  }

  const governanceLayout = await fetchAboutUsLayout4Page(fullSlug);
  if (governanceLayout) {
    return (
      <GovernanceManagementLayoutPageSection
        data={governanceLayout.page}
        activePath={`/${fullSlug}`}
      />
    );
  }

  const visionLayout = await fetchAboutUsLayout3Page(fullSlug);
  if (visionLayout) {
    return <VisionMissionLayoutPageSection data={visionLayout.page} activePath={`/${fullSlug}`} />;
  }

  const aboutLayout = await fetchAboutUsLayout1Page(fullSlug);
  if (aboutLayout) {
    return (
      <AboutUsPageSection
        hero={aboutLayout.page.hero}
        statistics={aboutLayout.page.statistics}
        journey={aboutLayout.page.journey}
        videoUrl={aboutLayout.page.videoUrl}
        activePath={`/${fullSlug}`}
      />
    );
  }

  const introductionLayout = await fetchAboutUsLayout2Page(fullSlug);
  if (introductionLayout) {
    return <IntroductionPageSection data={introductionLayout.page} activePath={`/${fullSlug}`} />;
  }

  // Back-compat fallback for older fake API slugs.
  if (fullSlug === 'vision-mission') {
    const data = await fetchPageData('vision-mission');
    if (!data) notFound();
    return <VisionMissionPageSection data={data} />;
  }

  const apiPage = await fetchProductCategoriesPage(fullSlug);
  if (apiPage) {
    return (
      <ProductCategoriesHubPage
        pageData={apiPage.pageData as any}
        videoUrl={apiPage.videoUrl}
        pageContext={{
          mainCategory: apiPage.slug,
        }}
      />
    );
  }

  const layout5Page = await fetcProductCategoryLayout5Page(fullSlug);
  if (layout5Page) {
    return (
      <PageBuilder
        pageData={layout5Page.pageData as any}
        pageContext={{
          mainCategory: PACKAGING_MAIN,
          subCategory: layout5Page.slug,
        }}
      />
    );
  }

  const layout1Page = await fetcProductCategoryLayout1Page(fullSlug);
  if (layout1Page) {
    return (
      <PageBuilder
        pageData={layout1Page.pageData as any}
        pageContext={{
          mainCategory: PACKAGING_MAIN,
          subCategory: layout1Page.slug,
        }}
      />
    );
  }

  const layout4Page = await fetcProductCategoryLayout4Page(fullSlug);
  if (layout4Page) {
    return (
      <PageBuilder
        pageData={layout4Page.pageData as any}
        pageContext={{
          mainCategory: PACKAGING_MAIN,
          subCategory: layout4Page.slug,
        }}
      />
    );
  }

  const marketingServicesLayout = await fetchMarketingServicesLayoutPage(fullSlug);
  if (marketingServicesLayout) {
    return <MarketingServicesLayoutPage data={marketingServicesLayout.page} />;
  }

  const marketingServiceDetailLayout = await fetchMarketingServiceDetailLayoutPage(fullSlug);
  if (marketingServiceDetailLayout) {
    return <MarketingServiceDetailLayoutPage data={marketingServiceDetailLayout.page} />;
  }

  const technicalServicesLayout = await fetchTechnicalServicesLayoutPage(fullSlug);
  if (technicalServicesLayout) {
    return <TechnicalServicesLayoutPage data={technicalServicesLayout.page} />;
  }

  const technicalServiceDetailLayout = await fetchTechnicalServiceDetailLayoutPage(fullSlug);
  if (technicalServiceDetailLayout) {
    return <TechnicalServiceDetailLayoutPage data={technicalServiceDetailLayout.page} />;
  }

  const productApiPage = await fetchProductLayoutPage(fullSlug);
  if (productApiPage) {
    return <ProductDetailLayout product={productApiPage} slugPath={fullSlug} />;
  }

  const layout2Page = await fetcProductCategoryLayout2Page(fullSlug);
  if (layout2Page) {
    return (
      <PageBuilder
        pageData={layout2Page.pageData as any}
        pageContext={{
          mainCategory: PACKAGING_MAIN,
          subCategory: layout2Page.slug,
        }}
      />
    );
  }

  const layout3Page = await fetcProductCategoryLayout3Page(fullSlug);
  if (layout3Page) {
    return (
      <PageBuilder
        pageData={layout3Page.pageData as any}
        pageContext={{
          mainCategory: PACKAGING_MAIN,
          subCategory: layout3Page.slug,
        }}
      />
    );
  }

  const sustainability1Page = await fetchSustainabilityLayout1Page(fullSlug);
  if (sustainability1Page) {
    return <PickCartoonPage data={sustainability1Page.pageData} />;
  }

  const sustainability2Page = await fetchSustainabilityLayout2Page(fullSlug);
  if (sustainability2Page) {
    return <LamiraPage data={sustainability2Page.pageData} />;
  }

  const sustainability3Page = await fetchSustainabilityLayout3Page(fullSlug);
  if (sustainability3Page) {
    return <GreenEffortsPage data={sustainability3Page.pageData} />;
  }

  const sustainability4Page = await fetchSustainabilityLayout4Page(fullSlug);
  if (sustainability4Page) {
    return <CertificationsAchievementsPage data={sustainability4Page.pageData} />;
  }

  const sustainability5Page = await fetchSustainabilityLayout5Page(fullSlug);
  if (sustainability5Page) {
    return <NgosPage data={sustainability5Page.pageData} />;
  }

  const sustainability6Page = await fetchSustainabilityLayout6Page(fullSlug);
  if (sustainability6Page) {
    return <CarbonNetZeroRoadmapPage data={sustainability6Page.pageData} />;
  }

  const careerLayoutPage = await fetchCareerLayoutPage(fullSlug);
  if (careerLayoutPage) {
    return <CareerLandingPage data={careerLayoutPage.pageData} />;
  }
  
  const productSlug = slug?.[slug.length - 1];
  if (productSlug) {
    const productData = await fetchProductData(productSlug);
    if (productData) {
      return <ProductDetailLayout product={productData} slugPath={fullSlug} />;
    }
  }

  if (slug?.length === 1) {
    const subCategoryPage = await getSubCategoryPage(PACKAGING_MAIN, slug[0]);
    if (subCategoryPage) {
      return (
        <PageBuilder
          pageData={subCategoryPage}
          pageContext={{
            mainCategory: PACKAGING_MAIN,
            subCategory: slug[0],
          }}
        />
      );
    }
  }

  const data = await fetchPageData(fullSlug);

  if (!data) {
    notFound();
  }

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