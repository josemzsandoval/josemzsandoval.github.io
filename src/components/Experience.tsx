import { useState } from 'react';
import { Section } from './Section';
import { profile, type Job } from '../data/profile';

const VISIBLE_HIGHLIGHTS = 3;

function JobItem({ job, expandedByDefault }: { job: Job; expandedByDefault: boolean }) {
  const [open, setOpen] = useState(expandedByDefault);
  const hasMore = job.highlights.length > VISIBLE_HIGHLIGHTS;
  const shown = open ? job.highlights : job.highlights.slice(0, VISIBLE_HIGHLIGHTS);
  const listId = `hl-${job.company}-${job.start}`.replace(/\W+/g, '-');

  return (
    <li className={`job${job.current ? ' current' : ''}`}>
      <div className="job-head">
        <h3>
          {job.title} <span className="company">@ {job.company}</span>
          {job.current && <span className="badge">Current</span>}
        </h3>
        <time>{job.start === job.end ? job.start : `${job.start} – ${job.end}`} · {job.location}</time>
      </div>
      <ul className="hl" id={listId}>
        {shown.map((h) => <li key={h}>{h}</li>)}
      </ul>
      {job.stack && (
        <ul className="tags" aria-label="Technologies">
          {job.stack.map((t) => <li key={t}>{t}</li>)}
        </ul>
      )}
      {hasMore && (
        <button className="btn btn-ghost btn-sm more-toggle" aria-expanded={open} aria-controls={listId} onClick={() => setOpen(!open)}>
          {open ? 'Show less' : `Show ${job.highlights.length - VISIBLE_HIGHLIGHTS} more`}
        </button>
      )}
    </li>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="02 · Experience" title="17 years across energy, utilities, mining, telecom & government">
      <ol className="timeline">
        {profile.jobs.map((job, i) => (
          <JobItem key={`${job.company}-${job.start}`} job={job} expandedByDefault={i === 0} />
        ))}
      </ol>
    </Section>
  );
}
