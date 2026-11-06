/** Every robin.build project. The footer of each site links to the others. */
export const projects = [
  { id: 'dayline', name: 'Dayline', url: 'https://dayline.robin.build' },
  { id: 'stillmic', name: 'Stillmic', url: 'https://stillmic.robin.build' },
  { id: 'buds', name: 'Redmi Buds Bar', url: 'https://buds.robin.build' },
  { id: 'satoma', name: 'Satoma Sans', url: 'https://satoma.robin.build' },
  { id: 'fungus', name: 'Fungus Inc.', url: 'https://fungus.build' },
] as const;

export type ProjectId = (typeof projects)[number]['id'];

/** Donation addresses shown in the footer of every site. */
export const wallets = [
  { name: 'Bitcoin', address: 'bc1qv477t9sduhvnffyh76t6yha2x9s47wl55ccrkm' },
  { name: 'Ethereum', address: '0x6E88665F234920c0EcB8115F8c287D3C31cFAA51' },
  { name: 'Solana', address: '93Q1aChBp7qh2E9QaHa8J3RXJ2GJUuLTdknAnVLNnZp' },
] as const;

export interface Link {
  label: string;
  href: string;
}

export interface Site {
  /** Which project this is, so the footer can link to the others. */
  id: ProjectId | (string & {});
  name: string;
  /** Path of the square app icon in `public/`. */
  icon: string;
  /** Background colours for the browser chrome. */
  themeColor: { light: string; dark?: string };
  /** Absolute URL of the social preview image. */
  ogImage?: string;
  /** Links in the header. */
  nav?: Link[];
  /** A pill-shaped link at the end of the header, such as Download. */
  cta?: Link;
  /** Links at the end of the footer row. */
  footerLinks?: Link[];
  /** Show the donation addresses in the footer. Defaults to true. */
  support?: boolean;
  /** Follow the system's dark mode. Defaults to true. */
  dark?: boolean;
  /** Preload Satoma Sans. Set to false if the site uses other fonts. Defaults to true. */
  satoma?: boolean;
}

export function otherProjects(id: string) {
  return projects.filter((project) => project.id !== id);
}
