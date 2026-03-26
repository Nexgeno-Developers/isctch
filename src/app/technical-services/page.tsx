import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchTechnicalServicesListingData } from '@/lib/api';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';
import CallToAction from '@/components/home/CallToAction';
import { getCanonicalUrl } from '@/config/site';

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
          <div className="absolute inset-0 backdrop-blur-sm" />
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
      <section className="bg-gray-50 pb-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Left Column - Text Content */}
          <div className="container mx-auto px-4 lg:px-16 xl:px-24 pt-20">
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
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
            <img
              src={listingData.introSection.image}
              alt={listingData.introSection.imageAlt}
              className="w-full h-full object-cover"
            />
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
                  <img
                    src={card.thumbnail}
                    alt={card.thumbnailAlt}
                    className="w-full h-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 hover:bg-opacity-30 transition-opacity">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-8 h-8 text-[#009FE8] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pl-[15px] pr-[15px] pt-[25px] pb-[15px] flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-[#009FE8] mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black mb-6 flex-1 leading-relaxed">
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
      <section className="bg-gray-50 py-4 md:py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="bg-[#009FE8] rounded-[50px] p-8 md:p-12 lg:p-16">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 md:mb-12">
              {listingData.serviceDifferentiation.heading}
            </h2>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                {/* Header Row 1 */}
                <thead>
                  <tr className="border-b border-[#3DBEF9] border-opacity-30">
                    <th className="text-left py-4 font-semibold text-lg md:text-xl">
                      {listingData.serviceDifferentiation.headerRow1.empty}
                    </th>
                    <th className="text-center py-4 font-bold text-lg md:text-xl uppercase">
                      {listingData.serviceDifferentiation.headerRow1.lamiCare}
                    </th>
                    <th className="text-center py-4 font-bold text-lg md:text-xl uppercase">
                      {listingData.serviceDifferentiation.headerRow1.lamiPremium}
                    </th>
                    <th className="text-center py-4 font-bold text-lg md:text-xl uppercase">
                      {listingData.serviceDifferentiation.headerRow1.lamiPartner}
                    </th>
                  </tr>
                  {/* Header Row 2 */}
                  <tr className="border-b border-[#3DBEF9] border-opacity-30">
                    <th className="text-left py-4 font-semibold text-base md:text-lg">
                      {listingData.serviceDifferentiation.headerRow2.focus}
                    </th>
                    <th className="text-center py-4 font-semibold text-base md:text-lg">
                      {listingData.serviceDifferentiation.headerRow2.stability}
                    </th>
                    <th className="text-center py-4 font-semibold text-base md:text-lg">
                      {listingData.serviceDifferentiation.headerRow2.performance}
                    </th>
                    <th className="text-center py-4 font-semibold text-base md:text-lg">
                      {listingData.serviceDifferentiation.headerRow2.transformation}
                    </th>
                  </tr>
                </thead>
                {/* Data Rows */}
                <tbody>
                  {listingData.serviceDifferentiation.rows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-[#3DBEF9] border-opacity-20 ${index === listingData.serviceDifferentiation.rows.length - 1 ? '' : ''}`}
                    >
                      <td className="py-4  font-bold text-base md:text-lg uppercase">
                        {row.category}
                      </td>
                      <td className="py-4 text-center text-base md:text-lg">
                        {row.lamiCare}
                      </td>
                      <td className="py-4  text-center text-base md:text-lg">
                        {row.lamiPremium}
                      </td>
                      <td className="py-4 text-center text-base md:text-lg">
                        {row.lamiPartner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
