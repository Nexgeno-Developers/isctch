import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchCareersListingData } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchCareersListingData();
  const canonicalUrl = getCanonicalUrl('/career');

  return {
    title: data.seo.meta_title,
    description: data.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: data.seo.meta_title,
      description: data.seo.meta_description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CareerPage() {
  const data = await fetchCareersListingData();

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.heroTitle,
          backgroundImage: data.heroBackgroundImage || '/about_banner.jpg',
        }}
      />

      {/* Breadcrumbs */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: 'Career' }]} />
        </div>
      </section>

      {/* Hero split section (like reference design) */}
      {data.heroSplit && (
        <section className="bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            {/* Left: content */}
            <div className="flex items-center justify-center p-8 md:p-12 lg:p-16 xl:p-20 bg-white">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E233C] leading-[1.15] mb-6">
                  {data.heroSplit.heading}{' '}
                  <span className="text-[#009FE8]">{data.heroSplit.headingHighlight}</span>
                </h2>

                <div className="space-y-5 text-sm md:text-base text-gray-700 leading-relaxed">
                  {data.heroSplit.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <p className="mt-8 text-base md:text-lg font-semibold text-[#0E233C]">
                  {data.heroSplit.emphasis}
                </p>

                <Link
                  href={data.heroSplit.ctaLink}
                  className="mt-10 inline-flex items-center text-sm md:text-base font-bold uppercase text-[#009FE8] hover:text-[#0077B6] transition-colors"
                >
                  {data.heroSplit.ctaText}
                  <span className="ml-2 text-lg leading-none">→</span>
                </Link>
              </div>
            </div>

            {/* Right: media */}
            <div className="relative min-h-[320px] lg:min-h-[560px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.heroSplit.mediaImage}
                alt={data.heroSplit.mediaAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0E233C] opacity-35" />

              {/* Play button */}
              {data.heroSplit.mediaLink && (
                <a
                  href={data.heroSplit.mediaLink}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play video"
                >
                  <span className="w-20 h-20 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {data.intro && (
        <section className="bg-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E233C] mb-4">
                {data.intro.heading}
              </h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {data.intro.description}
              </p>
            </div>
          </div>
        </section>
      )}

      <section id="open-positions" className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0E233C]">
                Open Positions
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                {data.jobs.length} role{data.jobs.length === 1 ? '' : 's'} available
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.jobs.map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg md:text-xl font-semibold text-[#0E233C]">
                    {job.title}
                  </h3>
                  <span className="shrink-0 inline-flex rounded-full bg-[#E7F4FF] text-[#009FE8] px-3 py-1 text-xs font-semibold">
                    {job.jobType}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p>
                    <span className="font-semibold text-gray-700">Department:</span>{' '}
                    {job.department}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Location:</span>{' '}
                    {job.location}
                  </p>
                </div>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">
                  {job.shortDescription}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-xs text-gray-500">
                    Posted: {job.postedDate}
                  </span>
                  <Link
                    href={`/career/${job.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-[#009FE8] hover:text-[#0077B6] transition-colors"
                  >
                    View details <span className="ml-2">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

