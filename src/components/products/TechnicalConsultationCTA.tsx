import Image from 'next/image';
import Link from 'next/link';
import type { ProductData } from '@/fake-api/products';

interface CTAData {
  label?: string; // Optional top label (e.g., "PILOT PLANT")
  question?: string; // Main heading/question text
  heading?: string; // Alternative main heading text
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string; // Optional custom background image
}

interface TechnicalConsultationCTAProps {
  data: ProductData['technicalConsultation'] | CTAData | null;
}

/**
 * Technical Consultation CTA Component (Server Component)
 * 
 * Displays a call-to-action banner for technical consultation or other CTAs.
 * Data comes from server-side API.
 * Can be used with product technicalConsultation data or custom CTA data.
 */
export default function TechnicalConsultationCTA({ data }: TechnicalConsultationCTAProps) {
  if (!data) {
    return null;
  }

  // Determine which fields to use
  const label = 'label' in data ? data.label : undefined;
  const heading = 'heading' in data ? data.heading : undefined;
  const question = 'question' in data ? data.question : undefined;
  const mainText = heading || question || '';

  return (
    <section className="bg-gray-50 py-8 md:py-8">
      <div className="container mx-auto px-4 pb-12">
        <div className="relative rounded-[50px] overflow-hidden ">
          {/* Background Image (same for all) */}
          <div className="absolute inset-0">
            <Image
              src="/technical_bg.jpg"
              alt="CTA Background"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          
          {/* Content - Centered in one row */}
          <div className="relative z-10 py-[180px]">
            <div className="max-w-5xl mx-auto text-center ">
              {/* Optional Top Label */}
              {label && (
                <p className="text-sm md:text-base lg:text-lg text-white uppercase tracking-wider mb-4 md:mb-6 font-medium">
                  {label}
                </p>
              )}

              {/* Main Heading/Question Text */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight text-center whitespace-pre-line pb-[50px] uppercase tracking-tight">
                {mainText}
              </h2>

              {/* CTA Link */}
              <Link
                href={data.ctaLink}
                className="inline-flex items-center text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider hover:text-[#009FE8] transition-colors group whitespace-nowrap"
              >
                {data.ctaText}
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 ml-2 transform group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>
    </section>
  );
}
