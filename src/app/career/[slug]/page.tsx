import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CompanyHero from '@/components/company/CompanyHero';
import { fetchCareerJobBySlug, fetchCareersListingData, getAllCareerJobSlugs } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

interface CareerDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCareerJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CareerDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await fetchCareerJobBySlug(slug);
  const canonicalUrl = getCanonicalUrl(`/career/${slug}`);

  if (!job) {
    return {
      title: 'Job Not Found | Career',
      description: 'The requested job could not be found.',
    };
  }

  return {
    title: `${job.title} | Career | Lamipak`,
    description: job.shortDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${job.title} | Career | Lamipak`,
      description: job.shortDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function CareerDetailsPage({ params }: CareerDetailsPageProps) {
  const { slug } = await params;
  const [job, listing] = await Promise.all([
    fetchCareerJobBySlug(slug),
    fetchCareersListingData(),
  ]);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: job.title,
          backgroundImage: listing.heroBackgroundImage || '/about_banner.jpg',
        }}
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/career"
            className="inline-flex items-center text-sm md:text-base text-[#009FE8] font-semibold hover:text-[#0077B6] transition-colors"
          >
            <span className="mr-2">←</span> Back to career
          </Link>
        </div>
      </section>

      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex rounded-full bg-[#E7F4FF] text-[#009FE8] px-4 py-2 text-sm font-semibold">
                {job.jobType}
              </span>
              <span className="inline-flex rounded-full bg-gray-100 text-gray-700 px-4 py-2 text-sm font-semibold">
                {job.department}
              </span>
              <span className="inline-flex rounded-full bg-gray-100 text-gray-700 px-4 py-2 text-sm font-semibold">
                {job.location}
              </span>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
              {job.description}
            </p>

            {job.responsibilities.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#0E233C] mb-4">
                  Responsibilities
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-[#0E233C] mb-4">
                  Requirements
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {job.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.applyEmail && (
              <div className="rounded-[24px] bg-[#F7F9FB] border border-[#E5EDF5] p-6">
                <h3 className="text-lg font-semibold text-[#0E233C] mb-2">
                  Apply for this role
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Send your CV to{' '}
                  <a className="text-[#009FE8] font-semibold" href={`mailto:${job.applyEmail}`}>
                    {job.applyEmail}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

