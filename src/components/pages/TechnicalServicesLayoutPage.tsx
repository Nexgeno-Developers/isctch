import Image from 'next/image';
import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';

import VideoModalClient from '@/components/common/VideoModalClient';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import type { TechnicalServicesLayoutPageData } from '@/lib/api/technical_services_layout';
import { RichText } from '@/components/common/RichText';
import { plainTextFromMaybeHtml } from '@/lib/htmlText';

function getYouTubeId(inputUrl: string): string | null {
  try {
    const u = new URL(inputUrl);
    const host = u.hostname.replace(/^www\./, '');

    let id: string | null = null;
    if (host === 'youtu.be') {
      id = u.pathname.split('/').filter(Boolean)[0] || null;
    } else if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      const parts = u.pathname.split('/').filter(Boolean);
      const v = u.searchParams.get('v');
      if (v) id = v;
      if (!id && parts[0] === 'shorts' && parts[1]) id = parts[1];
      if (!id && parts[0] === 'embed' && parts[1]) id = parts[1];
    }

    return id;
  } catch {
    return null;
  }
}

function toYouTubeEmbedUrl(inputUrl: string): string {
  const id = getYouTubeId(inputUrl);
  if (!id) return inputUrl;
  return `https://www.youtube.com/embed/${id}?autoplay=1&controls=1&rel=0&playsinline=1`;
}

