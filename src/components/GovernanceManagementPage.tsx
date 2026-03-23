import CompanyHero from '@/components/company/CompanyHero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CallToAction from '@/components/home/CallToAction';
import NewsletterSubscription from '@/components/home/NewsletterSubscription';
import GovernanceFrameworkSection from '@/components/governance/GovernanceFrameworkSection';
import GovernanceFrameworkSecondarySection from '@/components/governance/GovernanceFrameworkSecondarySection';
import GovernanceDetailSection from '@/components/governance/GovernanceDetailSection';
import GovernanceComplianceCardsSection from '@/components/governance/GovernanceComplianceCardsSection';
import GovernanceGrcSection from '@/components/governance/GovernanceGrcSection';
import GovernanceSecurityTrustSection from '@/components/governance/GovernanceSecurityTrustSection';
import GovernanceWhistleblowingSection from './governance/GovernanceWhistleblowingSection';
import GovernanceWhistleblowingCardsSection from './governance/GovernanceWhistleblowingCardsSection';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface GovernanceManagementPageProps {
  data: DynamicPageData;
}

export default function GovernanceManagementPage({
  data,
}: GovernanceManagementPageProps) {
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

        <GovernanceFrameworkSection data={data.governanceFrameworkSection} />

        <div className="h-1 bg-[#009FE8]" />

        <GovernanceFrameworkSecondarySection
          data={data.governanceFrameworkSecondarySection}
        />

        <GovernanceGrcSection data={data.governanceGrcSection} />

        {data.governanceDetailSections?.map((d) => (
          d.layout === 'centerPanel' ? (
            <GovernanceDetailSection key={d.title} data={d} />
          ) : d.layout === 'complianceCards' ? (
            <GovernanceComplianceCardsSection key={d.title} data={d} />
          ) : d.layout === 'securityTrust' ? (
            <GovernanceSecurityTrustSection key={d.titleBlue} data={d} />
          ) : d.layout === 'whistleCards' ? (
            <GovernanceWhistleblowingCardsSection
              key={d.cards.map((c) => c.id).join('-')}
              data={d}
            />
          ) : (
            <GovernanceWhistleblowingSection
              key={d.titleBlue}
              data={d}
            />
          )
        ))}
     

      <div className="bg-gray-50 pt-12">
        <CallToAction />
      </div>

      <NewsletterSubscription />
    </main>
  );
}

