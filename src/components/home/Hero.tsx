'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { formatBoldText } from '@/lib/htmlText';
import type { Hero } from '@/lib/api/home';

interface HeroProps {
  data: Hero;
}

export default function Hero({ data }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [failedSlideIds, setFailedSlideIds] = useState<Record<string, boolean>>({});
  const categoryScrollerRef = useRef<HTMLDivElement | null>(null);
  const categoryButtonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const slides = data.slides;
  const totalSlides = slides.length;

  // Preload all images
  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = slide.backgroundImage;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Still show content even if some images fail
      });
  }, [slides]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleCategoryClick = (slideIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    goToSlide(slideIndex);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  };

  const currentSlideData = slides[currentSlide];

  useEffect(() => {
    const container = categoryScrollerRef.current;
    const activeButton = categoryButtonRefs.current[currentSlide];
    if (!container || !activeButton) return;

    // Scroll only inside the pill rail (avoid page jump on home).
    const safeLeftPadding = 8;
    const targetLeft = Math.max(0, activeButton.offsetLeft - safeLeftPadding);
    container.scrollTo({
      left: targetLeft,
      behavior: 'smooth',
    });
  }, [currentSlide]);

  return (
    <section className="relative  md:h-screen md:min-h-[max(100dvh,600px)] banner_heights overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1] pointer-events-none'
            }`}
          >
            {/* Background Image */}
            {!failedSlideIds[slide.id] && (
              <Image
                src={slide.backgroundImage}
                alt={slide.category}
                fill
                className="object-cover"
                sizes=""
                priority={index === 0}
                onError={() => {
                  console.error('Image failed to load:', slide.backgroundImage);
                  setFailedSlideIds((prev) => ({ ...prev, [slide.id]: true }));
                }}
              />
            )}
            {/* Gradient Overlay */}
            {/* <div
              className="absolute inset-0 bg-gradient-to-r from-[#0E233C]/50 via-[#0C2F56]/50 to-[#087BFF]/10"
             
            /> */}
            {/* Blur Effect - Reduced */}
            {/* <div className="absolute inset-0 backdrop-blur-[2px]" /> */}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:h-full">
        <div className="container mx-auto px-4 flex flex-col min-h-0 md:h-full">
          {/* Push hero text to the bottom */}
          <div className="mt-auto pb-8 sm:pb-10 md:pb-14 pt-28 sm:pt-32 md:pt-0">
            {/* Category Label */}
            {/* <div className="mb-3">
              <span className="text-white text-sm md:text-base font-medium tracking-wider uppercase">
                {currentSlideData.category}
              </span>
            </div> */}

            {/* Main Headline */}
            <div className="md:max-w-3xl lg:max-w-5xl">
              <h1 className="text-white text-[24px] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight [overflow-wrap:anywhere] lg:mb-0 mb-3 [text-shadow:0_1px_3px_rgba(0,0,0,0.22)]" dangerouslySetInnerHTML={{ __html: formatBoldText(currentSlideData.title) }} />

              <p className="text-[14px] md:text-base md:leading-7 md:line-clamp-4 lg:text-base text-white lg:py-[20px] pt-0 pb-0 lg:!leading-[32px] !leading-[22px] md:max-w-2xl lg:max-w-none lg:pr-[200px] lg:line-clamp-4 line-clamp-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
                {formatBoldText(currentSlideData.description)}
              </p>
            </div>

            {/* CTA Link */}
            <div className="mb-10 lg:mt-0 mt-3">
              <Link
                href={currentSlideData.ctaLink}
                className="inline-flex items-center text-white text-base md:text-lg font-semibold hover:text-[#009FE8] transition-colors group uppercase tracking-wider [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
              >
                {currentSlideData.ctaText}
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Categories + Right-side arrows */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 min-w-0">
              <div
                ref={categoryScrollerRef}
                className="flex items-center gap-3 sm:gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide flex-1 min-w-0 pl-2 pr-2"
              >
                {data.categories.map((category) => (
                  <button
                    key={category.id}
                    ref={(el) => {
                      categoryButtonRefs.current[category.slideIndex] = el;
                    }}
                    onClick={(e) => handleCategoryClick(category.slideIndex, e)}
                    className={`flex-shrink-0 w-max px-3 py-[6px] rounded-full border text-sm md:text-[14px] font-light transition-all whitespace-nowrap cursor-pointer ${
                      currentSlide === category.slideIndex
                        ? 'border border-[#009FE8] text-white bg-[#009FE8] font-semibold'
                        : 'text-white/90 hover:text-white '
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Navigation Arrows - pinned on the right */}
              <div className="flex items-center justify-end sm:justify-start gap-2 flex-shrink-0">
                <button
                  onClick={prevSlide}
                  className="cursor-pointer lg:w-10 lg:h-10 w-8 h-8 rounded-full border border-white bg-transparent hover:bg-white/20 flex items-center justify-center transition-all group"
                  aria-label="Previous slide"
                >
                  <svg
                    className="cursor-pointer w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="cursor-pointer lg:w-10 lg:h-10 w-8 h-8 rounded-full border border-white bg-transparent hover:bg-white/20 flex items-center justify-center transition-all group"
                  aria-label="Next slide"
                >
                  <svg
                    className="cursor-pointer w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform"
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
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