function getYouTubeThumbnail(inputUrl: string): string | null {
  const id = getYouTubeId(inputUrl);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function isEmbeddableVideoUrl(inputUrl: string): boolean {
  const url = inputUrl.trim();
  if (!url) return false;
  if (/\.mp4(\?|#|$)/i.test(url) || /\.webm(\?|#|$)/i.test(url)) return true;
  if (/youtube\.com\/embed\//i.test(url) || /player\.vimeo\.com\/video\//i.test(url)) return true;
  return Boolean(getYouTubeId(url));
}

export default async function TechnicalServicesLayoutPage({
  data,
}: {
  data: TechnicalServicesLayoutPageData;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative lg:pt-[220px] pt-[150px] lg:pb-[150px] pb-[50px] overflow-hidden">
        <div className="absolute inset-0">
          {data.heroBackgroundImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.heroBackgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
        </div>

        <div className="relative z-10 h-full flex flex-col">
          <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
            <div className="text-center">
              <h1 className="text-[30px] md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white tracking-tight">
                {data.heroTitle}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[{ label: plainTextFromMaybeHtml(data.heroTitle) || 'Technical support services' }]}
          />
        </div>
      </section>

      {/* Technical Support Service Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            <div className="pr-[40px]">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6" dangerouslySetInnerHTML={{ __html: formatBoldText(data.introSection.heading) }} />
              {data.introSection.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-base md:text-base text-black leading-relaxed ${
                    index < data.introSection.paragraphs.length - 1 ? 'mb-4' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative w-full h-full">
              {data.introSection.image ? (
                <Image
                  src={data.introSection.image}
                  alt={data.introSection.imageAlt}
                  width={600}
                  height={600}
                  className="object-cover rounded-[50px] w-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              ) : (
                <div className="w-full h-[360px] rounded-[50px] bg-gradient-to-br from-[#B7D7EA]/40 to-[#009FE8]/20" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade & Expand Section */}
      {data.upgradeSection.cards.length > 0 ? (
        <section className="bg-gray-50 py-4 md:py-8 lg:py-12">
          <div className="bg-[#EDF0F1] rounded-[50px] p-8 md:p-12 lg:p-16  container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black lg:leading-[65px]" dangerouslySetInnerHTML={{ __html: formatBoldText(data.upgradeSection.heading) }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {data.upgradeSection.cards.map((card) => {
                const hasVideo = Boolean(card.videoUrl) && isEmbeddableVideoUrl(card.videoUrl);
                const poster =
                  (card.videoUrl ? getYouTubeThumbnail(card.videoUrl) : null) ||
                  card.thumbnail ||
                  undefined;
                const posterAlt = card.thumbnailAlt || card.title;

                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col p-[15px]"
                  >
                    <div className="rounded-[50px] relative aspect-video bg-gray-100 overflow-hidden">
                      {hasVideo ? (
                        <VideoModalClient
                          videoUrl={toYouTubeEmbedUrl(card.videoUrl)}
                          modalTitle={`${card.title} Video`}
                          posterUrl={poster}
                          posterAlt={posterAlt}
                          className="absolute inset-0"
                        />
                      ) : poster ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={poster}
                          alt={posterAlt}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200" />
                      )}
                    </div>

                    <div className="pl-[15px] pr-[15px] pt-[25px] pb-[15px] flex-1 flex flex-col">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#009FE8] mb-4">
                        {card.title}
                      </h3>
                      <p className="text-black mb-6 flex-1 leading-relaxed line-clamp-4">
                        {card.description}
                      </p>
                      <Link
                        href={card.ctaLink}
                        className="inline-flex items-center text-[#009FE8] font-medium hover:text-[#0077B6] transition-colors group"
                      >
                        {card.ctaText}
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Service Differentiation Section */}
      {data.serviceDifferentiation.rows.length > 0 ? (
        <section className="bg-gray-50 py-4 md:py-8 lg:pt-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-[50px] p-6 md:p-16 lg:p-20">
              <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10 text-black" dangerouslySetInnerHTML={{ __html: formatBoldText(data.serviceDifferentiation.heading) }} />
              

              <div className="overflow-x-auto">
                <div className="min-w-[940px] grid grid-cols-[170px_1fr_1fr_1fr] gap-4 items-stretch">
                  <div className="flex flex-col justify-start pt-[62px]">
                    <div className="h-[56px] flex items-center text-black font-bold text-xl">
                      {data.serviceDifferentiation.headerRow2.focus}
                    </div>
                    {data.serviceDifferentiation.rows.map((row) => (
                      <div
                        key={`label-${row.category}`}
                        className="h-[62px] flex items-center text-black font-bold text-xl"
                      >
                        {row.category.charAt(0) + row.category.slice(1).toLowerCase()}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[16px] bg-[#009FE8] text-white px-6 py-5 border border-[#009FE8]">
                    <h3 className="text-2xl font-extrabold uppercase mb-5">
                      {data.serviceDifferentiation.headerRow1.lamiCare}
                    </h3>
                    <div className="h-[56px] flex items-center text-lg">
                      {data.serviceDifferentiation.headerRow2.stability}
                    </div>
                    {data.serviceDifferentiation.rows.map((row) => (
                      <div
                        key={`care-${row.category}`}
                        className="h-[62px] flex items-center text-lg"
                      >
                        {row.lamiCare}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[16px] bg-white text-black px-6 py-5 border border-[#E5E7EB]">
                    <h3 className="text-2xl font-extrabold uppercase text-[#E0262D] mb-5">
                      {data.serviceDifferentiation.headerRow1.lamiPremium}
                    </h3>
                    <div className="h-[56px] flex items-center text-lg">
                      {data.serviceDifferentiation.headerRow2.performance}
                    </div>
                    {data.serviceDifferentiation.rows.map((row) => (
                      <div
                        key={`premium-${row.category}`}
                        className="h-[62px] flex items-center text-lg"
                      >
                        {row.lamiPremium}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[16px] bg-white text-black px-6 py-5 border border-[#E5E7EB]">
                    <h3 className="text-2xl font-extrabold uppercase text-[#4338CA] mb-5">
                      {data.serviceDifferentiation.headerRow1.lamiPartner}
                    </h3>
                    <div className="h-[56px] flex items-center text-lg">
                      {data.serviceDifferentiation.headerRow2.transformation}
                    </div>
                    {data.serviceDifferentiation.rows.map((row) => (
                      <div
                        key={`partner-${row.category}`}
                        className="h-[62px] flex items-center text-lg"
                      >
                        {row.lamiPartner}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Driving Operational Success Section */}
      {data.operationalSuccess.cards.length > 0 ? (
        <section className="bg-gray-50 py-4 md:py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black" dangerouslySetInnerHTML={{ __html: formatBoldText(data.operationalSuccess.heading) }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {data.operationalSuccess.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px]"
                >
                  <div className="relative w-full h-auto overflow-hidden bg-gray-100 rounded-[50px]">
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        width={800}
                        height={600}
                        className="w-full h-[230px] object-cover object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="h-[230px] w-full bg-gradient-to-br from-[#B7D7EA]/40 to-[#009FE8]/20" />
                    )}
                  </div>

                  <div className="pl-[15px] pr-[15px] pt-[25px] pb-[15px] flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-[#009FE8] mb-4">
                      {card.title}
                    </h3>
                    <RichText
                      as="div"
                      html={card.description}
                      className="text-black mb-2 flex-1 leading-relaxed line-clamp-3"
                    />
                    <Link
                      href={card.ctaLink}
                      className="inline-flex items-center text-[#009FE8] font-medium hover:text-[#0077B6] transition-colors group"
                    >
                      {card.ctaText}
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ConnectTechnicalExperts />

      <CallToAction />
    </main>
  );
}

