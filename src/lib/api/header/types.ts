export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface HeaderData {
  logo: {
    text?: string;
    image?: string;
    href: string;
  };
  navigation: NavigationItem[];
  cta?: {
    text: string;
    href: string;
  };
}
