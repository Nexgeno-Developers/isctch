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
    <section className="relative h-screen min-h-[600px] overflow-hidden">
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
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(83.04deg, #0E233C 13.24%, rgba(12, 47, 86, 0.607692) 69.2%, rgba(11, 59, 113, 0.2) 92.42%)',
              }}
            />
            {/* Blur Effect - Reduced */}
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="container mx-auto flex-1 flex flex-col justify-center">
          {/* Category Label */}
          <div className="mb-4">
            <span className="text-white text-sm md:text-base font-medium tracking-wider uppercase">
              {currentSlideData.category}
            </span>
          </div>

          {/* Main Headline */}
          <div className="mb-8 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
              <span className="text-white">{currentSlideData.title}</span>
              <br />
              <span className="text-[#00d4ff]">{currentSlideData.titleHighlight}</span>
            </h1>
          </div>

          {/* CTA Link */}
          <div className="mb-12">
            <Link
              href={currentSlideData.ctaLink}
              className="inline-flex items-center text-white text-lg font-medium hover:text-[#00d4ff] transition-colors group"
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

          {/* Product Categories */}
          <div className="mt-auto pb-8 md:pb-12">
            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {data.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={(e) => handleCategoryClick(category.slideIndex, e)}
                  className={`flex-shrink-0 px-4 py-2 border rounded-full text-sm md:text-base font-medium transition-all whitespace-nowrap cursor-pointer ${
                    currentSlide === category.slideIndex
                      ? 'border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff] bg-opacity-10'
                      : 'border-white text-white hover:border-[#00d4ff] hover:text-[#00d4ff]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
              {/* Navigation Arrows - Right Side Only */}
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#00d4ff] bg-transparent hover:bg-[#00d4ff] hover:bg-opacity-20 flex items-center justify-center transition-all group"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00d4ff] group-hover:scale-110 transition-transform"
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
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#00d4ff] bg-transparent hover:bg-[#00d4ff] hover:bg-opacity-20 flex items-center justify-center transition-all group"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-[#00d4ff] group-hover:scale-110 transition-transform"
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


        {/* Slide Indicators */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-[#00d4ff] w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
