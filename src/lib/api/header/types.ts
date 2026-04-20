export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
};

/** Static header payload (replace with API fetch later if needed). */
export type HeaderData = {
  logo: {
    text?: string;
    image?: string;
    href: string;
    acronym?: string;
    organizationName?: string;
    tagline?: string;
    lockupImage?: string;
  };
  navigation: NavItem[];
  cta?: { text: string; href: string };
};
