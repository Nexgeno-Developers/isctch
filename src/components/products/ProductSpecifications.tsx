import type { ProductData } from '@/fake-api/products';
import ProductSpecificationsClient from './ProductSpecificationsClient';

interface ProductSpecificationsProps {
  product: ProductData;
}

/**
 * Product Specifications Section Component (Server Component)
 * 
 * Displays product visualization, sizes, quick specifications, and compatibility.
 * All data is fetched server-side from the API.
 */
export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  return <ProductSpecificationsClient product={product} />;
}
