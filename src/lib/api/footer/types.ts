export interface FooterColumn {
  id: string;
  title: string;
  links: Array<{
    id: string;
    label: string;
    href: string;
  }>;
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon?: string;
}

export interface FooterData {
  logo: {
    text: string;
    image?: string;
    href: string;
  };
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
}
