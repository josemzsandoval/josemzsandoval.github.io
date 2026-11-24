import { useState } from 'react';
import { Section } from './Section';
import { site, t, type SiteJob } from '../i18n';

const VISIBLE_HIGHLIGHTS = 3;

function JobItem({ job, expandedByDefault }: { job: SiteJob; expandedByDefault: boolean }) {
  const ui = t.ui.experience;
  const [open, setOpen] = useState(expandedByDefault);
  const hasMore = job.highlights.length > VISIBLE_HIGHLIGHTS;
  const shown = open ? job.highlights : job.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const listId = `hl-${job.id}`.replace(/\W+/g, '-');

  return (
    <li className={`job${job.current ? ' current' : ''}`}>
      <div className="job-head">
        <h3>
          {job.title} <span className="company">@ {job.company}</span>
          {job.current && <span className="badge">{ui.current}</span>}
        </h3>
        <time>{job.start === job.end ? job.start : `${job.start} – ${job.end}`} · {job.location}</time>
      </div>
      <ul className="hl" id={listId}>
        {shown.map((h) => <li key={h}>{h}</li>)}
      </ul>
      {job.stack && (
        <ul className="tags" aria-label={ui.technologies}>
          {job.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      )}
      {hasMore && (
        <button className="btn btn-ghost btn-sm more-toggle" aria-expanded={open} aria-controls={listId} onClick={() => setOpen(!open)}>
          {open ? ui.showLess : ui.showMore(job.highlights.length - VISIBLE_HIGHLIGHTS)}
        </button>
      )}
    </li>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow={t.ui.experience.eyebrow} title={t.ui.experience.title}>
      <ol className="timeline">
        {site.jobs.map((job, i) => (
          <JobItem key={job.id} job={job} expandedByDefault={i === 0} />
        ))}
      </ol>
    </Section>
  );
}
