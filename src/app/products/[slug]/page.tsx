import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchProductData, getAllProductSlugs } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProductSpecifications from '@/components/products/ProductSpecifications';
import ProductFeatures from '@/components/products/ProductFeatures';
import ProductAccessories from '@/components/products/ProductAccessories';
import SimilarProducts from '@/components/products/SimilarProducts';
import TechnicalConsultationCTA from '@/components/products/TechnicalConsultationCTA';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all products
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate metadata for product page
 * All SEO fields come from the API
 */
export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const productData = await fetchProductData(slug);

  if (!productData) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const canonicalUrl = productData.seo.canonical_url 
    ? getCanonicalUrl(productData.seo.canonical_url)
    : getCanonicalUrl(`/products/${slug}`);

  const metadata: Metadata = {
    title: productData.seo.meta_title,
    description: productData.seo.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: productData.seo.og_title || productData.seo.meta_title,
      description: productData.seo.og_description || productData.seo.meta_description,
      images: productData.seo.og_image ? [productData.seo.og_image] : [productData.image],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: (productData.seo.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') || 'summary_large_image',
      title: productData.seo.twitter_title || productData.seo.meta_title,
      description: productData.seo.twitter_description || productData.seo.meta_description,
      images: productData.seo.twitter_image ? [productData.seo.twitter_image] : [productData.image],
    },
  };

  return metadata;
}

/**
 * Product Details Page Component
 * 
 * Server Component that fetches product data by slug.
 * Returns 404 if product doesn't exist.
 * Implements full SEO with metadata from API.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productData = await fetchProductData(slug);

  if (!productData) {
    notFound();
  }

  // Prepare schema data with canonical URL
  const schemaData = productData.seo.schema ? {
    ...productData.seo.schema,
    url: productData.seo.canonical_url 
      ? getCanonicalUrl(productData.seo.canonical_url)
      : getCanonicalUrl(`/products/${slug}`),
  } : null;

  return (
    <>
      {/* JSON-LD Schema */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative pt-[220px] pb-[150px] overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {productData.heroBackgroundImage ? (
              <img
                src={productData.heroBackgroundImage}
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
                {/* Product Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white mb-6 tracking-tight">
                  {productData.title}
                </h1>

                {/* Description */}
                {productData.shortDescription && (
                  <p className="text-center text-lg md:text-xl lg:text-2xl text-white mb-8 leading-relaxed max-w-3xl mx-auto">
                    {productData.shortDescription}
                  </p>
                )}

                {/* CTA Button */}
                {productData.technicalSheetUrl && (
                  <a
                    href={productData.technicalSheetUrl}
                    download
                    className="inline-flex items-center text-[#009FE8] text-lg md:text-[32px] font-bold uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    {productData.technicalSheetText || 'DOWNLOAD TECHNICAL SHEET'}
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

        {/* Breadcrumbs */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumbs
              items={[
                { label: 'Products', href: '/products' },
                ...(productData.category ? [{ label: productData.category }] : []),
                { label: productData.title },
              ]}
            />
          </div>
        </section>

        {/* Product Specifications Section */}
        <ProductSpecifications product={productData} />

        {/* Product Video Section */}
        {productData.productVideo && (
          <section className="bg-gray-50 pt-4 pb-4 md:pt-8 md:pb-12">
            <div className="container mx-auto px-4">
              <div className="relative w-full aspect-video rounded-[25px] overflow-hidden bg-gray-100">
                {productData.productVideo.endsWith('.gif') ? (
                  <img
                    src={productData.productVideo}
                    alt={`${productData.title} video`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={productData.productVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Product Features Section */}
        {productData.productFeatures && productData.productFeatures.length > 0 && (
          <ProductFeatures features={productData.productFeatures} />
        )}

        {/* Product Accessories Section */}
        {productData.accessories && productData.accessories.length > 0 && (
          <ProductAccessories accessories={productData.accessories} />
        )}

        {/* Similar Products Section */}
        <SimilarProducts currentProductSlug={productData.slug} />

        {/* Technical Consultation CTA Section */}
        <TechnicalConsultationCTA data={productData.technicalConsultation} />

        {/* Newsletter Subscription Section */}
        <NewsletterSubscription />
      </main>
    </>
  );
}
