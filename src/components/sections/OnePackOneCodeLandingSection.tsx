'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { OnePackOneCodeLandingSectionData, OnePackOneCodeTabId } from '@/fake-api/page-builder';

function TabIcon({ id }: { id: OnePackOneCodeTabId }) {
  const common = 'stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"';

  if (id === 'digital') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="7" width="6" height="10" rx="1.5" {...{}} {...{}} />
        <path d="M11 9h10M11 13h10M11 17h6" {...{}} {...{}} />
      </svg>
    );
  }

  if (id === 'lottery') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
        <path d="M7 7h10v10H7z" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 10h6M9 13h4" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'marketing') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
        <path d="M10 14l11-5-11-5v10z" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M3 12h7" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'loyalty') {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2l3.1 6.6 7.3 1.1-5.3 5.1 1.3 7.2L12 18.8 5.6 22l1.3-7.2L1.6 9.7l7.3-1.1L12 2z" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" fill="none" strokeWidth="1.8" />
      <path d="M12 8v4l3 2" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayOverlayButton() {
  return (
    <button
      type="button"
      className="h-12 w-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg"
      aria-label="Play video"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

function Accordion({
  items,
}: {
  items: OnePackOneCodeLandingSectionData['accessPoints']['items'];
}) {
  const [openId, setOpenId] = useState(items[0]?.id);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="space-y-3">
        {items.map((it) => {
          const isOpen = it.id === openId;
          return (
            <div key={it.id} className="rounded-xl border border-[#BFDDF1] bg-white">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : it.id)}
                className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
              >
                <span className="text-[13px] md:text-sm font-semibold text-[#0a4a7a]">{it.title}</span>
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center transition-transform ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {isOpen && <div className="px-4 pb-4 text-sm text-black/70 leading-relaxed">{it.content}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatureBlock({
  feature,
}: {
  feature: OnePackOneCodeLandingSectionData['features'][number];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] gap-8 lg:gap-10 items-center">
      <div>
        <div className="flex items-end gap-4 mb-4">
          <div className="text-5xl md:text-6xl font-extrabold text-[#B7D7EA] leading-none">{feature.number}</div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-2xl font-bold text-black/90">{feature.title}</h3>
          </div>
        </div>
        <ul className="space-y-3">
          {feature.bullets.map((b, idx) => (
            <li key={`${feature.id}-${idx}`} className="flex items-start gap-3 text-sm md:text-base text-black/70">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#009FE8]" aria-hidden />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="rounded-[22px] bg-[#0c1f45] p-4 md:p-6 shadow-inner">
          {feature.image ? (
            <img src={feature.image} alt={feature.title} className="w-full h-[220px] md:h-[260px] object-contain" />
          ) : (
            <div className="w-full h-[220px] bg-black/10 rounded-xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export function OnePackOneCodeLandingSection({
  data,
}: {
  data: OnePackOneCodeLandingSectionData;
}) {
  const [activeTab, setActiveTab] = useState<OnePackOneCodeTabId>(data.activeTabId);

  const activeLabel = useMemo(() => {
    return data.tabs.find((t) => t.id === activeTab)?.label;
  }, [activeTab, data.tabs]);

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-6 pb-10">
        {/* Tabs */}
        <div className="mt-6">
          <div className="flex items-stretch justify-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {data.tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-[14px] min-w-[170px] md:min-w-[210px] ring-1 ring-[#D6EEF9] transition-all ${
                    isActive ? 'bg-[#0D72B8] text-white ring-[#0D72B8]' : 'bg-[#ffffff] text-[#0A4A7A]'
                  }`}
                  aria-current={isActive}
                >
                  <span className={`${isActive ? 'text-white' : 'text-[#009FE8]'}`}>
                    <TabIcon id={tab.id} />
                  </span>
                  <span className="text-[12px] md:text-sm font-bold text-center leading-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero video block */}
        <div className="mt-6 rounded-[18px] overflow-hidden bg-[#0c1f45]">
          <div className="relative h-[220px] md:h-[260px]">
            {data.hero.backgroundImage ? (
              <img src={data.hero.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            ) : null}
            <div className="absolute inset-0 bg-[#0c1f45] opacity-35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayOverlayButton />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-white/95 py-3 px-5">
              <div className="text-center text-sm md:text-base font-semibold text-black">{activeLabel}</div>
            </div>
          </div>
        </div>

        {/* Access points */}
        <div className="mt-10">
          <h3 className="text-center text-[#0A4A7A] text-lg md:text-xl font-bold">{data.accessPoints.title}</h3>
          <p className="text-center mt-3 text-sm md:text-base text-black/60 max-w-2xl mx-auto">{data.accessPoints.description}</p>
          <div className="mt-6">
            <Accordion items={data.accessPoints.items} />
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 space-y-14">
          {data.features.map((f) => (
            <FeatureBlock key={f.id} feature={f} />
          ))}
        </div>

        {/* Optional helper */}
        <div className="mt-14 flex justify-center">
          <Link href="/contact" className="text-[#009FE8] font-semibold hover:opacity-80 transition-opacity">
            Contact our team
          </Link>
        </div>
      </div>
    </section>
  );
}

