import { Section } from './Section';
import { site, t } from '../i18n';

export function About() {
  const current = site.jobs[0];
  const ui = t.ui.about;
  return (
    <Section id="about" eyebrow={ui.eyebrow} title={ui.title}>
      <div className="about">
        <div>
          {site.summary.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside>
          <h3>{ui.atAGlance}</h3>
          <dl>
            <div><dt>{ui.currently}</dt><dd>{current.title} · {current.company}</dd></div>
            <div><dt>{ui.basedIn}</dt><dd>{site.location}</dd></div>
            <div><dt>{ui.languages}</dt><dd>{site.languages.map((l) => l.name).join(' · ')}</dd></div>
            <div><dt>{ui.focus}</dt><dd>MapLibre · PostGIS · ArcGIS Enterprise · GeoServer · Python · C#</dd></div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
