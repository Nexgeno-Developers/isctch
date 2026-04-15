import { formatBoldText } from '@/lib/htmlText';
import { RichText } from '@/components/common/RichText';
import { getCompanyCommonData } from '@/lib/api/company_common';
import NewsletterForm from './NewsletterForm';

/**
 * Newsletter Subscription Component (Server Component)
 * 
 * Fetches homepage data server-side and renders the newsletter subscription section.
 */
export default async function NewsletterSubscription() {
  const companyData = await getCompanyCommonData();
  if (!companyData) return null;

  const title = companyData.subscribeTitle;
  const subtitle = companyData.subscribeSubtitle;

  if (!title && !subtitle) return null;

  return (
    <section 
      className="relative py-10 md:py-24 overflow-hidden"
      style={{
        backgroundImage: 'url(/newsletter_bg.webp)',
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
          {title ? (
            <h2
              className="text-[20px] md:text-4xl lg:text-5xl font-bold text-white mb-4"
              dangerouslySetInnerHTML={{ __html: formatBoldText(title) }}
            />
          ) : null}

          {/* Subtitle */}
          {subtitle ? (
            <RichText
              as="div"
              html={subtitle}
              className="text-white text-[14px] md:text-lg mb-4 md:mb-12"
            />
          ) : null}

          {/* Newsletter Form */}
          <NewsletterForm 
            placeholder="Business Email"
            buttonText="Subscribe"
          />
        </div>
      </div>
    </section>
  );
}
