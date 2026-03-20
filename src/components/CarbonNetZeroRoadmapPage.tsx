import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import CarbonNeutralityRoadmapSection from '@/components/components/CarbonNeutralityRoadmapSection';
import SustainabilityPillarsGridSection from '@/components/components/SustainabilityPillarsGridSection';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface CarbonNetZeroRoadmapPageProps {
  data: DynamicPageData;
}

export default function CarbonNetZeroRoadmapPage({ data }: CarbonNetZeroRoadmapPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.title,
          backgroundImage:
            typeof data.heroBackgroundImage === 'string' ? data.heroBackgroundImage : '/about_banner.jpg',
        }}
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              {
                label: data.breadcrumbs?.parentLabel || 'Home',
                href: data.breadcrumbs?.parentHref || '/',
              },
              { label: data.title },
            ]}
          />
        </div>
      </section>

      {data.carbonNetZeroRoadmapSection ? (
        <CarbonNeutralityRoadmapSection data={data.carbonNetZeroRoadmapSection} />
      ) : null}

      {data.carbonNetZeroPillarsSection ? (
        <SustainabilityPillarsGridSection data={data.carbonNetZeroPillarsSection} />
      ) : null}

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}
