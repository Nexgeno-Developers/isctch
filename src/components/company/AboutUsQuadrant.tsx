import Image from 'next/image';
import type { AboutUsQuadrantSection } from '@/fake-api/company';

interface AboutUsQuadrantProps {
  data: AboutUsQuadrantSection;
}

/**
 * About Us Quadrant Section Component (Server Component)
 * 
 * Displays a four-quadrant layout:
 * - Top Left: Text content
 * - Top Right: Image
 * - Bottom Left: Image
 * - Bottom Right: Text content
 * 
 * Full width section with no container constraints.
 */
export default function AboutUsQuadrant({ data }: AboutUsQuadrantProps) {
  return (
    <section className="w-full bg-white">
      {/* Four Quadrant Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Top Left - Text Content */}
        <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-20 bg-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className="text-[#009FE8]">{data.topLeft.titleHighlight}</span>
              <span className="text-gray-900">
                {data.topLeft.title.replace(data.topLeft.titleHighlight, '').trim()}
              </span>
            </h2>
            {data.topLeft.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-base md:text-lg text-gray-700 leading-relaxed ${
                  index < data.topLeft.paragraphs.length - 1 ? 'mb-4 md:mb-6' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Top Right - Image */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[400px] lg:min-h-[500px]">
          {data.topRight.image ? (
            <Image
              src={data.topRight.image}
              alt={data.topRight.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Bottom Left - Image */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[400px] lg:min-h-[500px] order-3 lg:order-3">
          {data.bottomLeft.image ? (
            <Image
              src={data.bottomLeft.image}
              alt={data.bottomLeft.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        {/* Bottom Right - Text Content */}
        <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-20 bg-white order-4 lg:order-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className="text-gray-900">
                {data.bottomRight.title.split(data.bottomRight.titleHighlight)[0]}
              </span>
              <span className="text-[#009FE8]">{data.bottomRight.titleHighlight}</span>
            </h2>
            {data.bottomRight.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-base md:text-lg text-gray-700 leading-relaxed ${
                  index < data.bottomRight.paragraphs.length - 1 ? 'mb-4 md:mb-6' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
