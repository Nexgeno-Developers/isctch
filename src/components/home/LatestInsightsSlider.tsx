'use client';

import { useState, createContext, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { InsightCard } from '@/fake-api/homepage';

// Create context for sharing slider state
const SliderContext = createContext<{
  currentIndex: number;
  cardsPerView: number;
  maxIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
} | null>(null);

// Provider component
function SliderProvider({ children, cards }: { children: React.ReactNode; cards: InsightCard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;
  const maxIndex = Math.max(0, cards.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <SliderContext.Provider value={{ currentIndex, cardsPerView, maxIndex, nextSlide, prevSlide }}>
      {children}
    </SliderContext.Provider>
  );
}

// Navigation component
export function Navigation({ cards }: { cards: InsightCard[] }) {
  const context = useContext(SliderContext);
  if (!context) return null;

  const { prevSlide, nextSlide, cardsPerView } = context;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={prevSlide}
        className="lg:w-12 lg:h-12 w-8 h-8 rounded-full lg:border-2 border-1 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous insights"
        disabled={cards.length <= cardsPerView}
      >
        <svg
          className="lg:w-6 lg:h-6 w-4 h-4 text-[#009FE8] group-hover:text-white transition-colors"
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
        className="lg:w-12 lg:h-12 w-8 h-8 rounded-full lg:border-2 border-1 border-[#009FE8] bg-white hover:bg-[#009FE8] flex items-center justify-center transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next insights"
        disabled={cards.length <= cardsPerView}
      >
        <svg
          className="lg:w-6 lg:h-6 w-4 h-4 text-[#009FE8] group-hover:text-white transition-colors"
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
  );
}

// Cards component
export function Cards({ cards }: { cards: InsightCard[] }) {
  const context = useContext(SliderContext);
  if (!context) {
    // Fallback if context is not available
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.slice(0, 3).map((card) => (
          <InsightCard key={card.id} card={card} />
        ))}
      </div>
    );
  }

  const { currentIndex, cardsPerView } = context;
  const visibleCards = cards.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {visibleCards.map((card) => (
        <InsightCard key={card.id} card={card} />
      ))}
    </div>
  );
}

// Main component - Wraps children in provider
export default function LatestInsightsSlider({ 
  cards, 
  children 
}: { 
  cards: InsightCard[]; 
  children: React.ReactNode;
}) {
  return (
    <SliderProvider cards={cards}>
      {children}
    </SliderProvider>
  );
}


/**
 * Insight Card Component
 */
function InsightCard({ card }: { card: InsightCard }) {
  return (
    <Link
      href={card.link}
      className="block group h-full"
    >
      <div className="rounded-[50px] overflow-hidden transition-shadow duration-300 h-full bg-[#009FE8] p-[15px]">
        {/* Image */}
        <div className="relative h-64 md:h-72 overflow-hidden rounded-t-[50px]">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content - Blue Background */}
        <div className="bg-[#009FE8] p-4 md:p-6">
          {/* Category and Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm md:text-base font-medium uppercase tracking-wide">
              {card.category}
            </span>
            <span className="text-white text-sm md:text-base font-medium">
              {card.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
            {card.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
