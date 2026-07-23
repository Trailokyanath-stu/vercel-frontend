// src/hooks/useCountUp.js
// Animates a number from 0 up to `target` once the element scrolls
// into view. Returns [ref, displayValue] — attach ref to the element
// you want to observe.

import { useEffect, useRef, useState } from 'react';

export default function useCountUp(target, { duration = 1800 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);

        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out
          setValue(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(target);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, value];
}
