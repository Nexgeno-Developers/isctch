'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { InsightItem } from '@/lib/api/insights_layout';
import type { InsightsListingFilterLink } from '@/lib/api/insights_listing_layout';
import { InsightCard } from '@/components/insights/InsightCard';

function stripHtmlToLower(s: string): string {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function InsightsListingWithFilters({
  items,
  variant,
  filterSubcategories,
  filterLinks,
  allFilterLabel,
  allFilterHref,
  allFilterActive,
}: {
  items: InsightItem[];
  variant: 'articles' | 'webinar' | 'newsletter';
  filterSubcategories?: string[];
  filterLinks?: InsightsListingFilterLink[];
  allFilterLabel?: string;
  allFilterHref?: string;
  allFilterActive?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [sub, setSub] = useState<string>('all');
  const useLinks = (filterLinks?.length || allFilterHref) ? true : false;

  const categoryOptions = useMemo(() => {
    if (useLinks) return [];
    if (filterSubcategories?.length) return filterSubcategories;
    const fromItems = [
      ...new Set(items.map((i) => i.subcategory?.trim()).filter(Boolean) as string[]),
    ].sort((a, b) => a.localeCompare(b));
    return fromItems;
  }, [filterSubcategories, items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (!useLinks && sub !== 'all') {
        const cat = item.subcategory?.trim();
        if (cat !== sub) return false;
      }
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const title = stripHtmlToLower(item.title);
      return title.includes(q);
    });
  }, [items, query, sub, useLinks]);

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
      <aside className="w-full shrink-0 lg:max-w-[320px] lg:w-[300px]">
        <div className="sticky top-4">
          {/* Outer shell: soft brand gradient + depth */}
          <div className="rounded-[50px] bg-white">
            <div className="rounded-[1.7rem] bg-white/95 p-5 backdrop-blur-sm sm:p-6">
              {/* Search */}
              <div className="flex items-center gap-2 text-[#0E233C]">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#009FE8]/10 text-[#009FE8]"
                  aria-hidden
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <div>
                  <label htmlFor="insights-listing-search" className="text-xs font-bold uppercase tracking-[0.14em] text-[#009FE8]">
                    Search
                  </label>
                  <p className="text-[11px] leading-tight text-black/45">Find by title or description</p>
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  id="insights-listing-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title…"
                  autoComplete="off"
                  className="w-full rounded-2xl border-2 border-[#E5F2FA] bg-[#fff] py-3 pl-4 pr-4 text-sm text-[#0E233C]  placeholder:text-gray-400 transition focus:border-[#009FE8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#009FE8]/15"
                />
              </div>
              {/* <p className="mt-2 text-right text-xs tabular-nums text-black/40">
                Showing <span className="font-semibold text-[#0E233C]/80">{filtered.length}</span> of {items.length}
              </p> */}

              {useLinks ? (
                <>
                  <div
                    className="my-6 h-px bg-gradient-to-r from-transparent via-[#B7D7EA]/60 to-transparent"
                    aria-hidden
                  />

                  <ul className="mt-4 max-h-[min(55vh,400px)] space-y-2 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
                    <li>
                      <Link
                        href={allFilterHref || '#'}
                        className={`border-2 px-3.5 py-3 cursor-pointer flex w-full items-center border-transparent justify-between !text-black gap-2 bg-[#f8fcfe] rounded-2xl  text-left text-sm font-semibold transition-none ${
                          allFilterActive
                            ? 'border-[#009FE8] !bg-[#009FE8] !text-white'
                            : 'text-[#0E233C] '
                        }`}
                      >
                        <span>{allFilterLabel || 'All'}</span>
                        {allFilterActive ? (
                          <svg
                            className="h-4 w-4 shrink-0 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </Link>
                    </li>
                    {(filterLinks || []).map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-2xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition-none ${
                            c.active
                              ? 'border-[#009FE8] bg-[#009FE8] text-white '
                              : 'border-transparent bg-[#F8FCFE] text-[#0E233C]'
                          }`}
                        >
                          <span className="min-w-0 break-words">{c.label}</span>
                          {c.active ? (
                            <svg
                              className="h-4 w-4 shrink-0 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : categoryOptions.length > 0 ? (
                <>
                  <div
                    className="my-6 h-px bg-gradient-to-r from-transparent via-[#B7D7EA]/60 to-transparent"
                    aria-hidden
                  />

                  {/* <div className="flex items-start gap-2">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0E233C]/[0.06] text-[#0E233C]"
                      aria-hidden
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#009FE8]">Subcategory</p>
                      <p className="mt-0.5 text-[11px] leading-tight text-black/45">Narrow by topic</p>
                    </div>
                  </div> */}

                  <ul className="mt-4 max-h-[min(55vh,400px)] space-y-2 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
                    <li>
                      <button
                        type="button"
                        onClick={() => setSub('all')}
                        className={`border-2 px-3.5 py-3 cursor-pointer flex w-full items-center border-transparent justify-between !text-black gap-2 bg-[#f8fcfe] rounded-2xl  text-left text-sm font-semibold transition-none ${
                          sub === 'all'
                            ? 'border-[#009FE8] !bg-[#009FE8] !text-white'
                            : 'text-[#0E233C] '
                        }`}
                      >
                        <span>All</span>
                        {sub === 'all' ? (
                          <svg
                            className="h-4 w-4 shrink-0 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </button>
                    </li>
                    {categoryOptions.map((c) => (
                      <li key={c}>
                        <button
                          type="button"
                          onClick={() => setSub(c)}
                          className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-2xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition-none ${
                            sub === c
                              ? 'border-[#009FE8] bg-[#009FE8] text-white '
                              : 'border-transparent bg-[#F8FCFE] text-[#0E233C]'
                          }`}
                        >
                          <span className="min-w-0 break-words">{c}</span>
                          {sub === c ? (
                            <svg
                              className="h-4 w-4 shrink-0 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {filtered.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-gray-600 shadow-sm ring-1 ring-black/5">
            No items match your search or subcategory.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {filtered.map((item) => (
              <InsightCard key={item.id} item={item} variant={variant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
