import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getAllCategorySlugs, 
  getCategoryBySlug, 
  getProductsByCategory
} from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';
import TechnicalConsultationCTA from '@/components/products/TechnicalConsultationCTA';
import CategoryGlobalImpact from '@/components/products/CategoryGlobalImpact';
import LatestInsights from '@/components/home/LatestInsights';
import SimilarProducts from '@/components/products/SimilarProducts';
import ContactSustainability from '@/components/products/ContactSustainability';

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

/**
 * Generate static params for all category pages
 */
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({
    categorySlug: slug,
  }));
}

/**
 * Generate metadata for category page
 */
export async function generateMetadata(
  { params }: CategoryPageProps
): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }

  const canonicalUrl = category.seo?.canonical_url 
    ? getCanonicalUrl(category.seo.canonical_url)
    : getCanonicalUrl(`/products/category/${categorySlug}`);

  const metadata: Metadata = {
    title: category.seo?.meta_title || `${category.name} | Lamipak - Premium Packaging Solutions`,
    description: category.seo?.meta_description || category.description || `Explore our ${category.name.toLowerCase()} products and solutions.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: category.seo?.og_title || category.seo?.meta_title || `${category.name} | Lamipak`,
      description: category.seo?.og_description || category.seo?.meta_description || category.description || `Explore our ${category.name.toLowerCase()} products.`,
      images: category.seo?.og_image ? [category.seo.og_image] : category.image ? [category.image] : [],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: (category.seo?.twitter_card as 'summary_large_image' | 'summary' | 'player' | 'app') || 'summary_large_image',
      title: category.seo?.twitter_title || category.seo?.meta_title || `${category.name} | Lamipak`,
      description: category.seo?.twitter_description || category.seo?.meta_description || category.description || `Explore our ${category.name.toLowerCase()} products.`,
      images: category.seo?.twitter_image ? [category.seo.twitter_image] : category.image ? [category.image] : [],
    },
  };

  return metadata;
}

/**
 * Category Products Listing Page Component
 * 
 * Server Component that fetches products by category slug.
 * Returns 404 if category doesn't exist.
 */
export default async function CategoryProductsPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(categorySlug);

  // Prepare schema data with canonical URL
  const schemaData = category.seo?.schema ? {
    ...category.seo.schema,
    url: category.seo.canonical_url 
      ? getCanonicalUrl(category.seo.canonical_url)
      : getCanonicalUrl(`/products/category/${categorySlug}`),
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
            {category.heroBackgroundImage ? (
              <img
                src={category.heroBackgroundImage}
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
                {/* Category Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white  tracking-tight">
                  {category.name}
                </h1>

                {/* Subtitle */}
                {/* {category.heroSubtitle && (
                  <p className="text-center text-lg md:text-xl lg:text-2xl text-[#009FE8] mb-8 leading-relaxed max-w-3xl mx-auto font-bold tracking-wider">
                    {category.heroSubtitle}
                  </p>
                )} */}
              </div>
            </div>
          </div>
        </section>

      

        {/* Products We Support Section */}
        {products.length > 0 && (
          <section className="bg-gray-50 py-12 md:pt-24 md:pb-12 pb-8">
            <div className="container mx-auto px-4">
              <div className="text-center">
                {/* Section Label */}
                <p className="text-sm md:text-base text-[#009FE8] uppercase tracking-wide mb-2">
                  WHAT WE SUPPORT
                </p>

                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-[#009FE8]">{category.name}</span>{' '}
                  <span className="text-black">We Support</span>
                </h2>

                {/* Description */}
                {category.description && (
                  <p className="text-lg md:text-xl text-black mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
                    {category.description}
                  </p>
                )}

                {/* Product Cards Grid - 5 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 justify-items-center">
                  {products.map((product) => (
                    <ProductSupportCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pilot Plant CTA Section */}
        {category.pilotPlant && (
          <TechnicalConsultationCTA data={category.pilotPlant} />
        )}

          {/* Global Impact Section */}
        {category.globalImpact && (
          <CategoryGlobalImpact data={category.globalImpact} />
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

/**
 * Product Support Card Component (for "Products We Support" section)
 */
function ProductSupportCard({ product }: { product: NonNullable<Awaited<ReturnType<typeof getProductsByCategory>>[number]> }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="text-start group bg-[#EDF0F1] rounded-[50px] overflow-hidden transition-all duration-300 flex flex-col h-full p-[15px] w-full"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-white rounded-[50px] mb-4">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col pl-3 pr-3">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-black mb-2 group-hover:text-[#009FE8] transition-colors pt-3">
          {product.title}
        </h3>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-sm md:text-base text-gray-600 mb-2 flex-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Explore Link */}
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

/**
 * Product Card Component (for main products grid)
 */
function ProductCard({ product }: { product: NonNullable<Awaited<ReturnType<typeof getProductsByCategory>>[number]> }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-[25px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Category */}
        {product.category && (
          <span className="inline-block text-[#009FE8] text-sm md:text-base font-medium mb-3">
            {product.category}
          </span>
        )}

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 group-hover:text-[#009FE8] transition-colors">
          {product.title}
        </h2>

        {/* Short Description or Description */}
        <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
          {product.shortDescription || product.description}
        </p>

        {/* CTA */}
        <div className="flex items-center text-[#009FE8] font-medium group-hover:text-[#0077B6] transition-colors">
          Learn More
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
        </div>
      </div>
    </Link>
  );
}
