import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';
import { getCompanyCommonData } from '@/lib/api/company_common';

/**
 * Industry Consultation CTA Component (Server Component)
 * 
 * Displays a call-to-action banner for industry consultation or other CTAs.
 * Data comes from server-side API.
 * Can be used with product industryConsultation data or custom CTA data.
 */
export default async function IndustryConsultationCTA() {
  const companyData = await getCompanyCommonData();
  if (!companyData) return null;

  const mainText = companyData.industryDetailGuidanceTitle;
  const ctaLink = companyData.industryDetailGuidanceUrl;
  if (!mainText) return null;

  return (
    <section className="bg-gray-50 py-0 md:py-12">
      <div className="container mx-auto px-4">
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
          <div className="relative z-10 lg:py-[180px] py-[30px] lg:px-4 px-8">
            <div className="max-w-5xl mx-auto text-center ">
              {/* Main Heading/Question Text */}
              <h2
                className="capitalize text-[22px] md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight text-center whitespace-pre-line lg:pb-[50px] pb-[20px] tracking-tight"
                dangerouslySetInnerHTML={{ __html: formatBoldText(mainText) }}
              />

              {/* CTA Link */}
              {ctaLink ? (
                <Link
                  href={ctaLink}
                  className="lg:inline-flex items-center text-white text-base md:text-lg lg:text-xl font-bold tracking-wider hover:text-[#009FE8] transition-colors group whitespace-nowrap"
                >
                  CONTACT US
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
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
