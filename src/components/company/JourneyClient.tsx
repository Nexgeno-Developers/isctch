'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { JourneyData } from '@/fake-api/company';

interface JourneyClientProps {
  data: JourneyData;
}

/**
 * Journey Client Component
 * 
 * Interactive timeline component with clickable year tabs.
 * Clicking a year changes the displayed image and highlights the selected year.
 */
export default function JourneyClient({ data }: JourneyClientProps) {
  const [selectedYear, setSelectedYear] = useState<string>(data.milestones[0]?.year || '');

  // Get the selected milestone
  const selectedMilestone = data.milestones.find((m) => m.year === selectedYear) || data.milestones[0];

  if (!selectedMilestone) {
    return null;
  }

  // Split year into two parts for display (e.g., "2007" -> "20" and "07")
  const splitYear = (year: string) => {
    if (year.length === 4) {
      return { first: year.substring(0, 2), second: year.substring(2) };
    }
    return { first: year, second: '' };
  };

  const yearParts = splitYear(selectedYear);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-[#009FE8]">{data.titleHighlight}</span>{' '}
            <span className="text-gray-900">
              {data.title.replace(data.titleHighlight, '').trim()}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Timeline */}
          <div className="flex flex-col">
            <div className="flex items-start gap-4 lg:gap-6 w-full">
              {/* Timeline Line */}
              <div className="relative flex-shrink-0 self-stretch">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#009FE8]" />
              </div>

              {/* Years List with Dots */}
              <div className="flex flex-col gap-2 md:gap-3 flex-1 relative">
                {data.milestones.map((milestone) => {
                  const isSelected = milestone.year === selectedYear;
                  return (
                    <div key={milestone.year} className="relative flex items-center">
                      {/* Dot - Positioned between timeline and year text, center-aligned */}
                      <div className="absolute -left-6 md:-left-7 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div
                          className={`w-3 h-3 rounded-full transition-all ${
                            isSelected
                              ? 'bg-[#009FE8] border-3 border-white shadow-md'
                              : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <button
                        onClick={() => setSelectedYear(milestone.year)}
                        className={`cursor-pointer text-left transition-colors flex items-center pb-5 ${
                          isSelected
                            ? 'text-[#009FE8] font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <span className="text-base md:text-lg lg:text-[24px] font-bold leading-tight">{milestone.year}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Large Year Display */}
              <div className="hidden lg:flex flex-col items-start justify-start ml-4 lg:ml-8 flex-shrink-0">
                <div className="text-[#009FE8] font-bold leading-none">
                  <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">{yearParts.first}</div>
                  <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">{yearParts.second}</div>
                </div>
              </div>
            </div>

            {/* Large Year Display - Mobile */}
            <div className="lg:hidden mt-8 text-center">
              <div className="text-[#009FE8] font-bold leading-none">
                <div className="text-6xl">{yearParts.first}</div>
                <div className="text-6xl">{yearParts.second}</div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full">
            <div className="relative aspect-[4/3] rounded-[50px] overflow-hidden shadow-lg">
              {selectedMilestone.image ? (
                <Image
                  src={selectedMilestone.image}
                  alt={selectedMilestone.imageAlt}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority={selectedYear === data.milestones[0]?.year}
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                <div className="bg-gray-100 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 md:p-5">
                  <p className="text-gray-900 text-base md:text-lg font-medium">
                    {selectedMilestone.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
