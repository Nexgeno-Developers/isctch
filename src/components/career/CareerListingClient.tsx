'use client';

import type { CareerJob, CareersListingData } from '@/lib/api';

function formatPostedDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
}

type SocialLinks = NonNullable<CareersListingData['jobsSection']>['socialApplyLinks'];

function SocialApplyLinks({ links }: { links: SocialLinks | undefined }) {
  if (!links) return null;
  const entries = (
    [
      ['Instagram', links.instagram] as const,
      ['LinkedIn', links.linkedin] as const,
      ['Facebook', links.facebook] as const,
    ] as const
  ).filter(([, url]) => typeof url === 'string' && url.trim().length > 0);

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 md:justify-end">
      <span className="w-full text-xs font-medium text-gray-500 md:w-auto md:mr-1">Apply on</span>
      {entries.map(([label, url]) => (
        <a
          key={label}
          href={url!.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-[#009FE8] bg-white px-4 py-2 text-xs font-semibold text-[#009FE8] transition hover:bg-[#009FE8] hover:text-white md:text-sm"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default function CareerListingClient({
  jobs,
  jobsSection,
}: {
  jobs: CareerJob[];
  jobsSection?: CareersListingData['jobsSection'];
}) {
  const socialLinks = jobsSection?.socialApplyLinks;

  return (
    <section id="open-positions" className="bg-gray-50 py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-black md:text-5xl">
            {jobsSection?.heading ?? 'See all open positions and'}{' '}
            <span className="text-[#009FE8]">
              {jobsSection?.headingHighlight ?? 'early career opportunities'}
            </span>
            {jobsSection?.headingSuffix ? (
              <>
                {', '}
                <span className="text-black">{jobsSection.headingSuffix}</span>
              </>
            ) : null}
          </h2>
        </div>

        <div className="mt-8">
          {jobs.length === 0 ? (
            <div className="px-6 text-center">
              <p className="text-sm text-gray-600">No open positions at the moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <div key={job.id} className="py-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-black">{job.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{job.shortDescription}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                          <span className="inline-block h-4 w-4 rounded-full bg-gray-200" />
                          {job.region}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                          <span className="inline-block h-4 w-4 rounded-full bg-gray-200" />
                          {job.function}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                          <span className="inline-block h-4 w-4 rounded-full bg-gray-200" />
                          {job.experienceLevel}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-gray-500"
                          >
                            <path
                              d="M7 2v2M17 2v2M3.5 9.5h17"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                            <path
                              d="M6.5 5h11c2 0 3 1 3 3v11c0 2-1 3-3 3h-11c-2 0-3-1-3-3V8c0-2 1-3 3-3Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {formatPostedDate(job.postedDate)}
                        </span>
                      </div>
                    </div>

                    <SocialApplyLinks links={socialLinks} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
