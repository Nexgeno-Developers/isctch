import MobileMenuClient from './MobileMenuClient';
import type { NavItem } from '@/lib/api/header/types';

/**
 * Server wrapper: passes header navigation + CTA into the client drawer (`src/lib/api/header`).
 */
export default function MobileMenu({
  navigation,
  cta,
}: {
  navigation: NavItem[];
  cta?: { text: string; href: string };
}) {
  return <MobileMenuClient navigation={navigation} cta={cta} />;
}
