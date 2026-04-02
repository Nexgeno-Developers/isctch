import { fetchHomepageData } from '@/lib/api/home';
import LatestInsightsClient from './LatestInsightsClient';

/**
 * Latest Insights Component (Server Component)
 * 
 * Fetches homepage data server-side and passes insights data to client component
 * for slider functionality.
 */
export default async function LatestInsights() {
  const homepageData = await fetchHomepageData();

  return <LatestInsightsClient data={homepageData.latestInsights} />;
}
