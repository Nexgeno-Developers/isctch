/**
 * Central API Helper
 * 
 * This module provides a centralized way to interact with the API.
 * Currently uses fake API functions, but can be easily switched to
 * real API calls when the Laravel backend is ready.
 */

import { API_CONFIG } from '@/config/api';
import { getHomepageData as fakeGetHomepageData, type HomepageData } from '@/fake-api/homepage';
import { getPageData as fakeGetPageData, type PageData } from '@/fake-api/pages';
import { 
  getProductData as fakeGetProductData, 
  getAllProductSlugs as fakeGetAllProductSlugs,
  getProductsByCategory as fakeGetProductsByCategory,
  type ProductData
} from '@/fake-api/products';
import {
  getAllCategories as fakeGetAllCategories,
  getCategoryBySlug as fakeGetCategoryBySlug,
  getAllCategorySlugs as fakeGetAllCategorySlugs,
  type ProductCategory
} from '@/fake-api/categories';
import {
  getTechnicalServiceData as fakeGetTechnicalServiceData,
  getAllTechnicalServices as fakeGetAllTechnicalServices,
  getAllTechnicalServiceSlugs as fakeGetAllTechnicalServiceSlugs,
  type TechnicalServiceData
} from '@/fake-api/technical-services';
import {
  getAllMarketingServices as fakeGetAllMarketingServices,
  getMarketingServiceData as fakeGetMarketingServiceData,
  getAllMarketingServiceSlugs as fakeGetAllMarketingServiceSlugs,
  type MarketingServiceData,
} from '@/fake-api/marketing-services';
import {
  getMarketingServicesOverviewData as fakeGetMarketingServicesOverviewData,
  getMarketingLatestNews as fakeGetMarketingLatestNews,
  getMarketingPressNews as fakeGetMarketingPressNews,
  type MarketingServicesOverview,
  type MarketingNewsItem,
} from '@/fake-api/marketing-services-overview';
import {
  getTechnicalServicesListingData as fakeGetTechnicalServicesListingData,
  type TechnicalServicesListingData
} from '@/fake-api/technical-services-listing';
import {
  getCompanyData as fakeGetCompanyData,
  type CompanyData
} from '@/fake-api/company';
import { getCanonicalUrl } from '@/config/site';

// Re-export types for convenience
export type {
  ProductData,
  ProductCategory,
  TechnicalServiceData,
  TechnicalServicesListingData,
  CompanyData,
  MarketingServiceData,
  MarketingServicesOverview,
  MarketingNewsItem,
};
import { getHeaderData as fakeGetHeaderData, type HeaderData } from '@/fake-api/layout';
import { getFooterData as fakeGetFooterData, type FooterData } from '@/fake-api/layout';

/**
 * Checks if we should use the real API or fake API
 */
const useRealAPI = (): boolean => {
  return Boolean(API_CONFIG.baseUrl);
};

/**
 * Fetches homepage data
 * 
 * @returns Promise<HomepageData>
 */
export async function fetchHomepageData(): Promise<HomepageData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.homepage}`);
    // if (!response.ok) throw new Error('Failed to fetch homepage data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetHomepageData();
}

/**
 * Fetches page data by slug
 * 
 * @param slug - The page slug
 * @returns Promise<PageData | null>
 */
export async function fetchPageData(slug: string): Promise<PageData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.page(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch page data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetPageData(slug);
}

/**
 * Fetches header data
 * 
 * @returns Promise<HeaderData>
 */
export async function fetchHeaderData(): Promise<HeaderData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.header}`);
    // if (!response.ok) throw new Error('Failed to fetch header data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetHeaderData();
}

/**
 * Fetches footer data
 * 
 * @returns Promise<FooterData>
 */
export async function fetchFooterData(): Promise<FooterData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.footer}`);
    // if (!response.ok) throw new Error('Failed to fetch footer data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetFooterData();
}

/**
 * Fetches product data by slug
 * 
 * @param slug - The product slug
 * @returns Promise<ProductData | null>
 */
export async function fetchProductData(slug: string): Promise<ProductData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.product(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch product data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetProductData(slug);
}

/**
 * Gets all product slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllProductSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.products}`);
    // if (!response.ok) throw new Error('Failed to fetch products');
    // const data = await response.json();
    // return data.map((product: ProductData) => product.slug);
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllProductSlugs();
}

/**
 * Gets all product categories
 * 
 * @returns Promise<ProductCategory[]>
 */
