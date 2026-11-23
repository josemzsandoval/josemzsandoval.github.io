import { profile } from '../data/profile';

// ATS-friendly CV: single column, standard headings, plain text contact details
// (URLs written out, not hidden behind link text), no tables, grids, or icons.

const plainUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
const dates = (start: string, end: string) => (start === end ? start : `${start} - ${end}`);

export function CvPage() {
  const c = profile.contact;
  const site = 'https://josemzsandoval.github.io';
  return (
    <article className="cv">
      <header>
        <h1>{profile.name}</h1>
        <p className="headline">{profile.headline}</p>
        <p className="contact">
          {profile.location.replace(' · ', ' | ')} | {c.phone} | <a href={`mailto:${c.email}`}>{c.email}</a>
          <br />
          <a href={c.linkedin}>{plainUrl(c.linkedin)}</a> | <a href={site}>{plainUrl(site)}</a> | <a href={c.github}>{plainUrl(c.github)}</a>
        </p>
      </header>

      <section>
        <h2>Professional Summary</h2>
        {profile.summary.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
      </section>

      <section>
        <h2>Professional Experience</h2>
        {profile.jobs.map((j) => (
          <div className="job" key={`${j.company}-${j.start}`}>
            <h3>{j.title}</h3>
            <p className="meta">{j.company} | {j.location} | {dates(j.start, j.end)}</p>
            <ul>{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            {j.stack && <p className="tech">Technologies: {j.stack.join(', ')}</p>}
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        <ul className="plain">
          {profile.education.map((e) => <li key={e.title}>{e.title}, {e.org}</li>)}
        </ul>
      </section>

      <section>
        <h2>Certifications</h2>
        <ul className="plain">
          {profile.certifications.map((e) => <li key={e.title}>{e.title}, {e.org}</li>)}
        </ul>
      </section>

      <section>
        <h2>Skills</h2>
        {profile.skills.map((g) => (
          <p className="skill" key={g.name}><strong>{g.name}:</strong> {g.items.join(', ')}</p>
        ))}
      </section>

      <section>
        <h2>Languages</h2>
        <p>{profile.languages.map((l) => `${l.name} (${l.level})`).join(', ')}</p>
      </section>
    </article>
  );
}
