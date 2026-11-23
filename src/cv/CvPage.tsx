import { profile } from '../data/profile';

export function CvPage() {
  const c = profile.contact;
  return (
    <article className="cv">
      <header>
        <h1>{profile.name}</h1>
        <p className="headline">{profile.headline}</p>
        <p className="contact">
          {profile.location} · <a href={`mailto:${c.email}`}>{c.email}</a> · {c.phone} ·{' '}
          <a href={c.linkedin}>LinkedIn</a> · <a href="https://josemzsandoval.github.io">josemzsandoval.github.io</a>
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
            <h3>
              {j.title} <span>| {j.company} – {j.location} | {j.start === j.end ? j.start : `${j.start} – ${j.end}`}</span>
            </h3>
            <ul>{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        ))}
      </section>

      <section className="two-col">
        <div>
          <h2>Education & Certifications</h2>
          <ul className="plain">
            {[...profile.education, ...profile.certifications].map((e) => <li key={e.title}>{e.title} – {e.org}</li>)}
          </ul>
        </div>
        <div>
          <h2>Languages</h2>
          <ul className="plain">{profile.languages.map((l) => <li key={l.name}>{l.name}: {l.level}</li>)}</ul>
        </div>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <dl className="skills">
          {profile.skills.map((g) => (
            <div key={g.name}>
              <dt>{g.name}</dt>
              <dd>{g.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
