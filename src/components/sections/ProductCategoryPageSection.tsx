import Image from 'next/image';
import Link from 'next/link';
import type { ProductCategory, ProductData } from '@/lib/api';
import TechnicalConsultationCTA from '@/components/products/TechnicalConsultationCTA';
import CategoryGlobalImpact from '@/components/products/CategoryGlobalImpact';
import LatestInsights from '@/components/home/LatestInsights';
import SimilarProducts from '@/components/products/SimilarProducts';
import ContactSustainability from '@/components/products/ContactSustainability';

export default function ProductCategoryPageSection({
  category,
  products,
}: {
  category: ProductCategory;
  products: ProductData[];
}) {
  // Keep the existing design/structure from the previous dedicated route.
  return (
    <>
      {/* JSON-LD Schema */}
      {(category as any).seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify((category as any).seo.schema),
          }}
        />
      )}

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative lg:pt-[220px] pt-[150px] lg:pb-[150px] pb-[50px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {(category as any).heroBackgroundImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={(category as any).heroBackgroundImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800" />
            )}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
              <div className="text-center">
                <h1 className="text-[30px] md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white  tracking-tight">
                  {(category as any).name}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Products We Support Section */}
        {products.length > 0 && (
          <section className="bg-gray-50 py-12 md:pt-24 md:pb-12 pb-8">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <p className="text-sm md:text-base text-[#009FE8] uppercase tracking-wide mb-2">
                  WHAT WE SUPPORT
                </p>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-black">{(category as any).name} We Support</span>
                </h2>

                {(category as any).description && (
                  <p className="text-base md:text-base text-black mb-8 md:mb-12 mx-auto leading-relaxed">
                    {(category as any).description}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
                  {products.map((product) => (
                    <ProductSupportCard key={(product as any).id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pilot Plant CTA Section */}
        <TechnicalConsultationCTA />

        {/* Global Impact Section */}
        {(category as any).globalImpact && (
          <CategoryGlobalImpact data={(category as any).globalImpact} />
        )}

        {/* Latest Insights Section */}
        <LatestInsights />

        {/* Similar Products Section */}
        <SimilarProducts />

        {/* Contact & Sustainability Section */}
        <ContactSustainability />
      </main>
    </>
  );
}

function ProductSupportCard({ product }: { product: ProductData }) {
  return (
    <Link
      href={`/products/${(product as any).slug}`}
      className="text-start group bg-[#EDF0F1] rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px] w-full"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-white rounded-[50px] mb-4">
        <Image
          src={(product as any).image}
          alt={(product as any).imageAlt}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
      </div>

      <div className="flex-1 flex flex-col pl-0 pr-0">
        <h3 className="capitalize text-lg md:text-xl font-bold text-black mb-2 group-hover:text-[#009FE8] transition-colors pt-3">
          {(product as any).title}
        </h3>

        {(product as any).shortDescription && (
          <p className="text-sm md:text-base text-black text-center mb-2 flex-1 line-clamp-2">
            {(product as any).shortDescription}
          </p>
        )}

        <div className="flex items-center text-[#009FE8] text-sm md:text-base font-medium group-hover:text-[#0077B6] transition-colors mb-4">
          Explore
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>
    </Link>
  );
}

