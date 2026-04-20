export type FooterColumn = {
  id: string;
  title: string;
  links: Array<{ id: string; label: string; href: string }>;
};

export type SocialLink = {
  id: string;
  platform: string;
  href: string;
  icon?: string;
};

/** Static footer payload (replace with API fetch later if needed). */
export type FooterData = {
  logo: { text: string; image?: string; href: string };
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
};
