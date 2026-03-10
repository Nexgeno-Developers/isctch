import { fetchProductData } from '@/lib/api';
import SimilarProductsSliderClient from './SimilarProductsSliderClient';
import type { ProductData } from '@/fake-api/products';

interface SimilarProductsProps {
  relatedProductSlugs: string[];
}

/**
 * Similar Products Component (Server Component)
 * 
 * Fetches product data for related products and displays them in a slider.
 * All data is fetched server-side from the API.
 */
export default async function SimilarProducts({ relatedProductSlugs }: SimilarProductsProps) {
  if (!relatedProductSlugs || relatedProductSlugs.length === 0) {
    return null;
  }

  // Fetch product data for all related products
  const products = await Promise.all(
    relatedProductSlugs.map(async (slug) => {
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
    <section className="bg-white py-12 md:py-16">
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
