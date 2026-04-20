import Link from 'next/link';
import Image from 'next/image';
import { getFooterLayout } from '@/lib/api/footer';
import { FooterSocialIcon } from '@/components/layout/FooterSocialIcon';

/** Data: `src/lib/api/footer` — four-column navy footer + social + copyright. */
export default function Footer() {
  const footerData = getFooterLayout();

  return (
    <footer className="overflow-x-hidden bg-[#1a1a2e] text-white lg:py-20 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              href={footerData.logo.href}
              className="group mb-5 flex max-w-md gap-3 sm:max-w-none"
            >
              {footerData.logo.image ? (
                <Image
                  width={156}
                  height={156}
                  src={footerData.logo.image}
                  alt={footerData.logo.text}
                  className="w-[200px shrink-0 object-cover"
                />
              ) : null}
             
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/70 md:text-[15px]">
              {footerData.description}
            </p>

            {footerData.socialLinks && footerData.socialLinks.length > 0 ? (
              <div className="flex flex-wrap items-center gap-5">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/75 transition-colors hover:text-white"
                    aria-label={social.platform}
                  >
                    {social.icon ? <FooterSocialIcon icon={social.icon} /> : null}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {footerData.columns.map((column) => (
            <div key={column.id} className="min-w-0">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-white md:text-base">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#c5c8d6] transition-colors hover:text-white md:text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {column.accentText ? (
                <p className="mt-6 text-base font-bold text-[#F28500]">{column.accentText}</p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 lg:mt-16">
          <p className="text-center text-xs text-white/45 md:text-sm">{footerData.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
