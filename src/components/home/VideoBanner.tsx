import Link from 'next/link';
import { fetchHomepageData } from '@/lib/api';

/**
 * Video Banner Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the video banner with autoplaying GIF.
 */
export default async function VideoBanner() {
  const homepageData = await fetchHomepageData();
  const data = homepageData.videoBanner;

  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Background Video/GIF - Autoplay */}
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

      {/* Play Button - Links to modal */}
      <Link
        href="#video-modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all group shadow-lg"
        aria-label="Play video"
      >
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-gray-800 ml-1 group-hover:scale-110 transition-transform"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </Link>

      {/* Video Popup Modal - CSS-only with :target */}
      <div
        id="video-modal"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      >
        <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden">
          {/* Close Button */}
          <Link
            href="#"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 flex items-center justify-center transition-all group"
            aria-label="Close video"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>

          {/* GIF/Video Player */}
          {data.videoUrl && (
            data.videoUrl.endsWith('.gif') ? (
              <img
                src={data.videoUrl}
                alt="Video"
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                src={data.videoUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center px-4">
        {/* Main Title - Top */}
        <div className="pt-8 md:pt-24 lg:pt-16">
          <h2 className="text-3xl md:text-4xl lg:text-[50px] font-bold text-white text-center">
            {data.title}
          </h2>
        </div>

        {/* CTA Link - Bottom */}
        <div className="mt-auto pb-10 md:pb-14">
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
    </section>
  );
}
