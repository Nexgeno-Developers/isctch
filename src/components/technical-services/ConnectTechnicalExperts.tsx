import { formatBoldText, plainTextFromMaybeHtml } from '@/lib/htmlText';
import { getCompanyCommonData } from '@/lib/api/company_common';
import ConnectTechnicalExpertsClient from './ConnectTechnicalExpertsClient';

/**
 * Connect with Technical Experts Component (Server Wrapper)
 *
 * Fetches global company meta and passes it to the client form component.
 */
export default async function ConnectTechnicalExperts() {
  const companyData = await getCompanyCommonData();
  if (!companyData) return null;

  const heading = companyData.technicalExpertsTitle;
  const formTitle = companyData.technicalExpertsFormTitle;
  const image = companyData.technicalExpertsImage;

  if (!heading && !formTitle && !image) return null;

  const headingHtml = heading ? formatBoldText(heading) : undefined;
  const formTitleHtml = formTitle ? formatBoldText(formTitle) : undefined;
  const illustrationImage = image || '/connected_image.jpg';
  const illustrationAlt =
    plainTextFromMaybeHtml(heading || formTitle || 'Connect with Technical Experts') ||
    'Connect with Technical Experts';

  return (
    <ConnectTechnicalExpertsClient
      headingHtml={headingHtml}
      formTitleHtml={formTitleHtml}
      illustrationImage={illustrationImage}
      illustrationAlt={illustrationAlt}
    />
  );
}
