'use client';

import { useEffect, useId, useState } from 'react';
import Image from 'next/image';

type VideoModalClientProps = {
  /** Video URL: mp4/webm or YouTube/Vimeo embed link */
  videoUrl: string;
  /** Optional modal title text */
  modalTitle?: string;
  /** Optional: poster/thumbnail behind play button */
  posterUrl?: string;
  posterAlt?: string;
  /** Optional: extra classes for wrapper */
  className?: string;
};

const isProbablyMp4 = (url: string) => /\.mp4(\?|#|$)/i.test(url);
const isProbablyWebm = (url: string) => /\.webm(\?|#|$)/i.test(url);
const isProbablyMov = (url: string) => /\.mov(\?|#|$)/i.test(url);

/** CMS file URLs (e.g. /storage/.../file.mp4) without going through YouTube/Vimeo embed. */
const isDirectVideoFileUrl = (url: string) => {
  if (/(?:youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)/i.test(url)) return false;
  return isProbablyMp4(url) || isProbablyWebm(url) || isProbablyMov(url);
};

export default function VideoModalClient({
  videoUrl,
  modalTitle = 'Video',
  posterUrl,
  posterAlt = '',
  className,
}: VideoModalClientProps) {
  const [open, setOpen] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const titleId = useId();
  const modalId = useId();

  useEffect(() => {
    if (!open) return;
    setPlayerReady(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    // Warm up common video hosts so modal playback starts faster.
    const urls = [
      'https://www.youtube.com',
      'https://www.youtube-nocookie.com',
      'https://i.ytimg.com',
      'https://player.vimeo.com',
    ];
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

  const isFileVideo = isDirectVideoFileUrl(videoUrl);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative w-full h-full overflow-hidden focus:outline-none cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? modalId : undefined}
      >
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterUrl}
            alt={posterAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0" />
        )}
        {/* <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden /> */}

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="group flex cursor-pointer items-center justify-center rounded-full bg-white/40 p-4 transition md:p-5">
            <Image
              src="/arrow_icon.png"
              alt=""
              width={72}
              height={72}
              className="h-6 w-6 transition-transform group-hover:scale-110 md:h-8 md:w-8"
              aria-hidden
            />
          </span>
        </span>

        <span className="sr-only">Play video{modalTitle ? `: ${modalTitle}` : ''}</span>
      </button>

      {open && (
        <div
          id={modalId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-[5px]"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setOpen(false)}
            aria-label="Close video"
          />

          <div className="relative z-[101] flex w-full max-w-5xl flex-col gap-3">
            <p id={titleId} className="sr-only">
              {modalTitle}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
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
              {isFileVideo ? (
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                  onCanPlay={() => setPlayerReady(true)}
                />
              ) : (
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  title={modalTitle}
                  loading="eager"
                  onLoad={() => setPlayerReady(true)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

