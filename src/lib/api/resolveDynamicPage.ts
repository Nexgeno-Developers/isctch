import { cache } from 'react';
import type { Metadata } from 'next';

import { buildApiMetadata } from '@/components/seo/buildApiMetadata';
import { getCanonicalUrl } from '@/config/site';
import type { ProductCategory, ProductData } from '@/lib/api';
import {
  fetchProductData,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/api';
import { fetchProductLayoutPage } from '@/lib/api/product_layout_products';
import { fetchProductCategoriesPage } from '@/lib/api/product_categories';
import { fetcProductCategoryLayout5Page } from '@/lib/api/product_category_layout_5';
import { fetcProductCategoryLayout1Page } from '@/lib/api/product_category_layout_1';
import { fetcProductCategoryLayout2Page } from '@/lib/api/product_category_layout_2';
import { fetcProductCategoryLayout3Page } from '@/lib/api/product_category_layout_3';
import { fetcProductCategoryLayout4Page } from '@/lib/api/product_category_layout_4';
import { fetchSustainabilityLayout1Page } from '@/lib/api/sustainability_layout_1';
import { fetchSustainabilityLayout2Page } from '@/lib/api/sustainability_layout_2';
import { fetchSustainabilityLayout3Page } from '@/lib/api/sustainability_layout_3';
import { fetchSustainabilityLayout4Page } from '@/lib/api/sustainability_layout_4';
import { fetchSustainabilityLayout5Page } from '@/lib/api/sustainability_layout_5';
import { fetchSustainabilityLayout6Page } from '@/lib/api/sustainability_layout_6';
import { fetchCareerLayoutPage } from '@/lib/api/career_layout';
import { fetchMarketingServicesLayoutPage } from '@/lib/api/marketing_services_layout';
import { fetchMarketingServiceDetailLayoutPage } from '@/lib/api/marketing_service_detail_layout';
import { fetchTechnicalServicesLayoutPage } from '@/lib/api/technical_services_layout';
import { fetchTechnicalServiceDetailLayoutPage } from '@/lib/api/technical_service_detail_layout';
import { fetchProductIndustryDetailLayoutPage } from '@/lib/api/product_industry_detail_layout';
import { fetchProductIndustriesLayoutPage } from '@/lib/api/product_industries_layout';
import { fetchRAndDCentreLayoutPage } from '@/lib/api/r_and_d_centre_layout';
import { fetchNpdLayoutPage } from '@/lib/api/npd_layout';
import { fetchPilotPlantLayoutPage } from '@/lib/api/pilot_plant_layout';
import { fetchInnovationsLayoutPage } from '@/lib/api/innovations_layout';
import { fetchInsightsHubPage } from '@/lib/api/insights_layout';
import { fetchInsightsListingPage } from '@/lib/api/insights_listing_layout';
import {
  fetchInsightsArticleDetailPage,
  fetchPostDetailPage,
  isInsightsArticleDetailPath,
} from '@/lib/api/insights_article_detail_layout';
import { fetchAboutUsLayout1Page } from '@/lib/api/about_us_layout_1';
import { fetchAboutUsLayout2Page } from '@/lib/api/about_us_layout_2';
import { fetchAboutUsLayout3Page } from '@/lib/api/about_us_layout_3';
import { fetchAboutUsLayout4Page } from '@/lib/api/about_us_layout_4';

import { getSubCategoryPage } from '@/fake-api/page-builder';
import { getDynamicPageBySlug, type DynamicPageData } from '@/fake-api/dynamic-pages';
import { probePageLayout } from '@/lib/api/pageLayoutProbe';

const PACKAGING_MAIN = 'packaging' as const;

export type ApiLayoutPayload = {
  slug: string;
  title: string;
  seo?: Record<string, unknown> | null;
  page?: any;
  pageData?: any;
  videoUrl?: any;
  [key: string]: unknown;
};

export type ResolvedDynamicPage =
  | {
      kind: 'api-layout';
      layout: string;
      payload: ApiLayoutPayload;
      metadata: Metadata;
    }
  | {
      kind: 'product-category';
      category: ProductCategory;
      products: ProductData[];
      metadata: Metadata;
    }
  | {
      kind: 'product';
      product: ProductData;
      slugPath: string;
      metadata: Metadata;
    }
  | {
      kind: 'sub-category';
      pageData: unknown;
      subCategory: string;
      metadata: Metadata;
    }
  | {
      kind: 'legacy-vision-mission';
      page: DynamicPageData;
      metadata: Metadata;
    }
  | {
      kind: 'dynamic';
      page: DynamicPageData;
      metadata: Metadata;
    }
  | {
      kind: 'not-found';
      metadata: Metadata;
    };

const NOT_FOUND_METADATA: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
};

const CATEGORY_NOT_FOUND_METADATA: Metadata = {
  title: 'Category Not Found',
  description: 'The requested category could not be found.',
};

function isInsightsHubPath(cleanSlug: string): boolean {
  return cleanSlug === 'insights';
}

