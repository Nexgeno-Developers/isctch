import Link from 'next/link';
import { fetchFooterData } from '@/lib/api/footer';
import { FooterSocialIcon } from '@/components/layout/FooterSocialIcon';
import Image from 'next/image';
/**
 * Footer Component
 * 
 * Server Component that fetches footer data from API
 */
export default async function Footer() {
  const footerData = await fetchFooterData();

  return (
    <footer className="bg-[#009FE8] text-white overflow-x-hidden">
      <div className="container mx-auto px-4 pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-10 lg:gap-8 xl:gap-10">
          {/* Left Section - Logo, Description, and Social Icons */}
          <div className="w-full col-span-2 lg:col-span-4 xl:col-span-4 lg:pr-4 xl:pr-8">
            {/* Logo */}
            <Link href={footerData.logo.href} className="block mb-4">
              {footerData.logo.image ? (
                <Image
                  width={160}
                  height={160}
                  src={footerData.logo.image}
                  alt={footerData.logo.text || 'Logo'}
                  className="h-auto w-auto max-h-14 md:max-h-16 max-w-[160px] object-contain object-left"
                />
              ) : (
                <h2 className="text-2xl md:text-3xl font-normal text-white">
                  {footerData.logo.text}
                </h2>
              )}
            </Link>

            {/* Description */}
            <p className="text-white text-sm md:text-base font-thin mb-6 leading-relaxed break-words text-pretty">
              {footerData.description}
            </p>

            {/* Social Media Icons */}
            {footerData.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 gap-y-3">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:opacity-80 transition-opacity"
                    aria-label={social.platform}
                  >
                    {social.icon ? <FooterSocialIcon icon={social.icon} /> : null}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Middle Section - Four Columns */}
          {footerData.columns.map((column) => (
            <div key={column.id} className="w-full sm:col-span-1 lg:col-span-2 min-w-0">
              <h3 className="text-white font-bold mb-4 text-base md:text-lg">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="font-thin text-white hover:opacity-80 transition-opacity text-sm md:text-base break-words [overflow-wrap:anywhere]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-white/20 pt-8 mt-12">
          <div className="text-center">
            <p className="text-white text-sm md:text-[14px] font-thin">
              {footerData.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
