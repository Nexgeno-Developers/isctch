/**
 * Full-width hero (About Us–style): background image, dark overlay, centered white title.
 * Use `titleTag="div"` when the real `<h1>` lives in the page body (e.g. article detail).
 */
export function InsightsPageHero({
  titleHtml,
  backgroundImage = '/about_banner.jpg',
  titleTag = 'h1',
}: {
  titleHtml: string;
  backgroundImage?: string;
  titleTag?: 'h1' | 'div';
}) {
  return (
    <section className="relative overflow-hidden lg:pt-[220px] pt-[120px] lg:pb-[150px] pb-[44px]">
      <div className="absolute inset-0">
        {backgroundImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- CMS URLs may be remote
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-black/45" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-[120px] flex-col justify-center px-4">
        <div className="container mx-auto text-center">
          {titleTag === 'div' ? (
            <div
              className="text-[24px] font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-6xl"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          ) : (
            <h1
              className="text-[24px] font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl xl:text-6xl"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
