import { fetchProductData, getAllProductSlugs } from '@/lib/api';
import { formatBoldText } from '@/lib/htmlText';
import SimilarProductsSliderClient from './SimilarProductsSliderClient';
import type { ProductData } from '@/fake-api/products';

interface SimilarProductsProps {
  currentProductSlug?: string;
  /** From API `autofetch.related_products` (see `fetchProductLayoutPage`). When set, skips listing all products. */
  relatedProductCards?: ProductData[];
}

/**
 * Similar Products Component (Server Component)
 *
 * Prefer `relatedProductCards` from the product page API when present.
 * Otherwise fetches all product slugs and displays them (excluding the current product).
 */
export default async function SimilarProducts({
  currentProductSlug,
  relatedProductCards,
}: SimilarProductsProps) {
  if (relatedProductCards !== undefined) {
    if (relatedProductCards.length === 0) {
      return null;
    }

    return (
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12 relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-black">Similar Products</span>
            </h2>
          </div>

          <SimilarProductsSliderClient products={relatedProductCards} />
        </div>
      </section>
    );
  }

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
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header with Title and Arrows */}
        <div className="flex items-center justify-between mb-8 md:mb-12 relative">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-black">Similar Products</span>
          </h2>
        </div>

        {/* Similar Products Slider */}
        <SimilarProductsSliderClient products={validProducts} />
      </div>
    </section>
  );
}
