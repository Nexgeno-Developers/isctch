import type { ProductData } from '@/fake-api/products';
import { getCanonicalUrl } from '@/config/site';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProductSpecifications from './ProductSpecifications';
import ProductFeatures from './ProductFeatures';
import ProductAccessories from './ProductAccessories';
import SimilarProducts from './SimilarProducts';
import TechnicalConsultationCTA from './TechnicalConsultationCTA';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import VideoBanner from '@/components/home/VideoBanner';
import { cleanVideoUrlFromApi } from '@/lib/cleanVideoUrl';

interface ProductDetailLayoutProps {
  product: ProductData;
  slugPath: string;
}

export default function ProductDetailLayout({
  product,
  slugPath,
}: ProductDetailLayoutProps) {
  const productVideoUrl = cleanVideoUrlFromApi(product.productVideo);

  const schemaData = product.seo.schema
    ? {
        ...product.seo.schema,
        url: product.seo.canonical_url
          ? getCanonicalUrl(product.seo.canonical_url)
          : getCanonicalUrl(`/${slugPath}`),
      }
    : null;

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <main className="min-h-screen bg-gray-50">
        <section className="relative lg:pt-[220px] pt-[150px] lg:pb-[150px] pb-[50px] overflow-hidden">
          <div className="absolute inset-0">
            {product.heroBackgroundImage ? (
              <img
                src={product.heroBackgroundImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800" />
            )}
            {/* <div className="absolute inset-0 bg-[#0e233c52] opacity-90" />
            <div className="absolute inset-0 backdrop-blur-sm" /> */}
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
              <div className="text-center">
                <h1 className="text-[30px] md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white mb-6 tracking-tight">
                  {product.title}
                </h1>

                {product.shortDescription && (
                  <p className="text-center text-base md:text-base text-white mb-8 leading-relaxed max-w-3xl mx-auto">
                    {product.shortDescription}
                  </p>
                )}

                {product.technicalSheetUrl && (
                  <a
                    href={product.technicalSheetUrl}
                    download
                    className="inline-flex items-center text-[#009FE8] text-lg md:text-[32px] font-bold uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    {product.technicalSheetText || 'DOWNLOAD TECHNICAL SHEET'}
                    <svg
                      className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform"
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
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                { label: 'Products', href: '/products' },
                ...(product.category ? [{ label: product.category }] : []),
                { label: product.title },
              ]}
            />
          </div>
        </section>

        <ProductSpecifications product={product} />

        {productVideoUrl ? (
          <div className="container mx-auto px-4 pb-0 pt-0 md:pb-12 md:pt-8">
         
            <div className="overflow-hidden rounded-[50px]">
              <VideoBanner
                prefetchedData={{
                  title: '',
                  preTitle: '',
                  ctaText: '',
                  ctaLink: '',
                  videoUrl: productVideoUrl,
                }}
              />
            </div>
          
        </div>
        ) : null}

        {product.productFeatures && product.productFeatures.length > 0 && (
          <ProductFeatures features={product.productFeatures} />
        )}

        {product.accessories && product.accessories.length > 0 && (
          <ProductAccessories accessories={product.accessories} />
        )}

        <SimilarProducts
          currentProductSlug={product.slug}
          relatedProductCards={product.relatedProductCards}
        />

        <div className="pb-4 md:pb-12">
          <TechnicalConsultationCTA />
        </div>
       
        <NewsletterSubscription />
      </main>
    </>
  );
}

