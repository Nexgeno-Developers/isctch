import Image from 'next/image';
import type { VisionMissionSection } from '@/fake-api/company';
import { RichText } from '@/components/common/RichText';

interface VisionMissionProps {
  data: VisionMissionSection;
}

/**
 * Vision & Mission Component (Server Component)
 * 
 * Displays a section with:
 * - Upper portion: Background image with people
 * - Lower portion: Blue gradient overlay with tagline, description, and two white boxes (Vision & Mission)
 */
export default function VisionMission({ data }: VisionMissionProps) {
  const getIcon = (iconType: string) => {
    if (iconType === 'eye' || iconType === 'vision') {
      return (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          {/* Sunburst/Lightbulb effect */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    }
    if (iconType === 'target' || iconType === 'mission') {
      return (
        <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {/* Target circle */}
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <circle cx="12" cy="12" r="6" strokeWidth={2} />
          <circle cx="12" cy="12" r="2" strokeWidth={2} />
          {/* Circular arrow */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      );
    }
    return null;
  };

  return (
    <section className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {data.backgroundImage ? (
          <Image
            src={data.backgroundImage}
            alt={data.backgroundImageAlt}
            fill
            className="object-cover position-top "
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full lg:py-[40px] py-[20px] flex flex-col">
        {/* Upper Section - Empty space for image visibility */}
        <div className="flex-1" />

        {/* Lower Section - Content Overlay */}
        <div className="relative pb-4 md:pb-12 lg:pb-16 pt-8 md:pt-12 lg:pt-16">
          <div className="container w-[92%] mx-auto bg-[#009fe863] lg:p-[60px] px-[15px] py-[30px] rounded-[50px] lg:backdrop-blur-[35px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {/* Left Column - Tagline and Description */}
              <div className="lg:col-span-1 flex flex-col justify-center">
                <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  {data.tagline}
                </h2>
                <RichText
                  as="div"
                  html={data.description}
                  className="text-[14px] md:text-lg text-white/90 leading-relaxed"
                />
              </div>

              {/* Middle Column - Vision Box */}
              <div className="lg:col-span-1">
                <div className="bg-[#ffffffde] rounded-2xl p-6 md:p-8 shadow-lg h-full">
                  {/* Icon */}
                  <div className="mb-4 md:mb-6 flex items-center">
                    <div className="text-[#333] mr-3">
                      {getIcon(data.vision.icon)}
                    </div>
                    {/* Blue drop shape */}
                    {/* <div className="w-3 h-3 bg-[#009FE8] rounded-full" /> */}
                  </div>
                  
                  {/* Heading */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#009FE8] mb-3 md:mb-4">
                    {data.vision.heading}
                  </h3>
                  
                  {/* Text */}
                  <p className="text-sm md:text-base text-black leading-relaxed">
                    {data.vision.text}
                  </p>
                </div>
              </div>

              {/* Right Column - Mission Box */}
              <div className="lg:col-span-1">
                <div className="bg-[#ffffffde]  rounded-2xl p-6 md:p-8 shadow-lg h-full">
                  {/* Icon */}
                  <div className="mb-4 md:mb-6 flex items-center">
                    <div className="text-[#333] mr-3">
                      {getIcon(data.mission.icon)}
                    </div>
                    {/* Blue drop shape */}
                    {/* <div className="w-3 h-3 bg-[#009FE8] rounded-full" /> */}
                  </div>
                  
                  {/* Heading */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#009FE8] mb-3 md:mb-4">
                    {data.mission.heading}
                  </h3>
                  
                  {/* Text */}
                  <p className="text-sm md:text-base text-black leading-relaxed">
                    {data.mission.text}
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
