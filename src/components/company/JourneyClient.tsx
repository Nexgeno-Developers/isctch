'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatBoldText } from '@/lib/htmlText';
import type { JourneyData } from '@/types/company';

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
    <section className="py-10 md:pt-10 md:pb-20 lg:pb-[120px] bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[24px] md:text-4xl lg:text-5xl font-bold text-black" dangerouslySetInnerHTML={{ __html: formatBoldText(data.title) }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-start">
          {/* Left Side - Timeline */}
          <div className="flex flex-col">
            <div className="flex items-start gap-4 lg:gap-6 w-full">
              {/* Timeline Line */}
              <div className="relative flex-shrink-0 self-stretch">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#009FE8]" />
              </div>

              {/* Years List with Dots */}
              <div className="flex flex-col gap-2 md:gap-8 flex-1 relative">
                {data.milestones.map((milestone) => {
                  const isSelected = milestone.year === selectedYear;
                  return (
                    <div key={milestone.year} className="relative flex items-center">
                      {/* Dot - Positioned between timeline and year text, center-aligned */}
                      <div className="absolute -left-6 md:-left-7 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div
                          className={`w-4 h-4 rounded-full transition-all ${
                            isSelected
                              ? 'bg-[#009FE8] border-3 border-white shadow-md'
                              : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <button
                        onClick={() => setSelectedYear(milestone.year)}
                        className={`cursor-pointer text-left transition-colors flex items-center ${
                          isSelected
                            ? 'text-[#009FE8] font-semibold'
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        <span className="text-base md:text-lg lg:text-[24px] font-bold leading-tight">{milestone.year}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Large Year Display */}
              <div className="hidden lg:flex flex-col items-start justify-start  flex-shrink-0 absolute ml-[220px]">
                <div className="text-[#009FE8] font-bold leading-none">
                  <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">{yearParts.first}</div>
                  <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] ml-[70px]">{yearParts.second}</div>
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
            <div className="relative rounded-[28px] md:rounded-[50px]">
              {selectedMilestone.image ? (
                <div className="relative w-full">
                  <Image
                    src={selectedMilestone.image}
                    alt={selectedMilestone.imageAlt}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-opacity duration-300 rounded-[28px] md:rounded-[50px]"
                    priority={selectedYear === data.milestones[0]?.year}
                  />
                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-[-30px] md:left-6 md:right-6">
                    <div className="bg-gray-100 bg-opacity-90 backdrop-blur-sm rounded-[15px] text-center p-3 md:p-5 w-[88%] md:w-[70%] mx-auto">
                      <p className="text-black text-[14px] md:text-lg font-medium">
                        {selectedMilestone.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-auto bg-gray-200 rounded-[50px]" style={{ aspectRatio: '4/3' }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
