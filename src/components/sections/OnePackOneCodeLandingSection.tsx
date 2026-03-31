'use client';

import { useState } from 'react';
import type { OnePackOneCodeLandingSectionData, OnePackOneCodeTabId } from '@/fake-api/page-builder';
import Image from 'next/image';
import VideoModalBanner from '../home/VideoModalBanner';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import { ProductCategoryVideoEmbed } from '@/components/sections/ProductCategoryVideoEmbed';

function TabIcon({ id }: { id: OnePackOneCodeTabId }) {
  if (id === 'digital') {
    return (
      <svg className="w-12 h-12" viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="7" width="6" height="10" rx="1.5" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        <path
          d="M11 9h10M11 13h10M11 17h6"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (id === 'lottery') {
    return (
      <svg className="w-12 h-12" viewBox="0 0 24 24" aria-hidden>
        <path d="M7 7h10v10H7z" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 10h6M9 13h4" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'marketing') {
    return (
      <svg className="w-12 h-12" viewBox="0 0 22 22" aria-hidden>
        <path d="M10 14l11-5-11-5v10z" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M3 12h7" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === 'loyalty') {
    return (
      <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2l3.1 6.6 7.3 1.1-5.3 5.1 1.3 7.2L12 18.8 5.6 22l1.3-7.2L1.6 9.7l7.3-1.1L12 2z" stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" aria-hidden>
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
      <Image src="/play_icon_image.png" alt="" width={20} height={20} aria-hidden />
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
  reverse,
}: {
  feature: OnePackOneCodeLandingSectionData['features'][number];
  reverse?: boolean;
}) {
  return (
    <div
      className='grid grid-cols-1 lg:gap-10 gap-5 lg:grid-cols-2 items-center'
    >
      <div className={reverse ? 'lg:order-2' : undefined}>
        <div className="">
          <div className="text-5xl md:text-6xl font-extrabold text-[#B7D7EA] leading-none">{feature.number}</div>
          <div className="min-w-0 lg:py-5 py-3">
            <h3 className="text-[22px] md:text-3xl font-bold text-black">{feature.title}</h3>
          </div>
        </div>
        <div className="space-y-3">
          {feature.bullets.map((b, idx) => (
            <p key={`${feature.id}-${idx}`} className="flex items-start gap-3 text-sm md:text-base text-black/70">
              
              <span className="leading-relaxed">{b}</span>
            </p>
          ))}
        </div>
      </div>

      <div className={reverse ? 'lg:order-1' : undefined}>
        <div className="">
          {feature.image ? (
            <Image
              src={feature.image}
              alt={feature.title}
              width={800}
              height={600}
              className="w-full object-contain rounded-[50px]"
              priority={false}
            />
          ) : (
            <div className="" />
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
  const rawTitle = data.breadcrumbs?.[data.breadcrumbs.length - 1]?.label ?? 'One Pack One Code';
  const { leftTitle, rightTitle } = (() => {
    // Keep the same "OnePack OneCode" visual even if the API title changes.
    const normalized = rawTitle.replace(/\s+/g, ' ').trim();
    if (/one\s*pack/i.test(normalized) && /one\s*code/i.test(normalized)) {
      return { leftTitle: 'OnePack', rightTitle: 'OneCode' };
    }

    const words = normalized.split(' ').filter(Boolean);
    if (words.length >= 2) {
      return { leftTitle: words.slice(0, -1).join(''), rightTitle: words[words.length - 1] };
    }
    return { leftTitle: normalized, rightTitle: '' };
  })();

  return (
    <>
    <section className="bg-gray-50 lg:pt-20 pt-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-[26px] md:text-5xl font-extrabold tracking-tight text-black">
            <span>{leftTitle}</span>
            {rightTitle ? (
              <span className="relative inline-block text-[#009FE8] ml-2">
                {rightTitle}
              
              </span>
            ) : null}
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-8 pb-6 grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
          {data.tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex flex-col items-center justify-center gap-3 py-8 px-3 rounded-[20px] transition-colors ${
                  isActive ? 'bg-white' : 'bg-white'
                }`}
                aria-current={isActive}
              >
                <span className="text-[#009FE8]">
                  <TabIcon id={tab.id} />
                </span>
                <span className="text-[11px] md:text-xs font-bold text-black/90 uppercase tracking-wider text-center leading-tight break-words">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Access points + features */}
      <div className="container w-full px-4 mx-auto">

        <div className="lg:mt-12 mt-8 lg:space-y-20 space-y-10 w-full">
          {data.features.map((f, idx) => (
            <FeatureBlock key={f.id} feature={f} reverse={idx % 2 === 1} />
          ))}
        </div>
      </div>

    

      {data.hero.videoUrl ? (
        <ProductCategoryVideoEmbed videoUrl={data.hero.videoUrl} />
      ) : null}

    </section>

    {data.connectSection && (
      <ConnectTechnicalExperts
        heading={data.connectSection.heading}
        headingHighlight={data.connectSection.headingHighlight}
        formTitle={data.connectSection.formTitle}
        illustrationImage={data.connectSection.illustrationImage}
        illustrationAlt={data.connectSection.illustrationAlt}
      />
    )}

      <div className="bg-gray-50 pt-12">
        <CallToAction />
      </div>

      <NewsletterSubscription />

    </>
  );
}

