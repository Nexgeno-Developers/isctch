import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import ContactUsMessageSection from '@/components/components/ContactUsMessageSection';
import type { ContactUsLayoutPageData } from '@/lib/api/contact_us_layout';

export interface ContactUsPageProps {
  data: ContactUsLayoutPageData;
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

      
      <div className="pt-12"><NewsletterSubscription /> </div>
      
    </main>
  );
}

