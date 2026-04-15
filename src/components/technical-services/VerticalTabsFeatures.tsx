'use client';

import { useState } from 'react';
import Image from 'next/image';
interface FeatureDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface VerticalTabsFeaturesProps {
  features: FeatureDetail[];
}

/**
 * Vertical Tabs Features Component (Client Component)
 * 
 * Displays features as vertical tabs in a horizontal row.
 * On hover, the hovered tab expands to show full details (image, title, description).
 * Other tabs remain compact with vertical text.
 */
export default function VerticalTabsFeatures({ features }: VerticalTabsFeaturesProps) {
  // Default to first tab being open
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 pt-8 md:pt-12 lg:pt-20">
      <div className="container mx-auto px-4">
        {/* Mobile: full-width stacked cards (hover % widths are unusable on narrow viewports) */}
        <div className="flex flex-col gap-4 md:hidden">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="rounded-[25px] overflow-hidden bg-[#EDF0F1] p-4 shadow-sm"
            >
              <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-gray-200">
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <h3 className="text-lg font-bold text-black mt-4 lg:mb-3 mb-2">{feature.title}</h3>
              <p className="text-black lg:text-base text-sm leading-relaxed lg:mb-0 mb-3">{feature.description}</p>
            </article>
          ))}
        </div>

        {/* Desktop / tablet: horizontal hover tabs */}
        <div className="hidden md:flex gap-4 md:gap-6 overflow-hidden">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)}
                className={`rounded-[25px] overflow-hidden transition-all duration-500 ease-in-out cursor-pointer relative h-[400px] md:h-[550px] flex-shrink-0 ${
                  isHovered 
                    ? 'w-[30%] z-10 shadow-2xl' 
                    : 'w-[12%]'
                }`}
              >
                {/* Background */}
                {isHovered ? (
                  <div className="absolute inset-0 bg-[#EDF0F1]" />
                ) : (
                  <div className="absolute inset-0">
                    {/* <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 16.66vw, (max-width: 1024px) 16.66vw, 16.66vw"
                    /> */}
                    {/* Blue Overlay */}
                    <div className="absolute inset-0 bg-[#009FE8] opacity-80" />
                  </div>
                )}

                {/* Content */}
                <div className={`relative z-10 h-full flex flex-col transition-all duration-500 ${
                  isHovered ? 'p-4 md:p-4 lg:p-6' : 'p-4'
                }`}>
                  {isHovered ? (
                    /* Expanded View - Full Details */
                    <div className="flex-1 flex flex-col">
                      <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-gray-200">
                        <Image
                          src={feature.image}
                          alt={feature.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 40vw, 30vw"
                        />
                      </div>

                      <div className="mt-6 flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-black text-base md:text-base leading-relaxed line-clamp-4">
                        {feature.description}
                      </p>
                      </div>
                    </div>
                  ) : (
                    /* Compact View - Vertical Text */
                    <div className="flex-1 flex items-center justify-center">
                      {/* Position text on left or right based on index */}
                      <div className={`transform -rotate-90 whitespace-nowrap ${
                        index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                      }`}>
                        <span className="text-white font-bold text-sm md:text-base lg:text-lg uppercase tracking-wider">
                          {feature.title}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
