import { Fragment } from 'react';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyNavigation from '@/components/company/CompanyNavigation';
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
import { COMPANY_SUB_NAVIGATION } from '@/fake-api/company';
import type { DynamicPageData } from '@/fake-api/dynamic-pages';

export interface GovernanceManagementPageProps {
  data: DynamicPageData;
}

export default function GovernanceManagementPage({
  data,
}: GovernanceManagementPageProps) {
  const detailSections = data.governanceDetailSections ?? [];
  const firstCenterPanelIndex = detailSections.findIndex(
    (d) => d.layout === 'centerPanel',
  );

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

      <CompanyNavigation
        data={COMPANY_SUB_NAVIGATION}
        activePath="/governance-management"
      />

    

        <GovernanceFrameworkSection data={data.governanceFrameworkSection!} />

       

        <GovernanceFrameworkSecondarySection
          data={data.governanceFrameworkSecondarySection}
        />

        {detailSections.map((d, index) => {
          if (d.layout === 'centerPanel') {
            const detail = (
              <GovernanceDetailSection key={d.title} data={d} />
            );
            if (index === firstCenterPanelIndex) {
              return (
                <Fragment key={`${d.title}-with-grc`}>
                  {detail}
                  <GovernanceGrcSection data={data.governanceGrcSection} />
                </Fragment>
              );
            }
            return detail;
          }
          if (d.layout === 'complianceCards') {
            return <GovernanceComplianceCardsSection key={d.title} data={d} />;
          }
          if (d.layout === 'securityTrust') {
            return (
              <GovernanceSecurityTrustSection key={d.titleBlue} data={d} />
            );
          }
          if (d.layout === 'whistleCards') {
            return (
              <GovernanceWhistleblowingCardsSection
                key={d.cards.map((c) => c.id).join('-')}
                data={d}
              />
            );
          }
          return (
            <GovernanceWhistleblowingSection key={d.titleBlue} data={d} />
          );
        })}

        {firstCenterPanelIndex === -1 ? (
          <GovernanceGrcSection data={data.governanceGrcSection} />
        ) : null}

      <div className="bg-gray-50 pt-12">
        <CallToAction />
      </div>

      <NewsletterSubscription />
    </main>
  );
}

