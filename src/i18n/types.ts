export type Locale = 'en' | 'es' | 'pt-BR';
export type ThemeName = 'light' | 'dark';

export interface JobText {
  title: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

/** Everything the website shows in a given language. The CV is English-only and reads profile.ts directly. */
export interface Messages {
  ui: {
    skipLink: string;
    navLabel: string;
    nav: { about: string; experience: string; reach: string; skills: string; education: string; contact: string };
    languageLabel: string;
    menu: string;
    close: string;
    cvButtonPrefix: string; // "Download" in "Download CV" (hidden on very small screens)
    cvButtonLabel: string; // accessible name of the nav CV button
    hero: { getInTouch: string; downloadCv: string };
    about: { eyebrow: string; title: string; atAGlance: string; currently: string; basedIn: string; languages: string; focus: string };
    experience: { eyebrow: string; title: string; current: string; showMore: (n: number) => string; showLess: string; technologies: string };
    reach: {
      eyebrow: string;
      title: string;
      groupLabel: string;
      clients: string;
      teams: string;
      clientsIntro: string;
      teamsIntro: string;
      mapLabel: (countries: string) => string;
    };
    skills: { eyebrow: string; title: string };
    education: { eyebrow: string; title: string; education: string; certifications: string; languages: string };
    contact: { eyebrow: string; title: string; body: string };
    footer: { builtWith: string };
    themeSwitch: (to: ThemeName) => string;
    map: { heroLabel: string; currentLocation: string };
  };
  content: {
    shortTitle: string;
    tagline: string;
    location: string;
    statLabels: [string, string, string];
    summary: string[];
    /** Keyed by `${company}-${start}` of the English job in profile.ts */
    jobs: Record<string, JobText>;
    /** English skill-group name → translated name */
    skillGroups: Record<string, string>;
    /** English skill item → translated item (only for items that aren't product names) */
    skillItems: Record<string, string>;
    education: { title: string; org: string }[];
    languages: { name: string; level: string }[];
    /** ADM0_A3 code → country name */
    countries: Record<string, string>;
  };
  /** MapLibre UI strings (zoom buttons, two-finger hint, …). Empty = MapLibre's English defaults. */
  mapLibre: Record<string, string>;
}
