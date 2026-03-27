'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { OurValuesSection } from '@/fake-api/company';

interface OurValuesProps {
  data: OurValuesSection;
}

/**
 * Our Values Component (Client Component)
 * 
 * Displays a section with clickable value tabs on the left
 * and an image with caption on the right that changes based on selection.
 */
export default function OurValues({ data }: OurValuesProps) {
  const [selectedValueId, setSelectedValueId] = useState<string>(data.values[0]?.id || '');

  const selectedValue = data.values.find((v) => v.id === selectedValueId) || data.values[0];

  if (!selectedValue) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-[#009FE8] mb-4">
            {data.heading}
          </h2>
          <p className="text-[14px] md:text-lg text-black max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Values List */}
          <div className="flex flex-col">
            <div className="space-y-0 border-t border-gray-200">
              {data.values.map((value, index) => {
                const isSelected = value.id === selectedValueId;
                return (
                  <button
                    key={value.id}
                    onClick={() => setSelectedValueId(value.id)}
                    className={`cursor-pointer w-full text-left lg:py-5 py-3 px-0 border-b border-gray-200 transition-colors ${
                      isSelected
                        ? 'text-[#009FE8]'
                        : 'text-black hover:text-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-xl font-medium">
                        {value.title}
                      </span>
                      {isSelected && (
                        <svg
                          className="w-5 h-5 text-[#009FE8] flex-shrink-0 ml-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Image and Caption */}
          <div className="flex flex-col">
            {/* Image */}
            <div className="relative w-full rounded-lg mb-4">
              {selectedValue.image ? (
                <Image
                  src={selectedValue.image}
                  alt={selectedValue.imageAlt}
                  width={1600}
                  height={1200}
                  className="w-full h-auto object-cover transition-opacity duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* Caption */}
            <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:mt-[-110px] mt-[-30px] relative z-10">
              <p className="text-[14px] md:text-base text-black leading-relaxed">
                {selectedValue.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
