import type { ProductData } from '@/fake-api/products';
import ProductFeaturesSliderClient from './ProductFeaturesSliderClient';

interface ProductFeaturesProps {
  features: ProductData['productFeatures'];
}

/**
 * Product Features Component (Server Component)
 * 
 * Displays product features in a Swiper slider.
 * All data is fetched server-side from the API.
 */
export default function ProductFeatures({ features }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 md:py-8">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          Product Features
        </h2>

        {/* Features Slider */}
        <ProductFeaturesSliderClient features={features} />
      </div>
    </section>
  );
}
