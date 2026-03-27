import Image from 'next/image';
import type { AboutUsQuadrantSection } from '@/fake-api/company';
import type { ReactNode } from 'react';

interface AboutUsQuadrantProps {
  data: AboutUsQuadrantSection;
  /**
   * Optional slot rendered between the "top row" text/image and the "bottom row"
   * text/image. Used by `/introduction` to show the About Us video.
   */
  videoBetween?: ReactNode;
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
export default function AboutUsQuadrant({ data, videoBetween }: AboutUsQuadrantProps) {
  return (
    <section className="w-full bg-gray-50">
      {/* Top Row (Lamipak: A Global Leader...) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 pb-8 md:pb-10">
        <div className="flex items-center justify-center p-5 md:p-12 lg:p-16 xl:p-16">
          <div className="max-w-2xl">
            <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 leading-tight md:leading-[60px]">
              <span className="text-[#009FE8]">{data.topLeft.titleHighlight}</span>
              <span className="text-black">
                {data.topLeft.title.replace(data.topLeft.titleHighlight, '').trim()}
              </span>
            </h2>
            {data.topLeft.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[14px] md:text-base text-black leading-relaxed ${
                  index < data.topLeft.paragraphs.length - 1 ? 'mb-4 md:mb-6' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative w-full">
          {data.topRight.image ? (
            <div className="relative w-full">
              <Image
                src={data.topRight.image}
                alt={data.topRight.imageAlt}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="w-full h-auto bg-gray-200" style={{ aspectRatio: '4/3' }} />
          )}
        </div>
      </div>

      {/* Slot between top + bottom */}
      {videoBetween ? <div className="bg-gray-50">{videoBetween}</div> : null}

      {/* Bottom Row (Leading the Future...) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-10 md:pt-20">
        <div className="relative w-full">
          {data.bottomLeft.image ? (
            <div className="relative w-full">
              <Image
                src={data.bottomLeft.image}
                alt={data.bottomLeft.imageAlt}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="w-full h-auto bg-gray-200" style={{ aspectRatio: '4/3' }} />
          )}
        </div>

        <div className="flex items-center justify-center p-5 md:p-12 lg:p-16 xl:p-16">
          <div className="max-w-2xl">
            <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 leading-tight md:leading-[60px]">
              <span className="text-black">
                {data.bottomRight.title.split(data.bottomRight.titleHighlight)[0]}
              </span>
              <span className="text-[#009FE8]">{data.bottomRight.titleHighlight}</span>
            </h2>
            {data.bottomRight.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[14px] md:text-base text-black leading-relaxed ${
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
