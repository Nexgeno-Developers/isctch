import { fetchHomepageData } from '@/lib/api/home';
import NewsletterForm from './NewsletterForm';

/**
 * Newsletter Subscription Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the newsletter subscription section.
 */
export default async function NewsletterSubscription() {
  const homepageData = await fetchHomepageData();
  if (!homepageData) return null;
  const data = homepageData.newsletterSubscription;

  return (
    <section 
      className="relative py-10 md:py-24 overflow-hidden"
      style={{
        backgroundImage: 'url(/newsletter_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-[#0E233CE5]" />
      {/* Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className=" mx-auto text-center">
          {/* Headline */}
          <h2 className="text-[20px] md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {data.headline}
          </h2>

          {/* Subtitle */}
          <p className="text-white text-[14px] md:text-lg mb-4 md:mb-12">
            {data.subtitle}
          </p>

          {/* Newsletter Form */}
          <NewsletterForm 
            placeholder={data.placeholder}
            buttonText={data.buttonText}
          />
        </div>
      </div>
    </section>
  );
}
