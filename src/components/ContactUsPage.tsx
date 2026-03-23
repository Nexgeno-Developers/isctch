import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import ContactUsMessageSection from '@/components/ContactUsMessageSection';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface ContactUsPageProps {
  data: DynamicPageData;
}

export default function ContactUsPage({ data }: ContactUsPageProps) {
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
          <Breadcrumbs
            items={[
              {
                label: data.title,
              },
            ]}
          />
        </div>
      </section>

      <ContactUsMessageSection />

      <div className="bg-gray-50 pt-12">
        <CallToAction />
      </div>

      <NewsletterSubscription />
    </main>
  );
}

