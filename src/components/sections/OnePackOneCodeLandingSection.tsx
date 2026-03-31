'use client';

import { useState } from 'react';
import type { OnePackOneCodeLandingSectionData } from '@/fake-api/page-builder';
import Image from 'next/image';
import Link from 'next/link';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import { ProductCategoryVideoEmbed } from '@/components/sections/ProductCategoryVideoEmbed';

function HeroBreadcrumbs({
  items,
}: {
  items: OnePackOneCodeLandingSectionData['breadcrumbs'];
}) {
  const safeItems = items || [];

  return (
    <nav
      className="flex items-center gap-2 text-sm md:text-base"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="text-black hover:text-black transition-colors"
        aria-label="Home"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </Link>

      {safeItems.map((item, index) => {
        const isLast = index === safeItems.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-black hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
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
  data: OnePackOneCodeLandingSectionData & { title?: string };
}) {
  // Title comes from layout 4 API (product_category_detail_4)
  const titleText = data.title || 'One Pack One Code';

  return (
    <>
    <section className="relative overflow-hidden bg-[#0c1f45] h-[260px] md:h-[420px]">
      <div className="absolute inset-0">
        {data.hero.backgroundImage ? (
          <img
            src={data.hero.backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
      </div>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <h1 className="text-[26px] md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {titleText}
        </h1>
      </div>
    </section>

    <section className="bg-white">
      <div className="container mx-auto px-4 py-4">
        <HeroBreadcrumbs items={data.breadcrumbs} />
      </div>
    </section>

    <section className="bg-gray-50 pb-12">
      <div className="container mx-auto px-4">
        <div className="mt-10 pb-6 grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
          {data.tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                className="w-full flex flex-col items-center justify-center gap-3 py-8 px-3 rounded-[20px] bg-white"
              >
                {tab.iconUrl ? (
                  <Image
                    src={tab.iconUrl}
                    alt={tab.label}
                    width={64}
                    height={64}
                    className="h-12 w-12 object-contain"
                    priority={false}
                  />
                ) : null}
                <span className="text-[11px] md:text-xs font-bold text-black/90 uppercase tracking-wider text-center leading-tight break-words">
                  {tab.label}
                </span>
              </div>
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

    

      {data.hero.videoUrl ? <ProductCategoryVideoEmbed videoUrl={data.hero.videoUrl} /> : null}
    </section>

    <ConnectTechnicalExperts
      heading=""
      headingHighlight=""
      formTitle={data.connectSection?.formTitle || 'Send Us A Message'}
      illustrationImage={data.connectSection?.illustrationImage || '/connected_image.jpg'}
      illustrationAlt={data.connectSection?.illustrationAlt || 'Connect with Technical Experts'}
    />

      <div className="bg-gray-50 pt-12">
        <CallToAction />
      </div>

      <NewsletterSubscription />

    </>
  );
}

