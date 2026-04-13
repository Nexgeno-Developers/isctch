import type { OnePackOneCodeLandingSectionData } from '@/lib/api/product_category_layout_4';
import CallToAction from '../home/CallToAction';
import NewsletterSubscription from '../home/NewsletterSubscription';
import OnePackOneCodeLandingSectionClient from './OnePackOneCodeLandingSectionClient';
import ConnectTechnicalExperts from '@/components/technical-services/ConnectTechnicalExperts';

export function OnePackOneCodeLandingSection({ data }: { data: OnePackOneCodeLandingSectionData & { title?: string } }) {
  return (
    <>
      <OnePackOneCodeLandingSectionClient data={data} />
      <ConnectTechnicalExperts />
      <CallToAction />
      <NewsletterSubscription />
    </>
  );
}

