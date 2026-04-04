import type { Service } from '@/lib/api/home';
import { RichText } from '@/components/common/RichText';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {service.icon && (
                <div className="text-4xl mb-4">{service.icon}</div>
              )}
              <h3 className="text-xl font-semibold mb-3 text-black">
                {service.title}
              </h3>
              <RichText as="div" html={service.description} className="text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
