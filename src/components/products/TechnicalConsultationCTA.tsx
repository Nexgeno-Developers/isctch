import Image from 'next/image';
import Link from 'next/link';
import type { ProductData } from '@/fake-api/products';

interface TechnicalConsultationCTAProps {
  data: ProductData['technicalConsultation'];
}

/**
 * Technical Consultation CTA Component (Server Component)
 * 
 * Displays a call-to-action banner for technical consultation.
 * Data comes from server-side API.
 */
export default function TechnicalConsultationCTA({ data }: TechnicalConsultationCTAProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-8 md:py-8">
      <div className="container mx-auto px-4 pb-12">
        <div className="relative rounded-[50px] overflow-hidden ">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/technical_bg.jpg"
              alt="Technical Consultation Background"
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay for better text readability */}
            {/* <div className="absolute inset-0 bg-[#1a365d] bg-opacity-80" /> */}
          </div>
          
          {/* Content - Centered in one row */}
          <div className="relative z-10 py-[180px]">
            <div className="max-w-3xl mx-auto text-center ">
              {/* Question Text */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-center whitespace-pre-line pb-[50px]">
                {data.question}
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
