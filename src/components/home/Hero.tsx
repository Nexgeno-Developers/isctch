'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Hero } from '@/fake-api/homepage';

interface HeroProps {
  data: Hero;
}

export default function Hero({ data }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const slides = data.slides;
  const totalSlides = slides.length;

  // Preload all images
  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
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

  return (
    <section className="relative h-[100dvh] md:h-screen min-h-[max(100dvh,600px)] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 z-[-1] pointer-events-none'
            }`}
          >
            {/* Background Image using img tag */}
            <img
              src={slide.backgroundImage}
              alt={slide.category}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                console.error('Image failed to load:', slide.backgroundImage);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#0E233C]/95 via-[#0C2F56]/60 to-[#087BFF]/10"
             
            />
            {/* Blur Effect - Reduced */}
            {/* <div className="absolute inset-0 backdrop-blur-[2px]" /> */}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col min-h-0">
          {/* Push hero text to the bottom */}
          <div className="mt-auto pb-8 sm:pb-10 md:pb-14 pt-20 sm:pt-24 md:pt-0">
            {/* Category Label */}
            <div className="mb-3">
              <span className="text-white text-sm md:text-base font-medium tracking-wider uppercase">
                {currentSlideData.category}
              </span>
            </div>

            {/* Main Headline */}
            <div className="mb-6 max-w-5xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight [overflow-wrap:anywhere]">
                <span className="text-white">{currentSlideData.title}</span>
                <br />
                <span className="text-[#009FE8]">{currentSlideData.titleHighlight}</span>
              </h1>
            </div>

            {/* CTA Link */}
            <div className="mb-10">
              <Link
                href={currentSlideData.ctaLink}
                className="inline-flex items-center text-white text-base md:text-lg font-semibold hover:text-[#009FE8] transition-colors group uppercase tracking-wider"
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
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide flex-1 min-w-0 -mx-1 px-1">
                {data.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={(e) => handleCategoryClick(category.slideIndex, e)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm md:text-base font-light transition-all whitespace-nowrap cursor-pointer ${
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
                  className="cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full border border-white bg-transparent hover:bg-white/20 flex items-center justify-center transition-all group"
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
                  className="cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full border border-white bg-transparent hover:bg-white/20 flex items-center justify-center transition-all group"
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
