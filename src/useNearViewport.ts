import { useEffect, useState, type RefObject } from 'react';

/** True once the element comes within `margin` of the viewport (stays true). Used to defer loading MapLibre. */
export function useNearViewport(ref: RefObject<HTMLElement | null>, margin = '200px') {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); io.disconnect(); }
    }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return near;
}
