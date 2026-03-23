import Image from 'next/image';

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

function SocialIconTwitter() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );
}

function SocialIconInstagram() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SocialIconLinkedIn() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.47V9h3.4v1.5h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.37zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.14 0 2.07.92 2.07 2.06 0 1.14-.93 2.07-2.07 2.07zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function WorldPresenceCard() {
  return (
    <div className="bg-[#0E6B7E] rounded-[40px] overflow-hidden p-6">
      <div className="h-[220px] relative">
        <div className="absolute inset-0 opacity-10">
          {/* Decorative: lightweight “map” feel via globe icon + dots */}
          <Image
            src="/globe_icon.svg"
            alt="Global map"
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 h-full flex items-end justify-center pb-2">
          <div className="bg-white/20 rounded-full px-6 py-2 text-white text-sm font-medium">
            Global Presence
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactUsMessageRight() {
  return (
    <aside className="space-y-6">
      <div className="bg-[#EDF0F1] rounded-[50px] p-6 md:p-7">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Headquarters</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="text-[#009FE8] mt-0.5">
              <IconLocation />
            </div>
            <div className="text-sm text-gray-900 leading-relaxed">
              123 Sustainable Way, Industrial District,
              <br />
              Shanghai, China
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="text-[#009FE8] mt-0.5">
              <IconPhone />
            </div>
            <div className="text-sm text-gray-900">+86 21 0000 0000</div>
          </div>
        </div>
      </div>

      <div className="bg-[#EDF0F1] rounded-[50px] p-6 md:p-7">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Departments</h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs md:text-sm font-bold tracking-wide text-gray-900 mb-2">SALES & PARTNERSHIPS</p>
            <p className="text-sm text-gray-900">sales@lamipak.com</p>
          </div>

          <div>
            <p className="text-xs md:text-sm font-bold tracking-wide text-gray-900 mb-2">TECHNICAL SUPPORT</p>
            <p className="text-sm text-gray-900">tech.support@lamipak.com</p>
          </div>

          <div>
            <p className="text-xs md:text-sm font-bold tracking-wide text-gray-900 mb-2">CAREERS</p>
            <p className="text-sm text-gray-900">hr@lamipak.com</p>
          </div>
        </div>
      </div>

      <WorldPresenceCard />

      <div className="flex items-center gap-3">
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#009FE8] hover:opacity-80 transition-opacity"
          aria-label="Twitter"
        >
          <SocialIconTwitter />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#009FE8] hover:opacity-80 transition-opacity"
          aria-label="Instagram"
        >
          <SocialIconInstagram />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#009FE8] hover:opacity-80 transition-opacity"
          aria-label="LinkedIn"
        >
          <SocialIconLinkedIn />
        </a>
      </div>
    </aside>
  );
}

