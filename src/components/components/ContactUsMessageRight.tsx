import Image from 'next/image';
import { fetchCompanyProfileData } from '@/lib/api';
import { FooterSocialIcon } from '@/components/layout/FooterSocialIcon';

function IconLocation() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.35-7-11a7 7 0 0 1 14 0c0 6.65-7 11-7 11z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.16a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92z"
      />
    </svg>
  );
}

function WorldPresenceCard({ mapImage }: { mapImage?: string }) {
  return (
    <div className="rounded-[50px] overflow-hidden p-6">
      <div className="relative">
        <div className="">
          {/* Decorative: lightweight “map” feel via globe icon + dots */}
          <Image
            src={mapImage ?? '/globe_icon.svg'}
            alt="Global map"
            width={1000}
            height={1000}
            className="object-contain w-full "
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}

export default async function ContactUsMessageRight() {
  const companyProfile = await fetchCompanyProfileData();
  const headquartersAddress = companyProfile?.address || 'Head Office, Mumbai, India';
  const headquartersPhone = companyProfile?.phone || '02134567890';
  const salesPartnerEmail = companyProfile?.salesPartnerEmail || 'sales@lamipak.com';
  const technicalSupportEmail =
    companyProfile?.technicalSupportEmail || 'tech.support@lamipak.com';
  const careersEmail = companyProfile?.careersEmail || 'hr@lamipak.com';
  const socialLinks = [
    { icon: 'x', platform: 'X', href: companyProfile?.xUrl },
    { icon: 'linkedin', platform: 'LinkedIn', href: companyProfile?.linkedinUrl },
    { icon: 'facebook', platform: 'Facebook', href: companyProfile?.facebookUrl },
    { icon: 'instagram', platform: 'Instagram', href: companyProfile?.instagramUrl },
    { icon: 'youtube', platform: 'YouTube', href: companyProfile?.youtubeUrl },
    { icon: 'tiktok', platform: 'TikTok', href: companyProfile?.tiktokUrl },
    { icon: 'vimeo', platform: 'Vimeo', href: companyProfile?.vimeoUrl },
  ].filter((item): item is { icon: string; platform: string; href: string } => Boolean(item.href));
  const googleMapImage = companyProfile?.googleMapImage;

  return (
    <aside className="space-y-6">
      <div className="bg-[#EDF0F1] rounded-[50px] p-6 md:p-7">
        <h3 className="text-lg md:text-xl font-bold text-black mb-4">Headquarters</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="text-[#009FE8] mt-0.5">
              <IconLocation />
            </div>
            <div className="text-sm text-black leading-relaxed">{headquartersAddress}</div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-[#009FE8] mt-0.5">
              <IconPhone />
            </div>
            <div className="text-sm text-black">{headquartersPhone}</div>
          </div>
          {/* {companyWebsite && (
            <div className="text-sm text-black">
              <a href={companyWebsite} target="_blank" rel="noopener noreferrer" className="underline">
                {companyWebsite}
              </a>
            </div>
          )} */}
        </div>
      </div>

      <div className="bg-[#EDF0F1] rounded-[50px] p-6 md:p-7">
        <h3 className="text-lg md:text-xl font-bold text-black mb-4">Departments</h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs md:text-sm font-bold tracking-wide text-black mb-2">SALES & PARTNERSHIPS</p>
            <p className="text-sm text-black">{salesPartnerEmail}</p>
          </div>

          <div>
            <p className="text-xs md:text-sm font-bold tracking-wide text-black mb-2">TECHNICAL SUPPORT</p>
            <p className="text-sm text-black">{technicalSupportEmail}</p>
          </div>

          <div>
            <p className="text-xs md:text-sm font-bold tracking-wide text-black mb-2">CAREERS</p>
            <p className="text-sm text-black">{careersEmail}</p>
          </div>
        </div>
      </div>

      <WorldPresenceCard mapImage={googleMapImage} />

      {socialLinks.length > 0 && (
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.icon}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDF0F1] text-black transition-opacity hover:opacity-80"
              aria-label={social.platform}
            >
              <FooterSocialIcon icon={social.icon} />
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}

