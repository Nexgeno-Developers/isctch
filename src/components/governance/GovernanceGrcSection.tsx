export type GovernanceGrcIconId = 'erm' | 'ic' | 'ia' | 'af';

export type GovernanceGrcCardData = {
  id: string;
  title: string;
  description: string;
  iconId: GovernanceGrcIconId;
  iconUrl?: string;
};

export type GovernanceGrcSectionData = {
  eyebrow: string;
  title: string;
  description: string;
  cards: GovernanceGrcCardData[];
};

import Image from 'next/image';
import { formatBoldText } from '@/lib/htmlText';

function renderIcon(iconId: GovernanceGrcIconId, iconUrl?: string) {
  if (iconUrl) {
    return (
      <Image
        src={iconUrl}
        alt=""
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
      />
    );
  }
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'w-10 h-10',
  };

  switch (iconId) {
    case 'erm':
      return (
        <svg {...common}>
          <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
          <circle cx="12" cy="12" r="2" />
          <path d="M8 20l-2 2" />
          <path d="M16 20l2 2" />
        </svg>
      );
    case 'ic':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 8h2" />
          <path d="M8 12h8" />
          <path d="M14 8h2" />
          <path d="M3 20h18" />
        </svg>
      );
    case 'ia':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M11 8v4l3 1" />
          <path d="M20 20l-3-3" />
        </svg>
      );
    case 'af':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
          <path d="M8 20h8" />
        </svg>
      );
    default:
      return null;
  }
}

const DEFAULT_DATA: GovernanceGrcSectionData = {
  eyebrow: 'Risk & Control',
  title: 'Governance, Risk, And Control Systems (GRC)',
  description:
    'Lamipak operates a comprehensive risk control system designed to underpin the achievement of our objectives on operations’ effectiveness and efficiency, assets safety, compliance, reliable reporting and strategy. our framework is structured around four core pillars:',
  cards: [
    {
      id: 'erm',
      title: 'Enterprise Risk Management',
      description:
        "The group’s enterprise risk management (ERM) process is designed to identify, assess, and mitigate actual and potential risks as emerging risks to our business in order to protect the group from negative financial and/or reputational impact.",
      iconId: 'erm',
    },
    {
      id: 'ic',
      title: 'Internal Control',
      description:
        'Internal control is designed to reduce identified risks to the business, safeguard the company’s assets, help to detect fraud, protect the shareholders’ investment, it also helps to ensure reliability of reporting, and compliance with laws.',
      iconId: 'ic',
    },
    {
      id: 'ia',
      title: 'Internal Audit',
      description:
        'Internal auditing is an independent activity that evaluates and improves risk management, internal control, and governance to help an organization achieve its objectives.',
      iconId: 'ia',
    },
    {
      id: 'af',
      title: 'Anti-Fraud',
      description:
        'Anti-fraud refers to measures used to prevent and detect fraud through awareness, security controls, technology, and actions to fix weaknesses and strengthen teamwork.',
      iconId: 'af',
    },
  ],
};

export default function GovernanceGrcSection({
  data,
}: {
  data?: GovernanceGrcSectionData;
}) {
  const resolved = data ?? DEFAULT_DATA;

  return (
    <section className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="">
          <div className="text-[#009FE8] font-semibold text-sm md:text-base">
           {resolved.title}
          </div>

          <h2 className="mt-3 text-[24px] md:text-5xl font-bold text-black leading-tight" dangerouslySetInnerHTML={{ __html: formatBoldText(resolved.eyebrow) }} />
          
          <p className="mt-4 md:mt-6 text-[14px] md:text-base text-black leading-relaxed">
            {resolved.description}
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resolved.cards.map((card) => (
              <div
                key={card.id}
                className="bg-[#EDF0F1] rounded-[28px] md:rounded-[50px] px-5 py-6 text-center"
              >
                <div className="flex justify-center text-[#009FE8]">
                  {renderIcon(card.iconId, card.iconUrl)}
                </div>

                <h3 className="mt-5 text-[15px] md:text-base font-bold text-black">
                  {card.title}
                </h3>
                <p className="mt-4 text-[14px] md:text-sm text-black leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

