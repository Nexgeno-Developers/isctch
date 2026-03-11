import type { ProductData } from '@/fake-api/products';
import ProductAccessoriesSliderClient from './ProductAccessoriesSliderClient';

interface ProductAccessoriesProps {
  accessories: ProductData['accessories'];
}

/**
 * Product Accessories Component (Server Component)
 * 
 * Displays product accessories in an interactive slider.
 * All data is fetched server-side from the API.
 */
export default function ProductAccessories({ accessories }: ProductAccessoriesProps) {
  if (!accessories || accessories.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 md:py-8">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          Accessories
        </h2>

        {/* Accessories Slider */}
        <ProductAccessoriesSliderClient accessories={accessories} />
      </div>
    </section>
  );
}
