import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import { getCanonicalUrl } from '@/config/site';

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
import { fetchProductCategoriesPage } from '@/lib/api/product_categories';
import { fetcProductCategoryLayout5Page } from '@/lib/api/product_category_layout_5';
import { fetcProductCategoryLayout1Page } from '@/lib/api/product_category_layout_1';
import { fetcProductCategoryLayout2Page } from '@/lib/api/product_category_layout_2';
import { fetcProductCategoryLayout4Page } from '@/lib/api/product_category_layout_4';
import { fetchProductData } from '@/lib/api';
import { buildApiMetadata } from '@/components/seo/buildApiMetadata';
import { getSubCategoryPage } from '@/fake-api/page-builder';
import ProductDetailLayout from '@/components/products/ProductDetailLayout';

import {
  getDynamicPageBySlug,
  type DynamicPageData,
} from '@/fake-api/dynamic-pages';

interface PageProps {
  params: Promise<{
    slug: string[]; // ✅ FIXED (array for nested routes)
  }>;
}

const PACKAGING_MAIN = 'packaging' as const;

const componentMap: Record<string, ComponentType<{ data: DynamicPageData }>> = {
  lamira1: LamiraPage,
  green: GreenEffortsPage,
  certifications: CertificationsAchievementsPage,
  ngos: NgosPage,
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
  
  const productSlug = slug?.[slug.length - 1];
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

  const apiPage = await fetchProductCategoriesPage(fullSlug);
  if (apiPage) {
    return (
      <PageBuilder
        pageData={apiPage.pageData as any}
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

  const Component = componentMap[data.type] || CmsPage;

  return <Component data={data} />;
}