function isInsightsListingPath(cleanSlug: string): boolean {
  return (
    cleanSlug.startsWith('insights/articles') ||
    cleanSlug.startsWith('insights/webinars') ||
    cleanSlug.startsWith('insights/webinar') ||
    cleanSlug.startsWith('media/') ||
    cleanSlug.startsWith('insights/newsletter')
  );
}

function buildApiLayoutMetadata(payload: {
  slug: string;
  title: string;
  seo?: Record<string, unknown> | null;
}): Metadata {
  return buildApiMetadata({
    slug: payload.slug,
    title: payload.title,
    seo: (payload.seo || {}) as any,
  });
}

function buildCategoryMetadata(category: ProductCategory, categorySlug: string): Metadata {
  const seo = (category as any).seo as any;
  const name = (category as any).name || categorySlug;
  const description =
    seo?.meta_description ||
    (category as any).description ||
    `Explore our ${String(name).toLowerCase()} products and solutions.`;

  const canonicalUrl = seo?.canonical_url
    ? getCanonicalUrl(seo.canonical_url)
    : getCanonicalUrl(`/products/category/${categorySlug}`);

  const title =
    seo?.meta_title || `${name} | Lamipak - Premium Packaging Solutions`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo?.og_title || seo?.meta_title || `${name} | Lamipak`,
      description:
        seo?.og_description ||
        seo?.meta_description ||
        (category as any).description ||
        `Explore our ${String(name).toLowerCase()} products.`,
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
      title: seo?.twitter_title || seo?.meta_title || `${name} | Lamipak`,
      description:
        seo?.twitter_description ||
        seo?.meta_description ||
        (category as any).description ||
        `Explore our ${String(name).toLowerCase()} products.`,
      images: seo?.twitter_image
        ? [seo.twitter_image]
        : (category as any).image
          ? [(category as any).image]
          : [],
    },
  };
}

function buildProductMetadata(product: ProductData, slugPath: string): Metadata {
  const seo = product.seo || {};
  const canonicalUrl = seo.canonical_url
    ? getCanonicalUrl(seo.canonical_url)
    : getCanonicalUrl(`/${slugPath}`);

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      images: seo.og_image
        ? [seo.og_image]
        : product.image
          ? [product.image]
          : undefined,
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card:
        (seo.twitter_card as
          | 'summary_large_image'
          | 'summary'
          | 'player'
          | 'app') || 'summary_large_image',
      title: seo.twitter_title || seo.meta_title,
      description: seo.twitter_description || seo.meta_description,
      images: seo.twitter_image
        ? [seo.twitter_image]
        : product.image
          ? [product.image]
          : undefined,
    },
  };
}

function buildSubCategoryMetadata(pageData: any, slug: string): Metadata {
  return {
    title: pageData?.seo?.meta_title || pageData?.title,
    description: pageData?.seo?.meta_description,
    alternates: {
      canonical: getCanonicalUrl(`/${slug}`),
    },
  };
}

