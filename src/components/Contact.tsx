import { Section } from './Section';
import { site, t } from '../i18n';

export function Contact() {
  const { email, linkedin, github } = site.contact;
  const ui = t.ui.contact;
  return (
    <Section id="contact" eyebrow={ui.eyebrow} title={ui.title}>
      <div className="contact">
        <p>{ui.body}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={`mailto:${email}`}>{email}</a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </Section>
  );
}
