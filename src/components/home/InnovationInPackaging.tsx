import Link from 'next/link';
import { formatBoldText } from '@/lib/htmlText';
import { fetchHomepageData } from '@/lib/api/home';
import InnovationSliderInteractive, { Cards } from './InnovationSliderInteractive';

/**
 * Innovation in Packaging Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the section.
 */
export default async function InnovationInPackaging() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;
  const data = homepageData.innovationInPackaging;

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <InnovationSliderInteractive cards={data.cards}>
          {/* Header with Title and Explore More Button */}
          <div className="flex items-center justify-between mb-8 md:mb-12 flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Innovation in Packaging
            </h2>

            {/* Explore More Button */}
            <Link
              href={data.exploreMoreLink}
              className="px-6 py-3 bg-[#009FE8] text-white font-medium rounded-lg hover:bg-[#0077B6] transition-colors"
            >
              Explore More
            </Link>
          </div>

          {/* Cards Grid */}
          <Cards cards={data.cards} />
        </InnovationSliderInteractive>
      </div>
    </section>
  );
}
