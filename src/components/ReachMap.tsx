import { useEffect, useRef } from 'react';
import type { FeatureCollection } from 'geojson';
import { maplibregl, styleFor, accentFor } from './mapSetup';
import countries from '../data/countries.geo.json';
import { getTheme, subscribeTheme } from '../theme';

// Countries too small to see at world zoom get a dot: [longitude, latitude].
const DOTS: Record<string, [number, number]> = {
  PRT: [-8.2, 39.6],
  ARE: [54.3, 23.9],
};

// Frames the Americas, Europe and the Gulf (mainland USA to the UAE, southern Brazil to France).
const BOUNDS: [[number, number], [number, number]] = [[-125, -35], [64, 52]];

export default function ReachMap({ codes, label }: { codes: string[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const dotsRef = useRef<Record<string, HTMLElement>>({});
  // Read by the style.load handler, so a theme switch restores the current selection, not the first one.
  const codesRef = useRef(codes);

  const apply = () => {
    const map = mapRef.current;
    const filter: maplibregl.FilterSpecification = ['in', ['get', 'code'], ['literal', codesRef.current]];
    if (map?.getLayer('reach-fill')) {
      map.setFilter('reach-fill', filter);
      map.setFilter('reach-line', filter);
    }
    for (const [code, el] of Object.entries(dotsRef.current)) {
      el.hidden = !codesRef.current.includes(code);
    }
  };

  useEffect(() => {
    codesRef.current = codes;
    apply();
  }, [codes]);

  useEffect(() => {
    if (!ref.current) return;
    const wide = window.matchMedia('(min-width: 821px)').matches;

    const map = new maplibregl.Map({
      container: ref.current,
      style: styleFor(getTheme()),
      bounds: BOUNDS,
      fitBoundsOptions: { padding: wide ? 32 : 20 },
      attributionControl: { compact: true },
      scrollZoom: false, // never hijack page scrolling
      dragRotate: false,
      cooperativeGestures: !wide,
      renderWorldCopies: false,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    // setStyle (theme switch) wipes custom layers, so rebuild them on every style load.
    map.on('style.load', () => {
      if (map.getSource('reach')) return;
      const color = accentFor(getTheme());
      // Below the first label layer, so place names stay readable over the fill.
      const beforeId = map.getStyle().layers.find((l) => l.type === 'symbol')?.id;
      map.addSource('reach', { type: 'geojson', data: countries as FeatureCollection });
      map.addLayer({ id: 'reach-fill', type: 'fill', source: 'reach', paint: { 'fill-color': color, 'fill-opacity': 0.35 } }, beforeId);
      map.addLayer({ id: 'reach-line', type: 'line', source: 'reach', paint: { 'line-color': color, 'line-width': 1.2 } }, beforeId);
      apply();
    });

    let currentStyle = getTheme();
    const unsubscribeTheme = subscribeTheme(() => {
      const theme = getTheme();
      if (theme === currentStyle) return;
      currentStyle = theme;
      map.setStyle(styleFor(theme));
    });

    // DOM markers survive style changes.
    for (const [code, lngLat] of Object.entries(DOTS)) {
      const el = document.createElement('span');
      el.className = 'reach-dot';
      el.setAttribute('aria-hidden', 'true');
      dotsRef.current[code] = el;
      new maplibregl.Marker({ element: el }).setLngLat(lngLat).addTo(map);
    }
    apply();

    return () => {
      unsubscribeTheme();
      map.remove();
      mapRef.current = null;
      dotsRef.current = {};
    };
  }, []);

  return <div ref={ref} style={{ position: 'absolute', inset: 0 }} role="region" aria-label={label} />;
}
