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
    <section className="relative overflow-hidden lg:pt-[200px] md:pt-[150px] pt-[110px] lg:pb-[80px] md:pb-[50px] pb-[30px]">
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

      <div className="relative z-10 flex flex-col justify-center px-4">
        <div className="container mx-auto text-center">
          {titleTag === 'div' ? (
            <div
              className="text-[22px] font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-6xl xl:text-6xl capitalize"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          ) : (
            <h1
              className="text-[22px] font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-6xl xl:text-6xl capitalize"
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
