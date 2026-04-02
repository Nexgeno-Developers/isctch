import { fetchHomepageData } from '@/lib/api/home';
import FAQClient from './FAQClient';

/**
 * FAQ Component (Server Component)
 * 
 * Fetches homepage data server-side and passes FAQ data to client component
 * for expandable functionality.
 */
export default async function FAQ() {
  const homepageData = await fetchHomepageData();

  return <FAQClient data={homepageData.faq} />;
}
