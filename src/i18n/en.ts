import { profile } from '../data/profile';
import type { Messages } from './types';

// English text comes from profile.ts (also used by the CV), so it's written in one place only.
export const en = {
  ui: {
    skipLink: 'Skip to content',
    navLabel: 'Primary',
    nav: { about: 'About', experience: 'Experience', reach: 'Reach', skills: 'Skills', education: 'Education', contact: 'Contact' },
    languageLabel: 'Language',
    menu: 'Menu',
    close: 'Close',
    cvButtonPrefix: 'Download',
    cvButtonLabel: 'Download CV',
    hero: { getInTouch: 'Get in touch', downloadCv: 'Download CV (PDF)' },
    about: { eyebrow: '01 · About', title: 'Spatial systems that scale', atAGlance: 'At a glance', currently: 'Currently', basedIn: 'Based in', languages: 'Languages', focus: 'Focus' },
    experience: {
      eyebrow: '02 · Experience',
      title: '17 years across energy, utilities, mining, telecom & government',
      current: 'Current',
      showMore: (n) => `Show ${n} more`,
      showLess: 'Show less',
      technologies: 'Technologies',
    },
    reach: {
      eyebrow: '03 · Global reach',
      title: 'Clients and teams across four continents',
      groupLabel: 'Show countries for',
      clients: 'Clients',
      teams: 'Teams',
      clientsIntro: 'Countries where I’ve delivered work for clients',
      teamsIntro: 'Countries my teammates have worked from',
      mapLabel: (countries) => `Map highlighting ${countries}`,
    },
    skills: { eyebrow: '04 · Skills', title: 'Toolbox' },
    education: { eyebrow: '05 · Education', title: 'Education, certifications & languages', education: 'Education', certifications: 'Certifications', languages: 'Languages' },
    contact: {
      eyebrow: '06 · Contact',
      title: 'Let’s build something on the map',
      body: 'Open to GIS engineering, geospatial architecture, and technical lead roles, remote or hybrid. The fastest way to reach me is email.',
    },
    footer: { builtWith: 'Built with React · MapLibre GL · GitHub Pages' },
    themeSwitch: (to) => `Switch to ${to} theme`,
    map: { heroLabel: 'Map of places Jose has worked', currentLocation: 'Current location' },
  },
  content: {
    shortTitle: profile.shortTitle,
    tagline: profile.tagline,
    location: profile.location,
    statLabels: [profile.stats[0].label, profile.stats[1].label, profile.stats[2].label],
    summary: profile.summary,
    jobs: Object.fromEntries(
      profile.jobs.map((j) => [`${j.company}-${j.start}`, { title: j.title, location: j.location, start: j.start, end: j.end, highlights: j.highlights }]),
    ),
    skillGroups: Object.fromEntries(profile.skills.map((g) => [g.name, g.name])),
    skillItems: {},
    education: profile.education,
    languages: profile.languages.map((l) => ({ name: l.name, level: l.level })),
    countries: Object.fromEntries([...profile.clientCountries, ...profile.teamCountries].map((c) => [c.code, c.name])),
  },
  mapLibre: {},
} satisfies Messages;
