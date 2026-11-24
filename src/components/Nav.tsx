import { useEffect, useRef, useState } from 'react';
import { site, t } from '../i18n';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

// Section ids stay in English in every language, so #anchors survive a language switch.
const links = [
  { id: 'about', label: t.ui.nav.about },
  { id: 'experience', label: t.ui.nav.experience },
  { id: 'reach', label: t.ui.nav.reach },
  { id: 'skills', label: t.ui.nav.skills },
  { id: 'education', label: t.ui.nav.education },
  { id: 'contact', label: t.ui.nav.contact },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Highlight the section currently in the upper part of the viewport.
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener('scroll', onTop, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop); };
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="container">
        <a className="brand" href="#top">jose<span>.</span>zambrana</a>
        <nav aria-label={t.ui.navLabel}>
          <ul id="primary-nav" className={open ? 'open' : undefined}>
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} aria-current={active === l.id ? 'location' : undefined} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-lang-mobile">
              <LanguageSwitcher />
            </li>
          </ul>
        </nav>
        <div className="nav-right">
          <LanguageSwitcher className="hide-mobile" />
          <ThemeToggle />
          <a className="btn btn-primary btn-sm hide-xs" href={site.cvPdf} download aria-label={t.ui.cvButtonLabel}>
            <span className="hide-sm">{t.ui.cvButtonPrefix}&nbsp;</span>CV
          </a>
          <button
            ref={btnRef}
            type="button"
            className="btn btn-ghost btn-sm menu-btn"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? t.ui.close : t.ui.menu}
          </button>
        </div>
      </div>
    </header>
  );
}
