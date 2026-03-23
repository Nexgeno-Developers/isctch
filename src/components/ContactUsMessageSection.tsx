import ContactUsMessageLeft from '@/components/ContactUsMessageLeft';
import ContactUsMessageRight from '@/components/ContactUsMessageRight';

export default function ContactUsMessageSection() {
  return (
    <section className="bg-gray-50 py-6 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Outer rounded block (first wrapper component) */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-[62%_38%] gap-8">
            <ContactUsMessageLeft />
            <ContactUsMessageRight />
          </div>
        </div>
      </div>
    </section>
  );
}

