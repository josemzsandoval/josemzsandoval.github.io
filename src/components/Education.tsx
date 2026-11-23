import { Section } from './Section';
import { profile } from '../data/profile';

export function Education() {
  return (
    <Section id="education" eyebrow="04 · Education" title="Education, certifications & languages">
      <div className="edu">
        <div>
          <h3>Education</h3>
          <ul>{profile.education.map((e) => <li key={e.title}><strong>{e.title}</strong><span>{e.org}</span></li>)}</ul>
        </div>
        <div>
          <h3>Certifications</h3>
          <ul>{profile.certifications.map((c) => <li key={c.title}><strong>{c.title}</strong><span>{c.org}</span></li>)}</ul>
        </div>
        <div>
          <h3>Languages</h3>
          <ul>{profile.languages.map((l) => <li key={l.name}><strong>{l.name}</strong><span>{l.level}</span></li>)}</ul>
        </div>
      </div>
    </Section>
  );
}
