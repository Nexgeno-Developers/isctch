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
import { getCanonicalUrl } from '@/config/site';

// Re-export types for convenience
export type { ProductData, ProductCategory };
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
