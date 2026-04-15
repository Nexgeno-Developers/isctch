'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { VideoBannerData } from '@/lib/api/home';
import { formatBoldText } from '@/lib/htmlText';

interface VideoBannerProps {
  videoOnly?: boolean; // If true, hides text and CTA, shows only video
  /** Optional: override video URL instead of homepage video */
  videoUrl?: string;
  /** Server-fetched homepage video banner (avoids a duplicate client fetch) */
  prefetchedData?: VideoBannerData;
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

  // Modal / “full” playback: sound allowed when user opens modal (autoplay starts playback).
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&playsinline=1`;
  return { id, src };
}

/** Muted autoplay loop for hero background (no controls, not clickable). */
function getYouTubeBackgroundEmbedSrc(videoUrl: string): string | null {
  const id = parseYouTubeId(videoUrl);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&loop=1&playlist=${id}&modestbranding=1&iv_load_policy=3&disablekb=1`;
}

type YoutubeThumbQuality = 'maxresdefault' | 'sddefault' | 'hqdefault';

/**
 * Poster for YouTube: remount via `key={videoUrl}` on the parent resets quality to maxres
 * (avoids setState in an effect when the URL changes).
 */
function YouTubeThumbnailBackground({ videoUrl }: { videoUrl: string }) {
  const youtube = getYouTubeEmbedSrc(videoUrl);
  const [variant, setVariant] = useState<YoutubeThumbQuality>('maxresdefault');

  if (!youtube) return null;

  return (
    <Image
      src={`https://img.youtube.com/vi/${youtube.id}/${variant}.jpg`}
      alt=""
      fill
      className="object-cover"
      sizes="100vw"
      onError={() => {
        setVariant((current) => {
          if (current === 'maxresdefault') return 'sddefault';
          if (current === 'sddefault') return 'hqdefault';
          return current;
        });
      }}
    />
  );
}

/**
 * Video Banner Component (Client Component)
 * 
 * Fetches homepage data and renders the video banner with play functionality.
 */
export default function VideoBanner({
  videoOnly = false,
  videoUrl,
  prefetchedData,
}: VideoBannerProps = {}) {
  const [data, setData] = useState<VideoBannerData | null>(prefetchedData ?? null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (prefetchedData) {
        setData(prefetchedData);
        return;
      }
      if (videoUrl) {
        setData({
          title: '',
          preTitle: '',
          ctaText: '',
          ctaLink: '',
          videoUrl,
        });
        return;
      }
      try {
        const res = await fetch('/api/home');
        if (!res.ok) {
          setData(null);
          return;
        }
        const payload = (await res.json()) as { videoBanner?: VideoBannerData | null };
        setData(payload?.videoBanner ?? null);
      } catch {
        setData(null);
      }
    }
    loadData();
  }, [videoUrl, prefetchedData]);

  useEffect(() => {
    // Warm up YouTube hosts to reduce modal startup delay.
    const urls = ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://i.ytimg.com'];
    const links = urls.map((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      return link;
    });
    return () => {
      links.forEach((link) => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
    };
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
      const bgSrc = getYouTubeBackgroundEmbedSrc(data.videoUrl);
      if (!bgSrc) {
        return (
          <div className="absolute inset-0">
            <YouTubeThumbnailBackground key={data.videoUrl} videoUrl={data.videoUrl} />
          </div>
        );
      }
      return (
        <div className="absolute inset-0 overflow-hidden bg-black">
          {/* 16:9 iframe scaled to cover viewport (muted autoplay loop) */}
          <iframe
            key={bgSrc}
            title="Background video"
            src={bgSrc}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[100vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="eager"
          />
          {/* <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden /> */}
        </div>
      );
    }
    if (data.videoUrl.endsWith('.gif')) {
      /* eslint-disable-next-line @next/next/no-img-element -- GIF `src` may be any origin; not all hosts are in `images.remotePatterns`. */
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-[5px]"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setIsVideoPlaying(false)}
            aria-label="Close video"
          />
          {/* Close sits above the player so it never overlaps YouTube’s own controls (settings, etc.) */}
          <div className="relative z-[101] flex w-full max-w-5xl flex-col gap-3">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoPlaying(false);
                }}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-[#0E233C]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:border-[#009FE8] hover:bg-[#009FE8]"
                aria-label="Close video"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-[18px] border border-white/20 bg-black shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              {!playerReady && (
                <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/60">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                </div>
              )}
              <iframe
                src={youtube.src}
                title="YouTube video"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={true}
                frameBorder={0}
                loading="eager"
                onLoad={() => setPlayerReady(true)}
              />
            </div>
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
          preload="auto"
          onCanPlay={() => setPlayerReady(true)}
        />
      </div>
    );
  })();

  return (
    <>
      
      <section className="relative min-h-[200px] h-[200px] md:h-[450px] lg:h-screen md:min-h-0 overflow-hidden">
      {/* Background video always mounted so it keeps playing behind the lightbox */}
      <div className="absolute inset-0 z-0">
        {backgroundInnerEl}
      </div>

      {/* Modal (YouTube) or inline player (file video) — sits above background */}
      {playerEl}

      {/* Content - Hidden when video is playing */}
      {!isVideoPlaying && !videoOnly && (
        <div className="relative z-10 lg:min-h-[200px] min-h-[200px] md:h-full flex flex-col items-center px-4">
          {/* Play Button */}
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={() => {
                setPlayerReady(false);
                setIsVideoPlaying(true);
              }}
              className="group flex cursor-pointer items-center justify-center rounded-full bg-white/40 p-5 transition lg:p-7"
              aria-label="Play video"
            >
              <Image
                src="/arrow_icon.png"
                alt=""
                width={72}
                height={72}
                className="transition-transform group-hover:scale-110 lg:h-[40px] lg:w-[40px] h-[25px] w-[25px]"
              />
            </button>
          </div>

          
        </div>
      )}

      {/* Play Button Only - When videoOnly is true */}
      {!isVideoPlaying && videoOnly && (
        <div className="relative z-10 min-h-[200px] md:h-full flex items-center justify-center">
          <button
            onClick={() => {
              setPlayerReady(false);
              setIsVideoPlaying(true);
            }}
            className="group flex cursor-pointer items-center justify-center rounded-full bg-white/40 p-5 transition lg:p-7"
            aria-label="Play video"
          >
            <Image
              src="/arrow_icon.png"
              alt=""
              width={72}
              height={72}
              className="transition-transform group-hover:scale-110 lg:h-[40px] lg:w-[40px] h-[25px] w-[25px]"
            />
          </button>
        </div>
      )}
      </section>
    </>
  );
}
