import CompanyHero from '@/components/company/CompanyHero';
import CompanyNavigationServer from '@/components/company/CompanyNavigationServer';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import VisionMission from '@/components/company/VisionMission';
import OurValues from '@/components/company/OurValues';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import type { AboutUsLayout3PageData } from '@/lib/api/about_us_layout_3';

export function VisionMissionLayoutPageSection({
  data,
  activePath,
}: {
  data: AboutUsLayout3PageData;
  activePath?: string;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.title,
          backgroundImage: data.heroBackgroundImage || '',
        }}
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: data.title }]} />
        </div>
      </section>

      <CompanyNavigationServer activePath={activePath || '/vision-mission'} data={data.navigation} />

      <VisionMission data={data.visionMission} />
      <OurValues data={data.ourValues} />

      <div className="pt-0 md:pt-4 bg-gray-50">
        <CallToAction />
      </div>
      <NewsletterSubscription />
    </main>
  );
}

