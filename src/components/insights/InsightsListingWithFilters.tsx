'use client';

import { useMemo, useState } from 'react';
import type { InsightItem } from '@/lib/api/insights_layout';
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
}: {
  items: InsightItem[];
  variant: 'articles' | 'webinar' | 'newsletter';
  filterSubcategories?: string[];
}) {
  const [query, setQuery] = useState('');
  const [sub, setSub] = useState<string>('all');

  const categoryOptions = useMemo(() => {
    if (filterSubcategories?.length) return filterSubcategories;
    const fromItems = [
      ...new Set(items.map((i) => i.subcategory?.trim()).filter(Boolean) as string[]),
    ].sort((a, b) => a.localeCompare(b));
    return fromItems;
  }, [filterSubcategories, items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (sub !== 'all') {
        const cat = item.subcategory?.trim();
        if (cat !== sub) return false;
      }
      const q = query.trim().toLowerCase();
      if (!q) return true;
      const title = stripHtmlToLower(item.title);
      const desc = stripHtmlToLower(item.description);
      return title.includes(q) || desc.includes(q);
    });
  }, [items, query, sub]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
      <aside className="w-full shrink-0 lg:w-1/5 lg:min-w-[160px]">
        <div className="sticky top-4 space-y-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div>
            <label htmlFor="insights-listing-search" className="mb-2 block text-sm font-semibold text-black">
              Search
            </label>
            <input
              id="insights-listing-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              autoComplete="off"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-black placeholder:text-gray-400 focus:border-[#009FE8] focus:outline-none focus:ring-2 focus:ring-[#009FE8]/25"
            />
          </div>

          {categoryOptions.length > 0 ? (
            <div>
              <p className="mb-2 text-sm font-semibold text-black">Subcategory</p>
              <ul className="max-h-[min(60vh,420px)] space-y-1 overflow-y-auto pr-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setSub('all')}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      sub === 'all'
                        ? 'bg-[#009FE8] text-white shadow-sm'
                        : 'text-black hover:bg-gray-100'
                    }`}
                  >
                    All
                  </button>
                </li>
                {categoryOptions.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setSub(c)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        sub === c
                          ? 'bg-[#009FE8] text-white shadow-sm'
                          : 'text-black hover:bg-gray-100'
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </aside>

      <div className="min-w-0 lg:w-4/5">
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
