export type FooterColumn = {
  id: string;
  title: string;
  links: Array<{ id: string; label: string; href: string }>;
  /** Optional line below links (e.g. hashtag), styled as accent. */
  accentText?: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  href: string;
  icon?: string;
};

/** Static footer payload (replace with API fetch later if needed). */
export type FooterData = {
  logo: {
    text: string;
    image?: string;
    href: string;
    /** Long organization name beside the mark (e.g. blue, all-caps). */
    orgLine?: string;
  };
  description: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
};
