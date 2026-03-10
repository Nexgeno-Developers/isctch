import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchProductData, getAllProductSlugs } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import Breadcrumbs from '@/components/common/Breadcrumbs';

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
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
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
            <div className="absolute inset-0 bg-[#0e233ce8] opacity-90" />
            {/* Blur Effect */}
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="container mx-auto flex-1 flex flex-col justify-center px-4">
              <div className="text-center">
                {/* Product Title */}
                <h1 className="pt-[160px] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 uppercase tracking-tight">
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
                    className="inline-flex items-center text-[#009FE8] text-lg md:text-xl font-bold uppercase tracking-wider hover:text-white transition-colors group"
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
        <section className="bg-white border-b border-gray-200">
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

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Features */}
              {productData.features && productData.features.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Key Features
                  </h2>
                  <ul className="space-y-4">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-[#009FE8] mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-lg text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {productData.benefits && productData.benefits.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Benefits
                  </h2>
                  <ul className="space-y-4">
                    {productData.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-[#009FE8] mr-3 flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-lg text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* HTML Content */}
              {productData.content && (
                <div className="mb-12">
                  <div
                    className="prose prose-lg max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: productData.content }}
                  />
                </div>
              )}

              {/* Gallery */}
              {productData.gallery && productData.gallery.length > 0 && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productData.gallery.map((item) => (
                      <div
                        key={item.id}
                        className="relative aspect-square rounded-[25px] overflow-hidden bg-gray-100"
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Specifications */}
              {productData.specifications && productData.specifications.length > 0 && (
                <div className="bg-white rounded-[25px] p-6 md:p-8 mb-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Specifications
                  </h3>
                  <dl className="space-y-4">
                    {productData.specifications.map((spec, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <dt className="text-sm font-medium text-gray-500 mb-1">
                          {spec.label}
                        </dt>
                        <dd className="text-base font-semibold text-gray-900">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Related Products */}
              {productData.relatedProducts && productData.relatedProducts.length > 0 && (
                <div className="bg-white rounded-[25px] p-6 md:p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Related Products
                  </h3>
                  <ul className="space-y-4">
                    {productData.relatedProducts.map((relatedSlug) => (
                      <li key={relatedSlug}>
                        <Link
                          href={`/products/${relatedSlug}`}
                          className="text-[#009FE8] hover:text-[#0077B6] transition-colors font-medium"
                        >
                          View Product →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
