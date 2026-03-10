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
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative bg-[#1a365d] rounded-[25px] overflow-hidden">
          {/* Blueprint Grid Pattern Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 px-8 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Question Text */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight whitespace-pre-line">
                  {data.question}
                </h2>
              </div>

              {/* CTA Link */}
              <div className="flex-shrink-0">
                <Link
                  href={data.ctaLink}
                  className="inline-flex items-center text-white text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider hover:text-[#009FE8] transition-colors group"
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
      </div>
    </section>
  );
}
