'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { InsightItem } from '@/lib/api/insights_layout';

export type InsightCardVariant = 'articles' | 'webinar' | 'newsletter';

const shellByVariant: Record<InsightCardVariant, string> = {
  articles: 'bg-[#E5F2FA] border border-[#B7D7EA]/35',
  webinar: 'bg-white shadow-sm border border-black/5',
  newsletter: 'bg-[#E5F2FA] border border-[#B7D7EA]/35',
};

export function InsightCard({
  item,
  variant,
}: {
  item: InsightItem;
  variant: InsightCardVariant;
}) {
  const shell = shellByVariant[variant];
  const imageSrc = item.image?.trim();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const showImage = Boolean(imageSrc) && !isError;

  return (
    <article
      className={`w-full sm:w-1/1 md:w-1/2 lg:w-1/3 max-w-sm flex flex-col overflow-hidden rounded-[50px] bg-white p-4 md:p-5 h-full`}
    >
      <div className="relative w-full overflow-hidden rounded-[50px] bg-gray-100">
        {showImage ? (
          <>
            <div
              className={`absolute inset-0 rounded-[50px] bg-gradient-to-br from-[#F5FAFF] to-[#D7EEF9] transition-opacity duration-500 ${
                isLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              aria-hidden
            />
            {!isLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-10 w-10 rounded-full border-4 border-[#E5F2FA] border-t-[#009FE8] animate-spin" />
              </div>
            ) : null}
            <Image
              src={imageSrc as string}
              alt={item.imageAlt}
              height={1000}
              width={1000}
              onLoadingComplete={() => setIsLoaded(true)}
              onError={() => setIsError(true)}
              className={`h-[250px] w-full rounded-[50px] object-cover object-top transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#B7D7EA]/40 to-[#009FE8]/20" />
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col pt-4 pb-4 px-3">
        <h3
          className="text-base md:text-[20px] font-bold text-[#009FE8] leading-snug line-clamp-2"
          dangerouslySetInnerHTML={{ __html: item.title }}
        />
        <p
          className="mt-2 text-sm md:text-[15px] text-black leading-relaxed flex-1 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
        <div className="mt-2 pt-1">
          <Link
            href={item.href}
            className="text-sm md:text-[15px] capitalize font-bold text-black hover:text-[#009FE8] transition-colors inline-flex items-center gap-1"
          >
            Read more
           
          </Link>
        </div>
      </div>
    </article>
  );
}
