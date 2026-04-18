import { getDefaultAboutSubNavigation } from '@/config/publicRoutes';
import CompanyNavigation, { type CompanyNavigationData } from './CompanyNavigation';

interface CompanyNavigationServerProps {
  activePath?: string;
  data?: CompanyNavigationData | null;
}

/**
 * Company Navigation Server Component
 * 
 * Fetches navigation data server-side and passes it to the component.
 */
export default async function CompanyNavigationServer({
  activePath,
  data,
}: CompanyNavigationServerProps) {
  const navigation: CompanyNavigationData | null =
    data !== undefined ? data : getDefaultAboutSubNavigation();

  if (!navigation || navigation.items.length === 0) {
    return null;
  }

  return <CompanyNavigation data={navigation} activePath={activePath} />;
}
