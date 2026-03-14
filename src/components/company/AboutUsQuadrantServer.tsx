import { fetchCompanyData } from '@/lib/api';
import AboutUsQuadrant from './AboutUsQuadrant';

/**
 * About Us Quadrant Server Component
 * 
 * Fetches quadrant section data server-side and passes it to the component.
 */
export default async function AboutUsQuadrantServer() {
  const companyData = await fetchCompanyData();

  if (!companyData.aboutUsQuadrant) {
    return null;
  }

  return <AboutUsQuadrant data={companyData.aboutUsQuadrant} />;
}
