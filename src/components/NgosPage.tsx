import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import NgoMembershipMapSection from '@/components/components/NgoMembershipMapSection';
import NgoCircularFutureSection from '@/components/components/NgoCircularFutureSection';
import NgoAllianceCardsSection from '@/components/components/NgoAllianceCardsSection';
import type { NgosPageData } from '@/lib/api/sustainability_layout_5';

export interface NgosPageProps {
  data: NgosPageData;
}

export default function NgosPage({ data }: NgosPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyHero
        data={{
          title: data.title,
          backgroundImage:
            typeof data.heroBackgroundImage === 'string'
              ? data.heroBackgroundImage
              : '/about_banner.jpg',
        }}
      />

      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: data.title }]} />
        </div>
      </section>

      {data.ngosMembershipMapSection ? (
        <NgoMembershipMapSection data={data.ngosMembershipMapSection} />
      ) : null}

      {data.ngosAllianceCardsSection ? (
        <NgoAllianceCardsSection data={data.ngosAllianceCardsSection} />
      ) : null}

      {data.ngosCircularFutureSection ? (
        <NgoCircularFutureSection data={data.ngosCircularFutureSection} />
      ) : null}

      <div className="bg-gray-50 pt-12">
        <CallToAction />
      </div>

      <NewsletterSubscription />
    </main>
  );
}
