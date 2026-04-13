import ContactSustainabilityClient from './ContactSustainabilityClient';
import { getCompanyCommonData } from '@/lib/api/company_common';

/**
 * Contact & Sustainability Section Component (Server Wrapper)
 *
 * Fetches global company meta and passes it to the client form component.
 */
export default async function ContactSustainability() {
  const companyData = await getCompanyCommonData();
  if (!companyData) return null;

  return (
    <ContactSustainabilityClient
      data={{
        contactTitle: companyData.contactTitle,
        contactSubtitle: companyData.contactSubtitle,
        contactCardTitle: companyData.contactCardTitle,
        contactCardDescription: companyData.contactCardDescription,
        contactCardUrl: companyData.contactCardUrl,
      }}
    />
  );
}
