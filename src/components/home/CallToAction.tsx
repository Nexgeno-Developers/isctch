import Link from 'next/link';
import { fetchHomepageData } from '@/lib/api';

/**
 * Call to Action Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the CTA section.
 */
export default async function CallToAction() {
  const homepageData = await fetchHomepageData();
  const data = homepageData.callToAction;

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-[#EDF0F1] rounded-[50px] p-8 md:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
            {/* Left Side - Heading and Description */}
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-gray-900">{data.heading}</span>{' '}
                <span className="text-[#009FE8]">{data.headingHighlight}</span>
              </h2>
              <p className="text-gray-700 text-base md:text-lg">
                {data.description}
              </p>
            </div>

            {/* Right Side - CTA Button */}
            <div className="flex-shrink-0">
              <Link
                href={data.ctaLink}
                className="inline-flex items-center text-[#009FE8] text-base md:text-lg font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity group"
              >
                {data.ctaText}
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
