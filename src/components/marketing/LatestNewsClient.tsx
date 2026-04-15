'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { formatCardDate, formatCardTime } from '@/lib/dateTime';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';

export interface MarketingNewsItem {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  date?: string;
  time?: string;
}

interface LatestNewsClientProps {
  trendItems: MarketingNewsItem[];
  pressItems: MarketingNewsItem[];
}

export default function LatestNewsClient({ trendItems, pressItems }: LatestNewsClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const hasTrend = trendItems.length > 0;
  const hasPress = pressItems.length > 0;
  const [activeTab, setActiveTab] = useState<'trend' | 'press'>(hasTrend ? 'trend' : 'press');

  if (!hasTrend && !hasPress) {
    return null;
  }

  const effectiveTab =
    activeTab === 'trend' && !hasTrend
      ? 'press'
      : activeTab === 'press' && !hasPress
        ? 'trend'
        : activeTab;

  const items = effectiveTab === 'trend' ? trendItems : pressItems;
  const shouldLoop = items.length > 3;

  return (
    <section className="bg-gray-50 pb-8 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-3 md:mb-4">
          <h2 className="text-[22px] md:text-4xl lg:text-5xl text-black font-bold mb-0 md:mb-4 lg:leading-[70px] text-center">
            Latest <span className="text-[#009FE8]">News</span>
          </h2>
        </div>

        {/* Tabs */}
        {hasTrend && hasPress ? (
          <div className="flex justify-center mb-4 md:mb-10">
            <div className="inline-flex items-center gap-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('trend');
                  swiperRef.current?.slideToLoop(0);
                }}
                className={`cursor-pointer pb-3 text-sm md:text-base font-semibold transition-colors border-b-2 ${
                  effectiveTab === 'trend'
                    ? 'text-[#009FE8] border-[#009FE8]'
                    : 'text-gray-500 border-transparent hover:text-[#009FE8]'
                }`}
              >
                Trend &amp; Insight
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('press');
                  swiperRef.current?.slideToLoop(0);
                }}
                className={`cursor-pointer pb-3 text-sm md:text-base font-semibold transition-colors border-b-2 ${
                  effectiveTab === 'press'
                    ? 'text-[#009FE8] border-[#009FE8]'
                    : 'text-gray-500 border-transparent hover:text-[#009FE8]'
                }`}
              >
                Press Release
              </button>
            </div>
          </div>
        ) : null}

        {/* Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={shouldLoop}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 32,
            },
            992: {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 32,
            },
          }}
          speed={500}
          pagination={{
            clickable: true,
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="bg-[#EDF0F1] rounded-[50px] p-[15px] overflow-hidden flex flex-col h-full">
                <div className="relative w-full pt-[70%] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover rounded-[50px]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="px-6 pt-5 pb-6 flex-1 flex flex-col">
                  {(() => {
                    const metaTime = formatCardTime(item.time);
                    const metaDate = formatCardDate(item.date);
                    if (!metaTime && !metaDate) return null;
                    return (
                      <div className="flex items-center justify-between gap-4 text-xs text-[#7A7A7A] md:text-sm">
                        {metaTime ? (
                          <div className="inline-flex items-center gap-2">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                            >
                              <path
                                d="M12 6v6l3 3"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                            </svg>
                            <span className="font-medium">{metaTime}</span>
                          </div>
                        ) : (
                          <span aria-hidden />
                        )}

                        {metaDate ? (
                          <div className="inline-flex items-center gap-2">
                            <svg
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                            >
                              <rect
                                x="4"
                                y="5"
                                width="16"
                                height="15"
                                rx="2"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              />
                              <path d="M4 9h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                              <path
                                d="M9 4v3M15 4v3"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="font-medium">{metaDate}</span>
                          </div>
                        ) : null}
                      </div>
                    );
                  })()}
                  
                  <h3 className="text-[18px] md:text-xl font-semibold text-black mb-0 leading-snug mt-3 line-clamp-2">
                    {item.title}
                  </h3>

                
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

