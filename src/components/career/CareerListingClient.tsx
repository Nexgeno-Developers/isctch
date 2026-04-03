'use client';

import { formatBoldText } from '@/lib/htmlText';
import type { CareerLandingPageData, CareerJob } from '@/lib/api/career_layout';

function formatPostedDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
}

type JobsSection = CareerLandingPageData['jobsSection'];
type SocialLinks = NonNullable<JobsSection>['socialApplyLinks'];

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
    <div className="flex flex-wrap items-center justify-center gap-3">
      {entries.map(([label, url]) => (
        <a
          key={label}
          href={url!.trim()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-[#009FE8] bg-white px-6 py-3 text-sm font-semibold text-[#009FE8] transition hover:bg-[#009FE8] hover:text-white md:text-base"
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default function CareerListingClient({
  jobsSection,
}: {
  jobs: CareerJob[];
  jobsSection?: JobsSection;
}) {
  const socialLinks = jobsSection?.socialApplyLinks;

  return (
    <section id="open-positions" className="bg-gray-50 py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-black md:text-5xl" dangerouslySetInnerHTML={{ __html: jobsSection?.heading ?? 'See all open positions and early career opportunities' }} />
        </div>

        <div className="mt-8">
          <SocialApplyLinks links={socialLinks} />
        </div>
      </div>
    </section>
  );
}
