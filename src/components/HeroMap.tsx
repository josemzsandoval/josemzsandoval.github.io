import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// MapLibre resolves its worker relative to its own module URL, which breaks once bundled.
// Let Vite bundle the worker and hand MapLibre the final URL.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { profile, type Job } from '../data/profile';
import { getTheme, subscribeTheme } from '../theme';

// Free vector tiles, no API key: https://openfreemap.org
const STYLE_LIGHT = 'https://tiles.openfreemap.org/styles/positron';
const STYLE_DARK = 'https://tiles.openfreemap.org/styles/dark';

maplibregl.setWorkerUrl(workerUrl);

interface Place {
  coords: [number, number];
  label: string;
  jobs: Job[];
}

function groupByPlace(jobs: Job[]): Place[] {
  const byKey = new Map<string, Place>();
  for (const job of jobs) {
    const key = job.coords.join(',');
    const place = byKey.get(key) ?? { coords: job.coords, label: job.location === 'Remote' ? 'São José dos Campos, Brazil · Remote' : job.location, jobs: [] };
    place.jobs.push(job);
    byKey.set(key, place);
  }
  return [...byKey.values()];
}

function popupNode(place: Place): HTMLElement {
  const root = document.createElement('div');
  const title = document.createElement('p');
  title.className = 'popup-title';
  title.textContent = place.label;
  const list = document.createElement('ul');
  list.className = 'popup-list';
  for (const j of place.jobs) {
    const li = document.createElement('li');
    li.textContent = `${j.company} · ${j.start === j.end ? j.start : `${j.start}–${j.end}`}`;
    list.appendChild(li);
  }
  root.append(title, list);
  return root;
}

export default function HeroMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 821px)').matches;
    const places = groupByPlace(profile.jobs);

    const map = new maplibregl.Map({
      container: ref.current,
      style: getTheme() === 'dark' ? STYLE_DARK : STYLE_LIGHT,
      center: [-58, -19],
      zoom: 3,
      attributionControl: { compact: true },
      scrollZoom: false, // never hijack page scrolling
      dragRotate: false,
      cooperativeGestures: !wide,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    // Career path: Bolivia -> Brazil. Re-added on every style load (theme switch).
    const path = [...places].reverse().map((p) => p.coords);
    map.on('style.load', () => {
      if (map.getSource('career-path')) return;
      map.addSource('career-path', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: path } },
      });
      map.addLayer({
        id: 'career-path',
        type: 'line',
        source: 'career-path',
        paint: {
          'line-color': getTheme() === 'dark' ? '#4fc1b5' : '#0e7c74',
          'line-width': 2,
          'line-dasharray': [2, 2],
          'line-opacity': 0.8,
        },
      });
    });

    let currentStyle = getTheme();
    const unsubscribeTheme = subscribeTheme(() => {
      const theme = getTheme();
      if (theme === currentStyle) return;
      currentStyle = theme;
      map.setStyle(theme === 'dark' ? STYLE_DARK : STYLE_LIGHT);
    });

    // Markers are DOM elements, so they survive style changes.
    for (const place of places) {
      const el = document.createElement('button');
      el.type = 'button';
      const isCurrent = place.jobs.some((j) => j.current);
      el.className = isCurrent ? 'map-marker map-marker--current' : 'map-marker';
      el.setAttribute('aria-label', `${isCurrent ? 'Current location, ' : ''}${place.label}: ${place.jobs.map((j) => j.company).join(', ')}`);
      new maplibregl.Marker({ element: el })
        .setLngLat(place.coords)
        .setPopup(new maplibregl.Popup({ offset: 16, closeButton: true }).setDOMContent(popupNode(place)))
        .addTo(map);
    }

    const bounds = new maplibregl.LngLatBounds();
    places.forEach((p) => bounds.extend(p.coords));
    const padding = wide
      ? { top: 140, bottom: 140, left: Math.round(Math.max(window.innerWidth * 0.64, (window.innerWidth - 1080) / 2 + 24 + 700)), right: 120 }
      : { top: 40, bottom: 40, left: 40, right: 90 }; // keep pins clear of the zoom buttons
    map.once('load', () => map.fitBounds(bounds, { padding, maxZoom: 5.2, duration: reduceMotion ? 0 : 2400 }));

    return () => {
      unsubscribeTheme();
      map.remove();
    };
  }, []);

  return <div ref={ref} style={{ position: 'absolute', inset: 0 }} role="region" aria-label="Map of places Jose has worked" />;
}
