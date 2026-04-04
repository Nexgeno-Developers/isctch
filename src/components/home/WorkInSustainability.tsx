import { fetchHomepageData } from '@/lib/api/home';
import WorkInSustainabilityClient from './WorkInSustainabilityClient';

/**
 * Work in Sustainability Component (Server Component)
 * 
 * Fetches homepage data server-side and passes sustainability work data to client component
 * for slider functionality.
 */
export default async function WorkInSustainability() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;

  return <WorkInSustainabilityClient data={homepageData.workInSustainability} />;
}
