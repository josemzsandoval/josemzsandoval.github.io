import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';

// MapLibre is ~800 KB; load it in a separate chunk so text paints first.
const HeroMap = lazy(() => import('./HeroMap'));

export function Hero() {
  // Only fetch MapLibre once the map area is near the viewport
  // (on phones the map sits below the fold).
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShowMap(true); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-map" ref={mapRef}>
        {showMap && (
          <Suspense fallback={null}>
            <HeroMap />
          </Suspense>
        )}
      </div>
      <div className="hero-scrim" />
      <div className="container hero-content">
        <p className="coords">
          <b>●</b> 23.18°S 45.89°W · 17.78°S 63.18°W · {profile.location}
        </p>
        <h1 id="hero-name">{profile.name}</h1>
        <p className="role">{profile.shortTitle}</p>
        <p className="lede">{profile.tagline}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#contact">Get in touch</a>
          <a className="btn btn-ghost" href={profile.cvPdf} download>Download CV (PDF)</a>
        </div>
        <ul className="stats">
          {profile.stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
