import { Section } from './Section';
import { profile } from '../data/profile';

export function Skills() {
  return (
    <Section id="skills" eyebrow="03 · Skills" title="Toolbox">
      <div className="skills">
        {profile.skills.map((g) => (
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
