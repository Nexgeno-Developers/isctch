'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { CareerJob, CareersListingData } from '@/lib/api';

type RegionTab = 'All' | 'North America' | 'Latin America' | 'EMEA' | 'Asia Pacific';

function formatPostedDate(iso: string) {
  // Keep it simple: show ISO date if parsing fails.
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toISOString().slice(0, 10);
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export default function CareerListingClient({
  jobs,
  jobsSection,
}: {
  jobs: CareerJob[];
  jobsSection?: CareersListingData['jobsSection'];
}) {
  const regions: RegionTab[] = (jobsSection?.regions as RegionTab[] | undefined) ?? [
    'All',
    'North America',
    'Latin America',
    'EMEA',
    'Asia Pacific',
  ];

  const [activeRegion, setActiveRegion] = useState<RegionTab>('All');
  const [qTitle, setQTitle] = useState('');
  const [qLocation, setQLocation] = useState('');
  const [qFunction, setQFunction] = useState('');
  const [qExperience, setQExperience] = useState('');
  const [qDate, setQDate] = useState(''); // YYYY-MM-DD

  const locations = useMemo(
    () => uniqueSorted(jobs.map((j) => j.location).filter(Boolean)),
    [jobs]
  );
  const functions = useMemo(
    () => uniqueSorted(jobs.map((j) => j.function).filter(Boolean)),
    [jobs]
  );
  const experiences = useMemo(
    () => uniqueSorted(jobs.map((j) => j.experienceLevel).filter(Boolean)),
    [jobs]
  );

  const filtered = useMemo(() => {
    const titleNeedle = qTitle.trim().toLowerCase();
    const locationNeedle = qLocation.trim().toLowerCase();

    return jobs.filter((job) => {
      if (activeRegion !== 'All' && job.region !== activeRegion) return false;
      if (
        titleNeedle &&
        !`${job.title} ${job.shortDescription}`.toLowerCase().includes(titleNeedle)
      )
        return false;
      if (locationNeedle && !job.location.toLowerCase().includes(locationNeedle)) return false;
      if (qFunction && job.function !== qFunction) return false;
      if (qExperience && job.experienceLevel !== qExperience) return false;
      if (qDate && formatPostedDate(job.postedDate) !== qDate) return false;
      return true;
    });
  }, [activeRegion, jobs, qDate, qExperience, qFunction, qLocation, qTitle]);

  return (
    <section id="open-positions" className="bg-gray-50 py-10 md:py-12">
      <div className="mx-auto px-4 container">
       

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-5xl">
            {jobsSection?.heading ?? 'See all open positions and'}{' '}
            <span className="text-[#009FE8]">
              {jobsSection?.headingHighlight ?? 'early career opportunities'}
            </span>
            ,{' '}
            <span className="text-gray-900">
              {jobsSection?.headingSuffix ?? 'or search by region :'}
            </span>
          </h2>
        </div>

        {/* Region tabs */}
        <div className="mt-6 flex flex-wrap gap-3">
          {regions.map((tab) => {
            const active = tab === activeRegion;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveRegion(tab)}
                className={[
                  'cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition',
                  active
                    ? 'border-[#009FE8] text-[#009FE8]'
                    : 'border-gray-200 text-gray-900 hover:border-[#009FE8] hover:text-[#009FE8]',
                ].join(' ')}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Filters row */}
        <div className="mt-6 rounded-3xl bg-gray-50 px-4 py-4 md:px-6 bg-white">
          <div className="grid gap-3 md:grid-cols-5">
            <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
              <input
                value={qTitle}
                onChange={(e) => setQTitle(e.target.value)}
                placeholder={jobsSection?.filters.titlePlaceholder ?? 'Title'}
                className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
              <input
                value={qLocation}
                onChange={(e) => setQLocation(e.target.value)}
                placeholder={jobsSection?.filters.locationPlaceholder ?? 'Location'}
                className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
              <select
                value={qFunction}
                onChange={(e) => setQFunction(e.target.value)}
                aria-label="Function"
                className={[
                  'w-full bg-transparent text-sm focus:outline-none',
                  qFunction ? 'text-gray-900' : 'text-gray-400',
                ].join(' ')}
              >
                <option value="">{jobsSection?.filters.functionPlaceholder ?? 'All'}</option>
                {functions.map((fn) => (
                  <option key={fn} value={fn}>
                    {fn}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
              <select
                value={qExperience}
                onChange={(e) => setQExperience(e.target.value)}
                className={[
                  'w-full bg-transparent text-sm focus:outline-none',
                  qExperience ? 'text-gray-900' : 'text-gray-400',
                ].join(' ')}
              >
                <option value="">
                  {jobsSection?.filters.experiencePlaceholder ?? 'Experience Level'}
                </option>
                {experiences.map((xp) => (
                  <option key={xp} value={xp}>
                    {xp}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={qDate}
                  onChange={(e) => setQDate(e.target.value)}
                  aria-label={jobsSection?.filters.datePlaceholder ?? 'Date'}
                  className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {(qTitle || qLocation || qFunction || qExperience || qDate) && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  setQTitle('');
                  setQLocation('');
                  setQFunction('');
                  setQExperience('');
                  setQDate('');
                }}
                className="text-sm font-medium text-[#009FE8] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="px-6 text-center">
              <p className="text-sm text-gray-600">No positions match your filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filtered.map((job, idx) => {
                const muted = idx % 2 === 1;
                return (
                  <div
                    key={job.id}
                    className={['py-6', muted ? '' : ''].join(
                      ' '
                    )}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
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

                      <div className="flex shrink-0 items-center justify-start md:justify-end">
                        <Link
                          href={`/career/${job.slug}`}
                          className={[
                            'inline-flex items-center gap-2 text-sm font-semibold transition',
                            muted ? 'text-gray-300' : 'text-[#009FE8] hover:opacity-80',
                          ].join(' ')}
                          aria-disabled={muted ? true : undefined}
                          tabIndex={muted ? -1 : undefined}
                        >
                          APPLY NOW
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

