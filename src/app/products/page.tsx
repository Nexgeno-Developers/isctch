import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProductSlugs, fetchProductData, getAllCategories } from '@/lib/api';
import { getCanonicalUrl } from '@/config/site';

/**
 * Generate metadata for products listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products | Lamipak - Premium Packaging Solutions',
    description: 'Explore our range of innovative packaging solutions including aseptic packaging, sterile packaging, and closure systems.',
    alternates: {
      canonical: getCanonicalUrl('/products'),
    },
    openGraph: {
      title: 'Products | Lamipak',
      description: 'Innovative packaging solutions for your business needs',
      url: getCanonicalUrl('/products'),
      type: 'website',
    },
  };
}

/**
 * Products Listing Page Component
 * 
 * Server Component that fetches all products and displays them in a grid.
 * All data is fetched server-side from the API.
 */
export default async function ProductsPage() {
  // Fetch all product slugs
  const slugs = await getAllProductSlugs();
  
  // Fetch product data for each slug (in parallel for better performance)
  const products = await Promise.all(
    slugs.map(async (slug) => {
      const product = await fetchProductData(slug);
      return product;
    })
  );

  // Filter out any null products (shouldn't happen, but safety check)
  const validProducts = products.filter((product): product is NonNullable<typeof product> => product !== null);

  // Fetch all categories
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Discover our innovative packaging solutions designed for excellence, sustainability, and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      {categories.length > 0 && (
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-gray-700 font-medium">Filter by Category:</span>
              <Link
                href="/products"
                className="px-4 py-2 rounded-full border-2 border-[#009FE8] text-[#009FE8] hover:bg-[#009FE8] hover:text-white transition-colors font-medium"
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/category/${category.slug}`}
                  className="px-4 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-[#009FE8] hover:text-[#009FE8] transition-colors font-medium"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        {validProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {validProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/**
 * Product Card Component
 */
function ProductCard({ product }: { product: NonNullable<Awaited<ReturnType<typeof fetchProductData>>> }) {
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-[#009FE8] transition-colors">
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
