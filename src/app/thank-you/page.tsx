import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Thank You',
    alternates: { canonical: getCanonicalUrl('/thank-you') },
  };
}

export default function ThankYouPage() {
  return <main className="min-h-[40vh]" />;
}
