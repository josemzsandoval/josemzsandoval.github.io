// Generates src/data/countries.geo.json: the outlines of the countries on the "Global reach" map.
// OpenFreeMap tiles have no country polygons to fill, so we bundle a tiny Natural Earth extract.
// Usage: node scripts/build-countries.mjs   (re-run only when the country list changes)
import { writeFile } from 'node:fs/promises';

// Natural Earth 110m admin-0, pinned to a release tag.
const SRC = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson';
const OUT = 'src/data/countries.geo.json';

// Match on ADM0_A3: ISO_A3 is "-99" for France in Natural Earth.
const CODES = ['BRA', 'BOL', 'USA', 'PRT', 'ARE', 'FRA', 'MEX', 'COL'];

const round = (n) => Math.round(n * 1000) / 1000;
const roundRing = (ring) => ring.map(([x, y]) => [round(x), round(y)]);

// Drop overseas parts (French Guiana) so only metropolitan France is highlighted.
function trim(code, geometry) {
  if (code !== 'FRA' || geometry.type !== 'MultiPolygon') return geometry;
  const coordinates = geometry.coordinates.filter((poly) => poly[0].every(([x]) => x > -10));
  return { type: 'MultiPolygon', coordinates };
}

function roundGeometry(g) {
  if (g.type === 'Polygon') return { type: g.type, coordinates: g.coordinates.map(roundRing) };
  return { type: g.type, coordinates: g.coordinates.map((poly) => poly.map(roundRing)) };
}

const res = await fetch(SRC);
if (!res.ok) throw new Error(`Download failed: ${res.status} ${SRC}`);
const world = await res.json();

const features = world.features
  .filter((f) => CODES.includes(f.properties.ADM0_A3))
  .map((f) => ({
    type: 'Feature',
    properties: { code: f.properties.ADM0_A3, name: f.properties.NAME },
    geometry: roundGeometry(trim(f.properties.ADM0_A3, f.geometry)),
  }));

const missing = CODES.filter((c) => !features.some((f) => f.properties.code === c));
if (missing.length) throw new Error(`Missing countries: ${missing.join(', ')}`);

const json = JSON.stringify({ type: 'FeatureCollection', features });
await writeFile(OUT, json + '\n');
console.log(`✔ Wrote ${OUT}: ${features.length} countries, ${(json.length / 1024).toFixed(1)} KB`);
