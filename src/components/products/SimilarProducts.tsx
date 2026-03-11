import { fetchProductData, getAllProductSlugs } from '@/lib/api';
import SimilarProductsSliderClient from './SimilarProductsSliderClient';
import type { ProductData } from '@/fake-api/products';

interface SimilarProductsProps {
  currentProductSlug?: string;
}

/**
 * Similar Products Component (Server Component)
 * 
 * Fetches all products and displays them in a slider, excluding the current product.
 * All data is fetched server-side from the API.
 */
export default async function SimilarProducts({ currentProductSlug }: SimilarProductsProps) {
  // Fetch all product slugs
  const slugs = await getAllProductSlugs();
  
  // Filter out current product if provided
  const productSlugs = currentProductSlug 
    ? slugs.filter(slug => slug !== currentProductSlug)
    : slugs;

  if (productSlugs.length === 0) {
    return null;
  }

  // Fetch product data for all products
  const products = await Promise.all(
    productSlugs.map(async (slug) => {
      const product = await fetchProductData(slug);
      return product;
    })
  );

  // Filter out any null values (products that don't exist)
  const validProducts = products.filter((product): product is ProductData => product !== null);

  if (validProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Section Header with Title and Arrows */}
        <div className="flex items-center justify-between mb-8 md:mb-12 relative">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#009FE8]">Similar</span>{' '}
            <span className="text-gray-900">Products</span>
          </h2>
        </div>

        {/* Similar Products Slider */}
        <SimilarProductsSliderClient products={validProducts} />
      </div>
    </section>
  );
}
