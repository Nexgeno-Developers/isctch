'use client';

import { Fragment, useState } from 'react';
import type { OnePackOneCodeLandingSectionData } from '@/lib/api/product_category_layout_4';
import Image from 'next/image';
import Link from 'next/link';
import VideoBanner from '@/components/home/VideoBanner';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';

function HeroBreadcrumbs({
  items,
}: {
  items: OnePackOneCodeLandingSectionData['breadcrumbs'];
}) {
  const safeItems = items || [];

  return (
    <nav className="flex items-center gap-2 text-sm md:text-base" aria-label="Breadcrumb">
      <Link href="/" className="text-black hover:text-black transition-colors" aria-label="Home">
        <svg className="lg:w-5 w-4 lg:h-5 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <svg className="lg:w-4 w-3 lg:h-4 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            {item.href && !isLast ? (
              <Link href={item.href} className="text-black hover:text-black transition-colors lg:text-sm text-xs">
                {item.label}
              </Link>
            ) : (
              <span className="text-black lg:text-sm text-xs">{item.label}</span>
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
              {isOpen ? (
                <div className="px-4 pb-4 text-sm text-black/70 leading-relaxed">{it.content}</div>
              ) : null}
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
    <div className="grid grid-cols-1 lg:gap-10 gap-5 lg:grid-cols-2 items-center">
      <div className={reverse ? 'lg:order-2' : undefined}>
        <div className="">
          <div className="text-5xl md:text-6xl font-extrabold text-[#B7D7EA] leading-none">{feature.number}</div>
          <div className="min-w-0 lg:py-5 py-3">
            <h3 className="text-[22px] md:text-3xl md:text-5xl font-bold text-black">{feature.title}</h3>
          </div>
        </div>
        <div className="space-y-3">
          {feature.bullets.map((b, idx) => (
            <p key={`${feature.id}-${idx}`} className="flex items-start gap-3 text-sm md:text-base text-black">
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

export default function OnePackOneCodeLandingSectionClient({
  data,
}: {
  data: OnePackOneCodeLandingSectionData & { title?: string };
}) {
  const titleText = data.title || 'One Pack One Code';
  const videoUrl = cleanVideoUrlFromApi(data.hero.videoUrl);

  return (
    <>
      <section className="relative lg:pt-[200px] md:pt-[150px] pt-[120px] lg:pb-[80px] md:pb-[50px] pb-[44px] overflow-hidden">
        <div className="absolute inset-0">
          {data.hero.backgroundImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.hero.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
        </div>

        <div className="relative z-10 h-full flex lg:items-center md:items-end justify-center text-center px-4">
          <h1 className="text-[24px] md:text-3xl lg:text-6xl xl:text-6xl font-bold text-white tracking-tight leading-tight">
            {titleText}
          </h1>
        </div>
      </section>

      
        <div className="container mx-auto px-4 py-4">
          <HeroBreadcrumbs items={data.breadcrumbs} />
        </div>

      <section className="bg-gray-50 pb-0 lg:pt-12 pt-8">
        <div className="container mx-auto px-4">
          <div className="lg:mt-10 mt-0 pb-6 grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
            {data.tabs.map((tab) => (
              <div
                key={tab.id}
                className="w-full flex flex-col items-center justify-center gap-3 lg:py-8 py-4 px-3 rounded-[20px] bg-white"
              >
                {tab.iconUrl ? (
                  <Image
                    src={tab.iconUrl}
                    alt={tab.label}
                    width={120}
                    height={120}
                    className="lg:h-[100px] lg:w-[100px] h-[70px] w-[70px] object-contain"
                    priority={false}
                  />
                ) : null}
                <span className="text-[11px] md:text-xs font-bold text-black/90 uppercase tracking-wider text-center leading-tight break-words">
                  {tab.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {data.features.map((f, idx) => {
        const isSecondBg = idx % 2 === 1;
        return (
          <Fragment key={f.id}>
            <section className={isSecondBg ? 'bg-[#009de61a]' : 'bg-gray-50'}>
              <div className="container w-full px-4 mx-auto py-10 md:py-14 lg:py-24">
                <FeatureBlock feature={f} reverse={idx % 2 === 1} />
              </div>
            </section>
          </Fragment>
        );
      })}

<div className="">
{videoUrl ? (
        <VideoBanner
          prefetchedData={{
            title: '',
            preTitle: '',
            ctaText: '',
            ctaLink: '',
            videoUrl,
          }}
        />
      ) : null}
</div>
      
      
     
    </>
  );
}

