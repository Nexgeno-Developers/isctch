import type { HeaderData } from '@/lib/api/header';
import MobileMenuClient from './MobileMenuClient';

/**
 * Mobile Menu Component (Server Component)
 * 
 * Receives navigation data from Header server component
 * and passes it to client component for interactivity.
 */
export default function MobileMenu({
  navigation,
  cta,
}: {
  navigation: HeaderData['navigation'];
  cta: HeaderData['cta'];
}) {
  return (
    <MobileMenuClient navigation={navigation} cta={cta} />
  );
}
