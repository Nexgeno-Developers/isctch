'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchHomepageData } from '@/lib/api';
import type { VideoBannerData } from '@/fake-api/homepage';

interface VideoBannerProps {
  videoOnly?: boolean; // If true, hides text and CTA, shows only video
}

/**
 * Video Banner Component (Client Component)
 * 
 * Fetches homepage data and renders the video banner with play functionality.
 */
export default function VideoBanner({ videoOnly = false }: VideoBannerProps = {}) {
  const [data, setData] = useState<VideoBannerData | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    async function loadData() {
      const homepageData = await fetchHomepageData();
      setData(homepageData.videoBanner);
    }
    loadData();
  }, []);

  if (!data) return null;

  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Background Video/GIF - Autoplay - Hidden when video is playing */}
      {!isVideoPlaying && (
        <div className="absolute inset-0">
          {data.videoUrl ? (
            data.videoUrl.endsWith('.gif') ? (
              <img
                src={data.videoUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <video
                src={data.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0E233C8C]" />
          {/* Blur Effect */}
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
      )}

      {/* Video Player - Shows when play button is clicked */}
      {isVideoPlaying && data.videoUrl && (
        <div className="absolute inset-0 z-20">
          <video
            src={data.videoUrl}
            autoPlay
            controls
            className="w-full h-full object-cover"
            onEnded={() => setIsVideoPlaying(false)}
          />
        </div>
      )}

      {/* Content - Hidden when video is playing */}
      {!isVideoPlaying && !videoOnly && (
        <div className="relative z-10 h-full flex flex-col items-center px-4">
          {/* Main Title - Top */}
          <div className="pt-8 md:pt-20 lg:pt-20">
            <h2 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-white text-center">
              {data.title}
            </h2>
          </div>

          {/* Play Button */}
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="cursor-pointer w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all group shadow-lg"
              aria-label="Play video"
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* CTA Link - Bottom */}
          <div className="pb-10 md:pb-20">
            <Link
              href={data.ctaLink}
              className="inline-flex items-center text-white text-lg md:text-[32px] font-medium hover:text-[#009FE8] transition-colors group"
            >
              {data.ctaText}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 ml-2 transform group-hover:translate-x-1 transition-transform"
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
        </div>
      )}

      {/* Play Button Only - When videoOnly is true */}
      {!isVideoPlaying && videoOnly && (
        <div className="relative z-10 h-full flex items-center justify-center">
          <button
            onClick={() => setIsVideoPlaying(true)}
            className="cursor-pointer w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all group shadow-lg"
            aria-label="Play video"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1 group-hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
