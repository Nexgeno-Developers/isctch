import Image from 'next/image';
import type { ProductCategory } from '@/fake-api/categories';

interface CategoryGlobalImpactProps {
  data: ProductCategory['globalImpact'];
}

/**
 * Category Global Impact Section Component (Server Component)
 * 
 * Displays a two-column section with image on left and content on right.
 * Shows global impact information for the category.
 * Data comes from server-side API.
 */
export default function CategoryGlobalImpact({ data }: CategoryGlobalImpactProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="bg-gray-50 pt-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative w-full overflow-hidden rounded-[50px]">
            <Image
              src={data.image}
              alt={data.imageAlt}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-4 md:space-y-6">
            {/* Label */}
            <p className="text-sm md:text-base lg:text-lg text-[#009FE8] uppercase tracking-wider font-medium">
              {data.label}
            </p>

            {/* Main Heading */}
            <h2 className="text-[22px] md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#009FE8] leading-tight">
              {data.heading}
            </h2>

            {/* Features List */}
            <ul className="space-y-2 md:space-y-5">
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  {/* Blue Checkmark Icon */}
                  <svg
                    className="w-4 h-4 md:w-7 md:h-7 text-[#009FE8] flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {/* Feature Text */}
                  <span className="text-sm md:text-lg lg:text-xl text-black font-medium leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
