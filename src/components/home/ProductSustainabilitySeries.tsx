import { fetchHomepageData } from '@/lib/api/home';
import ProductSustainabilitySeriesClient from './ProductSustainabilitySeriesClient';

/**
 * Product Sustainability Series Component (Server Component)
 * 
 * Fetches homepage data server-side and passes to client component for slider functionality.
 */
export default async function ProductSustainabilitySeries() {
  const homepageData = await fetchHomepageData();
  const data = homepageData.productSustainability;

  return <ProductSustainabilitySeriesClient data={data} />;
}