function buildDynamicMetadata(data: DynamicPageData, fullSlug: string): Metadata {
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
    robots: seo?.robots as Metadata['robots'],
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

async function resolveApiLayout(
  layout: string,
  fullSlug: string,
  page: number,
): Promise<ResolvedDynamicPage | null> {
  // Add new CMS layouts here (blog, post, post_category) to keep routing centralized.
  switch (layout) {
    case 'npd':
    case 'innovation_detail_1': {
      const page = await fetchNpdLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'pilot_plant':
    case 'innovation_detail_2': {
      const page = await fetchPilotPlantLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'innovation': {
      const page = await fetchInnovationsLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'insights_article_detail': {
      const page = await fetchInsightsArticleDetailPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'default_post_detail': {
      const page = await fetchPostDetailPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout: 'insights_article_detail',
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'insights_listing': {
      const listing = await fetchInsightsListingPage(fullSlug, page);
      if (!listing) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: listing,
        metadata: buildApiLayoutMetadata(listing),
      };
    }
    case 'insights': {
      const page = await fetchInsightsHubPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'insights_n_media': {
      const page = await fetchInsightsHubPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout: 'insights',
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'rnd_center': {
      const page = await fetchRAndDCentreLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_industries': {
      const page = await fetchProductIndustriesLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_industry_detail': {
      const page = await fetchProductIndustryDetailLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'about_4': {
      const page = await fetchAboutUsLayout4Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'about_3': {
      const page = await fetchAboutUsLayout3Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'about_1': {
      const page = await fetchAboutUsLayout1Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'about_2': {
      const page = await fetchAboutUsLayout2Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_categories': {
      const page = await fetchProductCategoriesPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_category_detail_5': {
      const page = await fetcProductCategoryLayout5Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_category_detail_1': {
      const page = await fetcProductCategoryLayout1Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_category_detail_4': {
      const page = await fetcProductCategoryLayout4Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_category_detail_2': {
      const page = await fetcProductCategoryLayout2Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'product_category_detail_3': {
      const page = await fetcProductCategoryLayout3Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'sustainability_1': {
      const page = await fetchSustainabilityLayout1Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'sustainability_2': {
      const page = await fetchSustainabilityLayout2Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'sustainability_3': {
      const page = await fetchSustainabilityLayout3Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'sustainability_4': {
      const page = await fetchSustainabilityLayout4Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'sustainability_5': {
      const page = await fetchSustainabilityLayout5Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'sustainability_6': {
      const page = await fetchSustainabilityLayout6Page(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'career': {
      const page = await fetchCareerLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'marketing_services': {
      const page = await fetchMarketingServicesLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'marketing_service_detail': {
      const page = await fetchMarketingServiceDetailLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'technical_services': {
      const page = await fetchTechnicalServicesLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'technical_service_detail': {
      const page = await fetchTechnicalServiceDetailLayoutPage(fullSlug);
      if (!page) return null;
      return {
        kind: 'api-layout',
        layout,
        payload: page,
        metadata: buildApiLayoutMetadata(page),
      };
    }
    case 'products': {
      const product = await fetchProductLayoutPage(fullSlug);
      if (!product) return null;
      return {
        kind: 'product',
        product,
        slugPath: fullSlug,
        metadata: buildProductMetadata(product, fullSlug),
      };
    }
    default:
      return null;
  }
}

export const resolveDynamicPage = cache(
  async (fullSlug: string, page: number = 1): Promise<ResolvedDynamicPage> => {
    const cleanSlug = fullSlug.replace(/^\/+|\/+$/g, '');
    const segments = cleanSlug ? cleanSlug.split('/').filter(Boolean) : [];

    if (!cleanSlug) {
      return { kind: 'not-found', metadata: NOT_FOUND_METADATA };
    }

    if (cleanSlug.startsWith('products/category/')) {
      const categorySlug =
        cleanSlug.replace(/^products\/category\//, '').split('/')[0] || '';
      if (!categorySlug) {
        return { kind: 'not-found', metadata: CATEGORY_NOT_FOUND_METADATA };
      }

      const category = await getCategoryBySlug(categorySlug);
      if (!category) {
        return { kind: 'not-found', metadata: CATEGORY_NOT_FOUND_METADATA };
      }

      const products = await getProductsByCategory(categorySlug);
      return {
        kind: 'product-category',
        category,
        products,
        metadata: buildCategoryMetadata(category, categorySlug),
      };
    }

    const probe = await probePageLayout(cleanSlug);
    if (probe?.layout) {
      const resolved = await resolveApiLayout(probe.layout, cleanSlug, page);
      if (resolved) return resolved;
    }

    if (isInsightsHubPath(cleanSlug)) {
      const hub = await fetchInsightsHubPage(cleanSlug);
      if (hub) {
        return {
          kind: 'api-layout',
          layout: 'insights',
          payload: hub,
          metadata: buildApiLayoutMetadata(hub),
        };
      }
    }

    if (isInsightsListingPath(cleanSlug)) {
      const listing = await fetchInsightsListingPage(cleanSlug, page);
      if (listing) {
        return {
          kind: 'api-layout',
          layout: 'insights_listing',
          payload: listing,
          metadata: buildApiLayoutMetadata(listing),
        };
      }
    }

    if (segments.length >= 2) {
      const listing = await fetchInsightsListingPage(cleanSlug, page);
      if (listing) {
        return {
          kind: 'api-layout',
          layout: 'insights_listing',
          payload: listing,
          metadata: buildApiLayoutMetadata(listing),
        };
      }
    }

    if (isInsightsArticleDetailPath(cleanSlug)) {
      const detail = await fetchInsightsArticleDetailPage(cleanSlug);
      if (detail) {
        return {
          kind: 'api-layout',
          layout: 'insights_article_detail',
          payload: detail,
          metadata: buildApiLayoutMetadata(detail),
        };
      }
    }

    const postDetail = await fetchPostDetailPage(cleanSlug);
    if (postDetail) {
      return {
        kind: 'api-layout',
        layout: 'insights_article_detail',
        payload: postDetail,
        metadata: buildApiLayoutMetadata(postDetail),
      };
    }

    if (cleanSlug === 'vision-mission') {
      const legacy = await getDynamicPageBySlug('vision-mission');
      if (legacy) {
        return {
          kind: 'legacy-vision-mission',
          page: legacy,
          metadata: buildDynamicMetadata(legacy, cleanSlug),
        };
      }
    }

    const productSlug = segments[segments.length - 1];
    if (productSlug) {
      const product = await fetchProductData(productSlug);
      if (product) {
        return {
          kind: 'product',
          product,
          slugPath: cleanSlug,
          metadata: buildProductMetadata(product, cleanSlug),
        };
      }
    }

    if (segments.length === 1) {
      const subCategory = segments[0];
      const subCategoryPage = await getSubCategoryPage(PACKAGING_MAIN, subCategory);
      if (subCategoryPage) {
        return {
          kind: 'sub-category',
          pageData: subCategoryPage,
          subCategory,
          metadata: buildSubCategoryMetadata(subCategoryPage, subCategory),
        };
      }
    }

    const dynamic = await getDynamicPageBySlug(cleanSlug);
    if (dynamic) {
      return {
        kind: 'dynamic',
        page: dynamic,
        metadata: buildDynamicMetadata(dynamic, cleanSlug),
      };
    }

    return { kind: 'not-found', metadata: NOT_FOUND_METADATA };
  },
);
