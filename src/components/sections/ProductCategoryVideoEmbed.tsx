import { getYouTubeEmbedUrl } from '@/lib/youtubeEmbed';

type Props = { videoUrl: string };

export function ProductCategoryVideoEmbed({ videoUrl }: Props) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="mt-12 w-full mx-auto">
      {embedUrl ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/5 ring-1 ring-black/10 shadow-sm">
          <iframe
            title="Video"
            src={embedUrl}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm md:text-base font-semibold text-[#0A4A7A] underline underline-offset-2 hover:text-[#063556]"
        >
          Watch video
        </a>
      )}
    </div>
  );
}
