import { lazy, Suspense, useRef, useState } from 'react';
import { Section } from './Section';
import { profile } from '../data/profile';
import { useNearViewport } from '../useNearViewport';

// Shares the MapLibre chunk with the hero map; loaded only when scrolled near.
const ReachMap = lazy(() => import('./ReachMap'));

const MODES = {
  clients: { label: 'Clients', intro: 'Countries where I’ve delivered work for clients', list: profile.clientCountries },
  teams: { label: 'Teams', intro: 'Countries my teammates have worked from', list: profile.teamCountries },
} as const;
type Mode = keyof typeof MODES;

export function Reach() {
  const [mode, setMode] = useState<Mode>('clients');
  const mapRef = useRef<HTMLDivElement>(null);
  const showMap = useNearViewport(mapRef);
  const active = MODES[mode];
  const codes = active.list.map((c) => c.code);
  const names = active.list.map((c) => c.name).join(', ');

  return (
    <Section id="reach" eyebrow="03 · Global reach" title="Clients and teams across four continents">
      <div className="reach-toggle" role="group" aria-label="Show countries for">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button key={m} type="button" className="btn btn-sm" aria-pressed={mode === m} onClick={() => setMode(m)}>
            {MODES[m].label} <span className="mono">({MODES[m].list.length})</span>
          </button>
        ))}
      </div>
      <div className="reach-map" ref={mapRef}>
        {showMap && (
          <Suspense fallback={null}>
            <ReachMap codes={codes} label={`Map highlighting ${names}`} />
          </Suspense>
        )}
      </div>
      <div aria-live="polite">
        <p className="reach-intro">{active.intro}:</p>
        <ul className="reach-chips">
          {active.list.map((c) => <li key={c.code}>{c.name}</li>)}
        </ul>
      </div>
    </Section>
  );
}
