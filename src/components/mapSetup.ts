// Shared MapLibre setup for every map on the site. Import maplibregl from here so the worker is configured.
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// MapLibre resolves its worker relative to its own module URL, which breaks once bundled.
// Let Vite bundle the worker and hand MapLibre the final URL.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import type { Theme } from '../theme';
import { t } from '../i18n';

maplibregl.setWorkerUrl(workerUrl);

// Free vector tiles, no API key: https://openfreemap.org
const STYLE_LIGHT = 'https://tiles.openfreemap.org/styles/positron';
const STYLE_DARK = 'https://tiles.openfreemap.org/styles/dark';

export const styleFor = (theme: Theme) => (theme === 'dark' ? STYLE_DARK : STYLE_LIGHT);
/** Same values as --accent in global.css (map paint can't read CSS variables). */
export const accentFor = (theme: Theme) => (theme === 'dark' ? '#4fc1b5' : '#0e7c74');

/** MapLibre's own UI text (zoom buttons, two-finger hint) in the page language. Pass as the Map `locale` option. */
export const mapLocale = t.mapLibre;

export { maplibregl };
