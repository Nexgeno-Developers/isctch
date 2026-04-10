import { fetchCompanyData } from '@/lib/api';
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
  const navigation =
    data !== undefined
      ? data
      : ((await fetchCompanyData())?.navigation as CompanyNavigationData | undefined) ?? null;

  if (!navigation || navigation.items.length === 0) {
    return null;
  }

  return <CompanyNavigation data={navigation} activePath={activePath} />;
}
