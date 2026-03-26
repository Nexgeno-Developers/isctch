'use client';

import { useEffect, useId, useState } from 'react';

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

export default function VideoModalClient({
  videoUrl,
  modalTitle = 'Video',
  posterUrl,
  posterAlt = '',
  className,
}: VideoModalClientProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const modalId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isFileVideo = isProbablyMp4(videoUrl) || isProbablyWebm(videoUrl);

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
          <div className="absolute inset-0 bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-[#0E233C] opacity-35" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-20 h-20 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </span>

        <span className="sr-only">Play video</span>
      </button>

      {open && (
        <div
          id={modalId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
            aria-label="Close video"
          />

          <div className="relative z-[101] w-full max-w-5xl rounded-2xl bg-black overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0E233C]">
              <p id={titleId} className="text-white text-sm font-semibold">
                {modalTitle}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full bg-black">
              <div className="w-full aspect-video">
                {isFileVideo ? (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                ) : (
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Video"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

