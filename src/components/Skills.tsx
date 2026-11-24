import { Section } from './Section';
import { site, t } from '../i18n';

export function Skills() {
  return (
    <Section id="skills" eyebrow={t.ui.skills.eyebrow} title={t.ui.skills.title}>
      <div className="skills">
        {site.skills.map((g) => (
          <div className="skill-card" key={g.name}>
            <h3>{g.name}</h3>
            <ul className="tags">
              {g.items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
