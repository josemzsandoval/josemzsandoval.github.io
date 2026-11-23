import { Section } from './Section';
import { profile } from '../data/profile';

export function About() {
  const current = profile.jobs[0];
  return (
    <Section id="about" eyebrow="01 · About" title="Spatial systems that scale">
      <div className="about">
        <div>
          {profile.summary.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside>
          <h3>At a glance</h3>
          <dl>
            <div><dt>Currently</dt><dd>{current.title} · {current.company}</dd></div>
            <div><dt>Based in</dt><dd>{profile.location}</dd></div>
            <div><dt>Languages</dt><dd>{profile.languages.map((l) => l.name).join(' · ')}</dd></div>
            <div><dt>Focus</dt><dd>MapLibre · PostGIS · ArcGIS Enterprise · GeoServer · Python · C#</dd></div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
