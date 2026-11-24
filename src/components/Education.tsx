import { Section } from './Section';
import { site, t } from '../i18n';

export function Education() {
  const ui = t.ui.education;
  return (
    <Section id="education" eyebrow={ui.eyebrow} title={ui.title}>
      <div className="edu">
        <div>
          <h3>{ui.education}</h3>
          <ul>{site.education.map((e) => <li key={e.title}><strong>{e.title}</strong><span>{e.org}</span></li>)}</ul>
        </div>
        <div>
          <h3>{ui.certifications}</h3>
          <ul>{site.certifications.map((c) => <li key={c.title}><strong>{c.title}</strong><span>{c.org}</span></li>)}</ul>
        </div>
        <div>
          <h3>{ui.languages}</h3>
          <ul>{site.languages.map((l) => <li key={l.name}><strong>{l.name}</strong><span>{l.level}</span></li>)}</ul>
        </div>
      </div>
    </Section>
  );
}
