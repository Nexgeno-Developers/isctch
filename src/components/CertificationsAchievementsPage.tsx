import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import GreenBuildingCertificationsSection from '@/components/components/GreenBuildingCertificationsSection';
import SustainabilityTimelineSection from '@/components/components/SustainabilityTimelineSection';
import CertificateTilesSection from '@/components/components/CertificateTilesSection';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface CertificationsAchievementsPageProps {
  data: DynamicPageData;
}

export default function CertificationsAchievementsPage({ data }: CertificationsAchievementsPageProps) {
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

      {data.certificationsGreenBuildingSection ? (
        <GreenBuildingCertificationsSection data={data.certificationsGreenBuildingSection} />
      ) : null}

      {data.certificationsSustainabilityTimelineSection ? (
        <SustainabilityTimelineSection data={data.certificationsSustainabilityTimelineSection} />
      ) : null}

      {data.certificationsCertificateTilesSection ? (
        <CertificateTilesSection data={data.certificationsCertificateTilesSection} />
      ) : null}

      <CallToAction />
      <NewsletterSubscription />
    </main>
  );
}
