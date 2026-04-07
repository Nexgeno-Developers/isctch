import type { InnovationsPageData } from '@/lib/api/innovations_layout';
import CompanyHero from '@/components/company/CompanyHero';

type Props = Pick<InnovationsPageData, 'heroTitle' | 'heroBackgroundImage'>;

export default function InnovationsHero({ heroTitle, heroBackgroundImage }: Props) {
  return (
    <CompanyHero
      data={{
        title: heroTitle,
        backgroundImage: heroBackgroundImage || '/about_banner.jpg',
      }}
    />
  );
}
