import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import GreenSustainabilityJourneySection from '@/components/components/GreenSustainabilityJourneySection';
import GreenSustainabilityVisionSection from '@/components/components/GreenSustainabilityVisionSection';
import GreenPhotovoltaicProjectSection from '@/components/components/GreenPhotovoltaicProjectSection';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface GreenEffortsPageProps {
  data: DynamicPageData;
}

export default function GreenEffortsPage({ data }: GreenEffortsPageProps) {
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

     
      {data.greenSustainabilityVisionSection ? (
        <GreenSustainabilityVisionSection data={data.greenSustainabilityVisionSection} />
      ) : null}

      {data.greenPhotovoltaicProjectSections?.map((block) => (
        <GreenPhotovoltaicProjectSection key={block.title + block.locationLabel} data={block} />
      ))}

{data.greenSustainabilityJourneySection ? (
        <GreenSustainabilityJourneySection data={data.greenSustainabilityJourneySection} />
      ) : null}


<div className="bg-gray-50 pt-12">
<CallToAction />
</div>
      
      <NewsletterSubscription />
    </main>
  );
}
