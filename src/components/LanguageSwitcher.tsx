import { LOCALES, locale, t } from '../i18n';

/** Links to the same page in the other languages, keeping the current #section. */
export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <ul className={`lang-switch${className ? ` ${className}` : ''}`} aria-label={t.ui.languageLabel}>
      {LOCALES.map((l) => (
        <li key={l.code}>
          <a
            href={l.path}
            lang={l.hreflang}
            hrefLang={l.hreflang}
            title={l.name}
            aria-label={l.name}
            aria-current={l.code === locale ? 'true' : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
              if (l.code === locale) { e.preventDefault(); return; }
              if (location.hash) { e.preventDefault(); location.href = l.path + location.hash; }
            }}
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
