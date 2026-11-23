import { Section } from './Section';
import { profile } from '../data/profile';

export function Contact() {
  const { email, linkedin, github } = profile.contact;
  return (
    <Section id="contact" eyebrow="06 · Contact" title="Let’s build something on the map">
      <div className="contact">
        <p>Open to GIS engineering, geospatial architecture, and technical lead roles, remote or hybrid. The fastest way to reach me is email.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={`mailto:${email}`}>{email}</a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </Section>
  );
}
