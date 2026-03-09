import Link from 'next/link';
import { fetchHomepageData } from '@/lib/api';
import InnovationSliderInteractive, { Navigation, Cards } from './InnovationSliderInteractive';

/**
 * Innovation in Packaging Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the section with client-side slider.
 */
export default async function InnovationInPackaging() {
  const homepageData = await fetchHomepageData();
  const data = homepageData.innovationInPackaging;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <InnovationSliderInteractive cards={data.cards}>
          {/* Header with Title, Explore More Button, and Navigation */}
          <div className="flex items-center justify-between mb-12 md:mb-16 flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-[#009FE8]">Innovation</span>{' '}
              <span className="text-gray-900">in Packaging</span>
            </h2>

            <div className="flex items-center gap-4">
              {/* Explore More Button */}
              <Link
                href={data.exploreMoreLink}
                className="px-6 py-3 bg-[#009FE8] text-white font-medium rounded-lg hover:bg-[#0077B6] transition-colors"
              >
                Explore More
              </Link>

              {/* Navigation Arrows - Client Component */}
              <Navigation cards={data.cards} />
            </div>
          </div>

          {/* Cards Grid - Client Component with Slider */}
          <Cards cards={data.cards} />
        </InnovationSliderInteractive>
      </div>
    </section>
  );
}
