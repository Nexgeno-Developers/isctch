import Image from 'next/image';
import Link from 'next/link';
import { fetchHomepageData } from '@/lib/api';
import type { SustainabilityProductCard } from '@/fake-api/homepage';

/**
 * Product Sustainability Series Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the section with product cards.
 */
export default async function ProductSustainabilitySeries() {
  const homepageData = await fetchHomepageData();
  const data = homepageData.productSustainability;
  const cardsPerView = 3;
  const visibleCards = data.products.slice(0, cardsPerView);

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Blue Gradient Container */}
        <div className="rounded-[50px] bg-gradient-to-b from-[#009FE8] to-[#0077B6] p-8 md:p-12 lg:p-16">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12 md:mb-16">
            Product Sustainability Series
          </h2>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {visibleCards.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Product Card Component
 */
function ProductCard({ product }: { product: SustainabilityProductCard }) {
  return (
    <div className="bg-white rounded-[50px] overflow-hidden transition-shadow duration-300 h-full p-[15px]">
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden rounded-[50px]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Label */}
        <span className="inline-block text-[#009FE8] text-sm md:text-base font-medium mb-3">
          {product.label}
        </span>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* CTA Link */}
        <Link
          href={product.link}
          className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-medium hover:text-[#0077B6] transition-colors group"
        >
          {product.ctaText}
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
