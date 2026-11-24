// The page language is fixed per URL: / (English), /es/, /pt-br/. Each HTML entry sets <html lang>,
// and we read it once here. No redirects or remembered choice: / is always English.
import { profile } from '../data/profile';
import type { Locale, Messages } from './types';
import { en } from './en';
import { es } from './es';
import { ptBR } from './pt-BR';

export type { Locale, Messages } from './types';

export const LOCALES: { code: Locale; label: string; name: string; hreflang: string; path: string }[] = [
  { code: 'en', label: 'EN', name: 'English', hreflang: 'en', path: '/' },
  { code: 'es', label: 'ES', name: 'Español', hreflang: 'es', path: '/es/' },
  { code: 'pt-BR', label: 'PT', name: 'Português', hreflang: 'pt-BR', path: '/pt-br/' },
];

function detect(): Locale {
  const lang = document.documentElement.lang.toLowerCase();
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('pt')) return 'pt-BR';
  return 'en';
}

export const locale: Locale = detect();
const ALL: Record<Locale, Messages> = { en, es, 'pt-BR': ptBR };
export const t: Messages = ALL[locale];

const jobId = (j: { company: string; start: string }) => `${j.company}-${j.start}`;

// A missing or misaligned translation shows up as a console error (and in the screenshot checks).
for (const [code, m] of Object.entries(ALL)) {
  for (const j of profile.jobs) {
    const tr = m.content.jobs[jobId(j)];
    if (!tr) console.error(`[i18n] ${code}: missing job ${jobId(j)}`);
    else if (tr.highlights.length !== j.highlights.length) console.error(`[i18n] ${code}: ${jobId(j)} has ${tr.highlights.length}/${j.highlights.length} highlights`);
  }
  for (const g of profile.skills) if (!m.content.skillGroups[g.name]) console.error(`[i18n] ${code}: missing skill group ${g.name}`);
  if (m.content.summary.length !== profile.summary.length) console.error(`[i18n] ${code}: summary paragraph count differs`);
}

/** profile.ts with the active language's text merged in. Language-neutral data (name, contact, coords, stack) is untouched. */
function localize() {
  const c = t.content;
  const country = (x: { code: string; name: string }) => ({ ...x, name: c.countries[x.code] ?? x.name });
  return {
    ...profile,
    shortTitle: c.shortTitle,
    tagline: c.tagline,
    location: c.location,
    stats: profile.stats.map((s, i) => ({ ...s, label: c.statLabels[i] })),
    summary: c.summary,
    jobs: profile.jobs.map((j) => ({
      ...j,
      ...c.jobs[jobId(j)],
      id: jobId(j),
      remote: j.location === 'Remote', // decided on the English value, so "Remoto" etc. can't break it
    })),
    skills: profile.skills.map((g) => ({ name: c.skillGroups[g.name] ?? g.name, items: g.items.map((s) => c.skillItems[s] ?? s) })),
    education: c.education,
    languages: c.languages,
    clientCountries: profile.clientCountries.map(country),
    teamCountries: profile.teamCountries.map(country),
  };
}

export const site = localize();
export type SiteJob = (typeof site.jobs)[number];
