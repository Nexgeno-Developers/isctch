import { fetchHomepageData } from '@/lib/api/home';
import ApproachClient from './ApproachClient';

/**
 * Approach Component (Server Component)
 * 
 * Fetches homepage data server-side and passes approach data to client component
 * for interactivity.
 */
export default async function Approach() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;

  return <ApproachClient data={homepageData.approach} />;
}
