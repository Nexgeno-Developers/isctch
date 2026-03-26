import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchTechnicalServicesListingData } from '@/lib/api';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import CallToAction from '@/components/home/CallToAction';
import { getCanonicalUrl } from '@/config/site';
import VideoModalClient from '@/components/common/VideoModalClient';

function getYouTubeId(inputUrl: string): string | null {
  try {
    const u = new URL(inputUrl);
    const host = u.hostname.replace(/^www\./, '');

    let id: string | null = null;
    if (host === 'youtu.be') {
      id = u.pathname.split('/').filter(Boolean)[0] || null;
    } else if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      const parts = u.pathname.split('/').filter(Boolean);
      // /watch?v=ID
      const v = u.searchParams.get('v');
      if (v) id = v;
      // /shorts/ID
      if (!id && parts[0] === 'shorts' && parts[1]) id = parts[1];
      // /embed/ID
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

/**
 * Generate metadata for technical services listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Technical Services | Lamipak - Expert Packaging Solutions',
    description: 'Explore our comprehensive technical services including product development, technical consultation, quality assurance, and pilot plant services.',
    alternates: {
      canonical: getCanonicalUrl('/technical-services'),
    },
    openGraph: {
      title: 'Technical Services | Lamipak',
      description: 'Expert technical services for innovative packaging solutions',
      url: getCanonicalUrl('/technical-services'),
      type: 'website',
    },
  };
}

/**
 * Technical Services Listing Page Component
 * 
 * Server Component that fetches all technical services and displays them in a grid.
 * All data is fetched server-side from the API.
 */
export default async function TechnicalServicesPage() {
  const listingData = await fetchTechnicalServicesListingData();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-[220px] pb-[150px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {listingData.heroBackgroundImage ? (
            <img
              src={listingData.heroBackgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          {/* Dark Blue Overlay */}
          <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
          {/* Blur Effect */}
          {/* <div className="absolute inset-0 backdrop-blur-sm" /> */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
            <div className="text-center">
              {/* Service Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white tracking-tight">
                {listingData.heroTitle}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Support Service Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Left Column - Text Content */}
          <div className="pr-[40px]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e233c] mb-6">
              {listingData.introSection.heading}
            </h2>
            {listingData.introSection.paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-base md:text-base text-black leading-relaxed ${index < listingData.introSection.paragraphs.length - 1 ? 'mb-4' : ''}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column - Image (Full Width) */}
          <div className="relative w-full h-full">
            <Image
              src={listingData.introSection.image}
              alt={listingData.introSection.imageAlt}
              width={600}
              height={600}
              className="object-cover rounded-[50px] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
        </div>
      </section>

      {/* Upgrade & Expand Section */}
      <section className="bg-gray-50 py-4 md:py-8 lg:py-12">
        <div className="bg-[#EDF0F1] rounded-[50px] p-8 md:p-12 lg:p-16  container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              <span className="text-[#009FE8]">{listingData.upgradeSection.headingHighlight}</span>{' '}
              {listingData.upgradeSection.heading.replace(listingData.upgradeSection.headingHighlight, '').trim()}
            </h2>
          </div>

          {/* Service Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {listingData.upgradeSection.cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col p-[15px]"
              >
                {/* Video Thumbnail */}
                <div className="rounded-[50px] relative aspect-video bg-gray-100 overflow-hidden">
                  <VideoModalClient
                    videoUrl={toYouTubeEmbedUrl(card.videoUrl)}
                    modalTitle={`${card.title} Video`}
                    posterUrl={getYouTubeThumbnail(card.videoUrl) || card.thumbnail}
                    posterAlt={card.thumbnailAlt}
                    className="absolute inset-0"
                  />
                </div>

                {/* Card Content */}
                <div className="pl-[15px] pr-[15px] pt-[25px] pb-[15px] flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-[#009FE8] mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black mb-6 flex-1 leading-relaxed line-clamp-4">
                    {card.description}
                  </p>

                  {/* CTA */}
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

      {/* Service Differentiation Section */}
      <section className="bg-gray-50 py-4 md:py-8 lg:pt-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-[50px] p-6 md:p-16 lg:p-20">
            <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-10">
              <span className="text-[#009FE8]">
                {listingData.serviceDifferentiation.heading.split(' ')[0]}
              </span>{' '}
              <span className="text-black">
                {listingData.serviceDifferentiation.heading.split(' ').slice(1).join(' ')}
              </span>
            </h2>

            <div className="overflow-x-auto">
              <div className="min-w-[940px] grid grid-cols-[170px_1fr_1fr_1fr] gap-4 items-stretch">
                <div className="flex flex-col justify-start pt-[62px]">
                  <div className="h-[56px] flex items-center text-black font-bold text-xl">
                    {listingData.serviceDifferentiation.headerRow2.focus}
                  </div>
                  {listingData.serviceDifferentiation.rows.map((row) => (
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
                    {listingData.serviceDifferentiation.headerRow1.lamiCare}
                  </h3>
                  <div className="h-[56px] flex items-center text-lg">
                    {listingData.serviceDifferentiation.headerRow2.stability}
                  </div>
                  {listingData.serviceDifferentiation.rows.map((row) => (
                    <div key={`care-${row.category}`} className="h-[62px] flex items-center text-lg">
                      {row.lamiCare}
                    </div>
                  ))}
                </div>

                <div className="rounded-[16px] bg-white text-black px-6 py-5 border border-[#E5E7EB]">
                  <h3 className="text-2xl font-extrabold uppercase text-[#E0262D] mb-5">
                    {listingData.serviceDifferentiation.headerRow1.lamiPremium}
                  </h3>
                  <div className="h-[56px] flex items-center text-lg">
                    {listingData.serviceDifferentiation.headerRow2.performance}
                  </div>
                  {listingData.serviceDifferentiation.rows.map((row) => (
                    <div key={`premium-${row.category}`} className="h-[62px] flex items-center text-lg">
                      {row.lamiPremium}
                    </div>
                  ))}
                </div>

                <div className="rounded-[16px] bg-white text-black px-6 py-5 border border-[#E5E7EB]">
                  <h3 className="text-2xl font-extrabold uppercase text-[#4338CA] mb-5">
                    {listingData.serviceDifferentiation.headerRow1.lamiPartner}
                  </h3>
                  <div className="h-[56px] flex items-center text-lg">
                    {listingData.serviceDifferentiation.headerRow2.transformation}
                  </div>
                  {listingData.serviceDifferentiation.rows.map((row) => (
                    <div key={`partner-${row.category}`} className="h-[62px] flex items-center text-lg">
                      {row.lamiPartner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driving Operational Success Section */}
      <section className="bg-gray-50 py-4 md:py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              <span className="text-[#009FE8]">{listingData.operationalSuccess.headingHighlight}</span>{' '}
              {listingData.operationalSuccess.heading.replace(listingData.operationalSuccess.headingHighlight, '').trim()}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {listingData.operationalSuccess.cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px]"
              >
                {/* Card Image */}
                <div className="relative w-full h-auto overflow-hidden bg-gray-100 rounded-[50px]">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Card Content */}
                <div className="pl-[15px] pr-[15px] pt-[25px] pb-[15px] flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#009FE8] mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black mb-2 flex-1 leading-relaxed">
                    {card.description}
                  </p>

                  {/* CTA */}
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

      {/* Connect with Technical Experts Section */}
      <ConnectTechnicalExperts
        heading={listingData.connectSection.heading}
        headingHighlight={listingData.connectSection.headingHighlight}
        formTitle={listingData.connectSection.formTitle}
        illustrationImage={listingData.connectSection.illustrationImage}
        illustrationAlt={listingData.connectSection.illustrationAlt}
      />

      {/* Call to Action Section */}
      <CallToAction />

    </main>
  );
}
