import { fetchHomepageData } from '@/lib/api';
import WorkInSustainabilityClient from './WorkInSustainabilityClient';

/**
 * Work in Sustainability Component (Server Component)
 * 
 * Fetches homepage data server-side and passes sustainability work data to client component
 * for slider functionality.
 */
export default async function WorkInSustainability() {
  const homepageData = await fetchHomepageData();

  return <WorkInSustainabilityClient data={homepageData.workInSustainability} />;
}
