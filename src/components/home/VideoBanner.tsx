'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchHomepageData } from '@/lib/api';
import type { VideoBannerData } from '@/fake-api/homepage';

interface VideoBannerProps {
  videoOnly?: boolean; // If true, hides text and CTA, shows only video
}

function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      return id || null;
    }

    if (u.hostname.includes('youtube.com')) {
      // /watch?v=ID
      const v = u.searchParams.get('v');
      if (v) return v;

      // /embed/ID
      const parts = u.pathname.split('/').filter(Boolean);
      const embedIdx = parts.findIndex((p) => p === 'embed');
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];
    }
  } catch {
    // ignore
  }

  return null;
}

function getYouTubeEmbedSrc(videoUrl: string): { id: string; src: string } | null {
  const id = parseYouTubeId(videoUrl);
  if (!id) return null;

  // Keep it simple: use embed with autoplay on click.
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&playsinline=1`;
  return { id, src };
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

  // Keep hook order stable across renders (avoid early return before calling hooks).
  useEffect(() => {
    const youtube = data?.videoUrl ? getYouTubeEmbedSrc(data.videoUrl) : null;
    if (!isVideoPlaying || !youtube) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoPlaying(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVideoPlaying, data?.videoUrl]);

  if (!data) return null;

  const youtube = data.videoUrl ? getYouTubeEmbedSrc(data.videoUrl) : null;

  const backgroundInnerEl = (() => {
    if (!data.videoUrl) return <div className="w-full h-full bg-gray-800" />;
    if (youtube) {
      return (
        <img
          src={`https://img.youtube.com/vi/${youtube.id}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }
    if (data.videoUrl.endsWith('.gif')) {
      return <img src={data.videoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />;
    }

    return (
      <video
        src={data.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  })();

  const playerEl = (() => {
    if (!isVideoPlaying || !data.videoUrl) return null;
    if (youtube) {
      return (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[18px] overflow-hidden">
            <button
              type="button"
              onClick={() => setIsVideoPlaying(false)}
              className="cursor-pointer z-10 absolute top-[10px] right-3 h-10 w-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Close video"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe
              src={youtube.src}
              title="YouTube video"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen={true}
              frameBorder={0}
            ></iframe>
          </div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 z-20">
        <video
          src={data.videoUrl}
          autoPlay
          controls
          className="w-full h-full object-cover"
          onEnded={() => setIsVideoPlaying(false)}
        />
      </div>
    );
  })();

  return (
    <>
      {!videoOnly && (data.preTitleBlue || data.preTitleBlack || data.preDescription) && (
        <section className="bg-gray-50 py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {data.preTitleBlue ? <span className="text-[#009FE8]">{data.preTitleBlue}</span> : null}{' '}
                {data.preTitleBlack ? <span className="text-black">{data.preTitleBlack}</span> : null}
              </h2>
              {data.preDescription ? (
                <p className="mt-4 text-sm md:text-base text-black leading-relaxed max-w-5xl mx-auto">
                  {data.preDescription}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <section className="relative min-h-[70dvh] h-[100dvh] md:h-screen md:min-h-0 overflow-hidden">
      {/* Background Video/GIF - Autoplay - Hidden when video is playing */}
      {!isVideoPlaying && (
        <div className="absolute inset-0">
          {backgroundInnerEl}
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0E233C8C]" />
          {/* Blur Effect */}
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
      )}

      {/* Video Player - Shows when play button is clicked */}
      {playerEl}

      {/* Content - Hidden when video is playing */}
      {!isVideoPlaying && !videoOnly && (
        <div className="relative z-10 h-full flex flex-col items-center px-4">
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
    </>
  );
}
