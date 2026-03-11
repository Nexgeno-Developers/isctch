import type { ProductData } from '@/fake-api/products';
import ProductImageTabs from './ProductImageTabs';

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

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Side - Product Visualization */}
          <ProductImageTabs
            productImage3D={product.productImage3D}
            imageAlt={product.imageAlt}
            applicationImages={product.applicationImages}
            applications={product.applications}
          />

          {/* Right Side - Product Information */}
          <div>
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-4">
              {product.title}
            </h2>

            {/* Description */}
            {product.description && (
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed border-b border-gray-200 pb-8">
                {product.description}
              </p>
            )}

            {/* Size & Formats */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8 border-b border-gray-200 pb-8">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Size & Formats
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border-2 border-[#009FE8] text-[#009FE8] rounded-lg text-base md:text-lg font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Specifications */}
            {product.quickSpecifications && product.quickSpecifications.length > 0 && (
              <div className="mb-8 border-b border-gray-200 pb-8">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Quick Specifications
                </h3>
                <dl className="space-y-3">
                  {product.quickSpecifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <dt className="text-base md:text-lg text-gray-700 font-medium pr-4">
                        {spec.label}:
                      </dt>
                      <dd className="text-base md:text-lg text-[#009FE8] font-semibold text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Compatible With */}
            {product.compatibleWith && product.compatibleWith.length > 0 && (
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Compatible With
                </h3>
                <ul className="space-y-2">
                  {product.compatibleWith.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-[#009FE8] mr-2 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base md:text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
