import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import LamiraMeetSection from '@/components/components/LamiraMeetSection';
import LamiraSpecialAbilitiesSection from '@/components/components/LamiraSpecialAbilitiesSection';
import LamiraLovesSection from '@/components/components/LamiraLovesSection';
import LamiraSharedGuideSection from '@/components/components/LamiraSharedGuideSection';
import LamiraSocialWorldMomentsSection from '@/components/components/LamiraSocialWorldMomentsSection';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface LamiraPageProps {
  data: DynamicPageData;
}

export default function LamiraPage({ data }: LamiraPageProps) {
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
             
              { label: data.title },
            ]}
          />
        </div>
      </section>

      {data.lamiraMeetSection ? (
        <LamiraMeetSection data={data.lamiraMeetSection} />
      ) : null}

      {data.lamiraSpecialAbilitiesSection ? (
        <LamiraSpecialAbilitiesSection data={data.lamiraSpecialAbilitiesSection} />
      ) : null}

      {data.lamiraLovesSection ? <LamiraLovesSection data={data.lamiraLovesSection} /> : null}

      {data.lamiraSharedGuideSection ? (
        <LamiraSharedGuideSection data={data.lamiraSharedGuideSection} />
      ) : null}

      {data.lamiraSocialWorldMomentsSection ? (
        <LamiraSocialWorldMomentsSection data={data.lamiraSocialWorldMomentsSection} />
      ) : null}

<div className="bg-gray-50 pt-12">
<CallToAction />
</div>
      
      <NewsletterSubscription />
    </main>
  );
}

