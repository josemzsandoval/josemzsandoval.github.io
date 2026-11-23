import { useSyncExternalStore } from 'react';

// Theme = the visitor's explicit choice (saved in localStorage) or, if none, the system preference.
// index.html applies a saved choice before first paint to avoid a flash of the wrong theme.

export type Theme = 'light' | 'dark';

const KEY = 'theme';
const EVENT = 'themechange';
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null; // storage blocked (private mode, etc.)
  }
}

export function getTheme(): Theme {
  return stored() ?? (systemDark.matches ? 'dark' : 'light');
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(KEY, theme); } catch { /* not persisted; still applied */ }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f1b1e' : '#f6f5f1');
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeTheme(cb: () => void) {
  // System changes only matter while the visitor hasn't picked a theme.
  const onSystem = () => { if (!stored()) cb(); };
  window.addEventListener(EVENT, cb);
  systemDark.addEventListener('change', onSystem);
  return () => {
    window.removeEventListener(EVENT, cb);
    systemDark.removeEventListener('change', onSystem);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, getTheme);
}