export async function getAllCategories(): Promise<ProductCategory[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`);
    // if (!response.ok) throw new Error('Failed to fetch categories');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllCategories();
}

/**
 * Gets category by slug
 * 
 * @param slug - The category slug
 * @returns Promise<ProductCategory | null>
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.category(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch category');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetCategoryBySlug(slug);
}

/**
 * Gets all category slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`);
    // if (!response.ok) throw new Error('Failed to fetch categories');
    // const data = await response.json();
    // return data.map((category: ProductCategory) => category.slug);
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllCategorySlugs();
}

/**
 * Gets products by category slug
 * 
 * @param categorySlug - The category slug
 * @returns Promise<ProductData[]>
 */
export async function getProductsByCategory(categorySlug: string): Promise<ProductData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.productsByCategory(categorySlug)}`);
    // if (!response.ok) throw new Error('Failed to fetch products by category');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetProductsByCategory(categorySlug);
}

/**
 * Fetches technical service data by slug
 * 
 * @param slug - The technical service slug
 * @returns Promise<TechnicalServiceData | null>
 */
export async function fetchTechnicalServiceData(slug: string): Promise<TechnicalServiceData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalService(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch technical service data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetTechnicalServiceData(slug);
}

/**
 * Gets all technical services
 * 
 * @returns Promise<TechnicalServiceData[]>
 */
export async function getAllTechnicalServices(): Promise<TechnicalServiceData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalServices}`);
    // if (!response.ok) throw new Error('Failed to fetch technical services');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllTechnicalServices();
}

/**
 * Gets all technical service slugs (for static generation)
 * 
 * @returns Promise<string[]>
 */
export async function getAllTechnicalServiceSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalServices}`);
    // if (!response.ok) throw new Error('Failed to fetch technical services');
    // const data = await response.json();
    // return data.map((service: TechnicalServiceData) => service.slug);
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetAllTechnicalServiceSlugs();
}

/**
 * Fetches technical services listing page data
 * 
 * @returns Promise<TechnicalServicesListingData>
 */
export async function fetchTechnicalServicesListingData(): Promise<TechnicalServicesListingData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.technicalServicesListing}`);
    // if (!response.ok) throw new Error('Failed to fetch technical services listing data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetTechnicalServicesListingData();
}

/**
 * Fetches company/about us page data
 * 
 * @returns Promise<CompanyData>
 */
export async function fetchCompanyData(): Promise<CompanyData> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.company}`);
    // if (!response.ok) throw new Error('Failed to fetch company data');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }
  
  return fakeGetCompanyData();
}

/**
 * Fetches marketing services overview content (listing hero section)
 *
 * @returns Promise<MarketingServicesOverview>
 */
export async function fetchMarketingServicesOverviewData(): Promise<MarketingServicesOverview> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingServicesOverview}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing services overview');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingServicesOverviewData();
}

/**
 * Fetches latest marketing news for marketing services listing page
 *
 * @returns Promise<MarketingNewsItem[]>
 */
export async function fetchMarketingLatestNews(): Promise<MarketingNewsItem[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingLatestNews}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing latest news');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingLatestNews();
}

/**
 * Fetches press release & event news for marketing services listing page
 *
 * @returns Promise<MarketingNewsItem[]>
 */
export async function fetchMarketingPressNews(): Promise<MarketingNewsItem[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingPressNews}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing press news');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingPressNews();
}

/**
 * Fetches all marketing services
 *
 * @returns Promise<MarketingServiceData[]>
 */
export async function getAllMarketingServices(): Promise<MarketingServiceData[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingServices}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing services');
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllMarketingServices();
}

/**
 * Fetches single marketing service by slug
 *
 * @param slug - The marketing service slug
 * @returns Promise<MarketingServiceData | null>
 */
export async function fetchMarketingServiceData(
  slug: string,
): Promise<MarketingServiceData | null> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingService(slug)}`);
    // if (!response.ok) {
    //   if (response.status === 404) return null;
    //   throw new Error('Failed to fetch marketing service data');
    // }
    // return response.json();
    throw new Error('Real API not yet implemented');
  }

  return fakeGetMarketingServiceData(slug);
}

/**
 * Gets all marketing service slugs (for static generation)
 *
 * @returns Promise<string[]>
 */
export async function getAllMarketingServiceSlugs(): Promise<string[]> {
  if (useRealAPI()) {
    // TODO: Replace with real API call when Laravel backend is ready
    // const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.marketingServices}`);
    // if (!response.ok) throw new Error('Failed to fetch marketing services');
    // const data = await response.json();
    // return data.map((service: MarketingServiceData) => service.slug);
    throw new Error('Real API not yet implemented');
  }

  return fakeGetAllMarketingServiceSlugs();
}

