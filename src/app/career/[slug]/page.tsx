import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
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

  const latestJobs = listing.jobs.filter((j) => j.slug !== slug).slice(0, 10);

  return (
    <main className="min-h-screen bg-white">
      <CompanyHero
        data={{
          title: job.title,
          backgroundImage: listing.heroBackgroundImage || '/about_banner.jpg',
        }}
      />

      {/* Breadcrumbs */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: 'Career', href: '/career' },
              { label: job.title },
            ]}
          />
        </div>
      </section>

      <section className="bg-gray-50 mt-[-20px] py-12">
        <div className="container mx-auto w-full px-4">
         

          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-black">{job.title}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {job.location}
                {job.postedAgo ? `, ${job.postedAgo}` : ''}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-black">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Salary:</span>
                  <span className="font-semibold text-gray-900">{job.salary ?? 'Negotiable'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Work Exp.:</span>
                  <span className="font-semibold text-gray-900">{job.experienceLevel}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-200 transition"
              >
                Im Interested
              </button>

              {job.applyLinkedInUrl ? (
                <a
                  href={job.applyLinkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Apply Via
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white font-bold">
                    in
                  </span>
                </a>
              ) : job.applyEmail ? (
                <a
                  href={`mailto:${job.applyEmail}`}
                  className="rounded-full bg-[#009FE8] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
                >
                  Apply Now
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 pb-20">
        <div className="container mx-auto w-full px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
            {/* Left content */}
            <div className="min-w-0">
              {job.responsibilities.length > 0 && (
                <div className="mt-2">
                  <h2 className="text-base font-semibold text-gray-900">Responsibilities</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-black">
                    {job.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-base font-semibold text-gray-900">Qualifications</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    (Education / Knowledge / Working Experience)
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-black">
                    {job.requirements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <aside className="lg:sticky lg:top-6 h-fit">
              <div className="rounded-[50px] bg-[#EDF0F2] p-6 md:p-7">
                <h3 className="text-lg font-bold text-black">
                  Latest <span className="text-[#009FE8]">Jobs</span>
                </h3>

                <div className="mt-5 space-y-5">
                  {latestJobs.map((j) => (
                    <Link
                      key={j.id}
                      href={`/career/${j.slug}`}
                      className="block rounded-2xl py-2 transition"
                    >
                      <p className="text-sm font-semibold text-gray-900">{j.title}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {j.location}
                        {j.postedAgo ? `, ${j.postedAgo}` : ''}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}

