import { formatBoldText } from '@/lib/htmlText';
import type { FAQData, FAQItem } from '@/lib/api/home';
import FAQItemClient from './FAQItemClient';

interface FAQClientProps {
  data: FAQData;
}

export default function FAQClient({ data }: FAQClientProps) {
  return (
    <section className="bg-gray-50 py-4 md:py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-[22px] md:text-4xl lg:text-5xl font-bold text-start mb-4 md:mb-12">
          <span className="text-black">Frequently Asked</span>{' '}
          <span className="text-[#009FE8]">Questions</span>
        </h2>

        {/* FAQ List */}
        <div className="">
          {data.items.map((item) => (
            <FAQItemClient key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
