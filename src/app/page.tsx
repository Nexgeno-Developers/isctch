import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Lamipak',
    description: 'Lamipak',
    alternates: { canonical: getCanonicalUrl('/') },
  };
}

export default function HomePage() {
  return <main className="min-h-[40vh]" />;
}
