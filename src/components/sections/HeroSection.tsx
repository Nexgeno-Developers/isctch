import CompanyHero from '@/components/company/CompanyHero';
import type { HeroSectionData } from '@/fake-api/page-builder';

/**
 * Page-builder hero section.
 * We reuse the exact `CompanyHero` UI so `/packaging` matches the styling of About Us pages.
 */
export function HeroSection({ data }: { data: HeroSectionData }) {
  return (
    <CompanyHero
      data={{
        title: data.title,
        // CompanyHero expects `backgroundImage` naming; we map from our builder data.
        backgroundImage: data.backgroundImage || '/about_banner.jpg',
      }}
    />
  );
}

